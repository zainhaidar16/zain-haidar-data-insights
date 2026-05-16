import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

export const listPublishedProjects = createServerFn({ method: "GET" }).handler(async () => {
  const { data, error } = await supabaseAdmin
    .from("projects")
    .select("id, slug, title, tag, impact, cover_url, problem, stack, sort_order, published_at")
    .eq("status", "published")
    .order("sort_order", { ascending: true })
    .order("published_at", { ascending: false })
    .limit(60);
  if (error) return { projects: [] };
  return { projects: data ?? [] };
});

export const getProjectBySlug = createServerFn({ method: "GET" })
  .inputValidator((input) => z.object({ slug: z.string().min(1).max(200) }).parse(input))
  .handler(async ({ data }) => {
    const { data: project } = await supabaseAdmin
      .from("projects")
      .select("*")
      .eq("slug", data.slug)
      .eq("status", "published")
      .maybeSingle();
    return { project };
  });

export const listPublishedProjectSlugs = createServerFn({ method: "GET" }).handler(async () => {
  const { data } = await supabaseAdmin
    .from("projects")
    .select("slug, title, sort_order")
    .eq("status", "published")
    .order("sort_order", { ascending: true });
  return { items: data ?? [] };
});
