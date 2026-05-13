import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

const LeadSchema = z.object({
  name: z.string().trim().min(1).max(200),
  email: z.string().trim().email().max(320),
  company: z.string().trim().max(200).optional().or(z.literal("")),
  project_type: z.string().trim().max(120).optional().or(z.literal("")),
  budget: z.enum(["under_5k", "5k_15k", "15k_50k", "50k_plus", "not_sure"]).optional(),
  message: z.string().trim().min(10).max(5000),
});

export const submitLead = createServerFn({ method: "POST" })
  .inputValidator((input) => LeadSchema.parse(input))
  .handler(async ({ data }) => {
    const { error } = await supabaseAdmin.from("leads").insert({
      name: data.name,
      email: data.email,
      company: data.company || null,
      project_type: data.project_type || null,
      budget: data.budget ?? null,
      message: data.message,
      source: "website",
    });
    if (error) {
      console.error("submitLead error", error);
      return { ok: false, error: "Could not submit your message. Please try again." };
    }
    return { ok: true };
  });
