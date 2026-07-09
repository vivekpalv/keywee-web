"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { fetchUserPayments } from "@/services/payment.service";
import { BASE_URL } from "@/utils/api";

const API_BASE_URL = BASE_URL;

interface LocationSuggestion {
  place_id: number;
  display_name: string;
  lat: string;
  lon: string;
}

export default function Login() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2>(1);
  const [isExisting, setIsExisting] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Form States
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState<string[]>(["", "", "", ""]);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Location Autocomplete States
  const [suggestions, setSuggestions] = useState<LocationSuggestion[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [regData, setRegData] = useState({
    name: "",
    gender: "MALE",
    contact: "",
    email: "",
    firmName: "",
    bio: "",
    experience: "",
    address: "", // Changed from location to match your API updates
    lat: 0,
    long: 0,
    min: 1000000,
    max: 5000000
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setRegData({ ...regData, [e.target.name]: e.target.value });
  };

  // --- Location Autocomplete Logic ---
  const fetchLocationSuggestions = async (query: string) => {
    if (!query || query.length < 3) {
      setSuggestions([]);
      setIsSearching(false);
      return;
    }

    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=jsonv2&limit=5`
      );
      const data = await res.json();
      setSuggestions(data);
    } catch (err) {
      console.error("Failed to fetch locations", err);
    } finally {
      setIsSearching(false);
    }
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    // Reset lat/long if user edits the text field
    setRegData({ ...regData, address: value, lat: 0, long: 0 });
    setShowDropdown(true);
    setIsSearching(true);

    if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);

    searchTimeoutRef.current = setTimeout(() => {
      fetchLocationSuggestions(value);
    }, 500);
  };

  const selectLocation = (suggestion: LocationSuggestion) => {
    setRegData({
      ...regData,
      address: suggestion.display_name, // Saves full string to pass on update forms later
      lat: Number(suggestion.lat),
      long: Number(suggestion.lon)
    });
    setShowDropdown(false);
    setSuggestions([]);
  };

  useEffect(() => {
    const handleClickOutside = () => setShowDropdown(false);
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);
  // -----------------------------------

  // Budget Change Handlers
  const handleMinBudgetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setRegData({ ...regData, min: Math.min(value, regData.max - 1) });
  };

  const handleMaxBudgetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setRegData({ ...regData, max: Math.max(value, regData.min + 1) });
  };

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE_URL}auth/sendOtp`, {
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

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    if (value && index < 3) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text/plain").slice(0, 4).replace(/\D/g, "");
    if (pastedData) {
      const newOtp = [...otp];
      for (let i = 0; i < pastedData.length; i++) {
        newOtp[i] = pastedData[i];
      }
      setOtp(newOtp);
      const focusIndex = Math.min(pastedData.length, 3);
      otpRefs.current[focusIndex]?.focus();
    }
  };

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    if (!isExisting && (regData.lat === 0 || regData.long === 0)) {
      setError("Please select a valid address from the dropdown suggestions.");
      return;
    }

    setLoading(true);
    const otpValue = otp.join("");

    try {
      let res;

      if (isExisting) {
        res = await fetch(`${API_BASE_URL}auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ mobile: Number(mobile), otp: Number(otpValue) }),
        });
      } else {
        res = await fetch(`${API_BASE_URL}auth/register-architect`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: regData.name,
            mobile: Number(mobile),
            otp: Number(otpValue),
            gender: regData.gender,
            contact: regData.contact,
            email: regData.email,
            firmName: regData.firmName,
            bio: regData.bio,
            experience: Number(regData.experience),
            min: Number(regData.min),
            max: Number(regData.max),
            address: regData.address, // Now passing the full string along with lat/long
            lat: regData.lat,
            long: regData.long
          }),
        });
      }

      const data = await res.json();

      if (data.success || data.token) {
        if (data.token) localStorage.setItem("token", data.token);

        if (isExisting) {
          try {
            const payments = await fetchUserPayments();
            if (payments.length === 0) {
              router.push("/plans?skippable=true");
            } else {
              router.push("/");
            }
          } catch (err) {
            router.push("/");
          }
        } else {
          router.push("/plans?skippable=true");
        }
        
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
      <div className={`w-full rounded-4xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-black p-6 sm:p-10 shadow-sm transition-all duration-300 ${!isExisting && step === 2 ? 'max-w-3xl' : 'max-w-md'}`}>

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
            <div className={`flex flex-col items-center justify-center w-full ${!isExisting ? "mb-4 border-b border-zinc-100 dark:border-zinc-800 pb-6" : ""}`}>
              <div className="mb-4">
                <label className="text-sm font-semibold text-black dark:text-white">Enter OTP</label>
              </div>
              <div className="flex justify-center gap-3 w-full">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => { otpRefs.current[index] = el; }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    aria-label={`OTP digit ${index + 1}`}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(index, e)}
                    onPaste={handleOtpPaste}
                    className="w-12 h-12 sm:w-14 sm:h-14 text-center text-xl font-bold rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent text-black dark:text-white outline-none transition-all focus:border-[#EAB308] focus:ring-2 focus:ring-[#EAB308]/50"
                  />
                ))}
              </div>
              <div className="mt-4 flex flex-col items-center gap-2">
                <p className="text-center text-xs font-medium text-zinc-500 dark:text-zinc-400">
                  Sent to +91 {mobile}
                </p>
                <button type="button" onClick={() => { setStep(1); setOtp(["", "", "", ""]); }} className="text-[#EAB308] hover:underline text-xs font-semibold">
                  Change Number
                </button>
              </div>
            </div>

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
                  <select id="gender-select" name="gender" required value={regData.gender} onChange={handleInputChange} className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-4 py-2.5 text-sm text-black dark:text-white outline-none focus:border-[#EAB308] focus:ring-1 focus:ring-[#EAB308]">
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

                {/* --- Interactive Address Autocomplete --- */}
                <div className="sm:col-span-2 relative">
                  <label className="mb-2 block text-sm font-semibold text-black dark:text-white">Office Address</label>
                  <div onClick={(e) => e.stopPropagation()}>
                    <input 
                      type="text" 
                      name="address"
                      required 
                      value={regData.address} 
                      onChange={handleLocationChange}
                      onFocus={() => { if(regData.address) setShowDropdown(true) }}
                      placeholder="e.g. Cyber Hub, Gurugram" 
                      className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent px-4 py-2.5 text-sm text-black dark:text-white placeholder-zinc-400 dark:placeholder-zinc-600 outline-none focus:border-[#EAB308] focus:ring-1 focus:ring-[#EAB308]" 
                    />
                    
                    {/* Dropdown UI */}
                    {showDropdown && (regData.address.length >= 3) && (
                      <div className="absolute z-50 w-full mt-1 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                        {isSearching ? (
                          <div className="p-3 text-sm text-zinc-500 dark:text-zinc-400 text-center">Searching...</div>
                        ) : suggestions.length > 0 ? (
                          <ul className="py-1">
                            {suggestions.map((item) => (
                              <li 
                                key={item.place_id}
                                onClick={() => selectLocation(item)}
                                className="px-4 py-2.5 text-sm text-black dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer transition-colors border-b border-zinc-100 dark:border-zinc-800 last:border-0"
                              >
                                {item.display_name}
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <div className="p-3 text-sm text-zinc-500 dark:text-zinc-400 text-center">No locations found.</div>
                        )}
                      </div>
                    )}
                  </div>
                  <p className="mt-1 text-xs text-zinc-500">Select an address from the suggestions to capture coordinate data.</p>
                </div>

                {/* --- Interactive Dual Seek Bar --- */}
                <div className="sm:col-span-2 mt-2">
                  <div className="flex justify-between items-center mb-4">
                    <label className="text-sm font-semibold text-black dark:text-white">
                      Project Budget Range
                    </label>
                  </div>
                  
                  <div className="flex items-center gap-4 mb-5">
                    <div className="flex-1 flex items-center bg-transparent border border-zinc-300 dark:border-zinc-700 rounded-lg px-3 py-2 focus-within:border-[#EAB308] focus-within:ring-1 focus-within:ring-[#EAB308] transition-all">
                      <span className="text-zinc-500 font-semibold mr-1">₹</span>
                      <input 
                        type="number" 
                        name="min"
                        min="0"
                        value={regData.min} 
                        onChange={handleMinBudgetChange}
                        className="w-full bg-transparent text-sm font-bold text-black dark:text-white outline-none"
                      />
                    </div>
                    <span className="text-zinc-400 font-medium text-sm">to</span>
                    <div className="flex-1 flex items-center bg-transparent border border-zinc-300 dark:border-zinc-700 rounded-lg px-3 py-2 focus-within:border-[#EAB308] focus-within:ring-1 focus-within:ring-[#EAB308] transition-all">
                      <span className="text-zinc-500 font-semibold mr-1">₹</span>
                      <input 
                        type="number" 
                        name="max"
                        min={regData.min + 1}
                        value={regData.max} 
                        onChange={handleMaxBudgetChange}
                        className="w-full bg-transparent text-sm font-bold text-black dark:text-white outline-none"
                      />
                    </div>
                  </div>

                  <div className="relative h-2 w-full bg-zinc-200 dark:bg-zinc-800 rounded-full flex items-center mt-2">
                    <div
                      className="absolute h-2 bg-[#EAB308] rounded-full pointer-events-none transition-all duration-75"
                      style={{
                        left: `${Math.min(100, Math.max(0, (regData.min / 10000000) * 100))}%`,
                        right: `${100 - Math.min(100, Math.max(0, (regData.max / 10000000) * 100))}%`,
                      }}
                    ></div>
                    
                    <input
                      type="range"
                      min="0"
                      max="10000000"
                      step="100000"
                      value={Math.min(regData.min, 10000000)}
                      onChange={handleMinBudgetChange}
                      className="absolute w-full appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-[#EAB308] [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-shadow] z-20"
                    />
                    
                    <input
                      type="range"
                      min="0"
                      max="10000000"
                      step="100000"
                      value={Math.min(regData.max, 10000000)}
                      onChange={handleMaxBudgetChange}
                      className="absolute w-full appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-[#EAB308] [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-shadow] z-30"
                    />
                  </div>
                  
                  <div className="flex justify-between text-xs font-medium text-zinc-400 mt-3">
                    <span>₹0</span>
                    <span>₹1,00,00,000+</span>
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label className="mb-2 block text-sm font-semibold text-black dark:text-white">Professional Bio</label>
                  <textarea name="bio" required rows={3} value={regData.bio} onChange={handleInputChange} placeholder="Tell us about your specialization and past work..." className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent px-4 py-3 text-sm text-black dark:text-white placeholder-zinc-400 dark:placeholder-zinc-600 outline-none focus:border-[#EAB308] focus:ring-1 focus:ring-[#EAB308] resize-none" />
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={loading || otp.join("").length < 4}
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