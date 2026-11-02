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
} from '@heroicons/react/24/outline';
import SEO from '../components/seo/SEO';
import Logo from '../assets/irsLogo.png';

const Pricing = () => {
  const services = [
    {
      name: 'ITIN Application Process',
      worth: '$20',
      price: 'FREE',
      icon: DocumentTextIcon,
      color: '#EFF6FF',
      isFree: true,
    },
    {
      name: 'Federal & State Filing Extensions',
      worth: '$20',
      price: 'FREE',
      icon: CalendarDaysIcon,
      color: '#F0FDF4',
      isFree: true,
    },
    {
      name: 'W4 Assistance Throughout the Year',
      price: 'FREE',
      icon: UserGroupIcon,
      color: '#FEF3C7',
      isFree: true,
    },
    {
      name: 'FBAR Filing',
      price: 'FREE',
      icon: BanknotesIcon,
      color: '#F3E8FF',
      isFree: true,
    },
    {
      name: 'Non Resident Tax Return (1040NR)',
      price: '$30',
      icon: DocumentTextIcon,
      color: '#FCE7F3',
      isFree: false,
    },
    {
      name: 'Federal Tax Return',
      price: '$30',
      priceNote: '$40, if Both Taxpayer and Spouse have Taxable Income',
      icon: DocumentTextIcon,
      color: '#EFF6FF',
      isFree: false,
    },
   
    {
      name: 'State/Local Tax Return',
      price: '$30',
      icon: BuildingOfficeIcon,
      color: '#FEF3C7',
      isFree: false,
    },
    {
      name: 'Schedule A (Itemized Deductions)',
      price: '$70',
      icon: ChartBarIcon,
      color: '#F3E8FF',
      isFree: false,
    },
    {
      name: 'Schedule E (US Rental Home)',
      price: '$35',
      icon: ChartBarIcon,
      color: '#FCE7F3',
      isFree: false,
    },
    {
      name: 'Schedule C',
      price: '$50',
      icon: ChartBarIcon,
      color: '#EFF6FF',
      isFree: false,
    },
    {
      name: 'Stock Transactions (Schedule D)',
      price: '$15',
      icon: CurrencyDollarIcon,
      color: '#F0FDF4',
      isFree: false,
    },
    // {
    //   name: 'Child And Dependent Care Credit (Form 2441)',
    //   price: '$15',
    //   icon: UserGroupIcon,
    //   color: '#FEF3C7',
    //   isFree: false,
    // },
    {
      name: 'Education Credit (Form 8863)',
      price: '$15',
      icon: AcademicCapIcon,
      color: '#F3E8FF',
      isFree: false,
    },
    {
      name: 'Foreign Tax Credit (Form 1116)',
      price: '$15',
      icon: GlobeAltIcon,
      color: '#FCE7F3',
      isFree: false,
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
              <span className="text-white font-semibold text-xs md:text-sm">Clear & Transparent</span>
            </motion.div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 leading-tight">
              <span className="block text-white drop-shadow-lg">Transparent Pricing</span>
              <motion.span
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="block text-[#EB4149] drop-shadow-2xl"
              >
                No Hidden Fees
              </motion.span>
            </h1>

            <p className="text-base md:text-lg text-white/90 max-w-3xl mx-auto leading-relaxed">
              Choose the services you need. All prices are clear and upfront with no hidden fees.
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

      {/* Pricing Table Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="mb-12 text-center"
          >
            <h2 className="text-2xl lg:text-3xl font-bold mb-4" style={{ color: '#202020' }}>
              Service Pricing
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Select individual services or choose a complete package. All services include expert preparation and filing.
            </p>
          </motion.div>

          <div className="max-w-5xl mx-auto">
            {/* Desktop Table View */}
            <div className="hidden md:block bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr style={{ backgroundColor: '#2B547E' }}>
                      <th className="px-8 py-5 text-left text-base font-bold text-white">
                        Service
                      </th>
                      <th className="px-8 py-5 text-right text-base font-bold text-white">
                        Price
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {services.map((service, index) => {
                      const IconComponent = service.icon;
                      return (
                        <motion.tr
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true, margin: "-50px" }}
                          transition={{ duration: 0.4, delay: index * 0.05 }}
                          className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200 group"
                        >
                          <td className="px-8 py-5">
                            <div className="flex items-center space-x-4">
                              <div 
                                className="flex-shrink-0 w-14 h-14 rounded-lg flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-200"
                                style={{ backgroundColor: service.color }}
                              >
                                <IconComponent className="w-7 h-7" style={{ color: '#2B547E' }} />
                              </div>
                              <div>
                                <div className="text-base font-semibold mb-1" style={{ color: '#202020' }}>
                                  {service.name}
                                </div>
                                {service.worth && (
                                  <div className="text-sm text-gray-500 flex items-center space-x-1">
                                    <span>Worth</span>
                                    <span className="font-medium line-through">{service.worth}</span>
                                  </div>
                                )}
                                {service.priceNote && (
                                  <div className="text-sm text-gray-500 mt-1 italic">
                                    {service.priceNote}
                                  </div>
                                )}
                              </div>
                            </div>
                          </td>
                          <td className="px-8 py-5 text-right">
                            <div className="flex items-center justify-end space-x-2">
                              {service.isFree ? (
                                <>
                                  <GiftIcon className="w-6 h-6 text-green-600" />
                                  <span className="text-xl font-bold text-green-600">
                                    {service.price}
                                  </span>
                                </>
                              ) : (
                                <span className="text-xl font-bold" style={{ color: '#2B547E' }}>
                                  {service.price}
                                </span>
                              )}
                            </div>
                          </td>
                        </motion.tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden space-y-4">
              {services.map((service, index) => {
                const IconComponent = service.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className="bg-white rounded-xl shadow-md border border-gray-200 p-5 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4 flex-1">
                        <div 
                          className="flex-shrink-0 w-14 h-14 rounded-lg flex items-center justify-center shadow-sm"
                          style={{ backgroundColor: service.color }}
                        >
                          <IconComponent className="w-7 h-7" style={{ color: '#2B547E' }} />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-sm font-semibold mb-1" style={{ color: '#202020' }}>
                            {service.name}
                          </h3>
                          {service.worth && (
                            <p className="text-sm text-gray-500 mb-1 flex items-center space-x-1">
                              <span>Worth</span>
                              <span className="font-medium line-through">{service.worth}</span>
                            </p>
                          )}
                          {service.priceNote && (
                            <p className="text-sm text-gray-500 italic">
                              {service.priceNote}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 ml-4">
                        {service.isFree ? (
                          <>
                            <GiftIcon className="w-6 h-6 text-green-600" />
                            <span className="text-xl font-bold text-green-600">
                              {service.price}
                            </span>
                          </>
                        ) : (
                          <span className="text-xl font-bold" style={{ color: '#2B547E' }}>
                            {service.price}
                          </span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* CTA Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-16"
            >
              <div className="bg-[#F5F9FF] rounded-2xl p-10 border-2 border-[#2B547E]/20 shadow-lg">
                <div className="text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
                    className="inline-block mb-4"
                  >
                    <StarIcon className="w-12 h-12" style={{ color: '#2B547E' }} />
                  </motion.div>
                  <h3 className="text-2xl font-bold mb-3" style={{ color: '#202020' }}>
                    Ready to Get Started?
                  </h3>
                  <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                    Select the services you need and our expert team will handle your tax filing with precision and care. Get started today and experience hassle-free tax preparation.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                      to="/contact"
                      className="px-8 py-4 rounded-lg font-semibold text-white transition-all duration-300 hover:shadow-xl hover:scale-105 transform"
                      style={{ backgroundColor: '#2B547E' }}
                    >
                      Get Started Today
                    </Link>
                    <Link
                      to="/services"
                      className="px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg border-2"
                      style={{ 
                        borderColor: '#2B547E',
                        color: '#2B547E',
                        backgroundColor: 'transparent'
                      }}
                    >
                      View All Services
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Benefits Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6"
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
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                    className="bg-white rounded-xl p-6 shadow-md border border-gray-200 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="p-2 rounded-lg" style={{ backgroundColor: '#F3E8FF' }}>
                        <IconComponent className="w-6 h-6" style={{ color: '#2B547E' }} />
                      </div>
                      <h4 className="text-base font-semibold" style={{ color: '#202020' }}>
                        {benefit.title}
                      </h4>
                    </div>
                    <p className="text-gray-600 text-sm">
                      {benefit.description}
                    </p>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </section>
    </div>
    </>
  );
};

export default Pricing;

