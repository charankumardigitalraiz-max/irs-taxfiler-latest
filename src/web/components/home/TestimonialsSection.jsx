import React from "react";
import { CheckCircleIcon } from "@heroicons/react/24/outline";

const TestimonialsSection = () => {
  const clientReviews = [
    {
      name: "Priya Sharma",
      initials: "PS",
      role: "US Individual Filer",
      savings: "Saved $3,200",
      text: "Received $3,200 more on my refund than last year. The CPA found deductions I didn't know existed, and e-filing was seamless.",
    },
    {
      name: "David K.",
      initials: "DK",
      role: "U.S. Expat (London)",
      savings: "Saved $4,150",
      text: "Filing U.S. taxes from abroad was daunting before. Their CPA handled my Foreign Earned Income Exclusion and FBAR with zero hassle.",
    },
    {
      name: "John Smith",
      initials: "JS",
      role: "US Business Owner (Texas)",
      savings: "Saved $8,500",
      text: "Saved $8,500 on our corporate pass-through return. Their team knows every nuance of small business deductions and write-offs.",
    },
    {
      name: "Amit Patel",
      initials: "AP",
      role: "Dual-Status Filer (India / US)",
      savings: "Saved $2,900",
      text: "Seamless dual-country filing. They eliminated double-taxation on foreign income and filed both IRS and Indian ITR accurately.",
    },
    {
      name: "Sarah Jenkins",
      initials: "SJ",
      role: "Freelance 1099 Consultant",
      savings: "Saved $3,800",
      text: "First time filing 1099 contractor income. Their CPA maximized my business write-offs and simplified quarterly estimated taxes.",
    },
    {
      name: "Michael Chang",
      initials: "MC",
      role: "Tech LLC Co-Founder",
      savings: "Saved $6,400",
      text: "Multi-member LLC partnership return completed in 48 hours. Transparent pricing, proactive CPA advice, and zero IRS audit stress.",
    },
  ];

  return (
    <section className="py-14 sm:py-18 bg-white border-t border-slate-100 font-sans relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Compact Section Header */}
        <div className="text-center max-w-xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F6F9EE] border border-[#749220]/25 text-xs font-normal text-[#749220] uppercase tracking-wider mb-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#749220] animate-pulse" />
            <span>Client Experiences</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-normal text-gray-900 tracking-tight">
            Real Clients,{" "}
            <span className="font-medium bg-gradient-to-r from-[#0A4973] via-[#165479] to-[#749220] bg-clip-text text-transparent">
              Real Tax Results
            </span>
          </h2>
          <div className="mt-2.5 inline-flex items-center gap-2 text-xs text-gray-500 font-normal">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>Live verified client results • Hover any card to pause</span>
          </div>
        </div>

      </div>

      {/* Infinite Seamless Scrolling Track with Soft Gradient Fade Masks */}
      <div className="relative w-full overflow-hidden py-3">
        {/* Left Gradient Edge Fade */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-32 lg:w-44 bg-gradient-to-r from-white via-white/90 to-transparent z-10" />
        {/* Right Gradient Edge Fade */}
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-32 lg:w-44 bg-gradient-to-l from-white via-white/90 to-transparent z-10" />

        {/* Animated Marquee Track with Smooth Pause-on-Hover */}
        <div className="animate-marquee flex items-center gap-4 sm:gap-5 select-none hover:[animation-play-state:paused]">
          {[...clientReviews, ...clientReviews].map((item, index) => (
            <div
              key={index}
              className="group relative w-[310px] sm:w-[340px] shrink-0 bg-white hover:bg-[#FAFCFE] rounded-2xl p-4.5 sm:p-5 border border-slate-200/90 hover:border-[#165479]/40 shadow-[0_2px_12px_rgba(22,84,121,0.03)] hover:shadow-[0_16px_36px_rgba(22,84,121,0.1)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between text-left overflow-hidden cursor-default min-h-[190px]"
            >
              {/* Animated Top Line on Hover */}
              <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-[#0A4973] via-[#165479] to-[#749220] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div>
                {/* Top: 5 Stars + Savings Badge */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex text-amber-400 gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-3.5 h-3.5 fill-amber-400 transition-transform duration-200 group-hover:scale-110"
                        style={{ transitionDelay: `${i * 30}ms` }}
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#F6F9EE] text-[#749220] border border-[#749220]/25 group-hover:bg-[#165479] group-hover:text-white group-hover:border-[#165479] transition-all duration-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#749220] group-hover:bg-[#CBF056] transition-colors" />
                    <span>{item.savings}</span>
                  </span>
                </div>

                {/* Clean Punchy Quote */}
                <p className="text-[13px] sm:text-[13.5px] text-gray-600 group-hover:text-gray-900 font-normal leading-relaxed mb-4 transition-colors line-clamp-3">
                  "{item.text}"
                </p>
              </div>

              {/* Footer: Author Info + Verified Badge */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#0A4973] to-[#165479] text-white flex items-center justify-center font-medium text-[11px] shrink-0 group-hover:scale-105 transition-transform">
                    {item.initials}
                  </div>
                  <div>
                    <div className="text-[13px] font-medium text-gray-900 leading-tight">
                      {item.name}
                    </div>
                    <div className="text-[11px] text-gray-400 font-normal mt-0.5">
                      {item.role}
                    </div>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-600">
                  <CheckCircleIcon className="w-3.5 h-3.5 stroke-[2.2]" />
                  <span>Verified</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;

