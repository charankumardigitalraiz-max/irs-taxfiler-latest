import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  CalendarDaysIcon,
  DocumentTextIcon,
  ShieldCheckIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  ClockIcon,
  BuildingOffice2Icon,
  CheckBadgeIcon,
} from "@heroicons/react/24/outline";

import SEO from "../../components/seo/SEO";
import LeadModal from "../../components/popup";
import Logo from "../../assets/irsLogo.png";
import deadlinesPhoto from "../../assets/tax-resources-deadlines-3d.jpg";
import { serviceCardThemes, serviceStepThemes } from "../../constants/serviceThemes";

const Extension = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const title = "IRS Tax Filing Extension Services | Form 4868 & 7004 | IRS Tax Filer";
  const description =
    "File an automatic 6-month IRS tax extension for individuals (Form 4868) and businesses (Form 7004). Avoid late filing penalties with immediate electronic confirmation.";
  const keywords =
    "tax extension, Form 4868, Form 7004, IRS extension filing, file taxes late, October 15 deadline, IRS Tax Filer";
  const canonical = window.location.href;
  const image = Logo;

  const extensionTypes = [
    {
      title: "Individual Tax Extension",
      form: "IRS Form 4868",
      deadline: "October 15 Extended Due Date",
      icon: <DocumentTextIcon className="w-5 h-5 text-primary" />,
      summary: "Automatic 6-month extension to file Form 1040, 1040-SR, and 1040-NR without requiring any IRS reason.",
      points: [
        "Eliminates 5% per month late-filing penalty",
        "Estimated tax liability calculation included",
        "Electronic filing with instant IRS timestamp",
      ],
    },
    {
      title: "Business Tax Extension",
      form: "IRS Form 7004",
      deadline: "September 15 / October 15",
      icon: <BuildingOffice2Icon className="w-5 h-5 text-teal" />,
      summary: "Automatic 6-month extension for Partnerships (1065), S-Corporations (1120-S), and C-Corporations (1120).",
      points: [
        "Protects corporate charter compliance",
        "Schedule K-1 preparation extra time",
        "Multi-state franchise tax coordination",
      ],
    },
    {
      title: "50-State Tax Extensions",
      form: "State Specific Vouchers",
      deadline: "Coordinated with Federal",
      icon: <CalendarDaysIcon className="w-5 h-5 text-primary" />,
      summary: "Full coordination across all 50 states—some accept federal extensions, others require separate state filings.",
      points: [
        "State-specific extension form preparation",
        "State tax payment voucher generation",
        "Prevents local municipal penalty assessments",
      ],
    },
  ];

  const steps = [
    {
      num: "01",
      title: "Basic Info & Estimates",
      detail: "Provide basic taxpayer details and estimated annual income so we can calculate if payment is required.",
    },
    {
      num: "02",
      title: "Electronic Form Filing",
      detail: "We prepare Form 4868 or 7004 and transmit directly to the IRS electronic submission gateway.",
    },
    {
      num: "03",
      title: "Instant IRS Confirmation",
      detail: "Receive an official IRS electronic acknowledgement receipt confirming your extended October 15 deadline.",
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
      <section className="relative overflow-hidden pt-8 sm:pt-10 lg:pt-12 pb-8 sm:pb-10 bg-white">
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
                U.S. Tax Filing Extension, <br className="hidden sm:inline" />
                <span className="font-medium text-teal">6 Extra Months</span> <span className="font-medium text-coral">to File.</span>
              </motion.h1>

              {/* Subheading - Matches Home Hero Typography exactly */}
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="text-sm sm:text-base lg:text-[17px] text-slateText font-medium leading-[30px] sm:leading-[32px] lg:leading-[34px] mb-6 max-w-2xl"
              >
                Need extra time to organize your documents? We electronically file Form 4868 for individuals and Form 7004 for businesses to secure an automatic 6-month extension to October 15 with zero penalty risk.
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
                  <span>File Extension Now</span>
                  <ArrowRightIcon className="w-4 h-4 stroke-[2.2] group-hover:translate-x-1 transition-transform" />
                </Link>

                <button
                  type="button"
                  onClick={handleOpenModal}
                  className="relative inline-flex items-center justify-center gap-2.5 h-11 sm:h-12 px-6 rounded-xl bg-white hover:bg-background-blue text-teal hover:text-teal border border-border hover:border-teal font-semibold text-sm sm:text-[15px] shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 group cursor-pointer shrink-0"
                >
                  <CalendarDaysIcon className="w-4 h-4 text-teal group-hover:scale-110 transition-transform stroke-[2.2]" />
                  <span>Talk to Extension CPA</span>
                </button>
              </motion.div>

              {/* Trust Tag */}
              <div className="pt-4 border-t border-slate-100 flex items-center gap-2 text-xs text-slateText">
                <ShieldCheckIcon className="w-4 h-4 text-teal" />
                <span className="font-medium text-primary">Authorized IRS e-File Provider</span>
                <span className="text-border">•</span>
                <span>Immediate Electronic Receipt & Timestamp</span>
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
                      IRS Automatic Extension Service
                    </span>
                  </div>

                  {/* Real Image */}
                  <img
                    src={deadlinesPhoto}
                    alt="IRS Tax Filing Extension Deadlines and Calendar"
                    className="w-full h-[280px] sm:h-[320px] object-cover transition-transform duration-500 group-hover:scale-[1.01]"
                    loading="eager"
                  />

                  {/* Clean Bottom Caption Strip */}
                  <div className="px-4 py-3 bg-white border-t border-slate-100 flex items-center justify-between text-xs text-slateText">
                    <span className="flex items-center gap-1.5">
                      <ClockIcon className="w-4 h-4 text-teal" />
                      <span>October 15 Extended Deadline</span>
                    </span>
                    <span className="font-semibold text-teal">
                      Zero Late Penalty
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THREE EXTENSION SCOPES (INDIVIDUAL, BUSINESS, STATE) */}
      <section className="py-8 sm:py-10 bg-slate-50/60">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-8 sm:mb-10">
            <h2 className="text-2xl sm:text-3xl font-normal text-primary tracking-tight leading-tight">
              Complete Extension{" "}
              <span className="font-medium text-teal">
                Coverage
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-slateText font-medium mt-1.5 leading-relaxed">
              Whether you are an individual filer, business entity, or multi-state earner.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6 items-stretch">
            {extensionTypes.map((ext, idx) => {
              const calendarBands = [
                { ribbon: "bg-[#127EAB] text-white", formPill: "bg-white/20 text-white", icon: "bg-[#EFF9FB] text-[#127EAB]", check: "text-[#127EAB]" },
                { ribbon: "bg-[#1F4264] text-white", formPill: "bg-white/20 text-white", icon: "bg-slate-100 text-[#1F4264]", check: "text-[#1F4264]" },
                { ribbon: "bg-[#EE6450] text-white", formPill: "bg-white/20 text-white", icon: "bg-[#FEF4F2] text-[#EE6450]", check: "text-[#EE6450]" },
              ];
              const cal = calendarBands[idx % calendarBands.length];

              return (
                <div
                  key={idx}
                  className="group rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 overflow-hidden text-left flex flex-col justify-between"
                >
                  <div>
                    {/* Calendar-Style Solid Colored Deadline Ribbon */}
                    <div className={`px-5 py-3 ${cal.ribbon} flex items-center justify-between gap-2`}>
                      <div className="inline-flex items-center gap-1.5 text-xs font-semibold">
                        <ClockIcon className="w-3.5 h-3.5 stroke-[2.2]" />
                        <span>{ext.deadline}</span>
                      </div>
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md ${cal.formPill}`}>
                        {ext.form}
                      </span>
                    </div>

                    <div className="p-5 sm:p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <div className={`w-10 h-10 rounded-xl ${cal.icon} flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform`}>
                          {React.cloneElement(ext.icon, { className: "w-5 h-5" })}
                        </div>
                        <h3 className="text-base font-semibold text-primary leading-snug">
                          {ext.title}
                        </h3>
                      </div>

                      <p className="text-xs sm:text-[13px] text-slate-600 font-medium leading-relaxed mb-4">
                        {ext.summary}
                      </p>

                      <ul className="space-y-2.5 pt-3.5 border-t border-slate-100">
                        {ext.points.map((pt, pIdx) => (
                          <li
                            key={pIdx}
                            className="flex items-start gap-2.5 text-[13px] sm:text-sm text-primary font-medium leading-snug"
                          >
                            <CheckCircleIcon className={`w-4 h-4 ${cal.check} shrink-0 mt-0.5 stroke-[2.2]`} />
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. FAST 3-STEP OPEN TIMELINE */}
      <section className="py-8 sm:py-10 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-10 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-normal text-primary tracking-tight leading-tight">
              3 Simple Steps to{" "}
              <span className="font-medium text-teal">
                File Your Extension
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 relative text-left">
            {steps.map((st, sIdx) => {
              const badgeColors = ["bg-[#127EAB]", "bg-[#1F4264]", "bg-[#EE6450]"];
              const titleColors = ["text-[#127EAB]", "text-[#1F4264]", "text-[#D9523E]"];

              return (
                <div key={sIdx} className="relative flex flex-col justify-start">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-10 h-10 rounded-full ${badgeColors[sIdx % 3]} text-white font-mono font-semibold text-xs flex items-center justify-center shrink-0 shadow-sm`}>
                      {st.num}
                    </div>
                    {sIdx < steps.length - 1 && (
                      <div className="hidden md:block flex-1 h-[2px] bg-gradient-to-r from-slate-300 to-slate-100" />
                    )}
                  </div>

                  <h3 className={`text-base font-semibold ${titleColors[sIdx % 3]} mb-1.5 leading-snug`}>
                    {st.title}
                  </h3>
                  <p className="text-xs sm:text-[13px] text-slate-600 font-medium leading-relaxed">
                    {st.detail}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. CLEAN CTA BANNER */}
      <section className="py-8 sm:py-10 bg-white font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl py-10 sm:py-12 px-6 sm:px-12 bg-gradient-to-r from-[#0D6388] via-[#127EAB] to-[#168BB8] text-white shadow-xl text-center">
            {/* Subtle Ambient Glows */}
            <div className="absolute -top-24 -left-16 w-72 h-72 bg-white/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -right-16 w-72 h-72 bg-[#1F4264]/25 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-3xl mx-auto relative z-10">
              <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white mb-2.5">
                Do Not Miss the{" "}
                <span className="text-[#EE6450]">Filing Deadline</span>
              </h2>
              <p className="text-xs sm:text-sm text-sky-50/90 max-w-xl mx-auto mb-7 font-medium leading-relaxed">
                Get your official IRS Form 4868 extension submitted electronically today in just a few minutes.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-3.5">
                <Link
                  to="/login"
                  className="inline-flex items-center justify-center gap-2 h-11 px-6 rounded-xl bg-white hover:bg-[#EFF9FB] text-primary font-semibold text-xs sm:text-sm transition-all duration-200 shadow-md hover:shadow-lg group"
                >
                  <span>File Extension Today</span>
                  <ArrowRightIcon className="w-4 h-4 text-teal group-hover:translate-x-1 transition-transform" />
                </Link>
                <button
                  type="button"
                  onClick={handleOpenModal}
                  className="inline-flex items-center justify-center gap-2 h-11 px-5 rounded-xl bg-white/15 hover:bg-white/25 text-white font-semibold text-xs sm:text-sm border border-white/30 backdrop-blur-xs transition-all duration-200 cursor-pointer"
                >
                  <span>Talk to CPA</span>
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
        serviceName="Tax Filing Extension (Form 4868)"
      />
    </div>
  );
};

export default Extension;
