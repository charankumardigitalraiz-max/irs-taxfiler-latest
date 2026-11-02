import React, { useState, useEffect } from 'react';
import {
  MessageSquare,
  Send,
  Clock,
  Phone,
  Mail,
  CheckCircle2,
} from 'lucide-react';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import Modal from '../../admin/components/common/Modal';
import { supportService } from '../services/supportService';
import { useToast } from '../../admin/hooks/useToast';

const Support = () => {
  const [activeTab, setActiveTab] = useState('new-ticket');
  const [ticketData, setTicketData] = useState({
    subject: '',
    category: '',
    priority: 'medium',
    message: '',
  });
  const [supportTickets, setSupportTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [replyMessage, setReplyMessage] = useState('');
  const { showSuccess, showError } = useToast();

  // Load user's tickets once on mount
  useEffect(() => {
    const loadTickets = async () => {
      try {
        const res = await supportService.getMyTickets();
        if (res.success) {
          setSupportTickets(res.data || []);
        } else {
          showError(res.message || 'Failed to load your tickets.');
        }
      } catch (error) {
        console.error('Error loading tickets:', error);
        showError('Error loading your tickets. Please try again.');
      }
    };
    loadTickets();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmitTicket = async (e) => {
    e.preventDefault();

    try {
      const res = await supportService.createTicket(ticketData);
      if (res.success && res.data) {
        setSupportTickets((prev) => [res.data, ...prev]);
        showSuccess(res.message || 'Support ticket submitted successfully!');
        setTicketData({
          subject: '',
          category: '',
          priority: 'medium',
          message: '',
        });
        setActiveTab('tickets');
      } else {
        showError(res.message || 'Failed to submit ticket. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting ticket:', error);
      showError('Error submitting ticket. Please try again.');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'open':
        return 'blue';
      case 'in_progress':
        return 'yellow';
      case 'resolved':
        return 'green';
      case 'closed':
        return 'gray';
      default:
        return 'gray';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'red';
      case 'medium':
        return 'yellow';
      case 'low':
        return 'green';
      default:
        return 'gray';
    }
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-1">Support Center</h2>
        <p className="text-sm text-gray-600">
          Get help with your tax filing and submit support tickets.
        </p>
      </div>

      {/* Quick Contact Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-primary-100 rounded-lg">
              <Mail className="w-6 h-6 text-primary-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Email Support</h3>
              <p className="text-sm text-gray-500">contact@irstaxfiler.com</p>
            </div>
          </div>
          <a
            href="mailto:contact@irstaxfiler.com"
            className="text-sm text-primary-600 hover:text-primary-700 font-medium"
          >
            Send Email →
          </a>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-primary-100 rounded-lg">
              <Phone className="w-6 h-6 text-primary-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Phone Support</h3>
              <p className="text-sm text-gray-500">+1 (415) 223-1315</p>
            </div>
          </div>
          <a
            href="tel:+15551234567"
            className="text-sm text-primary-600 hover:text-primary-700 font-medium"
          >
            Call Now →
          </a>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-primary-100 rounded-lg">
              <Clock className="w-6 h-6 text-primary-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Business Hours</h3>
              <p className="text-sm text-gray-500">CST 9:30 AM To 7:30 PM</p>
            </div>
          </div>
          <p className="text-sm text-gray-600">Available during business hours</p>
        </Card>
      </div>

      {/* Tabs */}
      <Card>
        <div className="border-b border-gray-200">
          <div className="flex space-x-1 px-6">
            <button
              onClick={() => setActiveTab('new-ticket')}
              className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'new-ticket'
                  ? 'border-primary-600 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              New Ticket
            </button>
            <button
              onClick={() => setActiveTab('tickets')}
              className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'tickets'
                  ? 'border-primary-600 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              My Tickets ({supportTickets.length})
            </button>
          </div>
        </div>

        <Card.Content>
          {/* New Ticket Form */}
          {activeTab === 'new-ticket' && (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-primary-100 rounded-lg">
                  <Send className="w-6 h-6 text-primary-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">Submit Support Ticket</h3>
                  <p className="text-sm text-gray-500">We'll get back to you within 24 hours</p>
                </div>
              </div>

              <form onSubmit={handleSubmitTicket} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="Subject"
                    value={ticketData.subject}
                    onChange={(e) =>
                      setTicketData({ ...ticketData, subject: e.target.value })
                    }
                    required
                    placeholder="Brief description of your issue"
                  />
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={ticketData.category}
                      onChange={(e) =>
                        setTicketData({ ...ticketData, category: e.target.value })
                      }
                      required
                      className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                  <div className="flex space-x-4">
                    {['low', 'medium', 'high'].map((priority) => (
                      <label key={priority} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="radio"
                          name="priority"
                          value={priority}
                          checked={ticketData.priority === priority}
                          onChange={(e) =>
                            setTicketData({ ...ticketData, priority: e.target.value })
                          }
                          className="text-primary-600 focus:ring-primary-500"
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
                    onChange={(e) =>
                      setTicketData({ ...ticketData, message: e.target.value })
                    }
                    required
                    rows={6}
                    className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                    placeholder="Describe your issue in detail..."
                  />
                </div>

                <div className="flex items-center justify-end gap-4 pt-4 border-t border-gray-200">
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() =>
                      setTicketData({
                        subject: '',
                        category: '',
                        priority: 'medium',
                        message: '',
                      })
                    }
                  >
                    Clear
                  </Button>
                  <Button type="submit">
                    <Send className="w-4 h-4 mr-2" />
                    Submit Ticket
                  </Button>
                </div>
              </form>
            </div>
          )}

          {/* My Tickets */}
          {activeTab === 'tickets' && (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-primary-100 rounded-lg">
                  <MessageSquare className="w-6 h-6 text-primary-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">My Support Tickets</h3>
                  <p className="text-sm text-gray-500">View and manage your support requests</p>
                </div>
              </div>

              {supportTickets.length > 0 ? (
                <div className="space-y-4">
                  {supportTickets.map((ticket, index) => (
                    <div
                      key={ticket._id || index}
                      className="p-5 border-2 border-gray-200 rounded-lg hover:border-primary-300 transition-colors"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h4 className="text-lg font-semibold text-gray-900">
                              {ticket.subject}
                            </h4>
                            <Badge color={getStatusColor(ticket.status)} size="sm">
                              {ticket.status ? ticket.status.replace('_', ' ') : '—'}
                            </Badge>
                            <Badge color={getPriorityColor(ticket.priority)} size="sm">
                              {ticket.priority}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span>Ticket: {ticket._id?.slice(-6) || `#${index + 1}`}</span>
                            <span>•</span>
                            <span>Category: {ticket.category || '—'}</span>
                            <span>•</span>
                            <span>
                              {Array.isArray(ticket.messages) ? ticket.messages.length : 0}{' '}
                              messages
                            </span>
                          </div>
                        </div>
                        <Button
                          size="sm"
                          variant="primary"
                          onClick={() => setSelectedTicket(ticket)}
                        >
                          View Details
                        </Button>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span>
                          Created:{' '}
                          {ticket.createdAt
                            ? new Date(ticket.createdAt).toLocaleString()
                            : '—'}
                        </span>
                        <span>
                          Last updated:{' '}
                          {ticket.updatedAt
                            ? new Date(ticket.updatedAt).toLocaleString()
                            : '—'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-600 mb-2">No support tickets yet</p>
                  <p className="text-sm text-gray-400">
                    Submit a new ticket to get help with your tax filing
                  </p>
                </div>
              )}
            </div>
          )}
        </Card.Content>
      </Card>

      {/* Ticket details modal */}
      <Modal
        isOpen={!!selectedTicket}
        onClose={() => {
          setSelectedTicket(null);
          setReplyMessage('');
        }}
        title={
          selectedTicket
            ? `Ticket ${selectedTicket._id?.slice(-6) || ''} - ${selectedTicket.subject}`
            : 'Ticket details'
        }
        description={
          selectedTicket
            ? `Status: ${selectedTicket.status?.replace('_', ' ')} • Priority: ${
                selectedTicket.priority
              }`
            : ''
        }
        size="lg"
      >
        {selectedTicket && (
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">{selectedTicket.subject}</p>
                  <p className="text-xs text-gray-500">
                    Created:{' '}
                    {selectedTicket.createdAt
                      ? new Date(selectedTicket.createdAt).toLocaleString()
                      : '—'}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge color={getStatusColor(selectedTicket.status)} size="sm">
                    {selectedTicket.status?.replace('_', ' ')}
                  </Badge>
                  <Badge color={getPriorityColor(selectedTicket.priority)} size="sm">
                    {selectedTicket.priority}
                  </Badge>
                </div>
              </div>
            </div>

            <div className="space-y-3 max-h-80 overflow-y-auto">
              {Array.isArray(selectedTicket.messages) &&
                selectedTicket.messages.map((msg, idx) => (
                  <div
                    key={msg._id || idx}
                    className={`flex ${
                      msg.sender === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        msg.sender === 'user'
                          ? 'bg-primary-600 text-white'
                          : 'bg-gray-100 text-gray-900'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className={`text-xs font-medium ${
                            msg.sender === 'user' ? 'text-primary-100' : 'text-gray-600'
                          }`}
                        >
                          {msg.sender === 'user' ? 'You' : 'Support Team'}
                        </span>
                        <span
                          className={`text-xs ${
                            msg.sender === 'user' ? 'text-primary-200' : 'text-gray-500'
                          }`}
                        >
                          {msg.createdAt
                            ? new Date(msg.createdAt).toLocaleString()
                            : ''}
                        </span>
                      </div>
                      <p className="text-sm whitespace-pre-wrap">{msg.message}</p>
                    </div>
                  </div>
                ))}
            </div>

            {/* Reply box */}
            <div className="border-t border-gray-200 pt-4 mt-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your reply
              </label>
              <textarea
                value={replyMessage}
                onChange={(e) => setReplyMessage(e.target.value)}
                rows={3}
                placeholder="Type your message to support..."
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
              />
              <div className="mt-3 flex justify-end">
                <Button
                  size="sm"
                  leftIcon={<Send className="w-4 h-4" />}
                  disabled={!replyMessage.trim()}
                  onClick={async () => {
                    if (!replyMessage.trim() || !selectedTicket) return;
                    try {
                      const res = await supportService.replyToTicket(
                        selectedTicket._id,
                        replyMessage
                      );
                      if (res.success && res.data) {
                        const updated = res.data;
                        setSupportTickets((prev) =>
                          prev.map((t) => (t._id === updated._id ? updated : t))
                        );
                        setSelectedTicket(updated);
                        setReplyMessage('');
                        showSuccess('Your reply has been sent.');
                      } else {
                        showError(res.message || 'Failed to send reply. Please try again.');
                      }
                    } catch (error) {
                      console.error('Error sending reply:', error);
                      showError('Error sending reply. Please try again.');
                    }
                  }}
                >
                  Send
                </Button>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Support;
