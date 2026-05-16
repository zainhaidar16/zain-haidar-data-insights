
-- Projects table
CREATE TYPE public.project_status AS ENUM ('draft', 'published');

CREATE TABLE public.projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  title text NOT NULL,
  client text,
  tag text,
  year text,
  duration text,
  role text,
  impact text,
  cover_url text,
  problem text NOT NULL DEFAULT '',
  approach text[] NOT NULL DEFAULT '{}',
  outcomes text[] NOT NULL DEFAULT '{}',
  stack text[] NOT NULL DEFAULT '{}',
  metrics jsonb NOT NULL DEFAULT '[]'::jsonb,
  gallery text[] NOT NULL DEFAULT '{}',
  status public.project_status NOT NULL DEFAULT 'draft',
  sort_order integer NOT NULL DEFAULT 0,
  published_at timestamptz,
  author_id uuid,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX projects_status_sort_idx ON public.projects (status, sort_order, published_at DESC);
CREATE INDEX projects_slug_idx ON public.projects (slug);

ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "projects public read published"
ON public.projects FOR SELECT
TO anon, authenticated
USING (status = 'published' OR public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'editor'));

CREATE POLICY "projects admin write"
ON public.projects FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'editor'))
WITH CHECK (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'editor'));

CREATE TRIGGER projects_touch_updated_at
BEFORE UPDATE ON public.projects
FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

-- Storage bucket for project media
INSERT INTO storage.buckets (id, name, public)
VALUES ('project-media', 'project-media', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "project-media public read"
ON storage.objects FOR SELECT
TO anon, authenticated
USING (bucket_id = 'project-media');

CREATE POLICY "project-media admin insert"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'project-media' AND (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'editor')));

CREATE POLICY "project-media admin update"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'project-media' AND (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'editor')));

CREATE POLICY "project-media admin delete"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'project-media' AND (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'editor')));

-- Seed existing case studies
INSERT INTO public.projects (slug, title, client, tag, year, duration, role, impact, cover_url, problem, approach, outcomes, stack, metrics, gallery, status, sort_order, published_at) VALUES
(
  'executive-kpi-retail',
  'Executive KPI Dashboard for Multi-Brand Retailer',
  'European retail group (120 stores)',
  'Power BI · Retail',
  '2024',
  '10 weeks',
  'Lead BI Consultant',
  '+18% margin visibility · 120 stores onboarded',
  'https://hhedhtftmvelgbkcuwaq.supabase.co/storage/v1/object/public/project-media/seed/project-powerbi.jpg',
  'Regional managers were stitching weekly performance from 6+ exports — slow, inconsistent and blind to margin leaks at the SKU level.',
  ARRAY[
    'Audited existing reporting, KPI definitions and stakeholder interviews across finance, ops and merchandising.',
    'Modeled a star schema in SQL Server with conformed dimensions for store, product and calendar.',
    'Built an executive Power BI workspace with row-level security for region/store managers.',
    'Automated daily refresh through Azure Data Factory and added anomaly callouts in DAX.'
  ],
  ARRAY[
    'Single source of truth for sales, margin and inventory across all 120 stores.',
    'Reporting cycle dropped from 4 days to 1 hour.',
    'Margin leaks caught earlier — projected +18% margin visibility in first quarter.'
  ],
  ARRAY['Power BI','SQL Server','DAX','Azure Data Factory','Power Query'],
  '[{"label":"Refresh time","value":"4d → 1h"},{"label":"Stores onboarded","value":"120"},{"label":"Reports retired","value":"27"},{"label":"Active users","value":"180+"}]'::jsonb,
  ARRAY[
    'https://hhedhtftmvelgbkcuwaq.supabase.co/storage/v1/object/public/project-media/seed/project-powerbi.jpg',
    'https://hhedhtftmvelgbkcuwaq.supabase.co/storage/v1/object/public/project-media/seed/project-customer.jpg'
  ],
  'published', 10, now()
),
(
  'patient-demand-forecasting',
  'Patient Demand Forecasting with LLM Insights',
  'Private healthcare network',
  'AI Analytics · Healthcare',
  '2024',
  '14 weeks',
  'AI Analytics Lead',
  '92% MAPE accuracy · automated weekly briefings',
  'https://hhedhtftmvelgbkcuwaq.supabase.co/storage/v1/object/public/project-media/seed/project-ai.jpg',
  'Clinical operations teams were over- and under-staffing departments due to noisy, manual demand forecasts and zero narrative context for non-technical leaders.',
  ARRAY[
    'Engineered a clean feature store on Databricks with seasonality, holidays and local events.',
    'Trained gradient-boosted and temporal-fusion models, tracked via MLflow.',
    'Wrapped forecasts with an LLM layer that turns numbers into a weekly executive briefing.',
    'Delivered as an embedded Power BI report with drill-through to model rationale.'
  ],
  ARRAY[
    'Reached 92% MAPE accuracy on 12-week rolling forecasts.',
    'Weekly executive briefing fully automated — saved ~6 analyst hours per week.',
    'Adopted by 4 departments within the first quarter.'
  ],
  ARRAY['Python','PyTorch','Databricks','OpenAI','MLflow','Power BI'],
  '[{"label":"Forecast accuracy","value":"92% MAPE"},{"label":"Analyst hours saved","value":"6 / week"},{"label":"Departments live","value":"4"},{"label":"Models in prod","value":"7"}]'::jsonb,
  ARRAY[
    'https://hhedhtftmvelgbkcuwaq.supabase.co/storage/v1/object/public/project-media/seed/project-ai.jpg',
    'https://hhedhtftmvelgbkcuwaq.supabase.co/storage/v1/object/public/project-media/seed/project-powerbi.jpg'
  ],
  'published', 20, now()
),
(
  'lakehouse-modernization',
  'ETL Pipeline & Lakehouse Modernization',
  'Fintech scale-up',
  'Data Engineering · Finance',
  '2023',
  '16 weeks',
  'Data Engineering Consultant',
  '8h → 12min refresh · single source of truth',
  'https://hhedhtftmvelgbkcuwaq.supabase.co/storage/v1/object/public/project-media/seed/project-etl.jpg',
  'An ageing nightly batch took 8+ hours, blocked morning reporting and constantly broke when source schemas changed.',
  ARRAY[
    'Migrated raw ingestion to Fivetran with monitored connectors.',
    'Rebuilt transformations in dbt with tests, snapshots and clear marts per domain.',
    'Orchestrated everything in Airflow with backfills and SLAs.',
    'Provisioned Snowflake warehouses with cost guardrails via Terraform.'
  ],
  ARRAY[
    'Refresh dropped from 8h to 12 minutes end-to-end.',
    'Data incidents fell ~70% thanks to dbt tests and alerting.',
    'Finance, growth and product all consume from the same governed marts.'
  ],
  ARRAY['Snowflake','dbt','Airflow','Python','Fivetran','Terraform'],
  '[{"label":"Refresh time","value":"8h → 12m"},{"label":"Incidents","value":"−70%"},{"label":"dbt models","value":"210+"},{"label":"Cost / month","value":"−32%"}]'::jsonb,
  ARRAY[
    'https://hhedhtftmvelgbkcuwaq.supabase.co/storage/v1/object/public/project-media/seed/project-etl.jpg',
    'https://hhedhtftmvelgbkcuwaq.supabase.co/storage/v1/object/public/project-media/seed/project-powerbi.jpg'
  ],
  'published', 30, now()
),
(
  'cohort-retention-ltv',
  'Cohort, Retention & LTV Analytics Platform',
  'B2C SaaS (Series B)',
  'Customer Analytics · SaaS',
  '2025',
  '8 weeks',
  'Analytics Lead',
  '−24% churn · 4 segments activated',
  'https://hhedhtftmvelgbkcuwaq.supabase.co/storage/v1/object/public/project-media/seed/project-customer.jpg',
  'Product and growth teams couldn''t agree on what ''churn'' meant. Cohorts and LTV lived in spreadsheets nobody trusted.',
  ARRAY[
    'Aligned definitions for active user, churn and LTV with product, growth and finance.',
    'Modeled events in BigQuery with versioned SQL and reproducible cohort logic.',
    'Built an interactive Tableau platform: cohort heatmaps, retention curves, LTV by segment.',
    'Shipped a lightweight churn-risk model that powers in-app interventions.'
  ],
  ARRAY[
    'Churn down 24% in the first 90 days post-launch.',
    '4 high-value segments activated with targeted lifecycle journeys.',
    'Single trusted definition of LTV adopted across the company.'
  ],
  ARRAY['SQL','Python','Tableau','GCP BigQuery','Segment'],
  '[{"label":"Churn","value":"−24%"},{"label":"Segments live","value":"4"},{"label":"LTV uplift","value":"+19%"},{"label":"Decision latency","value":"−60%"}]'::jsonb,
  ARRAY[
    'https://hhedhtftmvelgbkcuwaq.supabase.co/storage/v1/object/public/project-media/seed/project-customer.jpg',
    'https://hhedhtftmvelgbkcuwaq.supabase.co/storage/v1/object/public/project-media/seed/project-ai.jpg'
  ],
  'published', 40, now()
);
