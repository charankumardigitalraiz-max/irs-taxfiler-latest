import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDownIcon,
  PhoneIcon,
  ChatBubbleLeftRightIcon,
  ArrowRightIcon,
  ShieldCheckIcon,
  CheckCircleIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";

const FAQSection = ({ onOpenModal }) => {
  const [openIndex, setOpenIndex] = useState(0); // Open first question by default

  const faqs = [
    {
      id: "deadline",
      tag: "Form 1040 & Extensions",
      question: "What is the IRS deadline to file U.S. Federal and State taxes?",
      answer:
        "For most U.S. taxpayers, the federal filing deadline is April 15. If you need more time, we can e-file an automatic 6-month extension (Form 4868) on your behalf to extend your filing deadline to October 15. U.S. citizens and expats residing abroad on April 15 receive an automatic 2-month extension to June 15.",
      takeaway: "April 15 Deadline • 6-Month Automatic Extension to Oct 15",
      link: "/services/us-individual/extension",
      linkLabel: "File Form 4868 Extension",
    },
    {
      id: "documents",
      tag: "Filing Checklist",
      question: "What documents do I need to upload for U.S. tax preparation?",
      answer:
        "You typically need your Social Security Number (SSN) or ITIN, Form W-2 (wages), Form 1099 (freelance, interest, dividends, crypto, stock trades), Form 1098 (mortgage), and receipts for business or itemized deductions. Expats with foreign accounts also submit balances for FBAR (FinCEN 114) and FATCA (Form 8938) compliance.",
      takeaway: "W-2, 1099, 1098, SSN/ITIN & Foreign Account Statements",
      link: "/tax-resources",

      linkLabel: "View Document Checklist",
    },
    {
      id: "refunds",
      tag: "Maximum Refund",
      question: "How do your licensed CPAs guarantee my maximum legal refund?",
      answer:
        "Our certified CPAs analyze your return line by line using deduction optimization algorithms combined with dual CPA verification. We uncover overlooked tax credits (Child Tax Credit, EITC, EV Credits, Education Credits) and optimize standard vs. itemized deductions to legally maximize your refund.",
      takeaway: "100% CPA Accuracy • Algorithmic Deduction Optimization",
      link: "/services/us-individual/federal-state-local",
      linkLabel: "Explore 1040 Services",
    },
    {
      id: "turnaround",
      tag: "Review & e-File Speed",
      question: "How long does tax preparation take and when do I get my refund?",
      answer:
        "Once you securely upload your documents to our client portal, our licensed CPAs complete your preliminary return draft within 2 to 3 business days. After you review and approve the draft, we e-file directly with the IRS. IRS direct deposit refunds typically arrive within 10 to 21 days.",
      takeaway: "2–3 Day CPA Review • 10–21 Day Direct Deposit Refunds",
      link: "/pricing",
      linkLabel: "Check Filing Plans",
    },
    {
      id: "expats",
      tag: "Cross-Border Tax",
      question: "I have income in both the U.S. and India. How is double taxation avoided?",
      answer:
        "We specialize in cross-border tax compliance under the U.S.–India Double Tax Avoidance Agreement (DTAA). We leverage the Foreign Tax Credit (Form 1116) or Foreign Earned Income Exclusion (Form 2555) to eliminate double taxation, filing both your IRS return and Indian ITR seamlessly.",
      takeaway: "DTAA Treaty Relief • Form 1116 Credit • Seamless IRS + ITR",
      link: "/services/indian/tax-filing",
      linkLabel: "Indian NRI & DTAA Services",
    },
    // {
    //   id: "security",
    //   tag: "Security & Audit Shield",
    //   question: "Is my tax data secure and do you provide IRS audit defense?",
    //   answer:
    //     "Yes. We enforce bank-grade 256-bit TLS encryption, SOC-2 compliant storage, and strict IRS Publication 4557 security standards. Additionally, every return prepared by our firm includes Audit Defense with direct CPA representation should the IRS ever issue an inquiry.",
    //   takeaway: "256-Bit SSL Encryption • Full CPA Audit Representation",
    //   link: "/security",
    //   linkLabel: "Read Security Safeguards",
    // },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24 font-sans border-t border-slate-100 relative overflow-hidden">
      {/* Subtle ambient gradient aura */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-gradient-to-br from-[#165479]/5 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* 2-Column Split Architecture: Left Header & Help Card + Right FAQs */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

          {/* Left Column: Heading, Trust Points & CPA Help Desk (Sticky) */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 text-left">
            {/* Eyebrow Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F6F9EE] border border-[#749220]/30 shadow-2xs mb-3.5 text-xs font-medium text-[#749220] uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-[#749220] animate-pulse" />
              <span>Got Questions?</span>
            </div>

            {/* Display Headline */}
            <h2 className="text-2xl sm:text-3xl lg:text-[36px] font-normal text-gray-900 tracking-tight leading-[1.25]">
              Frequently Asked{" "}
              <span className="font-medium bg-gradient-to-r from-[#0A4973] via-[#165479] to-[#749220] bg-clip-text text-transparent block mt-1">
                Questions
              </span>
            </h2>

            <p className="text-sm text-gray-600 mt-3 font-normal leading-relaxed">
              Clear, transparent answers from certified CPAs to help you file with complete confidence.
            </p>

            {/* Trust Checklist Highlights */}
            <div className="mt-6 space-y-2.5 pt-5 border-t border-slate-100 text-xs text-gray-700">
              <div className="flex items-center gap-2.5">
                <CheckCircleIcon className="w-4 h-4 text-[#749220] shrink-0 stroke-[2]" />
                <span className="font-medium">IRS Authorized e-File Provider & Licensed CPAs</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircleIcon className="w-4 h-4 text-[#749220] shrink-0 stroke-[2]" />
                <span className="font-medium">Maximum Legal Refund Guarantee on all 50 states</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircleIcon className="w-4 h-4 text-[#749220] shrink-0 stroke-[2]" />
                <span className="font-medium">100% CPA Accuracy with comprehensive audit defense</span>
              </div>
            </div>

            {/* Direct CPA Help Card */}
            <div className="mt-8 p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-[#FAFCFE] via-white to-[#F6F9EE] border border-slate-200/90 shadow-[0_4px_20px_rgba(22,84,121,0.04)] text-left">
              <div className="flex items-center gap-2 mb-2 text-xs font-semibold text-[#165479] uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Live CPA Assistance</span>
              </div>
              <h4 className="text-[15px] font-semibold text-gray-900 leading-snug">
                Have a specific tax situation?
              </h4>
              <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                Speak directly with our CPA tax experts for a free initial review of your return.
              </p>

              <div className="mt-4 flex flex-col sm:flex-row gap-2.5">
                <button
                  onClick={() => onOpenModal && onOpenModal()}
                  className="px-4 py-2.5 rounded-xl bg-[#165479] hover:bg-[#0A4973] text-white text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow-2xs cursor-pointer group"
                >
                  <ChatBubbleLeftRightIcon className="w-4 h-4 text-[#CBF056]" />
                  <span>Talk to a CPA</span>
                  <ArrowRightIcon className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </button>

                <a
                  href="tel:+14157876190"
                  className="px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-gray-700 text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow-2xs"
                >
                  <PhoneIcon className="w-3.5 h-3.5 text-[#749220]" />
                  <span>+1 (415) 787-6190</span>
                </a>
              </div>

              <div className="mt-3 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-[11px] text-gray-500">
                <ClockIcon className="w-3.5 h-3.5 text-gray-400" />
                <span>Mon – Sat: 8:00 AM – 9:00 PM CST</span>
              </div>
            </div>
          </div>

          {/* Right Column: Clean Accordion Stack */}
          <div className="lg:col-span-7 w-full text-left space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={faq.id}
                  className={`rounded-2xl border transition-all duration-300 overflow-hidden ${isOpen
                    ? "border-[#165479]/40 bg-white shadow-[0_8px_24px_rgba(22,84,121,0.06)] ring-1 ring-[#165479]/10"
                    : "border-slate-200/90 bg-white hover:border-[#165479]/30 hover:shadow-xs"
                    }`}
                >
                  {/* Card Header Button */}
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full flex items-start justify-between p-4.5 sm:p-5 text-left transition-colors group cursor-pointer gap-3.5"
                  >
                    <div className="flex items-start gap-3">
                      {/* Sequential Number Pill */}
                      <span
                        className={`w-6 h-6 rounded-md text-[11px] font-mono font-semibold flex items-center justify-center shrink-0 mt-0.5 transition-colors ${isOpen
                          ? "bg-[#165479] text-white"
                          : "bg-slate-100 text-slate-500 group-hover:bg-[#F6F9EE] group-hover:text-[#749220]"
                          }`}
                      >
                        {(index + 1).toString().padStart(2, "0")}
                      </span>

                      <div>
                        <span className="text-[10px] sm:text-[10.5px] font-semibold text-[#749220] uppercase tracking-wider block mb-1">
                          {faq.tag}
                        </span>
                        <h3
                          className={`text-sm sm:text-[14.5px] font-semibold transition-colors leading-snug ${isOpen
                            ? "text-[#165479]"
                            : "text-gray-900 group-hover:text-[#165479]"
                            }`}
                        >
                          {faq.question}
                        </h3>
                      </div>
                    </div>

                    {/* Circular Chevron Toggle Button */}
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 mt-0.5 ${isOpen
                        ? "bg-[#749220] text-white rotate-180 shadow-2xs"
                        : "bg-slate-100 text-slate-500 group-hover:bg-[#165479] group-hover:text-white"
                        }`}
                    >
                      <ChevronDownIcon className="w-3.5 h-3.5 stroke-[2.2]" />
                    </div>
                  </button>

                  {/* Smooth Expanding Drawer */}
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.22, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 sm:px-6 pb-5 pt-1 border-t border-slate-100">
                          {/* Key Takeaway Highlight Pill */}
                          {faq.takeaway && (
                            <div className="mb-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#F6F9EE] border border-[#749220]/25 text-[11px] font-medium text-[#749220]">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#749220]" />
                              <span>{faq.takeaway}</span>
                            </div>
                          )}

                          {/* Detailed Answer Paragraph */}
                          <p className="text-xs sm:text-[13px] leading-relaxed text-gray-600 font-normal">
                            {faq.answer}
                          </p>

                          {/* Related Action Link */}
                          {faq.link && (
                            <div className="mt-3.5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                              <a
                                href={faq.link}
                                className="inline-flex items-center gap-1.5 font-semibold text-[#165479] hover:text-[#749220] transition-colors"
                              >
                                <span>{faq.linkLabel || "Learn more"}</span>
                                <ArrowRightIcon className="w-3.5 h-3.5" />
                              </a>
                              <span className="text-[11px] text-slate-400 font-normal">
                                CPA Verified Guidance
                              </span>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};

export default FAQSection;
