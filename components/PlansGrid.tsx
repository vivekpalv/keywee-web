// components/PlansGrid.tsx
"use client";

import React, { useState } from 'react';
import PlanCard, { Plan } from './PlanCard';
import { BASE_URL } from '@/utils/api';

export default function PlansGrid({ plans }: { plans: Plan[] }) {
  // Auto-select the yearly plan by default, otherwise select the first plan
  const defaultPlan = plans.find(p => p.days >= 365) || plans[0];
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(defaultPlan?._id || null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Hardcoded token for API call (Consider moving to context or session in production)
  const token = localStorage.getItem("token");

  const handlePurchase = async () => {
    if (!selectedPlanId || isProcessing) return;
    setIsProcessing(true);

    try {
      // 1. Initialize Order at your backend
      const response = await fetch(`${BASE_URL}user/subscription/${selectedPlanId}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message || 'Failed to initialize order');
      }

      // 2. Setup Razorpay Options
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'YOUR_PUBLIC_KEY_HERE', // Remember to replace this!
        amount: data.amount,
        currency: data.currency,
        name: "Keywee",
        description: "Architect Membership Subscription",
        order_id: data.orderId,
        handler: async function (response: any) {
          // 3. Handle Success & Payment Verification
          alert(`Payment Successful! Payment ID: ${response.razorpay_payment_id}`);
          
          // Note: You must send response.razorpay_payment_id, response.razorpay_order_id, 
          // and response.razorpay_signature back to your backend to verify the signature.
          console.log("Success Payload:", response);
        },
        prefill: {
          name: "Architect User", // You can pull real user data here if available
          email: "architect@example.com",
        },
        theme: {
          color: "#EAB308", // Matches the yellow accent you are using
        },
      };

      // 4. Open the Razorpay Modal
      if ((window as any).Razorpay) {
        const rzp = new (window as any).Razorpay(options);
        rzp.on('payment.failed', function (response: any) {
          alert(`Payment Failed: ${response.error.description}`);
        });
        rzp.open();
      } else {
        alert("Payment gateway failed to load. Please check your internet connection.");
      }
    } catch (error: any) {
      console.error("Checkout error:", error);
      alert(error.message || "An error occurred while initializing checkout.");
    } finally {
      setIsProcessing(false);
    }
  };

  if (plans.length === 0) {
    return (
      <div className="text-center py-12 border border-zinc-200 dark:border-neutral-800 rounded-xl bg-zinc-50 dark:bg-neutral-950">
        <p className="text-zinc-500 dark:text-neutral-500">No active plans found for this role at the moment.</p>
      </div>
    );
  }

  const selectedPlanDetails = plans.find(p => p._id === selectedPlanId);

  return (
    <div className="flex flex-col items-center">
      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto items-stretch w-full mb-10">
        {plans.map((plan) => (
          <PlanCard
            key={plan._id}
            plan={plan}
            isSelected={selectedPlanId === plan._id}
            onSelect={() => setSelectedPlanId(plan._id)}
          />
        ))}
      </div>

      {/* Checkout Button */}
      {selectedPlanId && (
        <div className="w-full max-w-sm mt-8">
          <button
            onClick={handlePurchase}
            disabled={isProcessing}
            className="w-full py-4 px-6 bg-[#EAB308] hover:bg-yellow-500 text-black font-bold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-yellow-500/20 active:scale-[0.98]"
          >
            {isProcessing ? 'Initializing Secure Checkout...' : 'Proceed to Payment'}
          </button>
        </div>
      )}
    </div>
  );
}