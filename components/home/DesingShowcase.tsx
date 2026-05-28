"use client";

import { motion } from "framer-motion";

const projects = [
  {
    id: 1,
    title: "Modern Minimalist Living",
    style: "Minimalist",
    imageUrl:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    title: "Urban Loft",
    style: "Industrial",
    imageUrl:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    title: "Cozy Studio",
    style: "Scandinavian",
    imageUrl:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=500&q=80",
  },
  {
    id: 4,
    title: "Luxury Villa",
    style: "Contemporary",
    imageUrl:
      "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=800&q=80",
  },
];

export default function DesignShowcase() {
  return (
    <section className="relative pt-24 pb-8 px-6 z-10">
      <div className="relative mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-14 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6"
        >
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-yellow-600 font-semibold mb-3">
              Inspiration
            </p>

            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-black">
              Recent Work by Keywee Architects
            </h2>

            <p className="text-zinc-500 mt-4 max-w-2xl text-lg leading-relaxed">
              Explore beautifully crafted interiors designed by top architects
              and creative professionals from Keywee.
            </p>
          </div>
        </motion.div>

        {/* Grid */}
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
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.6 }}
              whileHover={{ y: -10 }}
              className="group relative overflow-hidden rounded-[32px] h-[420px] cursor-pointer shadow-[0_15px_60px_rgba(0,0,0,0.08)]"
            >
              {/* Image */}
              <img
                src={project.imageUrl}
                alt={project.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Noise Overlay */}
              <div className="absolute inset-0 opacity-[0.06] bg-[url('/noise.png')]" />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

              {/* Top Floating Tag */}
              <div className="absolute top-5 left-5 z-20">
                <div className="backdrop-blur-xl bg-white/15 border border-white/20 text-white text-xs font-semibold px-4 py-2 rounded-full">
                  {project.style}
                </div>
              </div>

              {/* Hover Glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-700 bg-gradient-to-br from-yellow-400/10 via-transparent to-transparent" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 p-7 z-20">
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-white text-2xl font-bold leading-tight">
                    {project.title}
                  </h3>

                  <p className="text-zinc-300 mt-3 text-sm leading-relaxed max-w-[260px]">
                    Elegant spatial planning with premium materials, warm
                    textures, and timeless modern aesthetics.
                  </p>
                </motion.div>
              </div>

              {/* Border Glow */}
              <div className="absolute inset-0 rounded-[32px] ring-1 ring-transparent group-hover:ring-yellow-300/30 transition duration-500" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}