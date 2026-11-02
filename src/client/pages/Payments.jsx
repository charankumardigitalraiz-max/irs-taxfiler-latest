import React, { useState } from 'react';
import {
  CreditCard,
  CheckCircle2,
  Clock,
  DollarSign,
  FileText,
  Download,
  ArrowRight,
} from 'lucide-react';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';

const Payments = () => {
  const [selectedYear, setSelectedYear] = useState('2024');

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

  const paymentHistory = [
    {
      id: 1,
      date: '2024-01-15',
      amount: 599,
      status: 'completed',
      method: 'Credit Card',
      invoice: 'INV-2024-001',
      description: 'Tax Filing Services - 2023',
    },
    {
      id: 2,
      date: '2023-01-20',
      amount: 550,
      status: 'completed',
      method: 'Bank Transfer',
      invoice: 'INV-2023-001',
      description: 'Tax Filing Services - 2022',
    },
    {
      id: 3,
      date: '2022-01-18',
      amount: 525,
      status: 'completed',
      method: 'Credit Card',
      invoice: 'INV-2022-001',
      description: 'Tax Filing Services - 2021',
    },
  ];

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-1">Pricing & Payment</h2>
        <p className="text-sm text-gray-600">
          View your tax filing pricing breakdown and payment status.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Current Payment */}
        <div className="lg:col-span-2">
          <Card>
            <Card.Header>
              <div className="flex items-center justify-between">
                <div>
                  <Card.Title>Pricing Details</Card.Title>
                  <Card.Description>Current tax filing pricing breakdown</Card.Description>
                </div>
                <Badge color="green" size="sm">
                  {pricingDetails.status}
                </Badge>
              </div>
            </Card.Header>
            <Card.Content>
              <div className="space-y-3 mb-6">
                {pricingDetails.breakdown.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                      <span className="text-gray-900 font-medium">{item.item}</span>
                    </div>
                    <span className="text-gray-900 font-semibold">${item.amount}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-200 pt-4">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-lg font-semibold text-gray-900">Total Amount</span>
                  <span className="text-3xl font-bold text-primary-600">
                    ${pricingDetails.totalAmount}
                  </span>
                </div>
                <p className="text-sm text-gray-500 mb-4">
                  All prices are final and include tax preparation and e-filing services.
                </p>
                {pricingDetails.paymentStatus === 'Pending' && (
                  <Button className="w-full" size="lg">
                    <CreditCard className="w-5 h-5 mr-2" />
                    Proceed to Payment
                  </Button>
                )}
              </div>
            </Card.Content>
          </Card>
        </div>

        {/* Payment Status Card */}
        <Card>
          <Card.Header>
            <div className="flex items-center gap-3">
              <div className="p-3 bg-primary-100 rounded-lg">
                <CreditCard className="w-6 h-6 text-primary-600" />
              </div>
              <div>
                <Card.Title>Payment Status</Card.Title>
                <Card.Description>Current status</Card.Description>
              </div>
            </div>
          </Card.Header>
          <Card.Content>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600 mb-2">Status</p>
                <Badge
                  color={pricingDetails.paymentStatus === 'Paid' ? 'green' : 'yellow'}
                  size="md"
                >
                  {pricingDetails.paymentStatus === 'Paid' ? (
                    <CheckCircle2 className="w-4 h-4 mr-1" />
                  ) : (
                    <Clock className="w-4 h-4 mr-1" />
                  )}
                  {pricingDetails.paymentStatus}
                </Badge>
              </div>
              <div className="pt-4 border-t border-gray-200">
                <p className="text-xs text-gray-500">
                  Payment is required before we can proceed with filing your tax returns.
                </p>
              </div>
            </div>
          </Card.Content>
        </Card>
      </div>

      {/* Payment History */}
      <Card>
        <Card.Header>
          <div className="flex items-center justify-between">
            <div>
              <Card.Title>Payment History</Card.Title>
              <Card.Description>Your past payment transactions</Card.Description>
            </div>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="2024">2024</option>
              <option value="2023">2023</option>
              <option value="2022">2022</option>
              <option value="All">All Years</option>
            </select>
          </div>
        </Card.Header>
        <Card.Content>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                    Date
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                    Description
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                    Invoice
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                    Method
                  </th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">
                    Amount
                  </th>
                  <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700">
                    Status
                  </th>
                  <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {paymentHistory.map((payment) => (
                  <tr key={payment.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4 text-sm text-gray-900">
                      {formatDate(payment.date)}
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-900">{payment.description}</td>
                    <td className="py-4 px-4 text-sm text-gray-600">{payment.invoice}</td>
                    <td className="py-4 px-4 text-sm text-gray-600">{payment.method}</td>
                    <td className="py-4 px-4 text-sm font-semibold text-gray-900 text-right">
                      ${payment.amount}
                    </td>
                    <td className="py-4 px-4 text-center">
                      <Badge color="green" size="sm">
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                        Paid
                      </Badge>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <button className="p-2 text-primary-600 hover:bg-primary-50 rounded-lg transition-colors">
                        <Download className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card.Content>
      </Card>
    </div>
  );
};

export default Payments;
