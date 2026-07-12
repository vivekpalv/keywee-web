import React from "react";
import { RatingItem } from "@/types/dashboard";

interface RatingsSectionProps {
  ratings: RatingItem[];
}

export default function RatingsSection({ ratings }: RatingsSectionProps) {
  return (
    <div className="rounded-4xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 sm:p-8 shadow-sm h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-extrabold text-zinc-900 dark:text-zinc-100">Client Reviews</h2>
        <span className="text-xs font-bold bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 px-3 py-1 rounded-full">
          {ratings.length} {ratings.length === 1 ? "Review" : "Reviews"}
        </span>
      </div>

      {ratings.length === 0 ? (
        <div className="flex-1 flex items-center justify-center text-sm text-zinc-500 dark:text-zinc-400 text-center py-8 bg-zinc-50 dark:bg-zinc-800/50 rounded-2xl border border-zinc-100 dark:border-zinc-800">
          No reviews yet.
        </div>
      ) : (
        <div className="space-y-4 overflow-y-auto pr-2 custom-scrollbar max-h-100">
          {ratings.map((rating) => (
            <div key={rating._id} className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-700/50 transition-colors hover:border-zinc-200 dark:hover:border-zinc-600">
              <div className="flex justify-between items-start mb-2">
                <span className="font-bold text-sm text-zinc-900 dark:text-zinc-100 capitalize">
                  {rating.user?.name || "Anonymous Client"}
                </span>
                <span className="flex items-center gap-1 text-[#EAB308] text-sm font-bold bg-[#EAB308]/10 px-2 py-0.5 rounded-md">
                  ★ {rating.overallRating.toFixed(1)}
                </span>
              </div>
              <p className="text-sm text-zinc-600 dark:text-zinc-300 italic leading-relaxed">
                "{rating.review}"
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}