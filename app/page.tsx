import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/home/Hero";
import AnimatedBlobBackground from "@/components/ui/AnimatedBlobBackground";
import TopArchitects from "@/components/home/TopArchitects";
import DesignShowcase from "@/components/home/DesingShowcase";
import StatsBanner from "@/components/home/StatsBanner";
import LiveArea from "@/components/home/LiveArea";
import Footer from "@/components/layout/Footer";
import Testimonials from "@/components/home/Testmonial";
import HowItWorks from "@/components/home/HowItWorks";
import DownloadSection from "@/components/home/DownloadSection";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-[#FBFAF7] font-sans">
      
      {/* Shared animated background for navbar + hero */}
      <div className="relative overflow-hidden bg-[#FBFAF7]">
        <AnimatedBlobBackground />
        <Navbar />
        <Hero />
      </div>

      <main className="flex-1 w-full pb-16">
        <StatsBanner />
        <TopArchitects />
        <HowItWorks />
        <LiveArea />
        <Testimonials />
        <DesignShowcase />

        {/* Ready to design CTA Box */}
        <DownloadSection />

      </main>

      <Footer />
    </div>
  );
}