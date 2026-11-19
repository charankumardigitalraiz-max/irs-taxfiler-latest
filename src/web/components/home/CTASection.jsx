import React from "react";
import { Link } from "react-router-dom";
import { ArrowRightIcon, CalendarDaysIcon, SparklesIcon } from "@heroicons/react/24/outline";
import ctaBg from "../../assets/cta-banner-bg.jpg";

const CTASection = ({ onOpenModal }) => {
  return (
    <section className="relative py-8 sm:py-10 text-primary font-sans overflow-hidden bg-background">
      {/* Background Image Layer with Clean Light Tint & Depth */}
      <div className="absolute inset-0 z-0">
        <img
          src={ctaBg}
          alt="IRS Form 1040 Tax Filing and CPA Preparation"
          className="w-full h-full object-cover object-center"
        />
        {/* Soft, translucent white overlay so tax forms/calculator are visible while text has optimal contrast */}
        <div className="absolute inset-0 bg-background/80 sm:bg-background/40" />
        {/* Radial highlight for text clarity */}
        <div className="absolute inset-0 [background:radial-gradient(ellipse_at_center,_rgba(253,248,242,0.92)_0%,_rgba(253,248,242,0.72)_60%,_rgba(253,248,242,0.95)_100%)] pointer-events-none" />
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        {/* Eyebrow Pill */}
        <div className="pill-badge mb-4">
          <SparklesIcon className="w-3.5 h-3.5 text-coral" />
          <span>2025–2026 Tax Season Ready</span>
        </div>

        {/* Display Headline */}
        <h2 className="text-3xl sm:text-4xl lg:text-[44px] xl:text-[48px] font-normal text-primary mb-3.5 tracking-tight leading-[1.25]">
          Ready to file your{" "}
          <span className="font-medium text-teal">
            U.S. taxes?
          </span>
        </h2>

        {/* Subtitle */}
        <p className="text-sm sm:text-base lg:text-[17px] text-slateText max-w-xl mx-auto mb-8 font-normal leading-relaxed">
          Certified CPA preparation, guaranteed maximum refunds, and 100% IRS accuracy for individuals, expats, and businesses worldwide.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap sm:flex-nowrap gap-3.5 justify-center items-center">
          <Link
            to="/login"
            className="relative inline-flex items-center justify-center gap-2.5 h-11 sm:h-12 px-6 rounded-xl bg-primary hover:bg-primary-dark text-white font-semibold text-sm sm:text-[15px] shadow-sm hover:shadow-md transition-all duration-200 group overflow-hidden"
          >
            <span className="relative z-10 tracking-tight">Start Filing</span>
            <ArrowRightIcon className="relative z-10 w-4 h-4 stroke-[2.5] group-hover:translate-x-1 transition-transform" />
          </Link>
          <button
            onClick={() => onOpenModal && onOpenModal()}
            className="h-11 sm:h-12 px-6 rounded-xl bg-surface hover:bg-background-blue text-teal hover:text-primary border border-border font-semibold text-sm sm:text-[15px] shadow-2xs hover:shadow-sm transition-all duration-200 inline-flex items-center justify-center gap-2 cursor-pointer group"
          >
            <CalendarDaysIcon className="w-4 h-4 text-teal stroke-[2.2] group-hover:scale-110 transition-transform" />
            <span>Talk to CPA</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;

