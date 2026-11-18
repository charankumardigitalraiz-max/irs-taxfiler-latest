import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  DocumentTextIcon,
  ShieldCheckIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  ClockIcon,
  CalendarDaysIcon,
  GlobeAltIcon,
  CheckBadgeIcon,
} from "@heroicons/react/24/outline";

import SEO from "../../components/seo/SEO";
import LeadModal from "../../components/popup";
import Logo from "../../assets/irsLogo.png";
import indianTaxPhoto from "../../assets/services/indian-tax.jpg";
import foreignIncomePhoto from "../../assets/services/foreign-income.jpg";
import { serviceCardThemes, serviceStepThemes } from "../../constants/serviceThemes";

const IndianTaxFiling = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const title = "Indian & NRI Income Tax Filing Services | DTAA Relief | IRS Tax Filer";
  const description =
    "Expert Indian tax preparation and ITR filing for Non-Resident Indians (NRIs) and U.S. residents. Form 26AS/AIS reconciliation, DTAA foreign tax credits, and capital gains.";
  const keywords =
    "Indian tax filing, NRI ITR filing, Form 26AS reconciliation, AIS TIS report, DTAA foreign tax credit, NRE NRO taxation, IRS Tax Filer";
  const canonical = window.location.href;
  const image = Logo;

  const filingScopes = [
    {
      title: "NRI Capital Gains & Real Estate",
      tag: "Property & Stocks",
      form: "ITR-2 & ITR-3",
      icon: <DocumentTextIcon className="w-5 h-5 text-primary" />,
      summary: "Comprehensive capital gains calculations for Indian ancestral property sales, mutual funds, shares, and Section 54/54EC exemptions.",
      points: [
        "TDS on property sale refund under Section 195",
        "Cost inflation indexation (CII) calculation",
        "Form 15CA & 15CB fund repatriation certificates",
      ],
    },
    {
      title: "NRE / NRO Bank & Fixed Deposits",
      tag: "Banking & Interest",
      form: "TDS Claims & Treaty",
      icon: <GlobeAltIcon className="w-5 h-5 text-teal" />,
      summary: "Optimize tax withholding on Indian bank deposits, NRO interest, and pension income with DTAA concessional tax rates.",
      points: [
        "Form 26AS, AIS, and TIS ledger matching",
        "Lower TDS rate under Article 12 (DTAA)",
        "NRE tax-exempt interest certification",
      ],
    },
    {
      title: "Dual U.S.-India Compliance",
      tag: "Zero Double Tax",
      form: "IRS Form 1116 + ITR",
      icon: <ShieldCheckIcon className="w-5 h-5 text-primary" />,
      summary: "Harmonized reporting so income taxed in India offsets U.S. federal taxes via Form 1116 Foreign Tax Credit (FTC) with zero double taxation.",
      points: [
        "Foreign Tax Credit (FTC) optimization",
        "FBAR & FATCA foreign balance alignment",
        "Section 89A foreign pension relief in U.S.",
      ],
    },
  ];

  const steps = [
    {
      num: "01",
      title: "PAN & AIS/26AS Download",
      detail: "We securely fetch your official Form 26AS, Annual Information Statement (AIS), and Taxpayer Information Summary (TIS).",
    },
    {
      num: "02",
      title: "ITR Preparation & DTAA Relief",
      detail: "Our Indian Chartered Accountants determine your exact residential status and draft your optimized ITR return.",
    },
    {
      num: "03",
      title: "e-Verification & Refund Tracking",
      detail: "We electronically file with the Income Tax Department and track your direct deposit refund to your Indian bank.",
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
                Indian & NRI Tax Filing, <br className="hidden sm:inline" />
                <span className="font-medium text-teal">Cross-Border</span> <span className="font-medium text-coral">Treaty Relief.</span>
              </motion.h1>

              {/* Subheading - Matches Home Hero Typography exactly */}
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="text-sm sm:text-base lg:text-[17px] text-slateText font-medium leading-[30px] sm:leading-[32px] lg:leading-[34px] mb-6 max-w-2xl"
              >
                Specialized ITR preparation for Non-Resident Indians (NRIs), OCIs, and global tech workers. We reconcile Form 26AS, AIS/TIS, claim DTAA foreign tax credits, and eliminate double-taxation across the U.S. and India.
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
                  <span>File Indian Return (ITR)</span>
                  <ArrowRightIcon className="w-4 h-4 stroke-[2.2] group-hover:translate-x-1 transition-transform" />
                </Link>

                <button
                  type="button"
                  onClick={handleOpenModal}
                  className="relative inline-flex items-center justify-center gap-2.5 h-11 sm:h-12 px-6 rounded-xl bg-white hover:bg-background-blue text-teal hover:text-teal border border-border hover:border-teal font-semibold text-sm sm:text-[15px] shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 group cursor-pointer shrink-0"
                >
                  <CalendarDaysIcon className="w-4 h-4 text-teal group-hover:scale-110 transition-transform stroke-[2.2]" />
                  <span>Talk to Cross-Border CA</span>
                </button>
              </motion.div>

              {/* Trust Tag */}
              <div className="pt-4 border-t border-slate-100 flex items-center gap-2 text-xs text-slateText">
                <ShieldCheckIcon className="w-4 h-4 text-teal" />
                <span className="font-medium text-primary">Licensed Indian Chartered Accountants & CPAs</span>
                <span className="text-border">•</span>
                <span>Zero Double-Taxation Guarantee</span>
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
                      India ITR-1 through ITR-5 Filing Suite
                    </span>
                  </div>

                  {/* Real Image */}
                  <img
                    src={indianTaxPhoto}
                    alt="Indian Income Tax Return and NRI Cross-Border Compliance"
                    className="w-full h-[280px] sm:h-[320px] object-cover transition-transform duration-500 group-hover:scale-[1.01]"
                    loading="eager"
                  />

                  {/* Clean Bottom Caption Strip */}
                  <div className="px-4 py-3 bg-white border-t border-slate-100 flex items-center justify-between text-xs text-slateText">
                    <span className="flex items-center gap-1.5">
                      <CheckBadgeIcon className="w-4 h-4 text-primary" />
                      <span>Form 26AS & AIS Reconciliation</span>
                    </span>
                    <span className="font-semibold text-teal">
                      DTAA Tax Relief
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THREE FILING SCOPES (CAPITAL GAINS, NRE/NRO, DUAL COMPLIANCE) */}
      <section className="py-12 sm:py-16 bg-white border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-8 sm:mb-10">
            <h2 className="text-2xl sm:text-3xl font-normal text-primary tracking-tight leading-tight">
              NRI & Resident{" "}
              <span className="font-medium text-teal">
                Tax Filing Scopes
              </span>
            </h2>
            <p className="text-sm sm:text-base text-slateText font-medium leading-relaxed mt-2.5">
              Accurate reporting of Indian income and seamless credit offset in the United States.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
            {filingScopes.map((scope, idx) => {
              const crossBorderStyles = [
                { icon: "bg-gradient-to-br from-[#EE6450] to-[#D9523E] text-white", tag: "text-[#D9523E]", pill: "bg-[#FEF4F2] text-[#D9523E] border-[#EE6450]/25", listBg: "bg-slate-50/80", check: "text-[#EE6450]" },
                { icon: "bg-gradient-to-br from-[#127EAB] to-[#0D6388] text-white", tag: "text-[#127EAB]", pill: "bg-[#EFF9FB] text-[#127EAB] border-[#127EAB]/25", listBg: "bg-slate-50/80", check: "text-[#127EAB]" },
                { icon: "bg-gradient-to-br from-emerald-600 to-emerald-700 text-white", tag: "text-emerald-700", pill: "bg-emerald-50 text-emerald-700 border-emerald-200/80", listBg: "bg-slate-50/80", check: "text-emerald-600" },
              ];
              const cb = crossBorderStyles[idx % crossBorderStyles.length];

              return (
                <div
                  key={idx}
                  className="group p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 text-left flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-4">
                      <div className={`w-11 h-11 rounded-2xl ${cb.icon} flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform`}>
                        {React.cloneElement(scope.icon, { className: "w-5 h-5" })}
                      </div>
                      {scope.form && (
                        <span className={`text-[10.5px] font-mono font-semibold px-2.5 py-1 rounded-lg border ${cb.pill}`}>
                          {scope.form}
                        </span>
                      )}
                    </div>

                    <span className={`text-[11px] font-semibold uppercase tracking-wider ${cb.tag} block mb-1`}>
                      {scope.tag}
                    </span>

                    <h3 className="text-base sm:text-[17px] font-semibold text-primary mb-2 leading-snug">
                      {scope.title}
                    </h3>

                    <p className="text-xs sm:text-[13px] text-slate-600 font-medium leading-relaxed mb-4">
                      {scope.summary}
                    </p>
                  </div>

                  {/* Structured Soft Tinted Checklist Box */}
                  <ul className={`space-y-2 p-3.5 rounded-xl ${cb.listBg} border border-slate-200/60`}>
                    {scope.points.map((pt, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-2 text-xs sm:text-[13px] text-primary font-medium leading-snug">
                        <CheckCircleIcon className={`w-4 h-4 ${cb.check} stroke-[2.2] shrink-0 mt-0.5`} />
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

      {/* 3. DTAA TREATY COMPLIANCE WITH SECONDARY REAL IMAGE */}
      <section className="py-12 sm:py-16 bg-slate-50/60 border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Photo: Foreign Income & Cross-Border */}
            <div className="lg:col-span-5 rounded-2xl overflow-hidden border border-slate-200/90 shadow-2xs">
              <img
                src={foreignIncomePhoto}
                alt="Cross-Border US-India DTAA Tax Treaty Compliance"
                className="w-full h-56 sm:h-72 object-cover"
                loading="lazy"
              />
            </div>

            {/* Right Steps - Editorial Oversized Index Numbers */}
            <div className="lg:col-span-7 space-y-5 text-left">
              <div className="mb-4">
                <h2 className="text-2xl sm:text-3xl font-normal text-primary tracking-tight leading-tight">
                  3-Step Indian ITR{" "}
                  <span className="font-medium text-teal">
                    Submission
                  </span>
                </h2>
              </div>

              <div className="divide-y divide-slate-200/70">
                {steps.map((step, sIdx) => {
                  const numColors = ["text-[#EE6450]/80", "text-[#127EAB]/80", "text-emerald-600/80"];

                  return (
                    <div key={sIdx} className="py-4 first:pt-0 last:pb-0 flex items-start gap-4">
                      <span className={`font-mono text-2xl sm:text-3xl font-semibold tracking-tighter leading-none shrink-0 w-10 ${numColors[sIdx % 3]}`}>
                        {step.num}
                      </span>
                      <div>
                        <h3 className="text-sm sm:text-base font-semibold text-primary mb-1">
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
                Seamless Cross-Border{" "}
                <span className="text-[#EE6450]">Tax Filing</span>
              </h2>
              <p className="text-xs sm:text-sm text-sky-50/90 max-w-xl mx-auto mb-7 font-medium leading-relaxed">
                Get your Indian ITR filed with guaranteed DTAA foreign tax credit optimization by our Chartered Accountants.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-3.5">
                <Link
                  to="/login"
                  className="inline-flex items-center justify-center gap-2 h-11 px-6 rounded-xl bg-white hover:bg-[#EFF9FB] text-primary font-semibold text-xs sm:text-sm transition-all duration-200 shadow-md hover:shadow-lg group"
                >
                  <span>File Indian Return</span>
                  <ArrowRightIcon className="w-4 h-4 text-teal group-hover:translate-x-1 transition-transform" />
                </Link>
                <button
                  type="button"
                  onClick={handleOpenModal}
                  className="inline-flex items-center justify-center gap-2 h-11 px-5 rounded-xl bg-white/15 hover:bg-white/25 text-white font-semibold text-xs sm:text-sm border border-white/30 backdrop-blur-xs transition-all duration-200 cursor-pointer"
                >
                  <span>Consult Indian CA</span>
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
        serviceName="Indian & NRI Tax Filing"
      />
    </div>
  );
};

export default IndianTaxFiling;
