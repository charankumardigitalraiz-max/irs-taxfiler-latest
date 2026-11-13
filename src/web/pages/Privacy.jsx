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
        'Mail: IRS Tax Filer Privacy Office, 12600 Deerfield Parkway Suite 2096, Alpharetta 30004, USA',
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
                <ShieldCheckIcon className="h-3.5 w-3.5 text-[#749220]" />
                <span>Your Privacy Matters</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-normal text-gray-900 tracking-tight leading-[1.2] mb-3.5">
                Privacy{" "}
                <span className="font-semibold bg-gradient-to-r from-[#0A4973] via-[#165479] to-[#749220] bg-clip-text text-transparent">
                  Policy
                </span>
              </h1>

              <p className="text-sm sm:text-base lg:text-[17px] text-gray-600 font-normal max-w-2xl mx-auto leading-[30px] sm:leading-[32px] lg:leading-[34px]">
                We are committed to protecting your privacy and securing your sensitive tax information.
                Learn how we collect, use, and safeguard your data.
              </p>

              <div className="mt-5 inline-flex items-center px-3 py-1 rounded-full bg-slate-50 border border-slate-200/80 text-xs font-medium text-gray-500">
                <p>Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Privacy Content */}
        <section className="py-12 sm:py-16 bg-slate-50/70">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Top Intro & Commitment Split Banner */}
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
                    <LockClosedIcon className="h-6 w-6" />
                  </div>
                  <div>
                    <h2 className="text-lg sm:text-xl font-semibold text-white mb-2">
                      Our Commitment to Your Privacy
                    </h2>
                    <p className="text-sm sm:text-[15px] text-sky-100/95 leading-relaxed">
                      At IRS Tax Filer, we understand that your tax information is highly sensitive and personal.
                      We are committed to maintaining the highest standards of data protection and privacy.
                      This Privacy Policy explains our practices regarding the collection, use, and protection of your information.
                    </p>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 sm:p-8 flex flex-col justify-center">
                <p className="text-sm sm:text-[15px] text-gray-700 leading-relaxed mb-3.5">
                  This Privacy Policy describes how IRS Tax Filer collects, uses, shares, and protects your personal
                  and financial information when you use our tax preparation and filing services.
                </p>
                <p className="text-sm sm:text-[15px] text-gray-700 leading-relaxed pt-3.5 border-t border-slate-100">
                  If you have any questions about this Privacy Policy, please contact us at{' '}
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

            {/* Privacy Sections */}
            {loading ? (
              <div className="text-center py-12 bg-white rounded-2xl border border-slate-200/80">
                <p className="text-sm text-gray-500">Loading privacy policy...</p>
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
                <aside className="lg:col-span-4 lg:sticky lg:top-24 space-y-5">
                  <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5 sm:p-6">
                    <div className="flex items-center gap-2.5 pb-3.5 mb-3.5 border-b border-slate-100">
                      <span className="w-2 h-2 rounded-full bg-[#749220]" />
                      <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                        Policy Sections
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
                            className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs sm:text-[13px] font-medium text-gray-700 hover:text-[#0A4973] hover:bg-sky-50/80 transition-colors group"
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
                        className="scroll-mt-24 bg-white rounded-2xl shadow-sm border border-slate-200/90 p-6 sm:p-7 hover:border-[#165479]/35 transition-all duration-200 relative overflow-hidden group"
                      >
                        <div
                          className={`absolute top-0 inset-x-0 h-0.5 ${isLime
                              ? "bg-gradient-to-r from-[#749220]/70 via-[#749220]/25 to-transparent"
                              : "bg-gradient-to-r from-[#165479]/70 via-[#165479]/25 to-transparent"
                            }`}
                        />
                        <div className="flex items-center gap-3.5 pb-4 mb-4 border-b border-slate-100">
                          <div
                            className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center ${isLime
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
                          {section.content.map((item, itemIndex) => {
                            const colonIdx = item.indexOf(':');
                            const hasLabel =
                              colonIdx > 0 &&
                              colonIdx <= 30 &&
                              !item.slice(0, colonIdx).includes('http');
                            return (
                              <li key={itemIndex} className="flex items-start gap-3">
                                <span
                                  className={`flex-shrink-0 w-1.5 h-1.5 rounded-full mt-2 ${isLime ? "bg-[#749220]" : "bg-[#165479]"
                                    }`}
                                />
                                <p className="text-sm sm:text-[15px] text-gray-600 leading-relaxed">
                                  {hasLabel ? (
                                    <>
                                      <span className="font-semibold text-gray-900">
                                        {item.slice(0, colonIdx + 1)}
                                      </span>
                                      {item.slice(colonIdx + 1)}
                                    </>
                                  ) : (
                                    item
                                  )}
                                </p>
                              </li>
                            );
                          })}
                        </ul>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Security Highlights & Contact Section */}
            <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              {/* Security Highlights */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45 }}
                className="lg:col-span-6 bg-gradient-to-br from-[#0A3D5C] via-[#124C6F] to-[#165479] rounded-2xl p-6 sm:p-8 text-white shadow-sm relative overflow-hidden flex flex-col justify-center"
              >
                <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-[#749220]/30 rounded-full blur-3xl pointer-events-none" />
                <div className="relative z-10">
                  <div className="flex items-center gap-3.5 pb-4 mb-5 border-b border-white/15">
                    <div className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center bg-white/10 border border-white/20 text-[#C5DF7B]">
                      <ShieldCheckIcon className="h-5 w-5" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-semibold text-white">
                      Security Measures We Implement
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      'Bank-level encryption (SSL/TLS)',
                      'Secure document storage',
                      'Regular security audits',
                      'Access controls and authentication',
                      'Employee confidentiality agreements',
                      'Compliance with industry standards',
                    ].map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2.5 bg-white/10 border border-white/15 px-3.5 py-2.5 rounded-lg backdrop-blur-sm"
                      >
                        <CheckCircleIcon className="h-5 w-5 text-[#C5DF7B] flex-shrink-0" />
                        <span className="text-xs sm:text-sm text-white font-medium leading-snug">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Contact Section */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45 }}
                className="lg:col-span-6 bg-gradient-to-br from-[#DFEBC2]/55 via-white to-[#C3DCED]/55 rounded-2xl p-6 sm:p-8 border border-[#165479]/15 shadow-sm flex flex-col justify-center text-center"
              >
                <h3 className="text-xl sm:text-2xl font-normal text-gray-900 tracking-tight mb-2.5">
                  Questions About Your{" "}
                  <span className="font-semibold bg-gradient-to-r from-[#0A4973] via-[#165479] to-[#749220] bg-clip-text text-transparent">
                    Privacy?
                  </span>
                </h3>
                <p className="text-sm text-gray-700 mb-5 max-w-lg mx-auto leading-relaxed">
                  Our privacy team is here to help. Contact us if you have questions about how we handle your information
                  or if you want to exercise your privacy rights.
                </p>
                <div className="flex flex-wrap gap-2.5 justify-center">
                  <a
                    href="mailto:contact@irstaxfiler.com"
                    className="inline-flex items-center justify-center h-10 px-5 rounded-lg font-medium text-xs sm:text-sm text-white bg-gradient-to-r from-[#0C3D5A] via-[#165479] to-[#1A5B82] hover:from-[#09324A] hover:via-[#134969] hover:to-[#165479] shadow-sm transition-all"
                  >
                    Email Privacy Team
                  </a>
                  <Link
                    to="/contact"
                    className="inline-flex items-center justify-center h-10 px-5 rounded-lg font-medium text-xs sm:text-sm text-gray-800 bg-white hover:bg-slate-50 border border-slate-300 shadow-sm transition-all"
                  >
                    Contact Us
                  </Link>
                  <Link
                    to="/terms"
                    className="inline-flex items-center justify-center h-10 px-5 rounded-lg font-medium text-xs sm:text-sm text-gray-800 bg-white hover:bg-slate-50 border border-slate-300 shadow-sm transition-all"
                  >
                    Terms & Conditions
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Privacy;

