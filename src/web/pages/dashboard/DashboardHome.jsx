import { motion } from 'framer-motion';
import {
  DocumentArrowUpIcon,
  ClockIcon,
  CheckCircleIcon,
  DocumentTextIcon,
  BellIcon,
} from '@heroicons/react/24/outline';

const DashboardHome = () => {
  const stats = [
    {
      name: 'Documents Uploaded',
      value: '12',
      icon: DocumentArrowUpIcon,
      color: 'bg-blue-500',
      change: '+3 this week',
    },
    {
      name: 'Pending Verification',
      value: '2',
      icon: ClockIcon,
      color: 'bg-yellow-500',
      change: 'Under review',
    },
    {
      name: 'Current Filing Status',
      value: 'In Progress',
      icon: CheckCircleIcon,
      color: 'bg-green-500',
      change: 'Step 4 of 6',
    },
    {
      name: 'Final Reports',
      value: '3',
      icon: DocumentTextIcon,
      color: 'bg-purple-500',
      change: 'Available for download',
    },
  ];

  const notifications = [
    {
      id: 1,
      title: 'Document Verification Complete',
      message: 'All your uploaded documents have been verified successfully.',
      time: '2 hours ago',
      read: false,
    },
    {
      id: 2,
      title: 'Pricing Confirmed',
      message: 'Your tax filing pricing has been confirmed. Please proceed with payment.',
      time: '1 day ago',
      read: false,
    },
    {
      id: 3,
      title: 'Additional Document Required',
      message: 'We need your bank statement for Q4 2023.',
      time: '3 days ago',
      read: true,
    },
  ];

  const progressSteps = [
    { step: 1, name: 'Documents Submitted', completed: true },
    { step: 2, name: 'Under Admin Review', completed: true },
    { step: 3, name: 'Admin Contact Scheduled', completed: true },
    { step: 4, name: 'Pricing Confirmed', completed: true },
    { step: 5, name: 'Filing in Progress', completed: false },
    { step: 6, name: 'Filing Completed', completed: false },
  ];

  return (
    <div className="space-y-4">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg shadow-sm p-4 border border-gray-200"
      >
        <h2 className="text-lg font-semibold text-gray-900 mb-1">Dashboard</h2>
        <p className="text-sm text-gray-600">
          Welcome back! Here's what's happening with your tax filing system.
        </p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-sm p-4 border border-gray-200"
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`p-2 ${stat.color} rounded-lg`}>
                  <Icon className="h-4 w-4 text-white" />
                </div>
                <span className="text-xs text-gray-500">0%</span>
              </div>
              <h3 className="text-xs font-medium text-gray-500 mb-1">
                {stat.name}
              </h3>
              <p className="text-xl font-bold text-gray-900 mb-1">{stat.value}</p>
              <p className="text-xs text-gray-500">{stat.change}</p>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Filing Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-lg shadow-sm p-4 border border-gray-200"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold text-gray-900">
              Filing Progress
            </h2>
          </div>
          <div className="space-y-3">
            {progressSteps.map((item, index) => (
              <div key={item.step} className="flex items-start space-x-3">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      item.completed
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-100 text-gray-400'
                    }`}
                  >
                    {item.completed ? (
                      <CheckCircleIcon className="h-4 w-4" />
                    ) : (
                      <span className="text-xs font-semibold">{item.step}</span>
                    )}
                  </div>
                  {index < progressSteps.length - 1 && (
                    <div
                      className={`w-0.5 h-10 ${
                        item.completed ? 'bg-green-500' : 'bg-gray-200'
                      }`}
                    />
                  )}
                </div>
                <div className="flex-1 pt-1">
                  <p
                    className={`text-sm font-medium ${
                      item.completed ? 'text-gray-900' : 'text-gray-400'
                    }`}
                  >
                    {item.name}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Latest Notifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-lg shadow-sm p-4 border border-gray-200"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold text-gray-900">
              Latest Notifications
            </h2>
            <button className="text-xs text-primary-blue hover:text-blue-700 font-medium">
              View All
            </button>
          </div>
          <div className="space-y-3">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-3 rounded-lg border ${
                  notification.read
                    ? 'bg-gray-50 border-gray-200'
                    : 'bg-blue-50 border-blue-200'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="text-sm font-semibold text-gray-900">
                        {notification.title}
                      </h3>
                      {!notification.read && (
                        <span className="h-2 w-2 bg-blue-500 rounded-full"></span>
                      )}
                    </div>
                    <p className="text-xs text-gray-600 mb-1">
                      {notification.message}
                    </p>
                    <p className="text-xs text-gray-500">{notification.time}</p>
                  </div>
                  <BellIcon className={`h-4 w-4 flex-shrink-0 mt-0.5 ${notification.read ? 'text-gray-400' : 'text-blue-600'}`} />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DashboardHome;

