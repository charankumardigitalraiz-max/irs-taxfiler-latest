import React, { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  DocumentTextIcon,
  SparklesIcon,
  BanknotesIcon,
  ShieldCheckIcon,
  CheckCircleIcon,
  CheckBadgeIcon,
} from "@heroicons/react/24/outline";

import taxStatsVisual from "../../assets/tax-stats-fintech-analytics.jpg";

// Reusable Animated Counter Component
const AnimatedCounter = ({ value, duration = 2.2, delay = 0 }) => {
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

const StatsSection = () => {
  const stats = [
    {
      number: "10,000+",
      label: "Returns Filed Successfully",
      icon: <DocumentTextIcon className="w-5 h-5 text-[#749220]" />,
      subtext: "IRS-accepted federal & state returns",
    },
    {
      number: "98%",
      label: "Client Satisfaction Rate",
      icon: <SparklesIcon className="w-5 h-5 text-[#749220]" />,
      subtext: "Rated 5 stars by thousands of filers",
    },
    {
      number: "$1M+",
      label: "Tax Refunds Secured",
      icon: <BanknotesIcon className="w-5 h-5 text-[#749220]" />,
      subtext: "Eligible deductions uncovered",
    },
    {
      number: "5+",
      label: "Years of CPA Expertise",
      icon: <ShieldCheckIcon className="w-5 h-5 text-[#749220]" />,
      subtext: "Licensed CPAs & Enrolled Agents",
    },
  ];

  return (
    <section className="py-16 sm:py-20 lg:py-15 bg-white border-t border-slate-100 font-sans relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#165479]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* 2-Column Composition: Left Commercial Photo with Floating Glass Pills + Right Stats Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">

          {/* Left Column: 3D Fintech Tax Refund & Analytics Visual with Floating Status Pills */}
          <div className="lg:col-span-5 relative flex justify-center order-2 lg:order-1">
            <div className="relative w-full max-w-[480px] group">
              {/* Image Frame */}
              <div className="relative rounded-3xl overflow-hidden border border-slate-200/90 shadow-[0_16px_40px_rgba(22,84,121,0.08)] bg-white">
                <img
                  src={taxStatsVisual}
                  alt="IRS Tax Filer - Refund Analytics and Approved 1040 Dashboard"
                  className="w-full h-auto min-h-[340px] sm:min-h-[400px] lg:min-h-[440px] max-h-[490px] object-cover rounded-3xl transition-transform duration-500 group-hover:scale-[1.02]"
                  loading="lazy"
                />

                {/* Floating Glass Pill Top Left: Live IRS e-File Status */}
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md rounded-2xl px-3.5 py-2.5 shadow-md border border-gray-200/80 flex items-center gap-2.5 z-20 select-none">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                  </span>
                  <div className="text-left">
                    <div className="text-xs font-semibold text-gray-900 leading-tight">
                      100% CPA Verified
                    </div>
                    <div className="text-[10px] text-gray-500 font-normal">
                      IRS Authorized Direct e-File
                    </div>
                  </div>
                </div>

                {/* Floating Glass Pill Bottom Right: Real Refund Savings */}
                <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-md rounded-2xl p-3 sm:p-3.5 shadow-md border border-gray-200/80 flex items-center gap-3 z-20 select-none">
                  <div className="w-9 h-9 rounded-xl bg-[#F6F9EE] text-[#749220] border border-[#749220]/30 flex items-center justify-center font-bold text-sm shrink-0">
                    $
                  </div>
                  <div className="text-left">
                    <div className="text-xs sm:text-[13px] font-semibold text-gray-900 leading-tight">
                      +$3,200 Avg. Savings
                    </div>
                    <div className="text-[10px] sm:text-[11px] text-emerald-600 font-medium">
                      Overlooked deductions found
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Headings, 2x2 Stats Cards Grid & Trust Highlights */}
          <div className="lg:col-span-7 text-left font-sans order-1 lg:order-2">
            {/* Eyebrow Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F6F9EE] border border-[#749220]/30 shadow-2xs mb-3.5 text-xs font-medium text-[#749220] uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-[#749220] animate-pulse" />
              <span>Proven Track Record</span>
            </div>

            {/* Display Headline */}
            <h2 className="text-2xl sm:text-3xl lg:text-[36px] font-normal text-gray-900 tracking-tight leading-[1.25]">
              Trusted by{" "}
              <span className="font-medium bg-gradient-to-r from-[#0A4973] via-[#165479] to-[#749220] bg-clip-text text-transparent">
                Thousands of Taxpayers
              </span>
            </h2>

            <p className="text-sm sm:text-base text-gray-600 mt-3 font-normal leading-relaxed max-w-xl">
              Certified CPA guidance, guaranteed IRS accuracy, and maximum legal tax refunds for individuals, expats, and businesses nationwide.
            </p>

            {/* 2x2 Stats Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-4.5 mt-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: index * 0.08 }}
                  className="bg-white rounded-lg p-5 sm:p-5.5 border border-slate-200/90 shadow-[0_2px_12px_rgba(22,84,121,0.03)] hover:shadow-[0_16px_36px_rgba(22,84,121,0.08)] hover:-translate-y-1 hover:border-[#165479]/40 transition-all duration-300 text-left"
                >
                  <div className="flex items-center justify-between mb-3">
                    {/* <div className="w-10 h-10 rounded-xl bg-[#F6F9EE] border border-[#749220]/25 flex items-center justify-center shrink-0">
                      {stat.icon}
                    </div> */}
                    {/* <span className="text-[11px] font-medium text-emerald-600 bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      <span>Verified</span>
                    </span> */}
                  </div>

                  <div className="text-2xl sm:text-3xl font-medium text-[#165479] mb-1 font-sans tabular-nums tracking-tight">
                    <AnimatedCounter
                      value={stat.number}
                      duration={2.2}
                      delay={0.15 + index * 0.08}
                    />
                  </div>

                  <div className="text-xs sm:text-[13.5px] font-semibold text-gray-900 mb-1 leading-snug">
                    {stat.label}
                  </div>

                  <div className="text-[11px] text-gray-500 font-normal">
                    {stat.subtext}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Trust Checklist Footer */}
            <div className="mt-7 pt-5 border-t border-slate-100 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-gray-600 font-normal">
              <div className="flex items-center gap-2">
                <CheckBadgeIcon className="w-4 h-4 text-[#749220] stroke-[2]" />
                <span>IRS Authorized e-File Transmitter</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircleIcon className="w-4 h-4 text-[#749220] stroke-[2]" />
                <span>All 50 States Covered</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheckIcon className="w-4 h-4 text-[#749220] stroke-[2]" />
                <span>Included CPA Audit Defense</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default StatsSection;
