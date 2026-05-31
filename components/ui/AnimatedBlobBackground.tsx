// "use client";

// import { motion, useReducedMotion } from "framer-motion";

// export default function AnimatedBlobBackground() {
//   const prefersReducedMotion = useReducedMotion();

//   const blobDuration = prefersReducedMotion ? 0 : 32;

//   return (
//     <div
//       className="pointer-events-none absolute inset-0 overflow-hidden"
//       aria-hidden
//     >

//       {/* Blob 1 */}
//       <motion.div
//         className="absolute w-[min(420px,55vw)] h-[min(420px,55vw)] rounded-full bg-[#FFD54F] blur-[110px] opacity-[0.42]"
//         style={{
//           top: "2%",
//           left: "-8%",
//         }}
//         animate={
//           prefersReducedMotion
//             ? undefined
//             : {
//                 x: ["0vw", "18vw", "-12vw", "22vw", "0vw"],
//                 y: ["0vh", "-12vh", "18vh", "8vh", "0vh"],
//                 scale: [1, 1.12, 0.92, 1.08, 1],
//               }
//         }
//         transition={{
//           duration: blobDuration,
//           repeat: Infinity,
//           ease: "linear",
//         }}
//       />

//       {/* Blob 2 */}
//       <motion.div
//         className="absolute w-[min(480px,60vw)] h-[min(480px,60vw)] rounded-full bg-[#FFC107] blur-[120px] opacity-[0.38]"
//         style={{
//           top: "2%",
//           right: "-12%",
//         }}
//         animate={
//           prefersReducedMotion
//             ? undefined
//             : {
//                 x: ["0vw", "-20vw", "14vw", "-16vw", "0vw"],
//                 y: ["0vh", "-12vh", "18vh", "8vh", "0vh"],
//                 scale: [1, 0.9, 1.14, 0.95, 1],
//               }
//         }
//         transition={{
//           duration: blobDuration,
//           repeat: Infinity,
//           ease: "linear",
//           delay: 2,
//         }}
//       />

//       {/* Blob 3 */}
//       <motion.div
//         className="absolute w-[min(400px,52vw)] h-[min(400px,52vw)] rounded-full bg-[#FBBF24] blur-[115px] opacity-[0.35]"
//         style={{
//           bottom: "8%",
//           left: "6%",
//         }}
//         animate={
//           prefersReducedMotion
//             ? undefined
//             : {
//                 x: ["0vw", "24vw", "-18vw", "10vw", "0vw"],
//                 y: ["0vh", "-18vh", "12vh", "-22vh", "0vh"],
//                 scale: [1, 1.06, 0.88, 1.1, 1],
//               }
//         }
//         transition={{
//           duration: blobDuration,
//           repeat: Infinity,
//           ease: "linear",
//           delay: 4,
//         }}
//       />

//       {/* Blob 4 */}
//       <motion.div
//         className="absolute w-[min(440px,58vw)] h-[min(440px,58vw)] rounded-full bg-[#F59E0B] blur-[125px] opacity-[0.32]"
//         style={{
//           bottom: "-6%",
//           right: "12%",
//         }}
//         animate={
//           prefersReducedMotion
//             ? undefined
//             : {
//                 x: ["0vw", "-14vw", "20vw", "-22vw", "0vw"],
//                 y: ["0vh", "20vh", "-14vh", "-8vh", "0vh"],
//                 scale: [1, 0.94, 1.12, 0.9, 1],
//               }
//         }
//         transition={{
//           duration: blobDuration,
//           repeat: Infinity,
//           ease: "linear",
//           delay: 6,
//         }}
//       />
//     </div>
//   );
// }

"use client";

import { motion, useReducedMotion } from "framer-motion";

export default function AnimatedBlobBackground() {
  const prefersReducedMotion = useReducedMotion();

  const blobDuration = prefersReducedMotion ? 0 : 32;

  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden
    >

      {/* Blob 1 */}
      <motion.div
        className="absolute w-[min(420px,55vw)] h-[min(420px,55vw)] rounded-full bg-[#FFD54F] blur-[110px] opacity-[0.42] dark:opacity-[0.15] transition-opacity duration-500"
        style={{
          top: "2%",
          left: "-8%",
        }}
        animate={
          prefersReducedMotion
            ? undefined
            : {
                x: ["0vw", "18vw", "-12vw", "22vw", "0vw"],
                y: ["0vh", "-12vh", "18vh", "8vh", "0vh"],
                scale: [1, 1.12, 0.92, 1.08, 1],
              }
        }
        transition={{
          duration: blobDuration,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Blob 2 */}
      <motion.div
        className="absolute w-[min(480px,60vw)] h-[min(480px,60vw)] rounded-full bg-[#FFC107] blur-[120px] opacity-[0.38] dark:opacity-[0.12] transition-opacity duration-500"
        style={{
          top: "2%",
          right: "-12%",
        }}
        animate={
          prefersReducedMotion
            ? undefined
            : {
                x: ["0vw", "-20vw", "14vw", "-16vw", "0vw"],
                y: ["0vh", "-12vh", "18vh", "8vh", "0vh"],
                scale: [1, 0.9, 1.14, 0.95, 1],
              }
        }
        transition={{
          duration: blobDuration,
          repeat: Infinity,
          ease: "linear",
          delay: 2,
        }}
      />

      {/* Blob 3 */}
      <motion.div
        className="absolute w-[min(400px,52vw)] h-[min(400px,52vw)] rounded-full bg-[#FBBF24] blur-[115px] opacity-[0.35] dark:opacity-[0.10] transition-opacity duration-500"
        style={{
          bottom: "8%",
          left: "6%",
        }}
        animate={
          prefersReducedMotion
            ? undefined
            : {
                x: ["0vw", "24vw", "-18vw", "10vw", "0vw"],
                y: ["0vh", "-18vh", "12vh", "-22vh", "0vh"],
                scale: [1, 1.06, 0.88, 1.1, 1],
              }
        }
        transition={{
          duration: blobDuration,
          repeat: Infinity,
          ease: "linear",
          delay: 4,
        }}
      />

      {/* Blob 4 */}
      <motion.div
        className="absolute w-[min(440px,58vw)] h-[min(440px,58vw)] rounded-full bg-[#F59E0B] blur-[125px] opacity-[0.32] dark:opacity-[0.08] transition-opacity duration-500"
        style={{
          bottom: "-6%",
          right: "12%",
        }}
        animate={
          prefersReducedMotion
            ? undefined
            : {
                x: ["0vw", "-14vw", "20vw", "-22vw", "0vw"],
                y: ["0vh", "20vh", "-14vh", "-8vh", "0vh"],
                scale: [1, 0.94, 1.12, 0.9, 1],
              }
        }
        transition={{
          duration: blobDuration,
          repeat: Infinity,
          ease: "linear",
          delay: 6,
        }}
      />
    </div>
  );
}