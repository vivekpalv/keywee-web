"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

// Extracted Components
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import ProfileCard from "@/components/dashboard/ProfileCard";
import ProjectsSection from "@/components/dashboard/ProjectSection";
import QualificationsSection from "@/components/dashboard/QualificationsSection";
import RatingsSection from "@/components/dashboard/RatingsSection"; // NEW IMPORT

// Extracted Modals
import ProfileModal from "@/components/dashboard/modals/ProfileModal";
import ProjectModal from "@/components/dashboard/modals/ProjectModal";
import QualificationModal from "@/components/dashboard/modals/QualificationModal";

// Types & API
import { UserProfile, ProjectItem, QualificationItem, CategoryItem, RatingItem } from "@/types/dashboard";
import { BASE_URL } from "@/utils/api";

const API_BASE_URL = BASE_URL;

export default function Dashboard() {
  const router = useRouter();

  // Data States
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [qualifications, setQualifications] = useState<QualificationItem[]>([]);
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [ratings, setRatings] = useState<RatingItem[]>([]); // NEW STATE

  // UI States
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Modal Control States
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<ProjectItem | null>(null);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [editingQual, setEditingQual] = useState<QualificationItem | null>(null);
  const [isQualModalOpen, setIsQualModalOpen] = useState(false);

  // --- Initial Data Fetch (Profile, Projects, Quals, Categories, Subscription Check) ---
  useEffect(() => {
    const fetchDashboardData = async () => {
      const token = localStorage.getItem("token");
      if (!token) return router.push("/login");

      try {
        // Added the have-active-subscription API call to the parallel fetch
        const [userRes, catRes, subRes] = await Promise.all([
          fetch(`${API_BASE_URL}user/me`, { headers: { "Authorization": `Bearer ${token}` } }),
          fetch(`${API_BASE_URL}user/category?childWithParent=false`, { headers: { "Authorization": `Bearer ${token}` } }),
          fetch(`${API_BASE_URL}user/have-active-subscription`, { headers: { "Authorization": `Bearer ${token}` } })
        ]);

        // Parse and check the subscription status first
        const subData = await subRes.json();
        
        if (subData.success && subData.hasActiveSubscription === false) {
          // Redirect the user immediately if they have no active subscription
          return router.push("/plans");
        }

        // If they have a subscription, proceed to parse the rest of the dashboard data
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

  if (loading) return <div className="flex min-h-screen items-center justify-center gap-3"><LoadingSpinner className="w-6 h-6" /><span className="font-bold">Loading...</span></div>;
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
            {/* Added dark:hover:bg-zinc-800 to fix white background hover bug in dark mode */}
            <Link href="/payments" className="cursor-pointer inline-flex items-center justify-center px-6 py-3 rounded-xl border text-sm font-semibold shadow-sm hover:bg-zinc-50 transition dark:hover:bg-zinc-800">
              Billing History
            </Link>
            {/* Added dark:hover:bg-zinc-800 to fix white background hover bug in dark mode */}
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

        {/* Updated Grid to perfectly fit Projects, Quals, and Ratings */}
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

          {/* RATINGS SECTION */}
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