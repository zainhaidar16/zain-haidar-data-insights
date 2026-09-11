import { createServerFn } from "@tanstack/react-start";
import { getPublicSupabaseClient } from "./public-supabase.server";
import { z } from "zod";
import type { Database } from "@/integrations/supabase/types";
import type {
  BlogGalleryImage,
  BlogSection,
  Certification,
  Experience,
  Post,
  Project,
  Service,
  Skill,
} from "@/lib/api";

function parseArray<T = unknown>(val: unknown): T[] {
  if (Array.isArray(val)) return val as T[];
  if (typeof val === "string" && val.trim()) {
    try {
      const parsed = JSON.parse(val);
      return Array.isArray(parsed) ? parsed : [val as T];
    } catch {
      return [val as T];
    }
  }
  return [];
}

function mapProjectRow(row: any): Project {
  return {
    ...row,
    approach: parseArray<string>(row.approach),
    outcome: parseArray<string>(row.outcome),
    technologies: parseArray<string>(row.technologies),
    metrics: parseArray<{ label: string; value: string }>(row.metrics),
    data_sources: parseArray<string>(row.data_sources),
    key_features: parseArray<string>(row.key_features),
    challenges: parseArray<string>(row.challenges),
    solution_steps: parseArray<{ title: string; description: string }>(row.solution_steps),
    business_impact: parseArray<string>(row.business_impact),
    gallery: parseArray<{ image_url: string; alt_text?: string; caption?: string }>(row.gallery),
  };
}

function mapPostRow(row: any): Post {
  return {
    ...row,
    tags: parseArray<string>(row.tags),
    key_takeaways: parseArray<string>(row.key_takeaways),
    sections: parseArray<BlogSection>(row.sections),
    related_services: parseArray<string>(row.related_services),
    gallery: parseArray<BlogGalleryImage>(row.gallery),
  };
}

function mapServiceRow(row: any): Service {
  return {
    ...row,
    problems_solved: parseArray<string>(row.problems_solved),
    deliverables: parseArray<string>(row.deliverables),
    benefits: parseArray<string>(row.benefits),
    technologies: parseArray<string>(row.technologies),
    process_steps: parseArray<{ title: string; description: string }>(row.process_steps),
    faq: parseArray<{ question: string; answer: string }>(row.faq),
  };
}

async function fetchProjects(limit?: number, featuredOnly = false): Promise<Project[]> {
  let query = getPublicSupabaseClient()
    .from("projects")
    .select("*")
    .eq("status", "published")
    .order("sort_order", { ascending: true });

  if (featuredOnly) query = query.eq("featured", true);
  if (limit) query = query.limit(limit);

  const { data, error } = await query;
  if (error) throw error;
  return (data ?? []).map(mapProjectRow);
}

async function fetchServices(limit?: number): Promise<Service[]> {
  let query = getPublicSupabaseClient()
    .from("services")
    .select("*")
    .eq("is_active", true)
    .order("sort_order", { ascending: true });

  if (limit) query = query.limit(limit);

  const { data, error } = await query;
  if (error) throw error;
  return (data ?? []).map(mapServiceRow);
}

async function fetchPosts(limit?: number): Promise<Post[]> {
  let query = getPublicSupabaseClient()
    .from("posts")
    .select("*")
    .eq("status", "published")
    .order("featured", { ascending: false })
    .order("published_at", { ascending: false, nullsFirst: false })
    .order("created_at", { ascending: false });

  if (limit) query = query.limit(limit);

  const { data, error } = await query;
  if (error) throw error;
  return (data ?? []).map(mapPostRow);
}

export const getProjectsPageData = createServerFn({ method: "GET" }).handler(async () => {
  try {
    const projects = await fetchProjects();
    return { projects, unavailable: false };
  } catch {
    return { projects: [] as Project[], unavailable: true };
  }
});

export const getServicesPageData = createServerFn({ method: "GET" }).handler(async () => {
  try {
    const services = await fetchServices();
    return { services, unavailable: false };
  } catch {
    return { services: [] as Service[], unavailable: true };
  }
});

export const getBlogIndexData = createServerFn({ method: "GET" }).handler(async () => {
  try {
    return { posts: await fetchPosts() };
  } catch {
    return { posts: [] as Post[] };
  }
});

export const getHomePageData = createServerFn({ method: "GET" }).handler(async () => {
  const [projects, services, about, posts] = await Promise.allSettled([
    fetchProjects(),
    fetchServices(),
    fetchAboutData(),
    fetchPosts(3),
  ]);
  return {
    projects: projects.status === "fulfilled" ? projects.value : ([] as Project[]),
    services: services.status === "fulfilled" ? services.value : ([] as Service[]),
    ...(about.status === "fulfilled"
      ? about.value
      : {
          experiences: [] as Experience[],
          skills: [] as Skill[],
          certifications: [] as Certification[],
        }),
    posts: posts.status === "fulfilled" ? posts.value : ([] as Post[]),
    projectsUnavailable: projects.status === "rejected",
    contentUnavailable:
      [projects, services, about, posts].some((r) => r.status === "rejected") ||
      (about.status === "fulfilled" && about.value.unavailable),
  };
});

export const getProjectDetailData = createServerFn({ method: "GET" })
  .inputValidator((input) => z.object({ slug: z.string().min(1).max(200) }).parse(input))
  .handler(async ({ data }) => {
    try {
      const { data: project, error } = await getPublicSupabaseClient()
        .from("projects")
        .select("*")
        .eq("slug", data.slug)
        .eq("status", "published")
        .maybeSingle();
      if (error) throw error;
      return { project: project ? mapProjectRow(project) : null };
    } catch {
      throw new Error("Project details are temporarily unavailable. Please try again.");
    }
  });

export const getWorkDetailData = createServerFn({ method: "GET" })
  .inputValidator((input) => z.object({ slug: z.string().min(1).max(200) }).parse(input))
  .handler(async ({ data }) => {
    const list = await fetchProjects();
    const idx = list.findIndex((p) => p.slug === data.slug);
    const next = idx >= 0 && list.length > 1 ? list[(idx + 1) % list.length] : null;
    return {
      project: list[idx] ?? null,
      nextProject: next ? { slug: next.slug, title: next.title } : null,
    };
  });

export const getServiceDetailData = createServerFn({ method: "GET" })
  .inputValidator((input) => z.object({ slug: z.string().min(1).max(200) }).parse(input))
  .handler(async ({ data }) => {
    try {
      const { data: service, error } = await getPublicSupabaseClient()
        .from("services")
        .select("*")
        .eq("slug", data.slug)
        .eq("is_active", true)
        .maybeSingle();
      if (error) throw error;
      return {
        service: service ? mapServiceRow(service) : null,
      };
    } catch {
      throw new Error("Service details are temporarily unavailable. Please try again.");
    }
  });

export const getPostDetailData = createServerFn({ method: "GET" })
  .inputValidator((input) => z.object({ slug: z.string().min(1).max(200) }).parse(input))
  .handler(async ({ data }) => {
    try {
      const posts = await fetchPosts();
      const post = posts.find((item) => item.slug === data.slug) ?? null;
      const postIndex = posts.findIndex((item) => item.slug === data.slug);
      const previousPost = postIndex > 0 ? posts[postIndex - 1] : null;
      const nextPost = postIndex >= 0 && postIndex < posts.length - 1 ? posts[postIndex + 1] : null;
      const relatedPosts = posts
        .filter((item) => item.slug !== data.slug)
        .sort((a, b) => {
          const categoryScore =
            (post && a.category && a.category === post.category ? 1 : 0) -
            (post && b.category && b.category === post.category ? 1 : 0);
          if (categoryScore !== 0) return -categoryScore;

          const aTags = new Set(a.tags ?? []);
          const sharedA = post ? (post.tags ?? []).filter((tag) => aTags.has(tag)).length : 0;
          const bTags = new Set(b.tags ?? []);
          const sharedB = post ? (post.tags ?? []).filter((tag) => bTags.has(tag)).length : 0;
          return sharedB - sharedA;
        })
        .slice(0, 3);

      return {
        post,
        relatedPosts,
        previousPost: previousPost ? { slug: previousPost.slug, title: previousPost.title } : null,
        nextPost: nextPost ? { slug: nextPost.slug, title: nextPost.title } : null,
      };
    } catch {
      throw new Error("Articles are temporarily unavailable. Please try again.");
    }
  });

async function fetchAboutData() {
  try {
    const [experience, skills, certifications] = await Promise.all([
      getPublicSupabaseClient()
        .from("experience")
        .select("*")
        .order("sort_order", { ascending: true }),
      getPublicSupabaseClient()
        .from("skills")
        .select("*")
        .order("category", { ascending: true })
        .order("sort_order", { ascending: true }),
      getPublicSupabaseClient()
        .from("certifications")
        .select("*")
        .order("sort_order", { ascending: true }),
    ]);

    if (experience.error || skills.error || certifications.error)
      throw new Error("Profile data unavailable");
    return {
      unavailable: false,
      experiences: (experience.data ?? []).map((e) => ({
        ...e,
        bullet_points: parseArray<string>(e.bullet_points),
      })) as Experience[],
      skills: (skills.data ?? []) as Skill[],
      certifications: (certifications.data ?? []) as Certification[],
    };
  } catch {
    return {
      unavailable: true,
      experiences: [] as Experience[],
      skills: [] as Skill[],
      certifications: [] as Certification[],
    };
  }
}
export const getAboutPageData = createServerFn({ method: "GET" }).handler(fetchAboutData);
