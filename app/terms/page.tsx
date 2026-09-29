// app/terms/page.tsx
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import React from "react";

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#FBFAF7] dark:bg-[#0A0A0A] text-zinc-900 dark:text-zinc-100 pt-28 py-16 px-6 sm:px-12 transition-colors duration-300">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="border-b border-zinc-200 dark:border-zinc-800 pb-6">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              ARCHITECT LISTING AND PLATFORM SERVICES AGREEMENT
            </h1>
          </div>

          <div className="space-y-10 text-zinc-700 dark:text-zinc-300 leading-relaxed text-sm sm:text-base">
            <div className="bg-zinc-100 dark:bg-zinc-900 p-6 rounded-xl border border-zinc-200 dark:border-zinc-800">
              <p className="font-bold mb-2 uppercase text-xs tracking-wider text-zinc-900 dark:text-white">
                IMPORTANT — PLEASE READ BEFORE CLICKING.
              </p>
              <p className="font-medium text-sm">
                THESE TERMS FORM A BINDING CONTRACT BETWEEN YOU AND THE COMPANY. BY TICKING THE BOX MARKED "I HAVE READ, UNDERSTOOD AND AGREE TO THE ARCHITECT LISTING AND PLATFORM SERVICES AGREEMENT" AND CLICKING "REGISTER" /"SUBMIT", YOU CONFIRM THAT YOU HAVE READ THESE TERMS IN FULL, THAT YOU HAVE HAD THE OPPORTUNITY TO OBTAIN INDEPENDENT LEGAL ADVICE, AND THAT YOU ACCEPT THEM WITHOUT RESERVATION. IF YOU DO NOT AGREE, DO NOT TICK THE BOX AND DO NOT USE THE PLATFORM.
              </p>
            </div>

            <section>
              <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-3">1. PARTIES, DEFINITIONS AND INTERPRETATION</h2>
              <p className="mb-3">
                1.1 This Agreement is executed electronically between GM Key Wee Private Limited, a company incorporated under the Companies Act, 2013, CIN [U74102HR2026PTC150012], having its registered office at [D-26 EBD 114, Sector 114, Palam Vihar (Gurgaon), Palam Vihar, Gurgaon, Haryana, India, 122017] (the "Company", "we", "us"), and the person or entity accepting these terms (the "Architect", "you"). This Agreement is a contract in electronic form within the meaning of Section 10A of the Information Technology Act, 2000 and does not require a physical signature or a physical stamp to be valid and enforceable.
              </p>
              <p className="mb-2">1.2 In this Agreement, unless the context requires otherwise:</p>
              <ul className="list-[lower-alpha] space-y-2 pl-6 mb-3">
                <li>
                  <span className="font-semibold text-zinc-900 dark:text-zinc-200">"Platform"</span> means the website at www.keywee.in and the mobile application titled “keywee”, together with all related sub-domains, APIs, back-end systems and successor or replacement properties operated by the Company.
                </li>
                <li>
                  <span className="font-semibold text-zinc-900 dark:text-zinc-200">"User"</span> means any person who accesses the Platform to search for, shortlist, view or contact an Architect, and who is not charged any fee by the Company.
                </li>
                <li>
                  <span className="font-semibold text-zinc-900 dark:text-zinc-200">"Listing"</span> means the profile, portfolio, images, descriptions, credentials, rates, service areas and all other material published on the Platform in respect of the Architect.
                </li>
                <li>
                  <span className="font-semibold text-zinc-900 dark:text-zinc-200">"Onboarding Fee"</span> means the subscription or listing fee payable by the Architect under Clause 4 and the applicable Plan.
                </li>
                <li>
                  <span className="font-semibold text-zinc-900 dark:text-zinc-200">"Engagement"</span> means any appointment, retainer, consultancy, contract or dealing of any nature between an Architect and a User, whether or not it originated through the Platform.
                </li>
                <li>
                  <span className="font-semibold text-zinc-900 dark:text-zinc-200">"Architect Content"</span> means all data, text, drawings, renders, photographs, logos, credentials and other material supplied by the Architect to the Company or uploaded to the Platform.
                </li>
              </ul>
              <p>
                1.3 Headings are for convenience only and do not affect construction. The singular includes the plural. "Including" means "including without limitation". A reference to a statute includes any statutory modification or re-enactment of it and any rules, regulations or notifications made under it.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-3">2. NATURE OF THE PLATFORM — WHAT THE COMPANY DOES AND DOES NOT DO</h2>
              <p className="mb-3">
                2.1 The Platform is a technology-enabled discovery and listing service. Its sole function is to host Listings and to enable Users to search, filter, view and initiate contact with Architects. The Company is a neutral venue and an intermediary within the meaning of Section 2(1)(w) of the Information Technology Act, 2000.
              </p>
              <p className="mb-3">
                2.2 The Company does not render, offer, supply, procure, sub-contract, supervise, review, certify, approve or guarantee architectural services of any description. The Company is not an architect, is not a firm of architects, does not hold itself out as one, and does not employ the Architect.
              </p>
              <p className="mb-3">
                2.3 The Company is not a party to, and acquires no rights or obligations under, any Engagement. Every Engagement is a separate, independent, bilateral contract between the Architect and the User alone. The Company does not negotiate its terms, does not receive its consideration, does not guarantee its performance, and has no authority to bind either party to it.
              </p>
              <p className="mb-3">
                2.4 The Company is not an agent, broker, commission agent, sub-agent, del credere agent, partner, joint venturer or employer of the Architect, and nothing in this Agreement or in the conduct of the parties shall be construed as creating any such relationship. The Architect shall not represent to any person that any such relationship exists.
              </p>
              <p className="mb-3">
                2.5 The Company does not verify, audit, vet, background-check, test, inspect, rate, rank or endorse the qualifications, registration, competence, solvency, integrity, licences, insurance, past work, site conduct or professional standards of any Architect, save to the limited extent of any automated or documentary check expressly described in Clause 3.4. Any such limited check is a process convenience only and is not a warranty, certification or representation of any kind to any User or to any third party.
              </p>
              <p>
                2.6 The order, prominence, position or grouping in which Listings appear is determined by the Company’s internal parameters (which may include Plan tier, recency, completeness of profile, geography and User search terms). Placement is not a statement of merit, skill or quality. The Company shall disclose the principal parameters governing ranking on the Platform in the manner required by Rule 5(6) of the Consumer Protection (E-Commerce) Rules, 2020.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-3">3. ELIGIBILITY, CREDENTIALS AND ARCHITECT’S CORE REPRESENTATIONS</h2>
              <p className="mb-2">
                3.1 The Architect represents, warrants and undertakes, on the date of acceptance of these terms and on a continuing basis for so long as the Listing subsists, that:
              </p>
              <ul className="list-[lower-alpha] space-y-2 pl-6 mb-3">
                <li>it is competent to contract under Section 11 of the Indian Contract Act, 1872, and where it is a firm, LLP or company, that the individual accepting these terms is duly authorised to bind it;</li>
                <li>where it describes itself as an "architect" or uses that title or any derivative of it, it is duly registered with the Council of Architecture under the Architects Act, 1972, its registration is valid and subsisting, and it is not the subject of any pending or concluded disciplinary proceeding under that Act or the Architects (Professional Conduct) Regulations, 1989;</li>
                <li>it holds every licence, registration, empanelment, municipal authorisation and professional membership required by law for the services it offers, including registration under applicable GST legislation where its turnover so requires;</li>
                <li>all Architect Content is true, accurate, current, complete and not misleading; every project, image, render or credential presented as its own work is in fact its own work or work in which it lawfully participated and which it is contractually entitled to display; and no Architect Content infringes the intellectual property, confidentiality, privacy or publicity rights of any person;</li>
                <li>it is not disqualified, debarred, blacklisted or suspended by any statutory authority, development authority, municipal corporation or public body from undertaking architectural work;</li>
                <li>it is not an undischarged insolvent and no insolvency, liquidation or winding-up proceeding is pending against it; and</li>
                <li>it carries, or will carry before accepting any Engagement, professional indemnity insurance, and will produce the policy to the Company within seven (7) days of written request.</li>
              </ul>
              <p className="mb-3">
                3.2 Each representation in Clause 3.1 is a material inducement to the Company to publish the Listing. The Architect shall notify the Company in writing within seven (7) days of any event which renders any of them untrue, incomplete or misleading.
              </p>
              <p className="mb-3">
                3.3 This Clause 3 constitutes the undertaking required of a seller by Rule 6(2) of the Consumer Protection (E-Commerce) Rules, 2020, and the Architect acknowledges that the Company relies upon it for the purposes of that Rule and of Section 79 of the Information Technology Act, 2000.
              </p>
              <p>
                3.4 The Company may, at its sole discretion and without any obligation to do so, collect copies of the Architect’s registration certificate, identity documents, GST registration or other papers. Collection is for the Company’s internal record and statutory compliance only. The Company assumes no duty to authenticate any document so collected and no User may treat the existence of such collection as verification. The Architect shall not describe its Listing as "verified by the Company" unless the Company has issued a specific written verification badge and the Architect uses only the exact wording the Company prescribes.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-3">4. ONBOARDING FEE, PLANS, TAXES AND — CRITICALLY — NO ASSURANCE OF BUSINESS</h2>
              <p className="mb-3">
                4.1 In consideration of the Company hosting the Listing and granting access to the Platform for the subscribed term, the Architect shall pay the Onboarding Fee applicable to the Plan selected at the point of registration. The prevailing Plans and fees are set out on the Platform and the website of the company.
              </p>
              <p className="mb-3">
                4.2 The Onboarding Fee is exclusive of Goods and Services Tax and every other applicable levy, cess or duty, which shall be borne by the Architect and paid in addition. Any tax deducted at source by the Architect shall be accompanied by a valid certificate within the statutory period, failing which the Architect shall reimburse the Company the amount so deducted.
              </p>
              <p className="mb-3">
                4.3 The Onboarding Fee is payable in advance and is wholly non-refundable and non-transferable, whether or not the Architect uses the Platform, receives any enquiry, converts any enquiry, or discontinues use at any point during the term. No refund shall arise on suspension or termination of the Listing under Clause 10 for the Architect’s default.
              </p>
              <p className="mb-3">
                4.4 The Company may revise its Plans and fees prospectively. A revision shall not affect the fee for a term already paid for, and shall be notified to the Architect not less than thirty (30) days before the renewal date. Continued use after the renewal date constitutes acceptance of the revised fee for the renewed term.
              </p>
              <p className="mb-3 font-semibold text-zinc-900 dark:text-white uppercase leading-snug">
                4.5 NO ASSURANCE OF LEADS, ENQUIRIES, ENGAGEMENTS, REVENUE OR RETURN. THE ONBOARDING FEE IS CONSIDERATION SOLELY FOR THE HOSTING OF THE LISTING AND FOR ACCESS TO THE PLATFORM FOR THE SUBSCRIBED TERM. IT IS NOT CONSIDERATION FOR ANY OUTCOME. THE COMPANY MAKES NO REPRESENTATION, WARRANTY, ASSURANCE, PROJECTION OR GUARANTEE, WHETHER EXPRESS, IMPLIED, ORAL OR IN ANY MARKETING MATERIAL, AS TO: (A) THE NUMBER, QUALITY, GENUINENESS, CREDITWORTHINESS OR INTENT OF ANY ENQUIRY OR LEAD; (B) THE CONVERSION OF ANY ENQUIRY INTO AN ENGAGEMENT; (C) ANY VOLUME OF BUSINESS, REVENUE, PROFIT OR RETURN ON THE ONBOARDING FEE; (D) THE NUMBER OF USERS ON THE PLATFORM OR THE NUMBER OF VIEWS ANY LISTING WILL RECEIVE; OR (E) THE PLACEMENT OR RANKING OF ANY LISTING. THE ARCHITECT ACKNOWLEDGES THAT IT HAS NOT RELIED ON ANY SUCH REPRESENTATION AND THAT NO EMPLOYEE, AGENT OR CHANNEL PARTNER OF THE COMPANY IS AUTHORISED TO GIVE ONE. ANY ORAL ASSURANCE TO THE CONTRARY IS EXPRESSLY DISCLAIMED AND SHALL NOT BIND THE COMPANY.
              </p>
              <p>
                4.6 The Architect confirms that it has independently satisfied itself as to the commercial merit of the Plan purchased, and that the Onboarding Fee has been negotiated and accepted as a fair charge for the access granted.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-3">5. THE LISTING — LICENCE, CONTROL AND EDITORIAL DISCRETION</h2>
              <p className="mb-3">
                5.1 The Architect grants the Company a worldwide, non-exclusive, royalty-free, sub-licensable and transferable licence to host, store, reproduce, resize, crop, watermark, index, translate, publish, display, distribute and communicate to the public the Architect Content, for the purposes of operating, marketing and promoting the Platform, across the Platform, the Company’s social media channels, search engine listings and advertising. This licence shall keep on subsisting in respect of archived, cached and previously published material.
              </p>
              <p className="mb-3">
                5.2 The Architect retains ownership of the Architect Content. The Architect waives, to the extent permissible under Section 57 of the Copyright Act, 1957, any claim arising from the reformatting, resizing or cropping of images undertaken for display purposes.
              </p>
              <p className="mb-3">
                5.3 The Company reserves the absolute right, without notice and without liability or refund, to edit, reformat, re-categorise, down-rank, withhold, suspend or remove any Listing or any part of the Architect Content which, in its sole opinion, is inaccurate, misleading, unlawful, obscene, defamatory, infringing, in breach of the Architects (Professional Conduct) Regulations, 1989, or otherwise contrary to this Agreement or to the Company’s content policy.
              </p>
              <p>
                5.4 The Company is under no obligation to monitor, pre-screen or moderate any Listing. The exercise, or non-exercise, of the discretion in Clause 5.3 on any occasion shall not give rise to any duty to exercise it on any other occasion, and shall not be construed as the Company assuming editorial control over the Platform for the purposes of Section 79(2) of the Information Technology Act, 2000.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-3">6. THE ARCHITECT’S OBLIGATIONS AND CONDUCT</h2>
              <p className="mb-2">6.1 The Architect shall, at its own cost and risk:</p>
              <ul className="list-[lower-alpha] space-y-2 pl-6 mb-3">
                <li>enter into its own written contract with each User before commencing work, dealing expressly with scope, stages, fees, timelines, revisions, statutory approvals, site supervision, intellectual property and termination;</li>
                <li>perform all services with the reasonable skill, care and diligence of a competent architect and in conformity with the Architects Act, 1972, the Architects (Professional Conduct) Regulations, 1989, the National Building Code, applicable development control regulations and municipal building bye-laws;</li>
                <li>be solely responsible for its own fees, invoices, collections, taxes, statutory filings, employees, consultants and sub-contractors;</li>
                <li>respond to enquiries received through the Platform within [●] hours and deal with Users courteously and honestly;</li>
                <li>not solicit, demand or accept any payment from any User on the representation that it is payable to, collected for, or guaranteed by the Company;</li>
                <li>not post, procure or incentivise any false, paid, manipulated or reciprocal review or rating, whether of itself or of any other Architect;</li>
                <li>not scrape, harvest, reverse-engineer, copy, resell or redistribute the Platform, its database, its User data or any Listing other than its own; and</li>
                <li>maintain the confidentiality of its access credentials and be liable for all activity conducted through its account.</li>
              </ul>
              <p>
                6.2 The Architect shall use personal data of Users received through the Platform solely for the purpose of responding to and performing the relevant Engagement, shall process it in compliance with the Digital Personal Data Protection Act, 2023 and the Digital Personal Data Protection Rules, 2025, and shall not use it for unsolicited marketing, shall not sell or disclose it to any third party, and shall erase it when the purpose is exhausted. As between the Company and the Architect, the Architect is an independent Data Fiduciary in respect of such data from the point of receipt, and is solely liable for its own processing.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-3">7. DISCLAIMER OF WARRANTIES BY THE COMPANY</h2>
              <p className="mb-3 font-semibold text-zinc-900 dark:text-white uppercase leading-snug">
                7.1 THE PLATFORM AND ALL SERVICES ARE PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS. TO THE MAXIMUM EXTENT PERMITTED BY LAW, THE COMPANY DISCLAIMS ALL WARRANTIES, CONDITIONS AND REPRESENTATIONS OF EVERY KIND, WHETHER EXPRESS, IMPLIED OR STATUTORY, INCLUDING ANY IMPLIED WARRANTY OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, ACCURACY, UNINTERRUPTED OR ERROR-FREE OPERATION, FREEDOM FROM VIRUSES, OR SECURITY OF TRANSMISSION.
              </p>
              <p className="mb-3">
                7.2 The Company does not warrant that the Platform will be available at any particular time or for any particular period. The Company may, without liability, suspend access for scheduled or emergency maintenance, upgrades, security incidents, or on the direction of any statutory or judicial authority.
              </p>
              <p>
                7.3 The Company gives no warranty as to the identity, intent, solvency, creditworthiness or good faith of any User, or as to the genuineness of any enquiry.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-3">8. LIMITATION AND EXCLUSION OF LIABILITY</h2>
              <p className="mb-3 font-semibold text-zinc-900 dark:text-white uppercase leading-snug">
                8.1 THE COMPANY SHALL NOT BE LIABLE TO THE ARCHITECT, WHETHER IN CONTRACT, TORT (INCLUDING NEGLIGENCE), RESTITUTION, STATUTE OR OTHERWISE, FOR ANY INDIRECT, INCIDENTAL, SPECIAL, PUNITIVE OR CONSEQUENTIAL LOSS, OR FOR ANY LOSS OF PROFIT, LOSS OF REVENUE, LOSS OF BUSINESS, LOSS OF ANTICIPATED SAVINGS, LOSS OF OPPORTUNITY, LOSS OF GOODWILL OR REPUTATIONAL HARM, HOWSOEVER ARISING AND EVEN IF THE COMPANY HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH LOSS.
              </p>
              <p className="mb-3 font-semibold text-zinc-900 dark:text-white uppercase leading-snug">
                8.2 THE AGGREGATE LIABILITY OF THE COMPANY TO THE ARCHITECT IN RESPECT OF ALL CLAIMS ARISING OUT OF OR IN CONNECTION WITH THIS AGREEMENT SHALL IN NO EVENT EXCEED 5% OF THE ONBOARDING FEE ACTUALLY RECEIVED BY THE COMPANY FROM THAT ARCHITECT IN THE TWELVE (12) MONTHS IMMEDIATELY PRECEDING THE EVENT GIVING RISE TO THE CLAIM. THE PARTIES AGREE THAT THIS CAP IS A REASONABLE AND GENUINE ALLOCATION OF RISK, THAT IT HAS BEEN TAKEN INTO ACCOUNT IN FIXING THE ONBOARDING FEE, AND THAT THE COMPANY WOULD NOT HAVE ENTERED INTO THIS AGREEMENT WITHOUT IT.
              </p>
              <p className="mb-3">
                8.3 Nothing in this Agreement excludes or limits liability for fraud, fraudulent misrepresentation, wilful misconduct, death or personal injury caused by negligence, or any other liability which cannot lawfully be excluded or limited. If any part of this Clause 8 is held unenforceable, the remainder shall continue to apply.
              </p>
              <p>
                8.4 Every claim under this Agreement shall be notified to the Company in writing within ninety (90) days of the Architect first becoming aware of the facts giving rise to it, failing which the claim shall be deemed waived, save where a longer period is mandated by law.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-3">9. INDEMNITY BY THE ARCHITECT</h2>
              <p className="mb-2">
                9.1 The Architect shall defend, indemnify and hold harmless the Company, its holding, subsidiary and affiliate companies, and their respective directors, officers, employees, agents and successors (the "Indemnified Persons"), from and against all claims, demands, suits, complaints, proceedings, notices, penalties, fines, losses, damages, costs and expenses (including reasonable legal fees on a full indemnity basis) suffered or incurred by any Indemnified Person arising out of or in connection with:
              </p>
              <ul className="list-[lower-alpha] space-y-2 pl-6 mb-3">
                <li>any breach of this Agreement or of any representation, warranty or undertaking in Clause 3 or Clause 6;</li>
                <li>any act, omission, delay, abandonment, defect, negligence, professional misconduct, cost overrun, statutory non-compliance or deficiency in the services rendered by the Architect to any User;</li>
                <li>any dispute between the Architect and any User, including any complaint before a Consumer Commission, any civil suit, any arbitration, or any criminal complaint;</li>
                <li>any claim that the Architect Content infringes any intellectual property, confidentiality, privacy or personality right;</li>
                <li>any breach by the Architect of the Digital Personal Data Protection Act, 2023 or the Rules made under it, including any penalty imposed on the Company by the Data Protection Board on account of the Architect’s processing; and</li>
                <li>any tax, cess, levy, interest or penalty for which the Architect is primarily liable and which is recovered from the Company.</li>
              </ul>
              <p className="mb-3">
                9.2 The Company shall notify the Architect of any claim covered by Clause 9.1 and may, at its election, either require the Architect to defend it at the Architect’s cost with counsel acceptable to the Company, or defend it itself and recover all costs from the Architect. The Architect shall not settle any such claim in a manner that admits liability on the part of, or imposes any obligation on, any Indemnified Person without the Company’s prior written consent.
              </p>
              <p>
                9.3 This indemnity is a continuing obligation, survives termination of this Agreement, and is independent of, and not subject to, the limitation of liability in Clause 8.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-3">10. SUSPENSION, DELISTING AND TERMINATION</h2>
              <p className="mb-3">
                10.1 The Company may suspend or remove the Listing, restrict features or terminate this Agreement with immediate effect and without refund where, in its reasonable opinion: (a) the Architect is in breach of this Agreement; (b) any representation in Clause 3 is or becomes untrue; (c) the Architect’s Council of Architecture registration is suspended, cancelled or lapses; (d) the Company receives credible complaints from Users concerning the Architect; (e) continued publication exposes the Company to legal risk or to a direction from any authority or court; or (f) the Architect’s conduct is, in the Company’s opinion, damaging to the reputation of the Platform.
              </p>
              <p className="mb-3">
                10.2 The Company may terminate this Agreement for convenience on thirty (30) days’ written notice, in which case it shall refund the Onboarding Fee for the unexpired portion of the term on a pro-rata basis, and that refund shall be the Architect’s sole and exclusive remedy in respect of such termination.
              </p>
              <p className="mb-3">
                10.3 The Architect may terminate at any time by written notice, but shall not be entitled to any refund.
              </p>
              <p>
                10.4 On termination the licence in Clause 5.1 ends prospectively, save in respect of archived, cached, indexed and previously distributed material, which the Company shall not be obliged to recall. Clauses 1, 2, 4.3, 4.5, 7, 8, 9, 11, 12, 14, 15 and 16 survive termination.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-3">11. DATA PROTECTION AND USE OF INFORMATION</h2>
              <p className="mb-3">
                11.1 The Company collects and processes the Architect’s personal and business data for the following specified purposes: registration and identity verification; creation, hosting and display of the Listing; billing, invoicing, taxation and accounting; fraud prevention and platform security; grievance redressal; analytics, measurement and product improvement; customer support; marketing and promotion of the Platform and of the Architect’s own Listing; and compliance with legal or regulatory obligations and with directions of any court, tribunal or authority.
              </p>
              <p className="mb-3">
                11.2 A standalone notice under Section 5 of the Digital Personal Data Protection Act, 2023 and the Digital Personal Data Protection Rules, 2025 is presented separately at the point of registration and is available in English and in the languages specified in the Eighth Schedule to the Constitution. The Architect’s consent is obtained through that notice and not through this Agreement, and may be withdrawn at any time by writing to the contact in Clause 16, with effect for the future only. Withdrawal of consent necessary for the maintenance of the Listing will result in the Listing being taken down, without refund.
              </p>
              <p className="mb-3">
                11.3 The Company may disclose the Architect’s data to its payment gateways, cloud hosting providers, analytics providers, communication providers, auditors and legal advisers, each under contractual confidentiality obligations, and to any authority where required by law.
              </p>
              <p className="mb-3">
                11.4 The Company owns outright, and may use, retain, license, monetise and disclose without restriction and in perpetuity, all aggregated, anonymised and de-identified data, statistics, trends, benchmarks and insights derived from activity on the Platform, provided that such data cannot reasonably be used to identify any individual. Nothing in this Agreement restricts that right, which survives termination.
              </p>
              <p>
                11.5 The Architect consents to receiving transactional and service communications by email, SMS, WhatsApp and in-app notification, and to receiving promotional communications, subject to the right to opt out of promotional communications at any time and subject to applicable telecom regulations.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-3">12. INTELLECTUAL PROPERTY IN THE PLATFORM</h2>
              <p className="mb-3">
                12.1 All right, title and interest in the Platform, its software, source code, design, user interface, databases, trade marks, domain names and all derivative works belong exclusively to the Company. Nothing in this Agreement transfers any such right to the Architect, who receives only a limited, revocable, non-exclusive, non-transferable licence to access the Platform for the subscribed term for its own internal business purposes.
              </p>
              <p>
                12.2 The Architect shall not use the Company’s name, logo or marks except in the form and manner expressly approved in writing by the Company.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-3">13. GRIEVANCE REDRESSAL AND NODAL CONTACT</h2>
              <p className="mb-4">
                13.1 In accordance with Rule 3(2) of the Information Technology (Intermediary Guidelines and Digital Media Ethics Code) Rules, 2021 and Rule 4(3) of the Consumer Protection (E-Commerce) Rules, 2020, the Company has appointed a Grievance Officer:
              </p>
              
              <div className="overflow-hidden border border-zinc-200 dark:border-zinc-800 rounded-xl mb-4">
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
                      <td className="px-4 py-3">D-26 EBD 114, Sector 114, Palam Vihar (Gurgaon), Palam Vihar, Gurgaon, Haryana, India, 122017</td>
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
                      <td className="px-4 py-3">11am - 6pm</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <p>
                13.2 The Grievance Officer shall acknowledge every complaint within forty-eight (48) hours of receipt and shall dispose of it within one (1) month, recording reasons where relief is declined. A complaint must be made in writing or electronically and must bear the complainant’s name and identification.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-3">14. GOVERNING LAW AND DISPUTE RESOLUTION</h2>
              <p className="mb-3">
                14.1 This Agreement is governed by and construed in accordance with the laws of India.
              </p>
              <p className="mb-3">
                14.2 Any dispute, difference or claim arising out of or in connection with this Agreement, including its existence, validity, breach or termination, shall first be attempted to be resolved by good-faith negotiation between senior representatives of the parties within thirty (30) days of written notice of dispute.
              </p>
              <p className="mb-3">
                14.3 Failing resolution, the dispute shall be referred to and finally resolved by arbitration under the Arbitration and Conciliation Act, 1996, by a sole arbitrator appointed by mutual agreement of the parties within fifteen (15) days of the notice of dispute, failing which either party may apply to an arbitral institution mutually agreed by the parties, or, absent such agreement, to a recognised arbitral institution, to appoint the sole arbitrator under Section 11 of that Act. The seat and venue of arbitration shall be Delhi, India, the language shall be English, and the arbitral award shall be final and binding. Each party shall bear its own costs unless the arbitrator directs otherwise.
              </p>
              <p className="mb-3">
                14.4 Subject to Clause 14.3, the courts at Delhi, India shall have exclusive jurisdiction, and the parties waive any objection based on inconvenient forum.
              </p>
              <p>
                14.5 Nothing in this Clause prevents either party from applying to a competent court for urgent interim or conservatory relief under Section 9 of the Arbitration and Conciliation Act, 1996.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-3">15. FORCE MAJEURE</h2>
              <p>
                15.1 The Company shall not be liable for any failure or delay in performance caused by any event beyond its reasonable control, including act of God, flood, earthquake, fire, epidemic or pandemic, war, terrorism, civil commotion, strike, failure of power or telecommunications, internet or cloud service outage, cyber-attack, denial-of-service attack, or any act, order, direction or restraint of government or of any statutory or judicial authority.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-3">16. GENERAL</h2>
              <p className="mb-3">
                <span className="font-semibold text-zinc-900 dark:text-zinc-200">16.1 Amendment.</span> The Company may amend these terms. Material amendments shall be notified by email and by a prominent notice on the Platform not less than fifteen (15) days before they take effect. If the Architect does not accept a material amendment, its sole remedy is to terminate before the effective date and receive a pro-rata refund of the unexpired term. Continued use after the effective date constitutes acceptance.
              </p>
              <p className="mb-3">
                <span className="font-semibold text-zinc-900 dark:text-zinc-200">16.2 Entire agreement.</span> This Agreement, together with the Privacy Notice and the Plan particulars, constitutes the entire agreement between the parties and supersedes all prior discussions, brochures, presentations, pitches and oral assurances. The Architect confirms that it has not relied on any statement not expressly set out in this Agreement, save that nothing in this clause excludes liability for fraudulent misrepresentation.
              </p>
              <p className="mb-3">
                <span className="font-semibold text-zinc-900 dark:text-zinc-200">16.3 Severability.</span> If any provision is held invalid or unenforceable, it shall be severed or read down to the minimum extent necessary and the remainder shall continue in full force.
              </p>
              <p className="mb-3">
                <span className="font-semibold text-zinc-900 dark:text-zinc-200">16.4 Waiver.</span> No failure or delay in exercising any right operates as a waiver of it, and no single or partial exercise precludes any further exercise.
              </p>
              <p className="mb-3">
                <span className="font-semibold text-zinc-900 dark:text-zinc-200">16.5 Assignment.</span> The Architect shall not assign or transfer this Agreement or its Listing without the Company’s prior written consent. The Company may assign it freely, including on a merger, amalgamation or sale of business.
              </p>
              <p className="mb-3">
                <span className="font-semibold text-zinc-900 dark:text-zinc-200">16.6 Notices.</span> Notices to the Architect may be given at the email address registered on the Platform and shall be deemed received on transmission. Notices to the Company must be given at [●].
              </p>
              <p className="mb-3">
                <span className="font-semibold text-zinc-900 dark:text-zinc-200">16.7 Language and record.</span> These terms are executed in the English language. The Company shall retain an electronic record of the Architect’s acceptance, including the version accepted, the date and time, and the IP address, and such record shall be admissible in evidence in accordance with Sections 61 to 63 of the Bharatiya Sakshya Adhiniyam, 2023.
              </p>
              <p>
                <span className="font-semibold text-zinc-900 dark:text-zinc-200">16.8 No third-party rights.</span> Save for the Indemnified Persons under Clause 9, no person who is not a party to this Agreement may enforce any of its terms.
              </p>
            </section>

          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}