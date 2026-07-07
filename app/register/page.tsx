'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const API_BASE_URL = "https://backend.keywee.in/api/v1";

export default function Register() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2>(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [gender, setGender] = useState("MALE");

  const handleMobileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    setMobile(value);
  };

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    setOtp(value);
  };

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE_URL}/auth/sendOtp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobile: Number(mobile), type: "REGISTER" }),
      });

      const data = await res.json();

      if (data.success) {
        setStep(2);
      } else {
        setError(data.message || "Failed to send OTP. Number might already be registered.");
      }
    } catch (err) {
      setError("Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          name, 
          mobile: Number(mobile), 
          otp: Number(otp),
          gender 
        }),
      });

      const data = await res.json();

      if (data.success) {
        if (data.token) {
          localStorage.setItem("token", data.token);
        }
        // --- ROUTE TO SKIPPABLE PLANS PAGE ON NEW REGISTRATION ---
        router.push("/plans?skippable=true");
      } else {
        setError(data.message || "Registration failed. Invalid OTP.");
      }
    } catch (err) {
      setError("Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#FBFAF7] px-6 font-sans">
      <div className="w-full max-w-md rounded-4xl border border-zinc-200 bg-white p-10 shadow-sm">
        
        <div className="mb-8 text-center">
          <Link href="/" className="text-2xl font-extrabold tracking-tight">
            <span className="text-black">Key</span>
            <span className="text-[#EAB308]">wee</span>
          </Link>
          <h1 className="mt-6 text-2xl font-bold text-black">Create an account</h1>
          <p className="mt-2 text-sm text-zinc-500">Join as a homeowner or client</p>
        </div>

        {error && (
          <div className="mb-6 rounded-lg bg-red-50 p-3 text-center text-sm font-medium text-red-600">
            {error}
          </div>
        )}

        {step === 1 ? (
          <form onSubmit={handleSendOtp} className="flex flex-col gap-4">
            <div>
              <label htmlFor="reg-name" className="mb-2 block text-sm font-semibold text-black">
                Full Name
              </label>
              <input 
                type="text" 
                id="reg-name"
                required 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                placeholder="John Doe" 
                className="w-full rounded-lg border border-zinc-300 px-4 py-3 text-sm outline-none focus:border-[#EAB308] focus:ring-1 focus:ring-[#EAB308]" 
              />
            </div>
            
            <div>
              <label htmlFor="reg-gender" className="mb-2 block text-sm font-semibold text-black">
                Gender
              </label>
              <select 
                id="reg-gender"
                value={gender} 
                onChange={(e) => setGender(e.target.value)} 
                className="w-full rounded-lg border border-zinc-300 px-4 py-3 text-sm outline-none focus:border-[#EAB308] focus:ring-1 focus:ring-[#EAB308] bg-white"
              >
                <option value="MALE">Male</option>
                <option value="FEMALE">Female</option>
                <option value="OTHER">Other</option>
              </select>
            </div>

            <div>
              <label htmlFor="reg-mobile" className="mb-2 block text-sm font-semibold text-black">
                Mobile Number
              </label>
              <input 
                type="tel" 
                id="reg-mobile"
                required 
                maxLength={10} 
                value={mobile} 
                onChange={handleMobileChange} 
                placeholder="Enter 10-digit number" 
                className="w-full rounded-lg border border-zinc-300 px-4 py-3 text-sm outline-none focus:border-[#EAB308] focus:ring-1 focus:ring-[#EAB308]" 
              />
            </div>

            <button 
              type="submit" 
              disabled={loading || mobile.length !== 10 || name.trim() === ""} 
              className="mt-4 rounded-lg bg-[#EAB308] py-3.5 text-sm font-bold text-white hover:bg-yellow-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Sending..." : "Send OTP"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleRegister} className="flex flex-col gap-5">
            <div>
              <label htmlFor="reg-otp" className="mb-2 block text-sm font-semibold text-black">
                Enter OTP
              </label>
              <input 
                type="text" 
                id="reg-otp"
                required 
                maxLength={4} 
                value={otp} 
                onChange={handleOtpChange} 
                placeholder="4-digit code" 
                className="w-full rounded-lg border border-zinc-300 px-4 py-3 text-sm tracking-widest outline-none focus:border-[#EAB308] focus:ring-1 focus:ring-[#EAB308]" 
              />
              <p className="mt-2 text-right text-xs font-medium text-zinc-500">
                Sent to +91 {mobile}.{" "}
                <button 
                  type="button" 
                  onClick={() => setStep(1)} 
                  className="text-[#EAB308] hover:underline font-semibold"
                >
                  Change
                </button>
              </p>
            </div>
            <button 
              type="submit" 
              disabled={loading || otp.length < 4} 
              className="mt-2 rounded-lg bg-black py-3.5 text-sm font-bold text-white hover:bg-zinc-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Creating account..." : "Create Account"}
            </button>
          </form>
        )}

        <div className="mt-8 text-center text-sm font-medium text-zinc-600">
          <p>
            Already have an account?{" "}
            <Link href="/login" className="text-[#EAB308] hover:underline font-semibold">
              Log in
            </Link>
          </p>
          <div className="mt-4 border-t border-zinc-200 pt-4">
            <Link href="/become-architect" className="text-zinc-500 hover:text-black hover:underline text-xs tracking-tight block">
              Are you an architect? Register here &rarr;
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}