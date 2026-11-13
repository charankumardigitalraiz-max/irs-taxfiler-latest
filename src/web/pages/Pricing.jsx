import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  GiftIcon,
  DocumentTextIcon,
  BanknotesIcon,
  CalendarDaysIcon,
  UserGroupIcon,
  BuildingOfficeIcon,
  ChartBarIcon,
  CheckCircleIcon,
  StarIcon,
  AcademicCapIcon,
  GlobeAltIcon,
  CurrencyDollarIcon,
  ShieldCheckIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline';
import SEO from '../components/seo/SEO';
import Logo from '../assets/irsLogo.png';

// Visual Showcase Asset
import statsVisual from '../assets/accounting-office-desk.jpg';

const Pricing = () => {
  const services = [
    {
      name: 'ITIN Application Process',
      worth: '$20',
      price: 'FREE',
      icon: DocumentTextIcon,
      isFree: true,
      category: 'free',
      description: 'Form W-7 preparation and document verification for non-residents and dependents.',
    },
    {
      name: 'Federal & State Filing Extensions',
      worth: '$20',
      price: 'FREE',
      icon: CalendarDaysIcon,
      isFree: true,
      category: 'free',
      description: 'Automatic 6-month extension with the IRS to avoid costly late-filing penalties.',
    },
    {
      name: 'W4 Assistance Throughout the Year',
      price: 'FREE',
      icon: UserGroupIcon,
      isFree: true,
      category: 'free',
      description: 'Year-round withholding adjustments to optimize your payroll take-home pay.',
    },
    {
      name: 'FBAR Filing',
      price: 'FREE',
      icon: BanknotesIcon,
      isFree: true,
      category: 'free',
      description: 'FinCEN Form 114 reporting for foreign bank and financial asset compliance.',
    },
    {
      name: 'Non Resident Tax Return (1040NR)',
      price: '$30',
      icon: DocumentTextIcon,
      isFree: false,
      category: 'returns',
      description: 'Specialized U.S. return for non-residents, international students, and OPT/CPT filers.',
    },
    {
      name: 'Federal Tax Return',
      price: '$30',
      priceNote: '$40, if Both Taxpayer and Spouse have Taxable Income',
      icon: DocumentTextIcon,
      isFree: false,
      category: 'returns',
      description: 'Complete Form 1040 preparation with exhaustive deduction discovery and direct e-file.',
    },
    {
      name: 'State/Local Tax Return',
      price: '$30',
      icon: BuildingOfficeIcon,
      isFree: false,
      category: 'returns',
      description: 'Individual income tax preparation across all 50 states and local jurisdictions.',
    },
    {
      name: 'Schedule A (Itemized Deductions)',
      price: '$70',
      icon: ChartBarIcon,
      isFree: false,
      category: 'schedules',
      description: 'Maximize write-offs for medical costs, mortgage interest, state taxes, and charity.',
    },
    {
      name: 'Schedule E (US Rental Home)',
      price: '$35',
      icon: ChartBarIcon,
      isFree: false,
      category: 'schedules',
      description: 'Rental real estate income, depreciation schedules, and operational expense write-offs.',
    },
    {
      name: 'Schedule C',
      price: '$50',
      icon: ChartBarIcon,
      isFree: false,
      category: 'schedules',
      description: 'Self-employed, 1099 contractor, and sole proprietor business expense deductions.',
    },
    {
      name: 'Stock Transactions (Schedule D)',
      price: '$15',
      icon: CurrencyDollarIcon,
      isFree: false,
      category: 'schedules',
      description: 'Capital gains and loss calculations for stocks, crypto, RSUs, and investment sales.',
    },
    {
      name: 'Education Credit (Form 8863)',
      price: '$15',
      icon: AcademicCapIcon,
      isFree: false,
      category: 'schedules',
      description: 'Claim American Opportunity or Lifetime Learning credits for tuition and course fees.',
    },
    {
      name: 'Foreign Tax Credit (Form 1116)',
      price: '$15',
      icon: GlobeAltIcon,
      isFree: false,
      category: 'schedules',
      description: 'Double taxation relief on income earned abroad and taxes paid to foreign tax authorities.',
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

      <div className="min-h-screen bg-white font-sans text-gray-900 antialiased">

        {/* ========================================================================= */}
        {/* 1. HERO SECTION (SPLIT: CONTENT + CLEAN 3D FINTECH VISUAL)                */}
        {/* ========================================================================= */}
        <section className="relative overflow-hidden pt-10 pb-14 sm:pt-16 sm:pb-20 bg-white border-b border-slate-100">
          {/* Subtle Ambient Background Gradients */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none overflow-hidden -z-10">
            <div className="absolute -top-24 left-1/4 w-96 h-96 bg-sky-100/50 rounded-full blur-3xl opacity-60" />
            <div className="absolute -top-20 right-1/4 w-80 h-80 bg-lime-100/40 rounded-full blur-3xl opacity-50" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

              {/* Left Column: Headline, Spacious Paragraph & Trust Points */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="lg:col-span-7 xl:col-span-7 text-left"
              >
                {/* Tag Pill */}
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100/80 border border-slate-200/80 mb-5 select-none">
                  <StarIcon className="w-3.5 h-3.5 text-[#749220]" />
                  <span className="text-xs font-medium text-slate-700">Clear & Transparent</span>
                </div>

                {/* Main Headline with Generous Line-to-Line Spacing */}
                <h1 className="text-3xl sm:text-4xl lg:text-[44px] xl:text-[48px] font-normal text-gray-900 tracking-tight leading-[1.28] sm:leading-[1.22] mb-5">
                  Transparent Pricing &{" "}
                  <span className="font-semibold bg-gradient-to-r from-[#0A4973] via-[#165479] to-[#749220] bg-clip-text text-transparent">
                    No Hidden Fees
                  </span>
                </h1>

                {/* Subheading with Airy Line-to-Line Height and Comfortable Paragraph Space */}
                <p className="text-base sm:text-[17px] lg:text-lg text-gray-600 font-normal leading-[32px] sm:leading-[34px] lg:leading-[36px] mb-7 max-w-xl">
                  Choose the services you need. All prices are clear and upfront with no hidden fees.
                </p>

                {/* Key Benefits / Trust Highlights */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8 max-w-lg">
                  <div className="flex items-center gap-2.5 text-xs sm:text-[13px] text-gray-700 font-medium bg-[#F6F9EE] px-4 py-2.5 rounded-xl border border-[#749220]/20">
                    <CheckCircleIcon className="w-4 h-4 text-[#749220] shrink-0" />
                    <span>4 Free Complimentary Services</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs sm:text-[13px] text-gray-700 font-medium bg-sky-50/80 px-4 py-2.5 rounded-xl border border-sky-100">
                    <ShieldCheckIcon className="w-4 h-4 text-[#165479] shrink-0" />
                    <span>100% Upfront Transparent Rates</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center gap-3.5">
                  <a
                    href="#pricing-table"
                    className="px-6 py-3 rounded-full font-medium text-sm text-white bg-[#165479] hover:bg-[#0A4973] shadow-sm hover:shadow-md transition-all duration-200"
                  >
                    View Service Pricing
                  </a>
                  <Link
                    to="/contact"
                    className="px-6 py-3 rounded-full font-medium text-sm text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 hover:border-[#165479] hover:text-[#165479] transition-all duration-200"
                  >
                    Get Free Consultation
                  </Link>
                </div>
              </motion.div>

              {/* Right Column: Clean 3D Fintech Analytics & Pricing Visual */}
              <div className="lg:col-span-5 xl:col-span-5 flex justify-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.15 }}
                  className="relative w-full max-w-[460px] rounded-2xl overflow-hidden border border-slate-200/90 shadow-[0_16px_40px_rgba(22,84,121,0.08)] bg-white group"
                >
                  <img
                    src={statsVisual}
                    alt="Transparent Tax Filing Pricing & Financial Analytics"
                    className="w-full h-auto min-h-[360px] sm:min-h-[400px] max-h-[440px] object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                    loading="eager"
                  />

                  {/* Floating Glass Pill Top */}
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md rounded-xl py-2 px-3.5 shadow-md border border-gray-200/80 flex items-center gap-2 select-none">
                    <span className="w-2 h-2 rounded-full bg-[#749220] animate-pulse" />
                    <span className="text-xs font-semibold text-gray-900">
                      100% Upfront Transparent Rates
                    </span>
                  </div>

                  {/* Floating Glass Pill Bottom */}
                  <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md rounded-xl p-3.5 shadow-md border border-gray-200/80 flex items-center justify-between select-none">
                    <div>
                      <div className="text-[11px] font-medium text-gray-500">Complimentary Support</div>
                      <div className="text-xs font-semibold text-[#165479]">ITIN, Extensions & FBAR</div>
                    </div>
                    <span className="text-xs font-semibold text-[#749220] bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200/60">
                      $0 Setup Fee
                    </span>
                  </div>
                </motion.div>
              </div>

            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 2. PRICING TABLE SECTION                                                  */}
        {/* ========================================================================= */}
        <section id="pricing-table" className="py-14 sm:py-20 bg-slate-50/60 border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            {/* Section Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.4 }}
              className="mb-10 sm:mb-12 text-center"
            >
              <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-normal text-gray-900 tracking-tight leading-[1.25]">
                Service{" "}
                <span className="font-medium bg-gradient-to-r from-[#0A4973] via-[#165479] to-[#749220] bg-clip-text text-transparent">
                  Pricing
                </span>
              </h2>
              <p className="text-sm sm:text-base text-gray-500 font-normal leading-relaxed mt-1.5 max-w-2xl mx-auto">
                Select individual services or choose a complete package. All services include expert preparation and filing.
              </p>
            </motion.div>

            <div className="max-w-6xl 2xl:max-w-7xl mx-auto">

              {/* Complimentary Value Banner */}
              <div className="mb-6 p-3.5 sm:p-4 rounded-2xl bg-[#F6F9EE] border border-[#749220]/25 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-2xs">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-[#749220] text-white flex items-center justify-center shrink-0">
                    <GiftIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-xs sm:text-sm font-semibold text-gray-900 leading-tight">
                      4 Complimentary Tax Services Included at $0
                    </h3>
                    <p className="text-[11px] sm:text-xs text-gray-600 font-normal mt-0.5">
                      ITIN Processing, Federal/State Extensions, W-4 Updates & FBAR included with zero preparation fees.
                    </p>
                  </div>
                </div>
                <span className="text-[11px] font-semibold text-[#749220] bg-white px-2.5 py-1 rounded-full border border-[#749220]/30 shrink-0">
                  $40+ Value Free
                </span>
              </div>

              {/* Clean Symmetrical 3-Column Services Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                {services.map((service, index) => {
                  const IconComponent = service.icon;
                  return (
                    <motion.div
                      key={service.name}
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-30px" }}
                      transition={{ duration: 0.25, delay: index * 0.02 }}
                      className="group bg-white rounded-xl p-5 border border-slate-200 hover:border-[#165479]/40 hover:shadow-sm transition-all duration-200 flex flex-col justify-between text-left"
                    >
                      <div>
                        {/* Header: Icon + Category/Status Pill */}
                        <div className="flex items-center justify-between mb-3.5">
                          <div
                            className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${service.isFree
                              ? 'bg-[#F6F9EE] text-[#749220] border border-[#749220]/25'
                              : 'bg-sky-50 text-[#165479] border border-sky-100'
                              }`}
                          >
                            <IconComponent className="w-5 h-5 stroke-[1.75]" />
                          </div>

                          <div>
                            {service.isFree ? (
                              <div className="flex items-baseline gap-1.5">
                                <span className="text-2xl font-bold text-[#749220] tracking-tight">
                                  $0
                                </span>
                                <span className="text-xs font-bold text-[#749220] uppercase tracking-wide">
                                  Free
                                </span>
                              </div>
                            ) : (
                              <div className="flex items-baseline gap-1">
                                <span className="text-2xl font-bold text-[#0A4973] tracking-tight">
                                  {service.price}
                                </span>
                                <span className="text-xs font-normal text-slate-400">
                                  / filing
                                </span>
                              </div>
                            )}
                          </div>

                        </div>

                        {/* Service Title */}
                        <h3 className="text-[15px] font-semibold text-gray-900 group-hover:text-[#165479] transition-colors leading-snug min-h-[42px] flex items-center">
                          {service.name}
                        </h3>

                        {/* Clean 1-Line Description */}
                        <p className="text-xs text-gray-500 leading-relaxed mt-1.5 mb-3 line-clamp-2 min-h-[34px]">
                          {service.description}
                        </p>

                        {/* Price Note (if applicable) */}
                        {service.priceNote && (
                          <div className="text-[11px] text-[#165479] bg-sky-50/70 px-2.5 py-1.5 rounded-md border border-sky-100 mb-3">
                            {service.priceNote}
                          </div>
                        )}
                      </div>

                      {/* Bottom Row: Prominent Price & Clean Action */}
                      {/* <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                        <div>
                          {service.isFree ? (
                            <div className="flex items-baseline gap-1.5">
                              <span className="text-2xl font-bold text-[#749220] tracking-tight">
                                $0
                              </span>
                              <span className="text-xs font-bold text-[#749220] uppercase tracking-wide">
                                Free
                              </span>
                            </div>
                          ) : (
                            <div className="flex items-baseline gap-1">
                              <span className="text-2xl font-bold text-[#0A4973] tracking-tight">
                                {service.price}
                              </span>
                              <span className="text-xs font-normal text-slate-400">
                                / filing
                              </span>
                            </div>
                          )}
                        </div>

                        {service.worth ? (
                          <span className="text-xs text-slate-400">
                            Worth <span className="line-through">{service.worth}</span>
                          </span>
                        ) : (
                          <span className="text-xs font-medium text-[#165479] group-hover:text-[#0A4973] flex items-center gap-1 transition-colors">
                            <span>Get Started</span>
                            <span className="text-xs group-hover:translate-x-0.5 transition-transform">&rarr;</span>
                          </span>
                        )}
                      </div> */}
                    </motion.div>
                  );
                })}
              </div>

              {/* Benefits Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mt-12 sm:mt-16 grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6"
              >
                {[
                  {
                    title: 'No Hidden Fees',
                    description: 'All prices are transparent and upfront. What you see is what you pay.',
                    icon: CheckCircleIcon,
                  },
                  {
                    title: 'Expert Preparation',
                    description: 'Certified tax professionals handle every aspect of your filing.',
                    icon: CheckCircleIcon,
                  },
                  {
                    title: 'Money-Back Guarantee',
                    description: 'Satisfaction guaranteed or your money back.',
                    icon: CheckCircleIcon,
                  },
                ].map((benefit, index) => {
                  const IconComponent = benefit.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.35, delay: 0.08 * index }}
                      className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-2xs hover:shadow-[0_10px_24px_rgba(22,84,121,0.06)] hover:border-[#165479]/30 transition-all duration-200 flex flex-col justify-start"
                    >
                      <div className="w-9 h-9 rounded-xl bg-[#F6F9EE] border border-[#749220]/25 flex items-center justify-center text-[#749220] shrink-0 mb-3">
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <h4 className="text-sm sm:text-base font-medium text-gray-900 leading-snug mb-1.5">
                        {benefit.title}
                      </h4>
                      <p className="text-xs sm:text-[13px] text-gray-600 font-normal leading-relaxed">
                        {benefit.description}
                      </p>
                    </motion.div>
                  );
                })}
              </motion.div>

            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 3. FULL-WIDTH CTA SECTION WITH BRAND BACKGROUND                           */}
        {/* ========================================================================= */}
        <section className="w-full relative py-16 sm:py-10 bg-gradient-to-br from-[#0A4973] via-[#165479] to-[#0A2D41] text-white overflow-hidden">
          {/* Subtle Ambient Background Gradients */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none overflow-hidden -z-10">
            <div className="absolute -top-24 left-1/4 w-96 h-96 bg-[#749220]/20 rounded-full blur-3xl opacity-60" />
            <div className="absolute -bottom-24 right-1/4 w-96 h-96 bg-sky-400/15 rounded-full blur-3xl opacity-50" />
          </div>

          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5 }}
            >
              {/* Star Icon Badge */}
              {/* <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-[#CBF056] flex items-center justify-center mx-auto mb-4 shadow-sm">
                <StarIcon className="w-6 h-6" />
              </div> */}

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-normal text-white tracking-tight mb-3">
                Ready to Get Started?
              </h2>

              <p className="text-sm sm:text-base text-sky-100/90 font-normal mb-8 max-w-2xl mx-auto leading-relaxed">
                Select the services you need and our expert team will handle your tax filing with precision and care. Get started today and experience hassle-free tax preparation.
              </p>

              <div className="flex flex-col sm:flex-row gap-3.5 justify-center">
                <Link
                  to="/contact"
                  className="px-7 py-3 rounded-full font-medium text-sm sm:text-base text-[#0A4973] bg-[#CBF056] hover:bg-[#b8dd42] shadow-md hover:shadow-lg transition-all duration-200"
                >
                  Get Started Today
                </Link>
                <Link
                  to="/services"
                  className="px-7 py-3 rounded-full font-medium text-sm sm:text-base text-white bg-white/10 hover:bg-white/20 border border-white/25 transition-all duration-200"
                >
                  View All Services
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

      </div>
    </>
  );
};

export default Pricing;
