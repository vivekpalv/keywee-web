const features = [
  {
    title: "Verified Professionals",
    description: "Every architect undergoes a strict qualification and COA certification check before joining.",
    icon: "📐"
  },
  {
    title: "Real-time Collaboration",
    description: "Chat seamlessly with clients and architects using our instant messaging system.",
    icon: "💬"
  },
  {
    title: "Rich Portfolios",
    description: "Explore detailed project galleries, built areas, and design styles before making a choice.",
    icon: "🏢"
  }
];

export default function Features() {
  return (
    <section className="bg-zinc-50 px-6 py-24 dark:bg-zinc-900/50">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-black dark:text-white sm:text-4xl">Why Choose Keywee?</h2>
          <p className="mt-4 text-zinc-600 dark:text-zinc-400">Everything you need to complete your architectural projects safely and efficiently.</p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, idx) => (
            <div key={idx} className="flex flex-col items-start rounded-2xl bg-white p-8 shadow-sm ring-1 ring-zinc-200 dark:bg-black dark:ring-zinc-800">
              <span className="mb-4 text-4xl">{feature.icon}</span>
              <h3 className="text-xl font-semibold text-black dark:text-white">{feature.title}</h3>
              <p className="mt-2 text-zinc-600 dark:text-zinc-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}