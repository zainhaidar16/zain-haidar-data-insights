import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

async function assertAdmin(userId: string) {
  const results = await Promise.all(["admin", "editor"] as const.map(role => supabaseAdmin.rpc("has_role", { _user_id: userId, _role: role })));
  if (results.some(result => result.error)) throw new Response("Failed to verify role", { status: 500 });
  if (!results.some(result => result.data === true)) throw new Response("Forbidden", { status: 403 });
}

function toTextArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => {
      if (typeof item === "string") return item;
      if (item && typeof item === "object") {
        const obj = item as Record<string, unknown>;
        return String(obj.title ?? obj.label ?? obj.name ?? obj.text ?? obj.value ?? "");
      }
      return "";
    })
    .filter(Boolean);
}

function toGalleryArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => {
      if (typeof item === "string") return item;
      if (item && typeof item === "object") {
        const obj = item as Record<string, unknown>;
        return String(obj.image_url ?? obj.url ?? obj.src ?? "");
      }
      return "";
    })
    .filter(Boolean);
}

function toMetricArray(value: unknown): { label: string; value: string }[] {
  if (Array.isArray(value)) {
    return value
      .map((item) => {
        if (item && typeof item === "object") {
          const obj = item as Record<string, unknown>;
          return { label: String(obj.label ?? obj.name ?? ""), value: String(obj.value ?? "") };
        }
        return null;
      })
      .filter((item): item is { label: string; value: string } => Boolean(item?.label && item?.value));
  }
  if (value && typeof value === "object") {
    return Object.entries(value as Record<string, unknown>).map(([label, val]) => ({
      label,
      value: String(val ?? ""),
    }));
  }
  return [];
}

export const listAllProjects = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertAdmin(context.userId);
    const { data, error } = await supabaseAdmin
      .from("projects")
      .select("id, slug, title, category, status, sort_order, image_url, updated_at")
      .order("sort_order", { ascending: true })
      .order("updated_at", { ascending: false })
      .limit(500);
    if (error) throw new Response(error.message, { status: 500 });
    return {
      projects: (data ?? []).map((p) => ({
        ...p,
        tag: p.category ?? null,
        cover_url: p.image_url ?? null,
        published_at: null,
      })),
    };
  });

export const getProjectForEdit = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input) => z.object({ id: z.string().uuid() }).parse(input))
  .handler(async ({ context, data }) => {
    await assertAdmin(context.userId);
    const { data: project, error } = await supabaseAdmin
      .from("projects")
      .select("*")
      .eq("id", data.id)
      .maybeSingle();
    if (error) throw new Response(error.message, { status: 500 });
    if (!project) return { project: null };

    return {
      project: {
        ...project,
        client: "",
        tag: project.category ?? "",
        year: project.created_at ? new Date(project.created_at).getFullYear().toString() : "",
        duration: "",
        role: "Data Analyst / BI Developer",
        impact: project.short_description ?? project.outcome ?? "",
        cover_url: project.image_url ?? "",
        approach: toTextArray(project.solution_steps).length ? toTextArray(project.solution_steps) : toTextArray(project.approach),
        outcomes: toTextArray(project.business_impact).length ? toTextArray(project.business_impact) : toTextArray(project.outcome),
        stack: toTextArray(project.technologies),
        metrics: toMetricArray(project.metrics),
        gallery: toGalleryArray(project.gallery),
      },
    };
  });

const MetricSchema = z.object({
  label: z.string().min(1).max(80),
  value: z.string().min(1).max(80),
});

const ProjectInput = z.object({
  id: z.string().uuid().optional(),
  slug: z
    .string()
    .min(1)
    .max(200)
    .regex(/^[a-z0-9-]+$/, "lowercase, numbers, dashes only"),
  title: z.string().min(1).max(300),
  client: z.string().max(200).optional().or(z.literal("")),
  tag: z.string().max(120).optional().or(z.literal("")),
  year: z.string().max(20).optional().or(z.literal("")),
  duration: z.string().max(60).optional().or(z.literal("")),
  role: z.string().max(120).optional().or(z.literal("")),
  impact: z.string().max(280).optional().or(z.literal("")),
  cover_url: z.string().url().max(800).optional().or(z.literal("")),
  problem: z.string().max(4000).default(""),
  approach: z.array(z.string().min(1).max(800)).max(20).default([]),
  outcomes: z.array(z.string().min(1).max(800)).max(20).default([]),
  stack: z.array(z.string().min(1).max(60)).max(30).default([]),
  metrics: z.array(MetricSchema).max(12).default([]),
  gallery: z.array(z.string().url().max(800)).max(20).default([]),
  status: z.enum(["draft", "published"]).default("draft"),
  sort_order: z.number().int().min(0).max(10000).default(0),
});

export const upsertProject = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input) => ProjectInput.parse(input))
  .handler(async ({ context, data }) => {
    await assertAdmin(context.userId);
    const empty = (v: string | undefined) => (v && v.trim().length > 0 ? v.trim() : null);
    const category = empty(data.tag) ?? "Data Analysis and Visualization";
    const shortDescription = empty(data.impact) ?? `A ${category} project by Zain The Analyst.`;
    const description = data.problem || shortDescription || "Project details coming soon.";
    const gallery = data.gallery.map((url, index) => ({
      image_url: url,
      url,
      title: `Project image ${index + 1}`,
      alt: `${data.title} screenshot ${index + 1}`,
    }));

    const row = {
      slug: data.slug,
      title: data.title,
      category,
      short_description: shortDescription,
      description,
      problem: data.problem || null,
      approach: data.approach.join("\n"),
      outcome: data.outcomes.join("\n"),
      technologies: data.stack,
      metrics: data.metrics,
      image_url: empty(data.cover_url),
      featured: data.status === "published",
      status: data.status,
      sort_order: data.sort_order,
      updated_at: new Date().toISOString(),
      hero_title: data.title,
      hero_description: shortDescription,
      project_goal: shortDescription,
      data_sources: data.client ? [data.client] : [],
      key_features: data.approach,
      challenges: data.problem ? [data.problem] : [],
      solution_steps: data.approach,
      business_impact: data.outcomes,
      gallery,
      github_url: null,
      live_url: null,
    };

    if (data.id) {
      const { error } = await supabaseAdmin.from("projects").update(row).eq("id", data.id);
      if (error) throw new Response(error.message, { status: 500 });
      return { ok: true, id: data.id };
    }

    const { data: inserted, error } = await supabaseAdmin
      .from("projects")
      .insert(row)
      .select("id")
      .single();
    if (error) throw new Response(error.message, { status: 500 });
    return { ok: true, id: inserted.id };
  });

export const deleteProject = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input) => z.object({ id: z.string().uuid() }).parse(input))
  .handler(async ({ context, data }) => {
    await assertAdmin(context.userId);
    const { error } = await supabaseAdmin.from("projects").delete().eq("id", data.id);
    if (error) throw new Response(error.message, { status: 500 });
    return { ok: true };
  });

const UploadInput = z.object({
  filename: z
    .string()
    .min(1)
    .max(200)
    .regex(/^[a-zA-Z0-9._-]+$/, "alphanumeric, dot, underscore, dash"),
  contentType: z.string().min(1).max(120),
  dataBase64: z.string().min(1).max(15_000_000),
});

export const uploadProjectImage = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input) => UploadInput.parse(input))
  .handler(async ({ context, data }) => {
    await assertAdmin(context.userId);
    if (!data.contentType.startsWith("image/")) {
      throw new Response("Only image uploads allowed", { status: 400 });
    }
    const bytes = Uint8Array.from(atob(data.dataBase64), (c) => c.charCodeAt(0));
    const ext = data.filename.includes(".") ? data.filename.split(".").pop() : "bin";
    const path = `uploads/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
    const { error } = await supabaseAdmin.storage
      .from("project-media")
      .upload(path, bytes, { contentType: data.contentType, upsert: false });
    if (error) throw new Response(error.message, { status: 500 });
    const { data: pub } = supabaseAdmin.storage.from("project-media").getPublicUrl(path);
    return { url: pub.publicUrl, path };
  });
