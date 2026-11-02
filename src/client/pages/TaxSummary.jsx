import React, { useState } from 'react';
import {
  FileText,
  Calendar,
  DollarSign,
  TrendingUp,
  Eye,
  Download,
  CheckCircle2,
  Clock,
} from 'lucide-react';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';

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
        return 'green';
      case 'in-progress':
        return 'blue';
      case 'pending':
        return 'yellow';
      default:
        return 'gray';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return CheckCircle2;
      case 'in-progress':
        return Clock;
      default:
        return Clock;
    }
  };

  const filteredHistory =
    selectedYear === 'All'
      ? taxHistory
      : taxHistory.filter((item) => item.taxYear === selectedYear);

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-1">Tax Summary & History</h2>
        <p className="text-sm text-gray-600">
          View your complete tax filing history, summaries, and download past returns.
        </p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <div className="flex items-center justify-between mb-2">
            <FileText className="w-5 h-5 text-primary-600" />
            <span className="text-xs text-gray-500">Total Returns</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{summaryStats.totalReturns}</p>
          <p className="text-xs text-gray-500 mt-1">Tax Years Filed</p>
        </Card>

        <Card>
          <div className="flex items-center justify-between mb-2">
            <DollarSign className="w-5 h-5 text-green-600" />
            <span className="text-xs text-gray-500">Total Refunds</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{summaryStats.totalRefunds}</p>
          <p className="text-xs text-gray-500 mt-1">All Time</p>
        </Card>

        <Card>
          <div className="flex items-center justify-between mb-2">
            <TrendingUp className="w-5 h-5 text-purple-600" />
            <span className="text-xs text-gray-500">Tax Paid</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{summaryStats.totalTaxPaid}</p>
          <p className="text-xs text-gray-500 mt-1">Federal & State</p>
        </Card>

        <Card>
          <div className="flex items-center justify-between mb-2">
            <DollarSign className="w-5 h-5 text-indigo-600" />
            <span className="text-xs text-gray-500">Avg Refund</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{summaryStats.averageRefund}</p>
          <p className="text-xs text-gray-500 mt-1">Per Return</p>
        </Card>
      </div>

      {/* Year Filter */}
      <Card>
        <Card.Content>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-gray-500" />
              <label className="text-sm font-medium text-gray-700">Filter by Tax Year:</label>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setSelectedYear('All')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedYear === 'All'
                    ? 'bg-primary-600 text-white'
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
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {year}
                </button>
              ))}
            </div>
          </div>
        </Card.Content>
      </Card>

      {/* Tax History List */}
      <div className="space-y-4">
        {filteredHistory.map((returnItem) => {
          const StatusIcon = getStatusIcon(returnItem.status);
          return (
            <Card key={returnItem.id}>
              <Card.Content>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-semibold text-gray-900">
                        Tax Year {returnItem.taxYear}
                      </h3>
                      <Badge color={getStatusColor(returnItem.status)} size="sm">
                        <StatusIcon className="w-3 h-3 mr-1" />
                        {returnItem.status.replace('-', ' ')}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span>
                        Filing Status:{' '}
                        <span className="font-medium text-gray-900">
                          {returnItem.filingStatus}
                        </span>
                      </span>
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
                  <div className="flex items-center gap-2">
                    <Button
                      onClick={() =>
                        setSelectedReturn(selectedReturn === returnItem.id ? null : returnItem.id)
                      }
                      variant="secondary"
                      size="sm"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      {selectedReturn === returnItem.id ? 'Hide' : 'View'} Details
                    </Button>
                    {returnItem.status === 'completed' && (
                      <Button variant="primary" size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                    )}
                  </div>
                </div>

                {/* Quick Summary */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg mb-4">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Refund / Tax Owed</p>
                    {returnItem.refundAmount ? (
                      <p className="text-lg font-semibold text-green-600">
                        {returnItem.refundAmount}
                      </p>
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
                  <div className="border-t border-gray-200 pt-4 mt-4">
                    <h4 className="text-sm font-semibold text-gray-900 mb-4">Tax Return Summary</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Total Deductions</p>
                          <p className="text-base font-semibold text-gray-900">
                            {returnItem.totalDeductions}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Federal Tax</p>
                          <p className="text-base font-semibold text-gray-900">
                            {returnItem.federalTax}
                          </p>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <p className="text-xs text-gray-500 mb-1">State Tax</p>
                          <p className="text-base font-semibold text-gray-900">
                            {returnItem.stateTax}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Due Date</p>
                          <p className="text-base font-semibold text-gray-900">
                            {returnItem.dueDate}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-6 pt-4 border-t border-gray-200">
                      <Button variant="primary">
                        <Download className="w-5 h-5 mr-2" />
                        Download Full Return (PDF)
                      </Button>
                    </div>
                  </div>
                )}
              </Card.Content>
            </Card>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredHistory.length === 0 && (
        <Card>
          <Card.Content>
            <div className="text-center py-12">
              <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600 mb-2">No tax returns found for {selectedYear}</p>
              <p className="text-sm text-gray-400">
                Your tax filing history will appear here once you file your taxes.
              </p>
            </div>
          </Card.Content>
        </Card>
      )}
    </div>
  );
};

export default TaxSummary;

