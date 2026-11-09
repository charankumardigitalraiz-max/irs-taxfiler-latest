import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  DocumentTextIcon,
  BuildingOffice2Icon,
  IdentificationIcon,
  GlobeAltIcon,
  ShieldCheckIcon,
  ClockIcon,
  ArrowRightIcon,
  ScaleIcon,
  BriefcaseIcon,
  SparklesIcon,
  LockClosedIcon,
  CalendarDaysIcon,
  CheckBadgeIcon,
} from "@heroicons/react/24/outline";

import SEO from "../components/seo/SEO";
import LeadModal from "../components/popup";
import Logo from "../assets/irsLogo.png";

// Visual Showcases
import usaTaxHeroPhoto from "../assets/tax-corporate-services-isometric.jpg";
import teamVisual from "../assets/about-mission-team.jpg";

const Services = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const title = "All U.S. & Indian Tax Filing Services | CPA-Reviewed | IRS Tax Filer";
  const description =
    "Complete directory of professional U.S. federal, state, corporate, and Indian NRI tax filing services. CPA-reviewed Form 1040, Form 1120, FBAR, ITIN, and DTAA tax treaty compliance.";
  const keywords =
    "tax services directory, US tax filing, Form 1040, Form 1120, FBAR FATCA, ITIN W-7, business incorporation, Indian ITR, IRS representation, IRS Tax Filer";
  const canonical = window.location.href;
  const image = Logo;

  const allServices = [
    // U.S. Individual (5)
    {
      id: "federal-state-local",
      category: "individual",
      categoryLabel: "U.S. Individual",
      title: "Federal, State & Local Tax Filing",
      form: "Form 1040 & SALT",
      tag: "Individual & Family",
      icon: <DocumentTextIcon className="w-4 h-4 text-[#165479]" />,
      route: "/services/us-individual/federal-state-local",
      description:
        "Full-service federal Form 1040, 50-state SALT allocations, and municipal tax preparation with exhaustive deduction discovery.",
      compliance: "IRS Direct e-File",
    },
    {
      id: "fbar-fatca",
      category: "individual",
      categoryLabel: "U.S. Individual",
      title: "FBAR & FATCA Asset Reporting",
      form: "FinCEN 114 & Form 8938",
      tag: "Foreign Assets",
      icon: <GlobeAltIcon className="w-4 h-4 text-[#749220]" />,
      route: "/services/us-individual/fbar-fatca",
      description:
        "Mandatory disclosure for overseas bank accounts, foreign mutual funds, PF, and pensions to protect against catastrophic IRS penalties.",
      compliance: "FinCEN & IRS Compliant",
    },
    {
      id: "representation",
      category: "individual",
      categoryLabel: "U.S. Individual",
      title: "IRS Representation & Audit Defense",
      form: "Form 2848 POA",
      tag: "Notice Defense",
      icon: <ShieldCheckIcon className="w-4 h-4 text-[#165479]" />,
      route: "/services/us-individual/representation",
      description:
        "Licensed CPA representation for CP2000 notice responses, audit examinations, and penalty abatement so you never talk to the IRS alone.",
      compliance: "Licensed CPA Defense",
    },
    {
      id: "itin",
      category: "individual",
      categoryLabel: "U.S. Individual",
      title: "ITIN Application & Renewal",
      form: "Form W-7 Certified",
      tag: "Non-Resident ID",
      icon: <IdentificationIcon className="w-4 h-4 text-[#749220]" />,
      route: "/services/us-individual/itin",
      description:
        "IRS Certified Acceptance Agent (CAA) verification for non-resident filers, spouses, and dependents without mailing original passports.",
      compliance: "IRS CAA Certified",
    },
    {
      id: "extension",
      category: "individual",
      categoryLabel: "U.S. Individual",
      title: "Automatic Tax Extension Filing",
      form: "Form 4868 & 7004",
      tag: "6-Month Extension",
      icon: <ClockIcon className="w-4 h-4 text-[#165479]" />,
      route: "/services/us-individual/extension",
      description:
        "Secure an automatic 6-month extension to October 15 with instant IRS confirmation, avoiding late-filing penalties.",
      compliance: "Instant IRS Confirmation",
    },

    // U.S. Corporate & Business (2)
    {
      id: "incorporations",
      category: "business",
      categoryLabel: "U.S. Corporate",
      title: "Business Incorporations & LLC Setup",
      form: "Entity Formation",
      tag: "Company Launch",
      icon: <BuildingOffice2Icon className="w-4 h-4 text-[#165479]" />,
      route: "/services/us-business/incorporations",
      description:
        "Turnkey entity formation in Delaware, Wyoming, Texas, California, and all 50 states with registered agent and EIN acquisition.",
      compliance: "All 50 States Approved",
    },
    {
      id: "smb-tax-filing",
      category: "business",
      categoryLabel: "U.S. Corporate",
      title: "Small & Medium Business Tax Filing",
      form: "Form 1120, 1120-S, 1065",
      tag: "Corporate Tax",
      icon: <BriefcaseIcon className="w-4 h-4 text-[#749220]" />,
      route: "/services/us-business/smb-tax-filing",
      description:
        "Complete corporate returns for LLCs, S-Corporations, Partnerships, and Schedule C with shareholder K-1s and deduction optimization.",
      compliance: "100% CPA-Prepared",
    },

    // Indian & NRI (2)
    {
      id: "indian-tax-filing",
      category: "indian",
      categoryLabel: "Indian & NRI",
      title: "Indian Tax Filing (ITR)",
      form: "ITR-1 through ITR-5",
      tag: "NRI Compliance",
      icon: <GlobeAltIcon className="w-4 h-4 text-[#165479]" />,
      route: "/services/indian/tax-filing",
      description:
        "Expert Indian ITR preparation for NRIs and global residents. Form 26AS/AIS reconciliation, ancestral property capital gains, and DTAA relief.",
      compliance: "DTAA Treaty Relieved",
    },
    {
      id: "indian-representation",
      category: "indian",
      categoryLabel: "Indian & NRI",
      title: "Indian Tax Representation & Scrutiny",
      form: "IT Dept Defense",
      tag: "Notice Response",
      icon: <ScaleIcon className="w-4 h-4 text-[#749220]" />,
      route: "/services/indian/representation",
      description:
        "Chartered Accountant representation before the Income Tax Department for scrutiny notices, high-value transaction inquiries, and appeals.",
      compliance: "Chartered Accountant Liaison",
    },
  ];

  // Client Security & Trust Standards
  const trustStandards = [
    {
      icon: <LockClosedIcon className="w-5 h-5 text-[#165479]" />,
      title: "256-Bit Bank-Grade Encryption",
      detail: "End-to-end encrypted file vault protecting all financial records and tax returns.",
    },
    {
      icon: <CheckBadgeIcon className="w-5 h-5 text-[#749220]" />,
      title: "Dual-CPA Quality Review",
      detail: "Every return is cross-checked line-by-line by licensed CPAs prior to submission.",
    },
    {
      icon: <ShieldCheckIcon className="w-5 h-5 text-[#165479]" />,
      title: "Audit Shield Protection",
      detail: "Full representation and response assistance included with every tax filing.",
    },
    {
      icon: <SparklesIcon className="w-5 h-5 text-[#749220]" />,
      title: "Maximum Refund Guarantee",
      detail: "We audit every legal deduction and credit to guarantee your highest legitimate refund.",
    },
  ];

  return (
    <div className="bg-white text-gray-900 font-sans antialiased min-h-screen">
      <SEO
        title={title}
        description={description}
        canonical={canonical}
        image={image}
        keywords={keywords}
      />

      {/* 1. EDITORIAL DIRECTORY HERO: MATCHES HOME HERO EXACT TYPOGRAPHY */}
      <section className="relative overflow-hidden pt-6 sm:pt-8 lg:pt-10 pb-12 sm:pb-16 lg:pb-14 bg-white border-b border-slate-100">
        <div className="absolute top-0 right-10 w-[500px] h-[500px] bg-gradient-to-bl from-[#165479]/[0.05] via-[#749220]/[0.04] to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl 2xl:max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 xl:gap-10 items-center">
            {/* Left Content Column - Matches Home Hero Typography exactly */}
            <div className="order-2 lg:order-1 lg:col-span-7 xl:col-span-7 lg:pr-6 xl:pr-10 font-sans text-left">
              {/* Eyebrow Pill Badge */}
              {/* <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F6F9EE] border border-[#749220]/30 shadow-2xs mb-4 text-xs font-medium text-[#749220]">
                <span className="w-2 h-2 rounded-full bg-[#749220]" />
                <span>Official IRS e-File Provider & Licensed CPA Practice</span>
              </div> */}

              {/* Master Headline - Matches Home Hero Typography exactly */}
              <h1
                style={{ lineHeight: 1.18 }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-[44px] xl:text-[48px] 2xl:text-[52px] font-normal text-gray-900 tracking-tight mb-4 sm:mb-5"
              >
                Complete Tax Filing & Corporate Services, <br className="hidden sm:inline" />
                <span className="font-medium bg-gradient-to-r from-[#0A4973] via-[#165479] to-[#749220] bg-clip-text text-transparent">
                  Tailored for Global Taxpayers.
                </span>
              </h1>

              {/* Subheading - Matches Home Hero Typography exactly */}
              <p className="text-sm sm:text-base lg:text-[17px] text-gray-600 font-normal leading-[30px] sm:leading-[32px] lg:leading-[34px] mb-6 max-w-2xl">
                Explore our comprehensive suite of 9 federal, 50-state, business entity, and cross-border Indian tax services. Every engagement is prepared by licensed CPAs with guaranteed deduction optimization.
              </p>

              {/* CTA Action Buttons - Matches Home Hero Buttons exactly */}
              <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 sm:gap-4 mb-6">
                <Link
                  to="/login"
                  className="relative inline-flex items-center justify-center gap-2.5 h-11 sm:h-12 px-5 sm:px-6 rounded-xl bg-gradient-to-r from-[#0C3D5A] via-[#165479] to-[#1A5B82] hover:from-[#09324A] hover:via-[#134969] hover:to-[#165479] text-white font-medium text-sm sm:text-[15px] shadow-[0_6px_20px_-3px_rgba(22,84,121,0.35),inset_0_1px_1px_rgba(255,255,255,0.25)] border border-white/20 hover:border-[#749220]/60 hover:shadow-[0_8px_24px_-3px_rgba(116,146,32,0.35)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 group overflow-hidden shrink-0"
                >
                  <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-700 ease-out pointer-events-none" />
                  <span className="relative z-10 tracking-tight">Start Filing</span>
                  <ArrowRightIcon className="relative z-10 w-4 h-4 stroke-[2.5] group-hover:translate-x-1 transition-transform" />
                </Link>

                <button
                  type="button"
                  onClick={handleOpenModal}
                  className="relative inline-flex items-center justify-center gap-2.5 h-11 sm:h-12 px-5 sm:px-6 rounded-xl bg-white hover:bg-[#F6F9EE] text-[#165479] hover:text-[#0A4973] border-2 border-[#165479]/15 hover:border-[#749220] font-medium text-sm sm:text-[15px] shadow-[0_2px_8px_rgba(22,84,121,0.06)] hover:shadow-[0_6px_20px_-3px_rgba(116,146,32,0.25)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 group cursor-pointer shrink-0"
                >
                  <CalendarDaysIcon className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-[#749220] group-hover:scale-110 transition-transform stroke-[2.2]" />
                  <span className="tracking-tight">Talk to CPA</span>
                </button>
              </div>

              {/* Trust Tag */}
              <div className="pt-4 border-t border-slate-100 flex items-center gap-2 text-xs text-gray-500">
                <ShieldCheckIcon className="w-4 h-4 text-[#749220] shrink-0" />
                <span className="font-medium text-gray-800">100% CPA Audit Shield</span>
                <span className="text-gray-300">•</span>
                <span>Maximum Legal Refund Guarantee</span>
              </div>
            </div>

            {/* Right Column: High-Impact Hero Image Showcase */}
            <div className="order-1 lg:order-2 lg:col-span-5 xl:col-span-5 relative flex justify-center lg:justify-end">
              <div className="relative w-full max-w-[540px] xl:max-w-[580px]">
                <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-200/90  bg-white group">
                  <img
                    src={usaTaxHeroPhoto}
                    alt="U.S. and Indian Tax Filing Services Consultation and Compliance"
                    className="w-full h-[340px] sm:h-[400px] lg:h-[450px] xl:h-[490px] object-cover transition-transform duration-500 group-hover:scale-[1.01]"
                    loading="eager"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. MASTER SERVICES GRID: COMPACT & REFINED CARDS */}
      <section className="py-10 sm:py-14 bg-slate-50/60 border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {allServices.map((service) => (
              <div
                key={service.id}
                className="p-4 sm:p-5 rounded-xl bg-white border border-slate-200/90 shadow-2xs hover:border-[#165479]/30 hover:shadow-sm transition-all duration-200 text-left flex flex-col justify-between group"
              >
                <div>
                  {/* Top Row: Icon + Form Badge */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="w-8 h-8 rounded-lg bg-sky-50 border border-sky-100 flex items-center justify-center shrink-0 text-[#165479]">
                      {service.icon}
                    </div>

                    <span className="text-[10.5px] font-medium px-2 py-0.5 rounded-md border bg-sky-50 text-[#165479] border-sky-100">
                      {service.form}
                    </span>
                  </div>

                  {/* Service Title */}
                  <Link to={service.route}>
                    <h3 className="text-sm sm:text-base font-semibold text-gray-900 group-hover:text-[#165479] transition-colors mb-1.5 leading-snug">
                      {service.title}
                    </h3>
                  </Link>

                  {/* Overview Description */}
                  <p className="text-xs sm:text-[13px] text-gray-600 font-normal leading-relaxed">
                    {service.description}
                  </p>
                </div>

                {/* Card Bottom: Link + Compliance Status */}
                <div className="pt-3 mt-3.5 border-t border-slate-100 flex items-center justify-between text-xs">
                  <Link
                    to={service.route}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#165479] group-hover:text-[#749220] transition-colors"
                  >
                    <span>Explore Service</span>
                    <ArrowRightIcon className="w-3.5 h-3.5 stroke-[2.2] group-hover:translate-x-1 transition-transform" />
                  </Link>

                  <span className="text-[10px] text-emerald-600 font-medium">
                    {service.compliance}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. CLIENT SECURITY & CPA OPERATIONAL COMMITMENTS */}
      <section className="py-12 sm:py-16 bg-white border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Visual Team & Credential Card (Left - 5 Cols) */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden border border-slate-200/90 shadow-2xs group">
                <img
                  src={teamVisual}
                  alt="Licensed CPAs and Chartered Accountants Tax Defense Team"
                  className="w-full h-72 sm:h-80 lg:h-96 object-cover transition-transform duration-500 group-hover:scale-102"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A4973]/95 via-[#0A4973]/40 to-transparent flex flex-col justify-end p-6 text-white text-left">
                  <span className="text-[10.5px] font-bold uppercase tracking-wider text-lime-300 mb-1">
                    Licensed Practice
                  </span>
                  <h3 className="text-lg font-semibold text-white mb-1.5 leading-snug">
                    U.S. CPAs & Indian Chartered Accountants
                  </h3>
                  <p className="text-xs text-sky-100 font-normal leading-relaxed">
                    Decades of combined Big-4 and cross-border advisory expertise providing rigorous compliance and direct audit defense across all 50 U.S. states and India.
                  </p>
                </div>
              </div>
            </div>

            {/* Standards & Commitments (Right - 7 Cols) */}
            <div className="lg:col-span-7 text-left">
              <div className="mb-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F6F9EE] border border-[#749220]/30 text-xs font-medium text-[#749220] mb-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#749220]" />
                  <span>Security & Integrity Assured</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-normal text-gray-900 tracking-tight">
                  Our CPA Standard of Practice
                </h2>
                <p className="text-xs sm:text-sm text-gray-500 font-normal mt-1.5">
                  Enterprise encryption, dual-credential quality audits, and guaranteed deduction discovery.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {trustStandards.map((std, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-md text-left hover:border-[#165479]/30 transition-colors"
                  >
                    {/* <div className="w-9 h-9 rounded-xl bg-white border border-slate-200/60 flex items-center justify-center shrink-0 mb-3 shadow-2xs">
                      {std.icon}
                    </div> */}
                    <h3 className="text-sm font-semibold text-gray-900 mb-1 leading-snug">
                      {std.title}
                    </h3>
                    <p className="text-xs text-gray-700 font-normal leading-[30px] sm:leading-[32px] lg:leading-[20px] ">
                      {std.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CONSULTATION CALL TO ACTION */}
      <section className="py-12 sm:py-16 bg-[#0A4973] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-normal tracking-tight text-white mb-2">
            Need Guidance on the Right Filing Path?
          </h2>
          <p className="text-xs sm:text-sm text-sky-100 max-w-xl mx-auto mb-6">
            Schedule a direct discovery call with our licensed CPAs and Chartered Accountants to review your tax requirements.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/login"
              className="inline-flex items-center justify-center gap-2 h-11 px-6 rounded-xl bg-[#749220] hover:bg-[#637d1b] text-white font-medium text-xs sm:text-sm transition-all shadow-md group"
            >
              <span>Get Started Now</span>
              <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <button
              type="button"
              onClick={handleOpenModal}
              className="inline-flex items-center justify-center gap-2 h-11 px-5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium text-xs sm:text-sm border border-white/20 transition-all cursor-pointer"
            >
              <CalendarDaysIcon className="w-4 h-4 stroke-[2]" />
              <span>Schedule CPA Discovery Call</span>
            </button>
          </div>
        </div>
      </section>

      {/* Lead Generation Consultation Modal */}
      <LeadModal
        open={isModalOpen}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        serviceName="All Services Directory"
      />
    </div>
  );
};

export default Services;
