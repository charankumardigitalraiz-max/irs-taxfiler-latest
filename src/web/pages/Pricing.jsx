import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowRightIcon,
  DocumentTextIcon,
  BanknotesIcon,
  CalendarDaysIcon,
  UserGroupIcon,
  BuildingOfficeIcon,
  ChartBarIcon,
  CheckCircleIcon,
  AcademicCapIcon,
  GlobeAltIcon,
  CurrencyDollarIcon,
  ShieldCheckIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline';
import SEO from '../components/seo/SEO';
import Logo from '../assets/irsLogo.png';
import ctaBg from '../assets/cta-banner-bg.jpg';

const Pricing = () => {


  const services = [
    {
      name: 'ITIN Application (Form W-7)',
      price: 'FREE',
      icon: DocumentTextIcon,
      isFree: true,
      color: {
        rowBg: 'bg-orange-50/50 hover:bg-orange-50/80',
        icon: 'bg-white text-orange-600 border-orange-200/80 shadow-2xs',
        badge: 'bg-white text-orange-600 border-orange-200/80 shadow-2xs',
      },
    },
    {
      name: 'Federal & State Filing Extensions',
      price: 'FREE',
      icon: CalendarDaysIcon,
      isFree: true,
      color: {
        rowBg: 'bg-sky-50/50 hover:bg-sky-50/80',
        icon: 'bg-white text-[#127EAB] border-[#127EAB]/25 shadow-2xs',
        badge: 'bg-white text-[#127EAB] border-[#127EAB]/25 shadow-2xs',
      },
    },
    {
      name: 'W-4 Withholding Assistance',
      price: 'FREE',
      icon: UserGroupIcon,
      isFree: true,
      color: {
        rowBg: 'bg-lime-50/50 hover:bg-lime-50/80',
        icon: 'bg-white text-lime-700 border-lime-200/80 shadow-2xs',
        badge: 'bg-white text-lime-700 border-lime-200/80 shadow-2xs',
      },
    },
    {
      name: 'FBAR Filing (FinCEN Form 114)',
      price: 'FREE',
      icon: BanknotesIcon,
      isFree: true,
      color: {
        rowBg: 'bg-fuchsia-50/50 hover:bg-fuchsia-50/80',
        icon: 'bg-white text-fuchsia-600 border-fuchsia-200/80 shadow-2xs',
        badge: 'bg-white text-fuchsia-600 border-fuchsia-200/80 shadow-2xs',
      },
    },
    {
      name: 'Federal Tax Return (Form 1040)',
      price: '$30',
      priceNote: '$40 if both taxpayer and spouse have taxable income',
      icon: DocumentTextIcon,
      isFree: false,
      color: {
        rowBg: 'bg-blue-50/50 hover:bg-blue-50/80',
        icon: 'bg-white text-blue-600 border-blue-200/80 shadow-2xs',
        text: 'text-blue-600',
      },
    },
    {
      name: 'State & Local Tax Return',
      price: '$30',
      icon: BuildingOfficeIcon,
      isFree: false,
      color: {
        rowBg: 'bg-emerald-50/50 hover:bg-emerald-50/80',
        icon: 'bg-white text-emerald-600 border-emerald-200/80 shadow-2xs',
        text: 'text-emerald-600',
      },
    },
    {
      name: 'Non-Resident Tax Return (1040-NR)',
      price: '$30',
      icon: DocumentTextIcon,
      isFree: false,
      color: {
        rowBg: 'bg-cyan-50/50 hover:bg-cyan-50/80',
        icon: 'bg-white text-cyan-600 border-cyan-200/80 shadow-2xs',
        text: 'text-cyan-600',
      },
    },
    {
      name: 'Schedule A (Itemized Deductions)',
      price: '$70',
      icon: ChartBarIcon,
      isFree: false,
      color: {
        rowBg: 'bg-amber-50/50 hover:bg-amber-50/80',
        icon: 'bg-white text-amber-600 border-amber-200/80 shadow-2xs',
        text: 'text-amber-600',
      },
    },
    {
      name: 'Schedule C (Business / 1099)',
      price: '$50',
      icon: ChartBarIcon,
      isFree: false,
      color: {
        rowBg: 'bg-purple-50/50 hover:bg-purple-50/80',
        icon: 'bg-white text-purple-600 border-purple-200/80 shadow-2xs',
        text: 'text-purple-600',
      },
    },
    {
      name: 'Schedule E (Rental Property)',
      price: '$35',
      icon: ChartBarIcon,
      isFree: false,
      color: {
        rowBg: 'bg-rose-50/50 hover:bg-rose-50/80',
        icon: 'bg-white text-[#EE6450] border-[#EE6450]/30 shadow-2xs',
        text: 'text-[#EE6450]',
      },
    },
    {
      name: 'Schedule D (Capital Gains & Stocks)',
      price: '$15',
      icon: CurrencyDollarIcon,
      isFree: false,
      color: {
        rowBg: 'bg-teal-50/50 hover:bg-teal-50/80',
        icon: 'bg-white text-teal-600 border-teal-200/80 shadow-2xs',
        text: 'text-teal-600',
      },
    },
    {
      name: 'Education Credit (Form 8863)',
      price: '$15',
      icon: AcademicCapIcon,
      isFree: false,
      color: {
        rowBg: 'bg-violet-50/50 hover:bg-violet-50/80',
        icon: 'bg-white text-violet-600 border-violet-200/80 shadow-2xs',
        text: 'text-violet-600',
      },
    },
    {
      name: 'Foreign Tax Credit (Form 1116)',
      price: '$15',
      icon: GlobeAltIcon,
      isFree: false,
      color: {
        rowBg: 'bg-indigo-50/50 hover:bg-indigo-50/80',
        icon: 'bg-white text-indigo-600 border-indigo-200/80 shadow-2xs',
        text: 'text-indigo-600',
      },
    },

  ];

  const title = "Pricing & Plans | IRS Tax Filer";
  const description = "See transparent pricing and plans for US & Indian tax filing and compliance services at IRS Tax Filer. Choose the right plan for you.";
  const keywords = "File taxes for free,IRS E file,Free tax filing for low incom,How to file previous years taxes for free,Best free tax filing,tax filing pricing, IRS Tax Filer pricing, US tax filing cost, Indian tax filing cost";
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

      <div className="min-h-screen bg-white font-sans text-primary antialiased">

        {/* ========================================================================= */}
        {/* 1. PRICING & SERVICES SECTION (CLEAN 2-COLUMN INFORMATIONAL RATE SCHEDULE) */}
        {/* ========================================================================= */}
        <section id="pricing-table" className="relative overflow-hidden pt-10 pb-10 sm:pt-12 sm:pb-12 bg-white">
          {/* Subtle Ambient Background Gradients */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none overflow-hidden -z-10">
            <div className="absolute -top-24 left-1/4 w-96 h-96 bg-[#127EAB]/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -top-20 right-1/4 w-80 h-80 bg-[#EE6450]/5 rounded-full blur-3xl pointer-events-none" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* Centered Headline */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-2xl mx-auto text-center mb-8 sm:mb-10"
            >
              <h1 className="text-2xl sm:text-3xl lg:text-[34px] font-semibold text-primary tracking-tight leading-snug">
                Transparent Pricing & <span className="text-teal">No Hidden</span> <span className="text-coral">Fees</span>
              </h1>
            </motion.div>

            {/* Informational Rate Schedule Table (2-Column: Service & Fee) */}
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-2xl border border-[#CCDCE1] shadow-sm overflow-hidden">
                {/* Table Header */}
                <div className="flex items-center justify-between px-5 sm:px-6 py-3.5 bg-slate-50 border-b border-slate-200/80 text-[11px] sm:text-xs font-semibold text-[#6F7F8E] uppercase tracking-wider">
                  <span>Tax Filing Service</span>
                  <span>Filing Fee</span>
                </div>

                {/* Table Rows with Distinct Backgrounds */}
                <div className="divide-y divide-slate-200/60">
                  {services.map((service) => {
                    const IconComponent = service.icon;
                    const isFree = service.isFree;

                    return (
                      <div
                        key={service.name}
                        className={`group px-5 py-3.5 sm:px-6 sm:py-4 bg-white transition-colors duration-150`}
                      >
                        <div className="flex items-center justify-between gap-4">
                          {/* Left: Distinct Color Icon + Service Name */}
                          <div className="flex items-center gap-3 sm:gap-3.5 min-w-0 flex-1">
                            <div
                              className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center shrink-0 border ${service.color.icon} transition-transform duration-200 group-hover:scale-105`}
                            >
                              <IconComponent className="w-4 h-4 sm:w-5 sm:h-5 stroke-[1.75]" />
                            </div>

                            <div className="min-w-0 flex-1">
                              <h3 className="text-sm sm:text-[15px] font-semibold text-primary leading-snug">
                                {service.name}
                              </h3>
                              {service.priceNote && (
                                <p className="text-[11px] text-[#127EAB] font-medium mt-0.5">
                                  Note: {service.priceNote}
                                </p>
                              )}
                            </div>
                          </div>

                          {/* Right: Price */}
                          <div className="shrink-0 text-right">
                            {isFree ? (
                              <span
                                className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold border ${service.color.badge || 'bg-[#E9F7FA] text-teal border-[#127EAB]/25'
                                  }`}
                              >
                                FREE
                              </span>
                            ) : (
                              <div className="flex items-baseline justify-end gap-1">
                                <span className={`text-base sm:text-lg font-bold ${service.color.text || 'text-primary'} tracking-tight`}>
                                  {service.price}
                                </span>
                                <span className="text-[13px] text-[#6F7F8E] font-[500]">
                                  / Filing
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Trust Bar Aligned to Rate Schedule */}
              <div className="mt-8 sm:mt-10 p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200/80">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 md:divide-x divide-slate-200/80">
                  <div className="flex items-start gap-2.5 md:pr-4">
                    <CheckCircleIcon className="w-5 h-5 text-teal shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs sm:text-sm font-semibold text-primary mb-0.5">No Hidden Fees</h4>
                      <p className="text-xs text-[#6F7F8E] leading-relaxed">Upfront transparent pricing with zero surprise add-on charges.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5 pt-3 md:pt-0 md:px-4 border-t md:border-t-0 border-slate-200/80">
                    <AcademicCapIcon className="w-5 h-5 text-teal shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs sm:text-sm font-semibold text-primary mb-0.5">Expert CPA Preparation</h4>
                      <p className="text-xs text-[#6F7F8E] leading-relaxed">Certified tax professionals handle every schedule, deduction, and direct e-file.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5 pt-3 md:pt-0 md:pl-4 border-t md:border-t-0 border-slate-200/80">
                    <ShieldCheckIcon className="w-5 h-5 text-teal shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs sm:text-sm font-semibold text-primary mb-0.5">Accuracy Guarantee</h4>
                      <p className="text-xs text-[#6F7F8E] leading-relaxed">100% accurate calculations with peace-of-mind IRS compliance assurance.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 2. COMPACT CTA SECTION                                                    */}
        {/* ========================================================================= */}
        <section className="py-6 sm:py-8 bg-gradient-to-b from-white via-[#EFF9FB]/60 to-[#E9F7FA]/40 relative overflow-hidden">
          {/* Subtle Ambient Depth */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-28 bg-[#127EAB]/5 rounded-full blur-2xl pointer-events-none" />

          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <h2 className="text-xl sm:text-2xl lg:text-[28px] font-semibold text-primary tracking-tight mb-2 sm:mb-2.5">
              Ready to File with Complete <span className="text-teal">Peace of Mind?</span>
            </h2>

            <p className="text-xs sm:text-sm text-[#6F7F8E] font-normal max-w-lg mx-auto mb-5 sm:mb-6 leading-relaxed">
              Get expert CPA tax preparation with upfront transparent pricing and guaranteed 100% IRS accuracy.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3.5">
              <Link
                to="/login"
                className="inline-flex items-center justify-center gap-2 h-10 sm:h-11 px-6 sm:px-7 rounded-xl bg-primary hover:bg-primary-dark text-white font-semibold text-xs sm:text-sm shadow-sm hover:shadow-md transition-all duration-200 group"
              >
                <span>Get Started Today</span>
                <ArrowRightIcon className="w-4 h-4 stroke-[2.2] group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 h-10 sm:h-11 px-6 sm:px-7 rounded-xl bg-white hover:bg-[#EFF9FB]/50 text-teal hover:text-primary border border-border hover:border-teal font-semibold text-xs sm:text-sm shadow-2xs hover:shadow-sm transition-all duration-200 group"
              >
                <CalendarDaysIcon className="w-4 h-4 text-teal stroke-[2.2] group-hover:scale-110 transition-transform" />
                <span>Talk to a CPA</span>
              </Link>
            </div>
          </div>
        </section>

      </div>
    </>
  );
};

export default Pricing;
