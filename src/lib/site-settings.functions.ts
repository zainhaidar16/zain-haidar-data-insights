import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getPublicSupabaseClient } from "./public-supabase.server";
const url = z
  .string()
  .refine((v) => /^https:\/\//.test(v) || /^\/(?!\/)/.test(v), "Use an HTTPS or local URL");
const schema = z.object({
  name: z.string(),
  role: z.string(),
  location: z.string(),
  email: z.string().email(),
  linkedin: url,
  github: url,
  resume: url,
  calendar: url,
  availability: z.string(),
  portrait: url,
  headline: z.string(),
  headline_accent: z.string(),
  intro: z.string(),
  about: z.string(),
});
export const getSiteSettings = createServerFn({ method: "GET" }).handler(async () => {
  const { data, error } = await getPublicSupabaseClient()
    .from("site_settings")
    .select("value")
    .eq("key", "portfolio")
    .single();
  if (error) throw new Error("Portfolio settings are temporarily unavailable");
  return schema.parse(data.value);
});
