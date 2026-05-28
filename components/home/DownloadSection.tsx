"use client";

import React from "react";
import { motion } from "framer-motion";

export default function DownloadSection() {
  // Mouse Tracking Function
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();

    e.currentTarget.style.setProperty(
      "--mouse-x",
      `${e.clientX - rect.left}px`
    );

    e.currentTarget.style.setProperty(
      "--mouse-y",
      `${e.clientY - rect.top}px`
    );
  };

  return (
    <section className="relative -mt-12 pt-20 pb-28 px-6 w-full flex items-center justify-center min-h-[400px] z-10">
      {/* Content Container */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="relative z-10 flex flex-col items-center text-center max-w-3xl mx-auto"
      >
        {/* Headline */}
        <h2 className="text-[28px] sm:text-3xl md:text-4xl font-bold text-[#18181B] tracking-tight mb-4">
          Download <span className="text-[#EAB308]">Key</span>wee Meet your
          architect.
        </h2>

        {/* Subheadline */}
        <p className="text-[#52525B] text-base sm:text-lg mb-8 font-medium">
          Free to download. AI-matched in minutes. Available on iOS and Android.
        </p>

        {/* Store Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          {/* App Store Button */}
          <button
            type="button"
            onMouseMove={handleMouseMove}
            style={{
              transformOrigin:
                "var(--mouse-x, 50%) var(--mouse-y, 50%)",
            }}
            className="group relative overflow-hidden flex items-center gap-3 bg-[#111111] rounded-xl px-5 py-3 text-[#F1F1F1] w-[210px] justify-center transition-all duration-300 hover:text-[#111111] hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(250,204,21,0.25)] active:scale-[0.95] active:translate-y-0"
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

            <div className="relative z-10 text-left flex flex-col justify-center">
              <span className="text-[10px] leading-tight opacity-70">
                Download on the
              </span>

              <span className="text-xl font-semibold leading-tight mt-0.5">
                App Store
              </span>
            </div>
          </button>

          {/* Google Play Button */}
          <button
            type="button"
            onMouseMove={handleMouseMove}
            style={{
              transformOrigin:
                "var(--mouse-x, 50%) var(--mouse-y, 50%)",
            }}
            className="group relative overflow-hidden flex items-center gap-3 bg-[#111111] rounded-xl px-5 py-3 text-[#F1F1F1] w-[210px] justify-center transition-all duration-300 hover:text-[#111111] hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(250,204,21,0.25)] active:scale-[0.95] active:translate-y-0"
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

            <div className="relative z-10 text-left flex flex-col justify-center">
              <span className="text-[10px] leading-tight opacity-70">
                GET IT ON
              </span>

              <span className="text-xl font-semibold leading-tight mt-0.5">
                Google Play
              </span>
            </div>
          </button>
        </div>
      </motion.div>
    </section>
  );
}