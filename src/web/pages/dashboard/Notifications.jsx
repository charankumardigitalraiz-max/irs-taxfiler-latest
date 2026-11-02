import { motion } from 'framer-motion';
import {
  BellIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
} from '@heroicons/react/24/outline';

const Notifications = () => {
  const notifications = [
    {
      id: 1,
      type: 'success',
      title: 'Document Verification Complete',
      message: 'All your uploaded documents have been verified successfully. You can proceed to the next step.',
      time: '2 hours ago',
      read: false,
      icon: CheckCircleIcon,
    },
    {
      id: 2,
      type: 'info',
      title: 'Pricing Confirmed',
      message: 'Your tax filing pricing has been confirmed. Please proceed with payment to continue.',
      time: '1 day ago',
      read: false,
      icon: InformationCircleIcon,
    },
    {
      id: 3,
      type: 'warning',
      title: 'Additional Document Required',
      message: 'We need your bank statement for Q4 2023. Please upload it in the Upload Documents section.',
      time: '3 days ago',
      read: true,
      icon: ExclamationTriangleIcon,
    },
    {
      id: 4,
      type: 'info',
      title: 'Consultation Call Scheduled',
      message: 'Your consultation call has been scheduled for Jan 20, 2024 at 2:00 PM EST.',
      time: '5 days ago',
      read: true,
      icon: InformationCircleIcon,
    },
    {
      id: 5,
      type: 'success',
      title: 'Documents Received',
      message: 'We have received all your tax documents. Our team will begin review shortly.',
      time: '1 week ago',
      read: true,
      icon: CheckCircleIcon,
    },
  ];

  const getNotificationStyles = (type) => {
    const styles = {
      success: {
        bg: 'bg-green-50',
        border: 'border-green-200',
        icon: 'text-green-600',
      },
      info: {
        bg: 'bg-blue-50',
        border: 'border-blue-200',
        icon: 'text-blue-600',
      },
      warning: {
        bg: 'bg-yellow-50',
        border: 'border-yellow-200',
        icon: 'text-yellow-600',
      },
    };
    return styles[type] || styles.info;
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Notifications</h1>
          <p className="text-gray-600">
            Stay updated with your tax filing progress and important updates.
          </p>
        </div>
        {unreadCount > 0 && (
          <span className="px-4 py-2 bg-red-100 text-red-700 rounded-full text-sm font-medium">
            {unreadCount} unread
          </span>
        )}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 divide-y divide-gray-200">
        {notifications.map((notification, index) => {
          const Icon = notification.icon;
          const styles = getNotificationStyles(notification.type);
          return (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`p-6 hover:bg-gray-50 transition-colors ${
                !notification.read ? styles.bg : 'bg-white'
              } ${styles.border} border-l-4`}
            >
              <div className="flex items-start space-x-4">
                <div className={`p-2 ${styles.bg} rounded-lg`}>
                  <Icon className={`h-6 w-6 ${styles.icon}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <h3 className="text-base font-semibold text-gray-900">
                        {notification.title}
                      </h3>
                      {!notification.read && (
                        <span className="h-2 w-2 bg-blue-500 rounded-full"></span>
                      )}
                    </div>
                    <span className="text-xs text-gray-500 whitespace-nowrap ml-4">
                      {notification.time}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{notification.message}</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {notifications.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <BellIcon className="mx-auto h-16 w-16 text-gray-300 mb-4" />
          <p className="text-gray-600 mb-2">No notifications</p>
          <p className="text-sm text-gray-400">
            You're all caught up! New notifications will appear here.
          </p>
        </div>
      )}
    </div>
  );
};

export default Notifications;

