import { useState, useEffect } from "react";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { ProjectItem, MediaItem, CategoryItem } from "@/types/dashboard";
import { BASE_URL } from "@/utils/api";

const API_BASE_URL = BASE_URL;
const MAX_FILE_SIZE_BYTES = 40 * 1024 * 1024;

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: ProjectItem | null;
  categories: CategoryItem[];
  onSuccess: (project: ProjectItem, isEdit: boolean) => void;
}

export default function ProjectModal({ isOpen, onClose, project, categories, onSuccess }: ProjectModalProps) {
  const [isSaving, setIsSaving] = useState(false);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  
  const [form, setForm] = useState({ name: "", categoryId: "", city: "", state: "", desc: "", tags: "" });

  useEffect(() => {
    if (isOpen) {
      if (project) {
        const catId = typeof project.category === "string" ? project.category : (project.category as any)?._id || project.categoryId || "";
        setForm({
          name: project.name, categoryId: catId, city: project.city, state: project.state,
          desc: project.description || "", tags: project.tags?.join(", ") || ""
        });
        setMediaItems(project.media?.map((url, i) => ({ id: `existing-${i}`, url })) || []);
      } else {
        setForm({ name: "", categoryId: "", city: "", state: "", desc: "", tags: "" });
        setMediaItems([]);
      }
    }
  }, [isOpen, project]);

  if (!isOpen) return null;

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const newFiles = Array.from(e.target.files);
    const currentSize = mediaItems.reduce((acc, item) => acc + (item.file?.size || 0), 0);
    const newSize = newFiles.reduce((acc, file) => acc + file.size, 0);

    if (currentSize + newSize > MAX_FILE_SIZE_BYTES) return alert("Upload exceeds 40MB.");

    const newItems = newFiles.map(file => ({ id: `new-${Math.random()}`, url: URL.createObjectURL(file), file }));
    setMediaItems([...mediaItems, ...newItems]);
    e.target.value = '';
  };

  const removeMedia = (id: string) => setMediaItems(mediaItems.filter(item => item.id !== id));
  const moveMedia = (index: number, dir: 'left' | 'right') => {
    const newIndex = dir === 'left' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= mediaItems.length) return;
    const items = [...mediaItems];
    [items[index], items[newIndex]] = [items[newIndex], items[index]];
    setMediaItems(items);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.categoryId) return alert("Select a category.");
    const token = localStorage.getItem("token");
    if (!token) return;

    setIsSaving(true);
    try {
      const filesToUpload = mediaItems.filter(item => item.file).map(item => item.file as File);
      let uploadedUrls: string[] = [];

      if (filesToUpload.length > 0) {
        const formData = new FormData();
        filesToUpload.forEach(f => formData.append("images", f));
        const res = await fetch(`${API_BASE_URL}user/images`, { method: "POST", headers: { "Authorization": `Bearer ${token}` }, body: formData });
        const data = await res.json();
        if (!data.success) throw new Error("Image upload failed");
        uploadedUrls = data.urls;
      }

      let uploadIdx = 0;
      const finalMediaUrls = mediaItems.map(item => item.file ? uploadedUrls[uploadIdx++] : item.url);

      const payload = { ...form, media: finalMediaUrls, tags: form.tags ? form.tags.split(',').map(s => s.trim()).filter(Boolean) : [] };
      const url = project ? `${API_BASE_URL}user/projects/${project._id}` : `${API_BASE_URL}user/projects`;

      const res = await fetch(url, { method: project ? "PUT" : "POST", headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` }, body: JSON.stringify(payload) });
      const data = await res.json();

      if (data.success) {
        onSuccess(data.project, !!project);
        onClose();
      } else alert(data.message);
    } catch (err: any) { alert(err.message || "Error saving project"); } 
    finally { setIsSaving(false); }
  };

  const selectedCategoryName = categories.find(c => c._id === form.categoryId)?.name || "Select a category";

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-zinc-900/60 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-zinc-900 rounded-4xl w-full max-w-2xl p-5 sm:p-8 max-h-[90vh] overflow-y-auto shadow-2xl border border-zinc-200 dark:border-zinc-800">
        <h2 className="text-xl sm:text-2xl font-extrabold mb-6 text-zinc-900 dark:text-zinc-100">{project ? "Edit Project" : "Publish Project"}</h2>
        <form onSubmit={handleSave} className="flex flex-col gap-4 sm:gap-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            <div>
              <label className="text-xs font-bold text-zinc-900 dark:text-zinc-300 uppercase tracking-wide mb-2 block">Project Title <span className="text-red-500">*</span></label>
              <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 focus:border-[#EAB308] rounded-xl p-3.5 text-sm text-zinc-900 dark:text-zinc-100 outline-none" />
            </div>
            <div className="relative">
              <label className="text-xs font-bold text-zinc-900 dark:text-zinc-300 uppercase tracking-wide mb-2 block">Category <span className="text-red-500">*</span></label>
              <div className="relative" tabIndex={0} onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget)) setIsCategoryDropdownOpen(false); }}>
                <button type="button" onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)} className="flex items-center justify-between w-full bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-xl p-3.5 text-sm text-zinc-900 dark:text-zinc-100 outline-none">
                  <span className="truncate">{selectedCategoryName}</span>
                </button>
                {isCategoryDropdownOpen && (
                  <div className="absolute z-50 w-full mt-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-xl max-h-60 overflow-y-auto py-1">
                    {categories.map((cat) => (
                      <button key={cat._id} type="button" onClick={() => { setForm({ ...form, categoryId: cat._id }); setIsCategoryDropdownOpen(false); }} className="w-full text-left px-4 py-3 text-sm hover:bg-zinc-50 dark:hover:bg-zinc-800">
                        {cat.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            <div>
              <label className="text-xs font-bold text-zinc-900 dark:text-zinc-300 uppercase tracking-wide mb-2 block">City</label>
              <input required value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} className="w-full bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 focus:border-[#EAB308] rounded-xl p-3.5 text-sm text-zinc-900 dark:text-zinc-100 outline-none" />
            </div>
            <div>
              <label className="text-xs font-bold text-zinc-900 dark:text-zinc-300 uppercase tracking-wide mb-2 block">State</label>
              <input required value={form.state} onChange={(e) => setForm({ ...form, state: e.target.value })} className="w-full bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 focus:border-[#EAB308] rounded-xl p-3.5 text-sm text-zinc-900 dark:text-zinc-100 outline-none" />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-zinc-900 dark:text-zinc-300 uppercase tracking-wide mb-2 block">Description</label>
            <textarea value={form.desc} onChange={(e) => setForm({ ...form, desc: e.target.value })} className="w-full bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 focus:border-[#EAB308] rounded-xl p-3.5 text-sm text-zinc-900 dark:text-zinc-100 outline-none resize-none" rows={3} />
          </div>

          <div>
            <label className="text-xs font-bold text-zinc-900 dark:text-zinc-300 uppercase tracking-wide mb-2 block">Media Sequence</label>
            {mediaItems.length > 0 && (
              <div className="flex flex-wrap gap-3 mb-4 bg-zinc-50 dark:bg-zinc-800 p-4 rounded-xl">
                {mediaItems.map((item, index) => (
                  <div key={item.id} className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-lg overflow-hidden group">
                    <img src={item.url} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex flex-col justify-between p-1.5">
                      <button type="button" onClick={() => removeMedia(item.id)} className="bg-red-500 text-white rounded-full w-5 h-5 flex self-end items-center justify-center text-[10px]">✕</button>
                      <div className="flex justify-between w-full">
                        <button type="button" onClick={() => moveMedia(index, 'left')} disabled={index === 0} className="bg-white rounded px-1 text-xs">◂</button>
                        <button type="button" onClick={() => moveMedia(index, 'right')} disabled={index === mediaItems.length - 1} className="bg-white rounded px-1 text-xs">▸</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <input type="file" id="media-upload" multiple accept="image/*" className="hidden" onChange={handleFileSelect} />
            <label htmlFor="media-upload" className="w-full border-2 border-dashed border-zinc-300 hover:border-[#EAB308] rounded-xl p-4 sm:p-6 flex flex-col items-center justify-center cursor-pointer">
              <span className="font-bold">Upload Photos</span>
            </label>
          </div>

          <div>
            <label className="text-xs font-bold text-zinc-900 dark:text-zinc-300 uppercase tracking-wide mb-2 block">Tags</label>
            <input value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })} placeholder="Modern, Minimalist..." className="w-full bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 focus:border-[#EAB308] rounded-xl p-3.5 text-sm outline-none" />
          </div>

          <div className="flex gap-4 mt-6 pt-6 border-t border-zinc-100 dark:border-zinc-800">
            <button type="button" onClick={onClose} disabled={isSaving} className="flex-1 py-3 border border-zinc-300 rounded-xl font-bold">Cancel</button>
            <button type="submit" disabled={isSaving} className="flex-1 py-3 bg-[#EAB308] text-white rounded-xl font-bold flex justify-center items-center">
              {isSaving ? <LoadingSpinner className="w-5 h-5 mr-2" /> : (project ? "Save" : "Publish")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}