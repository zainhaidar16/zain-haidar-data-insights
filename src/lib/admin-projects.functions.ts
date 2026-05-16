import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

async function assertAdmin(userId: string) {
  const { data, error } = await supabaseAdmin
    .from("user_roles")
    .select("role")
    .eq("user_id", userId)
    .in("role", ["admin", "editor"])
    .maybeSingle();
  if (error) throw new Response("Failed to verify role", { status: 500 });
  if (!data) throw new Response("Forbidden", { status: 403 });
}

export const listAllProjects = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertAdmin(context.userId);
    const { data, error } = await supabaseAdmin
      .from("projects")
      .select("id, slug, title, tag, status, sort_order, cover_url, published_at, updated_at")
      .order("sort_order", { ascending: true })
      .order("updated_at", { ascending: false })
      .limit(500);
    if (error) throw new Response(error.message, { status: 500 });
    return { projects: data ?? [] };
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
    return { project };
  });

const MetricSchema = z.object({
  label: z.string().min(1).max(80),
  value: z.string().min(1).max(80),
});

const ProjectInput = z.object({
  id: z.string().uuid().optional(),
  slug: z.string().min(1).max(200).regex(/^[a-z0-9-]+$/, "lowercase, numbers, dashes only"),
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
    const empty = (v: string | undefined) => (v && v.length > 0 ? v : null);
    const row = {
      slug: data.slug,
      title: data.title,
      client: empty(data.client),
      tag: empty(data.tag),
      year: empty(data.year),
      duration: empty(data.duration),
      role: empty(data.role),
      impact: empty(data.impact),
      cover_url: empty(data.cover_url),
      problem: data.problem,
      approach: data.approach,
      outcomes: data.outcomes,
      stack: data.stack,
      metrics: data.metrics,
      gallery: data.gallery,
      status: data.status,
      sort_order: data.sort_order,
      author_id: context.userId,
      published_at:
        data.status === "published" ? new Date().toISOString() : null,
    };
    if (data.id) {
      if (data.status === "published") {
        const { data: existing } = await supabaseAdmin
          .from("projects").select("published_at, status").eq("id", data.id).maybeSingle();
        if (existing?.status === "published" && existing.published_at) {
          row.published_at = existing.published_at;
        }
      }
      const { error } = await supabaseAdmin.from("projects").update(row).eq("id", data.id);
      if (error) throw new Response(error.message, { status: 500 });
      return { ok: true, id: data.id };
    } else {
      const { data: inserted, error } = await supabaseAdmin
        .from("projects").insert(row).select("id").single();
      if (error) throw new Response(error.message, { status: 500 });
      return { ok: true, id: inserted.id };
    }
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
  filename: z.string().min(1).max(200).regex(/^[a-zA-Z0-9._-]+$/, "alphanumeric, dot, underscore, dash"),
  contentType: z.string().min(1).max(120),
  // base64-encoded file body
  dataBase64: z.string().min(1).max(15_000_000), // ~10 MB raw
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
