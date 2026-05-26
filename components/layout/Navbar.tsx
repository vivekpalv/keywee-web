'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";

// Define the interface mapping the decoded payload from your jwt.io screenshot
interface DecodedToken {
  id: string;
  roles: string[];
  iat: number;
  exp: number;
}

export default function Navbar() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [userRoles, setUserRoles] = useState<string[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setMounted(true);
    const token = localStorage.getItem("token");
    
    if (token) {
      setIsLoggedIn(true);
      try {
        // Decode the token to inspect runtime permissions natively
        const decoded = jwtDecode<DecodedToken>(token);
        if (decoded && decoded.roles) {
          setUserRoles(decoded.roles);
        }
      } catch (error) {
        console.error("Malformed authentication token detected:", error);
        // Fallback safety cleanup if token is completely unreadable
        localStorage.removeItem("token");
        setIsLoggedIn(false);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setUserRoles([]);
    router.push("/");
    router.refresh();
  };

  return (
    <nav className="relative z-10 w-full py-6">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
        
        {/* Logo Elements */}
        <Link href="/" className="text-2xl font-extrabold tracking-tight">
          <span className="text-black">Key</span>
          <span className="text-[#EAB308]">wee</span>
        </Link>

        {/* Global Nav Targets */}
        <div className="hidden gap-8 md:flex items-center text-sm font-semibold">
          <Link href="/" className="text-[#EAB308]">Home</Link>
          <Link href="#architects" className="text-zinc-800 hover:text-black transition-colors">About Us</Link>
          <Link href="#design-ideas" className="text-zinc-800 hover:text-black transition-colors">Contact Us</Link>
          <Link href="#design-ideas" className="text-zinc-800 hover:text-black transition-colors">Blogs</Link>
        </div>

        {/* Dynamic Context CTA Actions */}
        <div className="flex items-center gap-4">
          {mounted && (
            <>
              {/* BRAND NEW USER: No active token session */}
              {!isLoggedIn && (
                <Link 
                  href="/become-architect" 
                  className="rounded-lg border border-zinc-300 bg-white px-5 py-2.5 text-xs font-bold text-black transition-colors hover:bg-zinc-50 shadow-sm"
                >
                  Join as Architect
                </Link>
              )}

              {/* REGISTERED CLIENT: Logged in but missing the professional authorization role */}
              {isLoggedIn && !userRoles.includes("ARCHITECT") && (
                <Link 
                  href="/become-architect" 
                  className="rounded-lg border border-zinc-300 bg-white px-5 py-2.5 text-xs font-bold text-black transition-colors hover:bg-zinc-50 shadow-sm animate-pulse"
                >
                  Become Architect
                </Link>
              )}

              {/* FULL ARCHITECT: Account profile possesses elevated structural configurations */}
              {isLoggedIn && userRoles.includes("ARCHITECT") && (
                <Link 
                  href="/dashboard" 
                  className="rounded-lg border border-[#EAB308] bg-[#FFF9E6] px-5 py-2.5 text-xs font-bold text-[#D97706] transition-colors hover:bg-yellow-100 shadow-sm"
                >
                  Visit Architect Profile
                </Link>
              )}

              {/* Authentication Access State Action buttons */}
              {isLoggedIn ? (
                <button 
                  onClick={handleLogout}
                  className="rounded-lg bg-black px-5 py-2.5 text-xs font-bold text-white transition-colors hover:bg-zinc-800 shadow-sm"
                >
                  Logout
                </button>
              ) : (
                <Link 
                  href="/login" 
                  className="rounded-lg bg-[#EAB308] px-5 py-2.5 text-xs font-bold text-white transition-colors hover:bg-yellow-600 shadow-sm"
                >
                  Login / Sign up
                </Link>
              )}
            </>
          )}
        </div>
        
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white" aria-hidden />
    </nav>
  );
}