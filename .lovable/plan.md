# Backend for Projects + Admin Consolidation

## What's already done (no work needed)
- **Leads** — `leads` table + RLS + Contact form submission + Admin Inbox tab with status workflow (new → contacted → qualified → won/lost).
- **Insights blog** — `posts` table + RLS + public listing/detail + full Admin editor (markdown, slug, SEO, cover, tags, draft/publish).
- **Auth & roles** — Email/password + Google sign-in, `user_roles` table with `has_role()` security definer, admin gate on `/admin`.

## What this plan adds: Projects CMS

Right now `src/data/caseStudies.ts` is a static file. You can't add/edit projects without a code change. We'll move it to the database so you manage everything from `/admin`.

### 1. Database (`projects` table)
New table mirroring the `CaseStudy` shape:

- `slug` (unique), `title`, `client`, `tag`, `year`, `duration`, `role`
- `impact` (one-line headline)
- `cover_url` (main image)
- `problem` (text), `approach` (text[]), `outcomes` (text[])
- `stack` (text[]), `metrics` (jsonb — `[{label, value}]`), `gallery` (text[] of URLs)
- `status` (draft | published), `sort_order` (int), `published_at`
- Standard `id`, `created_at`, `updated_at` + auto-touch trigger

**RLS**:
- Public can read only `status = 'published'`
- Admins/editors can do everything (reuses existing `has_role()`)

### 2. Storage bucket for project images
- New public bucket `project-media` so you can upload cover + gallery images from the admin (no more pasting external URLs).
- Admin-only write, public read.

### 3. Server functions (`src/lib/`)
- `projects.functions.ts` — `listPublishedProjects()`, `getProjectBySlug(slug)` (public, used by `/work` and `/work/$slug`)
- `admin-projects.functions.ts` — `listAllProjects()`, `getProjectForEdit(id)`, `upsertProject(data)`, `deleteProject(id)`, `uploadProjectImage(file)` (admin-gated)

### 4. Frontend
- `src/components/site/Work.tsx` + `src/routes/work.tsx` + `src/routes/work.$slug.tsx` → switch from importing `caseStudies` to calling the server fns via `useQuery`.
- Delete `src/data/caseStudies.ts` after migration (seed its 4 entries into the DB so the site doesn't go blank).
- `src/routes/admin.tsx` — add a third tab **"Projects"** next to Inbox / Insights with:
  - List view (cover thumb, title, status pill, edit/delete)
  - Editor with all fields above, image uploader, repeatable rows for approach/outcomes/metrics/gallery, draft/publish toggle.

### 5. Form data collection (already working — confirming)
The Contact form already inserts into `leads` and appears in the Admin Inbox. No changes needed unless you want extra fields (e.g. phone, preferred timeline). Tell me if you want any added.

## Technical notes
- Following the existing `*.functions.ts` + `requireSupabaseAuth` pattern — no new infrastructure.
- Seeding the 4 existing case studies as a one-time `INSERT` in the same migration so `/work` keeps rendering during the cutover.
- Image uploads go through a server function (admin-gated) → Supabase Storage → returns public URL stored on the project row.

## Out of scope (ask if you want any)
- Rich-text/MDX editor for project body (current plan uses the same structured fields as today).
- Multi-language content.
- Analytics dashboard inside admin.
- Drag-and-drop reordering UI (we'll use a numeric `sort_order` field; can upgrade later).
