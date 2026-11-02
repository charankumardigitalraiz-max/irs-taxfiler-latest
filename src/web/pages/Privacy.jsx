import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ShieldCheckIcon,
  LockClosedIcon,
  EyeIcon,
  DocumentCheckIcon,
  UserIcon,
  InformationCircleIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline';
import SEO from '../components/seo/SEO';
import Logo from '../assets/irsLogo.png';
import { publicSettingsService } from '../../client/services/settingsService';

const Privacy = () => {
  const [dynamicContent, setDynamicContent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDynamicContent();
  }, []);

  const loadDynamicContent = async () => {
    try {
      const response = await publicSettingsService.getSetting('privacy-policy');
      if (response.success && response.data) {
        setDynamicContent(response.data);
      }
    } catch (error) {
      console.error('Failed to load privacy content:', error);
    } finally {
      setLoading(false);
    }
  };

  const defaultSections = [
    {
      id: 'introduction',
      title: '1. Introduction',
      icon: InformationCircleIcon,
      content: [
        'IRS Tax Filer ("we," "our," or "us") is committed to protecting your privacy and ensuring the security of your personal and financial information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our tax preparation and filing services.',
        'By using IRS Tax Filer services, you consent to the data practices described in this policy. If you do not agree with this policy, please do not use our services.',
        'This policy applies to all information collected through our website, mobile applications, and tax preparation services, including information you provide directly and information we collect automatically.',
        'We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new policy on our website and updating the "Last Updated" date.',
      ],
    },
    {
      id: 'information-collected',
      title: '2. Information We Collect',
      icon: DocumentCheckIcon,
      content: [
        'Personal Information: We collect personal information such as your name, address, phone number, email address, Social Security Number (SSN), Taxpayer Identification Number (TIN), date of birth, and other identifying information necessary for tax preparation.',
        'Financial Information: We collect financial information including income statements, W-2 forms, 1099 forms, bank statements, investment records, business financial records, and other tax-related documents.',
        'Tax Information: We collect information about your tax situation including filing status, dependents, deductions, credits, prior year tax returns, and other tax-related data.',
        'Account Information: We collect information you provide when creating an account, including username, password, security questions, and preferences.',
        'Usage Information: We automatically collect information about how you use our services, including IP address, browser type, device information, pages visited, time spent on pages, and clickstream data.',
        'Communication Information: We collect information from your communications with us, including customer support inquiries, emails, phone calls, and chat transcripts.',
      ],
    },
    {
      id: 'how-we-use',
      title: '3. How We Use Your Information',
      icon: CheckCircleIcon,
      content: [
        'Tax Preparation: We use your information to prepare, review, and file your tax returns with the appropriate tax authorities (IRS, state tax agencies, etc.).',
        'Service Delivery: We use your information to provide, maintain, and improve our tax preparation services, including customer support and account management.',
        'Communication: We use your contact information to communicate with you about your tax returns, service updates, important deadlines, and respond to your inquiries.',
        'Compliance: We use your information to comply with legal obligations, including tax laws, anti-money laundering regulations, and other applicable laws.',
        'Security: We use your information to protect against fraud, unauthorized access, and other security threats.',
        'Business Operations: We use aggregated and anonymized data for business analytics, service improvement, and marketing purposes (without identifying individual users).',
      ],
    },
    {
      id: 'information-sharing',
      title: '4. Information Sharing and Disclosure',
      icon: ExclamationTriangleIcon,
      content: [
        'Tax Authorities: We share your tax information with the Internal Revenue Service (IRS), state tax agencies, and other tax authorities as required for filing your tax returns.',
        'Service Providers: We may share your information with trusted third-party service providers who assist us in operating our business, such as cloud storage providers, payment processors, and customer support platforms. These providers are contractually obligated to protect your information.',
        'Legal Requirements: We may disclose your information if required by law, court order, or government regulation, or to protect our rights, property, or safety, or that of our users or others.',
        'Business Transfers: In the event of a merger, acquisition, or sale of assets, your information may be transferred to the acquiring entity, subject to the same privacy protections.',
        'With Your Consent: We may share your information with third parties when you explicitly consent to such sharing.',
        'We do not sell, rent, or trade your personal information to third parties for their marketing purposes.',
      ],
    },
    {
      id: 'data-security',
      title: '5. Data Security',
      icon: LockClosedIcon,
      content: [
        'We implement industry-standard security measures to protect your information, including bank-level encryption (SSL/TLS) for data transmission and encryption at rest for stored data.',
        'Access to your information is restricted to authorized employees and service providers who need access to perform their job functions. All personnel are bound by strict confidentiality agreements.',
        'We use secure document management systems and regularly update our security protocols to address emerging threats.',
        'We conduct regular security audits and assessments to identify and address potential vulnerabilities.',
        'While we strive to protect your information, no method of transmission over the internet or electronic storage is 100% secure. We cannot guarantee absolute security but are committed to using commercially reasonable security measures.',
        'You play a role in security by maintaining the confidentiality of your account credentials and notifying us immediately of any unauthorized access.',
      ],
    },
    {
      id: 'data-retention',
      title: '6. Data Retention',
      icon: DocumentCheckIcon,
      content: [
        'We retain your tax information and documents for the period required by law, typically seven years from the date of filing, as required by IRS regulations.',
        'Account information is retained while your account is active and for a reasonable period after account closure to comply with legal obligations and resolve disputes.',
        'We may retain certain information longer if required by law, court order, or for legitimate business purposes such as fraud prevention.',
        'You may request deletion of your information, subject to legal retention requirements. We will inform you if we cannot delete certain information due to legal obligations.',
        'Upon account closure, we will securely delete or anonymize your information in accordance with our retention policies and legal requirements.',
      ],
    },
    {
      id: 'your-rights',
      title: '7. Your Privacy Rights',
      icon: UserIcon,
      content: [
        'Access: You have the right to access and review the personal information we hold about you. You can access much of this information through your account dashboard.',
        'Correction: You have the right to correct inaccurate or incomplete information. You can update most information through your account or by contacting us.',
        'Deletion: You may request deletion of your personal information, subject to legal retention requirements for tax records.',
        'Opt-Out: You can opt out of marketing communications by clicking unsubscribe links in emails or adjusting your account preferences.',
        'Data Portability: You may request a copy of your data in a portable format, subject to applicable laws.',
        'California Privacy Rights: If you are a California resident, you have additional rights under the California Consumer Privacy Act (CCPA), including the right to know what personal information we collect and the right to opt out of the sale of personal information (we do not sell personal information).',
        'To exercise these rights, please contact us at contact@irstaxfiler.com or use the contact information provided below.',
      ],
    },
    {
      id: 'cookies',
      title: '8. Cookies and Tracking Technologies',
      icon: EyeIcon,
      content: [
        'We use cookies and similar tracking technologies to enhance your experience, analyze usage patterns, and improve our services.',
        'Types of cookies we use include: Essential cookies (required for site functionality), Analytics cookies (to understand how visitors use our site), and Preference cookies (to remember your settings).',
        'You can control cookies through your browser settings. However, disabling certain cookies may limit your ability to use some features of our services.',
        'We may use third-party analytics services (such as Google Analytics) that use cookies to collect information about your use of our website. These services have their own privacy policies.',
        'We do not use cookies to track your activities across other websites for advertising purposes without your consent.',
      ],
    },
    {
      id: 'children-privacy',
      title: '9. Children\'s Privacy',
      icon: ShieldCheckIcon,
      content: [
        'Our services are not intended for individuals under the age of 18. We do not knowingly collect personal information from children under 18.',
        'If we become aware that we have collected information from a child under 18, we will take steps to delete such information promptly.',
        'If you are a parent or guardian and believe your child has provided us with personal information, please contact us immediately.',
        'Tax returns for dependents under 18 are handled through their parents\' or guardians\' accounts with appropriate authorization.',
      ],
    },
    {
      id: 'international-users',
      title: '10. International Users',
      icon: InformationCircleIcon,
      content: [
        'If you are accessing our services from outside the United States, please be aware that your information may be transferred to, stored, and processed in the United States.',
        'By using our services, you consent to the transfer of your information to the United States, which may have different data protection laws than your country of residence.',
        'We comply with applicable data protection laws and implement appropriate safeguards for international data transfers.',
        'If you are subject to the General Data Protection Regulation (GDPR) or other international privacy laws, you may have additional rights. Please contact us to exercise these rights.',
      ],
    },
    {
      id: 'third-party-links',
      title: '11. Third-Party Links and Services',
      icon: ExclamationTriangleIcon,
      content: [
        'Our services may contain links to third-party websites or services that are not operated by us. We are not responsible for the privacy practices of these third parties.',
        'We encourage you to review the privacy policies of any third-party websites or services you access through our platform.',
        'Some features of our services may integrate with third-party services (such as bank account verification). These integrations are subject to the privacy policies of those third parties.',
        'We do not endorse or assume responsibility for the privacy practices of third-party services.',
      ],
    },
    {
      id: 'contact',
      title: '12. Contact Us',
      icon: InformationCircleIcon,
      content: [
        'If you have questions, concerns, or requests regarding this Privacy Policy or our privacy practices, please contact us:',
        'Email: contact@irstaxfiler.com',
        'Phone: +1 (415) 2231315',
        'Mail: IRS Tax Filer Privacy Office, 123 Tax Street, Suite 100, New York, NY 10001',
        'We will respond to your privacy inquiries within 30 days of receipt.',
        'For general customer service inquiries, please visit our Contact Us page or call our customer support line.',
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
              <span className="text-white font-semibold text-xs md:text-sm">Your Privacy Matters</span>
            </motion.div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 leading-tight">
              <span className="block text-white drop-shadow-lg">Privacy Policy</span>
            </h1>

            <p className="text-base md:text-lg text-white/90 max-w-3xl mx-auto leading-relaxed">
              We are committed to protecting your privacy and securing your sensitive tax information. 
              Learn how we collect, use, and safeguard your data.
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

      {/* Privacy Content */}
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
                    Our Commitment to Your Privacy
                  </h2>
                  <p className="text-base text-gray-700 leading-relaxed">
                    At IRS Tax Filer, we understand that your tax information is highly sensitive and personal. 
                    We are committed to maintaining the highest standards of data protection and privacy. 
                    This Privacy Policy explains our practices regarding the collection, use, and protection of your information.
                  </p>
                </div>
              </div>
            </div>

            <p className="text-base text-gray-700 leading-relaxed mb-4">
              This Privacy Policy describes how IRS Tax Filer collects, uses, shares, and protects your personal 
              and financial information when you use our tax preparation and filing services.
            </p>
            <p className="text-base text-gray-700 leading-relaxed">
              If you have any questions about this Privacy Policy, please contact us at{' '}
              <a href="mailto:contact@irstaxfiler.com" className="text-[#EB4149] hover:underline font-semibold">
                contact@irstaxfiler.com
              </a>
              {' '}or call us at{' '}
              <a href="tel:++1 (415) 2231315" className="text-[#EB4149] hover:underline font-semibold">
                +1 (415) 2231315
              </a>.
            </p>
          </motion.div>

          {/* Privacy Sections */}
          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-500">Loading privacy policy...</p>
            </div>
          ) : dynamicContent ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl shadow-md border border-gray-200 p-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">{dynamicContent.title}</h2>
              <div
                className="prose prose-lg max-w-none text-gray-700"
                dangerouslySetInnerHTML={{ __html: dynamicContent.content }}
              />
            </motion.div>
          ) : (
            <div className="space-y-8">
              {defaultSections.map((section, index) => {
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
          )}

          {/* Security Highlights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-16 bg-gradient-to-br from-green-50 to-white rounded-2xl p-8 border border-green-100"
          >
            <div className="flex items-start space-x-4 mb-6">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center bg-green-100">
                <ShieldCheckIcon className="h-6 w-6" style={{ color: '#EB4149' }} />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-4" style={{ color: '#EB4149' }}>
                  Security Measures We Implement
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    'Bank-level encryption (SSL/TLS)',
                    'Secure document storage',
                    'Regular security audits',
                    'Access controls and authentication',
                    'Employee confidentiality agreements',
                    'Compliance with industry standards',
                  ].map((item, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <CheckCircleIcon className="h-5 w-5 text-green-600 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-12 bg-gradient-to-br from-purple-50 to-white rounded-2xl p-8 border border-purple-100"
          >
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-4" style={{ color: '#EB4149' }}>
                Questions About Your Privacy?
              </h3>
              <p className="text-gray-700 mb-6">
                Our privacy team is here to help. Contact us if you have questions about how we handle your information 
                or if you want to exercise your privacy rights.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="mailto:contact@irstaxfiler.com"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-lg font-semibold text-white transition-all duration-300 hover:shadow-lg"
                  style={{ backgroundColor: '#EB4149' }}
                >
                  Email Privacy Team
                </a>
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-lg font-semibold border-2 transition-all duration-300 hover:bg-gray-50"
                  style={{ borderColor: '#EB4149', color: '#EB4149' }}
                >
                  Contact Us
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

export default Privacy;

