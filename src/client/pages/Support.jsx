import React, { useState, useEffect } from 'react';
import {
  MessageSquare,
  Send,
  Clock,
  Phone,
  Mail,
} from 'lucide-react';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import { SectionSkeleton } from '../components/common/PageLoader';
import Modal from '../../admin/components/common/Modal';
import { supportService } from '../services/supportService';
import { useToast } from '../../admin/hooks/useToast';

const fieldLabelClass = 'block text-[13px] font-medium text-[#334E68] mb-1.5';
const fieldInputClass =
  'w-full px-3.5 py-2.5 text-sm font-normal text-[#1F4264] bg-white border border-[#C5D6E0] rounded-md focus:outline-none focus:ring-2 focus:ring-[#127EAB]/20 focus:border-[#127EAB] transition-colors placeholder:text-xs placeholder:text-slate-400';

const Support = () => {
  const [activeTab, setActiveTab] = useState('new-ticket');
  const [ticketData, setTicketData] = useState({
    subject: '',
    category: '',
    priority: 'medium',
    message: '',
  });
  const [supportTickets, setSupportTickets] = useState([]);
  const [loadingTickets, setLoadingTickets] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [replying, setReplying] = useState(false);
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
      } finally {
        setLoadingTickets(false);
      }
    };
    loadTickets();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmitTicket = async (e) => {
    e.preventDefault();
    if (submitting) return;

    try {
      setSubmitting(true);
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
    } finally {
      setSubmitting(false);
    }
  };

  const handleReply = async () => {
    if (!replyMessage.trim() || !selectedTicket || replying) return;
    try {
      setReplying(true);
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
    } finally {
      setReplying(false);
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

  const getPriorityOptionStyle = (priority, isSelected) => {
    if (!isSelected) {
      return 'border-[#C5D6E0] bg-white text-[#4A6178] hover:bg-[#F4F9FB] hover:border-[#127EAB]/40';
    }
    if (priority === 'high') {
      return 'border-[#EE6450] bg-[#FEF4F2] text-[#D9523E]';
    }
    if (priority === 'medium') {
      return 'border-amber-400 bg-amber-50 text-amber-800';
    }
    return 'border-emerald-400 bg-emerald-50 text-emerald-700';
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-[0_2px_10px_rgba(31,66,100,0.04)] px-5 py-4 border border-[#DCEAF0]">
        <h2 className="text-xl sm:text-[22px] font-medium text-[#1F4264] tracking-tight">
          Support Center
        </h2>
        <p className="text-[13px] sm:text-sm text-[#6F7F8E] font-medium mt-0.5">
          Get help with your tax filing and submit support tickets.
        </p>
      </div>

      {/* Quick Contact Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <a
          href="mailto:info@irstaxfiler.com"
          className="block group rounded-lg focus:outline-none focus:ring-2 focus:ring-[#127EAB]/30"
        >
          <Card className="h-full group-hover:shadow-md group-hover:border-[#127EAB]/40 transition-all cursor-pointer">
            <div className="flex items-start justify-between gap-3 mb-2.5">
              <div className="min-w-0">
                <p className="text-xs font-medium text-[#6F7F8E]">Email Support</p>
                <span
                  className="block text-[18px] font-semibold text-[#127EAB] group-hover:text-[#0E668B] mt-1 truncate transition-colors"
                  title="info@irstaxfiler.com"
                >
                  info@irstaxfiler.com
                </span>
              </div>
              <div className="w-9 h-9 rounded-lg bg-[#E9F7FA] flex items-center justify-center shrink-0">
                <Mail className="w-4 h-4 text-[#127EAB]" />
              </div>
            </div>
            <span className="inline-flex items-center text-xs text-[#6F7F8E] group-hover:text-[#127EAB] font-medium transition-colors">
              Send Email →
            </span>
          </Card>
        </a>

        <a
          href="tel:+14152231315"
          className="block group rounded-lg focus:outline-none focus:ring-2 focus:ring-[#059669]/30"
        >
          <Card className="h-full group-hover:shadow-md group-hover:border-[#059669]/40 transition-all cursor-pointer">
            <div className="flex items-start justify-between gap-3 mb-2.5">
              <div className="min-w-0">
                <p className="text-xs font-medium text-[#6F7F8E]">Phone Support</p>
                <span
                  className="block text-[18px] font-semibold text-[#059669] group-hover:text-[#047857] mt-1 truncate transition-colors"
                  title="+1 (415) 223-1315"
                >
                  +1 (415) 223-1315
                </span>
              </div>
              <div className="w-9 h-9 rounded-lg bg-[#ECFDF5] flex items-center justify-center shrink-0">
                <Phone className="w-4 h-4 text-[#059669]" />
              </div>
            </div>
            <span className="inline-flex items-center text-xs text-[#6F7F8E] group-hover:text-[#059669] font-medium transition-colors">
              Call Now →
            </span>
          </Card>
        </a>

        <Card className="hover:shadow-md hover:border-[#127EAB]/40 transition-all">
          <div className="flex items-start justify-between gap-3 mb-2.5">
            <div className="min-w-0">
              <p className="text-xs font-medium text-[#6F7F8E]">Business Hours</p>
              <p className="text-[18px] font-semibold text-[#1F4264] mt-1">
                CST 9:30 AM To 7:30 PM
              </p>
            </div>
            <div className="w-9 h-9 rounded-lg bg-[#EFF4F9] flex items-center justify-center shrink-0">
              <Clock className="w-4 h-4 text-[#1F4264]" />
            </div>
          </div>
          <p className="text-xs text-[#6F7F8E]">Available during business hours</p>
        </Card>
      </div>

      {/* Tabs & Content Card */}
      <Card padding="none">
        <div className="border-b border-[#DCEAF0] px-5 sm:px-6">
          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={() => setActiveTab('new-ticket')}
              className={`py-3.5 text-sm font-medium border-b-2 transition-colors cursor-pointer ${activeTab === 'new-ticket'
                ? 'border-[#127EAB] text-[#1F4264]'
                : 'border-transparent text-[#6F7F8E] hover:text-[#1F4264]'
                }`}
            >
              New Ticket
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('tickets')}
              className={`py-3.5 text-sm font-medium border-b-2 transition-colors inline-flex items-center gap-2 cursor-pointer ${activeTab === 'tickets'
                ? 'border-[#127EAB] text-[#1F4264]'
                : 'border-transparent text-[#6F7F8E] hover:text-[#1F4264]'
                }`}
            >
              <span>My Tickets</span>
              <span
                className={`px-2 py-0.5 rounded-full text-xs font-medium ${activeTab === 'tickets'
                  ? 'bg-[#E9F7FA] text-[#127EAB]'
                  : 'bg-slate-100 text-[#6F7F8E]'
                  }`}
              >
                {supportTickets.length}
              </span>
            </button>
          </div>
        </div>

        <div className="p-5 sm:p-6">
          {/* New Ticket Form */}
          {activeTab === 'new-ticket' && (
            <div>
              <div className="flex items-center gap-3 pb-4 mb-5 border-b border-[#E6F0F5]">
                <div className="w-9 h-9 rounded-lg bg-[#E9F7FA] border border-[#127EAB]/20 flex items-center justify-center shrink-0">
                  <Send className="w-4 h-4 text-[#127EAB]" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-[#1F4264]">
                    Submit Support Ticket
                  </h3>
                  <p className="text-xs text-[#6F7F8E]">
                    We'll get back to you within 24 hours
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmitTicket} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className={fieldLabelClass}>
                      Subject <span className="text-[#EE6450]">*</span>
                    </label>
                    <input
                      type="text"
                      value={ticketData.subject}
                      onChange={(e) =>
                        setTicketData({ ...ticketData, subject: e.target.value })
                      }
                      required
                      className={fieldInputClass}
                      placeholder="Brief description of your issue"
                    />
                  </div>

                  <div>
                    <label className={fieldLabelClass}>
                      Category <span className="text-[#EE6450]">*</span>
                    </label>
                    <select
                      value={ticketData.category}
                      onChange={(e) =>
                        setTicketData({ ...ticketData, category: e.target.value })
                      }
                      required
                      className={fieldInputClass}
                    >
                      <option value="">Select category</option>
                      <option value="technical">Technical Issue</option>
                      <option value="billing">Billing & Payment</option>
                      <option value="filing">Tax Filing</option>
                      <option value="general">General Inquiry</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className={fieldLabelClass}>Priority</label>
                    <div className="flex flex-wrap gap-2.5">
                      {['low', 'medium', 'high'].map((priority) => {
                        const isSelected = ticketData.priority === priority;
                        return (
                          <label
                            key={priority}
                            className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-md border text-xs font-medium capitalize transition-colors cursor-pointer ${getPriorityOptionStyle(
                              priority,
                              isSelected
                            )}`}
                          >
                            <input
                              type="radio"
                              name="priority"
                              value={priority}
                              checked={isSelected}
                              onChange={(e) =>
                                setTicketData({ ...ticketData, priority: e.target.value })
                              }
                              className="accent-[#127EAB] cursor-pointer"
                            />
                            <span>{priority}</span>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                </div>



                <div>
                  <label className={fieldLabelClass}>
                    Message <span className="text-[#EE6450]">*</span>
                  </label>
                  <textarea
                    value={ticketData.message}
                    onChange={(e) =>
                      setTicketData({ ...ticketData, message: e.target.value })
                    }
                    required
                    rows={5}
                    className={`${fieldInputClass} resize-none`}
                    placeholder="Describe your issue in detail..."
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#E6F0F5]">
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
                  <Button
                    type="submit"
                    isLoading={submitting}
                    leftIcon={<Send className="w-4 h-4" />}
                  >
                    {submitting ? 'Submitting...' : 'Submit Ticket'}
                  </Button>
                </div>
              </form>
            </div>
          )}

          {/* My Tickets */}
          {activeTab === 'tickets' && (
            <div>
              <div className="flex items-center gap-3 pb-4 mb-5 border-b border-[#E6F0F5]">
                <div className="w-9 h-9 rounded-lg bg-[#E9F7FA] border border-[#127EAB]/20 flex items-center justify-center shrink-0">
                  <MessageSquare className="w-4 h-4 text-[#127EAB]" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-[#1F4264]">
                    My Support Tickets
                  </h3>
                  <p className="text-xs text-[#6F7F8E]">
                    View and manage your support requests
                  </p>
                </div>
              </div>

              {loadingTickets ? (
                <SectionSkeleton variant="tickets" rows={3} />
              ) : supportTickets.length > 0 ? (
                <div className="space-y-3.5">
                  {supportTickets.map((ticket, index) => (
                    <div
                      key={ticket._id || index}
                      className="p-4 sm:p-5 border border-[#DCEAF0] bg-[#FAFDFE] rounded-lg hover:border-[#127EAB]/45 hover:bg-white transition-all"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2 mb-1.5">
                            <h4 className="text-[15px] font-semibold text-[#1F4264] break-words">
                              {ticket.subject}
                            </h4>
                            <Badge color={getStatusColor(ticket.status)} size="sm">
                              {ticket.status ? ticket.status.replace('_', ' ') : '—'}
                            </Badge>
                            <Badge color={getPriorityColor(ticket.priority)} size="sm">
                              {ticket.priority}
                            </Badge>
                          </div>
                          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[#6F7F8E]">
                            <span>Ticket: {ticket._id?.slice(-6) || `#${index + 1}`}</span>
                            <span>•</span>
                            <span className="capitalize">
                              Category: {ticket.category || '—'}
                            </span>
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
                          className="shrink-0 self-start"
                          onClick={() => setSelectedTicket(ticket)}
                        >
                          View Details
                        </Button>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 pt-3 border-t border-[#E6F0F5] text-xs text-[#6F7F8E]">
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
                  <div className="w-12 h-12 rounded-lg bg-[#F4F9FB] border border-[#DCEAF0] flex items-center justify-center mx-auto mb-3">
                    <MessageSquare className="w-5 h-5 text-[#6F7F8E]" />
                  </div>
                  <p className="text-sm font-medium text-[#1F4264] mb-1">
                    No support tickets yet
                  </p>
                  <p className="text-xs text-[#6F7F8E]">
                    Submit a new ticket to get help with your tax filing
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
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
            ? `Status: ${selectedTicket.status?.replace('_', ' ')} • Priority: ${selectedTicket.priority
            }`
            : ''
        }
        size="lg"
      >
        {selectedTicket && (
          <div className="space-y-4">
            <div className="bg-[#F4F9FB] border border-[#DCEAF0] p-4 rounded-lg">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-[#1F4264]">
                    {selectedTicket.subject}
                  </p>
                  <p className="text-xs text-[#6F7F8E] mt-0.5">
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

            <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
              {Array.isArray(selectedTicket.messages) &&
                selectedTicket.messages.map((msg, idx) => (
                  <div
                    key={msg._id || idx}
                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'
                      }`}
                  >
                    <div
                      className={`max-w-[82%] rounded-lg px-3.5 py-2.5 ${msg.sender === 'user'
                        ? 'bg-[#1F4264] text-white'
                        : 'bg-[#F4F9FB] border border-[#DCEAF0] text-[#1F4264]'
                        }`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className={`text-xs font-medium ${msg.sender === 'user' ? 'text-sky-100' : 'text-[#334E68]'
                            }`}
                        >
                          {msg.sender === 'user' ? 'You' : 'Support Team'}
                        </span>
                        <span
                          className={`text-[11px] ${msg.sender === 'user' ? 'text-sky-200/80' : 'text-[#6F7F8E]'
                            }`}
                        >
                          {msg.createdAt
                            ? new Date(msg.createdAt).toLocaleString()
                            : ''}
                        </span>
                      </div>
                      <p className="text-sm whitespace-pre-wrap leading-relaxed">
                        {msg.message}
                      </p>
                    </div>
                  </div>
                ))}
            </div>

            {/* Reply box */}
            <div className="border-t border-[#E6F0F5] pt-4 mt-2">
              <label className={fieldLabelClass}>Your reply</label>
              <textarea
                value={replyMessage}
                onChange={(e) => setReplyMessage(e.target.value)}
                rows={3}
                placeholder="Type your message to support..."
                className={`${fieldInputClass} resize-none`}
              />
              <div className="mt-3 flex justify-end">
                <Button
                  size="sm"
                  isLoading={replying}
                  leftIcon={<Send className="w-4 h-4" />}
                  disabled={!replyMessage.trim() || replying}
                  onClick={handleReply}
                >
                  {replying ? 'Sending...' : 'Send'}
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
