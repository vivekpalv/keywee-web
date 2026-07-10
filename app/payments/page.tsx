// app/payments/page.tsx
"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'; // Assuming you still have this
import { fetchUserPayments, PaymentRecord } from '@/services/payment.service';

export default function PaymentsPage() {
  const [payments, setPayments] = useState<PaymentRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadPayments = async () => {
      try {
        const data = await fetchUserPayments();
        // Sort payments by date descending (newest first)
        const sortedData = data.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        setPayments(sortedData);
      } catch (err: any) {
        console.error("Error loading payments:", err);
        setError(err.message || "Unable to load payment history.");
      } finally {
        setLoading(false);
      }
    };

    loadPayments();
  }, []);

  // Format currency helper
  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: currency || 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Format date helper
  const formatDate = (isoString: string) => {
    return new Date(isoString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FBFAF7] dark:bg-[#0A0A0A] gap-3 transition-colors duration-300">
        <LoadingSpinner className="w-6 h-6 text-zinc-900 dark:text-zinc-100" />
        <span className="font-bold text-zinc-900 dark:text-zinc-100">Loading Payment History...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FBFAF7] dark:bg-[#0A0A0A] text-zinc-900 dark:text-zinc-100 font-sans py-6 sm:py-12 px-4 sm:px-6 transition-colors duration-300">
      <div className="mx-auto max-w-5xl">
        
        {/* Header Area */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-zinc-200 dark:border-zinc-800 pb-6 mb-8 gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Billing & Payments
            </h1>
            <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400 mt-1">
              Review your transaction history and active subscriptions.
            </p>
          </div>
          <Link 
            href="/dashboard" 
            className="flex items-center justify-center px-4 py-2.5 rounded-lg text-xs font-bold border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-700 shadow-sm transition-colors"
          >
            &larr; Back to Dashboard
          </Link>
        </div>

        {error && (
          <div className="mb-8 rounded-xl bg-red-50 dark:bg-red-950/30 p-4 text-sm font-medium text-red-600 dark:text-red-400 border border-red-100 dark:border-red-900/50">
            {error}
          </div>
        )}

        {/* Payments Table/List */}
        <div className="bg-white dark:bg-[#111111] rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden">
          {payments.length === 0 ? (
            <div className="p-12 text-center flex flex-col items-center">
              <span className="text-4xl mb-4 opacity-50">🧾</span>
              <h3 className="text-lg font-bold mb-2">No payment history</h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-sm">
                You haven't made any transactions yet. Your payment records will appear here once you subscribe to a plan.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-zinc-50 dark:bg-zinc-900/50 border-b border-zinc-200 dark:border-zinc-800">
                    <th className="p-4 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Date</th>
                    <th className="p-4 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Plan Details</th>
                    <th className="p-4 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Amount</th>
                    <th className="p-4 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Status</th>
                    <th className="p-4 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Transaction ID</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800/50">
                  {payments.map((payment) => (
                    <tr key={payment._id} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-800/20 transition-colors">
                      <td className="p-4 text-sm font-medium whitespace-nowrap">
                        {formatDate(payment.createdAt)}
                      </td>
                      <td className="p-4">
                        <div className="text-sm font-bold">{payment.plan?.title || 'Unknown Plan'}</div>
                        <div className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                          {payment.plan?.days} Days • {payment.plan?.role}
                        </div>
                      </td>
                      <td className="p-4 text-sm font-bold whitespace-nowrap">
                        {formatCurrency(payment.amount, payment.currency)}
                      </td>
                      <td className="p-4 whitespace-nowrap">
                        {payment.status === 'success' ? (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wide uppercase bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 ring-1 ring-green-600/20">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-600 dark:bg-green-400"></span>
                            Success
                          </span>
                        ) : payment.status === 'pending' ? (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wide uppercase bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-500 ring-1 ring-yellow-600/20">
                            <span className="w-1.5 h-1.5 rounded-full bg-yellow-500"></span>
                            Pending
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wide uppercase bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 ring-1 ring-red-600/20">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-600 dark:bg-red-400"></span>
                            Failed
                          </span>
                        )}
                      </td>
                      <td className="p-4 text-xs font-mono text-zinc-500 dark:text-zinc-400 whitespace-nowrap">
                        {payment.razorpayPaymentId || payment.razorpayOrderId || 'N/A'}
                        {payment.paymentMethod && (
                          <div className="text-[10px] uppercase font-sans mt-1">
                            via {payment.paymentMethod}
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}