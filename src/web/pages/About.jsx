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
  PhoneIcon,
  EnvelopeIcon,
  AcademicCapIcon,
  ClockIcon,
  CurrencyDollarIcon,
  GlobeAltIcon,
  BuildingOfficeIcon,
  DocumentTextIcon,
} from '@heroicons/react/24/outline';
import SEO from '../components/seo/SEO';
import Logo from '../assets/irsLogo.png';

const About = () => {
  const values = [
    {
      icon: ShieldCheckIcon,
      title: 'Trust & Security',
      description:
        'Your financial information is protected with bank-level encryption and strict privacy policies.',
      color: '#EFF6FF',
    },
    {
      icon: UserGroupIcon,
      title: 'Expert Team',
      description:
        'Our certified tax professionals have years of experience handling complex tax situations.',
      color: '#F0FDF4',
    },
    {
      icon: LightBulbIcon,
      title: 'Innovation',
      description:
        'We leverage technology to streamline the tax filing process while maintaining accuracy.',
      color: '#FEF3C7',
    },
    {
      icon: ChartBarIcon,
      title: 'Results-Driven',
      description:
        'We focus on maximizing your tax savings while ensuring full compliance with regulations.',
      color: '#F3E8FF',
    },
  ];

  const whyChooseUs = [
    {
      icon: CheckCircleIcon,
      title: 'Certified Tax Professionals',
      description: 'Our team consists of certified tax professionals with specialized expertise in U.S. and Indian tax laws, ensuring accurate and compliant filings.',
    },
    {
      icon: CheckCircleIcon,
      title: 'Secure Document Handling',
      description: 'We use bank-level encryption and secure document management systems to protect your sensitive financial information throughout the filing process.',
    },
    {
      icon: CheckCircleIcon,
      title: 'Transparent Pricing',
      description: 'No hidden fees or surprises. Our pricing is clear and upfront, so you know exactly what you\'re paying for before we begin.',
    },
    {
      icon: CheckCircleIcon,
      title: 'Dual-Country Expertise',
      description: 'We specialize in handling tax obligations for individuals with ties to both the U.S. and India, including NRI tax filing and compliance.',
    },
    {
      icon: CheckCircleIcon,
      title: 'Real-Time Tracking',
      description: 'Track your filing status in real-time through our secure dashboard, keeping you informed every step of the way.',
    },
    {
      icon: CheckCircleIcon,
      title: 'Dedicated Support',
      description: 'Our customer support team is available to answer your questions and provide assistance throughout the entire tax filing process.',
    },
  ];

  const stats = [
    {
      number: '10,000+',
      label: 'Happy Clients',
      icon: UserGroupIcon,
      color: '#2B547E', // Primary logo color
    },
    {
      number: '50,000+',
      label: 'Tax Returns Filed',
      icon: DocumentTextIcon,
      color: '#3C6AA3', // Lighter shade of primary
    },
    {
      number: '15+',
      label: 'Years Experience',
      icon: ClockIcon,
      color: '#2B547E', // Primary logo color
    },
    {
      number: '98%',
      label: 'Client Satisfaction',
      icon: StarIcon,
      color: '#EB4149', // Secondary logo color
    },
  ];

  const title = "About Us | IRS Tax Filer";
  const description = "Learn about IRS Tax Filer — our mission, expertise in US & Indian tax services, and commitment to secure,Learn more.";
  const keywords = "online tax filing service,tax service provider,Internal Revenue Service,IRS Tax Filer about, US & Indian tax services, tax filing expertise, tax compliance company";
  const canonical = {Logo};
  const image ={Logo};
  return (
    <>
    <SEO
        title={title}
        description={description}
        canonical={canonical}
        image={image}
        keywords={keywords}
      />
    <div className="min-h-screen bg-gray-50 overflow-x-hidden w-full max-w-full">
      {/* Enhanced Hero Section */}
      <section className="relative overflow-hidden py-28 w-full" style={{ backgroundColor: '#2B547E' }}>
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">

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
            className="absolute top-20 left-10 w-48 h-48 sm:w-72 sm:h-72 bg-[#2B547E]/30 rounded-full blur-3xl"
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
            className="absolute bottom-20 right-10 w-64 h-64 sm:w-96 sm:h-96 bg-[#2B547E]/30 rounded-full blur-3xl"
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
              <span className="text-white font-semibold text-xs md:text-sm">Your Trusted Tax Partner</span>
            </motion.div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 leading-tight">
              <span className="block text-white drop-shadow-lg">About TaxFiling</span>
              <motion.span
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="block text-[#EB4149] drop-shadow-2xl"
              >
                Simplifying Tax Filing for Everyone
              </motion.span>
            </h1>

            <p className="text-base md:text-lg text-white/90 max-w-3xl mx-auto leading-relaxed">
              Simplifying U.S. tax compliance for global Indians with professionalism, expertise, and care.
              We combine deep tax knowledge with cutting-edge technology to make tax filing stress-free.
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
      <section className="py-16 bg-white relative -mt-1 w-full overflow-x-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
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

      {/* Mission Section */}
      <section className="py-20 bg-white w-full overflow-x-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-primary-navy mb-6">
                Our Mission
              </h2>
              <p className="text-base text-gray-600 mb-4 leading-relaxed">
                At TaxFiling, we understand the unique challenges faced by Indians living and working in the United States.
                Navigating the complex U.S. tax system while maintaining compliance with both U.S. and Indian tax laws can be overwhelming.
              </p>
              <p className="text-base text-gray-600 mb-4 leading-relaxed">
                Our mission is to provide expert, reliable, and affordable tax filing services that give you peace of mind.
                We combine deep tax expertise with cutting-edge technology to make the process as smooth and stress-free as possible.
              </p>
              <p className="text-base text-gray-600 leading-relaxed">
                Whether you're an NRI, an expatriate, or a dual citizen, we're here to ensure your taxes are filed correctly,
                on time, and optimized for maximum savings.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&h=600&fit=crop&q=80"
                  alt="Professional tax team"
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-[#2B547E]/10"></div>
              </div>
              <div className="absolute -top-4 -right-4 w-16 h-16 sm:w-24 sm:h-24 bg-[#2B547E]/20 rounded-full blur-2xl"></div>
              <div className="absolute -bottom-4 -left-4 w-20 h-20 sm:w-32 sm:h-32 bg-[#2B547E]/20 rounded-full blur-2xl"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-gray-50 w-full overflow-x-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-primary-navy mb-4">
              Why Choose TaxFiling?
            </h2>
            <p className="text-base text-gray-600 max-w-3xl mx-auto">
              We combine expertise, technology, and personalized service to deliver exceptional results
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyChooseUs.map((item, index) => {
              const Icon = item.icon;
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
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#F0FDF4' }}>
                      <Icon className="h-5 w-5" style={{ color: '#2B547E' }} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-primary-navy mb-2">
                        {item.title}
                      </h3>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-20 bg-white w-full overflow-x-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-primary-navy mb-4">
              Our Core Values
            </h2>
            <p className="text-base text-gray-600 max-w-3xl mx-auto">
              The principles that guide everything we do
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 text-center"
                >
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4`}
                    style={{ backgroundColor: value.color }}
                  >
                    <Icon className="h-8 w-8" style={{ color: '#2B547E' }} />
                  </motion.div>
                  <h3 className="text-lg font-bold text-primary-navy mb-3">
                    {value.title}
                  </h3>
                  <p className="text-sm text-gray-600">{value.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Expatriates Need Professional Tax Filing */}
      <section className="py-20 bg-gray-50 w-full overflow-x-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-primary-navy mb-4">
              Why Expatriates Need Professional Tax Filing
            </h2>
            <p className="text-base text-gray-600 max-w-3xl mx-auto">
              Understanding the complexities of cross-border taxation
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: 'Complex Tax Laws',
                description: 'U.S. tax laws are complex and constantly changing. For expatriates, understanding how U.S. tax obligations interact with Indian tax laws requires specialized knowledge. Missing deadlines or filing incorrectly can result in penalties and interest charges.',
                icon: DocumentTextIcon,
                color: '#EFF6FF',
              },
              {
                title: 'Tax Treaty Benefits',
                description: 'The U.S.-India tax treaty provides benefits to avoid double taxation. However, claiming these benefits correctly requires proper documentation and understanding of treaty provisions. Our experts ensure you maximize these benefits.',
                icon: GlobeAltIcon,
                color: '#F0FDF4',
              },
              {
                title: 'FBAR & FATCA Compliance',
                description: 'If you have foreign bank accounts or assets, you may need to file FBAR and FATCA forms. Non-compliance can result in severe penalties. We help ensure you meet all reporting requirements.',
                icon: ShieldCheckIcon,
                color: '#FEF3C7',
              },
              {
                title: 'Time & Stress Savings',
                description: 'Tax filing can be time-consuming and stressful. By entrusting your taxes to professionals, you can focus on your career and family while we handle the complexities. We save you time and provide peace of mind.',
                icon: ClockIcon,
                color: '#F3E8FF',
              },
            ].map((item, index) => {
              const Icon = item.icon;
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
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: item.color }}>
                      <Icon className="h-6 w-6" style={{ color: '#2B547E' }} />
                    </div>
                    <h3 className="text-xl font-bold text-primary-navy">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden w-full" style={{ backgroundColor: '#2B547E' }}>
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 sm:w-96 sm:h-96 bg-white/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 sm:w-96 sm:h-96 bg-white/5 rounded-full blur-3xl"></div>
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
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-lg md:text-xl text-blue-100 mb-10 max-w-3xl mx-auto leading-relaxed">
              Join thousands of satisfied clients who trust TaxFiling for their tax filing needs.
              Get started today and experience the difference of professional tax services.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/contact"
                  className="inline-flex items-center space-x-2 bg-white px-10 py-5 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all duration-300 shadow-2xl"
                  style={{ color: '#2B547E' }}
                >
                  <span>Contact Us</span>
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

export default About;
