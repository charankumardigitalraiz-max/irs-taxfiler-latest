import { motion } from 'framer-motion';
import { CheckCircleIcon, ClockIcon } from '@heroicons/react/24/solid';
import { CheckCircleIcon as CheckCircleOutline } from '@heroicons/react/24/outline';

const FilingStatus = () => {
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

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Filing Status</h1>
        <p className="text-gray-600">
          Track the progress of your tax filing from submission to completion.
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <div className="relative">
          {steps.map((step, index) => (
            <div key={step.id} className="relative flex items-start space-x-4">
              {/* Timeline Line */}
              {index < steps.length - 1 && (
                <div
                  className={`absolute left-5 top-12 w-0.5 h-full ${
                    step.completed ? 'bg-green-500' : 'bg-gray-200'
                  }`}
                />
              )}

              {/* Icon */}
              <div className="relative z-10">
                {step.completed ? (
                  <div className="flex items-center justify-center w-10 h-10 bg-green-500 rounded-full">
                    <CheckCircleIcon className="h-6 w-6 text-white" />
                  </div>
                ) : step.current ? (
                  <div className="flex items-center justify-center w-10 h-10 bg-primary-blue rounded-full animate-pulse">
                    <ClockIcon className="h-6 w-6 text-white" />
                  </div>
                ) : (
                  <div className="flex items-center justify-center w-10 h-10 bg-gray-200 rounded-full">
                    <CheckCircleOutline className="h-6 w-6 text-gray-400" />
                  </div>
                )}
              </div>

              {/* Content */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`flex-1 pb-8 ${
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
                  <span
                    className={`text-sm font-medium ${
                      step.completed
                        ? 'text-green-600'
                        : step.current
                        ? 'text-primary-blue'
                        : 'text-gray-400'
                    }`}
                  >
                    {step.date}
                  </span>
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
              </motion.div>
            </div>
          ))}
        </div>
      </div>

      {/* Progress Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <p className="text-sm text-gray-600 mb-2">Overall Progress</p>
          <div className="flex items-center space-x-4">
            <div className="flex-1 bg-gray-200 rounded-full h-3">
              <div
                className="bg-primary-blue h-3 rounded-full transition-all duration-500"
                style={{ width: '66%' }}
              />
            </div>
            <span className="text-lg font-bold text-gray-900">66%</span>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <p className="text-sm text-gray-600 mb-2">Steps Completed</p>
          <p className="text-3xl font-bold text-gray-900">4 / 6</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <p className="text-sm text-gray-600 mb-2">Estimated Completion</p>
          <p className="text-lg font-bold text-gray-900">Feb 5, 2024</p>
        </div>
      </div>
    </div>
  );
};

export default FilingStatus;

