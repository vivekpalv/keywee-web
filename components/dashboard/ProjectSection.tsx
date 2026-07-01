import React from "react";
import Link from "next/link";
import { ProjectItem } from "@/types/dashboard";

interface ProjectsSectionProps {
  projects: ProjectItem[];
  onAddProject: () => void;
  onEditProject: (proj: ProjectItem) => void;
  onDeleteProject: (id: string) => void;
}

export default function ProjectsSection({ projects, onAddProject, onEditProject, onDeleteProject }: ProjectsSectionProps) {
  return (
    <div className="lg:col-span-2 flex flex-col gap-6">
      <div className="flex justify-between items-center bg-white dark:bg-zinc-900 p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
        <h3 className="text-xl font-extrabold text-zinc-900 dark:text-zinc-100 pl-2">Project Portfolio</h3>
        <button onClick={onAddProject} className="text-xs font-bold bg-[#EAB308] hover:bg-yellow-600 text-white rounded-xl px-5 py-2.5 transition-colors shadow-sm">
          + Add Project
        </button>
      </div>

      {projects.length === 0 ? (
        <div className="rounded-3xl border-2 border-dashed border-zinc-200 dark:border-zinc-700 p-16 flex flex-col items-center justify-center text-center bg-zinc-50/50 dark:bg-zinc-800/30">
          <p className="text-zinc-400 font-bold mb-2">Your portfolio is currently empty.</p>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium max-w-xs">Upload your architectural designs and completed builds to attract clients.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {projects.map((proj) => (
            <div key={proj._id} className="group rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm flex flex-col overflow-hidden hover:shadow-md transition-shadow">
              <Link href={`/projects/${proj._id}`} className="block h-48 w-full bg-zinc-100 dark:bg-zinc-800 relative overflow-hidden cursor-pointer">
                {proj.media && proj.media.length > 0 ? (
                  <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: `url('${proj.media[0]}')` }} />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-zinc-50 dark:bg-zinc-800 text-zinc-300 dark:text-zinc-600 text-xs font-bold uppercase tracking-widest">No Image Uploaded</div>
                )}
                <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1.5 rounded-full capitalize">
                  📍 {proj.city}, {proj.state}
                </div>
              </Link>
              <div className="p-6 flex-1 flex flex-col">
                <Link href={`/projects/${proj._id}`}>
                  <h4 className="font-extrabold text-lg text-zinc-900 dark:text-zinc-100 line-clamp-1 hover:text-[#EAB308] transition-colors cursor-pointer">{proj.name}</h4>
                </Link>
                {proj.tags && proj.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {proj.tags.map((tag, i) => (
                      <span key={i} className="text-[9px] font-bold bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 px-2 py-1 rounded-md uppercase tracking-wide">{tag}</span>
                    ))}
                  </div>
                )}
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-4 line-clamp-3 font-medium leading-relaxed flex-1">
                  {proj.description || "No project description provided."}
                </p>
                <div className="mt-6 flex justify-between items-center border-t border-zinc-100 dark:border-zinc-800 pt-4">
                  <span className="text-[10px] text-zinc-400 font-bold uppercase">ID: {proj._id.slice(-6)}</span>
                  <div className="flex gap-4">
                    <button onClick={() => onEditProject(proj)} className="text-xs text-[#EAB308] font-bold hover:underline transition-all">Edit</button>
                    <button onClick={() => onDeleteProject(proj._id)} className="text-xs text-red-500 font-bold hover:underline transition-all">Delete</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}