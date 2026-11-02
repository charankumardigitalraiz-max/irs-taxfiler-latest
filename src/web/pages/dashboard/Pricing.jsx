import { motion } from 'framer-motion';
import { CheckIcon, CreditCardIcon } from '@heroicons/react/24/outline';

const Pricing = () => {
  const pricingDetails = {
    status: 'Confirmed',
    totalAmount: 599,
    breakdown: [
      { item: 'Federal Tax Filing', amount: 299 },
      { item: 'State Tax Filing', amount: 200 },
      { item: 'Tax Consultation', amount: 100 },
    ],
    paymentStatus: 'Pending',
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Pricing & Payment</h1>
        <p className="text-gray-600">
          View your tax filing pricing breakdown and payment status.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pricing Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-8"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Pricing Details</h2>
            <span className="px-4 py-1.5 bg-green-100 text-green-700 rounded-full text-sm font-medium">
              {pricingDetails.status}
            </span>
          </div>

          <div className="space-y-4 mb-6">
            {pricingDetails.breakdown.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <CheckIcon className="h-5 w-5 text-green-500" />
                  <span className="text-gray-900 font-medium">{item.item}</span>
                </div>
                <span className="text-gray-900 font-semibold">${item.amount}</span>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-200 pt-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-lg font-semibold text-gray-900">Total Amount</span>
              <span className="text-3xl font-bold text-primary-blue">
                ${pricingDetails.totalAmount}
              </span>
            </div>
            <p className="text-sm text-gray-500">
              All prices are final and include tax preparation and e-filing services.
            </p>
          </div>
        </motion.div>

        {/* Payment Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
        >
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-3 bg-blue-100 rounded-lg">
              <CreditCardIcon className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Payment</h3>
              <p className="text-sm text-gray-500">Status</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-600 mb-2">Payment Status</p>
              <span
                className={`inline-block px-4 py-2 rounded-lg text-sm font-medium ${
                  pricingDetails.paymentStatus === 'Paid'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-yellow-100 text-yellow-700'
                }`}
              >
                {pricingDetails.paymentStatus}
              </span>
            </div>

            {pricingDetails.paymentStatus === 'Pending' && (
              <button className="w-full px-6 py-3 bg-primary-blue text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
                <CreditCardIcon className="h-5 w-5" />
                <span>Proceed to Payment</span>
              </button>
            )}

            <div className="pt-4 border-t border-gray-200">
              <p className="text-xs text-gray-500">
                Payment is required before we can proceed with filing your tax returns.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Pricing;

