import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  CurrencyDollarIcon,
  BuildingLibraryIcon,
  DocumentTextIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  ClockIcon,
  InformationCircleIcon,
} from '@heroicons/react/24/outline';

const TaxRefund = () => {
  const [selectedType, setSelectedType] = useState(null);

  const refundTypes = [
    {
      id: 'irs-refund',
      title: 'IRS Tax Refund',
      description: 'Track and manage your federal tax refund status',
      icon: BuildingLibraryIcon,
      color: 'bg-blue-500',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      features: [
        'Check refund status',
        'View refund amount',
        'Track refund timeline',
        'Direct deposit information',
      ],
      status: 'available',
    },
    {
      id: 'state-federal',
      title: 'State & Federal Tax',
      description: 'View your state and federal tax filing details',
      icon: DocumentTextIcon,
      color: 'bg-indigo-500',
      bgColor: 'bg-indigo-50',
      borderColor: 'border-indigo-200',
      features: [
        'Federal tax information',
        'State tax information',
        'Filing status',
        'Tax liability details',
      ],
      status: 'available',
    },
    {
      id: 'amended-returns',
      title: 'Amended Tax Returns',
      description: 'File or track amended tax returns (1040-X)',
      icon: DocumentTextIcon,
      color: 'bg-purple-500',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      features: [
        'File amended return',
        'Track amendment status',
        'View amendment history',
        'Correction details',
      ],
      status: 'available',
    },
  ];

  const refundHistory = [
    {
      id: 1,
      type: 'Federal',
      taxYear: '2023',
      refundAmount: '$2,450.00',
      status: 'processing',
      filedDate: 'Mar 15, 2024',
      estimatedDate: 'Apr 15, 2024',
    },
    {
      id: 2,
      type: 'State',
      taxYear: '2023',
      refundAmount: '$850.00',
      status: 'approved',
      filedDate: 'Mar 15, 2024',
      estimatedDate: 'Apr 1, 2024',
    },
    {
      id: 3,
      type: 'Federal',
      taxYear: '2022',
      refundAmount: '$1,200.00',
      status: 'completed',
      filedDate: 'Mar 10, 2023',
      receivedDate: 'Apr 5, 2023',
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'processing':
        return 'bg-yellow-100 text-yellow-700';
      case 'approved':
        return 'bg-blue-100 text-blue-700';
      case 'completed':
        return 'bg-teal-100 text-teal-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'processing':
        return ClockIcon;
      case 'approved':
        return CheckCircleIcon;
      case 'completed':
        return CheckCircleIcon;
      default:
        return InformationCircleIcon;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Tax Refund</h1>
        <p className="text-gray-600">
          Track your tax refunds, view state and federal tax information, and manage amended returns.
        </p>
      </div>

      {/* Refund Type Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {refundTypes.map((type, index) => {
          const Icon = type.icon;
          return (
            <motion.div
              key={type.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setSelectedType(type.id)}
              className={`relative bg-white rounded-lg shadow-sm border-2 ${type.borderColor} p-6 cursor-pointer hover:shadow-lg transition-all duration-300 ${
                selectedType === type.id ? 'ring-2 ring-primary-blue' : ''
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 ${type.color} rounded-lg`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                {type.status === 'available' && (
                  <span className="px-2 py-1 bg-teal-100 text-teal-700 rounded-full text-xs font-medium">
                    Available
                  </span>
                )}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{type.title}</h3>
              <p className="text-sm text-gray-600 mb-4">{type.description}</p>
              <ul className="space-y-2 mb-4">
                {type.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-xs text-gray-600">
                    <CheckCircleIcon className="h-4 w-4 text-teal-500 mr-2 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              <button
                className={`w-full flex items-center justify-center space-x-2 px-4 py-2.5 ${type.color} text-white rounded-lg font-medium hover:opacity-90 transition-opacity`}
              >
                <span>View Details</span>
                <ArrowRightIcon className="h-4 w-4" />
              </button>
            </motion.div>
          );
        })}
      </div>

      {/* Refund History */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-primary-blue/10 rounded-lg">
              <CurrencyDollarIcon className="h-6 w-6 text-primary-blue" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Refund History</h2>
              <p className="text-sm text-gray-500">Track your tax refund status</p>
            </div>
          </div>
        </div>

        {refundHistory.length > 0 ? (
          <div className="space-y-4">
            {refundHistory.map((refund) => {
              const StatusIcon = getStatusIcon(refund.status);
              return (
                <div
                  key={refund.id}
                  className="p-5 border-2 border-gray-200 rounded-lg hover:border-primary-blue/50 transition-colors"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {refund.type} Tax Refund - {refund.taxYear}
                        </h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${getStatusColor(refund.status)}`}>
                          <StatusIcon className="h-3 w-3" />
                          <span className="capitalize">{refund.status}</span>
                        </span>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-gray-500 mb-1">Refund Amount</p>
                          <p className="font-semibold text-gray-900 text-lg">{refund.refundAmount}</p>
                        </div>
                        <div>
                          <p className="text-gray-500 mb-1">Filed Date</p>
                          <p className="font-medium text-gray-900">{refund.filedDate}</p>
                        </div>
                        {refund.status === 'completed' && refund.receivedDate ? (
                          <div>
                            <p className="text-gray-500 mb-1">Received Date</p>
                            <p className="font-medium text-teal-600">{refund.receivedDate}</p>
                          </div>
                        ) : (
                          <div>
                            <p className="text-gray-500 mb-1">Estimated Date</p>
                            <p className="font-medium text-gray-900">{refund.estimatedDate}</p>
                          </div>
                        )}
                        <div>
                          <button className="px-4 py-2 bg-primary-blue text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                            View Details
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <CurrencyDollarIcon className="mx-auto h-12 w-12 text-gray-300 mb-4" />
            <p className="text-gray-600 mb-2">No refund history available</p>
            <p className="text-sm text-gray-400">
              Your tax refund information will appear here once filing is complete.
            </p>
          </div>
        )}
      </motion.div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border border-blue-200 p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-2">IRS Where's My Refund?</h3>
          <p className="text-sm text-gray-600 mb-4">
            Check the status of your federal tax refund directly with the IRS.
          </p>
          <button className="px-4 py-2 bg-primary-blue text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center space-x-2">
            <span>Check IRS Status</span>
            <ArrowRightIcon className="h-4 w-4" />
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-lg border border-purple-200 p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-2">File Amended Return</h3>
          <p className="text-sm text-gray-600 mb-4">
            Need to correct your tax return? File an amended return (1040-X) here.
          </p>
          <button className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors flex items-center space-x-2">
            <span>Start Amendment</span>
            <ArrowRightIcon className="h-4 w-4" />
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default TaxRefund;

