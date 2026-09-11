# Portfolio content

The public portfolio reads Supabase on the server. Projects use published status and database sort order; homepage selections use the featured flag. Services use is_active and sort_order. Experience, skills, certifications, and articles come from their existing tables. No fallback service descriptions or synthetic projects are appended.

Identity, contact links, portrait URL, homepage headline, introduction, and biography are stored in site_settings, key portfolio, value JSON. Edit this row in Supabase Table Editor. Existing dashboard editors continue to manage their existing content tables. Public visitors can read the portfolio settings; only the existing admin role can change them under RLS. Do not put credentials or private settings in this public JSON row.

Report backgrounds and featured images use the selected project's gallery image, falling back to its image_url. Keep these images representative of the actual work. UI labels and layout headings remain in the frontend.

Experience descriptions were aligned with the previously reviewed neutral copy, removing unsupported percentage and client claims. The original rows were backed up outside the repository before the update.

Validation: TypeScript check; production build; three enquiry regression tests; desktop and 390px mobile rendering; database-backed service dropdown; 7 services, 25 skills, 3 experience records, and 21 published projects; anonymous settings SELECT succeeds and an anonymous UPDATE affects zero rows. No auth or lead-handler files changed.

Supabase advisory check found no new table security findings. Existing notices remain for default-deny service_images/service_projects policies and disabled leaked-password protection: https://supabase.com/docs/guides/auth/password-security#password-strength-and-leaked-password-protection
