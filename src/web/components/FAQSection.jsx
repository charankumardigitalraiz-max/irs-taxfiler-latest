import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDownIcon, ChevronUpIcon, QuestionMarkCircleIcon } from '@heroicons/react/24/outline';

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "What is the revised last date for Tax filing for FY 2025 (AY 2026)?",
      answer: "The Internal Revenue Service has extended the Tax filing due date for FY 2025 (AY 2026) to October 15, 2026, for individuals not subject to audit. This extension provides additional time to ensure accurate filing and timely refunds. It's important to file before the deadline to avoid late fees and penalties. TaxFiling's secure online filing services can help you complete your Tax filing quickly and accurately."
    },
    {
      question: "What is Tax Filing?",
      answer: "Tax filing is the process of submitting your income and tax details to the Income Tax Department through an official Income Tax Return (ITR) form. It ensures compliance with tax laws, maintains transparency in financial records, and enables the tax department to assess whether you've paid the correct amount of tax or are eligible for a refund. TaxFiling simplifies this process by providing step-by-step guidance and expert support throughout your tax filing journey."
    },
    {
      question: "What documents do I need to file my taxes?",
      answer: "You will need your PAN card, Aadhaar card, salary slips, Form 16 (if applicable), bank statements, investment statements, and any other income-related documents. We provide a complete checklist after you sign up to ensure you have all necessary documents."
    },
    {
      question: "How long does the tax filing process take?",
      answer: "Typically, the entire process takes 2-4 weeks from document submission to final filing. This includes verification, consultation, preparation, and filing. Complex cases may take longer, but we keep you updated throughout the process."
    },
    {
      question: "Is my personal information secure?",
      answer: "Absolutely. We use bank-level encryption and secure servers to protect all your documents and personal information. We comply with all data protection regulations and never share your information with third parties."
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center relative"
        >
          {/* Badge */}
          <div className="flex justify-center mb-6">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center justify-center space-x-2 bg-[#4C2691]/10 px-4 py-2 rounded-full border border-[#4C2691]/20"
            >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <QuestionMarkCircleIcon className="h-4 w-4" style={{ color: '#4C2691' }} />
            </motion.div>
            <span className="text-sm font-semibold" style={{ color: '#4C2691' }}>Got Questions?</span>
            </motion.div>
          </div>

          {/* Main Heading with Gradient */}
          <div className="relative inline-block">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-4 leading-tight">
              <span className="block text-gray-900">Frequently Asked</span>
              <motion.span
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="block text-[#4C2691]"
              >
                Questions
              </motion.span>
            </h2>
            
            {/* Decorative Underline */}
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: '100%' }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="h-1 bg-[#4C2691] rounded-full mx-auto"
              style={{ maxWidth: '120px' }}
            ></motion.div>
          </div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-base text-gray-600 mt-6 max-w-2xl mx-auto"
          >
            Find quick answers to common questions about our tax filing services
          </motion.p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="space-y-0">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="border-b border-gray-200 last:border-b-0"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between py-6 text-left hover:opacity-80 transition-opacity group"
                >
                  <h3 className="text-base md:text-lg font-medium pr-8" style={{ 
                    color: '#111827',
                    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                    fontWeight: 500
                  }}>
                    {faq.question}
                  </h3>
                  <motion.div
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0"
                  >
                    <ChevronDownIcon 
                      className="h-5 w-5 text-gray-500 group-hover:text-[#4C2691] transition-colors" 
                    />
                  </motion.div>
                </button>
                
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="pb-6 pt-2">
                        <p className="text-sm md:text-base leading-relaxed text-gray-600" style={{ 
                          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                          fontWeight: 400
                        }}>
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;


