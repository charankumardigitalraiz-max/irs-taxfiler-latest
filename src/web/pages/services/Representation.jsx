import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldCheckIcon,
  DocumentTextIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  ChevronRightIcon,
  CalendarDaysIcon,
  ExclamationTriangleIcon,
  ScaleIcon,
  ChevronDownIcon,
  CheckBadgeIcon,
} from "@heroicons/react/24/outline";

import SEO from "../../components/seo/SEO";
import LeadModal from "../../components/popup";
import Logo from "../../assets/irsLogo.png";
import cpaAdvisoryPhoto from "../../assets/services/cpa-advisory.jpg";
import noticePhoto from "../../assets/services/streamlined-irs.jpg";

const Representation = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const title = "IRS & State Tax Representation Services | Audit Defense | IRS Tax Filer";
  const description =
    "Professional representation before the IRS and state tax authorities by licensed CPAs. Audit defense, notice response (CP2000), penalty abatement, and appeals.";
  const keywords =
    "IRS representation, audit defense, tax dispute, CP2000 notice, penalty abatement, IRS appeals, CPA power of attorney, IRS Tax Filer";
  const canonical = window.location.href;
  const image = Logo;

  // 3 Primary Notice & Defense Tiers
  const noticeTiers = [
    {
      title: "CP2000 & CP2501 Underreporter Notices",
      tag: "30-Day Response Window",
      tagColor: "bg-amber-50 text-amber-800 border-amber-200/80",
      icon: <DocumentTextIcon className="w-5 h-5 text-amber-600" />,
      problem: "IRS claims omitted 1099, W-2, stock sales, or crypto income with high proposed penalties.",
      solution: "We reconstruct cost basis (Form 8949) and submit documented rebuttal letters to eliminate bogus phantom tax assessments.",
    },
    {
      title: "CP504 & Letter 1058 (Intent to Levy)",
      tag: "Urgent Collection Action",
      tagColor: "bg-rose-50 text-rose-800 border-rose-200/80",
      icon: <ExclamationTriangleIcon className="w-5 h-5 text-rose-600" />,
      problem: "Threats of bank account levies, paycheck garnishments, and federal tax liens.",
      solution: "We file immediate collection stays, request Collection Due Process (CDP) hearings, and structure affordable installment plans.",
    },
    {
      title: "IRS Office & Field Audit Defense",
      tag: "Full CPA Representation",
      tagColor: "bg-sky-50 text-[#165479] border-sky-200/80",
      icon: <ScaleIcon className="w-5 h-5 text-[#165479]" />,
      problem: "IRS revenue agent demanding substantiation for Schedule C deductions, credits, or write-offs.",
      solution: "Our CPAs represent you under Form 2848 Power of Attorney so you never have to speak or meet with IRS auditors.",
    },
  ];

  // 3-Step Defense Protocol
  const defenseSteps = [
    {
      num: "01",
      title: "Notice Diagnostic",
      detail: "Upload your IRS letter. Our CPAs evaluate statutory deadlines, calculation flaws, and penalty relief eligibility.",
    },
    {
      num: "02",
      title: "Form 2848 Power of Attorney",
      detail: "We file formal POA with the IRS Centralized Authorization File (CAF). All IRS calls and correspondence transfer to us.",
    },
    {
      num: "03",
      title: "Rebuttal & Resolution",
      detail: "We submit certified documentation, dispute erroneous balances, apply for First-Time Penalty Abatement, and close the case.",
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

      {/* 1. DISTINCT REPRESENTATION HERO: IMAGE SHOWCASE IN MODERN CARD FRAME */}
      <section className="relative overflow-hidden pt-8 sm:pt-10 lg:pt-12 pb-12 sm:pb-16 lg:pb-20 bg-white border-b border-slate-100">
        <div className="absolute top-1/4 right-10 w-[500px] h-[500px] bg-gradient-to-bl from-[#165479]/[0.06] via-[#749220]/[0.05] to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl 2xl:max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7 xl:col-span-7 text-left font-sans">
              {/* Eyebrow Pill */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F6F9EE] border border-[#749220]/25 text-xs font-medium text-[#749220] uppercase tracking-wider mb-3.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#749220] animate-pulse" />
                <span>IRS Audit & Notice Defense • Form 2848 Power of Attorney</span>
              </div>

              {/* Main Headline - Matches Home Hero Typography exactly */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                style={{ lineHeight: 1.18 }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-[44px] xl:text-[48px] 2xl:text-[52px] font-normal text-gray-900 tracking-tight mb-4 sm:mb-5"
              >
                Never Face the IRS Alone. <br className="hidden sm:inline" />
                <span className="font-medium bg-gradient-to-r from-[#0A4973] via-[#165479] to-[#749220] bg-clip-text text-transparent">
                  Licensed CPA Representation
                </span>
              </motion.h1>

              {/* Subheading - Matches Home Hero Typography exactly */}
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="text-sm sm:text-base lg:text-[17px] text-gray-600 font-normal leading-[30px] sm:leading-[32px] lg:leading-[34px] mb-6 max-w-2xl"
              >
                Received a CP2000 notice, audit letter, or intent to levy? We file Form 2848 to take over all IRS communications, stop collections, and resolve your tax dispute directly.
              </motion.p>

              {/* 3 Quick Strategic Chips */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mb-6 text-left">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                  <div className="text-[11px] font-bold text-[#165479] uppercase tracking-wider mb-0.5">Form 2848 POA</div>
                  <div className="text-xs text-gray-600 font-normal">We speak for you</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                  <div className="text-[11px] font-bold text-rose-700 uppercase tracking-wider mb-0.5">Stop Collections</div>
                  <div className="text-xs text-gray-600 font-normal">Prevent levies & liens</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                  <div className="text-[11px] font-bold text-[#749220] uppercase tracking-wider mb-0.5">Penalty Relief</div>
                  <div className="text-xs text-gray-600 font-normal">First-time abatement</div>
                </div>
              </div>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="flex flex-wrap sm:flex-nowrap items-center gap-3 mb-6"
              >
                <Link
                  to="/login"
                  className="inline-flex items-center justify-center gap-2 h-11 sm:h-12 px-6 rounded-xl bg-gradient-to-r from-[#0C3D5A] via-[#165479] to-[#1A5B82] hover:from-[#09324A] hover:via-[#134969] hover:to-[#165479] text-white font-medium text-sm sm:text-[15px] shadow-[0_4px_16px_rgba(22,84,121,0.25)] border border-white/20 transition-all duration-200 group shrink-0"
                >
                  <span>Resolve My IRS Notice</span>
                  <ArrowRightIcon className="w-4 h-4 stroke-[2.2] group-hover:translate-x-1 transition-transform" />
                </Link>

                <button
                  type="button"
                  onClick={handleOpenModal}
                  className="inline-flex items-center justify-center gap-2 h-11 sm:h-12 px-5 sm:px-6 rounded-xl bg-white hover:bg-[#F6F9EE] text-[#165479] border-2 border-[#165479]/15 hover:border-[#749220] font-medium text-sm sm:text-[15px] transition-all duration-200 group cursor-pointer shrink-0"
                >
                  <CalendarDaysIcon className="w-4 h-4 text-[#749220] group-hover:scale-110 transition-transform stroke-[2.2]" />
                  <span>Talk to Audit CPA</span>
                </button>
              </motion.div>

              {/* Trust Tag */}
              <div className="pt-4 border-t border-slate-100 flex items-center gap-2 text-xs text-gray-500">
                <ShieldCheckIcon className="w-4 h-4 text-[#749220]" />
                <span className="font-medium text-gray-800">Licensed CPAs & Enrolled Agents</span>
                <span className="text-gray-300">•</span>
                <span>All 50 States & Federal Representation</span>
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
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      IRS Representation & Defense Protocol
                    </span>
                    <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60">
                      Form 2848 Active
                    </span>
                  </div>

                  {/* Real Image */}
                  <img
                    src={cpaAdvisoryPhoto}
                    alt="Licensed CPA Tax Defense and IRS Representation Consultation"
                    className="w-full h-[280px] sm:h-[320px] object-cover transition-transform duration-500 group-hover:scale-[1.01]"
                    loading="eager"
                  />

                  {/* Clean Bottom Caption Strip */}
                  <div className="px-4 py-3 bg-white border-t border-slate-100 flex items-center justify-between text-xs text-gray-600">
                    <span className="flex items-center gap-1.5">
                      <CheckBadgeIcon className="w-4 h-4 text-[#165479]" />
                      <span>Direct CPA Liaison With IRS</span>
                    </span>
                    <span className="font-semibold text-emerald-600">
                      100% Client Protected
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THREE HIGH-IMPACT NOTICE SOLUTIONS */}
      <section className="py-12 sm:py-16 bg-slate-50/60 border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-8 sm:mb-10">
            <h2 className="text-2xl sm:text-3xl font-normal text-gray-900 tracking-tight leading-tight">
              Rapid Response to{" "}
              <span className="font-semibold bg-gradient-to-r from-[#0A4973] via-[#165479] to-[#749220] bg-clip-text text-transparent">
                IRS Notices & Audits
              </span>
            </h2>
            <p className="text-sm sm:text-base text-gray-600 font-normal leading-relaxed mt-2.5">
              Targeted representation strategies for every stage of federal tax inquiry and examination.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {noticeTiers.map((tier, idx) => (
              <div
                key={idx}
                className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/80 shadow-2xs text-left flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3.5">
                    <div className="w-9 h-9 rounded-xl bg-slate-50 border border-slate-200/60 flex items-center justify-center shrink-0">
                      {tier.icon}
                    </div>
                    <span className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full border ${tier.tagColor}`}>
                      {tier.tag}
                    </span>
                  </div>

                  <h3 className="text-base font-semibold text-gray-900 mb-2 leading-snug">
                    {tier.title}
                  </h3>

                  <div className="mb-3">
                    <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block mb-0.5">Issue:</span>
                    <p className="text-xs text-gray-600 font-normal leading-relaxed">
                      {tier.problem}
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100">
                  <span className="text-[11px] font-bold text-[#749220] uppercase tracking-wider block mb-0.5">Our Defense:</span>
                  <p className="text-xs text-gray-700 font-medium leading-relaxed">
                    {tier.solution}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. THREE-STEP DEFENSE PROTOCOL WITH SECONDARY IMAGE */}
      <section className="py-12 sm:py-16 bg-white border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Photo */}
            <div className="lg:col-span-5 rounded-2xl overflow-hidden border border-slate-200/90 shadow-2xs">
              <img
                src={noticePhoto}
                alt="IRS Audit Defense Documentation and Case Review"
                className="w-full h-56 sm:h-72 object-cover"
                loading="lazy"
              />
            </div>

            {/* Right Steps */}
            <div className="lg:col-span-7 space-y-4 text-left">
              <div className="mb-4">
                <h2 className="text-2xl sm:text-3xl font-normal text-gray-900 tracking-tight leading-tight">
                  3-Step Representation{" "}
                  <span className="font-semibold bg-gradient-to-r from-[#0A4973] via-[#165479] to-[#749220] bg-clip-text text-transparent">
                    Protocol
                  </span>
                </h2>
              </div>

              <div className="space-y-4">
                {defenseSteps.map((step, sIdx) => (
                  <div key={sIdx} className="flex items-start gap-3.5">
                    <div className="w-8 h-8 rounded-lg bg-[#F6F9EE] text-[#749220] font-mono font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 border border-[#749220]/25">
                      {step.num}
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-gray-900 mb-0.5">
                        {step.title}
                      </h3>
                      <p className="text-xs sm:text-[13px] text-gray-600 font-normal leading-relaxed">
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


      {/* 5. URGENT ASSISTANCE ACTION BANNER */}
      <section className="py-12 sm:py-16 bg-[#0A4973] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-normal tracking-tight text-white mb-2">
            Have an Approaching IRS Deadline?
          </h2>
          <p className="text-xs sm:text-sm text-sky-100 max-w-xl mx-auto mb-6">
            Do not let statutory 30-day or 90-day response deadlines lapse. Get experienced CPA defense today.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/login"
              className="inline-flex items-center justify-center gap-2 h-11 px-6 rounded-xl bg-[#749220] hover:bg-[#637d1b] text-white font-medium text-xs sm:text-sm transition-all shadow-md group"
            >
              <span>Get Immediate Defense</span>
              <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <button
              type="button"
              onClick={handleOpenModal}
              className="inline-flex items-center justify-center gap-2 h-11 px-5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium text-xs sm:text-sm border border-white/20 transition-all"
            >
              <span>Free Notice Diagnostic</span>
            </button>
          </div>
        </div>
      </section>

      {/* Lead Modal */}
      <LeadModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        serviceName="IRS Tax Representation & Notice Defense"
      />
    </div>
  );
};

export default Representation;
