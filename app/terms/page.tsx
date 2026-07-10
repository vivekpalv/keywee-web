// app/terms/page.tsx
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import React from "react";

export default function TermsPage() {
  return (
    <>
    <Navbar />
    <div className="min-h-screen bg-[#FBFAF7] dark:bg-[#0A0A0A] text-zinc-900 dark:text-zinc-100 pt-28 py-16 px-6 sm:px-12 transition-colors duration-300">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="border-b border-zinc-200 dark:border-zinc-800 pb-6">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Terms and Conditions</h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2">Last Updated: July 2026</p>
        </div>

        <div className="space-y-8 text-zinc-700 dark:text-zinc-300 leading-relaxed">
          <p>
            Welcome to Key Wee. These Terms and Conditions govern your access to and use of the Key Wee website, applications, and related services. By accessing or using our platform, you agree to be bound by these Terms and Conditions.
          </p>

          <section>
            <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-3">1. About Key Wee</h2>
            <p>
              Key Wee is an AI-powered platform that helps users discover and connect with architects based on project requirements, preferences, budget, and location. Key Wee facilitates introductions and recommendations but is not a provider of architectural services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-3">2. Eligibility</h2>
            <p>
              You must be at least 18 years old to use our services. By using the platform, you represent and warrant that you have the legal capacity to enter into these Terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-3">3. User Accounts</h2>
            <p>You may be required to provide accurate and complete information when creating an account or submitting project details.</p>
            <p className="mt-3 mb-2">You agree to:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Provide truthful information.</li>
              <li>Maintain the confidentiality of your account.</li>
              <li>Notify us immediately of any unauthorized use of your account.</li>
              <li>Accept responsibility for activities conducted through your account.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-3">4. AI-Powered Recommendations</h2>
            <p>Key Wee uses artificial intelligence and automated systems to recommend architects based on information provided by users.</p>
            <p className="mt-3 mb-2">Users acknowledge that:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Recommendations are generated using available data and algorithms.</li>
              <li>Key Wee does not guarantee that any recommended architect is the perfect fit for a project.</li>
              <li>Final hiring decisions are solely the responsibility of the user.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-3">5. Premium Services</h2>
            <p>Certain features may require payment, including AI-powered premium architect matching services.</p>
            <p className="mt-3 mb-2">By purchasing premium services:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>You agree to pay all applicable fees.</li>
              <li>Fees may be revised in the future.</li>
              <li>Payments are processed through authorized payment providers.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-3">6. No Guarantee of Project Outcomes</h2>
            <p className="mb-2">Key Wee does not guarantee:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Project completion.</li>
              <li>Design quality.</li>
              <li>Construction quality.</li>
              <li>Project timelines.</li>
              <li>Cost estimates.</li>
              <li>Professional performance of architects.</li>
            </ul>
            <p className="mt-4">Any agreement between a user and an architect is a separate arrangement between those parties.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-3">7. User Responsibilities</h2>
            <p className="mb-2">Users agree not to:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Provide false or misleading information.</li>
              <li>Use the platform for unlawful purposes.</li>
              <li>Interfere with platform operations.</li>
              <li>Attempt unauthorized access to systems or data.</li>
              <li>Copy, scrape, or reproduce platform content without permission.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-3">8. Architect Information</h2>
            <p>Architect profiles, portfolios, ratings, and other information may be provided by architects or obtained from publicly available sources.</p>
            <p className="mt-3">While we strive for accuracy, Key Wee does not guarantee the completeness or accuracy of any architect information displayed on the platform.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-3">9. Intellectual Property</h2>
            <p>All content, logos, branding, software, AI systems, text, graphics, and platform features are owned by Key Wee or its licensors and are protected by applicable intellectual property laws.</p>
            <p className="mt-3">Users may not reproduce, distribute, modify, or exploit platform content without written permission.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-3">10. Limitation of Liability</h2>
            <p className="mb-2">To the fullest extent permitted by law, Key Wee shall not be liable for:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Any indirect or consequential damages.</li>
              <li>Loss of profits or business opportunities.</li>
              <li>Disputes between users and architects.</li>
              <li>Errors in recommendations.</li>
              <li>Project delays, defects, or failures.</li>
            </ul>
            <p className="mt-4">Use of the platform is at your own risk.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-3">11. Third-Party Services</h2>
            <p>The platform may integrate with third-party payment processors, analytics providers, or external websites.</p>
            <p className="mt-3">Key Wee is not responsible for the services, content, or practices of third parties.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-3">12. Privacy</h2>
            <p>Your use of the platform is also governed by our Privacy Policy.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-3">13. Termination</h2>
            <p>We reserve the right to suspend or terminate access to the platform at any time if we believe a user has violated these Terms or engaged in harmful activities.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-3">14. Changes to Terms</h2>
            <p>We may update these Terms and Conditions from time to time. Continued use of the platform after changes are posted constitutes acceptance of the updated Terms.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-3">15. Governing Law</h2>
            <p>These Terms shall be governed by and interpreted in accordance with the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts having jurisdiction over the location of Key Wee's principal place of business.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-3">16. Contact Us</h2>
            <p>If you have any questions regarding these Terms and Conditions, please contact us at:</p>
            <p className="font-mono mt-2 mb-8">Email: keyweeofficial@gmail.com</p>
            <p className="font-semibold">By using Key Wee, you acknowledge that you have read, understood, and agreed to these Terms and Conditions.</p>
          </section>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
}