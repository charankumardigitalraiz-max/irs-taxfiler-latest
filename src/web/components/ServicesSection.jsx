import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  DocumentTextIcon,
  BuildingOfficeIcon,
  IdentificationIcon,
  BanknotesIcon,
  GlobeAltIcon,
  ChatBubbleLeftRightIcon,
  ArrowRightIcon,
} from '@heroicons/react/24/outline';

const ServicesSection = () => {
  const services = [
    {
      icon: DocumentTextIcon,
      title: 'U.S. Federal Tax Filing',
      description:
        'Comprehensive federal tax return preparation and filing for all income types.',
    },
    {
      icon: BuildingOfficeIcon,
      title: 'State Tax Filing',
      description:
        'Multi-state tax filing services for residents and non-residents.',
    },
    {
      icon: IdentificationIcon,
      title: 'ITIN Assistance',
      description:
        'Help obtaining Individual Taxpayer Identification Number for non-residents.',
    },
    {
      icon: BanknotesIcon,
      title: 'FBAR/FATCA Filing',
      description:
        'Foreign Bank Account Report and FATCA compliance filing services.',
    },
    {
      icon: GlobeAltIcon,
      title: 'Dual-Country Tax Filing',
      description:
        'Expert handling of tax obligations in both U.S. and India.',
    },
    {
      icon: ChatBubbleLeftRightIcon,
      title: 'Tax Consultation',
      description:
        'Personalized tax planning and consultation for complex situations.',
    },
  ];

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-primary-navy mb-4">
            Our Services
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Comprehensive tax filing solutions tailored for global Indians
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-primary-blue to-blue-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-primary-navy mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-12"
        >
          <Link
            to="/services"
            className="inline-flex items-center space-x-2 text-primary-blue font-semibold hover:text-blue-700 transition-colors"
          >
            <span>View All Services</span>
            <ArrowRightIcon className="h-5 w-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
