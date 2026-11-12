import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ShieldCheckIcon,
  LockClosedIcon,
  DocumentTextIcon,
  InformationCircleIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  KeyIcon,
  ServerIcon,
  EyeIcon,
  UserIcon,
  FireIcon,
  ClockIcon,
} from '@heroicons/react/24/outline';
import SEO from '../components/seo/SEO';
import Logo from '../assets/irsLogo.png';

const Security = () => {
  const sections = [
    {
      id: 'introduction',
      title: '1. Our Security Commitment',
      icon: ShieldCheckIcon,
      content: [
        'TaxFiling is committed to protecting your sensitive tax and financial information with industry-leading security measures and best practices.',
        'We understand that your tax information is highly sensitive and personal, and we take our responsibility to protect it seriously.',
        'We implement multiple layers of security controls, including physical, technical, and administrative safeguards, to ensure the confidentiality, integrity, and availability of your data.',
        'Our security practices comply with industry standards and regulations, including GLBA, CCPA, and IRS requirements for tax preparers.',
      ],
    },
    {
      id: 'encryption',
      title: '2. Data Encryption',
      icon: LockClosedIcon,
      content: [
        'We use bank-level encryption (SSL/TLS 1.3) for all data transmission between your device and our servers, ensuring that your information cannot be intercepted during transmission.',
        'All sensitive data stored in our systems is encrypted at rest using AES-256 encryption, one of the strongest encryption standards available.',
        'Your passwords are hashed using industry-standard bcrypt hashing algorithms with salt, ensuring they cannot be decrypted even if our database is compromised.',
        'We use end-to-end encryption for sensitive documents and communications, ensuring that only authorized parties can access your information.',
        'All encryption keys are managed using secure key management systems and are rotated regularly to maintain security.',
      ],
    },
    {
      id: 'access-controls',
      title: '3. Access Controls and Authentication',
      icon: KeyIcon,
      content: [
        'We implement strict access controls to ensure that only authorized personnel can access your information.',
        'All employees and contractors undergo background checks and sign strict confidentiality agreements before gaining access to any customer data.',
        'We use multi-factor authentication (MFA) for all employee accounts and encourage our customers to enable MFA for their accounts as well.',
        'Access to customer data is granted on a need-to-know basis, and all access is logged and monitored for suspicious activity.',
        'We regularly review and audit access permissions to ensure that employees only have access to the data necessary for their job functions.',
        'We use role-based access control (RBAC) to limit access based on job responsibilities and implement the principle of least privilege.',
      ],
    },
    {
      id: 'secure-infrastructure',
      title: '4. Secure Infrastructure',
      icon: ServerIcon,
      content: [
        'Our systems are hosted on secure, enterprise-grade cloud infrastructure with redundant security measures and 99.9% uptime guarantees.',
        'We use firewalls, intrusion detection systems, and network segmentation to protect our systems from unauthorized access and attacks.',
        'All servers are regularly patched and updated with the latest security fixes to protect against known vulnerabilities.',
        'We implement DDoS protection and rate limiting to prevent denial-of-service attacks and ensure service availability.',
        'Our data centers are physically secured with 24/7 monitoring, biometric access controls, and redundant power and cooling systems.',
        'We maintain regular backups of all data in geographically distributed, secure locations to ensure data recovery in case of disasters.',
      ],
    },
    {
      id: 'monitoring',
      title: '5. Security Monitoring and Incident Response',
      icon: EyeIcon,
      content: [
        'We continuously monitor our systems for security threats, suspicious activity, and potential vulnerabilities using automated security monitoring tools.',
        'Our security team receives real-time alerts for any suspicious activity and responds immediately to potential threats.',
        'We conduct regular security audits, penetration testing, and vulnerability assessments to identify and address potential security weaknesses.',
        'We maintain an incident response plan that outlines procedures for detecting, responding to, and recovering from security incidents.',
        'In the event of a security incident, we will notify affected customers and relevant authorities as required by law within the required timeframes.',
        'We conduct post-incident reviews to identify lessons learned and improve our security practices.',
      ],
    },
    {
      id: 'data-protection',
      title: '6. Data Protection and Privacy',
      icon: UserIcon,
      content: [
        'We implement data minimization practices, collecting only the information necessary to provide our services.',
        'We use data anonymization and pseudonymization techniques where possible to reduce the risk of data exposure.',
        'We maintain strict data retention policies and securely delete data that is no longer needed, in accordance with legal requirements.',
        'We do not share your personal information with third parties except as necessary to provide our services or as required by law.',
        'All third-party service providers are contractually obligated to maintain the same level of security and privacy protection as we do.',
        'We comply with all applicable privacy laws, including GLBA, CCPA, and IRS regulations regarding the protection of tax information.',
      ],
    },
    {
      id: 'employee-training',
      title: '7. Employee Training and Awareness',
      icon: InformationCircleIcon,
      content: [
        'All employees undergo comprehensive security training upon hire and receive regular security awareness training throughout their employment.',
        'We conduct phishing simulations and security awareness campaigns to help employees recognize and avoid security threats.',
        'Employees are trained on how to handle sensitive information securely and are required to follow strict security policies and procedures.',
        'We maintain a security culture where employees are encouraged to report potential security issues or suspicious activity.',
        'All employees are required to complete annual security training and certifications to stay current with security best practices.',
      ],
    },
    {
      id: 'compliance',
      title: '8. Compliance and Certifications',
      icon: CheckCircleIcon,
      content: [
        'We comply with industry security standards and regulations, including GLBA, CCPA, IRS Publication 4557 (Safeguarding Taxpayer Data), and other applicable laws.',
        'We undergo regular security assessments and audits by independent third-party security firms to verify our security practices.',
        'We maintain compliance with Payment Card Industry Data Security Standard (PCI DSS) requirements for payment processing.',
        'We follow the National Institute of Standards and Technology (NIST) Cybersecurity Framework and other industry best practices.',
        'We maintain documentation of our security practices and procedures and make them available for audits and compliance reviews.',
      ],
    },
    {
      id: 'user-responsibilities',
      title: '9. Your Role in Security',
      icon: ExclamationTriangleIcon,
      content: [
        'You play an important role in protecting your account and information. Please use a strong, unique password for your account.',
        'We strongly recommend enabling multi-factor authentication (MFA) for your account to add an extra layer of security.',
        'Never share your account credentials with anyone, including our employees. We will never ask for your password.',
        'Be cautious of phishing emails or suspicious communications. We will never ask for sensitive information via email.',
        'Keep your devices and software updated with the latest security patches and use antivirus software.',
        'Log out of your account when using shared or public computers, and avoid accessing your account on unsecured networks.',
        'Report any suspicious activity or potential security issues to us immediately at contact@irstaxfiler.com.',
      ],
    },
    {
      id: 'incident-reporting',
      title: '10. Reporting Security Issues',
      icon: FireIcon,
      content: [
        'If you discover a security vulnerability or suspect unauthorized access to your account, please report it to us immediately.',
        'You can report security issues by emailing contact@irstaxfiler.com or calling our security hotline at +1 (415) 7876190.',
        'We take all security reports seriously and will investigate them promptly. We appreciate responsible disclosure of security vulnerabilities.',
        'If you believe your account has been compromised, change your password immediately and contact us right away.',
        'We will work with you to secure your account and investigate any security incidents that may have occurred.',
        'We may need to temporarily suspend your account while we investigate and resolve security issues to protect your information.',
      ],
    },
    {
      id: 'updates',
      title: '11. Security Updates and Improvements',
      icon: ClockIcon,
      content: [
        'We continuously work to improve our security practices and implement new security technologies as they become available.',
        'We regularly update our security policies and procedures based on emerging threats, industry best practices, and regulatory changes.',
        'We invest in security infrastructure and tools to stay ahead of evolving cyber threats and protect your information.',
        'We will notify you of any significant changes to our security practices that may affect you through our website or email.',
        'We encourage you to review this Security page periodically to stay informed about our security practices.',
      ],
    },
    {
      id: 'contact',
      title: '12. Security Contact Information',
      icon: DocumentTextIcon,
      content: [
        'If you have questions or concerns about our security practices, please contact our security team:',
        'Email: contact@irstaxfiler.com',
        'Phone: +1 (415) 7876190 (ask for the security team)',
        'Mail: TaxFiling Security Office, [Your Business Address]',
        'For general privacy questions, please see our Privacy Policy or contact contact@irstaxfiler.com.',
        'For urgent security issues, please call our security hotline immediately.',
      ],
    },
  ];

  const securityFeatures = [
    {
      icon: LockClosedIcon,
      title: 'Bank-Level Encryption',
      description: 'All data is encrypted using industry-standard SSL/TLS and AES-256 encryption.',
    },
    {
      icon: ShieldCheckIcon,
      title: 'Multi-Factor Authentication',
      description: 'Optional MFA adds an extra layer of security to protect your account.',
    },
    {
      icon: EyeIcon,
      title: '24/7 Security Monitoring',
      description: 'Continuous monitoring and threat detection to protect your information.',
    },
    {
      icon: ServerIcon,
      title: 'Secure Infrastructure',
      description: 'Enterprise-grade cloud infrastructure with redundant security measures.',
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
                <span>Enterprise-Grade Security</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-normal text-gray-900 tracking-tight leading-[1.2] mb-3.5">
                Security &{" "}
                <span className="font-semibold bg-gradient-to-r from-[#0A4973] via-[#165479] to-[#749220] bg-clip-text text-transparent">
                  Data Protection
                </span>
              </h1>

              <p className="text-sm sm:text-base lg:text-[17px] text-gray-600 font-normal max-w-2xl mx-auto leading-[30px] sm:leading-[32px] lg:leading-[34px]">
                Learn how we protect your sensitive tax and financial information with industry-leading security measures
                and best practices.
              </p>

              <div className="mt-5 inline-flex items-center px-3 py-1 rounded-full bg-slate-50 border border-slate-200/80 text-xs font-medium text-gray-500">
                <p>Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Security Features Grid */}
        <section className="py-12 sm:py-14 bg-white border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
              {securityFeatures.map((feature, index) => {
                const IconComponent = feature.icon;
                const isLime = index % 2 === 1;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: index * 0.06 }}
                    className="relative bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm hover:shadow-[0_12px_28px_rgba(22,84,121,0.06)] hover:border-[#165479]/30 transition-all duration-200 text-center overflow-hidden"
                  >
                    <div
                      className={`absolute top-0 inset-x-0 h-0.5 ${
                        isLime
                          ? "bg-gradient-to-r from-transparent via-[#749220]/70 to-transparent"
                          : "bg-gradient-to-r from-transparent via-[#165479]/70 to-transparent"
                      }`}
                    />
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 ${
                        isLime
                          ? "bg-[#F6F9EE] border border-[#749220]/25 text-[#749220]"
                          : "bg-sky-50 border border-sky-100 text-[#165479]"
                      }`}
                    >
                      <IconComponent className="h-6 w-6" />
                    </div>
                    <h3 className="text-base font-semibold text-gray-900 mb-2 leading-snug">{feature.title}</h3>
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">{feature.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Security Content */}
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
                    <ShieldCheckIcon className="h-6 w-6" />
                  </div>
                  <div>
                    <h2 className="text-lg sm:text-xl font-semibold text-white mb-2">
                      Our Commitment to Security
                    </h2>
                    <p className="text-sm sm:text-[15px] text-sky-100/95 leading-relaxed">
                      At TaxFiling, we understand that your tax and financial information is highly sensitive.
                      We implement multiple layers of security controls, including physical, technical, and administrative
                      safeguards, to ensure the confidentiality, integrity, and availability of your data. Our security
                      practices comply with industry standards and regulations, and we continuously work to improve our
                      security measures to protect your information.
                    </p>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 sm:p-8 flex flex-col justify-center">
                <p className="text-sm sm:text-[15px] text-gray-700 leading-relaxed mb-3.5">
                  This Security page provides detailed information about our security practices, including data encryption,
                  access controls, monitoring, and incident response procedures.
                </p>
                <p className="text-sm sm:text-[15px] text-gray-700 leading-relaxed pt-3.5 border-t border-slate-100">
                  If you have questions about our security practices, please contact our security team at{' '}
                  <a href="mailto:contact@irstaxfiler.com" className="text-[#165479] hover:text-[#0A4973] hover:underline font-semibold transition-colors">
                    contact@irstaxfiler.com
                  </a>
                  {' '}or call us at{' '}
                  <a href="tel:++1 (415) 7876190" className="text-[#165479] hover:text-[#0A4973] hover:underline font-semibold transition-colors">
                    +1 (415) 7876190
                  </a>.
                </p>
              </div>
            </motion.div>

            {/* Security Sections */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Sticky Section Index */}
              <aside className="lg:col-span-4 lg:sticky lg:top-24">
                <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5 sm:p-6">
                  <div className="flex items-center gap-2.5 pb-3.5 mb-3.5 border-b border-slate-100">
                    <span className="w-2 h-2 rounded-full bg-[#749220]" />
                    <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Security Sections
                    </span>
                  </div>
                  <nav className="space-y-1">
                    {sections.map((section, idx) => {
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
                {sections.map((section, index) => {
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
                        {section.content.map((item, itemIndex) => {
                          const colonIdx = item.indexOf(':');
                          const hasLabel =
                            colonIdx > 0 &&
                            colonIdx <= 25 &&
                            !item.slice(0, colonIdx).includes('http');
                          return (
                            <li key={itemIndex} className="flex items-start gap-3">
                              <span
                                className={`flex-shrink-0 w-1.5 h-1.5 rounded-full mt-2 ${
                                  isLime ? "bg-[#749220]" : "bg-[#165479]"
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

            {/* Contact Section */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45 }}
              className="mt-12 bg-gradient-to-br from-[#DFEBC2]/55 via-white to-[#C3DCED]/55 rounded-2xl p-8 sm:p-10 border border-[#165479]/15 shadow-sm text-center"
            >
              <h3 className="text-xl sm:text-2xl font-normal text-gray-900 tracking-tight mb-3">
                Questions About{" "}
                <span className="font-semibold bg-gradient-to-r from-[#0A4973] via-[#165479] to-[#749220] bg-clip-text text-transparent">
                  Security?
                </span>
              </h3>
              <p className="text-sm sm:text-base text-gray-700 mb-6 max-w-lg mx-auto leading-relaxed">
                If you have questions about our security practices or need to report a security issue,
                our security team is here to help.
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <a
                  href="mailto:contact@irstaxfiler.com"
                  className="inline-flex items-center justify-center h-10 sm:h-11 px-6 rounded-lg font-medium text-xs sm:text-sm text-white bg-gradient-to-r from-[#0C3D5A] via-[#165479] to-[#1A5B82] hover:from-[#09324A] hover:via-[#134969] hover:to-[#165479] shadow-sm transition-all"
                >
                  Contact Security Team
                </a>
                <Link
                  to="/privacy"
                  className="inline-flex items-center justify-center h-10 sm:h-11 px-6 rounded-lg font-medium text-xs sm:text-sm text-gray-800 bg-white hover:bg-slate-50 border border-slate-300 shadow-sm transition-all"
                >
                  Privacy Policy
                </Link>
                <Link
                  to="/glba"
                  className="inline-flex items-center justify-center h-10 sm:h-11 px-6 rounded-lg font-medium text-xs sm:text-sm text-gray-800 bg-white hover:bg-slate-50 border border-slate-300 shadow-sm transition-all"
                >
                  GLBA Notice
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Security;

