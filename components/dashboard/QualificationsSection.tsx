import React from "react";
import { QualificationItem } from "@/types/dashboard";

interface QualificationsSectionProps {
  qualifications: QualificationItem[];
  onAddQual: () => void;
  onEditQual: (qual: QualificationItem) => void;
  onDeleteQual: (id: string) => void;
}

export default function QualificationsSection({ qualifications, onAddQual, onEditQual, onDeleteQual }: QualificationsSectionProps) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center bg-white dark:bg-zinc-900 p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
        <h3 className="text-xl font-extrabold text-zinc-900 dark:text-zinc-100 pl-2">Credentials</h3>
        <button onClick={onAddQual} className="text-xs font-bold border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-zinc-900 dark:text-zinc-100 bg-white dark:bg-zinc-900 rounded-xl px-4 py-2.5 transition-colors">
          + Add
        </button>
      </div>

      {qualifications.length === 0 ? (
        <div className="rounded-3xl border-2 border-dashed border-zinc-200 dark:border-zinc-700 p-10 text-center bg-zinc-50/50 dark:bg-zinc-800/30">
          <p className="text-sm text-zinc-400 font-bold">No academic degrees tracked.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {qualifications.map((qual) => (
            <div key={qual._id} className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 shadow-sm relative group hover:border-yellow-200 dark:hover:border-yellow-700/50 transition-colors">
              <div className="flex items-start justify-between mb-3">
                <h4 className="text-base font-extrabold text-zinc-900 dark:text-zinc-100 pr-8 leading-tight capitalize">{qual.degree || "Degree Specialization"}</h4>
                <div className="absolute top-6 right-6 flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity bg-white dark:bg-zinc-900 pl-2">
                  <button onClick={() => onEditQual(qual)} className="text-xs text-[#EAB308] hover:underline font-bold">Edit</button>
                  <button onClick={() => onDeleteQual(qual._id)} className="text-xs text-red-500 hover:underline font-bold">Del</button>
                </div>
              </div>
              <p className="text-sm font-bold text-[#EAB308] capitalize mb-1">{qual.university || "University Institution"}</p>
              <div className="mt-4 flex flex-col gap-2 border-t border-zinc-100 dark:border-zinc-800 pt-3">
                {qual.yearOfPassing && (
                  <div className="flex items-center justify-between text-[11px] font-bold text-zinc-500 uppercase tracking-wide">
                    <span>Graduated:</span>
                    <span className="text-zinc-900 dark:text-zinc-100 bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded">{qual.yearOfPassing}</span>
                  </div>
                )}
                {qual.coaNo && (
                  <div className="flex items-center justify-between text-[11px] font-bold text-zinc-500 uppercase tracking-wide">
                    <span>COA No:</span>
                    <span className="text-zinc-900 dark:text-zinc-100">{qual.coaNo}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}