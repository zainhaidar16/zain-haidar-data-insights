import { supabase } from "./supabase";
import { Project, Service, Experience, Skill, Certification, Post, LeadInput } from "./api";

// Helpers
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

// ─── PROJECTS CRUD ────────────────────────────────────────────────────────────
export async function getAdminProjects(): Promise<Project[]> {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) throw error;
  return data || [];
}

export async function createProject(project: Omit<Project, "id" | "created_at" | "updated_at">): Promise<Project> {
  const { data, error } = await supabase
    .from("projects")
    .insert([project])
    .select();

  if (error) throw error;
  return data[0];
}

export async function updateProject(id: string, project: Partial<Project>): Promise<Project> {
  const { data, error } = await supabase
    .from("projects")
    .update(project)
    .eq("id", id)
    .select();

  if (error) throw error;
  return data[0];
}

export async function deleteProject(id: string): Promise<void> {
  const { error } = await supabase
    .from("projects")
    .delete()
    .eq("id", id);

  if (error) throw error;
}


// ─── POSTS CRUD ───────────────────────────────────────────────────────────────
export async function getAdminPosts(): Promise<Post[]> {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .order("published_at", { ascending: false, nullsFirst: false })
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data || [];
}

export async function createPost(post: Omit<Post, "id" | "created_at" | "updated_at">): Promise<Post> {
  const { data, error } = await supabase
    .from("posts")
    .insert([post])
    .select();

  if (error) throw error;
  return data[0];
}

export async function updatePost(id: string, post: Partial<Post>): Promise<Post> {
  const { data, error } = await supabase
    .from("posts")
    .update(post)
    .eq("id", id)
    .select();

  if (error) throw error;
  return data[0];
}

export async function deletePost(id: string): Promise<void> {
  const { error } = await supabase
    .from("posts")
    .delete()
    .eq("id", id);

  if (error) throw error;
}


// ─── EXPERIENCE CRUD ──────────────────────────────────────────────────────────
export async function getAdminExperience(): Promise<Experience[]> {
  const { data, error } = await supabase
    .from("experience")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) throw error;
  return data || [];
}

export async function createExperience(exp: Omit<Experience, "id" | "created_at" | "updated_at">): Promise<Experience> {
  const { data, error } = await supabase
    .from("experience")
    .insert([exp])
    .select();

  if (error) throw error;
  return data[0];
}

export async function updateExperience(id: string, exp: Partial<Experience>): Promise<Experience> {
  const { data, error } = await supabase
    .from("experience")
    .update(exp)
    .eq("id", id)
    .select();

  if (error) throw error;
  return data[0];
}

export async function deleteExperience(id: string): Promise<void> {
  const { error } = await supabase
    .from("experience")
    .delete()
    .eq("id", id);

  if (error) throw error;
}


// ─── SKILLS CRUD ──────────────────────────────────────────────────────────────
export async function getAdminSkills(): Promise<Skill[]> {
  const { data, error } = await supabase
    .from("skills")
    .select("*")
    .order("category", { ascending: true })
    .order("sort_order", { ascending: true });

  if (error) throw error;
  return data || [];
}

export async function createSkill(skill: Omit<Skill, "id" | "created_at">): Promise<Skill> {
  const { data, error } = await supabase
    .from("skills")
    .insert([skill])
    .select();

  if (error) throw error;
  return data[0];
}

export async function updateSkill(id: string, skill: Partial<Skill>): Promise<Skill> {
  const { data, error } = await supabase
    .from("skills")
    .update(skill)
    .eq("id", id)
    .select();

  if (error) throw error;
  return data[0];
}

export async function deleteSkill(id: string): Promise<void> {
  const { error } = await supabase
    .from("skills")
    .delete()
    .eq("id", id);

  if (error) throw error;
}


// ─── CERTIFICATIONS CRUD ──────────────────────────────────────────────────────
export async function getAdminCertifications(): Promise<Certification[]> {
  const { data, error } = await supabase
    .from("certifications")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) throw error;
  return data || [];
}

export async function createCertification(cert: Omit<Certification, "id" | "created_at">): Promise<Certification> {
  const { data, error } = await supabase
    .from("certifications")
    .insert([cert])
    .select();

  if (error) throw error;
  return data[0];
}

export async function updateCertification(id: string, cert: Partial<Certification>): Promise<Certification> {
  const { data, error } = await supabase
    .from("certifications")
    .update(cert)
    .eq("id", id)
    .select();

  if (error) throw error;
  return data[0];
}

export async function deleteCertification(id: string): Promise<void> {
  const { error } = await supabase
    .from("certifications")
    .delete()
    .eq("id", id);

  if (error) throw error;
}


// ─── SERVICES CRUD ────────────────────────────────────────────────────────────
export async function getAdminServices(): Promise<Service[]> {
  const { data, error } = await supabase
    .from("services")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) throw error;
  return data || [];
}

export async function createService(service: Omit<Service, "id" | "created_at" | "updated_at">): Promise<Service> {
  const { data, error } = await supabase
    .from("services")
    .insert([service])
    .select();

  if (error) throw error;
  return data[0];
}

export async function updateService(id: string, service: Partial<Service>): Promise<Service> {
  const { data, error } = await supabase
    .from("services")
    .update(service)
    .eq("id", id)
    .select();

  if (error) throw error;
  return data[0];
}

export async function deleteService(id: string): Promise<void> {
  const { error } = await supabase
    .from("services")
    .delete()
    .eq("id", id);

  if (error) throw error;
}


// ─── LEADS CRUD ───────────────────────────────────────────────────────────────
export interface Lead {
  id: string;
  name: string;
  email: string;
  company?: string;
  project_type?: string;
  budget?: string;
  message: string;
  status: "new" | "contacted" | "in_progress" | "closed" | "rejected";
  created_at: string;
}

export async function getAdminLeads(): Promise<Lead[]> {
  const { data, error } = await supabase
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data || [];
}

export async function updateLeadStatus(id: string, status: Lead["status"]): Promise<Lead> {
  const { data, error } = await supabase
    .from("leads")
    .update({ status })
    .eq("id", id)
    .select();

  if (error) throw error;
  return data[0];
}

export async function deleteLead(id: string): Promise<void> {
  const { error } = await supabase
    .from("leads")
    .delete()
    .eq("id", id);

  if (error) throw error;
}

// ─── DASHBOARD STATS & RECENT LEADS ──────────────────────────────────────────
export interface DashboardStats {
  totalProjects: number;
  publishedProjects: number;
  draftProjects: number;
  totalPosts: number;
  publishedPosts: number;
  totalServices: number;
  activeServices: number;
  totalLeads: number;
  newLeads: number;
  totalSkills: number;
  totalCertifications: number;
  totalExperience: number;
}

export async function getDashboardStats(): Promise<DashboardStats> {
  const [
    totalProjectsRes,
    publishedProjectsRes,
    draftProjectsRes,
    totalPostsRes,
    publishedPostsRes,
    totalServicesRes,
    activeServicesRes,
    totalLeadsRes,
    newLeadsRes,
    totalSkillsRes,
    totalCertificationsRes,
    totalExperienceRes,
  ] = await Promise.all([
    supabase.from("projects").select("*", { count: "exact", head: true }),
    supabase.from("projects").select("*", { count: "exact", head: true }).eq("status", "published"),
    supabase.from("projects").select("*", { count: "exact", head: true }).eq("status", "draft"),
    supabase.from("posts").select("*", { count: "exact", head: true }),
    supabase.from("posts").select("*", { count: "exact", head: true }).eq("status", "published"),
    supabase.from("services").select("*", { count: "exact", head: true }),
    supabase.from("services").select("*", { count: "exact", head: true }).eq("is_active", true),
    supabase.from("leads").select("*", { count: "exact", head: true }),
    supabase.from("leads").select("*", { count: "exact", head: true }).eq("status", "new"),
    supabase.from("skills").select("*", { count: "exact", head: true }),
    supabase.from("certifications").select("*", { count: "exact", head: true }),
    supabase.from("experience").select("*", { count: "exact", head: true }),
  ]);

  if (totalProjectsRes.error) console.error("Error projects count:", totalProjectsRes.error);
  if (publishedProjectsRes.error) console.error("Error published projects count:", publishedProjectsRes.error);
  if (draftProjectsRes.error) console.error("Error draft projects count:", draftProjectsRes.error);
  if (totalPostsRes.error) console.error("Error posts count:", totalPostsRes.error);
  if (publishedPostsRes.error) console.error("Error published posts count:", publishedPostsRes.error);
  if (totalServicesRes.error) console.error("Error services count:", totalServicesRes.error);
  if (activeServicesRes.error) console.error("Error active services count:", activeServicesRes.error);
  if (totalLeadsRes.error) console.error("Error leads count:", totalLeadsRes.error);
  if (newLeadsRes.error) console.error("Error new leads count:", newLeadsRes.error);
  if (totalSkillsRes.error) console.error("Error skills count:", totalSkillsRes.error);
  if (totalCertificationsRes.error) console.error("Error certifications count:", totalCertificationsRes.error);
  if (totalExperienceRes.error) console.error("Error experience count:", totalExperienceRes.error);

  const errors = [
    totalProjectsRes.error,
    publishedProjectsRes.error,
    draftProjectsRes.error,
    totalPostsRes.error,
    publishedPostsRes.error,
    totalServicesRes.error,
    activeServicesRes.error,
    totalLeadsRes.error,
    newLeadsRes.error,
    totalSkillsRes.error,
    totalCertificationsRes.error,
    totalExperienceRes.error,
  ].filter(Boolean);

  if (errors.length > 0) {
    throw new Error(errors[0]?.message || "Failed to fetch dashboard counts from Supabase.");
  }

  return {
    totalProjects: totalProjectsRes.count ?? 0,
    publishedProjects: publishedProjectsRes.count ?? 0,
    draftProjects: draftProjectsRes.count ?? 0,
    totalPosts: totalPostsRes.count ?? 0,
    publishedPosts: publishedPostsRes.count ?? 0,
    totalServices: totalServicesRes.count ?? 0,
    activeServices: activeServicesRes.count ?? 0,
    totalLeads: totalLeadsRes.count ?? 0,
    newLeads: newLeadsRes.count ?? 0,
    totalSkills: totalSkillsRes.count ?? 0,
    totalCertifications: totalCertificationsRes.count ?? 0,
    totalExperience: totalExperienceRes.count ?? 0,
  };
}

export async function getRecentLeads(): Promise<Lead[]> {
  const { data, error } = await supabase
    .from("leads")
    .select("id, name, email, company, project_type, budget, message, status, created_at")
    .order("created_at", { ascending: false })
    .limit(5);

  if (error) {
    console.error("Failed to fetch recent leads:", error);
    throw error;
  }
  return data || [];
}

