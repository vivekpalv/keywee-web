// app/policies/page.tsx
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import React from "react";

export default function PrivacyPolicyPage() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#FBFAF7] dark:bg-[#0A0A0A] text-zinc-900 dark:text-zinc-100 pt-28 py-16 px-6 sm:px-12 transition-colors duration-300">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="border-b border-zinc-200 dark:border-zinc-800 pb-6">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Keywee Privacy Notice</h1>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2 font-medium">Version 1.0 · Effective from [date of publication]</p>
          </div>

          <div className="space-y-10 text-zinc-700 dark:text-zinc-300 leading-relaxed text-sm sm:text-base">
            
            <div className="space-y-4">
              <p>
                This Privacy Notice explains what personal data GM Key Wee Private Limited collects through Keywee, why we collect it, who we share it with, and how you can control it. It is a standalone notice under Section 5 of the Digital Personal Data Protection Act, 2023 and the Digital Personal Data Protection Rules, 2025.
              </p>
              <p className="font-semibold text-zinc-900 dark:text-white">It applies to two groups:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><span className="font-bold text-zinc-900 dark:text-white">Users:</span> homeowners and others who use Keywee to search for and contact architects. Read it with the Terms of Use.</li>
                <li><span className="font-bold text-zinc-900 dark:text-white">Architects:</span> architects and firms who list on Keywee. Read it with the Architect Listing and Platform Services Agreement.</li>
              </ul>
              <p className="italic text-sm mt-4 text-zinc-500">
                This notice is available in English and in the languages listed in the Eighth Schedule to the Constitution of India. [Language selector]
              </p>
            </div>

            <section>
              <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-3">1. Who we are</h2>
              <p className="mb-4">
                Keywee is operated by GM Key Wee Private Limited ("Keywee", "we", "us"). "Platform" means the website www.keywee.in and the Keywee mobile app.
              </p>

              <div className="overflow-x-auto border border-zinc-200 dark:border-zinc-800 rounded-xl mb-4 shadow-sm">
                <table className="w-full text-left text-sm">
                  <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                    <tr className="bg-zinc-50 dark:bg-zinc-900/50 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
                      <td className="px-4 py-3 font-semibold text-zinc-900 dark:text-white w-1/3">Company</td>
                      <td className="px-4 py-3">GM Key Wee Private Limited</td>
                    </tr>
                    <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors">
                      <td className="px-4 py-3 font-semibold text-zinc-900 dark:text-white">CIN</td>
                      <td className="px-4 py-3">U74102HR2026PTC150012</td>
                    </tr>
                    <tr className="bg-zinc-50 dark:bg-zinc-900/50 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
                      <td className="px-4 py-3 font-semibold text-zinc-900 dark:text-white">Registered office</td>
                      <td className="px-4 py-3">D-26 EBD 114, Sector 114, Palam Vihar (Gurgaon), Gurgaon, Haryana, India, 122017</td>
                    </tr>
                    <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors">
                      <td className="px-4 py-3 font-semibold text-zinc-900 dark:text-white">Privacy contact</td>
                      <td className="px-4 py-3">Grievance Officer, GMKEYWEE@GMAIL.COM (see section 13)</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="mt-4">
                We decide why and how your personal data is processed, so we are the <span className="font-semibold text-zinc-900 dark:text-white">Data Fiduciary</span> under the Digital Personal Data Protection Act, 2023 ("DPDP Act"). You are the <span className="font-semibold text-zinc-900 dark:text-white">Data Principal</span>.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-3">2. How we ask for your consent</h2>
              <p className="mb-3">
                We process your personal data with your consent, or where the law allows us to without it, such as to comply with a court order or a legal duty.
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li><span className="font-semibold text-zinc-900 dark:text-white">Users</span> give consent by ticking the box "I have read and agree to the Terms of Use and the Privacy Notice" before continuing.</li>
                <li><span className="font-semibold text-zinc-900 dark:text-white">Architects</span> give consent by ticking a separate box for this Privacy Notice at registration. This is separate from accepting the Architect Listing and Platform Services Agreement.</li>
              </ul>
              <p>
                Your consent covers only the purposes listed in this notice. You can withdraw it at any time, as easily as you gave it (see section 10).
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-3">3. Data we collect from Users, and why</h2>
              <p className="mb-4">Users do not pay Keywee, so we do not collect payment details from you.</p>

              <div className="overflow-x-auto border border-zinc-200 dark:border-zinc-800 rounded-xl mb-4 shadow-sm">
                <table className="w-full text-left text-sm">
                  <thead className="bg-zinc-100 dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800">
                    <tr>
                      <th className="px-4 py-3 font-bold text-zinc-900 dark:text-white w-1/3">Data</th>
                      <th className="px-4 py-3 font-bold text-zinc-900 dark:text-white">Why we use it</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                    <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors">
                      <td className="px-4 py-3 font-semibold text-zinc-900 dark:text-zinc-200 align-top">Name and mobile number</td>
                      <td className="px-4 py-3 align-top">Create your account and verify it by OTP. Share with architects you contact, and with architects whose listings match your stated requirements.</td>
                    </tr>
                    <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors">
                      <td className="px-4 py-3 font-semibold text-zinc-900 dark:text-zinc-200 align-top">Email address (if you give it)</td>
                      <td className="px-4 py-3 align-top">Account notices, support, and notice of changes to our terms.</td>
                    </tr>
                    <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors">
                      <td className="px-4 py-3 font-semibold text-zinc-900 dark:text-zinc-200 align-top">City and location</td>
                      <td className="px-4 py-3 align-top">Show architects in your area and match your requirements to listings.</td>
                    </tr>
                    <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors">
                      <td className="px-4 py-3 font-semibold text-zinc-900 dark:text-zinc-200 align-top">Project brief: property type, requirements, budget and style preferences</td>
                      <td className="px-4 py-3 align-top">Share with architects you contact, and with architects whose listings match your requirements.</td>
                    </tr>
                    <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors">
                      <td className="px-4 py-3 font-semibold text-zinc-900 dark:text-zinc-200 align-top">Enquiries and messages you send through the Platform</td>
                      <td className="px-4 py-3 align-top">Deliver them to the architect, and handle support and complaints.</td>
                    </tr>
                    <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors">
                      <td className="px-4 py-3 font-semibold text-zinc-900 dark:text-zinc-200 align-top">Reviews, ratings, photos and comments you post</td>
                      <td className="px-4 py-3 align-top">Publish them on the Platform and in our marketing (Terms of Use clause 6.3).</td>
                    </tr>
                    <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors">
                      <td className="px-4 py-3 font-semibold text-zinc-900 dark:text-zinc-200 align-top">Searches and shortlists</td>
                      <td className="px-4 py-3 align-top">Show you relevant results, and improve the Platform.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="mt-4">
                We also use this data for customer support, grievance redressal, fraud prevention, security and compliance with law.
              </p>
              <p className="mt-2">
                We use your name and contact details to send you news about the Platform. You can opt out at any time without closing your account (see section 10).
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-3">4. Data we collect from Architects, and why</h2>
              <div className="overflow-x-auto border border-zinc-200 dark:border-zinc-800 rounded-xl mb-4 shadow-sm">
                <table className="w-full text-left text-sm">
                  <thead className="bg-zinc-100 dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800">
                    <tr>
                      <th className="px-4 py-3 font-bold text-zinc-900 dark:text-white w-1/3">Data</th>
                      <th className="px-4 py-3 font-bold text-zinc-900 dark:text-white">Why we use it</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                    <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors">
                      <td className="px-4 py-3 font-semibold text-zinc-900 dark:text-zinc-200 align-top">Name, mobile number and email</td>
                      <td className="px-4 py-3 align-top">Register you and verify your account, send notices (including changes to the Agreement), and billing.</td>
                    </tr>
                    <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors">
                      <td className="px-4 py-3 font-semibold text-zinc-900 dark:text-zinc-200 align-top">Firm name, years of experience, office address, project budget range and professional bio</td>
                      <td className="px-4 py-3 align-top">Publish your Listing so Users can find and contact you, and match it to User requirements.</td>
                    </tr>
                    <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors">
                      <td className="px-4 py-3 font-semibold text-zinc-900 dark:text-zinc-200 align-top">Portfolio images, renders, drawings and logos</td>
                      <td className="px-4 py-3 align-top">Publish on your Listing, and promote the Platform and your Listing.</td>
                    </tr>
                    <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors">
                      <td className="px-4 py-3 font-semibold text-zinc-900 dark:text-zinc-200 align-top">Council of Architecture registration number, identity documents, GST registration and other papers you submit</td>
                      <td className="px-4 py-3 align-top">Registration and identity verification, internal records and legal compliance. We do not authenticate these documents, and collecting them is not a verification of you for Users (Agreement clause 3.4).</td>
                    </tr>
                    <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors">
                      <td className="px-4 py-3 font-semibold text-zinc-900 dark:text-zinc-200 align-top">Plan chosen, invoices, payment records and TDS certificates</td>
                      <td className="px-4 py-3 align-top">Billing, invoicing, taxation and accounting. Card and bank details you enter at checkout are processed by our payment gateway partner, [gateway name].</td>
                    </tr>
                    <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors">
                      <td className="px-4 py-3 font-semibold text-zinc-900 dark:text-zinc-200 align-top">Enquiries you receive and your responses</td>
                      <td className="px-4 py-3 align-top">Deliver enquiries to you, handle User complaints, and enforce the Agreement.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="mt-4">
                We also use this data for customer support, grievance redressal, fraud prevention, security, analytics, product improvement and compliance with law.
              </p>
              <p className="mt-2">
                Your Listing is public. Anyone visiting the Platform can see what you publish on it, including your name, firm, office address, bio and portfolio.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-3">5. Data we collect from everyone who visits</h2>
              <div className="overflow-x-auto border border-zinc-200 dark:border-zinc-800 rounded-xl mb-4 shadow-sm">
                <table className="w-full text-left text-sm">
                  <thead className="bg-zinc-100 dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800">
                    <tr>
                      <th className="px-4 py-3 font-bold text-zinc-900 dark:text-white w-1/3">Data</th>
                      <th className="px-4 py-3 font-bold text-zinc-900 dark:text-white">Why we use it</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                    <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors">
                      <td className="px-4 py-3 font-semibold text-zinc-900 dark:text-zinc-200 align-top">Device and browser details: device type, operating system, browser and IP address</td>
                      <td className="px-4 py-3 align-top">Security, fraud prevention, fixing errors, and keeping a record of your acceptance of our terms.</td>
                    </tr>
                    <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors">
                      <td className="px-4 py-3 font-semibold text-zinc-900 dark:text-zinc-200 align-top">Usage data: pages viewed, searches and clicks</td>
                      <td className="px-4 py-3 align-top">Analytics and product improvement.</td>
                    </tr>
                    <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors">
                      <td className="px-4 py-3 font-semibold text-zinc-900 dark:text-zinc-200 align-top">Cookies and similar technologies</td>
                      <td className="px-4 py-3 align-top">Keep you signed in, remember your preferences, and measure how the Platform is used.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="mt-4">
                When you accept our terms, we record the version accepted, the date, the time and your IP address as proof of acceptance.
              </p>
              <p className="mt-2">
                You can block or delete cookies in your browser settings. Cookies needed for sign-in are essential, so blocking them may stop parts of the Platform from working.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-3">6. How architect listings are matched</h2>
              <p className="mb-3">
                We use automated tools, which may include AI, to show Users architect listings that match the requirements they enter, such as location, budget and style. We may also send a User's project brief to architects whose listings match those requirements.
              </p>
              <p className="mb-3">
                Matching compares what a User enters with what architects say about themselves. It is not a recommendation, endorsement or verification of any architect (Terms of Use clause 3).
              </p>
              <p>
                The main factors that decide the order of listings are explained on our ranking page, [link], as required by Rule 5(6) of the Consumer Protection (E-Commerce) Rules, 2020.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-3">7. Who we share your data with</h2>
              <p className="mb-4">We do not sell your personal data. We share it only as set out below.</p>

              <div className="overflow-x-auto border border-zinc-200 dark:border-zinc-800 rounded-xl mb-4 shadow-sm">
                <table className="w-full text-left text-sm">
                  <thead className="bg-zinc-100 dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800">
                    <tr>
                      <th className="px-4 py-3 font-bold text-zinc-900 dark:text-white w-1/3">Who receives it</th>
                      <th className="px-4 py-3 font-bold text-zinc-900 dark:text-white w-1/3">What they receive</th>
                      <th className="px-4 py-3 font-bold text-zinc-900 dark:text-white w-1/3">Why</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                    <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors">
                      <td className="px-4 py-3 font-semibold text-zinc-900 dark:text-zinc-200 align-top">Architects a User contacts, and architects whose listings match the User's requirements</td>
                      <td className="px-4 py-3 align-top">The User's name, contact details and project brief</td>
                      <td className="px-4 py-3 align-top">So they can respond to the enquiry</td>
                    </tr>
                    <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors">
                      <td className="px-4 py-3 font-semibold text-zinc-900 dark:text-zinc-200 align-top">Anyone visiting the Platform</td>
                      <td className="px-4 py-3 align-top">An Architect's Listing</td>
                      <td className="px-4 py-3 align-top">So Users can find architects</td>
                    </tr>
                    <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors">
                      <td className="px-4 py-3 font-semibold text-zinc-900 dark:text-zinc-200 align-top">Payment gateway partners</td>
                      <td className="px-4 py-3 align-top">Architects' billing and payment details</td>
                      <td className="px-4 py-3 align-top">To process fees</td>
                    </tr>
                    <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors">
                      <td className="px-4 py-3 font-semibold text-zinc-900 dark:text-zinc-200 align-top">Cloud hosting, analytics and communication providers (including SMS, OTP and email services)</td>
                      <td className="px-4 py-3 align-top">Only the data they need to provide their service</td>
                      <td className="px-4 py-3 align-top">To run the Platform</td>
                    </tr>
                    <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors">
                      <td className="px-4 py-3 font-semibold text-zinc-900 dark:text-zinc-200 align-top">Auditors and legal advisers</td>
                      <td className="px-4 py-3 align-top">Data relevant to their work</td>
                      <td className="px-4 py-3 align-top">Audits, accounts and legal advice</td>
                    </tr>
                    <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors">
                      <td className="px-4 py-3 font-semibold text-zinc-900 dark:text-zinc-200 align-top">Courts, government bodies and regulators</td>
                      <td className="px-4 py-3 align-top">Data they lawfully request</td>
                      <td className="px-4 py-3 align-top">To comply with law</td>
                    </tr>
                    <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors">
                      <td className="px-4 py-3 font-semibold text-zinc-900 dark:text-zinc-200 align-top">A buyer or successor of our business</td>
                      <td className="px-4 py-3 align-top">Your data, still covered by this notice</td>
                      <td className="px-4 py-3 align-top">If Keywee merges or is sold</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="mt-4">
                Our service providers act on our instructions and are bound by confidentiality. Some may store data outside India. We transfer data outside India only where the law allows.
              </p>
              <p className="mt-2">
                Once an architect receives a User's details, that architect becomes an independent Data Fiduciary for them. Keywee is not responsible for what an architect does with that data. A User's remedy for misuse lies against that architect, without affecting the User's statutory rights (Terms of Use clause 11.5).
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-3">8. How long we keep your data</h2>
              <p className="mb-4">
                We keep personal data only as long as the purposes in this notice need it, then erase it, unless the law requires us to keep it longer.
              </p>

              <div className="overflow-x-auto border border-zinc-200 dark:border-zinc-800 rounded-xl mb-4 shadow-sm">
                <table className="w-full text-left text-sm">
                  <thead className="bg-zinc-100 dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800">
                    <tr>
                      <th className="px-4 py-3 font-bold text-zinc-900 dark:text-white w-1/3">Data</th>
                      <th className="px-4 py-3 font-bold text-zinc-900 dark:text-white">How long we keep it</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                    <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors">
                      <td className="px-4 py-3 font-semibold text-zinc-900 dark:text-zinc-200 align-top">User and Architect account details</td>
                      <td className="px-4 py-3 align-top">While your account is open. After closure, registration details are kept for 180 days, as the Information Technology (Intermediary Guidelines and Digital Media Ethics Code) Rules, 2021 require.</td>
                    </tr>
                    <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors">
                      <td className="px-4 py-3 font-semibold text-zinc-900 dark:text-zinc-200 align-top">Architect Listing</td>
                      <td className="px-4 py-3 align-top">While your subscription is active. Taken down when it ends or is terminated.</td>
                    </tr>
                    <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors">
                      <td className="px-4 py-3 font-semibold text-zinc-900 dark:text-zinc-200 align-top">Billing, invoices and tax records</td>
                      <td className="px-4 py-3 align-top">For the period that tax and company law require.</td>
                    </tr>
                    <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors">
                      <td className="px-4 py-3 font-semibold text-zinc-900 dark:text-zinc-200 align-top">Records of acceptance of terms and consent</td>
                      <td className="px-4 py-3 align-top">For as long as a claim could arise under the Terms of Use or the Agreement.</td>
                    </tr>
                    <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors">
                      <td className="px-4 py-3 font-semibold text-zinc-900 dark:text-zinc-200 align-top">Security and access logs</td>
                      <td className="px-4 py-3 align-top">For the period the law requires.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-3">9. How we protect your data</h2>
              <p className="mb-3">
                We use reasonable security safeguards to prevent personal data breaches, including encryption of data in transit, access controls, and limiting staff access to those who need it.
              </p>
              <p className="mb-3">
                If a personal data breach affects you, we will inform you and the Data Protection Board of India as the DPDP Act and Rules require. We will tell you what happened, the likely impact, and what you can do to protect yourself.
              </p>
              <p>
                Never share your OTP with anyone. Keywee will never ask a User to pay an architect's fee to Keywee or to any account Keywee nominates. Report any such request to our Grievance Officer at once.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-3">10. Your rights and how to use them</h2>
              
              <div className="overflow-x-auto border border-zinc-200 dark:border-zinc-800 rounded-xl mb-4 shadow-sm">
                <table className="w-full text-left text-sm">
                  <thead className="bg-zinc-100 dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800">
                    <tr>
                      <th className="px-4 py-3 font-bold text-zinc-900 dark:text-white w-1/3">Your right (DPDP Act)</th>
                      <th className="px-4 py-3 font-bold text-zinc-900 dark:text-white">What it means</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                    <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors">
                      <td className="px-4 py-3 font-semibold text-zinc-900 dark:text-zinc-200 align-top">Access (Section 11)</td>
                      <td className="px-4 py-3 align-top">Get a summary of the personal data we process about you, and who we have shared it with.</td>
                    </tr>
                    <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors">
                      <td className="px-4 py-3 font-semibold text-zinc-900 dark:text-zinc-200 align-top">Correction and erasure (Section 12)</td>
                      <td className="px-4 py-3 align-top">Correct, complete or update your data, or ask us to erase it.</td>
                    </tr>
                    <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors">
                      <td className="px-4 py-3 font-semibold text-zinc-900 dark:text-zinc-200 align-top">Withdraw consent (Section 6)</td>
                      <td className="px-4 py-3 align-top">Stop our future processing that is based on your consent.</td>
                    </tr>
                    <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors">
                      <td className="px-4 py-3 font-semibold text-zinc-900 dark:text-zinc-200 align-top">Grievance redressal (Section 13)</td>
                      <td className="px-4 py-3 align-top">Complain to our Grievance Officer, and then to the Data Protection Board of India.</td>
                    </tr>
                    <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors">
                      <td className="px-4 py-3 font-semibold text-zinc-900 dark:text-zinc-200 align-top">Nomination (Section 14)</td>
                      <td className="px-4 py-3 align-top">Name a person to exercise your rights if you die or become unable to.</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="space-y-4">
                <p>
                  <span className="font-bold text-zinc-900 dark:text-white">How to make a request:</span> email GMKEYWEE@GMAIL.COM, or use [in-app path, e.g. Profile › Privacy]. Include your name and registered mobile number. We may ask you to confirm your identity. We acknowledge requests within 48 hours and aim to resolve them within one month.
                </p>
                <p className="font-bold text-zinc-900 dark:text-white">What happens when you withdraw consent:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><span className="font-semibold text-zinc-900 dark:text-white">Users:</span> we stop processing your data for the purposes you withdrew and close your account if it can no longer run. Details already shared with architects stay with them as independent Data Fiduciaries, so contact them directly.</li>
                  <li><span className="font-semibold text-zinc-900 dark:text-white">Architects:</span> if you withdraw consent needed to keep your Listing live, your Listing will be taken down without refund (Agreement clause 11.2).</li>
                  <li><span className="font-semibold text-zinc-900 dark:text-white">Marketing only:</span> use the unsubscribe link in our messages or email us. Your account stays active.</li>
                </ul>
                <p>Withdrawal does not affect processing that happened before it.</p>
                <p>
                  Under Section 15 of the DPDP Act, you must give accurate information, must not impersonate anyone, and must not file false or frivolous complaints.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-3">11. Children</h2>
              <p className="mb-3">
                Keywee is not for anyone under 18. If you are under 18, do not use the Platform. Where a parent or guardian allows a child to use it, the parent or guardian is the User and must register in their own name (Terms of Use clause 1.4).
              </p>
              <p>
                We do not knowingly collect personal data of children. If we learn that we have, we will delete it.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-3">12. Anonymised data</h2>
              <p>
                We may create aggregated, anonymised data, such as average project budgets by city, that cannot reasonably be used to identify you. This is not personal data. We may use, retain, license and monetise it without restriction, including after your account is closed (Terms of Use clause 11.4, Agreement clause 11.4).
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-3">13. Grievance Officer and complaints</h2>
              
              <div className="overflow-hidden border border-zinc-200 dark:border-zinc-800 rounded-xl mb-4 shadow-sm">
                <table className="w-full text-left text-sm">
                  <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                    <tr className="bg-zinc-50 dark:bg-zinc-900/50">
                      <td className="px-4 py-3 font-semibold text-zinc-900 dark:text-white w-1/3">Name</td>
                      <td className="px-4 py-3">Keywee Grievance Officer</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-semibold text-zinc-900 dark:text-white">Designation</td>
                      <td className="px-4 py-3">Grievance Officer</td>
                    </tr>
                    <tr className="bg-zinc-50 dark:bg-zinc-900/50">
                      <td className="px-4 py-3 font-semibold text-zinc-900 dark:text-white">Address</td>
                      <td className="px-4 py-3">D-26 EBD 114, Sector 114, Palam Vihar (Gurgaon), Gurgaon, Haryana, India, 122017</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-semibold text-zinc-900 dark:text-white">Email</td>
                      <td className="px-4 py-3">GMKEYWEE@GMAIL.COM</td>
                    </tr>
                    <tr className="bg-zinc-50 dark:bg-zinc-900/50">
                      <td className="px-4 py-3 font-semibold text-zinc-900 dark:text-white">Telephone</td>
                      <td className="px-4 py-3">8989952828</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-semibold text-zinc-900 dark:text-white">Working hours</td>
                      <td className="px-4 py-3">11 am to 6 pm</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="mt-4">
                Complaints must be in writing or electronic form and include your name and contact details. We acknowledge every complaint within 48 hours and aim to resolve it within one month.
              </p>
              <p className="mt-2">
                If you are not satisfied with our response, you can complain to the Data Protection Board of India through its online platform, [link], after first using our grievance process.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-3">14. Changes to this notice</h2>
              <p>
                We may update this notice. For material changes, we will notify you on the Platform and by email at least 15 days before they take effect. Where a change needs fresh consent, we will ask for it. The version number and effective date at the top show which version applies.
              </p>
            </section>

          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}