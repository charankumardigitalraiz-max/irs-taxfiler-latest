import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import usaTaxHeroPhoto from "../../assets/usa-tax-filing-hero.jpg";
import {
  ArrowRightIcon,
  CalendarDaysIcon,
  ShieldCheckIcon,
  DocumentTextIcon,
  GlobeAltIcon,
  BanknotesIcon,
  SparklesIcon,
  CheckCircleIcon,
  CheckBadgeIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";

const HeroBanner = ({ onOpenModal }) => {
  const taxFilingBadges = [
    {
      title: "IRS Authorized e-File",
      tag: "Official e-File Provider",
      icon: <ShieldCheckIcon className="w-5 h-5" />,
    },
    {
      title: "Form 1040 Federal Return",
      tag: "Individual & Family Filers",
      icon: <DocumentTextIcon className="w-5 h-5" />,
    },
    {
      title: "Form 1040-NR & Expats",
      tag: "Non-Resident & Expat Returns",
      icon: <GlobeAltIcon className="w-5 h-5" />,
    },
    {
      title: "FBAR & FATCA Reporting",
      tag: "FinCEN 114 & Form 8938",
      icon: <SparklesIcon className="w-5 h-5" />,
    },
    {
      title: "U.S. Corporate & Business",
      tag: "Form 1120, 1120-S & 1065",
      icon: <BanknotesIcon className="w-5 h-5" />,
    },
    {
      title: "Multi-State Taxes (SALT)",
      tag: "All 50 States Filings",
      icon: <CheckCircleIcon className="w-5 h-5" />,
    },
    {
      title: "ITIN Number Certification",
      tag: "IRS Form W-7 Certified",
      icon: <CheckBadgeIcon className="w-5 h-5" />,
    },
    {
      title: "IRS Audit Defense & CPA Support",
      tag: "Audit Shield & Representation",
      icon: <UserGroupIcon className="w-5 h-5" />,
    },
  ];

  return (
    <>
      {/* 1. HERO MAIN SECTION */}
      <section className="relative overflow-hidden pt-6 sm:pt-8 lg:pt-10 pb-12 sm:pb-16 lg:pb-14 bg-white lg:min-h-[calc(100vh-4rem)] flex items-center">
        <div className="relative max-w-7xl 2xl:max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 xl:gap-10 items-center">

            {/* Left Content Column */}
            <div className="order-2 lg:order-1 lg:col-span-7 xl:col-span-7 lg:pr-6 xl:pr-10 font-sans text-left">
              {/* Main Heading */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                style={{ lineHeight: 1.18 }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-[44px] xl:text-[48px] 2xl:text-[52px] font-normal text-gray-900 tracking-tight mb-4 sm:mb-5"
              >
                U.S. Tax Filing, <br className="hidden sm:inline" />
                <span className="font-medium bg-gradient-to-r from-[#0A4973] via-[#165479] to-[#749220] bg-clip-text text-transparent">
                  done right. Maximum refund guaranteed.
                </span>
              </motion.h1>

              {/* Subheading */}
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="text-sm sm:text-base lg:text-[17px] text-gray-600 font-normal leading-[30px] sm:leading-[32px] lg:leading-[34px] mb-6 max-w-2xl"
              >
                File your federal and 50-state tax returns with dedicated CPA review. We uncover every eligible deduction to maximize your refund with 100% IRS accuracy and audit protection.
              </motion.p>

              {/* CTA Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex flex-wrap sm:flex-nowrap items-center gap-3 sm:gap-4 mb-6"
              >
                {/* Primary Button */}
                <Link
                  to="/login"
                  className="relative inline-flex items-center justify-center gap-2.5 h-11 sm:h-12 px-5 sm:px-6 rounded-xl bg-gradient-to-r from-[#0C3D5A] via-[#165479] to-[#1A5B82] hover:from-[#09324A] hover:via-[#134969] hover:to-[#165479] text-white font-medium text-sm sm:text-[15px] shadow-[0_6px_20px_-3px_rgba(22,84,121,0.35),inset_0_1px_1px_rgba(255,255,255,0.25)] border border-white/20 hover:border-[#749220]/60 hover:shadow-[0_8px_24px_-3px_rgba(116,146,32,0.35)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 group overflow-hidden shrink-0"
                >
                  <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-700 ease-out pointer-events-none" />
                  <span className="relative z-10 tracking-tight">Start Filing</span>
                  <ArrowRightIcon className="relative z-10 w-4 h-4 stroke-[2.5] group-hover:translate-x-1 transition-transform" />
                </Link>

                {/* Secondary Button */}
                <button
                  onClick={onOpenModal}
                  className="relative inline-flex items-center justify-center gap-2.5 h-11 sm:h-12 px-5 sm:px-6 rounded-xl bg-white hover:bg-[#F6F9EE] text-[#165479] hover:text-[#0A4973] border-2 border-[#165479]/15 hover:border-[#749220] font-medium text-sm sm:text-[15px] shadow-[0_2px_8px_rgba(22,84,121,0.06)] hover:shadow-[0_6px_20px_-3px_rgba(116,146,32,0.25)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 group cursor-pointer shrink-0"
                >
                  <CalendarDaysIcon className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-[#749220] group-hover:scale-110 transition-transform stroke-[2.2]" />
                  <span className="tracking-tight">Talk to CPA</span>
                </button>
              </motion.div>

              {/* Live Social Proof Avatar Stack */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.23 }}
                className="flex items-center gap-3 pt-4 border-t border-gray-100"
              >
                <div className="flex -space-x-2 overflow-hidden shrink-0">
                  <span className="inline-flex h-8 w-8 rounded-full ring-2 ring-white bg-[#0A4973] text-white text-[10px] font-medium items-center justify-center">1040</span>
                  <span className="inline-flex h-8 w-8 rounded-full ring-2 ring-white bg-[#749220] text-white text-[10px] font-medium items-center justify-center">W-2</span>
                  <span className="inline-flex h-8 w-8 rounded-full ring-2 ring-white bg-[#165479] text-white text-[10px] font-medium items-center justify-center">CPA</span>
                  <span className="inline-flex h-8 w-8 rounded-full ring-2 ring-white bg-[#0c513f] text-white text-[10px] font-medium items-center justify-center">IRS</span>
                </div>
                <div className="text-left">
                  <div className="flex items-center gap-1.5 text-amber-500 text-xs leading-none">
                    <span className="tracking-tight text-amber-400">★★★★★</span>
                    <span className="text-gray-700 font-medium ml-1 text-xs">4.9/5 Rating</span>
                  </div>
                  <p className="text-[12px] text-gray-500 font-normal mt-0.5">
                    Trusted by 10,000+ U.S. taxpayers, expats & filers worldwide
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Right Visual Presentation */}
            <motion.div
              className="order-1 lg:order-2 lg:col-span-5 xl:col-span-5 relative flex justify-center lg:justify-end items-center mb-6 sm:mb-8 lg:mb-0"
            >
              <div className="relative w-full max-w-[360px] sm:max-w-[440px] md:max-w-[490px] lg:max-w-[530px] xl:max-w-[570px] 2xl:max-w-[610px] mx-auto lg:mr-0 flex justify-center lg:justify-end">
                <div className="relative z-10 w-full group">
                  <img
                    src={usaTaxHeroPhoto}
                    alt="U.S. Federal & State Tax Filing - IRS Form 1040 CPA Reviewed"
                    className="w-full h-auto max-h-[280px] sm:max-h-[350px] md:max-h-[400px] lg:max-h-[450px] xl:max-h-[490px] object-cover rounded-2xl sm:rounded-3xl shadow-[0_16px_40px_rgba(22,84,121,0.12)] border border-gray-100 select-none transition-transform duration-300 group-hover:scale-[1.01]"
                    loading="eager"
                  />

                  {/* Compact High-Trust IRS Verified Glass Pill */}
                  <div className="absolute -bottom-3.5 sm:-bottom-4 left-3 sm:left-5 right-3 sm:right-5 bg-white/95 backdrop-blur-md rounded-2xl p-3 sm:p-3.5 shadow-lg border border-gray-200/90 flex items-center justify-between z-20 select-none">
                    <div className="flex items-center gap-2.5 sm:gap-3">
                      <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#F6F9EE] text-[#749220] border border-[#749220]/30 flex items-center justify-center font-medium text-xs sm:text-sm shrink-0">
                        IRS
                      </div>
                      <div className="text-left">
                        <div className="text-xs sm:text-[13px] font-medium text-gray-800 leading-tight">U.S. Form 1040 e-File</div>
                        <div className="text-[10px] sm:text-[11px] text-gray-500 font-normal">Federal & All 50 States</div>
                      </div>
                    </div>
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 font-medium text-[11px] shrink-0 border border-emerald-200/60">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> 100% CPA Verified
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Tax Filing Specialties & Compliance Ticker */}
          <div className="mt-4 sm:mt-4 lg:mt-4 pt-6 w-full font-sans">
            <div className="text-center mb-4 sm:mb-5 flex items-center justify-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#749220]" />
              <span className="text-[11px] sm:text-xs font-medium tracking-wider text-[#749220] uppercase">
                IRS Authorized Tax Preparation & Expat Compliance Specialties
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#749220]" />
            </div>

            <div className="relative w-full overflow-hidden py-1">
              <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-white via-white/90 to-transparent z-10" />
              <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-white via-white/90 to-transparent z-10" />

              <div className="animate-marquee flex items-center gap-4 sm:gap-5 select-none">
                {taxFilingBadges.map((badge, i) => (
                  <div
                    key={`tax-badge-1-${i}`}
                    className="flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-white border border-gray-200/80 shadow-xs hover:border-[#749220] hover:shadow-md hover:bg-[#F6F9EE]/60 transition-all duration-200 shrink-0 group cursor-default"
                  >
                    <div className="w-9 h-9 rounded-xl bg-[#F6F9EE] text-[#749220] border border-[#749220]/30 flex items-center justify-center shrink-0 group-hover:bg-[#749220] group-hover:text-white transition-colors">
                      {badge.icon}
                    </div>
                    <div className="text-left">
                      <div className="text-xs sm:text-sm font-medium text-gray-800 group-hover:text-[#165479] transition-colors whitespace-nowrap">
                        {badge.title}
                      </div>
                      <div className="text-[10px] sm:text-[11px] text-gray-500 font-normal whitespace-nowrap">
                        {badge.tag}
                      </div>
                    </div>
                  </div>
                ))}

                {taxFilingBadges.map((badge, i) => (
                  <div
                    key={`tax-badge-2-${i}`}
                    className="flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-white border border-gray-200/80 shadow-xs hover:border-[#749220] hover:shadow-md hover:bg-[#F6F9EE]/60 transition-all duration-200 shrink-0 group cursor-default"
                  >
                    <div className="w-9 h-9 rounded-xl bg-[#F6F9EE] text-[#749220] border border-[#749220]/30 flex items-center justify-center shrink-0 group-hover:bg-[#749220] group-hover:text-white transition-colors">
                      {badge.icon}
                    </div>
                    <div className="text-left">
                      <div className="text-xs sm:text-sm font-medium text-gray-800 group-hover:text-[#165479] transition-colors whitespace-nowrap">
                        {badge.title}
                      </div>
                      <div className="text-[10px] sm:text-[11px] text-gray-500 font-normal whitespace-nowrap">
                        {badge.tag}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>
    </>
  );
};

export default HeroBanner;

