import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  DocumentTextIcon,
  BuildingOffice2Icon,
  MapPinIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  ShieldCheckIcon,
  ChevronDownIcon,
  CalendarDaysIcon,
  CheckBadgeIcon,
} from "@heroicons/react/24/outline";

import SEO from "../../components/seo/SEO";
import LeadModal from "../../components/popup";
import Logo from "../../assets/irsLogo.png";
import individualPhoto from "../../assets/services/individual-1040.jpg";
import multiStatePhoto from "../../assets/services/multi-state.jpg";

const FederalStateLocal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const title = "U.S. Federal, State & Local Tax Filing | CPA-Reviewed | IRS Tax Filer";
  const description =
    "File your U.S. federal Form 1040, multi-state SALT returns, and municipal local taxes online with certified CPA guidance. Guaranteed maximum refund and 100% IRS accuracy.";
  const keywords =
    "federal tax filing, state tax return, local municipal tax, Form 1040, multi-state tax filing, SALT deductions, CPA tax review, IRS Tax Filer";
  const canonical = window.location.href;
  const image = Logo;

  const filingJurisdictions = [
    {
      title: "Federal Tax Filing",
      tag: "Form 1040",
      icon: <DocumentTextIcon className="w-5 h-5 text-[#749220]" />,
      description: "Full federal income tax preparation with deduction audits for individuals, families, and freelancers.",
      points: [
        "Form 1040, W-2 & 1099 e-file",
        "Itemized vs. standard deduction audit",
        "Child, EV, EITC & education credits",
      ],
      compliance: "IRS Authorized Direct e-File",
    },
    {
      title: "State Tax Filing",
      tag: "All 50 States",
      icon: <BuildingOffice2Icon className="w-5 h-5 text-[#165479]" />,
      description: "Multi-state returns ensuring full credit offsets and zero double-taxation across state lines.",
      points: [
        "Resident, part-year & non-resident returns",
        "Out-of-state tax credit reconciliation",
        "Remote worker & commuter compliance",
      ],
      compliance: "50-State SALT e-File",
    },
    {
      title: "City & Local Taxes",
      tag: "Municipal",
      icon: <MapPinIcon className="w-5 h-5 text-[#749220]" />,
      description: "Specialized compliance for cities, counties, and school districts with local tax requirements.",
      points: [
        "NYC, Philadelphia, Ohio RITA & MI cities",
        "Local earned income tax (EIT) filings",
        "Municipal withholding reconciliation",
      ],
      compliance: "Municipal Tax Compliant",
    },
  ];

  const processSteps = [
    {
      step: "01",
      title: "Upload Documents",
      description: "Upload your W-2s, 1099s, and deduction receipts to your encrypted portal.",
    },
    {
      step: "02",
      title: "CPA Prepares Return",
      description: "A licensed CPA reviews eligible write-offs and drafts your complete return.",
    },
    {
      step: "03",
      title: "Review & Sign",
      description: "Check your line-by-line refund calculation and approve before submission.",
    },
    {
      step: "04",
      title: "Direct IRS e-File",
      description: "Direct electronic filing with real-time tracking until your refund arrives.",
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

      {/* 1. HERO SECTION: EXACT MATCH TYPOGRAPHY + REAL IMAGE (NO BREADCRUMBS) */}
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
                Federal, State & Local <br className="hidden sm:inline" />
                <span className="font-medium bg-gradient-to-r from-[#0A4973] via-[#165479] to-[#749220] bg-clip-text text-transparent">
                  Tax Filing, Simplified.
                </span>
              </motion.h1>

              {/* Subheading - Matches Home Hero Typography exactly */}
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="text-sm sm:text-base lg:text-[17px] text-gray-600 font-normal leading-[30px] sm:leading-[32px] lg:leading-[34px] mb-6 max-w-2xl"
              >
                Complete CPA preparation for your Form 1040, multi-state allocations, and city taxes with guaranteed maximum refunds and 100% IRS accuracy.
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
                  <span>Start Filing</span>
                  <ArrowRightIcon className="w-4 h-4 stroke-[2.2] group-hover:translate-x-1 transition-transform" />
                </Link>

                <button
                  type="button"
                  onClick={handleOpenModal}
                  className="inline-flex items-center justify-center gap-2 h-11 sm:h-12 px-5 sm:px-6 rounded-xl bg-white hover:bg-[#F6F9EE] text-[#165479] border-2 border-[#165479]/15 hover:border-[#749220] font-medium text-sm sm:text-[15px] transition-all duration-200 group cursor-pointer shrink-0"
                >
                  <CalendarDaysIcon className="w-4 h-4 text-[#749220] group-hover:scale-110 transition-transform stroke-[2.2]" />
                  <span>Talk to CPA</span>
                </button>
              </motion.div>

              {/* Service Guarantees */}
              <div className="pt-4 border-t border-slate-100 flex items-center gap-2 text-xs text-gray-500">
                <ShieldCheckIcon className="w-4 h-4 text-[#749220]" />
                <span className="font-medium text-gray-800">Licensed CPAs & Enrolled Agents</span>
                <span className="text-gray-300">•</span>
                <span>Direct Electronic Filing to IRS & State Agencies</span>
              </div>
            </div>

            {/* Right Column: Clean Showcase with Real Image */}
            <div className="lg:col-span-5 xl:col-span-5 relative flex justify-center lg:justify-end">
              <div className="relative w-full max-w-[460px]">
                {/* Main Image Card */}
                <div className="relative rounded-2xl overflow-hidden border border-slate-200/90 shadow-[0_16px_40px_rgba(22,84,121,0.08)] bg-white group">
                  {/* Subtle Header Bar */}
                  <div className="px-4 py-2.5 bg-slate-50/90 border-b border-slate-100 flex items-center justify-between text-xs">
                    <span className="font-semibold text-gray-800 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#749220]" />
                      Form 1040 Multi-Jurisdiction Filing
                    </span>
                  </div>

                  {/* Image */}
                  <img
                    src={individualPhoto}
                    alt="U.S. Federal, State and Local Tax Preparation"
                    className="w-full h-[280px] sm:h-[320px] object-cover transition-transform duration-500 group-hover:scale-[1.01]"
                    loading="eager"
                  />

                  {/* Clean Bottom Caption Strip */}
                  <div className="px-4 py-3 bg-white border-t border-slate-100 flex items-center justify-between text-xs text-gray-600">
                    <span className="flex items-center gap-1.5">
                      <CheckBadgeIcon className="w-4 h-4 text-[#165479]" />
                      <span>Dual CPA Line-by-Line Review</span>
                    </span>
                    <span className="font-semibold text-emerald-600">
                      100% IRS Accuracy
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. JURISDICTION FILING TIERS WITH SECONDARY IMAGE */}
      <section className="py-14 sm:py-18 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-10 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-normal text-gray-900 tracking-tight leading-tight">
              Complete Coverage for{" "}
              <span className="font-semibold bg-gradient-to-r from-[#0A4973] via-[#165479] to-[#749220] bg-clip-text text-transparent">
                Every Level
              </span>
            </h2>
            <p className="text-sm sm:text-base text-gray-600 font-normal leading-relaxed mt-2.5">
              From federal Form 1040 to multi-state SALT allocations and city taxes.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Secondary Image: Multi-State SALT Visual */}
            <div className="lg:col-span-4 rounded-2xl overflow-hidden border border-slate-200/90 shadow-2xs relative group min-h-[260px] flex flex-col justify-end">
              <img
                src={multiStatePhoto}
                alt="Multi-State Tax Allocation and SALT Credit Filings"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none" />
              <div className="relative z-10 p-5 text-left text-white">
                <h3 className="text-base font-semibold text-white leading-snug">
                  Multi-State & Remote Worker Tax Returns
                </h3>
                <p className="text-xs text-white/80 mt-1 leading-relaxed">
                  We calculate out-of-state credits so you never get double-taxed.
                </p>
              </div>
            </div>

            {/* 3 Jurisdiction Cards */}
            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-4">
              {filingJurisdictions.map((tier, idx) => (
                <div
                  key={idx}
                  className="group bg-white hover:bg-[#FAFCFE] rounded-2xl p-5 border border-slate-200/90 hover:border-[#165479]/40 shadow-2xs hover:shadow-sm transition-all duration-300 flex flex-col justify-between text-left"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-9 h-9 rounded-xl bg-[#F6F9EE] border border-[#749220]/25 flex items-center justify-center shrink-0">
                        {tier.icon}
                      </div>
                    </div>

                    <h3 className="text-sm font-semibold text-gray-900 group-hover:text-[#165479] transition-colors">
                      {tier.title}
                    </h3>

                    <p className="text-xs sm:text-[13px] text-gray-600 font-normal leading-relaxed mt-1 mb-3">
                      {tier.description}
                    </p>

                    <ul className="space-y-2.5 pt-3 border-t border-slate-100">
                      {tier.points.map((pt, pIdx) => (
                        <li key={pIdx} className="flex items-start gap-2 text-xs sm:text-[13px] text-gray-800 font-medium leading-snug">
                          <CheckCircleIcon className="w-4 h-4 text-[#749220] stroke-[2.2] shrink-0 mt-0.5" />
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-4 pt-2.5 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[10px] text-emerald-600 font-medium">
                      {tier.compliance}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. SIMPLE 4-STEP WORKFLOW */}
      <section className="py-14 sm:py-18 bg-slate-50/60 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-normal text-gray-900 tracking-tight leading-tight">
              How It{" "}
              <span className="font-semibold bg-gradient-to-r from-[#0A4973] via-[#165479] to-[#749220] bg-clip-text text-transparent">
                Works
              </span>
            </h2>
            <p className="text-sm sm:text-base text-gray-600 font-normal leading-relaxed mt-2.5">
              4 simple steps to your complete CPA-prepared tax return.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {processSteps.map((step, sIdx) => (
              <div
                key={sIdx}
                className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-2xs text-left"
              >
                <div className="w-8 h-8 rounded-lg bg-[#F6F9EE] text-[#749220] flex items-center justify-center font-bold text-xs mb-3 font-mono border border-[#749220]/25">
                  {step.step}
                </div>
                <h3 className="text-sm font-semibold text-gray-900">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-[13px] text-gray-600 font-normal mt-1.5 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* 5. CLEAN BOTTOM CTA BANNER */}
      <section className="py-14 sm:py-16 bg-gradient-to-r from-[#0A4973] via-[#165479] to-[#749220] text-white font-sans relative overflow-hidden">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-2xl sm:text-3xl font-normal mb-2 tracking-tight">
            Ready to file your <span className="font-medium text-[#D8EBA4]">Federal & State taxes?</span>
          </h2>
          <p className="text-xs sm:text-sm text-white/90 max-w-md mx-auto mb-6 font-normal">
            Certified CPA preparation with guaranteed maximum refunds and 100% IRS accuracy.
          </p>

          <div className="flex flex-wrap sm:flex-nowrap gap-3 justify-center items-center">
            <Link
              to="/login"
              className="h-11 px-6 rounded-xl bg-white text-[#165479] hover:bg-gray-50 font-medium text-sm shadow-sm transition-all inline-flex items-center justify-center gap-2 group"
            >
              <span>Start Filing</span>
              <ArrowRightIcon className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform stroke-[2]" />
            </Link>

            <button
              type="button"
              onClick={handleOpenModal}
              className="h-11 px-6 rounded-xl bg-white/10 hover:bg-white/20 border border-white/25 text-white font-medium text-sm transition-all inline-flex items-center justify-center gap-2 cursor-pointer group"
            >
              <CalendarDaysIcon className="w-4 h-4 text-[#D8EBA4] stroke-[2] group-hover:scale-110 transition-transform" />
              <span>Talk to CPA</span>
            </button>
          </div>
        </div>
      </section>

      {/* Lead Generation Modal */}
      <LeadModal open={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
};

export default FederalStateLocal;
