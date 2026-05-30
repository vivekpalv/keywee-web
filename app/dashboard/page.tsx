'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const API_BASE_URL = "https://backend.keywee.in/api/v1"; 

// --- Reusable Loader Component ---
const LoadingSpinner = ({ className = "w-5 h-5 text-white" }) => (
  <svg className={`animate-spin ${className}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
);

// --- Interfaces ---
interface ProjectItem {
  _id: string;
  name: string;
  city: string;
  state: string;
  description?: string;
  media?: string[];
  tags?: string[];
}

interface QualificationItem {
  _id: string;
  degree?: string;
  university?: string;
  yearOfPassing?: number;
  coaNo?: string;
  coaCertUrl?: string; // This is now mandatory in the UI
}

interface UserProfile {
  _id: string;
  name: string;
  mobile: string;
  gender: string;
  architectDetails?: {
    firmName?: string;
    email?: string;
    contact?: string;
    experience?: number;
    bio?: string;
    city?: string;
    state?: string;
    verified?: boolean;
    profilePictureUrl?: string; 
  };
}

interface MediaItem {
  id: string;
  url: string; 
  file?: File; 
}

export default function Dashboard() {
  const router = useRouter();
  
  // Data States
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [qualifications, setQualifications] = useState<QualificationItem[]>([]);
  
  // UI States
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [isQualModalOpen, setIsQualModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isUploadingMedia, setIsUploadingMedia] = useState(false);
  const [isSavingProfile, setIsSavingProfile] = useState(false);

  // Edit Tracking States
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [editingQualId, setEditingQualId] = useState<string | null>(null);

  // Form States
  const [projectForm, setProjectForm] = useState({ name: "", city: "", state: "", desc: "", tags: "" });
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]); 
  const [qualForm, setQualForm] = useState({ degree: "", university: "", yearOfPassing: "", coaNo: "", coaCertUrl: "" });
  const [profileForm, setProfileForm] = useState({ name: "", firmName: "", email: "", contact: "", experience: "", bio: "", city: "", state: "", profilePictureUrl: "" });
  
  // Profile Image States
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
  const [profileImagePreview, setProfileImagePreview] = useState<string | null>(null);

  // Qualification Certificate States
  const [qualCertFile, setQualCertFile] = useState<File | null>(null);
  const [qualCertPreview, setQualCertPreview] = useState<string | null>(null);

  // --- Initial Data Fetch ---
  useEffect(() => {
    const fetchDashboardData = async () => {
      const token = localStorage.getItem("token");
      if (!token) return router.push("/login");

      try {
        const res = await fetch(`${API_BASE_URL}/user/me`, {
          headers: { "Authorization": `Bearer ${token}` }
        });
        const data = await res.json();

        if (data.success) {
          setProfile(data.user);
          setProjects(data.projects || []);
          setQualifications(data.qualifications || []);
        } else {
          setError("Failed to load profile.");
        }
      } catch (err) {
        setError("Network error.");
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, [router]);

  // --- PROFILE LOGIC ---
  const openEditProfile = () => {
    const ad = profile?.architectDetails;
    setProfileForm({
      name: profile?.name || "",
      firmName: ad?.firmName || "",
      email: ad?.email || "",
      contact: ad?.contact || profile?.mobile || "",
      experience: ad?.experience?.toString() || "0",
      bio: ad?.bio || "",
      city: ad?.city || "",
      state: ad?.state || "",
      profilePictureUrl: ad?.profilePictureUrl || ""
    });
    setProfileImagePreview(ad?.profilePictureUrl || null);
    setProfileImageFile(null);
    setIsProfileModalOpen(true);
  };

  const closeProfileModal = () => {
    setIsProfileModalOpen(false);
    setProfileImageFile(null);
    setProfileImagePreview(null);
  };

  const handleProfileImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProfileImageFile(file);
      setProfileImagePreview(URL.createObjectURL(file)); 
    }
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) return;

    setIsSavingProfile(true);
    try {
      let finalProfilePicUrl = profileForm.profilePictureUrl;

      if (profileImageFile) {
        const formData = new FormData();
        formData.append("images", profileImageFile); 

        const uploadRes = await fetch(`${API_BASE_URL}/user/images`, {
          method: "POST",
          headers: { "Authorization": `Bearer ${token}` },
          body: formData
        });
        const uploadData = await uploadRes.json();
        
        if (uploadData.success && uploadData.urls.length > 0) {
          finalProfilePicUrl = uploadData.urls[0];
        } else {
          throw new Error(uploadData.message || "Profile image upload failed.");
        }
      }

      const payload = {
        ...profileForm,
        experience: Number(profileForm.experience),
        profilePictureUrl: finalProfilePicUrl
      };

      const res = await fetch(`${API_BASE_URL}/user/architect-profile`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
        body: JSON.stringify(payload)
      });
      const data = await res.json();

      if (data.success) {
        setProfile(prev => prev ? { 
          ...prev, 
          name: data.user.name, 
          architectDetails: data.architectDetails 
        } : null);
        closeProfileModal();
      } else alert(data.message);
    } catch (err: any) { alert(err.message || "Error saving profile details"); }
    finally { setIsSavingProfile(false); }
  };

  // --- PROJECT LOGIC ---
  const openEditProject = (proj: ProjectItem) => {
    setProjectForm({
      name: proj.name,
      city: proj.city,
      state: proj.state,
      desc: proj.description || "",
      tags: proj.tags && proj.tags.length > 0 ? proj.tags.join(", ") : ""
    });
    setMediaItems(proj.media?.map((url, i) => ({ id: `existing-${i}`, url })) || []);
    setEditingProjectId(proj._id);
    setIsProjectModalOpen(true);
  };

  const closeProjectModal = () => {
    setIsProjectModalOpen(false);
    setEditingProjectId(null);
    setProjectForm({ name: "", city: "", state: "", desc: "", tags: "" });
    setMediaItems([]);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const newFiles = Array.from(e.target.files);
    const newMediaItems: MediaItem[] = newFiles.map(file => ({
      id: `new-${Date.now()}-${Math.random()}`,
      url: URL.createObjectURL(file),
      file: file
    }));
    setMediaItems(prev => [...prev, ...newMediaItems]);
    e.target.value = '';
  };

  const removeMedia = (id: string) => { setMediaItems(prev => prev.filter(item => item.id !== id)); };

  const moveMedia = (index: number, direction: 'left' | 'right') => {
    const newIndex = direction === 'left' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= mediaItems.length) return;
    const items = [...mediaItems];
    const temp = items[index];
    items[index] = items[newIndex];
    items[newIndex] = temp;
    setMediaItems(items);
  };

  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) return;

    setIsUploadingMedia(true);

    try {
      const filesToUpload = mediaItems.filter(item => item.file).map(item => item.file as File);
      let uploadedUrls: string[] = [];

      if (filesToUpload.length > 0) {
        const formData = new FormData();
        filesToUpload.forEach(file => formData.append("images", file));

        const uploadRes = await fetch(`${API_BASE_URL}/user/images`, {
          method: "POST",
          headers: { "Authorization": `Bearer ${token}` }, 
          body: formData
        });
        const uploadData = await uploadRes.json();

        if (!uploadData.success) {
          alert("Image upload failed: " + uploadData.message);
          setIsUploadingMedia(false);
          return;
        }
        uploadedUrls = uploadData.urls;
      }

      let uploadIndex = 0;
      const finalMediaUrls = mediaItems.map(item => {
        if (item.file) return uploadedUrls[uploadIndex++];
        return item.url;
      });

      const payload = {
        name: projectForm.name,
        city: projectForm.city,
        state: projectForm.state,
        desc: projectForm.desc,
        media: finalMediaUrls,
        tags: projectForm.tags ? projectForm.tags.split(',').map(s => s.trim()).filter(Boolean) : []
      };

      const method = editingProjectId ? "PUT" : "POST";
      const url = editingProjectId 
        ? `${API_BASE_URL}/user/projects/${editingProjectId}` 
        : `${API_BASE_URL}/user/projects`;

      const res = await fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
        body: JSON.stringify(payload)
      });
      const data = await res.json();

      if (data.success) {
        if (editingProjectId) setProjects(projects.map(p => p._id === editingProjectId ? data.project : p));
        else setProjects([...projects, data.project]);
        closeProjectModal();
      } else alert(data.message);
    } catch (err) { alert("Error saving project data"); } 
    finally { setIsUploadingMedia(false); }
  };

  const handleDeleteProject = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`${API_BASE_URL}/user/projects/${id}`, { method: "DELETE", headers: { "Authorization": `Bearer ${token}` } });
      const data = await res.json();
      if (data.success) setProjects(projects.filter(p => p._id !== id));
      else alert(data.message);
    } catch (err) { alert("Error deleting project"); }
  };

  // --- QUALIFICATION LOGIC ---
  const openEditQual = (qual: QualificationItem) => {
    setQualForm({
      degree: qual.degree || "",
      university: qual.university || "",
      yearOfPassing: qual.yearOfPassing ? qual.yearOfPassing.toString() : "",
      coaNo: qual.coaNo || "",
      coaCertUrl: qual.coaCertUrl || ""
    });
    setQualCertPreview(qual.coaCertUrl || null);
    setQualCertFile(null);
    setEditingQualId(qual._id);
    setIsQualModalOpen(true);
  };

  const closeQualModal = () => {
    setIsQualModalOpen(false);
    setEditingQualId(null);
    setQualForm({ degree: "", university: "", yearOfPassing: "", coaNo: "", coaCertUrl: "" });
    setQualCertPreview(null);
    setQualCertFile(null);
  };

  const handleQualCertSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setQualCertFile(file);
      setQualCertPreview(URL.createObjectURL(file)); 
    }
  };

  const handleSaveQualification = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) return;

    if (!qualCertFile && !qualForm.coaCertUrl) {
      alert("A Certificate image/document is strictly required.");
      return;
    }

    setIsUploadingMedia(true); 

    try {
      let finalCertUrl = qualForm.coaCertUrl;

      if (qualCertFile) {
        const formData = new FormData();
        formData.append("images", qualCertFile); 

        const uploadRes = await fetch(`${API_BASE_URL}/user/images`, {
          method: "POST",
          headers: { "Authorization": `Bearer ${token}` },
          body: formData
        });
        const uploadData = await uploadRes.json();
        
        if (uploadData.success && uploadData.urls.length > 0) {
          finalCertUrl = uploadData.urls[0];
        } else {
          throw new Error("Failed to upload the certificate document.");
        }
      }

      const payload = { 
        ...qualForm, 
        yearOfPassing: Number(qualForm.yearOfPassing),
        coaCertUrl: finalCertUrl 
      };

      const method = editingQualId ? "PUT" : "POST";
      const url = editingQualId ? `${API_BASE_URL}/user/qualifications/${editingQualId}` : `${API_BASE_URL}/user/qualifications`;

      const res = await fetch(url, { 
        method: method, 
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` }, 
        body: JSON.stringify(payload) 
      });
      const data = await res.json();

      if (data.success) {
        if (editingQualId) setQualifications(qualifications.map(q => q._id === editingQualId ? data.qualification : q));
        else setQualifications([...qualifications, data.qualification]);
        closeQualModal();
      } else alert(data.message);
    } catch (err: any) { 
      alert(err.message || "Error saving qualification"); 
    } finally {
      setIsUploadingMedia(false);
    }
  };

  const handleDeleteQualification = async (id: string) => {
    if (!confirm("Remove this qualification?")) return;
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`${API_BASE_URL}/user/qualifications/${id}`, { method: "DELETE", headers: { "Authorization": `Bearer ${token}` } });
      const data = await res.json();
      if (data.success) setQualifications(qualifications.filter(q => q._id !== id));
    } catch (err) { alert("Error deleting qualification"); }
  };


  // --- RENDER BLOCK ---
  if (loading) return (
    <div className="flex min-h-screen items-center justify-center bg-[#FBFAF7] gap-3">
      <LoadingSpinner className="w-6 h-6 text-zinc-900" />
      <span className="font-bold text-zinc-900">Loading Dashboard...</span>
    </div>
  );
  
  if (error) return <div className="flex min-h-screen items-center justify-center text-red-500 bg-[#FBFAF7]">{error}</div>;

  const archDetails = profile?.architectDetails;

  return (
    <div className="min-h-screen bg-[#FBFAF7] font-sans py-12 px-6">
      <div className="mx-auto max-w-6xl relative">
        
        {/* Header */}
        <div className="flex justify-between items-center border-b border-zinc-200 pb-8 mb-10">
          <div>
            <h1 className="text-3xl font-extrabold text-zinc-900 tracking-tight">Architect Dashboard</h1>
          </div>
          <Link href="/" className="text-xs font-bold border border-zinc-300 rounded-lg px-4 py-2.5 text-zinc-900 bg-white hover:bg-zinc-50 shadow-sm transition-colors">
            &larr; Back to Platform
          </Link>
        </div>

        {/* --- FULL PROFILE METRICS CARD --- */}
        <div className="rounded-[2rem] border border-zinc-200 bg-white p-8 mb-12 shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-yellow-400 to-yellow-600" />
          
          {/* EDIT PROFILE BUTTON */}
          <div className="absolute top-6 right-6">
            <button onClick={openEditProfile} className="text-xs font-bold border border-zinc-300 text-zinc-900 bg-white hover:bg-zinc-50 rounded-lg px-4 py-2 transition-colors shadow-sm">
              Edit Profile
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mt-2">
            
            {/* Primary Bio Area with Avatar */}
            <div className="md:col-span-7 flex flex-col justify-center border-b md:border-b-0 md:border-r border-zinc-100 pb-6 md:pb-0 md:pr-8 pt-4 md:pt-0">
              <div className="flex items-start gap-5 mb-4">
                
                {/* PROFILE AVATAR DISPLAY */}
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-zinc-100 border-4 border-[#FFF9E6] shadow-sm flex-shrink-0 overflow-hidden flex items-center justify-center relative">
                  {archDetails?.profilePictureUrl ? (
                    <img src={archDetails.profilePictureUrl} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-3xl">👤</span>
                  )}
                </div>

                <div className="pt-2">
                  <div className="flex items-center gap-3 mb-1">
                    <h2 className="text-3xl font-extrabold text-zinc-900 capitalize leading-none">{profile?.name}</h2>
                    {archDetails?.verified && (
                      <span className="bg-blue-50 text-blue-700 text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider border border-blue-100">Verified</span>
                    )}
                  </div>
                  <p className="text-sm font-bold text-[#EAB308] uppercase tracking-wide mt-1.5">{archDetails?.firmName || "Independent Professional"}</p>
                </div>
              </div>
              
              <div className="mt-2 text-sm text-zinc-600 leading-relaxed font-medium bg-zinc-50 p-4 rounded-xl border border-zinc-100">
                {archDetails?.bio ? `"${archDetails.bio}"` : "No professional biography provided yet. Add your story."}
              </div>
            </div>

            <div className="md:col-span-5 flex flex-col justify-center gap-4 text-sm font-semibold text-zinc-800">
              <div className="grid grid-cols-2 gap-4 mb-2">
                <div className="bg-[#FFF9E6] border border-yellow-100 p-4 rounded-2xl flex flex-col items-center justify-center text-center">
                  <span className="text-2xl font-black text-yellow-600">{projects.length}</span>
                  <span className="text-[10px] uppercase text-yellow-700 font-bold mt-1">Total Projects</span>
                </div>
                <div className="bg-zinc-50 border border-zinc-100 p-4 rounded-2xl flex flex-col items-center justify-center text-center">
                  <span className="text-2xl font-black text-zinc-900">{archDetails?.experience || 0}</span>
                  <span className="text-[10px] uppercase text-zinc-500 font-bold mt-1">Years Experience</span>
                </div>
              </div>
              <div className="flex items-center justify-between border-b border-zinc-100 pb-3 mt-2">
                <span className="text-zinc-400 font-medium">📍 Headquarters:</span>
                <span className="capitalize">{archDetails?.city}, {archDetails?.state}</span>
              </div>
              <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
                <span className="text-zinc-400 font-medium">📞 Direct Line:</span>
                <span>{archDetails?.contact || profile?.mobile}</span>
              </div>
              <div className="flex items-center justify-between pb-1">
                <span className="text-zinc-400 font-medium">✉️ Work Email:</span>
                <span className="text-zinc-900 truncate max-w-[200px]">{archDetails?.email || "Not Provided"}</span>
              </div>
            </div>
          </div>
        </div>

        {/* --- DYNAMIC GRIDS --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Projects Section */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <div className="flex justify-between items-center bg-white p-4 rounded-2xl border border-zinc-200 shadow-sm">
              <h3 className="text-xl font-extrabold text-zinc-900 pl-2">Project Portfolio</h3>
              <button onClick={() => setIsProjectModalOpen(true)} className="text-xs font-bold bg-[#EAB308] hover:bg-yellow-600 text-white rounded-xl px-5 py-2.5 transition-colors shadow-sm">
                + Add Project
              </button>
            </div>
            
            {projects.length === 0 ? (
               <div className="rounded-3xl border-2 border-dashed border-zinc-200 p-16 flex flex-col items-center justify-center text-center bg-zinc-50/50">
                  <p className="text-zinc-400 font-bold mb-2">Your portfolio is currently empty.</p>
                  <p className="text-xs text-zinc-500 font-medium max-w-xs">Upload your architectural designs and completed builds to attract clients.</p>
               </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {projects.map((proj) => (
                  <div key={proj._id} className="group rounded-[1.5rem] border border-zinc-200 bg-white shadow-sm flex flex-col overflow-hidden hover:shadow-md transition-shadow">
                    
                    {/* LINK ADDED HERE FOR THE IMAGE */}
                    <Link href={`/projects/${proj._id}`} className="block h-48 w-full bg-zinc-100 relative overflow-hidden cursor-pointer">
                      {proj.media && proj.media.length > 0 ? (
                        <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: `url('${proj.media[0]}')` }} />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center bg-zinc-50 text-zinc-300 text-xs font-bold uppercase tracking-widest">
                          No Image Uploaded
                        </div>
                      )}
                      <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1.5 rounded-full capitalize">
                        📍 {proj.city}, {proj.state}
                      </div>
                    </Link>

                    <div className="p-6 flex-1 flex flex-col">
                      {/* LINK ADDED HERE FOR THE TITLE */}
                      <Link href={`/projects/${proj._id}`}>
                        <h4 className="font-extrabold text-lg text-zinc-900 line-clamp-1 hover:text-[#EAB308] transition-colors cursor-pointer">{proj.name}</h4>
                      </Link>
                      
                      {proj.tags && proj.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-3">
                          {proj.tags.map((tag, i) => (
                            <span key={i} className="text-[9px] font-bold bg-zinc-100 text-zinc-600 px-2 py-1 rounded-md uppercase tracking-wide">{tag}</span>
                          ))}
                        </div>
                      )}

                      <p className="text-xs text-zinc-500 mt-4 line-clamp-3 font-medium leading-relaxed flex-1">
                        {proj.description || "No project description provided."}
                      </p>

                      <div className="mt-6 flex justify-between items-center border-t border-zinc-100 pt-4">
                        <span className="text-[10px] text-zinc-400 font-bold uppercase">ID: {proj._id.slice(-6)}</span>
                        <div className="flex gap-4">
                          <button onClick={() => openEditProject(proj)} className="text-xs text-[#EAB308] font-bold hover:underline transition-all">Edit</button>
                          <button onClick={() => handleDeleteProject(proj._id)} className="text-xs text-red-500 font-bold hover:underline transition-all">Delete</button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Qualifications Section */}
          <div className="flex flex-col gap-6">
            <div className="flex justify-between items-center bg-white p-4 rounded-2xl border border-zinc-200 shadow-sm">
              <h3 className="text-xl font-extrabold text-zinc-900 pl-2">Credentials</h3>
              <button onClick={() => setIsQualModalOpen(true)} className="text-xs font-bold border border-zinc-300 hover:bg-zinc-50 text-zinc-900 bg-white rounded-xl px-4 py-2.5 transition-colors">
                + Add
              </button>
            </div>

            {qualifications.length === 0 ? (
               <div className="rounded-3xl border-2 border-dashed border-zinc-200 p-10 text-center bg-zinc-50/50">
                  <p className="text-sm text-zinc-400 font-bold">No academic degrees tracked.</p>
               </div>
            ) : (
              <div className="flex flex-col gap-4">
                {qualifications.map((qual) => (
                  <div key={qual._id} className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm relative group hover:border-yellow-200 transition-colors">
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="text-base font-extrabold text-zinc-900 pr-8 leading-tight capitalize">{qual.degree || "Degree Specialization"}</h4>
                      <div className="absolute top-6 right-6 flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity bg-white pl-2">
                        <button onClick={() => openEditQual(qual)} className="text-xs text-[#EAB308] hover:underline font-bold">Edit</button>
                        <button onClick={() => handleDeleteQualification(qual._id)} className="text-xs text-red-500 hover:underline font-bold">Del</button>
                      </div>
                    </div>
                    <p className="text-sm font-bold text-[#EAB308] capitalize mb-1">{qual.university || "University Institution"}</p>
                    <div className="mt-4 flex flex-col gap-2 border-t border-zinc-100 pt-3">
                      {qual.yearOfPassing && (
                        <div className="flex items-center justify-between text-[11px] font-bold text-zinc-500 uppercase tracking-wide">
                          <span>Graduated:</span>
                          <span className="text-zinc-900 bg-zinc-100 px-2 py-0.5 rounded">{qual.yearOfPassing}</span>
                        </div>
                      )}
                      {qual.coaNo && (
                        <div className="flex items-center justify-between text-[11px] font-bold text-zinc-500 uppercase tracking-wide">
                          <span>COA No:</span>
                          <span className="text-zinc-900">{qual.coaNo}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>

      {/* --- EDIT PROFILE MODAL (With Avatar Uploader) --- */}
      {isProfileModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-zinc-900/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-[2rem] w-full max-w-2xl p-8 max-h-[90vh] overflow-y-auto shadow-2xl border border-zinc-200">
            <h2 className="text-2xl font-extrabold mb-6 text-zinc-900">Update Profile Details</h2>
            <form onSubmit={handleSaveProfile} className="flex flex-col gap-5">
              
              <div className="flex flex-col items-center justify-center gap-3 mb-4">
                <div className="w-28 h-28 rounded-full bg-zinc-100 border border-zinc-300 overflow-hidden relative group cursor-pointer shadow-sm">
                  {profileImagePreview ? (
                    <img src={profileImagePreview} alt="Avatar Preview" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-4xl text-zinc-300">👤</div>
                  )}
                  <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-white text-xs font-bold tracking-wide">Change</span>
                  </div>
                  <input type="file" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleProfileImageSelect} />
                </div>
                <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Profile Image</span>
              </div>

              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="text-xs font-bold text-zinc-900 uppercase tracking-wide mb-2 block">Full Name</label>
                  <input required placeholder="Your Full Name" value={profileForm.name} onChange={(e) => setProfileForm({...profileForm, name: e.target.value})} className="w-full border border-zinc-300 focus:border-[#EAB308] rounded-xl p-3.5 text-sm text-zinc-900 outline-none transition-all" />
                </div>
                <div>
                  <label className="text-xs font-bold text-zinc-900 uppercase tracking-wide mb-2 block">Firm Name</label>
                  <input required placeholder="e.g. Doe & Associates" value={profileForm.firmName} onChange={(e) => setProfileForm({...profileForm, firmName: e.target.value})} className="w-full border border-zinc-300 focus:border-[#EAB308] rounded-xl p-3.5 text-sm text-zinc-900 outline-none transition-all" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="text-xs font-bold text-zinc-900 uppercase tracking-wide mb-2 block">Work Email</label>
                  <input type="email" placeholder="Email Address" value={profileForm.email} onChange={(e) => setProfileForm({...profileForm, email: e.target.value})} className="w-full border border-zinc-300 focus:border-[#EAB308] rounded-xl p-3.5 text-sm text-zinc-900 outline-none transition-all" />
                </div>
                <div>
                  <label className="text-xs font-bold text-zinc-900 uppercase tracking-wide mb-2 block">Direct Contact</label>
                  <input placeholder="Contact Number" value={profileForm.contact} onChange={(e) => setProfileForm({...profileForm, contact: e.target.value})} className="w-full border border-zinc-300 focus:border-[#EAB308] rounded-xl p-3.5 text-sm text-zinc-900 outline-none transition-all" />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-5">
                <div className="col-span-1">
                  <label className="text-xs font-bold text-zinc-900 uppercase tracking-wide mb-2 block">Experience (Yrs)</label>
                  <input required type="number" min="0" value={profileForm.experience} onChange={(e) => setProfileForm({...profileForm, experience: e.target.value})} className="w-full border border-zinc-300 focus:border-[#EAB308] rounded-xl p-3.5 text-sm text-zinc-900 outline-none transition-all" />
                </div>
                <div className="col-span-1">
                  <label className="text-xs font-bold text-zinc-900 uppercase tracking-wide mb-2 block">City</label>
                  <input placeholder="City" value={profileForm.city} onChange={(e) => setProfileForm({...profileForm, city: e.target.value})} className="w-full border border-zinc-300 focus:border-[#EAB308] rounded-xl p-3.5 text-sm text-zinc-900 outline-none transition-all" />
                </div>
                <div className="col-span-1">
                  <label className="text-xs font-bold text-zinc-900 uppercase tracking-wide mb-2 block">State</label>
                  <input placeholder="State" value={profileForm.state} onChange={(e) => setProfileForm({...profileForm, state: e.target.value})} className="w-full border border-zinc-300 focus:border-[#EAB308] rounded-xl p-3.5 text-sm text-zinc-900 outline-none transition-all" />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-zinc-900 uppercase tracking-wide mb-2 block">Professional Bio</label>
                <textarea placeholder="Write a brief professional bio..." value={profileForm.bio} onChange={(e) => setProfileForm({...profileForm, bio: e.target.value})} className="w-full border border-zinc-300 focus:border-[#EAB308] rounded-xl p-3.5 text-sm text-zinc-900 outline-none transition-all resize-none" rows={4} />
              </div>
              
              <div className="flex gap-4 mt-6 pt-6 border-t border-zinc-100">
                <button type="button" onClick={closeProfileModal} disabled={isSavingProfile} className="flex-1 py-4 border border-zinc-300 hover:bg-zinc-50 text-zinc-900 rounded-xl font-extrabold transition-colors disabled:opacity-50">Cancel</button>
                <button type="submit" disabled={isSavingProfile} className="flex-1 py-4 flex items-center justify-center gap-2 bg-black hover:bg-zinc-800 text-white rounded-xl font-extrabold transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed">
                  {isSavingProfile && <LoadingSpinner className="w-5 h-5 text-white mr-1" />}
                  {isSavingProfile ? "Saving Profile..." : "Update Profile"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- ADVANCED PROJECT MODAL (With Image Uploading) --- */}
      {isProjectModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-zinc-900/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-[2rem] w-full max-w-2xl p-8 max-h-[90vh] overflow-y-auto shadow-2xl border border-zinc-200">
            <h2 className="text-2xl font-extrabold mb-6 text-zinc-900">{editingProjectId ? "Edit Project Details" : "Publish New Project"}</h2>
            <form onSubmit={handleSaveProject} className="flex flex-col gap-5">
              
              <div>
                <label className="text-xs font-bold text-zinc-900 uppercase tracking-wide mb-2 block">Project Title</label>
                <input required placeholder="e.g. Modern Seaview Villa" value={projectForm.name} onChange={(e) => setProjectForm({...projectForm, name: e.target.value})} className="w-full border border-zinc-300 focus:border-[#EAB308] focus:ring-1 focus:ring-[#EAB308] rounded-xl p-3.5 text-sm text-zinc-900 outline-none transition-all" />
              </div>

              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="text-xs font-bold text-zinc-900 uppercase tracking-wide mb-2 block">City</label>
                  <input required placeholder="e.g. Mumbai" value={projectForm.city} onChange={(e) => setProjectForm({...projectForm, city: e.target.value})} className="w-full border border-zinc-300 focus:border-[#EAB308] rounded-xl p-3.5 text-sm text-zinc-900 outline-none transition-all" />
                </div>
                <div>
                  <label className="text-xs font-bold text-zinc-900 uppercase tracking-wide mb-2 block">State</label>
                  <input required placeholder="e.g. Maharashtra" value={projectForm.state} onChange={(e) => setProjectForm({...projectForm, state: e.target.value})} className="w-full border border-zinc-300 focus:border-[#EAB308] rounded-xl p-3.5 text-sm text-zinc-900 outline-none transition-all" />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-zinc-900 uppercase tracking-wide mb-2 block">Overview / Description</label>
                <textarea placeholder="Write a compelling description of the architecture..." value={projectForm.desc} onChange={(e) => setProjectForm({...projectForm, desc: e.target.value})} className="w-full border border-zinc-300 focus:border-[#EAB308] rounded-xl p-3.5 text-sm text-zinc-900 outline-none transition-all resize-none" rows={3} />
              </div>

              {/* --- IMAGE UPLOADER UI --- */}
              <div>
                <label className="text-xs font-bold text-zinc-900 uppercase tracking-wide mb-2 flex justify-between">
                  <span>Project Media Sequence</span>
                  <span className="text-zinc-400 font-medium normal-case">{mediaItems.length} photos</span>
                </label>
                
                {mediaItems.length > 0 && (
                  <div className="flex flex-wrap gap-3 mb-4 bg-zinc-50 p-4 rounded-xl border border-zinc-100">
                    {mediaItems.map((item, index) => (
                      <div key={item.id} className="relative w-24 h-24 rounded-lg border border-zinc-200 overflow-hidden group shadow-sm bg-zinc-200">
                        <img src={item.url} alt={`Preview ${index}`} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-1.5">
                          <div className="flex justify-end">
                            <button type="button" onClick={() => removeMedia(item.id)} className="bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-[10px] font-bold shadow-sm hover:scale-110 transition-transform">✕</button>
                          </div>
                          <div className="flex justify-between w-full">
                            <button type="button" onClick={() => moveMedia(index, 'left')} disabled={index === 0} className="bg-white text-zinc-900 rounded p-1 text-xs disabled:opacity-30 hover:bg-zinc-200">◂</button>
                            <button type="button" onClick={() => moveMedia(index, 'right')} disabled={index === mediaItems.length - 1} className="bg-white text-zinc-900 rounded p-1 text-xs disabled:opacity-30 hover:bg-zinc-200">▸</button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <input type="file" id="media-upload" multiple accept="image/*" className="hidden" onChange={handleFileSelect} />
                <label htmlFor="media-upload" className="w-full border-2 border-dashed border-zinc-300 hover:border-[#EAB308] hover:bg-yellow-50 rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer transition-colors text-zinc-500">
                  <div className="bg-white p-2 rounded-full shadow-sm mb-2 text-xl">📸</div>
                  <span className="text-sm font-bold text-zinc-900 mb-1">Click to browse images</span>
                  <span className="text-xs">Supports High-Res JPG & PNG</span>
                </label>
              </div>

              <div>
                <label className="text-xs font-bold text-zinc-900 uppercase tracking-wide mb-2 block">Classification Tags</label>
                <input placeholder="Modern, Minimalist, Commercial..." value={projectForm.tags} onChange={(e) => setProjectForm({...projectForm, tags: e.target.value})} className="w-full border border-zinc-300 focus:border-[#EAB308] rounded-xl p-3.5 text-sm text-zinc-900 outline-none transition-all" />
              </div>
              
              <div className="flex gap-4 mt-6 pt-6 border-t border-zinc-100">
                <button type="button" onClick={closeProjectModal} disabled={isUploadingMedia} className="flex-1 py-4 border border-zinc-300 hover:bg-zinc-50 text-zinc-900 rounded-xl font-extrabold transition-colors disabled:opacity-50">Cancel</button>
                <button type="submit" disabled={isUploadingMedia} className="flex-1 py-4 flex items-center justify-center gap-2 bg-[#EAB308] hover:bg-yellow-600 text-white rounded-xl font-extrabold transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed">
                  {isUploadingMedia && <LoadingSpinner className="w-5 h-5 text-white mr-1" />}
                  {isUploadingMedia ? "Processing Uploads..." : editingProjectId ? "Save Changes" : "Publish Project"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- SMART QUALIFICATION MODAL (Add & Edit) --- */}
      {isQualModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-zinc-900/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-[2rem] w-full max-w-md p-8 shadow-2xl border border-zinc-200">
            <h2 className="text-2xl font-extrabold mb-6 text-zinc-900">{editingQualId ? "Edit Credential" : "Add Credential"}</h2>
            <form onSubmit={handleSaveQualification} className="flex flex-col gap-5">
              
              <div>
                <label className="text-xs font-bold text-zinc-900 uppercase tracking-wide mb-2 block">Degree Name</label>
                <input required placeholder="e.g. B.Arch" value={qualForm.degree} onChange={(e) => setQualForm({...qualForm, degree: e.target.value})} className="w-full border border-zinc-300 focus:border-[#EAB308] rounded-xl p-3.5 text-sm text-zinc-900 outline-none transition-all" />
              </div>

              <div>
                <label className="text-xs font-bold text-zinc-900 uppercase tracking-wide mb-2 block">University / Institution</label>
                <input required placeholder="Institution Name" value={qualForm.university} onChange={(e) => setQualForm({...qualForm, university: e.target.value})} className="w-full border border-zinc-300 focus:border-[#EAB308] rounded-xl p-3.5 text-sm text-zinc-900 outline-none transition-all" />
              </div>

              <div>
                <label className="text-xs font-bold text-zinc-900 uppercase tracking-wide mb-2 block">Graduation Year</label>
                <input required type="number" placeholder="YYYY" value={qualForm.yearOfPassing} onChange={(e) => setQualForm({...qualForm, yearOfPassing: e.target.value})} className="w-full border border-zinc-300 focus:border-[#EAB308] rounded-xl p-3.5 text-sm text-zinc-900 outline-none transition-all" />
              </div>

              <div>
                <label className="text-xs font-bold text-zinc-900 uppercase tracking-wide mb-2 block">COA Number (Optional)</label>
                <input placeholder="CA/20XX/XXXXX" value={qualForm.coaNo} onChange={(e) => setQualForm({...qualForm, coaNo: e.target.value})} className="w-full border border-zinc-300 focus:border-[#EAB308] rounded-xl p-3.5 text-sm text-zinc-900 outline-none transition-all" />
              </div>

              {/* MANDATORY CERTIFICATE UPLOAD UI */}
              <div>
                <label className="text-xs font-bold text-zinc-900 uppercase tracking-wide mb-2 block">
                  COA Certificate (Mandatory) <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center gap-4">
                  {qualCertPreview ? (
                    <div className="w-16 h-16 rounded-xl border border-zinc-300 overflow-hidden relative shadow-sm shrink-0">
                      <img src={qualCertPreview} className="w-full h-full object-cover" alt="Certificate Preview" />
                    </div>
                  ) : (
                    <div className="w-16 h-16 rounded-xl border border-dashed border-zinc-300 flex items-center justify-center bg-zinc-50 text-2xl shrink-0">📄</div>
                  )}
                  
                  <input type="file" id="cert-upload" accept="image/*,.pdf" className="hidden" onChange={handleQualCertSelect} />
                  <label htmlFor="cert-upload" className="px-5 py-2.5 border border-zinc-300 rounded-xl text-xs font-bold cursor-pointer hover:bg-zinc-50 transition-colors shadow-sm text-zinc-900 flex-1 text-center">
                    {qualCertPreview ? "Change Document" : "Upload Document"}
                  </label>
                </div>
              </div>
              
              <div className="flex gap-4 mt-6 pt-6 border-t border-zinc-100">
                <button type="button" onClick={closeQualModal} disabled={isUploadingMedia} className="flex-1 py-4 border border-zinc-300 hover:bg-zinc-50 text-zinc-900 rounded-xl font-extrabold transition-colors disabled:opacity-50">Cancel</button>
                <button type="submit" disabled={isUploadingMedia} className="flex-1 py-4 flex items-center justify-center gap-2 bg-black hover:bg-zinc-800 text-white rounded-xl font-extrabold transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed">
                  {isUploadingMedia && <LoadingSpinner className="w-5 h-5 text-white mr-1" />}
                  {isUploadingMedia ? "Processing..." : editingQualId ? "Update" : "Save Credential"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}