
# Haidar Analytics — Full-Stack Agency Site

Goal: turn the current single-page portfolio into a premium, full-stack analytics agency website with Zain as founder. Dark cinematic SaaS aesthetic, multi-page SSR for SEO, real lead capture, and a CMS-driven Insights blog — all powered by Lovable Cloud.

---

## 1. Brand & positioning

- **Name:** Haidar Analytics (suggested — easy to swap)
- **Tagline:** "Data, BI & AI analytics for ambitious teams."
- **Founder lockup:** "Founded by Zain Haidar — Vienna" present in nav, footer, About.
- Logo wordmark in Fraunces + small mono mark; favicon, OG image generated.

---

## 2. Information architecture (multi-page SSR)

Each route gets its own `head()` with unique title, description, OG tags.

```
/                 Home — hero, proof, services teaser, featured work, CTA
/services         Full service catalog + engagement model + pricing tiers
/work             Case study index (cards from DB-backed or static list)
/work/$slug       Existing case study template (restyled dark)
/about            Studio story + founder (Zain) + values + Vienna
/insights         Blog index (categories, search, pagination)
/insights/$slug   Article page (cover, TOC, author, related)
/contact          Lead form + calendar + details
/admin            Auth-gated inbox + posts manager (Zain only)
/login            Email/password + Google login
```

Hash anchors removed from primary nav. Existing section components are reused inside the relevant route.

---

## 3. Visual redesign — Dark cinematic SaaS

Token overhaul in `src/styles.css`:

- **Background:** near-black `oklch(0.12 0.02 260)` with subtle navy gradient + grain
- **Surface/glass:** translucent slate with 1px hairline borders
- **Primary accent:** electric cyan / violet (`oklch(0.78 0.18 230)`), used sparingly for CTAs, KPI numerals, chart strokes
- **Text:** off-white body, muted slate for secondary
- **Typography:** keep Fraunces display + Inter body, add JetBrains Mono for KPI/numeric overlays
- **Motion:** framer-motion — cinematic hero reveal, scroll-linked parallax on case study covers, shimmer on KPI counters, magnetic CTA buttons, marquee at reduced opacity
- **Decorative data:** animated SVG line charts, faint grid backgrounds, KPI tickers in hero — "data-as-decoration"
- New components: `KpiCounter`, `LiveChartBackdrop`, `GradientBorderCard`, `SectionDivider`

All shadcn components re-themed via tokens; no hardcoded colors in components.

---

## 4. Backend (Lovable Cloud)

Enable Cloud, then provision:

### Tables
- `profiles` (id → auth.users, full_name, avatar_url) + auto-create trigger
- `user_roles` (id, user_id, role enum: admin|editor) + `has_role()` security-definer fn
- `leads` (id, name, email, company, budget, project_type, message, source, created_at, status enum: new|contacted|won|lost)
- `posts` (id, slug unique, title, excerpt, cover_url, body_md, category, tags[], author_id, status enum: draft|published, published_at, seo_title, seo_description, created_at, updated_at)
- `post_views` (id, post_id, created_at) — lightweight analytics

### RLS
- `leads`: insert open to anon (rate-limited via server fn); select/update only `has_role(uid,'admin')`
- `posts`: select published to anon; full CRUD for admin/editor
- `profiles`: self read/update; admin read all
- `user_roles`: select self; mutate admin only

### Server functions (`createServerFn`)
- `submitLead` — Zod-validated, inserts into `leads`, sends notification email to Zain
- `listLeads` / `updateLeadStatus` — admin only via `requireSupabaseAuth` + role check
- `listPublishedPosts(category?, page?)`, `getPostBySlug`, `listAllPosts` (admin), `upsertPost`, `deletePost`
- `incrementPostView`

### Email (Lovable Email)
- Set up sender domain (prompt user via setup dialog)
- Auth emails: confirmation, password reset, magic link
- Transactional: new-lead notification to Zain + auto-reply to lead
- Newsletter-ready (optional later)

### Auth
- Email/password + Google sign-in
- `_authenticated` layout protects `/admin/*`
- Seed Zain's email as `admin` in `user_roles` (manual insert post-signup)

---

## 5. Page-by-page content

- **Home:** cinematic hero with animated KPI tiles ("8 yrs · 40+ projects · 9-figure data moved"), trust marquee, 4 featured case studies, services preview, testimonial slider, CTA band
- **Services:** 9 services as detailed cards with deliverables, timeline, ideal client, then 3 engagement tiers (Sprint / Retainer / Embedded) with starting prices, FAQ accordion
- **Work:** filterable grid (industry, service), each card links to existing `/work/$slug`
- **About:** studio story, founder bio with portrait, values, process (Discover → Model → Ship → Operate), Vienna + remote globally, hiring/collab note
- **Insights:** blog index — featured post, category chips, grid, pagination; article page with reading time, TOC, author card, related posts, share, JSON-LD `Article` schema
- **Contact:** form (name, email, company, project type select, budget select, message), inline validation, success state, calendar embed slot, direct email/LinkedIn
- **Admin:** sidebar nav → Inbox (leads table with status, notes, CSV export) + Posts (list, create/edit with markdown editor + cover upload to Storage, publish toggle)

---

## 6. SEO & performance

- Per-route `head()` with title/description/OG/Twitter
- JSON-LD: `Organization` (root), `Person` (about), `Article` (insights), `Service` (services)
- `sitemap.xml` + `robots.txt` server routes (dynamic from published posts)
- OG image generated for each post (static cover for now)
- Lazy-loaded images, font preload (already in place), prefetch on link intent
- Lighthouse target: 95+ across the board

---

## 7. Build order

1. Enable Lovable Cloud + email domain setup dialog
2. Migrations: profiles, user_roles, leads, posts, post_views + RLS + trigger
3. Restyle tokens → dark cinematic; refactor shared components (Nav, Footer, SectionHeader, glass utilities)
4. Split routes: create `/services`, `/work`, `/about`, `/insights`, `/contact`, `/login`; keep `/` as landing
5. New components: KpiCounter, LiveChartBackdrop, GradientBorderCard, motion primitives
6. Lead form + `submitLead` server fn + email notification
7. Auth (email + Google) + `_authenticated` guard + admin shell
8. Admin inbox + posts CMS (markdown editor, cover upload, publish flow)
9. Insights public pages (index + article + JSON-LD + sitemap)
10. SEO polish: per-route metadata, OG, sitemap/robots, perf pass
11. QA: responsive (mobile/tablet/desktop), nav, dark contrast, form validation, RLS

---

## Notes for the user

- Lovable Cloud will be enabled on first build — gives database, auth, storage, email, server functions in one click.
- For branded emails (lead notifications + auth), you'll be asked to point one DNS subdomain (e.g. `notify.haidaranalytics.com`) at Lovable.
- After signup, I'll mark your account as `admin` so you can access `/admin`.
- Agency name is a placeholder — tell me the final brand name (or keep "Haidar Analytics") before step 3 so I theme the logo correctly.

This is a big build — I'll ship it in the order above, pausing after each major milestone so you can review.
