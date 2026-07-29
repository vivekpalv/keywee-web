'use client';

import React from 'react';

// Mock data matching your design
const REVIEWS = [
  { id: 1, name: "Himmat Singh", text: "I got genuine responses from users within minutes. The direct-connect feature is amazing.", img: "https://randomuser.me/api/portraits/men/32.jpg" },
  { id: 2, name: "Priya Sharma", text: "Finding the right architect used to take weeks. Keywee matched me in just two days with my perfect firm.", img: "https://randomuser.me/api/portraits/women/44.jpg" },
  { id: 3, name: "Rahul Desai", text: "The portfolio views and transparent communication made shortlisting designers incredibly easy.", img: "https://randomuser.me/api/portraits/men/85.jpg" },
  { id: 4, name: "Neha Verma", text: "Saved me so much time. I didn't have to deal with any middlemen, just direct chats with top professionals.", img: "https://randomuser.me/api/portraits/women/68.jpg" },
  { id: 5, name: "Vikram Kapoor", text: "A game-changer for homeowners. The verification process gives you complete peace of mind.", img: "https://randomuser.me/api/portraits/men/45.jpg" },
  { id: 6, name: "Ananya Patel", text: "Loved the UI and how fast I could browse through previous projects before reaching out.", img: "https://randomuser.me/api/portraits/women/22.jpg" },
];

// Single Review Card Component (SCALED DOWN)
const ReviewCard = ({ name, text, img }: { name: string; text: string; img: string }) => (
  <div className="bg-white dark:bg-zinc-900 rounded-3xl p-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none border border-zinc-100 dark:border-zinc-800 flex flex-col gap-3 w-62.5 sm:w-70 transition-transform duration-300 hover:scale-[1.02] cursor-pointer">
    <p className="text-[14px] text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium">
      "{text}"
    </p>
    <div className="flex items-center gap-3 mt-1">
      <img src={img} alt={name} className="w-9 h-9 rounded-full object-cover bg-zinc-100 dark:bg-zinc-800" />
      <span className="font-bold text-sm text-zinc-900 dark:text-zinc-100">{name}</span>
    </div>
  </div>
);

// Marquee Column Component
const ReviewColumn = ({ reviews, reverse = false, speed = "40s" }: { reviews: any[], reverse?: boolean, speed?: string }) => (
  <div className="relative w-full flex justify-center overflow-hidden h-225"> {/* Reduced height container */}
    <div 
      className={`flex flex-col gap-5 absolute w-full items-center ${reverse ? 'animate-marquee-down' : 'animate-marquee-up'}`}
      style={{ animationDuration: speed }}
    >
      {/* Set 1 */}
      <div className="flex flex-col gap-5">
        {reviews.map((r, i) => <ReviewCard key={i} {...r} />)}
      </div>
      {/* Set 2 (Duplicate for seamless infinite looping) */}
      <div className="flex flex-col gap-5">
        {reviews.map((r, i) => <ReviewCard key={`dup-${i}`} {...r} />)}
      </div>
    </div>
  </div>
);

export default function Testimonials() {
  const col1 = [REVIEWS[0], REVIEWS[1], REVIEWS[2], REVIEWS[0]];
  const col2 = [REVIEWS[3], REVIEWS[4], REVIEWS[5], REVIEWS[3]];
  const col3 = [REVIEWS[1], REVIEWS[5], REVIEWS[2], REVIEWS[4]];
  const col4 = [REVIEWS[4], REVIEWS[0], REVIEWS[3], REVIEWS[5]];
  const col5 = [REVIEWS[2], REVIEWS[3], REVIEWS[1], REVIEWS[5]]; 

  return (
    <section className="relative w-full h-125 sm:h-175 bg-background overflow-hidden flex items-center justify-center pt-8"> {/* Reduced overall section height */}
      
      {/* --- BACKGROUND ANIMATED COLUMNS --- */}
      {/* Reduced scale and angle to make it tighter and less overwhelming */}
      <div className="absolute inset-0 flex justify-center gap-4 sm:gap-6 px-4 opacity-50 sm:opacity-100 scale-[1.1] sm:scale-[1.15] md:scale-[1.2] -rotate-6">
        <ReviewColumn reviews={col1} speed="45s" />
        <ReviewColumn reviews={col2} speed="55s" reverse />
        <ReviewColumn reviews={col3} speed="40s" />
        <div className="hidden lg:block">
          <ReviewColumn reviews={col4} speed="50s" reverse />
        </div>
        <div className="hidden xl:block">
          <ReviewColumn reviews={col5} speed="48s" />
        </div>
      </div>

      {/* --- FADE GRADIENTS FOR SMOOTH EDGES --- */}
      <div className="absolute top-0 inset-x-0 h-32 bg-linear-to-b from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute bottom-0 inset-x-0 h-32 bg-linear-to-t from-background to-transparent z-10 pointer-events-none" />

      {/* --- CENTER TEXT OVERLAY --- */}
      {/* Dark mode variant added to the radial gradient to match the dark background (`#09090b` / `9,9,11`) */}
      <div className="absolute z-20 w-full h-full flex items-center justify-center bg-[radial-gradient(circle_at_center,_rgba(251,250,247,0.95)_0%,_rgba(251,250,247,0.85)_30%,_transparent_65%)] dark:bg-[radial-gradient(circle_at_center,_rgba(9,9,11,0.95)_0%,_rgba(9,9,11,0.85)_30%,_transparent_65%)] pointer-events-none px-6">
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-foreground tracking-tight text-center pointer-events-auto">
          Trusted by <span className="text-[#EAB308]">10000+</span> Indians
        </h2>
      </div>

      {/* --- ANIMATION STYLES --- */}
      <style>{`
        @keyframes marqueeUp {
          0% { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
        @keyframes marqueeDown {
          0% { transform: translateY(-50%); }
          100% { transform: translateY(0); }
        }
        
        .animate-marquee-up {
          animation: marqueeUp linear infinite;
        }
        .animate-marquee-down {
          animation: marqueeDown linear infinite;
        }
      `}</style>

    </section>
  );
}