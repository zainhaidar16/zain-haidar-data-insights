import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { getAdminSkills, createSkill, updateSkill, deleteSkill } from "@/lib/adminApi";
import { Skill } from "@/lib/api";
import {
  Loader2,
  Plus,
  Edit,
  Trash2,
  Check,
  X,
  Save,
  AlertCircle,
  ShieldCheck,
  Database,
} from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/skills")({
  head: () => ({
    meta: [{ title: "Technical Skills CRUD — zainhaidar Admin" }],
  }),
  component: AdminSkillsPage,
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
    setSortOrder(skills.length ? Math.max(...skills.map((s) => s.sort_order || 0)) + 10 : 10);
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
  const categories = Array.from(new Set(skills.map((s) => s.category))).sort();

  // Group skills by category for catalog listing
  const groupedSkills: Record<string, Skill[]> = {};
  skills.forEach((s) => {
    if (categoryFilter !== "all" && s.category !== categoryFilter) return;
    if (!groupedSkills[s.category]) {
      groupedSkills[s.category] = [];
    }
    groupedSkills[s.category].push(s);
  });

  return (
    <div className="space-y-6 font-sans text-foreground">
      {/* Category selector row */}
      {!editingSkill && !isCreateMode && (
        <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 bg-card border border-border p-6 admin-card shadow-sm">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
              Filter Category:
            </span>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="text-sm rounded-[var(--radius-control)] bg-muted border border-border px-3 py-2 focus:outline-none focus:border-border font-semibold"
            >
              <option value="all">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={startCreate}
            className="inline-flex items-center justify-center gap-2 rounded-[var(--radius-control)] bg-primary hover:bg-primary text-primary-foreground px-4 py-2 text-sm font-semibold shadow-md shadow-none cursor-pointer transition shrink-0 admin-action-primary"
          >
            <Plus className="h-4 w-4" />
            <span>Add Skill</span>
          </button>
        </div>
      )}

      {/* Editor & Creator Form */}
      {(editingSkill || isCreateMode) && (
        <div className="bg-card border border-border shadow-sm admin-card overflow-hidden max-w-2xl mx-auto">
          <div className="px-6 py-4 border-b border-border bg-muted flex justify-between items-center">
            <div>
              <h3 className="font-semibold text-foreground text-sm tracking-wide">
                {isCreateMode ? "Add Skill Capability" : `Edit Skill: ${name}`}
              </h3>
              <p className="text-sm text-muted-foreground font-medium">
                Ensure category labels match existing groups perfectly for visualization filters.
              </p>
            </div>
            <button
              aria-label="Close editor"
              onClick={() => {
                setIsCreateMode(false);
                setEditingSkill(null);
              }}
              className="p-2 rounded-[var(--radius-control)] border border-border text-muted-foreground hover:text-foreground hover:bg-muted transition cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <form onSubmit={handleSave} className="p-6 space-y-6">
            {formError && (
              <div className="rounded-[var(--radius-control)] border border-[var(--admin-danger-border)] bg-[var(--admin-danger-soft)] text-[var(--admin-danger)] text-sm px-4 py-3 font-semibold flex items-center gap-2">
                <AlertCircle className="h-4.5 w-4.5 shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            <div>
              <label
                htmlFor="admin-skills-tsx-field-1"
                className="block text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2"
              >
                Skill / Technology Name <span className="text-[var(--admin-danger)]">*</span>
              </label>
              <input
                id="admin-skills-tsx-field-1"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Power BI, DAX, Python, SQL Server"
                className="w-full rounded-[var(--radius-control)] border border-border px-4 py-2.5 text-sm focus:outline-none focus:border-border transition"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2">
                <label
                  htmlFor="admin-skills-tsx-field-2"
                  className="block text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2"
                >
                  Category / Classification <span className="text-[var(--admin-danger)]">*</span>
                </label>
                <input
                  id="admin-skills-tsx-field-2"
                  type="text"
                  required
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder="e.g. Business Intelligence, Languages, Cloud & Databases"
                  className="w-full rounded-[var(--radius-control)] border border-border px-4 py-2.5 text-sm focus:outline-none focus:border-border transition"
                />
              </div>

              <div>
                <label
                  htmlFor="admin-skills-tsx-field-3"
                  className="block text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2 flex justify-between"
                >
                  <span>Skill Level</span>
                  <span className="text-xs font-semibold text-muted-foreground">
                    Optional (0-100)
                  </span>
                </label>
                <input
                  id="admin-skills-tsx-field-3"
                  type="number"
                  min={0}
                  max={100}
                  value={level}
                  onChange={(e) => setLevel(e.target.value)}
                  placeholder="e.g. 90 (or leave blank)"
                  className="w-full rounded-[var(--radius-control)] border border-border px-4 py-2.5 text-sm focus:outline-none focus:border-border transition text-center"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="admin-skills-tsx-field-4"
                className="block text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2"
              >
                Sort Order
              </label>
              <input
                id="admin-skills-tsx-field-4"
                type="number"
                value={sortOrder}
                onChange={(e) => setSortOrder(Number(e.target.value))}
                className="w-full rounded-[var(--radius-control)] border border-border px-4 py-2.5 text-sm focus:outline-none focus:border-border transition"
              />
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 border-t border-border pt-4">
              <button
                type="button"
                onClick={() => {
                  setIsCreateMode(false);
                  setEditingSkill(null);
                }}
                className="rounded-[var(--radius-control)] border border-border text-muted-foreground hover:bg-muted px-4 py-2.5 text-sm font-semibold transition cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={formLoading}
                className="inline-flex items-center gap-2 rounded-[var(--radius-control)] bg-primary hover:bg-primary text-primary-foreground px-6 py-2.5 text-sm font-semibold shadow-md shadow-none cursor-pointer disabled:opacity-60 transition admin-action-primary"
              >
                {formLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin text-primary-foreground" />
                ) : (
                  <Save className="h-4 w-4 text-primary-foreground" />
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
            <div className="p-16 flex flex-col items-center justify-center gap-2 bg-card border border-border admin-card">
              <Loader2 className="h-7 w-7 animate-spin text-[var(--accent-text)]" />
              <span className="text-sm text-muted-foreground font-medium">
                Loading skills dictionary...
              </span>
            </div>
          ) : Object.keys(groupedSkills).length === 0 ? (
            <div className="p-16 text-center text-muted-foreground font-semibold text-sm bg-card border border-border admin-card">
              No technical skills found matching the filters. Click "Add Skill" to create one.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(groupedSkills).map(([cat, list]) => (
                <div
                  key={cat}
                  className="bg-card border border-border shadow-sm admin-card p-6 flex flex-col"
                >
                  {/* Category Header */}
                  <div className="pb-3 border-b border-border flex justify-between items-center mb-4">
                    <div className="flex items-center gap-2 text-foreground">
                      <Database className="h-4.5 w-4.5 text-[var(--accent-text)] shrink-0" />
                      <h4 className="font-semibold text-sm tracking-wide uppercase text-foreground">
                        {cat}
                      </h4>
                    </div>
                    <span className="text-sm bg-muted border border-border text-muted-foreground px-2 py-0.5 rounded-full font-semibold">
                      {list.length} Skills
                    </span>
                  </div>

                  {/* Skills lists */}
                  <div className="flex-1 space-y-2">
                    {list
                      .sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0))
                      .map((skill) => (
                        <div
                          key={skill.id}
                          className="flex justify-between items-center bg-muted hover:bg-muted border border-border p-2.5 rounded-[var(--radius-control)] transition text-sm font-semibold text-foreground"
                        >
                          <div className="flex items-center gap-2">
                            <ShieldCheck className="h-4 w-4 text-[var(--admin-success)] shrink-0" />
                            <span>{skill.name}</span>
                            {skill.level !== undefined && skill.level !== null && (
                              <span className="text-sm font-semibold text-[var(--accent-text)] bg-[var(--accent-soft)] px-1.5 py-0.2 rounded">
                                {skill.level}%
                              </span>
                            )}
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              aria-label="Edit item"
                              onClick={() => startEdit(skill)}
                              className="p-1 rounded text-muted-foreground hover:text-[var(--accent-text)] hover:bg-card border border-transparent hover:border-border transition cursor-pointer"
                            >
                              <Edit className="h-3.5 w-3.5" />
                            </button>
                            <button
                              aria-label="Delete item"
                              onClick={() => handleDelete(skill.id, skill.name)}
                              className="p-1 rounded text-muted-foreground hover:text-[var(--admin-danger)] hover:bg-card border border-transparent hover:border-border transition cursor-pointer"
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
