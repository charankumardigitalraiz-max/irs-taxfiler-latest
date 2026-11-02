import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ChatBubbleLeftRightIcon,
  PaperAirplaneIcon,
  ClockIcon,
  PhoneIcon,
  EnvelopeIcon,
} from '@heroicons/react/24/outline';

const Support = () => {
  const [activeTab, setActiveTab] = useState('new-ticket');
  const [ticketData, setTicketData] = useState({
    subject: '',
    category: '',
    priority: 'medium',
    message: '',
  });

  const supportTickets = [
    {
      id: 1,
      ticketNumber: 'TKT-2024-001',
      subject: 'Document Upload Issue',
      category: 'Technical',
      priority: 'high',
      status: 'open',
      createdAt: '2024-02-10',
      lastUpdated: '2 hours ago',
      messages: 3,
    },
    {
      id: 2,
      ticketNumber: 'TKT-2024-002',
      subject: 'Tax Filing Question',
      category: 'General',
      priority: 'medium',
      status: 'in-progress',
      createdAt: '2024-02-08',
      lastUpdated: '1 day ago',
      messages: 5,
    },
    {
      id: 3,
      ticketNumber: 'TKT-2024-003',
      subject: 'Payment Inquiry',
      category: 'Billing',
      priority: 'low',
      status: 'resolved',
      createdAt: '2024-02-05',
      lastUpdated: '3 days ago',
      messages: 2,
    },
  ];


  const handleSubmitTicket = (e) => {
    e.preventDefault();
    // In real app, this would submit to backend
    alert('Support ticket submitted successfully! Ticket number: TKT-2024-' + String(supportTickets.length + 1).padStart(3, '0'));
    setTicketData({
      subject: '',
      category: '',
      priority: 'medium',
      message: '',
    });
    setActiveTab('tickets');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'open':
        return 'bg-blue-100 text-blue-700';
      case 'in-progress':
        return 'bg-yellow-100 text-yellow-700';
      case 'resolved':
        return 'bg-teal-100 text-teal-700';
      case 'closed':
        return 'bg-gray-100 text-gray-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-700';
      case 'medium':
        return 'bg-yellow-100 text-yellow-700';
      case 'low':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Support Center</h1>
        <p className="text-gray-600">
          Get help with your tax filing and submit support tickets.
        </p>
      </div>

      {/* Quick Contact Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-5 hover:shadow-md transition-shadow"
        >
          <div className="flex items-center space-x-3 mb-3">
            <div className="p-2 bg-primary-blue/10 rounded-lg">
              <EnvelopeIcon className="h-6 w-6 text-primary-blue" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Email Support</h3>
              <p className="text-sm text-gray-500">contact@irstaxfiler.com</p>
            </div>
          </div>
          <a
            href="mailto:contact@irstaxfiler.com"
            className="text-sm text-primary-blue hover:text-blue-700 font-medium"
          >
            Send Email →
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-5 hover:shadow-md transition-shadow"
        >
          <div className="flex items-center space-x-3 mb-3">
            <div className="p-2 bg-primary-blue/10 rounded-lg">
              <PhoneIcon className="h-6 w-6 text-primary-blue" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Phone Support</h3>
              <p className="text-sm text-gray-500">+1 (555) 123-4567</p>
            </div>
          </div>
          <a
            href="tel:+15551234567"
            className="text-sm text-primary-blue hover:text-blue-700 font-medium"
          >
            Call Now →
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-5 hover:shadow-md transition-shadow"
        >
          <div className="flex items-center space-x-3 mb-3">
            <div className="p-2 bg-primary-blue/10 rounded-lg">
              <ClockIcon className="h-6 w-6 text-primary-blue" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Business Hours</h3>
              <p className="text-sm text-gray-500">Mon-Fri: 9 AM - 6 PM EST</p>
            </div>
          </div>
          <p className="text-sm text-gray-600">Available during business hours</p>
        </motion.div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <div className="flex space-x-1 px-6">
            <button
              onClick={() => setActiveTab('new-ticket')}
              className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'new-ticket'
                  ? 'border-primary-blue text-primary-blue'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              New Ticket
            </button>
            <button
              onClick={() => setActiveTab('tickets')}
              className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'tickets'
                  ? 'border-primary-blue text-primary-blue'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              My Tickets ({supportTickets.length})
            </button>
          </div>
        </div>

        <div className="p-6">
          {/* New Ticket Form */}
          {activeTab === 'new-ticket' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 bg-primary-blue/10 rounded-lg">
                  <PaperAirplaneIcon className="h-6 w-6 text-primary-blue" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">Submit Support Ticket</h2>
                  <p className="text-sm text-gray-500">We'll get back to you within 24 hours</p>
                </div>
              </div>

              <form onSubmit={handleSubmitTicket} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Subject <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={ticketData.subject}
                      onChange={(e) => setTicketData({ ...ticketData, subject: e.target.value })}
                      required
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent"
                      placeholder="Brief description of your issue"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={ticketData.category}
                      onChange={(e) => setTicketData({ ...ticketData, category: e.target.value })}
                      required
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent"
                    >
                      <option value="">Select category</option>
                      <option value="technical">Technical Issue</option>
                      <option value="billing">Billing & Payment</option>
                      <option value="filing">Tax Filing</option>
                      <option value="general">General Inquiry</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Priority
                  </label>
                  <div className="flex space-x-4">
                    {['low', 'medium', 'high'].map((priority) => (
                      <label key={priority} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="radio"
                          name="priority"
                          value={priority}
                          checked={ticketData.priority === priority}
                          onChange={(e) => setTicketData({ ...ticketData, priority: e.target.value })}
                          className="text-primary-blue focus:ring-primary-blue"
                        />
                        <span className="text-sm text-gray-700 capitalize">{priority}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={ticketData.message}
                    onChange={(e) => setTicketData({ ...ticketData, message: e.target.value })}
                    required
                    rows={6}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent resize-none"
                    placeholder="Describe your issue in detail..."
                  />
                </div>

                <div className="flex items-center justify-end space-x-4 pt-4 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={() => setTicketData({ subject: '', category: '', priority: 'medium', message: '' })}
                    className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                  >
                    Clear
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-primary-blue text-white rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-md flex items-center space-x-2"
                  >
                    <PaperAirplaneIcon className="h-5 w-5" />
                    <span>Submit Ticket</span>
                  </button>
                </div>
              </form>
            </motion.div>
          )}

          {/* My Tickets */}
          {activeTab === 'tickets' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 bg-primary-blue/10 rounded-lg">
                  <ChatBubbleLeftRightIcon className="h-6 w-6 text-primary-blue" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">My Support Tickets</h2>
                  <p className="text-sm text-gray-500">View and manage your support requests</p>
                </div>
              </div>

              {supportTickets.length > 0 ? (
                <div className="space-y-4">
                  {supportTickets.map((ticket) => (
                    <div
                      key={ticket.id}
                      className="p-5 border-2 border-gray-200 rounded-lg hover:border-primary-blue/50 transition-colors"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-lg font-semibold text-gray-900">{ticket.subject}</h3>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(ticket.status)}`}>
                              {ticket.status.replace('-', ' ')}
                            </span>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(ticket.priority)}`}>
                              {ticket.priority}
                            </span>
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span>Ticket: {ticket.ticketNumber}</span>
                            <span>•</span>
                            <span>Category: {ticket.category}</span>
                            <span>•</span>
                            <span>{ticket.messages} messages</span>
                          </div>
                        </div>
                        <button className="px-4 py-2 bg-primary-blue text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                          View Details
                        </button>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span>Created: {ticket.createdAt}</span>
                        <span>Last updated: {ticket.lastUpdated}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <ChatBubbleLeftRightIcon className="mx-auto h-12 w-12 text-gray-300 mb-4" />
                  <p className="text-gray-600 mb-2">No support tickets yet</p>
                  <p className="text-sm text-gray-400">
                    Submit a new ticket to get help with your tax filing
                  </p>
                </div>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Support;

