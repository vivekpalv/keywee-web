'use client';

import React from 'react';

// Mock data matching your design
// const REVIEWS = [
//   { id: 1, name: "Himmat Singh", text: "I got genuine responses from users within minutes. The direct-connect feature is amazing.", img: "https://randomuser.me/api/portraits/men/32.jpg" },
//   { id: 2, name: "Priya Sharma", text: "Finding the right architect used to take weeks. Keywee matched me in just two days with my perfect firm.", img: "https://randomuser.me/api/portraits/women/44.jpg" },
//   { id: 3, name: "Rahul Desai", text: "The portfolio views and transparent communication made shortlisting designers incredibly easy.", img: "https://randomuser.me/api/portraits/men/85.jpg" },
//   { id: 4, name: "Neha Verma", text: "Saved me so much time. I didn't have to deal with any middlemen, just direct chats with top professionals.", img: "https://randomuser.me/api/portraits/women/68.jpg" },
//   { id: 5, name: "Vikram Kapoor", text: "A game-changer for homeowners. The verification process gives you complete peace of mind.", img: "https://randomuser.me/api/portraits/men/45.jpg" },
//   { id: 6, name: "Ananya Patel", text: "Loved the UI and how fast I could browse through previous projects before reaching out.", img: "https://randomuser.me/api/portraits/women/22.jpg" },
// ];

const REVIEWS = [
  {
    id: 1,
    name: "Rohit Goel",
    location: "Gurugram",
    text: "I was looking for an architect for my 3BHK renovation in Sector 57. Key Wee made the process very simple. I could directly connect with an architect without dealing with multiple brokers.",
    img: "https://res.cloudinary.com/dgeiv60mf/image/upload/v1787029402/pexels-vijima-34030100.jpg_zuv4ws.jpg"
  },
  {
    id: 2,
    name: "Neha Arora",
    location: "South Delhi",
    text: "I liked that I could explore different architects in one place. The architect understood our requirements and gave practical design suggestions within our budget.",
    img: "https://res.cloudinary.com/dgeiv60mf/image/upload/v1787029399/pexels-divinetechygirl-1181293.jpg_etxit7.jpg"
  },
  {
    id: 3,
    name: "Amit Bansal",
    location: "Noida",
    text: "We were planning our first home and didn't know where to start. Key Wee helped us find an experienced architect who explained everything clearly.",
    img: "https://res.cloudinary.com/dgeiv60mf/image/upload/v1787029401/pexels-praveen-k-mohanan-63325502-8134707.jpg_d7zi2m.jpg"
  },
  {
    id: 4,
    name: "Priya Malhotra",
    location: "Gurugram",
    text: "Finding a trustworthy architect was difficult before. Through Key Wee, we connected directly with one and finalized our home layout in just a few meetings.",
    img: "https://res.cloudinary.com/dgeiv60mf/image/upload/v1787029398/pexels-jigar-patel-759288102-19766624.jpg_xn0crm.jpg"
  },
  {
    id: 5,
    name: "Vivek Gupta",
    location: "Dwarka, Delhi",
    text: "The direct communication with the architect saved a lot of time. No unnecessary follow-ups or middlemen.",
    img: "https://res.cloudinary.com/dgeiv60mf/image/upload/v1787029400/pexels-shootsaga-35778362.jpg_r4eajy.jpg"
  },
  {
    id: 6,
    name: "Sakshi Verma",
    location: "Faridabad",
    text: "Our interior architect was very professional and understood our lifestyle. The entire experience through Key Wee felt smooth.",
    img: "https://res.cloudinary.com/dgeiv60mf/image/upload/v1787029396/pexels-helenalopes-27086209.jpg_fapaow.jpg"
  },
  {
    id: 7,
    name: "Ankit Yadav",
    location: "Greater Noida",
    text: "I compared multiple architect profiles before choosing one. Having everything in one place made the decision much easier.",
    img: "https://res.cloudinary.com/dgeiv60mf/image/upload/v1787029400/pexels-luis-sevilla-252657-34234300.jpg_dvgmvi.jpg"
  },
  {
    id: 8,
    name: "Megha Kapoor",
    location: "Gurugram",
    text: "The architect suggested better space planning than we had imagined. Happy that we discovered them through Key Wee.",
    img: "https://res.cloudinary.com/dgeiv60mf/image/upload/v1787029395/pexels-anubhaw-anand-3263993.jpg_zyhquq.jpg"
  },
  {
    id: 9,
    name: "Rahul Jain",
    location: "Rohini, Delhi",
    text: "I was specifically searching for a modern home architect. Key Wee helped me connect with the right professional quickly.",
    img: "https://res.cloudinary.com/dgeiv60mf/image/upload/v1787029399/pexels-henlynndsouza-6102858.jpg_id5lkd.jpg"
  },
  {
    id: 10,
    name: "Pooja Singh",
    location: "Ghaziabad",
    text: "I appreciated the transparent communication. We discussed our budget directly with the architect without any confusion.",
    img: "https://res.cloudinary.com/dgeiv60mf/image/upload/v1787029394/pexels-kindelmedia-7979445.jpg_bxiojv.jpg"
  },
  {
    id: 11,
    name: "Karan Mehta",
    location: "Gurugram",
    text: "We were planning a villa and needed an experienced architect. The consultation through Key Wee gave us confidence to move ahead.",
    img: "https://res.cloudinary.com/dgeiv60mf/image/upload/v1787029398/pexels-apunto-group-agencia-de-publicidad-53086916-7752846.jpg_pxdk17.jpg"
  },
  {
    id: 12,
    name: "Nidhi Sharma",
    location: "West Delhi",
    text: "The architect shared multiple design options and explained the pros and cons of each. Very satisfied with the experience.",
    img: "https://res.cloudinary.com/dgeiv60mf/image/upload/v1787029393/pexels-satyampixels-36843938.jpg_g6ky2m.jpg"
  },
  {
    id: 13,
    name: "Harsh Vardhan",
    location: "Noida",
    text: "I liked that the platform focuses on connecting users directly with architects instead of pushing random contractors.",
    img: "https://res.cloudinary.com/dgeiv60mf/image/upload/v1787029399/pexels-ofspace-8128191.jpg_yz2d6o.jpg"
  },
  {
    id: 14,
    name: "Ritu Aggarwal",
    location: "Gurugram",
    text: "Our duplex planning became much easier after connecting with an architect through Key Wee. The ideas were practical as well as modern.",
    img: "https://res.cloudinary.com/dgeiv60mf/image/upload/v1787029392/pexels-kalistro666-32069502.jpg_tqynna.jpg"
  },
  {
    id: 15,
    name: "Deepak Chauhan",
    location: "Delhi NCR",
    text: "The platform is clean and easy to use. Within a short time, I was able to shortlist architects based on my project.",
    img: "https://res.cloudinary.com/dgeiv60mf/image/upload/v1787029397/pexels-ben-khatry-430197437-37862669.jpg_msikqz.jpg"
  },
  {
    id: 16,
    name: "Simran Kaur",
    location: "Gurugram",
    text: "We wanted a minimalist home design, and the architect we connected with understood exactly what we were looking for.",
    img: "https://res.cloudinary.com/dgeiv60mf/image/upload/v1787029392/pexels-soura-nath-1069679-23023499.jpg_hfyhdw.jpg"
  },
  {
    id: 17,
    name: "Manish Goel",
    location: "East Delhi",
    text: "Instead of calling multiple firms individually, I found a suitable architect through Key Wee. It saved us a lot of effort.",
    img: "https://res.cloudinary.com/dgeiv60mf/image/upload/v1787029397/pexels-yash-maramangallam-2756476-9474021.jpg_nz0ugu.jpg"
  },
  {
    id: 18,
    name: "Ayesha Khan",
    location: "Noida",
    text: "The architect patiently answered all our questions about planning and materials. It was a comfortable experience from the beginning.",
    img: "https://res.cloudinary.com/dgeiv60mf/image/upload/v1787029392/pexels-rodrigo-chable-380091428-14612677.jpg_cbie7a.jpg"
  },
  {
    id: 19,
    name: "Tarun Sethi",
    location: "Gurugram",
    text: "I would recommend Key Wee to anyone planning a new home. Direct access to architects makes the process much simpler.",
    img: "https://res.cloudinary.com/dgeiv60mf/image/upload/v1787029395/pexels-aathif-19747891.jpg_w1nn9a.jpg"
  },
  {
    id: 20,
    name: "Shreya Bhatia",
    location: "Delhi",
    text: "We connected with an architect for our office renovation through Key Wee. The design was functional, modern, and matched our expectations.",
    img: "https://res.cloudinary.com/dgeiv60mf/image/upload/v1787029392/pexels-munis-asadov-414047487-18733584.jpg_glgkeu.jpg"
  }
];

// Single Review Card Component (SCALED DOWN)
// const ReviewCard = ({ name, text, img }: { name: string; text: string; img: string }) => (
//   <div className="bg-white dark:bg-zinc-900 rounded-3xl p-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none border border-zinc-100 dark:border-zinc-800 flex flex-col gap-3 w-62.5 sm:w-70 transition-transform duration-300 hover:scale-[1.02] cursor-pointer">
//     <p className="text-[14px] text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium">
//       "{text}"
//     </p>
//     <div className="flex items-center gap-3 mt-1">
//       <img src={img} alt={name} className="w-9 h-9 rounded-full object-cover bg-zinc-100 dark:bg-zinc-800" />
//       <span className="font-bold text-sm text-zinc-900 dark:text-zinc-100">{name}</span>
//     </div>
//   </div>
// );

// Single Review Card Component (SCALED DOWN)
const ReviewCard = ({ name, text, img, location }: { name: string; text: string; img: string; location?: string }) => (
  <div className="bg-white dark:bg-zinc-900 rounded-3xl p-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none border border-zinc-100 dark:border-zinc-800 flex flex-col gap-3 w-62.5 sm:w-70 transition-transform duration-300 hover:scale-[1.02] cursor-pointer">
    <p className="text-[14px] text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium">
      "{text}"
    </p>
    <div className="flex items-center gap-3 mt-1">
      <img src={img} alt={name} className="w-9 h-9 rounded-full object-cover bg-zinc-100 dark:bg-zinc-800" />
      <div className="flex flex-col">
        <span className="font-bold text-sm text-zinc-900 dark:text-zinc-100">{name}</span>
        {/* Location added here, appearing after the text */}
        {location && (
          <span className="text-[12px] text-zinc-500 dark:text-zinc-500">{location}</span>
        )}
      </div>
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