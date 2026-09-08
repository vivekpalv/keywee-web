"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Cropper from "react-easy-crop";

// Extracted Components
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import ProfileCard from "@/components/dashboard/ProfileCard";
import ProjectsSection from "@/components/dashboard/ProjectSection";
import QualificationsSection from "@/components/dashboard/QualificationsSection";
import RatingsSection from "@/components/dashboard/RatingsSection"; 

// Extracted Modals
import ProfileModal from "@/components/dashboard/modals/ProfileModal";
import ProjectModal from "@/components/dashboard/modals/ProjectModal";
import QualificationModal from "@/components/dashboard/modals/QualificationModal";

// Types & API
import { UserProfile, ProjectItem, QualificationItem, CategoryItem, RatingItem } from "@/types/dashboard";
import { BASE_URL } from "@/utils/api";
import { getCroppedImg } from "@/utils/cropImage"; 

const API_BASE_URL = BASE_URL;
const MAX_FILE_SIZE_BYTES = 2 * 1024 * 1024; // 2MB limit

interface LocationSuggestion {
  place_id: string;
  display_name: string;
  lat: number;
  lon: number;
}

export default function Dashboard() {
  const router = useRouter();

  // --- Normal Dashboard Data States ---
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [qualifications, setQualifications] = useState<QualificationItem[]>([]);
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [ratings, setRatings] = useState<RatingItem[]>([]); 

  // --- Normal Dashboard UI States ---
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<ProjectItem | null>(null);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [editingQual, setEditingQual] = useState<QualificationItem | null>(null);
  const [isQualModalOpen, setIsQualModalOpen] = useState(false);

  // ==========================================
  // --- CLIENT UPGRADE FORM STATES & LOGIC ---
  // ==========================================
  const [isClientOnly, setIsClientOnly] = useState(false);
  const [userMobile, setUserMobile] = useState("");
  const [isUpgrading, setIsUpgrading] = useState(false);

  // Profile Image States
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
  const [profileImagePreview, setProfileImagePreview] = useState<string | null>(null);

  // Image Cropper States
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [isCropping, setIsCropping] = useState(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);

  // Location Autocomplete States
  const [suggestions, setSuggestions] = useState<LocationSuggestion[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [regData, setRegData] = useState({
    name: "",
    gender: "MALE",
    email: "",
    firmName: "",
    bio: "",
    experience: "",
    address: "",
    lat: "" as number | string,
    long: "" as number | string,
    min: 1000000,
    max: 5000000
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setRegData({ ...regData, [e.target.name]: e.target.value });
  };

  // Profile Image Upload & Crop Logic
  const handleProfileImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError("");
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > MAX_FILE_SIZE_BYTES) {
        setError("Profile image must be less than 2MB.");
        e.target.value = '';
        return;
      }
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setImageSrc(reader.result?.toString() || "");
        setIsCropping(true);
      });
      reader.readAsDataURL(file);
      e.target.value = ''; 
    }
  };

  const onCropComplete = useCallback((_croppedArea: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleApplyCrop = useCallback(async () => {
    if (!imageSrc || !croppedAreaPixels) return;
    try {
      const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
      if (croppedImage) {
        setProfileImagePreview(croppedImage.url);
        setProfileImageFile(croppedImage.file);
      }
      setIsCropping(false);
      setImageSrc(null);
    } catch (e) {
      setError("Failed to crop image.");
    }
  }, [imageSrc, croppedAreaPixels]);

  // Google Maps Location Autocomplete Logic
  const fetchLocationSuggestions = async (query: string) => {
    if (!query || query.length < 3) {
      setSuggestions([]);
      setIsSearching(false);
      return;
    }
    try {
      const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
      if (!apiKey) {
        console.error("Google Maps API key is missing.");
        setIsSearching(false);
        return;
      }
      const res = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(query)}&key=${apiKey}`);
      const data = await res.json();
      if (data.status === "OK" && data.results) {
        const formattedSuggestions = data.results.map((result: any) => ({
          place_id: result.place_id,
          display_name: result.formatted_address,
          lat: result.geometry.location.lat,
          lon: result.geometry.location.lng,
        }));
        setSuggestions(formattedSuggestions);
      } else {
        setSuggestions([]);
      }
    } catch (err) {
      setSuggestions([]);
    } finally {
      setIsSearching(false);
    }
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setRegData({ ...regData, address: value, lat: "", long: "" });
    setShowDropdown(true);
    setIsSearching(true);
    if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
    searchTimeoutRef.current = setTimeout(() => {
      fetchLocationSuggestions(value);
    }, 500);
  };

  const selectLocation = (suggestion: LocationSuggestion) => {
    setRegData({
      ...regData,
      address: suggestion.display_name,
      lat: Number(suggestion.lat),
      long: Number(suggestion.lon)
    });
    setShowDropdown(false);
    setSuggestions([]);
  };

  useEffect(() => {
    const handleClickOutside = () => setShowDropdown(false);
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleMinBudgetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setRegData({ ...regData, min: Math.min(value, regData.max - 1) });
  };

  const handleMaxBudgetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setRegData({ ...regData, max: Math.max(value, regData.min + 1) });
  };

  // Handle Client -> Architect Upgrade Submit
  const handleUpgradeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!profileImageFile) return setError("A profile image is required.");
    if (!regData.name.trim() || !regData.email.trim() || !regData.firmName.trim()) return setError("Please fill out your Name, Email, and Firm Name.");
    if (regData.experience === "" || Number(regData.experience) < 0) return setError("Please provide valid years of experience.");
    if (!regData.address.trim()) return setError("Please provide your office address.");
    const numericLat = Number(regData.lat);
    const numericLong = Number(regData.long);
    if (!regData.lat || !regData.long || isNaN(numericLat) || isNaN(numericLong)) return setError("Please select a valid office address from the suggestions.");
    if (regData.min === undefined || regData.max === undefined || regData.min >= regData.max) return setError("Please provide a valid project budget range.");
    if (!regData.bio.trim() || regData.bio.trim().length < 10) return setError("A professional bio is mandatory (minimum 10 characters).");

    setIsUpgrading(true);
    try {
      const token = localStorage.getItem("token");
      const switchRes = await fetch(`${API_BASE_URL}auth/switch-to-architect`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}` 
        },
        body: JSON.stringify({
          name: regData.name,
          gender: regData.gender,
          contact: userMobile, 
          email: regData.email,
          firmName: regData.firmName,
          bio: regData.bio,
          experience: Number(regData.experience),
          min: Number(regData.min),
          max: Number(regData.max),
          address: regData.address,
          lat: Number(regData.lat),
          long: Number(regData.long),
          profileUrl: "" 
        }),
      });

      const switchData = await switchRes.json();

      if (switchData.success || switchData.message?.toLowerCase().includes("success")) {
          // Upload profile image
          if (profileImageFile && token) {
              const formData = new FormData();
              formData.append("images", profileImageFile);
              const uploadRes = await fetch(`${API_BASE_URL}user/images`, {
                  method: "POST",
                  headers: { "Authorization": `Bearer ${token}` },
                  body: formData
              });
              const uploadData = await uploadRes.json();

              if (uploadData.success && uploadData.urls && uploadData.urls.length > 0) {
                  const finalProfileUrl = uploadData.urls[0];
                  await fetch(`${API_BASE_URL}user/update`, {
                      method: "PUT",
                      headers: { 
                          "Content-Type": "application/json",
                          "Authorization": `Bearer ${token}` 
                      },
                      body: JSON.stringify({ 
                        profilePictureUrl: finalProfileUrl,
                        name: regData.name,
                        gender: regData.gender 
                      })
                  });
              }
          }
          // Redirect to plans after successful upgrade
          router.push("/plans");
          router.refresh();
      } else {
          setError(switchData.message || "Failed to upgrade account role.");
          setIsUpgrading(false);
      }
    } catch (err) {
      setError("Server error. Please try again later.");
      setIsUpgrading(false);
    }
  };
  // ==========================================


  // --- Initial Data Fetch (Profile, Projects, Quals, Categories, Roles, Subscription) ---
  useEffect(() => {
    const fetchDashboardData = async () => {
      const token = localStorage.getItem("token");
      if (!token) return router.push("/login");

      try {
        const [userRes, catRes, subRes] = await Promise.all([
          fetch(`${API_BASE_URL}user/me`, { headers: { "Authorization": `Bearer ${token}` } }),
          fetch(`${API_BASE_URL}user/category?childWithParent=false`, { headers: { "Authorization": `Bearer ${token}` } }),
          fetch(`${API_BASE_URL}user/have-active-subscription`, { headers: { "Authorization": `Bearer ${token}` } })
        ]);

        const userData = await userRes.json();

        if (userData.success) {
          const roles = userData.user.roles || [];
          
          // 1. Intercept Client-Only Users
          if (!roles.includes("ARCHITECT")) {
            setIsClientOnly(true);
            setUserMobile(userData.user.mobile || "");
            
            // Pre-fill name and email if available
            setRegData(prev => ({
              ...prev,
              name: userData.user.name || "",
              email: userData.user.email || ""
            }));
            
            setLoading(false);
            return; // Stop execution here, render the form
          }

          // 2. Process Subscription for Existing Architects
          const subData = await subRes.json();
          if (subData.success && subData.hasActiveSubscription === false) {
            return router.push("/plans");
          }

          // 3. Load Dashboard normal state
          setProfile(userData.user);
          setProjects(userData.projects || []);
          setQualifications(userData.qualifications || []);
          
          const catData = await catRes.json();
          if (catData.success) {
            setCategories(catData.categories || []);
          }

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

  // --- Secondary Data Fetch (Ratings) ---
  useEffect(() => {
    const fetchRatings = async () => {
      const architectId = profile?.architectDetails?._id;
      if (!architectId) return;

      try {
        const res = await fetch(`${API_BASE_URL}public/ratings/${architectId}`);
        const data = await res.json();
        if (data.success) {
          setRatings(data.ratings || []);
        }
      } catch (err) {
        console.error("Failed to fetch ratings:", err);
      }
    };

    fetchRatings();
  }, [profile?.architectDetails?._id]);


  // --- DELETION HANDLERS ---
  const handleDeleteProject = async (id: string) => {
    if (!confirm("Delete this project?")) return;
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`${API_BASE_URL}user/projects/${id}`, { method: "DELETE", headers: { "Authorization": `Bearer ${token}` } });
      const data = await res.json();
      if (data.success) setProjects(projects.filter(p => p._id !== id));
    } catch (err) { alert("Error deleting project"); }
  };

  const handleDeleteQualification = async (id: string) => {
    if (!confirm("Remove this qualification?")) return;
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`${API_BASE_URL}user/qualifications/${id}`, { method: "DELETE", headers: { "Authorization": `Bearer ${token}` } });
      const data = await res.json();
      if (data.success) setQualifications(qualifications.filter(q => q._id !== id));
    } catch (err) { alert("Error deleting qualification"); }
  };


  const currentHour = new Date().getHours();
  const greeting = currentHour < 12 ? "Good morning" : currentHour < 18 ? "Good afternoon" : "Good evening";

  // ==========================================
  // RENDERING LOGIC
  // ==========================================

  if (loading) return <div className="flex min-h-screen items-center justify-center gap-3"><LoadingSpinner className="w-6 h-6" /><span className="font-bold">Loading...</span></div>;
  
  // Render Crop Modal (used by the upgrade form)
  if (isCropping && imageSrc) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm transition-all">
        <div className="w-full max-w-md rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow-xl border border-zinc-200 dark:border-zinc-800">
          <h3 className="mb-4 text-lg font-bold text-black dark:text-white">Crop Profile Image</h3>
          <div className="relative h-64 w-full rounded-xl overflow-hidden bg-zinc-100 dark:bg-zinc-800">
            <Cropper
              image={imageSrc}
              crop={crop}
              zoom={zoom}
              aspect={1}
              onCropChange={setCrop}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
            />
          </div>
          <div className="mt-4 flex flex-col gap-2">
            <label className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">Zoom</label>
            <input type="range" value={zoom} min={1} max={3} step={0.1} onChange={(e) => setZoom(Number(e.target.value))} className="w-full accent-[#EAB308]" />
          </div>
          <div className="mt-6 flex justify-end gap-3">
            <button type="button" onClick={() => { setIsCropping(false); setImageSrc(null); }} className="rounded-lg px-4 py-2 text-sm font-semibold text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800 transition-colors">
              Cancel
            </button>
            <button type="button" onClick={handleApplyCrop} className="rounded-lg bg-[#EAB308] px-4 py-2 text-sm font-bold text-white hover:bg-yellow-600 transition-colors">
              Apply Crop
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ----------------------------------------------------
  // INTERCEPT VIEW: Show Client Upgrade Form
  // ----------------------------------------------------
  if (isClientOnly) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FBFAF7] dark:bg-[#0A0A0A] px-4 py-12 font-sans sm:px-6 transition-colors duration-300">
        <div className="w-full max-w-3xl rounded-4xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-black p-6 sm:p-10 shadow-sm transition-all duration-300">
          <div className="mb-8 text-center">
            <Link href="/" className="text-2xl font-extrabold tracking-tight">
              <span className="text-black dark:text-white">Key</span>
              <span className="text-[#EAB308]">wee</span>
            </Link>
            <h1 className="mt-6 text-2xl font-bold text-black dark:text-white">Complete Architect Profile</h1>
            <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
              You are currently registered as a Client. Please provide your professional details to access the Architect Dashboard.
            </p>
          </div>

          {error && (
            <div className="mb-6 rounded-lg bg-red-50 dark:bg-red-950/30 p-3 text-center text-sm font-medium text-red-600 dark:text-red-400 border border-red-100 dark:border-red-900/50">
              {error}
            </div>
          )}

          <form onSubmit={handleUpgradeSubmit} className="flex flex-col gap-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              
              {/* Profile Image */}
              <div className="sm:col-span-2 flex flex-col items-center justify-center gap-3 mb-2">
                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-zinc-100 dark:bg-zinc-800 border-2 border-dashed border-zinc-300 dark:border-zinc-700 overflow-hidden relative group cursor-pointer shadow-sm hover:border-[#EAB308] transition-colors">
                      {profileImagePreview ? (
                          <img src={profileImagePreview} alt="Avatar Preview" className="w-full h-full object-cover" />
                      ) : (
                          <div className="w-full h-full flex flex-col items-center justify-center text-zinc-400 dark:text-zinc-500">
                              <span className="text-2xl mb-1">📷</span>
                          </div>
                      )}
                      <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <span className="text-white text-[10px] font-bold tracking-wide uppercase">Upload</span>
                      </div>
                      <input 
                          type="file" 
                          accept="image/*" 
                          required={!profileImageFile} 
                          aria-label="Upload profile image" 
                          className="absolute inset-0 opacity-0 cursor-pointer" 
                          onChange={handleProfileImageSelect} 
                      />
                  </div>
                  <div className="text-center flex flex-col gap-0.5">
                      <span className="text-[10px] font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider">Profile Photo <span className="text-red-500">*</span></span>
                      <span className="text-[10px] text-zinc-500 font-medium">Max 2MB. Any ratio (will be cropped).</span>
                  </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-black dark:text-white">Full Name <span className="text-red-500">*</span></label>
                <input type="text" name="name" required value={regData.name} onChange={handleInputChange} placeholder="John Doe" className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent px-4 py-2.5 text-sm text-black dark:text-white placeholder-zinc-400 dark:placeholder-zinc-600 outline-none focus:border-[#EAB308] focus:ring-1 focus:ring-[#EAB308]" />
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-black dark:text-white">Email Address <span className="text-red-500">*</span></label>
                <input type="email" name="email" required value={regData.email} onChange={handleInputChange} placeholder="john@example.com" className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent px-4 py-2.5 text-sm text-black dark:text-white placeholder-zinc-400 dark:placeholder-zinc-600 outline-none focus:border-[#EAB308] focus:ring-1 focus:ring-[#EAB308]" />
              </div>
              <div>
                <label htmlFor="gender-select" className="mb-2 block text-sm font-semibold text-black dark:text-white">Gender <span className="text-red-500">*</span></label>
                <select id="gender-select" name="gender" required value={regData.gender} onChange={handleInputChange} className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-4 py-2.5 text-sm text-black dark:text-white outline-none focus:border-[#EAB308] focus:ring-1 focus:ring-[#EAB308]">
                  <option value="MALE">Male</option>
                  <option value="FEMALE">Female</option>
                  <option value="OTHER">Other</option>
                </select>
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-black dark:text-white">Firm Name <span className="text-red-500">*</span></label>
                <input type="text" name="firmName" required value={regData.firmName} onChange={handleInputChange} placeholder="Doe & Associates Design" className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent px-4 py-2.5 text-sm text-black dark:text-white placeholder-zinc-400 dark:placeholder-zinc-600 outline-none focus:border-[#EAB308] focus:ring-1 focus:ring-[#EAB308]" />
              </div>
              <div className="sm:col-span-2">
                <label className="mb-2 block text-sm font-semibold text-black dark:text-white">Years of Experience <span className="text-red-500">*</span></label>
                <input type="number" name="experience" required min="0" value={regData.experience} onChange={handleInputChange} placeholder="e.g. 8" className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent px-4 py-2.5 text-sm text-black dark:text-white placeholder-zinc-400 dark:placeholder-zinc-600 outline-none focus:border-[#EAB308] focus:ring-1 focus:ring-[#EAB308]" />
              </div>

              {/* Address Autocomplete */}
              <div className="sm:col-span-2 relative">
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-semibold text-black dark:text-white">Office Address <span className="text-red-500">*</span></label>
                  {regData.lat !== "" && regData.long !== "" && (
                    <span className="text-[10px] text-green-600 dark:text-green-500 font-bold bg-green-50 dark:bg-green-900/20 px-2 py-0.5 rounded uppercase tracking-wide">
                      ✓ Coordinates Captured
                    </span>
                  )}
                </div>
                <div onClick={(e) => e.stopPropagation()}>
                  <input 
                    type="text" 
                    name="address"
                    required 
                    value={regData.address} 
                    onChange={handleLocationChange}
                    onFocus={() => { if(regData.address) setShowDropdown(true) }}
                    placeholder="Search your office address..." 
                    className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent px-4 py-2.5 text-sm text-black dark:text-white placeholder-zinc-400 dark:placeholder-zinc-600 outline-none focus:border-[#EAB308] focus:ring-1 focus:ring-[#EAB308]" 
                  />
                  {showDropdown && (regData.address.length >= 3) && (
                    <div className="absolute z-50 w-full mt-1 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                      {isSearching ? (
                        <div className="p-3 text-sm text-zinc-500 dark:text-zinc-400 text-center">Searching...</div>
                      ) : suggestions.length > 0 ? (
                        <ul className="py-1">
                          {suggestions.map((item) => (
                            <li 
                              key={item.place_id}
                              onClick={() => selectLocation(item)}
                              className="px-4 py-2.5 text-sm text-black dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer transition-colors border-b border-zinc-100 dark:border-zinc-800 last:border-0"
                            >
                              {item.display_name}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <div className="p-3 text-sm text-zinc-500 dark:text-zinc-400 text-center">No locations found.</div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Budget Range */}
              <div className="sm:col-span-2 mt-2">
                <div className="flex justify-between items-center mb-4">
                  <label className="text-sm font-semibold text-black dark:text-white">
                    Project Budget Range <span className="text-red-500">*</span>
                  </label>
                </div>
                <div className="flex items-center gap-4 mb-5">
                  <div className="flex-1 flex items-center bg-transparent border border-zinc-300 dark:border-zinc-700 rounded-lg px-3 py-2 focus-within:border-[#EAB308] focus-within:ring-1 focus-within:ring-[#EAB308] transition-all">
                    <span className="text-zinc-500 font-semibold mr-1">₹</span>
                    <input type="number" name="min" min="0" required value={regData.min} onChange={handleMinBudgetChange} className="w-full bg-transparent text-sm font-bold text-black dark:text-white outline-none" />
                  </div>
                  <span className="text-zinc-400 font-medium text-sm">to</span>
                  <div className="flex-1 flex items-center bg-transparent border border-zinc-300 dark:border-zinc-700 rounded-lg px-3 py-2 focus-within:border-[#EAB308] focus-within:ring-1 focus-within:ring-[#EAB308] transition-all">
                    <span className="text-zinc-500 font-semibold mr-1">₹</span>
                    <input type="number" name="max" required min={regData.min + 1} value={regData.max} onChange={handleMaxBudgetChange} className="w-full bg-transparent text-sm font-bold text-black dark:text-white outline-none" />
                  </div>
                </div>
                <div className="relative h-2 w-full bg-zinc-200 dark:bg-zinc-800 rounded-full flex items-center mt-2">
                  <div
                    className="absolute h-2 bg-[#EAB308] rounded-full pointer-events-none transition-all duration-75"
                    style={{ left: `${Math.min(100, Math.max(0, (Number(regData.min) / 1000000000) * 100))}%`, right: `${100 - Math.min(100, Math.max(0, (Number(regData.max) / 1000000000) * 100))}%` }}
                  ></div>
                  <input type="range" min="0" max="1000000000" step="100000" value={Math.min(Number(regData.min), 1000000000)} onChange={handleMinBudgetChange} className="absolute w-full appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-[#EAB308] [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-shadow] z-20" />
                  <input type="range" min="0" max="1000000000" step="100000" value={Math.min(Number(regData.max), 1000000000)} onChange={handleMaxBudgetChange} className="absolute w-full appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-[#EAB308] [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-shadow] z-30" />
                </div>
                <div className="flex justify-between text-xs font-medium text-zinc-400 mt-3">
                  <span>₹0</span>
                  <span>₹1,00,00,00,000+</span>
                </div>
              </div>

              <div className="sm:col-span-2">
                <label className="mb-2 block text-sm font-semibold text-black dark:text-white">Professional Bio <span className="text-red-500">*</span></label>
                <textarea name="bio" required rows={3} value={regData.bio} onChange={handleInputChange} placeholder="Tell us about your specialization and past work..." className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent px-4 py-3 text-sm text-black dark:text-white placeholder-zinc-400 dark:placeholder-zinc-600 outline-none focus:border-[#EAB308] focus:ring-1 focus:ring-[#EAB308] resize-none" />
              </div>
            </div>

            <button
              type="submit"
              disabled={isUpgrading}
              className="mt-4 w-full rounded-lg bg-[#EAB308] hover:bg-yellow-600 py-3.5 text-sm font-bold text-white transition-colors disabled:opacity-50 flex items-center justify-center"
            >
              {isUpgrading ? "Upgrading Profile..." : "Upgrade to Architect"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ----------------------------------------------------
  // STANDARD VIEW: Normal Architect Dashboard
  // ----------------------------------------------------
  if (error) return <div className="flex min-h-screen items-center justify-center text-red-500">{error}</div>;

  return (
    <div className="min-h-screen bg-background text-foreground font-sans py-6 sm:py-12 px-4 sm:px-6 transition-colors duration-300">
      <div className="mx-auto max-w-6xl relative">

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-zinc-200 dark:border-zinc-800 pb-6 sm:pb-8 mb-8 sm:mb-10 gap-5 sm:gap-0">
          <div className="w-full sm:w-auto">
            <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400 mb-1">{greeting},</p>
            <div className="flex justify-between items-center w-full">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tight leading-none">Architect Dashboard</h1>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3 mt-4 sm:mt-0">
            <Link href="/" className="cursor-pointer inline-flex items-center justify-center px-6 py-3 rounded-xl border text-sm font-semibold shadow-sm hover:bg-zinc-50 transition dark:hover:bg-zinc-800">
              Home
            </Link>
            <Link href="/booster-plans" className="cursor-pointer inline-flex items-center justify-center px-6 py-3 rounded-xl bg-zinc-900 text-white text-sm font-semibold shadow-sm hover:opacity-90 transition dark:bg-white dark:text-zinc-900">
              Booster Plans
            </Link>
            <Link href="/payments" className="cursor-pointer inline-flex items-center justify-center px-6 py-3 rounded-xl border text-sm font-semibold shadow-sm hover:bg-zinc-50 transition dark:hover:bg-zinc-800">
              Billing History
            </Link>
            <Link href="/subscriptions" className="cursor-pointer inline-flex items-center justify-center px-6 py-3 rounded-xl border text-sm font-semibold shadow-sm hover:bg-zinc-50 transition dark:hover:bg-zinc-800">
              My Subscription
            </Link>
          </div>
        </div>

        <ProfileCard
          profile={profile}
          totalProjects={projects.length}
          onEditProfile={() => setIsProfileModalOpen(true)}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          <ProjectsSection
            projects={projects}
            onAddProject={() => { setEditingProject(null); setIsProjectModalOpen(true); }}
            onEditProject={(proj) => { setEditingProject(proj); setIsProjectModalOpen(true); }}
            onDeleteProject={handleDeleteProject}
          />
          <QualificationsSection
            qualifications={qualifications}
            onAddQual={() => { setEditingQual(null); setIsQualModalOpen(true); }}
            onEditQual={(qual) => { setEditingQual(qual); setIsQualModalOpen(true); }}
            onDeleteQual={handleDeleteQualification}
          />
          <RatingsSection ratings={ratings} />
        </div>
      </div>

      {/* RENDER MODALS OUTSIDE MAIN LAYOUT */}
      <ProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        profile={profile}
        onSuccess={(updatedPayload) => {
          setProfile(prev => prev ? {
            ...prev, name: updatedPayload.name, mobile: updatedPayload.contact,
            architectDetails: { ...prev.architectDetails, ...updatedPayload } as any
          } : null);
        }}
      />

      <ProjectModal
        isOpen={isProjectModalOpen}
        onClose={() => setIsProjectModalOpen(false)}
        project={editingProject}
        categories={categories}
        onSuccess={(project, isEdit) => {
          if (isEdit) setProjects(projects.map(p => p._id === project._id ? project : p));
          else setProjects([...projects, project]);
        }}
      />

      <QualificationModal
        isOpen={isQualModalOpen}
        onClose={() => setIsQualModalOpen(false)}
        qual={editingQual}
        onSuccess={(qual, isEdit) => {
          if (isEdit) setQualifications(qualifications.map(q => q._id === qual._id ? qual : q));
          else setQualifications([...qualifications, qual]);
        }}
      />

    </div>
  );
}