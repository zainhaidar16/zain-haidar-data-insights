import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, useRef } from "react";
import {
  getAdminProjects,
  createProject,
  updateProject,
  deleteProject,
  generateSlug,
} from "@/lib/adminApi";
import { Project } from "@/lib/api";
import {
  Loader2,
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  Eye,
  Check,
  X,
  Star,
  Save,
  AlertCircle,
  ArrowUp,
  ArrowDown,
  Upload,
} from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/admin/projects")({
  head: () => ({
    meta: [{ title: "Projects CRUD — Zain The Analyst Admin" }],
  }),
  component: AdminProjectsPage,
});

function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "draft" | "published">("all");
  const [error, setError] = useState("");

  // Editor State
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isCreateMode, setIsCreateMode] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState("");

  // Form Fields
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [category, setCategory] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [description, setDescription] = useState("");
  const [problem, setProblem] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [featured, setFeatured] = useState(false);
  const [status, setStatus] = useState<"draft" | "published">("draft");
  const [sortOrder, setSortOrder] = useState<number>(0);

  // New Fields
  const [heroTitle, setHeroTitle] = useState("");
  const [heroDescription, setHeroDescription] = useState("");
  const [projectGoal, setProjectGoal] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [liveUrl, setLiveUrl] = useState("");

  // Tag Array Fields
  const [technologies, setTechnologies] = useState<string[]>([]);
  const [dataSources, setDataSources] = useState<string[]>([]);
  const [keyFeatures, setKeyFeatures] = useState<string[]>([]);
  const [challenges, setChallenges] = useState<string[]>([]);
  const [businessImpact, setBusinessImpact] = useState<string[]>([]);

  // Simple string list fields
  const [approach, setApproach] = useState<string[]>([""]);
  const [outcome, setOutcome] = useState<string[]>([""]);

  // Complex jsonb array fields
  const [metrics, setMetrics] = useState<Array<{ label: string; value: string }>>([
    { label: "", value: "" },
  ]);
  const [solutionSteps, setSolutionSteps] = useState<Array<{ title: string; description: string }>>(
    [{ title: "", description: "" }],
  );
  const [gallery, setGallery] = useState<
    Array<{ image_url: string; alt_text?: string; caption?: string }>
  >([]);

  // File uploading indicators
  const [uploadingCover, setUploadingCover] = useState(false);
  const [uploadingGallery, setUploadingGallery] = useState(false);

  // Load Projects
  async function loadProjects() {
    setLoading(true);
    setError("");
    try {
      const data = await getAdminProjects();
      setProjects(data);
    } catch (err: any) {
      console.error(err);
      setError(err?.message || "Failed to load projects.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProjects();
  }, []);

  // Title changes triggers auto slug if new project or if editing and slug is not manually altered
  function handleTitleChange(val: string) {
    setTitle(val);
    if (isCreateMode || (editingProject && slug === generateSlug(editingProject.title))) {
      setSlug(generateSlug(val));
    }
  }

  // Open Edit Form
  function startEdit(project: Project) {
    setEditingProject(project);
    setIsCreateMode(false);
    setFormError("");

    setTitle(project.title);
    setSlug(project.slug);
    setCategory(project.category || "");
    setShortDescription(project.short_description || "");
    setDescription(project.description || "");
    setProblem(project.problem || "");
    setImageUrl(project.image_url || "");
    setFeatured(project.featured || false);
    setStatus(project.status);
    setSortOrder(project.sort_order || 0);

    // New Fields
    setHeroTitle(project.hero_title || "");
    setHeroDescription(project.hero_description || "");
    setProjectGoal(project.project_goal || "");
    setGithubUrl(project.github_url || "");
    setLiveUrl(project.live_url || "");

    setTechnologies(project.technologies || []);
    setDataSources(project.data_sources || []);
    setKeyFeatures(project.key_features || []);
    setChallenges(project.challenges || []);
    setBusinessImpact(project.business_impact || []);

    setApproach(project.approach?.length ? project.approach : [""]);
    setOutcome(project.outcome?.length ? project.outcome : [""]);

    setMetrics(project.metrics?.length ? project.metrics : [{ label: "", value: "" }]);
    setSolutionSteps(
      project.solution_steps?.length ? project.solution_steps : [{ title: "", description: "" }],
    );
    setGallery(project.gallery || []);
  }

  // Open Create Form
  function startCreate() {
    setEditingProject(null);
    setIsCreateMode(true);
    setFormError("");

    setTitle("");
    setSlug("");
    setCategory("");
    setShortDescription("");
    setDescription("");
    setProblem("");
    setImageUrl("");
    setFeatured(false);
    setStatus("draft");
    setSortOrder(projects.length ? Math.max(...projects.map((p) => p.sort_order || 0)) + 10 : 10);

    // New Fields
    setHeroTitle("");
    setHeroDescription("");
    setProjectGoal("");
    setGithubUrl("");
    setLiveUrl("");

    setTechnologies([]);
    setDataSources([]);
    setKeyFeatures([]);
    setChallenges([]);
    setBusinessImpact([]);

    setApproach([""]);
    setOutcome([""]);

    setMetrics([{ label: "", value: "" }]);
    setSolutionSteps([{ title: "", description: "" }]);
    setGallery([]);
  }

  // Save changes (both edit & create)
  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) {
      setFormError("Title is required.");
      return;
    }
    if (!slug.trim()) {
      setFormError("Slug is required.");
      return;
    }
    if (!category.trim()) {
      setFormError("Category is required.");
      return;
    }
    if (!shortDescription.trim()) {
      setFormError("Short Description is required.");
      return;
    }
    if (!status) {
      setFormError("Status is required.");
      return;
    }

    setFormLoading(true);
    setFormError("");

    // Prepare JSON arrays
    const formattedApproach = approach.map((line) => line.trim()).filter((line) => line.length > 0);
    const formattedOutcome = outcome.map((line) => line.trim()).filter((line) => line.length > 0);
    const formattedMetrics = metrics.filter((m) => m.label.trim() && m.value.trim());
    const formattedSteps = solutionSteps.filter((s) => s.title.trim() && s.description.trim());
    const formattedGallery = gallery.filter((g) => g.image_url.trim());

    const projectPayload = {
      title: title.trim(),
      slug: slug.trim().toLowerCase(),
      category: category.trim(),
      short_description: shortDescription.trim(),
      description: description.trim() || null,
      problem: problem.trim() || null,
      approach: formattedApproach,
      outcome: formattedOutcome,
      technologies,
      metrics: formattedMetrics,
      image_url: imageUrl.trim() || null,
      featured,
      status,
      sort_order: Number(sortOrder) || 0,
      hero_title: heroTitle.trim() || null,
      hero_description: heroDescription.trim() || null,
      project_goal: projectGoal.trim() || null,
      data_sources: dataSources,
      key_features: keyFeatures,
      challenges: challenges,
      solution_steps: formattedSteps,
      business_impact: businessImpact,
      gallery: formattedGallery,
      github_url: githubUrl.trim() || null,
      live_url: liveUrl.trim() || null,
    };

    try {
      if (isCreateMode) {
        await createProject(projectPayload as any);
        toast.success("Project created successfully!");
      } else if (editingProject) {
        await updateProject(editingProject.id, projectPayload as any);
        toast.success("Project updated successfully!");
      }
      setIsCreateMode(false);
      setEditingProject(null);
      loadProjects();
    } catch (err: any) {
      console.error(err);
      setFormError(err?.message || "Failed to save project.");
    } finally {
      setFormLoading(false);
    }
  }

  // Delete project
  async function handleDelete(id: string, name: string) {
    if (!confirm(`Are you absolutely sure you want to delete the project "${name}"?`)) {
      return;
    }
    try {
      await deleteProject(id);
      toast.success(`Deleted project "${name}" successfully.`);
      loadProjects();
    } catch (err: any) {
      console.error(err);
      toast.error(err?.message || "Failed to delete project.");
    }
  }

  // Toggle quick actions
  async function toggleStatus(project: Project) {
    const nextStatus = project.status === "published" ? "draft" : "published";
    try {
      await updateProject(project.id, { status: nextStatus });
      toast.success(`Status updated to ${nextStatus}.`);
      loadProjects();
    } catch (err: any) {
      console.error(err);
      toast.error(err?.message || "Failed to toggle status.");
    }
  }

  async function toggleFeatured(project: Project) {
    try {
      await updateProject(project.id, { featured: !project.featured });
      toast.success(`Featured state updated.`);
      loadProjects();
    } catch (err: any) {
      console.error(err);
      toast.error(err?.message || "Failed to toggle featured.");
    }
  }

  // Filtered List
  const filteredProjects = projects.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 font-poppins text-slate-800">
      {/* Page header controls */}
      {!editingProject && !isCreateMode && (
        <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 bg-[#0F172A] border border-slate-200/60 p-5 rounded-2xl shadow-sm">
          <div className="flex-1 flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search by project title or category..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-blue-600 focus:bg-[#0F172A] transition"
              />
            </div>

            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-slate-400 shrink-0" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as any)}
                className="text-xs rounded-xl bg-slate-50 border border-slate-200 px-3 py-2 focus:outline-none focus:border-blue-600"
              >
                <option value="all">All Statuses</option>
                <option value="draft">Drafts Only</option>
                <option value="published">Published Only</option>
              </select>
            </div>
          </div>

          <button
            onClick={startCreate}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-xs font-semibold shadow-md shadow-blue-500/10 cursor-pointer transition shrink-0"
          >
            <Plus className="h-4 w-4" />
            <span>Create Project</span>
          </button>
        </div>
      )}

      {/* Editor & Creator View */}
      {(editingProject || isCreateMode) && (
        <div className="bg-[#0F172A] border border-slate-200/60 shadow-sm rounded-3xl overflow-hidden">
          <div className="px-6 py-4.5 border-b border-slate-200/70 bg-slate-50/50 flex justify-between items-center">
            <div>
              <h3 className="font-bold text-slate-800 text-sm tracking-wide">
                {isCreateMode ? "Create New Case Study Project" : `Edit Project: ${title}`}
              </h3>
              <p className="text-xs text-slate-400 font-medium">
                Fill in the details below. All JSON fields are strictly parsed.
              </p>
            </div>
            <button
              onClick={() => {
                setIsCreateMode(false);
                setEditingProject(null);
              }}
              className="p-1.5 rounded-lg border border-slate-200 text-slate-400 hover:text-slate-700 hover:bg-slate-50 transition cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>
          </div>{" "}
          <form onSubmit={handleSave} className="p-6 md:p-8 space-y-8 bg-[#0F172A] text-[#F8FAFC]">
            {formError && (
              <div className="rounded-xl border border-rose-200 bg-rose-50/10 text-rose-500 text-xs px-4 py-3 font-semibold flex items-center gap-2">
                <AlertCircle className="h-4.5 w-4.5 shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            {/* SECTION 1: Basic Info */}
            <div className="space-y-4 border-b border-[#334155] pb-6">
              <h4 className="text-xs font-bold text-[#2563EB] uppercase tracking-wider">
                1. Basic Info
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[10px] font-bold text-slate-450 uppercase tracking-wider mb-1.5">
                    Project Title <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    placeholder="e.g. Retail Sales Performance Dashboard"
                    className="w-full rounded-xl border border-[#334155] bg-[#1E293B] px-4 py-2.5 text-xs text-[#F8FAFC] focus:outline-none focus:border-[#2563EB] transition"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-450 uppercase tracking-wider mb-1.5 flex justify-between">
                    <span>
                      URL Slug <span className="text-rose-500">*</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => setSlug(generateSlug(title))}
                      className="text-[9px] font-extrabold text-[#2563EB] uppercase tracking-wider hover:text-orange-400"
                    >
                      Regenerate Slug
                    </button>
                  </label>
                  <input
                    type="text"
                    required
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    placeholder="e.g. retail-sales-performance"
                    className="w-full rounded-xl border border-[#334155] bg-[#1E293B] px-4 py-2.5 text-xs text-[#F8FAFC] focus:outline-none focus:border-[#2563EB] transition font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-450 uppercase tracking-wider mb-1.5">
                    Category / Core Domain <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="e.g. Business Intelligence"
                    className="w-full rounded-xl border border-[#334155] bg-[#1E293B] px-4 py-2.5 text-xs text-[#F8FAFC] focus:outline-none focus:border-[#2563EB] transition"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-450 uppercase tracking-wider mb-1.5">
                      Sort Order
                    </label>
                    <input
                      type="number"
                      value={sortOrder}
                      onChange={(e) => setSortOrder(Number(e.target.value))}
                      className="w-full rounded-xl border border-[#334155] bg-[#1E293B] px-4 py-2.5 text-xs text-[#F8FAFC] focus:outline-none focus:border-[#2563EB]"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-450 uppercase tracking-wider mb-1.5">
                      Status <span className="text-rose-500">*</span>
                    </label>
                    <select
                      value={status}
                      onChange={(e) => setStatus(e.target.value as any)}
                      className="w-full rounded-xl border border-[#334155] bg-[#1E293B] px-4 py-2.5 text-xs text-[#F8FAFC] focus:outline-none focus:border-[#2563EB] font-semibold"
                    >
                      <option value="draft">Draft</option>
                      <option value="published">Published</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="featured"
                  checked={featured}
                  onChange={(e) => setFeatured(e.target.checked)}
                  className="h-4 w-4 text-[#2563EB] border-[#334155] bg-[#1E293B] rounded focus:ring-[#2563EB] cursor-pointer"
                />
                <label
                  htmlFor="featured"
                  className="text-xs font-semibold text-slate-350 cursor-pointer select-none"
                >
                  Feature this project on the main portfolio website home screen
                </label>
              </div>
            </div>

            {/* SECTION 2: Hero Layout */}
            <div className="space-y-4 border-b border-[#334155] pb-6">
              <h4 className="text-xs font-bold text-[#2563EB] uppercase tracking-wider">
                2. Case Study Hero Section
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[10px] font-bold text-slate-450 uppercase tracking-wider mb-1.5">
                    Hero Title{" "}
                    <span className="text-slate-500 font-normal">
                      (falls back to title if empty)
                    </span>
                  </label>
                  <input
                    type="text"
                    value={heroTitle}
                    onChange={(e) => setHeroTitle(e.target.value)}
                    placeholder="e.g. Modernizing Retail Sales Forecasting and SKU-Level Metrics Dashboard"
                    className="w-full rounded-xl border border-[#334155] bg-[#1E293B] px-4 py-2.5 text-xs text-[#F8FAFC] focus:outline-none focus:border-[#2563EB]"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-450 uppercase tracking-wider mb-1.5">
                    Hero Description{" "}
                    <span className="text-slate-500 font-normal">
                      (falls back to short description if empty)
                    </span>
                  </label>
                  <input
                    type="text"
                    value={heroDescription}
                    onChange={(e) => setHeroDescription(e.target.value)}
                    placeholder="e.g. An end-to-end Power BI + Snowflake pipeline migration delivering absolute SKU-level visibility"
                    className="w-full rounded-xl border border-[#334155] bg-[#1E293B] px-4 py-2.5 text-xs text-[#F8FAFC] focus:outline-none focus:border-[#2563EB]"
                  />
                </div>
              </div>
            </div>

            {/* SECTION 3: Links */}
            <div className="space-y-4 border-b border-[#334155] pb-6">
              <h4 className="text-xs font-bold text-[#2563EB] uppercase tracking-wider">
                3. Case Study External Links
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[10px] font-bold text-slate-450 uppercase tracking-wider mb-1.5">
                    GitHub Repository URL
                  </label>
                  <input
                    type="url"
                    value={githubUrl}
                    onChange={(e) => setGithubUrl(e.target.value)}
                    placeholder="e.g. https://github.com/zainhaidar/project-repo"
                    className="w-full rounded-xl border border-[#334155] bg-[#1E293B] px-4 py-2.5 text-xs text-[#F8FAFC] focus:outline-none focus:border-[#2563EB] font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-450 uppercase tracking-wider mb-1.5">
                    Live Demo / Production App URL
                  </label>
                  <input
                    type="url"
                    value={liveUrl}
                    onChange={(e) => setLiveUrl(e.target.value)}
                    placeholder="e.g. https://dashboard.retailgroup.eu"
                    className="w-full rounded-xl border border-[#334155] bg-[#1E293B] px-4 py-2.5 text-xs text-[#F8FAFC] focus:outline-none focus:border-[#2563EB] font-mono"
                  />
                </div>
              </div>
            </div>

            {/* SECTION 4: Cover Image & Storage Upload */}
            <div className="space-y-4 border-b border-[#334155] pb-6">
              <h4 className="text-xs font-bold text-[#2563EB] uppercase tracking-wider">
                4. Main Cover Image
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-end">
                <div className="md:col-span-2">
                  <label className="block text-[10px] font-bold text-slate-450 uppercase tracking-wider mb-1.5">
                    Cover Image URL
                  </label>
                  <input
                    type="text"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="e.g. https://example.com/cover.jpg"
                    className="w-full rounded-xl border border-[#334155] bg-[#1E293B] px-4 py-2.5 text-xs text-[#F8FAFC] focus:outline-none focus:border-[#2563EB] font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-450 uppercase tracking-wider mb-1.5">
                    Upload File to Supabase Storage
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        try {
                          setUploadingCover(true);
                          const url = await uploadImage(file, slug || generateSlug(title));
                          setImageUrl(url);
                          toast.success("Cover image uploaded successfully!");
                        } catch (err: any) {
                          toast.error(err.message || "Failed to upload cover image.");
                        } finally {
                          setUploadingCover(false);
                        }
                      }}
                      className="hidden"
                      id="cover-file-upload"
                      disabled={uploadingCover}
                    />
                    <label
                      htmlFor="cover-file-upload"
                      className="w-full flex items-center justify-center gap-2 rounded-xl border border-dashed border-[#334155] bg-[#1E293B] hover:bg-[#1c1c21] text-xs font-semibold px-4 py-2.5 text-slate-350 cursor-pointer transition select-none disabled:opacity-50"
                    >
                      {uploadingCover ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin text-[#2563EB]" />
                          <span>Uploading image...</span>
                        </>
                      ) : (
                        <>
                          <Upload className="h-4 w-4 text-[#2563EB]" />
                          <span>Upload Image File</span>
                        </>
                      )}
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* SECTION 5: Content Description */}
            <div className="space-y-4 border-b border-[#334155] pb-6">
              <h4 className="text-xs font-bold text-[#2563EB] uppercase tracking-wider">
                5. Case Study Narrative
              </h4>

              <div>
                <label className="block text-[10px] font-bold text-slate-450 uppercase tracking-wider mb-1.5">
                  Short Card Summary (Short Description) <span className="text-rose-500">*</span>
                </label>
                <textarea
                  required
                  value={shortDescription}
                  onChange={(e) => setShortDescription(e.target.value)}
                  placeholder="Provide a high-level 1-2 sentence overview of the project shown on the listings."
                  rows={2}
                  className="w-full rounded-xl border border-[#334155] bg-[#1E293B] px-4 py-2.5 text-xs text-[#F8FAFC] focus:outline-none focus:border-[#2563EB]"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-450 uppercase tracking-wider mb-1.5">
                  Full Detailed Description (Markdown supported)
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Detailed breakdown of the project. Renders in the case study page."
                  rows={5}
                  className="w-full rounded-xl border border-[#334155] bg-[#1E293B] px-4 py-2.5 text-xs text-[#F8FAFC] focus:outline-none focus:border-[#2563EB]"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-450 uppercase tracking-wider mb-1.5">
                  Project Goal
                </label>
                <textarea
                  value={projectGoal}
                  onChange={(e) => setProjectGoal(e.target.value)}
                  placeholder="What was the technical goal or objectives of the case study?"
                  rows={3}
                  className="w-full rounded-xl border border-[#334155] bg-[#1E293B] px-4 py-2.5 text-xs text-[#F8FAFC] focus:outline-none focus:border-[#2563EB]"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-450 uppercase tracking-wider mb-1.5">
                  The Problem Statement
                </label>
                <textarea
                  value={problem}
                  onChange={(e) => setProblem(e.target.value)}
                  placeholder="What actual business problem did the organization face?"
                  rows={3}
                  className="w-full rounded-xl border border-[#334155] bg-[#1E293B] px-4 py-2.5 text-xs text-[#F8FAFC] focus:outline-none focus:border-[#2563EB]"
                />
              </div>

              {/* Approach & Outcome lists */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                {/* Approach List */}
                <div className="border border-[#334155] rounded-2xl p-4.5 bg-[#111114]">
                  <label className="block text-[10px] font-bold text-slate-450 uppercase tracking-wider mb-2 flex justify-between items-center">
                    <span>Approach Taken (one per box)</span>
                    <button
                      type="button"
                      onClick={() => setApproach([...approach, ""])}
                      className="text-[9px] font-extrabold text-[#2563EB] hover:text-orange-400 transition"
                    >
                      + Add Step
                    </button>
                  </label>
                  <div className="space-y-2">
                    {approach.map((line, idx) => (
                      <div key={idx} className="flex gap-2">
                        <input
                          type="text"
                          value={line}
                          onChange={(e) => {
                            const updated = [...approach];
                            updated[idx] = e.target.value;
                            setApproach(updated);
                          }}
                          placeholder="e.g. Conducted ETL cleanups in SQL Server"
                          className="flex-1 rounded-lg border border-[#334155] px-3 py-2 text-xs text-[#F8FAFC] focus:outline-none focus:border-[#2563EB] bg-[#0F172A]"
                        />
                        {approach.length > 1 && (
                          <button
                            type="button"
                            onClick={() => setApproach(approach.filter((_, i) => i !== idx))}
                            className="p-2 rounded-lg border border-rose-100/10 text-rose-500 hover:bg-rose-50/10 transition cursor-pointer self-center"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Outcome List */}
                <div className="border border-[#334155] rounded-2xl p-4.5 bg-[#111114]">
                  <label className="block text-[10px] font-bold text-slate-450 uppercase tracking-wider mb-2 flex justify-between items-center">
                    <span>Outcomes / Learnings (one per box)</span>
                    <button
                      type="button"
                      onClick={() => setOutcome([...outcome, ""])}
                      className="text-[9px] font-extrabold text-[#2563EB] hover:text-orange-400 transition"
                    >
                      + Add Outcome
                    </button>
                  </label>
                  <div className="space-y-2">
                    {outcome.map((line, idx) => (
                      <div key={idx} className="flex gap-2">
                        <input
                          type="text"
                          value={line}
                          onChange={(e) => {
                            const updated = [...outcome];
                            updated[idx] = e.target.value;
                            setOutcome(updated);
                          }}
                          placeholder="e.g. Increased reporting speed by 40%"
                          className="flex-1 rounded-lg border border-[#334155] px-3 py-2 text-xs text-[#F8FAFC] focus:outline-none focus:border-[#2563EB] bg-[#0F172A]"
                        />
                        {outcome.length > 1 && (
                          <button
                            type="button"
                            onClick={() => setOutcome(outcome.filter((_, i) => i !== idx))}
                            className="p-2 rounded-lg border border-rose-100/10 text-rose-500 hover:bg-rose-50/10 transition cursor-pointer self-center"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* SECTION 6: Tag List Fields */}
            <div className="space-y-4 border-b border-[#334155] pb-6">
              <h4 className="text-xs font-bold text-[#2563EB] uppercase tracking-wider">
                6. Technologies & Project Metadata Tags
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <TagEditor
                  label="Technologies / Tools Stack"
                  tags={technologies}
                  onChange={setTechnologies}
                  placeholder="e.g. Power BI, DAX, Python, BigQuery"
                />
                <TagEditor
                  label="Data Sources"
                  tags={dataSources}
                  onChange={setDataSources}
                  placeholder="e.g. PostgreSQL, Salesforce API, CSV exports"
                />
                <TagEditor
                  label="Key Features"
                  tags={keyFeatures}
                  onChange={setKeyFeatures}
                  placeholder="e.g. Row-level security, Predictive analytics, Daily ETL refresh"
                />
                <TagEditor
                  label="Challenges Overcome"
                  tags={challenges}
                  onChange={setChallenges}
                  placeholder="e.g. Slow manual pipeline, Dirty legacy dates schema"
                />
                <div className="md:col-span-2">
                  <TagEditor
                    label="Business Impact Points"
                    tags={businessImpact}
                    onChange={setBusinessImpact}
                    placeholder="e.g. 80+ weekly dashboard views, Churn rate dropped 12% in first quarter"
                  />
                </div>
              </div>
            </div>

            {/* SECTION 7: Key Metrics Editor */}
            <div className="space-y-4 border-b border-[#334155] pb-6">
              <div className="flex justify-between items-center">
                <h4 className="text-xs font-bold text-[#2563EB] uppercase tracking-wider">
                  7. Case Study Performance Metrics
                </h4>
                <button
                  type="button"
                  onClick={() => setMetrics([...metrics, { label: "", value: "" }])}
                  className="text-[10px] font-bold text-[#2563EB] hover:text-orange-400 transition"
                >
                  + Add Metric Card
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {metrics.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 border border-[#334155] bg-[#111114] p-3.5 rounded-xl shadow-xs"
                  >
                    <div className="flex-1 grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[8px] uppercase tracking-wider text-slate-500 font-bold mb-0.5">
                          Label
                        </label>
                        <input
                          type="text"
                          value={item.label}
                          onChange={(e) => {
                            const updated = [...metrics];
                            updated[idx].label = e.target.value;
                            setMetrics(updated);
                          }}
                          placeholder="e.g. Reporting speed"
                          className="w-full border-b border-[#334155] focus:border-[#2563EB] py-1 text-xs text-[#F8FAFC] focus:outline-none bg-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-[8px] uppercase tracking-wider text-slate-500 font-bold mb-0.5">
                          Value
                        </label>
                        <input
                          type="text"
                          value={item.value}
                          onChange={(e) => {
                            const updated = [...metrics];
                            updated[idx].value = e.target.value;
                            setMetrics(updated);
                          }}
                          placeholder="e.g. 4d to 1h or +30%"
                          className="w-full border-b border-[#334155] focus:border-[#2563EB] py-1 text-xs text-[#F8FAFC] focus:outline-none font-bold bg-transparent"
                        />
                      </div>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        type="button"
                        disabled={idx === 0}
                        onClick={() => {
                          const updated = [...metrics];
                          const temp = updated[idx];
                          updated[idx] = updated[idx - 1];
                          updated[idx - 1] = temp;
                          setMetrics(updated);
                        }}
                        className="p-1 rounded text-slate-400 hover:text-white disabled:opacity-30 cursor-pointer"
                      >
                        <ArrowUp className="h-3.5 w-3.5" />
                      </button>
                      <button
                        type="button"
                        disabled={idx === metrics.length - 1}
                        onClick={() => {
                          const updated = [...metrics];
                          const temp = updated[idx];
                          updated[idx] = updated[idx + 1];
                          updated[idx + 1] = temp;
                          setMetrics(updated);
                        }}
                        className="p-1 rounded text-slate-400 hover:text-white disabled:opacity-30 cursor-pointer"
                      >
                        <ArrowDown className="h-3.5 w-3.5" />
                      </button>
                      {metrics.length > 1 && (
                        <button
                          type="button"
                          onClick={() => setMetrics(metrics.filter((_, i) => i !== idx))}
                          className="p-1 rounded-lg text-rose-500 hover:bg-rose-50/10 cursor-pointer"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* SECTION 8: Solution Steps */}
            <div className="space-y-4 border-b border-[#334155] pb-6">
              <div className="flex justify-between items-center">
                <h4 className="text-xs font-bold text-[#2563EB] uppercase tracking-wider">
                  8. Implementation Solution Steps
                </h4>
                <button
                  type="button"
                  onClick={() =>
                    setSolutionSteps([...solutionSteps, { title: "", description: "" }])
                  }
                  className="text-[10px] font-bold text-[#2563EB] hover:text-orange-400 transition"
                >
                  + Add Step
                </button>
              </div>

              <div className="space-y-3">
                {solutionSteps.map((item, idx) => (
                  <div
                    key={idx}
                    className="space-y-2 border border-[#334155] bg-[#111114] p-4 rounded-xl"
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-bold text-[#2563EB] uppercase tracking-wider">
                        Step #{idx + 1}
                      </span>
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          disabled={idx === 0}
                          onClick={() => {
                            const updated = [...solutionSteps];
                            const temp = updated[idx];
                            updated[idx] = updated[idx - 1];
                            updated[idx - 1] = temp;
                            setSolutionSteps(updated);
                          }}
                          className="p-1 rounded text-slate-400 hover:text-white disabled:opacity-30 cursor-pointer"
                        >
                          <ArrowUp className="h-3.5 w-3.5" />
                        </button>
                        <button
                          type="button"
                          disabled={idx === solutionSteps.length - 1}
                          onClick={() => {
                            const updated = [...solutionSteps];
                            const temp = updated[idx];
                            updated[idx] = updated[idx + 1];
                            updated[idx + 1] = temp;
                            setSolutionSteps(updated);
                          }}
                          className="p-1 rounded text-slate-400 hover:text-white disabled:opacity-30 cursor-pointer"
                        >
                          <ArrowDown className="h-3.5 w-3.5" />
                        </button>
                        {solutionSteps.length > 1 && (
                          <button
                            type="button"
                            onClick={() =>
                              setSolutionSteps(solutionSteps.filter((_, i) => i !== idx))
                            }
                            className="p-1 rounded-lg text-rose-500 hover:bg-rose-50/10 cursor-pointer"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div className="md:col-span-1">
                        <input
                          type="text"
                          value={item.title}
                          onChange={(e) => {
                            const updated = [...solutionSteps];
                            updated[idx].title = e.target.value;
                            setSolutionSteps(updated);
                          }}
                          placeholder="e.g. Data Preparation"
                          className="w-full rounded-lg border border-[#334155] bg-[#0F172A] px-3 py-2 text-xs text-[#F8FAFC] focus:outline-none focus:border-[#2563EB] transition"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <textarea
                          value={item.description}
                          onChange={(e) => {
                            const updated = [...solutionSteps];
                            updated[idx].description = e.target.value;
                            setSolutionSteps(updated);
                          }}
                          placeholder="Cleaned and transformed raw datasets, audited date schemas..."
                          rows={2}
                          className="w-full rounded-lg border border-[#334155] bg-[#0F172A] px-3 py-2 text-xs text-[#F8FAFC] focus:outline-none focus:border-[#2563EB] transition"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* SECTION 9: Gallery Editor */}
            <div className="space-y-4 border-b border-[#334155] pb-6">
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3">
                <div>
                  <h4 className="text-xs font-bold text-[#2563EB] uppercase tracking-wider">
                    9. Case Study Image Gallery
                  </h4>
                  <p className="text-[10px] text-slate-500 font-medium">
                    Add manual image URLs or upload multiple files directly to Supabase storage.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={async (e) => {
                      const files = e.target.files;
                      if (!files || files.length === 0) return;
                      try {
                        setUploadingGallery(true);
                        const uploadedUrls: string[] = [];
                        const pSlug = slug || generateSlug(title);
                        for (let i = 0; i < files.length; i++) {
                          const file = files[i];
                          const url = await uploadImage(file, pSlug);
                          uploadedUrls.push(url);
                        }
                        const newItems = uploadedUrls.map((url) => ({
                          image_url: url,
                          alt_text: "",
                          caption: "",
                        }));
                        setGallery([...gallery, ...newItems]);
                        toast.success(`Uploaded ${files.length} gallery image(s) successfully!`);
                      } catch (err: any) {
                        toast.error(err.message || "Failed to upload gallery image(s).");
                      } finally {
                        setUploadingGallery(false);
                      }
                    }}
                    className="hidden"
                    id="gallery-file-upload"
                    disabled={uploadingGallery}
                  />
                  <label
                    htmlFor="gallery-file-upload"
                    className="inline-flex items-center gap-1.5 rounded-xl border border-dashed border-[#334155] bg-[#1E293B] hover:bg-[#1c1c21] text-xs font-semibold px-3 py-2 text-slate-350 cursor-pointer transition select-none disabled:opacity-50"
                  >
                    {uploadingGallery ? (
                      <>
                        <Loader2 className="h-3.5 w-3.5 animate-spin text-[#2563EB]" />
                        <span>Uploading gallery...</span>
                      </>
                    ) : (
                      <>
                        <Upload className="h-3.5 w-3.5 text-[#2563EB]" />
                        <span>Upload Images</span>
                      </>
                    )}
                  </label>
                  <button
                    type="button"
                    onClick={() =>
                      setGallery([...gallery, { image_url: "", alt_text: "", caption: "" }])
                    }
                    className="inline-flex items-center gap-1.5 rounded-xl border border-[#334155] bg-[#1E293B] hover:bg-[#1c1c21] text-xs font-semibold px-3.5 py-2 text-slate-350 cursor-pointer transition"
                  >
                    <span>+ Add URL</span>
                  </button>
                </div>
              </div>

              {gallery.length === 0 ? (
                <div className="border border-dashed border-[#334155] p-8 text-center text-xs text-slate-500 rounded-2xl bg-[#111114]">
                  No images in the gallery yet. Click above to upload or add manually.
                </div>
              ) : (
                <div className="space-y-3.5">
                  {gallery.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex flex-col sm:flex-row gap-3 border border-[#334155] bg-[#111114] p-3.5 rounded-xl animate-fade-in"
                    >
                      <div className="w-full sm:w-28 h-20 bg-[#020617] rounded-lg overflow-hidden border border-[#334155] flex-shrink-0 flex items-center justify-center">
                        {item.image_url ? (
                          <img
                            src={item.image_url}
                            alt="preview"
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <span className="text-[10px] text-slate-500">No Image</span>
                        )}
                      </div>
                      <div className="flex-grow grid grid-cols-1 gap-2">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          <div>
                            <label className="block text-[8px] uppercase tracking-wider text-slate-500 font-bold mb-0.5">
                              Alt Text
                            </label>
                            <input
                              type="text"
                              value={item.alt_text || ""}
                              onChange={(e) => {
                                const updated = [...gallery];
                                updated[idx].alt_text = e.target.value;
                                setGallery(updated);
                              }}
                              placeholder="e.g. Dashboard home view screenshot"
                              className="w-full rounded-lg border border-[#334155] bg-[#0F172A] px-2.5 py-1.5 text-xs text-[#F8FAFC] focus:outline-none focus:border-[#2563EB]"
                            />
                          </div>
                          <div>
                            <label className="block text-[8px] uppercase tracking-wider text-slate-500 font-bold mb-0.5">
                              Caption
                            </label>
                            <input
                              type="text"
                              value={item.caption || ""}
                              onChange={(e) => {
                                const updated = [...gallery];
                                updated[idx].caption = e.target.value;
                                setGallery(updated);
                              }}
                              placeholder="e.g. Landing view of the retailer executive dashboard"
                              className="w-full rounded-lg border border-[#334155] bg-[#0F172A] px-2.5 py-1.5 text-xs text-[#F8FAFC] focus:outline-none focus:border-[#2563EB]"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-[8px] uppercase tracking-wider text-slate-500 font-bold mb-0.5">
                            Image URL
                          </label>
                          <input
                            type="text"
                            value={item.image_url}
                            onChange={(e) => {
                              const updated = [...gallery];
                              updated[idx].image_url = e.target.value;
                              setGallery(updated);
                            }}
                            placeholder="https://..."
                            className="w-full rounded-lg border border-[#334155] bg-[#0F172A] px-2.5 py-1.5 text-xs text-[#F8FAFC] focus:outline-none focus:border-[#2563EB] font-mono"
                          />
                        </div>
                      </div>
                      <div className="flex sm:flex-col items-center justify-end gap-1.5 shrink-0 pt-2 sm:pt-0">
                        <button
                          type="button"
                          disabled={idx === 0}
                          onClick={() => {
                            const updated = [...gallery];
                            const temp = updated[idx];
                            updated[idx] = updated[idx - 1];
                            updated[idx - 1] = temp;
                            setGallery(updated);
                          }}
                          className="p-1 rounded text-slate-400 hover:text-white disabled:opacity-30 cursor-pointer"
                        >
                          <ArrowUp className="h-3.5 w-3.5" />
                        </button>
                        <button
                          type="button"
                          disabled={idx === gallery.length - 1}
                          onClick={() => {
                            const updated = [...gallery];
                            const temp = updated[idx];
                            updated[idx] = updated[idx + 1];
                            updated[idx + 1] = temp;
                            setGallery(updated);
                          }}
                          className="p-1 rounded text-slate-400 hover:text-white disabled:opacity-30 cursor-pointer"
                        >
                          <ArrowDown className="h-3.5 w-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setGallery(gallery.filter((_, i) => i !== idx))}
                          className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50/10 cursor-pointer"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Form actions */}
            <div className="flex justify-end gap-3 pt-4 border-t border-[#334155]">
              <button
                type="button"
                onClick={() => {
                  setIsCreateMode(false);
                  setEditingProject(null);
                }}
                className="rounded-xl border border-[#334155] text-slate-400 hover:bg-[#1E293B] px-4.5 py-2.5 text-xs font-semibold transition cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={formLoading}
                className="inline-flex items-center gap-2 rounded-xl bg-[#2563EB] hover:bg-orange-600 text-white px-5 py-2.5 text-xs font-semibold shadow-md shadow-orange-500/10 cursor-pointer disabled:opacity-60 transition"
              >
                {formLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin text-white" />
                ) : (
                  <Save className="h-4 w-4 text-white" />
                )}
                <span>{formLoading ? "Saving Case Study..." : "Save Project"}</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Main Table view of all projects */}
      {!editingProject && !isCreateMode && (
        <div className="bg-[#0F172A] border border-slate-200/60 rounded-3xl overflow-hidden shadow-sm">
          {loading ? (
            <div className="p-16 flex flex-col items-center justify-center gap-2">
              <Loader2 className="h-7 w-7 animate-spin text-blue-600" />
              <span className="text-xs text-slate-450 font-medium">Loading project catalog...</span>
            </div>
          ) : filteredProjects.length === 0 ? (
            <div className="p-16 text-center text-slate-400 font-semibold text-xs leading-relaxed">
              No projects found matching the criteria. Click "Create Project" to get started.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200/80 text-[10px] font-bold uppercase tracking-wider text-slate-455">
                    <th className="px-6 py-3.5">Project Details</th>
                    <th className="px-6 py-3.5">Category</th>
                    <th className="px-6 py-3.5 text-center">Featured</th>
                    <th className="px-6 py-3.5">Status</th>
                    <th className="px-6 py-3.5">Sort Order</th>
                    <th className="px-6 py-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {filteredProjects.map((p) => (
                    <tr key={p.id} className="hover:bg-slate-50/40 transition">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          {p.image_url ? (
                            <img
                              src={p.image_url}
                              alt={p.title}
                              className="h-10 w-16 object-cover rounded-lg border border-slate-100 shadow-xs"
                            />
                          ) : (
                            <div className="h-10 w-16 bg-slate-100 border border-slate-200/50 rounded-lg flex items-center justify-center text-[10px] text-slate-400 select-none">
                              No Image
                            </div>
                          )}
                          <div>
                            <div className="font-bold text-slate-800 text-xs">{p.title}</div>
                            <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                              slug: /{p.slug}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-slate-600 font-semibold">
                        {p.category || "N/A"}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button
                          onClick={() => toggleFeatured(p)}
                          className={`p-1.5 rounded-xl border transition cursor-pointer inline-flex ${
                            p.featured
                              ? "bg-amber-50 border-amber-100 text-amber-500"
                              : "border-slate-200 text-slate-300 hover:text-slate-400"
                          }`}
                          title="Toggle Featured"
                        >
                          <Star className="h-4 w-4 fill-current" />
                        </button>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => toggleStatus(p)}
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full border text-[10px] font-bold uppercase tracking-wide transition cursor-pointer ${
                            p.status === "published"
                              ? "bg-emerald-50 text-emerald-600 border-emerald-100"
                              : "bg-slate-50 text-slate-450 border-slate-200"
                          }`}
                          title="Click to toggle status"
                        >
                          {p.status}
                        </button>
                      </td>
                      <td className="px-6 py-4 text-slate-500 font-mono font-bold">
                        {p.sort_order ?? 0}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="inline-flex items-center gap-1">
                          <a
                            href={`/projects/${p.slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-slate-50 rounded-lg transition"
                            title="View Public Page"
                          >
                            <Eye className="h-4 w-4" />
                          </a>

                          <button
                            onClick={() => startEdit(p)}
                            className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-slate-50 rounded-lg transition cursor-pointer"
                            title="Edit Project"
                          >
                            <Edit className="h-4 w-4" />
                          </button>

                          <button
                            onClick={() => handleDelete(p.id, p.title)}
                            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition cursor-pointer"
                            title="Delete Project"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

interface TagEditorProps {
  label: string;
  tags: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
}

function TagEditor({ label, tags, onChange, placeholder = "Add new tag..." }: TagEditorProps) {
  const [inputValue, setInputValue] = useState("");

  const addTag = () => {
    const trimmed = inputValue.trim();
    if (trimmed && !tags.includes(trimmed)) {
      onChange([...tags, trimmed]);
      setInputValue("");
    }
  };

  const removeTag = (indexToRemove: number) => {
    onChange(tags.filter((_, idx) => idx !== indexToRemove));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "," || e.key === "Enter") {
      e.preventDefault();
      addTag();
    }
  };

  return (
    <div className="space-y-1.5">
      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">
        {label}
      </label>
      <div className="flex flex-wrap gap-2 p-2.5 bg-[#1E293B] border border-[#334155] rounded-xl min-h-[42px] items-center">
        {tags.map((tag, idx) => (
          <span
            key={idx}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#2563EB]/15 border border-[#2563EB]/35 text-xs text-[#F8FAFC] font-medium animate-fade-in"
          >
            {tag}
            <button
              type="button"
              onClick={() => removeTag(idx)}
              className="text-[#2563EB] hover:text-[#F8FAFC] font-bold text-xs ml-1 focus:outline-none cursor-pointer"
            >
              &times;
            </button>
          </span>
        ))}
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={addTag}
          placeholder={tags.length === 0 ? placeholder : ""}
          className="flex-grow bg-transparent text-xs text-[#F8FAFC] border-none outline-none focus:ring-0 p-0 placeholder-slate-500"
        />
      </div>
    </div>
  );
}

async function uploadImage(file: File, projectSlug: string): Promise<string> {
  if (!projectSlug) {
    throw new Error("Please enter a title or URL slug for the project first before uploading.");
  }
  if (!file.type.startsWith("image/")) {
    throw new Error("Only image files are allowed.");
  }
  const allowedExts = ["jpg", "jpeg", "png", "webp"];
  const ext = file.name.split(".").pop()?.toLowerCase();
  if (!ext || !allowedExts.includes(ext)) {
    throw new Error("Allowed image types: jpg, jpeg, png, webp.");
  }
  const maxSize = 10 * 1024 * 1024; // 10MB
  if (file.size > maxSize) {
    throw new Error("Image size cannot exceed 10MB.");
  }

  const timestamp = Date.now();
  const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
  const path = `projects/${projectSlug}/${timestamp}-${sanitizedName}`;

  const { data, error } = await supabase.storage.from("project-images").upload(path, file, {
    cacheControl: "3600",
    upsert: false,
  });

  if (error) {
    throw new Error(`Upload failed: ${error.message}`);
  }

  const { data: pubData } = supabase.storage.from("project-images").getPublicUrl(path);

  return pubData.publicUrl;
}
