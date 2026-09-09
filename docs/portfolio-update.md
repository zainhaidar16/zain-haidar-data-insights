# Portfolio update — 9 September 2026

## Delivered
- One identity and separate employment/freelance enquiry paths; visible résumé, GitHub and LinkedIn links.
- Minimal warm-white, charcoal and muted-blue palette, responsive layouts, native scrolling, accessible navigation and gallery dialogs.
- Evidence-led case studies and a runnable reporting-automation example explicitly labelled synthetic.
- Corrected Telco evaluation: train-only preprocessing, independent test split, baseline comparison and saved metrics.
- Corrected Enron sender/recipient membership and distinct-message counting, with regression fixtures and cleared stale notebook output.
- Public enquiries insert without reading private records, validated field mappings and clear error states.
- Owner-only administrative database policies, checked with anonymous/non-owner/owner requests in a rolled-back transaction. Owner sessions must sign in again to refresh server-managed role claims.
- Meaningful unavailable states, real 404 responses, legacy URL redirects and page-specific metadata.
- Responsive WebP previews: the three original featured thumbnails totalled 3.74 MB; 1200-pixel variants total about 322 KB. This is an asset-size measurement, not a Core Web Vitals score.

## Validation
TypeScript checking and production build pass. Enquiry validation, analytical regression tests and pipeline rerun/error tests pass. Browser checks cover desktop/mobile layouts, enquiry validation and intent fields, mobile menu dismissal, keyboard gallery activation and Escape dismissal. Route checks cover primary pages, résumé, 404 and legacy redirects. Database checks leave no test enquiry behind.

## Evidence still needed
The original Enron SQLite database was not supplied, so full-corpus numerical results cannot be recomputed. Original Power BI source/model/DAX and source-data documentation are needed for model-grain and reconciliation verification. Course entries are shown as learning rather than verified vendor certifications. No commercial outcomes, testimonials or client claims were invented.

## Operations
The access-control change was applied to the existing Supabase project. docs/access-control.sql records its authorization function and policies; owner bootstrap was kept out of public source. docs/access-control-validation.sql contains the rollback-only validation. The stored app_metadata role controls admin access; never use editable user_metadata for authorization.

Sources: [Supabase RLS](https://supabase.com/docs/guides/database/postgres/row-level-security), [Anthropic Fable](https://www.anthropic.com/claude/fable), [Anthropic Mythos](https://www.anthropic.com/claude/mythos).

The final security scan also led to a fixed search path for the timestamp trigger and removal of public execution rights on the internal RLS event trigger. Two unused service relationship tables remain protected by RLS with no access policies. Supabase [leaked-password protection](https://supabase.com/docs/guides/auth/password-security#password-strength-and-leaked-password-protection) remains disabled in the existing Auth configuration.
