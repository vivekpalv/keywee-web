import { useState, useEffect } from "react";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { QualificationItem } from "@/types/dashboard";
import { BASE_URL } from "@/utils/api";

const API_BASE_URL = BASE_URL;
const MAX_FILE_SIZE_BYTES = 40 * 1024 * 1024;

interface QualificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  qual: QualificationItem | null;
  onSuccess: (qual: QualificationItem, isEdit: boolean) => void;
}

export default function QualificationModal({ isOpen, onClose, qual, onSuccess }: QualificationModalProps) {
  const [isSaving, setIsSaving] = useState(false);
  const [certFile, setCertFile] = useState<File | null>(null);
  const [certPreview, setCertPreview] = useState<string | null>(null);

  const [form, setForm] = useState({ degree: "", university: "", yearOfPassing: "", coaNo: "", coaCertUrl: "" });

  useEffect(() => {
    if (isOpen) {
      if (qual) {
        setForm({ degree: qual.degree || "", university: qual.university || "", yearOfPassing: qual.yearOfPassing?.toString() || "", coaNo: qual.coaNo || "", coaCertUrl: qual.coaCertUrl || "" });
        setCertPreview(qual.coaCertUrl || null);
      } else {
        setForm({ degree: "", university: "", yearOfPassing: "", coaNo: "", coaCertUrl: "" });
        setCertPreview(null);
      }
      setCertFile(null);
    }
  }, [isOpen, qual]);

  if (!isOpen) return null;

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > MAX_FILE_SIZE_BYTES) return alert("Size exceeds 40MB");
      setCertFile(file);
      setCertPreview(URL.createObjectURL(file));
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token || (!certFile && !form.coaCertUrl)) return alert("Certificate required");

    setIsSaving(true);
    try {
      let finalCertUrl = form.coaCertUrl;
      if (certFile) {
        const formData = new FormData();
        formData.append("images", certFile);
        const res = await fetch(`${API_BASE_URL}user/images`, { method: "POST", headers: { "Authorization": `Bearer ${token}` }, body: formData });
        const data = await res.json();
        if (data.success) finalCertUrl = data.urls[0];
        else throw new Error("Upload failed");
      }

      const payload = { ...form, yearOfPassing: Number(form.yearOfPassing), coaCertUrl: finalCertUrl };
      const res = await fetch(qual ? `${API_BASE_URL}user/qualifications/${qual._id}` : `${API_BASE_URL}user/qualifications`, {
        method: qual ? "PUT" : "POST",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (data.success) {
        onSuccess(data.qualification, !!qual);
        onClose();
      } else alert(data.message);
    } catch (err: any) { alert(err.message); } 
    finally { setIsSaving(false); }
  };

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-zinc-900/60 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-zinc-900 rounded-4xl w-full max-w-md p-5 sm:p-8 shadow-2xl border border-zinc-200 dark:border-zinc-800">
        <h2 className="text-xl sm:text-2xl font-extrabold mb-6 text-zinc-900 dark:text-zinc-100">{qual ? "Edit Credential" : "Add Credential"}</h2>
        <form onSubmit={handleSave} className="flex flex-col gap-4 sm:gap-5">
          <input required value={form.degree} onChange={e => setForm({...form, degree: e.target.value})} placeholder="Degree (e.g. B.Arch)" className="w-full bg-white dark:bg-zinc-900 border border-zinc-300 rounded-xl p-3.5 text-sm outline-none" />
          <input required value={form.university} onChange={e => setForm({...form, university: e.target.value})} placeholder="Institution Name" className="w-full bg-white dark:bg-zinc-900 border border-zinc-300 rounded-xl p-3.5 text-sm outline-none" />
          <input required type="number" value={form.yearOfPassing} onChange={e => setForm({...form, yearOfPassing: e.target.value})} placeholder="Graduation Year" className="w-full bg-white dark:bg-zinc-900 border border-zinc-300 rounded-xl p-3.5 text-sm outline-none" />
          <input value={form.coaNo} onChange={e => setForm({...form, coaNo: e.target.value})} placeholder="COA Number (Optional)" className="w-full bg-white dark:bg-zinc-900 border border-zinc-300 rounded-xl p-3.5 text-sm outline-none" />
          
          <div className="flex flex-col gap-2 mt-2">
            <span className="text-xs font-bold uppercase text-zinc-500">Certificate *</span>
            <input type="file" id="cert-upload" accept="image/*,.pdf" className="hidden" onChange={handleFile} />
            <label htmlFor="cert-upload" className="px-5 py-3 border border-zinc-300 rounded-xl text-xs font-bold cursor-pointer text-center">{certPreview ? "Change Document" : "Upload Document"}</label>
          </div>

          <div className="flex gap-4 mt-6 pt-6 border-t border-zinc-100 dark:border-zinc-800">
            <button type="button" onClick={onClose} disabled={isSaving} className="flex-1 py-3 border border-zinc-300 rounded-xl font-bold">Cancel</button>
            <button type="submit" disabled={isSaving} className="flex-1 py-3 bg-black text-white rounded-xl font-bold flex justify-center items-center">
              {isSaving ? <LoadingSpinner className="w-5 h-5" /> : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}