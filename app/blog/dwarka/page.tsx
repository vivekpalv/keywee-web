import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";

// This adds SEO metadata to your static page
export const metadata: Metadata = {
  title: "Interior Designer in Dwarka | Keywee",
  description: "Find the best interior designers in Dwarka, Delhi. Design a home that matches your lifestyle with Keywee's expert professionals.",
};

export default function DwarkaBlogPage() {
  return (
    <>
    <Navbar/>
    <article className="min-h-screen bg-[#FBFAF7] dark:bg-[#0A0A0A] text-zinc-900 dark:text-zinc-100 font-sans transition-colors duration-300">
      
      {/* Blog Hero Section */}
      <header className="max-w-4xl mx-auto pt-30 pb-12 px-6 sm:px-8 text-center border-b border-zinc-200 dark:border-zinc-800">
        <div className="mb-4">
          <Link href="/blog" className="text-[#EAB308] text-sm font-bold tracking-widest uppercase hover:underline">
            Architecture & Design
          </Link>
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-tight mb-6">
          Interior Designer in Dwarka: Design a Home That Matches Your Lifestyle
        </h1>
        <p className="text-lg text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto">
          Discover how the right design approach can transform your Dwarka apartment or independent home into a functional, beautiful haven.
        </p>
      </header>

      {/* Blog Content */}
      <div className="max-w-3xl mx-auto py-12 px-6 sm:px-8">
        
        <div className="space-y-8 text-base sm:text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed">
          <p>
            Dwarka has grown into one of the most sought-after residential hubs in Delhi NCR. The sub-city offers a wide variety of living options, ranging from spacious society apartments and DDA flats to independent builder floors and commercial office spaces. As homes and workspaces become more personalized, people are increasingly looking for interiors that are practical, functional, comfortable, and visually appealing. This makes choosing the right interior designer in Dwarka a crucial step in ensuring a successful project.
          </p>

          <p>
            Interior design goes far beyond just picking out furniture or wall colors. It encompasses space planning, material and texture selection, lighting, storage solutions, and organizing these decorative elements into a cohesive visual. A professional designer can seamlessly blend all these components to craft an alluring and cozy space. 
          </p>

          <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white mt-12 mb-4">
            Reasons to Choose an Interior Designer in Dwarka
          </h2>
          <p>
            Before executing a project—like designing a full living room layout—you have to make numerous decisions regarding wardrobes, modular kitchens, flooring, lighting, false ceilings, wall finishes, colors, décor, and storage. A professional interior designer helps you meticulously plan these ideas before the actual work begins.
          </p>

          <h3 className="text-xl font-bold text-zinc-900 dark:text-white mt-8 mb-3">
            What Does an Interior Designer Do?
          </h3>
          <p>The ultimate goal of an interior designer is to create a space where functionality and aesthetics perfectly align. Their services typically include:</p>
          <ul className="list-disc pl-6 space-y-2 marker:text-[#EAB308]">
            <li>Complete home interior design</li>
            <li>Apartment and DDA flat interiors</li>
            <li>Living room and bedroom design</li>
            <li>Modular kitchen design and custom wardrobes</li>
            <li>Lighting, false ceilings, and furniture selection</li>
            <li>Office and commercial interiors</li>
          </ul>

          <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white mt-12 mb-4">
            Trends in Modern Interior Design
          </h2>
          <p>
            Homeowners in Dwarka have diverse tastes, ranging from highly detailed spaces to sleek, minimalist interiors. Modern design trends can be tailored to fit the lifestyle, budget, and structural layout of each property.
          </p>

          <ul className="space-y-4">
            <li>
              <strong className="text-zinc-900 dark:text-white">Minimalist Interior Design:</strong> Focuses on clean lines, simplicity, neutral colors, and functional furniture. It is highly effective in contemporary apartments because it removes unnecessary elements, creating the illusion of a larger space.
            </li>
            <li>
              <strong className="text-zinc-900 dark:text-white">Smart Storage Solutions:</strong> Modern design heavily integrates handy storage like kitchen cabinets, shoe storage, bookshelves, and small-space wardrobes without letting them dominate the room's aesthetic.
            </li>
            <li>
              <strong className="text-zinc-900 dark:text-white">Contemporary Interiors:</strong> This flexible style uses modern furniture, layered lighting, textures, and decorative details that can be easily adjusted to individual preferences.
            </li>
          </ul>

          <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white mt-12 mb-4">
            How to Choose the Right Interior Designer
          </h2>
          <p>
            Selecting the right professional requires clear communication and research:
          </p>
          <ul className="list-disc pl-6 space-y-2 marker:text-[#EAB308]">
            <li><strong>Check the Portfolio:</strong> Review their past projects to understand their style and individuality.</li>
            <li><strong>Discuss Your Budget:</strong> Lay out your financial expectations early so the designer can recommend appropriate materials.</li>
            <li><strong>Explain Your Lifestyle:</strong> Let them know how you live. Families with kids need sturdy furniture and extra storage, while remote workers need dedicated office spaces.</li>
          </ul>

          <div className="bg-zinc-100 dark:bg-zinc-900 p-8 rounded-2xl my-10 border border-zinc-200 dark:border-zinc-800">
            <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">
              How Keywee Can Help
            </h3>
            <p className="mb-6">
              Finding the right designer involves comparing rates, styles, and portfolios. Keywee simplifies this process using AI-powered matching. By sharing your project location, budget, preferred style, and timeline, Keywee connects you directly with suitable architecture and design professionals so you can start conversations immediately.
            </p>
            <Link href="/login" className="inline-block px-6 py-3 bg-[#EAB308] text-zinc-900 font-bold rounded-lg hover:bg-yellow-500 transition-colors shadow-sm">
              Find a Designer in Dwarka
            </Link>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white mt-12 mb-6 border-b border-zinc-200 dark:border-zinc-800 pb-4">
            Frequently Asked Questions
          </h2>
          
          <div className="space-y-6">
            <div>
              <h4 className="font-bold text-zinc-900 dark:text-white text-lg">Q1. What does an interior designer in Dwarka do?</h4>
              <p className="mt-1">They research, plan, and coordinate the fixtures, furnishings, and overall appearance of a space, tailoring it to your specific floor plan.</p>
            </div>
            <div>
              <h4 className="font-bold text-zinc-900 dark:text-white text-lg">Q2. Do you offer packages for interior design based on a budget?</h4>
              <p className="mt-1">Yes, budgets are discussed at the start to properly plan materials and design elements without overspending.</p>
            </div>
            <div>
              <h4 className="font-bold text-zinc-900 dark:text-white text-lg">Q3. What kind of property can an interior designer work on?</h4>
              <p className="mt-1">They work on builder floors, society apartments, DDA flats, independent homes, villas, offices, restaurants, shops, and clinics.</p>
            </div>
            <div>
              <h4 className="font-bold text-zinc-900 dark:text-white text-lg">Q4. How can I get an interior designer with Keywee?</h4>
              <p className="mt-1">Simply share your project needs (budget, style, timeline, location), and Keywee's AI will match you with the right verified professionals.</p>
            </div>
          </div>

        </div>
      </div>
    </article>
    </>
  );
}