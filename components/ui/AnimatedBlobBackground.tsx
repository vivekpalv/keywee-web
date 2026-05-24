'use client';

import { motion, useReducedMotion } from "framer-motion";

export default function AnimatedBlobBackground() {
  const prefersReducedMotion = useReducedMotion();
  const blobDuration = prefersReducedMotion ? 0 : 24;

  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden
    >
      <motion.div
        className="absolute w-[min(420px,55vw)] h-[min(420px,55vw)] rounded-full bg-[#FFD54F] blur-[110px] opacity-[0.42]"
        style={{ top: "2%", left: "-8%" }}
        animate={
          prefersReducedMotion
            ? undefined
            : {
                x: ["0%", "18vw", "-12vw", "22vw", "0%"],
                y: ["0%", "-12vh", "18vh", "8vh", "0%"],
                scale: [1, 1.12, 0.92, 1.08, 1],
              }
        }
        transition={{
          duration: blobDuration,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute w-[min(480px,60vw)] h-[min(480px,60vw)] rounded-full bg-[#FFC107] blur-[120px] opacity-[0.38]"
        style={{ top: "2%", right: "-12%" }}
        animate={
          prefersReducedMotion
            ? undefined
            : {
                x: ["0%", "-20vw", "14vw", "-16vw", "0%"],
                y: ["0%", "-12vh", "18vh", "8vh", "0%"],
                scale: [1, 0.9, 1.14, 0.95, 1],
              }
        }
        transition={{
          duration: blobDuration,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />
      <motion.div
        className="absolute w-[min(400px,52vw)] h-[min(400px,52vw)] rounded-full bg-[#FBBF24] blur-[115px] opacity-[0.35]"
        style={{ bottom: "8%", left: "6%" }}
        animate={
          prefersReducedMotion
            ? undefined
            : {
                x: ["0%", "24vw", "-18vw", "10vw", "0%"],
                y: ["0%", "-18vh", "12vh", "-22vh", "0%"],
                scale: [1, 1.06, 0.88, 1.1, 1],
              }
        }
        transition={{
          duration: blobDuration,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 4,
        }}
      />
      <motion.div
        className="absolute w-[min(440px,58vw)] h-[min(440px,58vw)] rounded-full bg-[#F59E0B] blur-[125px] opacity-[0.32]"
        style={{ bottom: "-6%", right: "12%" }}
        animate={
          prefersReducedMotion
            ? undefined
            : {
                x: ["0%", "-14vw", "20vw", "-22vw", "0%"],
                y: ["0%", "20vh", "-14vh", "-8vh", "0%"],
                scale: [1, 0.94, 1.12, 0.9, 1],
              }
        }
        transition={{
          duration: blobDuration,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 6,
        }}
      />
    </div>
  );
}
