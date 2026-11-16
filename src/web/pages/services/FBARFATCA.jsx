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
      icon: <BanknotesIcon className="w-5 h-5 text-primary" />,
      title: "Foreign Bank Accounts",
      tag: "Checking & Savings",
      description: "Personal and business savings, checking, and fixed deposit accounts across any foreign banking institution worldwide.",
    },
    {
      icon: <ScaleIcon className="w-5 h-5 text-teal" />,
      title: "Foreign Mutual Funds (PFIC)",
      tag: "Investments",
      description: "Offshore mutual funds, ETFs, unit trusts, and brokerage portfolios (Indian mutual funds, UK ISAs, Canadian TFSAs).",
    },
    {
      icon: <GlobeAltIcon className="w-5 h-5 text-primary" />,
      title: "Pensions & Retirement Funds",
      tag: "Superannuation & EPF",
      description: "Foreign occupational retirement schemes, provident funds (India EPF/PPF, Australia Super, UK SIPPs) with foreign balances.",
    },
    {
      icon: <ShieldCheckIcon className="w-5 h-5 text-teal" />,
      title: "Signature Authority Accounts",
      tag: "Corporate & Joint",
      description: "Any foreign account where you hold signature authority or power of attorney, even if you have no direct financial interest.",
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

      {/* 1. DISTINCT FBAR & FATCA HERO: IMAGE SHOWCASE IN MODERN CARD FRAME */}
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
                U.S. Foreign Account & Asset <br className="hidden sm:inline" />
                <span className="font-medium text-teal">Reporting</span> <span className="font-medium text-coral">(FBAR & FATCA)</span>
              </motion.h1>

              {/* Subheading - Matches Home Hero Typography exactly */}
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="text-sm sm:text-base lg:text-[17px] text-slateText font-normal leading-[30px] sm:leading-[32px] lg:leading-[34px] mb-6 max-w-2xl"
              >
                Hold foreign bank accounts, mutual funds, or foreign pensions? Our cross-border CPAs audit your aggregate thresholds with official Treasury conversions and file directly with FinCEN.
              </motion.p>

              {/* 3 Value Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mb-6 text-left">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                  <div className="text-[11px] font-bold text-primary uppercase tracking-wider mb-0.5">$10,000+ FBAR</div>
                  <div className="text-xs text-slateText font-normal">Aggregate balance auditing</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                  <div className="text-[11px] font-bold text-teal uppercase tracking-wider mb-0.5">FATCA 8938</div>
                  <div className="text-xs text-slateText font-normal">Form 1040 attachment</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                  <div className="text-[11px] font-bold text-primary uppercase tracking-wider mb-0.5">Streamlined</div>
                  <div className="text-xs text-slateText font-normal">Amnesty for back years</div>
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
                  <span>Start FBAR Filing</span>
                  <ArrowRightIcon className="w-4 h-4 stroke-[2.2] group-hover:translate-x-1 transition-transform" />
                </Link>

                <button
                  type="button"
                  onClick={handleOpenModal}
                  className="relative inline-flex items-center justify-center gap-2.5 h-11 sm:h-12 px-6 rounded-xl bg-white hover:bg-background-blue text-teal hover:text-teal border border-border hover:border-teal font-semibold text-sm sm:text-[15px] shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 group cursor-pointer shrink-0"
                >
                  <CalendarDaysIcon className="w-4 h-4 text-teal group-hover:scale-110 transition-transform stroke-[2.2]" />
                  <span>Talk to Expat CPA</span>
                </button>
              </motion.div>

              {/* Trust Indicators */}
              <div className="pt-4 border-t border-slate-100 flex items-center gap-2 text-xs text-slateText">
                <ShieldCheckIcon className="w-4 h-4 text-teal" />
                <span className="font-medium text-primary">FinCEN Direct e-File Partner</span>
                <span className="text-border">•</span>
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
                    <span className="font-semibold text-primary flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#127EAB]" />
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
                  <div className="px-4 py-3 bg-white border-t border-slate-100 flex items-center justify-between text-xs text-slateText">
                    <span className="flex items-center gap-1.5">
                      <CheckBadgeIcon className="w-4 h-4 text-teal" />
                      <span>$10,000 Aggregate Audit</span>
                    </span>
                    <span className="font-semibold text-teal">
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
            <h2 className="text-2xl sm:text-3xl font-normal text-primary tracking-tight leading-tight">
              FBAR vs. FATCA{" "}
              <span className="font-medium text-teal">
                Comparison
              </span>
            </h2>
            <p className="text-sm sm:text-base text-slateText font-normal leading-relaxed mt-2.5">
              Understand the core differences between FinCEN Form 114 and IRS Form 8938.
            </p>
          </div>

          {/* Desktop & Tablet Comparison Matrix (md:block) */}
          <div className="hidden md:block border border-slate-200/90 rounded-2xl overflow-hidden shadow-[0_8px_30px_rgba(22,84,121,0.06)] bg-white">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200/90">
                  <th className="py-4 px-6 font-semibold text-slateText text-xs sm:text-sm w-[26%] bg-slate-50/90">
                    Requirement
                  </th>
                  <th className="py-4 px-6 font-semibold text-primary text-xs sm:text-sm w-[37%] bg-gradient-to-b from-sky-50 to-sky-50/30 border-l border-slate-200/80">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-white border border-sky-200/80 flex items-center justify-center text-primary shadow-2xs shrink-0">
                        <BanknotesIcon className="w-4.5 h-4.5" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-primary leading-tight">
                          FBAR
                        </div>
                        <div className="text-[11px] text-primary/80 font-normal mt-0.5">
                          FinCEN Form 114
                        </div>
                      </div>
                    </div>
                  </th>
                  <th className="py-4 px-6 font-semibold text-teal text-xs sm:text-sm w-[37%] bg-gradient-to-b from-[#EFF9FB] to-[#EFF9FB]/30 border-l border-slate-200/80">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-white border border-[#127EAB]/30 flex items-center justify-center text-teal shadow-2xs shrink-0">
                        <DocumentTextIcon className="w-4.5 h-4.5" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-teal leading-tight">
                          FATCA
                        </div>
                        <div className="text-[11px] text-teal/90 font-normal mt-0.5">
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
                    <td className="py-4 px-6 font-medium text-primary align-top">
                      <div className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#1F4264]/40 group-hover:bg-[#1F4264] transition-colors shrink-0 mt-1.5" />
                        <span>{row.feature}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-slateText leading-relaxed bg-sky-50/15 group-hover:bg-sky-50/25 transition-colors align-top border-l border-slate-100">
                      {row.fbar}
                    </td>
                    <td className="py-4 px-6 text-slateText leading-relaxed bg-[#EFF9FB]/20 group-hover:bg-[#EFF9FB]/35 transition-colors align-top border-l border-slate-100">
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
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1F4264]" />
                  <span className="text-xs font-semibold text-primary uppercase tracking-wide">
                    {row.feature}
                  </span>
                </div>

                {/* Comparison Blocks */}
                <div className="space-y-2.5">
                  {/* FBAR Block */}
                  <div className="p-3.5 rounded-xl bg-sky-50/50 border border-sky-100/80">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-primary mb-1">
                      <BanknotesIcon className="w-3.5 h-3.5 shrink-0" />
                      <span>FBAR (FinCEN Form 114)</span>
                    </div>
                    <p className="text-xs text-slateText leading-relaxed pl-5">
                      {row.fbar}
                    </p>
                  </div>

                  {/* FATCA Block */}
                  <div className="p-3.5 rounded-xl bg-[#EFF9FB]/60 border border-[#127EAB]/20">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-teal mb-1">
                      <DocumentTextIcon className="w-3.5 h-3.5 shrink-0" />
                      <span>FATCA (IRS Form 8938)</span>
                    </div>
                    <p className="text-xs text-slateText leading-relaxed pl-5">
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
            <div className="lg:col-span-5 bg-gradient-to-br from-[#1E4162] via-[#1F4264] to-[#1F4264] text-white p-6 sm:p-7 rounded-3xl shadow-[0_16px_40px_rgba(10,73,115,0.2)] text-left relative overflow-hidden">
              <h3 className="text-xl sm:text-2xl font-normal tracking-tight text-white mb-2 leading-snug">
                Missed Prior Years? <br />
                <span className="font-semibold text-teal">0% Penalty Available</span>
              </h3>

              <p className="text-xs text-white/80 font-normal leading-relaxed mb-4">
                If your failure to file was non-willful, the IRS Streamlined Filing Procedures allow you to catch up without criminal penalties or severe willful fines.
              </p>

              <div className="space-y-2 pt-3 border-t border-white/15 text-xs text-white/90">
                <div className="flex items-center justify-between bg-white/10 p-2 rounded-xl">
                  <span>Expats Living Abroad</span>
                  <span className="font-bold text-teal">0% Penalty (Amnesty)</span>
                </div>
                <div className="flex items-center justify-between bg-white/10 p-2 rounded-xl">
                  <span>U.S. Residents</span>
                  <span className="font-bold text-teal">5% Flat Penalty</span>
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
                  <div className="w-7 h-7 rounded-lg bg-sky-50 text-primary font-bold text-xs flex items-center justify-center shrink-0">
                    1
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-primary">3 Years Back Tax Returns</h4>
                    <p className="text-xs text-slateText font-normal mt-0.5 leading-relaxed">
                      Delinquent or amended Form 1040s reporting worldwide income.
                    </p>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-white border border-slate-200/80 shadow-2xs flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-[#EFF9FB] text-teal font-bold text-xs flex items-center justify-center shrink-0">
                    2
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-primary">6 Years Back FBAR Submissions</h4>
                    <p className="text-xs text-slateText font-normal mt-0.5 leading-relaxed">
                      Prior FinCEN 114 filings with Treasury currency rates.
                    </p>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-white border border-slate-200/80 shadow-2xs flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-coral/10 text-coral font-bold text-xs flex items-center justify-center shrink-0">
                    3
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-primary">Non-Willful Statement</h4>
                    <p className="text-xs text-slateText font-normal mt-0.5 leading-relaxed">
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
          <div className="text-center max-w-xl mx-auto mb-8 sm:mb-10">
            <h2 className="text-2xl sm:text-3xl font-normal text-primary tracking-tight leading-tight">
              Reportable Offshore{" "}
              <span className="font-medium text-teal">
                Assets
              </span>
            </h2>
            <p className="text-sm sm:text-base text-slateText font-normal leading-relaxed mt-2.5">
              Comprehensive compliance across foreign accounts, mutual funds, and overseas pension plans.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {reportableAssetCategories.map((cat, cIdx) => (
              <div
                key={cIdx}
                className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs hover:border-[#1F4264]/30 hover:shadow-sm transition-all text-left flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-9 h-9 rounded-xl bg-slate-50 border border-slate-200/60 flex items-center justify-center shrink-0">
                      {cat.icon}
                    </div>
                  </div>

                  <h3 className="text-sm font-semibold text-primary mb-1 leading-snug">
                    {cat.title}
                  </h3>

                  <p className="text-xs text-slateText font-normal leading-relaxed">
                    {cat.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* 6. CLEAN CTA BANNER */}
      <section className="py-12 sm:py-16 bg-[#1F4264] text-white">
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
              className="inline-flex items-center justify-center gap-2 h-11 px-6 rounded-xl bg-[#127EAB] hover:bg-teal-soft text-white font-medium text-xs sm:text-sm transition-all shadow-md group"
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
