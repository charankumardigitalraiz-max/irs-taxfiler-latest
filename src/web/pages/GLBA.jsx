import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ShieldCheckIcon,
  LockClosedIcon,
  DocumentTextIcon,
  InformationCircleIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  EyeIcon,
  UserIcon,
} from '@heroicons/react/24/outline';
import SEO from '../components/seo/SEO';
import Logo from '../assets/irsLogo.png';

const GLBA = () => {
  const sections = [
    {
      id: 'introduction',
      title: '1. Introduction to GLBA',
      icon: InformationCircleIcon,
      content: [
        'IRS Tax Filer is committed to protecting the privacy and security of your nonpublic personal information in accordance with the Gramm-Leach-Bliley Act (GLBA) and other applicable federal and state privacy laws.',
        'The GLBA requires financial institutions, including tax preparation service providers, to inform customers about their information-sharing practices and to safeguard sensitive data.',
        'This GLBA Privacy Notice explains how we collect, use, and protect your nonpublic personal information, and describes your rights regarding the sharing of this information.',
        'By using IRS Tax Filer services, you acknowledge that you have received and understand this privacy notice.',
      ],
    },
    {
      id: 'information-collected',
      title: '2. Information We Collect',
      icon: DocumentTextIcon,
      content: [
        'Personal Identifiable Information: We collect personal information such as your name, address, phone number, email address, Social Security Number (SSN), Taxpayer Identification Number (TIN), date of birth, and other identifying information necessary for tax preparation services.',
        'Financial Information: We collect financial information including income statements, W-2 forms, 1099 forms, bank statements, investment records, business financial records, credit information, and other tax-related financial documents.',
        'Tax Information: We collect information about your tax situation including filing status, dependents, deductions, credits, prior year tax returns, tax payments, refunds, and other tax-related data.',
        'Account Information: We collect information you provide when creating an account, including username, password, security questions, payment information, and service preferences.',
        'Transaction Information: We collect information about your transactions with us, including service history, payment history, and communications with our tax professionals.',
      ],
    },
    {
      id: 'information-sharing',
      title: '3. Information Sharing Practices',
      icon: ExclamationTriangleIcon,
      content: [
        'We do not sell, rent, or trade your nonpublic personal information to third parties for their marketing purposes.',
        'We may share your information with tax authorities (IRS, state tax agencies) as required for filing your tax returns and complying with tax laws.',
        'We may share your information with trusted service providers who assist us in operating our business, such as cloud storage providers, payment processors, and customer support platforms. These providers are contractually obligated to protect your information and use it only for specified purposes.',
        'We may share your information when required by law, court order, or government regulation, or to protect our rights, property, or safety, or that of our users or others.',
        'We may share your information in connection with a business transfer, such as a merger or acquisition, subject to the same privacy protections.',
        'We may share your information with your explicit consent or at your direction.',
      ],
    },
    {
      id: 'safeguards',
      title: '4. Safeguards to Protect Your Information',
      icon: LockClosedIcon,
      content: [
        'We implement comprehensive physical, electronic, and procedural safeguards to protect your nonpublic personal information from unauthorized access, use, or disclosure.',
        'We use bank-level encryption (SSL/TLS) for all data transmission and encryption at rest for stored data to ensure your information remains secure.',
        'Access to your information is restricted to authorized employees and service providers who need access to perform their job functions. All personnel are bound by strict confidentiality agreements and undergo regular security training.',
        'We use secure document management systems with multi-factor authentication and regular security audits to identify and address potential vulnerabilities.',
        'We maintain secure facilities and implement access controls to prevent unauthorized physical access to your information.',
        'We regularly review and update our security protocols to address emerging threats and comply with industry best practices.',
      ],
    },
    {
      id: 'opt-out',
      title: '5. Your Right to Opt-Out',
      icon: UserIcon,
      content: [
        'Under GLBA, you have the right to opt-out of certain information sharing with non-affiliated third parties, except as required or permitted by law.',
        'You may opt-out of information sharing for marketing purposes by contacting us at contact@irstaxfiler.com or by calling +1 (415) 2231315.',
        'Even if you opt-out, we may still share your information as necessary to provide our services, comply with legal obligations, or as otherwise permitted by law.',
        'Your opt-out request will be processed within a reasonable time, typically within 30 days of receipt.',
        'You may change your opt-out preferences at any time by contacting us using the methods provided above.',
      ],
    },
    {
      id: 'affiliates',
      title: '6. Sharing with Affiliates',
      icon: InformationCircleIcon,
      content: [
        'We may share your nonpublic personal information with our affiliates (companies related to us by common ownership or control) for business purposes, such as providing integrated services or improving our offerings.',
        'If we share information with affiliates, we will ensure they maintain the same level of privacy protection as described in this notice.',
        'You have the right to opt-out of certain information sharing with affiliates for marketing purposes, subject to applicable law.',
        'We do not share your information with affiliates in a manner that would violate your privacy rights or applicable laws.',
      ],
    },
    {
      id: 'former-customers',
      title: '7. Protection of Former Customers',
      icon: ShieldCheckIcon,
      content: [
        'We maintain the same privacy protections for former customers as we do for current customers.',
        'We will continue to safeguard your nonpublic personal information in accordance with this notice even after you cease using our services.',
        'We retain your information only as long as necessary to comply with legal obligations, resolve disputes, and enforce our agreements, typically for seven years as required by IRS regulations.',
        'Former customers have the same rights to opt-out of information sharing as current customers.',
      ],
    },
    {
      id: 'accuracy',
      title: '8. Accuracy of Information',
      icon: CheckCircleIcon,
      content: [
        'We strive to maintain accurate and up-to-date information about you. You have the right to access and correct your nonpublic personal information.',
        'You can review and update much of your information through your account dashboard or by contacting us directly.',
        'If you believe any information we have about you is inaccurate or incomplete, please contact us immediately so we can correct it.',
        'We will make reasonable efforts to correct inaccurate information promptly upon your request.',
      ],
    },
    {
      id: 'children',
      title: '9. Children\'s Privacy',
      icon: EyeIcon,
      content: [
        'Our services are not directed to children under the age of 13. We do not knowingly collect personal information from children under 13.',
        'If we become aware that we have collected personal information from a child under 13, we will take steps to delete such information promptly.',
        'If you are a parent or guardian and believe your child has provided us with personal information, please contact us immediately.',
        'We comply with the Children\'s Online Privacy Protection Act (COPPA) and other applicable laws regarding children\'s privacy.',
      ],
    },
    {
      id: 'changes',
      title: '10. Changes to This Notice',
      icon: DocumentTextIcon,
      content: [
        'We may update this GLBA Privacy Notice from time to time to reflect changes in our practices, services, or applicable laws.',
        'We will notify you of any material changes to this notice by posting the updated notice on our website and updating the "Last Updated" date.',
        'For significant changes, we may also notify you by email or other means as required by law.',
        'Your continued use of our services after changes to this notice constitutes acceptance of the updated notice.',
        'We encourage you to review this notice periodically to stay informed about how we protect your information.',
      ],
    },
    {
      id: 'contact',
      title: '11. Contact Information',
      icon: InformationCircleIcon,
      content: [
        'If you have questions about this GLBA Privacy Notice or wish to exercise your privacy rights, please contact us:',
        'Email: contact@irstaxfiler.com',
        'Phone: +1 (415) 2231315',
        'Mail: IRS Tax Filer Privacy Office, [Your Business Address]',
        'We will respond to your inquiries and requests within a reasonable time, typically within 30 days.',
      ],
    },
    {
      id: 'compliance',
      title: '12. Our Commitment to Compliance',
      icon: ShieldCheckIcon,
      content: [
        'IRS Tax Filer is committed to full compliance with the Gramm-Leach-Bliley Act and all applicable federal and state privacy laws.',
        'We regularly review and update our privacy practices to ensure ongoing compliance with evolving legal requirements.',
        'Our employees receive regular training on privacy laws and data protection practices.',
        'We conduct periodic audits and assessments to verify compliance with GLBA requirements and our privacy policies.',
        'If you have concerns about our privacy practices or believe we have not complied with GLBA requirements, please contact us immediately.',
      ],
    },
  ];

  const title = "About Us | IRS Tax Filer";
  const description = "Learn about IRS Tax Filer — our mission, expertise in US & Indian tax services, and commitment to secure,Learn more.";
  const keywords = "online tax filing service,tax service provider,Internal Revenue Service,IRS Tax Filer about, US & Indian tax services, tax filing expertise, tax compliance company";
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
      <section className="relative overflow-hidden py-28" style={{ backgroundColor: '#EB4149' }}>
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
            className="absolute top-20 left-10 w-72 h-72 bg-purple-400/30 rounded-full blur-3xl"
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
            className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl"
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
              <ShieldCheckIcon className="h-4 w-4 text-yellow-300" />
              <span className="text-white font-semibold text-xs md:text-sm">Financial Privacy Protection</span>
            </motion.div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 leading-tight">
              <span className="block text-white drop-shadow-lg">GLBA Privacy Notice</span>
            </h1>

            <p className="text-base md:text-lg text-white/90 max-w-3xl mx-auto leading-relaxed">
              Gramm-Leach-Bliley Act (GLBA) Privacy Notice. Learn how we protect your nonpublic personal information 
              and your rights regarding information sharing.
            </p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-8 text-sm text-white/80"
            >
              <p>Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom Wave Decoration */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg className="w-full h-16 text-white" fill="currentColor" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0 C150,100 350,0 600,50 C850,100 1050,0 1200,50 L1200,120 L0,120 Z"></path>
          </svg>
        </div>
      </section>

      {/* GLBA Content */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Introduction */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <div className="bg-gradient-to-br from-purple-50 to-white rounded-2xl p-8 border border-purple-100 mb-8">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#EB4149' }}>
                  <LockClosedIcon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold mb-3" style={{ color: '#EB4149' }}>
                    Our Commitment to Financial Privacy
                  </h2>
                  <p className="text-base text-gray-700 leading-relaxed">
                    IRS Tax Filer is committed to protecting your nonpublic personal information in accordance with the 
                    Gramm-Leach-Bliley Act (GLBA). This notice explains our information-sharing practices and your rights 
                    regarding the protection of your financial information. We take your privacy seriously and implement 
                    comprehensive safeguards to protect your sensitive data.
                  </p>
                </div>
              </div>
            </div>

            <p className="text-base text-gray-700 leading-relaxed mb-4">
              The Gramm-Leach-Bliley Act (GLBA) requires financial institutions, including tax preparation service providers 
              like IRS Tax Filer, to inform customers about their information-sharing practices and to safeguard sensitive financial data.
            </p>
            <p className="text-base text-gray-700 leading-relaxed">
              If you have any questions about this GLBA Privacy Notice, please contact us at{' '}
              <a href="mailto:contact@irstaxfiler.com" className="text-[#EB4149] hover:underline font-semibold">
                contact@irstaxfiler.com
              </a>
              {' '}or call us at{' '}
              <a href="tel:++1 (415) 2231315" className="text-[#EB4149] hover:underline font-semibold">
                +1 (415) 2231315
              </a>.
            </p>
          </motion.div>

          {/* GLBA Sections */}
          <div className="space-y-8">
            {sections.map((section, index) => {
              const IconComponent = section.icon;
              return (
                <motion.div
                  key={section.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-2xl shadow-md border border-gray-200 p-8 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-start space-x-4 mb-6">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#EB4149' }}>
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 pt-2">
                      {section.title}
                    </h2>
                  </div>
                  <ul className="space-y-4">
                    {section.content.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start space-x-3">
                        <div className="flex-shrink-0 w-2 h-2 rounded-full mt-2" style={{ backgroundColor: '#EB4149' }}></div>
                        <p className="text-base text-gray-700 leading-relaxed">
                          {item}
                        </p>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>

          {/* Contact Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-16 bg-gradient-to-br from-purple-50 to-white rounded-2xl p-8 border border-purple-100"
          >
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-4" style={{ color: '#EB4149' }}>
                Questions About GLBA Privacy?
              </h3>
              <p className="text-gray-700 mb-6">
                If you have questions about this GLBA Privacy Notice or wish to exercise your privacy rights, 
                including your right to opt-out of certain information sharing, our privacy team is here to help.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-lg font-semibold text-white transition-all duration-300 hover:shadow-lg"
                  style={{ backgroundColor: '#EB4149' }}
                >
                  Contact Us
                </Link>
                <Link
                  to="/privacy"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-lg font-semibold border-2 transition-all duration-300 hover:bg-gray-50"
                  style={{ borderColor: '#EB4149', color: '#EB4149' }}
                >
                  Privacy Policy
                </Link>
                <Link
                  to="/terms"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-lg font-semibold border-2 transition-all duration-300 hover:bg-gray-50"
                  style={{ borderColor: '#EB4149', color: '#EB4149' }}
                >
                  Terms & Conditions
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
    </>
  );
};

export default GLBA;

