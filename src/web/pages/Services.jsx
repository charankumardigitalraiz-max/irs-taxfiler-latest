import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  DocumentTextIcon,
  BuildingOfficeIcon,
  IdentificationIcon,
  BanknotesIcon,
  GlobeAltIcon,
  ChatBubbleLeftRightIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  StarIcon,
  ShieldCheckIcon,
  ClockIcon,
  UserGroupIcon,
  BriefcaseIcon,
  FlagIcon,
} from '@heroicons/react/24/outline';
import SEO from '../components/seo/SEO';
import Logo from '../assets/irsLogo.png';

const Services = () => {
  const serviceCategories = [
    {
      title: 'U.S. Individual Services',
      description: 'Comprehensive tax filing solutions for individuals',
      icon: UserGroupIcon,
      services: [
    {
      icon: DocumentTextIcon,
          title: 'Federal, State & Local Tax Filing',
          description: 'Complete federal and state tax return preparation and filing for all income types including W-2, 1099, investment income, and more.',
          link: '/services/us-individual/federal-state-local',
      features: [
        'Form 1040 preparation',
        'All schedules and forms',
        'E-filing with IRS',
        'Tax optimization strategies',
        'Refund processing',
      ],
    },
    {
      icon: IdentificationIcon,
      title: 'ITIN Assistance',
          description: 'Help obtaining Individual Taxpayer Identification Number (ITIN) for non-residents who need to file U.S. taxes.',
          link: '/services/us-individual/itin',
      features: [
        'ITIN application support',
        'Document preparation',
        'W-7 form filing',
        'Status tracking',
        'Renewal assistance',
      ],
    },
    {
      icon: BanknotesIcon,
      title: 'FBAR/FATCA Filing',
          description: 'Foreign Bank Account Report (FBAR) and FATCA compliance filing services for U.S. persons with foreign accounts.',
          link: '/services/us-individual/fbar-fatca',
      features: [
        'FBAR (FinCEN Form 114)',
        'FATCA Form 8938',
        'Account aggregation',
        'Compliance review',
        'Penalty avoidance',
      ],
        },
        {
          icon: ShieldCheckIcon,
          title: 'Tax Representation',
          description: 'Expert representation before the IRS for audits, notices, and tax disputes. We handle all correspondence and negotiations.',
          link: '/services/us-individual/representation',
          features: [
            'IRS audit representation',
            'Notice response handling',
            'Tax dispute resolution',
            'Power of Attorney filing',
            'Expert negotiation',
          ],
        },
        {
          icon: ClockIcon,
          title: 'Tax Extension Filing',
          description: 'File for automatic extensions to get more time to prepare and file your tax returns without penalties.',
          link: '/services/us-individual/extension',
          features: [
            'Form 4868 filing',
            'State extension filing',
            'Penalty avoidance',
            'Quick processing',
            'Confirmation tracking',
          ],
        },
      ],
    },
    {
      title: 'U.S. Business Services',
      description: 'Tax solutions for businesses and corporations',
      icon: BriefcaseIcon,
      services: [
        {
          icon: BuildingOfficeIcon,
          title: 'Business Incorporations',
          description: 'Complete assistance with forming LLCs, S-Corps, C-Corps, and other business entities with proper tax structure setup.',
          link: '/services/us-business/incorporations',
          features: [
            'Entity formation',
            'EIN application',
            'Tax structure setup',
            'Compliance guidance',
            'Ongoing support',
          ],
        },
        {
          icon: DocumentTextIcon,
          title: 'SMB Tax Filing',
          description: 'Comprehensive tax filing services for small and medium businesses including corporate returns, payroll taxes, and more.',
          link: '/services/us-business/smb-tax-filing',
      features: [
            'Corporate tax returns',
            'Partnership returns',
            'Payroll tax filing',
            'Quarterly estimates',
            'Business deductions',
          ],
        },
      ],
    },
    {
      title: 'Indian Tax Services',
      description: 'Specialized services for Indian tax compliance',
      icon: FlagIcon,
      services: [
        {
          icon: GlobeAltIcon,
          title: 'Indian Tax Filing (ITR)',
          description: 'Expert handling of Indian Income Tax Returns (ITR) for NRIs, residents, and dual citizens with U.S. income.',
          link: '/services/indian/tax-filing',
          features: [
            'ITR preparation & filing',
            'NRI tax compliance',
            'Tax treaty benefits',
            'Double taxation relief',
            'Form 16 processing',
          ],
        },
        {
          icon: ShieldCheckIcon,
          title: 'Indian Tax Representation',
          description: 'Professional representation before Indian tax authorities for assessments, appeals, and compliance matters.',
          link: '/services/indian/representation',
      features: [
            'Assessment representation',
            'Appeal filing',
            'Notice response',
            'Compliance support',
            'Expert guidance',
          ],
        },
      ],
    },
  ];

  const stats = [
    {
      number: '50,000+',
      label: 'Tax Returns Filed',
      icon: DocumentTextIcon,
      color: '#2B547E', // Primary logo color
    },
    {
      number: '10,000+',
      label: 'Happy Clients',
      icon: UserGroupIcon,
      color: '#3C6AA3', // Lighter shade of primary
    },
    {
      number: '98%',
      label: 'Client Satisfaction',
      icon: StarIcon,
      color: '#EB4149', // Secondary logo color
    },
    {
      number: '15+',
      label: 'Years Experience',
      icon: ClockIcon,
      color: '#2B547E', // Primary logo color
    },
  ];

  const title = "About Us | IRS Tax Filer";
  const description = "Learn about IRS Tax Filer — our mission, expertise in US & Indian tax services, and commitment to secure,Learn more.";
  const keywords = "online tax filing service,tax service provider,Internal Revenue Service,IRS Tax Filer about, US & Indian tax services, tax filing expertise, tax compliance company";
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
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
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
              <span className="text-white font-semibold text-xs md:text-sm">Comprehensive Tax Solutions</span>
            </motion.div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 leading-tight">
              <span className="block text-white drop-shadow-lg">Our Services</span>
              <motion.span
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="block text-[#EB4149] drop-shadow-2xl"
              >
                Tailored for Global Indians
              </motion.span>
            </h1>

            <p className="text-base md:text-lg text-white/90 max-w-3xl mx-auto leading-relaxed">
              Comprehensive tax filing solutions for individuals, businesses, and NRIs. 
              We combine deep tax expertise with cutting-edge technology to make tax filing stress-free.
            </p>
          </motion.div>
        </div>

        {/* Bottom Wave Decoration */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg className="w-full h-16 text-white" fill="currentColor" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0 C150,100 350,0 600,50 C850,100 1050,0 1200,50 L1200,120 L0,120 Z"></path>
          </svg>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white relative -mt-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center"
                >
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: `${stat.color}20` }}>
                    <Icon className="h-6 w-6" style={{ color: stat.color }} />
                  </div>
                  <p className="text-3xl font-bold text-gray-900 mb-1">{stat.number}</p>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services by Category */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {serviceCategories.map((category, categoryIndex) => {
            const CategoryIcon = category.icon;
            return (
              <motion.div
                key={categoryIndex}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="mb-20 last:mb-0"
              >
                {/* Category Header */}
                <div className="flex items-center space-x-4 mb-8">
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#2B547E' }}>
                    <CategoryIcon className="h-7 w-7 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">{category.title}</h2>
                    <p className="text-gray-600 mt-1">{category.description}</p>
                  </div>
                    </div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {category.services.map((service, serviceIndex) => {
                    const ServiceIcon = service.icon;
                    return (
                      <motion.div
                        key={serviceIndex}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: serviceIndex * 0.1 }}
                        whileHover={{ y: -8, scale: 1.02 }}
                        className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden group"
                      >
                        <div className="p-6">
                          <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300" style={{ backgroundColor: '#2B547E' }}>
                            <ServiceIcon className="h-7 w-7 text-white" />
                    </div>
                          <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {service.title}
                    </h3>
                          <p className="text-gray-600 mb-4 leading-relaxed text-sm">
                      {service.description}
                    </p>
                          <ul className="space-y-2 mb-6">
                            {service.features.slice(0, 3).map((feature, featureIndex) => (
                        <li
                          key={featureIndex}
                          className="flex items-start space-x-2"
                        >
                                <CheckCircleIcon className="h-5 w-5 flex-shrink-0 mt-0.5" style={{ color: '#2B547E' }} />
                                <span className="text-gray-700 text-xs">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                    <Link
                            to={service.link}
                            className="inline-flex items-center space-x-2 font-semibold transition-colors group-hover:translate-x-1 duration-300"
                            style={{ color: '#2B547E' }}
                    >
                      <span>Learn More</span>
                      <ArrowRightIcon className="h-5 w-5" />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Additional Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
              Additional Support Services
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Beyond tax filing, we offer comprehensive support to ensure your complete tax compliance and peace of mind.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100"
            >
              <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: '#2B547E' }}>
                <ChatBubbleLeftRightIcon className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Tax Consultation
              </h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Personalized tax planning and consultation for complex situations, business owners, and high-net-worth individuals.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start space-x-2">
                  <CheckCircleIcon className="h-5 w-5 flex-shrink-0 mt-0.5" style={{ color: '#2B547E' }} />
                  <span className="text-gray-700 text-sm">Tax planning strategies</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircleIcon className="h-5 w-5 flex-shrink-0 mt-0.5" style={{ color: '#2B547E' }} />
                  <span className="text-gray-700 text-sm">Year-round consultation</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircleIcon className="h-5 w-5 flex-shrink-0 mt-0.5" style={{ color: '#2B547E' }} />
                  <span className="text-gray-700 text-sm">Complex situation handling</span>
                </li>
              </ul>
              <Link
                to="/contact"
                className="inline-flex items-center space-x-2 font-semibold transition-colors"
                style={{ color: '#2B547E' }}
              >
                <span>Get Consultation</span>
                <ArrowRightIcon className="h-5 w-5" />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100"
            >
              <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: '#2B547E' }}>
                <GlobeAltIcon className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Dual-Country Tax Filing
              </h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Expert handling of tax obligations in both U.S. and India, ensuring compliance and maximizing tax treaty benefits.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start space-x-2">
                  <CheckCircleIcon className="h-5 w-5 flex-shrink-0 mt-0.5" style={{ color: '#2B547E' }} />
                  <span className="text-gray-700 text-sm">U.S. tax filing</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircleIcon className="h-5 w-5 flex-shrink-0 mt-0.5" style={{ color: '#2B547E' }} />
                  <span className="text-gray-700 text-sm">India tax filing (ITR)</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircleIcon className="h-5 w-5 flex-shrink-0 mt-0.5" style={{ color: '#2B547E' }} />
                  <span className="text-gray-700 text-sm">Tax treaty optimization</span>
                </li>
              </ul>
              <Link
                to="/contact"
                className="inline-flex items-center space-x-2 font-semibold transition-colors"
                style={{ color: '#2B547E' }}
              >
                <span>Learn More</span>
                <ArrowRightIcon className="h-5 w-5" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden" style={{ backgroundColor: '#2B547E' }}>
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
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
            className="absolute top-20 left-10 w-72 h-72 bg-[#2B547E]/20 rounded-full blur-3xl"
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
            className="absolute bottom-20 right-10 w-96 h-96 bg-[#2B547E]/20 rounded-full blur-3xl"
          ></motion.div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Contact us today to discuss your tax filing needs and get a personalized quote. 
              Our expert team is here to help you every step of the way.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
                className="inline-flex items-center justify-center space-x-2 bg-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-all duration-300 shadow-xl hover:scale-105"
                style={{ color: '#2B547E' }}
            >
              <span>Contact Us</span>
              <ArrowRightIcon className="h-5 w-5" />
            </Link>
              <Link
                to="/pricing"
                className="inline-flex items-center justify-center space-x-2 bg-white/10 backdrop-blur-md text-white border-2 border-white/30 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/20 transition-all duration-300"
              >
                <span>View Pricing</span>
                <ArrowRightIcon className="h-5 w-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
    </>
  );
};

export default Services;
