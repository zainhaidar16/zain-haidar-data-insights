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

export const listAllPosts = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertAdmin(context.userId);
    const { data, error } = await supabaseAdmin
      .from("posts")
      .select("id, slug, title, excerpt, status, category, tags, published_at, updated_at, reading_minutes, cover_url")
      .order("updated_at", { ascending: false })
      .limit(500);
    if (error) throw new Response(error.message, { status: 500 });
    return { posts: data ?? [] };
  });

export const getPostForEdit = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input) => z.object({ id: z.string().uuid() }).parse(input))
  .handler(async ({ context, data }) => {
    await assertAdmin(context.userId);
    const { data: post, error } = await supabaseAdmin
      .from("posts")
      .select("*")
      .eq("id", data.id)
      .maybeSingle();
    if (error) throw new Response(error.message, { status: 500 });
    return { post };
  });

const PostInput = z.object({
  id: z.string().uuid().optional(),
  slug: z.string().min(1).max(200).regex(/^[a-z0-9-]+$/, "lowercase, numbers, dashes only"),
  title: z.string().min(1).max(300),
  excerpt: z.string().max(500).optional().or(z.literal("")),
  body_md: z.string().max(200000).default(""),
  category: z.string().max(80).optional().or(z.literal("")),
  tags: z.array(z.string().min(1).max(40)).max(20).default([]),
  cover_url: z.string().url().max(800).optional().or(z.literal("")),
  reading_minutes: z.number().int().min(1).max(120).default(5),
  seo_title: z.string().max(200).optional().or(z.literal("")),
  seo_description: z.string().max(400).optional().or(z.literal("")),
  status: z.enum(["draft", "published"]).default("draft"),
});

export const upsertPost = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input) => PostInput.parse(input))
  .handler(async ({ context, data }) => {
    await assertAdmin(context.userId);
    const empty = (v: string | undefined) => (v && v.length > 0 ? v : null);
    const row = {
      slug: data.slug,
      title: data.title,
      excerpt: empty(data.excerpt),
      body_md: data.body_md,
      category: empty(data.category),
      tags: data.tags,
      cover_url: empty(data.cover_url),
      reading_minutes: data.reading_minutes,
      seo_title: empty(data.seo_title),
      seo_description: empty(data.seo_description),
      status: data.status,
      author_id: context.userId,
      published_at:
        data.status === "published" ? new Date().toISOString() : null,
    };
    if (data.id) {
      // Preserve original published_at if already published
      if (data.status === "published") {
        const { data: existing } = await supabaseAdmin
          .from("posts").select("published_at, status").eq("id", data.id).maybeSingle();
        if (existing?.status === "published" && existing.published_at) {
          row.published_at = existing.published_at;
        }
      }
      const { error } = await supabaseAdmin.from("posts").update(row).eq("id", data.id);
      if (error) throw new Response(error.message, { status: 500 });
      return { ok: true, id: data.id };
    } else {
      const { data: inserted, error } = await supabaseAdmin
        .from("posts").insert(row).select("id").single();
      if (error) throw new Response(error.message, { status: 500 });
      return { ok: true, id: inserted.id };
    }
  });

export const deletePost = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input) => z.object({ id: z.string().uuid() }).parse(input))
  .handler(async ({ context, data }) => {
    await assertAdmin(context.userId);
    const { error } = await supabaseAdmin.from("posts").delete().eq("id", data.id);
    if (error) throw new Response(error.message, { status: 500 });
    return { ok: true };
  });
