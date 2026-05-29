"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface Architect {
  _id: string;
  contact: string;
  email: string;
  firmName: string;
  bio: string;
  verified: boolean;
  experience: number;
  city?: string;
  state?: string;
  profilePictureUrl?: string;
  user: {
    _id: string;
    name: string;
    mobile: string;
    roles: string[];
    gender?: string;
  };
}

const placeholderColors = [
  "bg-zinc-200",
  "bg-zinc-300",
  "bg-stone-200",
  "bg-neutral-200",
];

export default function TopArchitects() {
  const [architects, setArchitects] = useState<Architect[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArchitects = async () => {
      try {
        const res = await fetch(
          "https://backend.keywee.in/api/v1/public/architects?page=1&limit=4&verified=false&minExperience=3"
        );

        if (!res.ok) throw new Error("Failed to fetch architects");

        const data = await res.json();

        if (data.success) {
          setArchitects(data.architects);
        } else {
          throw new Error(data.message || "Unknown error");
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchArchitects();
  }, []);

  return (
    <section className="px-6 py-20 bg-[#FBFAF7] overflow-hidden">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="flex items-center justify-between mb-10"
        >
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-yellow-600 font-semibold">
              Professionals
            </p>

            <h2 className="text-3xl md:text-4xl font-bold text-black mt-2">
              Top Architects Near You
            </h2>
          </div>

          {/* <Link
            href="/architects"
            className="text-sm font-semibold text-yellow-600 hover:text-yellow-700 transition-colors"
          >
            See all →
          </Link> */}
        </motion.div>

        {/* Loading Skeleton */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="rounded-3xl overflow-hidden bg-white border border-zinc-100 shadow-sm"
              >
                <div className="h-56 bg-gradient-to-r from-zinc-200 via-zinc-100 to-zinc-200 animate-pulse" />

                <div className="p-5 space-y-4">
                  <div className="h-4 bg-zinc-200 rounded w-2/3 animate-pulse" />
                  <div className="h-3 bg-zinc-100 rounded w-1/2 animate-pulse" />
                  <div className="h-3 bg-zinc-100 rounded w-full animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="text-center py-16 text-zinc-500">
            Could not load architects.
          </div>
        )}

        {/* Cards */}
        {!loading && !error && (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.15,
                },
              },
            }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7"
          >
            {architects.map((arch, index) => (
              <motion.div
                key={arch._id}
                variants={{
                  hidden: {
                    opacity: 0,
                    y: 40,
                  },
                  visible: {
                    opacity: 1,
                    y: 0,
                  },
                }}
                transition={{
                  duration: 0.5,
                  ease: "easeOut",
                }}
                whileHover={{
                  y: -10,
                }}
                className="group relative bg-white rounded-3xl overflow-hidden border border-zinc-100 shadow-sm hover:shadow-2xl transition-all duration-500"
              >
                {/* Image */}
                {arch.profilePictureUrl ? (
                  <div className="relative h-56 overflow-hidden">
                    <Image
                      src={arch.profilePictureUrl}
                      alt={arch.user.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition duration-500" />
                  </div>
                ) : (
                  <div
                    className={`h-56 w-full ${placeholderColors[index % placeholderColors.length]} flex items-center justify-center`}
                  >
                    <span className="text-5xl text-zinc-500 font-bold">
                      {arch.user.name.charAt(0)}
                    </span>
                  </div>
                )}

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-bold text-xl text-black leading-tight">
                        {arch.user.name}
                      </h3>

                      <p className="text-sm text-zinc-500 mt-1">
                        {arch.firmName}
                      </p>
                    </div>

                    {arch.verified && (
                      <div className="px-2 py-1 rounded-full bg-green-100 text-green-700 text-[10px] font-semibold">
                        VERIFIED
                      </div>
                    )}
                  </div>

                  <p className="text-sm text-zinc-500 mt-4 leading-relaxed line-clamp-3">
                    {arch.bio}
                  </p>

                  {/* Footer */}
                  <div className="mt-6 pt-4 border-t border-zinc-100 flex items-center justify-between">
                    <span className="text-xs text-zinc-500">
                      {arch.city && arch.state
                        ? `📍 ${arch.city}, ${arch.state}`
                        : "📍 Location N/A"}
                    </span>

                    <span className="text-sm font-semibold text-black">
                      {arch.experience}+ yrs
                    </span>
                  </div>
                </div>

                {/* Glow */}
                <div className="absolute inset-0 rounded-3xl ring-1 ring-transparent group-hover:ring-yellow-200 transition duration-500 pointer-events-none" />
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Empty */}
        {!loading && !error && architects.length === 0 && (
          <div className="text-center py-16 text-zinc-400">
            No architects found.
          </div>
        )}
      </div>
    </section>
  );
}