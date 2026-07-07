// app/about/page.tsx
import React from "react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#FBFAF7] dark:bg-[#0A0A0A] text-zinc-900 dark:text-zinc-100 py-16 px-6 sm:px-12 transition-colors duration-300">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="border-b border-zinc-200 dark:border-zinc-800 pb-6">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">About Us</h1>
        </div>

        <div className="space-y-6 text-zinc-700 dark:text-zinc-300 leading-relaxed">
          <p>
            Welcome to Key Wee, an AI-powered platform built to simplify the process of finding the right architect for your dream project.
          </p>
          <p>
            Whether you're planning a new home, renovating an existing space, designing a commercial property, or creating a unique interior experience, choosing the right architect can be challenging. Key Wee makes this process easier by using intelligent matching technology to connect clients with architects who best fit their project requirements, budget, style preferences, and location.
          </p>
          <p>
            Our mission is to remove the guesswork from architect selection and help homeowners, businesses, and property developers find qualified professionals with confidence.
          </p>
          <p>
            At Key Wee, we believe that every successful project starts with the right partnership. Our AI-driven recommendation system analyzes project details and matches users with architects whose expertise aligns with their specific needs. This saves time, reduces research effort, and improves the chances of a successful project outcome.
          </p>

          <h3 className="text-xl font-bold text-zinc-900 dark:text-white mt-8">What We Offer</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>AI-powered architect matching</li>
            <li>Personalized architect recommendations</li>
            <li>Access to qualified architecture professionals</li>
            <li>Home design and renovation project support</li>
            <li>Commercial and residential architect discovery</li>
            <li>Simple and transparent user experience</li>
          </ul>

          <h3 className="text-xl font-bold text-zinc-900 dark:text-white mt-8">Our Vision</h3>
          <p>
            To become India's most trusted platform for connecting clients with architects and design professionals through technology, transparency, and innovation.
          </p>

          <h3 className="text-xl font-bold text-zinc-900 dark:text-white mt-8">Why Choose Key Wee?</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Smart AI-based matching</li>
            <li>Time-saving architect discovery</li>
            <li>Personalized recommendations</li>
            <li>User-friendly platform</li>
            <li>Focus on quality connections</li>
            <li>Transparent and efficient process</li>
          </ul>

          <p className="font-semibold pt-4">
            At Key Wee, we're building a future where finding the perfect architect is simple, intelligent, and accessible to everyone.
          </p>
          <p>
            Let Key Wee help you find the right architect for your next project.
          </p>
        </div>
      </div>
    </div>
  );
}