'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const API_BASE_URL = "https://backend.keywee.in/api/v1";

export default function Login() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2>(1);
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE_URL}/auth/sendOtp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobile: Number(mobile), type: "LOGIN" }),
      });

      const data = await res.json();

      if (data.success) {
        setStep(2);
      } else {
        setError(data.message || "Failed to send OTP. User might not exist.");
      }
    } catch (err) {
      setError("Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobile: Number(mobile), otp: Number(otp) }),
      });

      const data = await res.json();

      if (data.success) {
        // Save token to localStorage for subsequent API requests
        localStorage.setItem("token", data.token);
        // Redirect to homepage or dashboard
        router.push("/");
      } else {
        setError(data.message || "Invalid OTP.");
      }
    } catch (err) {
      setError("Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#FBFAF7] px-6 font-sans">
      <div className="w-full max-w-md rounded-[2rem] border border-zinc-200 bg-white p-10 shadow-sm">
        <div className="mb-8 text-center">
          <Link href="/" className="text-2xl font-extrabold tracking-tight">
            <span className="text-black">Key</span>
            <span className="text-[#EAB308]">wee</span>
          </Link>
          <h1 className="mt-6 text-2xl font-bold text-black">Welcome back</h1>
          <p className="mt-2 text-sm text-zinc-500">Log in to your account</p>
        </div>

        {error && (
          <div className="mb-6 rounded-lg bg-red-50 p-3 text-center text-sm font-medium text-red-600">
            {error}
          </div>
        )}

        {step === 1 ? (
          <form onSubmit={handleSendOtp} className="flex flex-col gap-5">
            <div>
              <label className="mb-2 block text-sm font-semibold text-black">Mobile Number</label>
              <input
                type="tel"
                required
                maxLength={10}
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                placeholder="Enter 10-digit number"
                className="w-full rounded-lg border border-zinc-300 px-4 py-3 text-sm outline-none transition-colors focus:border-[#EAB308] focus:ring-1 focus:ring-[#EAB308]"
              />
            </div>
            <button
              type="submit"
              disabled={loading || mobile.length !== 10}
              className="mt-2 rounded-lg bg-[#EAB308] py-3.5 text-sm font-bold text-white transition-colors hover:bg-yellow-600 disabled:opacity-50"
            >
              {loading ? "Sending..." : "Send OTP"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleLogin} className="flex flex-col gap-5">
            <div>
              <label className="mb-2 block text-sm font-semibold text-black">Enter OTP</label>
              <input
                type="text"
                required
                maxLength={4}
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="4-digit code"
                className="w-full rounded-lg border border-zinc-300 px-4 py-3 text-sm tracking-widest outline-none transition-colors focus:border-[#EAB308] focus:ring-1 focus:ring-[#EAB308]"
              />
              <p className="mt-2 text-right text-xs font-medium text-zinc-500">
                Sent to +91 {mobile}. <button type="button" onClick={() => setStep(1)} className="text-[#EAB308] hover:underline">Change</button>
              </p>
            </div>
            <button
              type="submit"
              disabled={loading || otp.length < 4}
              className="mt-2 rounded-lg bg-black py-3.5 text-sm font-bold text-white transition-colors hover:bg-zinc-800 disabled:opacity-50"
            >
              {loading ? "Verifying..." : "Login"}
            </button>
          </form>
        )}

        <p className="mt-8 text-center text-sm font-medium text-zinc-600">
          Don't have an account?{" "}
          <Link href="/register" className="text-[#EAB308] hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}