import React from "react";
import { UserProfile } from "@/types/dashboard";

interface ProfileCardProps {
  profile: UserProfile | null;
  totalProjects: number;
  onEditProfile: () => void;
}

export default function ProfileCard({ profile, totalProjects, onEditProfile }: ProfileCardProps) {
  const archDetails = profile?.architectDetails;

  // Calculate a simple profile completion score
  const completionFields = [
    profile?.name,
    archDetails?.firmName,
    archDetails?.bio,
    archDetails?.profilePictureUrl,
    archDetails?.city,
    archDetails?.experience
  ];
  const completedCount = completionFields.filter(Boolean).length;
  const completionPercentage = Math.round((completedCount / completionFields.length) * 100);

  return (
    <div className="rounded-[2rem] border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-8 mb-12 shadow-sm relative overflow-hidden group">
      
      <div className="absolute top-6 right-6">
        <button onClick={onEditProfile} className="text-xs font-bold border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 bg-white dark:bg-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-700 rounded-lg px-4 py-2 transition-colors shadow-sm">
          Edit Profile
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mt-2">
        <div className="md:col-span-7 flex flex-col justify-center border-b md:border-b-0 md:border-r border-zinc-100 dark:border-zinc-800 pb-6 md:pb-0 md:pr-8 pt-4 md:pt-0">
          <div className="flex items-start gap-5 mb-4">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-zinc-100 dark:bg-zinc-800 border-4 border-[#FFF9E6] dark:border-yellow-900/30 shadow-sm flex-shrink-0 overflow-hidden flex items-center justify-center relative">
              {archDetails?.profilePictureUrl ? (
                <img src={archDetails.profilePictureUrl} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <span className="text-3xl">👤</span>
              )}
            </div>
            <div className="pt-2 w-full">
              <div className="flex items-center gap-3 mb-1">
                <h2 className="text-3xl font-extrabold text-zinc-900 dark:text-zinc-100 capitalize leading-none">{profile?.name}</h2>
                {archDetails?.verified && (
                  <span className="bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider border border-blue-100 dark:border-blue-800">Verified</span>
                )}
              </div>
              <p className="text-sm font-bold text-[#EAB308] uppercase tracking-wide mt-1.5">{archDetails?.firmName || "Independent Professional"}</p>
              
              {/* Profile Completion Bar */}
              <div className="mt-4 max-w-xs">
                <div className="flex justify-between text-[10px] font-bold text-zinc-500 mb-1.5 uppercase tracking-wider">
                  <span>Profile Setup</span>
                  <span className={completionPercentage === 100 ? "text-green-500" : "text-[#EAB308]"}>{completionPercentage}%</span>
                </div>
                <div className="h-1.5 w-full bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-1000 ${completionPercentage === 100 ? 'bg-green-500' : 'bg-[#EAB308]'}`} 
                    style={{ width: `${completionPercentage}%` }}
                  />
                </div>
              </div>

            </div>
          </div>
          <div className="mt-2 text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed font-medium bg-zinc-50 dark:bg-zinc-800/50 p-4 rounded-xl border border-zinc-100 dark:border-zinc-700/50">
            {archDetails?.bio ? `"${archDetails.bio}"` : "No professional biography provided yet. Add your story."}
          </div>
        </div>

        <div className="md:col-span-5 flex flex-col justify-center gap-4 text-sm font-semibold text-zinc-800 dark:text-zinc-200">
          <div className="grid grid-cols-2 gap-4 mb-2">
            <div className="bg-[#FFF9E6] dark:bg-yellow-900/20 border border-yellow-100 dark:border-yellow-700/30 p-4 rounded-2xl flex flex-col items-center justify-center text-center">
              <span className="text-2xl font-black text-yellow-600 dark:text-yellow-500">{totalProjects}</span>
              <span className="text-[10px] uppercase text-yellow-700 dark:text-yellow-600 font-bold mt-1">Total Projects</span>
            </div>
            <div className="bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-700/50 p-4 rounded-2xl flex flex-col items-center justify-center text-center">
              <span className="text-2xl font-black text-zinc-900 dark:text-zinc-100">{archDetails?.experience || 0}</span>
              <span className="text-[10px] uppercase text-zinc-500 dark:text-zinc-400 font-bold mt-1">Years Experience</span>
            </div>
          </div>
          <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-3 mt-2">
            <span className="text-zinc-400 font-medium">📍 Headquarters:</span>
            <span className="capitalize">{archDetails?.city || "-"}, {archDetails?.state || "-"}</span>
          </div>
          <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-3">
            <span className="text-zinc-400 font-medium">📞 Direct Line:</span>
            <span>{archDetails?.contact || profile?.mobile || "-"}</span>
          </div>
        </div>
      </div>
    </div>
  );
}