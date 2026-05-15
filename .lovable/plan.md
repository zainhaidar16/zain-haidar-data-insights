## The honest reframe

Your answer to "who's the audience" — *people looking for a Data Analyst or Power BI Specialist* — changes everything. This isn't an agency selling 5-figure projects. It's a **personal portfolio for hiring managers and recruiters** (and the occasional freelance gig).

That means the current setup is fighting itself:
- Agency brand "Haidar Analytics" + "Booking Q3 — 2 slots left" + 9 service tiles = pretends to be a studio
- But the buyer is a recruiter scanning for: *can this person do the job, and can I see proof in 30 seconds?*

Recruiters and hiring managers don't want cinematic gradients. They want: **name, role, location, stack, 3 real projects with screenshots and numbers, a CV, a way to contact you.** That's it.

We'll rebuild around that, using the **Editorial Light** direction (off-white, serif headlines, real dashboard screenshots).

---

## New positioning

- **Name on top of the site:** *Zain Haidar* (your name, not "Haidar Analytics")
- **Tagline:** *Power BI & Data Analyst — Vienna. I turn messy business data into dashboards executives actually use.*
- **Sub:** Open to full-time Data Analyst / BI roles in Vienna & remote EU. Selective freelance.
- One primary CTA: **Download CV** • Secondary: **See dashboards** • Tertiary: **Email me**

No "Booking Q3 slots." No 9-service grid. No fake KPI tiles.

---

## New site structure (smaller, sharper)

```
/                 Home — hero, 3 featured dashboards, skills strip, contact
/work             All case studies (real Power BI dashboards with screenshots + DAX snippets)
/work/$slug       Single case study — problem, approach, screenshot, DAX/SQL highlights, outcome
/about            Story, education, certifications, photo
/insights         (kept) — Power BI / DAX / analytics articles, drives SEO + authority
/contact          Simple form + email + LinkedIn + CV download
/admin            (kept) lead inbox + posts CMS
/login            (kept)
```

Drop `/services` as a separate page — fold into Home as a short list.

---

## Visual system overhaul — "Editorial Light"

Replace the entire dark cinematic theme:

- **Background:** `#fafaf7` (warm off-white), foreground `#1a1a1a`
- **Accent:** `#c9a227` (warm ochre/gold) used sparingly — links, underlines, small marks
- **Secondary:** `#5a6b5a` (muted sage) for tags and meta
- **Typography:** Keep Fraunces for display headings (it's perfect for editorial), Inter for body, **JetBrains Mono** for DAX/SQL snippets and metadata (dates, tags, KPIs)
- **No glass cards, no mesh gradients, no grid pattern, no glow shadows, no animated chart backdrop**
- Replace with: generous whitespace, hairline rules (`1px solid #e8e4dd`), large serif headlines, real screenshots in soft-shadowed frames
- Layout: narrow editorial column for prose (max ~680px), full-width only for hero and dashboard screenshots
- Animation: minimal — fade/slide on scroll only, no parallax, no animated counters

Update `src/styles.css` tokens, remove `body::before`/`body::after` decorative pseudo-elements, retune `.glass`/`shadow-glow` to neutral editorial equivalents (or remove entirely).

---

## Content rewrite (the part that actually wins jobs)

### Hero
> **Zain Haidar**
> Power BI & Data Analyst — Vienna
>
> I help mid-sized businesses turn scattered spreadsheets and ERP exports into Power BI dashboards their executives actually open on Monday morning. Currently MS Computer Science @ University of Vienna, open to Data Analyst / BI Developer roles.
>
> [Download CV] [See dashboards] [Email me]
>
> Stack: Power BI · DAX · SQL Server · Azure · Python · dbt

### Featured work (3 real dashboards, not 6 placeholders)
For each: **screenshot**, problem (1 line), what you built (2–3 lines), tools, **measurable outcome** ("cut weekly reporting from 6h → 20min"). Real client names since you said you have them.

### Skills strip
Grouped, honest, with proficiency:
- **Expert:** Power BI, DAX, SQL, Excel
- **Proficient:** Python (pandas), Azure Data Factory, dbt
- **Familiar:** Snowflake, Fabric, Databricks

### About
Short. Photo. Story in 3 paragraphs. Education + Microsoft certifications (PL-300 if you have it — if not, signal you're working toward it).

### Footer
Email · LinkedIn · GitHub · CV · Vienna, Austria

---

## What gets deleted

- `LiveChartBackdrop.tsx` (decorative noise)
- `KpiTile.tsx` animated counters (replaced with plain text under hero)
- Marquee strip (or repurposed as "Tools I work with" — quieter, no animation)
- Mesh gradient + grid pattern background
- All `glass` / `glass-strong` cards
- "Booking Q3 — 2 slots left" pill
- `/services` route (folded into home)
- Gradient text on headlines

---

## What stays

- Lovable Cloud backend, leads table, posts CMS, admin dashboard, auth — all functional, untouched
- Insights/blog system — but restyled to match editorial direction
- Routing structure (TanStack file-based routes)
- Lead capture form on `/contact`

---

## Order of work

1. Rewrite `src/styles.css` — new light tokens, remove dark decorative layers
2. Rewrite Hero, Nav, Footer for editorial light system + new copy
3. Rewrite Work component + case study template with real screenshots layout
4. Rewrite About + Skills with honest, grouped content
5. Restyle Contact, Insights index, single Insight page to match
6. Restyle `/admin` and `/login` for consistency (still functional)
7. Delete unused decorative components
8. Add `/cv.pdf` placeholder + Download CV buttons
9. Verify responsive on mobile, check build

---

## What I need from you before I start building

1. **3 real dashboards** I can feature (screenshots + 1 paragraph each + the outcome metric). If you can drop them into the chat I'll wire them in. If not, I'll build with high-quality placeholders clearly marked "[Replace with your screenshot]."
2. **Your CV as PDF** to put behind the Download CV button (or I'll wire the button to a placeholder).
3. **A photo** for the About page (or I'll leave a placeholder).
4. **Real client names** you're cleared to publish (or "Anonymized: a Vienna-based retailer" style).
5. Your **LinkedIn URL** and **GitHub URL** for the footer.

If you give me items 1–5 now I'll integrate them. If not, I'll build the new structure with clearly-marked placeholders and you can swap them in later — either way the visual + structural overhaul moves forward.

**Approve this plan and I'll start with the styles.css rewrite + new Hero, then work through the rest.**