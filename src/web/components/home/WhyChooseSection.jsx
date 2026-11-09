import React from "react";
import { motion } from "framer-motion";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

const WhyChooseSection = ({ onOpenModal }) => {
  return (
    <section className="relative py-14 sm:py-20 lg:py-24 bg-white font-sans overflow-hidden border-t border-slate-100">
      {/* Ambient Subtle Aura */}
      <div className="absolute top-1/3 right-10 w-[550px] h-[550px] rounded-full bg-gradient-to-tr from-[#165479]/10 via-[#749220]/5 to-transparent blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-8">

          {/* Left Column: Heading & Subtitle */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full lg:w-[420px] xl:w-[460px] shrink-0 text-left"
          >
            {/* Eyebrow Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F6F9EE] border border-[#749220]/30 shadow-2xs mb-4 text-xs font-medium text-[#749220] uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-[#749220] animate-pulse" />
              <span>The IRS Tax Filer Advantage</span>
            </div>

            {/* Display Headline */}
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-normal text-gray-900 tracking-tight leading-[1.2]">
              Why Thousands{" "}
              <span className="font-medium bg-gradient-to-r from-[#0A4973] via-[#165479] to-[#749220] bg-clip-text text-transparent block mt-1">
                Choose Our Tax Team
              </span>
            </h2>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-gray-600 font-normal leading-[28px] max-w-sm mt-4">
              A smarter way to file, plan, and keep more of what you earn — with certified CPA experts and powerful technology on your side.
            </p>

            {/* Trust Bullet Items */}
            <div className="mt-8 space-y-3.5 pt-6 border-t border-slate-100">
              <div className="flex items-center gap-3 text-sm text-gray-700">
                <span className="w-5 h-5 rounded-full bg-[#F6F9EE] text-[#749220] flex items-center justify-center font-bold text-xs shrink-0">✓</span>
                <span>Licensed CPAs & Enrolled Agents in all 50 states</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-700">
                <span className="w-5 h-5 rounded-full bg-[#F6F9EE] text-[#749220] flex items-center justify-center font-bold text-xs shrink-0">✓</span>
                <span>Bank-level 256-bit encryption & IRS security compliance</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-700">
                <span className="w-5 h-5 rounded-full bg-[#F6F9EE] text-[#749220] flex items-center justify-center font-bold text-xs shrink-0">✓</span>
                <span>100% Accuracy Guarantee with comprehensive audit defense</span>
              </div>
            </div>
          </motion.div>

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
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="absolute top-7 left-20 z-30 w-[410px] rounded-[36px] bg-gradient-to-b from-[#FFFFFF] via-[#F6F9EE] to-[#F6F9EE] border border-[#DCE6BC] p-7 shadow-[0_20px_50px_rgba(22,84,121,0.08)] text-left hover:shadow-[0_24px_56px_rgba(116,146,32,0.14)] hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex items-center justify-between">
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

                <div className="mt-6 px-4 py-2.5 rounded-full bg-white/95 border border-[#C3DCEB] shadow-2xs inline-flex items-center gap-2.5 text-xs text-[#3f3f46] font-normal">
                  <span className="w-4 h-4 rounded-md bg-[#10b981] text-white flex items-center justify-center text-[10px] shrink-0">
                    ✓
                  </span>
                  <span>Human expertise. AI speed. Better results.</span>
                </div>
              </motion.div>

              {/* 2. Top-Right Card: Anytime Expert Chat */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                onClick={() => onOpenModal && onOpenModal()}
                className="absolute top-0 right-14 z-20 w-[260px] rounded-[32px] bg-white border border-[#C3DCEB]/80 p-6 shadow-[0_16px_36px_rgba(0,0,0,0.03)] text-left hover:shadow-[0_20px_42px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 cursor-pointer group"
              >
                <div className="w-16 h-16 rounded-[22px] bg-[#F0F6FA] text-[#749220] flex items-center justify-center shadow-xs group-hover:bg-[#F6F9EE] transition-colors">
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
                  <div className="w-10 h-10 rounded-full border border-[#749220]/40 bg-white text-[#749220] flex items-center justify-center group-hover:bg-[#749220] group-hover:text-white transition-all shadow-2xs">
                    <ArrowRightIcon className="w-4 h-4 stroke-[2]" />
                  </div>
                </div>
              </motion.div>

              {/* 3. Bottom-Left Card: Refund Accelerator */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                onClick={() => onOpenModal && onOpenModal()}
                className="absolute bottom-2 left-0 z-20 w-[270px] rounded-[32px] bg-white border border-[#C3DCEB]/80 p-6 shadow-[0_16px_36px_rgba(0,0,0,0.04)] text-left hover:shadow-[0_20px_42px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 cursor-pointer group"
              >
                <div className="w-16 h-16 rounded-[22px] bg-[#F0F6FA] text-[#749220] flex items-center justify-center shadow-xs group-hover:bg-[#F6F9EE] transition-colors">
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
                  <div className="w-10 h-10 rounded-full border border-[#749220]/40 bg-white text-[#749220] flex items-center justify-center group-hover:bg-[#749220] group-hover:text-white transition-all shadow-2xs">
                    <ArrowRightIcon className="w-4 h-4 stroke-[2]" />
                  </div>
                </div>
              </motion.div>

              {/* 4. Bottom-Right Card: Global Compliance */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.35 }}
                onClick={() => onOpenModal && onOpenModal()}
                className="absolute bottom-2 right-0 z-20 w-[240px] h-[330px] rounded-[32px] bg-white border border-[#C3DCEB]/80 p-6 shadow-[0_16px_36px_rgba(0,0,0,0.03)] text-left flex flex-col justify-between hover:shadow-[0_20px_42px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 cursor-pointer group"
              >
                <div>
                  <div className="w-16 h-16 rounded-[22px] bg-[#F0F6FA] text-[#749220] flex items-center justify-center shadow-xs group-hover:bg-[#F6F9EE] transition-colors">
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
                  <div className="w-10 h-10 rounded-full border border-[#749220]/40 bg-white text-[#749220] flex items-center justify-center group-hover:bg-[#749220] group-hover:text-white transition-all shadow-2xs">
                    <ArrowRightIcon className="w-4 h-4 stroke-[2]" />
                  </div>
                </div>
              </motion.div>

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
                  <div
                    key={cIdx}
                    onClick={() => onOpenModal && onOpenModal()}
                    className="rounded-[28px] bg-white border border-[#C3DCEB]/80 p-5 shadow-2xs text-left flex flex-col justify-between cursor-pointer hover:shadow-md hover:border-[#749220]/40 transition-all"
                  >
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

