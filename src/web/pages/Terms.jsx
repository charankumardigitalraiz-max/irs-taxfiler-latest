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
    <div className="min-h-screen bg-white font-sans text-gray-900 antialiased">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 sm:pt-16 pb-14 sm:pb-16 bg-white border-b border-slate-100">
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
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F6F9EE] border border-[#749220]/30 shadow-sm mb-4 text-xs font-medium text-[#749220]">
              <DocumentTextIcon className="h-3.5 w-3.5 text-[#749220]" />
              <span>Legal Information</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-normal text-gray-900 tracking-tight leading-[1.2] mb-3.5">
              Terms &{" "}
              <span className="font-semibold bg-gradient-to-r from-[#0A4973] via-[#165479] to-[#749220] bg-clip-text text-transparent">
                Conditions
              </span>
            </h1>

            <p className="text-sm sm:text-base lg:text-[17px] text-gray-600 font-normal max-w-2xl mx-auto leading-[30px] sm:leading-[32px] lg:leading-[34px]">
              Please read these terms carefully before using IRS Tax Filer services. By using our services, you agree to be bound by these terms.
            </p>

            <div className="mt-5 inline-flex items-center px-3 py-1 rounded-full bg-slate-50 border border-slate-200/80 text-xs font-medium text-gray-500">
              <p>Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Terms Content */}
      <section className="py-12 sm:py-16 bg-slate-50/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top Intro & Contact Split Banner */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch mb-10"
          >
            <div className="lg:col-span-7 bg-gradient-to-br from-[#0A3D5C] via-[#124C6F] to-[#165479] rounded-2xl p-6 sm:p-8 text-white shadow-sm relative overflow-hidden flex items-center">
              <div className="absolute -top-12 -right-12 w-44 h-44 bg-[#749220]/30 rounded-full blur-3xl pointer-events-none" />
              <div className="relative z-10 flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-white/10 border border-white/20 text-[#C5DF7B] flex items-center justify-center backdrop-blur-sm">
                  <DocumentTextIcon className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm sm:text-[15px] text-sky-100/95 leading-relaxed">
                    Welcome to IRS Tax Filer. These Terms and Conditions ("Terms") govern your use of our tax preparation and filing services. 
                    By accessing or using our services, you agree to comply with and be bound by these Terms.
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 sm:p-8 flex flex-col justify-center">
              <p className="text-sm sm:text-[15px] text-gray-700 leading-relaxed">
                If you have any questions about these Terms, please contact us at{' '}
                <a href="mailto:contact@irstaxfiler.com" className="text-[#165479] hover:text-[#0A4973] hover:underline font-semibold transition-colors">
                  contact@irstaxfiler.com
                </a>
                {' '}or call us at{' '}
                <a href="tel:++1 (415) 2231315" className="text-[#165479] hover:text-[#0A4973] hover:underline font-semibold transition-colors">
                  +1 (415) 2231315
                </a>.
              </p>
            </div>
          </motion.div>

          {/* Terms Sections */}
          {loading ? (
            <div className="text-center py-12 bg-white rounded-2xl border border-slate-200/80">
              <p className="text-sm text-gray-500">Loading terms...</p>
            </div>
          ) : dynamicContent ? (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45 }}
              className="bg-white rounded-2xl shadow-sm border border-slate-200/90 p-6 sm:p-10"
            >
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-6">{dynamicContent.title}</h2>
              <div
                className="prose prose-base sm:prose-lg max-w-none text-gray-700"
                dangerouslySetInnerHTML={{ __html: dynamicContent.content }}
              />
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Sticky Section Index */}
              <aside className="lg:col-span-4 lg:sticky lg:top-24">
                <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5 sm:p-6">
                  <div className="flex items-center gap-2.5 pb-3.5 mb-3.5 border-b border-slate-100">
                    <span className="w-2 h-2 rounded-full bg-[#749220]" />
                    <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Terms Sections
                    </span>
                  </div>
                  <nav className="space-y-1">
                    {defaultSections.map((section, idx) => {
                      const NavIcon = section.icon;
                      return (
                        <a
                          key={section.id}
                          href={`#${section.id}`}
                          onClick={(e) => {
                            e.preventDefault();
                            document.getElementById(section.id)?.scrollIntoView({
                              behavior: 'smooth',
                              block: 'start',
                            });
                          }}
                          className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs sm:text-[13px] font-medium text-gray-700 hover:text-[#0A4973] hover:bg-sky-50/80 transition-colors"
                        >
                          <NavIcon className={`w-4 h-4 shrink-0 ${idx % 2 === 1 ? 'text-[#749220]' : 'text-[#165479]'}`} />
                          <span className="truncate">{section.title}</span>
                        </a>
                      );
                    })}
                  </nav>
                </div>
              </aside>

              {/* Right Content Cards */}
              <div className="lg:col-span-8 space-y-5">
                {defaultSections.map((section, index) => {
                  const IconComponent = section.icon;
                  const isLime = index % 2 === 1;
                  return (
                    <motion.div
                      id={section.id}
                      key={section.id}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{ duration: 0.3 }}
                      className="scroll-mt-24 bg-white rounded-2xl shadow-sm border border-slate-200/90 p-6 sm:p-7 hover:border-[#165479]/35 transition-all duration-200 relative overflow-hidden"
                    >
                      <div
                        className={`absolute top-0 inset-x-0 h-0.5 ${
                          isLime
                            ? "bg-gradient-to-r from-[#749220]/70 via-[#749220]/25 to-transparent"
                            : "bg-gradient-to-r from-[#165479]/70 via-[#165479]/25 to-transparent"
                        }`}
                      />
                      <div className="flex items-center gap-3.5 pb-4 mb-4 border-b border-slate-100">
                        <div
                          className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center ${
                            isLime
                              ? "bg-[#F6F9EE] border border-[#749220]/25 text-[#749220]"
                              : "bg-sky-50 border border-sky-100 text-[#165479]"
                          }`}
                        >
                          <IconComponent className="h-5 w-5" />
                        </div>
                        <h2 className="text-base sm:text-lg font-semibold text-gray-900 leading-snug">
                          {section.title}
                        </h2>
                      </div>
                      <ul className="space-y-3">
                        {section.content.map((item, itemIndex) => (
                          <li key={itemIndex} className="flex items-start gap-3">
                            <span
                              className={`flex-shrink-0 w-1.5 h-1.5 rounded-full mt-2 ${
                                isLime ? "bg-[#749220]" : "bg-[#165479]"
                              }`}
                            />
                            <p className="text-sm sm:text-[15px] text-gray-600 leading-relaxed">
                              {item}
                            </p>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Contact Section */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="mt-12 bg-gradient-to-br from-[#DFEBC2]/55 via-white to-[#C3DCED]/55 rounded-2xl p-8 sm:p-10 border border-[#165479]/15 shadow-sm text-center"
          >
            <h3 className="text-xl sm:text-2xl font-normal text-gray-900 tracking-tight mb-3">
              Questions About These{" "}
              <span className="font-semibold bg-gradient-to-r from-[#0A4973] via-[#165479] to-[#749220] bg-clip-text text-transparent">
                Terms?
              </span>
            </h3>
            <p className="text-sm sm:text-base text-gray-700 mb-6 max-w-lg mx-auto leading-relaxed">
              If you have any questions or concerns about these Terms and Conditions, our legal team is here to help.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center h-10 sm:h-11 px-6 rounded-lg font-medium text-xs sm:text-sm text-white bg-gradient-to-r from-[#0C3D5A] via-[#165479] to-[#1A5B82] hover:from-[#09324A] hover:via-[#134969] hover:to-[#165479] shadow-sm transition-all"
              >
                Contact Us
              </Link>
              <Link
                to="/privacy"
                className="inline-flex items-center justify-center h-10 sm:h-11 px-6 rounded-lg font-medium text-xs sm:text-sm text-gray-800 bg-white hover:bg-slate-50 border border-slate-300 shadow-sm transition-all"
              >
                Privacy Policy
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
    </>
  );
};

export default Terms;

