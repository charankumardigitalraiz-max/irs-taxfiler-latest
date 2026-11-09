import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDownIcon, QuestionMarkCircleIcon } from '@heroicons/react/24/outline';

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "What is the IRS deadline to file U.S. Federal and State taxes?",
      answer: "For most U.S. individual taxpayers, the federal tax filing deadline is April 15 each year. If you need more time, we can e-file an automatic 6-month extension (Form 4868) on your behalf to extend your filing deadline to October 15. For U.S. citizens and expats residing abroad on April 15, an automatic 2-month extension to June 15 applies."
    },
    {
      question: "What is U.S. Tax Filing with IRS Tax Filer?",
      answer: "U.S. tax filing is the annual reporting of your worldwide income, itemized or standard deductions, tax credits, and tax withholdings to the Internal Revenue Service (IRS) and state tax authorities using Form 1040, 1040-NR, or corporate forms. IRS Tax Filer provides certified CPA preparation and secure IRS Authorized e-filing, ensuring you claim every eligible credit and receive your maximum legal refund."
    },
    {
      question: "What documents do I need to file my U.S. taxes?",
      answer: "You will generally need your Social Security Number (SSN) or ITIN, Form W-2 (from employers), Form 1099 (for contractor income, interest, dividends, or stock trades), Form 1098 (for mortgage interest), Form 1095-A (health insurance), and records for deductions or business expenses. Expats with foreign bank balances also submit account information for FBAR (FinCEN 114) and FATCA (Form 8938) reporting."
    },
    {
      question: "How long does the CPA tax preparation and e-filing take?",
      answer: "Once you upload your tax documents to our encrypted portal, our licensed CPAs complete your review and return draft within 2 to 3 business days. After you review and approve the draft, we e-file directly with the IRS and state authorities. IRS direct deposit refunds typically arrive within 10 to 21 days."
    },
    {
      question: "Is my Social Security Number and tax data secure?",
      answer: "Absolutely. We enforce bank-grade 256-bit SSL encryption, SOC-2 compliant cloud storage, and strict IRS-mandated security standards. Your Social Security numbers, financial details, and uploaded documents are strictly confidential and never shared with third parties."
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-white py-16 sm:py-20 font-sans border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14 text-center relative"
        >
          {/* Eyebrow Badge in UpTik Olive Green */}
          <div className="flex justify-center mb-5">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center justify-center space-x-2 bg-[#749220]/15 px-4 py-1.5 rounded-full border border-[#749220]/30"
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <QuestionMarkCircleIcon className="h-4 w-4 text-[#749220]" />
              </motion.div>
              <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#749220]">Got Questions?</span>
            </motion.div>
          </div>

          {/* Main Heading with UpTik Navy & Olive Palette */}
          <div className="relative inline-block">
            <h2 className="text-3xl sm:text-4xl lg:text-[36px] font-bold mb-3 tracking-tight leading-snug">
              <span className="text-gray-900">Frequently Asked </span>
              <motion.span
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-[#165479]"
              >
                Questions
              </motion.span>
            </h2>
            
            {/* Decorative Gradient Underline */}
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: '100%' }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="h-1 bg-gradient-to-r from-[#165479] to-[#749220] rounded-full mx-auto"
              style={{ maxWidth: '140px' }}
            ></motion.div>
          </div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-base sm:text-[17px] text-gray-600 mt-4 max-w-2xl mx-auto leading-[28px] font-normal"
          >
            Find quick, transparent answers to common questions about our U.S. Federal, State, and Expat tax filing services.
          </motion.p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className={`rounded-2xl border transition-all duration-200 ${
                    isOpen 
                      ? 'border-[#749220]/50 bg-[#F6F9EE]/40 shadow-sm' 
                      : 'border-gray-200/80 bg-white hover:border-[#165479]/30'
                  }`}
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full flex items-center justify-between p-5 sm:p-6 text-left transition-colors group cursor-pointer"
                  >
                    <h3 className={`text-base sm:text-lg pr-6 font-bold transition-colors leading-snug ${
                      isOpen ? 'text-[#165479]' : 'text-gray-900 group-hover:text-[#749220]'
                    }`}>
                      {faq.question}
                    </h3>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                        isOpen ? 'bg-[#749220] text-white' : 'bg-gray-100 text-gray-500 group-hover:bg-[#749220]/20 group-hover:text-[#749220]'
                      }`}
                    >
                      <ChevronDownIcon className="h-4 w-4" />
                    </motion.div>
                  </button>
                  
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 sm:px-6 pb-6 pt-1 border-t border-[#749220]/15">
                          <p className="text-sm sm:text-base leading-[28px] text-gray-600 font-normal">
                            {faq.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
