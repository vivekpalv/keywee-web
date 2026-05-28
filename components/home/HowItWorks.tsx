// 'use client';

// import { useState, useEffect, useRef } from "react";

// const STEPS = [
//   {
//     id: "01",
//     title: "Share Requirements",
//     desc: "Tell us about your space, style, budget, and timeline.",
//   },
//   {
//     id: "02",
//     title: "AI Matches",
//     desc: "Our AI analyzes 5,000+ architects to find your best fit.",
//   },
//   {
//     id: "03",
//     title: "Connect Directly",
//     desc: "Chat, collaborate, and hire. No agency in between.",
//     showButtons: true,
//   }
// ];

// export default function HowItWorks() {
//   const [activeStep, setActiveStep] = useState(0);
//   const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) {
//             const index = stepRefs.current.indexOf(entry.target as HTMLDivElement);
//             if (index !== -1) setActiveStep(index);
//           }
//         });
//       },
//       {
//         // Triggers when the element hits the middle of the screen
//         rootMargin: "-40% 0px -40% 0px", 
//         threshold: 0,
//       }
//     );

//     stepRefs.current.forEach((ref) => {
//       if (ref) observer.observe(ref);
//     });

//     return () => observer.disconnect();
//   }, []);

//   return (
//     <section className="bg-[#FBFAF7] py-24 px-6 relative">
//       <div className="mx-auto max-w-6xl">
        
//         {/* --- HEADER --- */}
//         <div className="text-center mb-16 sm:mb-24">
//           <h2 className="text-4xl sm:text-5xl font-extrabold text-zinc-900 mb-4 tracking-tight">
//             How Keywee AI Works
//           </h2>
//           <p className="text-zinc-500 font-medium">
//             Three steps. No middlemen. No confusion.
//           </p>
//         </div>

//         {/* --- SCROLLYTELLING LAYOUT --- */}
//         <div className="flex flex-col md:flex-row gap-12 lg:gap-24 relative items-start">
          
//           {/* LEFT: Sticky Phone Mockup */}
//           <div className="w-full md:w-1/2 sticky top-24 flex justify-center order-2 md:order-1 h-[600px]">
//             <div className="w-[300px] h-[600px] bg-black rounded-[3rem] p-3 shadow-2xl relative border border-zinc-800 shrink-0 transform transition-transform duration-700">
              
//               {/* Phone Notch */}
//               <div className="absolute top-0 inset-x-0 h-6 flex justify-center z-50">
//                 <div className="w-32 h-6 bg-black rounded-b-3xl"></div>
//               </div>

//               {/* Phone Screen Container */}
//               <div className="w-full h-full bg-[#FBFAF7] rounded-[2.25rem] overflow-hidden relative font-sans flex flex-col">
                
//                 {/* App Header */}
//                 <div className="bg-black text-white px-5 pt-10 pb-4 shrink-0 shadow-sm z-20">
//                   <div className="flex items-center gap-2 mb-1">
//                     <span className="text-[#EAB308] text-lg leading-none">✨</span>
//                     <h3 className="font-bold text-[15px]">AI Architect Match</h3>
//                   </div>
//                   <p className="text-[10px] text-zinc-400">Describe your project - we find the best fit instantly.</p>
//                 </div>

//                 {/* Dynamic Screen Content Wrapper */}
//                 <div className="relative flex-1 bg-[#FBFAF7] overflow-hidden p-5">
                  
//                   {/* --- SCREEN 1: Requirements --- */}
//                   <div className={`absolute inset-0 p-5 transition-all duration-700 ease-in-out ${activeStep === 0 ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10 pointer-events-none'}`}>
//                     <div className="flex flex-col gap-4 mt-2">
//                       <div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm border border-zinc-100 text-xs text-zinc-700 font-medium max-w-[85%]">
//                         Hello! I'm your Keywee AI. Where is your project located?
//                       </div>
//                       <div className="bg-zinc-900 text-white p-3 rounded-2xl rounded-tr-none shadow-sm text-xs font-medium self-end max-w-[85%]">
//                         Gurugram, Haryana
//                       </div>
//                       <div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm border border-zinc-100 text-xs text-zinc-700 font-medium max-w-[85%]">
//                         Great. Select your project type:
//                       </div>
//                       <div className="grid grid-cols-2 gap-2 mt-2">
//                         <div className="bg-[#FFF9E6] border border-yellow-200 text-[#D97706] p-3 rounded-xl flex flex-col items-center justify-center gap-1 shadow-sm">
//                           <span className="text-xl">🏠</span>
//                           <span className="text-[10px] font-bold">Home</span>
//                         </div>
//                         <div className="bg-white border border-zinc-200 text-zinc-600 p-3 rounded-xl flex flex-col items-center justify-center gap-1 shadow-sm">
//                           <span className="text-xl">🏢</span>
//                           <span className="text-[10px] font-bold">Commercial</span>
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   {/* --- SCREEN 2: AI Matching --- */}
//                   <div className={`absolute inset-0 p-5 transition-all duration-700 ease-in-out ${activeStep === 1 ? 'opacity-100 translate-x-0' : activeStep < 1 ? 'opacity-0 translate-x-10 pointer-events-none' : 'opacity-0 -translate-x-10 pointer-events-none'}`}>
//                     <div className="flex flex-col gap-4 mt-2">
//                       <div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm border border-zinc-100 text-xs text-zinc-700 font-medium max-w-[85%]">
//                         Select your room type:
//                       </div>
//                       <div className="flex flex-wrap gap-2 self-end justify-end">
//                          <span className="bg-zinc-900 text-white px-4 py-2 rounded-full text-[10px] font-bold">Kitchen</span>
//                          <span className="bg-zinc-900 text-white px-4 py-2 rounded-full text-[10px] font-bold">Living Room</span>
//                       </div>
//                       <div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm border border-zinc-100 text-xs text-zinc-700 font-medium max-w-[85%]">
//                         Define your budget range:
//                       </div>
//                       <div className="bg-[#EAB308] text-white px-5 py-2.5 rounded-full text-[11px] font-bold self-end shadow-md">
//                         10-25 Lakhs
//                       </div>
//                       <div className="mt-4 p-4 rounded-2xl border border-yellow-200 bg-[#FFF9E6]/50 animate-pulse">
//                         <p className="text-[10px] text-yellow-700 font-bold text-center leading-relaxed">
//                           Scanning 5,000+ verified architects in Gurugram for Smart Home within 10-25 lakhs...
//                         </p>
//                       </div>
//                     </div>
//                   </div>

//                   {/* --- SCREEN 3: Connect --- */}
//                   <div className={`absolute inset-0 p-5 transition-all duration-700 ease-in-out ${activeStep === 2 ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10 pointer-events-none'}`}>
//                      <div className="flex flex-col gap-4 h-full pt-4">
//                         <div className="bg-[#EAB308] rounded-2xl p-1 shadow-lg relative overflow-hidden">
//                           {/* Shimmer effect */}
//                           <div className="absolute top-0 left-[-100%] w-1/2 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12 animate-[shimmer_2s_infinite]"></div>
                          
//                           <div className="bg-white rounded-[14px] p-4 relative z-10">
//                             <div className="flex justify-between items-center mb-3 border-b border-zinc-100 pb-3">
//                               <span className="text-[9px] font-extrabold text-[#D97706] tracking-widest uppercase">⭐ Top Match Found</span>
//                               <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider">Available</span>
//                             </div>
                            
//                             <div className="flex gap-3 items-center mb-4">
//                               <div className="w-12 h-12 rounded-full bg-zinc-200 border-2 border-[#FFF9E6] overflow-hidden shrink-0">
//                                 <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=100&q=80" alt="Architect" className="w-full h-full object-cover"/>
//                               </div>
//                               <div>
//                                 <h4 className="font-extrabold text-sm text-zinc-900 leading-tight">Priya Sharma</h4>
//                                 <p className="text-[10px] text-zinc-500 font-medium">Studio NS • Delhi</p>
//                                 <div className="text-[10px] text-zinc-900 font-bold mt-0.5">⭐ 4.9 <span className="text-zinc-400 font-normal">(124 reviews)</span></div>
//                               </div>
//                             </div>

//                             <div className="flex gap-2">
//                               <button className="flex-1 bg-black text-white text-[10px] font-bold py-2.5 rounded-lg">Connect | FREE</button>
//                               <button className="flex-1 bg-zinc-100 text-zinc-900 text-[10px] font-bold py-2.5 rounded-lg border border-zinc-200">View Profile</button>
//                             </div>
//                           </div>
//                         </div>

//                         <div className="mt-auto bg-zinc-900 text-white p-4 rounded-2xl flex items-center justify-between shadow-md">
//                           <div className="flex -space-x-2">
//                             <div className="w-6 h-6 rounded-full bg-zinc-500 border border-zinc-900"></div>
//                             <div className="w-6 h-6 rounded-full bg-zinc-400 border border-zinc-900"></div>
//                             <div className="w-6 h-6 rounded-full bg-zinc-300 border border-zinc-900"></div>
//                           </div>
//                           <span className="text-[10px] font-medium">+12 other matches</span>
//                         </div>
//                      </div>
//                   </div>

//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* RIGHT: Scrollable Text Steps */}
//           <div className="w-full md:w-1/2 flex flex-col order-1 md:order-2 pb-24 md:pb-0">
//             {STEPS.map((step, index) => (
//               <div 
//                 key={step.id} 
//                 ref={(el) => { stepRefs.current[index] = el; }}
//                 className={`min-h-[50vh] md:min-h-[80vh] flex flex-col justify-center transition-all duration-700 ${activeStep === index ? 'opacity-100 scale-100' : 'opacity-40 scale-95'}`}
//               >
//                 <div className={`p-8 sm:p-10 rounded-3xl transition-colors duration-500 ${activeStep === index ? 'bg-white shadow-xl shadow-zinc-200/40 border border-zinc-100' : 'bg-transparent'}`}>
                  
//                   {/* Step Badge */}
//                   <div className="w-12 h-12 rounded-xl bg-[#FFF9E6] text-[#D97706] font-extrabold flex items-center justify-center text-lg mb-6 border border-yellow-100 shadow-sm">
//                     {step.id}
//                   </div>
                  
//                   {/* Text Content */}
//                   <h3 className="text-3xl font-extrabold text-zinc-900 mb-4 tracking-tight">
//                     {step.title}
//                   </h3>
//                   <p className="text-lg text-zinc-600 leading-relaxed font-medium">
//                     {step.desc}
//                   </p>

//                   {/* Optional App Store Buttons on final step */}
//                   {step.showButtons && (
//                     <div className="mt-8 flex flex-wrap gap-4">
//                       <button className="flex items-center gap-2 bg-[#111111] text-[#F1F1F1] px-5 py-2.5 rounded-xl hover:bg-black transition-colors hover:shadow-lg hover:-translate-y-0.5 duration-200">
//                         <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
//                           <path d="M17.05 13.9c-.03-2.6 2.1-3.8 2.2-3.9-1.2-1.8-3.1-2-3.8-2.1-1.6-.2-3.2.9-4 1-1-.1-2.4-1-3.6-1-1.6 0-3.1.9-4 2.4-1.7 3-1.4 7.6.3 10 1 1.4 2.1 3 3.6 2.9 1.5-.1 2-1 3.8-1s2.2 1 3.8 1c1.6.1 2.5-1.4 3.4-2.8.6-.8 1.1-1.7 1.4-2.6-.7-.2-1.8-1-1.9-2.8zM14.6 7.4c.8-1 1.4-2.4 1.2-3.8-1.2.1-2.7.8-3.5 1.8-.7.8-1.4 2.2-1.2 3.6 1.4.1 2.7-.6 3.5-1.6z"/>
//                         </svg>
//                         <div className="text-left">
//                           <div className="text-[8px] uppercase tracking-wide opacity-80 leading-none">Download on the</div>
//                           <div className="text-sm font-semibold leading-tight">App Store</div>
//                         </div>
//                       </button>
//                       <button className="flex items-center gap-2 bg-[#111111] text-[#F1F1F1] px-5 py-2.5 rounded-xl hover:bg-black transition-colors hover:shadow-lg hover:-translate-y-0.5 duration-200">
//                         <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
//                           <path d="M3.6 21.3L15.9 12 3.6 2.7C3.3 2.5 3 2.8 3 3.1v17.8c0 .3.3.6.6.4zm13.1-8.5l3.8-2.2c.4-.2.4-.8 0-1l-3.8-2.2-3.1 3.2 3.1 3.2zM4.6 3.5l10 5.8-2.5 2.6L4.6 3.5zm0 17l10-5.8-2.5-2.6-7.5 8.4z"/>
//                         </svg>
//                         <div className="text-left">
//                           <div className="text-[8px] uppercase tracking-wide opacity-80 leading-none">GET IT ON</div>
//                           <div className="text-sm font-semibold leading-tight">Google Play</div>
//                         </div>
//                       </button>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       <style>{`
//         @keyframes shimmer {
//           100% { left: 200%; }
//         }
//       `}</style>
//     </section>
//   );
// }

'use client';

import { useState, useEffect, useRef } from "react";

const STEPS = [
  {
    id: "01",
    title: "Share Requirements",
    desc: "Tell us about your space, style, budget, and timeline.",
  },
  {
    id: "02",
    title: "AI Matches",
    desc: "Our AI analyzes 5,000+ architects to find your best fit.",
  },
  {
    id: "03",
    title: "Connect Directly",
    desc: "Chat, collaborate, and hire. No agency in between.",
    showButtons: true,
  }
];

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = stepRefs.current.indexOf(entry.target as HTMLDivElement);
            if (index !== -1) setActiveStep(index);
          }
        });
      },
      {
        // Slightly loosened for better mobile triggering
        rootMargin: "-30% 0px -30% 0px", 
        threshold: 0,
      }
    );

    stepRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className="bg-[#FBFAF7] py-16 md:py-24 px-4 sm:px-6 relative">
      <div className="mx-auto max-w-6xl">
        
        {/* --- HEADER --- */}
        <div className="text-center mb-12 sm:mb-24">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-zinc-900 mb-4 tracking-tight">
            How Keywee AI Works
          </h2>
          <p className="text-zinc-500 font-medium text-sm sm:text-base">
            Three steps. No middlemen. No confusion.
          </p>
        </div>

        {/* --- SCROLLYTELLING LAYOUT --- */}
        <div className="flex flex-col md:flex-row gap-4 md:gap-12 lg:gap-24 relative items-start">
          
          {/* TOP / LEFT: Sticky Phone Mockup */}
          <div className="w-full md:w-1/2 sticky top-16 md:top-24 flex justify-center h-[400px] md:h-[600px] z-0">
            <div className="w-[300px] h-[600px] bg-black rounded-[3rem] p-3 shadow-2xl relative border border-zinc-800 shrink-0 transform scale-[0.65] sm:scale-75 md:scale-100 origin-top transition-transform duration-700">
              
              {/* Phone Notch */}
              <div className="absolute top-0 inset-x-0 h-6 flex justify-center z-50">
                <div className="w-32 h-6 bg-black rounded-b-3xl"></div>
              </div>

              {/* Phone Screen Container */}
              <div className="w-full h-full bg-[#FBFAF7] rounded-[2.25rem] overflow-hidden relative font-sans flex flex-col">
                
                {/* App Header */}
                <div className="bg-black text-white px-5 pt-10 pb-4 shrink-0 shadow-sm z-20">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[#EAB308] text-lg leading-none">✨</span>
                    <h3 className="font-bold text-[15px]">AI Architect Match</h3>
                  </div>
                  <p className="text-[10px] text-zinc-400">Describe your project - we find the best fit instantly.</p>
                </div>

                {/* Dynamic Screen Content Wrapper */}
                <div className="relative flex-1 bg-[#FBFAF7] overflow-hidden p-5">
                  
                  {/* --- SCREEN 1: Requirements --- */}
                  <div className={`absolute inset-0 p-5 transition-all duration-700 ease-in-out ${activeStep === 0 ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10 pointer-events-none'}`}>
                    <div className="flex flex-col gap-4 mt-2">
                      <div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm border border-zinc-100 text-xs text-zinc-700 font-medium max-w-[85%]">
                        Hello! I'm your Keywee AI. Where is your project located?
                      </div>
                      <div className="bg-zinc-900 text-white p-3 rounded-2xl rounded-tr-none shadow-sm text-xs font-medium self-end max-w-[85%]">
                        Gurugram, Haryana
                      </div>
                      <div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm border border-zinc-100 text-xs text-zinc-700 font-medium max-w-[85%]">
                        Great. Select your project type:
                      </div>
                      <div className="grid grid-cols-2 gap-2 mt-2">
                        <div className="bg-[#FFF9E6] border border-yellow-200 text-[#D97706] p-3 rounded-xl flex flex-col items-center justify-center gap-1 shadow-sm">
                          <span className="text-xl">🏠</span>
                          <span className="text-[10px] font-bold">Home</span>
                        </div>
                        <div className="bg-white border border-zinc-200 text-zinc-600 p-3 rounded-xl flex flex-col items-center justify-center gap-1 shadow-sm">
                          <span className="text-xl">🏢</span>
                          <span className="text-[10px] font-bold">Commercial</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* --- SCREEN 2: AI Matching --- */}
                  <div className={`absolute inset-0 p-5 transition-all duration-700 ease-in-out ${activeStep === 1 ? 'opacity-100 translate-x-0' : activeStep < 1 ? 'opacity-0 translate-x-10 pointer-events-none' : 'opacity-0 -translate-x-10 pointer-events-none'}`}>
                    <div className="flex flex-col gap-4 mt-2">
                      <div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm border border-zinc-100 text-xs text-zinc-700 font-medium max-w-[85%]">
                        Select your room type:
                      </div>
                      <div className="flex flex-wrap gap-2 self-end justify-end">
                         <span className="bg-zinc-900 text-white px-4 py-2 rounded-full text-[10px] font-bold">Kitchen</span>
                         <span className="bg-zinc-900 text-white px-4 py-2 rounded-full text-[10px] font-bold">Living Room</span>
                      </div>
                      <div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm border border-zinc-100 text-xs text-zinc-700 font-medium max-w-[85%]">
                        Define your budget range:
                      </div>
                      <div className="bg-[#EAB308] text-white px-5 py-2.5 rounded-full text-[11px] font-bold self-end shadow-md">
                        10-25 Lakhs
                      </div>
                      <div className="mt-4 p-4 rounded-2xl border border-yellow-200 bg-[#FFF9E6]/50 animate-pulse">
                        <p className="text-[10px] text-yellow-700 font-bold text-center leading-relaxed">
                          Scanning 5,000+ verified architects in Gurugram for Smart Home within 10-25 lakhs...
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* --- SCREEN 3: Connect --- */}
                  <div className={`absolute inset-0 p-5 transition-all duration-700 ease-in-out ${activeStep === 2 ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10 pointer-events-none'}`}>
                     <div className="flex flex-col gap-4 h-full pt-4">
                        <div className="bg-[#EAB308] rounded-2xl p-1 shadow-lg relative overflow-hidden">
                          {/* Shimmer effect */}
                          <div className="absolute top-0 left-[-100%] w-1/2 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12 animate-[shimmer_2s_infinite]"></div>
                          
                          <div className="bg-white rounded-[14px] p-4 relative z-10">
                            <div className="flex justify-between items-center mb-3 border-b border-zinc-100 pb-3">
                              <span className="text-[9px] font-extrabold text-[#D97706] tracking-widest uppercase">⭐ Top Match Found</span>
                              <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider">Available</span>
                            </div>
                            
                            <div className="flex gap-3 items-center mb-4">
                              <div className="w-12 h-12 rounded-full bg-zinc-200 border-2 border-[#FFF9E6] overflow-hidden shrink-0">
                                <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=100&q=80" alt="Architect" className="w-full h-full object-cover"/>
                              </div>
                              <div>
                                <h4 className="font-extrabold text-sm text-zinc-900 leading-tight">Priya Sharma</h4>
                                <p className="text-[10px] text-zinc-500 font-medium">Studio NS • Delhi</p>
                                <div className="text-[10px] text-zinc-900 font-bold mt-0.5">⭐ 4.9 <span className="text-zinc-400 font-normal">(124 reviews)</span></div>
                              </div>
                            </div>

                            <div className="flex gap-2">
                              <button className="flex-1 bg-black text-white text-[10px] font-bold py-2.5 rounded-lg">Connect | FREE</button>
                              <button className="flex-1 bg-zinc-100 text-zinc-900 text-[10px] font-bold py-2.5 rounded-lg border border-zinc-200">View Profile</button>
                            </div>
                          </div>
                        </div>

                        <div className="mt-auto bg-zinc-900 text-white p-4 rounded-2xl flex items-center justify-between shadow-md">
                          <div className="flex -space-x-2">
                            <div className="w-6 h-6 rounded-full bg-zinc-500 border border-zinc-900"></div>
                            <div className="w-6 h-6 rounded-full bg-zinc-400 border border-zinc-900"></div>
                            <div className="w-6 h-6 rounded-full bg-zinc-300 border border-zinc-900"></div>
                          </div>
                          <span className="text-[10px] font-medium">+12 other matches</span>
                        </div>
                     </div>
                  </div>

                </div>
              </div>
            </div>
          </div>

          {/* BOTTOM / RIGHT: Scrollable Text Steps */}
          <div className="w-full md:w-1/2 flex flex-col relative z-10 pb-24 md:pb-0 -mt-10 md:mt-0">
            {STEPS.map((step, index) => (
              <div 
                key={step.id} 
                ref={(el) => { stepRefs.current[index] = el; }}
                className={`min-h-[60dvh] md:min-h-[80dvh] flex flex-col justify-center transition-all duration-700 ${activeStep === index ? 'opacity-100 scale-100' : 'opacity-30 md:opacity-40 scale-95'}`}
              >
                <div className={`p-6 sm:p-10 rounded-3xl transition-all duration-500 ${activeStep === index ? 'bg-white/95 md:bg-white backdrop-blur-md shadow-xl shadow-zinc-200/40 border border-zinc-100' : 'bg-transparent'}`}>
                  
                  {/* Step Badge */}
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#FFF9E6] text-[#D97706] font-extrabold flex items-center justify-center text-base sm:text-lg mb-4 sm:mb-6 border border-yellow-100 shadow-sm">
                    {step.id}
                  </div>
                  
                  {/* Text Content */}
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 mb-3 sm:mb-4 tracking-tight">
                    {step.title}
                  </h3>
                  <p className="text-base sm:text-lg text-zinc-600 leading-relaxed font-medium">
                    {step.desc}
                  </p>

                  {/* Optional App Store Buttons on final step */}
                  {step.showButtons && (
                    <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
                      <button className="flex items-center justify-center sm:justify-start gap-2 bg-[#111111] text-[#F1F1F1] px-5 py-2.5 rounded-xl hover:bg-black transition-colors hover:shadow-lg hover:-translate-y-0.5 duration-200 w-full sm:w-auto">
                        <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                          <path d="M17.05 13.9c-.03-2.6 2.1-3.8 2.2-3.9-1.2-1.8-3.1-2-3.8-2.1-1.6-.2-3.2.9-4 1-1-.1-2.4-1-3.6-1-1.6 0-3.1.9-4 2.4-1.7 3-1.4 7.6.3 10 1 1.4 2.1 3 3.6 2.9 1.5-.1 2-1 3.8-1s2.2 1 3.8 1c1.6.1 2.5-1.4 3.4-2.8.6-.8 1.1-1.7 1.4-2.6-.7-.2-1.8-1-1.9-2.8zM14.6 7.4c.8-1 1.4-2.4 1.2-3.8-1.2.1-2.7.8-3.5 1.8-.7.8-1.4 2.2-1.2 3.6 1.4.1 2.7-.6 3.5-1.6z"/>
                        </svg>
                        <div className="text-left">
                          <div className="text-[8px] uppercase tracking-wide opacity-80 leading-none">Download on the</div>
                          <div className="text-sm font-semibold leading-tight">App Store</div>
                        </div>
                      </button>
                      <button className="flex items-center justify-center sm:justify-start gap-2 bg-[#111111] text-[#F1F1F1] px-5 py-2.5 rounded-xl hover:bg-black transition-colors hover:shadow-lg hover:-translate-y-0.5 duration-200 w-full sm:w-auto">
                        <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                          <path d="M3.6 21.3L15.9 12 3.6 2.7C3.3 2.5 3 2.8 3 3.1v17.8c0 .3.3.6.6.4zm13.1-8.5l3.8-2.2c.4-.2.4-.8 0-1l-3.8-2.2-3.1 3.2 3.1 3.2zM4.6 3.5l10 5.8-2.5 2.6L4.6 3.5zm0 17l10-5.8-2.5-2.6-7.5 8.4z"/>
                        </svg>
                        <div className="text-left">
                          <div className="text-[8px] uppercase tracking-wide opacity-80 leading-none">GET IT ON</div>
                          <div className="text-sm font-semibold leading-tight">Google Play</div>
                        </div>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes shimmer {
          100% { left: 200%; }
        }
      `}</style>
    </section>
  );
}