import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ChatBubbleLeftRightIcon,
  EnvelopeIcon,
  PhoneIcon,
  ClockIcon,
  QuestionMarkCircleIcon,
  DocumentTextIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  UserGroupIcon,
  AcademicCapIcon,
  ShieldCheckIcon,
  LightBulbIcon,
} from '@heroicons/react/24/outline';
import SEO from '../components/seo/SEO';
import Logo from '../assets/irsLogo.png';

const CustomerSupport = () => {
  const supportOptions = [
    {
      icon: ChatBubbleLeftRightIcon,
      title: 'Live Chat',
      description: 'Get instant help from our support team. Available 24/7.',
      availability: '24/7 Available',
      color: '#EFF6FF',
      action: 'Start Chat',
      link: '#live-chat',
    },
    {
      icon: EnvelopeIcon,
      title: 'Email Support',
      description: 'Send us an email and we\'ll respond within 24 hours.',
      availability: 'Response within 24h',
      color: '#F0FDF4',
      action: 'Send Email',
      link: 'mailto:contact@irstaxfiler.com',
    },
    {
      icon: PhoneIcon,
      title: 'Phone Support',
      description: 'Speak directly with our tax experts for immediate assistance.',
      availability: 'Mon-Fri 9AM-6PM EST',
      color: '#FEF3C7',
      action: 'Call Now',
      link: 'tel:++1 (415) 7876190',
    },
    {
      icon: DocumentTextIcon,
      title: 'Support Ticket',
      description: 'Submit a detailed ticket for complex issues that need tracking.',
      availability: 'Track Your Request',
      color: '#F3E8FF',
      action: 'Create Ticket',
      link: '/contact#send-message',
    },
  ];

  const faqCategories = [
    {
      category: 'General Questions',
      questions: [
        {
          question: 'How do I get started with tax filing?',
          answer: 'Simply create an account, upload your documents, and our team will handle the rest. You can track your filing status in real-time through your dashboard.',
        },
        {
          question: 'What documents do I need to file my taxes?',
          answer: 'You\'ll need W-2 forms, 1099 forms, receipts for deductions, bank statements, and any other income or expense documentation. Our team will provide a complete checklist after you sign up.',
        },
        {
          question: 'How long does the tax filing process take?',
          answer: 'Typically, we complete your tax filing within 5-7 business days after receiving all required documents. Complex cases may take up to 10 business days.',
        },
      ],
      icon: QuestionMarkCircleIcon,
      color: '#EFF6FF',
    },
    {
      category: 'Pricing & Payment',
      questions: [
        {
          question: 'What are your pricing options?',
          answer: 'We offer transparent pricing based on the services you need. Basic federal filing starts at $30, with additional services priced separately. View our complete pricing page for details.',
        },
        {
          question: 'When do I need to pay?',
          answer: 'Payment is required before we begin processing your tax return. You can pay securely through our platform using credit card, debit card, or bank transfer.',
        },
        {
          question: 'Do you offer refunds?',
          answer: 'Yes, we offer a money-back guarantee if you\'re not satisfied with our service. Contact our support team within 30 days of filing for a full refund.',
        },
      ],
      icon: DocumentTextIcon,
      color: '#F0FDF4',
    },
    {
      category: 'Technical Support',
      questions: [
        {
          question: 'I can\'t access my account. What should I do?',
          answer: 'Try resetting your password using the "Forgot Password" link. If that doesn\'t work, contact our support team and we\'ll help you regain access immediately.',
        },
        {
          question: 'How do I upload documents?',
          answer: 'Log into your dashboard, navigate to "Upload Documents", and drag-and-drop your files or click to browse. We support PDF, JPG, and PNG formats up to 10MB per file.',
        },
        {
          question: 'Is my information secure?',
          answer: 'Absolutely. We use bank-level encryption (256-bit SSL) to protect all your data. Your information is stored securely and never shared with third parties without your consent.',
        },
      ],
      icon: ShieldCheckIcon,
      color: '#FEF3C7',
    },
  ];

  const supportFeatures = [
    {
      icon: UserGroupIcon,
      title: 'Expert Team',
      description: 'Certified tax professionals ready to help',
      color: '#EFF6FF',
    },
    {
      icon: ClockIcon,
      title: 'Quick Response',
      description: 'Average response time under 2 hours',
      color: '#F0FDF4',
    },
    {
      icon: AcademicCapIcon,
      title: 'Knowledge Base',
      description: 'Comprehensive guides and resources',
      color: '#FEF3C7',
    },
    {
      icon: ShieldCheckIcon,
      title: 'Secure & Private',
      description: 'Your data is protected with encryption',
      color: '#F3E8FF',
    },
  ];

  const title = "Help & Support | IRS Tax Filer";
  const description = "Need help? IRS Tax Filer support offers guidance for US & Indian tax filing, audits, and compliance issues,fast and friendly assistance.";
  const keywords = "IRS Tax Filer support, tax filing help,Indian tax support, tax compliance support, contact support tax services";
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
      <div className="min-h-screen bg-white font-sans text-gray-900 antialiased">
        {/* Hero Section */}
        {/* <section className="relative overflow-hidden pt-12 sm:pt-16 pb-14 sm:pb-16 bg-white border-b border-slate-100">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none overflow-hidden">
            <div className="absolute -top-24 left-1/4 w-96 h-96 bg-sky-100/50 rounded-full blur-3xl opacity-60" />
            <div className="absolute -top-20 right-1/4 w-80 h-80 bg-lime-100/40 rounded-full blur-3xl opacity-50" />
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="text-center max-w-3xl mx-auto"
            >
              <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-normal text-gray-900 tracking-tight leading-[1.2] mb-3.5">
                Customer{" "}
                <span className="font-semibold bg-gradient-to-r from-[#0A4973] via-[#165479] to-[#749220] bg-clip-text text-transparent">
                  Support
                </span>
              </h1>
              <p className="text-sm sm:text-base lg:text-[17px] text-gray-600 font-normal max-w-2xl mx-auto leading-[30px] sm:leading-[32px] lg:leading-[34px]">
                We're here to help you every step of the way. Get the assistance you need, when you need it.
              </p>
            </motion.div>
          </div>
        </section> */}

        {/* Support Options Section */}
        <section className="py-14 sm:py-16 bg-white border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.45 }}
              className="mb-10 sm:mb-12 text-center"
            >
              <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-normal text-gray-900 tracking-tight leading-[1.25] mb-3">
                How Can We{" "}
                <span className="font-semibold bg-gradient-to-r from-[#0A4973] via-[#165479] to-[#749220] bg-clip-text text-transparent">
                  Help You?
                </span>
              </h2>
              <p className="text-sm sm:text-base text-gray-600 font-normal max-w-2xl mx-auto leading-relaxed">
                Choose the support method that works best for you. Our team is ready to assist.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
              {supportOptions.map((option, index) => {
                const IconComponent = option.icon;
                const isLime = index % 2 === 1;
                const btnClasses =
                  "w-full inline-flex items-center justify-center gap-2 h-10 px-4 rounded-lg text-xs sm:text-sm font-medium text-white bg-gradient-to-r from-[#0C3D5A] via-[#165479] to-[#1A5B82] hover:from-[#09324A] hover:via-[#134969] hover:to-[#165479] shadow-sm transition-all duration-200 cursor-pointer group";

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.35, delay: index * 0.06 }}
                    className="relative bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-[0_12px_28px_rgba(22,84,121,0.08)] hover:border-[#165479]/35 p-6 transition-all duration-200 text-center flex flex-col justify-between overflow-hidden"
                  >
                    <div
                      className={`absolute top-0 inset-x-0 h-0.5 ${isLime
                        ? "bg-gradient-to-r from-transparent via-[#749220]/70 to-transparent"
                        : "bg-gradient-to-r from-transparent via-[#165479]/70 to-transparent"
                        }`}
                    />
                    <div>
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 ${isLime
                          ? "bg-[#F6F9EE] border border-[#749220]/25 text-[#749220]"
                          : "bg-sky-50 border border-sky-100 text-[#165479]"
                          }`}
                      >
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 leading-snug">
                        {option.title}
                      </h3>
                      <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-3">
                        {option.description}
                      </p>
                      <p
                        className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full mb-5 ${isLime
                          ? "bg-[#F6F9EE] text-[#749220] border border-[#749220]/20"
                          : "bg-sky-50 text-[#165479] border border-sky-100"
                          }`}
                      >
                        {option.availability}
                      </p>
                    </div>

                    {option.link === '#live-chat' ? (
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          window.dispatchEvent(new CustomEvent('openLiveChat'));
                        }}
                        className={btnClasses}
                      >
                        <span>{option.action}</span>
                        <ArrowRightIcon className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                      </button>
                    ) : option.link.startsWith('/') ? (
                      <Link to={option.link} className={btnClasses}>
                        <span>{option.action}</span>
                        <ArrowRightIcon className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                      </Link>
                    ) : (
                      <a href={option.link} className={btnClasses}>
                        <span>{option.action}</span>
                        <ArrowRightIcon className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                      </a>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Support Features Section */}
        <section className="py-14 sm:py-16 bg-slate-50/70 border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.45 }}
              className="mb-10 sm:mb-12 text-center"
            >
              <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-normal text-gray-900 tracking-tight leading-[1.25] mb-3">
                Why Choose Our{" "}
                <span className="font-semibold bg-gradient-to-r from-[#0A4973] via-[#165479] to-[#749220] bg-clip-text text-transparent">
                  Support?
                </span>
              </h2>
              <p className="text-sm sm:text-base text-gray-600 font-normal max-w-2xl mx-auto leading-relaxed">
                We're committed to providing exceptional customer service.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
              {supportFeatures.map((feature, index) => {
                const IconComponent = feature.icon;
                const isLime = index % 2 === 1;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.35, delay: index * 0.06 }}
                    className="bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-[0_10px_24px_rgba(22,84,121,0.06)] hover:border-[#165479]/30 p-6 text-center transition-all duration-200"
                  >
                    <div
                      className={`w-11 h-11 rounded-xl flex items-center justify-center mx-auto mb-4 ${isLime
                        ? "bg-[#F6F9EE] border border-[#749220]/25 text-[#749220]"
                        : "bg-sky-50 border border-sky-100 text-[#165479]"
                        }`}
                    >
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <h3 className="text-base font-semibold text-gray-900 mb-2 leading-snug">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-14 sm:py-16 bg-white border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.45 }}
              className="mb-10 sm:mb-12 text-center"
            >
              <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-normal text-gray-900 tracking-tight leading-[1.25] mb-3">
                Frequently Asked{" "}
                <span className="font-semibold bg-gradient-to-r from-[#0A4973] via-[#165479] to-[#749220] bg-clip-text text-transparent">
                  Questions
                </span>
              </h2>
              <p className="text-sm sm:text-base text-gray-600 font-normal max-w-2xl mx-auto leading-relaxed">
                Find quick answers to common questions about our services.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
              {faqCategories.map((category, categoryIndex) => {
                const IconComponent = category.icon;
                const isLime = categoryIndex % 2 === 1;
                return (
                  <motion.div
                    key={categoryIndex}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.35, delay: categoryIndex * 0.06 }}
                    className="relative bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 flex flex-col overflow-hidden hover:border-[#165479]/30 transition-all"
                  >
                    <div
                      className={`absolute top-0 inset-x-0 h-0.5 ${isLime
                        ? "bg-gradient-to-r from-[#749220]/70 via-[#749220]/25 to-transparent"
                        : "bg-gradient-to-r from-[#165479]/70 via-[#165479]/25 to-transparent"
                        }`}
                    />
                    <div className="flex items-center gap-3 pb-4 mb-4 border-b border-slate-100">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${isLime
                          ? "bg-[#F6F9EE] border border-[#749220]/25 text-[#749220]"
                          : "bg-sky-50 border border-sky-100 text-[#165479]"
                          }`}
                      >
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                        {category.category}
                      </h3>
                    </div>
                    <div className="space-y-3.5 flex-1">
                      {category.questions.map((faq, faqIndex) => (
                        <div
                          key={faqIndex}
                          className={`border-l-2 bg-slate-50/70 rounded-r-xl pl-3.5 pr-3.5 py-2.5 ${isLime ? "border-[#749220]/50" : "border-[#165479]/50"
                            }`}
                        >
                          <h4 className="text-xs sm:text-sm font-semibold text-gray-900 mb-1 leading-snug">
                            {faq.question}
                          </h4>
                          <p className="text-gray-600 text-xs sm:text-[13px] leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Contact Information Section */}
        <section className="py-14 sm:py-16 bg-slate-50/70 border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.45 }}
              className="mb-10 sm:mb-12 text-center"
            >
              <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-normal text-gray-900 tracking-tight leading-[1.25] mb-3">
                Contact{" "}
                <span className="font-semibold bg-gradient-to-r from-[#0A4973] via-[#165479] to-[#749220] bg-clip-text text-transparent">
                  Information
                </span>
              </h2>
              <p className="text-sm sm:text-base text-gray-600 font-normal max-w-2xl mx-auto leading-relaxed">
                Reach out to us through any of these channels.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.35 }}
                className="bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:border-[#165479]/30 p-6 text-center transition-all"
              >
                <div className="w-11 h-11 rounded-xl bg-sky-50 border border-sky-100 text-[#165479] flex items-center justify-center mx-auto mb-4">
                  <EnvelopeIcon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-semibold text-gray-900 mb-1.5">
                  Email
                </h3>
                <a
                  href="mailto:contact@irstaxfiler.com"
                  className="text-sm font-medium text-[#165479] hover:text-[#0A4973] hover:underline transition-colors"
                >
                  contact@irstaxfiler.com
                </a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.35, delay: 0.06 }}
                className="bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:border-[#165479]/30 p-6 text-center transition-all"
              >
                <div className="w-11 h-11 rounded-xl bg-[#F6F9EE] border border-[#749220]/25 text-[#749220] flex items-center justify-center mx-auto mb-4">
                  <PhoneIcon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-semibold text-gray-900 mb-1.5">
                  Phone
                </h3>
                <a
                  href="tel:++1 (415) 7876190"
                  className="text-sm font-medium text-[#165479] hover:text-[#0A4973] hover:underline transition-colors"
                >
                  +1 (415) 7876190
                </a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.35, delay: 0.12 }}
                className="bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:border-[#165479]/30 p-6 text-center transition-all"
              >
                <div className="w-11 h-11 rounded-xl bg-sky-50 border border-sky-100 text-[#165479] flex items-center justify-center mx-auto mb-4">
                  <ClockIcon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-semibold text-gray-900 mb-1.5">
                  Business Hours
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  Mon-Fri: 9AM-6PM EST<br />
                  Sat-Sun: 10AM-4PM EST
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-14 sm:py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.45 }}
              className="rounded-2xl p-8 sm:p-10 bg-gradient-to-br from-[#DFEBC2]/55 via-white to-[#C3DCED]/55 border border-[#165479]/15 shadow-sm text-center"
            >
              <h2 className="text-2xl sm:text-3xl font-normal text-gray-900 tracking-tight mb-3">
                Still Have{" "}
                <span className="font-semibold bg-gradient-to-r from-[#0A4973] via-[#165479] to-[#749220] bg-clip-text text-transparent">
                  Questions?
                </span>
              </h2>
              <p className="text-sm sm:text-base text-gray-700 font-normal mb-6 max-w-xl mx-auto leading-relaxed">
                Our support team is standing by to help you with any questions or concerns. Don't hesitate to reach out!
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 h-10 sm:h-11 px-6 rounded-lg font-medium text-xs sm:text-sm text-white bg-gradient-to-r from-[#0C3D5A] via-[#165479] to-[#1A5B82] hover:from-[#09324A] hover:via-[#134969] hover:to-[#165479] shadow-sm transition-all"
                >
                  <span>Contact Us</span>
                  <ArrowRightIcon className="w-3.5 h-3.5" />
                </Link>
                <Link
                  to="/tax-resources"
                  className="inline-flex items-center justify-center h-10 sm:h-11 px-6 rounded-lg font-medium text-xs sm:text-sm text-gray-800 bg-white hover:bg-slate-50 border border-slate-300 shadow-sm transition-all"
                >
                  View Resources
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default CustomerSupport;

