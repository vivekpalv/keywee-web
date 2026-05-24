'use client';

import { motion } from "framer-motion";

const cities = [
  { name: "Gurugram", active: true },
  { name: "Delhi", active: false },
  { name: "Noida", active: false },
  { name: "Mumbai", active: false },
  { name: "Bangalore", active: false },
  { name: "Pune", active: false },
  { name: "Hyderabad", active: false },
  { name: "Chennai", active: false },
];

export default function LiveArea() {
  // Animation variants for stagger effect
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section className="px-6 py-20 bg-[#FBFAF7] text-center overflow-hidden">
      <div className="mx-auto max-w-4xl">
        <h2 className="text-3xl font-extrabold text-black mb-2">Where Keywee is Live</h2>
        <p className="text-sm text-zinc-500 mb-12 font-medium">We are expanding fast. Find us in your city.</p>

        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {cities.map((city) => (
            <motion.div 
              key={city.name}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`relative flex items-center justify-center p-4 rounded-xl border transition-all cursor-pointer ${
                city.active 
                  ? "bg-yellow-50 border-yellow-400 text-yellow-900 shadow-sm ring-1 ring-yellow-400" 
                  : "bg-white border-zinc-200 text-zinc-600 hover:border-zinc-300 hover:shadow-sm"
              }`}
            >
              {/* Pulse effect for Active city */}
              {city.active && (
                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-yellow-500"></span>
                </span>
              )}
              
              <span className="font-bold text-sm tracking-tight">{city.name}</span>
            </motion.div>
          ))}
        </motion.div>
        
        <p className="mt-12 text-xs text-zinc-400 font-medium">
          What if your city is not in the list? 
          <a href="#" className="text-yellow-600 font-bold underline ml-1 hover:text-yellow-700">Vote for your city</a>
        </p>
      </div>
    </section>
  );
}