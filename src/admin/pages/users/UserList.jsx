import { useState, useEffect } from 'react';
import { Search, Download, Eye, Phone, Mail, Send, ChevronLeft, ChevronRight, Trash2 } from 'lucide-react';
import Header from '../../components/layout/Header';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';
import UserTable from '../../components/users/UserTable';
import UserRegistrationForm from '../../components/users/UserRegistrationForm';
import { WORKFLOW_STAGES } from '../../config/workflow';
import { useToast } from '../../hooks/useToast';
import { userService } from '../../services/userService';

const UserList = ({ userType }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [selectedUserIds, setSelectedUserIds] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 50,
    total: 0,
    pages: 1,
  });
  const { showSuccess, showError } = useToast();

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const params = {
        userType: userType || 'registered',
        page: pagination.page,
        limit: pagination.limit,
      };

      if (searchTerm) params.search = searchTerm;
      if (statusFilter) params.status = statusFilter;

      const response = await userService.getUsers(params);
      const rawUsers = response.data || [];

      const normalizedUsers = rawUsers.map((user, index) => {
        const fullId = user.userId || user._id || String(index + 1);
        let displayId = fullId;
        if (typeof fullId === 'string') {
          if (fullId.startsWith('IRS')) {
            displayId = fullId;
          } else if (fullId.length > 6) {
            displayId = fullId.slice(-6);
          }
        }

        return {
          id: user._id,
          displayId: displayId,
          fullId,
          firstName: user.firstName || '',
          lastName: user.lastName || '',
          fullName: user.fullName || `${user.firstName || ''} ${user.lastName || ''}`.trim() || '',
          email: user.email,
          phone: user.mobileNumber || '',
          currentStatus: user.workflowStatus || 'REGISTRATION_PENDING',
          assignedStaff: user.assignedStaff || null,
          createdAt: user.createdAt,
          isActive: user.isActive !== false, // Ensure boolean
        };
      });

      setUsers(normalizedUsers);
      if (response.pagination) {
        setPagination(response.pagination);
      } else {
        setPagination((prev) => ({
          ...prev,
          total: normalizedUsers.length,
          pages: 1,
        }));
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      showError('Failed to load users. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch users from API whenever filters change
  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userType, searchTerm, statusFilter, pagination.page, pagination.limit]);

  const handleDeleteUser = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    try {
      await userService.deleteUser(userId);
      showSuccess('User deleted successfully');
      if (selectedUser?.id === userId) {
        setSelectedUser(null);
      }
      fetchUsers();
    } catch (error) {
      showError('Failed to delete user');
    }
  };

  const handleBulkDelete = async () => {
    if (selectedUserIds.length === 0) return;
    if (!window.confirm(`Are you sure you want to delete ${selectedUserIds.length} users?`)) return;

    try {
      await userService.deleteUsers(selectedUserIds);
      showSuccess(`${selectedUserIds.length} users deleted successfully`);
      setSelectedUserIds([]);
      fetchUsers();
    } catch (error) {
      showError('Failed to delete users');
    }
  };

  const handleToggleActive = async (userId) => {
    try {
      await userService.toggleUserStatus(userId);
      fetchUsers();
    } catch (error) {
      showError('Failed to update user status');
    }
  };

  const handleSelectUser = (userId) => {
    setSelectedUserIds(prev =>
      prev.includes(userId)
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };


  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedUserIds(users.map(u => u.id));
    } else {
      setSelectedUserIds([]);
    }
  };

  // Get title and subtitle based on userType
  const getPageInfo = () => {
    switch (userType) {
      case 'registered':
        return {
          title: 'Registered Users',
          subtitle: 'Users who have successfully completed registration',
        };
      case 'verified':
        return {
          title: 'Verified Users',
          subtitle: 'Users who completed OTP verification but not registered',
        };
      case 'unverified':
        return {
          title: 'Unverified Users',
          subtitle: 'Users who sent OTP but did not verify it',
        };
      default:
        return {
          title: 'Users',
          subtitle: 'Manage all registered users and their tax filing status',
        };
    }
  };

  const pageInfo = getPageInfo();

  const handlePreviousPage = () => {
    if (pagination.page > 1) {
      setPagination(prev => ({ ...prev, page: prev.page - 1 }));
    }
  };

  const handleNextPage = () => {
    if (pagination.page < pagination.pages) {
      setPagination(prev => ({ ...prev, page: prev.page + 1 }));
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  const handleStatusFilterChange = (e) => {
    setStatusFilter(e.target.value);
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  const handlePageChange = (pageNum) => {
    setPagination(prev => ({ ...prev, page: pageNum }));
  };

  const handleCallClient = (contact) => {
    if (contact) {
      if (contact.startsWith('+') || /^\d/.test(contact)) {
        window.location.href = `tel:${contact}`;
      } else {
        window.location.href = `mailto:${contact}`;
      }
    }
  };

  const handleSubmitToRegister = async (formData) => {
    try {
      if (!selectedUser?.id) {
        showError('No user selected for registration');
        return;
      }

      const res = await userService.registerUser(selectedUser.id, formData);
      if (res.success) {
        showSuccess(res.message || 'User registered successfully!');
      } else {
        showError(res.message || 'Registration failed. Please verify OTP and try again.');
        return;
      }
      // Close the form; list will reflect on next fetch/navigation
      setSelectedUser(null);
    } catch (error) {
      console.error('Error registering user:', error);
      const message =
        error?.response?.data?.message ||
        error?.message ||
        'Error registering user. Please try again.';
      showError(message);
    }
  };

  const [showMessageModal, setShowMessageModal] = useState(false);
  const [messageUser, setMessageUser] = useState(null);
  const [message, setMessage] = useState('');

  const handleSendUpdates = (user) => {
    setMessageUser(user);
    setShowMessageModal(true);
    setMessage('');
  };

  const handleSubmitMessage = async () => {
    if (!message.trim()) {
      showError('Please enter a message');
      return;
    }

    try {
      // TODO: API call to send updates
      console.log('Sending update to user:', messageUser.id, message);
      showSuccess(`Update sent to ${messageUser.fullName || messageUser.email}`);
      setShowMessageModal(false);
      setMessage('');
      setMessageUser(null);
    } catch (error) {
      showError('Failed to send update. Please try again.');
    }
  };

  // For verified and unverified users, show list with registration form
  if (userType === 'verified' || userType === 'unverified') {
    return (
      <div>
        <Header
          title={pageInfo.title}
          subtitle={pageInfo.subtitle}
        />

        <div className="space-y-6">
          {selectedUser ? (
            <div className="space-y-4">
              <Button
                variant="secondary"
                onClick={() => setSelectedUser(null)}
              >
                ← Back to List
              </Button>
              <UserRegistrationForm
                user={selectedUser}
                userType={userType}
                onCallClient={handleCallClient}
                onSubmitToRegister={handleSubmitToRegister}
                onDeleteUser={handleDeleteUser}
                onSendOTP={async (email) => {
                  try {
                    await userService.sendOtpToUser(email);
                    showSuccess('OTP sent to user successfully');
                  } catch (error) {
                    console.error('Error sending OTP:', error);
                    showError('Failed to send OTP. Please try again.');
                  }
                }}
                onVerifyOTP={async (email, otp) => {
                  try {
                    const res = await userService.verifyOtpForUser(email, otp);
                    if (res.success) {
                      showSuccess(res.message || 'OTP verified successfully');
                    } else {
                      showError(res.message || 'Invalid OTP. Please try again.');
                    }
                  } catch (error) {
                    console.error('Error verifying OTP:', error);
                    showError('Failed to verify OTP. Please try again.');
                  }
                }}
              />
            </div>
          ) : (
            <Card padding="none">
              {/* Search */}
              <div className="p-4 border-b border-gray-200">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search by email or phone..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    {selectedUserIds.length > 0 && (
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={handleBulkDelete}
                        leftIcon={<Trash2 className="w-4 h-4" />}
                      >
                        Delete ({selectedUserIds.length})
                      </Button>
                    )}
                    {users.length > 0 && (
                      <div className="flex items-center gap-2 ml-2">
                        <input
                          type="checkbox"
                          checked={selectedUserIds.length === users.length && users.length > 0}
                          onChange={(e) => handleSelectAll(e.target.checked)}
                          className="w-4 h-4 text-primary-600 rounded border-gray-300 focus:ring-primary-500"
                        />
                        <span className="text-sm text-gray-600">Select All</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* User List */}
              <div className="divide-y divide-gray-200">
                {users.length === 0 ? (
                  <div className="p-8 text-center text-gray-500">
                    No {userType} users found
                  </div>
                ) : (
                  users.map((user) => (
                    <div
                      key={user.id}
                      className="p-4 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            checked={selectedUserIds.includes(user.id)}
                            onChange={() => handleSelectUser(user.id)}
                            onClick={(e) => e.stopPropagation()}
                            className="w-4 h-4 text-primary-600 rounded border-gray-300 focus:ring-primary-500 mr-2"
                          />
                          <div className="flex-1">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                                <span className="text-sm font-semibold text-primary-700">
                                  {user.email?.charAt(0).toUpperCase() || 'U'}
                                </span>
                              </div>
                              <div>
                                <div className="flex items-center gap-3 mb-1">
                                  <p className="font-medium text-gray-900">
                                    {user.fullName || user.email}
                                  </p>
                                  <span className="text-xs font-mono text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                                    ID: {user.displayId}
                                  </span>
                                </div>
                                <div className="flex items-center gap-4">
                                  {user.email && (
                                    <div className="flex items-center gap-1 text-sm text-gray-500">
                                      <Mail className="w-3 h-3" />
                                      {user.email}
                                    </div>
                                  )}
                                  {user.phone && (
                                    <div className="flex items-center gap-1 text-sm text-gray-500">
                                      <Phone className="w-3 h-3" />
                                      {user.phone}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          {user.email && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                window.location.href = `mailto:${user.email}`;
                              }}
                              title="Send Email"
                            >
                              <Mail className="w-4 h-4" />
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSendUpdates(user);
                            }}
                            title="Send Updates"
                          >
                            <Send className="w-4 h-4" />
                          </Button>
                          {user.phone && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleCallClient(user.phone);
                              }}
                              title="Call"
                            >
                              <Phone className="w-4 h-4" />
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedUser(user);
                            }}
                            title="View Details"
                          >
                            <Eye className="w-4 h-4" />
                            View
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteUser(user.id);
                            }}
                            title="Delete User"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Pagination */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-4 py-3 bg-gray-50 border-t border-gray-200">
                <div className="text-xs sm:text-sm text-gray-500 text-center sm:text-left">
                  Showing {(pagination.page - 1) * pagination.limit + 1} to {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total} results
                </div>
                <div className="flex items-center gap-1 sm:gap-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={handlePreviousPage}
                    disabled={pagination.page <= 1}
                    className="text-xs sm:text-sm px-2 sm:px-3"
                  >
                    <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="hidden sm:inline ml-1">Previous</span>
                  </Button>

                  {/* Page Numbers */}
                  <div className="flex items-center gap-1">
                    {Array.from({ length: Math.min(5, pagination.pages || 1) }, (_, i) => {
                      const pageNum = i + 1;
                      const isCurrent = pagination.page === pageNum;
                      return (
                        <button
                          key={pageNum}
                          onClick={() => handlePageChange(pageNum)}
                          className={`w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-md text-xs sm:text-sm transition-colors ${isCurrent
                            ? "bg-primary-600 text-white font-bold"
                            : "text-gray-600 hover:bg-gray-200"
                            }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                    {pagination.pages > 5 && (
                      <span className="text-gray-400 text-xs px-1">...</span>
                    )}
                  </div>

                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={handleNextPage}
                    disabled={pagination.page >= pagination.pages}
                    className="text-xs sm:text-sm px-2 sm:px-3"
                  >
                    <span className="hidden sm:inline mr-1">Next</span>
                    <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          )}
        </div>

        {/* Send Message Modal */}
        <Modal
          isOpen={showMessageModal}
          onClose={() => {
            setShowMessageModal(false);
            setMessage('');
            setMessageUser(null);
          }}
          title="Send Update to User"
          description={`Send a message to ${messageUser?.fullName || messageUser?.email || 'user'}`}
        >
          <div className="space-y-4">
            <div>
              <label className="label">Message</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="input resize-none h-24"
                placeholder="Enter update message..."
                autoFocus
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button
                variant="secondary"
                onClick={() => {
                  setShowMessageModal(false);
                  setMessage('');
                  setMessageUser(null);
                }}
              >
                Cancel
              </Button>
              <Button onClick={handleSubmitMessage}>
                Send Update
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    );
  }

  // For registered users, show table view
  return (
    <div>
      <Header
        title={pageInfo.title}
        subtitle={pageInfo.subtitle}
      />

      <div className="space-y-6">
        <Card padding="none">
          {/* Filters */}
          <div className="p-4 sm:p-6 border-b border-gray-100 bg-gray-50/50">
            <div className="flex flex-col xl:flex-row gap-4 xl:items-center justify-between">
              {/* Search */}
              <div className="relative flex-1 sm:min-w-[400px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search users by name, email, or ID..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white transition-all shadow-sm"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-3 w-full xl:w-auto">
                {/* Status filter */}
                <select
                  value={statusFilter}
                  onChange={handleStatusFilterChange}
                  className="px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white transition-all shadow-sm min-w-[160px]"
                >
                  <option value="">All Statuses</option>
                  {Object.values(WORKFLOW_STAGES).map((stage) => (
                    <option key={stage.key} value={stage.key}>
                      {stage.label}
                    </option>
                  ))}
                </select>

                {/* Bulk Actions */}
                <div className="flex gap-2">
                  {selectedUserIds.length > 0 && (
                    <Button
                      variant="danger"
                      onClick={handleBulkDelete}
                      leftIcon={<Trash2 className="w-4 h-4" />}
                      className="flex-1 sm:flex-none"
                    >
                      Delete ({selectedUserIds.length})
                    </Button>
                  )}
                  <Button
                    variant="secondary"
                    leftIcon={<Download className="w-4 h-4" />}
                    className="flex-1 sm:flex-none"
                  >
                    Export
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Table */}
          <UserTable
            users={users}
            isLoading={isLoading}
            selectedUserIds={selectedUserIds}
            onSelectUser={handleSelectUser}
            onSelectAll={handleSelectAll}
            onDeleteUser={handleDeleteUser}
            onToggleActive={handleToggleActive}
            pagination={{
              from: (pagination.page - 1) * pagination.limit + 1,
              to: Math.min(pagination.page * pagination.limit, pagination.total),
              total: pagination.total,
              pages: pagination.pages,
              currentPage: pagination.page,
              hasPrevious: pagination.page > 1,
              hasNext: pagination.page < pagination.pages,
              onPrevious: handlePreviousPage,
              onNext: handleNextPage,
              onPageChange: handlePageChange,
            }}
          />
        </Card>
      </div>

      {/* Send Message Modal */}
      <Modal
        isOpen={showMessageModal}
        onClose={() => {
          setShowMessageModal(false);
          setMessage('');
          setMessageUser(null);
        }}
        title="Send Update"
        size="md"
      >
        <div className="space-y-3">
          <div>
            <p className="text-sm text-gray-500 mb-2">
              To: {selectedUser?.fullName || selectedUser?.email || 'user'}
            </p>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none h-20"
              placeholder="Enter message..."
              autoFocus
            />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => {
                setShowMessageModal(false);
                setMessage('');
                setSelectedUser(null);
              }}
            >
              Cancel
            </Button>
            <Button onClick={handleSubmitMessage} size="sm">
              Send
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default UserList;

