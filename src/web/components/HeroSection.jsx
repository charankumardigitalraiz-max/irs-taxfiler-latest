import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence, useInView } from "framer-motion";
import LeadModal from "../components/popup";
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
  const donutRadius = 55;
  const donutCircumference = 2 * Math.PI * donutRadius;
  const donutProgressValue = 0.82;
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
      id: "indian",
      label: "Indian & NRI",
      badge: "ITR 1-7 & Cross-Border",
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
          title: "S-Corporation Filing",
          description: "Complete business filing support for growing companies.",
          tag: "Form 1120-S",
          route: "/services/us-business/smb-tax-filing",
          icon: (
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          ),
          features: ["Business income", "CPA review"],
        },
        {
          title: "Partnership Return",
          description: "Simplify allocations, schedules, and partner reporting.",
          tag: "Form 1065",
          route: "/services/us-business/smb-tax-filing",
          icon: <UserGroupIcon className="w-5 h-5 text-white" />,
          features: ["K-1 support", "Multi-partner"],
        },
        {
          title: "Indian & NRI Tax Filing",
          description: "Cross-border guidance for India residents and NRIs.",
          tag: "ITR / NRI",
          route: "/services/indian/tax-filing",
          icon: <GlobeAltIcon className="w-5 h-5 text-white" />,
          features: ["India filing", "NRI support"],
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
    indian: {
      title: "Indian & NRI Cross-Border Tax Services",
      subtitle: "Seamless Income Tax Return (ITR) preparation for Non-Resident Indians and global professionals.",
      items: [
        {
          title: "Indian ITR Return Preparation",
          description: "Filing across all ITR forms (ITR-1 through ITR-7) for NRIs with salary, property, and capital gains in India.",
          tag: "ITR 1 to 7",
          route: "/services/indian/tax-filing",
          icon: <BanknotesIcon className="w-5 h-5" />,
          features: ["Capital gain indexation", "Rental property deduction", "E-verification assistance"],
        },
        {
          title: "Tax Notice & Assessment Defense",
          description: "Professional representation before the Income Tax Department (ITD) for notices, scrutiny assessments, and appeals.",
          tag: "ITD Defense",
          route: "/services/indian/representation",
          icon: <ShieldCheckIcon className="w-5 h-5" />,
          features: ["Section 148 / 143 notice reply", "Online dispute resolution", "Faceless assessment support"],
        },
        {
          title: "DTAA & Double Tax Relief",
          description: "Optimize tax treaties between US and India to avoid paying tax twice on overseas income and dividends.",
          tag: "Treaty Relief",
          route: "/services/indian/tax-filing",
          icon: <GlobeAltIcon className="w-5 h-5" />,
          features: ["Form 67 foreign tax credit", "Tax residency certificate (TRC)", "Withholding tax optimization"],
        },
        {
          title: "NRE / NRO Bank Account Taxation",
          description: "Tax compliance for interest earnings, repatriations (Form 15CA/15CB), and Indian mutual funds.",
          tag: "15CA / 15CB",
          route: "/services/indian/tax-filing",
          icon: <CheckCircleIcon className="w-5 h-5" />,
          features: ["NRE interest exemption", "NRO TDS refund claim", "Chartered Accountant certificate"],
        },
      ],
    },
  };

  const taxFilingBadges = [
    {
      title: "IRS Authorized e-File",
      tag: "Official Provider",
      icon: <ShieldCheckIcon className="w-5 h-5" />,
    },
    {
      title: "Form 1040 & 1040-NR",
      tag: "Resident & Non-Resident",
      icon: <DocumentTextIcon className="w-5 h-5" />,
    },
    {
      title: "FBAR & FATCA",
      tag: "FinCEN 114 & Form 8938",
      icon: <GlobeAltIcon className="w-5 h-5" />,
    },
    {
      title: "Indian ITR Filing",
      tag: "ITR 1 to 7 for NRIs",
      icon: <BanknotesIcon className="w-5 h-5" />,
    },
    {
      title: "ITIN Assistance",
      tag: "Form W-7 Certified",
      icon: <CheckBadgeIcon className="w-5 h-5" />,
    },
    {
      title: "W-2 & 1099 Returns",
      tag: "Salaried & Contractors",
      icon: <DocumentTextIcon className="w-5 h-5" />,
    },
    {
      title: "US Business Tax",
      tag: "1120, 1120-S & 1065",
      icon: <BanknotesIcon className="w-5 h-5" />,
    },
    {
      title: "IRS Representation",
      tag: "Audit Defense & CPA Support",
      icon: <UserGroupIcon className="w-5 h-5" />,
    },
    {
      title: "Dual Status Returns",
      tag: "Expat Tax Specialists",
      icon: <ClockIcon className="w-5 h-5" />,
    },
    {
      title: "State & Local (SALT)",
      tag: "Multi-State Filings",
      icon: <CheckCircleIcon className="w-5 h-5" />,
    },
    {
      title: "Foreign Tax Credit",
      tag: "Form 1116 & 2555 FEIE",
      icon: <SparklesIcon className="w-5 h-5" />,
    },
    {
      title: "100% Accuracy Guarantee",
      tag: "Max Refund Promise",
      icon: <CheckBadgeIcon className="w-5 h-5" />,
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

        {/* Ambient Studio Lighting Mesh */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[520px] bg-gradient-to-b from-purple-100/40 via-indigo-50/20 to-transparent pointer-events-none blur-3xl -z-10" />
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:24px_24px] opacity-35 pointer-events-none -z-10" />

        <div className="relative max-w-7xl 2xl:max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 xl:gap-10 items-center">

            {/* Left Content Column */}
            <div className="lg:col-span-5 xl:col-span-5 lg:pr-2 xl:pr-4 font-sans text-left">



              {/* Main Heading - Bold Modern Typography with Gradient Accent */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                style={{ lineHeight: 1.22 }}
                className="text-3xl sm:text-4xl md:text-4xl lg:text-[38px] xl:text-[44px] 2xl:text-[48px] font-normal text-gray-900 tracking-tight mb-4 sm:mb-5 lg:mb-6"
              >
                Tax filing, <br className="hidden sm:inline" />
                <span className="bg-gradient-to-r from-primary via-purple-700 to-indigo-600 bg-clip-text text-transparent">
                  simplified & optimized
                </span>{" "}
                <br className="hidden sm:inline" />
                for the world.
              </motion.h1>

              {/* Subheading */}
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="text-sm sm:text-base lg:text-lg text-gray-600 font-normal leading-relaxed mb-6 sm:mb-7 max-w-xl"
              >
                Prepare, file, and optimize your federal, state, and cross-border taxes with certified CPA guidance. Enjoy maximum refunds, guaranteed IRS accuracy, and seamless filing from anywhere in the world.
              </motion.p>

              {/* CTA Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex flex-wrap items-center gap-3 sm:gap-4 mb-6 sm:mb-7"
              >
                <Link
                  to="/login"
                  className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 sm:px-7 sm:py-3.5 rounded-full bg-primary text-white font-normal text-xs sm:text-sm shadow-[0_8px_20px_rgba(76,38,145,0.25)] hover:bg-primary-700 hover:shadow-[0_12px_28px_rgba(76,38,145,0.35)] hover:-translate-y-0.5 transition-all group"
                >
                  <span>Start for free</span>
                  <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </Link>

                <button
                  onClick={() => setIsModalOpen(true)}
                  className="inline-flex items-center justify-center gap-2.5 sm:gap-3 px-5 py-3 sm:px-6 sm:py-3.5 rounded-full bg-white text-gray-800 border border-gray-200/90 font-normal text-xs sm:text-sm shadow-xs hover:bg-gray-50 hover:border-gray-300 hover:text-primary transition-all group"
                >
                  <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[10px] sm:text-xs pl-0.5 group-hover:bg-primary group-hover:text-white transition-all">
                    ▶
                  </div>
                  <span>See how it works</span>
                </button>
              </motion.div>

              {/* Live Social Proof Avatar Stack */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.23 }}
                className="flex items-center gap-3 mb-6 pb-2 border-b border-gray-100"
              >
                <div className="flex -space-x-2 overflow-hidden shrink-0">
                  <span className="inline-flex h-7 w-7 rounded-full ring-2 ring-white bg-purple-100 text-purple-700 text-[10px] font-normal items-center justify-center">AK</span>
                  <span className="inline-flex h-7 w-7 rounded-full ring-2 ring-white bg-blue-100 text-blue-700 text-[10px] font-bold items-center justify-center">SR</span>
                  <span className="inline-flex h-7 w-7 rounded-full ring-2 ring-white bg-emerald-100 text-emerald-700 text-[10px] font-normal items-center justify-center">MD</span>
                  <span className="inline-flex h-7 w-7 rounded-full ring-2 ring-white bg-amber-100 text-amber-700 text-[10px] font-normal items-center justify-center">JP</span>
                </div>
                <div className="text-left">
                  <div className="flex items-center gap-1 text-amber-400 text-xs leading-none">
                    <span>★★★★★</span>
                    <span className="text-gray-900 font-normal ml-1 text-xs">4.9/5</span>
                  </div>
                  <p className="text-[11px] text-gray-500 font-normal mt-0.5">Trusted by 10,000+ taxpayers across 50+ countries</p>
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
                  <SparklesIcon className="w-4 h-4 text-primary" />
                  <span className="font-semibold text-gray-800 text-xs">Maximum Refund Promise</span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-50/90 border border-gray-200/80 shadow-2xs">
                  <ShieldCheckIcon className="w-4 h-4 text-purple-700" />
                  <span className="font-semibold text-gray-800 text-xs">Licensed CPA Review</span>
                </div>
              </motion.div> */}
            </div>

            {/* Right Visual Presentation - Interactive Floating Glass Badges */}
            <motion.div
              className="lg:col-span-7 xl:col-span-7 relative flex justify-center lg:justify-end items-center"
            >
              <div className="relative w-full max-w-[380px] sm:max-w-[480px] md:max-w-[540px] lg:max-w-[640px] xl:max-w-[700px] 2xl:max-w-[760px] mx-auto lg:mr-0 flex justify-center lg:justify-end">
                {/* Ambient Soft Radial Backdrop Glow */}
                <div className="absolute inset-0 bg-gradient-to-tr from-purple-200/40 via-primary-100/20 to-indigo-100/30 rounded-full blur-3xl pointer-events-none transform scale-95" />

                {/* Floating Micro-Card 1: Top-Left Refund Maximizer */}
                {/* <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                  className="hidden sm:flex absolute -top-3 left-2 lg:-left-4 bg-white/95 backdrop-blur-md rounded-2xl p-3 sm:p-3.5 shadow-[0_16px_36px_rgba(76,38,145,0.12)] border border-purple-100/90 z-20 items-center gap-3 select-none"
                >
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center shrink-0 text-lg">
                    💰
                  </div>
                  <div className="text-left">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Avg. Tax Refund</div>
                    <div className="text-base font-extrabold text-gray-900 leading-tight">+$3,850</div>
                    <div className="text-[10px] font-semibold text-emerald-600 flex items-center gap-0.5">
                      <span>▲</span> 100% CPA Optimized
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="hidden sm:flex absolute -bottom-3 right-4 lg:-right-2 bg-white/95 backdrop-blur-md rounded-2xl p-3 sm:p-3.5 shadow-[0_16px_36px_rgba(76,38,145,0.12)] border border-purple-100/90 z-20 items-center gap-3 select-none"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary-50 text-primary border border-primary-200/70 flex items-center justify-center shrink-0">
                    <ShieldCheckIcon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="text-left">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-gray-400">IRS Compliance</div>
                    <div className="text-xs sm:text-sm font-extrabold text-gray-900 leading-tight">Zero-Error Filing</div>
                    <div className="text-[10px] font-medium text-purple-700">Audit Defense Included</div>
                  </div>
                </motion.div> */}

                {/* 3D Global Tax Illustration with Country Cards */}
                <motion.div
                  className="relative z-10 flex justify-center lg:justify-end w-full"
                >
                  <img
                    src={globalTaxHeroImg}
                    alt="Global Tax Preparation, IRS Advisory and Country Filing"
                    className="w-full h-auto max-h-[320px] sm:max-h-[400px] md:max-h-[460px] lg:max-h-[min(68vh,590px)] xl:max-h-[min(74vh,660px)] 2xl:max-h-[720px] object-contain select-none drop-shadow-sm"
                    loading="eager"
                  />
                </motion.div>
              </div>
            </motion.div>

          </div>

          {/* ========================================================= */}
          {/* Tax Filing Specialties & Compliance Ticker                */}
          {/* ========================================================= */}
          <div className="mt-4 sm:mt-4 lg:mt-4 pt-6 w-full font-sans">
            <div className="text-center mb-4 sm:mb-5 flex items-center justify-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              <span className="text-[11px] sm:text-xs font-semibold tracking-wider text-primary uppercase">
                IRS Authorized Tax Preparation & Expat Compliance Specialties
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            </div>

            {/* Scrolling Track with Subtle Edge Fades */}
            <div className="relative w-full overflow-hidden py-1">
              <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-white via-white/90 to-transparent z-10" />
              <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-white via-white/90 to-transparent z-10" />

              <div className="animate-marquee flex items-center gap-4 sm:gap-5 select-none">

                {taxFilingBadges.map((badge, i) => (
                  <div
                    key={`tax-badge-1-${i}`}
                    className="flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-white border border-gray-200/80 shadow-xs hover:border-primary hover:shadow-md hover:bg-purple-50/20 transition-all duration-200 shrink-0 group cursor-default"
                  >
                    <div className="w-9 h-9 rounded-xl bg-primary-50 text-primary border border-primary-200 flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
                      {badge.icon}
                    </div>
                    <div className="text-left">
                      <div className="text-xs sm:text-sm font-semibold text-gray-900 group-hover:text-primary transition-colors whitespace-nowrap">
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
                    className="flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-white border border-gray-200/80 shadow-xs hover:border-primary hover:shadow-md hover:bg-purple-50/20 transition-all duration-200 shrink-0 group cursor-default"
                  >
                    <div className="w-9 h-9 rounded-xl bg-primary-50 text-primary border border-primary-200 flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
                      {badge.icon}
                    </div>
                    <div className="text-left">
                      <div className="text-xs sm:text-sm font-semibold text-gray-900 group-hover:text-primary transition-colors whitespace-nowrap">
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
      {/* 2. LIVE PLATFORMS SECTION (CLEAN RIBBON)                  */}
      {/* ========================================================= */}
      {/* <section className="py-8 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-5">
            <div className="text-center md:text-left">
              <span className="text-xs font-semibold uppercase tracking-wider text-primary">Flexible Access</span>
              <h3 className="text-base md:text-lg font-semibold text-gray-900">We are now live for Tax filing on</h3>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4">

              <div
                onClick={() => navigate("/login")}
                className="cursor-pointer flex items-center gap-3 px-5 py-2.5 rounded-full border border-gray-200 hover:border-primary hover:bg-purple-50/50 transition-all duration-200"
              >
                <div className="w-7 h-7 rounded-full bg-primary text-white flex items-center justify-center">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                </div>
                <span className="text-xs font-semibold text-gray-800">Web Portal</span>
              </div>

      
              <div
                onClick={() => window.open("https://wa.me/919052333667?text=Hi", "_blank")}
                className="cursor-pointer flex items-center gap-3 px-5 py-2.5 rounded-full border border-gray-200 hover:border-emerald-500 hover:bg-emerald-50/50 transition-all duration-200"
              >
                <div className="w-7 h-7 rounded-full bg-[#25D366] text-white flex items-center justify-center">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                </div>
                <span className="text-xs font-semibold text-gray-800">WhatsApp</span>
              </div>

          
              <div
                onClick={() => window.open("https://irstaxfilerworkspace.slack.com/", "_blank")}
                className="cursor-pointer flex items-center gap-3 px-5 py-2.5 rounded-full border border-gray-200 hover:border-pink-500 hover:bg-pink-50/50 transition-all duration-200"
              >
                <div className="w-7 h-7 rounded-full bg-white border border-gray-200 flex items-center justify-center">
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none">
                    <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52z" fill="#E01E5A" />
                    <path d="M6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313z" fill="#E01E5A" />
                    <path d="M8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834z" fill="#36C5F0" />
                    <path d="M8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312z" fill="#36C5F0" />
                    <path d="M18.956 5.042a2.528 2.528 0 0 1 2.522-2.52A2.528 2.528 0 0 1 24 5.042a2.528 2.528 0 0 1-2.522 2.52h-2.522V5.042z" fill="#2EB67D" />
                    <path d="M17.688 5.042a2.528 2.528 0 0 1-2.523 2.52 2.527 2.527 0 0 1-2.52-2.52V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v2.52z" fill="#2EB67D" />
                    <path d="M15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52z" fill="#ECB22E" />
                    <path d="M15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z" fill="#ECB22E" />
                  </svg>
                </div>
                <span className="text-xs font-semibold text-gray-800">Slack</span>
              </div>

            </div>
          </div>
        </div>
      {/* ========================================================= */}
      {/* 3. TAX FILING SUITE - COMPACT SINGLE-VIEW DECK            */}
      {/* ========================================================= */}
      <section className="relative py-8 sm:py-10 lg:py-11 bg-white border-y border-gray-100 font-sans overflow-hidden">

        {/* Ambient Decorative SVG Circles with Soft Lavender Tinted Fills & Rings */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Subtle Ambient Underlying Tint */}
          <div className="absolute top-1/4 -left-20 w-[450px] h-[450px] rounded-full bg-purple-100/40 blur-3xl" />
          <div className="absolute top-1/3 -right-20 w-[450px] h-[450px] rounded-full bg-purple-100/40 blur-3xl" />

          {/* Left Decorative SVG Circles Layer - Top-Left & Mid-Left */}
          <svg
            className="absolute -top-10 -left-20 w-[380px] sm:w-[440px] h-[680px] overflow-visible"
            fill="none"
            viewBox="0 0 440 680"
          >
            <defs>
              {/* Top-Left Soft Lavender Radial Gradient Fill */}
              <radialGradient id="leftTopDisc" cx="45%" cy="45%" r="55%">
                <stop offset="0%" stopColor="#e4d5f7" stopOpacity="0.9" />
                <stop offset="60%" stopColor="#ede5fa" stopOpacity="0.75" />
                <stop offset="100%" stopColor="#f5effd" stopOpacity="0.3" />
              </radialGradient>
              {/* Mid-Left Soft Lavender Radial Gradient Fill */}
              <radialGradient id="leftMidDisc" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#dfcbf5" stopOpacity="0.95" />
                <stop offset="65%" stopColor="#eae0f8" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#f6f0fd" stopOpacity="0.3" />
              </radialGradient>
            </defs>

            {/* Top-Left Circle (Borderless Filled Disc) */}
            <circle cx="160" cy="160" r="185" fill="url(#leftTopDisc)" />

            {/* Mid-Left Floating Circle (Borderless Filled Disc) */}
            <circle cx="75" cy="480" r="90" fill="url(#leftMidDisc)" />
          </svg>

          {/* Right Decorative SVG Circles Layer - Top-Right, Mid-Right & Bottom-Right */}
          <svg
            className="absolute -top-10 -right-24 w-[420px] sm:w-[480px] h-[740px] overflow-visible"
            fill="none"
            viewBox="0 0 480 740"
          >
            <defs>
              {/* Top-Right Soft Lavender Radial Gradient Fill */}
              <radialGradient id="rightTopDisc" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#e4d5f7" stopOpacity="0.9" />
                <stop offset="65%" stopColor="#ede5fa" stopOpacity="0.75" />
                <stop offset="100%" stopColor="#f5effd" stopOpacity="0" />
              </radialGradient>
              {/* Mid-Right Soft Lavender Radial Gradient Fill */}
              <radialGradient id="rightMidDisc" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#dfcbf5" stopOpacity="0.95" />
                <stop offset="65%" stopColor="#eae0f8" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#f6f0fd" stopOpacity="0" />
              </radialGradient>
              {/* Bottom-Right Soft Lavender Radial Gradient Fill */}
              <radialGradient id="rightBottomDisc" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#e5d6f8" stopOpacity="0.9" />
                <stop offset="65%" stopColor="#ede5fa" stopOpacity="0.75" />
                <stop offset="100%" stopColor="#f6f0fd" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Top-Right Large Circle (Borderless) */}
            <circle cx="340" cy="130" r="175" fill="url(#rightTopDisc)" />

            {/* Mid-Right Large Circle (Borderless) */}
            <circle cx="380" cy="380" r="165" fill="url(#rightMidDisc)" />

            {/* Bottom-Right Circle (Beside CPA Spotlight Card, Borderless) */}
            <circle cx="330" cy="630" r="115" fill="url(#rightBottomDisc)" />
          </svg>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Section Header - Compact */}
          <div className="text-center max-w-2xl mx-auto mb-4 sm:mb-5">
            {/* Top Eyebrow Tag with Green Dot */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-gray-200/80 shadow-xs mb-2 text-[12px] font-normal text-gray-700">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10b981]" />
              <span>Tax Filing & Advisory Suite</span>
            </div>

            <h2 className="text-2xl sm:text-[28px] lg:text-[32px] font-normal text-gray-900 tracking-tight leading-snug">
              Explore Our{" "}
              <span className="bg-gradient-to-r from-primary via-purple-700 to-indigo-600 bg-clip-text text-transparent">
                Filing Services
              </span>
            </h2>

            <p className="text-xs sm:text-sm text-[#64748b] mt-1 font-normal">
              Everything you need to file confidently, wherever you live.
            </p>

            {/* Segmented Category Pill Switcher */}
            <div className="mt-3.5 flex justify-center">
              <div className="inline-flex items-center p-1 bg-[#f1f3f7] rounded-full border border-gray-200/70 shadow-xs gap-1">
                {serviceCategories.map((cat, cIdx) => {
                  const isActive = selectedService === cat.id;
                  const count = services[cat.id]?.items.length || 0;
                  return (
                    <div key={cat.id} className="flex items-center">
                      <button
                        type="button"
                        onClick={() => setSelectedService(cat.id)}
                        className={`flex items-center gap-1.5 py-1.5 px-4 sm:px-5 rounded-full text-xs font-normal transition-all duration-200 cursor-pointer whitespace-nowrap ${isActive
                          ? "bg-white text-[#5629B2] shadow-xs border border-purple-100/80"
                          : "text-[#475569] hover:text-gray-900"
                          }`}
                      >
                        <div className={`w-3.5 h-3.5 shrink-0 ${isActive ? "text-[#5629B2]" : "text-[#475569]"}`}>
                          {cat.icon}
                        </div>
                        <span>{cat.label}</span>
                        <span className={isActive ? "text-[#5629B2] font-normal ml-0.5" : "text-[#64748b] font-normal ml-0.5"}>
                          ({count})
                        </span>
                      </button>
                      {cIdx === 1 && (
                        <div className="w-[1px] h-3 bg-gray-300 mx-1 hidden sm:block" />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* 3-Column Studio Cards Grid - Compact Studio Proportions */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-4.5 mt-5">
            {services[selectedService]?.items.map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-4 sm:p-5 border border-[#f0f0f4] shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_20px_rgba(86,41,178,0.06)] hover:border-[#e9e2fc] transition-all duration-300 group flex flex-col justify-between text-left"
              >
                <div>
                  {/* Top Row: Violet Squircle Icon + Tag */}
                  <div className="flex items-center justify-between mb-2.5">
                    <div className="w-10 h-10 rounded-xl bg-[#5629B2] text-white flex items-center justify-center shrink-0 shadow-xs">
                      {item.icon}
                    </div>
                    {item.tag && (
                      <span className="text-[11px] font-normal text-[#5629B2] bg-[#f3effe] px-2.5 py-0.5 rounded-full tracking-wide">
                        {item.tag}
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="text-sm sm:text-base font-medium text-gray-900 mb-1 group-hover:text-[#5629B2] transition-colors leading-snug line-clamp-1">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-[#64748b] leading-relaxed font-normal mb-3 line-clamp-2">
                    {item.description}
                  </p>

                  {/* Feature Tags / Chips */}
                  {item.features && item.features.length > 0 && (
                    <div className="flex flex-wrap items-center gap-1.5 mb-3.5">
                      {item.features.slice(0, 2).map((feat, fIdx) => (
                        <span
                          key={fIdx}
                          className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#ecfdf3] text-[11px] font-normal text-gray-700"
                        >
                          <span className="w-3 h-3 rounded-full bg-[#10b981] text-white flex items-center justify-center text-[8px] shrink-0">
                            ✓
                          </span>
                          <span className="truncate max-w-[130px]">{feat}</span>
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Bottom Action Link */}
                <div className="pt-1 border-t border-gray-50 flex items-center justify-between">
                  <Link
                    to={item.route || "/login"}
                    className="inline-flex items-center gap-1 text-xs font-normal text-[#5629B2] hover:text-[#48209e] group-hover:translate-x-0.5 transition-all"
                  >
                    <span>File Return</span>
                    <ArrowRightIcon className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}

            {/* 6th Slot: CPA Spotlight Card - Compact */}
            <div className="bg-[#f4f0fd] rounded-2xl p-4 sm:p-5 border border-[#ede6fa] relative overflow-hidden flex flex-col justify-between shadow-[0_2px_12px_rgba(0,0,0,0.03)] text-left">
              {/* Top-Right Decorative Curve Overlay */}
              <div className="absolute top-0 right-0 w-28 h-28 bg-[#e8e0fc]/70 rounded-bl-[80px] pointer-events-none" />

              <div>
                {/* Top Squircle with Shield */}
                <div className="w-10 h-10 rounded-xl bg-[#5629B2] text-white flex items-center justify-center shrink-0 shadow-xs mb-2.5">
                  <ShieldCheckIcon className="w-5 h-5 text-white" />
                </div>

                <h3 className="text-sm sm:text-base font-normal text-gray-900 mb-1">
                  CPA Spotlight
                </h3>

                <p className="text-xs text-[#64748b] leading-relaxed font-normal mb-3 line-clamp-2">
                  Get expert guidance before you file.
                </p>
              </div>

              <div>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(true)}
                  className="w-full py-2 px-3 rounded-lg bg-[#5629B2] hover:bg-[#48209e] text-white font-normal text-xs shadow-xs hover:shadow-sm transition-all flex items-center justify-center cursor-pointer"
                >
                  <span>Free CPA Consultation</span>
                </button>

                <div className="flex items-center gap-1.5 text-[11px] font-normal text-gray-600 mt-2.5">
                  <span className="w-3 h-3 rounded-full bg-[#10b981] text-white flex items-center justify-center text-[8px] shrink-0">
                    ✓
                  </span>
                  <span>Verified tax experts</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Trust Guarantee Ribbon - Ultra Compact */}
          <div className="mt-5 py-2 px-4 sm:px-6 rounded-full bg-white border border-gray-200/80 shadow-2xs flex flex-wrap items-center justify-center gap-2 text-xs text-center max-w-xl mx-auto">
            <div className="flex items-center gap-1.5 text-gray-900 font-normal">
              <span className="w-3.5 h-3.5 rounded-full bg-[#10b981] text-white flex items-center justify-center text-[9px] shrink-0">
                ✓
              </span>
              <span>100% accuracy guarantee</span>
            </div>
            <span className="text-gray-300 hidden sm:inline">|</span>
            <span className="text-[#64748b] font-normal">
              Secure, compliant, and reviewed by tax professionals.
            </span>
          </div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* 4. WHY CHOOSE OUR TAX TEAM (UNIQUE CONNECTED ARCHITECTURE)*/}
      {/* ========================================================= */}
      <section className="relative py-12 sm:py-16 lg:py-10 bg-white font-sans overflow-hidden">
        {/* Ambient Subtle Lavender Aura */}
        <div className="absolute top-1/3 right-10 w-[550px] h-[550px] rounded-full bg-gradient-to-tr from-purple-100/40 via-purple-50/20 to-transparent blur-3xl pointer-events-none" />

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
              <h2 className="text-4xl sm:text-5xl lg:text-[52px] xl:text-[56px] font-normal text-gray-900 tracking-tight leading-[1.18] space-y-1 sm:space-y-2">
                <span className="block whitespace-nowrap">Why Thousands</span>
                <span className="block whitespace-nowrap bg-gradient-to-r from-[#5b21b6] via-[#7c3aed] to-[#6366f1] bg-clip-text text-transparent">
                  Choose Our
                </span>
                <span className="block whitespace-nowrap bg-gradient-to-r from-[#5b21b6] via-[#7c3aed] to-[#6366f1] bg-clip-text text-transparent">
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
                  <path d="M 45 340 L 45 170 Q 45 155 60 155 L 80 155" stroke="#c084fc" strokeWidth="1.5" strokeDasharray="4 4" strokeOpacity="0.85" />
                  <circle cx="80" cy="155" r="10" fill="#ede5fa" fillOpacity="0.85" />
                  <circle cx="80" cy="155" r="4.5" fill="#7c3aed" />

                  {/* Dashed line from Card 1 top edge up and right to Card 2 */}
                  <path d="M 380 30 L 380 10 Q 380 0 400 0 L 520 0" stroke="#c084fc" strokeWidth="1.5" strokeDasharray="4 4" strokeOpacity="0.85" />
                  <circle cx="520" cy="0" r="10" fill="#ede5fa" fillOpacity="0.85" />
                  <circle cx="520" cy="0" r="4.5" fill="#7c3aed" />

                  {/* Dashed line from Card 1 right edge curving down to Card 4 */}
                  <path d="M 490 260 L 530 260 Q 555 260 555 285 L 555 315 L 590 315" stroke="#c084fc" strokeWidth="1.5" strokeDasharray="4 4" strokeOpacity="0.85" />
                  <circle cx="490" cy="260" r="10" fill="#ede5fa" fillOpacity="0.85" />
                  <circle cx="490" cy="260" r="4.5" fill="#7c3aed" />
                  <circle cx="555" cy="315" r="10" fill="#ede5fa" fillOpacity="0.85" />
                  <circle cx="555" cy="315" r="4.5" fill="#7c3aed" />
                </svg>

                {/* 1. Centerpiece Hero Card: AI + CPA Accuracy */}
                <div className="absolute top-7 left-20 z-30 w-[410px] rounded-[36px] bg-gradient-to-b from-[#fbfaff] via-[#f7f3fe] to-[#f2ecfc] border border-[#e4d7f8] p-7 shadow-[0_20px_50px_rgba(124,58,237,0.08)] text-left hover:shadow-[0_24px_56px_rgba(124,58,237,0.12)] transition-all">
                  <div className="flex items-center justify-between">
                    {/* Big White Squircle with Purple Brain Icon */}
                    <div className="w-18 h-18 rounded-[24px] bg-white border border-purple-100/80 shadow-xs flex items-center justify-center">
                      <svg className="w-10 h-10 text-[#7c3aed]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
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
                    <span className="text-xs font-normal text-[#6d28d9] bg-[#ede6fa] px-4 py-1.5 rounded-full border border-purple-200/50 shadow-2xs">
                      Our Core Advantage
                    </span>
                  </div>

                  <h3 className="text-2xl font-normal text-[#1e1b4b] tracking-tight mt-6">
                    AI + CPA Accuracy
                  </h3>
                  <p className="text-xs sm:text-sm text-[#52525b] font-normal leading-relaxed mt-2.5">
                    Advanced AI meets licensed CPAs to deliver greater accuracy, fewer errors, and bigger opportunities for your refund.
                  </p>

                  {/* Bottom Rounded Pill */}
                  <div className="mt-6 px-4 py-2.5 rounded-full bg-white/95 border border-purple-100 shadow-2xs inline-flex items-center gap-2.5 text-xs text-[#3f3f46] font-normal">
                    <span className="w-4 h-4 rounded-md bg-[#10b981] text-white flex items-center justify-center text-[10px] shrink-0">
                      ✓
                    </span>
                    <span>Human expertise. AI speed. Better results.</span>
                  </div>
                </div>

                {/* 2. Top-Right Card: Anytime Expert Chat */}
                <div className="absolute top-0 right-14 z-20 w-[260px] rounded-[32px] bg-white border border-purple-100/90 p-6 shadow-[0_16px_36px_rgba(0,0,0,0.03)] text-left hover:shadow-[0_20px_42px_rgba(0,0,0,0.05)] transition-all">
                  <div className="w-16 h-16 rounded-[22px] bg-[#f0eaff] text-[#7c3aed] flex items-center justify-center shadow-xs">
                    <svg className="w-8 h-8 text-[#7c3aed]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                    </svg>
                  </div>
                  <h4 className="text-lg font-normal text-[#1e1b4b] tracking-tight mt-4">
                    Anytime Expert Chat
                  </h4>
                  <p className="text-xs text-[#52525b] font-normal leading-relaxed mt-2">
                    Get answers from real tax experts whenever you need them — not just during tax season.
                  </p>
                  <div className="flex justify-end mt-4">
                    <div className="w-10 h-10 rounded-full border border-purple-200/90 bg-white text-[#7c3aed] flex items-center justify-center hover:bg-purple-50 transition-colors shadow-2xs cursor-pointer">
                      <ArrowRightIcon className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                {/* 3. Bottom-Left Card: Refund Accelerator */}
                <div className="absolute bottom-2 left-0 z-20 w-[270px] rounded-[32px] bg-white border border-purple-100/90 p-6 shadow-[0_16px_36px_rgba(0,0,0,0.04)] text-left hover:shadow-[0_20px_42px_rgba(0,0,0,0.06)] transition-all">
                  <div className="w-16 h-16 rounded-[22px] bg-[#f0eaff] text-[#7c3aed] flex items-center justify-center shadow-xs">
                    <svg className="w-8 h-8 text-[#7c3aed]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                    </svg>
                  </div>
                  <h4 className="text-lg font-normal text-[#1e1b4b] tracking-tight mt-4">
                    Refund Accelerator
                  </h4>
                  <p className="text-xs text-[#52525b] font-normal leading-relaxed mt-2">
                    Smart checks, faster filing, and proactive monitoring to help you get your refund sooner.
                  </p>
                  <div className="flex justify-end mt-4">
                    <div className="w-10 h-10 rounded-full border border-purple-200/90 bg-white text-[#7c3aed] flex items-center justify-center hover:bg-purple-50 transition-colors shadow-2xs cursor-pointer">
                      <ArrowRightIcon className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                {/* 4. Bottom-Right Card: Global Compliance (Cleanly Positioned Below Card 2) */}
                <div className="absolute bottom-2 right-0 z-20 w-[240px] h-[330px] rounded-[32px] bg-white border border-purple-100/90 p-6 shadow-[0_16px_36px_rgba(0,0,0,0.03)] text-left flex flex-col justify-between hover:shadow-[0_20px_42px_rgba(0,0,0,0.05)] transition-all">
                  <div>
                    <div className="w-16 h-16 rounded-[22px] bg-[#f0eaff] text-[#7c3aed] flex items-center justify-center shadow-xs">
                      <svg className="w-8 h-8 text-[#7c3aed]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" />
                        <line x1="2" y1="12" x2="22" y2="12" />
                        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                      </svg>
                    </div>
                    <h4 className="text-lg font-normal text-[#1e1b4b] tracking-tight mt-4">
                      Global Compliance
                    </h4>
                    <p className="text-xs text-[#52525b] font-normal leading-relaxed mt-2">
                      Stay compliant across borders with up-to-date guidance for U.S. and international tax rules.
                    </p>
                  </div>
                  <div className="flex justify-end mt-auto pt-2">
                    <div className="w-10 h-10 rounded-full border border-purple-200/90 bg-white text-[#7c3aed] flex items-center justify-center hover:bg-purple-50 transition-colors shadow-2xs cursor-pointer">
                      <ArrowRightIcon className="w-4 h-4" />
                    </div>
                  </div>
                </div>

              </div>

              {/* Mobile / Tablet Responsive Fallback Layout */}
              <div className="block lg:hidden space-y-4">
                {/* Centerpiece Full Width */}
                <div className="rounded-[28px] bg-gradient-to-b from-[#fbfaff] via-[#f7f3fe] to-[#f2ecfc] border border-[#e4d7f8] p-6 shadow-sm text-left">
                  <div className="flex items-center justify-between">
                    <div className="w-16 h-16 rounded-[22px] bg-white border border-purple-100 shadow-xs flex items-center justify-center">
                      <svg className="w-8 h-8 text-[#7c3aed]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
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
                    <span className="text-xs font-normal text-[#6d28d9] bg-[#ede6fa] px-3.5 py-1.5 rounded-full border border-purple-200/50">
                      Our Core Advantage
                    </span>
                  </div>
                  <h3 className="text-xl font-normal text-[#1e1b4b] tracking-tight mt-4">
                    AI + CPA Accuracy
                  </h3>
                  <p className="text-xs sm:text-sm text-[#52525b] font-normal leading-relaxed mt-2">
                    Advanced AI meets licensed CPAs to deliver greater accuracy, fewer errors, and bigger opportunities for your refund.
                  </p>
                  <div className="mt-4 inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-white border border-purple-100 shadow-2xs text-xs text-[#3f3f46] font-normal">
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
                        <svg className="w-7 h-7 text-[#7c3aed]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                        </svg>
                      ),
                    },
                    {
                      title: "Refund Accelerator",
                      desc: "Smart checks, faster filing, and proactive monitoring to help you get your refund sooner.",
                      icon: (
                        <svg className="w-7 h-7 text-[#7c3aed]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                        </svg>
                      ),
                    },
                    {
                      title: "Global Compliance",
                      desc: "Stay compliant across borders with up-to-date guidance for U.S. and international tax rules.",
                      icon: (
                        <svg className="w-7 h-7 text-[#7c3aed]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="10" />
                          <line x1="2" y1="12" x2="22" y2="12" />
                          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                        </svg>
                      ),
                    },
                  ].map((card, cIdx) => (
                    <div key={cIdx} className="rounded-[28px] bg-white border border-purple-100/90 p-5 shadow-2xs text-left flex flex-col justify-between">
                      <div>
                        <div className="w-14 h-14 rounded-[20px] bg-[#f0eaff] text-[#7c3aed] flex items-center justify-center shadow-xs">
                          {card.icon}
                        </div>
                        <h4 className="text-base font-normal text-[#1e1b4b] tracking-tight mt-3">
                          {card.title}
                        </h4>
                        <p className="text-xs text-[#52525b] font-normal leading-relaxed mt-1.5">
                          {card.desc}
                        </p>
                      </div>
                      <div className="flex justify-end mt-3 pt-2">
                        <div className="w-8 h-8 rounded-full border border-purple-200/90 bg-white text-[#7c3aed] flex items-center justify-center shadow-2xs">
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
          <div className="mt-14 sm:mt-18 pt-8 border-t border-[#ede8fc]">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex lg:items-center lg:justify-between gap-y-6 gap-x-8 lg:gap-0 text-left">

              <div className="flex items-center gap-3 shrink-0 group">
                <span className="text-3xl sm:text-4xl lg:text-[38px] font-normal text-[#5629B2] tracking-tight leading-none">
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
          </div>


        </div>
      </section>

      {/* ========================================================= */}
      {/* 5. STATISTICS SECTION (CLEAN ANIMATED COUNTERS)           */}
      {/* ========================================================= */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 tracking-tight mb-2">
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
                className="bg-white rounded-2xl p-6 text-center border border-gray-200 hover:border-primary/40 transition-all duration-200"
              >
                <div className="text-2xl mb-2">{stat.icon}</div>
                <div className="text-3xl font-semibold text-primary mb-1 tracking-tight">
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
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">Simple Process</span>
            <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 tracking-tight mt-2 mb-3">
              File Your Taxes in <span className="text-primary">4 Simple Steps</span>
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
                className="bg-white rounded-2xl p-6 border border-gray-200 hover:border-primary/50 hover:shadow-md transition-all duration-200 flex flex-col justify-between text-center relative"
              >
                <div>
                  {/* Outlined Number in PumpkinTax Style */}
                  <div className="text-5xl font-semibold text-primary/85 mb-3 font-mono">
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
                  <span className="font-semibold text-primary bg-purple-50 px-2 py-0.5 rounded-full">
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
              className="px-8 py-3.5 rounded-full font-semibold text-sm bg-primary text-white shadow hover:bg-primary-700 transition-all inline-flex items-center gap-2"
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
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">Client Reviews</span>
            <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 tracking-tight mt-2 mb-3">
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
                name: "Raj Patel",
                role: "Indian ITR Filer",
                rating: 5,
                text: "Filing ITR was so stressful before. Now it takes 10 minutes and I get maximum refunds. Worth every rupee!",
                savings: "Maximum Refund",
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
                  <span className="text-[11px] text-primary font-semibold bg-purple-50 px-2.5 py-1 rounded-full">
                    Verified Filer
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* 8. SERVICES SHOWCASE GRID                                 */}
      {/* ========================================================= */}
      <section className="py-20 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center mb-14">
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">Comprehensive Solutions</span>
            <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 tracking-tight mt-2 mb-3">
              Get Expert Tax Filing <span className="text-primary">for Every Situation</span>
            </h2>
            <p className="text-base text-gray-600 max-w-xl mx-auto">
              No matter your tax situation, we have the expertise to maximize your refund and ensure accurate filing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "U.S. Federal, State & Local Tax Filing",
                description: "Complete federal and state tax return preparation and filing for all income types including W-2, 1099, investment income, and more.",
                services: [
                  "Form 1040 preparation",
                  "All schedules and forms",
                  "E-filing with IRS",
                  "Tax optimization strategies",
                ],
                cta: "File US Taxes Now",
                link: "/services/us-individual/federal-state-local",
                icon: DocumentTextIcon,
              },
              {
                title: "Indian Tax Filing (ITR)",
                description: "Expert handling of Indian Income Tax Returns (ITR) for NRIs, residents, and dual citizens with U.S. income.",
                services: [
                  "ITR preparation & filing",
                  "NRI tax compliance",
                  "Tax treaty benefits",
                  "Double taxation relief",
                ],
                cta: "File ITR Now",
                link: "/services/indian/tax-filing",
                icon: GlobeAltIcon,
              },
              {
                title: "FBAR & FATCA Filing",
                description: "Foreign Bank Account Report (FBAR) and FATCA compliance filing services for U.S. persons with foreign accounts.",
                services: [
                  "FBAR (FinCEN Form 114)",
                  "FATCA Form 8938",
                  "Account aggregation",
                  "Compliance review",
                ],
                cta: "Get Compliance Help",
                link: "/services/us-individual/fbar-fatca",
                icon: BanknotesIcon,
              },
            ].map((service, index) => {
              const ServiceIcon = service.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-7 border border-gray-200 hover:border-primary/50 hover:shadow-md transition-all duration-200 flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-purple-50 text-primary flex items-center justify-center mb-5">
                      <ServiceIcon className="w-6 h-6" />
                    </div>

                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {service.title}
                    </h3>
                    <p className="text-xs text-gray-600 mb-5 leading-relaxed">
                      {service.description}
                    </p>

                    <ul className="space-y-2 mb-6">
                      {service.services.map((item, i) => (
                        <li key={i} className="flex items-center text-xs text-gray-700">
                          <CheckCircleIcon className="w-4 h-4 text-primary mr-2 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link
                    to={service.link}
                    className="w-full inline-flex items-center justify-center px-4 py-2.5 rounded-full bg-primary text-white font-semibold text-xs shadow hover:bg-primary-700 transition-all gap-1.5"
                  >
                    <span>{service.cta}</span>
                    <ArrowRightIcon className="w-3.5 h-3.5" />
                  </Link>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* 9. WHO WE CAN HELP SECTION                                */}
      {/* ========================================================= */}
      <section className="py-20 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-12 items-center">

            {/* Left Column: Profiles */}
            <div className="lg:col-span-7">
              <span className="text-xs font-semibold uppercase tracking-wider text-primary">Trusted Across Profiles</span>
              <h2 className="text-3xl lg:text-4xl font-semibold text-gray-900 tracking-tight mt-2 mb-3">
                Who We Can Help
              </h2>
              <p className="text-base text-gray-600 mb-8 max-w-xl">
                Whether you are filing for the first time or managing multi-country income, our tax experts pair smart automation with dedicated CPAs to fit every situation.
              </p>

              <div className="space-y-3.5">
                {[
                  {
                    title: "First-time & Salaried Filers",
                    description: "Guided onboarding, digital document collection, and guaranteed accuracy for simple to moderate tax cases.",
                    coverage: 94,
                    badge: "Digital + CPA review",
                  },
                  {
                    title: "Self-employed & Freelancers",
                    description: "1099, gig work, and multi-client income filing with deduction discovery and quarterly tax planning.",
                    coverage: 89,
                    badge: "Max deductions",
                  },
                  {
                    title: "High-net-worth individuals",
                    description: "Layered strategies for stock compensation, RSUs/ESPP, multi-state income, and global reporting.",
                    coverage: 82,
                    badge: "Advisor-led",
                  },
                  {
                    title: "Expats, NRIs & cross-border filers",
                    description: "US & India filing, FBAR/FATCA, DTAA benefits, and compliance for multi-country incomes.",
                    coverage: 88,
                    badge: "Global compliance",
                  },
                ].map((segment, index) => (
                  <div
                    key={segment.title}
                    className="rounded-2xl border border-gray-200 bg-white p-4.5 shadow-xs"
                  >
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div>
                        <h3 className="text-sm font-semibold text-gray-900 mb-0.5">
                          {segment.title}
                        </h3>
                        <p className="text-xs text-gray-500">
                          {segment.description}
                        </p>
                      </div>
                      <span className="text-xs font-semibold text-primary bg-purple-50 px-2 py-0.5 rounded-md whitespace-nowrap">
                        {segment.coverage}% fit
                      </span>
                    </div>

                    <div className="h-1.5 rounded-full bg-gray-100 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-primary"
                        style={{ width: `${segment.coverage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* 4 Mini Stat Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
                {[
                  { value: "96%", label: "Client satisfaction" },
                  { value: "4.9/5", label: "Average rating" },
                  { value: "18k+", label: "Returns filed annually" },
                  { value: "27", label: "Countries supported" },
                ].map((stat, index) => (
                  <div key={index} className="bg-purple-50/50 rounded-xl p-3 border border-purple-100 text-center">
                    <div className="text-[11px] text-gray-500 mb-0.5">{stat.label}</div>
                    <div className="text-base font-semibold text-primary">{stat.value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Clean Snapshot Card */}
            <div className="lg:col-span-5">
              <div className="rounded-3xl p-7 shadow-xl bg-primary text-white">
                <div className="space-y-6">

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-purple-200 text-xs uppercase tracking-wider font-semibold">
                        Platform Insights
                      </p>
                      <h4 className="text-xl font-semibold text-white mt-0.5">
                        Client Mix Snapshot
                      </h4>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-white/10 text-white text-xs font-semibold">
                      24/7 Experts
                    </span>
                  </div>

                  {/* Donut Chart & Breakdown */}
                  <div className="flex flex-col sm:flex-row items-center gap-6">
                    <div className="relative flex items-center justify-center flex-shrink-0">
                      <svg width="140" height="140" viewBox="0 0 140 140" className="-rotate-90">
                        <circle
                          cx="70"
                          cy="70"
                          r={donutRadius}
                          fill="transparent"
                          stroke="rgba(255,255,255,0.15)"
                          strokeWidth="12"
                        />
                        <circle
                          cx="70"
                          cy="70"
                          r={donutRadius}
                          fill="transparent"
                          stroke="#FCD34D"
                          strokeWidth="12"
                          strokeLinecap="round"
                          strokeDasharray={donutCircumference}
                          strokeDashoffset={donutCircumference * (1 - donutProgressValue)}
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center flex-col text-center">
                        <span className="text-2xl font-semibold text-white">82%</span>
                        <span className="text-purple-200 text-[10px]">Engaged CPAs</span>
                      </div>
                    </div>

                    <div className="space-y-3 flex-1 w-full text-xs">
                      {[
                        { label: "US Individual Filers", value: "41%", color: "#FCD34D" },
                        { label: "Business & Entity Filers", value: "32%", color: "#A5B4FC" },
                        { label: "NRIs & Expats", value: "27%", color: "#FBCFE8" },
                      ].map((item) => (
                        <div key={item.label}>
                          <div className="flex items-center justify-between mb-1 text-purple-100">
                            <span className="flex items-center gap-1.5">
                              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                              {item.label}
                            </span>
                            <span className="font-semibold text-white">{item.value}</span>
                          </div>
                          <div className="h-1 rounded-full bg-white/10 overflow-hidden">
                            <div
                              className="h-full rounded-full"
                              style={{ width: item.value, backgroundColor: item.color }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Highlights */}
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="rounded-xl bg-white/10 p-3">
                      <div className="font-semibold text-amber-300 mb-0.5">Priority Support</div>
                      <div className="text-[11px] text-purple-100/80">Under 15 min response time</div>
                    </div>
                    <div className="rounded-xl bg-white/10 p-3">
                      <div className="font-semibold text-purple-200 mb-0.5">Audit Shield</div>
                      <div className="text-[11px] text-purple-100/80">IRS & ITD representation</div>
                    </div>
                  </div>

                  {/* Schedule Call Button */}
                  <div className="pt-3 border-t border-white/15 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-semibold text-white">10,000+ Clients</p>
                      <p className="text-[10px] text-purple-200">Mobile + desktop</p>
                    </div>
                    <button
                      onClick={() => setIsModalOpen(true)}
                      className="px-5 py-2.5 rounded-full bg-white text-primary font-semibold text-xs shadow hover:bg-purple-50 transition-colors"
                    >
                      Schedule a Call
                    </button>
                  </div>

                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 10. CLEAN CTA BANNER (LIKE PUMPKINTAX FINAL CALL)        */}
      {/* ========================================================= */}
      <section className="py-16 bg-primary text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold mb-3 tracking-tight">
            Ready to Get Your Maximum Tax Refund?
          </h2>
          <p className="text-sm sm:text-base text-purple-100/90 max-w-xl mx-auto mb-6">
            Stop leaving money on the table! Our experts will maximize your refund and file your taxes accurately.
          </p>
          <div className="flex flex-col sm:flex-row gap-3.5 justify-center">
            <Link
              to="/login"
              className="px-8 py-3.5 rounded-full font-semibold text-sm bg-white text-primary hover:bg-purple-50 shadow transition-all inline-flex items-center justify-center gap-2"
            >
              <span>Start Filing Now - Get Maximum Refund</span>
              <ArrowRightIcon className="w-4 h-4" />
            </Link>
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-8 py-3.5 rounded-full font-semibold text-sm bg-transparent border border-white text-white hover:bg-white/10 transition-all inline-flex items-center justify-center"
            >
              <span>Schedule a Call</span>
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

