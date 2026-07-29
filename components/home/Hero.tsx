"use client";

import { useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";

const IMAGES = [
  "https://res.cloudinary.com/dgeiv60mf/image/upload/v1785326342/Pexels_Photo_by_Ron_Lach1_uy1cpb.png",
  "https://res.cloudinary.com/dgeiv60mf/image/upload/v1785326342/Pexels_Photo_by_Ron_Lach-11_qb9u6d.png",
  "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=500&q=80",
  "https://res.cloudinary.com/dgeiv60mf/image/upload/v1785326143/Pexels_Photo_by_Alena_Darmel_v62ljo.png",
  "https://res.cloudinary.com/dgeiv60mf/image/upload/v1785326142/pexels-pavel-danilyuk-7937756.jpg_vaxn3u.jpg",
];

const STACK_ROTATIONS = [-26, -13, 0, 13, 26];
const ENTER_EASE = [0.22, 1, 0.36, 1] as const;

const SCROLL_ENTER = {
  top: { y: -160, duration: 2.4 },
  bottom: { y: 340, duration: 2.8, delay: 0.9 },
} as const;

function spreadOffset(index: number, step: number) {
  return (index - 2) * step;
}

function stackZIndex(index: number) {
  return 10 - Math.abs(index - 2);
}

function getSpreadStep(width: number) {
  if (width >= 768) return 210;
  return 170;
}

export default function Hero() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [spreadStep, setSpreadStep] = useState(170);

  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) setIsExpanded(true);
  }, [prefersReducedMotion]);

  useEffect(() => {
    const update = () => {
      setSpreadStep(getSpreadStep(window.innerWidth));
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const skipEnter = Boolean(prefersReducedMotion);

  // Mouse Tracking Function
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
  };

  return (
    <section className="relative flex flex-col items-center justify-center pt-32 md:pt-40 pb-20 px-4 sm:px-6 text-center overflow-hidden min-h-screen">

      <motion.div
        className="relative z-10 flex flex-col items-center w-full"
        initial={skipEnter ? false : "hidden"}
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: skipEnter ? 0 : 0.22,
              delayChildren: skipEnter ? 0 : 0.12,
            },
          },
        }}
      >
        {/* Top Badge */}
        <motion.div
          className="mb-4 rounded-full bg-[#FFF2D0]/90 dark:bg-yellow-900/30 backdrop-blur-xl px-5 py-2.5 text-sm font-medium text-[#6B3D00] dark:text-yellow-400 flex items-center gap-2 border border-yellow-200/80 dark:border-yellow-700/50 shadow-sm"
          variants={{
            hidden: { opacity: 0, y: SCROLL_ENTER.top.y },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: SCROLL_ENTER.top.duration, ease: ENTER_EASE },
            },
          }}
        >
          <span className="text-lg" aria-hidden>✨</span>
          <span>AI-powered architect matching</span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          className="mb-4 text-3xl font-black tracking-tight text-foreground sm:text-4xl md:text-5xl lg:text-[3.75rem] xl:text-[4.25rem] leading-[1.05] md:whitespace-nowrap"
          variants={{
            hidden: { opacity: 0, y: SCROLL_ENTER.top.y },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: SCROLL_ENTER.top.duration, ease: ENTER_EASE },
            },
          }}
        >
          Find Your{" "}
          <span
            onMouseMove={handleMouseMove}
            className="text-transparent bg-clip-text inline-block"
            style={{
              backgroundImage:
                "radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), #FACC15 0%, #EAB308 45%, #C99700 100%)",
            }}
          >
            Perfect Architect
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="max-w-2xl text-base sm:text-lg md:text-xl text-zinc-600 dark:text-zinc-400 mb-0 font-normal leading-relaxed px-2"
          variants={{
            hidden: { opacity: 0, y: SCROLL_ENTER.top.y },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: SCROLL_ENTER.top.duration, ease: ENTER_EASE },
            },
          }}
        >
          AI-matched. Direct connection. No middlemen. Keywee finds the right
          architect for your dream space in minutes.
        </motion.p>
      </motion.div>

      {/* Main Image Container */}
      <motion.div
        className="relative z-10 mt-6 sm:-mt-2 flex flex-col items-center w-full"
        initial={skipEnter ? false : { opacity: 0, y: SCROLL_ENTER.bottom.y }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: SCROLL_ENTER.bottom.duration,
          delay: skipEnter ? 0 : SCROLL_ENTER.bottom.delay,
          ease: ENTER_EASE,
        }}
        onAnimationComplete={() => {
          if (!skipEnter) setIsExpanded(true);
        }}
      >
        <div className="relative w-full max-w-6xl h-37.5 sm:h-55 md:h-65 mb-12 sm:mb-16 flex justify-center items-end">

          {/* MOBILE: Stock Market Ticker Reel */}
          <div
            className="sm:hidden absolute bottom-0 w-full overflow-hidden flex pb-4 pt-4"
            style={{
              maskImage: "linear-gradient(to right, transparent, black 5%, black 95%, transparent)",
              WebkitMaskImage: "linear-gradient(to right, transparent, black 5%, black 95%, transparent)",
            }}
          >
            <motion.div
              className="flex w-max"
              animate={isExpanded ? { x: ["0%", `-${100 / 3}%`] } : { x: "0%" }}
              transition={{ ease: "linear", duration: 18, repeat: Infinity }}
            >
              {[1, 2, 3].map((set) => (
                <div key={set} className="flex gap-3 pr-3 items-end">
                  {IMAGES.map((src, idx) => (
                    <div
                      key={idx}
                      className="relative overflow-hidden w-32.5 h-32.5 rounded-3xl border-[3px] border-white dark:border-zinc-800 bg-zinc-200 dark:bg-zinc-700 shrink-0 group cursor-pointer"
                    >
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-linear-to-br from-white/25 via-transparent to-transparent z-10 pointer-events-none" />
                      <img
                        src={src}
                        alt={`Architect inspiration ${idx + 1}`}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading={idx === 2 ? "eager" : "lazy"}
                      />
                    </div>
                  ))}
                </div>
              ))}
            </motion.div>
          </div>

          {/* DESKTOP: Spring Stack & Spread */}
          {IMAGES.map((src, idx) => (
            <motion.div
              key={src}
              className="hidden sm:block absolute bottom-0 left-1/2 -translate-x-1/2"
              style={{
                zIndex: stackZIndex(idx),
                willChange: "transform",
              }}
              animate={
                isExpanded
                  ? {
                    x: spreadOffset(idx, spreadStep),
                    y: 0,
                    scale: 1,
                    opacity: 1,
                    rotate: 0,
                  }
                  : {
                    x: 0,
                    y: 0,
                    scale: 1,
                    opacity: 1,
                    rotate: STACK_ROTATIONS[idx],
                  }
              }
              transition={{
                type: "spring",
                stiffness: 140,
                damping: 14,
                mass: 0.8,
                delay: isExpanded && !prefersReducedMotion ? idx * 0.06 : 0,
              }}
            >
              <div
                className="
                  group relative overflow-hidden
                  w-40 h-40 
                  md:w-50 md:h-50
                  rounded-[28px]
                  border-[3px] border-white dark:border-zinc-800
                  shadow-[0_20px_50px_rgba(0,0,0,0.14)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.4)]
                  bg-zinc-200 dark:bg-zinc-700
                  transition-transform duration-300
                  hover:-translate-y-2 hover:scale-[1.04]
                  cursor-pointer
                "
              >
                {/* Hover Glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-linear-to-br from-white/25 via-transparent to-transparent z-10 pointer-events-none" />

                {/* Image */}
                <img
                  src={src}
                  alt={`Architect inspiration ${idx + 1}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading={idx === 2 ? "eager" : "lazy"}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-5">
          {/* App Store */}
          <button
            type="button"
            onMouseMove={handleMouseMove}
            style={{
              transformOrigin: "var(--mouse-x, 50%) var(--mouse-y, 50%)",
            }}
            className="group relative overflow-hidden flex items-center gap-4 rounded-2xl bg-[#111111] dark:bg-zinc-800 border border-transparent dark:border-zinc-700 px-7 py-4 text-[#F1F1F1] transition-all duration-300 hover:text-white dark:hover:border-zinc-600 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(250,204,21,0.25)] active:scale-[0.95] active:translate-y-0"
          >
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), #FACC15 0%, #EAB308 45%, #C99700 100%)",
              }}
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/3/31/Apple_logo_white.svg"
              alt="Apple"
              className="relative z-10 w-7 h-8 transition-transform duration-300 group-hover:scale-110"
            />
            <div className="relative z-10 text-left">
              <div className="text-[10px] uppercase tracking-wide opacity-70 leading-tight">
                Download on the
              </div>
              <div className="text-xl font-semibold leading-tight mt-0.5">
                App Store
              </div>
            </div>
          </button>

          {/* Google Play */}
          <button
            type="button"
            onMouseMove={handleMouseMove}
            style={{
              transformOrigin: "var(--mouse-x, 50%) var(--mouse-y, 50%)",
            }}
            className="group relative overflow-hidden flex items-center gap-4 rounded-2xl bg-[#111111] dark:bg-zinc-800 border border-transparent dark:border-zinc-700 px-7 py-4 text-[#F1F1F1] transition-all duration-300 hover:text-white dark:hover:border-zinc-600 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(250,204,21,0.25)] active:scale-[0.95] active:translate-y-0"
          >
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), #FACC15 0%, #EAB308 45%, #C99700 100%)",
              }}
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/5/55/Google_Play_2016_icon.svg"
              alt="Google Play"
              className="relative z-10 w-7 h-7 transition-transform duration-300 group-hover:scale-110"
            />
            <div className="relative z-10 text-left">
              <div className="text-[10px] uppercase tracking-wide opacity-70 leading-tight">
                GET IT ON
              </div>
              <div className="text-xl font-semibold leading-tight mt-0.5">
                Google Play
              </div>
            </div>
          </button>
        </div>
      </motion.div>
    </section>
  );
}