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
  DocumentTextIcon,
} from '@heroicons/react/24/outline';
import SEO from '../components/seo/SEO';
import Logo from '../assets/irsLogo.png';

// Section Visual
import deadlinesVisual from '../assets/tax-resources-deadlines-3d.jpg';

// Color themes for essential IRS forms cards
const formThemes = [
  {
    codeBg: "bg-[#E9F7FA]",
    codeText: "text-[#127EAB]",
    codeBorder: "border-[#127EAB]/25",
    tagText: "text-[#127EAB]",
    tagDot: "bg-[#127EAB]",
    titleHover: "group-hover:text-[#127EAB] text-[#127EAB]",
    borderHover: "hover:border-[#127EAB]/40",
    topLine: "bg-[#127EAB]",
    actionBg: "bg-[#E9F7FA] hover:bg-[#127EAB]",
    actionText: "text-[#127EAB] hover:text-white",
    actionBorder: "border-[#127EAB]/30",
    watermark: "text-[#127EAB]/[0.08]",
  },
  {
    codeBg: "bg-[#FEF4F2]",
    codeText: "text-[#EE6450]",
    codeBorder: "border-[#EE6450]/25",
    tagText: "text-[#EE6450]",
    tagDot: "bg-[#EE6450]",
    titleHover: "group-hover:text-[#EE6450] text-[#EE6450]",
    borderHover: "hover:border-[#EE6450]/40",
    topLine: "bg-[#EE6450]",
    actionBg: "bg-[#FEF4F2] hover:bg-[#EE6450]",
    actionText: "text-[#EE6450] hover:text-white",
    actionBorder: "border-[#EE6450]/30",
    watermark: "text-[#EE6450]/[0.08]",
  },
  {
    codeBg: "bg-[#ECFDF5]",
    codeText: "text-[#059669]",
    codeBorder: "border-[#059669]/25",
    tagText: "text-[#059669]",
    tagDot: "bg-[#059669]",
    titleHover: "group-hover:text-[#059669] text-[#059669]",
    borderHover: "hover:border-[#059669]/40",
    topLine: "bg-[#059669]",
    actionBg: "bg-[#ECFDF5] hover:bg-[#059669]",
    actionText: "text-[#059669] hover:text-white",
    actionBorder: "border-[#059669]/30",
    watermark: "text-[#059669]/[0.08]",
  },
  {
    codeBg: "bg-[#EEF2FF]",
    codeText: "text-[#4F46E5]",
    codeBorder: "border-[#4F46E5]/25",
    tagText: "text-[#4F46E5]",
    tagDot: "bg-[#4F46E5]",
    titleHover: "group-hover:text-[#4F46E5] text-[#4F46E5]",
    borderHover: "hover:border-[#4F46E5]/40",
    topLine: "bg-[#4F46E5]",
    actionBg: "bg-[#EEF2FF] hover:bg-[#4F46E5]",
    actionText: "text-[#4F46E5] hover:text-white",
    actionBorder: "border-[#4F46E5]/30",
    watermark: "text-[#4F46E5]/[0.08]",
  },
  {
    codeBg: "bg-[#FFFBEB]",
    codeText: "text-[#D97706]",
    codeBorder: "border-[#D97706]/25",
    tagText: "text-[#D97706]",
    tagDot: "bg-[#D97706]",
    titleHover: "group-hover:text-[#D97706] text-[#D97706]",
    borderHover: "hover:border-[#D97706]/40",
    topLine: "bg-[#D97706]",
    actionBg: "bg-[#FFFBEB] hover:bg-[#D97706]",
    actionText: "text-[#D97706] hover:text-white",
    actionBorder: "border-[#D97706]/30",
    watermark: "text-[#D97706]/[0.08]",
  },
  {
    codeBg: "bg-[#F5F3FF]",
    codeText: "text-[#7C3AED]",
    codeBorder: "border-[#7C3AED]/25",
    tagText: "text-[#7C3AED]",
    tagDot: "bg-[#7C3AED]",
    titleHover: "group-hover:text-[#7C3AED] text-[#7C3AED]",
    borderHover: "hover:border-[#7C3AED]/40",
    topLine: "bg-[#7C3AED]",
    actionBg: "bg-[#F5F3FF] hover:bg-[#7C3AED]",
    actionText: "text-[#7C3AED] hover:text-white",
    actionBorder: "border-[#7C3AED]/30",
    watermark: "text-[#7C3AED]/[0.08]",
  },
];

// Color themes for Deductions & Credits cards
const deductionThemes = [
  {
    iconBg: "bg-[#E9F7FA]",
    iconColor: "text-[#127EAB]",
    iconBorder: "border-[#127EAB]/25",
    checkColor: "text-[#127EAB]",
    borderHover: "hover:border-[#127EAB]/40",
    watermark: "text-[#127EAB]/[0.08]",
  },
  {
    iconBg: "bg-[#EEF2FF]",
    iconColor: "text-[#4F46E5]",
    iconBorder: "border-[#4F46E5]/25",
    checkColor: "text-[#4F46E5]",
    borderHover: "hover:border-[#4F46E5]/40",
    watermark: "text-[#4F46E5]/[0.08]",
  },
  {
    iconBg: "bg-[#FEF2F2]",
    iconColor: "text-[#E11D48]",
    iconBorder: "border-[#E11D48]/25",
    checkColor: "text-[#E11D48]",
    borderHover: "hover:border-[#E11D48]/40",
    watermark: "text-[#E11D48]/[0.08]",
  },
  {
    iconBg: "bg-[#ECFDF5]",
    iconColor: "text-[#059669]",
    iconBorder: "border-[#059669]/25",
    checkColor: "text-[#059669]",
    borderHover: "hover:border-[#059669]/40",
    watermark: "text-[#059669]/[0.08]",
  },
];

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

      <div className="min-h-screen bg-white font-sans text-primary">

        {/* ========================================================================= */}
        {/* OFFICIAL IRS FORMS & RESOURCES SECTION                                    */}
        {/* ========================================================================= */}
        <section id="forms" className="pt-10 sm:pt-12 pb-8 sm:pb-10 bg-white scroll-mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            {/* Header */}
            <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-8">
              <motion.h1
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.08 }}
                className="text-3xl sm:text-4xl lg:text-[42px] font-semibold text-primary tracking-tight leading-[1.35] sm:leading-[1.38] lg:leading-[1.4] mb-4"
              >
                Essential Tax Resources &{" "}
                <span className="text-teal">
                  Official
                </span>{" "}
                <span className="text-coral">
                  IRS Forms
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.12 }}
                className="text-sm sm:text-base lg:text-[17px] text-[#6F7F8E] font-[500] leading-[28px] sm:leading-[30px] lg:leading-[32px] max-w-2xl mx-auto"
              >
                Verified IRS downloads, critical 2025–2026 filing dates, and standard deduction guidelines for taxpayers, expats, and small businesses.
              </motion.p>
            </div>

            {/* Official IRS Forms Table */}
            <div className="overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-2xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200/90 bg-slate-50/80 text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-[#6F7F8E]">
                      <th className="py-3.5 px-4 sm:px-6">Form Code</th>
                      <th className="py-3.5 px-4 sm:px-6">Form Name & Purpose</th>
                      <th className="py-3.5 px-4 sm:px-6">Category</th>
                      <th className="py-3.5 px-4 sm:px-6 text-right">Official Document</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-sm">
                    {essentialForms.map((item, idx) => {
                      const theme = formThemes[idx % formThemes.length];

                      return (
                        <tr
                          key={item.code}
                          className="hover:bg-[#EFF9FB]/40 transition-colors group"
                        >
                          {/* Form Code Badge */}
                          <td className="py-4 px-4 sm:px-6 whitespace-nowrap align-middle">
                            <span className={`inline-block font-mono text-xs font-semibold ${theme.codeText} ${theme.codeBg} px-2.5 py-1 rounded-lg border ${theme.codeBorder}`}>
                              {item.code}
                            </span>
                          </td>

                          {/* Form Name & Summary */}
                          <td className="py-4 px-4 sm:px-6 align-middle">
                            <div className={`font-semibold text-sm sm:text-[15px] ${theme.codeText} mb-0.5 leading-snug`}>
                              {item.name}
                            </div>
                            <p className="text-xs sm:text-[13px] text-slate-500 font-[500] leading-relaxed max-w-xl">
                              {item.summary}
                            </p>
                          </td>

                          {/* Category Tag */}
                          <td className="py-4 px-4 sm:px-6 whitespace-nowrap align-middle">
                            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-700 bg-slate-100/80 px-2.5 py-1 rounded-full border border-slate-200/60">
                              <span className={`w-1.5 h-1.5 rounded-full ${theme.tagDot}`} />
                              <span>{item.tag}</span>
                            </span>
                          </td>

                          {/* Action Button */}
                          <td className="py-4 px-4 sm:px-6 text-right whitespace-nowrap align-middle">
                            <a
                              href={item.formUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`inline-flex items-center gap-1.5 text-xs font-semibold ${theme.actionText} ${theme.actionBg} ${theme.actionBorder} px-3 py-1.5 rounded-xl border transition-all duration-200 shadow-2xs hover:shadow-xs hover:scale-[1.02]`}
                              title={`View official ${item.code} PDF in new tab`}
                            >
                              <DocumentTextIcon className="w-3.5 h-3.5 shrink-0" />
                              <span>View Site</span>
                              <ArrowTopRightOnSquareIcon className="w-3 h-3 stroke-[2] opacity-80" />
                            </a>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* 3. KEY TAX DEADLINES SECTION (CLEAN BORDERLESS TIMELINE & CALENDAR)      */}
        {/* ========================================================================= */}
        <section id="deadlines" className="py-8 sm:py-10 bg-white scroll-mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            {/* Section Header */}
            <div className="text-left mb-6 sm:mb-7">
              <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-normal text-primary tracking-tight leading-[1.25]">
                Important Filing{" "}
                <span className="font-medium text-teal">
                  Deadlines
                </span>
              </h2>
              <p className="text-sm sm:text-base text-slateText font-normal leading-relaxed mt-2 max-w-2xl">
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
                        ? 'bg-[#EFF9FB]/80'
                        : 'hover:bg-slate-50/80'
                        }`}
                    >
                      {/* Clean Calendar Date Tile */}
                      <div
                        className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex flex-col items-center justify-center shrink-0 border transition-all ${item.highlight
                          ? 'bg-[#1F4264] border-[#1F4264] text-white shadow-sm'
                          : 'bg-white border-slate-200/90 text-primary shadow-2xs'
                          }`}
                      >
                        <span
                          className={`text-[11px] font-medium uppercase tracking-wider leading-none ${item.highlight ? 'text-teal' : 'text-teal'
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
                          <h3 className="text-base font-semibold text-primary leading-snug">
                            {item.title}
                          </h3>
                          {item.highlight && (
                            <span className="text-[11px] font-medium text-primary bg-white px-2.5 py-0.5 rounded-full border border-[#1F4264]/20">
                              {item.tag}
                            </span>
                          )}
                        </div>

                        <p className="text-sm text-slateText font-normal leading-relaxed">
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
                      <span className="w-2 h-2 rounded-full bg-background-aqua0 animate-pulse" />
                      <span className="text-xs font-medium text-primary">
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
        <section id="deductions" className="py-8 sm:py-10 bg-slate-50/70 scroll-mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            {/* Section Header */}
            <div className="text-left mb-6 sm:mb-7">
              <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-normal text-primary tracking-tight leading-[1.25]">
                Common Tax Deductions &{" "}
                <span className="font-medium text-teal">
                  Credits
                </span>
              </h2>
              <p className="text-sm sm:text-base text-slate-700 font-normal leading-relaxed mt-2 max-w-2xl">
                Maximize your tax savings by reviewing eligible federal deductions and credits.
              </p>
            </div>

            {/* Clean 4-Column Category Grid with Vivid Colors & Watermark Numbers */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {deductionCategories.map((col, idx) => {
                const IconComp = col.icon;
                const theme = deductionThemes[idx % deductionThemes.length];
                const catNumber = String(idx + 1).padStart(2, "0");

                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: idx * 0.05 }}
                    className={`group relative overflow-hidden bg-white rounded-2xl p-6 border border-slate-200/90 shadow-2xs hover:shadow-[0_16px_36px_rgba(22,84,121,0.08)] ${theme.borderHover} transition-all duration-300 flex flex-col justify-start`}
                  >
                    {/* Large Decorative Watermark Number in Background */}
                    <span
                      aria-hidden="true"
                      className={`absolute -bottom-2 -right-1 text-7xl font-black font-mono tracking-tighter ${theme.watermark} select-none pointer-events-none transition-transform duration-300 group-hover:scale-110`}
                    >
                      {catNumber}
                    </span>

                    <div className="relative z-10">
                      {/* Clean Category Header */}
                      <div className="flex items-center gap-3 mb-4 pb-3.5 border-b border-slate-100">
                        <div className={`w-10 h-10 rounded-xl ${theme.iconBg} ${theme.iconColor} border ${theme.iconBorder} flex items-center justify-center shrink-0 shadow-2xs`}>
                          <IconComp className="w-5 h-5 stroke-[1.8]" />
                        </div>
                        <h3 className="text-base font-semibold text-primary leading-snug">
                          {col.category}
                        </h3>
                      </div>

                      {/* Readable High-Contrast Checklist */}
                      <ul className="space-y-3">
                        {col.items.map((point, pIdx) => (
                          <li
                            key={pIdx}
                            className="flex items-start gap-2.5 text-xs sm:text-[13.5px] text-slate-700 font-medium leading-relaxed"
                          >
                            <CheckCircleIcon className={`w-4 h-4 ${theme.checkColor} shrink-0 mt-0.5 stroke-[2]`} />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                );
              })}
            </div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* 5. CLEAN, HIGH-IMPACT BRAND CTA SECTION                                   */}
        {/* ========================================================================= */}
        <section className="py-6 sm:py-8 bg-gradient-to-b from-white via-[#EFF9FB]/60 to-[#E9F7FA]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

            <div className="relative overflow-hidden rounded-3xl py-7 sm:py-8 lg:py-9 px-6 sm:px-12 lg:px-16 bg-gradient-to-br from-[#1F4264] via-[#1B3C5E] to-[#152F4A] border border-white/15 shadow-xl text-white">

              {/* Decorative Ambient Background Glows */}
              <div className="absolute -top-24 -left-24 w-72 h-72 bg-teal/25 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-coral/20 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10">
                {/* Pill Badge */}
                <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-white/10 border border-white/20 text-xs font-semibold text-white/90 mb-2.5 select-none">
                  <span className="w-2 h-2 rounded-full bg-teal animate-pulse" />
                  <span>CPA Tax Assistance</span>
                </div>

                <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-normal text-white tracking-tight leading-snug mb-2.5 max-w-3xl mx-auto">
                  Need Help Selecting Forms or{" "}
                  <span className="font-medium text-teal-light">
                    Maximizing Deductions?
                  </span>
                </h2>

                <p className="text-xs sm:text-sm lg:text-[15px] text-white/85 font-normal max-w-2xl mx-auto mb-6 leading-relaxed">
                  Our licensed CPAs review every return to ensure 100% IRS accuracy, audit protection, and your maximum legal refund.
                </p>

                <div className="flex flex-wrap items-center justify-center gap-3">
                  <Link
                    to="/login"
                    className="inline-flex items-center justify-center gap-2 h-10 sm:h-11 px-6 sm:px-7 rounded-xl bg-teal hover:bg-[#0E668B] text-white font-semibold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5"
                  >
                    <span>Start Filing Online</span>
                    <ArrowRightIcon className="w-4 h-4 stroke-[2]" />
                  </Link>

                  <Link
                    to="/contact"
                    className="inline-flex items-center justify-center gap-2 h-10 sm:h-11 px-6 sm:px-7 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm border border-white/25 backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5"
                  >
                    <span>Talk to a CPA</span>
                  </Link>
                </div>
              </div>

            </div>

          </div>
        </section>

      </div>
    </>
  );
};

export default TaxResources;
