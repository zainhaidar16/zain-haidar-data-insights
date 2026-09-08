import { createServerFn } from "@tanstack/react-start";
import { getPublicSupabaseClient } from "./public-supabase.server";
import { curateProject, selectFeatured } from "@/data/project-evidence";
import { z } from "zod";
import type { Database } from "@/integrations/supabase/types";
import type { BlogGalleryImage, BlogSection, Certification, Experience, Post, Project, Service, Skill } from "@/lib/api";
import { fallbackProjects, fallbackServices } from "@/lib/fallback-data";

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
  return (data ?? []).map(mapProjectRow).map(curateProject);
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

function fallbackProjectBySlug(slug: string) {
  return fallbackProjects.find((project) => project.slug === slug) ?? null;
}

function fallbackServiceBySlug(slug: string) {
  return fallbackServices.find((service) => service.slug === slug) ?? null;
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
    return { services: services.length > 0 ? services : fallbackServices };
  } catch {
    return { services: fallbackServices };
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
  const [projectsResult, servicesResult, postsResult] = await Promise.allSettled([
    fetchProjects(),
    fetchServices(5),
    fetchPosts(3),
  ]);

  const projects =
    projectsResult.status === "fulfilled" && projectsResult.value.length > 0
      ? selectFeatured(projectsResult.value)
      : [];
  const services =
    servicesResult.status === "fulfilled" && servicesResult.value.length > 0
      ? servicesResult.value
      : fallbackServices.slice(0, 5);
  const posts = postsResult.status === "fulfilled" ? postsResult.value : [];

  return { projects, services, posts, projectsUnavailable: projectsResult.status === "rejected" };
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
      return { project: project ? curateProject(mapProjectRow(project)) : null };
    } catch {
      throw new Error("Project details are temporarily unavailable. Please try again.");
    }
  });

export const getWorkDetailData = createServerFn({ method: "GET" })
  .inputValidator((input) => z.object({ slug: z.string().min(1).max(200) }).parse(input))
  .handler(async ({ data }) => {
    try {
      const projects = await fetchProjects();
      const list = projects.length > 0 ? projects : fallbackProjects;
      const project = list.find((item) => item.slug === data.slug) ?? null;
      const idx = list.findIndex((item) => item.slug === data.slug);
      const next = idx >= 0 && list.length > 1 ? list[(idx + 1) % list.length] : null;

      return {
        project,
        nextProject: next && next.slug !== data.slug ? { slug: next.slug, title: next.title } : null,
      };
    } catch {
      const list = fallbackProjects;
      const project = fallbackProjectBySlug(data.slug);
      const idx = list.findIndex((item) => item.slug === data.slug);
      const next = idx >= 0 && list.length > 1 ? list[(idx + 1) % list.length] : null;

      return {
        project,
        nextProject: next && next.slug !== data.slug ? { slug: next.slug, title: next.title } : null,
      };
    }
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
      return { service: fallbackServiceBySlug(data.slug) ?? (service ? mapServiceRow(service) : null) };
    } catch {
      return { service: fallbackServiceBySlug(data.slug) };
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
      return { post: null, relatedPosts: [] as Post[], previousPost: null, nextPost: null };
    }
  });

export const getAboutPageData = createServerFn({ method: "GET" }).handler(async () => {
  try {
    const [experience, skills, certifications] = await Promise.all([
      getPublicSupabaseClient().from("experience").select("*").order("sort_order", { ascending: true }),
      getPublicSupabaseClient()
        .from("skills")
        .select("*")
        .order("category", { ascending: true })
        .order("sort_order", { ascending: true }),
      getPublicSupabaseClient().from("certifications").select("*").order("sort_order", { ascending: true }),
    ]);

    return {
      experiences: (experience.data ?? []) as Experience[],
      skills: (skills.data ?? []) as Skill[],
      certifications: (certifications.data ?? []) as Certification[],
    };
  } catch {
    return {
      experiences: [] as Experience[],
      skills: [] as Skill[],
      certifications: [] as Certification[],
    };
  }
});
