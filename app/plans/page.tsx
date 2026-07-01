// app/plans/page.tsx
import React from 'react';
import { BASE_URL } from '@/utils/api';
import PlansGrid from '@/components/PlansGrid';
import { Plan } from '@/components/PlanCard';

async function getPlans(): Promise<Plan[]> {
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZhMGQ0MTA5ZTAyYzFjYTg0NDllYWE4YyIsInJvbGVzIjpbIkNMSUVOVCIsIkFSQ0hJVEVDVCIsIkFETUlOIl0sImlhdCI6MTc4MjQ3MjgzNiwiZXhwIjoxNzg1MDY0ODM2fQ.x6BkKeynUea2QOrXqpXGZC4_oOBrQdW2uIkQ5WDkJ70";
  
  try {
    const res = await fetch(`${BASE_URL}public/plans?role=ARCHITECT`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      next: { revalidate: 3600 }
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch plans: ${res.status}`);
    }

    const data = await res.json();
    return data.success ? data.plans : [];
  } catch (error) {
    console.error("Error loading membership plans:", error);
    return [];
  }
}

export default async function PlansPage() {
  const plans = await getPlans();

  return (
    <div className="min-h-screen bg-white dark:bg-black text-zinc-900 dark:text-white px-6 py-12 md:py-20 transition-colors duration-300">
      <div className="max-w-5xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-12 md:mb-16">
          <span className="text-xs font-bold tracking-widest text-[#EAB308] uppercase bg-[#EAB308]/10 px-3 py-1 rounded-full">
            Pricing Models
          </span>
          <h1 className="text-3xl md:text-5xl font-black mt-4 tracking-tight">
            Architect Membership Plans
          </h1>
          <p className="text-zinc-600 dark:text-neutral-400 mt-3 max-w-xl mx-auto text-sm md:text-base">
            Choose the right timeline to unlock advanced dashboard features, professional tools, and continuous project matching.
          </p>
        </div>

        {/* Dynamic Display Grid via Client Component */}
        <PlansGrid plans={plans} />

        {/* Bottom Context Notice */}
        <p className="text-center text-xs text-zinc-500 dark:text-neutral-600 mt-12">
          All subscription options are bound to our system terms of service. Prices are exclusive of standard local taxes.
        </p>

      </div>
    </div>
  );
}