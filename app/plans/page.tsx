// app/plans/page.tsx
"use client";

import React, { useState, useEffect } from 'react';
import Script from 'next/script';
import { useRouter } from 'next/navigation';
import { BASE_URL } from '@/utils/api';
import PlansGrid from '@/components/PlansGrid';
import { Plan } from '@/components/PlanCard';

export default function PlansPage() {
  const router = useRouter();
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch plans exactly like Dashboard data fetch
  useEffect(() => {
    const fetchPlans = async () => {
      const token = localStorage.getItem("token");
      
      // Redirect to login if no token is found
      if (!token) {
        return router.push("/login");
      }
      
      try {
        const res = await fetch(`${BASE_URL}public/plans?role=ARCHITECT`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          }
        });

        const data = await res.json();
        
        if (res.ok && data.success) {
          setPlans(data.plans);
        } else {
          setError(data.message || "Failed to load plans.");
        }
      } catch (error) {
        console.error("Error loading membership plans:", error);
        setError("Network error. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, [router]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white dark:bg-black">
        <span className="font-bold text-zinc-900 dark:text-white">Loading Plans...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white dark:bg-black text-red-500">
        {error}
      </div>
    );
  }

  return (
    <>
      {/* Load Razorpay SDK */}
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />

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

          {/* Dynamic Display Grid */}
          <PlansGrid plans={plans} />

          {/* Bottom Context Notice */}
          <p className="text-center text-xs text-zinc-500 dark:text-neutral-600 mt-12">
            All subscription options are bound to our system terms of service. Prices are exclusive of standard local taxes.
          </p>

        </div>
      </div>
    </>
  );
}