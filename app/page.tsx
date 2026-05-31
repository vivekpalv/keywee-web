// import dynamic from 'next/dynamic';

// // 1. STATIC IMPORTS
// import Navbar from "@/components/layout/Navbar";
// import Hero from "@/components/home/Hero";
// import AnimatedBlobBackground from "@/components/ui/AnimatedBlobBackground";
// import StatsBanner from "@/components/home/StatsBanner";
// import Footer from "@/components/layout/Footer";

// // 2. DYNAMIC IMPORTS
// const TopArchitects = dynamic(() => import("@/components/home/TopArchitects"));
// const HowItWorks = dynamic(() => import("@/components/home/HowItWorks"));
// const Testimonials = dynamic(() => import("@/components/home/Testmonial"));
// const DesignShowcase = dynamic(() => import("@/components/home/DesingShowcase"));
// const DownloadSection = dynamic(() => import("@/components/home/DownloadSection"));
// const LiveArea = dynamic(() => import("@/components/home/LiveArea")); 

// export default function Home() {
//   return (
//     // FIX: Removed 'overflow-hidden' from this top-level div so 'sticky' works again
//     <div className="relative flex min-h-screen flex-col bg-[#FBFAF7] font-sans">
      
//       {/* Background Container (overflow-hidden stays here to clip the blobs) */}
//       <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden clip-path-bounds">
//         <AnimatedBlobBackground />
//       </div>

//       <div className="relative z-10 flex flex-col min-h-screen w-full">
//         <Navbar />
//         <Hero />
        
//         <main className="flex-1 w-full pb-16">
//           <StatsBanner />
//           <TopArchitects />
//           {/* HowItWorks will now successfully stick to the screen! */}
//           <HowItWorks />
//           <LiveArea />
//           <Testimonials />
//           <DesignShowcase />
//           <DownloadSection />
//         </main>

//         <Footer />
//       </div>
//     </div>
//   );
// }

import dynamic from 'next/dynamic';

// 1. STATIC IMPORTS
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/home/Hero";
import AnimatedBlobBackground from "@/components/ui/AnimatedBlobBackground";
import StatsBanner from "@/components/home/StatsBanner";
import Footer from "@/components/layout/Footer";

// 2. DYNAMIC IMPORTS
const TopArchitects = dynamic(() => import("@/components/home/TopArchitects"));
const HowItWorks = dynamic(() => import("@/components/home/HowItWorks"));
const Testimonials = dynamic(() => import("@/components/home/Testmonial"));
const DesignShowcase = dynamic(() => import("@/components/home/DesingShowcase"));
const DownloadSection = dynamic(() => import("@/components/home/DownloadSection"));
const LiveArea = dynamic(() => import("@/components/home/LiveArea")); 

export default function Home() {
  return (
    // FIX: Removed 'overflow-hidden' from this top-level div so 'sticky' works again
    // UPDATE: Replaced hardcoded bg-[#FBFAF7] with dynamic bg-background and added text-foreground
    <div className="relative flex min-h-screen flex-col bg-background text-foreground font-sans transition-colors duration-300">
      
      {/* Background Container (overflow-hidden stays here to clip the blobs) */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden clip-path-bounds">
        <AnimatedBlobBackground />
      </div>

      <div className="relative z-10 flex flex-col min-h-screen w-full">
        <Navbar />
        <Hero />
        
        <main className="flex-1 w-full pb-16">
          <StatsBanner />
          <TopArchitects />
          {/* HowItWorks will now successfully stick to the screen! */}
          <HowItWorks />
          <LiveArea />
          <Testimonials />
          <DesignShowcase />
          <DownloadSection />
        </main>

        <Footer />
      </div>
    </div>
  );
}