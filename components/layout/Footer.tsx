import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-background pt-16 pb-8 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-6">
        
        {/* Top Grid Area */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-16">
          
          {/* Brand Column */}
          <div className="md:col-span-1">
            <Link href="/" className="text-2xl font-extrabold tracking-tight">
              <span className="text-foreground">Key</span>
              <span className="text-[#EAB308]">wee</span>
            </Link>
            <p className="mt-4 text-xs font-medium text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-[200px]">
              Connecting homeowners with expert architects through AI-powered matching.
            </p>
          </div>

          {/* Links Column 1: Company */}
          <div>
            <h4 className="text-sm font-bold text-foreground mb-5">Company</h4>
            <div className="flex flex-col gap-3 text-xs font-medium text-zinc-500 dark:text-zinc-400">
              <Link href="/about" className="hover:text-black dark:hover:text-white transition-colors">About Us</Link>
              <Link href="/how-it-works" className="hover:text-black dark:hover:text-white transition-colors">How it Works</Link>
              <Link href="/careers" className="hover:text-black dark:hover:text-white transition-colors">Careers</Link>
              <Link href="/contact" className="hover:text-black dark:hover:text-white transition-colors">Contact</Link>
            </div>
          </div>

          {/* Links Column 2: For Architects */}
          <div>
            <h4 className="text-sm font-bold text-foreground mb-5">For Architects</h4>
            <div className="flex flex-col gap-3 text-xs font-medium text-zinc-500 dark:text-zinc-400">
              <Link href="/become-architect" className="hover:text-black dark:hover:text-white transition-colors">Join as Architect</Link>
              <Link href="/pricing" className="hover:text-black dark:hover:text-white transition-colors">Pricing</Link>
              <Link href="/success-stories" className="hover:text-black dark:hover:text-white transition-colors">Success Stories</Link>
              <Link href="/resources" className="hover:text-black dark:hover:text-white transition-colors">Resources</Link>
            </div>
          </div>

          {/* Links Column 3: Support */}
          <div>
            <h4 className="text-sm font-bold text-foreground mb-5">Support</h4>
            <div className="flex flex-col gap-3 text-xs font-medium text-zinc-500 dark:text-zinc-400">
              <Link href="/help" className="hover:text-black dark:hover:text-white transition-colors">Help Center</Link>
              <Link href="/faq" className="hover:text-black dark:hover:text-white transition-colors">FAQs</Link>
              <Link href="/privacy" className="hover:text-black dark:hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-black dark:hover:text-white transition-colors">Terms of Service</Link>
            </div>
          </div>

        </div>

        {/* Bottom Copyright Area */}
        <div className="border-t border-zinc-200 dark:border-zinc-800 pt-8 flex justify-center text-center">
          <p className="text-xs font-medium text-zinc-400 dark:text-zinc-500">
            &copy; 2026 Keywee.com. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
}