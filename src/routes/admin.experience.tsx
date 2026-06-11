import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { 
  getAdminExperience, 
  createExperience, 
  updateExperience, 
  deleteExperience 
} from "@/lib/adminApi";
import { Experience } from "@/lib/api";
import { 
  Loader2, Plus, Edit, Trash2, Check, X, Save, AlertCircle, CalendarRange 
} from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/experience")({
  head: () => ({
    meta: [{ title: "Experience CRUD — Zain The Analyst Admin" }]
  }),
  component: AdminExperiencePage
});

function AdminExperiencePage() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  // Editor State
  const [editingExp, setEditingExp] = useState<Experience | null>(null);
  const [isCreateMode, setIsCreateMode] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState("");

  // Form Fields
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [startYear, setStartYear] = useState("");
  const [endYear, setEndYear] = useState("");
  const [isCurrent, setIsCurrent] = useState(false);
  const [description, setDescription] = useState("");
  const [sortOrder, setSortOrder] = useState<number>(0);
  const [bulletPointsText, setBulletPointsText] = useState("");

  // Load Experience
  async function loadExperience() {
    setLoading(true);
    setError("");
    try {
      const data = await getAdminExperience();
      setExperiences(data);
    } catch (err: any) {
      console.error(err);
      setError(err?.message || "Failed to load experience records.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadExperience();
  }, []);

  // Open Edit Form
  function startEdit(exp: Experience) {
    setEditingExp(exp);
    setIsCreateMode(false);
    setFormError("");

    setTitle(exp.title);
    setCompany(exp.company);
    setLocation(exp.location || "");
    setStartYear(exp.start_year || "");
    setEndYear(exp.end_year || "");
    setIsCurrent(exp.is_current || false);
    setDescription(exp.description || "");
    setSortOrder(exp.sort_order || 0);
    setBulletPointsText((exp.bullet_points || []).join("\n"));
  }

  // Open Create Form
  function startCreate() {
    setEditingExp(null);
    setIsCreateMode(true);
    setFormError("");

    setTitle("");
    setCompany("");
    setLocation("");
    setStartYear("");
    setEndYear("");
    setIsCurrent(false);
    setDescription("");
    setSortOrder(experiences.length ? Math.max(...experiences.map(e => e.sort_order || 0)) + 10 : 10);
    setBulletPointsText("");
  }

  // Save changes
  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) {
      setFormError("Title is required.");
      return;
    }
    if (!company.trim()) {
      setFormError("Company is required.");
      return;
    }
    if (!startYear.trim()) {
      setFormError("Start Year is required.");
      return;
    }

    setFormLoading(true);
    setFormError("");

    // Bullet points line parser
    const bulletPoints = bulletPointsText
      .split("\n")
      .map(line => line.trim())
      .filter(line => line.length > 0);

    const expPayload = {
      title: title.trim(),
      company: company.trim(),
      location: location.trim() || null,
      start_year: startYear.trim(),
      end_year: isCurrent ? null : (endYear.trim() || null),
      is_current: isCurrent,
      description: description.trim() || null,
      sort_order: Number(sortOrder) || 0,
      bullet_points: bulletPoints,
    } as any;

    try {
      if (isCreateMode) {
        await createExperience(expPayload);
        toast.success("Experience record created successfully!");
      } else if (editingExp) {
        await updateExperience(editingExp.id, expPayload);
        toast.success("Experience record updated successfully!");
      }
      setIsCreateMode(false);
      setEditingExp(null);
      loadExperience();
    } catch (err: any) {
      console.error(err);
      setFormError(err?.message || "Failed to save experience record.");
    } finally {
      setFormLoading(false);
    }
  }

  // Delete
  async function handleDelete(id: string, comp: string, role: string) {
    if (!confirm(`Delete experience record: "${role} at ${comp}"?`)) {
      return;
    }
    try {
      await deleteExperience(id);
      toast.success("Experience record deleted successfully.");
      loadExperience();
    } catch (err: any) {
      console.error(err);
      toast.error(err?.message || "Failed to delete experience.");
    }
  }

  return (
    <div className="space-y-6 font-poppins text-slate-800">
      
      {/* Create button row */}
      {!editingExp && !isCreateMode && (
        <div className="flex justify-end bg-[#0F172A] border border-slate-200/60 p-5 rounded-2xl shadow-sm">
          <button
            onClick={startCreate}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-xs font-semibold shadow-md shadow-blue-500/10 cursor-pointer transition shrink-0"
          >
            <Plus className="h-4 w-4" />
            <span>Add Experience</span>
          </button>
        </div>
      )}

      {/* Editor & Creator View */}
      {(editingExp || isCreateMode) && (
        <div className="bg-[#0F172A] border border-slate-200/60 shadow-sm rounded-3xl overflow-hidden">
          <div className="px-6 py-4.5 border-b border-slate-200/70 bg-slate-50/50 flex justify-between items-center">
            <div>
              <h3 className="font-bold text-slate-800 text-sm tracking-wide">
                {isCreateMode ? "Add Work Experience Record" : `Edit Experience: ${title}`}
              </h3>
              <p className="text-xs text-slate-400 font-medium">
                Add precise details matching Zain's CV chronologies.
              </p>
            </div>
            <button
              onClick={() => { setIsCreateMode(false); setEditingExp(null); }}
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

            {/* Inputs grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-[10px] font-bold text-slate-450 uppercase tracking-wider mb-1.5">
                  Job Title / Role <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Lead Data Analyst"
                  className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-xs focus:outline-none focus:border-blue-600 transition"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-450 uppercase tracking-wider mb-1.5">
                  Company / Organization <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="e.g. Upwork / Freelance"
                  className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-xs focus:outline-none focus:border-blue-600 transition"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-450 uppercase tracking-wider mb-1.5">
                  Location / Workspace
                </label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Vienna, Austria (or Remote)"
                  className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-xs focus:outline-none focus:border-blue-600 transition"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-[10px] font-bold text-slate-455 uppercase tracking-wider mb-1.5">
                    Start Year <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={startYear}
                    onChange={(e) => setStartYear(e.target.value)}
                    placeholder="e.g. 2024"
                    className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-xs focus:outline-none focus:border-blue-600 text-center"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-455 uppercase tracking-wider mb-1.5 flex justify-between">
                    <span>End Year</span>
                    {isCurrent && <span className="text-emerald-500 text-[8px] font-bold">N/A</span>}
                  </label>
                  <input
                    type="text"
                    disabled={isCurrent}
                    value={isCurrent ? "" : endYear}
                    onChange={(e) => setEndYear(e.target.value)}
                    placeholder="e.g. 2026"
                    className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-xs focus:outline-none focus:border-blue-600 text-center disabled:opacity-40"
                  />
                </div>

                <div className="flex flex-col justify-end pb-2">
                  <div className="flex items-center gap-1.5">
                    <input
                      type="checkbox"
                      id="isCurrent"
                      checked={isCurrent}
                      onChange={(e) => setIsCurrent(e.target.checked)}
                      className="h-4 w-4 text-blue-600 border-slate-300 rounded cursor-pointer"
                    />
                    <label htmlFor="isCurrent" className="text-[10px] font-bold text-slate-600 cursor-pointer select-none">
                      Is Current?
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-455 uppercase tracking-wider mb-1.5">
                Core Overview (Description Summary)
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="High-level descriptive overview of freelance focus, work hours, or general project context."
                rows={3}
                className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-xs focus:outline-none focus:border-blue-600 transition"
              />
            </div>

            {/* Bullet Points line-by-line */}
            <div>
              <label className="block text-[10px] font-bold text-slate-455 uppercase tracking-wider mb-1.5 flex justify-between">
                <span>CV Achievements & Duties (One bullet point per line)</span>
                <span className="text-[9px] font-bold text-slate-400">Strictly parsed as JSON array of achievements</span>
              </label>
              <textarea
                value={bulletPointsText}
                onChange={(e) => setBulletPointsText(e.target.value)}
                placeholder="Designed and deployed 20+ Power BI dashboards for retail clients.&#10;Built ETL pipelines using Python and SQL.&#10;Delivered forecasting reports."
                rows={6}
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-xs focus:outline-none focus:border-blue-600 transition font-mono leading-relaxed"
              />
              <p className="text-[9px] text-slate-400 mt-1 font-medium">
                Current total: <span className="font-bold text-blue-600">{bulletPointsText.split("\n").filter(Boolean).length}</span> bullets.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
              <div>
                <label className="block text-[10px] font-bold text-slate-455 uppercase tracking-wider mb-1.5">
                  Timeline Sort Order
                </label>
                <input
                  type="number"
                  value={sortOrder}
                  onChange={(e) => setSortOrder(Number(e.target.value))}
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs focus:outline-none focus:border-blue-600"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 border-t border-slate-100 pt-5">
              <button
                type="button"
                onClick={() => { setIsCreateMode(false); setEditingExp(null); }}
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
                <span>{formLoading ? "Saving Record..." : "Save Experience"}</span>
              </button>
            </div>

          </form>
        </div>
      )}

      {/* Main timeline table of all experiences */}
      {!editingExp && !isCreateMode && (
        <div className="bg-[#0F172A] border border-slate-200/60 rounded-3xl overflow-hidden shadow-sm">
          {loading ? (
            <div className="p-16 flex flex-col items-center justify-center gap-2">
              <Loader2 className="h-7 w-7 animate-spin text-blue-600" />
              <span className="text-xs text-slate-450 font-medium">Loading experience timeline...</span>
            </div>
          ) : experiences.length === 0 ? (
            <div className="p-16 text-center text-slate-400 font-semibold text-xs leading-relaxed">
              No work experience records found. Click "Add Experience" to add one.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200/80 text-[10px] font-bold uppercase tracking-wider text-slate-455">
                    <th className="px-6 py-3.5">Job Title / Company</th>
                    <th className="px-6 py-3.5">Timeline Period</th>
                    <th className="px-6 py-3.5">Location</th>
                    <th className="px-6 py-3.5">Achievements (Bullets)</th>
                    <th className="px-6 py-3.5">Sort Order</th>
                    <th className="px-6 py-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {experiences.map((exp) => (
                    <tr key={exp.id} className="hover:bg-slate-50/40 transition">
                      <td className="px-6 py-4">
                        <div>
                          <div className="font-bold text-slate-800 text-xs">{exp.title}</div>
                          <div className="text-[10px] text-slate-450 font-bold mt-0.5">{exp.company}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-1 bg-slate-100 border border-slate-200 text-slate-600 px-2 py-0.5 rounded text-[10px] font-bold">
                          <CalendarRange className="h-3 w-3 shrink-0" />
                          <span>
                            {exp.start_year} – {exp.is_current ? "Present" : (exp.end_year || "N/A")}
                          </span>
                        </span>
                      </td>
                      <td className="px-6 py-4 text-slate-500 font-semibold">
                        {exp.location || "N/A"}
                      </td>
                      <td className="px-6 py-4 text-slate-500 font-bold">
                        {exp.bullet_points?.length || 0} bullets
                      </td>
                      <td className="px-6 py-4 text-slate-400 font-mono font-bold">
                        {exp.sort_order ?? 0}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="inline-flex items-center gap-1">
                          
                          <button
                            onClick={() => startEdit(exp)}
                            className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-slate-50 rounded-lg transition cursor-pointer"
                            title="Edit Record"
                          >
                            <Edit className="h-4 w-4" />
                          </button>

                          <button
                            onClick={() => handleDelete(exp.id, exp.company, exp.title)}
                            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition cursor-pointer"
                            title="Delete Record"
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
