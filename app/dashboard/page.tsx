"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

// Extracted Components
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import ProfileCard from "@/components/dashboard/ProfileCard";
import ProjectsSection from "@/components/dashboard/ProjectSection";
import QualificationsSection from "@/components/dashboard/QualificationsSection";

// Types
import { UserProfile, ProjectItem, QualificationItem, MediaItem, CategoryItem } from "@/types/dashboard";

const API_BASE_URL = "https://backend.keywee.in/api/v1";
const MAX_FILE_SIZE_BYTES = 40 * 1024 * 1024; // 40MB limit in bytes

export default function Dashboard() {
  const router = useRouter();

  // Data States
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [qualifications, setQualifications] = useState<QualificationItem[]>([]);
  const [categories, setCategories] = useState<CategoryItem[]>([]);

  // UI States
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [isQualModalOpen, setIsQualModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isUploadingMedia, setIsUploadingMedia] = useState(false);
  const [isSavingProfile, setIsSavingProfile] = useState(false);

  // Custom Dropdown State
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);

  // Edit Tracking States
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [editingQualId, setEditingQualId] = useState<string | null>(null);

  // Form States
  const [projectForm, setProjectForm] = useState({ name: "", categoryId: "", city: "", state: "", desc: "", tags: "" });
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [qualForm, setQualForm] = useState({ degree: "", university: "", yearOfPassing: "", coaNo: "", coaCertUrl: "" });
  const [profileForm, setProfileForm] = useState({ name: "", firmName: "", email: "", contact: "", experience: "", bio: "", city: "", state: "", profilePictureUrl: "" });

  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
  const [profileImagePreview, setProfileImagePreview] = useState<string | null>(null);
  const [qualCertFile, setQualCertFile] = useState<File | null>(null);
  const [qualCertPreview, setQualCertPreview] = useState<string | null>(null);

  // --- Initial Data Fetch ---
  useEffect(() => {
    const fetchDashboardData = async () => {
      const token = localStorage.getItem("token");
      if (!token) return router.push("/login");

      try {
        const [userRes, catRes] = await Promise.all([
          fetch(`${API_BASE_URL}/user/me`, {
            headers: { "Authorization": `Bearer ${token}` }
          }),
          fetch(`${API_BASE_URL}/user/category`, {
            headers: { "Authorization": `Bearer ${token}` }
          })
        ]);

        const userData = await userRes.json();
        const catData = await catRes.json();

        if (userData.success) {
          setProfile(userData.user);
          setProjects(userData.projects || []);
          setQualifications(userData.qualifications || []);
        } else {
          setError("Failed to load profile.");
        }

        if (catData.success) {
          setCategories(catData.categories || []);
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
      if (file.size > MAX_FILE_SIZE_BYTES) {
        alert("Image size exceeds the 40MB limit.");
        e.target.value = '';
        return;
      }
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
        setProfile(prev => prev ? { ...prev, name: data.user.name, architectDetails: data.architectDetails } : null);
        closeProfileModal();
      } else alert(data.message);
    } catch (err: any) { alert(err.message || "Error saving profile details"); }
    finally { setIsSavingProfile(false); }
  };

  // --- PROJECT LOGIC ---
  const openEditProject = (proj: ProjectItem) => {
    let extractedCategoryId = "";

    if (typeof proj.category === "string") {
      extractedCategoryId = proj.category;
    } else if (proj.category && typeof proj.category === "object" && proj.category._id) {
      extractedCategoryId = proj.category._id;
    } else if (proj.categoryId) {
      extractedCategoryId = proj.categoryId;
    }

    setProjectForm({
      name: proj.name,
      categoryId: extractedCategoryId,
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
    setIsCategoryDropdownOpen(false);
    setEditingProjectId(null);
    setProjectForm({ name: "", categoryId: "", city: "", state: "", desc: "", tags: "" });
    setMediaItems([]);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const newFiles = Array.from(e.target.files);
    const currentTotalSize = mediaItems.reduce((acc, item) => acc + (item.file?.size || 0), 0);
    const newFilesSize = newFiles.reduce((acc, file) => acc + file.size, 0);

    if (currentTotalSize + newFilesSize > MAX_FILE_SIZE_BYTES) {
      alert("Total media size for this upload batch cannot exceed 40MB.");
      e.target.value = '';
      return;
    }

    const newMediaItems: MediaItem[] = newFiles.map(file => ({
      id: `new-${Date.now()}-${Math.random()}`,
      url: URL.createObjectURL(file),
      file: file
    }));
    setMediaItems(prev => [...prev, ...newMediaItems]);
    e.target.value = '';
  };

  const removeMedia = (id: string) => setMediaItems(prev => prev.filter(item => item.id !== id));
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
    if (!projectForm.categoryId) {
      alert("Please select a project category.");
      return;
    }

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
      const finalMediaUrls = mediaItems.map(item => item.file ? uploadedUrls[uploadIndex++] : item.url);

      const payload = {
        name: projectForm.name,
        categoryId: projectForm.categoryId,
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
      if (file.size > MAX_FILE_SIZE_BYTES) {
        alert("Document size exceeds the 40MB limit.");
        e.target.value = '';
        return;
      }
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
        } else throw new Error("Failed to upload the certificate document.");
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
    } catch (err: any) { alert(err.message || "Error saving qualification"); }
    finally { setIsUploadingMedia(false); }
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

  const selectedCategoryName = categories.find(c => c._id === projectForm.categoryId)?.name || "Select a category";

  const currentHour = new Date().getHours();
  const greeting = currentHour < 12 ? "Good morning" : currentHour < 18 ? "Good afternoon" : "Good evening";

  // --- RENDER BLOCK ---
  if (loading) return (
    <div className="flex min-h-screen items-center justify-center bg-background gap-3">
      <LoadingSpinner className="w-6 h-6 text-foreground" />
      <span className="font-bold text-foreground">Loading Dashboard...</span>
    </div>
  );

  if (error) return <div className="flex min-h-screen items-center justify-center text-red-500 bg-background">{error}</div>;

  return (
    <div className="min-h-screen bg-background text-foreground font-sans py-6 sm:py-12 px-4 sm:px-6 transition-colors duration-300">
      <div className="mx-auto max-w-6xl relative">

        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-zinc-200 dark:border-zinc-800 pb-6 sm:pb-8 mb-8 sm:mb-10 gap-5 sm:gap-0">

          {/* Title Area (Spans full width on mobile) */}
          <div className="w-full sm:w-auto">
            {/* Greeting sits independently on top */}
            <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400 mb-1">{greeting},</p>
            
            {/* Title and Mobile Back Button locked in the same flex row */}
            <div className="flex justify-between items-center w-full">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tight leading-none">
                Architect Dashboard
              </h1>

              {/* Mobile-Only Back Button */}
              <Link href="/" className="sm:hidden flex items-center justify-center px-3 py-1.5 rounded-lg text-[10px] font-bold border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 bg-white dark:bg-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-700 shadow-sm transition-colors shrink-0 ml-3">
                &larr; Back
              </Link>
            </div>
          </div>

          {/* Action Buttons (Plans & Messages sit cleanly side-by-side on mobile) */}
          <div className="grid grid-cols-2 sm:flex sm:flex-row w-full sm:w-auto gap-3">

            {/* Membership Plans - Shortens to just "Plans" on mobile so it fits perfectly */}
            <Link href="/plans" className="col-span-1 sm:col-auto flex items-center justify-center gap-1.5 sm:gap-2 px-2 sm:px-4 py-3 sm:py-2.5 rounded-lg text-xs font-bold text-white dark:text-black bg-zinc-900 dark:bg-zinc-100 hover:bg-black dark:hover:bg-white shadow-sm transition-all ring-1 ring-zinc-800 dark:ring-zinc-200">
              <span><span className="hidden sm:inline">Membership </span>Plans</span>
            </Link>

            {/* Messages */}
            <Link href="/chat" className="col-span-1 sm:col-auto flex items-center justify-center gap-1.5 sm:gap-2 px-2 sm:px-4 py-3 sm:py-2.5 rounded-lg text-xs font-bold text-zinc-900 bg-[#EAB308] hover:bg-yellow-500 shadow-sm transition-colors">
              <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path></svg>
              <span>Messages</span>
            </Link>

            {/* Desktop-Only Back Button */}
            <Link href="/" className="hidden sm:flex items-center justify-center gap-2 px-4 py-3 sm:py-2.5 rounded-lg text-xs font-bold border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 bg-white dark:bg-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-700 shadow-sm transition-colors text-center whitespace-nowrap">
              &larr; Back
            </Link>

          </div>
        </div>

        {/* --- DECOUPLED UI COMPONENTS --- */}
        <ProfileCard
          profile={profile}
          totalProjects={projects.length}
          onEditProfile={openEditProfile}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          <ProjectsSection
            projects={projects}
            onAddProject={() => setIsProjectModalOpen(true)}
            onEditProject={openEditProject}
            onDeleteProject={handleDeleteProject}
          />
          <QualificationsSection
            qualifications={qualifications}
            onAddQual={() => setIsQualModalOpen(true)}
            onEditQual={openEditQual}
            onDeleteQual={handleDeleteQualification}
          />
        </div>

      </div>

      {/* --- MODALS --- */}
      {isProfileModalOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-zinc-900/60 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-zinc-900 rounded-4xl w-full max-w-2xl p-5 sm:p-8 max-h-[90vh] overflow-y-auto shadow-2xl border border-zinc-200 dark:border-zinc-800">
            <h2 className="text-xl sm:text-2xl font-extrabold mb-6 text-zinc-900 dark:text-zinc-100">Update Profile Details</h2>
            <form onSubmit={handleSaveProfile} className="flex flex-col gap-4 sm:gap-5">
              <div className="flex flex-col items-center justify-center gap-3 mb-4">
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-zinc-100 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 overflow-hidden relative group cursor-pointer shadow-sm">
                  {profileImagePreview ? (
                    <img src={profileImagePreview} alt="Avatar Preview" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-4xl text-zinc-300 dark:text-zinc-600">👤</div>
                  )}
                  <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-white text-xs font-bold tracking-wide">Change</span>
                  </div>
                  <input type="file" accept="image/*" aria-label="Upload profile image" title="Upload profile image" className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleProfileImageSelect} />
                </div>
                <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Profile Image (Max 40MB)</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                <div>
                  <label className="text-xs font-bold text-zinc-900 dark:text-zinc-300 uppercase tracking-wide mb-2 block">Full Name</label>
                  <input required placeholder="Your Full Name" value={profileForm.name} onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })} className="w-full bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 focus:border-[#EAB308] dark:focus:border-yellow-500 rounded-xl p-3.5 text-sm text-zinc-900 dark:text-zinc-100 outline-none transition-all" />
                </div>
                <div>
                  <label className="text-xs font-bold text-zinc-900 dark:text-zinc-300 uppercase tracking-wide mb-2 block">Firm Name</label>
                  <input required placeholder="e.g. Doe & Associates" value={profileForm.firmName} onChange={(e) => setProfileForm({ ...profileForm, firmName: e.target.value })} className="w-full bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 focus:border-[#EAB308] dark:focus:border-yellow-500 rounded-xl p-3.5 text-sm text-zinc-900 dark:text-zinc-100 outline-none transition-all" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                <div>
                  <label className="text-xs font-bold text-zinc-900 dark:text-zinc-300 uppercase tracking-wide mb-2 block">Work Email</label>
                  <input type="email" placeholder="Email Address" value={profileForm.email} onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })} className="w-full bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 focus:border-[#EAB308] dark:focus:border-yellow-500 rounded-xl p-3.5 text-sm text-zinc-900 dark:text-zinc-100 outline-none transition-all" />
                </div>
                <div>
                  <label className="text-xs font-bold text-zinc-900 dark:text-zinc-300 uppercase tracking-wide mb-2 block">Direct Contact</label>
                  <input placeholder="Contact Number" value={profileForm.contact} onChange={(e) => setProfileForm({ ...profileForm, contact: e.target.value })} className="w-full bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 focus:border-[#EAB308] dark:focus:border-yellow-500 rounded-xl p-3.5 text-sm text-zinc-900 dark:text-zinc-100 outline-none transition-all" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
                <div>
                  <label htmlFor="experience" className="text-xs font-bold text-zinc-900 dark:text-zinc-300 uppercase tracking-wide mb-2 block">Experience (Yrs)</label>
                  <input id="experience" required type="number" min="0" placeholder="0" value={profileForm.experience} onChange={(e) => setProfileForm({ ...profileForm, experience: e.target.value })} className="w-full bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 focus:border-[#EAB308] dark:focus:border-yellow-500 rounded-xl p-3.5 text-sm text-zinc-900 dark:text-zinc-100 outline-none transition-all" />
                </div>
                <div>
                  <label className="text-xs font-bold text-zinc-900 dark:text-zinc-300 uppercase tracking-wide mb-2 block">City</label>
                  <input placeholder="City" value={profileForm.city} onChange={(e) => setProfileForm({ ...profileForm, city: e.target.value })} className="w-full bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 focus:border-[#EAB308] dark:focus:border-yellow-500 rounded-xl p-3.5 text-sm text-zinc-900 dark:text-zinc-100 outline-none transition-all" />
                </div>
                <div>
                  <label className="text-xs font-bold text-zinc-900 dark:text-zinc-300 uppercase tracking-wide mb-2 block">State</label>
                  <input placeholder="State" value={profileForm.state} onChange={(e) => setProfileForm({ ...profileForm, state: e.target.value })} className="w-full bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 focus:border-[#EAB308] dark:focus:border-yellow-500 rounded-xl p-3.5 text-sm text-zinc-900 dark:text-zinc-100 outline-none transition-all" />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-zinc-900 dark:text-zinc-300 uppercase tracking-wide mb-2 block">Professional Bio</label>
                <textarea placeholder="Write a brief professional bio..." value={profileForm.bio} onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })} className="w-full bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 focus:border-[#EAB308] dark:focus:border-yellow-500 rounded-xl p-3.5 text-sm text-zinc-900 dark:text-zinc-100 outline-none transition-all resize-none" rows={4} />
              </div>

              <div className="flex flex-col-reverse sm:flex-row gap-3 sm:gap-4 mt-6 pt-6 border-t border-zinc-100 dark:border-zinc-800">
                <button type="button" onClick={closeProfileModal} disabled={isSavingProfile} className="flex-1 py-3 sm:py-4 border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-zinc-900 dark:text-zinc-100 rounded-xl font-extrabold transition-colors disabled:opacity-50">Cancel</button>
                <button type="submit" disabled={isSavingProfile} className="flex-1 py-3 sm:py-4 flex items-center justify-center gap-2 bg-black dark:bg-white hover:bg-zinc-800 dark:hover:bg-zinc-200 text-white dark:text-black rounded-xl font-extrabold transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed">
                  {isSavingProfile && <LoadingSpinner className="w-5 h-5 text-current mr-1" />}
                  {isSavingProfile ? "Saving..." : "Update Profile"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* isProjectModalOpen and isQualModalOpen blocks remain exactly the same as provided */}
      {isProjectModalOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-zinc-900/60 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-zinc-900 rounded-4xl w-full max-w-2xl p-5 sm:p-8 max-h-[90vh] overflow-y-auto shadow-2xl border border-zinc-200 dark:border-zinc-800">
            <h2 className="text-xl sm:text-2xl font-extrabold mb-6 text-zinc-900 dark:text-zinc-100">{editingProjectId ? "Edit Project Details" : "Publish New Project"}</h2>
            <form onSubmit={handleSaveProject} className="flex flex-col gap-4 sm:gap-5">

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                <div>
                  <label className="text-xs font-bold text-zinc-900 dark:text-zinc-300 uppercase tracking-wide mb-2 block">
                    Project Title <span className="text-red-500">*</span>
                  </label>
                  <input required placeholder="e.g. Modern Seaview Villa" value={projectForm.name} onChange={(e) => setProjectForm({ ...projectForm, name: e.target.value })} className="w-full bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 focus:border-[#EAB308] dark:focus:border-yellow-500 focus:ring-1 focus:ring-[#EAB308] rounded-xl p-3.5 text-sm text-zinc-900 dark:text-zinc-100 outline-none transition-all" />
                </div>

                <div className="relative">
                  <label className="text-xs font-bold text-zinc-900 dark:text-zinc-300 uppercase tracking-wide mb-2 block">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <div
                    className="relative"
                    tabIndex={0}
                    onBlur={(e) => {
                      if (!e.currentTarget.contains(e.relatedTarget)) {
                        setIsCategoryDropdownOpen(false);
                      }
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
                      className={`flex items-center justify-between w-full bg-white dark:bg-zinc-900 border ${isCategoryDropdownOpen ? 'border-[#EAB308] dark:border-yellow-500 ring-1 ring-[#EAB308]' : 'border-zinc-300 dark:border-zinc-700'} rounded-xl p-3.5 text-sm ${projectForm.categoryId ? 'text-zinc-900 dark:text-zinc-100' : 'text-zinc-500 dark:text-zinc-400'} outline-none transition-all cursor-pointer`}
                    >
                      <span className="truncate">{selectedCategoryName}</span>
                      <svg className={`w-4 h-4 text-zinc-400 transition-transform duration-200 shrink-0 ml-2 ${isCategoryDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                    </button>

                    {isCategoryDropdownOpen && (
                      <div className="absolute z-50 w-full mt-2 bg-white dark:bg-[#18181B] border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-xl max-h-60 overflow-y-auto py-1">
                        {categories.length === 0 ? (
                          <div className="px-4 py-3 text-sm text-zinc-500 dark:text-zinc-400 text-center">Loading...</div>
                        ) : (
                          categories.map((cat) => (
                            <button
                              key={cat._id}
                              type="button"
                              onClick={() => {
                                setProjectForm({ ...projectForm, categoryId: cat._id });
                                setIsCategoryDropdownOpen(false);
                              }}
                              className={`w-full text-left px-4 py-3 text-sm transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-800/50 ${projectForm.categoryId === cat._id ? 'text-[#EAB308] font-bold bg-yellow-50/50 dark:bg-yellow-900/10' : 'text-zinc-700 dark:text-zinc-300'}`}
                            >
                              {cat.name}
                            </button>
                          ))
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                <div>
                  <label className="text-xs font-bold text-zinc-900 dark:text-zinc-300 uppercase tracking-wide mb-2 block">City</label>
                  <input required placeholder="e.g. Mumbai" value={projectForm.city} onChange={(e) => setProjectForm({ ...projectForm, city: e.target.value })} className="w-full bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 focus:border-[#EAB308] dark:focus:border-yellow-500 rounded-xl p-3.5 text-sm text-zinc-900 dark:text-zinc-100 outline-none transition-all" />
                </div>
                <div>
                  <label className="text-xs font-bold text-zinc-900 dark:text-zinc-300 uppercase tracking-wide mb-2 block">State</label>
                  <input required placeholder="e.g. Maharashtra" value={projectForm.state} onChange={(e) => setProjectForm({ ...projectForm, state: e.target.value })} className="w-full bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 focus:border-[#EAB308] dark:focus:border-yellow-500 rounded-xl p-3.5 text-sm text-zinc-900 dark:text-zinc-100 outline-none transition-all" />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-zinc-900 dark:text-zinc-300 uppercase tracking-wide mb-2 block">Overview / Description</label>
                <textarea placeholder="Write a compelling description of the architecture..." value={projectForm.desc} onChange={(e) => setProjectForm({ ...projectForm, desc: e.target.value })} className="w-full bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 focus:border-[#EAB308] dark:focus:border-yellow-500 rounded-xl p-3.5 text-sm text-zinc-900 dark:text-zinc-100 outline-none transition-all resize-none" rows={3} />
              </div>

              <div>
                <label className="text-xs font-bold text-zinc-900 dark:text-zinc-300 uppercase tracking-wide mb-2 flex justify-between">
                  <span>Project Media Sequence</span>
                  <span className="text-zinc-400 font-medium normal-case">{mediaItems.length} photos</span>
                </label>
                {mediaItems.length > 0 && (
                  <div className="flex flex-wrap gap-3 mb-4 bg-zinc-50 dark:bg-zinc-800 p-4 rounded-xl border border-zinc-100 dark:border-zinc-700">
                    {mediaItems.map((item, index) => (
                      <div key={item.id} className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-lg border border-zinc-200 dark:border-zinc-700 overflow-hidden group shadow-sm bg-zinc-200 dark:bg-zinc-700">
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
                <label htmlFor="media-upload" className="w-full border-2 border-dashed border-zinc-300 dark:border-zinc-700 hover:border-[#EAB308] dark:hover:border-yellow-600 hover:bg-yellow-50 dark:hover:bg-yellow-900/10 rounded-xl p-4 sm:p-6 flex flex-col items-center justify-center cursor-pointer transition-colors text-zinc-500 dark:text-zinc-400 bg-white dark:bg-zinc-900">
                  <div className="bg-zinc-50 dark:bg-zinc-800 p-2 rounded-full shadow-sm mb-2 text-xl">📸</div>
                  <span className="text-sm font-bold text-zinc-900 dark:text-zinc-100 mb-1 text-center">Click to browse images</span>
                  <span className="text-xs text-center">Supports High-Res JPG & PNG (Max 40MB total)</span>
                </label>
              </div>

              <div>
                <label className="text-xs font-bold text-zinc-900 dark:text-zinc-300 uppercase tracking-wide mb-2 block">Classification Tags</label>
                <input placeholder="Modern, Minimalist, Commercial..." value={projectForm.tags} onChange={(e) => setProjectForm({ ...projectForm, tags: e.target.value })} className="w-full bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 focus:border-[#EAB308] dark:focus:border-yellow-500 rounded-xl p-3.5 text-sm text-zinc-900 dark:text-zinc-100 outline-none transition-all" />
              </div>

              <div className="flex flex-col-reverse sm:flex-row gap-3 sm:gap-4 mt-6 pt-6 border-t border-zinc-100 dark:border-zinc-800">
                <button type="button" onClick={closeProjectModal} disabled={isUploadingMedia} className="flex-1 py-3 sm:py-4 border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-zinc-900 dark:text-zinc-100 rounded-xl font-extrabold transition-colors disabled:opacity-50">Cancel</button>
                <button type="submit" disabled={isUploadingMedia} className="flex-1 py-3 sm:py-4 flex items-center justify-center gap-2 bg-[#EAB308] hover:bg-yellow-600 text-white rounded-xl font-extrabold transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed">
                  {isUploadingMedia && <LoadingSpinner className="w-5 h-5 text-white mr-1" />}
                  {isUploadingMedia ? "Processing..." : editingProjectId ? "Save Changes" : "Publish Project"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isQualModalOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-zinc-900/60 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-zinc-900 rounded-4xl w-full max-w-md p-5 sm:p-8 shadow-2xl border border-zinc-200 dark:border-zinc-800">
            <h2 className="text-xl sm:text-2xl font-extrabold mb-6 text-zinc-900 dark:text-zinc-100">{editingQualId ? "Edit Credential" : "Add Credential"}</h2>
            <form onSubmit={handleSaveQualification} className="flex flex-col gap-4 sm:gap-5">
              <div>
                <label className="text-xs font-bold text-zinc-900 dark:text-zinc-300 uppercase tracking-wide mb-2 block">Degree Name</label>
                <input required placeholder="e.g. B.Arch" value={qualForm.degree} onChange={(e) => setQualForm({ ...qualForm, degree: e.target.value })} className="w-full bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 focus:border-[#EAB308] dark:focus:border-yellow-500 rounded-xl p-3.5 text-sm text-zinc-900 dark:text-zinc-100 outline-none transition-all" />
              </div>

              <div>
                <label className="text-xs font-bold text-zinc-900 dark:text-zinc-300 uppercase tracking-wide mb-2 block">University / Institution</label>
                <input required placeholder="Institution Name" value={qualForm.university} onChange={(e) => setQualForm({ ...qualForm, university: e.target.value })} className="w-full bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 focus:border-[#EAB308] dark:focus:border-yellow-500 rounded-xl p-3.5 text-sm text-zinc-900 dark:text-zinc-100 outline-none transition-all" />
              </div>

              <div>
                <label className="text-xs font-bold text-zinc-900 dark:text-zinc-300 uppercase tracking-wide mb-2 block">Graduation Year</label>
                <input required type="number" placeholder="YYYY" value={qualForm.yearOfPassing} onChange={(e) => setQualForm({ ...qualForm, yearOfPassing: e.target.value })} className="w-full bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 focus:border-[#EAB308] dark:focus:border-yellow-500 rounded-xl p-3.5 text-sm text-zinc-900 dark:text-zinc-100 outline-none transition-all" />
              </div>

              <div>
                <label className="text-xs font-bold text-zinc-900 dark:text-zinc-300 uppercase tracking-wide mb-2 block">COA Number (Optional)</label>
                <input placeholder="CA/20XX/XXXXX" value={qualForm.coaNo} onChange={(e) => setQualForm({ ...qualForm, coaNo: e.target.value })} className="w-full bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 focus:border-[#EAB308] dark:focus:border-yellow-500 rounded-xl p-3.5 text-sm text-zinc-900 dark:text-zinc-100 outline-none transition-all" />
              </div>

              <div>
                <label className="text-xs font-bold text-zinc-900 dark:text-zinc-300 uppercase tracking-wide mb-2 block">
                  COA Certificate (Mandatory) <span className="text-red-500">*</span>
                </label>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
                  {qualCertPreview ? (
                    <div className="w-16 h-16 rounded-xl border border-zinc-300 dark:border-zinc-700 overflow-hidden relative shadow-sm shrink-0">
                      <img src={qualCertPreview} className="w-full h-full object-cover" alt="Certificate Preview" />
                    </div>
                  ) : (
                    <div className="w-16 h-16 rounded-xl border border-dashed border-zinc-300 dark:border-zinc-700 flex items-center justify-center bg-zinc-50 dark:bg-zinc-800 text-2xl shrink-0">📄</div>
                  )}
                  <input type="file" id="cert-upload" accept="image/*,.pdf" className="hidden" onChange={handleQualCertSelect} />
                  <label htmlFor="cert-upload" className="w-full sm:w-auto px-5 py-3 sm:py-2.5 border border-zinc-300 dark:border-zinc-700 rounded-xl text-xs font-bold cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors shadow-sm text-zinc-900 dark:text-zinc-100 flex-1 text-center">
                    {qualCertPreview ? "Change Document" : "Upload Document (Max 40MB)"}
                  </label>
                </div>
              </div>

              <div className="flex flex-col-reverse sm:flex-row gap-3 sm:gap-4 mt-6 pt-6 border-t border-zinc-100 dark:border-zinc-800">
                <button type="button" onClick={closeQualModal} disabled={isUploadingMedia} className="flex-1 py-3 sm:py-4 border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-zinc-900 dark:text-zinc-100 rounded-xl font-extrabold transition-colors disabled:opacity-50">Cancel</button>
                <button type="submit" disabled={isUploadingMedia} className="flex-1 py-3 sm:py-4 flex items-center justify-center gap-2 bg-black dark:bg-white hover:bg-zinc-800 dark:hover:bg-zinc-200 text-white dark:text-black rounded-xl font-extrabold transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed">
                  {isUploadingMedia && <LoadingSpinner className="w-5 h-5 text-current mr-1" />}
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