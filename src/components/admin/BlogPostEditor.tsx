import { useState } from "react";
import { BlogGalleryImage, BlogSection, Post } from "@/lib/api";
import { generateSlug } from "@/lib/adminApi";
import { supabase } from "@/lib/supabase";
import { AlertCircle, BookOpen, Image as ImageIcon, Layers, Plus, Save, Tag, Upload, X } from "lucide-react";

const listFromText = (value: string) => value.split("\n").map((item) => item.trim()).filter(Boolean);
const textFromList = (value?: string[]) => (value || []).join("\n");
const tagsFromText = (value: string) => value.split(",").map((item) => item.trim()).filter(Boolean);

type BlogPostEditorProps = {
  post?: Post | null;
  isCreateMode: boolean;
  loading: boolean;
  error: string;
  onCancel: () => void;
  onSave: (payload: Partial<Post>) => Promise<void>;
};

export function BlogPostEditor({ post, isCreateMode, loading, error, onCancel, onSave }: BlogPostEditorProps) {
  const [formError, setFormError] = useState(error || "");
  const [uploadingCover, setUploadingCover] = useState(false);
  const [title, setTitle] = useState(post?.title || "");
  const [slug, setSlug] = useState(post?.slug || "");
  const [category, setCategory] = useState(post?.category || "");
  const [excerpt, setExcerpt] = useState(post?.excerpt || "");
  const [bodyMd, setBodyMd] = useState(post?.body_md || "");
  const [coverUrl, setCoverUrl] = useState(post?.cover_url || "");
  const [status, setStatus] = useState<"draft" | "published">(post?.status || "draft");
  const [featured, setFeatured] = useState(Boolean(post?.featured));
  const [authorName, setAuthorName] = useState(post?.author_name || "Zain Haidar");
  const [readingTime, setReadingTime] = useState(post?.reading_time || "");
  const [publishedAt, setPublishedAt] = useState(post?.published_at ? post.published_at.slice(0, 16) : "");
  const [heroTitle, setHeroTitle] = useState(post?.hero_title || "");
  const [heroDescription, setHeroDescription] = useState(post?.hero_description || "");
  const [seoTitle, setSeoTitle] = useState(post?.seo_title || "");
  const [seoDescription, setSeoDescription] = useState(post?.seo_description || "");
  const [tagsText, setTagsText] = useState((post?.tags || []).join(", "));
  const [keyTakeawaysText, setKeyTakeawaysText] = useState(textFromList(post?.key_takeaways));
  const [relatedServicesText, setRelatedServicesText] = useState((post?.related_services || []).join(", "));
  const [sections, setSections] = useState<BlogSection[]>(post?.sections || []);
  const [gallery, setGallery] = useState<BlogGalleryImage[]>(post?.gallery || []);

  function handleTitleChange(value: string) {
    setTitle(value);
    if (isCreateMode || !slug.trim()) setSlug(generateSlug(value));
  }

  async function handleCoverUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setFormError("Please select an image file.");
      return;
    }
    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      setFormError("Cover image must be smaller than 10MB.");
      return;
    }
    setUploadingCover(true);
    setFormError("");
    const safeSlug = generateSlug(slug || title || "blog-post") || "blog-post";
    const extension = file.name.split(".").pop()?.toLowerCase() || "jpg";
    const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${extension}`;
    const filePath = `blogs/${safeSlug}/${fileName}`;
    try {
      const { error: uploadError } = await supabase.storage.from("blog-images").upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
      });
      if (uploadError) throw uploadError;
      const { data } = supabase.storage.from("blog-images").getPublicUrl(filePath);
      if (!data.publicUrl) throw new Error("Image uploaded, but public URL was not returned.");
      setCoverUrl(data.publicUrl);
    } catch (err: any) {
      setFormError(err?.message || "Cover image upload failed. Check the blog-images bucket and storage policy.");
    } finally {
      setUploadingCover(false);
      event.target.value = "";
    }
  }

  function updateSection(index: number, key: keyof BlogSection, value: string) {
    setSections((items) => items.map((item, i) => (i === index ? { ...item, [key]: value } : item)));
  }

  function updateGallery(index: number, key: keyof BlogGalleryImage, value: string) {
    setGallery((items) => items.map((item, i) => (i === index ? { ...item, [key]: value } : item)));
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!title.trim()) return setFormError("Title is required.");
    if (!slug.trim()) return setFormError("Slug is required.");
    if (!excerpt.trim()) return setFormError("Excerpt is required.");
    if (!bodyMd.trim() && sections.length === 0) return setFormError("Add markdown body content or at least one section.");

    const payload: Partial<Post> = {
      title: title.trim(),
      slug: generateSlug(slug.trim()),
      category: category.trim() || undefined,
      excerpt: excerpt.trim(),
      body_md: bodyMd.trim(),
      cover_url: coverUrl.trim() || undefined,
      status,
      featured,
      author_name: authorName.trim() || "Zain Haidar",
      reading_time: readingTime.trim() || null,
      published_at: publishedAt ? new Date(publishedAt).toISOString() : undefined,
      hero_title: heroTitle.trim() || null,
      hero_description: heroDescription.trim() || null,
      seo_title: seoTitle.trim() || null,
      seo_description: seoDescription.trim() || null,
      tags: tagsFromText(tagsText),
      key_takeaways: listFromText(keyTakeawaysText),
      sections: sections.map((section) => ({ heading: section.heading?.trim() || "", content: section.content?.trim() || "" })).filter((section) => section.heading || section.content),
      related_services: tagsFromText(relatedServicesText),
      gallery: gallery.map((image) => ({ image_url: image.image_url?.trim() || "", alt_text: image.alt_text?.trim() || "", caption: image.caption?.trim() || "" })).filter((image) => image.image_url),
    };

    if (status === "published" && !payload.published_at) payload.published_at = post?.published_at || new Date().toISOString();
    setFormError("");
    await onSave(payload);
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-[32px] border border-[#E8E8ED] bg-white shadow-sm">
      <div className="flex items-start justify-between gap-4 border-b border-[#E8E8ED] p-6">
        <div>
          <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#6E6E73]"><BookOpen className="h-4 w-4" /> Blog Editor</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-[#1D1D1F]">{isCreateMode ? "Create Blog Post" : `Edit: ${title}`}</h2>
          <p className="mt-1 text-sm text-[#6E6E73]">Manage the full blog record used by the public blog pages.</p>
        </div>
        <button type="button" onClick={onCancel} className="rounded-full border border-[#D2D2D7] p-2 text-[#6E6E73] hover:bg-[#F5F5F7]"><X className="h-4 w-4" /></button>
      </div>

      <div className="space-y-8 p-6 md:p-8">
        {(formError || error) && <div className="flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700"><AlertCircle className="mt-0.5 h-4 w-4" />{formError || error}</div>}

        <EditorSection title="Basic Details" icon={<Layers className="h-4 w-4" />}>
          <div className="grid gap-5 md:grid-cols-2">
            <TextInput label="Title" required value={title} onChange={handleTitleChange} />
            <TextInput label="Slug" required value={slug} onChange={setSlug} mono action={<button type="button" onClick={() => setSlug(generateSlug(title))} className="text-xs font-semibold text-[#0071E3]">Auto</button>} />
            <TextInput label="Category" value={category} onChange={setCategory} />
            <TextInput label="Reading Time" value={readingTime} onChange={setReadingTime} placeholder="6 min read" />
            <TextInput label="Author" value={authorName} onChange={setAuthorName} />
            <div><label className="mb-2 block text-xs font-semibold text-[#6E6E73]">Status</label><select value={status} onChange={(event) => setStatus(event.target.value as any)} className="w-full rounded-2xl border border-[#D2D2D7] bg-white px-4 py-3 text-sm outline-none focus:border-[#0071E3]"><option value="draft">Draft</option><option value="published">Published</option></select></div>
            <TextInput label="Published Date" type="datetime-local" value={publishedAt} onChange={setPublishedAt} />
            <label className="flex items-center gap-3 rounded-2xl border border-[#E8E8ED] bg-white px-4 py-3 text-sm font-medium"><input type="checkbox" checked={featured} onChange={(event) => setFeatured(event.target.checked)} className="h-4 w-4 accent-[#0071E3]" /> Featured article</label>
          </div>
        </EditorSection>

        <EditorSection title="Hero, SEO, and Images" icon={<ImageIcon className="h-4 w-4" />}>
          <div className="grid gap-5 md:grid-cols-2">
            <TextInput label="Hero Title" value={heroTitle} onChange={setHeroTitle} />
            <TextInput label="SEO Title" value={seoTitle} onChange={setSeoTitle} />
            <TextArea label="Hero Description" value={heroDescription} onChange={setHeroDescription} rows={3} />
            <TextArea label="SEO Description" value={seoDescription} onChange={setSeoDescription} rows={3} />
          </div>
          <div className="mt-5 grid gap-5 md:grid-cols-[1fr_220px]">
            <div className="space-y-3">
              <TextInput label="Cover Image URL" value={coverUrl} onChange={setCoverUrl} mono />
              <label className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-[#D2D2D7] bg-white px-4 py-2.5 text-sm font-semibold text-[#0071E3] hover:bg-[#F5F5F7]">
                <Upload className="h-4 w-4" />
                {uploadingCover ? "Uploading..." : "Select and Upload Cover"}
                <input type="file" accept="image/jpeg,image/png,image/webp" onChange={handleCoverUpload} disabled={uploadingCover} className="hidden" />
              </label>
              <p className="text-xs text-[#86868B]">Uploads to Supabase Storage bucket: blog-images.</p>
            </div>
            <div className="overflow-hidden rounded-3xl border border-[#E8E8ED] bg-[#F5F5F7]">{coverUrl ? <img src={coverUrl} alt="Cover preview" className="h-36 w-full object-cover" /> : <div className="flex h-36 items-center justify-center text-sm text-[#86868B]">No cover image</div>}</div>
          </div>
        </EditorSection>

        <EditorSection title="Excerpt and Markdown Body" icon={<BookOpen className="h-4 w-4" />}><TextArea label="Excerpt" required value={excerpt} onChange={setExcerpt} rows={3} /><div className="mt-5"><TextArea label="Markdown Body" value={bodyMd} onChange={setBodyMd} rows={14} mono /></div></EditorSection>
        <EditorSection title="Tags, Takeaways, Related Services" icon={<Tag className="h-4 w-4" />}><div className="grid gap-5 md:grid-cols-3"><TextArea label="Tags" value={tagsText} onChange={setTagsText} rows={4} placeholder="Power BI, SQL" /><TextArea label="Key Takeaways" value={keyTakeawaysText} onChange={setKeyTakeawaysText} rows={4} placeholder="One takeaway per line" /><TextArea label="Related Services" value={relatedServicesText} onChange={setRelatedServicesText} rows={4} placeholder="Power BI Dashboards, SQL Data Analysis" /></div></EditorSection>

        <EditorSection title="Structured Sections" icon={<Layers className="h-4 w-4" />}><div className="space-y-4">{sections.map((section, index) => <div key={index} className="rounded-3xl border border-[#E8E8ED] bg-white p-4"><div className="mb-4 flex items-center justify-between"><span className="text-sm font-semibold">Section {index + 1}</span><button type="button" onClick={() => setSections((items) => items.filter((_, i) => i !== index))} className="text-sm font-semibold text-red-600">Remove</button></div><div className="space-y-4"><TextInput label="Heading" value={section.heading || ""} onChange={(value) => updateSection(index, "heading", value)} /><TextArea label="Content" value={section.content || ""} onChange={(value) => updateSection(index, "content", value)} rows={5} /></div></div>)}<button type="button" onClick={() => setSections((items) => [...items, { heading: "", content: "" }])} className="inline-flex items-center gap-2 rounded-full border border-[#D2D2D7] px-4 py-2 text-sm font-semibold text-[#0071E3]"><Plus className="h-4 w-4" /> Add Section</button></div></EditorSection>
        <EditorSection title="Gallery" icon={<ImageIcon className="h-4 w-4" />}><div className="space-y-4">{gallery.map((image, index) => <div key={index} className="grid gap-4 rounded-3xl border border-[#E8E8ED] bg-white p-4 md:grid-cols-[120px_1fr]"><div className="overflow-hidden rounded-2xl border border-[#E8E8ED] bg-[#F5F5F7]">{image.image_url ? <img src={image.image_url} alt="Gallery preview" className="h-28 w-full object-cover" /> : <div className="flex h-28 items-center justify-center text-xs text-[#86868B]">Image</div>}</div><div className="space-y-4"><div className="flex items-center justify-between"><span className="text-sm font-semibold">Gallery Image {index + 1}</span><button type="button" onClick={() => setGallery((items) => items.filter((_, i) => i !== index))} className="text-sm font-semibold text-red-600">Remove</button></div><TextInput label="Image URL" value={image.image_url || ""} onChange={(value) => updateGallery(index, "image_url", value)} mono /><div className="grid gap-4 md:grid-cols-2"><TextInput label="Alt Text" value={image.alt_text || ""} onChange={(value) => updateGallery(index, "alt_text", value)} /><TextInput label="Caption" value={image.caption || ""} onChange={(value) => updateGallery(index, "caption", value)} /></div></div></div>)}<button type="button" onClick={() => setGallery((items) => [...items, { image_url: "", alt_text: "", caption: "" }])} className="inline-flex items-center gap-2 rounded-full border border-[#D2D2D7] px-4 py-2 text-sm font-semibold text-[#0071E3]"><Plus className="h-4 w-4" /> Add Gallery Image</button></div></EditorSection>

        <div className="flex flex-col gap-3 border-t border-[#E8E8ED] pt-6 sm:flex-row sm:justify-end"><button type="button" onClick={onCancel} className="rounded-full border border-[#D2D2D7] px-6 py-3 text-sm font-semibold hover:bg-[#F5F5F7]">Cancel</button><button type="submit" disabled={loading || uploadingCover} className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0071E3] px-6 py-3 text-sm font-semibold text-white hover:bg-[#005BB5] disabled:opacity-60"><Save className="h-4 w-4" />{loading ? "Saving..." : "Save Blog Post"}</button></div>
      </div>
    </form>
  );
}

function EditorSection({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) { return <section className="rounded-[28px] border border-[#E8E8ED] bg-[#FBFBFD] p-5 md:p-6"><div className="mb-5 flex items-center gap-3"><div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-50 text-[#0071E3]">{icon}</div><h3 className="text-lg font-semibold tracking-tight">{title}</h3></div>{children}</section>; }
function TextInput({ label, value, onChange, placeholder, required, mono, type = "text", action }: { label: string; value: string; onChange: (value: string) => void; placeholder?: string; required?: boolean; mono?: boolean; type?: string; action?: React.ReactNode }) { return <div><label className="mb-2 flex items-center justify-between text-xs font-semibold text-[#6E6E73]"><span>{label}{required && <span className="text-red-500"> *</span>}</span>{action}</label><input type={type} value={value} required={required} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} className={`w-full rounded-2xl border border-[#D2D2D7] bg-white px-4 py-3 text-sm outline-none focus:border-[#0071E3] ${mono ? "font-mono text-xs" : ""}`} /></div>; }
function TextArea({ label, value, onChange, placeholder, required, mono, rows = 4 }: { label: string; value: string; onChange: (value: string) => void; placeholder?: string; required?: boolean; mono?: boolean; rows?: number }) { return <div><label className="mb-2 block text-xs font-semibold text-[#6E6E73]">{label}{required && <span className="text-red-500"> *</span>}</label><textarea value={value} required={required} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} rows={rows} className={`w-full rounded-2xl border border-[#D2D2D7] bg-white px-4 py-3 text-sm leading-6 outline-none focus:border-[#0071E3] ${mono ? "font-mono text-xs" : ""}`} /></div>; }
