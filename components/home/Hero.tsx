'use client';

import { useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";

const IMAGES = [
  "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=500&q=80",
  "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=500&q=80",
  "https://images.unsplash.com/photo-1503389152951-9c3d1a41e2af?auto=format&fit=crop&w=500&q=80",
  "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=500&q=80",
  "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=500&q=80",
];

/** Rotation (deg) for each card in the centered stack — fanned deck look. */
const STACK_ROTATIONS = [-26, -13, 0, 13, 26];

const ENTER_EASE = [0.22, 1, 0.36, 1] as const;
const SPREAD_EASE = [0.22, 1, 0.36, 1] as const;

/** Top copy slides down from above navbar; cards rise from below. */
const SCROLL_ENTER = {
  top: { y: -160, duration: 2.4 },
  bottom: { y: 340, duration: 2.8, delay: 0.9 },
} as const;

/** Horizontal offset from center for each card after spread (px at md breakpoint). */
function spreadOffset(index: number, step: number) {
  return (index - 2) * step;
}

function stackZIndex(index: number) {
  return 10 - Math.abs(index - 2);
}

function getSpreadStep(width: number) {
  if (width >= 768) return 168;
  if (width >= 640) return 132;
  return 76;
}

export default function Hero() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [spreadStep, setSpreadStep] = useState(132);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) setIsExpanded(true);
  }, [prefersReducedMotion]);

  useEffect(() => {
    const update = () => setSpreadStep(getSpreadStep(window.innerWidth));
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const spreadDuration = prefersReducedMotion ? 0 : 0.85;
  const skipEnter = Boolean(prefersReducedMotion);

  return (
    <section className="relative flex flex-col items-center justify-center pt-12 pb-20 px-4 sm:px-6 text-center overflow-hidden min-h-[calc(100vh-88px)]">
      {/* Top copy — slow scroll down from above navbar */}
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
        <motion.div
          className="mb-4 rounded-full bg-[#FFF2D0]/90 backdrop-blur-xl px-5 py-2.5 text-sm font-medium text-[#6B3D00] flex items-center gap-2 border border-yellow-200/80 shadow-sm"
          variants={{
            hidden: { opacity: 0, y: SCROLL_ENTER.top.y },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: SCROLL_ENTER.top.duration, ease: ENTER_EASE },
            },
          }}
        >
          <span className="text-lg" aria-hidden>
            ✨
          </span>
          <span>AI-powered architect matching</span>
        </motion.div>

        <motion.h1
          className="mb-4 text-3xl font-black tracking-tight text-[#111111] sm:text-4xl md:text-5xl lg:text-[3.75rem] xl:text-[4.25rem] leading-[1.05] md:whitespace-nowrap"
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
          <span className="bg-gradient-to-r from-[#C99700] via-[#EAB308] to-[#FACC15] bg-clip-text text-transparent">
            Perfect Architect
          </span>
        </motion.h1>

        <motion.p
          className="max-w-2xl text-base sm:text-lg md:text-xl text-[#68635C] mb-0 font-normal leading-relaxed px-2"
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

      {/* Cards + store buttons — slow scroll up from below */}
      <motion.div
        className="relative z-10 -mt-4 sm:-mt-6 flex flex-col items-center w-full"
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
        {/* Image gallery — fanned stack at center, then spread into a flat row */}
        <div className="relative w-full max-w-6xl h-[200px] sm:h-[280px] md:h-[320px] mb-14 sm:mb-16 flex justify-center items-end">
          {IMAGES.map((src, idx) => (
            <motion.div
              key={src}
              className="absolute bottom-0 left-1/2 -translate-x-1/2"
              style={{ zIndex: isExpanded ? idx : stackZIndex(idx) }}
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
                duration: spreadDuration,
                delay: isExpanded && !prefersReducedMotion ? idx * 0.05 : 0,
                ease: SPREAD_EASE,
              }}
            >
              <div
                className="
                group relative overflow-hidden
                w-[120px] h-[168px]
                sm:w-[148px] sm:h-[208px]
                md:w-[160px] md:h-[224px]
                rounded-[22px] sm:rounded-[26px]
                border-[3px] border-white
                shadow-[0_20px_50px_rgba(0,0,0,0.14)]
                bg-zinc-200
                transition-transform duration-300
                hover:-translate-y-2 hover:scale-[1.04]
                cursor-pointer
              "
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-br from-white/25 via-transparent to-transparent z-10 pointer-events-none" />
                <img
                  src={src}
                  alt={`Architect inspiration ${idx + 1}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* App store buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-5">
          <button
            type="button"
            className="group relative overflow-hidden flex items-center gap-4 rounded-2xl bg-[#111111] px-7 py-4 text-[#F1F1F1] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(0,0,0,0.22)] active:scale-[0.98]"
          >
            <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24" aria-hidden>
              <path d="M17.05 13.9c-.03-2.6 2.1-3.8 2.2-3.9-1.2-1.8-3.1-2-3.8-2.1-1.6-.2-3.2.9-4 1-1-.1-2.4-1-3.6-1-1.6 0-3.1.9-4 2.4-1.7 3-1.4 7.6.3 10 1 1.4 2.1 3 3.6 2.9 1.5-.1 2-1 3.8-1s2.2 1 3.8 1c1.6.1 2.5-1.4 3.4-2.8.6-.8 1.1-1.7 1.4-2.6-.7-.2-1.8-1-1.9-2.8zM14.6 7.4c.8-1 1.4-2.4 1.2-3.8-1.2.1-2.7.8-3.5 1.8-.7.8-1.4 2.2-1.2 3.6 1.4.1 2.7-.6 3.5-1.6z" />
            </svg>
            <div className="text-left">
              <div className="text-[10px] uppercase tracking-wide opacity-70 leading-tight">
                Download on the
              </div>
              <div className="text-xl font-semibold leading-tight mt-0.5">
                App Store
              </div>
            </div>
          </button>

          <button
            type="button"
            className="group relative overflow-hidden flex items-center gap-4 rounded-2xl bg-[#111111] px-7 py-4 text-[#F1F1F1] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(0,0,0,0.22)] active:scale-[0.98]"
          >
            <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24" aria-hidden>
              <path d="M3.6 21.3L15.9 12 3.6 2.7C3.3 2.5 3 2.8 3 3.1v17.8c0 .3.3.6.6.4zm13.1-8.5l3.8-2.2c.4-.2.4-.8 0-1l-3.8-2.2-3.1 3.2 3.1 3.2zM4.6 3.5l10 5.8-2.5 2.6L4.6 3.5zm0 17l10-5.8-2.5-2.6-7.5 8.4z" />
            </svg>
            <div className="text-left">
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
