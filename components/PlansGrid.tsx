// components/PlansGrid.tsx
"use client";

import React, { useState } from 'react';
import PlanCard, { Plan } from './PlanCard';

export default function PlansGrid({ plans }: { plans: Plan[] }) {
  // Auto-select the yearly plan by default, otherwise select the first plan
  const defaultPlan = plans.find(p => p.days >= 365) || plans[0];
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(defaultPlan?._id || null);

  if (plans.length === 0) {
    return (
      <div className="text-center py-12 border border-zinc-200 dark:border-neutral-800 rounded-xl bg-zinc-50 dark:bg-neutral-950">
        <p className="text-zinc-500 dark:text-neutral-500">No active plans found for this role at the moment.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto items-stretch">
      {plans.map((plan) => (
        <PlanCard
          key={plan._id}
          plan={plan}
          isSelected={selectedPlanId === plan._id}
          onSelect={() => setSelectedPlanId(plan._id)}
        />
      ))}
    </div>
  );
}