import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  DocumentTextIcon,
  CalendarDaysIcon,
  BanknotesIcon,
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

// Normal Section Visuals (Standard Page Illustrations)
import formsVisual from '../assets/tax-resources-forms-3d.jpg';
import deadlinesVisual from '../assets/tax-resources-deadlines-3d.jpg';
import deductionsVisual from '../assets/tax-resources-deductions-3d.jpg';

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

  // Helper to render compact, proportional full-round circular cards
  const renderCircleCard = (item, idx) => (
    <motion.div
      key={item.code}
      initial={{ opacity: 0, scale: 0.92 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35, delay: idx * 0.03 }}
      className="group w-[205px] h-[205px] sm:w-[215px] sm:h-[215px] lg:w-[225px] lg:h-[225px] rounded-full bg-white border border-slate-200/90 shadow-[0_4px_16px_rgba(22,84,121,0.05)] hover:shadow-[0_12px_28px_rgba(22,84,121,0.1)] hover:-translate-y-0.5 hover:border-[#165479]/40 transition-all duration-200 flex flex-col items-center justify-center text-center p-3.5 sm:p-4 shrink-0"
    >
      {/* Code Tag Pill */}
      <span className="font-mono text-[10px] font-medium text-[#165479] bg-sky-50 px-2.5 py-0.5 rounded-full border border-sky-100 shrink-0 mb-1">
        {item.code}
      </span>

      {/* Form Name */}
      <h3 className="text-xs sm:text-[13px] font-medium text-gray-900 group-hover:text-[#165479] transition-colors leading-tight max-w-[170px] line-clamp-1 mb-1">
        {item.name}
      </h3>

      {/* Summary */}
      <p className="text-[10px] sm:text-[11px] text-gray-500 font-normal leading-relaxed max-w-[175px] line-clamp-2 mb-2">
        {item.summary}
      </p>

      {/* Direct PDF & Instructions Actions */}
      <div className="flex items-center gap-1.5">
        <a
          href={item.formUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#165479] hover:bg-[#0A4973] text-white text-[10px] font-medium shadow-2xs transition-colors"
          title="Open official PDF in new tab"
        >
          <span>PDF</span>
          <ArrowTopRightOnSquareIcon className="w-2.5 h-2.5 text-slate-300" />
        </a>

        <a
          href={item.instructionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-[10px] font-normal transition-colors"
          title="Open official instructions in new tab"
        >
          <span>Instructions</span>
          <ArrowTopRightOnSquareIcon className="w-2.5 h-2.5 text-slate-400" />
        </a>
      </div>
    </motion.div>
  );

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

          </div>
        </section>

        {/* ========================================================================= */}
        {/* 2. OFFICIAL IRS FORMS SECTION (PROPORTIONAL CIRCLES FIT IN SCREEN HEIGHT) */}
        {/* ========================================================================= */}
        <section className="py-8 sm:py-12 bg-slate-50/60 border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            {/* Section Header */}
            <div className="text-left mb-6 sm:mb-8">
              <h2 className="text-xl sm:text-2xl lg:text-[28px] font-normal text-gray-900 tracking-tight leading-[1.25]">
                Commonly Used Forms &{" "}
                <span className="font-semibold bg-gradient-to-r from-[#0A4973] via-[#165479] to-[#749220] bg-clip-text text-transparent">
                  Instructions
                </span>
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 font-normal leading-relaxed mt-1 max-w-2xl">
                Direct official PDF downloads hosted by the IRS and FinCEN repositories.
              </p>
            </div>

            {/* Full Round Orbit Layout: Compact Circles Fitted to Screen Height */}
            <div className="flex flex-col items-center gap-3.5 sm:gap-4">

              {/* Row 1: Top 2 Circular Cards */}
              <div className="flex flex-wrap justify-center gap-3.5 sm:gap-4">
                {renderCircleCard(essentialForms[0], 0)}
                {renderCircleCard(essentialForms[1], 1)}
              </div>

              {/* Row 2: Left Circle (W-7), Center Circle Image, Right Circle (FinCEN 114) */}
              <div className="flex flex-wrap justify-center items-center gap-3.5 sm:gap-4">
                {renderCircleCard(essentialForms[2], 2)}

                {/* Center Image: Exact Matching Compact Circle Dimensions */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.92 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35 }}
                  className="w-[205px] h-[205px] sm:w-[215px] sm:h-[215px] lg:w-[225px] lg:h-[225px] rounded-full overflow-hidden border-2 border-slate-200/90 shadow-[0_8px_24px_rgba(22,84,121,0.08)] relative group shrink-0 bg-white flex items-center justify-center"
                >
                  <img
                    src={formsVisual}
                    alt="Official IRS Tax Forms 1040 and Verification Seal"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />

                  {/* Circular Bottom Badge Overlay */}
                  <div className="absolute inset-x-0 bottom-0 pt-6 pb-2.5 bg-gradient-to-t from-slate-950/80 via-slate-950/40 to-transparent flex flex-col items-center justify-end text-center px-2 select-none">
                    <div className="flex items-center gap-1 mb-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#749220] animate-pulse" />
                      <span className="text-[10px] font-medium text-white tracking-tight">
                        Official IRS Forms
                      </span>
                    </div>
                    <span className="text-[9px] font-medium text-slate-300">
                      Form 1040, W-7 & FBAR
                    </span>
                  </div>
                </motion.div>

                {renderCircleCard(essentialForms[3], 3)}
              </div>

              {/* Row 3: Bottom 2 Circular Cards */}
              <div className="flex flex-wrap justify-center gap-3.5 sm:gap-4">
                {renderCircleCard(essentialForms[4], 4)}
                {renderCircleCard(essentialForms[5], 5)}
              </div>

            </div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* 3. KEY TAX DEADLINES SECTION (BORDERLESS TIMELINE SCHEDULE)               */}
        {/* ========================================================================= */}
        <section className="py-14 sm:py-18 bg-white border-b border-slate-100">
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

            {/* Split Composition: Left Borderless Timeline Schedule + Right 3D Calendar Visual (Standard Image) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

              {/* Left Column: Borderless Timeline Schedule */}
              <div className="lg:col-span-7 order-2 lg:order-1">
                <div className="divide-y divide-slate-100">
                  {keyDeadlines.map((item, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: idx * 0.06 }}
                      className={`flex items-start gap-3.5 sm:gap-4.5 py-3.5 sm:py-4 px-2.5 sm:px-3.5 rounded-xl transition-all ${item.highlight
                        ? 'bg-[#F6F9EE]/80'
                        : 'hover:bg-slate-50/80'
                        }`}
                    >
                      {/* Modern Clean Calendar Date Tile */}
                      <div
                        className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex flex-col items-center justify-center shrink-0 border transition-all ${item.highlight
                          ? 'bg-[#165479] border-[#165479] text-white shadow-sm'
                          : 'bg-white border-slate-200/90 text-gray-900 shadow-2xs'
                          }`}
                      >
                        <span
                          className={`text-[10px] sm:text-[11px] font-medium uppercase tracking-wider leading-none ${item.highlight ? 'text-[#CBF056]' : 'text-[#749220]'
                            }`}
                        >
                          {item.month}
                        </span>
                        <span className="text-lg sm:text-xl font-semibold leading-none tracking-tight mt-1">
                          {item.day}
                        </span>
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0 pt-0.5">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <h3 className="text-sm sm:text-base font-medium text-gray-900 leading-snug">
                            {item.title}
                          </h3>
                        </div>

                        <p className="text-xs sm:text-[13px] text-gray-600 font-normal leading-relaxed">
                          {item.note}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Right Column: 3D Calendar Visual (Normal Section Image, not clickable) */}
              <div className="lg:col-span-5 flex justify-center order-1 lg:order-2">
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                  className="relative w-full max-w-[440px] rounded-2xl overflow-hidden border border-slate-200/90 shadow-[0_12px_36px_rgba(22,84,121,0.08)] bg-white group"
                >
                  <img
                    src={deadlinesVisual}
                    alt="2025–2026 U.S. Tax Filing Deadline Calendar with April 15 Highlighted"
                    className="w-full h-auto min-h-[380px] sm:min-h-[410px] lg:min-h-[440px] max-h-[470px] object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                    loading="lazy"
                  />

                  {/* Floating Glass Pill */}
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
        {/* 4. DEDUCTIONS & CREDITS SECTION (CLEAN 4-CATEGORY CHECKLIST)              */}
        {/* ========================================================================= */}
        <section className="py-14 sm:py-18 bg-slate-50/60 border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            {/* Section Header */}
            <div className="text-left mb-8 sm:mb-10">
              <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-normal text-gray-900 tracking-tight leading-[1.25]">
                Common Tax Deductions &{" "}
                <span className="font-medium bg-gradient-to-r from-[#0A4973] via-[#165479] to-[#749220] bg-clip-text text-transparent">
                  Credits
                </span>
              </h2>
              <p className="text-sm sm:text-base text-gray-500 font-normal leading-relaxed mt-1.5 max-w-2xl">
                Maximize your tax savings by understanding eligible deductions and credits.
              </p>
            </div>

            {/* Split Composition: Left 3D Deductions Visual + Right Balanced 2x2 Category Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">

              {/* Left Column: 3D Deductions Visual (High Quality Image) */}
              <div className="lg:col-span-5 flex">
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                  className="relative w-full h-full min-h-[380px] sm:min-h-[420px] rounded-2xl overflow-hidden border border-slate-200/90 shadow-[0_12px_36px_rgba(22,84,121,0.06)] bg-white group flex flex-col justify-between"
                >
                  <img
                    src={deductionsVisual}
                    alt="Standard Deductions and Tax Refund Savings Visualization"
                    className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.02]"
                    loading="lazy"
                  />

                  {/* Clean Subtle Status Badge */}
                  <div className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur-md rounded-xl py-2.5 px-3.5 shadow-sm border border-slate-200/80 flex items-center justify-between z-10 select-none">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#749220] animate-pulse" />
                      <span className="text-xs font-medium text-gray-800">
                        Max Legal Deductions & Credits
                      </span>
                    </div>
                    <span className="text-[10px] font-normal text-gray-500 hidden sm:inline">
                      IRS Standards
                    </span>
                  </div>
                </motion.div>
              </div>

              {/* Right Column: 4 Clean Cards in 2x2 Grid */}
              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {deductionCategories.map((col, idx) => {
                  const IconComp = col.icon;
                  return (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: idx * 0.05 }}
                      className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-2xs hover:shadow-[0_10px_24px_rgba(22,84,121,0.06)] hover:border-[#165479]/30 transition-all duration-200 flex flex-col justify-start"
                    >
                      {/* Clean Category Header */}
                      <div className="flex items-center gap-2.5 mb-3.5 pb-2.5 border-b border-slate-100">
                        <div className="w-8 h-8 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-[#165479] shrink-0">
                          <IconComp className="w-4 h-4" />
                        </div>
                        <h3 className="text-sm sm:text-[14px] font-semibold text-gray-900 leading-snug">
                          {col.category}
                        </h3>
                      </div>

                      {/* Clean Item Checklist */}
                      <ul className="space-y-2">
                        {col.items.map((point, pIdx) => (
                          <li
                            key={pIdx}
                            className="flex items-center gap-2 text-xs sm:text-[13px] text-gray-700 font-normal leading-relaxed"
                          >
                            <CheckCircleIcon className="w-3.5 h-3.5 text-[#749220] shrink-0" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  );
                })}
              </div>

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
