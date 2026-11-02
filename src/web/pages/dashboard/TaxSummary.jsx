import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  DocumentTextIcon,
  CalendarIcon,
  CurrencyDollarIcon,
  CheckCircleIcon,
  ClockIcon,
  ArrowDownTrayIcon,
  EyeIcon,
  ChartBarIcon,
} from '@heroicons/react/24/outline';

const TaxSummary = () => {
  const [selectedYear, setSelectedYear] = useState('2024');
  const [selectedReturn, setSelectedReturn] = useState(null);

  const taxYears = ['2024', '2023', '2022', '2021', '2020'];

  const taxHistory = [
    {
      id: 1,
      taxYear: '2024',
      filingStatus: 'Married Filing Jointly',
      status: 'in-progress',
      filedDate: 'Mar 15, 2024',
      dueDate: 'Apr 15, 2024',
      refundAmount: '$2,450.00',
      taxOwed: null,
      agi: '$85,000',
      taxableIncome: '$65,000',
      totalDeductions: '$20,000',
      federalTax: '$7,200',
      stateTax: '$2,100',
      documents: 12,
    },
    {
      id: 2,
      taxYear: '2023',
      filingStatus: 'Married Filing Jointly',
      status: 'completed',
      filedDate: 'Mar 10, 2023',
      dueDate: 'Apr 15, 2023',
      refundAmount: '$1,800.00',
      taxOwed: null,
      agi: '$78,000',
      taxableIncome: '$58,000',
      totalDeductions: '$20,000',
      federalTax: '$6,500',
      stateTax: '$1,900',
      documents: 10,
      receivedDate: 'Apr 5, 2023',
    },
    {
      id: 3,
      taxYear: '2022',
      filingStatus: 'Married Filing Jointly',
      status: 'completed',
      filedDate: 'Mar 12, 2022',
      dueDate: 'Apr 15, 2022',
      refundAmount: null,
      taxOwed: '$450.00',
      agi: '$72,000',
      taxableIncome: '$55,000',
      totalDeductions: '$17,000',
      federalTax: '$6,200',
      stateTax: '$1,800',
      documents: 9,
      receivedDate: 'Mar 25, 2022',
    },
    {
      id: 4,
      taxYear: '2021',
      filingStatus: 'Married Filing Jointly',
      status: 'completed',
      filedDate: 'Mar 8, 2021',
      dueDate: 'Apr 15, 2021',
      refundAmount: '$950.00',
      taxOwed: null,
      agi: '$68,000',
      taxableIncome: '$52,000',
      totalDeductions: '$16,000',
      federalTax: '$5,800',
      stateTax: '$1,650',
      documents: 8,
      receivedDate: 'Apr 2, 2021',
    },
  ];

  const summaryStats = {
    totalReturns: taxHistory.length,
    totalRefunds: '$5,200.00',
    totalTaxPaid: '$28,650.00',
    averageRefund: '$1,733.33',
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-teal-100 text-teal-700';
      case 'in-progress':
        return 'bg-blue-100 text-blue-700';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return CheckCircleIcon;
      case 'in-progress':
        return ClockIcon;
      default:
        return ClockIcon;
    }
  };

  const filteredHistory = selectedYear === 'All'
    ? taxHistory
    : taxHistory.filter(item => item.taxYear === selectedYear);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Tax Summary & History</h1>
        <p className="text-gray-600">
          View your complete tax filing history, summaries, and download past returns.
        </p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-sm p-4 border border-gray-200"
        >
          <div className="flex items-center justify-between mb-2">
            <DocumentTextIcon className="h-5 w-5 text-primary-blue" />
            <span className="text-xs text-gray-500">Total Returns</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{summaryStats.totalReturns}</p>
          <p className="text-xs text-gray-500 mt-1">Tax Years Filed</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-lg shadow-sm p-4 border border-gray-200"
        >
          <div className="flex items-center justify-between mb-2">
            <CurrencyDollarIcon className="h-5 w-5 text-teal-500" />
            <span className="text-xs text-gray-500">Total Refunds</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{summaryStats.totalRefunds}</p>
          <p className="text-xs text-gray-500 mt-1">All Time</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-lg shadow-sm p-4 border border-gray-200"
        >
          <div className="flex items-center justify-between mb-2">
            <ChartBarIcon className="h-5 w-5 text-purple-500" />
            <span className="text-xs text-gray-500">Tax Paid</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{summaryStats.totalTaxPaid}</p>
          <p className="text-xs text-gray-500 mt-1">Federal & State</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-lg shadow-sm p-4 border border-gray-200"
        >
          <div className="flex items-center justify-between mb-2">
            <CurrencyDollarIcon className="h-5 w-5 text-indigo-500" />
            <span className="text-xs text-gray-500">Avg Refund</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{summaryStats.averageRefund}</p>
          <p className="text-xs text-gray-500 mt-1">Per Return</p>
        </motion.div>
      </div>

      {/* Year Filter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-lg shadow-sm border border-gray-200 p-4"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <CalendarIcon className="h-5 w-5 text-gray-500" />
            <label className="text-sm font-medium text-gray-700">Filter by Tax Year:</label>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setSelectedYear('All')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedYear === 'All'
                  ? 'bg-primary-blue text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All Years
            </button>
            {taxYears.map((year) => (
              <button
                key={year}
                onClick={() => setSelectedYear(year)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedYear === year
                    ? 'bg-primary-blue text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {year}
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Tax History List */}
      <div className="space-y-4">
        {filteredHistory.map((returnItem, index) => {
          const StatusIcon = getStatusIcon(returnItem.status);
          return (
            <motion.div
              key={returnItem.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-xl font-semibold text-gray-900">
                        Tax Year {returnItem.taxYear}
                      </h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${getStatusColor(returnItem.status)}`}>
                        <StatusIcon className="h-3 w-3" />
                        <span className="capitalize">{returnItem.status.replace('-', ' ')}</span>
                      </span>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span>Filing Status: <span className="font-medium text-gray-900">{returnItem.filingStatus}</span></span>
                      <span>•</span>
                      <span>Filed: {returnItem.filedDate}</span>
                      {returnItem.receivedDate && (
                        <>
                          <span>•</span>
                          <span>Received: {returnItem.receivedDate}</span>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setSelectedReturn(selectedReturn === returnItem.id ? null : returnItem.id)}
                      className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors flex items-center space-x-2"
                    >
                      <EyeIcon className="h-4 w-4" />
                      <span>{selectedReturn === returnItem.id ? 'Hide' : 'View'} Details</span>
                    </button>
                    {returnItem.status === 'completed' && (
                      <button className="px-4 py-2 bg-primary-blue text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center space-x-2">
                        <ArrowDownTrayIcon className="h-4 w-4" />
                        <span>Download</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Quick Summary */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg mb-4">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Refund / Tax Owed</p>
                    {returnItem.refundAmount ? (
                      <p className="text-lg font-semibold text-teal-600">{returnItem.refundAmount}</p>
                    ) : (
                      <p className="text-lg font-semibold text-red-600">{returnItem.taxOwed}</p>
                    )}
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">AGI</p>
                    <p className="text-sm font-medium text-gray-900">{returnItem.agi}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Taxable Income</p>
                    <p className="text-sm font-medium text-gray-900">{returnItem.taxableIncome}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Documents</p>
                    <p className="text-sm font-medium text-gray-900">{returnItem.documents} files</p>
                  </div>
                </div>

                {/* Detailed View */}
                {selectedReturn === returnItem.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="border-t border-gray-200 pt-4 mt-4"
                  >
                    <h4 className="text-sm font-semibold text-gray-900 mb-4">Tax Return Summary</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Total Deductions</p>
                          <p className="text-base font-semibold text-gray-900">{returnItem.totalDeductions}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Federal Tax</p>
                          <p className="text-base font-semibold text-gray-900">{returnItem.federalTax}</p>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <p className="text-xs text-gray-500 mb-1">State Tax</p>
                          <p className="text-base font-semibold text-gray-900">{returnItem.stateTax}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Due Date</p>
                          <p className="text-base font-semibold text-gray-900">{returnItem.dueDate}</p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-6 pt-4 border-t border-gray-200">
                      <button className="px-6 py-2.5 bg-primary-blue text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center space-x-2">
                        <ArrowDownTrayIcon className="h-5 w-5" />
                        <span>Download Full Return (PDF)</span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredHistory.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center"
        >
          <DocumentTextIcon className="mx-auto h-16 w-16 text-gray-300 mb-4" />
          <p className="text-gray-600 mb-2">No tax returns found for {selectedYear}</p>
          <p className="text-sm text-gray-400">
            Your tax filing history will appear here once you file your taxes.
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default TaxSummary;

