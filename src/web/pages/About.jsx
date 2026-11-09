import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
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
} from '@heroicons/react/24/outline';
import SEO from '../components/seo/SEO';
import Logo from '../assets/irsLogo.png';

// Visual Showcase Asset
import teamVisual from '../assets/about-mission-team.jpg';

const About = () => {
  const values = [
    {
      icon: ShieldCheckIcon,
      title: 'Trust & Security',
      description:
        'Your financial information is protected with bank-level encryption and strict privacy policies.',
    },
    {
      icon: UserGroupIcon,
      title: 'Expert Team',
      description:
        'Our certified tax professionals have years of experience handling complex tax situations.',
    },
    {
      icon: LightBulbIcon,
      title: 'Innovation',
      description:
        'We leverage technology to streamline the tax filing process while maintaining accuracy.',
    },
    {
      icon: ChartBarIcon,
      title: 'Results-Driven',
      description:
        'We focus on maximizing your tax savings while ensuring full compliance with regulations.',
    },
  ];

  const whyChooseUs = [
    {
      icon: AcademicCapIcon,
      title: 'Certified Tax Professionals',
      description:
        'Our team consists of certified tax professionals with specialized expertise in U.S. and Indian tax laws, ensuring accurate and compliant filings.',
    },
    {
      icon: ShieldCheckIcon,
      title: 'Secure Document Handling',
      description:
        'We use bank-level encryption and secure document management systems to protect your sensitive financial information throughout the filing process.',
    },
    {
      icon: BanknotesIcon,
      title: 'Transparent Pricing',
      description:
        'No hidden fees or surprises. Our pricing is clear and upfront, so you know exactly what you\'re paying for before we begin.',
    },
    {
      icon: GlobeAltIcon,
      title: 'Dual-Country Expertise',
      description:
        'We specialize in handling tax obligations for individuals with ties to both the U.S. and India, including NRI tax filing and compliance.',
    },
    {
      icon: ChartBarIcon,
      title: 'Real-Time Tracking',
      description:
        'Track your filing status in real-time through our secure dashboard, keeping you informed every step of the way.',
    },
    {
      icon: PhoneIcon,
      title: 'Dedicated Support',
      description:
        'Our customer support team is available to answer your questions and provide assistance throughout the entire tax filing process.',
    },
  ];

  const stats = [
    {
      number: '10,000+',
      label: 'Happy Clients',
      icon: UserGroupIcon,
      tone: 'sky',
    },
    {
      number: '50,000+',
      label: 'Tax Returns Filed',
      icon: DocumentTextIcon,
      tone: 'lime',
    },
    {
      number: '15+',
      label: 'Years Experience',
      icon: ClockIcon,
      tone: 'sky',
    },
    {
      number: '98%',
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
        {/* 1. HERO SECTION                                                           */}
        {/* ========================================================================= */}
        <section className="relative overflow-hidden pt-12 pb-14 sm:pt-16 sm:pb-10 bg-white">
          {/* Subtle Ambient Background Gradients */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none overflow-hidden -z-10">
            <div className="absolute -top-24 left-1/4 w-96 h-96 bg-sky-100/50 rounded-full blur-3xl opacity-60" />
            <div className="absolute -top-20 right-1/4 w-80 h-80 bg-lime-100/40 rounded-full blur-3xl opacity-50" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              {/* Tag Pill */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100/80 border border-slate-200/80 mb-4 select-none">
                <StarIcon className="w-3.5 h-3.5 text-[#749220]" />
                <span className="text-xs font-medium text-slate-700">Your Trusted Tax Partner</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-normal text-gray-900 tracking-tight leading-[1.25] mb-3.5 max-w-3xl mx-auto">
                About TaxFiling —{" "}
                <span className="font-semibold bg-gradient-to-r from-[#0A4973] via-[#165479] to-[#749220] bg-clip-text text-transparent">
                  Simplifying Tax Filing for Everyone
                </span>
              </h1>

              {/* Subheading */}
              <p className="text-sm sm:text-base lg:text-[17px] text-gray-600 font-normal leading-[30px] sm:leading-[32px] lg:leading-[34px] mb-6 max-w-2xl mx-auto text-center">
                Simplifying U.S. tax compliance for global Indians with professionalism, expertise, and care.
                We combine deep tax knowledge with cutting-edge technology to make tax filing stress-free.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 2. OUR MISSION SECTION                                                    */}
        {/* ========================================================================= */}
        <section className="py-16 sm:py-10 bg-white border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">

              {/* Left Column: Mission Content */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5 }}
                className="lg:col-span-7"
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100/80 border border-slate-200/80 mb-3 select-none">
                  <span className="w-2 h-2 rounded-full bg-[#749220]" />
                  <span className="text-xs font-medium text-slate-700">Our Purpose</span>
                </div>

                <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-normal text-gray-900 tracking-tight leading-[1.25] mb-5">
                  Our{" "}
                  <span className="font-semibold bg-gradient-to-r from-[#0A4973] via-[#165479] to-[#749220] bg-clip-text text-transparent">
                    Mission
                  </span>
                </h2>

                <div className="space-y-4 text-sm sm:text-base lg:text-[17px] text-gray-600 font-normal leading-[30px] sm:leading-[32px] lg:leading-[34px] mb-6 max-w-2xl">
                  <p>
                    At TaxFiling, we understand the unique challenges faced by Indians living and working in the United States.
                    Navigating the complex U.S. tax system while maintaining compliance with both U.S. and Indian tax laws can be overwhelming.
                  </p>
                  <p>
                    Our mission is to provide expert, reliable, and affordable tax filing services that give you peace of mind.
                    We combine deep tax expertise with cutting-edge technology to make the process as smooth and stress-free as possible.
                  </p>
                  <p>
                    Whether you're an NRI, an expatriate, or a dual citizen, we're here to ensure your taxes are filed correctly,
                    on time, and optimized for maximum savings.
                  </p>
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
                <div className="relative w-full max-w-[460px] rounded-2xl overflow-hidden border border-slate-200/90 shadow-[0_14px_38px_rgba(22,84,121,0.08)] bg-white group">
                  <img
                    src={teamVisual}
                    alt="Professional tax team"
                    className="w-full h-[320px] sm:h-[380px] lg:h-[420px] object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                    loading="lazy"
                  />

                  {/* Floating Glass Badge */}
                  <div className="absolute bottom-3.5 left-3.5 right-3.5 bg-white/95 backdrop-blur-md rounded-xl p-3 shadow-md border border-gray-200/80 flex items-center justify-between z-10 select-none">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#749220] animate-pulse" />
                      <span className="text-xs font-semibold text-gray-900">
                        Professional Tax Team
                      </span>
                    </div>
                    <span className="text-[11px] text-[#165479] font-medium bg-sky-50 px-2 py-0.5 rounded-md border border-sky-100">
                      100% Compliant
                    </span>
                  </div>
                </div>
              </motion.div>

            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 3. WHY CHOOSE TAXFILING? SECTION                                         */}
        {/* ========================================================================= */}
        <section className="py-16 sm:py-10 bg-slate-50/60 border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12 sm:mb-16"
            >
              <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-normal text-gray-900 tracking-tight leading-[1.25] mb-2.5">
                Why Choose{" "}
                <span className="font-semibold bg-gradient-to-r from-[#0A4973] via-[#165479] to-[#749220] bg-clip-text text-transparent">
                  TaxFiling?
                </span>
              </h2>
              <p className="text-sm sm:text-base text-gray-600 font-normal max-w-2xl mx-auto leading-relaxed">
                We combine expertise, technology, and personalized service to deliver exceptional results
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
              {whyChooseUs.map((item, index) => {
                const Icon = item.icon;
                const isLime = index % 2 === 0;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.35, delay: index * 0.05 }}
                    className="relative bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/80 shadow-2xs hover:shadow-[0_14px_30px_rgba(22,84,121,0.08)] hover:border-[#165479]/30 transition-all duration-200 flex items-start gap-4 sm:gap-5 group overflow-hidden"
                  >
                    {/* Top Accent Line */}
                    <div className="absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-[#749220]/0 to-transparent group-hover:via-[#749220] transition-all duration-300" />

                    {/* Icon Container */}
                    <div
                      className={`shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-200 group-hover:scale-105 ${isLime
                        ? 'bg-[#F6F9EE] border border-[#749220]/25 text-[#749220]'
                        : 'bg-sky-50 border border-sky-100 text-[#165479]'
                        }`}
                    >
                      <Icon className="w-5.5 h-5.5" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <h3 className="text-base sm:text-[17px] font-medium text-gray-900 group-hover:text-[#165479] transition-colors leading-snug">
                          {item.title}
                        </h3>
                        <span className="text-xs font-mono font-semibold text-slate-300 group-hover:text-[#165479]/50 transition-colors select-none shrink-0">
                          0{index + 1}
                        </span>
                      </div>
                      <p className="text-xs sm:text-[13.5px] text-gray-600 font-normal leading-relaxed">
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
        {/* 4. CORE VALUES SECTION                                                    */}
        {/* ========================================================================= */}
        <section className="py-16 sm:py-24 bg-white border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12 sm:mb-16"
            >
              <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-normal text-gray-900 tracking-tight leading-[1.25] mb-2.5">
                Our Core{" "}
                <span className="font-semibold bg-gradient-to-r from-[#0A4973] via-[#165479] to-[#749220] bg-clip-text text-transparent">
                  Values
                </span>
              </h2>
              <p className="text-sm sm:text-base text-gray-600 font-normal max-w-2xl mx-auto leading-relaxed">
                The principles that guide everything we do
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
              {values.map((value, index) => {
                const Icon = value.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.35, delay: index * 0.06 }}
                    className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-2xs hover:shadow-[0_12px_28px_rgba(22,84,121,0.06)] hover:border-[#165479]/30 transition-all duration-200 text-center flex flex-col items-center"
                  >
                    <div className="w-12 h-12 rounded-xl bg-sky-50 border border-sky-100 text-[#165479] flex items-center justify-center mb-4 transition-transform duration-200 group-hover:scale-105">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-base font-medium text-gray-900 leading-snug mb-2">
                      {value.title}
                    </h3>
                    <p className="text-xs sm:text-[13px] text-gray-600 font-normal leading-relaxed">
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
        <section className="py-16 sm:py-10 bg-slate-50/60 border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12 sm:mb-16"
            >
              <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-normal text-gray-900 tracking-tight leading-[1.25] mb-2.5">
                Why Expatriates Need{" "}
                <span className="font-semibold bg-gradient-to-r from-[#0A4973] via-[#165479] to-[#749220] bg-clip-text text-transparent">
                  Professional Tax Filing
                </span>
              </h2>
              <p className="text-sm sm:text-base text-gray-600 font-normal max-w-2xl mx-auto leading-relaxed">
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
                    className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/80 shadow-2xs hover:shadow-[0_12px_28px_rgba(22,84,121,0.06)] hover:border-[#165479]/30 transition-all duration-200 flex flex-col justify-start"
                  >
                    <div className="flex items-center space-x-3.5 mb-3.5">
                      <div className="w-10 h-10 rounded-xl bg-[#F6F9EE] border border-[#749220]/25 flex items-center justify-center text-[#749220] shrink-0">
                        <Icon className="w-5 h-5" />
                      </div>
                      <h3 className="text-base sm:text-lg font-medium text-gray-900 leading-snug">
                        {item.title}
                      </h3>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-700 font-normal leading-[30px] sm:leading-[32px] lg:leading-[25px]">
                      {item.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 6. STATS SECTION                                                          */}
        {/* ========================================================================= */}
        <section className="py-14 sm:py-18 bg-white border-b border-slate-100">
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
                    className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-2xs hover:shadow-[0_12px_28px_rgba(22,84,121,0.06)] hover:border-[#165479]/30 transition-all duration-200 text-center"
                  >
                    <div
                      className={`w-11 h-11 rounded-xl flex items-center justify-center mx-auto mb-3.5 transition-transform duration-200 ${isLime
                        ? 'bg-[#F6F9EE] border border-[#749220]/25 text-[#749220]'
                        : 'bg-sky-50 border border-sky-100 text-[#165479]'
                        }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <p className="text-3xl sm:text-4xl font-normal text-gray-900 tracking-tight mb-1">
                      {stat.number}
                    </p>
                    <p className="text-xs sm:text-sm font-medium text-slate-500">
                      {stat.label}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 7. FULL-WIDTH CTA SECTION WITH BRAND BACKGROUND                           */}
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
                Join thousands of satisfied clients who trust TaxFiling for their tax filing needs.
                Get started today and experience the difference of professional tax services.
              </p>

              <div className="flex flex-col sm:flex-row gap-3.5 justify-center">
                <Link
                  to="/contact"
                  className="px-7 py-3 rounded-full font-medium text-sm sm:text-base text-[#0A4973] bg-[#CBF056] hover:bg-[#b8dd42] shadow-md hover:shadow-lg transition-all duration-200"
                >
                  Contact Us
                </Link>
                <Link
                  to="/pricing"
                  className="px-7 py-3 rounded-full font-medium text-sm sm:text-base text-white bg-white/10 hover:bg-white/20 border border-white/25 transition-all duration-200"
                >
                  View Pricing
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

      </div>
    </>
  );
};

export default About;
