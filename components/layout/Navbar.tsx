"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import { useTheme } from "next-themes";
import LogoutModal from "../LogoutModal";

interface DecodedToken {
  id: string;
  roles: string[];
  iat: number;
  exp: number;
}

export default function Navbar() {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [userRoles, setUserRoles] = useState<string[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

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
    setIsLogoutModalOpen(false);
    router.push("/");
    router.refresh();
  };

  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
          isScrolled 
            ? "bg-background/90 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800 py-3 sm:py-4 shadow-sm" 
            : `py-5 sm:py-6 ${isMobileMenuOpen ? "bg-[#FBFAF7] dark:bg-zinc-950 md:bg-transparent" : "bg-transparent"}`
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6">
          
          {/* Logo */}
          <Link href="/" className="text-2xl font-extrabold tracking-tight z-50 shrink-0">
            <span className="text-foreground">Key</span>
            <span className="text-[#EAB308]">wee</span>
          </Link>

          {/* Desktop Global Nav Targets */}
          <div className="hidden md:flex gap-8 items-center text-sm font-semibold absolute left-1/2 -translate-x-1/2">
            <Link href="/" className="text-[#EAB308]">Home</Link>
            <Link href="/about" className="text-zinc-800 dark:text-zinc-300 hover:text-black dark:hover:text-white transition-colors">About Us</Link>
            <Link href="/contact" className="text-zinc-800 dark:text-zinc-300 hover:text-black dark:hover:text-white transition-colors">Contact Us</Link>
            <Link href="/blog" className="text-zinc-800 dark:text-zinc-300 hover:text-black dark:hover:text-white transition-colors">Blogs</Link>
          </div>

          {/* Actions Container */}
          <div className="flex items-center gap-3 ml-auto">
            
            {/* Theme Toggle Button */}
            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-2 rounded-full text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
                )}
              </button>
            )}

            {/* Main Auth Actions */}
            <div className="hidden sm:block">
              {!mounted ? (
                <div className="h-9 w-32 animate-pulse bg-zinc-200/50 dark:bg-zinc-800/50 rounded-lg"></div>
              ) : !isLoggedIn ? (
                <Link 
                  href="/login" 
                  className="rounded-lg bg-black dark:bg-white text-white dark:text-black px-5 py-2.5 text-xs font-bold transition-colors shadow-sm hover:bg-zinc-800 dark:hover:bg-zinc-200 flex items-center justify-center"
                >
                  Join as Architect
                </Link>
              ) : (
                <div className="flex items-center gap-2">
                  <Link 
                    href="/dashboard" 
                    className="rounded-lg border border-[#EAB308] bg-[#FFF9E6] dark:bg-[#FFF9E6]/10 text-[#D97706] dark:text-[#EAB308] px-4 py-2 text-xs font-bold transition-colors hover:bg-yellow-100 dark:hover:bg-yellow-900/30 shadow-sm"
                  >
                    Dashboard
                  </Link>
                  <button 
                    onClick={() => setIsLogoutModalOpen(true)} 
                    className="rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 px-4 py-2 text-xs font-bold transition-colors hover:bg-zinc-200 dark:hover:bg-zinc-700"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Hamburger Button */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-1.5 text-zinc-900 dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-md transition-colors focus:outline-none z-50"
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

        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/50 dark:bg-zinc-900/50" aria-hidden="true" />

        {/* Mobile Menu Dropdown */}
        <div 
          className={`md:hidden absolute top-full left-0 w-full bg-[#FBFAF7] dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800 shadow-xl overflow-hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen ? "max-h-125 opacity-100 visible" : "max-h-0 opacity-0 invisible"
          }`}
        >
          <div className="flex flex-col px-6 py-6 gap-6">
            <div className="flex flex-col gap-5 text-base font-semibold">
              <Link href="/" onClick={closeMenu} className="text-[#EAB308]">Home</Link>
              <Link href="/about" onClick={closeMenu} className="text-zinc-800 dark:text-zinc-300 hover:text-black dark:hover:text-white">About Us</Link>
              <Link href="/contact" onClick={closeMenu} className="text-zinc-800 dark:text-zinc-300 hover:text-black dark:hover:text-white">Contact Us</Link>
              <Link href="/blog" onClick={closeMenu} className="text-zinc-800 dark:text-zinc-300 hover:text-black dark:hover:text-white">Blogs</Link>
            </div>

            <hr className="border-zinc-200 dark:border-zinc-800" />

            <div className="w-full flex flex-col gap-3">
              {!isLoggedIn ? (
                <Link 
                  href="/login" 
                  onClick={closeMenu}
                  className="w-full rounded-lg bg-black dark:bg-white text-white dark:text-black py-3.5 text-sm font-bold transition-colors shadow-sm hover:bg-zinc-800 dark:hover:bg-zinc-200 text-center"
                >
                  Join as Architect
                </Link>
              ) : (
                <>
                  <Link 
                    href="/dashboard" 
                    onClick={closeMenu}
                    className="w-full rounded-lg border border-[#EAB308] bg-[#FFF9E6] dark:bg-[#FFF9E6]/10 text-[#D97706] dark:text-[#EAB308] py-3.5 text-sm font-bold transition-colors shadow-sm hover:bg-yellow-100 dark:hover:bg-yellow-900/30 text-center"
                  >
                    Dashboard
                  </Link>
                  <button 
                    onClick={() => {
                      closeMenu();
                      setIsLogoutModalOpen(true);
                    }} 
                    className="w-full rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 py-3.5 text-sm font-bold transition-colors hover:bg-zinc-200 dark:hover:bg-zinc-700 text-center"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Render the extracted Logout Modal */}
      <LogoutModal 
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={handleLogout}
      />
    </>
  );
}