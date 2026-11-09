import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  BanknotesIcon,
  DocumentTextIcon,
  ShieldCheckIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  GlobeAltIcon,
  ChevronDownIcon,
  CalendarDaysIcon,
  ChevronRightIcon,
  ScaleIcon,
  CheckBadgeIcon,
} from "@heroicons/react/24/outline";

import SEO from "../../components/seo/SEO";
import LeadModal from "../../components/popup";
import Logo from "../../assets/irsLogo.png";
import foreignAssetPhoto from "../../assets/services/foreign-asset.jpg";
import streamlinedPhoto from "../../assets/services/streamlined-irs.jpg";

const FBARFATCA = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const title = "U.S. FBAR & FATCA Compliance Services | Foreign Asset Reporting | IRS Tax Filer";
  const description =
    "Expert electronic filing for FinCEN Form 114 (FBAR) and IRS Form 8938 (FATCA). Avoid severe failure-to-file penalties with certified expat CPA guidance.";
  const keywords =
    "FBAR filing, FATCA Form 8938, FinCEN 114, foreign bank account report, expat tax compliance, streamlined filing, IRS Tax Filer";
  const canonical = window.location.href;
  const image = Logo;

  // Comparison matrix data between FBAR and FATCA
  const comparisonMatrix = [
    {
      feature: "Governing Agency",
      fbar: "FinCEN (U.S. Department of the Treasury)",
      fatca: "Internal Revenue Service (IRS)",
    },
    {
      feature: "Primary Form",
      fbar: "FinCEN Form 114 (Filed Online)",
      fatca: "IRS Form 8938 (Attached to Form 1040)",
    },
    {
      feature: "Filing Threshold",
      fbar: "Aggregate foreign account balances > $10,000 at any time in the year",
      fatca: "$50,000 – $200,000+ (Depends on marital status & domestic vs. expat residence)",
    },
    {
      feature: "Reportable Assets",
      fbar: "Foreign bank accounts, brokerage, mutual funds & signature authority",
      fatca: "Bank accounts plus foreign stocks, pensions, partnership interests & contracts",
    },
    {
      feature: "Annual Due Date",
      fbar: "April 15 (Automatic 6-month extension to October 15)",
      fatca: "Filed simultaneously with your Form 1040 federal tax return",
    },
    {
      feature: "Non-Willful Penalty",
      fbar: "Up to $10,000+ per non-willful violation (inflation adjusted)",
      fatca: "Up to $10,000 per violation, plus up to $50,000 for continuing failure",
    },
  ];

  const reportableAssetCategories = [
    {
      icon: <BanknotesIcon className="w-5 h-5 text-[#165479]" />,
      title: "Foreign Bank Accounts",
      tag: "Checking & Savings",
      description: "Personal and business savings, checking, and fixed deposit accounts across any foreign banking institution worldwide.",
    },
    {
      icon: <ScaleIcon className="w-5 h-5 text-[#749220]" />,
      title: "Foreign Mutual Funds (PFIC)",
      tag: "Investments",
      description: "Offshore mutual funds, ETFs, unit trusts, and brokerage portfolios (Indian mutual funds, UK ISAs, Canadian TFSAs).",
    },
    {
      icon: <GlobeAltIcon className="w-5 h-5 text-[#165479]" />,
      title: "Pensions & Retirement Funds",
      tag: "Superannuation & EPF",
      description: "Foreign occupational retirement schemes, provident funds (India EPF/PPF, Australia Super, UK SIPPs) with foreign balances.",
    },
    {
      icon: <ShieldCheckIcon className="w-5 h-5 text-[#749220]" />,
      title: "Signature Authority Accounts",
      tag: "Corporate & Joint",
      description: "Any foreign account where you hold signature authority or power of attorney, even if you have no direct financial interest.",
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

      {/* 1. DISTINCT FBAR & FATCA HERO: IMAGE SHOWCASE IN MODERN CARD FRAME */}
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
                U.S. Foreign Account & Asset <br className="hidden sm:inline" />
                <span className="font-medium bg-gradient-to-r from-[#0A4973] via-[#165479] to-[#749220] bg-clip-text text-transparent">
                  Reporting (FBAR & FATCA)
                </span>
              </motion.h1>

              {/* Subheading - Matches Home Hero Typography exactly */}
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="text-sm sm:text-base lg:text-[17px] text-gray-600 font-normal leading-[30px] sm:leading-[32px] lg:leading-[34px] mb-6 max-w-2xl"
              >
                Hold foreign bank accounts, mutual funds, or foreign pensions? Our cross-border CPAs audit your aggregate thresholds with official Treasury conversions and file directly with FinCEN.
              </motion.p>

              {/* 3 Value Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mb-6 text-left">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                  <div className="text-[11px] font-bold text-[#165479] uppercase tracking-wider mb-0.5">$10,000+ FBAR</div>
                  <div className="text-xs text-gray-600 font-normal">Aggregate balance auditing</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                  <div className="text-[11px] font-bold text-[#749220] uppercase tracking-wider mb-0.5">FATCA 8938</div>
                  <div className="text-xs text-gray-600 font-normal">Form 1040 attachment</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                  <div className="text-[11px] font-bold text-gray-800 uppercase tracking-wider mb-0.5">Streamlined</div>
                  <div className="text-xs text-gray-600 font-normal">Amnesty for back years</div>
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
                  <span>Start FBAR Filing</span>
                  <ArrowRightIcon className="w-4 h-4 stroke-[2.2] group-hover:translate-x-1 transition-transform" />
                </Link>

                <button
                  type="button"
                  onClick={handleOpenModal}
                  className="inline-flex items-center justify-center gap-2 h-11 sm:h-12 px-5 sm:px-6 rounded-xl bg-white hover:bg-[#F6F9EE] text-[#165479] border-2 border-[#165479]/15 hover:border-[#749220] font-medium text-sm sm:text-[15px] transition-all duration-200 group cursor-pointer shrink-0"
                >
                  <CalendarDaysIcon className="w-4 h-4 text-[#749220] group-hover:scale-110 transition-transform stroke-[2.2]" />
                  <span>Talk to Expat CPA</span>
                </button>
              </motion.div>

              {/* Trust Indicators */}
              <div className="pt-4 border-t border-slate-100 flex items-center gap-2 text-xs text-gray-500">
                <ShieldCheckIcon className="w-4 h-4 text-[#749220]" />
                <span className="font-medium text-gray-800">FinCEN Direct e-File Partner</span>
                <span className="text-gray-300">•</span>
                <span>Zero-Penalty Amnesty Guidance</span>
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
                      FinCEN 114 & Form 8938 Reporting
                    </span>
                  </div>

                  {/* Real Image */}
                  <img
                    src={foreignAssetPhoto}
                    alt="Foreign Bank Account Reporting and Offshore Asset Compliance"
                    className="w-full h-[280px] sm:h-[320px] object-cover transition-transform duration-500 group-hover:scale-[1.01]"
                    loading="eager"
                  />

                  {/* Clean Bottom Caption Strip */}
                  <div className="px-4 py-3 bg-white border-t border-slate-100 flex items-center justify-between text-xs text-gray-600">
                    <span className="flex items-center gap-1.5">
                      <CheckBadgeIcon className="w-4 h-4 text-[#749220]" />
                      <span>$10,000 Aggregate Audit</span>
                    </span>
                    <span className="font-semibold text-emerald-600">
                      100% Penalty Defense
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SIDE-BY-SIDE MATRIX: FBAR vs. FATCA */}
      <section className="py-12 sm:py-16 bg-white border-b border-slate-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-8 sm:mb-10">
            <h2 className="text-2xl sm:text-3xl font-normal text-gray-900 tracking-tight">
              FBAR vs. FATCA{" "}
              <span className="font-medium bg-gradient-to-r from-[#0A4973] via-[#165479] to-[#749220] bg-clip-text text-transparent">
                Comparison
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 font-normal mt-1.5">
              Understand the core differences between FinCEN Form 114 and IRS Form 8938.
            </p>
          </div>

          {/* Desktop & Tablet Comparison Matrix (md:block) */}
          <div className="hidden md:block border border-slate-200/90 rounded-2xl overflow-hidden shadow-[0_8px_30px_rgba(22,84,121,0.06)] bg-white">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200/90">
                  <th className="py-4 px-6 font-semibold text-gray-700 text-xs sm:text-sm w-[26%] bg-slate-50/90">
                    Requirement
                  </th>
                  <th className="py-4 px-6 font-semibold text-[#165479] text-xs sm:text-sm w-[37%] bg-gradient-to-b from-sky-50 to-sky-50/30 border-l border-slate-200/80">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-white border border-sky-200/80 flex items-center justify-center text-[#165479] shadow-2xs shrink-0">
                        <BanknotesIcon className="w-4.5 h-4.5" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-[#165479] leading-tight">
                          FBAR
                        </div>
                        <div className="text-[11px] text-[#165479]/80 font-normal mt-0.5">
                          FinCEN Form 114
                        </div>
                      </div>
                    </div>
                  </th>
                  <th className="py-4 px-6 font-semibold text-[#749220] text-xs sm:text-sm w-[37%] bg-gradient-to-b from-[#F6F9EE] to-[#F6F9EE]/30 border-l border-slate-200/80">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-white border border-[#749220]/30 flex items-center justify-center text-[#749220] shadow-2xs shrink-0">
                        <DocumentTextIcon className="w-4.5 h-4.5" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-[#749220] leading-tight">
                          FATCA
                        </div>
                        <div className="text-[11px] text-[#749220]/90 font-normal mt-0.5">
                          IRS Form 8938
                        </div>
                      </div>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs sm:text-[13.5px]">
                {comparisonMatrix.map((row, rIdx) => (
                  <tr
                    key={rIdx}
                    className="hover:bg-slate-50/70 transition-colors group"
                  >
                    <td className="py-4 px-6 font-medium text-gray-900 align-top">
                      <div className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#165479]/40 group-hover:bg-[#165479] transition-colors shrink-0 mt-1.5" />
                        <span>{row.feature}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-gray-700 leading-relaxed bg-sky-50/15 group-hover:bg-sky-50/25 transition-colors align-top border-l border-slate-100">
                      {row.fbar}
                    </td>
                    <td className="py-4 px-6 text-gray-700 leading-relaxed bg-[#F6F9EE]/20 group-hover:bg-[#F6F9EE]/35 transition-colors align-top border-l border-slate-100">
                      {row.fatca}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Responsive Cards (md:hidden) */}
          <div className="md:hidden space-y-3.5">
            {comparisonMatrix.map((row, rIdx) => (
              <div
                key={rIdx}
                className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-2xs"
              >
                {/* Feature Header */}
                <div className="flex items-center gap-2 pb-2.5 mb-3 border-b border-slate-100">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#165479]" />
                  <span className="text-xs font-semibold text-gray-900 uppercase tracking-wide">
                    {row.feature}
                  </span>
                </div>

                {/* Comparison Blocks */}
                <div className="space-y-2.5">
                  {/* FBAR Block */}
                  <div className="p-3.5 rounded-xl bg-sky-50/50 border border-sky-100/80">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-[#165479] mb-1">
                      <BanknotesIcon className="w-3.5 h-3.5 shrink-0" />
                      <span>FBAR (FinCEN Form 114)</span>
                    </div>
                    <p className="text-xs text-gray-700 leading-relaxed pl-5">
                      {row.fbar}
                    </p>
                  </div>

                  {/* FATCA Block */}
                  <div className="p-3.5 rounded-xl bg-[#F6F9EE]/60 border border-[#749220]/20">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-[#749220] mb-1">
                      <DocumentTextIcon className="w-3.5 h-3.5 shrink-0" />
                      <span>FATCA (IRS Form 8938)</span>
                    </div>
                    <p className="text-xs text-gray-700 leading-relaxed pl-5">
                      {row.fatca}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. ASYMMETRIC SPOTLIGHT: STREAMLINED PENALTY RELIEF WITH REAL IMAGE */}
      <section className="py-12 sm:py-16 bg-slate-50/60 border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Card: IRS Streamlined Highlight */}
            <div className="lg:col-span-5 bg-gradient-to-br from-[#072B44] via-[#0A4973] to-[#165479] text-white p-6 sm:p-7 rounded-3xl shadow-[0_16px_40px_rgba(10,73,115,0.2)] text-left relative overflow-hidden">
              <h3 className="text-xl sm:text-2xl font-normal tracking-tight text-white mb-2 leading-snug">
                Missed Prior Years? <br />
                <span className="font-semibold text-[#CBF056]">0% Penalty Available</span>
              </h3>

              <p className="text-xs text-white/80 font-normal leading-relaxed mb-4">
                If your failure to file was non-willful, the IRS Streamlined Filing Procedures allow you to catch up without criminal penalties or severe willful fines.
              </p>

              <div className="space-y-2 pt-3 border-t border-white/15 text-xs text-white/90">
                <div className="flex items-center justify-between bg-white/10 p-2 rounded-xl">
                  <span>Expats Living Abroad</span>
                  <span className="font-bold text-[#CBF056]">0% Penalty (Amnesty)</span>
                </div>
                <div className="flex items-center justify-between bg-white/10 p-2 rounded-xl">
                  <span>U.S. Residents</span>
                  <span className="font-bold text-[#CBF056]">5% Flat Penalty</span>
                </div>
              </div>
            </div>

            {/* Right Side: Secondary Photo & 3-Step Pathway */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-12 gap-5 items-center">
              {/* Secondary Real Image */}
              <div className="sm:col-span-5 rounded-2xl overflow-hidden border border-slate-200/90 shadow-2xs">
                <img
                  src={streamlinedPhoto}
                  alt="IRS Streamlined Compliance Documentation"
                  className="w-full h-44 sm:h-56 object-cover"
                  loading="lazy"
                />
              </div>

              {/* 3 Streamlined Steps */}
              <div className="sm:col-span-7 space-y-3 text-left">
                <div className="p-3.5 rounded-xl bg-white border border-slate-200/80 shadow-2xs flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-sky-50 text-[#165479] font-bold text-xs flex items-center justify-center shrink-0">
                    1
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-gray-900">3 Years Back Tax Returns</h4>
                    <p className="text-[11px] text-gray-500 font-normal mt-0.5">
                      Delinquent or amended Form 1040s reporting worldwide income.
                    </p>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-white border border-slate-200/80 shadow-2xs flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-[#F6F9EE] text-[#749220] font-bold text-xs flex items-center justify-center shrink-0">
                    2
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-gray-900">6 Years Back FBAR Submissions</h4>
                    <p className="text-[11px] text-gray-500 font-normal mt-0.5">
                      Prior FinCEN 114 filings with Treasury currency rates.
                    </p>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-white border border-slate-200/80 shadow-2xs flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-700 font-bold text-xs flex items-center justify-center shrink-0">
                    3
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-gray-900">Non-Willful Statement</h4>
                    <p className="text-[11px] text-gray-500 font-normal mt-0.5">
                      Formal Form 14653/14654 certification drafted by CPAs.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. REPORTABLE FOREIGN ASSETS (CLEAN 4-COLUMN GRID) */}
      <section className="py-12 sm:py-16 bg-white border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-left mb-8 sm:mb-10">
            <h2 className="text-2xl sm:text-3xl font-normal text-gray-900 tracking-tight">
              Reportable Offshore Assets
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {reportableAssetCategories.map((cat, cIdx) => (
              <div
                key={cIdx}
                className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs hover:border-[#165479]/30 hover:shadow-sm transition-all text-left flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-9 h-9 rounded-xl bg-slate-50 border border-slate-200/60 flex items-center justify-center shrink-0">
                      {cat.icon}
                    </div>
                  </div>

                  <h3 className="text-sm font-semibold text-gray-900 mb-1 leading-snug">
                    {cat.title}
                  </h3>

                  <p className="text-xs text-gray-500 font-normal leading-relaxed">
                    {cat.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* 6. CLEAN CTA BANNER */}
      <section className="py-12 sm:py-16 bg-[#0A4973] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-normal tracking-tight text-white mb-2">
            Stay 100% Compliant with U.S. Expat Rules
          </h2>
          <p className="text-xs sm:text-sm text-sky-100 max-w-xl mx-auto mb-6">
            Our licensed cross-border CPAs prepare your FBAR and FATCA returns with guaranteed Treasury accuracy.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/login"
              className="inline-flex items-center justify-center gap-2 h-11 px-6 rounded-xl bg-[#749220] hover:bg-[#637d1b] text-white font-medium text-xs sm:text-sm transition-all shadow-md group"
            >
              <span>File Foreign Assets</span>
              <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <button
              type="button"
              onClick={handleOpenModal}
              className="inline-flex items-center justify-center gap-2 h-11 px-5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium text-xs sm:text-sm border border-white/20 transition-all"
            >
              <span>Book Expat Consultation</span>
            </button>
          </div>
        </div>
      </section>

      {/* Lead Modal */}
      <LeadModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        serviceName="FBAR & FATCA Compliance"
      />
    </div>
  );
};

export default FBARFATCA;
