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
import { serviceCardThemes, serviceStepThemes } from "../../constants/serviceThemes";

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
      tagColor: "bg-coral/10 text-coral border-coral/20/80",
      icon: <DocumentTextIcon className="w-5 h-5 text-coral" />,
      problem: "IRS claims omitted 1099, W-2, stock sales, or crypto income with high proposed penalties.",
      solution: "We reconstruct cost basis (Form 8949) and submit documented rebuttal letters to eliminate bogus phantom tax assessments.",
    },
    {
      title: "CP504 & Letter 1058 (Intent to Levy)",
      tag: "Urgent Collection Action",
      tagColor: "bg-rose-50 text-coral border-rose-200/80",
      icon: <ExclamationTriangleIcon className="w-5 h-5 text-coral" />,
      problem: "Threats of bank account levies, paycheck garnishments, and federal tax liens.",
      solution: "We file immediate collection stays, request Collection Due Process (CDP) hearings, and structure affordable installment plans.",
    },
    {
      title: "IRS Office & Field Audit Defense",
      tag: "Full CPA Representation",
      tagColor: "bg-sky-50 text-primary border-sky-200/80",
      icon: <ScaleIcon className="w-5 h-5 text-primary" />,
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
    <div className="bg-white text-primary font-sans antialiased">
      <SEO
        title={title}
        description={description}
        canonical={canonical}
        image={image}
        keywords={keywords}
      />

      {/* 1. DISTINCT REPRESENTATION HERO: IMAGE SHOWCASE IN MODERN CARD FRAME */}
      <section className="relative overflow-hidden pt-8 sm:pt-10 lg:pt-12 pb-8 sm:pb-10 bg-white">
        <div className="absolute top-1/4 right-10 w-[500px] h-[500px] bg-gradient-to-bl from-[#1F4264]/[0.06] via-[#127EAB]/[0.05] to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl 2xl:max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7 xl:col-span-7 text-left font-sans">
              {/* Eyebrow Pill */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-background-aqua border border-border text-teal text-xs font-medium text-teal uppercase tracking-wider mb-3.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#127EAB] animate-pulse" />
                <span>IRS Audit & Notice Defense • Form 2848 Power of Attorney</span>
              </div>

              {/* Main Headline - Matches Home Hero Typography exactly */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                style={{ lineHeight: 1.18 }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-[44px] xl:text-[48px] 2xl:text-[52px] font-normal text-primary tracking-tight mb-4 sm:mb-5"
              >
                Never Face the IRS Alone. <br className="hidden sm:inline" />
                <span className="font-medium text-teal">Licensed CPA</span> <span className="font-medium text-coral">Representation</span>
              </motion.h1>

              {/* Subheading - Matches Home Hero Typography exactly */}
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="text-sm sm:text-base lg:text-[17px] text-slateText font-medium leading-[30px] sm:leading-[32px] lg:leading-[34px] mb-6 max-w-2xl"
              >
                Received a CP2000 notice, audit letter, or intent to levy? We file Form 2848 to take over all IRS communications, stop collections, and resolve your tax dispute directly.
              </motion.p>

              {/* 3 Quick Strategic Chips */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mb-6 text-left">
                <div className="p-3 rounded-xl bg-[#EFF9FB]/90 border border-[#127EAB]/25 shadow-2xs">
                  <div className="text-[11px] font-semibold text-[#127EAB] uppercase tracking-wider mb-0.5">Form 2848 POA</div>
                  <div className="text-xs text-slate-600 font-medium">We speak for you</div>
                </div>
                <div className="p-3 rounded-xl bg-[#FEF4F2]/90 border border-[#EE6450]/25 shadow-2xs">
                  <div className="text-[11px] font-semibold text-[#D9523E] uppercase tracking-wider mb-0.5">Stop Collections</div>
                  <div className="text-xs text-slate-600 font-medium">Prevent levies & liens</div>
                </div>
                <div className="p-3 rounded-xl bg-emerald-50/80 border border-emerald-200/80 shadow-2xs">
                  <div className="text-[11px] font-semibold text-emerald-700 uppercase tracking-wider mb-0.5">Penalty Relief</div>
                  <div className="text-xs text-slate-600 font-medium">First-time abatement</div>
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
                  className="relative inline-flex items-center justify-center gap-2.5 h-11 sm:h-12 px-6 rounded-xl bg-primary hover:bg-primary-dark text-white font-semibold text-sm sm:text-[15px] shadow-sm hover:shadow-md transition-all duration-200 group overflow-hidden shrink-0"
                >
                  <span>Resolve My IRS Notice</span>
                  <ArrowRightIcon className="w-4 h-4 stroke-[2.2] group-hover:translate-x-1 transition-transform" />
                </Link>

                <button
                  type="button"
                  onClick={handleOpenModal}
                  className="relative inline-flex items-center justify-center gap-2.5 h-11 sm:h-12 px-6 rounded-xl bg-white hover:bg-background-blue text-teal hover:text-teal border border-border hover:border-teal font-semibold text-sm sm:text-[15px] shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 group cursor-pointer shrink-0"
                >
                  <CalendarDaysIcon className="w-4 h-4 text-teal group-hover:scale-110 transition-transform stroke-[2.2]" />
                  <span>Talk to Audit CPA</span>
                </button>
              </motion.div>

              {/* Trust Tag */}
              {/* <div className="pt-4 border-t border-slate-100 flex items-center gap-2 text-xs text-slateText">
                <ShieldCheckIcon className="w-4 h-4 text-teal" />
                <span className="font-medium text-primary">Licensed CPAs & Enrolled Agents</span>
                <span className="text-border">•</span>
                <span>All 50 States & Federal Representation</span>
              </div> */}
            </div>

            {/* Right Column: Clean Image Showcase */}
            <div className="lg:col-span-5 xl:col-span-5 relative flex justify-center lg:justify-end">
              <div className="relative w-full max-w-[460px]">
                {/* Main Card */}
                <div className="relative rounded-2xl overflow-hidden  bg-white group">
                  {/* Subtle Header Bar */}
                  <div className="px-4 py-2.5 bg-slate-50/90 border-b border-slate-100 flex items-center justify-between text-xs">
                    <span className="font-semibold text-primary flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-background-aqua0 animate-pulse" />
                      IRS Representation & Defense Protocol
                    </span>
                    <span className="text-[10px] font-semibold text-teal bg-background-aqua px-2 py-0.5 rounded-full border border-border/60">
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
                  <div className="px-4 py-3 bg-white border-t border-slate-100 flex items-center justify-between text-xs text-slateText">
                    <span className="flex items-center gap-1.5">
                      <CheckBadgeIcon className="w-4 h-4 text-primary" />
                      <span>Direct CPA Liaison With IRS</span>
                    </span>
                    <span className="font-semibold text-teal">
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
      <section className="py-8 sm:py-10 bg-slate-50/60">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-8 sm:mb-10">
            <h2 className="text-2xl sm:text-3xl font-normal text-primary tracking-tight leading-tight">
              Rapid Response to{" "}
              <span className="font-medium text-teal">
                IRS Notices & Audits
              </span>
            </h2>
            <p className="text-sm sm:text-base text-slateText font-medium leading-relaxed mt-2.5">
              Targeted representation strategies for every stage of federal tax inquiry and examination.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {noticeTiers.map((tier, idx) => {
              const dossierStyles = [
                { headerBg: "bg-amber-50/90 border-amber-200/70", iconBg: "bg-white text-amber-600 border-amber-200", tag: "bg-amber-100/80 text-amber-800", title: "text-primary", defenseBg: "bg-[#EFF9FB]/70 border-[#127EAB]/20" },
                { headerBg: "bg-rose-50/90 border-rose-200/70", iconBg: "bg-white text-[#EE6450] border-rose-200", tag: "bg-rose-100/80 text-rose-800", title: "text-primary", defenseBg: "bg-emerald-50/70 border-emerald-200/80" },
                { headerBg: "bg-sky-50/90 border-sky-200/70", iconBg: "bg-white text-[#127EAB] border-sky-200", tag: "bg-sky-100/80 text-[#0E668B]", title: "text-primary", defenseBg: "bg-indigo-50/70 border-indigo-200/80" },
              ];
              const style = dossierStyles[idx % dossierStyles.length];

              return (
                <div
                  key={idx}
                  className="group rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-md transition-all duration-300 overflow-hidden text-left flex flex-col justify-between"
                >
                  {/* Tinted Case Dossier Header Strip */}
                  <div>
                    <div className={`px-5 py-3.5 border-b ${style.headerBg} flex items-center justify-between gap-2`}>
                      <div className={`w-9 h-9 rounded-xl border ${style.iconBg} flex items-center justify-center shrink-0 shadow-2xs`}>
                        {React.cloneElement(tier.icon, { className: "w-4.5 h-4.5" })}
                      </div>
                      <span className={`text-[10.5px] font-semibold px-2.5 py-1 rounded-full ${style.tag}`}>
                        {tier.tag}
                      </span>
                    </div>

                    {/* Issue Section */}
                    <div className="p-5 pb-4">
                      <h3 className={`text-base font-semibold ${style.title} mb-2.5 leading-snug`}>
                        {tier.title}
                      </h3>

                      <div className="flex items-start gap-2">
                        <span className="mt-1 w-1.5 h-1.5 rounded-full bg-[#EE6450] shrink-0" />
                        <p className="text-xs text-slate-600 font-medium leading-relaxed">
                          <span className="font-semibold text-primary">Issue: </span>
                          {tier.problem}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Defense Resolution Panel */}
                  <div className={`mx-4 mb-4 p-3.5 rounded-xl border ${style.defenseBg}`}>
                    <div className="flex items-center gap-1.5 text-[11px] font-semibold text-teal uppercase tracking-wider mb-1">
                      <ShieldCheckIcon className="w-3.5 h-3.5 shrink-0" />
                      <span>Our CPA Defense</span>
                    </div>
                    <p className="text-xs text-primary/90 font-medium leading-relaxed">
                      {tier.solution}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. THREE-STEP DEFENSE PROTOCOL WITH SECONDARY IMAGE */}
      <section className="py-8 sm:py-10 bg-white">
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

            {/* Right Steps - Solid Numbered Pill Rows */}
            <div className="lg:col-span-7 space-y-4 text-left">
              <div className="mb-4">
                <h2 className="text-2xl sm:text-3xl font-normal text-primary tracking-tight leading-tight">
                  3-Step Representation{" "}
                  <span className="font-medium text-teal">
                    Protocol
                  </span>
                </h2>
              </div>

              <div className="space-y-4">
                {defenseSteps.map((step, sIdx) => {
                  const circleColors = ["bg-[#1F4264]", "bg-[#127EAB]", "bg-emerald-600"];
                  const titleColors = ["text-[#1F4264]", "text-[#127EAB]", "text-emerald-700"];

                  return (
                    <div key={sIdx} className="flex items-start gap-4 group">
                      <div className={`w-9 h-9 rounded-full ${circleColors[sIdx % 3]} text-white font-mono font-semibold text-xs flex items-center justify-center shrink-0 mt-0.5 shadow-sm group-hover:scale-105 transition-transform`}>
                        {step.num}
                      </div>
                      <div className="pb-4 border-b border-slate-100 last:border-b-0 flex-1">
                        <h3 className={`text-sm sm:text-base font-semibold ${titleColors[sIdx % 3]} mb-1`}>
                          {step.title}
                        </h3>
                        <p className="text-xs sm:text-[13px] text-slate-600 font-medium leading-relaxed">
                          {step.detail}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* 5. URGENT ASSISTANCE ACTION BANNER */}
      <section className="py-8 sm:py-10 bg-white font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl py-10 sm:py-12 px-6 sm:px-12 bg-gradient-to-r from-[#0D6388] via-[#127EAB] to-[#168BB8] text-white shadow-xl text-center">
            {/* Subtle Ambient Glows */}
            <div className="absolute -top-24 -left-16 w-72 h-72 bg-white/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -right-16 w-72 h-72 bg-[#1F4264]/25 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-3xl mx-auto relative z-10">
              <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white mb-2.5">
                Have an Approaching{" "}
                <span className="text-[#EE6450]">IRS Deadline?</span>
              </h2>
              <p className="text-xs sm:text-sm text-sky-50/90 max-w-xl mx-auto mb-7 font-medium leading-relaxed">
                Do not let statutory 30-day or 90-day response deadlines lapse. Get experienced CPA defense today.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-3.5">
                <Link
                  to="/login"
                  className="inline-flex items-center justify-center gap-2 h-11 px-6 rounded-xl bg-white hover:bg-[#EFF9FB] text-primary font-semibold text-xs sm:text-sm transition-all duration-200 shadow-md hover:shadow-lg group"
                >
                  <span>Get Immediate Defense</span>
                  <ArrowRightIcon className="w-4 h-4 text-teal group-hover:translate-x-1 transition-transform" />
                </Link>
                <button
                  type="button"
                  onClick={handleOpenModal}
                  className="inline-flex items-center justify-center gap-2 h-11 px-5 rounded-xl bg-white/15 hover:bg-white/25 text-white font-semibold text-xs sm:text-sm border border-white/30 backdrop-blur-xs transition-all duration-200 cursor-pointer"
                >
                  <span>Free Notice Diagnostic</span>
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
        serviceName="IRS Tax Representation & Notice Defense"
      />
    </div>
  );
};

export default Representation;
