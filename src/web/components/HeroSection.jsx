import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence, useInView } from "framer-motion";
import LeadModal from "../components/popup";
import usaTaxHeroPhoto from "../assets/usa-tax-filing-hero.jpg";
import irsHeroBanner from "../assets/irs-taxfiler-3d-hero.jpg";
import uptikHeroImg from "../assets/uptik-hero-showcase.png";
import globalTaxHeroImg from "../assets/tax-hero-right-complete-cards-hd.png";
import {
  DocumentTextIcon,
  GlobeAltIcon,
  BanknotesIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  ShieldCheckIcon,
  SparklesIcon,
  ClockIcon,
  ChatBubbleLeftRightIcon,
  CheckBadgeIcon,
  EnvelopeIcon,
  UserGroupIcon,
  CalendarDaysIcon,
} from "@heroicons/react/24/outline";

// Animated Counter Component
const AnimatedCounter = ({ value, duration = 2.5, delay = 0 }) => {
  const [count, setCount] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const ref = useRef(null);

  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const parseValue = (val) => {
    const str = val.toString();
    let num = 0;
    let suffix = "";
    let hasDollar = str.includes("$");

    if (str.includes("M")) {
      const match = str.match(/([\d.]+)/);
      num = parseFloat(match ? match[1] : 0) * 1000000;
      suffix = "M+";
    } else if (str.includes("K")) {
      const match = str.match(/([\d.]+)/);
      num = parseFloat(match ? match[1] : 0) * 1000;
      suffix = "K+";
    } else if (str.includes("%")) {
      const match = str.match(/([\d.]+)/);
      num = parseFloat(match ? match[1] : 0);
      suffix = "%";
    } else {
      const match = str.match(/([\d,]+)/);
      num = parseFloat(match ? match[1].replace(/,/g, "") : 0);
      suffix = str.includes("+") ? "+" : "";
    }

    return { num, suffix, hasDollar };
  };

  const formatNumber = (num, suffix, hasDollar) => {
    if (suffix === "M+") {
      return `${hasDollar ? "$" : ""}${(num / 1000000).toFixed(0)}M+`;
    } else if (suffix === "K+") {
      return `${hasDollar ? "$" : ""}${(num / 1000).toFixed(0)}K+`;
    } else if (suffix === "%") {
      return `${Math.floor(num)}%`;
    } else if (suffix === "+") {
      const formatted = num >= 1000 ? num.toLocaleString() : num.toString();
      return `${hasDollar ? "$" : ""}${formatted}+`;
    } else {
      const formatted = num >= 1000 ? num.toLocaleString() : num.toString();
      return `${hasDollar ? "$" : ""}${formatted}`;
    }
  };

  const { num, suffix, hasDollar } = parseValue(value);

  useEffect(() => {
    if (!isInView) return;

    setIsAnimating(true);
    let animationFrame;

    const startTime = Date.now() + delay * 1000;
    const endTime = startTime + duration * 1000;

    const animate = () => {
      const now = Date.now();
      if (now < startTime) {
        animationFrame = requestAnimationFrame(animate);
        return;
      }

      const progress = Math.min((now - startTime) / (endTime - startTime), 1);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentCount = Math.floor(num * easeOutQuart);

      setCount(currentCount);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(num);
        setIsAnimating(false);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [isInView, num, duration, delay]);

  const displayValue = formatNumber(count, suffix, hasDollar);

  return (
    <motion.span
      ref={ref}
      key={count}
      initial={{ scale: 0.8, opacity: 0.5 }}
      animate={{
        scale: 1,
        opacity: 1,
        transition: { duration: 0.2, ease: "easeOut" },
      }}
      className="inline-block"
    >
      {displayValue}
    </motion.span>
  );
};

const HeroSection = () => {
  const [selectedService, setSelectedService] = useState("us-individual");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const serviceCategories = [
    {
      id: "us-individual",
      label: "US Individual",
      badge: "Form 1040 & Expats",
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
    },
    {
      id: "us-business",
      label: "US Business",
      badge: "LLC, C-Corp & S-Corp",
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      id: "us-expat",
      label: "US Expat & Foreign Assets",
      badge: "FBAR, FATCA & 1040-NR",
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
        </svg>
      ),
    },
  ];

  const services = {
    "us-individual": {
      title: "US Individual & Expat Tax Services",
      subtitle: "Maximize federal & state refunds with CPA-guided deductions and dual-status compliance.",
      items: [
        {
          title: "US Individual Tax Return",
          description: "Accurate filing support for your federal and state return.",
          tag: "Form 1040",
          route: "/services/us-individual/federal-state-local",
          icon: <DocumentTextIcon className="w-5 h-5 text-white" />,
          features: ["Federal + State", "Deductions"],
        },
        {
          title: "Foreign Asset Reporting",
          description: "Stay compliant with international account disclosures.",
          tag: "FBAR / FATCA",
          route: "/services/us-individual/fbar-fatca",
          icon: <GlobeAltIcon className="w-5 h-5 text-white" />,
          features: ["Global accounts", "Compliance"],
        },
        {
          title: "Multi-State & Remote Worker Filing",
          description: "Accurate state allocations for remote employees and state-to-state movers.",
          tag: "SALT Returns",
          route: "/services/us-individual/federal-state-local",
          icon: <CheckCircleIcon className="w-5 h-5 text-white" />,
          features: ["Multi-state allocations", "SALT deductions"],
        },
        {
          title: "Amended Returns & Prior Years",
          description: "Catch up on past tax years and claim missed refunds with IRS Form 1040-X.",
          tag: "Form 1040-X",
          route: "/services/us-individual/federal-state-local",
          icon: <ClockIcon className="w-5 h-5 text-white" />,
          features: ["Prior year filing", "IRS penalty mitigation"],
        },
        {
          title: "Expat & Non-Resident (1040-NR)",
          description: "Dual-status, tax treaties, and US tax returns for visa holders & expats.",
          tag: "Form 1040-NR",
          route: "/services/us-individual/federal-state-local",
          icon: <GlobeAltIcon className="w-5 h-5 text-white" />,
          features: ["1040-NR filing", "Treaty benefits"],
        },
      ],
    },
    "us-business": {
      title: "US Business & Corporate Tax Services",
      subtitle: "End-to-end corporate tax filings, state franchise compliance, and cross-border structuring.",
      items: [
        {
          title: "Small & Medium Business Tax Filing",
          description: "Comprehensive federal & state returns for LLCs, S-Corporations, C-Corporations, and Partnerships.",
          tag: "Form 1120 / 1065",
          route: "/services/us-business/smb-tax-filing",
          icon: <BanknotesIcon className="w-5 h-5" />,
          features: ["P&L and balance sheet review", "Depreciation & R&D credits", "K-1 partner distribution"],
        },
        {
          title: "US Company Incorporations",
          description: "Entity formation in Delaware, Wyoming, Texas, California and all 50 states with EIN acquisition.",
          tag: "Entity Setup",
          route: "/services/us-business/incorporations",
          icon: <DocumentTextIcon className="w-5 h-5" />,
          features: ["Articles of organization", "Federal EIN acquisition", "Operating agreement drafting"],
        },
        {
          title: "Annual Reports & Franchise Tax",
          description: "Maintain good corporate standing with timely state annual reports, franchise tax returns, and filings.",
          tag: "Good Standing",
          route: "/services/us-business/incorporations",
          icon: <CheckBadgeIcon className="w-5 h-5" />,
          features: ["State compliance calendar", "Franchise tax calculation", "Certificate of good standing"],
        },
        {
          title: "Payroll & 1099 Contractor Compliance",
          description: "Federal Form 940/941 quarterly payroll filings, W-2 generation, and 1099-NEC contractor reporting.",
          tag: "Form 941 & 1099",
          route: "/services/us-business/smb-tax-filing",
          icon: <UserGroupIcon className="w-5 h-5" />,
          features: ["Quarterly state unemployment", "Automated 1099 filing", "Payroll tax reconciliation"],
        },
      ],
    },
    "us-expat": {
      title: "US Expat & International Tax Compliance",
      subtitle: "Full IRS compliance for Americans abroad, green card holders, and non-resident foreign investors.",
      items: [
        {
          title: "FBAR & FATCA Asset Disclosures",
          description: "FinCEN Form 114 and IRS Form 8938 reporting for foreign financial accounts and offshore assets.",
          tag: "FinCEN 114 & 8938",
          route: "/services/us-individual/fbar-fatca",
          icon: <BanknotesIcon className="w-5 h-5" />,
          features: ["Foreign bank accounts", "PFIC calculation", "IRS penalty protection"],
        },
        {
          title: "IRS Streamlined Filing Compliance",
          description: "Catch up on past-due U.S. returns with IRS penalty amnesty for expats living overseas.",
          tag: "Streamlined IRS",
          route: "/services/us-individual/federal-state-local",
          icon: <ShieldCheckIcon className="w-5 h-5" />,
          features: ["3 years delinquent returns", "6 years FBARs", "Zero penalty relief"],
        },
        {
          title: "Foreign Earned Income & Tax Credits",
          description: "Maximize Form 2555 FEIE exclusions and Form 1116 Foreign Tax Credits to eliminate double taxation.",
          tag: "Form 2555 / 1116",
          route: "/services/us-individual/federal-state-local",
          icon: <GlobeAltIcon className="w-5 h-5" />,
          features: ["FEIE exclusion claim", "Foreign tax credit carryover", "Housing deduction"],
        },
        {
          title: "ITIN Acquisition & Certification",
          description: "Obtain an IRS Individual Taxpayer Identification Number without mailing original passports.",
          tag: "Form W-7 / ITIN",
          route: "/services/us-individual/federal-state-local",
          icon: <CheckCircleIcon className="w-5 h-5" />,
          features: ["IRS Certifying Acceptance", "Spouse & dependent ITIN", "Fast IRS approval"],
        },
      ],
    },
  };

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
    <div className="bg-white text-gray-900 font-sans antialiased">
      {/* ========================================================= */}
      {/* 1. HERO SECTION (CLEAN WHITE AESTHETIC)                   */}
      {/* ========================================================= */}
      {/* ========================================================= */}
      {/* 1. HERO SECTION (MODERN SAAS STUDIO AESTHETIC)             */}
      {/* ========================================================= */}
      <section className="relative overflow-hidden pt-24 sm:pt-28 md:pt-32 lg:pt-20 pb-12 sm:pb-16 lg:pb-14 bg-white lg:min-h-[calc(100vh-4rem)] flex items-center">

        {/* Clean Pure White Background */}

        <div className="relative max-w-7xl 2xl:max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 xl:gap-10 items-center">

            {/* Left Content Column */}
            <div className="lg:col-span-7 xl:col-span-7 lg:pr-6 xl:pr-10 font-sans text-left">

              {/* Trust Eyebrow Pill with Pulsing Live Status Dot */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F6F9EE] border border-[#749220]/30 shadow-xs mb-4 sm:mb-5"
              >
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#749220] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#749220]"></span>
                </span>
                <span className="text-xs sm:text-[13px] font-semibold text-[#165479] tracking-wide">
                  IRS Authorized e-File Provider • U.S. Federal & State Taxes
                </span>
              </motion.div>

              {/* Main Heading - Bold UpTik Typography with Gradient Accent */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                style={{ lineHeight: 1.18 }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-[44px] xl:text-[48px] 2xl:text-[52px] font-semibold text-gray-900 tracking-tight mb-4 sm:mb-5"
              >
                U.S. Tax Filing, <br className="hidden sm:inline" />
                <span className="bg-gradient-to-r from-[#0A4973] via-[#165479] to-[#749220] bg-clip-text text-transparent">
                  simplified & optimized.
                </span>
              </motion.h1>

              {/* Subheading */}
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="text-sm sm:text-base lg:text-[17px] text-gray-600 font-normal leading-[28px] mb-6 max-w-2xl"
              >
                File your U.S. federal and state taxes with certified CPA guidance. Enjoy maximum refunds, guaranteed 100% IRS accuracy, and seamless online filing for US taxpayers, expats, and green card holders.
              </motion.p>

              {/* High-Impact Value Checklist (Reference: Stripe / Ramp / UpTik) */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.18 }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-6 max-w-lg"
              >
                <div className="flex items-center gap-2 text-xs sm:text-[13px] text-gray-700 font-medium">
                  <div className="w-5 h-5 rounded-full bg-[#749220]/15 text-[#749220] flex items-center justify-center shrink-0">
                    <CheckCircleIcon className="w-3.5 h-3.5 stroke-[2.5]" />
                  </div>
                  <span>100% CPA-Reviewed Filing</span>
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-[13px] text-gray-700 font-medium">
                  <div className="w-5 h-5 rounded-full bg-[#749220]/15 text-[#749220] flex items-center justify-center shrink-0">
                    <CheckCircleIcon className="w-3.5 h-3.5 stroke-[2.5]" />
                  </div>
                  <span>Guaranteed Maximum Refund</span>
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-[13px] text-gray-700 font-medium">
                  <div className="w-5 h-5 rounded-full bg-[#749220]/15 text-[#749220] flex items-center justify-center shrink-0">
                    <CheckCircleIcon className="w-3.5 h-3.5 stroke-[2.5]" />
                  </div>
                  <span>FBAR & FATCA US Reporting</span>
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-[13px] text-gray-700 font-medium">
                  <div className="w-5 h-5 rounded-full bg-[#749220]/15 text-[#749220] flex items-center justify-center shrink-0">
                    <CheckCircleIcon className="w-3.5 h-3.5 stroke-[2.5]" />
                  </div>
                  <span>IRS & State Audit Defense</span>
                </div>
              </motion.div>

              {/* CTA Action Buttons - Perfectly Adjusted & Balanced */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex flex-wrap sm:flex-nowrap items-center gap-3 sm:gap-4 mb-6"
              >
                {/* Primary Button */}
                <Link
                  to="/login"
                  className="relative inline-flex items-center justify-center gap-2.5 h-11 sm:h-12 px-5 sm:px-6 rounded-xl bg-gradient-to-r from-[#0C3D5A] via-[#165479] to-[#1A5B82] hover:from-[#09324A] hover:via-[#134969] hover:to-[#165479] text-white font-bold text-sm sm:text-[15px] shadow-[0_6px_20px_-3px_rgba(22,84,121,0.35),inset_0_1px_1px_rgba(255,255,255,0.25)] border border-white/20 hover:border-[#749220]/60 hover:shadow-[0_8px_24px_-3px_rgba(116,146,32,0.35)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 group overflow-hidden shrink-0"
                >
                  {/* Subtle Light-Sweep Sheen on Hover */}
                  <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-700 ease-out pointer-events-none" />
                  <span className="relative z-10 tracking-tight">Start Filing</span>
                  <ArrowRightIcon className="relative z-10 w-4 h-4 stroke-[2.5] group-hover:translate-x-1 transition-transform" />
                </Link>

                {/* Secondary Button */}
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="relative inline-flex items-center justify-center gap-2.5 h-11 sm:h-12 px-5 sm:px-6 rounded-xl bg-white hover:bg-[#F6F9EE] text-[#165479] hover:text-[#0A4973] border-2 border-[#165479]/15 hover:border-[#749220] font-bold text-sm sm:text-[15px] shadow-[0_2px_8px_rgba(22,84,121,0.06)] hover:shadow-[0_6px_20px_-3px_rgba(116,146,32,0.25)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 group cursor-pointer shrink-0"
                >
                  <CalendarDaysIcon className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-[#749220] group-hover:scale-110 transition-transform stroke-[2.2]" />
                  <span className="tracking-tight">Talk to CPA</span>
                </button>
              </motion.div>

              {/* Friction Reducer Note */}
              {/* <p className="text-[12px] text-gray-500 font-medium mb-6 flex items-center gap-2">
                <span className="text-[#749220]">✓</span> No upfront credit card
                <span className="text-gray-300">•</span>
                <span className="text-[#749220]">✓</span> 15-min response time
                <span className="text-gray-300">•</span>
                <span className="text-[#749220]">✓</span> Bank-grade 256-bit security
              </p> */}

              {/* Live Social Proof Avatar Stack */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.23 }}
                className="flex items-center gap-3 pt-4 border-t border-gray-100"
              >
                <div className="flex -space-x-2 overflow-hidden shrink-0">
                  <span className="inline-flex h-8 w-8 rounded-full ring-2 ring-white bg-[#0A4973] text-white text-[10px] font-bold items-center justify-center">1040</span>
                  <span className="inline-flex h-8 w-8 rounded-full ring-2 ring-white bg-[#749220] text-white text-[10px] font-bold items-center justify-center">W-2</span>
                  <span className="inline-flex h-8 w-8 rounded-full ring-2 ring-white bg-[#165479] text-white text-[10px] font-bold items-center justify-center">CPA</span>
                  <span className="inline-flex h-8 w-8 rounded-full ring-2 ring-white bg-[#0c513f] text-white text-[10px] font-bold items-center justify-center">IRS</span>
                </div>
                <div className="text-left">
                  <div className="flex items-center gap-1.5 text-amber-500 text-xs leading-none">
                    <span className="tracking-tight text-amber-400">★★★★★</span>
                    <span className="text-gray-900 font-bold ml-1 text-xs">4.9/5 Rating</span>
                  </div>
                  <p className="text-[12px] text-gray-500 font-medium mt-0.5">
                    Trusted by 10,000+ U.S. taxpayers, expats & filers worldwide
                  </p>
                </div>
              </motion.div>

              {/* Modern Trust Chips */}
              {/* <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.28 }}
                className="flex flex-wrap items-center gap-2 sm:gap-2.5 text-xs text-gray-700"
              >
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-50/90 border border-gray-200/80 shadow-2xs">
                  <CheckCircleIcon className="w-4 h-4 text-emerald-600" />
                  <span className="font-semibold text-gray-800 text-xs">100% IRS Accuracy</span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-50/90 border border-gray-200/80 shadow-2xs">
                  <SparklesIcon className="w-4 h-4 text-[#749220]" />
                  <span className="font-semibold text-gray-800 text-xs">Maximum Refund Promise</span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-50/90 border border-gray-200/80 shadow-2xs">
                  <ShieldCheckIcon className="w-4 h-4 text-[#749220]" />
                  <span className="font-semibold text-gray-800 text-xs">Licensed CPA Review</span>
                </div>
              </motion.div> */}
            </div>

            {/* Right Visual Presentation - Prominently Sized without background glow */}
            <motion.div
              className="lg:col-span-5 xl:col-span-5 relative flex justify-center lg:justify-end items-center"
            >
              <div className="relative w-full max-w-[360px] sm:max-w-[440px] md:max-w-[490px] lg:max-w-[530px] xl:max-w-[570px] 2xl:max-w-[610px] mx-auto lg:mr-0 flex justify-center lg:justify-end">
                {/* Real Commercial Photography Container */}
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
                      <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#F6F9EE] text-[#749220] border border-[#749220]/30 flex items-center justify-center font-bold text-xs sm:text-sm shrink-0">
                        IRS
                      </div>
                      <div className="text-left">
                        <div className="text-xs sm:text-[13px] font-bold text-gray-900 leading-tight">U.S. Form 1040 e-File</div>
                        <div className="text-[10px] sm:text-[11px] text-gray-500 font-medium">Federal & All 50 States</div>
                      </div>
                    </div>
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 font-bold text-[11px] shrink-0 border border-emerald-200/60">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> 100% CPA Verified
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* ========================================================= */}
          {/* Tax Filing Specialties & Compliance Ticker                */}
          {/* ========================================================= */}
          <div className="mt-4 sm:mt-4 lg:mt-4 pt-6 w-full font-sans">
            <div className="text-center mb-4 sm:mb-5 flex items-center justify-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#749220]" />
              <span className="text-[11px] sm:text-xs font-semibold tracking-wider text-[#749220] uppercase">
                IRS Authorized Tax Preparation & Expat Compliance Specialties
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#749220]" />
            </div>

            {/* Scrolling Track with Subtle Edge Fades */}
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
                      <div className="text-xs sm:text-sm font-semibold text-gray-900 group-hover:text-[#165479] transition-colors whitespace-nowrap">
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
                      <div className="text-xs sm:text-sm font-semibold text-gray-900 group-hover:text-[#165479] transition-colors whitespace-nowrap">
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

      {/* ========================================================= */}
      {/* 3. TAX FILING SUITE - ELEGANT LIGHT MODERN DECK           */}
      {/* ========================================================= */}
      <section className="relative py-16 sm:py-20 lg:py-24 bg-white border-y border-gray-100 font-sans overflow-hidden">

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Section Header - Editorial, Light & Spacious */}
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-14">
            {/* Subtle Eyebrow Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F6F9EE] border border-[#749220]/25 mb-3 text-[11px] font-medium text-[#749220] tracking-wider uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[#749220]" />
              <span>Full-Service Tax Preparation</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-normal text-gray-900 tracking-tight leading-snug">
              Explore Our{" "}
              <span className="font-medium text-[#165479]">
                Filing Services
              </span>
            </h2>

            <p className="text-sm sm:text-[15px] text-gray-500 mt-2.5 max-w-xl mx-auto font-normal leading-relaxed">
              Certified CPA preparation, dual-status compliance, and maximum refunds tailored for US taxpayers, businesses, and expats.
            </p>

            {/* Segmented Category Switcher - Minimalist Clean Pill */}
            <div className="mt-8 flex justify-center">
              <div className="inline-flex items-center p-1 bg-gray-50/90 rounded-full border border-gray-200/60 shadow-2xs gap-1">
                {serviceCategories.map((cat) => {
                  const isActive = selectedService === cat.id;
                  const count = services[cat.id]?.items.length || 0;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setSelectedService(cat.id)}
                      className={`flex items-center gap-2 py-2 px-4 sm:px-5 rounded-full text-xs sm:text-[13px] font-medium transition-all duration-200 cursor-pointer whitespace-nowrap ${isActive
                        ? "bg-white text-[#165479] shadow-xs border border-gray-200/80"
                        : "text-gray-500 hover:text-gray-900"
                        }`}
                    >
                      <div className={`w-3.5 h-3.5 shrink-0 ${isActive ? "text-[#749220]" : "text-gray-400"}`}>
                        {cat.icon}
                      </div>
                      <span className="font-normal">{cat.label}</span>
                      <span className={`text-[11px] font-normal px-1.5 py-0.2 rounded-full ${isActive ? "bg-[#F6F9EE] text-[#749220]" : "text-gray-400"
                        }`}>
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* 3-Column Services Grid - Elegant, Airy & Beautiful */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
            {services[selectedService]?.items.map((item, idx) => (
              <div
                key={idx}
                className="relative bg-white rounded-3xl p-6 sm:p-7 border border-gray-100/90 shadow-[0_2px_16px_rgba(22,84,121,0.03)] hover:shadow-[0_16px_36px_-6px_rgba(22,84,121,0.08)] hover:border-[#749220]/30 hover:-translate-y-1 transition-all duration-300 group flex flex-col justify-between text-left"
              >
                <div>
                  {/* Top Row: Gentle Icon Squircle + Delicate Form Tag */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-11 h-11 rounded-2xl bg-[#F6F9EE] text-[#749220] border border-[#749220]/25 flex items-center justify-center shrink-0 transition-colors group-hover:bg-[#165479] group-hover:text-white group-hover:border-[#165479]">
                      {item.icon}
                    </div>
                    {item.tag && (
                      <span className="text-[11px] font-normal text-primary bg-[#C3DCEB]/20 border border-[#C3DCEB]/40 px-3 py-1 rounded-full tracking-wide">
                        {item.tag}
                      </span>
                    )}
                  </div>

                  {/* Title - Clean font-medium */}
                  <h3 className="text-base sm:text-[17px] font-medium text-gray-900 mb-2 group-hover:text-[#165479] transition-colors leading-snug">
                    {item.title}
                  </h3>

                  {/* Description - Gentle font-normal */}
                  <p className="text-xs sm:text-[13px] text-gray-500 leading-relaxed font-normal mb-5">
                    {item.description}
                  </p>

                  {/* Minimalist Feature List with Soft Bullet Dots */}
                  {item.features && item.features.length > 0 && (
                    <ul className="space-y-2 mb-6">
                      {item.features.map((feat, fIdx) => (
                        <li key={fIdx} className="flex items-center gap-2 text-xs text-gray-600 font-normal">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#749220]/70 shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Bottom Action Link - Refined & Light */}
                <div className="pt-4 border-t border-gray-50 flex items-center justify-between">
                  <Link
                    to={item.route || "/login"}
                    className="inline-flex items-center gap-1.5 text-xs sm:text-[13px] font-medium text-[#165479] hover:text-[#749220] transition-colors group/link"
                  >
                    <span>File Return</span>
                    <ArrowRightIcon className="w-3.5 h-3.5 stroke-[1.8] group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}

            {/* 6th Slot: Harmonious CPA Consultation Spotlight Card */}
            <div className="relative bg-gradient-to-b from-[#F6F9EE]/70 via-[#F6F9EE]/40 to-white rounded-3xl p-6 sm:p-7 border border-[#749220]/30 shadow-[0_2px_16px_rgba(116,146,32,0.05)] hover:shadow-[0_16px_36px_-6px_rgba(116,146,32,0.1)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between text-left group">
              <div>
                {/* Top Squircle with Shield & Badge */}
                <div className="flex items-center justify-between mb-5">
                  <div className="w-11 h-11 rounded-2xl bg-white text-[#749220] border border-[#749220]/25 shadow-2xs flex items-center justify-center shrink-0">
                    <ShieldCheckIcon className="w-5 h-5 stroke-[1.8]" />
                  </div>
                  <span className="text-[11px] font-normal text-[#749220] bg-white border border-[#749220]/30 px-3 py-1 rounded-full tracking-wide">
                    15-Min Free
                  </span>
                </div>

                <h3 className="text-base sm:text-[17px] font-medium text-gray-900 mb-2 leading-snug">
                  CPA Advisory Session
                </h3>

                <p className="text-xs sm:text-[13px] text-gray-600 leading-relaxed font-normal mb-5">
                  Connect 1-on-1 with a licensed CPA or IRS Enrolled Agent for tailored guidance before submitting.
                </p>

                <ul className="space-y-2 mb-6">
                  <li className="flex items-center gap-2 text-xs text-gray-600 font-normal">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#749220] shrink-0" />
                    <span>Dual-status & expat tax review</span>
                  </li>
                  <li className="flex items-center gap-2 text-xs text-gray-600 font-normal">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#749220] shrink-0" />
                    <span>Prior-year catch up & penalty relief</span>
                  </li>
                </ul>
              </div>

              <div>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(true)}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#165479] hover:bg-[#0A4973] text-white font-medium text-xs sm:text-[13px] shadow-sm hover:shadow transition-all flex items-center justify-center gap-2 cursor-pointer group/btn"
                >
                  <span>Book Free Consultation</span>
                  <ArrowRightIcon className="w-3.5 h-3.5 stroke-[1.8] group-hover/btn:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Trust Guarantee Strip - Minimal, Elegant & Light */}
          <div className="mt-12 py-3 px-6 rounded-full bg-gray-50/80 border border-gray-100 flex flex-wrap items-center justify-center gap-5 sm:gap-8 text-xs text-gray-500 font-normal text-center max-w-3xl mx-auto">
            <div className="flex items-center gap-1.5">
              <CheckCircleIcon className="w-4 h-4 text-[#749220] stroke-[1.8]" />
              <span>100% IRS Accuracy Guarantee</span>
            </div>
            <span className="text-gray-300 hidden sm:inline">•</span>
            <div className="flex items-center gap-1.5">
              <ShieldCheckIcon className="w-4 h-4 text-[#165479] stroke-[1.8]" />
              <span>Licensed CPA & Enrolled Agent Review</span>
            </div>
            <span className="text-gray-300 hidden sm:inline">•</span>
            <div className="flex items-center gap-1.5">
              <SparklesIcon className="w-4 h-4 text-[#749220] stroke-[1.8]" />
              <span>Maximum Refund Guarantee</span>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* 4. WHY CHOOSE OUR TAX TEAM (UNIQUE CONNECTED ARCHITECTURE)*/}
      {/* ========================================================= */}
      <section className="relative py-12 sm:py-16 lg:py-10 bg-white font-sans overflow-hidden">
        {/* Ambient Subtle Lavender Aura */}
        <div className="absolute top-1/3 right-10 w-[550px] h-[550px] rounded-full bg-gradient-to-tr from-[#165479]/10 via-[#749220]/5 to-transparent blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">

          <div className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-8">

            {/* Left Column: Heading & Subtitle */}
            <div className="w-full lg:w-[420px] xl:w-[460px] shrink-0 text-left">
              {/* Eyebrow Pill Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-gray-200/90 shadow-2xs mb-5 text-xs font-normal text-gray-700">
                <span className="w-4 h-4 rounded-md bg-[#10b981] text-white flex items-center justify-center text-[10px] shrink-0">
                  ✓
                </span>
                <span>The IRS Tax Filer Advantage</span>
              </div>

              {/* Display Headline */}
              <h2 className="text-3xl sm:text-4xl lg:text-[46px] xl:text-[50px] font-bold text-gray-900 tracking-tight leading-[1.18] space-y-1 sm:space-y-2">
                <span className="block whitespace-nowrap">Why Thousands</span>
                <span className="block whitespace-nowrap bg-gradient-to-r from-[#0A4973] via-[#165479] to-[#749220] bg-clip-text text-transparent">
                  Choose Our
                </span>
                <span className="block whitespace-nowrap bg-gradient-to-r from-[#0A4973] via-[#165479] to-[#749220] bg-clip-text text-transparent">
                  Tax Team
                </span>
              </h2>

              {/* Subtitle */}
              <p className="text-sm sm:text-base text-gray-500 font-normal leading-relaxed max-w-sm mt-5">
                A smarter way to file, plan, and keep more of what you earn — with real experts and powerful technology on your side.
              </p>
            </div>

            {/* Right Column: Connected Flow Composition */}
            <div className="w-full lg:w-[860px] relative shrink-0">

              {/* Desktop Connected Layout */}
              <div className="hidden lg:block relative h-[590px]">

                {/* SVG Connecting Dashed Paths Layer */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" viewBox="0 0 860 590" fill="none">
                  {/* Dashed line from Card 3 up to Card 1 left edge */}
                  <path d="M 45 340 L 45 170 Q 45 155 60 155 L 80 155" stroke="#749220" strokeWidth="1.5" strokeDasharray="4 4" strokeOpacity="0.85" />
                  <circle cx="80" cy="155" r="10" fill="#ECF2DC" fillOpacity="0.85" />
                  <circle cx="80" cy="155" r="4.5" fill="#749220" />

                  {/* Dashed line from Card 1 top edge up and right to Card 2 */}
                  <path d="M 380 30 L 380 10 Q 380 0 400 0 L 520 0" stroke="#749220" strokeWidth="1.5" strokeDasharray="4 4" strokeOpacity="0.85" />
                  <circle cx="520" cy="0" r="10" fill="#ECF2DC" fillOpacity="0.85" />
                  <circle cx="520" cy="0" r="4.5" fill="#749220" />

                  {/* Dashed line from Card 1 right edge curving down to Card 4 */}
                  <path d="M 490 260 L 530 260 Q 555 260 555 285 L 555 315 L 590 315" stroke="#749220" strokeWidth="1.5" strokeDasharray="4 4" strokeOpacity="0.85" />
                  <circle cx="490" cy="260" r="10" fill="#ECF2DC" fillOpacity="0.85" />
                  <circle cx="490" cy="260" r="4.5" fill="#749220" />
                  <circle cx="555" cy="315" r="10" fill="#ECF2DC" fillOpacity="0.85" />
                  <circle cx="555" cy="315" r="4.5" fill="#749220" />
                </svg>

                {/* 1. Centerpiece Hero Card: AI + CPA Accuracy */}
                <div className="absolute top-7 left-20 z-30 w-[410px] rounded-[36px] bg-gradient-to-b from-[#FFFFFF] via-[#F6F9EE] to-[#F6F9EE] border border-[#DCE6BC] p-7 shadow-[0_20px_50px_rgba(22,84,121,0.08)] text-left hover:shadow-[0_24px_56px_rgba(116,146,32,0.12)] transition-all">
                  <div className="flex items-center justify-between">
                    {/* Big White Squircle with Purple Brain Icon */}
                    <div className="w-18 h-18 rounded-[24px] bg-white border border-[#C3DCEB]/70 shadow-xs flex items-center justify-center">
                      <svg className="w-10 h-10 text-[#749220]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9.5 4a3.5 3.5 0 0 0-3.5 3.5c0 .33.05.65.13.95A4 4 0 0 0 4 12c0 1.25.58 2.37 1.48 3.1A4.5 4.5 0 0 0 9.5 20h.5V4h-.5z" />
                        <path d="M14.5 4a3.5 3.5 0 0 1 3.5 3.5c0 .33-.05.65-.13.95A4 4 0 0 1 20 12c0 1.25-.58 2.37-1.48 3.1A4.5 4.5 0 0 1 14.5 20h-.5V4h.5z" />
                        <path d="M6.5 12h3" />
                        <path d="M14.5 12h3" />
                        <path d="M7 16h2.5" />
                        <path d="M14.5 16H17" />
                        <path d="M7 8h2.5" />
                        <path d="M14.5 8H17" />
                      </svg>
                    </div>
                    {/* Soft Lavender Pill Badge */}
                    <span className="text-xs font-normal text-[#637D1A] bg-[#F6F9EE] px-4 py-1.5 rounded-full border border-[#749220]/30 shadow-2xs">
                      Our Core Advantage
                    </span>
                  </div>

                  <h3 className="text-2xl font-normal text-[#0A4973] tracking-tight mt-6">
                    AI + CPA Accuracy
                  </h3>
                  <p className="text-xs sm:text-sm text-[#52525b] font-normal leading-relaxed mt-2.5">
                    Advanced AI meets licensed CPAs to deliver greater accuracy, fewer errors, and bigger opportunities for your refund.
                  </p>

                  {/* Bottom Rounded Pill */}
                  <div className="mt-6 px-4 py-2.5 rounded-full bg-white/95 border border-[#C3DCEB] shadow-2xs inline-flex items-center gap-2.5 text-xs text-[#3f3f46] font-normal">
                    <span className="w-4 h-4 rounded-md bg-[#10b981] text-white flex items-center justify-center text-[10px] shrink-0">
                      ✓
                    </span>
                    <span>Human expertise. AI speed. Better results.</span>
                  </div>
                </div>

                {/* 2. Top-Right Card: Anytime Expert Chat */}
                <div className="absolute top-0 right-14 z-20 w-[260px] rounded-[32px] bg-white border border-[#C3DCEB]/80 p-6 shadow-[0_16px_36px_rgba(0,0,0,0.03)] text-left hover:shadow-[0_20px_42px_rgba(0,0,0,0.05)] transition-all">
                  <div className="w-16 h-16 rounded-[22px] bg-[#F0F6FA] text-[#749220] flex items-center justify-center shadow-xs">
                    <svg className="w-8 h-8 text-[#749220]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                    </svg>
                  </div>
                  <h4 className="text-lg font-normal text-[#0A4973] tracking-tight mt-4">
                    Anytime Expert Chat
                  </h4>
                  <p className="text-xs text-[#52525b] font-normal leading-relaxed mt-2">
                    Get answers from real tax experts whenever you need them — not just during tax season.
                  </p>
                  <div className="flex justify-end mt-4">
                    <div className="w-10 h-10 rounded-full border border-[#749220]/40 bg-white text-[#749220] flex items-center justify-center hover:bg-[#F6F9EE] transition-colors shadow-2xs cursor-pointer">
                      <ArrowRightIcon className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                {/* 3. Bottom-Left Card: Refund Accelerator */}
                <div className="absolute bottom-2 left-0 z-20 w-[270px] rounded-[32px] bg-white border border-[#C3DCEB]/80 p-6 shadow-[0_16px_36px_rgba(0,0,0,0.04)] text-left hover:shadow-[0_20px_42px_rgba(0,0,0,0.06)] transition-all">
                  <div className="w-16 h-16 rounded-[22px] bg-[#F0F6FA] text-[#749220] flex items-center justify-center shadow-xs">
                    <svg className="w-8 h-8 text-[#749220]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                    </svg>
                  </div>
                  <h4 className="text-lg font-normal text-[#0A4973] tracking-tight mt-4">
                    Refund Accelerator
                  </h4>
                  <p className="text-xs text-[#52525b] font-normal leading-relaxed mt-2">
                    Smart checks, faster filing, and proactive monitoring to help you get your refund sooner.
                  </p>
                  <div className="flex justify-end mt-4">
                    <div className="w-10 h-10 rounded-full border border-[#749220]/40 bg-white text-[#749220] flex items-center justify-center hover:bg-[#F6F9EE] transition-colors shadow-2xs cursor-pointer">
                      <ArrowRightIcon className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                {/* 4. Bottom-Right Card: Global Compliance (Cleanly Positioned Below Card 2) */}
                <div className="absolute bottom-2 right-0 z-20 w-[240px] h-[330px] rounded-[32px] bg-white border border-[#C3DCEB]/80 p-6 shadow-[0_16px_36px_rgba(0,0,0,0.03)] text-left flex flex-col justify-between hover:shadow-[0_20px_42px_rgba(0,0,0,0.05)] transition-all">
                  <div>
                    <div className="w-16 h-16 rounded-[22px] bg-[#F0F6FA] text-[#749220] flex items-center justify-center shadow-xs">
                      <svg className="w-8 h-8 text-[#749220]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" />
                        <line x1="2" y1="12" x2="22" y2="12" />
                        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                      </svg>
                    </div>
                    <h4 className="text-lg font-normal text-[#0A4973] tracking-tight mt-4">
                      Global Compliance
                    </h4>
                    <p className="text-xs text-[#52525b] font-normal leading-relaxed mt-2">
                      Stay compliant across borders with up-to-date guidance for U.S. and international tax rules.
                    </p>
                  </div>
                  <div className="flex justify-end mt-auto pt-2">
                    <div className="w-10 h-10 rounded-full border border-[#749220]/40 bg-white text-[#749220] flex items-center justify-center hover:bg-[#F6F9EE] transition-colors shadow-2xs cursor-pointer">
                      <ArrowRightIcon className="w-4 h-4" />
                    </div>
                  </div>
                </div>

              </div>

              {/* Mobile / Tablet Responsive Fallback Layout */}
              <div className="block lg:hidden space-y-4">
                {/* Centerpiece Full Width */}
                <div className="rounded-[28px] bg-gradient-to-b from-[#FFFFFF] via-[#F6F9EE] to-[#F6F9EE] border border-[#DCE6BC] p-6 shadow-sm text-left">
                  <div className="flex items-center justify-between">
                    <div className="w-16 h-16 rounded-[22px] bg-white border border-[#C3DCEB] shadow-xs flex items-center justify-center">
                      <svg className="w-8 h-8 text-[#749220]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9.5 4a3.5 3.5 0 0 0-3.5 3.5c0 .33.05.65.13.95A4 4 0 0 0 4 12c0 1.25.58 2.37 1.48 3.1A4.5 4.5 0 0 0 9.5 20h.5V4h-.5z" />
                        <path d="M14.5 4a3.5 3.5 0 0 1 3.5 3.5c0 .33-.05.65-.13.95A4 4 0 0 1 20 12c0 1.25-.58 2.37-1.48 3.1A4.5 4.5 0 0 1 14.5 20h-.5V4h.5z" />
                        <path d="M6.5 12h3" />
                        <path d="M14.5 12h3" />
                        <path d="M7 16h2.5" />
                        <path d="M14.5 16H17" />
                        <path d="M7 8h2.5" />
                        <path d="M14.5 8H17" />
                      </svg>
                    </div>
                    <span className="text-xs font-normal text-[#637D1A] bg-[#F6F9EE] px-3.5 py-1.5 rounded-full border border-[#749220]/30">
                      Our Core Advantage
                    </span>
                  </div>
                  <h3 className="text-xl font-normal text-[#0A4973] tracking-tight mt-4">
                    AI + CPA Accuracy
                  </h3>
                  <p className="text-xs sm:text-sm text-[#52525b] font-normal leading-relaxed mt-2">
                    Advanced AI meets licensed CPAs to deliver greater accuracy, fewer errors, and bigger opportunities for your refund.
                  </p>
                  <div className="mt-4 inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-white border border-[#C3DCEB] shadow-2xs text-xs text-[#3f3f46] font-normal">
                    <span className="w-4 h-4 rounded-md bg-[#10b981] text-white flex items-center justify-center text-[10px] shrink-0">
                      ✓
                    </span>
                    <span>Human expertise. AI speed. Better results.</span>
                  </div>
                </div>

                {/* 3 Secondary Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                  {[
                    {
                      title: "Anytime Expert Chat",
                      desc: "Get answers from real tax experts whenever you need them — not just during tax season.",
                      icon: (
                        <svg className="w-7 h-7 text-[#749220]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                        </svg>
                      ),
                    },
                    {
                      title: "Refund Accelerator",
                      desc: "Smart checks, faster filing, and proactive monitoring to help you get your refund sooner.",
                      icon: (
                        <svg className="w-7 h-7 text-[#749220]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                        </svg>
                      ),
                    },
                    {
                      title: "Global Compliance",
                      desc: "Stay compliant across borders with up-to-date guidance for U.S. and international tax rules.",
                      icon: (
                        <svg className="w-7 h-7 text-[#749220]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="10" />
                          <line x1="2" y1="12" x2="22" y2="12" />
                          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                        </svg>
                      ),
                    },
                  ].map((card, cIdx) => (
                    <div key={cIdx} className="rounded-[28px] bg-white border border-[#C3DCEB]/80 p-5 shadow-2xs text-left flex flex-col justify-between">
                      <div>
                        <div className="w-14 h-14 rounded-[20px] bg-[#F0F6FA] text-[#749220] flex items-center justify-center shadow-xs">
                          {card.icon}
                        </div>
                        <h4 className="text-base font-normal text-[#0A4973] tracking-tight mt-3">
                          {card.title}
                        </h4>
                        <p className="text-xs text-[#52525b] font-normal leading-relaxed mt-1.5">
                          {card.desc}
                        </p>
                      </div>
                      <div className="flex justify-end mt-3 pt-2">
                        <div className="w-8 h-8 rounded-full border border-[#749220]/40 bg-white text-[#749220] flex items-center justify-center shadow-2xs">
                          <ArrowRightIcon className="w-3.5 h-3.5" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>

          {/* Bottom Trust Strip */}
          {/* <div className="mt-14 sm:mt-18 pt-8 border-t border-[#F6F9EE]">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex lg:items-center lg:justify-between gap-y-6 gap-x-8 lg:gap-0 text-left">

              <div className="flex items-center gap-3 shrink-0 group">
                <span className="text-3xl sm:text-4xl lg:text-[38px] font-normal text-[#165479] tracking-tight leading-none">
                  97%
                </span>
                <span className="text-base sm:text-[17px] text-[#556480] font-normal tracking-tight">
                  Clients renew yearly
                </span>
              </div>


              <div className="hidden lg:block w-px h-8 bg-[#dcdaef]" />


              <div className="flex items-center gap-3.5 group">
                <div className="w-10 h-10 rounded-full bg-[#e2fcea] flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-105">
                  <svg className="w-4.5 h-4.5 text-[#1ba05b]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <span className="text-sm sm:text-base text-[#475569] font-normal tracking-tight">
                  Trusted by individuals & businesses
                </span>
              </div>


              <div className="hidden lg:block w-px h-8 bg-[#dcdaef]" />


              <div className="flex items-center gap-3.5 group">
                <div className="w-10 h-10 rounded-full bg-[#e2fcea] flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-105">
                  <svg className="w-4.5 h-4.5 text-[#1ba05b]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <span className="text-sm sm:text-base text-[#475569] font-normal tracking-tight">
                  Secure & confidential
                </span>
              </div>


              <div className="hidden lg:block w-px h-8 bg-[#dcdaef]" />

              <div className="flex items-center gap-3.5 group">
                <div className="w-10 h-10 rounded-full bg-[#e2fcea] flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-105">
                  <svg className="w-4.5 h-4.5 text-[#1ba05b]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <span className="text-sm sm:text-base text-[#475569] font-normal tracking-tight">
                  Backed by real tax experts
                </span>
              </div>

            </div>
          </div> */}


        </div>
      </section>

      {/* ========================================================= */}
      {/* 5. STATISTICS SECTION (CLEAN ANIMATED COUNTERS)           */}
      {/* ========================================================= */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight mb-2">
              Join Thousands of Happy Taxpayers
            </h2>
            <p className="text-sm text-gray-600">
              See why so many people trust us with their tax filing
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                number: "10,000+",
                label: "Tax Returns Filed Successfully",
                icon: "📄",
                subtext: "Join our satisfied clients",
              },
              {
                number: "98%",
                label: "Client Satisfaction Rate",
                icon: "⭐",
                subtext: "Rated 5 stars by thousands",
              },
              {
                number: "$1M+",
                label: "Tax Refunds Secured",
                icon: "💰",
                subtext: "Money back in your pocket",
              },
              {
                number: "5+",
                label: "Years of Expertise",
                icon: "🏆",
                subtext: "Trusted tax professionals",
              },
            ].map((stat, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 text-center border border-gray-200 hover:border-[#749220]/40 transition-all duration-200"
              >
                <div className="text-2xl mb-2">{stat.icon}</div>
                <div className="text-3xl font-semibold text-[#749220] mb-1 tracking-tight">
                  <AnimatedCounter
                    value={stat.number}
                    duration={2.2}
                    delay={0.2 + index * 0.1}
                  />
                </div>
                <div className="text-xs font-semibold text-gray-900 mb-0.5">
                  {stat.label}
                </div>
                <div className="text-[11px] text-gray-500">
                  {stat.subtext}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* 6. HOW IT WORKS (1, 2, 3, 4 PUMPKIN OUTLINED NUMBER CARDS)*/}
      {/* ========================================================= */}
      <section className="py-20 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center mb-14">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#749220]">Simple Process</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight mt-2 mb-3">
              File Your Taxes in <span className="text-[#749220]">4 Simple Steps</span>
            </h2>
            <p className="text-base text-gray-600 max-w-xl mx-auto">
              Our streamlined process makes tax filing quick, easy, and stress-free. Get started today!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: 1,
                title: "Upload Your Documents",
                description: "Simply upload your tax documents (W-2, 1099, Form 16) - takes less than 5 minutes!",
                time: "5 min",
              },
              {
                step: 2,
                title: "Our Experts Work Magic",
                description: "Certified tax professionals find every deduction and prepare your returns perfectly.",
                time: "24-48 hrs",
              },
              {
                step: 3,
                title: "Review & Get Your Refund",
                description: "Review your completed returns, approve, and see your maximum refund amount.",
                time: "10 min",
              },
              {
                step: 4,
                title: "We File & You Get Paid",
                description: "We e-file everything and you receive your refund faster. Track status anytime!",
                time: "Instant",
              },
            ].map((step, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 border border-gray-200 hover:border-[#749220]/50 hover:shadow-md transition-all duration-200 flex flex-col justify-between text-center relative"
              >
                <div>
                  {/* Outlined Number in PumpkinTax Style */}
                  <div className="text-5xl font-semibold text-[#749220]/85 mb-3 font-mono">
                    {step.step}
                  </div>

                  <h3 className="text-base font-semibold text-gray-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs text-gray-600 leading-relaxed mb-4">
                    {step.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                  <span>Duration</span>
                  <span className="font-semibold text-[#749220] bg-[#F6F9EE] px-2 py-0.5 rounded-full">
                    {step.time}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="text-center mt-12">
            <Link
              to="/login"
              className="px-8 py-3.5 rounded-full font-semibold text-sm bg-[#749220] text-white shadow hover:bg-[#749220]-700 transition-all inline-flex items-center gap-2"
            >
              <span>Start Filing Now</span>
              <ArrowRightIcon className="w-4 h-4" />
            </Link>
            <p className="text-xs text-gray-500 mt-2.5">
              ✓ No credit card required &nbsp;•&nbsp; ✓ Free consultation &nbsp;•&nbsp; ✓ 100% secure
            </p>
          </div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* 7. TESTIMONIALS SECTION (CLEAN CARDS)                     */}
      {/* ========================================================= */}
      <section className="py-20 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center mb-14">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#749220]">Client Reviews</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight mt-2 mb-3">
              Real Clients, Real Results - See What They Say
            </h2>
            <p className="text-base text-gray-600 max-w-xl mx-auto">
              Don't just take our word for it. See how we've helped thousands get bigger refunds and file with confidence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: "Priya Sharma",
                role: "US Individual Taxpayer",
                rating: 5,
                text: "I got $3,200 more refund than last year! They found deductions I never knew existed. Best tax service ever!",
                savings: "Saved $3,200",
              },
              {
                name: "David K.",
                role: "U.S. Expat Taxpayer",
                rating: 5,
                text: "Filing my U.S. taxes from abroad was so stressful before. Their CPA caught deductions for my Foreign Earned Income that saved me thousands!",
                savings: "Saved $4,150",
              },
              {
                name: "John Smith",
                role: "US Business Owner",
                rating: 5,
                text: "Saved $8,500 on business taxes! Their experts know every trick. I'll never file taxes myself again.",
                savings: "Saved $8,500",
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 border border-gray-200 hover:border-gray-300 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex text-amber-400">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <span key={i} className="text-sm">★</span>
                      ))}
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      {testimonial.savings}
                    </span>
                  </div>

                  <p className="text-sm text-gray-700 italic mb-6 leading-relaxed">
                    "{testimonial.text}"
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-gray-900 text-sm">
                      {testimonial.name}
                    </div>
                    <div className="text-xs text-gray-500">
                      {testimonial.role}
                    </div>
                  </div>
                  <span className="text-[11px] text-[#749220] font-semibold bg-[#F6F9EE] px-2.5 py-1 rounded-full">
                    Verified Filer
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* 8. FINAL ACTION BANNER                                    */}
      {/* ========================================================= */}
      <section className="py-16 sm:py-20 bg-gradient-to-r from-[#0A4973] via-[#165479] to-[#749220] text-white font-sans">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-normal mb-3 tracking-tight leading-snug">
            Ready to file your <span className="font-medium text-[#D8EBA4]">U.S. taxes?</span>
          </h2>
          <p className="text-sm sm:text-[15px] text-white/90 max-w-lg mx-auto mb-7 font-normal leading-relaxed">
            Certified CPA preparation, guaranteed maximum refunds, and 100% IRS accuracy for the 2025–2026 tax season.
          </p>
          <div className="flex flex-wrap sm:flex-nowrap gap-3.5 justify-center items-center">
            <Link
              to="/login"
              className="h-11 sm:h-12 px-6 rounded-xl bg-white text-[#165479] hover:bg-gray-50 font-medium text-sm sm:text-[15px] shadow-sm hover:shadow transition-all inline-flex items-center justify-center gap-2"
            >
              <span>Start Filing</span>
              <ArrowRightIcon className="w-4 h-4 stroke-[2]" />
            </Link>
            <button
              onClick={() => setIsModalOpen(true)}
              className="h-11 sm:h-12 px-6 rounded-xl bg-white/10 hover:bg-white/20 border border-white/25 text-white font-medium text-sm sm:text-[15px] transition-all inline-flex items-center justify-center gap-2 cursor-pointer"
            >
              <CalendarDaysIcon className="w-4 h-4 text-[#D8EBA4] stroke-[2]" />
              <span>Talk to CPA</span>
            </button>
          </div>
        </div>
      </section>

      {/* Lead Generation Modal */}
      <LeadModal open={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div >
  );
};

export default HeroSection;

