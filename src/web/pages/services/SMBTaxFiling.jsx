import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  BriefcaseIcon,
  BuildingOffice2Icon,
  DocumentTextIcon,
  ShieldCheckIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  ClockIcon,
  CalendarDaysIcon,
  BanknotesIcon,
  CheckBadgeIcon,
} from "@heroicons/react/24/outline";

import SEO from "../../components/seo/SEO";
import LeadModal from "../../components/popup";
import Logo from "../../assets/irsLogo.png";
import smbPhoto from "../../assets/services/smb-tax.jpg";
import payrollPhoto from "../../assets/services/payroll-1099.jpg";
import { serviceCardThemes, serviceStepThemes } from "../../constants/serviceThemes";

const SMBTaxFiling = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const title = "U.S. Small Business Tax Filing Services | Form 1120, 1120S, 1065 | IRS Tax Filer";
  const description =
    "Complete CPA business tax preparation for LLCs, S-Corporations, Partnerships, and C-Corporations. Maximize deductions and maintain 100% IRS and state compliance.";
  const keywords =
    "small business tax filing, Form 1120, Form 1120S, Form 1065, Schedule C, business deductions, CPA tax preparation, IRS Tax Filer";
  const canonical = window.location.href;
  const image = Logo;

  const returnTiers = [
    {
      title: "S-Corporation Returns",
      form: "Form 1120-S & Schedule K-1",
      deadline: "March 15 Annual Deadline",
      icon: <BuildingOffice2Icon className="w-5 h-5 text-primary" />,
      summary: "Full corporate tax preparation with shareholder Schedule K-1 distributions, reasonable salary review, and multi-state franchise filings.",
      points: [
        "Shareholder basis calculation & Schedule K-1s",
        "W-2 officer compensation & payroll audit",
        "State franchise and corporate income returns",
      ],
    },
    {
      title: "Partnership & Multi-Member LLC",
      form: "Form 1065 & Partner K-1s",
      deadline: "March 15 Annual Deadline",
      icon: <BriefcaseIcon className="w-5 h-5 text-teal" />,
      summary: "Pass-through tax compliance for LLCs and partnerships, allocating profits, capital contributions, and guaranteed partner payments.",
      points: [
        "Partner capital account tracking",
        "Section 704(b) allocation compliance",
        "Multi-state partnership withholding",
      ],
    },
    {
      title: "C-Corporation & Schedule C",
      form: "Form 1120 / Schedule C",
      deadline: "April 15 Annual Deadline",
      icon: <DocumentTextIcon className="w-5 h-5 text-primary" />,
      summary: "Corporate tax return filings with 21% flat tax rate optimization, balance sheet reconciliation, and sole proprietorship Schedule C write-offs.",
      points: [
        "Section 179 & bonus depreciation deductions",
        "Form 1120 corporate balance sheet (Schedule L)",
        "Home office, vehicle & travel expense optimization",
      ],
    },
  ];

  const steps = [
    {
      num: "01",
      title: "P&L & Document Review",
      detail: "Upload your QuickBooks, Xero, or bank statements. Our CPAs review balance sheets and expense ledgers.",
    },
    {
      num: "02",
      title: "Deduction Optimization",
      detail: "We audit depreciation (Section 179), home office, vehicle, and health insurance deductions to minimize tax liability.",
    },
    {
      num: "03",
      title: "CPA e-File & Schedule K-1s",
      detail: "Direct electronic filing with the IRS and all relevant states, providing ready-to-file K-1s for all shareholders.",
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
                Small Business Tax Filing, <br className="hidden sm:inline" />
                <span className="font-medium text-teal">Maximize Deductions</span> & <span className="font-medium text-coral">Savings.</span>
              </motion.h1>

              {/* Subheading - Matches Home Hero Typography exactly */}
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="text-sm sm:text-base lg:text-[17px] text-slateText font-medium leading-[30px] sm:leading-[32px] lg:leading-[34px] mb-6 max-w-2xl"
              >
                Complete federal and state tax preparation for LLCs, S-Corps, C-Corps, and Partnerships. Our licensed CPAs audit your profit & loss statements to claim every legal deduction, depreciation, and tax credit.
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
                  <span>File Business Taxes</span>
                  <ArrowRightIcon className="w-4 h-4 stroke-[2.2] group-hover:translate-x-1 transition-transform" />
                </Link>

                <button
                  type="button"
                  onClick={handleOpenModal}
                  className="relative inline-flex items-center justify-center gap-2.5 h-11 sm:h-12 px-6 rounded-xl bg-white hover:bg-background-blue text-teal hover:text-teal border border-border hover:border-teal font-semibold text-sm sm:text-[15px] shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 group cursor-pointer shrink-0"
                >
                  <CalendarDaysIcon className="w-4 h-4 text-teal group-hover:scale-110 transition-transform stroke-[2.2]" />
                  <span>Talk to Business CPA</span>
                </button>
              </motion.div>

              {/* Trust Tag */}
              <div className="pt-4 border-t border-slate-100 flex items-center gap-2 text-xs text-slateText">
                <ShieldCheckIcon className="w-4 h-4 text-teal" />
                <span className="font-medium text-primary">Licensed Corporate CPAs & EAs</span>
                <span className="text-border">â€¢</span>
                <span>Audit Protection & Defense Included</span>
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
                      Form 1120, 1120-S & 1065 Tax Suite
                    </span>
                  </div>

                  {/* Real Image */}
                  <img
                    src={smbPhoto}
                    alt="Small Business Corporate Tax Preparation and Financial Statements"
                    className="w-full h-[280px] sm:h-[320px] object-cover transition-transform duration-500 group-hover:scale-[1.01]"
                    loading="eager"
                  />

                  {/* Clean Bottom Caption Strip */}
                  <div className="px-4 py-3 bg-white border-t border-slate-100 flex items-center justify-between text-xs text-slateText">
                    <span className="flex items-center gap-1.5">
                      <CheckBadgeIcon className="w-4 h-4 text-primary" />
                      <span>Profit/Loss Deduction Optimization</span>
                    </span>
                    <span className="font-semibold text-teal">
                      100% Accurate
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THREE RETURN TIERS (S-CORP, PARTNERSHIP, C-CORP) */}
      <section className="py-12 sm:py-16 bg-white border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-8 sm:mb-10">
            <h2 className="text-2xl sm:text-3xl font-normal text-primary tracking-tight leading-tight">
              Business Tax Return{" "}
              <span className="font-medium text-teal">
                Scopes & Filing
              </span>
            </h2>
            <p className="text-sm sm:text-base text-slateText font-medium leading-relaxed mt-2.5">
              Comprehensive filing services tailored to your specific corporate structure.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {returnTiers.map((tier, idx) => {
              const bentoStyles = [
                { panel: "bg-[#EFF9FB] border-[#127EAB]/20", icon: "bg-[#127EAB] text-white", formText: "text-[#0E668B]", check: "text-[#127EAB]", hover: "hover:border-[#127EAB]/50" },
                { panel: "bg-indigo-50/90 border-indigo-200/70", icon: "bg-indigo-600 text-white", formText: "text-indigo-700", check: "text-indigo-600", hover: "hover:border-indigo-400/70" },
                { panel: "bg-amber-50/90 border-amber-200/70", icon: "bg-amber-600 text-white", formText: "text-amber-800", check: "text-amber-600", hover: "hover:border-amber-400/70" },
              ];
              const b = bentoStyles[idx % bentoStyles.length];

              return (
                <div
                  key={idx}
                  className={`group p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 ${b.hover} shadow-2xs hover:shadow-md transition-all duration-300 text-left flex flex-col justify-between`}
                >
                  <div>
                    {/* Inner Tinted Corporate Header Block */}
                    <div className={`p-4 rounded-xl border ${b.panel} mb-4`}>
                      <div className="flex items-center justify-between gap-2 mb-2.5">
                        <div className={`w-9 h-9 rounded-lg ${b.icon} flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform`}>
                          {React.cloneElement(tier.icon, { className: "w-4.5 h-4.5" })}
                        </div>
                        {tier.form && (
                          <span className={`text-[10.5px] font-mono font-semibold ${b.formText} bg-white/90 px-2.5 py-0.5 rounded-md shadow-2xs`}>
                            {tier.form}
                          </span>
                        )}
                      </div>
                      <h3 className="text-base font-semibold text-primary leading-snug">
                        {tier.title}
                      </h3>
                      <div className={`inline-flex items-center gap-1 text-[11px] font-semibold ${b.formText} mt-1`}>
                        <ClockIcon className="w-3.5 h-3.5" />
                        <span>{tier.deadline}</span>
                      </div>
                    </div>

                    <p className="text-xs sm:text-[13px] text-slate-600 font-medium leading-relaxed px-1 mb-4">
                      {tier.summary}
                    </p>

                    <ul className="space-y-2.5 pt-3.5 px-1 border-t border-slate-100">
                      {tier.points.map((pt, pIdx) => (
                        <li key={pIdx} className="flex items-start gap-2.5 text-[13px] sm:text-sm text-primary font-medium leading-snug">
                          <CheckCircleIcon className={`w-4 h-4 ${b.check} stroke-[2.2] shrink-0 mt-0.5`} />
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. PAYROLL & 1099 COMPLIANCE WITH SECONDARY REAL IMAGE */}
      <section className="py-12 sm:py-16 bg-slate-50/60 border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Photo: Payroll & 1099 */}
            <div className="lg:col-span-5 rounded-2xl overflow-hidden border border-slate-200/90 shadow-2xs">
              <img
                src={payrollPhoto}
                alt="Payroll Tax and 1099 Vendor Filing Compliance"
                className="w-full h-56 sm:h-72 object-cover"
                loading="lazy"
              />
            </div>

            {/* Right Steps - Interactive Sliding Step Rows */}
            <div className="lg:col-span-7 space-y-4 text-left">
              <div className="mb-4">
                <h2 className="text-2xl sm:text-3xl font-normal text-primary tracking-tight leading-tight">
                  3-Step Corporate{" "}
                  <span className="font-medium text-teal">
                    Filing Process
                  </span>
                </h2>
              </div>

              <div className="space-y-3">
                {steps.map((step, sIdx) => {
                  const badgeBg = ["bg-[#1F4264]", "bg-[#127EAB]", "bg-emerald-600"];

                  return (
                    <div
                      key={sIdx}
                      className="p-4 rounded-xl bg-white border border-slate-200/80 hover:border-[#127EAB]/40 shadow-2xs hover:shadow-sm hover:translate-x-1 transition-all duration-200 flex items-start gap-3.5"
                    >
                      <div className={`w-9 h-9 rounded-xl ${badgeBg[sIdx % 3]} text-white font-mono font-semibold text-xs flex items-center justify-center shrink-0 shadow-xs`}>
                        {step.num}
                      </div>
                      <div>
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
                File Your Business Taxes with{" "}
                <span className="text-[#EE6450]">Total Confidence</span>
              </h2>
              <p className="text-xs sm:text-sm text-sky-50/90 max-w-xl mx-auto mb-7 font-medium leading-relaxed">
                Get your corporate tax returns prepared by licensed CPAs with guaranteed deduction optimization.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-3.5">
                <Link
                  to="/login"
                  className="inline-flex items-center justify-center gap-2 h-11 px-6 rounded-xl bg-white hover:bg-[#EFF9FB] text-primary font-semibold text-xs sm:text-sm transition-all duration-200 shadow-md hover:shadow-lg group"
                >
                  <span>Get Started Now</span>
                  <ArrowRightIcon className="w-4 h-4 text-teal group-hover:translate-x-1 transition-transform" />
                </Link>
                <button
                  type="button"
                  onClick={handleOpenModal}
                  className="inline-flex items-center justify-center gap-2 h-11 px-5 rounded-xl bg-white/15 hover:bg-white/25 text-white font-semibold text-xs sm:text-sm border border-white/30 backdrop-blur-xs transition-all duration-200 cursor-pointer"
                >
                  <span>Schedule CPA Review</span>
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
        serviceName="Small Business Tax Filing"
      />
    </div>
  );
};

export default SMBTaxFiling;
