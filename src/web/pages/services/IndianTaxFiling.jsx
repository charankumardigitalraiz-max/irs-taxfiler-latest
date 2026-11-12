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
      icon: <DocumentTextIcon className="w-5 h-5 text-[#165479]" />,
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
      icon: <GlobeAltIcon className="w-5 h-5 text-[#749220]" />,
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
      icon: <ShieldCheckIcon className="w-5 h-5 text-[#165479]" />,
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
                Indian & NRI Tax Filing, <br className="hidden sm:inline" />
                <span className="font-medium bg-gradient-to-r from-[#0A4973] via-[#165479] to-[#749220] bg-clip-text text-transparent">
                  Cross-Border DTAA Treaty Relief.
                </span>
              </motion.h1>

              {/* Subheading - Matches Home Hero Typography exactly */}
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="text-sm sm:text-base lg:text-[17px] text-gray-600 font-normal leading-[30px] sm:leading-[32px] lg:leading-[34px] mb-6 max-w-2xl"
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
                  className="inline-flex items-center justify-center gap-2 h-11 sm:h-12 px-6 rounded-xl bg-gradient-to-r from-[#0C3D5A] via-[#165479] to-[#1A5B82] hover:from-[#09324A] hover:via-[#134969] hover:to-[#165479] text-white font-medium text-sm sm:text-[15px] shadow-[0_4px_16px_rgba(22,84,121,0.25)] border border-white/20 transition-all duration-200 group shrink-0"
                >
                  <span>File Indian Return (ITR)</span>
                  <ArrowRightIcon className="w-4 h-4 stroke-[2.2] group-hover:translate-x-1 transition-transform" />
                </Link>

                <button
                  type="button"
                  onClick={handleOpenModal}
                  className="inline-flex items-center justify-center gap-2 h-11 sm:h-12 px-5 sm:px-6 rounded-xl bg-white hover:bg-[#F6F9EE] text-[#165479] border-2 border-[#165479]/15 hover:border-[#749220] font-medium text-sm sm:text-[15px] transition-all duration-200 group cursor-pointer shrink-0"
                >
                  <CalendarDaysIcon className="w-4 h-4 text-[#749220] group-hover:scale-110 transition-transform stroke-[2.2]" />
                  <span>Talk to Cross-Border CA</span>
                </button>
              </motion.div>

              {/* Trust Tag */}
              <div className="pt-4 border-t border-slate-100 flex items-center gap-2 text-xs text-gray-500">
                <ShieldCheckIcon className="w-4 h-4 text-[#749220]" />
                <span className="font-medium text-gray-800">Licensed Indian Chartered Accountants & CPAs</span>
                <span className="text-gray-300">•</span>
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
                    <span className="font-semibold text-gray-800 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#749220]" />
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
                  <div className="px-4 py-3 bg-white border-t border-slate-100 flex items-center justify-between text-xs text-gray-600">
                    <span className="flex items-center gap-1.5">
                      <CheckBadgeIcon className="w-4 h-4 text-[#165479]" />
                      <span>Form 26AS & AIS Reconciliation</span>
                    </span>
                    <span className="font-semibold text-emerald-600">
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
            <h2 className="text-2xl sm:text-3xl font-normal text-gray-900 tracking-tight leading-tight">
              NRI & Resident{" "}
              <span className="font-semibold bg-gradient-to-r from-[#0A4973] via-[#165479] to-[#749220] bg-clip-text text-transparent">
                Tax Filing Scopes
              </span>
            </h2>
            <p className="text-sm sm:text-base text-gray-600 font-normal leading-relaxed mt-2.5">
              Accurate reporting of Indian income and seamless credit offset in the United States.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {filingScopes.map((scope, idx) => (
              <div
                key={idx}
                className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/80 shadow-2xs hover:border-[#165479]/30 hover:shadow-sm transition-all text-left flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3.5">
                    <div className="w-9 h-9 rounded-xl bg-slate-50 border border-slate-200/60 flex items-center justify-center shrink-0">
                      {scope.icon}
                    </div>
                    {scope.form && (
                      <span className="text-[10.5px] font-medium px-2 py-0.5 rounded-md border bg-sky-50 text-[#165479] border-sky-100">
                        {scope.form}
                      </span>
                    )}
                  </div>

                  <h3 className="text-base font-semibold text-gray-900 mb-1 leading-snug">
                    {scope.title}
                  </h3>

                  <div className="text-[11px] font-bold text-[#749220] mb-2.5">
                    {scope.tag}
                  </div>

                  <p className="text-xs sm:text-[13px] text-gray-600 font-normal leading-relaxed mb-4">
                    {scope.summary}
                  </p>

                  <ul className="space-y-2.5 pt-3.5 border-t border-slate-100">
                    {scope.points.map((pt, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-2.5 text-[13px] sm:text-sm text-gray-800 font-medium leading-snug">
                        <CheckCircleIcon className="w-4 h-4 text-[#749220] stroke-[2.2] shrink-0 mt-0.5" />
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

            {/* Right Steps */}
            <div className="lg:col-span-7 space-y-4 text-left">
              <div className="mb-4">
                <h2 className="text-2xl sm:text-3xl font-normal text-gray-900 tracking-tight leading-tight">
                  3-Step Indian ITR{" "}
                  <span className="font-semibold bg-gradient-to-r from-[#0A4973] via-[#165479] to-[#749220] bg-clip-text text-transparent">
                    Submission
                  </span>
                </h2>
              </div>

              <div className="space-y-4">
                {steps.map((step, sIdx) => (
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

      {/* 4. CLEAN CTA BANNER */}
      <section className="py-12 sm:py-16 bg-[#0A4973] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-normal tracking-tight text-white mb-2">
            Seamless Cross-Border Tax Filing
          </h2>
          <p className="text-xs sm:text-sm text-sky-100 max-w-xl mx-auto mb-6">
            Get your Indian ITR filed with guaranteed DTAA foreign tax credit optimization by our Chartered Accountants.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/login"
              className="inline-flex items-center justify-center gap-2 h-11 px-6 rounded-xl bg-[#749220] hover:bg-[#637d1b] text-white font-medium text-xs sm:text-sm transition-all shadow-md group"
            >
              <span>File Indian Return</span>
              <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <button
              type="button"
              onClick={handleOpenModal}
              className="inline-flex items-center justify-center gap-2 h-11 px-5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium text-xs sm:text-sm border border-white/20 transition-all"
            >
              <span>Consult Indian CA</span>
            </button>
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
