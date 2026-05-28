"use client";

import { Clock3, MapPin, ArrowRight } from "lucide-react";

const cities = [
  { name: "Gurugram", active: true },
  { name: "Delhi", active: false },
  { name: "Noida", active: false },
  { name: "Mumbai", active: false },
  { name: "Bangalore", active: false },
  { name: "Hyderabad", active: false },
  { name: "Pune", active: false },
  { name: "Chennai", active: false },
];

export default function LiveArea() {
  return (
    <section className="relative overflow-hidden px-6 py-6 md:py-10 text-center">
      <div className="relative mx-auto max-w-7xl">
        
        {/* Heading */}
        <div className="mb-14">
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-zinc-900 leading-tight">
            Where{" "}
            <span className="text-[#EAB308]">
              Keywee
            </span>{" "}
            is Live
          </h2>

          <p className="mt-4 text-zinc-500 text-base md:text-xl font-medium">
            Starting in Gurugram. Expanding to a city near you.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {cities.map((city) => (
            <div
              key={city.name}
              className={`group relative overflow-hidden rounded-[26px] border p-4 text-left cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:scale-[1.01] ${
                city.active
                  ? "border-[#EAB308] bg-[#FFF4CC] shadow-[0_16px_40px_rgba(234,179,8,0.16)]"
                  : "border-zinc-200 bg-white hover:border-zinc-300 shadow-[0_12px_40px_rgba(0,0,0,0.05)]"
              }`}
            >

              {/* Active Glow */}
              {city.active && (
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-200/60 via-transparent to-transparent pointer-events-none" />
              )}

              {/* Hover Shine */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-700 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full" />

              <div className="relative flex items-center justify-between gap-4">

                {/* Left Side */}
                <div className="flex items-center gap-4">

                  {/* Icon */}
                  <div
                    className={`flex h-[58px] w-[58px] items-center justify-center rounded-[18px] shrink-0 transition-all duration-300 ${
                      city.active
                        ? "bg-[#DDA700] text-white shadow-md"
                        : "bg-zinc-100 text-zinc-600"
                    }`}
                  >
                    {city.active ? (
                      <MapPin className="h-7 w-7" strokeWidth={2.2} />
                    ) : (
                      <Clock3 className="h-7 w-7" strokeWidth={2.2} />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex flex-col">
                    <h3 className="text-[26px] leading-none font-black tracking-tight text-zinc-900">
                      {city.name}
                    </h3>

                    <p
                      className={`mt-2 text-[16px] leading-none font-medium ${
                        city.active
                          ? "text-zinc-600"
                          : "text-zinc-500"
                      }`}
                    >
                      {city.active ? "Available now" : "Coming soon"}
                    </p>
                  </div>
                </div>

                {/* Live Dot */}
                {city.active && (
                  <div className="relative flex items-center justify-center mr-2">

                    {/* Ping Animation */}
                    <span className="absolute inline-flex h-4 w-4 rounded-full bg-[#EAB308] opacity-40 animate-ping" />

                    {/* Solid Dot */}
                    <span className="relative inline-flex h-3 w-3 rounded-full bg-[#DDA700]" />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16">
          <div className="inline-flex flex-wrap items-center justify-center gap-3 text-xl md:text-3xl font-black tracking-tight">

            <span className="text-zinc-500">
              Want
            </span>

            <span className="text-[#EAB308]">
              Keywee
            </span>

            <span className="text-zinc-500">
              in your city?
            </span>

            <button className="group inline-flex items-center gap-2 text-[#EAB308] underline underline-offset-4 hover:text-yellow-600 transition-all duration-300">
              Join the waitlist

              <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </button>

          </div>
        </div>

      </div>
    </section>
  );
}