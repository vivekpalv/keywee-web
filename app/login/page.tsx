'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const API_BASE_URL = "https://backend.keywee.in/api/v1";

export default function Login() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2>(1);
  const [isExisting, setIsExisting] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Form States
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");

  // Registration Data mapping exactly to /register-architect payload
  const [regData, setRegData] = useState({
    name: "",
    gender: "MALE", // Default value
    contact: "",
    email: "",
    firmName: "",
    bio: "",
    experience: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setRegData({ ...regData, [e.target.name]: e.target.value });
  };

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE_URL}/auth/sendOtp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobile: Number(mobile) }),
      });

      const data = await res.json();

      if (data.success || data.message === "OTP sent successfully") {
        setIsExisting(data.existing);
        setStep(2);
      } else {
        setError(data.message || "Failed to send OTP.");
      }
    } catch (err) {
      setError("Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      let res;

      if (isExisting) {
        // --- LOGIN EXISTING USER ---
        res = await fetch(`${API_BASE_URL}/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            mobile: Number(mobile),
            otp: Number(otp)
          }),
        });
      } else {
        // --- REGISTER NEW ARCHITECT ---
        res = await fetch(`${API_BASE_URL}/auth/register-architect`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: regData.name,
            mobile: Number(mobile),
            otp: Number(otp),
            gender: regData.gender,
            contact: regData.contact,
            email: regData.email,
            firmName: regData.firmName,
            bio: regData.bio,
            experience: Number(regData.experience)
          }),
        });
      }

      const data = await res.json();

      if (data.success || data.token) {
        if (data.token) localStorage.setItem("token", data.token);
        router.push("/");
        router.refresh();
      } else {
        setError(data.message || (isExisting ? "Invalid OTP or login failed." : "Registration failed."));
      }
    } catch (err) {
      setError("Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#FBFAF7] dark:bg-[#0A0A0A] px-4 py-12 font-sans sm:px-6 transition-colors duration-300">
      <div className={`w-full rounded-[2rem] border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-black p-6 sm:p-10 shadow-sm transition-all duration-300 ${!isExisting && step === 2 ? 'max-w-3xl' : 'max-w-md'}`}>

        <div className="mb-8 text-center">
          <Link href="/" className="text-2xl font-extrabold tracking-tight">
            <span className="text-black dark:text-white">Key</span>
            <span className="text-[#EAB308]">wee</span>
          </Link>
          <h1 className="mt-6 text-2xl font-bold text-black dark:text-white">
            {step === 1 ? "Join as Architect" : (isExisting ? "Welcome Back" : "Architect Profile Setup")}
          </h1>
          <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
            {step === 1 ? "Enter your mobile number to get started" : "Enter the verification code to continue"}
          </p>
        </div>

        {error && (
          <div className="mb-6 rounded-lg bg-red-50 dark:bg-red-950/30 p-3 text-center text-sm font-medium text-red-600 dark:text-red-400 border border-red-100 dark:border-red-900/50">
            {error}
          </div>
        )}

        {step === 1 ? (
          <form onSubmit={handleSendOtp} className="flex flex-col gap-5">
            <div>
              <label className="mb-2 block text-sm font-semibold text-black dark:text-white">Mobile Number</label>
              <div className="flex shadow-sm rounded-lg border border-zinc-300 dark:border-zinc-700 overflow-hidden focus-within:border-[#EAB308] focus-within:ring-1 focus-within:ring-[#EAB308] transition-colors bg-transparent">
                <span className="flex items-center justify-center bg-zinc-50 dark:bg-zinc-900 px-4 text-sm font-semibold text-zinc-600 dark:text-zinc-400 border-r border-zinc-300 dark:border-zinc-700">
                  +91
                </span>
                <input
                  type="tel"
                  required
                  maxLength={10}
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value.replace(/\D/g, ''))}
                  placeholder="Enter 10-digit number"
                  className="w-full px-4 py-3 text-sm outline-none bg-transparent text-black dark:text-white placeholder-zinc-400 dark:placeholder-zinc-600"
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={loading || mobile.length !== 10}
              className="mt-2 rounded-lg bg-black dark:bg-white py-3.5 text-sm font-bold text-white dark:text-black transition-colors hover:bg-zinc-800 dark:hover:bg-zinc-200 disabled:opacity-50"
            >
              {loading ? "Sending..." : "Send OTP"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleAuthSubmit} className="flex flex-col gap-5">

            {/* OTP Field */}
            <div className={`${!isExisting ? "mb-4 border-b border-zinc-100 dark:border-zinc-800 pb-6" : ""}`}>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-semibold text-black dark:text-white">Enter OTP</label>
                <button type="button" onClick={() => setStep(1)} className="text-[#EAB308] hover:underline text-xs font-semibold">Change Number</button>
              </div>
              <input
                type="text"
                required
                maxLength={4}
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                placeholder="4-digit code"
                className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent px-4 py-3 text-sm tracking-widest text-black dark:text-white placeholder-zinc-400 dark:placeholder-zinc-600 outline-none transition-colors focus:border-[#EAB308] focus:ring-1 focus:ring-[#EAB308] max-w-xs"
              />
              <p className="mt-2 text-xs font-medium text-zinc-500 dark:text-zinc-400">Sent to +91 {mobile}</p>
            </div>

            {/* Registration Fields */}
            {!isExisting && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-black dark:text-white">Full Name</label>
                  <input type="text" name="name" required value={regData.name} onChange={handleInputChange} placeholder="John Doe" className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent px-4 py-2.5 text-sm text-black dark:text-white placeholder-zinc-400 dark:placeholder-zinc-600 outline-none focus:border-[#EAB308] focus:ring-1 focus:ring-[#EAB308]" />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-black dark:text-white">Email Address</label>
                  <input type="email" name="email" required value={regData.email} onChange={handleInputChange} placeholder="john@example.com" className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent px-4 py-2.5 text-sm text-black dark:text-white placeholder-zinc-400 dark:placeholder-zinc-600 outline-none focus:border-[#EAB308] focus:ring-1 focus:ring-[#EAB308]" />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-black dark:text-white">Alternative Contact</label>
                  <input type="tel" name="contact" required maxLength={10} value={regData.contact} onChange={(e) => setRegData({ ...regData, contact: e.target.value.replace(/\D/g, '') })} placeholder="10-digit number" className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent px-4 py-2.5 text-sm text-black dark:text-white placeholder-zinc-400 dark:placeholder-zinc-600 outline-none focus:border-[#EAB308] focus:ring-1 focus:ring-[#EAB308]" />
                </div>

                <div>
                  <label htmlFor="gender-select" className="mb-2 block text-sm font-semibold text-black dark:text-white">Gender</label>
                  <select
                    id="gender-select"
                    name="gender"
                    required
                    value={regData.gender}
                    onChange={handleInputChange}
                    className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-4 py-2.5 text-sm text-black dark:text-white outline-none focus:border-[#EAB308] focus:ring-1 focus:ring-[#EAB308]"
                  >
                    <option value="MALE">Male</option>
                    <option value="FEMALE">Female</option>
                    <option value="OTHER">Other</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-black dark:text-white">Firm Name</label>
                  <input type="text" name="firmName" required value={regData.firmName} onChange={handleInputChange} placeholder="Doe & Associates Design" className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent px-4 py-2.5 text-sm text-black dark:text-white placeholder-zinc-400 dark:placeholder-zinc-600 outline-none focus:border-[#EAB308] focus:ring-1 focus:ring-[#EAB308]" />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-black dark:text-white">Years of Experience</label>
                  <input type="number" name="experience" required min="0" value={regData.experience} onChange={handleInputChange} placeholder="e.g. 8" className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent px-4 py-2.5 text-sm text-black dark:text-white placeholder-zinc-400 dark:placeholder-zinc-600 outline-none focus:border-[#EAB308] focus:ring-1 focus:ring-[#EAB308]" />
                </div>

                <div className="sm:col-span-2">
                  <label className="mb-2 block text-sm font-semibold text-black dark:text-white">Professional Bio</label>
                  <textarea name="bio" required rows={3} value={regData.bio} onChange={handleInputChange} placeholder="Tell us about your specialization and past work..." className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent px-4 py-3 text-sm text-black dark:text-white placeholder-zinc-400 dark:placeholder-zinc-600 outline-none focus:border-[#EAB308] focus:ring-1 focus:ring-[#EAB308] resize-none" />
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={loading || otp.length < 4}
              className="mt-4 w-full rounded-lg bg-[#EAB308] hover:bg-yellow-600 py-3.5 text-sm font-bold text-white transition-colors disabled:opacity-50"
            >
              {loading ? "Processing..." : (isExisting ? "Secure Login" : "Register Profile")}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}