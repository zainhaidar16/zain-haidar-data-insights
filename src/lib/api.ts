import { supabase } from "./supabase";

export interface Project {
  id: string;
  title: string;
  slug: string;
  category: string;
  short_description: string;
  description?: string;
  problem?: string;
  approach?: string[];
  outcome?: string[];
  technologies: string[];
  metrics: Array<{ label: string; value: string }>;
  image_url?: string;
  featured: boolean;
  status: "draft" | "published";
  sort_order: number;
  created_at?: string;
  updated_at?: string;
  hero_title?: string;
  hero_description?: string;
  project_goal?: string;
  data_sources?: string[];
  key_features?: string[];
  challenges?: string[];
  solution_steps?: Array<{ title: string; description: string }>;
  business_impact?: string[];
  gallery?: Array<{ image_url: string; alt_text?: string; caption?: string }>;
  github_url?: string;
  live_url?: string;
  study_type?: string;
  contribution?: string;
  findings?: Array<{ title: string; detail: string }>;
  recommendation?: string;
  limitations?: string[];
  evidence_links?: Array<{ label: string; url: string }>;
  source_note?: string;
  period_note?: string;
}

export interface Service {
  id: string;
  title: string;
  slug: string;
  short_description: string;
  icon?: string;
  sort_order: number;
  is_active: boolean;
  hero_title?: string | null;
  hero_description?: string | null;
  full_description?: string | null;
  problems_solved?: string[] | null;
  deliverables?: string[] | null;
  benefits?: string[] | null;
  technologies?: string[] | null;
  process_steps?: Array<{ title: string; description: string }> | null;
  faq?: Array<{ question: string; answer: string }> | null;
  cta_title?: string | null;
  cta_description?: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  location: string;
  start_year: string;
  end_year?: string;
  is_current: boolean;
  description: string;
  bullet_points: string[];
  sort_order?: number;
  created_at?: string;
  updated_at?: string;
}

export interface Skill {
  id: string;
  name: string;
  category: string;
  sort_order: number;
  created_at?: string;
  level?: number | null;
}

export interface Certification {
  id: string;
  title: string;
  provider: string;
  category: string;
  credential_url?: string;
  sort_order: number;
  created_at?: string;
}

export interface BlogSection {
  heading: string;
  content: string;
}

export interface BlogGalleryImage {
  image_url: string;
  alt_text?: string;
  caption?: string;
}

export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  body_md: string;
  category?: string;
  tags: string[];
  cover_url?: string;
  status: "draft" | "published";
  published_at?: string;
  created_at?: string;
  updated_at?: string;
  hero_title?: string | null;
  hero_description?: string | null;
  featured?: boolean;
  author_name?: string | null;
  reading_time?: string | null;
  seo_title?: string | null;
  seo_description?: string | null;
  key_takeaways?: string[];
  sections?: BlogSection[];
  related_services?: string[];
  gallery?: BlogGalleryImage[];
}

export interface LeadInput {
  name: string;
  email: string;
  company?: string | null;
  project_type?: string | null;
  budget?: string | null;
  message: string;
  status?: string;
}

function parseArray<T = any>(val: any): T[] {
  if (Array.isArray(val)) return val;
  if (typeof val === "string" && val.trim()) {
    try {
      const parsed = JSON.parse(val);
      return Array.isArray(parsed) ? parsed : [val as T];
    } catch {
      return [val as T];
    }
  }
  return [];
}

export function mapProjectRow(row: any): Project {
  if (!row) return row;
  return {
    ...row,
    approach: parseArray(row.approach),
    outcome: parseArray(row.outcome),
    technologies: parseArray(row.technologies),
    metrics: parseArray(row.metrics),
    data_sources: parseArray(row.data_sources),
    key_features: parseArray(row.key_features),
    challenges: parseArray(row.challenges),
    solution_steps: parseArray(row.solution_steps),
    business_impact: parseArray(row.business_impact),
    gallery: parseArray(row.gallery),
  };
}

export function mapPostRow(row: any): Post {
  if (!row) return row;
  return {
    ...row,
    tags: parseArray<string>(row.tags),
    key_takeaways: parseArray<string>(row.key_takeaways),
    sections: parseArray<BlogSection>(row.sections),
    related_services: parseArray<string>(row.related_services),
    gallery: parseArray<BlogGalleryImage>(row.gallery),
  };
}

export async function getProjects(): Promise<Project[]> {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("status", "published")
    .order("sort_order", { ascending: true });

  if (error) throw error;
  return (data || []).map(mapProjectRow);
}

export async function getFeaturedProjects(limit?: number): Promise<Project[]> {
  let query = supabase
    .from("projects")
    .select("*")
    .eq("status", "published")
    .eq("featured", true)
    .order("sort_order", { ascending: true });

  if (limit) query = query.limit(limit);

  const { data, error } = await query;
  if (error) throw error;
  return (data || []).map(mapProjectRow);
}

export async function getPosts(): Promise<Post[]> {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("status", "published")
    .order("featured", { ascending: false })
    .order("published_at", { ascending: false, nullsFirst: false })
    .order("created_at", { ascending: false });

  if (error) throw error;
  return (data || []).map(mapPostRow);
}

export async function getExperience(): Promise<Experience[]> {
  const { data, error } = await supabase
    .from("experience")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) throw error;
  return data || [];
}

export async function getSkills(): Promise<Skill[]> {
  const { data, error } = await supabase
    .from("skills")
    .select("*")
    .order("category", { ascending: true })
    .order("sort_order", { ascending: true });

  if (error) throw error;
  return data || [];
}

export async function getCertifications(): Promise<Certification[]> {
  const { data, error } = await supabase
    .from("certifications")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) throw error;
  return data || [];
}

export async function getServices(): Promise<Service[]> {
  const { data, error } = await supabase
    .from("services")
    .select("*")
    .eq("is_active", true)
    .order("sort_order", { ascending: true });

  if (error) throw error;
  return data || [];
}

/** Compatibility path for callers outside the enquiry form; never requests private rows. */
export async function createLead(formData: LeadInput): Promise<{ ok: true }> {
  if (!formData.name?.trim() || !formData.email?.trim() || !formData.message?.trim()) throw new Error("Name, email and message are required.");
  const allowed = ["under_5k", "5k_15k", "15k_50k", "50k_plus", "not_sure"];
  if (formData.budget && !allowed.includes(formData.budget)) throw new Error("Choose a valid budget range.");
  const { error } = await supabase.from("leads").insert({ name: formData.name.trim(), email: formData.email.trim(), company: formData.company?.trim() || null, project_type: formData.project_type || null, budget: formData.budget || null, message: formData.message.trim(), status: "new" });
  if (error) throw error;
  return { ok: true };
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  if (!slug) throw new Error("Slug is required.");
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle();

  if (error) throw error;
  return data ? mapPostRow(data) : null;
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  if (!slug) throw new Error("Slug is required.");
  const { data, error } = await supabase
    .from("services")
    .select("*")
    .eq("slug", slug)
    .eq("is_active", true)
    .maybeSingle();

  if (error) throw error;
  return data;
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  if (!slug) throw new Error("Slug is required.");
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle();

  if (error) throw error;
  return data ? mapProjectRow(data) : null;
}

export async function getActiveServices(limit?: number): Promise<Service[]> {
  let query = supabase
    .from("services")
    .select("*")
    .eq("is_active", true)
    .order("sort_order", { ascending: true });

  if (limit) query = query.limit(limit);

  const { data, error } = await query;
  if (error) throw error;
  return data ?? [];
}


export async function getLatestBlogPosts(limit?: number): Promise<Post[]> {
  let query = supabase
    .from("posts")
    .select("*")
    .eq("status", "published")
    .order("published_at", { ascending: false, nullsFirst: false })
    .order("created_at", { ascending: false });

  if (limit) query = query.limit(limit);

  const { data, error } = await query;
  if (error) throw error;
  return (data || []).map(mapPostRow);
}
