// app/contact/page.tsx
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import React from "react";

export default function ContactPage() {
  return (
    <>
    <Navbar />
    <div className="min-h-screen bg-[#FBFAF7] dark:bg-[#0A0A0A] text-zinc-900 dark:text-zinc-100 pt-28 py-16 px-6 sm:px-12 transition-colors duration-300">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="border-b border-zinc-200 dark:border-zinc-800 pb-6 text-center sm:text-left">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Contact Us</h1>
        </div>

        <div className="space-y-10 text-zinc-700 dark:text-zinc-300">
          <section>
            <p className="text-lg">We'd love to hear from you.</p>
            <p className="mt-4">
              Whether you have questions about our services, need help finding the right architect, want to report an issue, or simply have feedback, the Key Wee team is here to assist you.
            </p>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
              <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-4">Get in Touch</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-sm uppercase tracking-wide text-zinc-500">Email Support</h3>
                  <a href="mailto:keyweeofficial@gmail.com" className="text-[#EAB308] hover:underline font-medium">
                    keyweeofficial@gmail.com
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
              <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-4">Support Hours</h2>
              <div className="space-y-1">
                <p>Monday – Saturday</p>
                <p className="font-semibold text-zinc-900 dark:text-white">9:00 AM – 7:00 PM (IST)</p>
              </div>
            </div>
          </div>

          <section>
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">How Can We Help?</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Find the right architect for your project</li>
              <li>Questions about AI-powered architect matching</li>
              <li>Premium service support</li>
              <li>Architect registration and profile assistance</li>
              <li>Technical support</li>
              <li>General inquiries and feedback</li>
            </ul>
          </section>

          <section className="bg-[#EAB308]/10 p-6 rounded-2xl border border-[#EAB308]/20 text-center">
            <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">Response Time</h2>
            <p>We aim to respond to all inquiries within 24–48 business hours.</p>
          </section>

          <section className="pt-8 border-t border-zinc-200 dark:border-zinc-800">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">About Key Wee</h2>
            <p>
              Key Wee is an AI-powered platform that helps homeowners, businesses, and property developers connect with architects that best match their project requirements, style preferences, budget, and location.
            </p>
            <p className="mt-4 font-semibold text-zinc-900 dark:text-white">
              Thank you for choosing Key Wee. We look forward to helping you build your next project with confidence.
            </p>
          </section>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
}