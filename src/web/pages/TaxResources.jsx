import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  BookOpenIcon,
  CalculatorIcon,
  DocumentTextIcon,
  CalendarDaysIcon,
  BanknotesIcon,
  QuestionMarkCircleIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  AcademicCapIcon,
  ChartBarIcon,
  DocumentCheckIcon,
  ClockIcon,
  InformationCircleIcon,
  GlobeAltIcon,
  BuildingOfficeIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  StarIcon,
} from '@heroicons/react/24/outline';
import SEO from '../components/seo/SEO';
import Logo from '../assets/irsLogo.png';

const TaxResources = () => {
  const [expandedCards, setExpandedCards] = useState({});
  const taxGuides = [
    {
      icon: BookOpenIcon,
      title: 'Understanding Your Tax Return',
      description: 'Complete guide to reading and understanding your tax return forms.',
      category: 'Basics',
      color: '#EFF6FF',
      content: [
        'Form 1040 is the main tax form used by most taxpayers to file their annual income tax return.',
        'Your Adjusted Gross Income (AGI) is your total income minus certain adjustments like student loan interest and IRA contributions.',
        'Taxable income is calculated by subtracting deductions from your AGI, which determines your tax bracket.',
        'Refunds occur when you overpaid taxes during the year, while amounts owed happen when you underpaid.',
        'Review all schedules attached to your return (Schedule A for itemized deductions, Schedule C for business income, etc.).',
      ],
    },
    {
      icon: BanknotesIcon,
      title: 'Maximizing Your Tax Deductions',
      description: 'Learn about common deductions and how to claim them properly.',
      category: 'Deductions',
      color: '#F0FDF4',
      content: [
        'Itemized deductions include mortgage interest, state and local taxes (SALT), charitable contributions, and medical expenses exceeding 7.5% of AGI.',
        'The standard deduction for 2024 is $14,600 for single filers and $29,200 for married couples filing jointly.',
        'Keep detailed records and receipts for all deductible expenses throughout the year.',
        'Business expenses for self-employed individuals can include home office, travel, equipment, and professional development costs.',
        'Consider timing large deductible expenses at year-end to maximize your current year\'s tax benefit.',
      ],
    },
    {
      icon: ChartBarIcon,
      title: 'Tax Credits vs. Deductions',
      description: 'Understand the difference and which benefits you more.',
      category: 'Education',
      color: '#FEF3C7',
      content: [
        'Tax credits directly reduce your tax liability dollar-for-dollar, while deductions reduce your taxable income.',
        'Common credits include the Earned Income Tax Credit (EITC), Child Tax Credit, and Education Credits (AOTC and LLC).',
        'Refundable credits can result in a refund even if you owe no tax, while non-refundable credits can only reduce your tax to zero.',
        'Deductions are more valuable for higher-income taxpayers in higher tax brackets.',
        'Always claim available credits first, as they provide more value than deductions for most taxpayers.',
      ],
    },
    {
      icon: DocumentCheckIcon,
      title: 'Filing Status Guide',
      description: 'Choose the right filing status to optimize your tax situation.',
      category: 'Filing',
      color: '#F3E8FF',
      content: [
        'Single: For unmarried individuals who don\'t qualify for other statuses. Standard deduction: $14,600.',
        'Married Filing Jointly: Typically provides the most tax benefits for married couples. Standard deduction: $29,200.',
        'Married Filing Separately: May be beneficial if one spouse has significant deductions or if you want to separate liability.',
        'Head of Household: For unmarried individuals supporting dependents. Standard deduction: $21,900.',
        'Qualifying Widow(er): Available for two years after spouse\'s death if you have dependent children.',
      ],
    },
    {
      icon: GlobeAltIcon,
      title: 'International Tax Guide',
      description: 'Essential information for expats and dual-country taxpayers.',
      category: 'International',
      color: '#FCE7F3',
      content: [
        'U.S. citizens and resident aliens must report worldwide income regardless of where they live.',
        'The Foreign Earned Income Exclusion (FEIE) allows up to $126,500 (2024) of foreign income to be excluded from U.S. taxes.',
        'Foreign Tax Credit helps avoid double taxation by crediting taxes paid to foreign countries.',
        'FBAR (FinCEN Form 114) must be filed if you have foreign accounts exceeding $10,000 at any time during the year.',
        'FATCA Form 8938 is required for specified foreign financial assets exceeding certain thresholds.',
      ],
    },
    {
      icon: AcademicCapIcon,
      title: 'Student Tax Guide',
      description: 'Tax tips and credits specifically for students and education expenses.',
      category: 'Education',
      color: '#EFF6FF',
      content: [
        'American Opportunity Tax Credit (AOTC) provides up to $2,500 per student for the first four years of college.',
        'Lifetime Learning Credit (LLC) offers up to $2,000 per tax return for qualified education expenses.',
        'Student loan interest deduction allows up to $2,500 deduction for interest paid on qualified student loans.',
        '529 plan contributions may be deductible on state returns, and withdrawals for qualified education expenses are tax-free.',
        'Scholarships and grants used for tuition and fees are generally tax-free, but amounts used for room and board are taxable.',
      ],
    },
  ];

  const calculators = [
    {
      icon: CalculatorIcon,
      title: 'Tax Refund Calculator',
      description: 'Estimate your potential tax refund for the current year.',
      link: '#',
      color: '#EFF6FF',
    },
    {
      icon: BanknotesIcon,
      title: 'Tax Bracket Calculator',
      description: 'Find out which tax bracket you fall into.',
      link: '#',
      color: '#F0FDF4',
    },
    {
      icon: ChartBarIcon,
      title: 'Deduction Calculator',
      description: 'Calculate your itemized vs. standard deduction.',
      link: '#',
      color: '#FEF3C7',
    },
    {
      icon: CalendarDaysIcon,
      title: 'Estimated Tax Calculator',
      description: 'Calculate your quarterly estimated tax payments.',
      link: '#',
      color: '#F3E8FF',
    },
  ];

  const taxForms = [
    {
      form: 'Form 1040',
      name: 'U.S. Individual Income Tax Return',
      description: 'Main form for filing individual income taxes.',
      category: 'Individual',
      formUrl: 'https://www.irs.gov/pub/irs-pdf/f1040.pdf',
      instructionsUrl: 'https://www.irs.gov/pub/irs-pdf/i1040gi.pdf',
    },
    {
      form: 'Form 1040NR',
      name: 'U.S. Nonresident Alien Income Tax Return',
      description: 'For nonresident aliens filing U.S. taxes.',
      category: 'Nonresident',
      formUrl: 'https://www.irs.gov/pub/irs-pdf/f1040nr.pdf',
      instructionsUrl: 'https://www.irs.gov/pub/irs-pdf/i1040nr.pdf',
    },
    {
      form: 'Form W-7',
      name: 'Application for ITIN',
      description: 'Application for Individual Taxpayer Identification Number.',
      category: 'ITIN',
      formUrl: 'https://www.irs.gov/pub/irs-pdf/fw7.pdf',
      instructionsUrl: 'https://www.irs.gov/pub/irs-pdf/iw7.pdf',
    },
    {
      form: 'Form 8938',
      name: 'Statement of Specified Foreign Financial Assets',
      description: 'FATCA reporting for foreign financial assets.',
      category: 'FATCA',
      formUrl: 'https://www.irs.gov/pub/irs-pdf/f8938.pdf',
      instructionsUrl: 'https://www.irs.gov/pub/irs-pdf/i8938.pdf',
    },
    {
      form: 'FinCEN Form 114',
      name: 'FBAR (Foreign Bank Account Report)',
      description: 'Report foreign bank and financial accounts.',
      category: 'FBAR',
      formUrl: 'https://www.fincen.gov/sites/default/files/shared/fin114.pdf',
      instructionsUrl: 'https://www.fincen.gov/sites/default/files/shared/fin114_a.pdf',
    },
    {
      form: 'Schedule A',
      name: 'Itemized Deductions',
      description: 'Itemize your deductions instead of taking standard deduction.',
      category: 'Deductions',
      formUrl: 'https://www.irs.gov/pub/irs-pdf/f1040sa.pdf',
      instructionsUrl: 'https://www.irs.gov/pub/irs-pdf/i1040gi.pdf',
    },
    {
      form: 'Schedule C',
      name: 'Profit or Loss from Business',
      description: 'Report income and expenses from your business.',
      category: 'Business',
      formUrl: 'https://www.irs.gov/pub/irs-pdf/f1040sc.pdf',
      instructionsUrl: 'https://www.irs.gov/pub/irs-pdf/i1040sc.pdf',
    },
    {
      form: 'Schedule E',
      name: 'Supplemental Income and Loss',
      description: 'Report rental income, royalties, and other income.',
      category: 'Income',
      formUrl: 'https://www.irs.gov/pub/irs-pdf/f1040se.pdf',
      instructionsUrl: 'https://www.irs.gov/pub/irs-pdf/i1040se.pdf',
    },
    {
      form: 'Form 4868',
      name: 'Application for Automatic Extension',
      description: 'Request an automatic 6-month extension to file your tax return.',
      category: 'Extension',
      formUrl: 'https://www.irs.gov/pub/irs-pdf/f4868.pdf',
      instructionsUrl: 'https://www.irs.gov/pub/irs-pdf/i4868.pdf',
    },
    {
      form: 'Form 1099-MISC',
      name: 'Miscellaneous Income',
      description: 'Report miscellaneous income payments.',
      category: 'Income',
      formUrl: 'https://www.irs.gov/pub/irs-pdf/f1099msc.pdf',
      instructionsUrl: 'https://www.irs.gov/pub/irs-pdf/i1099msc.pdf',
    },
    {
      form: 'Schedule B',
      name: 'Interest and Ordinary Dividends',
      description: 'Report interest and dividend income.',
      category: 'Income',
      formUrl: 'https://www.irs.gov/pub/irs-pdf/f1040sb.pdf',
      instructionsUrl: 'https://www.irs.gov/pub/irs-pdf/i1040gi.pdf',
    },
    {
      form: 'Form 2555',
      name: 'Foreign Earned Income Exclusion',
      description: 'Claim exclusion for foreign earned income.',
      category: 'International',
      formUrl: 'https://www.irs.gov/pub/irs-pdf/f2555.pdf',
      instructionsUrl: 'https://www.irs.gov/pub/irs-pdf/i2555.pdf',
    },
  ];

  const deadlines = [
    {
      date: 'January 15, 2026',
      title: 'Q4 Estimated Tax Payment Due',
      description: 'Final quarterly estimated tax payment for 2024.',
      type: 'Payment',
    },
    {
      date: 'January 31, 2026',
      title: 'W-2 and 1099 Forms Due',
      description: 'Employers must send W-2s and 1099s to employees.',
      type: 'Forms',
    },
    {
      date: 'April 15, 2026',
      title: 'Tax Filing Deadline',
      description: 'Individual tax returns due for tax year 2024.',
      type: 'Filing',
    },
    {
      date: 'April 15, 2026',
      title: 'Tax Payment Deadline',
      description: 'Pay any taxes owed for tax year 2024.',
      type: 'Payment',
    },
    {
      date: 'June 15, 2026',
      title: 'Q2 Estimated Tax Payment Due',
      description: 'Second quarterly estimated tax payment for 2025.',
      type: 'Payment',
    },
    {
      date: 'October 15, 2026',
      title: 'Extended Filing Deadline',
      description: 'Deadline for those who filed for extension.',
      type: 'Filing',
    },
  ];

  const deductions = [
    {
      category: 'Home & Housing',
      items: [
        'Mortgage interest',
        'Property taxes',
        'Home office deduction',
        'Moving expenses (military)',
      ],
      icon: BuildingOfficeIcon,
      color: '#EFF6FF',
    },
    {
      category: 'Education',
      items: [
        'Student loan interest',
        'Tuition and fees deduction',
        'American Opportunity Credit',
        'Lifetime Learning Credit',
      ],
      icon: AcademicCapIcon,
      color: '#F0FDF4',
    },
    {
      category: 'Medical & Health',
      items: [
        'Medical expenses (over 7.5% AGI)',
        'Health savings account contributions',
        'Long-term care insurance',
        'Dental and vision expenses',
      ],
      icon: InformationCircleIcon,
      color: '#FEF3C7',
    },
    {
      category: 'Charitable Contributions',
      items: [
        'Cash donations',
        'Non-cash donations',
        'Volunteer expenses',
        'Charitable mileage',
      ],
      icon: BanknotesIcon,
      color: '#F3E8FF',
    },
  ];

  const title = "Tax Resources & Guides | IRS Tax Filer";
  const description = "IRS Tax Filer tax resources: tips, guides, and updates for US & Indian tax filing and compliance — easy to follow and up-to-date.";
  const keywords = "tax filing tips, IRS compliance resources, online tax guides, IRS Tax Filer resources";
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
    <div className="min-h-screen bg-gray-50">
      {/* Enhanced Hero Section */}
      <section className="relative overflow-hidden py-28" style={{ backgroundColor: '#2B547E' }}>
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
            className="absolute top-20 left-10 w-72 h-72 bg-[#2B547E]/30 rounded-full blur-3xl"
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
            className="absolute bottom-20 right-10 w-96 h-96 bg-[#2B547E]/30 rounded-full blur-3xl"
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
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <StarIcon className="h-4 w-4 text-yellow-300" />
              </motion.div>
              <span className="text-white font-semibold text-xs md:text-sm">Comprehensive Tax Resources</span>
            </motion.div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 leading-tight">
              <span className="block text-white drop-shadow-lg">Tax Resources</span>
              <motion.span
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="block text-[#EB4149] drop-shadow-2xl"
              >
                Everything You Need to Know
              </motion.span>
            </h1>

            <p className="text-base md:text-lg text-white/90 max-w-3xl mx-auto leading-relaxed">
              Everything you need to understand, prepare, and file your taxes with confidence.
            </p>
          </motion.div>
        </div>

        {/* Bottom Wave Decoration */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg className="w-full h-16 text-white" fill="currentColor" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0 C150,100 350,0 600,50 C850,100 1050,0 1200,50 L1200,120 L0,120 Z"></path>
          </svg>
        </div>
      </section>

      {/* Tax Guides Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="mb-12 text-center"
          >
            <h2 className="text-2xl lg:text-3xl font-bold mb-4" style={{ color: '#202020' }}>
              Tax Guides & Tips
            </h2>
            <p className="text-base text-gray-600 max-w-2xl mx-auto">
              Comprehensive guides to help you navigate the tax filing process with ease.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {taxGuides.map((guide, index) => {
              const IconComponent = guide.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-md border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  <div 
                    className="w-14 h-14 rounded-lg flex items-center justify-center mb-4"
                    style={{ backgroundColor: guide.color }}
                  >
                    <IconComponent className="w-7 h-7" style={{ color: '#2B547E' }} />
                  </div>
                  <div className="mb-2">
                    <span className="text-xs font-semibold px-2 py-1 rounded-full" style={{ backgroundColor: guide.color, color: '#2B547E' }}>
                      {guide.category}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold mb-2" style={{ color: '#202020' }}>
                    {guide.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {guide.description}
                  </p>
                  <div className="space-y-2 mb-4">
                    {guide.content && guide.content.slice(0, 3).map((point, pointIndex) => (
                      <div key={pointIndex} className="flex items-start space-x-2">
                        <CheckCircleIcon className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <p className="text-gray-600 text-xs leading-relaxed">{point}</p>
                      </div>
                    ))}
                    <AnimatePresence>
                      {expandedCards[index] && guide.content && guide.content.length > 3 && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="space-y-2 overflow-hidden"
                        >
                          {guide.content.slice(3).map((point, pointIndex) => (
                            <div key={pointIndex + 3} className="flex items-start space-x-2">
                              <CheckCircleIcon className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                              <p className="text-gray-600 text-xs leading-relaxed">{point}</p>
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  {guide.content && guide.content.length > 3 && (
                    <button
                      onClick={() => setExpandedCards(prev => ({
                        ...prev,
                        [index]: !prev[index]
                      }))}
                      className="inline-flex items-center space-x-2 text-sm font-semibold hover:opacity-70 transition-opacity"
                      style={{ color: '#2B547E' }}
                    >
                      <span>
                        {expandedCards[index] 
                          ? 'Show Less' 
                          : 'Read More'}
                      </span>
                      {expandedCards[index] ? (
                        <ChevronUpIcon className="w-4 h-4" />
                      ) : (
                        <ChevronDownIcon className="w-4 h-4" />
                      )}
                    </button>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Tax Forms Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="mb-12 text-center"
          >
            <h2 className="text-2xl lg:text-3xl font-bold mb-4" style={{ color: '#202020' }}>
              Tax Forms & Instructions
            </h2>
            <p className="text-base text-gray-600 max-w-2xl mx-auto">
              Access and download the most commonly used tax forms with detailed instructions.
            </p>
          </motion.div>

          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                    <tr style={{ backgroundColor: '#2B547E' }}>
                    <th className="px-6 py-4 text-left text-sm font-bold text-white">Form Number</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-white">Form Name</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-white">Description</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-white">Category</th>
                    <th className="px-6 py-4 text-center text-sm font-bold text-white">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {taxForms.map((form, index) => (
                    <motion.tr
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                      className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200"
                    >
                      <td className="px-6 py-4">
                        <span className="font-bold" style={{ color: '#2B547E' }}>
                          {form.form}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-medium" style={{ color: '#202020' }}>
                          {form.name}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-gray-600 text-sm">
                          {form.description}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-gray-100 text-gray-700">
                          {form.category}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center space-x-3">
                          <a
                            href={form.formUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center space-x-1 text-sm font-semibold hover:opacity-70 transition-opacity px-3 py-1.5 rounded-lg"
                            style={{ 
                              color: '#2B547E',
                              backgroundColor: '#EFF6FF'
                            }}
                          >
                            <DocumentTextIcon className="w-4 h-4" />
                            <span>Form</span>
                          </a>
                          <a
                            href={form.instructionsUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center space-x-1 text-sm font-semibold hover:opacity-70 transition-opacity px-3 py-1.5 rounded-lg"
                            style={{ 
                              color: '#2B547E',
                              backgroundColor: '#F5F9FF'
                            }}
                          >
                            <BookOpenIcon className="w-4 h-4" />
                            <span>Instructions</span>
                          </a>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Tax Deadlines Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="mb-12 text-center"
          >
            <h2 className="text-2xl lg:text-3xl font-bold mb-4" style={{ color: '#202020' }}>
              Important Tax Deadlines
            </h2>
            <p className="text-base text-gray-600 max-w-2xl mx-auto">
              Stay on top of all important tax dates and deadlines for 2025.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {deadlines.map((deadline, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-md border border-gray-200 p-6 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#F3E8FF' }}>
                      <CalendarDaysIcon className="w-6 h-6" style={{ color: '#2B547E' }} />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="mb-2">
                      <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                        deadline.type === 'Filing' ? 'bg-blue-100 text-blue-700' :
                        deadline.type === 'Payment' ? 'bg-red-100 text-red-700' :
                        'bg-green-100 text-green-700'
                      }`}>
                        {deadline.type}
                      </span>
                    </div>
                    <h3 className="text-base font-bold mb-1" style={{ color: '#202020' }}>
                      {deadline.title}
                    </h3>
                    <p className="text-sm font-semibold mb-2" style={{ color: '#2B547E' }}>
                      {deadline.date}
                    </p>
                    <p className="text-gray-600 text-sm">
                      {deadline.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tax Deductions & Credits Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="mb-12 text-center"
          >
            <h2 className="text-2xl lg:text-3xl font-bold mb-4" style={{ color: '#202020' }}>
              Common Tax Deductions & Credits
            </h2>
            <p className="text-base text-gray-600 max-w-2xl mx-auto">
              Maximize your tax savings by understanding available deductions and credits.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {deductions.map((deduction, index) => {
              const IconComponent = deduction.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-md border border-gray-200 p-6 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-center space-x-4 mb-4">
                    <div 
                      className="w-14 h-14 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: deduction.color }}
                    >
                      <IconComponent className="w-7 h-7" style={{ color: '#2B547E' }} />
                    </div>
                    <h3 className="text-lg font-bold" style={{ color: '#202020' }}>
                      {deduction.category}
                    </h3>
                  </div>
                  <ul className="space-y-2">
                    {deduction.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start space-x-2">
                        <CheckCircleIcon className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#F5F9FF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="text-2xl lg:text-3xl font-bold mb-4" style={{ color: '#202020' }}>
              Need Help with Your Taxes?
            </h2>
            <p className="text-base text-gray-600 mb-8 max-w-2xl mx-auto">
              Our expert tax professionals are here to help you navigate the tax filing process and maximize your refund.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="px-8 py-4 rounded-lg font-semibold text-white transition-all duration-300 hover:shadow-xl hover:scale-105 transform"
                style={{ backgroundColor: '#2B547E' }}
              >
                Get Professional Help
              </Link>
              <Link
                to="/pricing"
                className="px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg border-2"
                style={{ 
                  borderColor: '#2B547E',
                  color: '#2B547E',
                  backgroundColor: 'transparent'
                }}
              >
                View Pricing
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
    </>
  );
};

export default TaxResources;

