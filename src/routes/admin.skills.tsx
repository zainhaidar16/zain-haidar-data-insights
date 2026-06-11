import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { 
  getAdminSkills, 
  createSkill, 
  updateSkill, 
  deleteSkill 
} from "@/lib/adminApi";
import { Skill } from "@/lib/api";
import { 
  Loader2, Plus, Edit, Trash2, Check, X, Save, AlertCircle, ShieldCheck, Database 
} from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/skills")({
  head: () => ({
    meta: [{ title: "Technical Skills CRUD — Zain The Analyst Admin" }]
  }),
  component: AdminSkillsPage
});

function AdminSkillsPage() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [error, setError] = useState("");
  
  // Editor State
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const [isCreateMode, setIsCreateMode] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState("");

  // Form Fields
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [level, setLevel] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<number>(0);

  // Load Skills
  async function loadSkills() {
    setLoading(true);
    setError("");
    try {
      const data = await getAdminSkills();
      setSkills(data);
    } catch (err: any) {
      console.error(err);
      setError(err?.message || "Failed to load skills.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadSkills();
  }, []);

  // Open Edit Form
  function startEdit(skill: Skill) {
    setEditingSkill(skill);
    setIsCreateMode(false);
    setFormError("");

    setName(skill.name);
    setCategory(skill.category);
    setLevel(skill.level !== undefined && skill.level !== null ? String(skill.level) : "");
    setSortOrder(skill.sort_order || 0);
  }

  // Open Create Form
  function startCreate() {
    setEditingSkill(null);
    setIsCreateMode(true);
    setFormError("");

    setName("");
    setCategory(categoryFilter !== "all" ? categoryFilter : "");
    setLevel("");
    setSortOrder(skills.length ? Math.max(...skills.map(s => s.sort_order || 0)) + 10 : 10);
  }

  // Save changes
  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) {
      setFormError("Skill Name is required.");
      return;
    }
    if (!category.trim()) {
      setFormError("Category is required.");
      return;
    }

    setFormLoading(true);
    setFormError("");

    // optional level parsing
    const parsedLevel = level.trim() ? Number(level) : null;

    const skillPayload = {
      name: name.trim(),
      category: category.trim(),
      level: parsedLevel,
      sort_order: Number(sortOrder) || 0,
    } as any;

    try {
      if (isCreateMode) {
        await createSkill(skillPayload);
        toast.success("Skill created successfully!");
      } else if (editingSkill) {
        await updateSkill(editingSkill.id, skillPayload);
        toast.success("Skill updated successfully!");
      }
      setIsCreateMode(false);
      setEditingSkill(null);
      loadSkills();
    } catch (err: any) {
      console.error(err);
      setFormError(err?.message || "Failed to save skill.");
    } finally {
      setFormLoading(false);
    }
  }

  // Delete
  async function handleDelete(id: string, skillName: string) {
    if (!confirm(`Delete skill "${skillName}"?`)) {
      return;
    }
    try {
      await deleteSkill(id);
      toast.success(`Deleted skill "${skillName}" successfully.`);
      loadSkills();
    } catch (err: any) {
      console.error(err);
      toast.error(err?.message || "Failed to delete skill.");
    }
  }

  // Get distinct categories
  const categories = Array.from(new Set(skills.map(s => s.category))).sort();

  // Group skills by category for catalog listing
  const groupedSkills: Record<string, Skill[]> = {};
  skills.forEach(s => {
    if (categoryFilter !== "all" && s.category !== categoryFilter) return;
    if (!groupedSkills[s.category]) {
      groupedSkills[s.category] = [];
    }
    groupedSkills[s.category].push(s);
  });

  return (
    <div className="space-y-6 font-poppins text-slate-800">
      
      {/* Category selector row */}
      {!editingSkill && !isCreateMode && (
        <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 bg-[#0F172A] border border-slate-200/60 p-5 rounded-2xl shadow-sm">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-450 uppercase tracking-wide">Filter Category:</span>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="text-xs rounded-xl bg-slate-50 border border-slate-200 px-3 py-2 focus:outline-none focus:border-blue-600 font-semibold"
            >
              <option value="all">All Categories</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <button
            onClick={startCreate}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-xs font-semibold shadow-md shadow-blue-500/10 cursor-pointer transition shrink-0"
          >
            <Plus className="h-4 w-4" />
            <span>Add Skill</span>
          </button>
        </div>
      )}

      {/* Editor & Creator Form */}
      {(editingSkill || isCreateMode) && (
        <div className="bg-[#0F172A] border border-slate-200/60 shadow-sm rounded-3xl overflow-hidden max-w-2xl mx-auto">
          <div className="px-6 py-4.5 border-b border-slate-200/70 bg-slate-50/50 flex justify-between items-center">
            <div>
              <h3 className="font-bold text-slate-800 text-sm tracking-wide">
                {isCreateMode ? "Add Skill Capability" : `Edit Skill: ${name}`}
              </h3>
              <p className="text-xs text-slate-400 font-medium">
                Ensure category labels match existing groups perfectly for visualization filters.
              </p>
            </div>
            <button
              onClick={() => { setIsCreateMode(false); setEditingSkill(null); }}
              className="p-1.5 rounded-lg border border-slate-200 text-slate-400 hover:text-slate-700 hover:bg-slate-50 transition cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <form onSubmit={handleSave} className="p-6 space-y-5">
            
            {formError && (
              <div className="rounded-xl border border-rose-200 bg-rose-50 text-rose-600 text-xs px-4 py-3 font-semibold flex items-center gap-2">
                <AlertCircle className="h-4.5 w-4.5 shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            <div>
              <label className="block text-[10px] font-bold text-slate-455 uppercase tracking-wider mb-1.5">
                Skill / Technology Name <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Power BI, DAX, Python, SQL Server"
                className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-xs focus:outline-none focus:border-blue-600 transition"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-[10px] font-bold text-slate-455 uppercase tracking-wider mb-1.5">
                  Category / Classification <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder="e.g. Business Intelligence, Languages, Cloud & Databases"
                  className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-xs focus:outline-none focus:border-blue-600 transition"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-455 uppercase tracking-wider mb-1.5 flex justify-between">
                  <span>Skill Level</span>
                  <span className="text-[8px] font-bold text-slate-400">Optional (0-100)</span>
                </label>
                <input
                  type="number"
                  min={0}
                  max={100}
                  value={level}
                  onChange={(e) => setLevel(e.target.value)}
                  placeholder="e.g. 90 (or leave blank)"
                  className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-xs focus:outline-none focus:border-blue-600 transition text-center"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-455 uppercase tracking-wider mb-1.5">
                Sort Order
              </label>
              <input
                type="number"
                value={sortOrder}
                onChange={(e) => setSortOrder(Number(e.target.value))}
                className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-xs focus:outline-none focus:border-blue-600 transition"
              />
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 border-t border-slate-100 pt-4">
              <button
                type="button"
                onClick={() => { setIsCreateMode(false); setEditingSkill(null); }}
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
                <span>{formLoading ? "Saving Skill..." : "Save Skill"}</span>
              </button>
            </div>

          </form>
        </div>
      )}

      {/* Main categories catalog layout */}
      {!editingSkill && !isCreateMode && (
        <>
          {loading ? (
            <div className="p-16 flex flex-col items-center justify-center gap-2 bg-[#0F172A] border border-slate-200/60 rounded-3xl">
              <Loader2 className="h-7 w-7 animate-spin text-blue-600" />
              <span className="text-xs text-slate-450 font-medium">Loading skills dictionary...</span>
            </div>
          ) : Object.keys(groupedSkills).length === 0 ? (
            <div className="p-16 text-center text-slate-400 font-semibold text-xs bg-[#0F172A] border border-slate-200/60 rounded-3xl">
              No technical skills found matching the filters. Click "Add Skill" to create one.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(groupedSkills).map(([cat, list]) => (
                <div key={cat} className="bg-[#0F172A] border border-slate-200/60 shadow-sm rounded-3xl p-5 flex flex-col">
                  
                  {/* Category Header */}
                  <div className="pb-3 border-b border-slate-100 flex justify-between items-center mb-4">
                    <div className="flex items-center gap-2 text-slate-800">
                      <Database className="h-4.5 w-4.5 text-blue-600 shrink-0" />
                      <h4 className="font-bold text-xs tracking-wide uppercase text-slate-850">
                        {cat}
                      </h4>
                    </div>
                    <span className="text-[10px] bg-slate-100 border border-slate-200 text-slate-500 px-2 py-0.5 rounded-full font-bold">
                      {list.length} Skills
                    </span>
                  </div>

                  {/* Skills lists */}
                  <div className="flex-1 space-y-2">
                    {list.sort((a,b) => (a.sort_order || 0) - (b.sort_order || 0)).map((skill) => (
                      <div 
                        key={skill.id} 
                        className="flex justify-between items-center bg-slate-50/50 hover:bg-slate-50 border border-slate-200/30 p-2.5 rounded-xl transition text-xs font-semibold text-slate-700"
                      >
                        <div className="flex items-center gap-2">
                          <ShieldCheck className="h-4 w-4 text-emerald-500 shrink-0" />
                          <span>{skill.name}</span>
                          {skill.level !== undefined && skill.level !== null && (
                            <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-1.5 py-0.2 rounded">
                              {skill.level}%
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => startEdit(skill)}
                            className="p-1 rounded text-slate-400 hover:text-blue-600 hover:bg-[#0F172A] border border-transparent hover:border-slate-200/50 transition cursor-pointer"
                          >
                            <Edit className="h-3.5 w-3.5" />
                          </button>
                          <button
                            onClick={() => handleDelete(skill.id, skill.name)}
                            className="p-1 rounded text-slate-400 hover:text-rose-600 hover:bg-[#0F172A] border border-transparent hover:border-slate-200/50 transition cursor-pointer"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                </div>
              ))}
            </div>
          )}
        </>
      )}

    </div>
  );
}
