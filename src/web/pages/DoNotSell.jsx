import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import {
  ShieldCheckIcon,
  LockClosedIcon,
  DocumentTextIcon,
  InformationCircleIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  XMarkIcon,
  EnvelopeIcon,
  PhoneIcon,
} from '@heroicons/react/24/outline';
import SEO from '../components/seo/SEO';
import Logo from '../assets/irsLogo.png';
import { submitWebsiteForm } from '../services/formApi';

const DoNotSell = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    requestType: 'do-not-sell',
    additionalInfo: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      await submitWebsiteForm('opt-out', formData);
      setSubmitted(true);
      // Reset form after 5 seconds
      setTimeout(() => {
        setSubmitted(false);
        setFormData({
          name: '',
          email: '',
          phone: '',
          address: '',
          city: '',
          state: '',
          zipCode: '',
          requestType: 'do-not-sell',
          additionalInfo: '',
        });
      }, 5000);
    } catch (err) {
      setError(err.message || 'Failed to submit form. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const sections = [
    {
      id: 'introduction',
      title: '1. Your Right to Opt-Out',
      icon: ShieldCheckIcon,
      content: [
        'Under the California Consumer Privacy Act (CCPA) and other applicable privacy laws, you have the right to opt-out of the "sale" of your personal information.',
        'TaxFiling does not sell your personal information in the traditional sense. However, certain data sharing activities may be considered a "sale" under CCPA definitions.',
        'You have the right to opt-out of these activities at any time, free of charge, without discrimination.',
        'This page allows you to exercise your right to opt-out of the sale of your personal information.',
      ],
    },
    {
      id: 'what-is-sale',
      title: '2. What Constitutes a "Sale" Under CCPA?',
      icon: InformationCircleIcon,
      content: [
        'Under CCPA, a "sale" is broadly defined as selling, renting, releasing, disclosing, disseminating, making available, transferring, or otherwise communicating personal information to a third party for monetary or other valuable consideration.',
        'This definition may include certain data sharing activities that are not traditional sales, such as sharing data with advertising partners or analytics providers.',
        'TaxFiling does not sell your personal information in exchange for money. However, we may share certain information with service providers and partners as described in our Privacy Policy.',
        'If you wish to opt-out of any data sharing that may be considered a "sale" under CCPA, you can do so using this page.',
      ],
    },
    {
      id: 'what-we-dont-sell',
      title: '3. What We Do Not Sell',
      icon: XMarkIcon,
      content: [
        'We do not sell your Social Security Number, Taxpayer Identification Number, or other sensitive tax information.',
        'We do not sell your financial account information, income details, or tax return data.',
        'We do not sell your personal contact information (name, address, phone, email) to third parties for their marketing purposes.',
        'We do not sell information about your dependents or family members.',
        'We do not engage in the sale of personal information as a business practice.',
      ],
    },
    {
      id: 'data-sharing',
      title: '4. Our Data Sharing Practices',
      icon: DocumentTextIcon,
      content: [
        'We may share certain non-sensitive information with service providers who help us operate our business, such as cloud storage providers, payment processors, and customer support platforms.',
        'We may share aggregated, anonymized, or de-identified data that cannot be used to identify you personally.',
        'We may share information as required by law, such as with tax authorities for filing your returns.',
        'We may share information with your explicit consent or at your direction.',
        'All service providers are contractually obligated to protect your information and use it only for specified purposes.',
      ],
    },
    {
      id: 'how-to-opt-out',
      title: '5. How to Opt-Out',
      icon: CheckCircleIcon,
      content: [
        'You can opt-out of the sale of your personal information by submitting the form below on this page.',
        'You can also opt-out by emailing us at contact@irstaxfiler.com with the subject line "Do Not Sell My Personal Information".',
        'You can call us at +1 (415) 7876190 and request to opt-out of the sale of your personal information.',
        'We will process your opt-out request within 15 business days and confirm receipt of your request.',
        'Your opt-out request will remain in effect until you notify us that you wish to opt back in.',
      ],
    },
    {
      id: 'verification',
      title: '6. Verification Process',
      icon: LockClosedIcon,
      content: [
        'To protect your privacy, we may need to verify your identity before processing your opt-out request.',
        'We may ask you to provide certain information to verify that you are the person whose information is subject to the request.',
        'We will only use the verification information to process your request and will not use it for any other purpose.',
        'If we cannot verify your identity, we may deny your request and explain why.',
        'We will not require you to create an account to exercise your opt-out rights.',
      ],
    },
    {
      id: 'authorized-agents',
      title: '7. Authorized Agents',
      icon: InformationCircleIcon,
      content: [
        'You may designate an authorized agent to submit an opt-out request on your behalf.',
        'Your authorized agent must provide proof that you have given them permission to act on your behalf.',
        'We may require the authorized agent to verify their identity and provide documentation of their authorization.',
        'You can revoke an authorized agent\'s permission at any time by contacting us.',
      ],
    },
    {
      id: 'non-discrimination',
      title: '8. Non-Discrimination',
      icon: ShieldCheckIcon,
      content: [
        'We will not discriminate against you for exercising your right to opt-out of the sale of your personal information.',
        'We will not deny you goods or services, charge you different prices, or provide you with a different level of service quality.',
        'We may offer financial incentives for the collection, sale, or deletion of personal information, but only if the incentive is reasonably related to the value of your information.',
        'You have the right to opt-in to such financial incentive programs at any time.',
      ],
    },
    {
      id: 'other-rights',
      title: '9. Your Other Privacy Rights',
      icon: DocumentTextIcon,
      content: [
        'In addition to the right to opt-out of the sale of personal information, you have other privacy rights under CCPA and other applicable laws.',
        'You have the right to know what personal information we collect, use, and share.',
        'You have the right to request deletion of your personal information, subject to certain exceptions.',
        'You have the right to request access to your personal information.',
        'You have the right to non-discrimination for exercising your privacy rights.',
        'For more information about your privacy rights, please see our Privacy Policy.',
      ],
    },
    {
      id: 'children',
      title: '10. Children\'s Information',
      icon: ExclamationTriangleIcon,
      content: [
        'We do not knowingly sell the personal information of consumers under 16 years of age.',
        'If you are a parent or guardian and believe we have collected information from a child under 16, please contact us immediately.',
        'We will delete any personal information of a child under 16 that we have collected without proper authorization.',
        'We comply with the Children\'s Online Privacy Protection Act (COPPA) and other applicable laws regarding children\'s privacy.',
      ],
    },
    {
      id: 'updates',
      title: '11. Updates to This Page',
      icon: InformationCircleIcon,
      content: [
        'We may update this "Do Not Sell My Personal Information" page from time to time to reflect changes in our practices or applicable laws.',
        'We will notify you of any material changes by posting the updated page on our website and updating the "Last Updated" date.',
        'Your continued use of our services after changes constitutes acceptance of the updated practices.',
        'We encourage you to review this page periodically to stay informed about your opt-out rights.',
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
                <span className="text-white font-semibold text-xs md:text-sm">Your Privacy Rights</span>
              </motion.div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 leading-tight">
                <span className="block text-white drop-shadow-lg">Do Not Sell My Personal Information</span>
              </h1>

              <p className="text-base md:text-lg text-white/90 max-w-3xl mx-auto leading-relaxed">
                Exercise your right to opt-out of the sale of your personal information under CCPA and other applicable privacy laws.
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

        {/* Opt-Out Form Section */}
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
                      Exercise Your Opt-Out Right
                    </h2>
                    <p className="text-base text-gray-700 leading-relaxed">
                      Use the form below to opt-out of the sale of your personal information. We will process your request
                      within 15 business days and confirm receipt. Your opt-out will remain in effect until you notify us
                      that you wish to opt back in.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Opt-Out Form */}
            {!submitted ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 mb-12"
              >
                <h3 className="text-2xl font-bold mb-6" style={{ color: '#EB4149' }}>
                  Opt-Out Request Form
                </h3>
                {error && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                    {error}
                  </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="(555) 123-4567"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Street Address
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="123 Main Street"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        City
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="Los Angeles"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        State
                      </label>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="CA"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        ZIP Code
                      </label>
                      <input
                        type="text"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="90001"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Additional Information (Optional)
                    </label>
                    <textarea
                      name="additionalInfo"
                      value={formData.additionalInfo}
                      onChange={handleChange}
                      rows="4"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Any additional information you'd like to provide..."
                    />
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-sm text-gray-700">
                      <strong>Note:</strong> We may need to verify your identity before processing your request.
                      We will only use the information provided to process your opt-out request and will not use
                      it for any other purpose.
                    </p>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-lg font-semibold text-white transition-all duration-300 hover:shadow-lg"
                    style={{ backgroundColor: '#EB4149' }}
                  >
                    Submit Opt-Out Request
                  </button>
                </form>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-green-50 border-2 border-green-200 rounded-2xl p-8 mb-12 text-center"
              >
                <CheckCircleIcon className="h-16 w-16 text-green-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-green-800 mb-2">
                  Request Submitted Successfully
                </h3>
                <p className="text-gray-700">
                  We have received your opt-out request. We will process it within 15 business days and send
                  a confirmation to the email address you provided.
                </p>
              </motion.div>
            )}

            {/* Information Sections */}
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
                  Need Help with Your Opt-Out Request?
                </h3>
                <p className="text-gray-700 mb-6">
                  If you have questions about opting out or need assistance with your request, our privacy team is here to help.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="mailto:contact@irstaxfiler.com"
                    className="inline-flex items-center justify-center px-6 py-3 rounded-lg font-semibold text-white transition-all duration-300 hover:shadow-lg"
                    style={{ backgroundColor: '#EB4149' }}
                  >
                    <EnvelopeIcon className="h-5 w-5 mr-2" />
                    Email Us
                  </a>
                  <a
                    href="tel:++1 (415) 7876190"
                    className="inline-flex items-center justify-center px-6 py-3 rounded-lg font-semibold border-2 transition-all duration-300 hover:bg-gray-50"
                    style={{ borderColor: '#EB4149', color: '#EB4149' }}
                  >
                    <PhoneIcon className="h-5 w-5 mr-2" />
                    Call Us
                  </a>
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

export default DoNotSell;

