import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { SITE_STATS } from '../constants/siteStats';
import {
  ShieldCheckIcon,
  UserGroupIcon,
  LightBulbIcon,
  ChartBarIcon,
  CheckCircleIcon,
  StarIcon,
  ArrowRightIcon,
  ClockIcon,
  GlobeAltIcon,
  DocumentTextIcon,
  AcademicCapIcon,
  BanknotesIcon,
  PhoneIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline';
import SEO from '../components/seo/SEO';
import Logo from '../assets/irsLogo.png';

// Visual Showcase Asset
import teamVisual from '../assets/about-mission-team.jpg';
import ctaBg from '../assets/cta-banner-bg.jpg';

const About = () => {
  const values = [
    {
      icon: ShieldCheckIcon,
      title: 'Trust & Security',
      description:
        'Your financial information is protected with bank-level encryption and strict privacy policies.',
      color: {
        card: 'bg-gradient-to-b from-blue-50/80 via-blue-50/25 to-white border-blue-200/80 hover:border-blue-400 hover:shadow-[0_14px_30px_rgba(37,99,235,0.08)]',
        icon: 'bg-white text-blue-600 border-blue-200/90 shadow-2xs',
        topLine: 'group-hover:via-blue-500',
        titleHover: 'group-hover:text-blue-600',
      },
    },
    {
      icon: UserGroupIcon,
      title: 'Expert Team',
      description:
        'Our certified tax professionals have years of experience handling complex tax situations.',
      color: {
        card: 'bg-gradient-to-b from-emerald-50/80 via-emerald-50/25 to-white border-emerald-200/80 hover:border-emerald-400 hover:shadow-[0_14px_30px_rgba(16,185,129,0.08)]',
        icon: 'bg-white text-emerald-600 border-emerald-200/90 shadow-2xs',
        topLine: 'group-hover:via-emerald-500',
        titleHover: 'group-hover:text-emerald-600',
      },
    },
    {
      icon: LightBulbIcon,
      title: 'Innovation',
      description:
        'We leverage technology to streamline the tax filing process while maintaining accuracy.',
      color: {
        card: 'bg-gradient-to-b from-amber-50/80 via-amber-50/25 to-white border-amber-200/80 hover:border-amber-400 hover:shadow-[0_14px_30px_rgba(245,158,11,0.08)]',
        icon: 'bg-white text-amber-600 border-amber-200/90 shadow-2xs',
        topLine: 'group-hover:via-amber-500',
        titleHover: 'group-hover:text-amber-600',
      },
    },
    {
      icon: ChartBarIcon,
      title: 'Results-Driven',
      description:
        'We focus on maximizing your tax savings while ensuring full compliance with regulations.',
      color: {
        card: 'bg-gradient-to-b from-rose-50/80 via-rose-50/25 to-white border-rose-200/80 hover:border-rose-400 hover:shadow-[0_14px_30px_rgba(238,100,80,0.08)]',
        icon: 'bg-white text-[#EE6450] border-[#EE6450]/30 shadow-2xs',
        topLine: 'group-hover:via-[#EE6450]',
        titleHover: 'group-hover:text-[#EE6450]',
      },
    },
  ];

  const whyChooseUs = [
    {
      icon: AcademicCapIcon,
      title: 'Certified Tax Professionals',
      description:
        'Our team consists of certified tax professionals with specialized expertise in U.S. and Indian tax laws, ensuring accurate and compliant filings.',
      color: {
        card: 'bg-gradient-to-br from-blue-50/70 via-blue-50/20 to-white border-blue-200/70 hover:border-blue-300',
        iconBg: 'bg-white text-blue-600 border-blue-200/90 shadow-2xs',
        topLine: 'group-hover:via-blue-500',
        numberBadge: 'bg-white/90 text-blue-700 border-blue-200/80',
        titleHover: 'group-hover:text-blue-600',
        watermark: 'text-blue-500/10',
      },
    },
    {
      icon: ShieldCheckIcon,
      title: 'Secure Document Handling',
      description:
        'We use bank-level encryption and secure document management systems to protect your sensitive financial information throughout the filing process.',
      color: {
        card: 'bg-gradient-to-br from-emerald-50/70 via-emerald-50/20 to-white border-emerald-200/70 hover:border-emerald-300',
        iconBg: 'bg-white text-emerald-600 border-emerald-200/90 shadow-2xs',
        topLine: 'group-hover:via-emerald-500',
        numberBadge: 'bg-white/90 text-emerald-700 border-emerald-200/80',
        titleHover: 'group-hover:text-emerald-600',
        watermark: 'text-emerald-500/10',
      },
    },
    {
      icon: BanknotesIcon,
      title: 'Transparent Pricing',
      description:
        'No hidden fees or surprises. Our pricing is clear and upfront, so you know exactly what you\'re paying for before we begin.',
      color: {
        card: 'bg-gradient-to-br from-amber-50/70 via-amber-50/20 to-white border-amber-200/70 hover:border-amber-300',
        iconBg: 'bg-white text-amber-600 border-amber-200/90 shadow-2xs',
        topLine: 'group-hover:via-amber-500',
        numberBadge: 'bg-white/90 text-amber-700 border-amber-200/80',
        titleHover: 'group-hover:text-amber-600',
        watermark: 'text-amber-500/10',
      },
    },
    {
      icon: GlobeAltIcon,
      title: 'Dual-Country Expertise',
      description:
        'We specialize in handling tax obligations for individuals with ties to both the U.S. and India, including NRI tax filing and compliance.',
      color: {
        card: 'bg-gradient-to-br from-[#E9F7FA]/80 via-[#E9F7FA]/25 to-white border-[#127EAB]/25 hover:border-[#127EAB]/40',
        iconBg: 'bg-white text-teal border-[#127EAB]/25 shadow-2xs',
        topLine: 'group-hover:via-[#127EAB]',
        numberBadge: 'bg-white/90 text-teal border-[#127EAB]/25',
        titleHover: 'group-hover:text-teal',
        watermark: 'text-teal/10',
      },
    },
    {
      icon: ChartBarIcon,
      title: 'Real-Time Tracking',
      description:
        'Track your filing status in real-time through our secure dashboard, keeping you informed every step of the way.',
      color: {
        card: 'bg-gradient-to-br from-purple-50/70 via-purple-50/20 to-white border-purple-200/70 hover:border-purple-300',
        iconBg: 'bg-white text-purple-600 border-purple-200/90 shadow-2xs',
        topLine: 'group-hover:via-purple-500',
        numberBadge: 'bg-white/90 text-purple-700 border-purple-200/80',
        titleHover: 'group-hover:text-purple-600',
        watermark: 'text-purple-500/10',
      },
    },
    {
      icon: PhoneIcon,
      title: 'Dedicated Support',
      description:
        'Our customer support team is available to answer your questions and provide assistance throughout the entire tax filing process.',
      color: {
        card: 'bg-gradient-to-br from-rose-50/70 via-rose-50/20 to-white border-[#EE6450]/25 hover:border-[#EE6450]/40',
        iconBg: 'bg-white text-[#EE6450] border-[#EE6450]/30 shadow-2xs',
        topLine: 'group-hover:via-[#EE6450]',
        numberBadge: 'bg-white/90 text-[#EE6450] border-[#EE6450]/25',
        titleHover: 'group-hover:text-[#EE6450]',
        watermark: 'text-[#EE6450]/10',
      },
    },
  ];

  const stats = [
    {
      number: SITE_STATS.clientsServed,
      label: 'Happy Clients',
      icon: UserGroupIcon,
      tone: 'sky',
    },
    {
      number: SITE_STATS.returnsFiled,
      label: 'Tax Returns Filed',
      icon: DocumentTextIcon,
      tone: 'lime',
    },
    {
      number: SITE_STATS.yearsExperience,
      label: 'Years Experience',
      icon: ClockIcon,
      tone: 'sky',
    },
    {
      number: SITE_STATS.satisfactionRate,
      label: 'Client Satisfaction',
      icon: StarIcon,
      tone: 'lime',
    },
  ];

  const title = "About Us | IRS Tax Filer";
  const description = "Learn about IRS Tax Filer — our mission, expertise in US & Indian tax services, and commitment to secure,Learn more.";
  const keywords = "online tax filing service,tax service provider,Internal Revenue Service,IRS Tax Filer about, US & Indian tax services, tax filing expertise, tax compliance company";
  const canonical = { Logo };
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

      <div className="min-h-screen bg-white overflow-x-hidden w-full max-w-full">

        {/* ========================================================================= */}
        {/* 1. HERO & MISSION SECTION (UNIFIED)                                       */}
        {/* ========================================================================= */}
        <section className="relative overflow-hidden pt-10 pb-8 sm:pt-12 sm:pb-10 bg-gradient-to-b from-white via-[#EFF9FB]/30 to-white ">
          {/* Subtle Ambient Background Gradients */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none overflow-hidden -z-10">
            <div className="absolute -top-24 left-1/4 w-96 h-96 bg-[#127EAB]/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -top-20 right-1/4 w-80 h-80 bg-[#EE6450]/5 rounded-full blur-3xl pointer-events-none" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">

              {/* Left Column: Mission Content */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="lg:col-span-7"
              >
                {/* Tag Pill */}
                {/* <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E9F7FA] border border-[#127EAB]/30 mb-4 select-none text-xs font-semibold text-teal shadow-2xs">
                  <StarIcon className="w-3.5 h-3.5 text-coral fill-coral/20" />
                  <span>Your Trusted Tax Partner</span>
                </div> */}

                {/* Main Headline */}
                <h1 className="text-2xl sm:text-3xl lg:text-[38px] font-semibold text-primary tracking-tight leading-[1.35] sm:leading-[1.36] lg:leading-[1.38] mb-5">
                  About TaxFiling —{" "}
                  <span className="text-teal">Simplifying Taxes</span>{" "}
                  <span className="text-coral">for Everyone</span>
                </h1>

                {/* Narrative / Mission Description */}
                <div className="space-y-4 text-sm sm:text-base text-[#6F7F8E] font-normal leading-[26px] sm:leading-[28px] lg:leading-[30px] mb-6">
                  <p>
                    At TaxFiling, we understand the cross-border complexities faced by Indians living and working in the United States. Navigating U.S. tax compliance while managing Indian financial obligations shouldn't be stressful or overwhelming.
                  </p>
                  <p>
                    Our mission is to deliver expert, reliable, and transparent tax preparation that brings total peace of mind. By combining certified CPA expertise with seamless digital filing, we ensure your returns are accurate, timely, and optimized for maximum legal savings.
                  </p>
                </div>

                {/* Trust Points */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-5">
                  <div className="flex items-center gap-2 py-1.5 px-2.5 rounded-lg bg-white shadow-2xs hover:bg-[#EFF9FB]/50 transition-colors duration-150">
                    <div className="w-6 h-6 rounded-md bg-[#E9F7FA] text-teal flex items-center justify-center shrink-0 shadow-2xs">
                      <GlobeAltIcon className="w-3.5 h-3.5 stroke-[2]" />
                    </div>
                    <span className="text-xs font-medium text-teal leading-tight">
                      Dual-Country Tax Specialization
                    </span>
                  </div>

                  <div className="flex items-center gap-2 py-1.5 px-2.5 rounded-lg bg-white shadow-2xs hover:bg-emerald-50/50 transition-colors duration-150">
                    <div className="w-6 h-6 rounded-md bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 shadow-2xs">
                      <CheckCircleIcon className="w-3.5 h-3.5 stroke-[2]" />
                    </div>
                    <span className="text-xs font-medium text-emerald-700 leading-tight">
                      100% Accurate IRS e-Filing
                    </span>
                  </div>

                  <div className="flex items-center gap-2 py-1.5 px-2.5 rounded-lg bg-white shadow-2xs hover:bg-blue-50/50 transition-colors duration-150">
                    <div className="w-6 h-6 rounded-md bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 shadow-2xs">
                      <ShieldCheckIcon className="w-3.5 h-3.5 stroke-[2]" />
                    </div>
                    <span className="text-xs font-medium text-blue-700 leading-tight">
                      Certified CPA Preparation
                    </span>
                  </div>

                  <div className="flex items-center gap-2 py-1.5 px-2.5 rounded-lg bg-white shadow-2xs hover:bg-amber-50/50 transition-colors duration-150">
                    <div className="w-6 h-6 rounded-md bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 shadow-2xs">
                      <BanknotesIcon className="w-3.5 h-3.5 stroke-[2]" />
                    </div>
                    <span className="text-xs font-medium text-amber-700 leading-tight">
                      Upfront Transparent Pricing
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center gap-3.5">
                  <Link
                    to="/contact"
                    className="inline-flex items-center justify-center gap-2 h-10 sm:h-11 px-6 sm:px-7 rounded-xl bg-primary hover:bg-primary-dark text-white font-semibold text-xs sm:text-sm shadow-sm hover:shadow-md transition-all duration-200 group"
                  >
                    <span>Talk to a CPA</span>
                    <ArrowRightIcon className="w-4 h-4 stroke-[2.2] group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link
                    to="/pricing"
                    className="inline-flex items-center justify-center gap-2 h-10 sm:h-11 px-6 sm:px-7 rounded-xl bg-white hover:bg-slate-50 text-teal hover:text-primary border border-border hover:border-teal font-semibold text-xs sm:text-sm shadow-2xs hover:shadow-sm transition-all duration-200"
                  >
                    <span>View Pricing</span>
                  </Link>
                </div>
              </motion.div>

              {/* Right Column: Visual Showcase */}
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5 }}
                className="lg:col-span-5 flex justify-center"
              >
                <div className="relative w-full max-w-[480px] rounded-2xl overflow-hidden border border-[#CCDCE1] shadow-[0_16px_40px_rgba(31,66,100,0.08)] bg-white group">
                  <img
                    src={teamVisual}
                    alt="Professional tax team"
                    className="w-full h-[360px] sm:h-[420px] lg:h-[450px] object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                    loading="lazy"
                  />

                  {/* Floating Top Badge */}
                  <div className="absolute top-3.5 right-3.5 bg-white/95 backdrop-blur-md rounded-xl py-1.5 px-3 shadow-sm border border-[#CCDCE1] flex items-center gap-2 z-10 select-none">
                    <ShieldCheckIcon className="w-4 h-4 text-teal" />
                    <span className="text-xs font-semibold text-primary">Certified CPA Team</span>
                  </div>

                  {/* Floating Bottom Badge */}
                  <div className="absolute bottom-3.5 left-3.5 right-3.5 bg-white/95 backdrop-blur-md rounded-xl p-3 sm:p-3.5 shadow-lg border border-[#CCDCE1] flex items-center justify-between gap-3 z-10 select-none">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="w-2.5 h-2.5 rounded-full bg-teal animate-pulse shrink-0" />
                      <div className="min-w-0">
                        <h4 className="text-xs font-semibold text-primary leading-tight">U.S. & Indian Tax Experts</h4>
                        <p className="text-[11px] text-[#6F7F8E] mt-0.5 leading-none">IRS Authorized e-File Provider</p>
                      </div>
                    </div>
                    <span className="text-[11px] text-teal font-semibold bg-[#E9F7FA] px-2.5 py-1 rounded-md border border-[#127EAB]/30 shrink-0 whitespace-nowrap">
                      100% Compliant
                    </span>
                  </div>
                </div>
              </motion.div>

            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 2. WHY CHOOSE TAXFILING? SECTION                                         */}
        {/* ========================================================================= */}
        <section className="py-8 sm:py-10 bg-white ">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5 }}
              className="text-center mb-6 sm:mb-8"
            >
              <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-normal text-primary tracking-tight leading-[1.25] mb-2.5">
                Why Choose{" "}
                <span className="font-medium text-teal">
                  TaxFiling?
                </span>
              </h2>
              <p className="text-sm sm:text-base text-[#6F7F8E] font-normal max-w-2xl mx-auto leading-relaxed">
                We combine expertise, technology, and personalized service to deliver exceptional results
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
              {whyChooseUs.map((item, index) => {
                const Icon = item.icon;
                const theme = item.color;

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.35, delay: index * 0.05 }}
                    className={`relative rounded-2xl p-5 sm:p-6 border ${theme.card} transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xs flex items-start gap-4 sm:gap-4.5 group overflow-hidden`}
                  >
                    {/* Top Accent Line */}
                    <div className={`absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-transparent to-transparent ${theme.topLine} transition-all duration-300`} />

                    {/* Subtle Large Watermark Number in Background */}
                    <span
                      aria-hidden="true"
                      className={`absolute -bottom-2 -right-1 text-6xl sm:text-7xl font-black font-mono tracking-tighter ${theme.watermark} select-none pointer-events-none transition-transform duration-300 group-hover:scale-105`}
                    >
                      0{index + 1}
                    </span>

                    {/* Icon Container with Distinct Color */}
                    <div className={`shrink-0 w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center transition-transform duration-200 group-hover:scale-105 border ${theme.iconBg} relative z-10`}>
                      <Icon className="w-5 h-5 sm:w-5.5 sm:h-5.5 stroke-[1.8]" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0 relative z-10">
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <h3 className={`text-base sm:text-[17px] font-semibold text-primary ${theme.titleHover} transition-colors leading-snug`}>
                          {item.title}
                        </h3>
                        <span className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded-md border select-none shrink-0 ${theme.numberBadge}`}>
                          0{index + 1}
                        </span>
                      </div>
                      <p className="text-xs sm:text-[13px] text-[#6F7F8E] font-normal leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 3. CORE VALUES SECTION                                                    */}
        {/* ========================================================================= */}
        <section className="py-8 sm:py-10 bg-white ">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5 }}
              className="text-center mb-6 sm:mb-8"
            >
              <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-normal text-primary tracking-tight leading-[1.25] mb-2.5">
                Our Core{" "}
                <span className="font-medium text-teal">
                  Values
                </span>
              </h2>
              <p className="text-sm sm:text-base text-[#6F7F8E] font-normal max-w-2xl mx-auto leading-relaxed">
                The principles that guide everything we do
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
              {values.map((value, index) => {
                const Icon = value.icon;
                const theme = value.color;

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.35, delay: index * 0.06 }}
                    className={`relative rounded-2xl p-6 sm:p-7 border ${theme.card} transition-all duration-300 hover:-translate-y-1 text-center flex flex-col items-center group overflow-hidden`}
                  >
                    {/* Top Accent Line */}
                    <div className={`absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-transparent to-transparent ${theme.topLine} transition-all duration-300`} />

                    {/* Icon Container with Distinct Color */}
                    <div className={`w-13 h-13 rounded-2xl flex items-center justify-center mb-4 transition-transform duration-200 group-hover:scale-110 border ${theme.icon}`}>
                      <Icon className="w-6 h-6 stroke-[1.8]" />
                    </div>

                    {/* Title */}
                    <h3 className={`text-base sm:text-[17px] font-semibold text-primary ${theme.titleHover} transition-colors leading-snug mb-2`}>
                      {value.title}
                    </h3>

                    {/* Description */}
                    <p className="text-xs sm:text-[13px] text-[#6F7F8E] font-normal leading-relaxed">
                      {value.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 5. WHY EXPATRIATES NEED PROFESSIONAL TAX FILING                           */}
        {/* ========================================================================= */}
        {/* <section className="py-16 sm:py-10 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12 sm:mb-16"
            >
              <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-normal text-primary tracking-tight leading-[1.25] mb-2.5">
                Why Expatriates Need{" "}
                <span className="font-medium text-teal">
                  Professional Tax Filing
                </span>
              </h2>
              <p className="text-sm sm:text-base text-[#6F7F8E] font-normal max-w-2xl mx-auto leading-relaxed">
                Understanding the complexities of cross-border taxation
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
              {[
                {
                  title: 'Complex Tax Laws',
                  description:
                    'U.S. tax laws are complex and constantly changing. For expatriates, understanding how U.S. tax obligations interact with Indian tax laws requires specialized knowledge. Missing deadlines or filing incorrectly can result in penalties and interest charges.',
                  icon: DocumentTextIcon,
                },
                {
                  title: 'Tax Treaty Benefits',
                  description:
                    'The U.S.-India tax treaty provides benefits to avoid double taxation. However, claiming these benefits correctly requires proper documentation and understanding of treaty provisions. Our experts ensure you maximize these benefits.',
                  icon: GlobeAltIcon,
                },
                {
                  title: 'FBAR & FATCA Compliance',
                  description:
                    'If you have foreign bank accounts or assets, you may need to file FBAR and FATCA forms. Non-compliance can result in severe penalties. We help ensure you meet all reporting requirements.',
                  icon: ShieldCheckIcon,
                },
                {
                  title: 'Time & Stress Savings',
                  description:
                    'Tax filing can be time-consuming and stressful. By entrusting your taxes to professionals, you can focus on your career and family while we handle the complexities. We save you time and provide peace of mind.',
                  icon: ClockIcon,
                },
              ].map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.35, delay: index * 0.07 }}
                    className="bg-white rounded-2xl p-6 sm:p-7 border border-[#CCDCE1] shadow-2xs hover:shadow-[0_12px_28px_rgba(23,50,77,0.06)] hover:border-[#127EAB]/50 transition-all duration-200 flex flex-col justify-start"
                  >
                    <div className="flex items-center space-x-3.5 mb-3.5">
                      <div className="w-10 h-10 rounded-xl bg-[#E9F7FA] border border-[#127EAB]/25 flex items-center justify-center text-teal shrink-0">
                        <Icon className="w-5 h-5" />
                      </div>
                      <h3 className="text-base sm:text-lg font-semibold text-primary leading-snug">
                        {item.title}
                      </h3>
                    </div>
                    <p className="text-xs sm:text-sm text-[#6F7F8E] font-normal leading-[30px] sm:leading-[32px] lg:leading-[25px]">
                      {item.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section> */}

        {/* ========================================================================= */}
        {/* 4. STATS SECTION                                                          */}
        {/* ========================================================================= */}
        <section className="py-8 sm:py-10 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                const isLime = stat.tone === 'lime';
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.35, delay: index * 0.08 }}
                    className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-2xs hover:shadow-[0_12px_28px_rgba(22,84,121,0.06)] hover:border-[#1F4264]/30 transition-all duration-200 text-center"
                  >
                    <div
                      className={`w-11 h-11 rounded-xl flex items-center justify-center mx-auto mb-3.5 transition-transform duration-200 ${isLime
                        ? 'bg-background-aqua border border-border text-teal text-teal'
                        : 'bg-sky-50 border border-sky-100 text-primary'
                        }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <p className="text-3xl sm:text-4xl font-normal text-primary tracking-tight mb-1">
                      {stat.number}
                    </p>
                    <p className="text-xs sm:text-sm font-medium text-slateText">
                      {stat.label}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 5. COMPACT CTA SECTION                                                    */}
        {/* ========================================================================= */}
        <section className="py-6 sm:py-8 bg-gradient-to-b from-white via-[#EFF9FB]/60 to-[#E9F7FA]/40 relative overflow-hidden">
          {/* Subtle Ambient Depth */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-28 bg-[#127EAB]/5 rounded-full blur-2xl pointer-events-none" />

          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <h2 className="text-xl sm:text-2xl lg:text-[28px] font-semibold text-primary tracking-tight mb-2 sm:mb-2.5">
              Ready to Get <span className="text-teal">Started?</span>
            </h2>

            <p className="text-xs sm:text-sm text-[#6F7F8E] font-normal max-w-lg mx-auto mb-5 sm:mb-6 leading-relaxed">
              Join thousands of clients who trust TaxFiling for seamless U.S. and Indian tax compliance.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3.5">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 h-10 sm:h-11 px-6 sm:px-7 rounded-xl bg-primary hover:bg-primary-dark text-white font-semibold text-xs sm:text-sm shadow-sm hover:shadow-md transition-all duration-200 group"
              >
                <span>Contact Us</span>
                <ArrowRightIcon className="w-4 h-4 stroke-[2.2] group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                to="/pricing"
                className="inline-flex items-center justify-center gap-2 h-10 sm:h-11 px-6 sm:px-7 rounded-xl bg-white hover:bg-slate-50 text-teal hover:text-primary border border-border hover:border-teal font-semibold text-xs sm:text-sm shadow-2xs hover:shadow-sm transition-all duration-200 group"
              >
                <BanknotesIcon className="w-4 h-4 text-teal stroke-[2.2] group-hover:scale-110 transition-transform" />
                <span>View Pricing</span>
              </Link>
            </div>
          </div>
        </section>

      </div>
    </>
  );
};

export default About;
