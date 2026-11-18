import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  BuildingLibraryIcon,
  ShieldCheckIcon,
  DocumentTextIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  ClockIcon,
  CalendarDaysIcon,
  ScaleIcon,
  CheckBadgeIcon,
} from "@heroicons/react/24/outline";

import SEO from "../../components/seo/SEO";
import LeadModal from "../../components/popup";
import Logo from "../../assets/irsLogo.png";
import expatPhoto from "../../assets/indian-income-tax-notice-defense-isometric.jpg";
import defensePhoto from "../../assets/services/streamlined-irs.jpg";
import { serviceCardThemes, serviceStepThemes } from "../../constants/serviceThemes";

const IndianRepresentation = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const title = "Indian Tax Notice Defense & Representation Services | CIT(Appeals) | IRS Tax Filer";
  const description =
    "Expert representation before the Indian Income Tax Department and CIT(A). Respond to Section 143(1), 148, and 144 tax notices with senior Chartered Accountants.";
  const keywords =
    "Indian tax notice, Section 148 notice, Section 143(1) intimation, CIT appeals, ITAT representation, faceless assessment, Chartered Accountant India, IRS Tax Filer";
  const canonical = window.location.href;
  const image = Logo;

  const noticeCategories = [
    {
      title: "Section 143(1) Intimation & Defective Returns",
      tag: "Math & Deduction Disputes",
      icon: <DocumentTextIcon className="w-5 h-5 text-primary" />,
      summary: "Resolution for tax demand notices resulting from CPC Bangalore algorithmic adjustments, TDS mismatch, or unverified returns.",
      points: [
        "Online rectification under Section 154 filed",
        "Form 26AS & AIS credit mismatch reconciliation",
        "Reversal of unjustified tax and interest demands",
      ],
    },
    {
      title: "Section 148 & 148A Reassessment Notices",
      tag: "Reopening & High-Value Cash",
      icon: <ShieldCheckIcon className="w-5 h-5 text-teal" />,
      summary: "Authoritative defense when the tax officer reopens prior tax years due to high-value cash deposits, property deals, or unfiled returns.",
      points: [
        "Challenging lack of jurisdiction and approval defects",
        "Substantiating legitimate sources of funds and remittances",
        "Preventing arbitrary ex-parte best judgment assessments",
      ],
    },
    {
      title: "Faceless Appeals before CIT(Appeals)",
      tag: "Statutory Defense",
      icon: <ScaleIcon className="w-5 h-5 text-primary" />,
      summary: "Drafting robust Statements of Facts and Grounds of Appeal before the National Faceless Appeal Centre (NFAC) for contested orders.",
      points: [
        "Form 35 submission within 30-day statutory limit",
        "Case law citations and comprehensive paperbook prep",
        "Stay of demand petition under Section 220(6)",
      ],
    },
  ];

  const steps = [
    {
      num: "01",
      title: "Notice Analysis & Timeline Check",
      detail: "Upload your IT Department notice. Our senior CAs review the DIN number, statutory deadlines, and grounds of inquiry.",
    },
    {
      num: "02",
      title: "Document Gathering & Written Rebuttal",
      detail: "We draft formal written submissions supported by bank ledgers, foreign remittance slips, and tax treaties.",
    },
    {
      num: "03",
      title: "e-Proceedings Submission & Relief",
      detail: "We submit the response directly via the Income Tax e-filing portal and monitor the order until formal case closure.",
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
                Indian Tax Representation, <br className="hidden sm:inline" />
                <span className="font-medium text-teal">Notice Defense</span> & <span className="font-medium text-coral">Appeals.</span>
              </motion.h1>

              {/* Subheading - Matches Home Hero Typography exactly */}
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="text-sm sm:text-base lg:text-[17px] text-slateText font-medium leading-[30px] sm:leading-[32px] lg:leading-[34px] mb-6 max-w-2xl"
              >
                Received an Income Tax Notice under Section 143(1), 148, or 144? Our senior Chartered Accountants represent NRIs and residents directly before the Income Tax Department and CIT(Appeals) with zero hassle.
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
                  <span>Resolve Indian Notice</span>
                  <ArrowRightIcon className="w-4 h-4 stroke-[2.2] group-hover:translate-x-1 transition-transform" />
                </Link>

                <button
                  type="button"
                  onClick={handleOpenModal}
                  className="relative inline-flex items-center justify-center gap-2.5 h-11 sm:h-12 px-6 rounded-xl bg-white hover:bg-background-blue text-teal hover:text-teal border border-border hover:border-teal font-semibold text-sm sm:text-[15px] shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 group cursor-pointer shrink-0"
                >
                  <CalendarDaysIcon className="w-4 h-4 text-teal group-hover:scale-110 transition-transform stroke-[2.2]" />
                  <span>Talk to Senior CA</span>
                </button>
              </motion.div>

              {/* Trust Tag */}
              <div className="pt-4 border-t border-slate-100 flex items-center gap-2 text-xs text-slateText">
                <ShieldCheckIcon className="w-4 h-4 text-teal" />
                <span className="font-medium text-primary">100% Digital Representation Across India</span>
                <span className="text-border">•</span>
                <span>Direct Liaison with Assessing Officers</span>
              </div>
            </div>

            {/* Right Column: High-Impact Image Showcase */}
            <div className="lg:col-span-5 xl:col-span-5 relative flex justify-center lg:justify-end">
              <div className="relative w-full max-w-[540px] xl:max-w-[580px]">
                <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-white group">
                  <img
                    src={expatPhoto}
                    alt="Indian Income Tax Department Representation and Notice Defense"
                    className="w-full h-[340px] sm:h-[400px] lg:h-[450px] xl:h-[490px] object-cover transition-transform duration-500 group-hover:scale-[1.01]"
                    loading="eager"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THREE NOTICE RESOLUTION CATEGORIES */}
      <section className="py-12 sm:py-16 bg-white border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-8 sm:mb-10">
            <h2 className="text-2xl sm:text-3xl font-normal text-primary tracking-tight leading-tight">
              Indian Tax Notices{" "}
              <span className="font-medium text-teal">
                Resolved & Defended
              </span>
            </h2>
            <p className="text-sm sm:text-base text-slateText font-medium leading-relaxed mt-2.5">
              Experienced defense for all types of Income Tax Department communications.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {noticeCategories.map((cat, idx) => {
              const briefStyles = [
                { borderHover: "hover:border-[#EE6450]/45", pill: "bg-[#EE6450] text-white", icon: "bg-[#FEF4F2] text-[#EE6450]", title: "text-[#D9523E]", check: "text-[#EE6450]", box: "bg-[#FEF4F2]/50 border-[#EE6450]/15" },
                { borderHover: "hover:border-[#127EAB]/45", pill: "bg-[#127EAB] text-white", icon: "bg-[#EFF9FB] text-[#127EAB]", title: "text-[#127EAB]", check: "text-[#127EAB]", box: "bg-[#EFF9FB]/55 border-[#127EAB]/15" },
                { borderHover: "hover:border-indigo-400/50", pill: "bg-indigo-600 text-white", icon: "bg-indigo-50 text-indigo-600", title: "text-indigo-700", check: "text-indigo-600", box: "bg-indigo-50/50 border-indigo-200/60" },
              ];
              const br = briefStyles[idx % briefStyles.length];

              return (
                <div
                  key={idx}
                  className={`group p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/90 ${br.borderHover} shadow-2xs hover:shadow-md transition-all duration-300 text-left flex flex-col justify-between`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3.5">
                      <div className={`w-10 h-10 rounded-xl ${br.icon} flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform`}>
                        {React.cloneElement(cat.icon, { className: "w-5 h-5" })}
                      </div>
                      {cat.tag && (
                        <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-md ${br.pill}`}>
                          {cat.tag}
                        </span>
                      )}
                    </div>

                    <h3 className={`text-base font-semibold ${br.title} mb-2 leading-snug`}>
                      {cat.title}
                    </h3>

                    <p className="text-xs sm:text-[13px] text-slate-600 font-medium leading-relaxed mb-4">
                      {cat.summary}
                    </p>
                  </div>

                  <ul className={`space-y-2 p-3.5 rounded-xl border ${br.box}`}>
                    {cat.points.map((pt, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-2 text-xs sm:text-[13px] text-primary font-medium leading-snug">
                        <CheckCircleIcon className={`w-4 h-4 ${br.check} stroke-[2.2] shrink-0 mt-0.5`} />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. THREE-STEP NOTICE RESOLUTION PROTOCOL WITH SECONDARY IMAGE */}
      <section className="py-12 sm:py-16 bg-slate-50/60 border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Photo */}
            <div className="lg:col-span-5 rounded-2xl overflow-hidden border border-slate-200/90 shadow-2xs">
              <img
                src={defensePhoto}
                alt="Income Tax Department Scrutiny Notice Examination"
                className="w-full h-56 sm:h-72 object-cover"
                loading="lazy"
              />
            </div>

            {/* Right Steps - Connected Vertical Shield Stepper */}
            <div className="lg:col-span-7 space-y-4 text-left">
              <div className="mb-4">
                <h2 className="text-2xl sm:text-3xl font-normal text-primary tracking-tight leading-tight">
                  3-Step Notice{" "}
                  <span className="font-medium text-teal">
                    Defense Protocol
                  </span>
                </h2>
              </div>

              <div className="relative pl-5 space-y-5 before:content-[''] before:absolute before:left-[15px] before:top-4 before:bottom-4 before:w-0.5 before:bg-slate-200">
                {steps.map((step, sIdx) => {
                  const nodeBg = ["bg-[#EE6450]", "bg-[#127EAB]", "bg-[#1F4264]"];

                  return (
                    <div key={sIdx} className="relative pl-5">
                      <span className={`absolute -left-[20px] top-0.5 w-8 h-8 rounded-lg ${nodeBg[sIdx % 3]} text-white font-mono font-semibold text-xs flex items-center justify-center ring-4 ring-slate-50 shadow-xs`}>
                        {step.num}
                      </span>
                      <div className="bg-white rounded-xl p-4 border border-slate-200/80 shadow-2xs">
                        <h3 className="text-sm sm:text-[15px] font-semibold text-primary mb-0.5">
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

      {/* 4. CLEAN CTA BANNER */}
      <section className="py-10 sm:py-14 bg-white font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl py-10 sm:py-12 px-6 sm:px-12 bg-gradient-to-r from-[#0D6388] via-[#127EAB] to-[#168BB8] text-white shadow-xl text-center">
            {/* Subtle Ambient Glows */}
            <div className="absolute -top-24 -left-16 w-72 h-72 bg-white/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -right-16 w-72 h-72 bg-[#1F4264]/25 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-3xl mx-auto relative z-10">
              <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white mb-2.5">
                Received an Income Tax Notice{" "}
                <span className="text-[#EE6450]">from India?</span>
              </h2>
              <p className="text-xs sm:text-sm text-sky-50/90 max-w-xl mx-auto mb-7 font-medium leading-relaxed">
                Do not let statutory response deadlines lapse. Get experienced Chartered Accountant representation today.
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
                  <span>Book Notice Consultation</span>
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
        serviceName="Indian Tax Representation & Notice Defense"
      />
    </div>
  );
};

export default IndianRepresentation;
