import React, { useState } from 'react';
import {
  Bell,
  CheckCircle2,
  AlertTriangle,
  Info,
  X,
  Filter,
} from 'lucide-react';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';

const Notifications = () => {
  const [filter, setFilter] = useState('all');

  const notifications = [
    {
      id: 1,
      type: 'success',
      title: 'Document Verification Complete',
      message: 'All your uploaded documents have been verified successfully. You can proceed to the next step.',
      time: '2 hours ago',
      read: false,
      icon: CheckCircle2,
    },
    {
      id: 2,
      type: 'info',
      title: 'Pricing Confirmed',
      message: 'Your tax filing pricing has been confirmed. Please proceed with payment to continue.',
      time: '1 day ago',
      read: false,
      icon: Info,
    },
    {
      id: 3,
      type: 'warning',
      title: 'Additional Document Required',
      message: 'We need your bank statement for Q4 2023. Please upload it in the Upload Documents section.',
      time: '3 days ago',
      read: true,
      icon: AlertTriangle,
    },
    {
      id: 4,
      type: 'info',
      title: 'Consultation Call Scheduled',
      message: 'Your consultation call has been scheduled for Jan 20, 2024 at 2:00 PM EST.',
      time: '5 days ago',
      read: true,
      icon: Info,
    },
    {
      id: 5,
      type: 'success',
      title: 'Documents Received',
      message: 'We have received all your tax documents. Our team will begin review shortly.',
      time: '1 week ago',
      read: true,
      icon: CheckCircle2,
    },
  ];

  const getNotificationStyles = (type) => {
    const styles = {
      success: {
        bg: 'bg-green-50',
        border: 'border-green-200',
        icon: 'text-green-600',
        iconBg: 'bg-green-100',
      },
      info: {
        bg: 'bg-blue-50',
        border: 'border-blue-200',
        icon: 'text-blue-600',
        iconBg: 'bg-blue-100',
      },
      warning: {
        bg: 'bg-yellow-50',
        border: 'border-yellow-200',
        icon: 'text-yellow-600',
        iconBg: 'bg-yellow-100',
      },
    };
    return styles[type] || styles.info;
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  const filteredNotifications =
    filter === 'all'
      ? notifications
      : filter === 'unread'
      ? notifications.filter((n) => !n.read)
      : notifications.filter((n) => n.type === filter);

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-1">Notifications</h2>
            <p className="text-sm text-gray-600">
              Stay updated with your tax filing progress and important updates.
            </p>
          </div>
          {unreadCount > 0 && (
            <Badge color="red" size="lg">
              {unreadCount} unread
            </Badge>
          )}
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2">
        <Filter className="w-5 h-5 text-gray-400" />
        <div className="flex gap-2">
          {['all', 'unread', 'success', 'info', 'warning'].map((filterType) => (
            <button
              key={filterType}
              onClick={() => setFilter(filterType)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === filterType
                  ? 'bg-primary-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Notifications List */}
      <Card>
        <Card.Content className="p-0">
          <div className="divide-y divide-gray-200">
            {filteredNotifications.map((notification) => {
              const Icon = notification.icon;
              const styles = getNotificationStyles(notification.type);
              return (
                <div
                  key={notification.id}
                  className={`p-6 hover:bg-gray-50 transition-colors ${
                    !notification.read ? styles.bg : 'bg-white'
                  } border-l-4 ${styles.border}`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-2 rounded-lg ${styles.iconBg}`}>
                      <Icon className={`w-6 h-6 ${styles.icon}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <h3 className="text-base font-semibold text-gray-900">
                            {notification.title}
                          </h3>
                          {!notification.read && (
                            <span className="h-2 w-2 bg-primary-600 rounded-full"></span>
                          )}
                        </div>
                        <span className="text-xs text-gray-500 whitespace-nowrap ml-4">
                          {notification.time}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">{notification.message}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Card.Content>
      </Card>

      {filteredNotifications.length === 0 && (
        <Card>
          <Card.Content>
            <div className="text-center py-12">
              <Bell className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600 mb-2">No notifications found</p>
              <p className="text-sm text-gray-400">
                {filter === 'all'
                  ? "You're all caught up! New notifications will appear here."
                  : `No ${filter} notifications`}
              </p>
            </div>
          </Card.Content>
        </Card>
      )}
    </div>
  );
};

export default Notifications;
