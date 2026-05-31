'use client';

import { useState, useEffect, useRef } from "react";

// Helper component for animating individual numbers
const AnimatedCounter = ({ endValue, duration = 2000, startAnimating }: { endValue: number, duration?: number, startAnimating: boolean }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!startAnimating) return;

    let startTime: number | null = null;
    let animationFrameId: number;

    const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      
      const currentCount = Math.floor(endValue * easeOutQuart(percentage));
      setCount(currentCount);

      if (progress < duration) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setCount(endValue); // Ensure it finishes exactly on the target number
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrameId);
  }, [endValue, duration, startAnimating]);

  // Format large numbers with commas (e.g., 1000 -> 1,000)
  return <span>{count.toLocaleString()}</span>;
};

export default function StatsBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Intersection Observer to trigger animation when section is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          // Optional: disconnect after first trigger so it doesn't re-animate every scroll
          if (sectionRef.current) observer.unobserve(sectionRef.current);
        }
      },
      { threshold: 0.5 } // Triggers when 50% of the component is visible
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="bg-black dark:bg-zinc-900/80 border border-transparent dark:border-zinc-800 py-12 px-6 rounded-3xl mx-4 sm:mx-8 lg:max-w-7xl lg:mx-auto my-12 shadow-xl"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-zinc-800">
        
        <div className="flex flex-col items-center pt-4 md:pt-0">
          <h3 className="text-4xl font-extrabold text-white mb-2 flex items-center justify-center">
            <AnimatedCounter endValue={1000} duration={2500} startAnimating={isVisible} />+
          </h3>
          <p className="text-sm text-zinc-400 font-medium tracking-wide uppercase">Happy Users</p>
        </div>
        
        <div className="flex flex-col items-center pt-8 md:pt-0">
          <h3 className="text-4xl font-extrabold text-white mb-2 flex items-center justify-center">
            <AnimatedCounter endValue={2000} duration={2500} startAnimating={isVisible} />+
          </h3>
          <p className="text-sm text-zinc-400 font-medium tracking-wide uppercase">Projects Designed</p>
        </div>
        
        <div className="flex flex-col items-center pt-8 md:pt-0">
          <h3 className="text-4xl font-extrabold text-yellow-400 mb-2 flex items-center justify-center">
            {/* Decimals require a slightly different approach, or hardcoding the final decimal if only a single digit */}
            4.<AnimatedCounter endValue={9} duration={2000} startAnimating={isVisible} />
          </h3>
          <p className="text-sm text-zinc-400 font-medium tracking-wide uppercase">Average Rating</p>
        </div>

      </div>
    </section>
  );
}