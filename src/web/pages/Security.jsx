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
                <span className="text-white font-semibold text-xs md:text-sm">Enterprise-Grade Security</span>
              </motion.div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 leading-tight">
                <span className="block text-white drop-shadow-lg">Security & Data Protection</span>
              </h1>

              <p className="text-base md:text-lg text-white/90 max-w-3xl mx-auto leading-relaxed">
                Learn how we protect your sensitive tax and financial information with industry-leading security measures
                and best practices.
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

        {/* Security Features Grid */}
        <section className="py-16 bg-white relative -mt-1">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {securityFeatures.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ y: -8, scale: 1.02 }}
                    className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 shadow-lg border border-gray-100 text-center"
                  >
                    <div className="w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#EB4149' }}>
                      <IconComponent className="h-7 w-7 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-sm text-gray-600">{feature.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Security Content */}
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
                    <ShieldCheckIcon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold mb-3" style={{ color: '#EB4149' }}>
                      Our Commitment to Security
                    </h2>
                    <p className="text-base text-gray-700 leading-relaxed">
                      At TaxFiling, we understand that your tax and financial information is highly sensitive.
                      We implement multiple layers of security controls, including physical, technical, and administrative
                      safeguards, to ensure the confidentiality, integrity, and availability of your data. Our security
                      practices comply with industry standards and regulations, and we continuously work to improve our
                      security measures to protect your information.
                    </p>
                  </div>
                </div>
              </div>

              <p className="text-base text-gray-700 leading-relaxed mb-4">
                This Security page provides detailed information about our security practices, including data encryption,
                access controls, monitoring, and incident response procedures.
              </p>
              <p className="text-base text-gray-700 leading-relaxed">
                If you have questions about our security practices, please contact our security team at{' '}
                <a href="mailto:contact@irstaxfiler.com" className="text-[#EB4149] hover:underline font-semibold">
                  contact@irstaxfiler.com
                </a>
                {' '}or call us at{' '}
                <a href="tel:++1 (415) 7876190" className="text-[#EB4149] hover:underline font-semibold">
                  +1 (415) 7876190
                </a>.
              </p>
            </motion.div>

            {/* Security Sections */}
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
                  Questions About Security?
                </h3>
                <p className="text-gray-700 mb-6">
                  If you have questions about our security practices or need to report a security issue,
                  our security team is here to help.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="mailto:contact@irstaxfiler.com"
                    className="inline-flex items-center justify-center px-6 py-3 rounded-lg font-semibold text-white transition-all duration-300 hover:shadow-lg"
                    style={{ backgroundColor: '#EB4149' }}
                  >
                    Contact Security Team
                  </a>
                  <Link
                    to="/privacy"
                    className="inline-flex items-center justify-center px-6 py-3 rounded-lg font-semibold border-2 transition-all duration-300 hover:bg-gray-50"
                    style={{ borderColor: '#EB4149', color: '#EB4149' }}
                  >
                    Privacy Policy
                  </Link>
                  <Link
                    to="/glba"
                    className="inline-flex items-center justify-center px-6 py-3 rounded-lg font-semibold border-2 transition-all duration-300 hover:bg-gray-50"
                    style={{ borderColor: '#EB4149', color: '#EB4149' }}
                  >
                    GLBA Notice
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

export default Security;

