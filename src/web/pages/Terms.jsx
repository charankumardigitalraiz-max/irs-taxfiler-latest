import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  DocumentTextIcon,
  ShieldCheckIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  InformationCircleIcon,
} from '@heroicons/react/24/outline';
import SEO from '../components/seo/SEO';
import Logo from '../assets/irsLogo.png';
import { publicSettingsService } from '../../client/services/settingsService';

const Terms = () => {
  const [dynamicContent, setDynamicContent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDynamicContent();
  }, []);

  const loadDynamicContent = async () => {
    try {
      const response = await publicSettingsService.getSetting('terms-conditions');
      if (response.success && response.data) {
        setDynamicContent(response.data);
      }
    } catch (error) {
      console.error('Failed to load terms content:', error);
    } finally {
      setLoading(false);
    }
  };

  const defaultSections = [
    {
      id: 'acceptance',
      title: '1. Acceptance of Terms',
      icon: CheckCircleIcon,
      content: [
        'By accessing and using IRS Tax Filer services, you accept and agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our services.',
        'These terms apply to all users of IRS Tax Filer, including but not limited to individuals, businesses, and entities seeking tax filing assistance.',
        'We reserve the right to modify these terms at any time. Continued use of our services after changes constitutes acceptance of the modified terms.',
      ],
    },
    {
      id: 'services',
      title: '2. Description of Services',
      icon: DocumentTextIcon,
      content: [
        'IRS Tax Filer provides professional tax preparation, filing, and consultation services for U.S. and Indian tax obligations.',
        'Our services include but are not limited to: Federal and State tax filing, FBAR/FATCA compliance, Tax representation, ITIN assistance, Extension filing, Business incorporation services, and Indian tax filing (ITR).',
        'We act as a tax preparation service provider and do not provide legal, financial, or investment advice unless explicitly stated.',
        'All tax returns are prepared based on information provided by you. You are responsible for the accuracy and completeness of all information submitted.',
      ],
    },
    {
      id: 'user-responsibilities',
      title: '3. User Responsibilities',
      icon: ShieldCheckIcon,
      content: [
        'You must provide accurate, complete, and truthful information for all tax filings. Providing false or misleading information may result in penalties, interest, and legal consequences.',
        'You are responsible for reviewing all tax returns before signing and authorizing submission to tax authorities.',
        'You must maintain the confidentiality of your account credentials and notify us immediately of any unauthorized access.',
        'You agree to cooperate fully with our tax professionals and provide all necessary documents in a timely manner.',
        'You are responsible for ensuring that all required documents are submitted before applicable deadlines.',
      ],
    },
    {
      id: 'fees',
      title: '4. Fees and Payment',
      icon: InformationCircleIcon,
      content: [
        'All fees for our services are clearly disclosed before service commencement. Fees vary based on the complexity of your tax situation and services requested.',
        'Payment is required as per the agreed payment schedule. We accept various payment methods including credit cards, debit cards, and bank transfers.',
        'Refund policies vary by service type. Generally, fees are non-refundable once tax preparation work has commenced, except as required by law or as explicitly stated in your service agreement.',
        'We reserve the right to charge additional fees for services beyond the original scope of work, with your prior approval.',
        'Late payment may result in service suspension or termination, and may incur additional charges.',
      ],
    },
    {
      id: 'accuracy',
      title: '5. Accuracy and Guarantees',
      icon: CheckCircleIcon,
      content: [
        'While we strive for accuracy, IRS Tax Filer cannot guarantee specific tax outcomes, refund amounts, or that all deductions will be identified.',
        'We guarantee that your tax returns will be prepared in accordance with applicable tax laws and regulations based on the information you provide.',
        'If we make an error due to our negligence, we will reimburse you for any penalties and interest directly resulting from our error, subject to our maximum liability limits.',
        'You remain ultimately responsible for the accuracy of your tax returns. You should review all returns carefully before signing.',
        'We are not responsible for errors resulting from incorrect, incomplete, or late information provided by you.',
      ],
    },
    {
      id: 'deadlines',
      title: '6. Filing Deadlines and Extensions',
      icon: ExclamationTriangleIcon,
      content: [
        'You are responsible for meeting all tax filing deadlines. We will make reasonable efforts to file your returns on time based on information provided.',
        'If you need an extension, we can assist with filing extension requests. However, extensions do not extend the time to pay taxes owed.',
        'We are not liable for late filing penalties if you fail to provide required information or documents in a timely manner.',
        'Estimated tax payments and other deadlines remain your responsibility, even if you engage our services.',
        'We recommend submitting all documents at least 2 weeks before applicable deadlines to ensure timely filing.',
      ],
    },
    {
      id: 'privacy',
      title: '7. Privacy and Confidentiality',
      icon: ShieldCheckIcon,
      content: [
        'We maintain strict confidentiality regarding all client information and tax documents in accordance with applicable privacy laws and professional standards.',
        'Your information is protected using bank-level encryption and secure document management systems.',
        'We do not share your personal or tax information with third parties except as required by law or with your explicit consent.',
        'You grant us permission to communicate with tax authorities on your behalf regarding your tax matters.',
        'For more details, please review our Privacy Policy.',
      ],
    },
    {
      id: 'limitation',
      title: '8. Limitation of Liability',
      icon: ExclamationTriangleIcon,
      content: [
        'IRS Tax Filer\'s liability is limited to the fees paid for the specific service in question, except where prohibited by law.',
        'We are not liable for indirect, incidental, special, or consequential damages, including but not limited to lost profits or business opportunities.',
        'We are not responsible for delays caused by factors beyond our reasonable control, including but not limited to government processing delays, natural disasters, or technical failures.',
        'Our liability does not extend to errors or omissions resulting from incorrect information provided by you or third parties.',
        'You agree to indemnify and hold IRS Tax Filer harmless from any claims arising from your use of our services or violation of these terms.',
      ],
    },
    {
      id: 'intellectual',
      title: '9. Intellectual Property',
      icon: DocumentTextIcon,
      content: [
        'All content, materials, software, and intellectual property on the IRS Tax Filer platform are owned by IRS Tax Filer or its licensors.',
        'You may not copy, reproduce, distribute, or create derivative works from our materials without explicit written permission.',
        'You retain ownership of your tax documents and information, but grant us a license to use such information to provide our services.',
        'Any feedback, suggestions, or ideas you provide may be used by IRS Tax Filer without compensation or obligation to you.',
      ],
    },
    {
      id: 'termination',
      title: '10. Service Termination',
      icon: ExclamationTriangleIcon,
      content: [
        'Either party may terminate the service relationship at any time, subject to completion of work in progress and payment obligations.',
        'We reserve the right to suspend or terminate services if you violate these terms, engage in fraudulent activity, or fail to make required payments.',
        'Upon termination, you remain responsible for all fees incurred up to the termination date.',
        'We will provide you with copies of your tax documents upon request, subject to applicable fees and retention policies.',
        'Termination does not affect any rights or obligations that accrued prior to termination.',
      ],
    },
    {
      id: 'disputes',
      title: '11. Dispute Resolution',
      icon: InformationCircleIcon,
      content: [
        'Any disputes arising from these terms or our services will first be addressed through good faith negotiation.',
        'If negotiation fails, disputes will be resolved through binding arbitration in accordance with applicable arbitration rules.',
        'You agree to waive any right to participate in class action lawsuits against IRS Tax Filer.',
        'These terms are governed by the laws of the jurisdiction in which IRS Tax Filer operates.',
        'You agree to submit to the exclusive jurisdiction of the courts in that jurisdiction for any disputes not subject to arbitration.',
      ],
    },
    {
      id: 'miscellaneous',
      title: '12. Miscellaneous Provisions',
      icon: DocumentTextIcon,
      content: [
        'These terms constitute the entire agreement between you and IRS Tax Filer regarding the use of our services.',
        'If any provision of these terms is found to be unenforceable, the remaining provisions will remain in full effect.',
        'Our failure to enforce any right or provision does not constitute a waiver of that right or provision.',
        'You may not assign or transfer your rights or obligations under these terms without our written consent.',
        'We may assign these terms or any rights hereunder without your consent.',
        'All notices and communications will be sent to the contact information you provide.',
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
              <DocumentTextIcon className="h-4 w-4 text-yellow-300" />
              <span className="text-white font-semibold text-xs md:text-sm">Legal Information</span>
            </motion.div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 leading-tight">
              <span className="block text-white drop-shadow-lg">Terms & Conditions</span>
            </h1>

            <p className="text-base md:text-lg text-white/90 max-w-3xl mx-auto leading-relaxed">
              Please read these terms carefully before using IRS Tax Filer services. By using our services, you agree to be bound by these terms.
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

      {/* Terms Content */}
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
            <p className="text-base text-gray-700 leading-relaxed mb-6">
              Welcome to IRS Tax Filer. These Terms and Conditions ("Terms") govern your use of our tax preparation and filing services. 
              By accessing or using our services, you agree to comply with and be bound by these Terms.
            </p>
            <p className="text-base text-gray-700 leading-relaxed">
              If you have any questions about these Terms, please contact us at{' '}
              <a href="mailto:contact@irstaxfiler.com" className="text-[#EB4149] hover:underline font-semibold">
                contact@irstaxfiler.com
              </a>
              {' '}or call us at{' '}
              <a href="tel:++1 (415) 2231315" className="text-[#EB4149] hover:underline font-semibold">
                +1 (415) 2231315
              </a>.
            </p>
          </motion.div>

          {/* Terms Sections */}
          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-500">Loading terms...</p>
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
                Questions About These Terms?
              </h3>
              <p className="text-gray-700 mb-6">
                If you have any questions or concerns about these Terms and Conditions, our legal team is here to help.
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
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
    </>
  );
};

export default Terms;

