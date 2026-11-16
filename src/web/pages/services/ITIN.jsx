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
      <section className="relative overflow-hidden pt-8 sm:pt-10 lg:pt-12 pb-12 sm:pb-16 lg:pb-20 bg-white border-b border-slate-100">
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
                className="text-sm sm:text-base lg:text-[17px] text-slateText font-normal leading-[30px] sm:leading-[32px] lg:leading-[34px] mb-6 max-w-2xl"
              >
                Never risk losing your original passport in the mail. Our IRS-authorized Certified Acceptance Agent (CAA) authenticates your documents directly so your originals stay safe.
              </motion.p>

              {/* 3 Quick Benefit Chips */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mb-6 text-left">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                  <div className="text-[11px] font-bold text-teal uppercase tracking-wider mb-0.5">Passport Safe</div>
                  <div className="text-xs text-slateText font-normal">No physical mailing needed</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                  <div className="text-[11px] font-bold text-primary uppercase tracking-wider mb-0.5">99.4% Approval</div>
                  <div className="text-xs text-slateText font-normal">Zero Form W-7 rejections</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                  <div className="text-[11px] font-bold text-primary uppercase tracking-wider mb-0.5">Full Family</div>
                  <div className="text-xs text-slateText font-normal">Spouse & child filings</div>
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
      <section className="py-12 sm:py-16 bg-slate-50/60 border-b border-slate-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-8 sm:mb-10">
            <h2 className="text-2xl sm:text-3xl font-normal text-primary tracking-tight leading-tight">
              Why Filers Avoid{" "}
              <span className="font-medium text-teal">
                Mailing Passports
              </span>
            </h2>
            <p className="text-sm sm:text-base text-slateText font-normal leading-relaxed mt-2.5">
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
              <ul className="space-y-2 text-xs sm:text-[13px] text-slateText font-normal">
                <li className="flex items-start gap-2">
                  <XCircleIcon className="w-4 h-4 text-coral shrink-0 mt-0.5" />
                  <span>You must surrender your physical passport for 8 to 11+ weeks.</span>
                </li>
                <li className="flex items-start gap-2">
                  <XCircleIcon className="w-4 h-4 text-coral shrink-0 mt-0.5" />
                  <span>High risk of loss or postal damage for foreign international IDs.</span>
                </li>
                <li className="flex items-start gap-2">
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
              <ul className="space-y-2 text-xs sm:text-[13px] text-slateText font-normal">
                <li className="flex items-start gap-2">
                  <CheckCircleIcon className="w-4 h-4 text-teal shrink-0 mt-0.5" />
                  <span>Your original passport never leaves your possession.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircleIcon className="w-4 h-4 text-teal shrink-0 mt-0.5" />
                  <span>Official Form W-7 Certificate of Accuracy (COA) issued by CAA.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircleIcon className="w-4 h-4 text-teal shrink-0 mt-0.5" />
                  <span>99.4% acceptance rate with direct IRS agent inquiry tracking.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FOUR AUDIENCE SEGMENTS (WHO NEEDS ITIN) */}
      <section className="py-12 sm:py-16 bg-white border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-8 sm:mb-10">
            <h2 className="text-2xl sm:text-3xl font-normal text-primary tracking-tight leading-tight">
              Form W-7 Application{" "}
              <span className="font-medium text-teal">
                Scopes
              </span>
            </h2>
            <p className="text-sm sm:text-base text-slateText font-normal leading-relaxed mt-2.5">
              Certified Acceptance Agent authentication for all qualifying categories.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {audienceSegments.map((seg, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs hover:border-[#1F4264]/30 hover:shadow-sm transition-all text-left flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-9 h-9 rounded-xl bg-slate-50 border border-slate-200/60 flex items-center justify-center shrink-0">
                      {seg.icon}
                    </div>
                  </div>

                  <h3 className="text-sm font-semibold text-primary mb-1 leading-snug">
                    {seg.title}
                  </h3>

                  <p className="text-xs sm:text-[13px] text-slateText font-normal leading-relaxed mb-3">
                    {seg.summary}
                  </p>
                </div>

                <div className="pt-2.5 border-t border-slate-100 text-[11px] font-medium text-primary">
                  {seg.requirement}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. FAST 3-STEP ROADMAP */}
      <section className="py-12 sm:py-16 bg-slate-50/60 border-b border-slate-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-8 sm:mb-10">
            <h2 className="text-2xl sm:text-3xl font-normal text-primary tracking-tight leading-tight">
              3-Step Fast Track to{" "}
              <span className="font-medium text-teal">
                Your ITIN
              </span>
            </h2>
            <p className="text-sm sm:text-base text-slateText font-normal leading-relaxed mt-2.5">
              Secure in-person or remote video verification with zero passport transit risk.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
            {steps.map((st, sIdx) => (
              <div
                key={sIdx}
                className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs flex flex-col justify-between"
              >
                <div>
                  <div className="w-8 h-8 rounded-lg bg-[#EFF9FB] text-teal font-mono font-bold text-xs flex items-center justify-center mb-3 border border-[#127EAB]/25">
                    {st.num}
                  </div>
                  <h3 className="text-sm font-semibold text-primary mb-1">
                    {st.title}
                  </h3>
                  <p className="text-xs sm:text-[13px] text-slateText font-normal leading-relaxed">
                    {st.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* 6. CLEAN ITIN ACTION BANNER */}
      <section className="py-12 sm:py-16 bg-[#1F4264] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-normal tracking-tight text-white mb-2">
            Need an ITIN Without the Hassle?
          </h2>
          <p className="text-xs sm:text-sm text-sky-100 max-w-xl mx-auto mb-6">
            Get your Form W-7 prepared and certified by our Acceptance Agents in under 48 hours.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/login"
              className="inline-flex items-center justify-center gap-2 h-11 px-6 rounded-xl bg-[#127EAB] hover:bg-teal-soft text-white font-medium text-xs sm:text-sm transition-all shadow-md group"
            >
              <span>Get Started Now</span>
              <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <button
              type="button"
              onClick={handleOpenModal}
              className="inline-flex items-center justify-center gap-2 h-11 px-5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium text-xs sm:text-sm border border-white/20 transition-all"
            >
              <span>Book CAA Consultation</span>
            </button>
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
