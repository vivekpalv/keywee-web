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
        <section className="px-6 py-12 mx-auto max-w-4xl w-full">
          <div className="bg-[#FFF9E6] border border-yellow-200 rounded-3xl p-10 text-center shadow-sm">
            <h2 className="text-2xl font-bold text-black mb-3">Ready to design your dream space?</h2>
            <p className="text-zinc-600 mb-8 text-sm">Get connected with the perfect architecture firm for your project.</p>
            <button className="bg-[#EAB308] hover:bg-yellow-600 text-white font-bold py-3.5 px-8 rounded-lg transition-colors shadow-sm text-sm">
              Find an Architect
            </button>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}