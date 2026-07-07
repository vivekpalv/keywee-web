// app/policies/page.tsx
import React from "react";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#FBFAF7] dark:bg-[#0A0A0A] text-zinc-900 dark:text-zinc-100 py-16 px-6 sm:px-12 transition-colors duration-300">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="border-b border-zinc-200 dark:border-zinc-800 pb-6">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Privacy Policy – Key Wee</h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2">Last Updated: July 2026</p>
        </div>

        <div className="space-y-8 text-zinc-700 dark:text-zinc-300 leading-relaxed">
          <p>
            Welcome to Key Wee. We value your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, store, and protect information when you use our website, mobile application, and related services.
          </p>

          <section>
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">Information We Collect</h2>
            <p className="mb-2">We may collect the following information:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Name</li>
              <li>Email address</li>
              <li>Phone number</li>
              <li>City and location details</li>
              <li>Property and project requirements</li>
              <li>Architect preferences</li>
              <li>Payment information for premium services</li>
              <li>Device and browser information</li>
              <li>Usage and analytics data</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">How We Use Your Information</h2>
            <p className="mb-2">We use your information to:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Match homeowners with suitable architects using AI technology</li>
              <li>Provide personalized architect recommendations</li>
              <li>Process payments for premium services</li>
              <li>Improve our platform and user experience</li>
              <li>Respond to inquiries and support requests</li>
              <li>Prevent fraud and misuse of our services</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">AI Matching Service</h2>
            <p>
              Key Wee uses artificial intelligence to analyze user requirements and recommend architects that best match project needs, budget, style preferences, and location. AI recommendations are provided for informational purposes and final hiring decisions remain the responsibility of users.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">Data Security</h2>
            <p>
              We implement reasonable security measures to protect user information from unauthorized access, disclosure, or misuse. Data transmitted through our platform is protected using industry-standard security practices.
            </p>
            <p className="mt-4">
              However, no internet-based service can guarantee absolute security, and users share information at their own risk.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">Sharing of Information</h2>
            <p>We do not sell personal information.</p>
            <p className="mt-4 mb-2">We may share information with:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Architects registered on the platform</li>
              <li>Payment processing partners</li>
              <li>Analytics and technology service providers</li>
              <li>Government authorities when required by law</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">Cookies</h2>
            <p>
              We may use cookies and similar technologies to improve website performance, remember preferences, and analyze platform usage.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">User Rights</h2>
            <p className="mb-2">Users may request to:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Access their personal data</li>
              <li>Update incorrect information</li>
              <li>Delete their account and associated data</li>
              <li>Withdraw consent where applicable</li>
            </ul>
            <p className="mt-4">Requests can be submitted through our support team.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">Age Restriction</h2>
            <p>
              Key Wee services are intended for individuals who are at least 18 years old. Users under 18 must use the platform under the supervision of a parent or legal guardian.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">Third-Party Links</h2>
            <p>
              Our platform may contain links to third-party websites. We are not responsible for the privacy practices of those websites.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. Updated versions will be posted on this page with a revised effective date.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">Contact Us</h2>
            <p>For questions regarding this Privacy Policy, please contact:</p>
            <p className="font-mono mt-2">Email: keyweeofficial@gmail.com</p>
            <p className="mt-8 font-semibold">
              By using Key Wee, you agree to the terms of this Privacy Policy.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}