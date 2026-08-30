"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { BASE_URL } from "@/utils/api";

interface PlanSnippet {
  _id: string;
  title: string;
  amount: number;
  days: number;
  role: string;
}

interface PaymentSnippet {
  _id: string;
  amount: number;
  currency: string;
  status: string;
}

interface Subscription {
  _id: string;
  isBooster: boolean;
  plan: PlanSnippet;
  payment: PaymentSnippet;
  start: string;
  end: string;
  expired: boolean;
  createdAt: string;
}

export default function SubscriptionsPage() {
  const router = useRouter();
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSubscriptions = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        return router.push("/login");
      }

      try {
        const res = await fetch(`${BASE_URL}user/subscription`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        const data = await res.json();

        if (res.ok && data.success) {
          // Sort: Active ones first, then by newest
          const sortedSubs = (data.subscriptions || []).sort(
            (a: Subscription, b: Subscription) => {
              const aActive = !a.expired && new Date(a.end).getTime() > Date.now() ? 1 : 0;
              const bActive = !b.expired && new Date(b.end).getTime() > Date.now() ? 1 : 0;
              if (aActive !== bActive) return bActive - aActive;
              return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
            }
          );
          setSubscriptions(sortedSubs);
        } else {
          setError(data.message || "Failed to load subscriptions.");
        }
      } catch (err) {
        console.error("Error loading subscriptions:", err);
        setError("Network error. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchSubscriptions();
  }, [router]);

  // Helper to format currency
  const formatCurrency = (amount: number, currency: string = "INR") => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: currency,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Helper to format dates cleanly
  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(new Date(dateString));
  };

  // Calculate days remaining safely
  const getDaysRemaining = (endDateString: string) => {
    const end = new Date(endDateString).getTime();
    const now = new Date().getTime();
    const diff = end - now;
    return diff > 0 ? Math.ceil(diff / (1000 * 60 * 60 * 24)) : 0;
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FBFAF7] dark:bg-[#0A0A0A] gap-3">
        <LoadingSpinner className="w-6 h-6 text-zinc-900 dark:text-white" />
        <span className="font-bold text-zinc-900 dark:text-white">Loading Subscriptions...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FBFAF7] dark:bg-[#0A0A0A] text-zinc-900 dark:text-white px-4 py-8 sm:px-6 md:py-12 transition-colors duration-300">
      <div className="max-w-4xl mx-auto relative">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-zinc-200 dark:border-zinc-800 pb-6 mb-8 gap-4">
          <div>
            <Link 
              href="/" 
              className="inline-flex items-center text-xs font-bold text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors mb-3"
            >
              &larr; Back to Dashboard
            </Link>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">My Subscriptions</h1>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
              Manage your active memberships and view past plans.
            </p>
          </div>
          <Link 
            href="/plans" 
            className="px-5 py-2.5 bg-black dark:bg-white text-white dark:text-black hover:bg-zinc-800 dark:hover:bg-zinc-200 text-sm font-bold rounded-xl transition-colors shadow-sm"
          >
            Upgrade Plans
          </Link>
        </div>

        {error ? (
          <div className="p-4 rounded-xl bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border border-red-100 dark:border-red-900/50 text-sm font-medium text-center">
            {error}
          </div>
        ) : subscriptions.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
            <span className="text-4xl block mb-3">🛡️</span>
            <h3 className="text-lg font-bold mb-1">No Subscriptions Found</h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">You don't have any active or past subscriptions.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {subscriptions.map((sub) => {
              // Strictly define active status
              const isActive = !sub.expired && new Date(sub.end).getTime() > new Date().getTime();
              const daysLeft = getDaysRemaining(sub.end);

              return (
                <div 
                  key={sub._id} 
                  className={`relative p-5 sm:p-6 rounded-3xl border bg-white dark:bg-zinc-900 shadow-sm transition-all overflow-hidden ${
                    isActive 
                      ? "border-[#EAB308] dark:border-yellow-600 ring-1 ring-[#EAB308]/20" 
                      : "border-zinc-200 dark:border-zinc-800 opacity-80"
                  }`}
                >
                  {/* Decorative Active Indicator */}
                  {isActive && (
                    <div className="absolute top-0 left-0 w-1.5 h-full bg-[#EAB308]"></div>
                  )}

                  <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-4 border-b border-zinc-100 dark:border-zinc-800 pb-4">
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className={`text-lg font-bold ${isActive ? "text-zinc-900 dark:text-zinc-100" : "text-zinc-500 dark:text-zinc-400"}`}>
                          {sub.plan.title}
                        </h3>
                        {sub.isBooster && (
                          <span className="text-[10px] uppercase font-black tracking-widest bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 px-2 py-0.5 rounded-md">
                            Booster
                          </span>
                        )}
                        {isActive ? (
                          <span className="text-[10px] uppercase font-black tracking-widest bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-2 py-0.5 rounded-md flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                            Active
                          </span>
                        ) : (
                          <span className="text-[10px] uppercase font-black tracking-widest bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 px-2 py-0.5 rounded-md">
                            Expired
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-zinc-500 font-medium">
                        Subscription ID: <span className="font-mono uppercase">{sub._id.slice(-8)}</span>
                      </p>
                    </div>

                    <div className="text-left sm:text-right">
                      {isActive ? (
                        <>
                          <div className="text-2xl font-black text-[#EAB308]">
                            {daysLeft} <span className="text-sm font-bold text-zinc-500">Days</span>
                          </div>
                          <p className="text-xs text-zinc-500 font-bold uppercase mt-0.5">Remaining in plan</p>
                        </>
                      ) : (
                        <div className="text-sm font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wide">
                          Ended {formatDate(sub.end)}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm bg-zinc-50 dark:bg-zinc-800/40 p-4 rounded-2xl">
                    <div>
                      <span className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-1">
                        Validity Period
                      </span>
                      <span className="font-semibold text-zinc-800 dark:text-zinc-200">
                        {formatDate(sub.start)} &rarr; {formatDate(sub.end)}
                      </span>
                    </div>
                    <div>
                      <span className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-1">
                        Amount Paid
                      </span>
                      <span className="font-semibold text-zinc-800 dark:text-zinc-200 flex items-center gap-2">
                        {formatCurrency(sub.payment.amount, sub.payment.currency)}
                        <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold uppercase ${sub.payment.status === 'success' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-700'}`}>
                          {sub.payment.status}
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}