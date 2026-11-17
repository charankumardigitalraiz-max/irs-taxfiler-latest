import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRightIcon,
  CalendarDaysIcon,
  CheckCircleIcon,
  SparklesIcon,
  DocumentTextIcon,
  GlobeAltIcon,
  ShieldCheckIcon,
  IdentificationIcon,
  ClockIcon,
  ArrowPathIcon,
  BuildingOffice2Icon,
  BriefcaseIcon,
  UserGroupIcon,
  DocumentCheckIcon,
  ScaleIcon,
  BanknotesIcon,
} from "@heroicons/react/24/outline";

const colorThemes = {
  teal: {
    iconBg: "bg-[#E9F7FA]",
    iconText: "text-[#127EAB]",
    iconBorder: "border-[#127EAB]/25",
    iconHoverBg: "group-hover:bg-[#127EAB]",
    tagBg: "bg-[#E9F7FA]",
    tagText: "text-[#127EAB]",
    tagBorder: "border-[#127EAB]/25",
    dot: "bg-[#127EAB]",
    titleHover: "group-hover:text-[#127EAB]",
    cardBorderHover: "hover:border-[#127EAB]/40",
    cardTopLine: "bg-[#127EAB]",
    actionHover: "group-hover:text-[#127EAB]",
    complianceBg: "bg-[#E9F7FA]",
    complianceText: "text-[#127EAB]",
    complianceBorder: "border-[#127EAB]/25",
  },
  coral: {
    iconBg: "bg-[#FDF2F0]",
    iconText: "text-[#EE6450]",
    iconBorder: "border-[#EE6450]/25",
    iconHoverBg: "group-hover:bg-[#EE6450]",
    tagBg: "bg-[#FDF2F0]",
    tagText: "text-[#EE6450]",
    tagBorder: "border-[#EE6450]/25",
    dot: "bg-[#EE6450]",
    titleHover: "group-hover:text-[#EE6450]",
    cardBorderHover: "hover:border-[#EE6450]/40",
    cardTopLine: "bg-[#EE6450]",
    actionHover: "group-hover:text-[#EE6450]",
    complianceBg: "bg-[#FDF2F0]",
    complianceText: "text-[#EE6450]",
    complianceBorder: "border-[#EE6450]/25",
  },
  emerald: {
    iconBg: "bg-[#ECFDF5]",
    iconText: "text-[#059669]",
    iconBorder: "border-[#059669]/25",
    iconHoverBg: "group-hover:bg-[#059669]",
    tagBg: "bg-[#ECFDF5]",
    tagText: "text-[#059669]",
    tagBorder: "border-[#059669]/25",
    dot: "bg-[#059669]",
    titleHover: "group-hover:text-[#059669]",
    cardBorderHover: "hover:border-[#059669]/40",
    cardTopLine: "bg-[#059669]",
    actionHover: "group-hover:text-[#059669]",
    complianceBg: "bg-[#ECFDF5]",
    complianceText: "text-[#059669]",
    complianceBorder: "border-[#059669]/25",
  },
  indigo: {
    iconBg: "bg-[#EEF2FF]",
    iconText: "text-[#4F46E5]",
    iconBorder: "border-[#4F46E5]/25",
    iconHoverBg: "group-hover:bg-[#4F46E5]",
    tagBg: "bg-[#EEF2FF]",
    tagText: "text-[#4F46E5]",
    tagBorder: "border-[#4F46E5]/25",
    dot: "bg-[#4F46E5]",
    titleHover: "group-hover:text-[#4F46E5]",
    cardBorderHover: "hover:border-[#4F46E5]/40",
    cardTopLine: "bg-[#4F46E5]",
    actionHover: "group-hover:text-[#4F46E5]",
    complianceBg: "bg-[#EEF2FF]",
    complianceText: "text-[#4F46E5]",
    complianceBorder: "border-[#4F46E5]/25",
  },
  amber: {
    iconBg: "bg-[#FFFBEB]",
    iconText: "text-[#D97706]",
    iconBorder: "border-[#D97706]/25",
    iconHoverBg: "group-hover:bg-[#D97706]",
    tagBg: "bg-[#FFFBEB]",
    tagText: "text-[#D97706]",
    tagBorder: "border-[#D97706]/25",
    dot: "bg-[#D97706]",
    titleHover: "group-hover:text-[#D97706]",
    cardBorderHover: "hover:border-[#D97706]/40",
    cardTopLine: "bg-[#D97706]",
    actionHover: "group-hover:text-[#D97706]",
    complianceBg: "bg-[#FFFBEB]",
    complianceText: "text-[#D97706]",
    complianceBorder: "border-[#D97706]/25",
  },
  purple: {
    iconBg: "bg-[#F5F3FF]",
    iconText: "text-[#7C3AED]",
    iconBorder: "border-[#7C3AED]/25",
    iconHoverBg: "group-hover:bg-[#7C3AED]",
    tagBg: "bg-[#F5F3FF]",
    tagText: "text-[#7C3AED]",
    tagBorder: "border-[#7C3AED]/25",
    dot: "bg-[#7C3AED]",
    titleHover: "group-hover:text-[#7C3AED]",
    cardBorderHover: "hover:border-[#7C3AED]/40",
    cardTopLine: "bg-[#7C3AED]",
    actionHover: "group-hover:text-[#7C3AED]",
    complianceBg: "bg-[#F5F3FF]",
    complianceText: "text-[#7C3AED]",
    complianceBorder: "border-[#7C3AED]/25",
  },
  blue: {
    iconBg: "bg-[#EFF6FF]",
    iconText: "text-[#2563EB]",
    iconBorder: "border-[#2563EB]/25",
    iconHoverBg: "group-hover:bg-[#2563EB]",
    tagBg: "bg-[#EFF6FF]",
    tagText: "text-[#2563EB]",
    tagBorder: "border-[#2563EB]/25",
    dot: "bg-[#2563EB]",
    titleHover: "group-hover:text-[#2563EB]",
    cardBorderHover: "hover:border-[#2563EB]/40",
    cardTopLine: "bg-[#2563EB]",
    actionHover: "group-hover:text-[#2563EB]",
    complianceBg: "bg-[#EFF6FF]",
    complianceText: "text-[#2563EB]",
    complianceBorder: "border-[#2563EB]/25",
  },
  orange: {
    iconBg: "bg-[#FFF7ED]",
    iconText: "text-[#EA580C]",
    iconBorder: "border-[#EA580C]/25",
    iconHoverBg: "group-hover:bg-[#EA580C]",
    tagBg: "bg-[#FFF7ED]",
    tagText: "text-[#EA580C]",
    tagBorder: "border-[#EA580C]/25",
    dot: "bg-[#EA580C]",
    titleHover: "group-hover:text-[#EA580C]",
    cardBorderHover: "hover:border-[#EA580C]/40",
    cardTopLine: "bg-[#EA580C]",
    actionHover: "group-hover:text-[#EA580C]",
    complianceBg: "bg-[#FFF7ED]",
    complianceText: "text-[#EA580C]",
    complianceBorder: "border-[#EA580C]/25",
  },
};

const TaxFilingServices = ({ onOpenModal }) => {
  const [selectedCategory, setSelectedCategory] = useState("us-individual");

  const serviceCategories = [
    {
      id: "us-individual",
      label: "US Individual Taxes",
      mediumLabel: "US Individual",
      shortLabel: "Individual",
      countLabel: "6 Filing Services",
      icon: <DocumentTextIcon className="w-4 h-4 sm:w-4.5 sm:h-4.5" />,
      activeColor: "text-teal",
    },
    {
      id: "us-business",
      label: "US Corporate & Business",
      mediumLabel: "US Business",
      shortLabel: "Business",
      countLabel: "3 Corporate Services",
      icon: <BuildingOffice2Icon className="w-4 h-4 sm:w-4.5 sm:h-4.5" />,
      activeColor: "text-blue-400",
    },
    {
      id: "indian-tax",
      label: "Indian Tax & NRI Services",
      mediumLabel: "Indian & NRI",
      shortLabel: "Indian / NRI",
      countLabel: "3 NRI Services",
      icon: <GlobeAltIcon className="w-4 h-4 sm:w-4.5 sm:h-4.5" />,
      activeColor: "text-orange-400",
    },
  ];

  const services = {
    "us-individual": {
      title: "US Individual Tax Services",
      subtitle: "Certified federal, 50-state, expat, and specialized compliance services for US taxpayers.",
      items: [
        {
          title: "Federal, State & Local Tax Filing",
          description: "Full-service federal, state, and local income tax preparation with exhaustive deduction discovery.",
          tag: "Form 1040",
          route: "/services/us-individual/federal-state-local",
          icon: <DocumentTextIcon className="w-6 h-6" />,
          features: ["Form 1040, 1040-SR & W-2 / 1099", "All 50 states electronic filing", "Maximum refund guarantee"],
          complianceText: "IRS Direct e-File",
          color: "teal",
        },
        {
          title: "FBAR & FATCA Asset Reporting",
          description: "Foreign bank account and financial asset compliance to protect you against severe IRS penalties.",
          tag: "Foreign Assets",
          route: "/services/us-individual/fbar-fatca",
          icon: <GlobeAltIcon className="w-6 h-6" />,
          features: ["FinCEN 114 overseas reporting", "IRS Form 8938 asset disclosure", "Streamlined filing procedures"],
          complianceText: "FinCEN & IRS e-File",
          color: "coral",
        },
        {
          title: "IRS Representation & Audit Defense",
          description: "Licensed CPA representation before the IRS for tax audit defense, formal appeals, and penalty relief.",
          tag: "Audit Defense",
          route: "/services/us-individual/representation",
          icon: <ShieldCheckIcon className="w-6 h-6" />,
          features: ["Audit notice response & defense", "Penalty abatement requests", "Direct CPA representation"],
          complianceText: "Licensed CPA Defense",
          color: "emerald",
        },
        {
          title: "ITIN Number Application & Renewal",
          description: "Comprehensive assistance for non-residents, spouses, and dependents obtaining or renewing Form W-7 ITINs.",
          tag: "Form W-7",
          route: "/services/us-individual/itin",
          icon: <IdentificationIcon className="w-6 h-6" />,
          features: ["IRS Form W-7 certified prep", "Document verification assistance", "Spouse & dependent support"],
          complianceText: "IRS Form W-7 Certified",
          color: "indigo",
        },
        {
          title: "Automatic Tax Extension Filing",
          description: "Secure an automatic 6-month extension to file your return while avoiding costly late-filing penalties.",
          tag: "Form 4868",
          route: "/services/us-individual/extension",
          icon: <ClockIcon className="w-6 h-6" />,
          features: ["Instant IRS electronic confirmation", "Estimated tax calculation help", "Extends filing to October 15"],
          complianceText: "Instant IRS Confirmation",
          color: "amber",
        },
        {
          title: "Prior Year Amendment Filing",
          description: "Amend prior federal and state returns to correct errors, claim missed credits, or retrieve unclaimed refunds.",
          tag: "Form 1040-X",
          route: "/services/us-individual/extension",
          icon: <ArrowPathIcon className="w-6 h-6" />,
          features: ["Prior 3 tax years reviewed", "Unclaimed tax credits recovered", "Full accuracy recalculation"],
          complianceText: "IRS Form 1040-X",
          color: "purple",
        },
      ],
      consultation: {
        tag: "Free 15-Min CPA Session",
        title: "Not sure which tax forms or deductions apply to your situation?",
        description: "Connect 1-on-1 with a licensed U.S. CPA. We will evaluate your filing status, check for overlooked deductions, and answer all your questions with zero obligation.",
        action: "Book Free CPA Consultation",
        badge: "100% Free • No Credit Card Required • Licensed U.S. CPAs",
      },
    },
    "us-business": {
      title: "US Corporate & Business Tax Services",
      subtitle: "Comprehensive business incorporations, bookkeeping sync, and tax return filing for companies.",
      items: [
        {
          title: "US Business Incorporations",
          description: "Complete business formation, entity structuring, state registrations, and rapid federal EIN acquisition.",
          tag: "Entity Setup",
          route: "/services/us-business/incorporations",
          icon: <BuildingOffice2Icon className="w-6 h-6" />,
          features: ["LLC, C-Corp & S-Corp formation", "Federal EIN in 24-48 hours", "Articles & operating agreements"],
          complianceText: "State & Federal Filing",
          color: "teal",
        },
        {
          title: "Small & Medium Business Tax Filing",
          description: "Full corporate tax preparation, depreciation schedules, deductions, and multi-state compliance.",
          tag: "Corporate Tax",
          route: "/services/us-business/smb-tax-filing",
          icon: <BriefcaseIcon className="w-6 h-6" />,
          features: ["Form 1120, 1120-S & 1065", "Quarterly estimated tax filings", "Maximum business write-offs"],
          complianceText: "IRS Business e-File",
          color: "blue",
        },
        {
          title: "Corporate CPA Tax Advisory",
          description: "Proactive business tax strategy, entity classification optimization, cash-flow planning, and credits.",
          tag: "CPA Advisory",
          route: "/services/us-business/smb-tax-filing",
          icon: <UserGroupIcon className="w-6 h-6" />,
          features: ["1-on-1 corporate CPA guidance", "Year-end tax minimization", "Payroll & pass-through strategy"],
          complianceText: "Dedicated CPA Expert",
          color: "coral",
        },
      ],
      consultation: {
        tag: "Corporate Tax Advisory",
        title: "Starting a business or need strategic corporate tax structuring?",
        description: "Consult our licensed corporate tax specialists on LLC vs. S-Corp election, federal & multi-state compliance, payroll, and bookkeeping optimization.",
        action: "Book Business Advisory Call",
        badge: "Custom Tax Strategy • Licensed CPAs & Corporate Specialists",
      },
    },
    "indian-tax": {
      title: "Indian Tax & NRI Services",
      subtitle: "Income tax return filing, cross-border compliance, and representation before Indian tax authorities.",
      items: [
        {
          title: "Indian Income Tax Filing",
          description: "Comprehensive ITR filing for residents, NRIs, and foreign entities with capital gains and asset disclosures.",
          tag: "ITR Filing",
          route: "/services/indian/tax-filing",
          icon: <DocumentCheckIcon className="w-6 h-6" />,
          features: ["ITR-1 through ITR-7 e-filing", "DTAA double-taxation relief", "Capital gains & NRE/NRO sync"],
          complianceText: "ITD Direct e-Filing",
          color: "orange",
        },
        {
          title: "Indian Tax Representation",
          description: "Authorized representation before Indian Income Tax authorities for scrutiny assessments and appeals.",
          tag: "IT Authorities",
          route: "/services/indian/representation",
          icon: <ScaleIcon className="w-6 h-6" />,
          features: ["Faceless assessment hearings", "Notice 148 / 143(2) responses", "CIT(A) & ITAT dispute appeals"],
          complianceText: "Authorized Representation",
          color: "emerald",
        },
        {
          title: "NRI Cross-Border Wealth Advisory",
          description: "Specialized tax advisory for Non-Resident Indians managing assets, FEMA regulations, and fund repatriation.",
          tag: "NRI Compliance",
          route: "/services/indian/tax-filing",
          icon: <BanknotesIcon className="w-6 h-6" />,
          features: ["FEMA & RBI regulatory guidance", "Form 15CA / 15CB certifications", "Dual-country tax optimization"],
          complianceText: "Cross-Border Certified",
          color: "indigo",
        },
      ],
      consultation: {
        tag: "Cross-Border NRI Advisory",
        title: "Managing complex cross-border taxes, DTAA, or NRI assets?",
        description: "Speak with our dual-country tax experts regarding foreign tax credit relief, FEMA guidelines, NRE/NRO accounts, and seamless repatriation.",
        action: "Book NRI Consultation Call",
        badge: "Dual-Qualified Tax Team • FEMA & DTAA Certified",
      },
    },
  };

  const activeData = services[selectedCategory];

  return (
    <section id="services" className="relative py-10 sm:py-12 lg:py-14 bg-white font-sans overflow-hidden">
      <div className="relative max-w-7xl 2xl:max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header Fold */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          {/* Eyebrow Pill Badge */}
          <div className="pill-badge mb-4">
            <span className="w-2 h-2 rounded-full bg-teal animate-pulse" />
            <span>Full-Service Tax Preparation</span>
          </div>

          {/* Display Headline */}
          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-normal text-primary tracking-tight leading-[1.2]">
            Explore Our{" "}
            <span className="font-medium text-teal">
              Filing Services
            </span>
          </h2>

          {/* Subtitle */}
          <p className="text-sm sm:text-base text-slateText font-normal leading-relaxed mt-3.5 max-w-2xl mx-auto">
            Certified CPA preparation, dual-status compliance, and guaranteed maximum refunds tailored for US individuals, expats, corporations, and NRI taxpayers.
          </p>
        </div>

        {/* Modern Interactive Category Segmented Tabs - Scrolling inside tabs with thin scrollbar on mobile */}
        <div className="w-full max-w-4xl lg:max-w-5xl mx-auto mb-10 sm:mb-12 flex justify-center px-3 sm:px-4">
          <div
            role="tablist"
            aria-label="Tax filing categories"
            className="w-full sm:w-auto max-w-full p-1.5 pb-2.5 sm:p-2 rounded-2xl bg-surface border border-border flex items-center justify-start sm:justify-center gap-1.5 sm:gap-2.5 md:gap-3 shadow-xs overflow-x-auto thin-scrollbar sm:no-scrollbar touch-pan-x"
          >
            {serviceCategories.map((cat) => {
              const isActive = selectedCategory === cat.id;
              const count = services[cat.id]?.items.length || 0;
              return (
                <button
                  key={cat.id}
                  role="tab"
                  id={`tab-${cat.id}`}
                  aria-selected={isActive}
                  aria-controls={`panel-${cat.id}`}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`relative px-3.5 sm:px-5 lg:px-6 py-2 sm:py-2.5 lg:py-3 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 flex items-center justify-center gap-1.5 sm:gap-2.5 cursor-pointer select-none shrink-0 ${isActive
                    ? "text-white shadow-sm"
                    : "text-slateText hover:text-primary hover:bg-background-aqua/60"
                    }`}
                >
                  {/* Active Pill Background with Layout Animation */}
                  {isActive && (
                    <motion.div
                      layoutId="activeCategoryPill"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      className="absolute inset-0 rounded-xl bg-primary border border-primary/20"
                    />
                  )}

                  <span className={`relative z-10 shrink-0 ${isActive ? (cat.activeColor || "text-coral") : "text-slateText"}`}>
                    {cat.icon}
                  </span>
                  <span className="relative z-10 tracking-tight whitespace-nowrap">
                    <span className="hidden sm:inline">{cat.label}</span>
                    <span className="inline sm:hidden">{cat.shortLabel}</span>
                  </span>
                  <span
                    className={`relative z-10 text-[11px] px-2 py-0.5 rounded-full font-medium transition-colors shrink-0 ${isActive
                      ? "bg-white/20 text-white border border-white/25"
                      : "bg-surface text-slateText border border-border"
                      }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Cards Grid with Smooth Transition */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory}
            role="tabpanel"
            id={`panel-${selectedCategory}`}
            aria-labelledby={`tab-${selectedCategory}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="w-full"
          >
            {/* 3-Column Service Tiles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
              {activeData.items.map((item, idx) => {
                const theme = colorThemes[item.color] || colorThemes.teal;
                return (
                  <Link
                    key={`${selectedCategory}-${idx}`}
                    to={item.route || "/login"}
                    className={`group relative bg-surface hover:bg-white rounded-2xl p-5 sm:p-6 border border-border ${theme.cardBorderHover} shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between text-left overflow-hidden`}
                  >
                    {/* Subtle Accent Line on Hover */}
                    <div className={`absolute top-0 left-0 right-0 h-[2.5px] ${theme.cardTopLine} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                    <div>
                      {/* Header Row: Icon Badge + Category Tag Pill */}
                      <div className="flex items-center justify-between mb-4">
                        <div className={`w-11 h-11 rounded-xl ${theme.iconBg} ${theme.iconText} border ${theme.iconBorder} flex items-center justify-center shrink-0 ${theme.iconHoverBg} group-hover:text-white group-hover:border-transparent transition-all duration-300 shadow-2xs`}>
                          {item.icon}
                        </div>

                        {item.tag && (
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full ${theme.tagBg} ${theme.tagText} border ${theme.tagBorder} text-[11px] font-medium tracking-tight`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${theme.dot}`} />
                            <span>{item.tag}</span>
                          </span>
                        )}
                      </div>

                      {/* Card Title */}
                      <h3 className={`text-[16px] sm:text-[17px] font-semibold text-primary ${theme.titleHover} transition-colors leading-snug`}>
                        {item.title}
                      </h3>

                      {/* Card Description */}
                      <p className="text-xs sm:text-[13px] text-slateText font-normal leading-relaxed mt-2 line-clamp-2">
                        {item.description}
                      </p>
                    </div>

                    {/* Card Footer Action */}
                    <div className="mt-5 pt-3.5 border-t border-border flex items-center justify-between">
                      <span className={`inline-flex items-center gap-1.5 text-xs font-semibold text-primary ${theme.actionHover} transition-colors`}>
                        <span>Start Filing</span>
                        <ArrowRightIcon className="w-3.5 h-3.5 stroke-[2.2] group-hover:translate-x-1 transition-transform" />
                      </span>

                      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium ${theme.complianceText} ${theme.complianceBg} border ${theme.complianceBorder}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${theme.dot}`} />
                        <span>{item.complianceText}</span>
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>

          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
};

export default TaxFilingServices;
