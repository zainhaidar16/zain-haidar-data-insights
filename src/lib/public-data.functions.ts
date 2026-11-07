import type { Database } from "@/integrations/supabase/types";
import { createServerFn } from "@tanstack/react-start";
import { getPublicSupabaseClient } from "./public-supabase.server";
import { z } from "zod";
import type { Certification, Experience, Project, Service, Skill } from "@/lib/api";

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

function mapProjectRow(row: Database["public"]["Tables"]["projects"]["Row"]): Project {
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
  } as Project;
}

function mapServiceRow(row: Database["public"]["Tables"]["services"]["Row"]): Service {
  return {
    ...row,
    problems_solved: parseArray<string>(row.problems_solved),
    deliverables: parseArray<string>(row.deliverables),
    benefits: parseArray<string>(row.benefits),
    technologies: parseArray<string>(row.technologies),
    process_steps: parseArray<{ title: string; description: string }>(row.process_steps),
    faq: parseArray<{ question: string; answer: string }>(row.faq),
  } as Service;
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

export const getHomePageData = createServerFn({ method: "GET" }).handler(async () => {
  const [projects, services, about] = await Promise.allSettled([
    fetchProjects(),
    fetchServices(),
    fetchAboutData(),
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
    projectsUnavailable: projects.status === "rejected",
    contentUnavailable:
      [projects, services, about].some((r) => r.status === "rejected") ||
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
