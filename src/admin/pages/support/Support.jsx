import { useState, useEffect } from 'react';
import { Search, MessageSquare, Send, User, Clock, Filter, Plus, Trash2 } from 'lucide-react';
import Header from '../../components/layout/Header';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Modal from '../../components/common/Modal';
import { format } from 'date-fns';
import { supportService } from '../../services/supportService';
import { userService } from '../../services/userService';
import { useToast } from '../../hooks/useToast';

const Support = () => {
  const [tickets, setTickets] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [showTicketModal, setShowTicketModal] = useState(false);
  const [newMessage, setNewMessage] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [users, setUsers] = useState([]);
  const [userSearchTerm, setUserSearchTerm] = useState('');
  const [newTicket, setNewTicket] = useState({
    userId: '',
    subject: '',
    category: 'General',
    priority: 'medium',
    message: '',
  });
  const { showError, showSuccess } = useToast();

  // Load all tickets once on mount
  useEffect(() => {
    const loadTickets = async () => {
      try {
        const res = await supportService.getTickets();
        if (res.success) {
          setTickets(res.data || []);
        } else {
          showError(res.message || 'Failed to load support tickets.');
        }
      } catch (error) {
        console.error('Error loading support tickets:', error);
        showError('Error loading support tickets. Please try again.');
      }
    };
    loadTickets();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Load users for ticket creation
  useEffect(() => {
    const loadUsers = async () => {
      try {
        const res = await userService.getUsers({ userType: 'registered', limit: 100 });
        if (res.success || res.data) {
          const userList = (res.data || []).map((u) => ({
            id: u._id,
            userId: u.userId || u._id,
            fullName: u.fullName || `${u.firstName || ''} ${u.lastName || ''}`.trim() || u.email,
            email: u.email,
          }));
          setUsers(userList);
        }
      } catch (error) {
        console.error('Error loading users:', error);
      }
    };
    if (showCreateModal) {
      loadUsers();
    }
  }, [showCreateModal]);

  const filteredTickets = tickets.filter((ticket) => {
    const matchesSearch =
      !searchTerm ||
      ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.user?.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.user?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket._id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !statusFilter || ticket.status === statusFilter;
    const matchesPriority = !priorityFilter || ticket.priority === priorityFilter;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'open':
        return 'blue';
      case 'in-progress':
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

  const handleViewTicket = (ticket) => {
    setSelectedTicket(ticket);
    setShowTicketModal(true);
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedTicket) return;

    try {
      const res = await supportService.replyToTicket(selectedTicket._id, newMessage);
      if (res.success && res.data) {
        const updated = res.data;
        setTickets((prev) =>
          prev.map((t) => (t._id === updated._id ? updated : t))
        );
        setSelectedTicket(updated);
        setNewMessage('');
        showSuccess('Reply sent successfully.');
      } else {
        showError(res.message || 'Failed to send reply.');
      }
    } catch (error) {
      console.error('Error sending reply:', error);
      showError('Error sending reply. Please try again.');
    }
  };

  const handleUpdateStatus = async (ticketId, newStatus) => {
    try {
      const res = await supportService.updateStatus(ticketId, newStatus);
      if (res.success && res.data) {
        const updated = res.data;
        setTickets((prev) =>
          prev.map((t) => (t._id === updated._id ? updated : t))
        );
        if (selectedTicket && selectedTicket._id === ticketId) {
          setSelectedTicket(updated);
        }
        showSuccess('Ticket status updated.');
      } else {
        showError(res.message || 'Failed to update status.');
      }
    } catch (error) {
      console.error('Error updating ticket status:', error);
      showError('Error updating ticket status. Please try again.');
    }
  };

  const handleCreateTicket = async (e) => {
    e.preventDefault();
    if (!newTicket.userId || !newTicket.subject || !newTicket.message) {
      showError('Please fill in all required fields.');
      return;
    }

    try {
      const res = await supportService.createTicketOnBehalf(newTicket);
      if (res.success && res.data) {
        setTickets((prev) => [res.data, ...prev]);
        showSuccess('Ticket created successfully on behalf of user.');
        setShowCreateModal(false);
        setNewTicket({
          userId: '',
          subject: '',
          category: 'General',
          priority: 'medium',
          message: '',
        });
        setUserSearchTerm('');
      } else {
        showError(res.message || 'Failed to create ticket.');
      }
    } catch (error) {
      console.error('Error creating ticket:', error);
      showError('Error creating ticket. Please try again.');
    }
  };
  const handleDeleteTicket = async (ticketId) => {
    if (!window.confirm('Are you sure you want to delete this ticket? This action cannot be undone.')) {
      return;
    }

    try {
      const res = await supportService.deleteTicket(ticketId);
      if (res.success) {
        setTickets((prev) => prev.filter((t) => t._id !== ticketId));
        showSuccess('Ticket deleted successfully.');
        if (selectedTicket && selectedTicket._id === ticketId) {
          setShowTicketModal(false);
          setSelectedTicket(null);
        }
      } else {
        showError(res.message || 'Failed to delete ticket.');
      }
    } catch (error) {
      console.error('Error deleting ticket:', error);
      showError('Error deleting ticket. Please try again.');
    }
  };

  const filteredUsers = users.filter((user) => {
    const searchLower = userSearchTerm.toLowerCase();
    return (
      user.fullName.toLowerCase().includes(searchLower) ||
      user.email.toLowerCase().includes(searchLower) ||
      (user.userId && user.userId.toString().toLowerCase().includes(searchLower))
    );
  });

  const stats = {
    total: tickets.length,
    open: tickets.filter((t) => t.status === 'open').length,
    inProgress: tickets.filter((t) => t.status === 'in_progress').length,
    resolved: tickets.filter((t) => t.status === 'resolved').length,
    highPriority: tickets.filter((t) => t.priority === 'high').length,
  };

  return (
    <div>
      <Header
        title="Support Center"
        subtitle="Manage and respond to client support tickets"
        actions={
          <Button
            onClick={() => setShowCreateModal(true)}
            leftIcon={<Plus className="w-4 h-4" />}
            size="sm"
          >
            <span className="hidden sm:inline">Create Ticket</span>
            <span className="sm:hidden">New</span>
          </Button>
        }
      />

      <div className="space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          <Card className="p-4 rounded-xl">
            <p className="text-xs sm:text-sm font-medium text-gray-500">Total Tickets</p>
            <p className="text-xl sm:text-2xl font-bold text-gray-900 mt-1">{stats.total}</p>
          </Card>
          <Card className="p-4 rounded-xl">
            <p className="text-xs sm:text-sm font-medium text-gray-500">Open</p>
            <p className="text-xl sm:text-2xl font-bold text-blue-600 mt-1">{stats.open}</p>
          </Card>
          <Card className="p-4 rounded-xl">
            <p className="text-xs sm:text-sm font-medium text-gray-500">In Progress</p>
            <p className="text-xl sm:text-2xl font-bold text-yellow-600 mt-1">{stats.inProgress}</p>
          </Card>
          <Card className="p-4 rounded-xl">
            <p className="text-xs sm:text-sm font-medium text-gray-500">Resolved</p>
            <p className="text-xl sm:text-2xl font-bold text-green-600 mt-1">{stats.resolved}</p>
          </Card>
          <Card className="p-4 rounded-xl col-span-2 sm:col-span-1 border-red-100 bg-red-50/10">
            <p className="text-xs sm:text-sm font-medium text-gray-500">High Priority</p>
            <p className="text-xl sm:text-2xl font-bold text-red-600 mt-1">{stats.highPriority}</p>
          </Card>
        </div>

        {/* Tickets List */}
        <Card padding="none">
          <div className="p-3 sm:p-4 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by ticket ID, subject, or user..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              {/* Status Filter */}
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 sm:px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
              >
                <option value="">All Status</option>
                <option value="open">Open</option>
                <option value="in-progress">In Progress</option>
                <option value="resolved">Resolved</option>
                <option value="closed">Closed</option>
              </select>

              {/* Priority Filter */}
              <select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                className="px-3 sm:px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
              >
                <option value="">All Priority</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
          </div>

          {/* Tickets */}
          <div className="divide-y divide-gray-200">
            {filteredTickets.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                No tickets found
              </div>
            ) : (
              filteredTickets.map((ticket) => (
                <div
                  key={ticket._id || ticket.id}
                  className="p-3 sm:p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2">
                        <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-sm font-semibold text-primary-700">
                            {ticket.user?.fullName?.charAt(0).toUpperCase() || 'U'}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-1">
                            <h4 className="font-medium text-gray-900 truncate">{ticket.subject}</h4>
                            <Badge color={getStatusColor(ticket.status)} size="sm">
                              {ticket.status.replace('-', ' ')}
                            </Badge>
                            <Badge color={getPriorityColor(ticket.priority)} size="sm">
                              {ticket.priority}
                            </Badge>
                          </div>
                          <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-500">
                            <span className="font-mono">
                              {(ticket._id || ticket.id || '').toString().slice(-6) || '—'}
                            </span>
                            <span className="hidden sm:inline">•</span>
                            <span className="truncate">{ticket.user?.fullName || 'Unknown User'}</span>
                            <span className="hidden sm:inline">•</span>
                            <span className="truncate hidden sm:inline">{ticket.user?.email || '—'}</span>
                            <span className="hidden sm:inline">•</span>
                            <span className="hidden sm:inline">{ticket.messages?.length || 0} messages</span>
                            {ticket.assignedTo && (
                              <>
                                <span className="hidden sm:inline">•</span>
                                <span className="hidden sm:inline">Assigned: {ticket.assignedTo.fullName}</span>
                              </>
                            )}
                          </div>
                          <div className="flex flex-wrap items-center gap-2 sm:gap-4 mt-1 text-xs text-gray-400">
                            <span>
                              Created:{' '}
                              {ticket.createdAt
                                ? format(new Date(ticket.createdAt), 'MMM d, yyyy')
                                : '—'}
                            </span>
                            <span className="hidden sm:inline">•</span>
                            <span>
                              Last updated:{' '}
                              {ticket.updatedAt
                                ? format(new Date(ticket.updatedAt), 'MMM d, yyyy h:mm a')
                                : '—'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex-shrink-0 flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleViewTicket(ticket)}
                        leftIcon={<MessageSquare className="w-4 h-4" />}
                        className="w-full sm:w-auto"
                      >
                        <span className="hidden sm:inline">View & Reply</span>
                        <span className="sm:hidden">View</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteTicket(ticket._id || ticket.id)}
                        className="text-red-600 hover:bg-red-50 hover:text-red-700 p-2"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </Card>
      </div>

      {/* Ticket Detail Modal */}
      <Modal
        isOpen={showTicketModal}
        onClose={() => {
          setShowTicketModal(false);
          setSelectedTicket(null);
          setNewMessage('');
        }}
        title={`Ticket #${(selectedTicket?._id || selectedTicket?.id || '').toString().slice(-6).toUpperCase()}`}
        description={selectedTicket?.subject}
        size="lg"
      >
        {selectedTicket && (
          <div className="space-y-4">
            {/* Ticket Info */}
            <div className="bg-gray-50 p-3 sm:p-4 rounded-lg space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-semibold text-primary-700">
                      {selectedTicket.user.fullName?.charAt(0).toUpperCase() || 'U'}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{selectedTicket.user.fullName}</p>
                    <p className="text-sm text-gray-500">{selectedTicket.user.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge color={getStatusColor(selectedTicket.status)} size="sm">
                    {selectedTicket.status.replace('-', ' ')}
                  </Badge>
                  <Badge color={getPriorityColor(selectedTicket.priority)} size="sm">
                    {selectedTicket.priority}
                  </Badge>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-sm text-gray-600 pt-2 border-t border-gray-200">
                <span>Category: {selectedTicket.category}</span>
                <span className="hidden sm:inline">•</span>
                <span>
                  Created:{' '}
                  {selectedTicket.createdAt
                    ? format(new Date(selectedTicket.createdAt), 'MMM d, yyyy h:mm a')
                    : '—'}
                </span>
              </div>
            </div>

            {/* Messages */}
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {selectedTicket.messages.map((msg, index) => (
                <div
                  key={msg.id || index}
                  className={`flex ${msg.sender === 'admin' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] sm:max-w-[80%] rounded-lg p-3 ${msg.sender === 'admin'
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 text-gray-900'
                      }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-xs font-medium ${msg.sender === 'admin' ? 'text-primary-100' : 'text-gray-600'
                        }`}>
                        {msg.senderName || (msg.sender === 'admin' ? 'Admin' : 'User')}
                      </span>
                      <span
                        className={`text-xs ${msg.sender === 'admin' ? 'text-primary-200' : 'text-gray-500'
                          }`}
                      >
                        {msg.createdAt
                          ? format(new Date(msg.createdAt), 'MMM d, h:mm a')
                          : ''}
                      </span>
                    </div>
                    <p className="text-sm whitespace-pre-wrap break-words">{msg.message}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Reply Section */}
            <div className="border-t border-gray-200 pt-4">
              <div className="flex items-center gap-2 mb-2">
                <label className="text-sm font-medium text-gray-700">Reply</label>
              </div>
              <textarea
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your response..."
                rows={4}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
              />
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mt-3">
                <select
                  value={selectedTicket.status}
                  onChange={(e) => handleUpdateStatus(selectedTicket._id || selectedTicket.id, e.target.value)}
                  className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="open">Open</option>
                  <option value="in-progress">In Progress</option>
                  <option value="resolved">Resolved</option>
                  <option value="closed">Closed</option>
                </select>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteTicket(selectedTicket._id || selectedTicket.id)}
                    className="text-red-600 hover:bg-red-50 hover:text-red-700"
                    leftIcon={<Trash2 className="w-4 h-4" />}
                  >
                    Delete Ticket
                  </Button>
                  <Button
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim()}
                    leftIcon={<Send className="w-4 h-4" />}
                    className="w-full sm:w-auto"
                  >
                    Send Reply
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* Create Ticket Modal */}
      <Modal
        isOpen={showCreateModal}
        onClose={() => {
          setShowCreateModal(false);
          setNewTicket({
            userId: '',
            subject: '',
            category: 'General',
            priority: 'medium',
            message: '',
          });
          setUserSearchTerm('');
        }}
        title="Create Ticket on Behalf of User"
        description="Create a support ticket for a customer"
        size="lg"
      >
        <form onSubmit={handleCreateTicket} className="space-y-4">
          {/* User Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select User <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, email, or user ID..."
                value={userSearchTerm}
                onChange={(e) => setUserSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            {userSearchTerm && (
              <div className="mt-2 max-h-48 overflow-y-auto border border-gray-200 rounded-lg">
                {filteredUsers.length === 0 ? (
                  <div className="p-3 text-sm text-gray-500 text-center">No users found</div>
                ) : (
                  filteredUsers.map((user) => (
                    <button
                      key={user.id}
                      type="button"
                      onClick={() => {
                        setNewTicket({ ...newTicket, userId: user.id });
                        setUserSearchTerm(user.fullName);
                      }}
                      className={`w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors ${newTicket.userId === user.id ? 'bg-primary-50 border-l-4 border-primary-500' : ''
                        }`}
                    >
                      <div className="font-medium text-gray-900">{user.fullName}</div>
                      <div className="text-sm text-gray-500">
                        {user.email}
                        {user.userId && (
                          <span className="ml-2 text-gray-400">• ID: {user.userId}</span>
                        )}
                      </div>
                    </button>
                  ))
                )}
              </div>
            )}
            {newTicket.userId && (
              <div className="mt-2 text-sm text-green-600">
                Selected: {users.find((u) => u.id === newTicket.userId)?.fullName}
                {users.find((u) => u.id === newTicket.userId)?.userId && (
                  <span className="ml-2 text-gray-500">
                    (ID: {users.find((u) => u.id === newTicket.userId)?.userId})
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Subject */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Subject <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={newTicket.subject}
              onChange={(e) => setNewTicket({ ...newTicket, subject: e.target.value })}
              placeholder="Enter ticket subject"
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              required
            />
          </div>

          {/* Category and Priority */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select
                value={newTicket.category}
                onChange={(e) => setNewTicket({ ...newTicket, category: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="General">General</option>
                <option value="Technical">Technical</option>
                <option value="Billing">Billing</option>
                <option value="Account">Account</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
              <select
                value={newTicket.priority}
                onChange={(e) => setNewTicket({ ...newTicket, priority: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Message <span className="text-red-500">*</span>
            </label>
            <textarea
              value={newTicket.message}
              onChange={(e) => setNewTicket({ ...newTicket, message: e.target.value })}
              placeholder="Enter ticket message..."
              rows={5}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
              required
            />
          </div>

          {/* Actions */}
          <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-4 border-t border-gray-200">
            <Button
              type="button"
              variant="ghost"
              onClick={() => {
                setShowCreateModal(false);
                setNewTicket({
                  userId: '',
                  subject: '',
                  category: 'General',
                  priority: 'medium',
                  message: '',
                });
                setUserSearchTerm('');
              }}
              className="w-full sm:w-auto"
            >
              Cancel
            </Button>
            <Button type="submit" disabled={!newTicket.userId || !newTicket.subject || !newTicket.message} className="w-full sm:w-auto">
              Create Ticket
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Support;
