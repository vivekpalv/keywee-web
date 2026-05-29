'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const API_BASE_URL = "https://backend.keywee.in/api/v1";

export default function BecomeArchitect() {
  const router = useRouter();
  const [hasToken, setHasToken] = useState(false);
  const [step, setStep] = useState<1 | 2>(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [mounted, setMounted] = useState(false);

  // Form Field States
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("MALE");
  const [contact, setContact] = useState("");
  const [firmName, setFirmName] = useState("");
  const [experience, setExperience] = useState("");
  const [bio, setBio] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");

  // Determine flow type on mount based on client token existence
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setHasToken(true);
      setStep(2); // Skip OTP phase entirely if user context is verified
    }
    setMounted(true);
  }, []);

  const handleMobileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMobile(e.target.value.replace(/\D/g, ""));
  };

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOtp(e.target.value.replace(/\D/g, ""));
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
        setContact(mobile); // Pre-fill communication line fallback
      } else {
        setError(data.message || "Failed to route verification handshake.");
      }
    } catch (err) {
      setError("Network transactional error. Please check your setup.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const token = localStorage.getItem("token");

    try {
      if (hasToken && token) {
        // FLOW A: Existing Client Upgrading Later 
        const res = await fetch(`${API_BASE_URL}/user/become-architect`, {
          method: "POST",
          headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify({
            contact,
            email,
            firmName,
            bio,
            experience: Number(experience),
            city,
            state
          }),
        });

        const data = await res.json();
        if (data.success) {
          if (data.token) localStorage.setItem("token", data.token); // Overwrite old client token with structural dual-role token
          router.push("/");
          router.refresh();
        } else {
          setError(data.message || "Upgrade execution failed.");
        }

      } else {
        // FLOW B: Cold Pipeline Initial Sign-up directly as Architect
        const res = await fetch(`${API_BASE_URL}/auth/register-architect`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name,
            mobile: Number(mobile),
            otp: Number(otp),
            gender,
            contact,
            email,
            firmName,
            bio,
            experience: Number(experience),
            city,
            state
          }),
        });

        const data = await res.json();
        if (data.success) {
          if (data.token) localStorage.setItem("token", data.token);
          router.push("/");
          router.refresh();
        } else {
          setError(data.message || "Registration sequence rejected.");
        }
      }
    } catch (err) {
      setError("Server execution error. Unable to persist professional profile.");
    } finally {
      setLoading(false);
    }
  };

  if (!mounted) return null;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#FBFAF7] px-4 py-12 font-sans">
      <div className="w-full max-w-2xl rounded-[2rem] border border-zinc-200 bg-white p-8 shadow-sm sm:p-10">
        
        {/* Brand Header */}
        <div className="mb-8 text-center">
          <Link href="/" className="text-2xl font-extrabold tracking-tight">
            <span className="text-black">Key</span>
            <span className="text-[#EAB308]">wee</span>
          </Link>
          <h1 className="mt-6 text-2xl font-bold text-black sm:text-3xl">
            {hasToken ? "Upgrade to Architect Account" : "Join as an Architect"}
          </h1>
          <p className="mt-2 text-sm text-zinc-500">
            {hasToken 
              ? "Complete your business specifications to instantly unlocked architecture capabilities." 
              : "Register your professional workspace and publish portfolios straight to clients."}
          </p>
        </div>

        {/* Dynamic Alert Banner */}
        {error && (
          <div className="mb-6 rounded-lg bg-red-50 p-3 text-center text-sm font-medium text-red-600">
            {error}
          </div>
        )}

        {/* Flow Controller execution */}
        {step === 1 ? (
          <form onSubmit={handleSendOtp} className="mx-auto max-w-sm flex flex-col gap-4">
            <div>
              <label htmlFor="arch-init-mobile" className="mb-2 block text-sm font-semibold text-black">Mobile Number</label>
              <input
                type="tel"
                id="arch-init-mobile"
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
              disabled={loading || mobile.length !== 10}
              className="mt-4 rounded-lg bg-[#EAB308] py-3.5 text-sm font-bold text-white hover:bg-yellow-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Sending..." : "Verify Identity via OTP"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            
            {/* Display validation container only for completely unauthenticated cold runs */}
            {!hasToken && (
              <div className="rounded-xl bg-[#FFF9E6] p-5 border border-yellow-100">
                <label htmlFor="arch-verify-challenge" className="mb-2 block text-sm font-bold text-black">Enter Verification OTP</label>
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <input
                    type="text"
                    id="arch-verify-challenge"
                    required
                    maxLength={4}
                    value={otp}
                    onChange={handleOtpChange}
                    placeholder="4-digit code"
                    className="w-full sm:w-1/2 rounded-lg border border-zinc-300 px-4 py-3 text-sm tracking-widest outline-none focus:border-[#EAB308] focus:ring-1 focus:ring-[#EAB308] bg-white"
                  />
                  <p className="text-xs font-medium text-zinc-500">
                    Sent to +91 {mobile}. <button type="button" onClick={() => setStep(1)} className="text-[#EAB308] hover:underline font-semibold">Change</button>
                  </p>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {!hasToken && (
                <>
                  <div>
                    <label htmlFor="arch-prof-name" className="mb-2 block text-sm font-semibold text-black">Full Name</label>
                    <input type="text" id="arch-prof-name" required value={name} onChange={(e) => setName(e.target.value)} placeholder="Ar. John Doe" className="w-full rounded-lg border border-zinc-300 px-4 py-3 text-sm outline-none focus:border-[#EAB308] focus:ring-1 focus:ring-[#EAB308]" />
                  </div>
                  <div>
                    <label htmlFor="arch-prof-gender" className="mb-2 block text-sm font-semibold text-black">Gender</label>
                    <select id="arch-prof-gender" value={gender} onChange={(e) => setGender(e.target.value)} className="w-full rounded-lg border border-zinc-300 px-4 py-3 text-sm outline-none focus:border-[#EAB308] focus:ring-1 focus:ring-[#EAB308] bg-white">
                      <option value="MALE">Male</option>
                      <option value="FEMALE">Female</option>
                      <option value="OTHER">Other</option>
                    </select>
                  </div>
                </>
              )}

              <div>
                <label htmlFor="arch-prof-email" className="mb-2 block text-sm font-semibold text-black">Email Address</label>
                <input type="email" id="arch-prof-email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="john@studio.com" className="w-full rounded-lg border border-zinc-300 px-4 py-3 text-sm outline-none focus:border-[#EAB308] focus:ring-1 focus:ring-[#EAB308]" />
              </div>

              <div>
                <label htmlFor="arch-prof-firm" className="mb-2 block text-sm font-semibold text-black">Firm Name</label>
                <input type="text" id="arch-prof-firm" required value={firmName} onChange={(e) => setFirmName(e.target.value)} placeholder="Doe & Associates" className="w-full rounded-lg border border-zinc-300 px-4 py-3 text-sm outline-none focus:border-[#EAB308] focus:ring-1 focus:ring-[#EAB308]" />
              </div>

              <div>
                <label htmlFor="arch-prof-exp" className="mb-2 block text-sm font-semibold text-black">Years of Experience</label>
                <input type="number" id="arch-prof-exp" required min="0" value={experience} onChange={(e) => setExperience(e.target.value)} placeholder="e.g. 8" className="w-full rounded-lg border border-zinc-300 px-4 py-3 text-sm outline-none focus:border-[#EAB308] focus:ring-1 focus:ring-[#EAB308]" />
              </div>

              <div>
                <label htmlFor="arch-prof-contact" className="mb-2 block text-sm font-semibold text-black">Office Contact Number</label>
                <input type="tel" id="arch-prof-contact" required value={contact} onChange={(e) => setContact(e.target.value.replace(/\D/g, ""))} placeholder="Office or Alternative connection" className="w-full rounded-lg border border-zinc-300 px-4 py-3 text-sm outline-none focus:border-[#EAB308] focus:ring-1 focus:ring-[#EAB308]" />
              </div>

              <div>
                <label htmlFor="arch-prof-city" className="mb-2 block text-sm font-semibold text-black">City</label>
                <input type="text" id="arch-prof-city" required value={city} onChange={(e) => setCity(e.target.value)} placeholder="e.g. Gurugram" className="w-full rounded-lg border border-zinc-300 px-4 py-3 text-sm outline-none focus:border-[#EAB308] focus:ring-1 focus:ring-[#EAB308]" />
              </div>

              <div>
                <label htmlFor="arch-prof-state" className="mb-2 block text-sm font-semibold text-black">State</label>
                <input type="text" id="arch-prof-state" required value={state} onChange={(e) => setState(e.target.value)} placeholder="e.g. Haryana" className="w-full rounded-lg border border-zinc-300 px-4 py-3 text-sm outline-none focus:border-[#EAB308] focus:ring-1 focus:ring-[#EAB308]" />
              </div>
            </div>

            <div>
              <label htmlFor="arch-prof-bio" className="mb-2 block text-sm font-semibold text-black">Professional Bio</label>
              <textarea 
                id="arch-prof-bio"
                required 
                rows={3} 
                value={bio} 
                onChange={(e) => setBio(e.target.value)} 
                placeholder="Describe your architectural methodologies, focus styles, and vision statements..." 
                className="w-full rounded-lg border border-zinc-300 px-4 py-3 text-sm outline-none focus:border-[#EAB308] focus:ring-1 focus:ring-[#EAB308] resize-none" 
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-4 w-full rounded-lg bg-black py-4 text-sm font-bold text-white transition-colors hover:bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
            >
              {loading ? "Processing Profile Context..." : hasToken ? "Upgrade to Architect Profile" : "Complete Registration"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}