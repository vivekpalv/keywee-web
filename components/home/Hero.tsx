'use client';

import { useState, useEffect } from "react";

export default function Hero() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsMounted(true), 150);

    return () => clearTimeout(timer);
  }, []);

  const images = [
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1600566753086-00f18ef6b780?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=400&q=80",
  ];

  const getFanStyles = (index: number) => {
    if (!isMounted) {
      return "opacity-0 translate-y-24 rotate-0 scale-90";
    }

    switch (index) {
      case 0:
        return "opacity-100 -translate-x-[140%] sm:-translate-x-[160%] translate-y-12 sm:translate-y-16 -rotate-12 z-0";

      case 1:
        return "opacity-100 -translate-x-[70%] sm:-translate-x-[80%] translate-y-4 sm:translate-y-6 -rotate-6 z-10";

      case 2:
        return "opacity-100 translate-x-0 translate-y-0 rotate-0 z-20 scale-105 sm:scale-110";

      case 3:
        return "opacity-100 translate-x-[70%] sm:translate-x-[80%] translate-y-4 sm:translate-y-6 rotate-6 z-10";

      case 4:
        return "opacity-100 translate-x-[140%] sm:translate-x-[160%] translate-y-12 sm:translate-y-16 rotate-12 z-0";

      default:
        return "";
    }
  };

  return (
    <section className="relative flex flex-col items-center justify-center pt-20 pb-24 px-6 text-center bg-[#FBFAF7] overflow-hidden min-h-[100vh]">
      {/* Ambient Background */}
      <div className="absolute top-[5%] left-[-5%] w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] bg-[#FFD700] rounded-full blur-[120px] opacity-40 animate-blob1 pointer-events-none" />

      <div className="absolute top-[30%] right-[-10%] w-[350px] h-[350px] sm:w-[500px] sm:h-[500px] bg-[#FFC107] rounded-full blur-[140px] opacity-35 animate-blob2 pointer-events-none" />

      <div className="absolute bottom-[5%] left-[10%] w-[300px] h-[300px] sm:w-[450px] sm:h-[450px] bg-[#F59E0B] rounded-full blur-[130px] opacity-30 animate-blob3 pointer-events-none" />

      <div className="absolute bottom-[-10%] right-[20%] w-[400px] h-[400px] bg-[#FBBF24] rounded-full blur-[150px] opacity-35 animate-blob4 pointer-events-none" />

      {/* Badge */}
      <div className="relative z-10 mb-6 rounded-full bg-[#FFF2D0]/90 backdrop-blur-xl px-5 py-2.5 text-sm font-medium text-[#6B3D00] flex items-center gap-2 border border-yellow-200 shadow-lg animate-fade-in-up">
        <span className="text-lg">✨</span>

        <span>AI-powered architect matching</span>
      </div>

      {/* Heading */}
      <h1 className="relative z-10 mb-6 max-w-5xl text-5xl font-black tracking-tight text-[#111111] sm:text-6xl md:text-7xl lg:text-8xl animate-fade-in-up delay-100 leading-none">
        Find Your{" "}
        <span className="bg-gradient-to-r from-[#DAA700] via-[#FACC15] to-[#EAB308] bg-clip-text text-transparent">
          Perfect Architect
        </span>
      </h1>

      {/* Subtext */}
      <p className="relative z-10 max-w-2xl text-lg md:text-xl text-[#68635C] mb-20 font-normal leading-relaxed animate-fade-in-up delay-200">
        AI-matched. Direct connection. No middlemen.
        Keywee finds the right architect for your dream
        space in minutes.
      </p>

      {/* Fan Gallery */}
      <div className="relative z-10 w-full max-w-5xl h-[240px] sm:h-[340px] mb-20 flex justify-center">
        {images.map((src, idx) => (
          <div
            key={idx}
            className={`
              absolute
              top-0
              transition-all
              duration-[1400ms]
              ease-[cubic-bezier(0.22,1,0.36,1)]
              origin-bottom
              ${getFanStyles(idx)}
            `}
            style={{
              transitionDelay: `${idx * 80}ms`,
            }}
          >
            <div
              className="
                group
                relative
                overflow-hidden
                w-[140px]
                h-[190px]
                sm:w-[220px]
                sm:h-[300px]
                rounded-[28px]
                border-4
                border-white
                shadow-[0_30px_80px_rgba(0,0,0,0.18)]
                bg-zinc-200
                transition-all
                duration-500
                hover:-translate-y-6
                hover:scale-[1.12]
                hover:rotate-0
                cursor-pointer
              "
            >
              {/* Shine */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-700 bg-gradient-to-br from-white/20 via-transparent to-transparent z-10" />

              {/* Image */}
              <img
                src={src}
                alt={`Architect inspiration ${idx + 1}`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Buttons */}
      <div className="relative z-10 flex flex-col sm:flex-row items-center gap-5 animate-fade-in-up delay-500">
        {/* App Store */}
        <button
          className="
            group
            relative
            overflow-hidden
            flex
            items-center
            gap-4
            rounded-2xl
            bg-[#111111]
            px-7
            py-4
            text-[#F1F1F1]
            transition-all
            duration-300
            hover:-translate-y-2
            hover:scale-[1.03]
            hover:shadow-[0_25px_60px_rgba(0,0,0,0.25)]
            active:scale-[0.97]
            animate-[float_4s_ease-in-out_infinite]
          "
        >
          {/* Glow */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-r from-yellow-400/10 via-white/5 to-yellow-400/10" />

          {/* Shine */}
          <div className="absolute top-0 left-[-120%] h-full w-[60%] bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 group-hover:animate-[shine_1s_ease]" />

          {/* Pulse Dot */}
          <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />

          {/* Icon */}
          <svg
            className="relative w-8 h-8 fill-current transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6"
            viewBox="0 0 24 24"
          >
            <path d="M17.05 13.9c-.03-2.6 2.1-3.8 2.2-3.9-1.2-1.8-3.1-2-3.8-2.1-1.6-.2-3.2.9-4 1-1-.1-2.4-1-3.6-1-1.6 0-3.1.9-4 2.4-1.7 3-1.4 7.6.3 10 1 1.4 2.1 3 3.6 2.9 1.5-.1 2-1 3.8-1s2.2 1 3.8 1c1.6.1 2.5-1.4 3.4-2.8.6-.8 1.1-1.7 1.4-2.6-.7-.2-1.8-1-1.9-2.8zM14.6 7.4c.8-1 1.4-2.4 1.2-3.8-1.2.1-2.7.8-3.5 1.8-.7.8-1.4 2.2-1.2 3.6 1.4.1 2.7-.6 3.5-1.6z" />
          </svg>

          {/* Text */}
          <div className="relative text-left">
            <div className="text-[10px] uppercase tracking-wide opacity-70 leading-tight">
              Download on the
            </div>

            <div className="text-xl font-semibold leading-tight mt-0.5 transition-transform duration-300 group-hover:translate-x-1">
              App Store
            </div>
          </div>
        </button>

        {/* Play Store */}
        <button
          className="
            group
            relative
            overflow-hidden
            flex
            items-center
            gap-4
            rounded-2xl
            bg-[#111111]
            px-7
            py-4
            text-[#F1F1F1]
            transition-all
            duration-300
            hover:-translate-y-2
            hover:scale-[1.03]
            hover:shadow-[0_25px_60px_rgba(0,0,0,0.25)]
            active:scale-[0.97]
            animate-[float_4s_ease-in-out_infinite_1s]
          "
        >
          {/* Glow */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-r from-yellow-400/10 via-white/5 to-yellow-400/10" />

          {/* Shine */}
          <div className="absolute top-0 left-[-120%] h-full w-[60%] bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 group-hover:animate-[shine_1s_ease]" />

          {/* Pulse Dot */}
          <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />

          {/* Icon */}
          <svg
            className="relative w-8 h-8 fill-current transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6"
            viewBox="0 0 24 24"
          >
            <path d="M3.6 21.3L15.9 12 3.6 2.7C3.3 2.5 3 2.8 3 3.1v17.8c0 .3.3.6.6.4zm13.1-8.5l3.8-2.2c.4-.2.4-.8 0-1l-3.8-2.2-3.1 3.2 3.1 3.2zM4.6 3.5l10 5.8-2.5 2.6L4.6 3.5zm0 17l10-5.8-2.5-2.6-7.5 8.4z" />
          </svg>

          {/* Text */}
          <div className="relative text-left">
            <div className="text-[10px] uppercase tracking-wide opacity-70 leading-tight">
              GET IT ON
            </div>

            <div className="text-xl font-semibold leading-tight mt-0.5 transition-transform duration-300 group-hover:translate-x-1">
              Google Play
            </div>
          </div>
        </button>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes blob1 {
          0% {
            transform: translate(0px, 0px) scale(1);
          }

          33% {
            transform: translate(120px, -80px) scale(1.1);
          }

          66% {
            transform: translate(-40px, 120px) scale(0.95);
          }

          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }

        @keyframes blob2 {
          0% {
            transform: translate(0px, 0px) scale(1);
          }

          33% {
            transform: translate(-140px, 100px) scale(1.15);
          }

          66% {
            transform: translate(80px, -110px) scale(0.85);
          }

          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }

        @keyframes blob3 {
          0% {
            transform: translate(0px, 0px) scale(1);
          }

          33% {
            transform: translate(110px, -130px) scale(0.9);
          }

          66% {
            transform: translate(-130px, 90px) scale(1.1);
          }

          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }

        @keyframes blob4 {
          0% {
            transform: translate(0px, 0px) scale(1);
          }

          33% {
            transform: translate(-160px, -90px) scale(1.05);
          }

          66% {
            transform: translate(100px, 140px) scale(0.95);
          }

          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }

        @keyframes shine {
          100% {
            left: 140%;
          }
        }

        @keyframes float {
          0% {
            transform: translateY(0px);
          }

          50% {
            transform: translateY(-4px);
          }

          100% {
            transform: translateY(0px);
          }
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          opacity: 0;
        }

        .animate-blob1 {
          animation: blob1 14s infinite alternate ease-in-out;
        }

        .animate-blob2 {
          animation: blob2 17s infinite alternate ease-in-out;
        }

        .animate-blob3 {
          animation: blob3 19s infinite alternate ease-in-out;
        }

        .animate-blob4 {
          animation: blob4 22s infinite alternate ease-in-out;
        }

        .delay-100 {
          animation-delay: 100ms;
        }

        .delay-200 {
          animation-delay: 200ms;
        }

        .delay-500 {
          animation-delay: 500ms;
        }
      `}</style>
    </section>
  );
}