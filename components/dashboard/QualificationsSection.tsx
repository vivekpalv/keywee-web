import React from "react";
import { QualificationItem } from "@/types/dashboard";

interface QualificationsSectionProps {
  qualifications: QualificationItem[];
  onAddQual: () => void;
  onEditQual: (qual: QualificationItem) => void;
  onDeleteQual: (id: string) => void;
}

export default function QualificationsSection({ qualifications, onAddQual, onEditQual, onDeleteQual }: QualificationsSectionProps) {
  // Sort qualifications by year descending so the newest is on top
  const sortedQuals = [...qualifications].sort((a, b) => (b.yearOfPassing || 0) - (a.yearOfPassing || 0));

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center bg-white dark:bg-zinc-900 p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
        <h3 className="text-xl font-extrabold text-zinc-900 dark:text-zinc-100 pl-2">Credentials</h3>
        <button onClick={onAddQual} className="text-xs font-bold cursor-pointer border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-zinc-900 dark:text-zinc-100 bg-white dark:bg-zinc-900 rounded-xl px-4 py-2.5 transition-colors">
          + Add
        </button>
      </div>

      {sortedQuals.length === 0 ? (
        <div className="rounded-3xl border-2 border-dashed border-zinc-200 dark:border-zinc-700 p-10 text-center bg-zinc-50/50 dark:bg-zinc-800/30">
          <p className="text-sm text-zinc-400 font-bold">No academic degrees tracked.</p>
        </div>
      ) : (
        <div className="relative pl-6 sm:pl-8 border-l-2 border-zinc-200 dark:border-zinc-800 space-y-8 mt-2 ml-2">
          {sortedQuals.map((qual) => (
            <div key={qual._id} className="relative group">
              {/* Timeline Dot */}
              <div className="absolute -left-8.75 sm:-left-10.75 top-1.5 h-4 w-4 rounded-full bg-white dark:bg-zinc-900 border-4 border-[#EAB308] group-hover:scale-125 transition-transform" />
              
              <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 shadow-sm relative hover:border-[#EAB308]/50 transition-colors">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="text-base font-extrabold text-zinc-900 dark:text-zinc-100 pr-8 leading-tight capitalize">{qual.degree || "Degree Specialization"}</h4>
                  <div className="flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity bg-white dark:bg-zinc-900 pl-2">
                    <button onClick={() => onEditQual(qual)} className="text-xs text-zinc-500 hover:text-[#EAB308] font-bold transition-colors">Edit</button>
                    <button onClick={() => onDeleteQual(qual._id)} className="text-xs text-zinc-500 hover:text-red-500 font-bold transition-colors">Del</button>
                  </div>
                </div>
                <p className="text-sm font-bold text-[#EAB308] capitalize mb-3">{qual.university || "University Institution"}</p>
                
                <div className="flex flex-wrap gap-2 pt-3 border-t border-zinc-100 dark:border-zinc-800">
                  {qual.yearOfPassing && (
                    <span className="text-[10px] font-bold bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 px-2 py-1 rounded uppercase tracking-wide">
                      Class of {qual.yearOfPassing}
                    </span>
                  )}
                  {qual.coaNo && (
                    <span className="text-[10px] font-bold bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 px-2 py-1 rounded uppercase tracking-wide flex items-center gap-1">
                      <span className="text-[#EAB308]">★</span> {qual.coaNo}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}