import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  IdentificationIcon,
  DocumentCheckIcon,
  ShieldCheckIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  ChevronRightIcon,
  CalendarDaysIcon,
  XCircleIcon,
  CheckBadgeIcon,
  UserGroupIcon,
  ChevronDownIcon,
  BuildingLibraryIcon,
} from "@heroicons/react/24/outline";

import SEO from "../../components/seo/SEO";
import LeadModal from "../../components/popup";
import Logo from "../../assets/irsLogo.png";
import itinPhoto from "../../assets/services/itin-w7.jpg";
import { serviceCardThemes, serviceStepThemes } from "../../constants/serviceThemes";

const ITIN = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const title = "IRS ITIN Application & Renewal Services | Form W-7 | IRS Tax Filer";
  const description =
    "Fast, certified IRS Form W-7 ITIN application and renewal services for non-residents, spouses, and dependents. Ensure timely IRS approval and tax compliance.";
  const keywords =
    "ITIN application, Form W-7, ITIN renewal, Certified Acceptance Agent, CAA ITIN, non-resident tax ID, IRS Tax Filer";
  const canonical = window.location.href;
  const image = Logo;

  // 4 Target Audience Segments (Clean & Concise)
  const audienceSegments = [
    {
      title: "Non-Resident Spouses",
      tag: "Form 1040 Spouses",
      icon: <UserGroupIcon className="w-5 h-5 text-primary" />,
      summary: "Enable Married Filing Jointly tax status to significantly lower tax brackets and increase refunds.",
      requirement: "Must file jointly with U.S. citizen or resident spouse",
    },
    {
      title: "Dependent Children",
      tag: "Child Tax Credits",
      icon: <IdentificationIcon className="w-5 h-5 text-teal" />,
      summary: "Obtain ITINs for qualifying foreign-born children to claim dependent and education credits.",
      requirement: "Form W-7 accompanied by parent's tax return",
    },
    {
      title: "Foreign Investors & LLC Owners",
      tag: "Real Estate & Business",
      icon: <BuildingLibraryIcon className="w-5 h-5 text-primary" />,
      summary: "Essential tax identification for foreign owners of U.S. LLCs, real estate rentals, and royalties.",
      requirement: "Withholding tax or Schedule K-1 reporting",
    },
    {
      title: "Expiring ITIN Renewals",
      tag: "Middle Digits Notice",
      icon: <DocumentCheckIcon className="w-5 h-5 text-teal" />,
      summary: "Timely renewal for ITINs unused for 3 consecutive tax years or with IRS-expired middle digits.",
      requirement: "Prevents frozen refunds and IRS processing delays",
    },
  ];

  // 3-Step Simple Roadmap
  const steps = [
    {
      num: "01",
      title: "Digital Document Upload",
      detail: "Upload high-resolution scans of your passport and tax forms to our 256-bit encrypted portal.",
    },
    {
      num: "02",
      title: "CAA Verification & W-7 Assembly",
      detail: "Our Certified Acceptance Agent authenticates your identity and certifies Form W-7 (COA).",
    },
    {
      num: "03",
      title: "IRS Approval (CP565 Letter)",
      detail: "The IRS issues your official CP565 ITIN assignment letter, enabling timely refund payout.",
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

      {/* 1. DISTINCT ITIN HERO: CAA PASSPORT VERIFICATION WITH IMAGE */}
      <section className="relative overflow-hidden pt-8 sm:pt-10 lg:pt-12 pb-8 sm:pb-10 bg-white">
        <div className="absolute top-1/4 right-10 w-[500px] h-[500px] bg-gradient-to-bl from-[#127EAB]/[0.06] via-[#1F4264]/[0.05] to-transparent rounded-full blur-3xl pointer-events-none" />

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
                Fast ITIN Application, <br className="hidden sm:inline" />
                <span className="font-medium text-teal">Without Mailing</span> <span className="font-medium text-coral">Your Passport</span>
              </motion.h1>

              {/* Subheading - Matches Home Hero Typography exactly */}
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="text-sm sm:text-base lg:text-[17px] text-slateText font-medium leading-[30px] sm:leading-[32px] lg:leading-[34px] mb-6 max-w-2xl"
              >
                Never risk losing your original passport in the mail. Our IRS-authorized Certified Acceptance Agent (CAA) authenticates your documents directly so your originals stay safe.
              </motion.p>

              {/* 3 Quick Benefit Chips */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mb-6 text-left">
                <div className="p-3 rounded-xl bg-[#EFF9FB]/90 border border-[#127EAB]/25 shadow-2xs">
                  <div className="text-[11px] font-semibold text-[#127EAB] uppercase tracking-wider mb-0.5">Passport Safe</div>
                  <div className="text-xs text-slate-600 font-medium">No physical mailing needed</div>
                </div>
                <div className="p-3 rounded-xl bg-emerald-50/80 border border-emerald-200/80 shadow-2xs">
                  <div className="text-[11px] font-semibold text-emerald-700 uppercase tracking-wider mb-0.5">99.4% Approval</div>
                  <div className="text-xs text-slate-600 font-medium">Zero Form W-7 rejections</div>
                </div>
                <div className="p-3 rounded-xl bg-indigo-50/80 border border-indigo-200/80 shadow-2xs">
                  <div className="text-[11px] font-semibold text-indigo-700 uppercase tracking-wider mb-0.5">Full Family</div>
                  <div className="text-xs text-slate-600 font-medium">Spouse & child filings</div>
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
                  <span>Apply for ITIN</span>
                  <ArrowRightIcon className="w-4 h-4 stroke-[2.2] group-hover:translate-x-1 transition-transform" />
                </Link>

                <button
                  type="button"
                  onClick={handleOpenModal}
                  className="relative inline-flex items-center justify-center gap-2.5 h-11 sm:h-12 px-6 rounded-xl bg-white hover:bg-background-blue text-teal hover:text-teal border border-border hover:border-teal font-semibold text-sm sm:text-[15px] shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 group cursor-pointer shrink-0"
                >
                  <CalendarDaysIcon className="w-4 h-4 text-teal group-hover:scale-110 transition-transform stroke-[2.2]" />
                  <span>Consult CAA Specialist</span>
                </button>
              </motion.div>

              {/* Social Proof */}
              <div className="pt-4 border-t border-slate-100 flex items-center gap-2.5 text-xs text-slateText">
                <CheckBadgeIcon className="w-4 h-4 text-teal" />
                <span className="font-medium text-primary">IRS Certified Acceptance Agent (CAA)</span>
                <span className="text-border">•</span>
                <span>Fast 48-Hour Package Assembly</span>
              </div>
            </div>

            {/* Right Column: Clean Image Showcase */}
            <div className="lg:col-span-5 xl:col-span-5 relative flex justify-center lg:justify-end">
              <div className="relative w-full max-w-[460px]">
                {/* Main Image Card */}
                <div className="relative rounded-2xl overflow-hidden border border-slate-200/90 shadow-[0_16px_40px_rgba(22,84,121,0.08)] bg-white group">
                  {/* Top Status Bar */}
                  <div className="px-4 py-2.5 bg-slate-50/90 border-b border-slate-100 flex items-center justify-between text-xs">
                    <span className="font-semibold text-primary flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#127EAB]" />
                      Form W-7 & CAA Document Verification
                    </span>
                  </div>

                  {/* Real Image */}
                  <img
                    src={itinPhoto}
                    alt="IRS ITIN Form W-7 Application and Document Verification"
                    className="w-full h-[280px] sm:h-[320px] object-cover transition-transform duration-500 group-hover:scale-[1.01]"
                    loading="eager"
                  />

                  {/* Clean Bottom Caption Strip */}
                  <div className="px-4 py-3 bg-white border-t border-slate-100 flex items-center justify-between text-xs text-slateText">
                    <span className="flex items-center gap-1.5 font-medium text-primary">
                      <ShieldCheckIcon className="w-4 h-4 text-teal" />
                      <span>Zero Passport Loss Guarantee</span>
                    </span>
                    <span className="font-semibold text-teal">
                      99.4% Approval
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SIDE-BY-SIDE COMPARISON: STANDARD MAIL vs. CAA VERIFIED */}
      <section className="py-8 sm:py-10 bg-slate-50/60">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-8 sm:mb-10">
            <h2 className="text-2xl sm:text-3xl font-normal text-primary tracking-tight leading-tight">
              Why Filers Avoid{" "}
              <span className="font-medium text-teal">
                Mailing Passports
              </span>
            </h2>
            <p className="text-sm sm:text-base text-slateText font-medium leading-relaxed mt-2.5">
              Compare direct mailing to the IRS vs. our Certified Acceptance Agent route.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Standard Mail (Negative) */}
            <div className="p-5 sm:p-6 rounded-2xl bg-white border border-rose-200/80 shadow-2xs text-left">
              <div className="flex items-center justify-between mb-3.5">
                <span className="text-xs font-semibold text-coral">Standard Direct Mail</span>
                <span className="text-[11px] text-slateText">IRS Austin Center</span>
              </div>
              <h3 className="text-base font-semibold text-primary mb-2">
                Mailing Original Passport to IRS
              </h3>
              <ul className="space-y-2 text-xs sm:text-[13px] text-slateText font-medium">
                <li className="flex items-start font-medium gap-2">
                  <XCircleIcon className="w-4 h-4 text-coral shrink-0 mt-0.5" />
                  <span>You must surrender your physical passport for 8 to 11+ weeks.</span>
                </li>
                <li className="flex items-start font-medium gap-2">
                  <XCircleIcon className="w-4 h-4 text-coral shrink-0 mt-0.5" />
                  <span>High risk of loss or postal damage for foreign international IDs.</span>
                </li>
                <li className="flex items-start font-medium gap-2">
                  <XCircleIcon className="w-4 h-4 text-coral shrink-0 mt-0.5" />
                  <span>30%+ IRS rejection rate due to minor clerical errors on Form W-7.</span>
                </li>
              </ul>
            </div>

            {/* Our CAA Service (Positive) */}
            <div className="p-5 sm:p-6 rounded-2xl bg-[#EFF9FB]/60 border border-[#127EAB]/40 shadow-sm text-left">
              <div className="flex items-center justify-between mb-3.5">
                <span className="text-xs font-semibold text-primary">IRS Tax Filer CAA Service</span>
                <span className="text-[11px] font-semibold text-teal">Safe & Guaranteed</span>
              </div>
              <h3 className="text-base font-semibold text-primary mb-2">
                Certified Document Authentication
              </h3>
              <ul className="space-y-2 text-xs sm:text-[13px] text-slateText font-medium">
                <li className="flex items-start font-medium gap-2">
                  <CheckCircleIcon className="w-4 h-4 text-teal shrink-0 mt-0.5" />
                  <span>Your original passport never leaves your possession.</span>
                </li>
                <li className="flex items-start font-medium gap-2">
                  <CheckCircleIcon className="w-4 h-4 text-teal shrink-0 mt-0.5" />
                  <span>Official Form W-7 Certificate of Accuracy (COA) issued by CAA.</span>
                </li>
                <li className="flex items-start font-medium gap-2">
                  <CheckCircleIcon className="w-4 h-4 text-teal shrink-0 mt-0.5" />
                  <span>99.4% acceptance rate with direct IRS agent inquiry tracking.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FOUR AUDIENCE SEGMENTS (WHO NEEDS ITIN) */}
      <section className="py-8 sm:py-10 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-8 sm:mb-10">
            <h2 className="text-2xl sm:text-3xl font-normal text-primary tracking-tight leading-tight">
              Form W-7 Application{" "}
              <span className="font-medium text-teal">
                Scopes
              </span>
            </h2>
            <p className="text-sm sm:text-base text-slateText font-medium leading-relaxed mt-2.5">
              Certified Acceptance Agent authentication for all qualifying categories.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {audienceSegments.map((seg, idx) => {
              const scopeStyles = [
                { topBar: "bg-[#127EAB]", iconBg: "bg-[#E9F7FA] text-[#127EAB]", tag: "text-[#127EAB]", footBg: "bg-[#EFF9FB]/70 border-[#127EAB]/15" },
                { topBar: "bg-emerald-500", iconBg: "bg-emerald-50 text-emerald-600", tag: "text-emerald-700", footBg: "bg-emerald-50/60 border-emerald-200/60" },
                { topBar: "bg-indigo-500", iconBg: "bg-indigo-50 text-indigo-600", tag: "text-indigo-700", footBg: "bg-indigo-50/60 border-indigo-200/60" },
                { topBar: "bg-[#EE6450]", iconBg: "bg-[#FEF4F2] text-[#EE6450]", tag: "text-[#D9523E]", footBg: "bg-[#FEF4F2]/70 border-[#EE6450]/15" },
              ];
              const s = scopeStyles[idx % scopeStyles.length];

              return (
                <div
                  key={idx}
                  className="group bg-white rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 overflow-hidden text-left flex flex-col justify-between"
                >
                  {/* Solid Colored Top Ribbon Bar */}
                  <div className={`h-1.5 w-full ${s.topBar}`} />

                  <div className="p-5 flex-1">
                    <div className={`w-11 h-11 rounded-2xl ${s.iconBg} flex items-center justify-center mb-4 group-hover:scale-105 transition-transform`}>
                      {React.cloneElement(seg.icon, { className: "w-5 h-5" })}
                    </div>

                    <span className={`text-[10.5px] font-semibold uppercase tracking-wider ${s.tag} block mb-1`}>
                      {seg.tag}
                    </span>

                    <h3 className="text-base font-semibold text-primary mb-2 leading-snug">
                      {seg.title}
                    </h3>

                    <p className="text-xs sm:text-[13px] text-slate-600 font-medium leading-relaxed">
                      {seg.summary}
                    </p>
                  </div>

                  {/* Tinted Footer Requirement Strip */}
                  <div className={`px-5 py-3 border-t ${s.footBg} flex items-start gap-2`}>
                    <CheckCircleIcon className={`w-4 h-4 ${s.tag} shrink-0 mt-0.5`} />
                    <span className="text-[11px] font-semibold text-primary leading-snug">
                      {seg.requirement}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. FAST 3-STEP CONNECTED ROADMAP */}
      <section className="py-8 sm:py-10 bg-slate-50/60">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-normal text-primary tracking-tight leading-tight">
              3-Step Fast Track to{" "}
              <span className="font-medium text-teal">
                Your ITIN
              </span>
            </h2>
            <p className="text-sm sm:text-base text-slateText font-medium leading-relaxed mt-2.5">
              Secure in-person or remote video verification with zero passport transit risk.
            </p>
          </div>

          <div className="relative grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 text-center">
            {/* Horizontal Dashed Track (Desktop) */}
            <div
              aria-hidden="true"
              className="hidden md:block absolute top-6 left-[16%] right-[16%] h-0.5 border-t-2 border-dashed border-[#127EAB]/30 z-0"
            />

            {steps.map((st, sIdx) => {
              const stepBgs = ["bg-[#127EAB]", "bg-[#1F4264]", "bg-emerald-600"];
              const stepText = ["text-[#127EAB]", "text-[#1F4264]", "text-emerald-700"];

              return (
                <div key={sIdx} className="relative z-10 flex flex-col items-center">
                  <div className={`w-12 h-12 rounded-full ${stepBgs[sIdx % 3]} text-white font-mono font-semibold text-sm flex items-center justify-center shadow-md ring-4 ring-white mb-4`}>
                    {st.num}
                  </div>
                  <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-2xs w-full">
                    <h3 className={`text-base font-semibold ${stepText[sIdx % 3]} mb-1.5 leading-snug`}>
                      {st.title}
                    </h3>
                    <p className="text-xs sm:text-[13px] text-slate-600 font-medium leading-relaxed">
                      {st.detail}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>


      {/* 6. CLEAN ITIN ACTION BANNER */}
      <section className="py-8 sm:py-10 bg-white font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl py-10 sm:py-12 px-6 sm:px-12 bg-gradient-to-r from-[#0D6388] via-[#127EAB] to-[#168BB8] text-white shadow-xl text-center">
            {/* Subtle Ambient Glows */}
            <div className="absolute -top-24 -left-16 w-72 h-72 bg-white/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -right-16 w-72 h-72 bg-[#1F4264]/25 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-3xl mx-auto relative z-10">
              <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white mb-2.5">
                Need an ITIN{" "}
                <span className="text-[#EE6450]">Without the Hassle?</span>
              </h2>
              <p className="text-xs sm:text-sm text-sky-50/90 max-w-xl mx-auto mb-7 font-medium leading-relaxed">
                Get your Form W-7 prepared and certified by our Acceptance Agents in under 48 hours.
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
                  <span>Book CAA Consultation</span>
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
        serviceName="ITIN Application (Form W-7)"
      />
    </div>
  );
};

export default ITIN;
