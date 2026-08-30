"use client";

import React from "react";

export interface Plan {
  _id: string;
  title: string;
  desc?: string;
  amount: number;
  isActive: boolean;
  days: number;
  role: string;
}

interface PlanCardProps {
  plan: Plan;
  isSelected: boolean;
  onSelect: () => void;
  isBestValue?: boolean;
}

export default function PlanCard({
  plan,
  isSelected,
  onSelect,
  isBestValue = false,
}: PlanCardProps) {
  
  if (!plan) return null;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const isYearly = plan.days >= 365;

  const features = (plan.desc || "")
    .split(/\\n|\n/)
    .map((f) => f.trim())
    .filter(Boolean);

  return (
    <div
      onClick={plan.isActive ? onSelect : undefined}
      className={`relative flex flex-col p-6 rounded-2xl border bg-white dark:bg-[#0A0A0A] transition-all duration-200 cursor-pointer ${
        isSelected
          ? "border-[#EAB308] ring-1 ring-[#EAB308] shadow-xl shadow-[#EAB308]/10"
          : "border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700"
      } ${!plan.isActive && "opacity-75 cursor-not-allowed"}`}
    >
      {isBestValue && (
        <span className="absolute -top-3 left-6 bg-[#EAB308] text-black text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
          Best Value
        </span>
      )}

      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white">
          {plan.title}
        </h3>

        <span className="text-[10px] font-bold px-2 py-1 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
          {plan.days} Days
        </span>
      </div>

      {/* Price Container */}
      <div className="flex flex-col mb-6">
        
        {/* SALE BADGE & Strike-through logic for 999 */}
        {plan.amount === 999 && (
          <div className="flex items-center gap-2 mb-1">
            <span className="text-sm font-semibold text-zinc-400 line-through decoration-red-500/70">
              {formatCurrency(100000)}
            </span>
            <span className="text-[10px] font-black uppercase tracking-wider text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900/30 px-2 py-0.5 rounded animate-pulse">
              99% Off
            </span>
          </div>
        )}
        
        <div className="flex items-baseline">
          <span className="text-4xl font-black text-zinc-900 dark:text-white">
            {formatCurrency(plan.amount)}
          </span>

          <span className="text-sm font-medium text-zinc-500 dark:text-zinc-500 ml-1">
            /{isYearly ? "yr" : "mo"}
          </span>
        </div>
      </div>

      {/* Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          if (plan.isActive) onSelect();
        }}
        disabled={!plan.isActive}
        className={`w-full py-3 rounded-xl font-bold text-sm transition-all duration-200 mb-6 ${
          !plan.isActive
            ? "bg-zinc-100 dark:bg-zinc-900 text-zinc-400 dark:text-zinc-600 border border-zinc-200 dark:border-zinc-800 cursor-not-allowed"
            : isSelected
            ? "bg-[#EAB308] text-black shadow-md border border-[#EAB308]"
            : "bg-transparent text-[#EAB308] border border-[#EAB308] hover:bg-[#EAB308]/10"
        }`}
      >
        {plan.isActive
          ? isSelected
            ? "Selected"
            : "Choose plan"
          : "Unavailable"}
      </button>

      <div className="w-full h-px bg-zinc-200 dark:bg-zinc-800 mb-6" />

      {/* Features */}
      <ul className="flex flex-col gap-4 grow">
        {features.map((feature, index) => {
          const isIncluded = feature.startsWith("✓");
          const featureText = feature.replace(/^[✓-]\s*/, "");

          return (
            <li key={index} className="flex items-start text-sm">
              <span
                className={`mr-3 mt-0.5 font-bold shrink-0 ${
                  isIncluded
                    ? "text-green-500"
                    : "text-zinc-400 dark:text-zinc-600"
                }`}
              >
                ✓
              </span>

              <span
                className={`leading-tight ${
                  isIncluded
                    ? "text-zinc-900 dark:text-zinc-100 font-medium"
                    : "text-zinc-500 dark:text-zinc-500"
                }`}
              >
                {featureText}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}