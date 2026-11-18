import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRightIcon,
  CheckIcon,
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
    iconHoverBg: "group-hover:bg-[#127EAB]",
    tagText: "text-[#0F6A91]",
    tagBg: "bg-[#E9F7FA]",
    topLine: "bg-[#127EAB]",
    titleHover: "group-hover:text-[#127EAB]",
  },
  coral: {
    iconBg: "bg-[#FDF2F0]",
    iconText: "text-[#EE6450]",
    iconHoverBg: "group-hover:bg-[#EE6450]",
    tagText: "text-[#D94F3B]",
    tagBg: "bg-[#FDF2F0]",
    topLine: "bg-[#EE6450]",
    titleHover: "group-hover:text-[#EE6450]",
  },
  emerald: {
    iconBg: "bg-[#ECFDF5]",
    iconText: "text-[#059669]",
    iconHoverBg: "group-hover:bg-[#059669]",
    tagText: "text-[#047857]",
    tagBg: "bg-[#ECFDF5]",
    topLine: "bg-[#059669]",
    titleHover: "group-hover:text-[#059669]",
  },
  indigo: {
    iconBg: "bg-[#EEF2FF]",
    iconText: "text-[#4F46E5]",
    iconHoverBg: "group-hover:bg-[#4F46E5]",
    tagText: "text-[#4338CA]",
    tagBg: "bg-[#EEF2FF]",
    topLine: "bg-[#4F46E5]",
    titleHover: "group-hover:text-[#4F46E5]",
  },
  amber: {
    iconBg: "bg-[#FFFBEB]",
    iconText: "text-[#D97706]",
    iconHoverBg: "group-hover:bg-[#D97706]",
    tagText: "text-[#B45309]",
    tagBg: "bg-[#FFFBEB]",
    topLine: "bg-[#D97706]",
    titleHover: "group-hover:text-[#D97706]",
  },
  purple: {
    iconBg: "bg-[#F5F3FF]",
    iconText: "text-[#7C3AED]",
    iconHoverBg: "group-hover:bg-[#7C3AED]",
    tagText: "text-[#6D28D9]",
    tagBg: "bg-[#F5F3FF]",
    topLine: "bg-[#7C3AED]",
    titleHover: "group-hover:text-[#7C3AED]",
  },
  blue: {
    iconBg: "bg-[#EFF6FF]",
    iconText: "text-[#2563EB]",
    iconHoverBg: "group-hover:bg-[#2563EB]",
    tagText: "text-[#1D4ED8]",
    tagBg: "bg-[#EFF6FF]",
    topLine: "bg-[#2563EB]",
    titleHover: "group-hover:text-[#2563EB]",
  },
  orange: {
    iconBg: "bg-[#FFF7ED]",
    iconText: "text-[#EA580C]",
    iconHoverBg: "group-hover:bg-[#EA580C]",
    tagText: "text-[#C2410C]",
    tagBg: "bg-[#FFF7ED]",
    topLine: "bg-[#EA580C]",
    titleHover: "group-hover:text-[#EA580C]",
  },
};

const TaxFilingServices = () => {
  const [selectedCategory, setSelectedCategory] = useState("us-individual");

  const serviceCategories = [
    {
      id: "us-individual",
      label: "US Individual",
      shortLabel: "Individual",
      icon: <DocumentTextIcon className="w-3.5 h-3.5" />,
      accentText: "text-[#127EAB]",
      barColor: "bg-[#127EAB]",
    },
    {
      id: "us-business",
      label: "US Business",
      shortLabel: "Business",
      icon: <BuildingOffice2Icon className="w-3.5 h-3.5" />,
      accentText: "text-[#2563EB]",
      barColor: "bg-[#2563EB]",
    },
    {
      id: "indian-tax",
      label: "Indian & NRI",
      shortLabel: "Indian / NRI",
      icon: <GlobeAltIcon className="w-3.5 h-3.5" />,
      accentText: "text-[#EA580C]",
      barColor: "bg-[#EA580C]",
    },
  ];

  const services = {
    "us-individual": {
      items: [
        {
          title: "Federal, State & Local Filing",
          description: "Complete federal and all 50-state tax filing built to maximize your refund.",
          tag: "Form 1040",
          route: "/services/us-individual/federal-state-local",
          icon: <DocumentTextIcon className="w-5 h-5" />,
          color: "teal",
        },
        {
          title: "FBAR & FATCA Reporting",
          description: "Report foreign bank accounts and overseas assets accurately to avoid IRS penalties.",
          tag: "FinCEN 114",
          route: "/services/us-individual/fbar-fatca",
          icon: <GlobeAltIcon className="w-5 h-5" />,
          color: "coral",
        },
        {
          title: "IRS Audit & Representation",
          description: "Direct CPA support for IRS audit notices, appeals, and penalty relief.",
          tag: "Audit Defense",
          route: "/services/us-individual/representation",
          icon: <ShieldCheckIcon className="w-5 h-5" />,
          color: "emerald",
        },
        {
          title: "ITIN Application & Renewal",
          description: "Fast Form W-7 preparation for non-residents, spouses, and dependents.",
          tag: "Form W-7",
          route: "/services/us-individual/itin",
          icon: <IdentificationIcon className="w-5 h-5" />,
          color: "indigo",
        },
        {
          title: "Tax Extension Filing",
          description: "Get an automatic 6-month filing extension to October 15 with instant IRS confirmation.",
          tag: "Form 4868",
          route: "/services/us-individual/extension",
          icon: <ClockIcon className="w-5 h-5" />,
          color: "amber",
        },
        {
          title: "Prior Year Amendments",
          description: "Fix past tax returns to claim missed credits or recover unclaimed refunds.",
          tag: "Form 1040-X",
          route: "/services/us-individual/extension",
          icon: <ArrowPathIcon className="w-5 h-5" />,
          color: "purple",
        },
      ],
    },
    "us-business": {
      items: [
        {
          title: "US Business Incorporations",
          description: "Form your LLC, C-Corp, or S-Corp with state filings and fast federal EIN setup.",
          tag: "Entity Setup",
          route: "/services/us-business/incorporations",
          icon: <BuildingOffice2Icon className="w-5 h-5" />,
          features: ["LLC, C-Corp & S-Corp formation", "Federal EIN in 24–48 hours"],
          color: "teal",
        },
        {
          title: "Small & Medium Business Filing",
          description: "Accurate corporate tax filing with full business deductions and multi-state support.",
          tag: "1120 / 1065",
          route: "/services/us-business/smb-tax-filing",
          icon: <BriefcaseIcon className="w-5 h-5" />,
          features: ["Forms 1120, 1120-S & 1065", "Quarterly estimated filings"],
          color: "blue",
        },
        {
          title: "Corporate CPA Tax Advisory",
          description: "Year-round CPA planning to structure your entity and reduce business tax liability.",
          tag: "CPA Advisory",
          route: "/services/us-business/smb-tax-filing",
          icon: <UserGroupIcon className="w-5 h-5" />,
          features: ["1-on-1 corporate CPA guidance", "Payroll & tax minimization"],
          color: "coral",
        },
      ],
    },
    "indian-tax": {
      items: [
        {
          title: "Indian Income Tax Filing",
          description: "Complete ITR e-filing for residents and NRIs covering salary, capital gains, and DTAA.",
          tag: "ITR-1 to 7",
          route: "/services/indian/tax-filing",
          icon: <DocumentCheckIcon className="w-5 h-5" />,
          features: ["ITR-1 through ITR-7 e-filing", "DTAA & NRE/NRO compliance"],
          color: "orange",
        },
        {
          title: "Indian Tax Representation",
          description: "Authorized defense before Indian Income Tax authorities for notices and appeals.",
          tag: "IT Authorities",
          route: "/services/indian/representation",
          icon: <ScaleIcon className="w-5 h-5" />,
          features: ["Notice 148 / 143(2) responses", "Faceless hearings & appeals"],
          color: "emerald",
        },
        {
          title: "NRI Cross-Border Advisory",
          description: "Guidance on Indian assets, FEMA compliance, and smooth international fund transfers.",
          tag: "FEMA & DTAA",
          route: "/services/indian/tax-filing",
          icon: <BanknotesIcon className="w-5 h-5" />,
          features: ["Form 15CA / 15CB certification", "Dual-country tax planning"],
          color: "indigo",
        },
      ],
    },
  };

  const activeData = services[selectedCategory];

  return (
    <section id="services" className="relative py-10 sm:py-12 bg-white font-sans overflow-hidden">
      <div className="relative max-w-7xl 2xl:max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* Clean Compact Header */}
        <div className="flex flex-col items-center text-center mb-9 sm:mb-11">
          <div>
            {/* <div className="pill-badge mb-2.5">
              <span className="w-2 h-2 rounded-full bg-teal animate-pulse" />
              <span>Full-Service Tax Preparation</span>
            </div> */}
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-normal text-primary tracking-tight leading-[1.2]">
              Explore Our{" "}
              <span className="font-medium text-teal">Filing Services</span>
            </h2>
          </div>

          {/* <p className="text-[15px] sm:text-base text-slate-600 font-medium leading-relaxed max-w-md mt-2">
            Simple, CPA-backed tax filing for US individuals, businesses, and NRIs.
          </p> */}
        </div>

        {/* Clean Underline Tabs */}
        <div
          role="tablist"
          aria-label="Tax filing categories"
          className="flex items-center gap-4 sm:gap-7 border-b border-slate-200 py-3 mb-5 overflow-x-auto no-scrollbar"
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
                className={`relative pb-2.5 pt-0.5 inline-flex items-center gap-1.5 text-xs sm:text-[13.5px] font-medium whitespace-nowrap transition-colors cursor-pointer shrink-0 ${isActive
                  ? "text-primary"
                  : "text-slate-500 hover:text-primary"
                  }`}
              >
                <span className={isActive ? cat.accentText : "text-slate-400"}>
                  {cat.icon}
                </span>
                <span>
                  <span className="hidden sm:inline">{cat.label}</span>
                  <span className="inline sm:hidden">{cat.shortLabel}</span>
                </span>
                <span
                  className={`inline-flex items-center justify-center px-1.5 py-0.5 rounded-full text-[10.5px] font-medium ${isActive
                    ? "bg-primary text-white"
                    : "bg-slate-100 text-slate-600"
                    }`}
                >
                  {count}
                </span>

                {isActive && (
                  <motion.span
                    layoutId="serviceTabUnderline"
                    transition={{ type: "spring", stiffness: 420, damping: 32 }}
                    className={`absolute left-0 right-0 bottom-0 h-[2px] rounded-full ${cat.barColor}`}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Clean Compact Hairline Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory}
            role="tabpanel"
            id={`panel-${selectedCategory}`}
            aria-labelledby={`tab-${selectedCategory}`}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-2xs"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-slate-200/80">
              {activeData.items.map((item, idx) => {
                const theme = colorThemes[item.color] || colorThemes.teal;
                return (
                  <Link
                    key={`${selectedCategory}-${idx}`}
                    to={item.route || "/login"}
                    className="group relative bg-white hover:bg-[#F7FBFD] px-4 py-4 sm:px-5 sm:py-4 transition-colors duration-200 flex flex-col justify-between text-left"
                  >
                    {/* Crisp Top Hover Accent */}
                    <span
                      className={`absolute top-0 left-0 right-0 h-[2.5px] ${theme.topLine} scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-200`}
                    />

                    <div>
                      {/* Icon + Form Tag */}
                      <div className="flex items-center justify-between gap-2.5 mb-2.5">
                        <div
                          className={`w-9 h-9 rounded-lg ${theme.iconBg} ${theme.iconText} ${theme.iconHoverBg} group-hover:text-white flex items-center justify-center shrink-0 transition-colors duration-200`}
                        >
                          {item.icon}
                        </div>

                        <span
                          className={`px-2 py-0.5 rounded-md text-[11.5px] sm:text-xs font-semibold ${theme.tagBg} ${theme.tagText}`}
                        >
                          {item.tag}
                        </span>
                      </div>

                      {/* Clear Compact Title */}
                      <h3
                        className={`text-[15px] sm:text-[16px] font-semibold text-primary ${theme.titleHover} transition-colors leading-snug`}
                      >
                        {item.title}
                      </h3>

                      {/* Clean Compact Medium-Weight Description */}
                      <p className="text-[13px] sm:text-[13.5px] text-slate-600 font-medium leading-relaxed mt-1.5">
                        {item.description}
                      </p>

                      {/* Simple Bullet Points for 3-Item Categories */}
                      {item.features && (
                        <ul className="mt-2.5 space-y-1">
                          {item.features.map((feat, fIdx) => (
                            <li
                              key={fIdx}
                              className="flex items-center gap-1.5 text-[12.5px] sm:text-[13px] font-medium text-slate-700"
                            >
                              <CheckIcon
                                className={`w-3.5 h-3.5 shrink-0 stroke-[2.5] ${theme.iconText}`}
                              />
                              <span>{feat}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>

                    {/* Clean Minimal Link Row */}
                    <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between">
                      <span
                        className={`inline-flex items-center gap-1.5 text-[13px] font-semibold text-primary ${theme.titleHover} transition-colors`}
                      >
                        <span>Start Filing</span>
                        <ArrowRightIcon className="w-3.5 h-3.5 stroke-[2.2] group-hover:translate-x-1 transition-transform" />
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
