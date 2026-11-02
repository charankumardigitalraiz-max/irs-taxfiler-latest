import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  UserGroupIcon,
  ShieldCheckIcon,
  DocumentTextIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  ClockIcon,
  CurrencyDollarIcon,
  StarIcon,
  ChartBarIcon,
  PhoneIcon,
  EnvelopeIcon,
  BuildingLibraryIcon,
  BriefcaseIcon,
  DocumentCheckIcon,
} from '@heroicons/react/24/outline';
import SEO from '../../components/seo/SEO';
import Logo from '../../assets/irsLogo.png';

const Representation = () => {
  const irsRepresentationFeatures = [
    {
      icon: CheckCircleIcon,
      title: 'IRS Audit Representation',
      description:
        'We represent you during IRS audits, examinations, and inquiries. Our experienced professionals handle all communications with the IRS on your behalf.',
    },
    {
      icon: CheckCircleIcon,
      title: 'Notice Response & Resolution',
      description:
        'We respond to IRS notices, CP letters, and other correspondence, working to resolve issues quickly and minimize penalties and interest.',
    },
    {
      icon: CheckCircleIcon,
      title: 'Appeals & Collections',
      description:
        'We assist with IRS appeals, collection matters, installment agreements, offers in compromise, and other resolution strategies.',
    },
  ];

  const stateRepresentationFeatures = [
    {
      icon: CheckCircleIcon,
      title: 'State Tax Audit Representation',
      description:
        'We represent you in state tax audits and examinations, ensuring your rights are protected and working to achieve the best possible outcome.',
    },
    {
      icon: CheckCircleIcon,
      title: 'State Notice Resolution',
      description:
        'We handle state tax notices, assessments, and correspondence, working with state tax authorities to resolve issues efficiently.',
    },
    {
      icon: CheckCircleIcon,
      title: 'Multi-State Coordination',
      description:
        'For taxpayers with obligations in multiple states, we coordinate representation across jurisdictions to ensure consistent and effective resolution.',
    },
  ];

  const services = [
    {
      icon: BuildingLibraryIcon,
      title: 'IRS Representation',
      description: 'Professional representation before the Internal Revenue Service',
      gradient: '#2B547E',
      bgGradient: '#F5F9FF',
      features: irsRepresentationFeatures,
      color: '#2B547E',
    },
    {
      icon: DocumentCheckIcon,
      title: 'State Tax Representation',
      description: 'Expert representation before state tax authorities',
      gradient: '#2B547E',
      bgGradient: '#F5F9FF',
      features: stateRepresentationFeatures,
      color: '#9333EA',
    },
  ];

  const benefits = [
    {
      icon: ShieldCheckIcon,
      title: 'Expert Representation',
      description: 'Certified tax professionals with extensive IRS and state tax authority experience.',
      color: '#EFF6FF',
    },
    {
      icon: ClockIcon,
      title: 'Timely Resolution',
      description: 'We work efficiently to resolve tax issues and minimize delays.',
      color: '#F0FDF4',
    },
    {
      icon: CurrencyDollarIcon,
      title: 'Cost Savings',
      description: 'We help minimize penalties, interest, and tax liabilities through expert negotiation.',
      color: '#FEF3C7',
    },
    {
      icon: UserGroupIcon,
      title: 'Peace of Mind',
      description: 'Let us handle the stress while you focus on what matters most.',
      color: '#F3E8FF',
    },
  ];

  const title = "US Tax Representation Services | IRS Tax Filer";
   const description = "IRS Tax Filer offers expert U.S. tax representation for individuals facing IRS issues or audits — fast, reliable, and professional support.";
   const keywords = "Best US tax representation, IRS audit defense, IRS tax issues help, US individual tax support, NRI tax representation, federal tax representation online";
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
      <div className="min-h-screen bg-gray-50 overflow-x-hidden">
        {/* Enhanced Hero Section */}
        <section className="relative overflow-hidden py-16 sm:py-20 lg:py-28" style={{ backgroundColor: '#2B547E' }}>
          {/* Animated Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
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
              className="absolute top-20 left-0 sm:left-10 w-48 h-48 sm:w-72 sm:h-72 bg-[#2B547E]/30 rounded-full blur-3xl"
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
              className="absolute bottom-20 right-0 sm:right-10 w-64 h-64 sm:w-96 sm:h-96 bg-[#2B547E]/30 rounded-full blur-3xl"
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
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 sm:w-80 sm:h-80 bg-[#2B547E]/20 rounded-full blur-3xl"
            ></motion.div>

            {/* Grid Pattern Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>

            {/* Shine Effect */}
            <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/5 to-transparent"></div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
              {/* Left Side - Text Content */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="w-full"
              >
                {/* Badge */}
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-md px-3 sm:px-4 py-2 rounded-full mb-6 border border-white/30 shadow-lg max-w-full"
                >
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  >
                    <StarIcon className="h-4 w-4 text-yellow-300" />
                  </motion.div>
                  <span className="text-white font-semibold text-xs md:text-sm break-words">Professional Tax Representation</span>
                </motion.div>

                {/* Main Heading */}
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 leading-tight"
                >
                  <span className="block text-white drop-shadow-lg break-words">
                    Tax Representation
                  </span>
                  <motion.span
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="block text-[#EB4149] drop-shadow-2xl break-words"
                  >
                    Services
                  </motion.span>
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="text-xs sm:text-sm md:text-base lg:text-lg text-white/90 mb-6 leading-relaxed"
                >
                  Expert representation before the IRS and state tax authorities. We handle audits, notices, appeals, and collections on your behalf.
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
                      className="group flex items-center space-x-3 bg-white/10 backdrop-blur-md border border-white/30 rounded-xl px-4 sm:px-5 py-3 hover:bg-white/20 transition-all duration-300 w-full sm:w-auto"
                    >
                      <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <PhoneIcon className="h-5 w-5 text-white" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-xs text-white/70">Call Us</div>
                        <div className="text-sm font-semibold text-white truncate">+1 (415) 7876190</div>
                      </div>
                    </a>
                    <a
                      href="mailto:contact@irstaxfiler.com"
                      className="group flex items-center space-x-3 bg-white/10 backdrop-blur-md border border-white/30 rounded-xl px-4 sm:px-5 py-3 hover:bg-white/20 transition-all duration-300 w-full sm:w-auto"
                    >
                      <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <EnvelopeIcon className="h-5 w-5 text-white" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-xs text-white/70">Email Us</div>
                        <div className="text-sm font-semibold text-white truncate">contact@irstaxfiler.com</div>
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
                    <span className="text-xs font-medium">Proven Results</span>
                  </div>
                </motion.div>
              </motion.div>

              {/* Right Side - Image */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="relative w-full mt-6 lg:mt-0"
              >
                <div className="relative rounded-2xl overflow-hidden shadow-2xl w-full">
                  <img
                    src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop&q=80"
                    alt="Tax representation professional"
                    className="w-full h-auto object-cover max-w-full"
                  />
                  <div className="absolute inset-0 bg-[#2B547E]/10"></div>
                </div>
                {/* Decorative Elements - Hidden on mobile to prevent overflow */}
                <div className="hidden sm:block absolute -top-4 -right-4 w-24 h-24 bg-[#2B547E]/20 rounded-full blur-2xl"></div>
                <div className="hidden sm:block absolute -bottom-4 -left-4 w-32 h-32 bg-[#2B547E]/20 rounded-full blur-2xl"></div>
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

        {/* IRS and State Representation Cards */}
        <section className="py-12 sm:py-20 bg-white relative">
          <div className="absolute top-0 left-0 right-0 h-1" style={{ backgroundColor: '#2B547E' }}></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-primary-navy mb-4">
                Complete Tax Representation Services
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                From IRS audits to state tax matters, we represent you at every level
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
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

                      <div className="p-4 sm:p-6 lg:p-8">
                        {/* Icon and Title */}
                        <div className="flex items-center space-x-3 sm:space-x-4 mb-4 sm:mb-6">
                          <motion.div
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow flex-shrink-0"
                            style={{ backgroundColor: service.gradient }}
                          >
                            <Icon className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                          </motion.div>
                          <div className="min-w-0 flex-1">
                            <h3 className="text-xl sm:text-2xl font-bold text-primary-navy mb-1 break-words">
                              {service.title}
                            </h3>
                            <p className="text-xs sm:text-sm text-gray-600 break-words">{service.description}</p>
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
                                className="flex items-start space-x-3 p-2 sm:p-3 rounded-lg hover:bg-white/60 transition-colors"
                              >
                                <div className="flex-shrink-0 mt-1">
                                  <FeatureIcon className="h-4 w-4 sm:h-5 sm:w-5" style={{ color: service.color }} />
                                </div>
                                <div className="min-w-0 flex-1">
                                  <h4 className="text-sm sm:text-base font-semibold text-primary-navy mb-1.5 break-words">
                                    {feature.title}
                                  </h4>
                                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed break-words">
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
        <section className="py-12 sm:py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-primary-navy mb-4 break-words">
                Why Choose Our Representation Services?
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto break-words">
                We combine expertise, experience, and personalized service to ensure the best possible outcome for your tax matters.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
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
                    className="bg-white p-4 sm:p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 w-full"
                  >
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4"
                      style={{ backgroundColor: benefit.color }}
                    >
                      <Icon className="h-6 w-6 sm:h-8 sm:w-8" style={{ color: '#2B547E' }} />
                    </motion.div>
                    <h3 className="text-lg sm:text-xl font-bold text-primary-navy mb-2 sm:mb-3 text-center break-words">
                      {benefit.title}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600 text-center break-words">{benefit.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* What's Included Section */}
        <section className="py-12 sm:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-8 sm:mb-16"
            >
              <div className="inline-flex items-center space-x-2 bg-primary-blue/10 px-3 sm:px-4 py-2 rounded-full mb-4">
                <ChartBarIcon className="h-4 w-4 sm:h-5 sm:w-5 text-primary-blue" />
                <span className="text-primary-blue font-semibold text-xs sm:text-sm">Comprehensive Service</span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-primary-navy mb-4 break-words">
                What's Included
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto break-words">
                Our comprehensive representation service covers everything you need for complete tax authority representation.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                'IRS audit representation and defense',
                'State tax audit representation',
                'Notice response and resolution',
                'IRS appeals representation',
                'Collection matter resolution',
                'Installment agreement negotiation',
                'Offer in compromise preparation',
                'Penalty abatement requests',
                'Power of Attorney (POA) filing',
                'Year-round consultation and support',
                'Document preparation and organization',
                'Tax authority communication management',
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  whileHover={{ x: 5, scale: 1.02 }}
                  className="flex items-center space-x-3 bg-white p-3 sm:p-4 rounded-xl hover:shadow-md transition-all border border-gray-100 w-full"
                >
                  <div className="flex-shrink-0">
                    <CheckCircleIcon className="h-5 w-5 sm:h-6 sm:w-6 text-primary-blue" />
                  </div>
                  <span className="text-gray-700 font-medium text-sm sm:text-base break-words flex-1">{item}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Enhanced CTA Section */}
        <section className="py-12 sm:py-20 relative overflow-hidden" style={{ backgroundColor: '#2B547E' }}>
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 sm:w-96 sm:h-96 bg-white/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 sm:w-96 sm:h-96 bg-white/5 rounded-full blur-3xl"></div>
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 w-full">
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
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4 sm:mb-6 break-words px-2">
                Need Tax Representation?
              </h2>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-blue-100 mb-6 sm:mb-10 max-w-3xl mx-auto leading-relaxed break-words px-2">
                Get started today with our expert tax representation services. We'll handle all communications with tax authorities on your behalf.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-2">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full sm:w-auto">
                  <Link
                    to="/contact"
                    className="inline-flex items-center justify-center space-x-2 bg-white px-6 sm:px-8 lg:px-10 py-3 sm:py-4 lg:py-5 rounded-xl font-bold text-sm sm:text-base lg:text-lg hover:bg-gray-100 transition-all duration-300 shadow-2xl w-full sm:w-auto"
                    style={{ backgroundColor: 'white', color: '#2B547E' }}
                  >
                    <span>Get Started</span>
                    <ArrowRightIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full sm:w-auto">
                  <Link
                    to="/pricing"
                    className="inline-flex items-center justify-center space-x-2 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white px-6 sm:px-8 lg:px-10 py-3 sm:py-4 lg:py-5 rounded-xl font-bold text-sm sm:text-base lg:text-lg hover:bg-white/20 transition-all duration-300 w-full sm:w-auto"
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

export default Representation;

