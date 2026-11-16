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
      icon: <DocumentTextIcon className="w-5 h-5 text-teal" />,
      subtext: "IRS-accepted federal & state returns",
    },
    {
      number: "98%",
      label: "Client Satisfaction Rate",
      icon: <SparklesIcon className="w-5 h-5 text-teal" />,
      subtext: "Rated 5 stars by thousands of filers",
    },
    {
      number: "$1M+",
      label: "Tax Refunds Secured",
      icon: <BanknotesIcon className="w-5 h-5 text-teal" />,
      subtext: "Eligible deductions uncovered",
    },
    {
      number: "5+",
      label: "Years of CPA Expertise",
      icon: <ShieldCheckIcon className="w-5 h-5 text-teal" />,
      subtext: "Licensed CPAs & Enrolled Agents",
    },
  ];

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-white  font-sans relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* 2-Column Composition: Left Commercial Photo with Floating Glass Pills + Right Stats Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">

          {/* Left Column: 3D Fintech Tax Refund & Analytics Visual with Floating Status Pills */}
          <div className="lg:col-span-5 relative flex justify-center order-2 lg:order-1">
            <div className="relative w-full max-w-[480px] group">
              {/* Image Frame */}
              <div className="relative rounded-3xl overflow-hidden border border-border shadow-[0_16px_40px_rgba(31,66,100,0.06)] bg-surface">
                <img
                  src={taxStatsVisual}
                  alt="IRS Tax Filer - Refund Analytics and Approved 1040 Dashboard"
                  className="w-full h-auto min-h-[340px] sm:min-h-[400px] lg:min-h-[440px] max-h-[490px] object-cover rounded-3xl transition-transform duration-500 group-hover:scale-[1.02]"
                  loading="lazy"
                />

                {/* Floating Glass Pill Top Left: Live IRS e-File Status */}
                <div className="absolute top-4 left-4 bg-surface/95 backdrop-blur-md rounded-2xl px-3.5 py-2.5 shadow-md border border-border flex items-center gap-2.5 z-20 select-none">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-teal"></span>
                  </span>
                  <div className="text-left">
                    <div className="text-xs font-semibold text-primary leading-tight">
                      100% CPA Verified
                    </div>
                    <div className="text-[10px] text-slateText font-normal">
                      IRS Authorized Direct e-File
                    </div>
                  </div>
                </div>

                {/* Floating Glass Pill Bottom Right: Real Refund Savings */}
                <div className="absolute bottom-4 right-4 bg-surface/95 backdrop-blur-md rounded-2xl p-3 sm:p-3.5 shadow-md border border-border flex items-center gap-3 z-20 select-none">
                  <div className="w-9 h-9 rounded-xl bg-background-aqua text-coral border border-border flex items-center justify-center font-bold text-sm shrink-0">
                    $
                  </div>
                  <div className="text-left">
                    <div className="text-xs sm:text-[13px] font-semibold text-primary leading-tight">
                      +$3,200 Avg. Savings
                    </div>
                    <div className="text-[10px] sm:text-[11px] text-teal font-medium">
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
            <div className="pill-badge mb-3.5">
              <span className="w-2 h-2 rounded-full bg-teal animate-pulse" />
              <span>Proven Track Record</span>
            </div>

            {/* Display Headline */}
            <h2 className="text-2xl sm:text-3xl lg:text-[36px] font-normal text-primary tracking-tight leading-[1.25]">
              Trusted by{" "}
              <span className="font-normal text-teal">
                Thousands of Taxpayers
              </span>
            </h2>

            <p className="text-sm sm:text-base text-slateText mt-3 font-normal leading-relaxed max-w-xl">
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
                  className="bg-surface rounded-2xl p-5 sm:p-5.5 border border-border shadow-xs hover:shadow-md hover:-translate-y-1 hover:border-teal/40 transition-all duration-300 text-left"
                >
                  <div className="text-2xl sm:text-3xl font-semibold text-primary mb-1 font-sans tabular-nums tracking-tight">
                    <AnimatedCounter
                      value={stat.number}
                      duration={2.2}
                      delay={0.15 + index * 0.08}
                    />
                  </div>

                  <div className="text-xs sm:text-[13.5px] font-semibold text-primary mb-1 leading-snug">
                    {stat.label}
                  </div>

                  <div className="text-[11px] text-slateText font-normal">
                    {stat.subtext}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Trust Checklist Footer */}
            <div className="mt-7 pt-5 border-t border-border flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-primary font-normal">
              <div className="flex items-center gap-2">
                <CheckBadgeIcon className="w-4 h-4 text-teal stroke-[2]" />
                <span>IRS Authorized e-File Transmitter</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircleIcon className="w-4 h-4 text-teal stroke-[2]" />
                <span>All 50 States Covered</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheckIcon className="w-4 h-4 text-teal stroke-[2]" />
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
