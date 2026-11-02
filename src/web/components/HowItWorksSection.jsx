import { motion } from 'framer-motion';
import {
  DocumentArrowUpIcon,
  ClipboardDocumentCheckIcon,
  PhoneIcon,
  CurrencyDollarIcon,
  DocumentCheckIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline';

const HowItWorksSection = () => {
  const steps = [
    {
      icon: DocumentArrowUpIcon,
      title: 'Upload Documents',
      description:
        'Securely upload your tax documents including PAN, Aadhaar, salary slips, and bank statements.',
      number: '01',
    },
    {
      icon: ClipboardDocumentCheckIcon,
      title: 'Document Verification',
      description:
        'Our team reviews and verifies all your documents to ensure accuracy and completeness.',
      number: '02',
    },
    {
      icon: PhoneIcon,
      title: 'Consultation Call',
      description:
        'We schedule a call to discuss your tax situation and clarify any questions.',
      number: '03',
    },
    {
      icon: CurrencyDollarIcon,
      title: 'Pricing Finalized',
      description:
        'Transparent pricing is confirmed based on your specific tax filing requirements.',
      number: '04',
    },
    {
      icon: DocumentCheckIcon,
      title: 'Filing in Progress',
      description:
        'Our experts prepare and file your tax returns with the IRS and state authorities.',
      number: '05',
    },
    {
      icon: CheckCircleIcon,
      title: 'Filing Completed',
      description:
        'Receive your final ITR acknowledgment and download all necessary documents.',
      number: '06',
    },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-primary-navy mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            A simple, transparent process from start to finish
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative"
              >
                <div className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl border border-gray-100 hover:border-primary-blue/30 hover:shadow-xl transition-all duration-300 h-full">
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-14 h-14 bg-gradient-to-br from-primary-blue to-blue-600 rounded-xl flex items-center justify-center">
                      <Icon className="h-7 w-7 text-white" />
                    </div>
                    <span className="text-4xl font-bold text-gray-200">
                      {step.number}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-primary-navy mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
