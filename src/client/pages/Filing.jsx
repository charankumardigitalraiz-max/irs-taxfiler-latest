import React from 'react';
import {
  CheckCircle2,
  Clock,
  FileCheck,
  TrendingUp,
  Calendar,
  Download,
} from 'lucide-react';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';

const Filing = () => {
  const steps = [
    {
      id: 1,
      name: 'Documents Submitted',
      description: 'All required documents have been uploaded and submitted',
      completed: true,
      date: 'Jan 15, 2024',
    },
    {
      id: 2,
      name: 'Under Admin Review',
      description: 'Your documents are being reviewed by our tax experts',
      completed: true,
      date: 'Jan 16, 2024',
    },
    {
      id: 3,
      name: 'Admin Contact Scheduled',
      description: 'Consultation call scheduled for Jan 20, 2024 at 2:00 PM',
      completed: true,
      date: 'Jan 18, 2024',
    },
    {
      id: 4,
      name: 'Pricing Confirmed',
      description: 'Your tax filing pricing has been confirmed and payment is pending',
      completed: true,
      date: 'Jan 22, 2024',
    },
    {
      id: 5,
      name: 'Filing in Progress',
      description: 'Our team is preparing and filing your tax returns',
      completed: false,
      date: 'In Progress',
      current: true,
    },
    {
      id: 6,
      name: 'Filing Completed',
      description: 'Your tax filing has been completed. Download your final reports.',
      completed: false,
      date: 'Pending',
    },
  ];

  const progressPercentage = Math.round(
    (steps.filter((s) => s.completed).length / steps.length) * 100
  );

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-1">Filing Status</h2>
        <p className="text-sm text-gray-600">
          Track the progress of your tax filing from submission to completion.
        </p>
      </div>

      {/* Progress Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-medium text-gray-500">Overall Progress</p>
            <TrendingUp className="w-5 h-5 text-primary-600" />
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex-1 bg-gray-200 rounded-full h-3">
              <div
                className="bg-primary-600 h-3 rounded-full transition-all duration-500"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
            <span className="text-lg font-bold text-gray-900">{progressPercentage}%</span>
          </div>
        </Card>
        <Card>
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-medium text-gray-500">Steps Completed</p>
            <FileCheck className="w-5 h-5 text-green-600" />
          </div>
          <p className="text-3xl font-bold text-gray-900">
            {steps.filter((s) => s.completed).length} / {steps.length}
          </p>
        </Card>
        <Card>
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-medium text-gray-500">Estimated Completion</p>
            <Calendar className="w-5 h-5 text-orange-600" />
          </div>
          <p className="text-lg font-bold text-gray-900">Feb 5, 2024</p>
        </Card>
      </div>

      {/* Timeline */}
      <Card>
        <Card.Header>
          <Card.Title>Filing Timeline</Card.Title>
          <Card.Description>Track your tax filing progress through each stage</Card.Description>
        </Card.Header>
        <Card.Content>
          <div className="relative">
            {steps.map((step, index) => (
              <div key={step.id} className="relative flex items-start gap-4 pb-8 last:pb-0">
                {/* Timeline Line */}
                {index < steps.length - 1 && (
                  <div
                    className={`absolute left-5 top-12 w-0.5 h-full ${
                      step.completed ? 'bg-green-500' : 'bg-gray-200'
                    }`}
                  />
                )}

                {/* Icon */}
                <div className="relative z-10 flex-shrink-0">
                  {step.completed ? (
                    <div className="flex items-center justify-center w-10 h-10 bg-green-500 rounded-full">
                      <CheckCircle2 className="w-6 h-6 text-white" />
                    </div>
                  ) : step.current ? (
                    <div className="flex items-center justify-center w-10 h-10 bg-primary-600 rounded-full animate-pulse">
                      <Clock className="w-6 h-6 text-white" />
                    </div>
                  ) : (
                    <div className="flex items-center justify-center w-10 h-10 bg-gray-200 rounded-full">
                      <Clock className="w-6 h-6 text-gray-400" />
                    </div>
                  )}
                </div>

                {/* Content */}
                <div
                  className={`flex-1 ${
                    step.completed ? 'opacity-100' : step.current ? 'opacity-100' : 'opacity-60'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3
                      className={`text-lg font-semibold ${
                        step.completed || step.current
                          ? 'text-gray-900'
                          : 'text-gray-400'
                      }`}
                    >
                      {step.name}
                    </h3>
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-sm font-medium ${
                          step.completed
                            ? 'text-green-600'
                            : step.current
                            ? 'text-primary-600'
                            : 'text-gray-400'
                        }`}
                      >
                        {step.date}
                      </span>
                      {step.current && (
                        <Badge color="blue" size="sm">
                          Active
                        </Badge>
                      )}
                      {step.completed && (
                        <Badge color="green" size="sm">
                          Done
                        </Badge>
                      )}
                    </div>
                  </div>
                  <p
                    className={`text-sm ${
                      step.completed || step.current
                        ? 'text-gray-600'
                        : 'text-gray-400'
                    }`}
                  >
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card.Content>
      </Card>
    </div>
  );
};

export default Filing;
