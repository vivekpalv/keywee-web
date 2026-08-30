import React from "react";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Keywee Blog | Architecture & Interior Design Insights",
  description: "Read the latest trends, guides, and tips on architecture and interior design from Keywee professionals.",
};

// Define the static list of blogs with image URLs added
const BLOG_POSTS = [
  {
    id: "gurugram",
    title: "Interior Designer in Gurgaon: Design a Home That Matches Your Lifestyle",
    excerpt: "Looking for the best interior designer in Gurgaon (Gurugram)? Discover modern design trends, space planning tips, and 2BHK/3BHK ideas.",
    date: "August 30, 2026",
    category: "Interior Design",
    slug: "/blog/gurugram",
    // Premium interior design image from Unsplash
    imageUrl: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80", 
  },
  {
    id: "dwarka",
    title: "Interior Designer in Dwarka: Design a Home That Matches Your Lifestyle",
    excerpt: "Find the best interior designers in Dwarka, Delhi. Discover how the right design approach can transform your apartment or independent home.",
    date: "August 28, 2026",
    category: "Interior Design",
    slug: "/blog/dwarka",
    // Premium modern apartment image from Unsplash
    imageUrl: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80",
  }
];

export default function BlogIndexPage() {
  return (
    <div className="min-h-screen bg-[#FBFAF7] dark:bg-[#0A0A0A] text-zinc-900 dark:text-zinc-100 font-sans transition-colors duration-300">
      
      {/* Header Section */}
      <header className="max-w-6xl mx-auto pt-20 pb-12 px-6 sm:px-8 border-b border-zinc-200 dark:border-zinc-800">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-tight mb-4">
          Keywee <span className="text-[#EAB308]">Blogs</span>
        </h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl">
          Discover the latest trends, expert advice, and inspiration for architecture and interior design to transform your spaces.
        </p>
      </header>

      {/* Blog Grid */}
      <main className="max-w-6xl mx-auto py-12 px-6 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {BLOG_POSTS.map((post) => (
            <Link 
              key={post.id} 
              href={post.slug}
              className="group flex flex-col bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl overflow-hidden hover:border-[#EAB308] dark:hover:border-[#EAB308] transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-[#EAB308]/5"
            >
              {/* Blog Image Section */}
              <div className="relative w-full h-56 sm:h-64 overflow-hidden bg-zinc-100 dark:bg-zinc-800">
                <img 
                  src={post.imageUrl} 
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>

              {/* Text Content Section */}
              <div className="p-6 sm:p-8 flex flex-col flex-grow">
                {/* Meta info: Category & Date */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-bold tracking-widest uppercase text-[#EAB308] bg-[#EAB308]/10 px-2.5 py-1 rounded-md">
                    {post.category}
                  </span>
                  <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                    {post.date}
                  </span>
                </div>

                {/* Title */}
                <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-white mb-3 group-hover:text-[#EAB308] transition-colors line-clamp-3">
                  {post.title}
                </h2>

                {/* Excerpt */}
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6 flex-grow line-clamp-3">
                  {post.excerpt}
                </p>

                {/* Read More Link */}
                <div className="mt-auto pt-4 border-t border-zinc-100 dark:border-zinc-800 flex items-center font-bold text-sm text-zinc-900 dark:text-zinc-100 group-hover:text-[#EAB308] transition-colors">
                  Read Article <span className="ml-2 transform group-hover:translate-x-1 transition-transform">&rarr;</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>

    </div>
  );
}