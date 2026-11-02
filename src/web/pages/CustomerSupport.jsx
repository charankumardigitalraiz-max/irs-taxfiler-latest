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
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-24 pb-16" style={{ backgroundColor: '#EB4149' }}>
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3">
                Customer Support
              </h1>
              <p className="text-base md:text-lg text-gray-200 max-w-3xl mx-auto leading-relaxed">
                We're here to help you every step of the way. Get the assistance you need, when you need it.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Support Options Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="mb-12 text-center"
            >
              <h2 className="text-3xl lg:text-4xl font-bold mb-4" style={{ color: '#202020' }}>
                How Can We Help You?
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Choose the support method that works best for you. Our team is ready to assist.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {supportOptions.map((option, index) => {
                const IconComponent = option.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="bg-white rounded-xl shadow-md border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 text-center"
                  >
                    <div
                      className="w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4"
                      style={{ backgroundColor: option.color }}
                    >
                      <IconComponent className="w-8 h-8" style={{ color: '#EB4149' }} />
                    </div>
                    <h3 className="text-xl font-bold mb-2" style={{ color: '#202020' }}>
                      {option.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3">
                      {option.description}
                    </p>
                    <p className="text-xs font-semibold mb-4" style={{ color: '#EB4149' }}>
                      {option.availability}
                    </p>
                    {option.link === '#live-chat' ? (
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          window.dispatchEvent(new CustomEvent('openLiveChat'));
                        }}
                        className="inline-flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-semibold text-white transition-all duration-300 hover:shadow-md"
                        style={{ backgroundColor: '#EB4149' }}
                      >
                        <span>{option.action}</span>
                        <ArrowRightIcon className="w-4 h-4" />
                      </button>
                    ) : option.link.startsWith('/') ? (
                      <Link
                        to={option.link}
                        className="inline-flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-semibold text-white transition-all duration-300 hover:shadow-md"
                        style={{ backgroundColor: '#EB4149' }}
                      >
                        <span>{option.action}</span>
                        <ArrowRightIcon className="w-4 h-4" />
                      </Link>
                    ) : (
                      <a
                        href={option.link}
                        className="inline-flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-semibold text-white transition-all duration-300 hover:shadow-md"
                        style={{ backgroundColor: '#EB4149' }}
                      >
                        <span>{option.action}</span>
                        <ArrowRightIcon className="w-4 h-4" />
                      </a>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Support Features Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="mb-12 text-center"
            >
              <h2 className="text-3xl lg:text-4xl font-bold mb-4" style={{ color: '#202020' }}>
                Why Choose Our Support?
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                We're committed to providing exceptional customer service.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {supportFeatures.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-md border border-gray-200 p-6 text-center hover:shadow-lg transition-all duration-300"
                  >
                    <div
                      className="w-14 h-14 rounded-lg flex items-center justify-center mx-auto mb-4"
                      style={{ backgroundColor: feature.color }}
                    >
                      <IconComponent className="w-7 h-7" style={{ color: '#EB4149' }} />
                    </div>
                    <h3 className="text-lg font-bold mb-2" style={{ color: '#202020' }}>
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {feature.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="mb-12 text-center"
            >
              <h2 className="text-3xl lg:text-4xl font-bold mb-4" style={{ color: '#202020' }}>
                Frequently Asked Questions
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Find quick answers to common questions about our services.
              </p>
            </motion.div>

            <div className="space-y-8">
              {faqCategories.map((category, categoryIndex) => {
                const IconComponent = category.icon;
                return (
                  <motion.div
                    key={categoryIndex}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.4, delay: categoryIndex * 0.1 }}
                    className="bg-white rounded-xl shadow-md border border-gray-200 p-6"
                  >
                    <div className="flex items-center space-x-3 mb-6">
                      <div
                        className="w-12 h-12 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: category.color }}
                      >
                        <IconComponent className="w-6 h-6" style={{ color: '#EB4149' }} />
                      </div>
                      <h3 className="text-2xl font-bold" style={{ color: '#202020' }}>
                        {category.category}
                      </h3>
                    </div>
                    <div className="space-y-4">
                      {category.questions.map((faq, faqIndex) => (
                        <motion.div
                          key={faqIndex}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true, margin: "-50px" }}
                          transition={{ duration: 0.3, delay: (categoryIndex * 0.1) + (faqIndex * 0.05) }}
                          className="border-l-4 pl-4 py-2"
                          style={{ borderColor: '#EB4149' }}
                        >
                          <h4 className="font-semibold mb-2" style={{ color: '#202020' }}>
                            {faq.question}
                          </h4>
                          <p className="text-gray-600 text-sm">
                            {faq.answer}
                          </p>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Contact Information Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="mb-12 text-center"
            >
              <h2 className="text-3xl lg:text-4xl font-bold mb-4" style={{ color: '#202020' }}>
                Contact Information
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Reach out to us through any of these channels.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4 }}
                className="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-md border border-gray-200 p-6 text-center"
              >
                <div className="w-14 h-14 rounded-lg flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#EFF6FF' }}>
                  <EnvelopeIcon className="w-7 h-7" style={{ color: '#EB4149' }} />
                </div>
                <h3 className="text-lg font-bold mb-2" style={{ color: '#202020' }}>
                  Email
                </h3>
                <a
                  href="mailto:contact@irstaxfiler.com"
                  className="text-sm"
                  style={{ color: '#EB4149' }}
                >
                  contact@irstaxfiler.com
                </a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-md border border-gray-200 p-6 text-center"
              >
                <div className="w-14 h-14 rounded-lg flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#F0FDF4' }}>
                  <PhoneIcon className="w-7 h-7" style={{ color: '#EB4149' }} />
                </div>
                <h3 className="text-lg font-bold mb-2" style={{ color: '#202020' }}>
                  Phone
                </h3>
                <a
                  href="tel:++1 (415) 7876190"
                  className="text-sm"
                  style={{ color: '#EB4149' }}
                >
                  +1 (415) 7876190
                </a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-md border border-gray-200 p-6 text-center"
              >
                <div className="w-14 h-14 rounded-lg flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#FEF3C7' }}>
                  <ClockIcon className="w-7 h-7" style={{ color: '#EB4149' }} />
                </div>
                <h3 className="text-lg font-bold mb-2" style={{ color: '#202020' }}>
                  Business Hours
                </h3>
                <p className="text-sm text-gray-600">
                  Mon-Fri: 9AM-6PM EST<br />
                  Sat-Sun: 10AM-4PM EST
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-purple-50 via-pink-50 to-purple-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <h2 className="text-3xl lg:text-4xl font-bold mb-4" style={{ color: '#202020' }}>
                Still Have Questions?
              </h2>
              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                Our support team is standing by to help you with any questions or concerns. Don't hesitate to reach out!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/contact"
                  className="px-8 py-4 rounded-lg font-semibold text-white transition-all duration-300 hover:shadow-xl hover:scale-105 transform"
                  style={{ backgroundColor: '#EB4149' }}
                >
                  Contact Us
                </Link>
                <Link
                  to="/tax-resources"
                  className="px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg border-2"
                  style={{
                    borderColor: '#EB4149',
                    color: '#EB4149',
                    backgroundColor: 'transparent'
                  }}
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

