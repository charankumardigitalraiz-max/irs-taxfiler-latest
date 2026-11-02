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
  ExclamationTriangleIcon,
} from '@heroicons/react/24/outline';
import SEO from '../../components/seo/SEO';
import Logo from '../../assets/irsLogo.png';

const IndianRepresentation = () => {
  const itDepartmentFeatures = [
    {
      icon: CheckCircleIcon,
      title: 'Income Tax Department Representation',
      description:
        'We represent you before the Income Tax Department during assessments, inquiries, and proceedings. Our experienced professionals handle all communications on your behalf.',
    },
    {
      icon: CheckCircleIcon,
      title: 'Notice Response & Resolution',
      description:
        'We respond to Income Tax notices, assessment orders, and other correspondence, working to resolve issues quickly and minimize tax liabilities and penalties.',
    },
    {
      icon: CheckCircleIcon,
      title: 'Appeals & Revisions',
      description:
        'We assist with filing appeals before CIT(A), ITAT, and higher authorities, as well as revision petitions to ensure your rights are protected.',
    },
  ];

  const assessmentFeatures = [
    {
      icon: CheckCircleIcon,
      title: 'Assessment Proceedings',
      description:
        'We represent you during scrutiny assessments, best judgment assessments, and other assessment proceedings before the Income Tax Department.',
    },
    {
      icon: CheckCircleIcon,
      title: 'Penalty Proceedings',
      description:
        'We defend you in penalty proceedings and work to minimize or eliminate penalties through proper representation and documentation.',
    },
    {
      icon: CheckCircleIcon,
      title: 'Rectification & Reopening',
      description:
        'We handle rectification applications and respond to reopening notices under Section 147/148, ensuring proper representation throughout the process.',
    },
  ];

  const services = [
    {
      icon: BuildingLibraryIcon,
      title: 'IT Department Representation',
      description: 'Professional representation before Income Tax Department',
      gradient: '#2B547E',
      bgGradient: '#F5F9FF',
      features: itDepartmentFeatures,
      color: '#3B82F6',
    },
    {
      icon: ShieldCheckIcon,
      title: 'Assessment & Appeals',
      description: 'Expert representation in assessments and appeals',
      gradient: '#2B547E',
      bgGradient: '#F5F9FF',
      features: assessmentFeatures,
      color: '#9333EA',
    },
  ];

  const benefits = [
    {
      icon: ShieldCheckIcon,
      title: 'Expert Representation',
      description: 'Certified tax professionals with extensive Income Tax Department experience.',
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
      description: 'We help minimize tax liabilities, penalties, and interest through expert negotiation.',
      color: '#FEF3C7',
    },
    {
      icon: UserGroupIcon,
      title: 'Peace of Mind',
      description: 'Let us handle the stress while you focus on what matters most.',
      color: '#F3E8FF',
    },
  ];

  const title = "India Tax Representation Services | IRS Tax Filer";
  const description = "IRS Tax Filer helps with Indian tax audits and notices, offering expert representation and compliance support for hassle-free handling.";
  const keywords = "irs tax filing india, nri indian tax help, itr notice representation, tax audit representation india, form 1040nr filing";
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
                <span className="text-white font-semibold text-xs md:text-sm">Professional Tax Representation</span>
              </motion.div>

              {/* Main Heading */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 leading-tight"
              >
                <span className="block text-white drop-shadow-lg break-words">
                  Indian Tax Representation
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
                Expert representation before the Income Tax Department of India. We handle assessments, notices, appeals, and all tax authority proceedings on your behalf.
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
                  alt="Indian tax representation professional"
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

      {/* IT Department and Assessment Representation Cards */}
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
              From Income Tax Department representation to appeals, we represent you at every level
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
                      <div className="flex items-center space-x-4 mb-6">
                        <motion.div
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow"
                          style={{ backgroundColor: service.gradient }}
                        >
                          <Icon className="h-8 w-8 text-white" />
                        </motion.div>
                        <div className="min-w-0 flex-1">
                          <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-primary-navy mb-1 break-words">
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
                              className="flex items-start space-x-3 p-3 rounded-lg hover:bg-white/60 transition-colors"
                            >
                              <div className="flex-shrink-0 mt-1">
                                <FeatureIcon className={`h-5 w-5`} style={{ color: service.color }} />
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
            <h2 className="text-4xl md:text-5xl font-bold text-primary-navy mb-4">
              Why Choose Our Representation Services?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We combine expertise, experience, and personalized service to ensure the best possible outcome for your Indian tax matters.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
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
      <section className="py-12 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
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
              Our comprehensive representation service covers everything you need for complete Income Tax Department representation.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {[
              'Income Tax Department representation',
              'Assessment proceedings representation',
              'Notice response and resolution',
              'Appeals before CIT(A)',
              'ITAT appeals representation',
              'Penalty proceedings defense',
              'Rectification applications',
              'Reopening notice responses',
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
                  <CheckCircleIcon className="h-6 w-6 text-primary-blue" />
                </div>
                <span className="text-gray-700 font-medium">{item}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-12 sm:py-20 relative overflow-hidden" style={{ backgroundColor: '#2B547E' }}>
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 sm:w-96 sm:h-96 bg-white/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 sm:w-96 sm:h-96 bg-white/5 rounded-full blur-3xl"></div>
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
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4 sm:mb-6">
              Need Tax Representation?
            </h2>
            <p className="text-sm sm:text-base md:text-xl lg:text-2xl text-blue-100 mb-6 sm:mb-10 max-w-3xl mx-auto leading-relaxed">
              Get started today with our expert Indian tax representation services. We'll handle all communications with the Income Tax Department on your behalf.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-2">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full sm:w-auto">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center space-x-2 px-6 sm:px-10 py-3 sm:py-5 rounded-xl font-bold text-sm sm:text-lg hover:opacity-90 transition-all duration-300 shadow-2xl w-full sm:w-auto"
                  style={{ backgroundColor: 'white', color: '#2B547E' }}
                >
                  <span>Get Started</span>
                  <ArrowRightIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full sm:w-auto">
                <Link
                  to="/pricing"
                  className="inline-flex items-center justify-center space-x-2 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white px-6 sm:px-10 py-3 sm:py-5 rounded-xl font-bold text-sm sm:text-lg hover:bg-white/20 transition-all duration-300 w-full sm:w-auto"
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

export default IndianRepresentation;

