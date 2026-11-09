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
    <div className="bg-white text-gray-900 font-sans antialiased">
      <SEO
        title={title}
        description={description}
        canonical={canonical}
        image={image}
        keywords={keywords}
      />

      {/* 1. HERO SECTION: MATCHES HOME HERO TYPOGRAPHY + REAL IMAGE (NO BREADCRUMBS) */}
      <section className="relative overflow-hidden pt-8 sm:pt-10 lg:pt-12 pb-12 sm:pb-16 lg:pb-20 bg-white border-b border-slate-100">
        <div className="absolute top-1/4 right-10 w-[500px] h-[500px] bg-gradient-to-bl from-[#165479]/[0.05] via-[#749220]/[0.04] to-transparent rounded-full blur-3xl pointer-events-none" />

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
                className="text-3xl sm:text-4xl md:text-5xl lg:text-[44px] xl:text-[48px] 2xl:text-[52px] font-normal text-gray-900 tracking-tight mb-4 sm:mb-5"
              >
                U.S. Business Incorporation, <br className="hidden sm:inline" />
                <span className="font-medium bg-gradient-to-r from-[#0A4973] via-[#165479] to-[#749220] bg-clip-text text-transparent">
                  Form Your LLC or Corporation.
                </span>
              </motion.h1>

              {/* Subheading - Matches Home Hero Typography exactly */}
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="text-sm sm:text-base lg:text-[17px] text-gray-600 font-normal leading-[30px] sm:leading-[32px] lg:leading-[34px] mb-6 max-w-2xl"
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
                  className="inline-flex items-center justify-center gap-2 h-11 sm:h-12 px-6 rounded-xl bg-gradient-to-r from-[#0C3D5A] via-[#165479] to-[#1A5B82] hover:from-[#09324A] hover:via-[#134969] hover:to-[#165479] text-white font-medium text-sm sm:text-[15px] shadow-[0_4px_16px_rgba(22,84,121,0.25)] border border-white/20 transition-all duration-200 group shrink-0"
                >
                  <span>Incorporate My Business</span>
                  <ArrowRightIcon className="w-4 h-4 stroke-[2.2] group-hover:translate-x-1 transition-transform" />
                </Link>

                <button
                  type="button"
                  onClick={handleOpenModal}
                  className="inline-flex items-center justify-center gap-2 h-11 sm:h-12 px-5 sm:px-6 rounded-xl bg-white hover:bg-[#F6F9EE] text-[#165479] border-2 border-[#165479]/15 hover:border-[#749220] font-medium text-sm sm:text-[15px] transition-all duration-200 group cursor-pointer shrink-0"
                >
                  <CalendarDaysIcon className="w-4 h-4 text-[#749220] group-hover:scale-110 transition-transform stroke-[2.2]" />
                  <span>Talk to Formation CPA</span>
                </button>
              </motion.div>

              {/* Trust Tag */}
              <div className="pt-4 border-t border-slate-100 flex items-center gap-2 text-xs text-gray-500">
                <ShieldCheckIcon className="w-4 h-4 text-[#749220]" />
                <span className="font-medium text-gray-800">100% State Acceptance Guarantee</span>
                <span className="text-gray-300">•</span>
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
                    <span className="font-semibold text-gray-800 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#749220]" />
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
                  <div className="px-4 py-3 bg-white border-t border-slate-100 flex items-center justify-between text-xs text-gray-600">
                    <span className="flex items-center gap-1.5">
                      <CheckBadgeIcon className="w-4 h-4 text-[#165479]" />
                      <span>EIN & Operating Agreement</span>
                    </span>
                    <span className="font-semibold text-emerald-600">
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
            <h2 className="text-xl sm:text-2xl lg:text-[28px] font-normal text-gray-900 tracking-tight leading-tight">
              Compare U.S. Business{" "}
              <span className="font-semibold bg-gradient-to-r from-[#0A4973] via-[#165479] to-[#749220] bg-clip-text text-transparent">
                Structures
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 font-normal mt-1.5 leading-relaxed">
              Choose the entity that provides optimal liability shield and tax savings.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-5 items-stretch">
            {entityTypes.map((ent, idx) => {
              const Icon = idx === 0 ? BuildingOffice2Icon : idx === 1 ? BanknotesIcon : GlobeAltIcon;

              return (
                <div
                  key={idx}
                  className="p-4 sm:p-5 rounded-xl bg-white border border-slate-200/90 shadow-2xs hover:border-[#165479]/30 hover:shadow-sm transition-all duration-200 text-left flex flex-col justify-between"
                >
                  <div>
                    {/* Top Row: Icon + Tag */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${idx === 0
                          ? "bg-sky-50 border border-sky-100 text-[#165479]"
                          : idx === 1
                            ? "bg-[#F6F9EE] border border-[#749220]/25 text-[#749220]"
                            : "bg-slate-100/80 border border-slate-200 text-slate-700"
                          }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>

                      <span
                        className={`text-[10.5px] font-medium px-2 py-0.5 rounded-md border ${idx === 0
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200/60"
                          : idx === 1
                            ? "bg-sky-50 text-[#165479] border-sky-100"
                            : "bg-slate-100 text-slate-700 border-slate-200/80"
                          }`}
                      >
                        {ent.tag}
                      </span>
                    </div>

                    {/* Entity Name */}
                    <h3 className="text-base font-semibold text-gray-900 mb-1.5 leading-snug">
                      {ent.name}
                    </h3>

                    {/* Best For */}
                    <p className="text-xs sm:text-[13px] text-gray-600 font-semibold leading-relaxed mb-3">
                      <span className="font-semibold text-gray-900">Best for: </span>
                      {ent.bestFor}
                    </p>

                    {/* Benefits List */}
                    <ul className="space-y-2.5 pt-3 border-t border-slate-100">
                      {ent.benefits.map((b, bIdx) => (
                        <li
                          key={bIdx}
                          className="flex items-start gap-2 text-xs sm:text-[13px] text-slate-600 font-semibold leading-relaxed"
                        >
                          <CheckCircleIcon className="w-4 h-4 text-[#749220] shrink-0 mt-0.5 stroke-[2]" />
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

            {/* Right Steps */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div>
                <h2 className="text-2xl sm:text-3xl font-normal text-gray-900 tracking-tight leading-tight">
                  3 Steps to Launch Your Company
                </h2>
              </div>

              <div className="space-y-5">
                {steps.map((step, sIdx) => (
                  <div key={sIdx} className="flex items-start gap-3.5">
                    <div className="w-8 h-8 rounded-lg bg-[#F6F9EE] text-[#749220] font-mono font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 border border-[#749220]/25">
                      {step.num}
                    </div>
                    <div>
                      <h3 className="text-sm sm:text-base font-normal text-gray-900 leading-snug">
                        {step.title}
                      </h3>
                      <p className="text-xs sm:text-[13px] text-gray-800 font-normal leading-relaxed mt-1">
                        {step.detail}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CLEAN CTA BANNER */}
      <section className="py-12 sm:py-16 bg-[#0A4973] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-normal tracking-tight text-white mb-2">
            Ready to Form Your U.S. Company?
          </h2>
          <p className="text-xs sm:text-sm text-sky-100 max-w-xl mx-auto mb-6">
            Get your LLC or Corporation formed by licensed CPAs with guaranteed state approval and EIN setup.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/login"
              className="inline-flex items-center justify-center gap-2 h-11 px-6 rounded-xl bg-[#749220] hover:bg-[#637d1b] text-white font-medium text-xs sm:text-sm transition-all shadow-md group"
            >
              <span>Start Incorporation</span>
              <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <button
              type="button"
              onClick={handleOpenModal}
              className="inline-flex items-center justify-center gap-2 h-11 px-5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium text-xs sm:text-sm border border-white/20 transition-all"
            >
              <span>Consult Formation CPA</span>
            </button>
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
