import { createServerFn } from "@tanstack/react-start";
import { enquirySchema, toLeadRecord } from "./enquiry";
import { getPublicSupabaseClient } from "./public-supabase.server";
export const submitLead = createServerFn({ method: "POST" })
  .inputValidator((input) => enquirySchema.parse(input))
  .handler(async ({ data }) => {
    if (data.website) return { ok: true };
    try {
      // No SELECT: enquiries remain readable only by the administrator.
      const { error } = await getPublicSupabaseClient().from("leads").insert(toLeadRecord(data));
      if (error)
        return {
          ok: false,
          error: "Your message could not be saved. Please try again or email me directly.",
        };
      return { ok: true };
    } catch {
      return {
        ok: false,
        error:
          "The enquiry service is unavailable. Your message is still here; please retry or use email.",
      };
    }
  });
