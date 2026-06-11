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

export function mapProjectRow(row: any): Project {
  if (!row) return row;
  
  const parseArray = (val: any): any[] => {
    if (Array.isArray(val)) return val;
    if (typeof val === "string" && val.trim()) {
      try {
        const parsed = JSON.parse(val);
        return Array.isArray(parsed) ? parsed : [val];
      } catch (e) {
        return [val];
      }
    }
    return [];
  };

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

export async function getProjects(): Promise<Project[]> {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("status", "published")
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("Error fetching projects:", error);
    throw error;
  }
  return (data || []).map(mapProjectRow);
}

export async function getFeaturedProjects(): Promise<Project[]> {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("status", "published")
    .eq("featured", true)
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("Error fetching featured projects:", error);
    throw error;
  }
  return (data || []).map(mapProjectRow);
}

export async function getPosts(): Promise<Post[]> {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("status", "published")
    .order("published_at", { ascending: false });

  if (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
  console.log("Fetched posts", data);
  return data || [];
}

export async function getExperience(): Promise<Experience[]> {
  const { data, error } = await supabase
    .from("experience")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("Error fetching experience:", error);
    throw error;
  }
  console.log("Fetched experience", data);
  return data || [];
}

export async function getSkills(): Promise<Skill[]> {
  const { data, error } = await supabase
    .from("skills")
    .select("*")
    .order("category", { ascending: true })
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("Error fetching skills:", error);
    throw error;
  }
  console.log("Fetched skills", data);
  return data || [];
}

export async function getCertifications(): Promise<Certification[]> {
  const { data, error } = await supabase
    .from("certifications")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("Error fetching certifications:", error);
    throw error;
  }
  console.log("Fetched certifications", data);
  return data || [];
}

export async function getServices(): Promise<Service[]> {
  const { data, error } = await supabase
    .from("services")
    .select("*")
    .eq("is_active", true)
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("Error fetching services:", error);
    throw error;
  }
  console.log("Fetched services", data);
  return data || [];
}

export async function createLead(formData: LeadInput): Promise<any> {
  if (!formData.name?.trim()) throw new Error("Name is required.");
  if (!formData.email?.trim()) throw new Error("Email is required.");
  if (!formData.message?.trim()) throw new Error("Message is required.");

  let mappedBudget: "under_5k" | "5k_15k" | "15k_50k" | "50k_plus" | "not_sure" | null = null;
  if (formData.budget) {
    const b = formData.budget.toLowerCase().replace(/\s/g, "");
    if (b.includes("under500") || b.includes("500-1,000") || b.includes("1,000-3,000") || b === "under_5k" || b.includes("under5k")) {
      mappedBudget = "under_5k";
    } else if (b.includes("3,000+") || b.includes("5k_15k") || b.includes("5k-15k")) {
      mappedBudget = "5k_15k";
    } else if (b.includes("15k") || b.includes("15k_50k")) {
      mappedBudget = "15k_50k";
    } else if (b.includes("50k") || b.includes("50k_plus")) {
      mappedBudget = "50k_plus";
    } else if (b.includes("notsure") || b.includes("notsureyet")) {
      mappedBudget = "not_sure";
    }
  }

  const { data, error } = await supabase
    .from("leads")
    .insert([
      {
        name: formData.name.trim(),
        email: formData.email.trim(),
        company: formData.company?.trim() || null,
        project_type: formData.project_type || null,
        budget: mappedBudget,
        message: formData.message.trim(),
        status: "new",
      },
    ])
    .select();

  if (error) {
    throw error;
  }
  return data?.[0] || null;
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  if (!slug) throw new Error("Slug is required.");
  const { data, error } = await supabase
    .from("posts")
    .select(
      "id, title, slug, excerpt, body_md, category, tags, cover_url, status, published_at, created_at, updated_at",
    )
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle();

  if (error) {
    console.error("Failed to fetch post:", error);
    throw error;
  }

  return data;
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  if (!slug) throw new Error("Slug is required.");
  const { data, error } = await supabase
    .from("services")
    .select("*")
    .eq("slug", slug)
    .eq("is_active", true)
    .maybeSingle();

  if (error) {
    console.error("Failed to fetch service:", error);
    throw error;
  }

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

  if (error) {
    console.error("Failed to fetch project:", error);
    throw error;
  }

  return data ? mapProjectRow(data) : null;
}
