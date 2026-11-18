import React, { useState, useRef, useLayoutEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

const WhyChooseSection = ({ onOpenModal }) => {
  const containerRef = useRef(null);
  const [scale, setScale] = useState(1);

  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const updateScale = () => {
      const width = el.clientWidth || el.offsetWidth;
      if (width > 0) {
        // Authored design canvas is 860px wide by 590px high
        const widthScale = width / 860;
        // Check viewport height so cards stay in view on shorter screens/laptops
        const vh = window.innerHeight || 800;
        const heightScale = vh >= 580 ? (vh - 150) / 590 : 1;
        // Dynamically fit both width and height, capped at 1.0 (native size)
        const fitScale = Math.min(1, widthScale, Math.max(0.65, heightScale));
        setScale(Math.max(0.6, fitScale));
      }
    };

    updateScale();

    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const width = entry.contentRect.width;
        if (width > 0) {
          updateScale();
        }
      }
    });

    ro.observe(el);
    window.addEventListener("resize", updateScale);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", updateScale);
    };
  }, []);

  return (
    <section id="why-choose" className="relative py-10 sm:py-12 lg:py-14 bg-white font-sans overflow-hidden">
      <div className="relative z-10 max-w-7xl 2xl:max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-8 xl:gap-12">

          {/* Left Column: Heading & Subtitle */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full lg:w-[340px] xl:w-[400px] 2xl:w-[440px] shrink-0 text-left"
          >
            {/* Eyebrow Pill Badge */}
            <div className="pill-badge mb-4">
              <span className="w-2 h-2 rounded-full bg-teal animate-pulse" />
              <span>The IRS Tax Filer Advantage</span>
            </div>

            {/* Display Headline */}
            <h2 className="text-3xl sm:text-4xl lg:text-[36px] xl:text-[42px] font-normal text-primary tracking-tight leading-[1.2]">
              Why Thousands{" "}
              <span className="font-medium text-teal block mt-1">
                Choose Our Tax Team
              </span>
            </h2>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-700 font-normal leading-relaxed max-w-md mt-4">
              A smarter way to file, plan, and keep more of what you earn — with certified CPA experts and powerful technology on your side.
            </p>

            {/* Trust Bullet Items */}
            <div className="mt-8 space-y-3.5 pt-6 border-t border-border">
              <div className="flex items-center gap-3 font-[500] text-xs sm:text-sm text-primary">
                <span className="w-5 h-5 rounded-full bg-background-aqua text-teal border border-border flex items-center justify-center font-bold text-xs shrink-0">✓</span>
                <span>Licensed CPAs & Enrolled Agents in all 50 states</span>
              </div>
              <div className="flex items-center font-[500] gap-3 text-xs sm:text-sm text-primary">
                <span className="w-5 h-5 rounded-full bg-background-aqua text-teal border border-border flex items-center justify-center font-bold text-xs shrink-0">✓</span>
                <span>Bank-level 256-bit encryption & IRS security compliance</span>
              </div>
              <div className="flex items-center gap-3 font-[500] text-xs sm:text-sm text-primary">
                <span className="w-5 h-5 rounded-full bg-background-aqua text-teal border border-border flex items-center justify-center font-bold text-xs shrink-0">✓</span>
                <span>100% Accuracy Guarantee with comprehensive audit defense</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Connected Flow Composition */}
          <div ref={containerRef} className="w-full lg:flex-1 max-w-[860px] relative">

            {/* Desktop Connected Layout - Dynamically & Responsively Scaled */}
            <div
              className="hidden lg:block relative w-full overflow-visible transition-[height] duration-150"
              style={{ height: `${590 * scale}px` }}
            >
              <div
                style={{
                  width: 860,
                  height: 590,
                  transform: `translateX(-50%) scale(${scale})`,
                  transformOrigin: "top center",
                }}
                className="absolute top-0 left-1/2"
              >

                {/* SVG Connecting Dashed Paths Layer */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" viewBox="0 0 860 590" fill="none">
                  {/* Dashed line from Card 3 up to Card 1 left edge */}
                  <path d="M 45 340 L 45 170 Q 45 155 60 155 L 80 155" stroke="#127EAB" strokeWidth="1.5" strokeDasharray="4 4" strokeOpacity="0.85" />
                  <circle cx="80" cy="155" r="10" fill="#E9F7FA" fillOpacity="0.85" />
                  <circle cx="80" cy="155" r="4.5" fill="#EE6450" />

                  {/* Dashed line from Card 1 top edge up and right to Card 2 */}
                  <path d="M 380 30 L 380 10 Q 380 0 400 0 L 520 0" stroke="#127EAB" strokeWidth="1.5" strokeDasharray="4 4" strokeOpacity="0.85" />
                  <circle cx="520" cy="0" r="10" fill="#E9F7FA" fillOpacity="0.85" />
                  <circle cx="520" cy="0" r="4.5" fill="#EE6450" />

                  {/* Dashed line from Card 1 right edge curving down to Card 4 */}
                  <path d="M 490 260 L 530 260 Q 555 260 555 285 L 555 315 L 590 315" stroke="#127EAB" strokeWidth="1.5" strokeDasharray="4 4" strokeOpacity="0.85" />
                  <circle cx="490" cy="260" r="10" fill="#E9F7FA" fillOpacity="0.85" />
                  <circle cx="490" cy="260" r="4.5" fill="#EE6450" />
                  <circle cx="555" cy="315" r="10" fill="#E9F7FA" fillOpacity="0.85" />
                  <circle cx="555" cy="315" r="4.5" fill="#EE6450" />
                </svg>

                {/* 1. Centerpiece Hero Card: AI + CPA Accuracy */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  whileHover={{ y: -4 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="absolute top-7 left-20 z-30 w-[410px] rounded-[36px] bg-surface border border-border p-7 shadow-[0_20px_50px_rgba(31,66,100,0.06)] text-left hover:shadow-[0_24px_56px_rgba(18,126,171,0.12)] hover:border-teal/40 transition-all duration-300"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-18 h-18 rounded-[24px] bg-background-aqua border border-border shadow-xs flex items-center justify-center">
                      <svg className="w-10 h-10 text-teal" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
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
                    <span className="pill-badge-accent">
                      Our Core Advantage
                    </span>
                  </div>

                  <h3 className="text-2xl font-semibold text-primary tracking-tight mt-6">
                    Certified CPA Filing
                  </h3>
                  <p className="text-sm sm:text-[15px] text-slate-700 font-normal leading-relaxed mt-2.5">
                    Every return is prepared and reviewed by a licensed CPA — not software alone. We ensure accuracy, compliance, and maximum refund on every filing.
                  </p>

                  <div className="mt-6 px-4 py-2.5 rounded-full bg-background-aqua border border-border shadow-2xs inline-flex items-center gap-2.5 text-xs text-primary font-medium">
                    <span className="w-4 h-4 rounded-md bg-teal text-white flex items-center justify-center text-[10px] shrink-0">
                      ✓
                    </span>
                    <span>Licensed CPA on every return. No exceptions.</span>
                  </div>
                </motion.div>

                {/* 2. Top-Right Card: Anytime Expert Chat */}
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -4 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  onClick={() => onOpenModal && onOpenModal()}
                  className="absolute top-0 right-14 z-20 w-[260px] rounded-[32px] bg-surface border border-border p-6 shadow-xs text-left hover:shadow-md hover:border-teal/40 transition-all duration-300 cursor-pointer group"
                >
                  <div className="w-16 h-16 rounded-[22px] bg-background-aqua text-teal flex items-center justify-center shadow-xs group-hover:bg-primary group-hover:text-white transition-colors">
                    <svg className="w-8 h-8 text-current" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                    </svg>
                  </div>
                  <h4 className="text-lg font-semibold text-primary tracking-tight mt-4">
                    Dedicated CPA Support
                  </h4>
                  <p className="text-[13px] sm:text-sm text-slate-700 font-normal leading-relaxed mt-2">
                    Reach your assigned CPA directly — by email or phone — for guidance before, during, and after filing.
                  </p>
                  <div className="flex justify-end mt-4">
                    <div className="w-10 h-10 rounded-full border border-border bg-background text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all shadow-2xs">
                      <ArrowRightIcon className="w-4 h-4 stroke-[2]" />
                    </div>
                  </div>
                </motion.div>

                {/* 3. Bottom-Left Card: Refund Accelerator */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -4 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  onClick={() => onOpenModal && onOpenModal()}
                  className="absolute bottom-2 left-0 z-20 w-[270px] rounded-[32px] bg-surface border border-border p-6 shadow-xs text-left hover:shadow-md hover:border-teal/40 transition-all duration-300 cursor-pointer group"
                >
                  <div className="w-16 h-16 rounded-[22px] bg-background-aqua text-teal flex items-center justify-center shadow-xs group-hover:bg-primary group-hover:text-white transition-colors">
                    <svg className="w-8 h-8 text-current" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                    </svg>
                  </div>
                  <h4 className="text-lg font-semibold text-primary tracking-tight mt-4">
                    Maximum Deductions
                  </h4>
                  <p className="text-[13px] sm:text-sm text-slate-700 font-normal leading-relaxed mt-2">
                    Our CPAs review every eligible deduction and credit — foreign income, business expenses, FEIE, ITIN, and more — so you keep more of what you earn.
                  </p>
                  <div className="flex justify-end mt-4">
                    <div className="w-10 h-10 rounded-full border border-border bg-background text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all shadow-2xs">
                      <ArrowRightIcon className="w-4 h-4 stroke-[2]" />
                    </div>
                  </div>
                </motion.div>

                {/* 4. Bottom-Right Card: Global Compliance */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  whileHover={{ y: -4 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.35 }}
                  onClick={() => onOpenModal && onOpenModal()}
                  className="absolute bottom-2 right-0 z-20 w-[240px] h-[330px] rounded-[32px] bg-surface border border-border p-6 shadow-xs text-left flex flex-col justify-between hover:shadow-md hover:border-teal/40 transition-all duration-300 cursor-pointer group"
                >
                  <div>
                    <div className="w-16 h-16 rounded-[22px] bg-background-aqua text-teal flex items-center justify-center shadow-xs group-hover:bg-primary group-hover:text-white transition-colors">
                      <svg className="w-8 h-8 text-current" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" />
                        <line x1="2" y1="12" x2="22" y2="12" />
                        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                      </svg>
                    </div>
                    <h4 className="text-lg font-semibold text-primary tracking-tight mt-4">
                      US & India Tax Filing
                    </h4>
                    <p className="text-[13px] sm:text-sm text-slate-700 font-normal leading-relaxed mt-2">
                      Specialists in dual-country filing for NRIs and expats — IRS federal returns, Indian ITR, FBAR, and treaty benefits handled together.
                    </p>
                  </div>
                  <div className="flex justify-end mt-auto pt-2">
                    <div className="w-10 h-10 rounded-full border border-border bg-background text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all shadow-2xs">
                      <ArrowRightIcon className="w-4 h-4 stroke-[2]" />
                    </div>
                  </div>
                </motion.div>

              </div>
            </div>

            {/* Mobile / Tablet Responsive Horizontal Scroll Carousel */}
            <div className="block lg:hidden">
              <div className="flex items-stretch gap-3.5 overflow-x-auto snap-x snap-mandatory pb-3 -mx-4 px-4 sm:mx-0 sm:px-0 thin-scrollbar touch-pan-x">
                {/* Card 1: Certified CPA Filing */}
                <div className="w-[82vw] max-w-[310px] sm:w-[300px] shrink-0 snap-start rounded-[24px] bg-surface border border-border p-5 shadow-xs text-left flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <div className="w-14 h-14 rounded-[18px] bg-background-aqua border border-border shadow-xs flex items-center justify-center shrink-0">
                        <svg className="w-7 h-7 text-teal" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
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
                      <span className="pill-badge-accent text-[11px]">
                        Core Advantage
                      </span>
                    </div>
                    <h3 className="text-[17px] font-semibold text-primary tracking-tight mt-3.5">
                      Certified CPA Filing
                    </h3>
                    <p className="text-[13px] text-slate-700 font-medium leading-relaxed mt-1.5">
                      Every return is prepared and reviewed by a licensed CPA — not software alone. We ensure accuracy, compliance, and maximum refund.
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-border/60 inline-flex items-center gap-2 text-[11.5px] text-primary font-medium">
                    <span className="w-4 h-4 rounded-md bg-teal text-white flex items-center justify-center text-[10px] shrink-0">
                      ✓
                    </span>
                    <span>Licensed CPA on every return.</span>
                  </div>
                </div>

                {/* Cards 2–4 */}
                {[
                  {
                    title: "Dedicated CPA Support",
                    desc: "Reach your assigned CPA directly — by email or phone — for guidance before, during, and after filing.",
                    icon: (
                      <svg className="w-7 h-7 text-teal" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                      </svg>
                    ),
                  },
                  {
                    title: "Maximum Deductions",
                    desc: "Our CPAs review every eligible deduction and credit — foreign income, business expenses, FEIE, ITIN, and more — so you keep more.",
                    icon: (
                      <svg className="w-7 h-7 text-teal" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                      </svg>
                    ),
                  },
                  {
                    title: "US & India Tax Filing",
                    desc: "Specialists in dual-country filing for NRIs and expats — IRS federal returns, Indian ITR, FBAR, and treaty benefits handled together.",
                    icon: (
                      <svg className="w-7 h-7 text-teal" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" />
                        <line x1="2" y1="12" x2="22" y2="12" />
                        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                      </svg>
                    ),
                  },
                ].map((card, cIdx) => (
                  <div
                    key={cIdx}
                    onClick={() => onOpenModal && onOpenModal()}
                    className="w-[82vw] max-w-[310px] sm:w-[300px] shrink-0 snap-start rounded-[24px] bg-surface border border-border p-5 shadow-xs text-left flex flex-col justify-between cursor-pointer hover:shadow-md hover:border-teal/50 transition-all"
                  >
                    <div>
                      <div className="w-14 h-14 rounded-[18px] bg-background-aqua text-teal flex items-center justify-center shadow-xs">
                        {card.icon}
                      </div>
                      <h4 className="text-[17px] font-semibold text-primary tracking-tight mt-3.5">
                        {card.title}
                      </h4>
                      <p className="text-[13px] text-slate-700 font-medium leading-relaxed mt-1.5">
                        {card.desc}
                      </p>
                    </div>
                    <div className="flex justify-end mt-4 pt-3 border-t border-border/60">
                      <div className="w-8 h-8 rounded-full border border-border bg-background text-primary flex items-center justify-center shadow-2xs">
                        <ArrowRightIcon className="w-3.5 h-3.5 stroke-[2]" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default WhyChooseSection;


