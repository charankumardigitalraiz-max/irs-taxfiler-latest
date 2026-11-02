import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

const FAQAccordion = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: 'What documents do I need to file my taxes?',
      answer:
        'You will need your PAN card, Aadhaar card, salary slips, Form 16 (if applicable), bank statements, investment statements, and any other income-related documents. We provide a complete checklist after you sign up.',
    },
    {
      question: 'How long does the tax filing process take?',
      answer:
        'Typically, the entire process takes 2-4 weeks from document submission to final filing. This includes verification, consultation, preparation, and filing. Complex cases may take longer.',
    },
    {
      question: 'Do you handle both U.S. and India tax filings?',
      answer:
        'Yes, we specialize in dual-country tax filing. We can help you file taxes in both the U.S. and India, ensuring compliance with tax treaties and avoiding double taxation.',
    },
    {
      question: 'What is the difference between the pricing plans?',
      answer:
        'Basic plan covers simple federal tax filing. Professional includes state filing and FBAR. Premium offers comprehensive services including multi-state filing, dual-country planning, ITIN assistance, and dedicated advisor support.',
    },
    {
      question: 'Is my personal information secure?',
      answer:
        'Absolutely. We use bank-level encryption and secure servers to protect all your documents and personal information. We comply with all data protection regulations and never share your information with third parties.',
    },
    {
      question: 'Can I track the status of my filing?',
      answer:
        'Yes! Once you create an account, you can track your filing status in real-time through our user dashboard. You will see updates at each stage: Document Submitted, Under Verification, Admin Reviewing, Call Scheduled, Pricing Finalized, Filing in Progress, and Filing Completed.',
    },
    {
      question: 'What if I have questions during the process?',
      answer:
        'You can reach out to us anytime through email, phone, or the messaging system in your dashboard. Professional and Premium plan users get priority support and dedicated consultation calls.',
    },
    {
      question: 'Do you offer refunds if I\'m not satisfied?',
      answer:
        'We strive for 100% customer satisfaction. If you\'re not happy with our service, please contact us and we\'ll work to resolve any issues. Refund policies vary by plan and are discussed during the consultation phase.',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h3 className="text-3xl md:text-4xl font-bold text-primary-navy mb-4 tracking-[-0.02em]">
          Frequently Asked Questions
        </h3>
        <p className="text-gray-600 text-base leading-[1.7]">
          Find answers to common questions about our tax filing services
        </p>
      </motion.div>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
            >
              <span className="font-semibold text-primary-navy pr-4">
                {faq.question}
              </span>
              <ChevronDownIcon
                className={`h-5 w-5 text-primary-blue flex-shrink-0 transition-transform ${
                  openIndex === index ? 'rotate-180' : ''
                }`}
              />
            </button>
            <AnimatePresence>
              {openIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-5 text-gray-600 leading-relaxed">
                    {faq.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default FAQAccordion;

