import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  BuildingOffice2Icon,
  ShieldCheckIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  ClockIcon,
  CalendarDaysIcon,
  DocumentTextIcon,
  CheckBadgeIcon,
  BanknotesIcon,
  GlobeAltIcon,
} from "@heroicons/react/24/outline";

import SEO from "../../components/seo/SEO";
import LeadModal from "../../components/popup";
import Logo from "../../assets/irsLogo.png";
import incorporationKitPhoto from "../../assets/services/incorporation-kit.jpg";
import annualReportPhoto from "../../assets/services/annual-report.jpg";
import { serviceCardThemes, serviceStepThemes } from "../../constants/serviceThemes";

const Incorporations = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const title = "U.S. Business Incorporation & LLC Formation Services | IRS Tax Filer";
  const description =
    "Start your U.S. business today. Complete LLC and Corporation formation across all 50 states with registered agent, federal EIN, and operating agreement included.";
  const keywords =
    "US incorporation, LLC formation, C-Corp setup, S-Corp election, start business US, registered agent, EIN registration, IRS Tax Filer";
  const canonical = window.location.href;
  const image = Logo;

  const entityTypes = [
    {
      name: "Limited Liability Company (LLC)",
      tag: "Most Popular",
      bestFor: "Small businesses, consultants, freelancers & real estate holding.",
      taxTreatment: "Pass-through taxation (no corporate double-taxation).",
      benefits: [
        "Personal asset liability protection",
        "Flexible management & pass-through profit distribution",
        "Minimal ongoing statutory recordkeeping",
      ],
    },
    {
      name: "S-Corporation (S-Corp)",
      tag: "Self-Employment Tax Savings",
      bestFor: "Profitable businesses with active owner-employees earning $60k+.",
      taxTreatment: "Pass-through taxation with reasonable salary split to reduce FICA tax.",
      benefits: [
        "Eliminates 15.3% self-employment tax on distributions",
        "Corporate liability veil with pass-through tax efficiency",
        "Formal payroll structure with health insurance deductions",
      ],
    },
    {
      name: "C-Corporation (C-Corp)",
      tag: "Venture & Global Investors",
      bestFor: "Startups raising venture capital, foreign investors & tech firms.",
      taxTreatment: "Flat 21% federal corporate tax rate with Section 1202 QSBS exclusion.",
      benefits: [
        "Unlimited shareholders & stock class flexibility",
        "Eligible for 0% federal capital gains (Section 1202 QSBS)",
        "Preferred entity structure for foreign investors & VC funds",
      ],
    },
  ];

  const steps = [
    {
      num: "01",
      title: "Entity & State Selection",
      detail: "We advise on the most tax-advantageous state (Delaware, Wyoming, Texas, Florida, or home state).",
    },
    {
      num: "02",
      title: "State Articles Filing",
      detail: "We draft and file official Articles of Organization or Incorporation with the Secretary of State.",
    },
    {
      num: "03",
      title: "EIN & Corporate Kit",
      detail: "We obtain your official IRS Employer Identification Number (EIN) and provide customized Operating Agreements.",
    },
  ];

  return (
    <div className="bg-white text-primary font-sans antialiased">
      <SEO
        title={title}
        description={description}
        canonical={canonical}
        image={image}
        keywords={keywords}
      />

      {/* 1. HERO SECTION: MATCHES HOME HERO TYPOGRAPHY + REAL IMAGE (NO BREADCRUMBS) */}
      <section className="relative overflow-hidden pt-8 sm:pt-10 lg:pt-12 pb-12 sm:pb-16 lg:pb-20 bg-white border-b border-slate-100">
        <div className="absolute top-1/4 right-10 w-[500px] h-[500px] bg-gradient-to-bl from-[#1F4264]/[0.05] via-[#127EAB]/[0.04] to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl 2xl:max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7 xl:col-span-7 text-left font-sans">
              {/* Main Headline - Matches Home Hero Typography exactly */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                style={{ lineHeight: 1.18 }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-[44px] xl:text-[48px] 2xl:text-[52px] font-normal text-primary tracking-tight mb-4 sm:mb-5"
              >
                U.S. Business Incorporation, <br className="hidden sm:inline" />
                <span className="font-medium text-teal">Form Your LLC</span> or <span className="font-medium text-coral">Corporation.</span>
              </motion.h1>

              {/* Subheading - Matches Home Hero Typography exactly */}
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="text-sm sm:text-base lg:text-[17px] text-slateText font-medium leading-[30px] sm:leading-[32px] lg:leading-[34px] mb-6 max-w-2xl"
              >
                Launch your U.S. company with confidence. We handle 50-state Articles of Organization, federal EIN registration, customized Operating Agreements, and corporate tax election seamlessly.
              </motion.p>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex flex-wrap sm:flex-nowrap items-center gap-3 mb-6"
              >
                <Link
                  to="/login"
                  className="relative inline-flex items-center justify-center gap-2.5 h-11 sm:h-12 px-6 rounded-xl bg-primary hover:bg-primary-dark text-white font-semibold text-sm sm:text-[15px] shadow-sm hover:shadow-md transition-all duration-200 group overflow-hidden shrink-0"
                >
                  <span>Incorporate My Business</span>
                  <ArrowRightIcon className="w-4 h-4 stroke-[2.2] group-hover:translate-x-1 transition-transform" />
                </Link>

                <button
                  type="button"
                  onClick={handleOpenModal}
                  className="relative inline-flex items-center justify-center gap-2.5 h-11 sm:h-12 px-6 rounded-xl bg-white hover:bg-background-blue text-teal hover:text-teal border border-border hover:border-teal font-semibold text-sm sm:text-[15px] shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 group cursor-pointer shrink-0"
                >
                  <CalendarDaysIcon className="w-4 h-4 text-teal group-hover:scale-110 transition-transform stroke-[2.2]" />
                  <span>Talk to Formation CPA</span>
                </button>
              </motion.div>

              {/* Trust Tag */}
              <div className="pt-4 border-t border-slate-100 flex items-center gap-2 text-xs text-slateText">
                <ShieldCheckIcon className="w-4 h-4 text-teal" />
                <span className="font-medium text-primary">100% State Acceptance Guarantee</span>
                <span className="text-border">â€¢</span>
                <span>Domestic & Foreign Founder Support</span>
              </div>
            </div>

            {/* Right Column: Clean Image Showcase */}
            <div className="lg:col-span-5 xl:col-span-5 relative flex justify-center lg:justify-end">
              <div className="relative w-full max-w-[460px]">
                {/* Main Card */}
                <div className="relative rounded-2xl overflow-hidden border border-slate-200/90 shadow-[0_16px_40px_rgba(22,84,121,0.08)] bg-white group">
                  {/* Subtle Header Bar */}
                  <div className="px-4 py-2.5 bg-slate-50/90 border-b border-slate-100 flex items-center justify-between text-xs">
                    <span className="font-semibold text-primary flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#127EAB]" />
                      Corporate Entity Formation Suite
                    </span>
                  </div>

                  {/* Real Image */}
                  <img
                    src={incorporationKitPhoto}
                    alt="U.S. Business Incorporation and LLC Formation Documents"
                    className="w-full h-[280px] sm:h-[320px] object-cover transition-transform duration-500 group-hover:scale-[1.01]"
                    loading="eager"
                  />

                  {/* Clean Bottom Caption Strip */}
                  <div className="px-4 py-3 bg-white border-t border-slate-100 flex items-center justify-between text-xs text-slateText">
                    <span className="flex items-center gap-1.5">
                      <CheckBadgeIcon className="w-4 h-4 text-primary" />
                      <span>EIN & Operating Agreement</span>
                    </span>
                    <span className="font-semibold text-teal">
                      Bank-Ready Kit
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THREE ENTITY TYPES (LLC vs. S-CORP vs. C-CORP) */}
      <section className="py-10 sm:py-14 bg-slate-50/60 border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl lg:text-[28px] font-normal text-primary tracking-tight leading-tight">
              Compare U.S. Business{" "}
              <span className="font-medium text-teal">
                Structures
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-slateText font-medium mt-1.5 leading-relaxed">
              Choose the entity that provides optimal liability shield and tax savings.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6 items-stretch">
            {entityTypes.map((ent, idx) => {
              const Icon = idx === 0 ? BuildingOffice2Icon : idx === 1 ? BanknotesIcon : GlobeAltIcon;
              const tierStyles = [
                { topBorder: "border-t-[#127EAB]", icon: "bg-[#E9F7FA] text-[#127EAB]", tag: "bg-[#EFF9FB] text-[#127EAB]", callout: "bg-[#EFF9FB]/70 border-[#127EAB]/20", check: "text-[#127EAB]", extra: "" },
                { topBorder: "border-t-emerald-500", icon: "bg-emerald-50 text-emerald-600", tag: "bg-emerald-50 text-emerald-700", callout: "bg-emerald-50/70 border-emerald-200/70", check: "text-emerald-600", extra: "md:-translate-y-1 shadow-md ring-1 ring-emerald-200/60" },
                { topBorder: "border-t-[#1F4264]", icon: "bg-slate-100 text-[#1F4264]", tag: "bg-slate-100 text-[#1F4264]", callout: "bg-slate-50 border-slate-200/80", check: "text-[#1F4264]", extra: "" },
              ];
              const s = tierStyles[idx % tierStyles.length];

              return (
                <div
                  key={idx}
                  className={`group p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/90 border-t-4 ${s.topBorder} shadow-2xs hover:shadow-lg transition-all duration-300 text-left flex flex-col justify-between ${s.extra}`}
                >
                  <div>
                    {/* Top Row: Circle Icon + Tag */}
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <div className={`w-10 h-10 rounded-full ${s.icon} flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform`}>
                        <Icon className="w-5 h-5" />
                      </div>

                      <span className={`text-[10.5px] font-semibold px-2.5 py-1 rounded-full ${s.tag}`}>
                        {ent.tag}
                      </span>
                    </div>

                    {/* Entity Name */}
                    <h3 className="text-base sm:text-[17px] font-semibold text-primary mb-3 leading-snug">
                      {ent.name}
                    </h3>

                    {/* Highlighted Best For Box */}
                    <div className={`p-3 rounded-xl border ${s.callout} mb-4`}>
                      <span className="text-[10.5px] font-semibold uppercase tracking-wider text-primary/70 block mb-0.5">
                        Best Suited For
                      </span>
                      <p className="text-xs text-primary font-medium leading-relaxed">
                        {ent.bestFor}
                      </p>
                    </div>

                    {/* Benefits List */}
                    <ul className="space-y-2.5">
                      {ent.benefits.map((b, bIdx) => (
                        <li
                          key={bIdx}
                          className="flex items-start gap-2.5 text-xs sm:text-[13px] text-slate-600 font-medium leading-relaxed"
                        >
                          <CheckCircleIcon className={`w-4 h-4 ${s.check} shrink-0 mt-0.5 stroke-[2.2]`} />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. ONGOING COMPLIANCE SPOTLIGHT WITH SECONDARY REAL IMAGE */}
      <section className="py-12 sm:py-16 bg-white border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Photo: Annual Report & Compliance */}
            <div className="lg:col-span-5 rounded-2xl overflow-hidden border border-slate-200/90 shadow-2xs">
              <img
                src={annualReportPhoto}
                alt="Annual Reports and State Franchise Tax Compliance"
                className="w-full h-56 sm:h-72 object-cover"
                loading="lazy"
              />
            </div>

            {/* Right Steps - Clean Left-Accent Editorial Timeline */}
            <div className="lg:col-span-7 space-y-5 text-left">
              <div>
                <h2 className="text-2xl sm:text-3xl font-normal text-primary tracking-tight leading-tight">
                  3 Steps to{" "}
                  <span className="font-medium text-teal">Launch Your Company</span>
                </h2>
              </div>

              <div className="space-y-5">
                {steps.map((step, sIdx) => {
                  const accents = [
                    { bar: "border-l-[#127EAB]", pill: "bg-[#EFF9FB] text-[#127EAB]" },
                    { bar: "border-l-emerald-500", pill: "bg-emerald-50 text-emerald-700" },
                    { bar: "border-l-[#EE6450]", pill: "bg-[#FEF4F2] text-[#D9523E]" },
                  ];
                  const acc = accents[sIdx % 3];

                  return (
                    <div
                      key={sIdx}
                      className={`border-l-[3px] ${acc.bar} pl-4 py-0.5`}
                    >
                      <div className="flex items-center gap-2.5 mb-1">
                        <span className={`text-[10.5px] font-mono font-semibold px-2 py-0.5 rounded-md ${acc.pill}`}>
                          STEP {step.num}
                        </span>
                        <h3 className="text-sm sm:text-base font-semibold text-primary leading-snug">
                          {step.title}
                        </h3>
                      </div>
                      <p className="text-xs sm:text-[13px] text-slate-600 font-medium leading-relaxed">
                        {step.detail}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CLEAN CTA BANNER */}
      <section className="py-10 sm:py-14 bg-white font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl py-10 sm:py-12 px-6 sm:px-12 bg-gradient-to-r from-[#0D6388] via-[#127EAB] to-[#168BB8] text-white shadow-xl text-center">
            {/* Subtle Ambient Glows */}
            <div className="absolute -top-24 -left-16 w-72 h-72 bg-white/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -right-16 w-72 h-72 bg-[#1F4264]/25 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-3xl mx-auto relative z-10">
              <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white mb-2.5">
                Ready to Form Your{" "}
                <span className="text-[#EE6450]">U.S. Company?</span>
              </h2>
              <p className="text-xs sm:text-sm text-sky-50/90 max-w-xl mx-auto mb-7 font-medium leading-relaxed">
                Get your LLC or Corporation formed by licensed CPAs with guaranteed state approval and EIN setup.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-3.5">
                <Link
                  to="/login"
                  className="inline-flex items-center justify-center gap-2 h-11 px-6 rounded-xl bg-white hover:bg-[#EFF9FB] text-primary font-semibold text-xs sm:text-sm transition-all duration-200 shadow-md hover:shadow-lg group"
                >
                  <span>Start Incorporation</span>
                  <ArrowRightIcon className="w-4 h-4 text-teal group-hover:translate-x-1 transition-transform" />
                </Link>
                <button
                  type="button"
                  onClick={handleOpenModal}
                  className="inline-flex items-center justify-center gap-2 h-11 px-5 rounded-xl bg-white/15 hover:bg-white/25 text-white font-semibold text-xs sm:text-sm border border-white/30 backdrop-blur-xs transition-all duration-200 cursor-pointer"
                >
                  <span>Consult Formation CPA</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lead Modal */}
      <LeadModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        serviceName="U.S. Business Incorporation"
      />
    </div>
  );
};

export default Incorporations;
