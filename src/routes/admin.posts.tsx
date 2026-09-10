import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { BlogPostEditor } from "@/components/admin/BlogPostEditor";
import { getAdminPosts, createPost, updatePost, deletePost } from "@/lib/adminApi";
import { Post } from "@/lib/api";
import {
  AlertCircle,
  BookOpen,
  Calendar,
  Check,
  Clock,
  Edit,
  Eye,
  Filter,
  Image as ImageIcon,
  Plus,
  Search,
  Star,
  Tag,
  Trash2,
} from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/posts")({
  head: () => ({ meta: [{ title: "Blog Posts CMS | Zain The Analyst Admin" }] }),
  component: AdminPostsPage,
});

function AdminPostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "draft" | "published">("all");
  const [error, setError] = useState("");
  const [formError, setFormError] = useState("");
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [isCreateMode, setIsCreateMode] = useState(false);

  async function loadPosts() {
    setLoading(true);
    setError("");
    try {
      setPosts(await getAdminPosts());
    } catch (err: any) {
      setError(err?.message || "Failed to load blog posts.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadPosts();
  }, []);

  function startCreate() {
    setEditingPost(null);
    setIsCreateMode(true);
    setFormError("");
  }

  function startEdit(post: Post) {
    setEditingPost(post);
    setIsCreateMode(false);
    setFormError("");
  }

  function closeEditor() {
    setEditingPost(null);
    setIsCreateMode(false);
    setFormError("");
  }

  async function handleSave(payload: Partial<Post>) {
    setSaving(true);
    setFormError("");
    try {
      if (isCreateMode) {
        await createPost(payload as any);
        toast.success("Blog post created successfully.");
      } else if (editingPost) {
        await updatePost(editingPost.id, payload);
        toast.success("Blog post updated successfully.");
      }
      closeEditor();
      await loadPosts();
    } catch (err: any) {
      setFormError(err?.message || "Failed to save blog post.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string, title: string) {
    if (!confirm(`Delete blog post ${title}?`)) return;
    try {
      await deletePost(id);
      toast.success("Blog post deleted successfully.");
      await loadPosts();
    } catch (err: any) {
      toast.error(err?.message || "Failed to delete blog post.");
    }
  }

  async function togglePublish(post: Post) {
    const nextStatus = post.status === "published" ? "draft" : "published";
    const payload: Partial<Post> = { status: nextStatus };
    if (nextStatus === "published" && !post.published_at)
      payload.published_at = new Date().toISOString();
    try {
      await updatePost(post.id, payload);
      toast.success(`Status updated to ${nextStatus}.`);
      await loadPosts();
    } catch (err: any) {
      toast.error(err?.message || "Failed to update status.");
    }
  }

  const filteredPosts = useMemo(() => {
    const search = searchQuery.toLowerCase();
    return posts.filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(search) ||
        (post.category || "").toLowerCase().includes(search) ||
        (post.tags || []).some((tag) => tag.toLowerCase().includes(search));
      const matchesStatus = statusFilter === "all" || post.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [posts, searchQuery, statusFilter]);

  if (editingPost || isCreateMode) {
    return (
      <div className="space-y-8 font-poppins text-[#202420]">
        <BlogPostEditor
          key={editingPost?.id || "new"}
          post={editingPost}
          isCreateMode={isCreateMode}
          loading={saving}
          error={formError}
          onCancel={closeEditor}
          onSave={handleSave}
        />
      </div>
    );
  }

  return (
    <div className="space-y-8 font-poppins text-[#202420]">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#4D574F]">
            Content Studio
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">Blog Management</h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-[#4D574F]">
            Create, edit, publish, and organize analytics guides with SEO fields, structured
            sections, takeaways, and gallery images.
          </p>
        </div>
        <button
          onClick={startCreate}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-[#245C73] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#19485D]"
        >
          <Plus className="h-4 w-4" /> New Article
        </button>
      </div>

      <div className="rounded-[28px] border border-[#D5D9D2] bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#5F6961]" />
            <input
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search title, category, or tags..."
              className="w-full rounded-full border border-[#D5D9D2] bg-[#FAF9F6] py-3 pl-11 pr-4 text-sm outline-none focus:border-[#245C73]"
            />
          </div>
          <div className="flex items-center gap-3">
            <Filter className="h-4 w-4 text-[#5F6961]" />
            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value as any)}
              className="rounded-full border border-[#D5D9D2] bg-[#FAF9F6] px-4 py-3 text-sm outline-none focus:border-[#245C73]"
            >
              <option value="all">All Statuses</option>
              <option value="draft">Drafts</option>
              <option value="published">Published</option>
            </select>
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-[32px] border border-[#D5D9D2] bg-white shadow-sm">
        {loading ? (
          <div className="flex items-center justify-center gap-3 p-16 text-[#4D574F]">
            <BookOpen className="h-5 w-5 animate-pulse" /> Loading posts...
          </div>
        ) : error ? (
          <div className="flex items-center gap-3 p-8 text-red-600">
            <AlertCircle className="h-5 w-5" /> {error}
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="p-16 text-center">
            <BookOpen className="mx-auto mb-4 h-10 w-10 text-[#245C73]" />
            <h3 className="text-lg font-semibold">No blog posts found.</h3>
            <p className="mt-2 text-sm text-[#4D574F]">
              Create your first article or change the filter.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-[#D5D9D2]">
            {filteredPosts.map((post) => (
              <div
                key={post.id}
                className="grid gap-5 p-5 lg:grid-cols-[120px_1fr_auto] lg:items-center"
              >
                <div className="overflow-hidden rounded-2xl border border-[#D5D9D2] bg-[#F1F2EE]">
                  {post.cover_url ? (
                    <img src={post.cover_url} alt="" className="h-24 w-full object-cover" />
                  ) : (
                    <div className="flex h-24 items-center justify-center">
                      <ImageIcon className="h-5 w-5 text-[#5F6961]" />
                    </div>
                  )}
                </div>
                <div className="min-w-0">
                  <div className="mb-2 flex flex-wrap items-center gap-2 text-xs text-[#4D574F]">
                    <span className="inline-flex items-center gap-1 rounded-full bg-[#F1F2EE] px-2.5 py-1">
                      <Tag className="h-3 w-3" />
                      {post.category || "Article"}
                    </span>
                    {post.featured && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2.5 py-1 text-[#245C73]">
                        <Star className="h-3 w-3" />
                        Featured
                      </span>
                    )}
                    <span className="inline-flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {post.published_at
                        ? new Date(post.published_at).toLocaleDateString()
                        : "Not published"}
                    </span>
                    {post.reading_time && (
                      <span className="inline-flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {post.reading_time}
                      </span>
                    )}
                  </div>
                  <h3 className="truncate text-lg font-semibold">{post.title}</h3>
                  <p className="mt-1 line-clamp-2 text-sm leading-6 text-[#4D574F]">
                    {post.excerpt}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {(post.tags || []).slice(0, 5).map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-[#D5D9D2] px-2.5 py-1 text-xs text-[#4D574F]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 lg:justify-end">
                  <button
                    onClick={() => togglePublish(post)}
                    className="inline-flex items-center gap-1 rounded-full border border-[#D5D9D2] px-3 py-2 text-xs font-semibold hover:bg-[#F1F2EE]"
                  >
                    <Check className="h-3.5 w-3.5" />
                    {post.status === "published" ? "Unpublish" : "Publish"}
                  </button>
                  {post.status === "published" && (
                    <a
                      href={`/blog/${post.slug}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 rounded-full border border-[#D5D9D2] px-3 py-2 text-xs font-semibold hover:bg-[#F1F2EE]"
                    >
                      <Eye className="h-3.5 w-3.5" />
                      View
                    </a>
                  )}
                  <button
                    onClick={() => startEdit(post)}
                    className="inline-flex items-center gap-1 rounded-full bg-[#245C73] px-3 py-2 text-xs font-semibold text-white hover:bg-[#19485D]"
                  >
                    <Edit className="h-3.5 w-3.5" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(post.id, post.title)}
                    className="inline-flex items-center gap-1 rounded-full border border-red-200 px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
