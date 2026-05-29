'use client';

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

const API_BASE_URL = "https://backend.keywee.in/api/v1";

// --- Interfaces ---
interface ArchitectInfo {
  _id: string;
  firmName: string;
  contact: string;
  verified: boolean;
}

interface ProjectDetail {
  _id: string;
  name: string;
  city: string;
  state: string;
  description: string;
  media: string[];
  tags: string[];
  architect: ArchitectInfo;
  createdAt: string;
}

export default function ProjectDetailsPage() {
  const { id } = useParams(); // Captures the dynamic ID from the URL
  const router = useRouter();
  
  const [project, setProject] = useState<ProjectDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProject = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/login");
        return;
      }

      try {
        const res = await fetch(`${API_BASE_URL}/user/projects/${id}`, {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });
        
        const data = await res.json();

        if (data.success) {
          setProject(data.project);
        } else {
          setError(data.message || "Failed to load project details.");
        }
      } catch (err) {
        setError("Network error occurred while fetching project data.");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProject();
  }, [id, router]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FBFAF7]">
        <div className="text-sm font-bold text-zinc-500 animate-pulse">Loading project details...</div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FBFAF7] px-6">
        <div className="w-full max-w-md text-center rounded-2xl bg-white border border-zinc-200 p-8 shadow-sm">
          <p className="text-sm font-semibold text-red-600 mb-4">{error || "Project not found."}</p>
          <button onClick={() => router.back()} className="text-xs font-bold text-[#EAB308] hover:underline">
            &larr; Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FBFAF7] font-sans pb-20">
      
      {/* --- HERO SECTION --- */}
      <div className="w-full bg-white border-b border-zinc-200 pt-8 pb-12 px-6">
        <div className="mx-auto max-w-6xl">
          <button onClick={() => router.back()} className="text-xs font-bold text-zinc-500 hover:text-zinc-900 mb-6 inline-block transition-colors">
            &larr; Back
          </button>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-zinc-900 tracking-tight capitalize mb-3">
                {project.name}
              </h1>
              <div className="flex items-center gap-4 text-sm font-semibold text-zinc-500">
                <span className="flex items-center gap-1 text-zinc-700 bg-zinc-100 px-3 py-1.5 rounded-lg">
                  📍 {project.city}, {project.state}
                </span>
                <span>Published {new Date(project.createdAt).toLocaleDateString()}</span>
              </div>
            </div>

            {/* Tags */}
            {project.tags && project.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, i) => (
                  <span key={i} className="text-xs font-bold bg-[#FFF9E6] text-[#D97706] border border-yellow-100 px-3 py-1.5 rounded-full uppercase tracking-wide">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* --- MAIN CONTENT AREA --- */}
      <div className="mx-auto max-w-6xl px-6 pt-10 grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Column: Media & Description (Span 8) */}
        <div className="lg:col-span-8 flex flex-col gap-10">
          
          {/* Main Hero Image */}
          {project.media && project.media.length > 0 ? (
            <div className="w-full h-[400px] sm:h-[500px] rounded-[2rem] overflow-hidden shadow-sm border border-zinc-200 bg-zinc-100">
              <img 
                src={project.media[0]} 
                alt={project.name} 
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className="w-full h-[300px] rounded-[2rem] border-2 border-dashed border-zinc-200 bg-zinc-50 flex items-center justify-center text-zinc-400 font-bold uppercase tracking-widest text-sm">
              No Media Uploaded
            </div>
          )}

          {/* Project Overview */}
          <div className="bg-white rounded-[2rem] border border-zinc-200 p-8 shadow-sm">
            <h2 className="text-2xl font-extrabold text-zinc-900 mb-4">Project Overview</h2>
            <p className="text-base text-zinc-600 leading-relaxed whitespace-pre-wrap font-medium">
              {project.description || "No description provided for this project."}
            </p>
          </div>

          {/* Image Gallery Grid (Skipping the first image as it's the hero) */}
          {project.media && project.media.length > 1 && (
            <div>
              <h3 className="text-xl font-extrabold text-zinc-900 mb-6">Gallery</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {project.media.slice(1).map((imgUrl, i) => (
                  <div key={i} className="h-64 rounded-2xl overflow-hidden border border-zinc-200 shadow-sm bg-zinc-100 group">
                    <img 
                      src={imgUrl} 
                      alt={`Gallery view ${i + 1}`} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Right Column: Architect Sidebar (Span 4) */}
        <div className="lg:col-span-4">
          <div className="sticky top-8 flex flex-col gap-6">
            
            {/* Architect Card */}
            <div className="bg-white rounded-[2rem] border border-zinc-200 p-8 shadow-sm">
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block mb-4">Designed By</span>
              
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-xl font-extrabold text-zinc-900 capitalize">
                  {project.architect?.firmName || "Independent Studio"}
                </h3>
                {project.architect?.verified && (
                  <span title="Verified Architect" className="bg-blue-50 text-blue-700 border border-blue-100 w-5 h-5 flex items-center justify-center rounded-full text-xs shadow-sm">
                    ✓
                  </span>
                )}
              </div>
              
              {/* <div className="mt-6 flex flex-col gap-4 border-t border-zinc-100 pt-6">
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-bold text-zinc-400 uppercase">Contact Firm</span>
                  <span className="text-sm font-bold text-zinc-900">+91 {project.architect?.contact || "N/A"}</span>
                </div>
              </div> */}

              <button className="w-full mt-8 bg-black hover:bg-zinc-800 text-white font-bold py-3.5 rounded-xl transition-colors shadow-sm">
                Message Architect
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}