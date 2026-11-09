import React from "react";
import { Link } from "react-router-dom";
import { ArrowRightIcon, CalendarDaysIcon } from "@heroicons/react/24/outline";

const CTASection = ({ onOpenModal }) => {
  return (
    <section className="py-16 sm:py-20 bg-gradient-to-r from-[#0A4973] via-[#165479] to-[#749220] text-white font-sans relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-normal mb-3 tracking-tight leading-snug">
          Ready to file your <span className="font-medium text-[#D8EBA4]">U.S. taxes?</span>
        </h2>
        <p className="text-sm sm:text-[15px] text-white/90 max-w-lg mx-auto mb-7 font-normal leading-relaxed">
          Certified CPA preparation, guaranteed maximum refunds, and 100% IRS accuracy for the 2025–2026 tax season.
        </p>
        <div className="flex flex-wrap sm:flex-nowrap gap-3.5 justify-center items-center">
          <Link
            to="/login"
            className="h-11 sm:h-12 px-6 rounded-xl bg-white text-[#165479] hover:bg-gray-50 font-medium text-sm sm:text-[15px] shadow-sm hover:shadow transition-all inline-flex items-center justify-center gap-2 group"
          >
            <span>Start Filing</span>
            <ArrowRightIcon className="w-4 h-4 stroke-[2] group-hover:translate-x-1 transition-transform" />
          </Link>
          <button
            onClick={() => onOpenModal && onOpenModal()}
            className="h-11 sm:h-12 px-6 rounded-xl bg-white/10 hover:bg-white/20 border border-white/25 text-white font-medium text-sm sm:text-[15px] transition-all inline-flex items-center justify-center gap-2 cursor-pointer group"
          >
            <CalendarDaysIcon className="w-4 h-4 text-[#D8EBA4] stroke-[2] group-hover:scale-110 transition-transform" />
            <span>Talk to CPA</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;

