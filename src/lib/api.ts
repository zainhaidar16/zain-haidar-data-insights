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
}

export interface Service {
  id: string;
  title: string;
  slug: string;
  short_description: string;
  icon?: string;
  sort_order: number;
  is_active: boolean;
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
  company?: string;
  project_type?: string;
  budget?: string;
  message: string;
  status?: string;
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
  return data || [];
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
  return data || [];
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
  return data || [];
}

export async function createLead(formData: LeadInput): Promise<any> {
  const { data, error } = await supabase
    .from("leads")
    .insert([
      {
        ...formData,
        status: "new"
      }
    ])
    .select();

  if (error) {
    console.error("Error creating lead:", error);
    throw error;
  }
  return data?.[0] || null;
}
