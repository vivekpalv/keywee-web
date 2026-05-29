'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";

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
  
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    setMounted(true);
    const token = localStorage.getItem("token");
    
    if (token) {
      setIsLoggedIn(true);
      try {
        const decoded = jwtDecode<DecodedToken>(token);
        if (decoded && decoded.roles) {
          setUserRoles(decoded.roles);
        }
      } catch (error) {
        console.error("Malformed authentication token detected:", error);
        localStorage.removeItem("token");
        setIsLoggedIn(false);
      }
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setUserRoles([]);
    setIsMobileMenuOpen(false);
    router.push("/");
    router.refresh();
  };

  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
        isScrolled 
          ? "bg-[#FBFAF7]/90 backdrop-blur-md border-b border-zinc-200 py-3 sm:py-4 shadow-sm" 
          : "bg-transparent py-5 sm:py-6"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6">
        
        {/* Logo */}
        <Link href="/" className="text-2xl font-extrabold tracking-tight z-50 shrink-0">
          <span className="text-black">Key</span>
          <span className="text-[#EAB308]">wee</span>
        </Link>

        {/* Desktop Global Nav Targets */}
        <div className="hidden md:flex gap-8 items-center text-sm font-semibold absolute left-1/2 -translate-x-1/2">
          <Link href="/" className="text-[#EAB308]">Home</Link>
          <Link href="#about" className="text-zinc-800 hover:text-black transition-colors">About Us</Link>
          <Link href="#contact" className="text-zinc-800 hover:text-black transition-colors">Contact Us</Link>
          <Link href="#blogs" className="text-zinc-800 hover:text-black transition-colors">Blogs</Link>
        </div>

        {/* Actions Container */}
        <div className="flex items-center gap-3 ml-auto">
          
          {/* Main Auth Actions */}
          <div className="hidden sm:block">
            {!mounted ? (
              <div className="h-9 w-32 animate-pulse bg-zinc-200/50 rounded-lg"></div>
            ) : !isLoggedIn ? (
              <Link 
                href="/login" 
                className="rounded-lg bg-black text-white px-5 py-2.5 text-xs font-bold transition-colors shadow-sm hover:bg-zinc-800 flex items-center justify-center"
              >
                Join as Architect
              </Link>
            ) : (
              <div className="flex items-center gap-2">
                <Link 
                  href="/dashboard" 
                  className="rounded-lg border border-[#EAB308] bg-[#FFF9E6] text-[#D97706] px-4 py-2 text-xs font-bold transition-colors hover:bg-yellow-100 shadow-sm"
                >
                  Dashboard
                </Link>
                <button 
                  onClick={handleLogout} 
                  className="rounded-lg bg-zinc-100 text-zinc-600 px-4 py-2 text-xs font-bold transition-colors hover:bg-zinc-200"
                >
                  Logout
                </button>
              </div>
            )}
          </div>

          {/* Mobile Hamburger Button */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-1.5 text-zinc-900 hover:bg-zinc-100 rounded-md transition-colors focus:outline-none z-50"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/>
              </svg>
            )}
          </button>
        </div>

      </div>

      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white" aria-hidden="true" />

      {/* Mobile Menu Dropdown */}
      <div 
        className={`md:hidden absolute top-full left-0 w-full bg-[#FBFAF7] border-b border-zinc-200 shadow-xl overflow-hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? "max-h-[500px] opacity-100 visible" : "max-h-0 opacity-0 invisible"
        }`}
      >
        <div className="flex flex-col px-6 py-6 gap-6">
          <div className="flex flex-col gap-5 text-base font-semibold">
            <Link href="/" onClick={closeMenu} className="text-[#EAB308]">Home</Link>
            <Link href="#about" onClick={closeMenu} className="text-zinc-800 hover:text-black">About Us</Link>
            <Link href="#contact" onClick={closeMenu} className="text-zinc-800 hover:text-black">Contact Us</Link>
            <Link href="#blogs" onClick={closeMenu} className="text-zinc-800 hover:text-black">Blogs</Link>
          </div>

          <hr className="border-zinc-200" />

          <div className="w-full flex flex-col gap-3">
            {!isLoggedIn ? (
              <Link 
                href="/login" 
                onClick={closeMenu}
                className="w-full rounded-lg bg-black text-white py-3.5 text-sm font-bold transition-colors shadow-sm hover:bg-zinc-800 text-center"
              >
                Join as Architect
              </Link>
            ) : (
              <>
                <Link 
                  href="/dashboard" 
                  onClick={closeMenu}
                  className="w-full rounded-lg border border-[#EAB308] bg-[#FFF9E6] text-[#D97706] py-3.5 text-sm font-bold transition-colors shadow-sm hover:bg-yellow-100 text-center"
                >
                  Dashboard
                </Link>
                <button 
                  onClick={handleLogout} 
                  className="w-full rounded-lg bg-zinc-100 text-zinc-600 py-3.5 text-sm font-bold transition-colors hover:bg-zinc-200 text-center"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}