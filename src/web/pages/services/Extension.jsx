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
      icon: <DocumentTextIcon className="w-5 h-5 text-[#165479]" />,
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
      icon: <BuildingOffice2Icon className="w-5 h-5 text-[#749220]" />,
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
      icon: <CalendarDaysIcon className="w-5 h-5 text-[#165479]" />,
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
                U.S. Tax Filing Extension, <br className="hidden sm:inline" />
                <span className="font-medium bg-gradient-to-r from-[#0A4973] via-[#165479] to-[#749220] bg-clip-text text-transparent">
                  6 Extra Months to File.
                </span>
              </motion.h1>

              {/* Subheading - Matches Home Hero Typography exactly */}
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="text-sm sm:text-base lg:text-[17px] text-gray-600 font-normal leading-[30px] sm:leading-[32px] lg:leading-[34px] mb-6 max-w-2xl"
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
                  className="inline-flex items-center justify-center gap-2 h-11 sm:h-12 px-6 rounded-xl bg-gradient-to-r from-[#0C3D5A] via-[#165479] to-[#1A5B82] hover:from-[#09324A] hover:via-[#134969] hover:to-[#165479] text-white font-medium text-sm sm:text-[15px] shadow-[0_4px_16px_rgba(22,84,121,0.25)] border border-white/20 transition-all duration-200 group shrink-0"
                >
                  <span>File Extension Now</span>
                  <ArrowRightIcon className="w-4 h-4 stroke-[2.2] group-hover:translate-x-1 transition-transform" />
                </Link>

                <button
                  type="button"
                  onClick={handleOpenModal}
                  className="inline-flex items-center justify-center gap-2 h-11 sm:h-12 px-5 sm:px-6 rounded-xl bg-white hover:bg-[#F6F9EE] text-[#165479] border-2 border-[#165479]/15 hover:border-[#749220] font-medium text-sm sm:text-[15px] transition-all duration-200 group cursor-pointer shrink-0"
                >
                  <CalendarDaysIcon className="w-4 h-4 text-[#749220] group-hover:scale-110 transition-transform stroke-[2.2]" />
                  <span>Talk to Extension CPA</span>
                </button>
              </motion.div>

              {/* Trust Tag */}
              <div className="pt-4 border-t border-slate-100 flex items-center gap-2 text-xs text-gray-500">
                <ShieldCheckIcon className="w-4 h-4 text-[#749220]" />
                <span className="font-medium text-gray-800">Authorized IRS e-File Provider</span>
                <span className="text-gray-300">•</span>
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
                    <span className="font-semibold text-gray-800 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#749220]" />
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
                  <div className="px-4 py-3 bg-white border-t border-slate-100 flex items-center justify-between text-xs text-gray-600">
                    <span className="flex items-center gap-1.5">
                      <ClockIcon className="w-4 h-4 text-[#749220]" />
                      <span>October 15 Extended Deadline</span>
                    </span>
                    <span className="font-semibold text-emerald-600">
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
      <section className="py-12 sm:py-16 bg-slate-50/60 border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-8 sm:mb-10">
            <h2 className="text-2xl sm:text-3xl font-normal text-gray-900 tracking-tight leading-tight">
              Complete Extension{" "}
              <span className="font-semibold bg-gradient-to-r from-[#0A4973] via-[#165479] to-[#749220] bg-clip-text text-transparent">
                Coverage
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 font-normal mt-1.5 leading-relaxed">
              Whether you are an individual filer, business entity, or multi-state earner.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6 items-stretch">
            {extensionTypes.map((ext, idx) => (
              <div
                key={idx}
                className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-[0_12px_28px_rgba(22,84,121,0.08)] hover:border-[#165479]/30 transition-all duration-200 text-left flex flex-col justify-between group"
              >
                <div>
                  {/* Top Row: Icon + Form Badge */}
                  <div className="flex items-center justify-between gap-2 mb-3.5">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-105 ${idx === 1
                        ? "bg-[#F6F9EE] border border-[#749220]/25 text-[#749220]"
                        : "bg-sky-50 border border-sky-100 text-[#165479]"
                        }`}
                    >
                      {ext.icon}
                    </div>

                    <span
                      className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${idx === 1
                        ? "bg-[#F6F9EE] text-[#749220] border-[#749220]/25"
                        : "bg-sky-50 text-[#165479] border-sky-100"
                        }`}
                    >
                      {ext.form}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-base font-semibold text-gray-900 mb-1.5 leading-snug">
                    {ext.title}
                  </h3>

                  {/* Deadline Badge */}
                  <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#749220] bg-[#F6F9EE] px-2.5 py-1 rounded-lg border border-[#749220]/25 mb-3">
                    <ClockIcon className="w-3.5 h-3.5 stroke-[2.2]" />
                    <span>{ext.deadline}</span>
                  </div>

                  {/* Summary */}
                  <p className="text-xs sm:text-[13px] text-gray-500 font-semibold leading-relaxed mb-4">
                    {ext.summary}
                  </p>

                  {/* Points List */}
                  <ul className="space-y-2.5 pt-3.5 border-t border-slate-100">
                    {ext.points.map((pt, pIdx) => (
                      <li
                        key={pIdx}
                        className="flex items-start gap-2.5 text-[13px] sm:text-sm text-gray-800 font-medium leading-snug"
                      >
                        <CheckCircleIcon className="w-4 h-4 text-[#749220] shrink-0 mt-0.5 stroke-[2.2]" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. FAST 3-STEP PROCESS */}
      <section className="py-12 sm:py-16 bg-white border-b border-slate-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-10 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-normal text-gray-900 tracking-tight leading-tight">
              3 Simple Steps to{" "}
              <span className="font-semibold bg-gradient-to-r from-[#0A4973] via-[#165479] to-[#749220] bg-clip-text text-transparent">
                File Your Extension
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 relative text-left">
            {steps.map((st, sIdx) => (
              <div key={sIdx} className="relative flex flex-col justify-start">
                {/* Step Header: Number Badge with connecting line */}
                <div className="flex items-center gap-3 mb-3.5">
                  <div className="w-9 h-9 rounded-xl bg-[#F6F9EE] border border-[#749220]/25 text-[#749220] font-mono font-bold text-xs flex items-center justify-center shrink-0 shadow-2xs">
                    {st.num}
                  </div>
                  {sIdx < steps.length - 1 && (
                    <div className="hidden md:block flex-1 h-[2px] bg-gradient-to-r from-[#749220]/30 to-slate-200" />
                  )}
                </div>

                <h3 className="text-base font-semibold text-gray-900 mb-1.5 leading-snug">
                  {st.title}
                </h3>
                <p className="text-xs sm:text-[13px] text-gray-600 font-normal leading-relaxed">
                  {st.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. CLEAN CTA BANNER */}
      <section className="py-12 sm:py-16 bg-[#0A4973] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-normal tracking-tight text-white mb-2">
            Do Not Miss the Filing Deadline
          </h2>
          <p className="text-xs sm:text-sm text-sky-100 max-w-xl mx-auto mb-6">
            Get your official IRS Form 4868 extension submitted electronically today in just a few minutes.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/login"
              className="inline-flex items-center justify-center gap-2 h-11 px-6 rounded-xl bg-[#749220] hover:bg-[#637d1b] text-white font-medium text-xs sm:text-sm transition-all shadow-md group"
            >
              <span>File Extension Today</span>
              <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <button
              type="button"
              onClick={handleOpenModal}
              className="inline-flex items-center justify-center gap-2 h-11 px-5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium text-xs sm:text-sm border border-white/20 transition-all"
            >
              <span>Talk to CPA</span>
            </button>
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
