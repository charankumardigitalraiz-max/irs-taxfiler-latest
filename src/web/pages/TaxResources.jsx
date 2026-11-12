import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowRightIcon,
  CheckCircleIcon,
  ArrowTopRightOnSquareIcon,
  ShieldCheckIcon,
  CheckBadgeIcon,
  BuildingOfficeIcon,
  AcademicCapIcon,
  HeartIcon,
  GiftIcon,
} from '@heroicons/react/24/outline';
import SEO from '../components/seo/SEO';
import Logo from '../assets/irsLogo.png';

// Section Visual
import deadlinesVisual from '../assets/tax-resources-deadlines-3d.jpg';

const TaxResources = () => {
  // 1. Essential IRS Forms (Exact concise content)
  const essentialForms = [
    {
      code: 'Form 1040',
      name: 'Individual Income Tax Return',
      tag: 'Individual',
      summary: 'The core annual form for reporting gross income, claiming deductions, and securing your federal refund.',
      formUrl: 'https://www.irs.gov/pub/irs-pdf/f1040.pdf',
      instructionsUrl: 'https://www.irs.gov/pub/irs-pdf/i1040gi.pdf',
    },
    {
      code: 'Form 1040-NR',
      name: 'Nonresident Alien Return',
      tag: 'Expats & Visa',
      summary: 'Required for nonresidents, international students, and foreign professionals with U.S.-sourced income.',
      formUrl: 'https://www.irs.gov/pub/irs-pdf/f1040nr.pdf',
      instructionsUrl: 'https://www.irs.gov/pub/irs-pdf/i1040nr.pdf',
    },
    {
      code: 'Form W-7',
      name: 'Application for ITIN',
      tag: 'Identification',
      summary: 'Used by nonresidents, spouses, and dependents to apply for an IRS Individual Taxpayer ID.',
      formUrl: 'https://www.irs.gov/pub/irs-pdf/fw7.pdf',
      instructionsUrl: 'https://www.irs.gov/pub/irs-pdf/iw7.pdf',
    },
    {
      code: 'FinCEN 114',
      name: 'FBAR Foreign Accounts Report',
      tag: 'Foreign Assets',
      summary: 'Mandatory annual filing for U.S. persons holding foreign financial accounts exceeding $10,000.',
      formUrl: 'https://www.fincen.gov/sites/default/files/shared/fin114.pdf',
      instructionsUrl: 'https://www.fincen.gov/sites/default/files/shared/fin114_a.pdf',
    },
    {
      code: 'Form 4868',
      name: 'Automatic 6-Month Extension',
      tag: 'Extension',
      summary: 'Grants an extension to file returns through October 15 (taxes owed still due April 15).',
      formUrl: 'https://www.irs.gov/pub/irs-pdf/f4868.pdf',
      instructionsUrl: 'https://www.irs.gov/pub/irs-pdf/i4868.pdf',
    },
    {
      code: 'Schedule C',
      name: 'Business Profit & Loss',
      tag: 'Self-Employed',
      summary: 'Used by sole proprietors, freelancers, and 1099 contractors to report income and write off expenses.',
      formUrl: 'https://www.irs.gov/pub/irs-pdf/f1040sc.pdf',
      instructionsUrl: 'https://www.irs.gov/pub/irs-pdf/i1040sc.pdf',
    },
  ];

  // 2. Key Deadlines (Clean Schedule Data)
  const keyDeadlines = [
    {
      month: 'JAN',
      day: '31',
      date: 'January 31, 2026',
      title: 'W-2 & 1099 Forms Distribution',
      note: 'Employers and payers must mail or electronically deliver all wage and income statements.',
      tag: 'Forms Due',
      highlight: false,
    },
    {
      month: 'APR',
      day: '15',
      date: 'April 15, 2026',
      title: 'Individual Tax Filing & Payment Deadline',
      note: 'Primary federal & state income tax deadline (Form 1040) and payment for taxes owed.',
      tag: 'Primary Tax Day',
      highlight: true,
    },
    {
      month: 'JUN',
      day: '15',
      date: 'June 15, 2026',
      title: 'U.S. Expats & Overseas Filers Deadline',
      note: 'Automatic 2-month extension for citizens and permanent residents living abroad.',
      tag: 'Overseas Filers',
      highlight: false,
    },
    {
      month: 'OCT',
      day: '15',
      date: 'October 15, 2026',
      title: 'Extended Filing Final Deadline',
      note: 'Final deadline to file individual returns if you requested a Form 4868 extension.',
      tag: 'Extension Final',
      highlight: false,
    },
  ];

  // 3. Common Tax Deductions & Credits (4 Balanced Categories)
  const deductionCategories = [
    {
      category: 'Home & Housing',
      icon: BuildingOfficeIcon,
      items: [
        'Mortgage interest',
        'Property taxes',
        'Home office deduction',
        'Moving expenses (military)',
      ],
    },
    {
      category: 'Education',
      icon: AcademicCapIcon,
      items: [
        'Student loan interest',
        'Tuition and fees deduction',
        'American Opportunity Credit',
        'Lifetime Learning Credit',
      ],
    },
    {
      category: 'Medical & Health',
      icon: HeartIcon,
      items: [
        'Medical expenses (over 7.5% AGI)',
        'Health savings account contributions',
        'Long-term care insurance',
        'Dental and vision expenses',
      ],
    },
    {
      category: 'Charitable Contributions',
      icon: GiftIcon,
      items: [
        'Cash donations',
        'Non-cash donations',
        'Volunteer expenses',
        'Charitable mileage',
      ],
    },
  ];

  const title = "U.S. Tax Resources & Official Forms | IRS Tax Filer";
  const description = "Clean and verified U.S. tax resources: official IRS forms (1040, W-7, FBAR), 2025–2026 tax deadlines, and standard deduction guidelines.";
  const keywords = "IRS tax forms, Form 1040, Form W-7, FBAR 114, tax deadlines 2025 2026, standard deductions";
  const canonical = window.location.href;
  const image = { Logo };

  return (
    <>
      <SEO
        title={title}
        description={description}
        canonical={canonical}
        image={image}
        keywords={keywords}
      />

      <div className="min-h-screen bg-white font-sans text-gray-900">

        {/* ========================================================================= */}
        {/* 1. HERO SECTION (CLEAN, AIRY & MINIMAL)                                   */}
        {/* ========================================================================= */}
        <section className="relative pt-12 sm:pt-16 pb-12 sm:pb-16 bg-white border-b border-slate-100 text-center">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.08 }}
              className="text-3xl sm:text-4xl lg:text-[42px] font-normal text-gray-900 tracking-tight leading-[1.25] mb-3.5"
            >
              Essential Tax Resources &{' '}
              <span className="font-semibold bg-gradient-to-r from-[#0A4973] via-[#165479] to-[#749220] bg-clip-text text-transparent">
                Official Forms
              </span>
            </motion.h1>

            {/* Concise Subtext */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.12 }}
              className="text-sm sm:text-base lg:text-[17px] text-gray-600 font-normal leading-[30px] sm:leading-[32px] lg:leading-[34px] mb-6 max-w-2xl mx-auto"
            >
              Verified IRS downloads, critical 2025–2026 filing dates, and standard deduction guidelines for taxpayers, expats, and small businesses.
            </motion.p>

            {/* Subtle Trust Indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.16 }}
              className="flex flex-wrap items-center justify-center gap-4 text-xs text-gray-500 font-normal"
            >
              <span className="inline-flex text-gray-600 font-normal items-center gap-1.5">
                <CheckCircleIcon className="w-4 h-4 text-[#749220]" />
                Direct IRS.gov Links
              </span>
              <span className="text-gray-300">•</span>
              <span className="inline-flex text-gray-600 font-normal items-center gap-1.5">
                <CheckCircleIcon className="w-4 h-4 text-[#749220]" />
                Updated for 2025–2026
              </span>
              <span className="text-gray-300">•</span>
              <span className="inline-flex text-gray-600 font-normal items-center gap-1.5">
                <CheckCircleIcon className="w-4 h-4 text-[#749220]" />
                CPA Reviewed
              </span>
            </motion.div>

            {/* Quick Section Jump Links */}
            <div className="mt-7 flex flex-wrap items-center justify-center gap-2.5">
              <a
                href="#forms"
                className="px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium text-[#165479] bg-sky-50/80 hover:bg-sky-100/80 border border-sky-200/70 transition-colors"
              >
                Official Forms
              </a>
              <a
                href="#deadlines"
                className="px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium text-gray-700 bg-slate-50 hover:bg-slate-100 border border-slate-200/80 transition-colors"
              >
                2026 Deadlines
              </a>
              <a
                href="#deductions"
                className="px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium text-gray-700 bg-slate-50 hover:bg-slate-100 border border-slate-200/80 transition-colors"
              >
                Deductions & Credits
              </a>
            </div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* 2. OFFICIAL IRS FORMS SECTION (AIRY, READABLE 3-COLUMN DIRECTORY)         */}
        {/* ========================================================================= */}
        <section id="forms" className="py-14 sm:py-16 bg-slate-50/70 border-b border-slate-100 scroll-mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            {/* Section Header */}
            <div className="text-left mb-8 sm:mb-10">
              <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-normal text-gray-900 tracking-tight leading-[1.25]">
                Commonly Used Forms &{" "}
                <span className="font-semibold bg-gradient-to-r from-[#0A4973] via-[#165479] to-[#749220] bg-clip-text text-transparent">
                  Instructions
                </span>
              </h2>
              <p className="text-sm sm:text-base text-gray-600 font-normal leading-relaxed mt-2 max-w-2xl">
                Official PDF downloads hosted directly by the IRS and FinCEN.
              </p>
            </div>

            {/* Clean 3-Column Open Card Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {essentialForms.map((item, idx) => (
                <motion.div
                  key={item.code}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: idx * 0.04 }}
                  className="group bg-white rounded-2xl p-6 border border-slate-200/80 shadow-2xs hover:shadow-[0_12px_28px_rgba(22,84,121,0.07)] hover:border-[#165479]/30 transition-all duration-200 flex flex-col justify-between"
                >
                  <div>
                    {/* Top Row: Form Code & Simple Category */}
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <span className="font-mono text-xs font-semibold text-[#165479] bg-sky-50/90 px-3 py-1 rounded-lg border border-sky-100">
                        {item.code}
                      </span>
                      <span className="text-xs font-medium text-[#749220]">
                        {item.tag}
                      </span>
                    </div>

                    {/* Clear Form Title */}
                    <h3 className="text-base sm:text-[17px] font-semibold text-gray-900 group-hover:text-[#165479] transition-colors leading-snug mb-2">
                      {item.name}
                    </h3>

                    {/* Readable Summary */}
                    <p className="text-sm text-gray-600 font-normal leading-relaxed mb-6">
                      {item.summary}
                    </p>
                  </div>

                  {/* Clean Minimal Links */}
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-4">
                    <a
                      href={item.formUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-[#165479] hover:text-[#0A4973] transition-colors"
                      title="Open official PDF in new tab"
                    >
                      <span>Download PDF</span>
                      <ArrowTopRightOnSquareIcon className="w-4 h-4 stroke-[1.8]" />
                    </a>

                    <a
                      href={item.instructionsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs sm:text-[13px] font-normal text-gray-500 hover:text-gray-900 transition-colors"
                      title="Open official instructions in new tab"
                    >
                      <span>Instructions</span>
                      <ArrowTopRightOnSquareIcon className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* 3. KEY TAX DEADLINES SECTION (CLEAN BORDERLESS TIMELINE & CALENDAR)      */}
        {/* ========================================================================= */}
        <section id="deadlines" className="py-14 sm:py-16 bg-white border-b border-slate-100 scroll-mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            {/* Section Header */}
            <div className="text-left mb-8 sm:mb-10">
              <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-normal text-gray-900 tracking-tight leading-[1.25]">
                Important Filing{" "}
                <span className="font-semibold bg-gradient-to-r from-[#0A4973] via-[#165479] to-[#749220] bg-clip-text text-transparent">
                  Deadlines
                </span>
              </h2>
              <p className="text-sm sm:text-base text-gray-600 font-normal leading-relaxed mt-2 max-w-2xl">
                Key federal dates to keep your filing on track and avoid IRS late penalties.
              </p>
            </div>

            {/* Split Composition: Left Clean Timeline + Right 3D Calendar Visual */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

              {/* Left Column: Clean Readable Timeline Rows */}
              <div className="lg:col-span-7 order-2 lg:order-1">
                <div className="divide-y divide-slate-100">
                  {keyDeadlines.map((item, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: idx * 0.06 }}
                      className={`flex items-start gap-4 sm:gap-5 py-4 sm:py-5 px-3 sm:px-4 rounded-2xl transition-all ${item.highlight
                        ? 'bg-[#F6F9EE]/80'
                        : 'hover:bg-slate-50/80'
                        }`}
                    >
                      {/* Clean Calendar Date Tile */}
                      <div
                        className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex flex-col items-center justify-center shrink-0 border transition-all ${item.highlight
                          ? 'bg-[#165479] border-[#165479] text-white shadow-sm'
                          : 'bg-white border-slate-200/90 text-gray-900 shadow-2xs'
                          }`}
                      >
                        <span
                          className={`text-[11px] font-medium uppercase tracking-wider leading-none ${item.highlight ? 'text-[#CBF056]' : 'text-[#749220]'
                            }`}
                        >
                          {item.month}
                        </span>
                        <span className="text-lg sm:text-xl font-semibold leading-none tracking-tight mt-1">
                          {item.day}
                        </span>
                      </div>

                      {/* Readable Content */}
                      <div className="flex-1 min-w-0 pt-0.5">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <h3 className="text-base font-semibold text-gray-900 leading-snug">
                            {item.title}
                          </h3>
                          {item.highlight && (
                            <span className="text-[11px] font-medium text-[#165479] bg-white px-2.5 py-0.5 rounded-full border border-[#165479]/20">
                              {item.tag}
                            </span>
                          )}
                        </div>

                        <p className="text-sm text-gray-600 font-normal leading-relaxed">
                          {item.note}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Right Column: Clean 3D Calendar Visual */}
              <div className="lg:col-span-5 flex justify-center order-1 lg:order-2">
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                  className="relative w-full max-w-[420px] rounded-2xl overflow-hidden border border-slate-200/90 shadow-[0_12px_36px_rgba(22,84,121,0.08)] bg-white group"
                >
                  <img
                    src={deadlinesVisual}
                    alt="2025–2026 U.S. Tax Filing Deadline Calendar with April 15 Highlighted"
                    className="w-full h-auto min-h-[360px] sm:min-h-[400px] max-h-[440px] object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                    loading="lazy"
                  />

                  {/* Subtle Bottom Caption Pill */}
                  <div className="absolute bottom-3.5 left-3.5 right-3.5 bg-white/95 backdrop-blur-md rounded-xl p-3 shadow-md border border-gray-200/80 flex items-center justify-between z-10 select-none">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-xs font-medium text-gray-900">
                        April 15 Primary Due Date
                      </span>
                    </div>
                  </div>
                </motion.div>
              </div>

            </div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* 4. DEDUCTIONS & CREDITS SECTION (OPEN 4-COLUMN READABLE CHECKLIST)        */}
        {/* ========================================================================= */}
        <section id="deductions" className="py-14 sm:py-16 bg-slate-50/70 border-b border-slate-100 scroll-mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            {/* Section Header */}
            <div className="text-left mb-8 sm:mb-10">
              <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-normal text-gray-900 tracking-tight leading-[1.25]">
                Common Tax Deductions &{" "}
                <span className="font-semibold bg-gradient-to-r from-[#0A4973] via-[#165479] to-[#749220] bg-clip-text text-transparent">
                  Credits
                </span>
              </h2>
              <p className="text-sm sm:text-base text-gray-600 font-normal leading-relaxed mt-2 max-w-2xl">
                Maximize your tax savings by reviewing eligible federal deductions and credits.
              </p>
            </div>

            {/* Clean 4-Column Category Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {deductionCategories.map((col, idx) => {
                const IconComp = col.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: idx * 0.05 }}
                    className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-2xs hover:shadow-[0_12px_28px_rgba(22,84,121,0.06)] hover:border-[#165479]/30 transition-all duration-200 flex flex-col justify-start"
                  >
                    {/* Clean Category Header */}
                    <div className="flex items-center gap-3 mb-4 pb-3 border-b border-slate-100">
                      <div className="w-9 h-9 rounded-xl bg-slate-50 border border-slate-200/70 flex items-center justify-center text-[#165479] shrink-0">
                        <IconComp className="w-5 h-5" />
                      </div>
                      <h3 className="text-base font-semibold text-gray-900 leading-snug">
                        {col.category}
                      </h3>
                    </div>

                    {/* Readable Checklist */}
                    <ul className="space-y-2.5">
                      {col.items.map((point, pIdx) => (
                        <li
                          key={pIdx}
                          className="flex items-start gap-2.5 text-sm text-gray-600 font-normal leading-relaxed"
                        >
                          <CheckCircleIcon className="w-4 h-4 text-[#749220] shrink-0 mt-0.5" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                );
              })}
            </div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* 5. CLEAN, MINIMAL CTA SECTION                                             */}
        {/* ========================================================================= */}
        <section className="py-14 sm:py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

            <div className="rounded-2xl p-8 sm:p-10 bg-slate-50 border border-slate-200/90 shadow-2xs">

              <h2 className="text-xl sm:text-2xl lg:text-3xl font-normal text-gray-900 tracking-tight mb-2.5">
                Need Help Selecting Forms or Maximizing Deductions?
              </h2>

              <p className="text-xs sm:text-sm text-gray-600 font-normal max-w-lg mx-auto mb-6 leading-relaxed">
                Our licensed CPAs review every return to ensure 100% IRS accuracy, audit protection, and your maximum legal refund.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-3">
                <Link
                  to="/login"
                  className="inline-flex items-center justify-center gap-2 h-10 sm:h-11 px-5 rounded-xl bg-[#165479] hover:bg-[#0A4973] text-white font-medium text-xs sm:text-sm shadow-sm transition-all"
                >
                  <span>Start Filing Online</span>
                  <ArrowRightIcon className="w-3.5 h-3.5" />
                </Link>

                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 h-10 sm:h-11 px-5 rounded-xl bg-white hover:bg-slate-50 text-gray-800 font-medium text-xs sm:text-sm border border-slate-300 shadow-2xs transition-all"
                >
                  <span>Talk to a CPA</span>
                </Link>
              </div>

              <div className="mt-6 pt-5 border-t border-slate-200/60 flex flex-wrap items-center justify-center gap-x-5 gap-y-1.5 text-[11px] text-gray-500 font-normal">
                <span className="flex items-center gap-1">
                  <CheckBadgeIcon className="w-3.5 h-3.5 text-[#749220]" />
                  IRS Authorized e-File
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <CheckCircleIcon className="w-3.5 h-3.5 text-[#749220]" />
                  All 50 States
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <ShieldCheckIcon className="w-3.5 h-3.5 text-[#749220]" />
                  100% Accuracy Guarantee
                </span>
              </div>

            </div>

          </div>
        </section>

      </div>
    </>
  );
};

export default TaxResources;
