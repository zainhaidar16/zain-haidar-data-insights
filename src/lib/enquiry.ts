import { z } from "zod";
export const budgetOptions = [
  { value: "under_5k", label: "Under €5,000" },
  { value: "5k_15k", label: "€5,000–€15,000" },
  { value: "15k_50k", label: "€15,000–€50,000" },
  { value: "50k_plus", label: "€50,000+" },
  { value: "not_sure", label: "Let’s discuss the scope" },
] as const;
export const enquirySchema = z.object({
  intent: z.enum(["employment", "freelance"]),
  name: z.string().trim().min(1, "Enter your name.").max(200),
  email: z.string().trim().email("Enter a valid email address.").max(320),
  company: z.string().trim().max(200).default(""),
  role: z.string().trim().max(200).default(""),
  jobUrl: z
    .string()
    .trim()
    .max(1000)
    .refine(
      (value) =>
        !value || (z.string().url().safeParse(value).success && /^https?:\/\//i.test(value)),
      "Use a link starting with https://.",
    )
    .default(""),
  service: z.string().trim().max(120).default(""),
  timeline: z.string().trim().max(200).default(""),
  budget: z.enum(["under_5k", "5k_15k", "15k_50k", "50k_plus", "not_sure", ""]).default(""),
  message: z
    .string()
    .trim()
    .min(10, "Please add a little more detail (at least 10 characters).")
    .max(5000),
  website: z.string().max(500).default(""),
});
export type Enquiry = z.infer<typeof enquirySchema>;
/** Optional context fits the existing schema without expanding lead read access. */
export function toLeadRecord(input: Enquiry) {
  const details =
    input.intent === "employment"
      ? [input.role && "Role: " + input.role, input.jobUrl && "Job link: " + input.jobUrl]
      : [
          input.service && "Service: " + input.service,
          input.timeline && "Timeline: " + input.timeline,
        ];
  return {
    name: input.name,
    email: input.email,
    company: input.company || null,
    project_type: input.intent === "employment" ? "Employment opportunity" : "Freelance project",
    budget: input.intent === "freelance" && input.budget ? input.budget : null,
    message: [...details.filter(Boolean), input.message].join("\n\n"),
    status: "new" as const,
  };
}
