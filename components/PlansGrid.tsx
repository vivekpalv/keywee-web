"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation"; // <-- 1. Import useRouter
import PlanCard, { Plan } from "./PlanCard";
import { BASE_URL } from "@/utils/api";

export default function PlansGrid({ plans }: { plans: Plan[] }) {
  const router = useRouter(); // <-- 2. Initialize router

  // Sort plans by amount (Highest -> Lowest) to find Best Value
  const sortedPlans = [...plans].sort((a, b) => b.amount - a.amount);

  // Best Value = Second highest priced plan
  const bestValuePlan =
    sortedPlans.length >= 2 ? sortedPlans[1] : sortedPlans[0];

  // Default selected plan = Best Value
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(
    bestValuePlan?._id || null
  );

  const [isProcessing, setIsProcessing] = useState(false);

  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const handlePurchase = async () => {
    if (!selectedPlanId || isProcessing) return;

    setIsProcessing(true);

    try {
      const response = await fetch(
        `${BASE_URL}user/subscription/${selectedPlanId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message || "Failed to initialize order");
      }

      const options = {
        key:
          process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID ||
          "YOUR_PUBLIC_KEY_HERE",

        amount: data.amount,
        currency: data.currency,
        name: "Keywee",
        description: "Architect Membership Subscription",
        order_id: data.orderId,

        handler: async function (response: any) {
          // You can also call your backend API here to verify the signature if needed
          alert(
            `Payment Successful! Payment ID: ${response.razorpay_payment_id}`
          );
          console.log("Payment Success:", response);

          // <-- 3. Redirect to payments page after success
          router.push("/payments"); 
        },

        prefill: {
          name: "Architect User",
          email: "architect@example.com",
        },

        theme: {
          color: "#EAB308",
        },
      };

      if ((window as any).Razorpay) {
        const rzp = new (window as any).Razorpay(options);

        rzp.on("payment.failed", function (response: any) {
          alert(`Payment Failed: ${response.error.description}`);
        });

        rzp.open();
      } else {
        alert("Unable to load Razorpay.");
      }
    } catch (error: any) {
      console.error("Checkout Error:", error);
      alert(error.message || "Something went wrong.");
    } finally {
      setIsProcessing(false);
    }
  };

  if (plans.length === 0) {
    return (
      <div className="text-center py-12 border border-zinc-200 dark:border-neutral-800 rounded-xl bg-zinc-50 dark:bg-neutral-950">
        <p className="text-zinc-500 dark:text-neutral-500">
          No active plans found for this role at the moment.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto items-stretch w-full mb-10">
        {[...plans]
          .sort((a, b) => a.amount - b.amount) // Render from lowest to highest price visually
          .map((plan) => (
          <PlanCard
            key={plan._id}
            plan={plan}
            isSelected={selectedPlanId === plan._id}
            onSelect={() => setSelectedPlanId(plan._id)}
            isBestValue={plan._id === bestValuePlan?._id}
          />
        ))}
      </div>

      {selectedPlanId && (
        <div className="w-full max-w-sm mt-8">
          <button
            onClick={handlePurchase}
            disabled={isProcessing}
            className="w-full py-4 px-6 bg-[#EAB308] hover:bg-yellow-500 text-black font-bold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-yellow-500/20 active:scale-[0.98]"
          >
            {isProcessing
              ? "Initializing Secure Checkout..."
              : "Proceed to Payment"}
          </button>
        </div>
      )}
    </div>
  );
}