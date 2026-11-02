import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CheckIcon } from '@heroicons/react/24/solid';

const PricingCards = () => {
  const plans = [
    {
      name: 'Basic',
      price: '$299',
      description: 'Perfect for simple tax situations',
      features: [
        'Federal Tax Filing',
        'Standard Deductions',
        'Email Support',
        'E-filing Included',
      ],
      popular: false,
    },
    {
      name: 'Professional',
      price: '$599',
      description: 'Ideal for most individuals',
      features: [
        'Federal & State Filing',
        'Itemized Deductions',
        'Priority Support',
        'Tax Consultation Call',
        'FBAR Filing',
        'E-filing Included',
      ],
      popular: true,
    },
    {
      name: 'Premium',
      price: '$999',
      description: 'Comprehensive solution',
      features: [
        'Everything in Professional',
        'Multi-State Filing',
        'Dual-Country Tax Planning',
        'Dedicated Tax Advisor',
        'ITIN Assistance',
        'FATCA Compliance',
        '24/7 Priority Support',
      ],
      popular: false,
    },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-primary-navy mb-4">
            Transparent Pricing
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose the plan that fits your needs. All plans include expert
            preparation and filing.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 ${
                plan.popular
                  ? 'border-2 border-primary-blue scale-105 md:scale-110'
                  : 'border border-gray-200'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary-blue text-white px-4 py-1 rounded-full text-sm font-semibold">
                  Most Popular
                </div>
              )}
              <div className="p-8">
                <h3 className="text-2xl font-bold text-primary-navy mb-2">
                  {plan.name}
                </h3>
                <p className="text-gray-600 mb-6">{plan.description}</p>
                <div className="mb-6">
                  <span className="text-5xl font-bold text-primary-navy">
                    {plan.price}
                  </span>
                  <span className="text-gray-600 ml-2">per filing</span>
                </div>
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li
                      key={featureIndex}
                      className="flex items-start space-x-3"
                    >
                      <CheckIcon className="h-6 w-6 text-primary-blue flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/contact"
                  className={`block w-full text-center py-3 px-6 rounded-lg font-semibold transition-all duration-300 ${
                    plan.popular
                      ? 'bg-primary-blue text-white hover:bg-blue-700'
                      : 'bg-gray-100 text-primary-navy hover:bg-gray-200'
                  }`}
                >
                  Get Started
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <p className="text-gray-600 mb-4">
            Need a custom solution?{' '}
            <Link
              to="/contact"
              className="text-primary-blue font-semibold hover:underline"
            >
              Contact us
            </Link>{' '}
            for a personalized quote.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingCards;
