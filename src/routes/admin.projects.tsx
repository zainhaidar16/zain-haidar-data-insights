import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { 
  getAdminProjects, 
  createProject, 
  updateProject, 
  deleteProject, 
  generateSlug 
} from "@/lib/adminApi";
import { Project } from "@/lib/api";
import { 
  Loader2, Plus, Search, Filter, Edit, Trash2, 
  Eye, Check, X, Star, Save, AlertCircle 
} from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/projects")({
  head: () => ({
    meta: [{ title: "Projects CRUD — Zain The Analyst Admin" }]
  }),
  component: AdminProjectsPage
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
  
  // JSONB helpers
  const [technologiesText, setTechnologiesText] = useState("");
  const [approachLines, setApproachLines] = useState<string[]>([""]);
  const [outcomeLines, setOutcomeLines] = useState<string[]>([""]);
  const [metrics, setMetrics] = useState<Array<{ label: string; value: string }>>([{ label: "", value: "" }]);

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
    setFeatured(project.featured);
    setStatus(project.status);
    setSortOrder(project.sort_order || 0);

    setTechnologiesText((project.technologies || []).join(", "));
    setApproachLines(project.approach?.length ? project.approach : [""]);
    setOutcomeLines(project.outcome?.length ? project.outcome : [""]);
    setMetrics(project.metrics?.length ? project.metrics : [{ label: "", value: "" }]);
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
    setSortOrder(projects.length ? Math.max(...projects.map(p => p.sort_order || 0)) + 10 : 10);

    setTechnologiesText("");
    setApproachLines([""]);
    setOutcomeLines([""]);
    setMetrics([{ label: "", value: "" }]);
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

    setFormLoading(true);
    setFormError("");

    // Prepare JSON arrays
    const technologies = technologiesText
      .split(",")
      .map(t => t.trim())
      .filter(t => t.length > 0);

    const approach = approachLines.map(line => line.trim()).filter(line => line.length > 0);
    const outcome = outcomeLines.map(line => line.trim()).filter(line => line.length > 0);
    const formattedMetrics = metrics.filter(m => m.label.trim() && m.value.trim());

    const projectPayload = {
      title: title.trim(),
      slug: slug.trim().toLowerCase(),
      category: category.trim(),
      short_description: shortDescription.trim(),
      description: description.trim() || null,
      problem: problem.trim() || null,
      approach: approach.length ? approach : null,
      outcome: outcome.length ? outcome : null,
      technologies,
      metrics: formattedMetrics,
      image_url: imageUrl.trim() || null,
      featured,
      status,
      sort_order: Number(sortOrder) || 0
    } as any;

    try {
      if (isCreateMode) {
        await createProject(projectPayload);
        toast.success("Project created successfully!");
      } else if (editingProject) {
        await updateProject(editingProject.id, projectPayload);
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
  const filteredProjects = projects.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 font-poppins text-slate-800">
      
      {/* Page header controls */}
      {!editingProject && !isCreateMode && (
        <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 bg-white border border-slate-200/60 p-5 rounded-2xl shadow-sm">
          <div className="flex-1 flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search by project title or category..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-blue-600 focus:bg-white transition"
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
        <div className="bg-white border border-slate-200/60 shadow-sm rounded-3xl overflow-hidden">
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
              onClick={() => { setIsCreateMode(false); setEditingProject(null); }}
              className="p-1.5 rounded-lg border border-slate-200 text-slate-400 hover:text-slate-700 hover:bg-slate-50 transition cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <form onSubmit={handleSave} className="p-6 md:p-8 space-y-6">
            
            {formError && (
              <div className="rounded-xl border border-rose-200 bg-rose-50 text-rose-600 text-xs px-4 py-3 font-semibold flex items-center gap-2">
                <AlertCircle className="h-4.5 w-4.5 shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            {/* General Fields */}
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
                  className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-xs focus:outline-none focus:border-blue-600 transition"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-450 uppercase tracking-wider mb-1.5 flex justify-between">
                  <span>URL Slug <span className="text-rose-500">*</span></span>
                  <button
                    type="button"
                    onClick={() => setSlug(generateSlug(title))}
                    className="text-[9px] font-extrabold text-blue-600 uppercase tracking-wider"
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
                  className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-xs focus:outline-none focus:border-blue-600 transition font-mono"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-450 uppercase tracking-wider mb-1.5">
                  Category / Core Domain
                </label>
                <input
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder="e.g. Business Intelligence"
                  className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-xs focus:outline-none focus:border-blue-600 transition"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-450 uppercase tracking-wider mb-1.5">
                  Main Cover Image URL
                </label>
                <input
                  type="text"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="e.g. https://example.com/project.png"
                  className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-xs focus:outline-none focus:border-blue-600 transition font-mono"
                />
              </div>
            </div>

            {/* Descriptions & Problem */}
            <div className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-450 uppercase tracking-wider mb-1.5">
                  Short Card Summary (Short Description)
                </label>
                <textarea
                  value={shortDescription}
                  onChange={(e) => setShortDescription(e.target.value)}
                  placeholder="A high-level 1-2 sentence overview of the project shown on the listings."
                  rows={2}
                  className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-xs focus:outline-none focus:border-blue-600 transition"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-450 uppercase tracking-wider mb-1.5">
                  Full Description (Markdown supported)
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Detailed breakdown of the project. Tell a compelling case study story."
                  rows={4}
                  className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-xs focus:outline-none focus:border-blue-600 transition"
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
                  className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-xs focus:outline-none focus:border-blue-600 transition"
                />
              </div>
            </div>

            {/* Split section columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Approach List */}
              <div className="border border-slate-100 rounded-2xl p-4.5 bg-slate-50/20">
                <label className="block text-[10px] font-bold text-slate-450 uppercase tracking-wider mb-2 flex justify-between items-center">
                  <span>Approach Taken (one per box)</span>
                  <button
                    type="button"
                    onClick={() => setApproachLines([...approachLines, ""])}
                    className="text-[9px] font-extrabold text-blue-600 hover:text-blue-700 transition"
                  >
                    + Add Step
                  </button>
                </label>
                <div className="space-y-2">
                  {approachLines.map((line, idx) => (
                    <div key={idx} className="flex gap-2">
                      <input
                        type="text"
                        value={line}
                        onChange={(e) => {
                          const updated = [...approachLines];
                          updated[idx] = e.target.value;
                          setApproachLines(updated);
                        }}
                        placeholder="e.g. Conducted ETL cleanups in SQL Server"
                        className="flex-1 rounded-lg border border-slate-200 px-3 py-2 text-xs focus:outline-none focus:border-blue-600 transition bg-white"
                      />
                      {approachLines.length > 1 && (
                        <button
                          type="button"
                          onClick={() => setApproachLines(approachLines.filter((_, i) => i !== idx))}
                          className="p-2 rounded-lg border border-rose-100 text-rose-500 hover:bg-rose-50 transition cursor-pointer self-center"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Outcome List */}
              <div className="border border-slate-100 rounded-2xl p-4.5 bg-slate-50/20">
                <label className="block text-[10px] font-bold text-slate-450 uppercase tracking-wider mb-2 flex justify-between items-center">
                  <span>Outcomes / Learnings (one per box)</span>
                  <button
                    type="button"
                    onClick={() => setOutcomeLines([...outcomeLines, ""])}
                    className="text-[9px] font-extrabold text-blue-600 hover:text-blue-700 transition"
                  >
                    + Add Outcome
                  </button>
                </label>
                <div className="space-y-2">
                  {outcomeLines.map((line, idx) => (
                    <div key={idx} className="flex gap-2">
                      <input
                        type="text"
                        value={line}
                        onChange={(e) => {
                          const updated = [...outcomeLines];
                          updated[idx] = e.target.value;
                          setOutcomeLines(updated);
                        }}
                        placeholder="e.g. Increased reporting speed by 40%"
                        className="flex-1 rounded-lg border border-slate-200 px-3 py-2 text-xs focus:outline-none focus:border-blue-600 transition bg-white"
                      />
                      {outcomeLines.length > 1 && (
                        <button
                          type="button"
                          onClick={() => setOutcomeLines(outcomeLines.filter((_, i) => i !== idx))}
                          className="p-2 rounded-lg border border-rose-100 text-rose-500 hover:bg-rose-50 transition cursor-pointer self-center"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Technologies Comma Parser */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-start">
              <div className="md:col-span-2">
                <label className="block text-[10px] font-bold text-slate-450 uppercase tracking-wider mb-1.5">
                  Technologies / Tools Stack <span className="text-slate-400 font-normal">(comma-separated)</span>
                </label>
                <input
                  type="text"
                  value={technologiesText}
                  onChange={(e) => setTechnologiesText(e.target.value)}
                  placeholder="e.g. Power BI, DAX, Power Query, SQL, Python"
                  className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-xs focus:outline-none focus:border-blue-600 transition"
                />
                <p className="text-[10px] text-slate-400 mt-1 font-medium italic">
                  Will save as a JSONB array: {JSON.stringify(technologiesText.split(",").map(t=>t.trim()).filter(Boolean))}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold text-slate-455 uppercase tracking-wider mb-1.5">
                    Sort Order
                  </label>
                  <input
                    type="number"
                    value={sortOrder}
                    onChange={(e) => setSortOrder(Number(e.target.value))}
                    className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-xs focus:outline-none focus:border-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-455 uppercase tracking-wider mb-1.5">
                    Status
                  </label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as any)}
                    className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-xs focus:outline-none focus:border-blue-600 font-semibold"
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Metrics Editor */}
            <div className="border border-slate-100 rounded-2xl p-4.5 bg-slate-50/20">
              <label className="block text-[10px] font-bold text-slate-450 uppercase tracking-wider mb-3 flex justify-between items-center">
                <span>Key Metrics (Label & Value pairs)</span>
                <button
                  type="button"
                  onClick={() => setMetrics([...metrics, { label: "", value: "" }])}
                  className="text-[9px] font-extrabold text-blue-600 hover:text-blue-700 transition"
                >
                  + Add Metric Card
                </button>
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {metrics.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 border border-slate-200/50 bg-white p-3 rounded-xl shadow-xs">
                    <div className="flex-1 grid grid-cols-2 gap-2">
                      <div>
                        <input
                          type="text"
                          value={item.label}
                          onChange={(e) => {
                            const updated = [...metrics];
                            updated[idx].label = e.target.value;
                            setMetrics(updated);
                          }}
                          placeholder="Metric label (e.g. Reporting speed)"
                          className="w-full border-b border-slate-200 focus:border-blue-600 py-1 text-[11px] focus:outline-none bg-transparent"
                        />
                      </div>
                      <div>
                        <input
                          type="text"
                          value={item.value}
                          onChange={(e) => {
                            const updated = [...metrics];
                            updated[idx].value = e.target.value;
                            setMetrics(updated);
                          }}
                          placeholder="Value (e.g. +30% or 40 hrs)"
                          className="w-full border-b border-slate-200 focus:border-blue-600 py-1 text-[11px] focus:outline-none font-bold text-slate-700 bg-transparent"
                        />
                      </div>
                    </div>
                    {metrics.length > 1 && (
                      <button
                        type="button"
                        onClick={() => setMetrics(metrics.filter((_, i) => i !== idx))}
                        className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 transition cursor-pointer"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Checkbox fields */}
            <div className="flex items-center gap-2 border-t border-slate-100 pt-5">
              <input
                type="checkbox"
                id="featured"
                checked={featured}
                onChange={(e) => setFeatured(e.target.checked)}
                className="h-4 w-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500 cursor-pointer"
              />
              <label htmlFor="featured" className="text-xs font-semibold text-slate-700 cursor-pointer select-none">
                Feature this project on the main portfolio website home screen
              </label>
            </div>

            {/* Form actions */}
            <div className="flex justify-end gap-3 border-t border-slate-100 pt-5">
              <button
                type="button"
                onClick={() => { setIsCreateMode(false); setEditingProject(null); }}
                className="rounded-xl border border-slate-200 text-slate-500 hover:bg-slate-50 px-4 py-2.5 text-xs font-semibold transition cursor-pointer"
              >
                Cancel
              </button>
              
              <button
                type="submit"
                disabled={formLoading}
                className="inline-flex items-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 text-xs font-semibold shadow-md shadow-blue-500/10 cursor-pointer disabled:opacity-60 transition"
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
        <div className="bg-white border border-slate-200/60 rounded-3xl overflow-hidden shadow-sm">
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
                            <div className="text-[10px] text-slate-400 font-mono mt-0.5">slug: /{p.slug}</div>
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
