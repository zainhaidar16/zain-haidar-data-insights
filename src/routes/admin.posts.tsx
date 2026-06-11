import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { 
  getAdminPosts, 
  createPost, 
  updatePost, 
  deletePost, 
  generateSlug 
} from "@/lib/adminApi";
import { Post } from "@/lib/api";
import { 
  Loader2, Plus, Search, Filter, Edit, Trash2, 
  Eye, Check, X, Save, AlertCircle, Calendar 
} from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/posts")({
  head: () => ({
    meta: [{ title: "Blog Posts CMS — Zain The Analyst Admin" }]
  }),
  component: AdminPostsPage
});

function AdminPostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "draft" | "published">("all");
  const [error, setError] = useState("");
  
  // Editor State
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [isCreateMode, setIsCreateMode] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState("");

  // Form Fields
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [category, setCategory] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [bodyMd, setBodyMd] = useState("");
  const [coverUrl, setCoverUrl] = useState("");
  const [status, setStatus] = useState<"draft" | "published">("draft");
  const [tagsText, setTagsText] = useState("");

  // Load Posts
  async function loadPosts() {
    setLoading(true);
    setError("");
    try {
      const data = await getAdminPosts();
      setPosts(data);
    } catch (err: any) {
      console.error(err);
      setError(err?.message || "Failed to load blog posts.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadPosts();
  }, []);

  // Title change triggers slug auto generation
  function handleTitleChange(val: string) {
    setTitle(val);
    if (isCreateMode || (editingPost && slug === generateSlug(editingPost.title))) {
      setSlug(generateSlug(val));
    }
  }

  // Open Edit Form
  function startEdit(post: Post) {
    setEditingPost(post);
    setIsCreateMode(false);
    setFormError("");

    setTitle(post.title);
    setSlug(post.slug);
    setCategory(post.category || "");
    setExcerpt(post.excerpt || "");
    setBodyMd(post.body_md || "");
    setCoverUrl(post.cover_url || "");
    setStatus(post.status);
    setTagsText((post.tags || []).join(", "));
  }

  // Open Create Form
  function startCreate() {
    setEditingPost(null);
    setIsCreateMode(true);
    setFormError("");

    setTitle("");
    setSlug("");
    setCategory("");
    setExcerpt("");
    setBodyMd("");
    setCoverUrl("");
    setStatus("draft");
    setTagsText("");
  }

  // Save changes
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
    if (!bodyMd.trim()) {
      setFormError("Markdown body content is required.");
      return;
    }

    setFormLoading(true);
    setFormError("");

    // Tags list comma parsed
    const tags = tagsText
      .split(",")
      .map(t => t.trim())
      .filter(t => t.length > 0);

    const postPayload = {
      title: title.trim(),
      slug: slug.trim().toLowerCase(),
      category: category.trim() || null,
      excerpt: excerpt.trim() || null,
      body_md: bodyMd.trim(),
      cover_url: coverUrl.trim() || null,
      status,
      tags,
    } as any;

    // Handle published_at logic:
    // If transitioning to published and published_at is not set, set it to the current time.
    if (status === "published") {
      const isCurrentlyDraft = isCreateMode || (editingPost && editingPost.status === "draft");
      const lacksPublishTime = isCreateMode || !editingPost || !editingPost.published_at;
      if (isCurrentlyDraft && lacksPublishTime) {
        postPayload.published_at = new Date().toISOString();
      }
    }

    try {
      if (isCreateMode) {
        await createPost(postPayload);
        toast.success("Blog post created successfully!");
      } else if (editingPost) {
        await updatePost(editingPost.id, postPayload);
        toast.success("Blog post updated successfully!");
      }
      setIsCreateMode(false);
      setEditingPost(null);
      loadPosts();
    } catch (err: any) {
      console.error(err);
      setFormError(err?.message || "Failed to save blog post.");
    } finally {
      setFormLoading(false);
    }
  }

  // Delete post
  async function handleDelete(id: string, name: string) {
    if (!confirm(`Are you absolutely sure you want to delete the blog post "${name}"?`)) {
      return;
    }
    try {
      await deletePost(id);
      toast.success(`Deleted blog post "${name}" successfully.`);
      loadPosts();
    } catch (err: any) {
      console.error(err);
      toast.error(err?.message || "Failed to delete post.");
    }
  }

  // Toggle Publish Status
  async function togglePublish(post: Post) {
    const nextStatus = post.status === "published" ? "draft" : "published";
    const payload: Partial<Post> = { status: nextStatus };
    
    if (nextStatus === "published" && !post.published_at) {
      payload.published_at = new Date().toISOString();
    }

    try {
      await updatePost(post.id, payload);
      toast.success(`Status updated to ${nextStatus}.`);
      loadPosts();
    } catch (err: any) {
      console.error(err);
      toast.error(err?.message || "Failed to toggle status.");
    }
  }

  // Filtered List
  const filteredPosts = posts.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.category || "").toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 font-poppins text-slate-800">
      
      {/* Search / filter panel */}
      {!editingPost && !isCreateMode && (
        <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 bg-[#0F172A] border border-slate-200/60 p-5 rounded-2xl shadow-sm">
          <div className="flex-1 flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search by article title or category..."
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
            <span>New Article</span>
          </button>
        </div>
      )}

      {/* Forms editor view */}
      {(editingPost || isCreateMode) && (
        <div className="bg-[#0F172A] border border-slate-200/60 shadow-sm rounded-3xl overflow-hidden">
          <div className="px-6 py-4.5 border-b border-slate-200/70 bg-slate-50/50 flex justify-between items-center">
            <div>
              <h3 className="font-bold text-slate-800 text-sm tracking-wide">
                {isCreateMode ? "Create Blog Post Article" : `Edit Article: ${title}`}
              </h3>
              <p className="text-xs text-slate-400 font-medium">
                Write technical documentation, tips, or insights using Markdown formats.
              </p>
            </div>
            <button
              onClick={() => { setIsCreateMode(false); setEditingPost(null); }}
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
                  Article Title <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="e.g. Mastering DAX Time Intelligence Functions"
                  className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-xs focus:outline-none focus:border-blue-600 transition"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-455 uppercase tracking-wider mb-1.5 flex justify-between">
                  <span>URL Slug <span className="text-rose-500">*</span></span>
                  <button
                    type="button"
                    onClick={() => setSlug(generateSlug(title))}
                    className="text-[9px] font-extrabold text-blue-600 uppercase tracking-wider"
                  >
                    Auto
                  </button>
                </label>
                <input
                  type="text"
                  required
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="e.g. dax-time-intelligence-mastery"
                  className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-xs focus:outline-none focus:border-blue-600 transition font-mono"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-450 uppercase tracking-wider mb-1.5">
                  Category / Topic
                </label>
                <input
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder="e.g. Power BI & DAX"
                  className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-xs focus:outline-none focus:border-blue-600 transition"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-450 uppercase tracking-wider mb-1.5">
                  Cover Photo Image URL
                </label>
                <input
                  type="text"
                  value={coverUrl}
                  onChange={(e) => setCoverUrl(e.target.value)}
                  placeholder="e.g. https://images.unsplash.com/photo-xxx"
                  className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-xs focus:outline-none focus:border-blue-600 transition font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-450 uppercase tracking-wider mb-1.5">
                Article Excerpt (Brief SEO summary)
              </label>
              <textarea
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                placeholder="A compelling, SEO-friendly short paragraph summarizing the contents of the post."
                rows={2}
                className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-xs focus:outline-none focus:border-blue-600 transition"
              />
            </div>

            {/* Markdown Body */}
            <div>
              <label className="block text-[10px] font-bold text-slate-455 uppercase tracking-wider mb-1.5 flex justify-between">
                <span>Markdown Body Editor <span className="text-rose-500">*</span></span>
                <span className="text-[9px] font-semibold text-slate-400 italic">Supports standard markdown formatting (#, **, `, code)</span>
              </label>
              <textarea
                required
                value={bodyMd}
                onChange={(e) => setBodyMd(e.target.value)}
                placeholder="# Introduction&#10;&#10;Use headings, bullet points, and code syntax here..."
                rows={12}
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-xs focus:outline-none focus:border-blue-600 transition font-mono leading-relaxed"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-start">
              <div>
                <label className="block text-[10px] font-bold text-slate-450 uppercase tracking-wider mb-1.5">
                  Tags / Metadata <span className="text-slate-450 font-normal">(comma-separated)</span>
                </label>
                <input
                  type="text"
                  value={tagsText}
                  onChange={(e) => setTagsText(e.target.value)}
                  placeholder="e.g. DAX, PowerBI, TimeIntelligence, SQL"
                  className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-xs focus:outline-none focus:border-blue-600 transition"
                />
                <p className="text-[10px] text-slate-400 mt-1 font-medium italic">
                  Will save as JSONB array: {JSON.stringify(tagsText.split(",").map(t=>t.trim()).filter(Boolean))}
                </p>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-455 uppercase tracking-wider mb-1.5">
                  Publish State
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as any)}
                  className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-xs focus:outline-none focus:border-blue-600 font-semibold"
                >
                  <option value="draft">Draft (Private)</option>
                  <option value="published">Published (Publicly Visible)</option>
                </select>
                {status === "published" && (
                  <div className="text-[10px] text-emerald-600 font-semibold mt-1 flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    <span>Auto sets published_at timestamp upon saving.</span>
                  </div>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 border-t border-slate-100 pt-5">
              <button
                type="button"
                onClick={() => { setIsCreateMode(false); setEditingPost(null); }}
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
                <span>{formLoading ? "Saving Article..." : "Save Post"}</span>
              </button>
            </div>

          </form>
        </div>
      )}

      {/* Main catalogue view */}
      {!editingPost && !isCreateMode && (
        <div className="bg-[#0F172A] border border-slate-200/60 rounded-3xl overflow-hidden shadow-sm">
          {loading ? (
            <div className="p-16 flex flex-col items-center justify-center gap-2">
              <Loader2 className="h-7 w-7 animate-spin text-blue-600" />
              <span className="text-xs text-slate-450 font-medium">Loading insights catalog...</span>
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="p-16 text-center text-slate-400 font-semibold text-xs leading-relaxed">
              No blog posts found. Click "New Article" to write your first technical guide.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200/80 text-[10px] font-bold uppercase tracking-wider text-slate-455">
                    <th className="px-6 py-3.5">Article Info</th>
                    <th className="px-6 py-3.5">Category</th>
                    <th className="px-6 py-3.5">Tags</th>
                    <th className="px-6 py-3.5">Status</th>
                    <th className="px-6 py-3.5">Published At</th>
                    <th className="px-6 py-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {filteredPosts.map((post) => (
                    <tr key={post.id} className="hover:bg-slate-50/40 transition">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          {post.cover_url ? (
                            <img 
                              src={post.cover_url} 
                              alt="" 
                              className="h-10 w-16 object-cover rounded-lg border border-slate-100" 
                            />
                          ) : (
                            <div className="h-10 w-16 bg-slate-100 border border-slate-200/50 rounded-lg flex items-center justify-center text-[10px] text-slate-400 select-none">
                              No Cover
                            </div>
                          )}
                          <div>
                            <div className="font-bold text-slate-800 text-xs">{post.title}</div>
                            <div className="text-[10px] text-slate-400 font-mono mt-0.5">slug: /{post.slug}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-slate-600 font-semibold">
                        {post.category || "N/A"}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1">
                          {post.tags?.slice(0, 3).map(tag => (
                            <span key={tag} className="px-1.5 py-0.5 bg-slate-100 rounded text-[9px] text-slate-500 border border-slate-200/40 font-mono">
                              #{tag}
                            </span>
                          ))}
                          {post.tags?.length > 3 && (
                            <span className="text-[9px] text-slate-400 font-bold">+{post.tags.length - 3}</span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => togglePublish(post)}
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full border text-[10px] font-bold uppercase tracking-wide transition cursor-pointer ${
                            post.status === "published" 
                              ? "bg-emerald-50 text-emerald-600 border-emerald-100" 
                              : "bg-slate-50 text-slate-450 border-slate-200"
                          }`}
                          title="Click to toggle state"
                        >
                          {post.status}
                        </button>
                      </td>
                      <td className="px-6 py-4 text-slate-400 font-mono text-[10px]">
                        {post.published_at ? new Date(post.published_at).toLocaleDateString() : "Draft"}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="inline-flex items-center gap-1">
                          
                          <a
                            href={`/insights/${post.slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-slate-50 rounded-lg transition"
                            title="View Article"
                          >
                            <Eye className="h-4 w-4" />
                          </a>

                          <button
                            onClick={() => startEdit(post)}
                            className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-slate-50 rounded-lg transition cursor-pointer"
                            title="Edit Article"
                          >
                            <Edit className="h-4 w-4" />
                          </button>

                          <button
                            onClick={() => handleDelete(post.id, post.title)}
                            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition cursor-pointer"
                            title="Delete Article"
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
