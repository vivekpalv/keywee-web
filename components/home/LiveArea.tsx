"use client";

import { Clock3, MapPin, ArrowRight } from "lucide-react";

const cities = [
  { name: "India", active: true },
  { name: "Dubai", active: false },
  { name: "Europe", active: false },
  { name: "Russia", active: false },
];

export default function LiveArea() {
  return (
    <section className="relative overflow-hidden px-4 sm:px-6 py-10 md:py-16 text-center">
      <div className="relative mx-auto max-w-7xl">

        {/* Heading */}
        <div className="mb-10 md:mb-14">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-foreground leading-tight">
            Where <span className="text-[#EAB308]">Keywee</span> is Live
          </h2>
          <p className="mt-3 md:mt-4 text-zinc-500 dark:text-zinc-400 text-sm sm:text-base md:text-xl font-medium max-w-xs sm:max-w-none mx-auto">
            Starting in India. Expanding to your Country.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5">
          {cities.map((city) => (
            <div
              key={city.name}
              className={`group relative overflow-hidden rounded-[20px] md:rounded-[26px] border p-3 md:p-4 text-left cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:scale-[1.01] ${city.active
                  ? "border-[#EAB308] dark:border-yellow-600 bg-[#FFF4CC] dark:bg-yellow-900/20 shadow-[0_16px_40px_rgba(234,179,8,0.16)] dark:shadow-[0_16px_40px_rgba(234,179,8,0.05)]"
                  : "border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-zinc-300 dark:hover:border-zinc-700 shadow-[0_12px_40px_rgba(0,0,0,0.05)] dark:shadow-none"
                }`}
            >
              {/* Active Glow */}
              {city.active && (
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-200/60 dark:from-yellow-600/20 via-transparent to-transparent pointer-events-none" />
              )}

              {/* Hover Shine */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-700 bg-gradient-to-r from-transparent via-white/40 dark:via-white/5 to-transparent -translate-x-full group-hover:translate-x-full" />

              <div className="relative flex items-center justify-between gap-3 md:gap-4">

                {/* Left Side */}
                <div className="flex items-center gap-3 md:gap-4">

                  {/* Icon */}
                  <div
                    className={`flex h-12 w-12 md:h-[58px] md:w-[58px] items-center justify-center rounded-2xl md:rounded-[18px] shrink-0 transition-all duration-300 ${city.active
                        ? "bg-[#DDA700] dark:bg-yellow-600 text-white shadow-md"
                        : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
                      }`}
                  >
                    {city.active ? (
                      <MapPin className="h-6 w-6 md:h-7 md:w-7" strokeWidth={2.2} />
                    ) : (
                      <Clock3 className="h-6 w-6 md:h-7 md:w-7" strokeWidth={2.2} />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex flex-col">
                    <h6 className="text-lg md:text-[17px] leading-none font-semibold tracking-tight text-foreground">
                      {city.name}
                    </h6>
                    <p
                      className={`mt-1.5 md:mt-2 text-xs md:text-[16px] leading-none font-medium ${city.active
                          ? "text-zinc-800 dark:text-zinc-300"
                          : "text-zinc-500 dark:text-zinc-400"
                        }`}
                    >
                      {city.active ? "Available now" : "Coming soon"}
                    </p>
                  </div>
                </div>

                {/* Live Dot */}
                {city.active && (
                  <div className="relative flex items-center justify-center mr-1 md:mr-2">
                    {/* Ping Animation */}
                    <span className="absolute inline-flex h-3 w-3 md:h-4 md:w-4 rounded-full bg-[#EAB308] opacity-40 animate-ping" />
                    {/* Solid Dot */}
                    <span className="relative inline-flex h-2.5 w-2.5 md:h-3 md:w-3 rounded-full bg-[#DDA700] dark:bg-yellow-400" />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-8 md:mt-12">
          <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-2 sm:gap-3 text-lg sm:text-xl md:text-xl font-semibold tracking-tight leading-tight">

            <div className="flex items-center gap-2">
              <span className="text-zinc-500 dark:text-zinc-400">Want</span>
              <span className="text-[#EAB308]">Keywee</span>
              <span className="text-zinc-500 dark:text-zinc-400">in your country?</span>
            </div>

            <button className="group inline-flex items-center gap-1 text-xs md:text-base font-medium text-[#EAB308] underline underline-offset-4 hover:text-yellow-600 dark:hover:text-yellow-500 transition-all duration-300">
              Join the waitlist
              <ArrowRight className="h-3.5 w-3.5 md:h-4 md:w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>

          </div>
        </div>

      </div>
    </section>
  );
}