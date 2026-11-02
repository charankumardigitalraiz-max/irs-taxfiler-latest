import React, { useState } from 'react';
import {
  DollarSign,
  Building2,
  FileText,
  ArrowRight,
  CheckCircle2,
  Clock,
  Info,
  Download,
} from 'lucide-react';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';

const TaxRefund = () => {
  const [selectedType, setSelectedType] = useState(null);

  const refundTypes = [
    {
      id: 'irs-refund',
      title: 'IRS Tax Refund',
      description: 'Track and manage your federal tax refund status',
      icon: Building2,
      color: 'blue',
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
      icon: FileText,
      color: 'indigo',
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
      icon: FileText,
      color: 'purple',
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
        return 'yellow';
      case 'approved':
        return 'blue';
      case 'completed':
        return 'green';
      default:
        return 'gray';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'processing':
        return Clock;
      case 'approved':
      case 'completed':
        return CheckCircle2;
      default:
        return Info;
    }
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-1">Tax Refund</h2>
        <p className="text-sm text-gray-600">
          Track your tax refunds, view state and federal tax information, and manage amended returns.
        </p>
      </div>

      {/* Refund Type Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {refundTypes.map((type) => {
          const Icon = type.icon;
          return (
            <Card
              key={type.id}
              className={`cursor-pointer hover:shadow-lg transition-all ${
                selectedType === type.id ? 'ring-2 ring-primary-600' : ''
              }`}
              onClick={() => setSelectedType(type.id)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-lg bg-${type.color}-100`}>
                  <Icon className={`w-6 h-6 text-${type.color}-600`} />
                </div>
                {type.status === 'available' && (
                  <Badge color="green" size="sm">Available</Badge>
                )}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{type.title}</h3>
              <p className="text-sm text-gray-600 mb-4">{type.description}</p>
              <ul className="space-y-2 mb-4">
                {type.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-xs text-gray-600">
                    <CheckCircle2 className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button variant="primary" className="w-full" size="sm">
                View Details
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Card>
          );
        })}
      </div>

      {/* Refund History */}
      <Card>
        <Card.Header>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary-100 rounded-lg">
              <DollarSign className="w-6 h-6 text-primary-600" />
            </div>
            <div>
              <Card.Title>Refund History</Card.Title>
              <Card.Description>Track your tax refund status</Card.Description>
            </div>
          </div>
        </Card.Header>
        <Card.Content>
          {refundHistory.length > 0 ? (
            <div className="space-y-4">
              {refundHistory.map((refund) => {
                const StatusIcon = getStatusIcon(refund.status);
                return (
                  <div
                    key={refund.id}
                    className="p-5 border-2 border-gray-200 rounded-lg hover:border-primary-300 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">
                            {refund.type} Tax Refund - {refund.taxYear}
                          </h3>
                          <Badge color={getStatusColor(refund.status)} size="sm">
                            <StatusIcon className="w-3 h-3 mr-1" />
                            {refund.status}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <p className="text-gray-500 mb-1">Refund Amount</p>
                            <p className="font-semibold text-gray-900 text-lg">
                              {refund.refundAmount}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-500 mb-1">Filed Date</p>
                            <p className="font-medium text-gray-900">{refund.filedDate}</p>
                          </div>
                          {refund.status === 'completed' && refund.receivedDate ? (
                            <div>
                              <p className="text-gray-500 mb-1">Received Date</p>
                              <p className="font-medium text-green-600">{refund.receivedDate}</p>
                            </div>
                          ) : (
                            <div>
                              <p className="text-gray-500 mb-1">Estimated Date</p>
                              <p className="font-medium text-gray-900">{refund.estimatedDate}</p>
                            </div>
                          )}
                          <div>
                            <Button size="sm" variant="primary">
                              View Details
                            </Button>
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
              <DollarSign className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600 mb-2">No refund history available</p>
              <p className="text-sm text-gray-400">
                Your tax refund information will appear here once filing is complete.
              </p>
            </div>
          )}
        </Card.Content>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
          <Card.Content>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              IRS Where's My Refund?
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Check the status of your federal tax refund directly with the IRS.
            </p>
            <Button variant="primary">
              Check IRS Status
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Card.Content>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-indigo-50 border-purple-200">
          <Card.Content>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">File Amended Return</h3>
            <p className="text-sm text-gray-600 mb-4">
              Need to correct your tax return? File an amended return (1040-X) here.
            </p>
            <Button variant="primary" className="bg-purple-600 hover:bg-purple-700">
              Start Amendment
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Card.Content>
        </Card>
      </div>
    </div>
  );
};

export default TaxRefund;

