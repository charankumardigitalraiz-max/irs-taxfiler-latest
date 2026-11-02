import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  BanknotesIcon,
  DocumentTextIcon,
  ShieldCheckIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserGroupIcon,
  StarIcon,
  ChartBarIcon,
  PhoneIcon,
  EnvelopeIcon,
  GlobeAltIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/24/outline';
import SEO from '../../components/seo/SEO';
import Logo from '../../assets/irsLogo.png';

const FBARFATCA = () => {
  const fbarFeatures = [
    {
      icon: CheckCircleIcon,
      title: 'FBAR (FinCEN Form 114) Filing',
      description:
        'We prepare and file your Foreign Bank Account Report (FBAR) electronically, ensuring compliance with FinCEN requirements for foreign financial accounts.',
    },
    {
      icon: CheckCircleIcon,
      title: 'Account Aggregation & Reporting',
      description:
        'We help aggregate all foreign accounts to determine if you meet the $10,000 threshold and ensure accurate reporting of maximum account values.',
    },
    {
      icon: CheckCircleIcon,
      title: 'Penalty Avoidance & Relief',
      description:
        'We assist with penalty abatement requests and help you navigate the IRS voluntary disclosure programs if you have missed previous filings.',
    },
  ];

  const fatcaFeatures = [
    {
      icon: CheckCircleIcon,
      title: 'FATCA Form 8938 Filing',
      description:
        'We prepare and file Form 8938 to report specified foreign financial assets, ensuring compliance with FATCA requirements based on your filing status and location.',
    },
    {
      icon: CheckCircleIcon,
      title: 'Asset Valuation & Reporting',
      description:
        'We help determine the fair market value of foreign assets and ensure proper reporting of all specified foreign financial assets on your tax return.',
    },
    {
      icon: CheckCircleIcon,
      title: 'Compliance Review & Strategy',
      description:
        'We conduct comprehensive reviews to identify all reportable assets and develop strategies to ensure ongoing compliance with both FBAR and FATCA requirements.',
    },
  ];

  const services = [
    {
      icon: BanknotesIcon,
      title: 'FBAR Services',
      description: 'Foreign Bank Account Report filing and compliance',
      gradient: '#2B547E',
      bgGradient: '#F5F9FF',
      features: fbarFeatures,
      color: '#2B547E',
    },
    {
      icon: DocumentTextIcon,
      title: 'FATCA Services',
      description: 'Foreign Account Tax Compliance Act filing',
      gradient: '#2B547E',
      bgGradient: '#F5F9FF',
      features: fatcaFeatures,
      color: '#9333EA',
    },
  ];

  const benefits = [
    {
      icon: ShieldCheckIcon,
      title: 'Expert Compliance',
      description: 'Certified professionals ensure accurate reporting and compliance.',
      color: '#EFF6FF',
    },
    {
      icon: ClockIcon,
      title: 'Timely Filing',
      description: 'We ensure all deadlines are met to avoid severe penalties.',
      color: '#F0FDF4',
    },
    {
      icon: ExclamationTriangleIcon,
      title: 'Penalty Protection',
      description: 'We help minimize penalties and navigate relief programs.',
      color: '#FEF3C7',
    },
    {
      icon: UserGroupIcon,
      title: 'Dedicated Support',
      description: 'Get personalized assistance throughout the compliance process.',
      color: '#F3E8FF',
    },
  ];

  const title = "US FBAR & FATCA Filing Services | IRS Tax Filer";
  const description = "IRS Tax Filer helps with FBAR & FATCA filing so you can report foreign bank accounts and assets securely and stay compliant.";
  const keywords = "US FBAR filing, FATCA filing, foreign account reporting, expatriate tax filing, online FBAR filing";
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
      <div className="min-h-screen bg-gray-50">
        {/* Enhanced Hero Section */}
        <section className="relative overflow-hidden py-28" style={{ backgroundColor: '#2B547E' }}>
          {/* Animated Background Elements */}
          <div className="absolute inset-0">
            {/* Gradient Orbs */}
            <motion.div
              animate={{
                x: [0, 100, 0],
                y: [0, 50, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute top-20 left-10 w-72 h-72 bg-[#2B547E]/30 rounded-full blur-3xl"
            ></motion.div>
            <motion.div
              animate={{
                x: [0, -80, 0],
                y: [0, -60, 0],
                scale: [1, 1.3, 1],
              }}
              transition={{
                duration: 25,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute bottom-20 right-10 w-96 h-96 bg-[#2B547E]/30 rounded-full blur-3xl"
            ></motion.div>
            <motion.div
              animate={{
                x: [0, 60, 0],
                y: [0, -40, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 18,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-[#2B547E]/20 rounded-full blur-3xl"
            ></motion.div>

            {/* Grid Pattern Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>

            {/* Shine Effect */}
            <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/5 to-transparent"></div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Left Side - Text Content */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                {/* Badge */}
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full mb-6 border border-white/30 shadow-lg"
                >
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  >
                    <StarIcon className="h-4 w-4 text-yellow-300" />
                  </motion.div>
                  <span className="text-white font-semibold text-xs md:text-sm">Foreign Account Compliance</span>
                </motion.div>

                {/* Main Heading */}
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 leading-tight"
                >
                  <span className="block text-white drop-shadow-lg">
                    FBAR & FATCA
                  </span>
                  <motion.span
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="block text-[#EB4149] drop-shadow-2xl"
                  >
                    Filing Services
                  </motion.span>
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="text-sm md:text-base lg:text-lg text-white/90 mb-6 leading-relaxed"
                >
                  Ensure compliance with foreign account reporting requirements. We handle your FBAR and FATCA filings with expertise to avoid penalties and maintain compliance.
                </motion.p>

                {/* Contact Information */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                  className="mb-6"
                >
                  <div className="flex flex-col sm:flex-row gap-4">
                    <a
                      href="tel:++1 (415) 7876190"
                      className="group flex items-center space-x-3 bg-white/10 backdrop-blur-md border border-white/30 rounded-xl px-5 py-3 hover:bg-white/20 transition-all duration-300"
                    >
                      <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                        <PhoneIcon className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <div className="text-xs text-white/70">Call Us</div>
                        <div className="text-sm font-semibold text-white">+1 (415) 7876190</div>
                      </div>
                    </a>
                    <a
                      href="mailto:contact@irstaxfiler.com"
                      className="group flex items-center space-x-3 bg-white/10 backdrop-blur-md border border-white/30 rounded-xl px-5 py-3 hover:bg-white/20 transition-all duration-300"
                    >
                      <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                        <EnvelopeIcon className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <div className="text-xs text-white/70">Email Us</div>
                        <div className="text-sm font-semibold text-white">contact@irstaxfiler.com</div>
                      </div>
                    </a>
                  </div>
                </motion.div>

                {/* Trust Indicators */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 1 }}
                  className="flex flex-wrap items-center gap-4 text-white/80"
                >
                  <div className="flex items-center space-x-2">
                    <CheckCircleIcon className="h-4 w-4 text-green-300" />
                    <span className="text-xs font-medium">Certified Experts</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircleIcon className="h-4 w-4 text-green-300" />
                    <span className="text-xs font-medium">100% Secure</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircleIcon className="h-4 w-4 text-green-300" />
                    <span className="text-xs font-medium">Penalty Protection</span>
                  </div>
                </motion.div>
              </motion.div>

              {/* Right Side - Image */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="relative"
              >
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&h=600&fit=crop&q=80&auto=format"
                    alt="FBAR FATCA compliance"
                    className="w-full h-auto object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://via.placeholder.com/800x600/2B547E/FFFFFF?text=FBAR+FATCA';
                    }}
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-[#2B547E]/10"></div>
                </div>
                {/* Decorative Elements */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-yellow-300/20 rounded-full blur-2xl"></div>
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-[#EB4149]/20 rounded-full blur-2xl"></div>
              </motion.div>
            </div>
          </div>

          {/* Bottom Wave Decoration */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg className="w-full h-16 text-white" fill="currentColor" viewBox="0 0 1200 120" preserveAspectRatio="none">
              <path d="M0,0 C150,100 350,0 600,50 C850,100 1050,0 1200,50 L1200,120 L0,120 Z"></path>
            </svg>
          </div>
        </section>

        {/* FBAR and FATCA Services Cards */}
        <section className="py-20 bg-white relative">
          <div className="absolute top-0 left-0 right-0 h-1" style={{ backgroundColor: '#2B547E' }}></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-primary-navy mb-4">
                Complete Foreign Account Compliance
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                From FBAR to FATCA, we've got you covered for all foreign account reporting requirements
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {services.map((service, index) => {
                const Icon = service.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.15 }}
                    className="group relative"
                  >
                    <div className="rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-4 border border-gray-200/50 overflow-hidden h-full" style={{ backgroundColor: service.bgGradient }}>
                      {/* Decorative Top Bar */}
                      <div className="h-2" style={{ backgroundColor: service.gradient }}></div>

                      <div className="p-8">
                        {/* Icon and Title */}
                        <div className="flex items-center space-x-4 mb-6">
                          <motion.div
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow"
                            style={{ backgroundColor: service.gradient }}
                          >
                            <Icon className="h-8 w-8 text-white" />
                          </motion.div>
                          <div>
                            <h3 className="text-2xl font-bold text-primary-navy mb-1">
                              {service.title}
                            </h3>
                            <p className="text-sm text-gray-600">{service.description}</p>
                          </div>
                        </div>

                        {/* Features List */}
                        <div className="space-y-5">
                          {service.features.map((feature, featureIndex) => {
                            const FeatureIcon = feature.icon;
                            return (
                              <motion.div
                                key={featureIndex}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: featureIndex * 0.1 }}
                                className="flex items-start space-x-3 p-3 rounded-lg hover:bg-white/60 transition-colors"
                              >
                                <div className="flex-shrink-0 mt-1">
                                  <FeatureIcon className={`h-5 w-5`} style={{ color: service.color }} />
                                </div>
                                <div>
                                  <h4 className="text-base font-semibold text-primary-navy mb-1.5">
                                    {feature.title}
                                  </h4>
                                  <p className="text-sm text-gray-600 leading-relaxed">
                                    {feature.description}
                                  </p>
                                </div>
                              </motion.div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-primary-navy mb-4">
                Why Choose Our FBAR & FATCA Services?
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We combine expertise, technology, and personalized service to ensure your foreign account reporting is accurate and compliant.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ y: -8, scale: 1.02 }}
                    className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
                  >
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4`}
                      style={{ backgroundColor: benefit.color }}
                    >
                      <Icon className="h-8 w-8" style={{ color: '#2B547E' }} />
                    </motion.div>
                    <h3 className="text-xl font-bold text-primary-navy mb-3 text-center">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-600 text-center">{benefit.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* What's Included Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <div className="inline-flex items-center space-x-2 bg-primary-blue/10 px-4 py-2 rounded-full mb-4">
                <ChartBarIcon className="h-5 w-5 text-primary-blue" />
                <span className="text-primary-blue font-semibold">Comprehensive Service</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-primary-navy mb-4">
                What's Included
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Our comprehensive service covers everything you need for complete foreign account compliance.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                'FBAR (FinCEN Form 114) preparation and filing',
                'FATCA Form 8938 preparation and filing',
                'Account aggregation and threshold determination',
                'Asset valuation and reporting',
                'Penalty abatement assistance',
                'Voluntary disclosure program guidance',
                'Compliance review and strategy',
                'Year-round support and consultation',
                'Document organization and review',
                'Multi-account coordination',
                'Deadline tracking and reminders',
                'Audit support and representation',
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  whileHover={{ x: 5, scale: 1.02 }}
                  className="flex items-center space-x-3 bg-white p-4 rounded-xl hover:shadow-md transition-all border border-gray-100"
                >
                  <div className="flex-shrink-0">
                    <CheckCircleIcon className="h-6 w-6 text-primary-blue" />
                  </div>
                  <span className="text-gray-700 font-medium">{item}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Enhanced CTA Section */}
        <section className="py-20 relative overflow-hidden" style={{ backgroundColor: '#2B547E' }}>
          <div className="absolute inset-0">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="inline-block mb-6"
              >
                <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto">
                  <StarIcon className="h-10 w-10 text-white" />
                </div>
              </motion.div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                Need FBAR or FATCA Assistance?
              </h2>
              <p className="text-xl md:text-2xl text-blue-100 mb-10 max-w-3xl mx-auto leading-relaxed">
                Get started today with our expert foreign account compliance services. We'll ensure your FBAR and FATCA filings are accurate and timely.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    to="/contact"
                    className="inline-flex items-center space-x-2 px-10 py-5 rounded-xl font-bold text-lg hover:opacity-90 transition-all duration-300 shadow-2xl"
                    style={{ backgroundColor: 'white', color: '#2B547E' }}
                  >
                    <span>Get Started</span>
                    <ArrowRightIcon className="h-5 w-5" />
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    to="/pricing"
                    className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white px-10 py-5 rounded-xl font-bold text-lg hover:bg-white/20 transition-all duration-300"
                  >
                    <span>View Pricing</span>
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default FBARFATCA;

