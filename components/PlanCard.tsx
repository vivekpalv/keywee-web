// components/PlanCard.tsx
"use client";

import React from 'react';

export interface Plan {
  _id: string;
  title: string;
  desc: string;
  amount: number;
  isActive: boolean;
  days: number;
  role: string;
}

interface PlanCardProps {
  plan: Plan;
  isSelected: boolean;
  onSelect: () => void;
}

export default function PlanCard({ plan, isSelected, onSelect }: PlanCardProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const isYearly = plan.days >= 365;

  return (
    <div
      onClick={plan.isActive ? onSelect : undefined}
      className={`relative flex flex-col justify-between p-6 rounded-xl border bg-white dark:bg-black transition-all duration-200 cursor-pointer ${
        isSelected
          ? 'border-[#EAB308] ring-1 ring-[#EAB308] shadow-lg shadow-[#EAB308]/10'
          : 'border-zinc-200 dark:border-neutral-800 hover:border-zinc-300 dark:hover:border-neutral-700'
      } ${!plan.isActive && 'opacity-75 cursor-not-allowed'}`}
    >
      {isYearly && (
        <span className="absolute -top-3 left-6 bg-[#EAB308] text-black text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
          Best Value
        </span>
      )}

      <div>
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white">{plan.title}</h3>
          <span className="text-xs font-medium px-2 py-1 bg-zinc-100 dark:bg-neutral-900 border border-zinc-200 dark:border-neutral-800 rounded text-zinc-600 dark:text-neutral-400">
            {plan.days} Days
          </span>
        </div>

        <p className="text-sm text-zinc-500 dark:text-neutral-400 min-h-[40px] mb-6">
          {plan.desc}
        </p>

        <div className="flex items-baseline mb-6">
          <span className="text-3xl font-extrabold text-[#EAB308]">
            {formatCurrency(plan.amount)}
          </span>
          <span className="text-sm text-zinc-500 dark:text-neutral-500 ml-2">
            / {isYearly ? 'year' : 'month'}
          </span>
        </div>
      </div>

      <button
        onClick={(e) => {
          e.stopPropagation(); // Prevents double-firing the div click
          if (plan.isActive) onSelect();
        }}
        disabled={!plan.isActive}
        className={`w-full py-3 rounded-lg font-semibold text-sm transition-all duration-200 ${
          !plan.isActive
            ? 'bg-zinc-200 dark:bg-neutral-800 text-zinc-500 dark:text-neutral-500 cursor-not-allowed'
            : isSelected
            ? 'bg-[#EAB308] text-black shadow-md'
            : 'bg-zinc-100 dark:bg-white text-zinc-900 dark:text-black hover:bg-zinc-200 dark:hover:bg-neutral-200'
        }`}
      >
        {plan.isActive ? (isSelected ? 'Selected' : 'Choose Plan') : 'Unavailable'}
      </button>
    </div>
  );
}