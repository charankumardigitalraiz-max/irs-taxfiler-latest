import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Search, Eye, CheckCircle, Clock, Archive, UserPlus, Mail, Trash2, ChevronDown } from 'lucide-react';
import Header from '../../components/layout/Header';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Modal from '../../components/common/Modal';
import { format } from 'date-fns';
import { formService } from '../../services/formService';
import { userService } from '../../services/userService';
import { useToast } from '../../hooks/useToast';

const FormsList = () => {
  const { formType } = useParams();
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [adminNotes, setAdminNotes] = useState('');
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [otpStep, setOtpStep] = useState('send'); // 'send', 'verify', 'register'
  const [otpCode, setOtpCode] = useState('');
  const [sendingOtp, setSendingOtp] = useState(false);
  const [verifyingOtp, setVerifyingOtp] = useState(false);
  const [registering, setRegistering] = useState(false);
  const [userToRegister, setUserToRegister] = useState(null);
  const [selectedSubmissionIds, setSelectedSubmissionIds] = useState([]);
  const { showError, showSuccess } = useToast();

  const formTypeLabels = {
    'opt-out': 'Opt-Out Requests',
    'connect-expert': 'Connect With A Tax Expert',
    'contact-message': 'Send Us a Message',
    'refer-earn': 'Refer & Earn',
  };

  useEffect(() => {
    if (formType) {
      loadSubmissions();
      setSelectedSubmissionIds([]);
    }
  }, [formType, statusFilter]);

  const loadSubmissions = async () => {
    try {
      setLoading(true);
      const params = { formType, limit: 100 };
      if (statusFilter) params.status = statusFilter;

      const res = await formService.getSubmissions(params);
      if (res.success) {
        const filtered = (res.data || []).filter(
          (submission) => submission.formType === formType
        );
        setSubmissions(filtered);
      } else {
        showError(res.message || 'Failed to load form submissions.');
      }
    } catch (error) {
      console.error('Error loading form submissions:', error);
      showError('Error loading form submissions. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const filteredSubmissions = submissions.filter((submission) => {
    const matchesSearch =
      !searchTerm ||
      submission.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      submission.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      submission.phone?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'new': return 'blue';
      case 'in-progress': return 'yellow';
      case 'completed': return 'green';
      case 'archived': return 'gray';
      default: return 'gray';
    }
  };

  const handleViewSubmission = async (submission) => {
    try {
      const res = await formService.getSubmission(submission._id);
      if (res.success) {
        setSelectedSubmission(res.data);
        setAdminNotes(res.data.adminNotes || '');
        setShowModal(true);
      }
    } catch (error) {
      showError('Failed to load submission details.');
    }
  };

  const handleUpdateStatus = async (status) => {
    if (!selectedSubmission) return;

    try {
      const res = await formService.updateStatus(selectedSubmission._id, status, adminNotes);
      if (res.success) {
        showSuccess('Status updated successfully!');
        setShowModal(false);
        loadSubmissions();
      } else {
        showError(res.message || 'Failed to update status.');
      }
    } catch (error) {
      showError('Failed to update status. Please try again.');
    }
  };

  const handleDeleteSubmission = async (id) => {
    if (!window.confirm('Are you sure you want to delete this submission?')) return;

    try {
      const res = await formService.deleteSubmission(id);
      if (res.success) {
        showSuccess('Submission deleted successfully!');
        loadSubmissions();
      } else {
        showError(res.message || 'Failed to delete submission.');
      }
    } catch (error) {
      showError('Failed to delete submission. Please try again.');
    }
  };

  const handleBulkDelete = async () => {
    if (selectedSubmissionIds.length === 0) return;
    if (!window.confirm(`Are you sure you want to delete ${selectedSubmissionIds.length} submissions?`)) return;

    try {
      const res = await formService.bulkDeleteSubmissions(selectedSubmissionIds);
      if (res.success) {
        showSuccess(`${res.deletedCount || selectedSubmissionIds.length} submissions deleted successfully!`);
        setSelectedSubmissionIds([]);
        loadSubmissions();
      } else {
        showError(res.message || 'Failed to delete submissions.');
      }
    } catch (error) {
      showError('Failed to delete submissions. Please try again.');
    }
  };

  const handleSelectSubmission = (id) => {
    setSelectedSubmissionIds(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleSelectAllSubmissions = (checked) => {
    if (checked) {
      setSelectedSubmissionIds(filteredSubmissions.map(s => s._id));
    } else {
      setSelectedSubmissionIds([]);
    }
  };

  const handleRegisterFriend = (friend) => {
    setSelectedFriend(friend);
    setShowRegisterModal(true);
    setOtpStep('send');
    setOtpCode('');
    setUserToRegister(null);
  };

  const handleSendOTP = async () => {
    if (!selectedFriend?.email) {
      showError('Friend email is required');
      return;
    }
    try {
      setSendingOtp(true);
      const res = await userService.sendOtpToUser(selectedFriend.email);
      if (res.success) {
        showSuccess('OTP sent successfully to ' + selectedFriend.email);
        setOtpStep('verify');
      } else {
        showError(res.message || 'Failed to send OTP');
      }
    } catch (error) {
      showError('Failed to send OTP. Please try again.');
    } finally {
      setSendingOtp(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (!selectedFriend?.email || !otpCode) {
      showError('Email and OTP are required');
      return;
    }
    try {
      setVerifyingOtp(true);
      const res = await userService.verifyOtpForUser(selectedFriend.email, otpCode);
      if (res.success) {
        showSuccess('OTP verified successfully');
        setUserToRegister(res.user);
        setOtpStep('register');
      } else {
        showError(res.message || 'Invalid OTP');
      }
    } catch (error) {
      showError('Failed to verify OTP. Please try again.');
    } finally {
      setVerifyingOtp(false);
    }
  };

  const handleCompleteRegistration = async () => {
    if (!userToRegister) {
      showError('User not found');
      return;
    }
    const nameParts = (selectedFriend.name || '').trim().split(/\s+/);
    const firstName = nameParts[0] || selectedFriend.name;
    const lastName = nameParts.slice(1).join(' ') || '';
    const phone = selectedFriend.phone || '0000000000';

    if (!firstName || !selectedFriend.email || !phone) {
      showError('First name, email, and phone are required');
      return;
    }

    try {
      setRegistering(true);
      const registrationData = {
        firstName,
        lastName: lastName || firstName,
        email: selectedFriend.email,
        phone: phone,
        referralCode: selectedSubmission?.referralCode || '',
      };
      const res = await userService.registerUser(userToRegister.id, registrationData);
      if (res.success) {
        showSuccess(`Friend ${selectedFriend.name} registered successfully!`);
        setShowRegisterModal(false);
        setSelectedFriend(null);
        setOtpStep('send');
        setOtpCode('');
        setUserToRegister(null);
        if (selectedSubmission) {
          handleViewSubmission(selectedSubmission);
        }
      } else {
        showError(res.message || 'Failed to register friend');
      }
    } catch (error) {
      console.error('Registration error:', error);
      showError(error.response?.data?.message || 'Failed to complete registration. Please try again.');
    } finally {
      setRegistering(false);
    }
  };

  const renderFormDetails = () => {
    if (!selectedSubmission) return null;
    const { formType } = selectedSubmission;

    if (formType === 'opt-out') {
      return (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-[#6F7F8E] uppercase tracking-wider block mb-1">Address</label>
              <p className="text-sm text-[#1F4264] font-medium">{selectedSubmission.address || '—'}</p>
            </div>
            <div>
              <label className="text-xs font-semibold text-[#6F7F8E] uppercase tracking-wider block mb-1">City</label>
              <p className="text-sm text-[#1F4264] font-medium">{selectedSubmission.city || '—'}</p>
            </div>
            <div>
              <label className="text-xs font-semibold text-[#6F7F8E] uppercase tracking-wider block mb-1">State</label>
              <p className="text-sm text-[#1F4264] font-medium">{selectedSubmission.state || '—'}</p>
            </div>
            <div>
              <label className="text-xs font-semibold text-[#6F7F8E] uppercase tracking-wider block mb-1">ZIP Code</label>
              <p className="text-sm text-[#1F4264] font-medium">{selectedSubmission.zipCode || '—'}</p>
            </div>
          </div>
          {selectedSubmission.additionalInfo && (
            <div>
              <label className="text-xs font-semibold text-[#6F7F8E] uppercase tracking-wider block mb-1">Additional Information</label>
              <p className="text-sm text-[#1F4264] font-medium">{selectedSubmission.additionalInfo}</p>
            </div>
          )}
        </div>
      );
    }

    if (formType === 'connect-expert') {
      return (
        <div className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-[#6F7F8E] uppercase tracking-wider block mb-1">Country Code</label>
            <p className="text-sm text-[#1F4264] font-medium">{selectedSubmission.countryCode || '—'}</p>
          </div>
          <div>
            <label className="text-xs font-semibold text-[#6F7F8E] uppercase tracking-wider block mb-1">Preferred Time</label>
            <p className="text-sm text-[#1F4264] font-medium">{selectedSubmission.preferredTime || '—'}</p>
          </div>
          {selectedSubmission.message && (
            <div>
              <label className="text-xs font-semibold text-[#6F7F8E] uppercase tracking-wider block mb-1">Message</label>
              <p className="text-sm text-[#1F4264] font-medium">{selectedSubmission.message}</p>
            </div>
          )}
        </div>
      );
    }

    if (formType === 'contact-message') {
      return (
        <div className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-[#6F7F8E] uppercase tracking-wider block mb-1">Subject</label>
            <p className="text-sm text-[#1F4264] font-medium">{selectedSubmission.subject || '—'}</p>
          </div>
          {selectedSubmission.message && (
            <div>
              <label className="text-xs font-semibold text-[#6F7F8E] uppercase tracking-wider block mb-1">Message</label>
              <p className="text-sm text-[#1F4264] font-medium whitespace-pre-wrap">{selectedSubmission.message}</p>
            </div>
          )}
        </div>
      );
    }

    if (formType === 'refer-earn') {
      return (
        <div className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-[#6F7F8E] uppercase tracking-wider block mb-1">Referral Code</label>
            <p className="text-sm text-[#1F4264] font-mono font-medium">{selectedSubmission.referralCode || '—'}</p>
          </div>
          {selectedSubmission.friends && selectedSubmission.friends.length > 0 && (
            <div>
              <label className="text-xs font-semibold text-[#6F7F8E] uppercase tracking-wider block mb-1">Referred Friends</label>
              <div className="mt-2 space-y-2">
                {selectedSubmission.friends.map((friend, index) => (
                  <div key={index} className="p-3 bg-[#F8FBFC] border border-[#DCEAF0] rounded-xl flex items-center justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-[#1F4264]">{friend.name}</p>
                      <p className="text-xs text-[#6F7F8E] font-medium">{friend.email}</p>
                      {friend.phone && <p className="text-xs text-[#6F7F8E] font-medium">{friend.phone}</p>}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleRegisterFriend(friend)}
                      leftIcon={<UserPlus className="w-4 h-4" />}
                    >
                      Register
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      );
    }
    return null;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-[#6F7F8E] font-medium text-sm">Loading form submissions...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Header
        title={formTypeLabels[formType] || 'Form Submissions'}
        subtitle={`View and manage ${formTypeLabels[formType]?.toLowerCase() || 'form submissions'}`}
      />

      <Card padding="none">
        {/* Filters */}
        <div className="p-4 sm:p-5 border-b border-[#E6F0F5] bg-white">
          <div className="flex flex-col lg:flex-row gap-3 sm:gap-4 lg:items-center justify-between">
            {/* Search */}
            <div className="relative w-full sm:w-64 md:w-72 shrink-0">
              <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-[#8BA0B2] w-4 h-4" />
              <input
                type="text"
                placeholder="Search by name, email, or phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full h-10 pl-10 pr-4 text-sm text-[#1F4264] placeholder-[#8BA0B2] bg-white border border-[#CCDCE1] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#127EAB]/20 focus:border-[#127EAB] transition-all shadow-xs"
              />
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
              {/* Status filter */}
              <div className="relative w-full sm:w-48 shrink-0">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full h-10 pl-3.5 pr-9 text-sm text-[#1F4264] border border-[#CCDCE1] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#127EAB]/20 focus:border-[#127EAB] bg-white transition-all cursor-pointer appearance-none shadow-xs"
                >
                  <option value="">All Status</option>
                  <option value="new">New</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                  <option value="archived">Archived</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8BA0B2] pointer-events-none" />
              </div>

              {selectedSubmissionIds.length > 0 && (
                <Button
                  variant="danger"
                  onClick={handleBulkDelete}
                  leftIcon={<Trash2 className="w-4 h-4" />}
                  className="h-10 px-4 text-sm min-w-[115px] justify-center shadow-xs"
                >
                  Delete Selected ({selectedSubmissionIds.length})
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-[#E6F0F5]">
            <thead>
              <tr className="border-b border-[#DCEAF0] bg-[#F8FBFC]">
                <th className="py-3 px-4 sm:px-6 text-left">
                  <input
                    type="checkbox"
                    checked={filteredSubmissions.length > 0 && selectedSubmissionIds.length === filteredSubmissions.length}
                    onChange={(e) => handleSelectAllSubmissions(e.target.checked)}
                    className="w-4 h-4 text-[#127EAB] rounded border-[#CCDCE1] focus:ring-[#127EAB] cursor-pointer"
                  />
                </th>
                <th className="text-left py-3 px-4 sm:px-6 text-[11px] sm:text-xs font-semibold text-[#1F4264] uppercase tracking-wider">Name</th>
                <th className="text-left py-3 px-4 sm:px-6 text-[11px] sm:text-xs font-semibold text-[#1F4264] uppercase tracking-wider">Email</th>
                <th className="text-left py-3 px-4 sm:px-6 text-[11px] sm:text-xs font-semibold text-[#1F4264] uppercase tracking-wider">Phone</th>
                <th className="text-left py-3 px-4 sm:px-6 text-[11px] sm:text-xs font-semibold text-[#1F4264] uppercase tracking-wider">Status</th>
                <th className="text-left py-3 px-4 sm:px-6 text-[11px] sm:text-xs font-semibold text-[#1F4264] uppercase tracking-wider">Submitted</th>
                <th className="text-right py-3 px-4 sm:px-6 text-[11px] sm:text-xs font-semibold text-[#1F4264] uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-[#E6F0F5]">
              {filteredSubmissions.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-12 text-[#6F7F8E] font-medium text-sm">No submissions found</td>
                </tr>
              ) : (
                filteredSubmissions.map((submission) => (
                  <tr key={submission._id} className="hover:bg-[#F4F9FB]/60 transition-colors">
                    <td className="py-3.5 px-4 sm:px-6">
                      <input
                        type="checkbox"
                        checked={selectedSubmissionIds.includes(submission._id)}
                        onChange={() => handleSelectSubmission(submission._id)}
                        className="w-4 h-4 text-[#127EAB] rounded border-[#CCDCE1] focus:ring-[#127EAB] cursor-pointer"
                      />
                    </td>
                    <td className="py-3.5 px-4 sm:px-6 text-sm text-[#1F4264] font-medium">{submission.name || '—'}</td>
                    <td className="py-3.5 px-4 sm:px-6 text-sm text-[#6F7F8E] font-medium">{submission.email || '—'}</td>
                    <td className="py-3.5 px-4 sm:px-6 text-sm text-[#6F7F8E] font-medium">{submission.phone || '—'}</td>
                    <td className="py-3.5 px-4 sm:px-6">
                      <Badge color={getStatusColor(submission.status)} size="sm">{submission.status}</Badge>
                    </td>
                    <td className="py-3.5 px-4 sm:px-6 text-sm text-[#6F7F8E] font-medium">
                      {format(new Date(submission.createdAt), 'MMM d, yyyy')}
                    </td>
                    <td className="py-3.5 px-4 sm:px-6 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleViewSubmission(submission)}
                          title="View Details"
                        >
                          <Eye className="w-4 h-4 text-[#127EAB]" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteSubmission(submission._id)}
                          className="text-[#EE6450] hover:text-[#D94F3C] hover:bg-[#FEF4F2]"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>

      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          setSelectedSubmission(null);
          setAdminNotes('');
        }}
        title={`${formTypeLabels[formType]} - Details`}
        size="lg"
      >
        {selectedSubmission && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-[#6F7F8E] uppercase tracking-wider block mb-1">Name</label>
                <p className="text-sm text-[#1F4264] font-semibold">{selectedSubmission.name || '—'}</p>
              </div>
              <div>
                <label className="text-xs font-semibold text-[#6F7F8E] uppercase tracking-wider block mb-1">Email</label>
                <p className="text-sm text-[#1F4264] font-semibold">{selectedSubmission.email || '—'}</p>
              </div>
              <div>
                <label className="text-xs font-semibold text-[#6F7F8E] uppercase tracking-wider block mb-1">Phone</label>
                <p className="text-sm text-[#1F4264] font-semibold">{selectedSubmission.phone || '—'}</p>
              </div>
              <div>
                <label className="text-xs font-semibold text-[#6F7F8E] uppercase tracking-wider block mb-1">Status</label>
                <div className="mt-1">
                  <Badge color={getStatusColor(selectedSubmission.status)} size="sm">{selectedSubmission.status}</Badge>
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-[#6F7F8E] uppercase tracking-wider block mb-1">Submitted</label>
                <p className="text-sm text-[#1F4264] font-semibold">
                  {format(new Date(selectedSubmission.createdAt), 'MMM d, yyyy h:mm a')}
                </p>
              </div>
            </div>

            <div className="border-t border-[#E6F0F5] pt-4">
              <h3 className="text-sm font-semibold text-[#1F4264] mb-3">Form Specific Details</h3>
              {renderFormDetails()}
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#1F4264] uppercase tracking-wider mb-2">Admin Notes</label>
              <textarea
                value={adminNotes}
                onChange={(e) => setAdminNotes(e.target.value)}
                rows={3}
                className="w-full px-3 py-2 text-sm border border-[#DCEAF0] rounded-xl focus:ring-2 focus:ring-[#127EAB]/20 focus:border-[#127EAB] bg-white text-[#1F4264] resize-none"
                placeholder="Add notes about this submission..."
              />
            </div>

            <div className="flex flex-wrap items-center justify-end gap-3 pt-6 border-t border-[#E6F0F5]">
              <Button
                variant="danger"
                onClick={() => {
                  if (window.confirm('Are you sure you want to delete this submission?')) {
                    handleDeleteSubmission(selectedSubmission._id);
                    setShowModal(false);
                  }
                }}
                leftIcon={<Trash2 className="w-4 h-4" />}
              >
                Delete
              </Button>
              <div className="flex-1" />
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleUpdateStatus('in-progress')}
                leftIcon={<Clock className="w-4 h-4" />}
              >
                In Progress
              </Button>
              <Button
                variant="success"
                size="sm"
                onClick={() => handleUpdateStatus('completed')}
                leftIcon={<CheckCircle className="w-4 h-4" />}
              >
                Complete
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => handleUpdateStatus('archived')}
                leftIcon={<Archive className="w-4 h-4" />}
              >
                Archive
              </Button>
            </div>
          </div>
        )}
      </Modal>

      <Modal
        isOpen={showRegisterModal}
        onClose={() => {
          setShowRegisterModal(false);
          setSelectedFriend(null);
          setOtpStep('send');
          setOtpCode('');
          setUserToRegister(null);
        }}
        title={`Register Friend: ${selectedFriend?.name || ''}`}
        size="md"
      >
        {selectedFriend && (
          <div className="space-y-4">
            <div className="bg-[#F8FBFC] p-4 rounded-xl border border-[#DCEAF0]">
              <p className="text-sm text-[#1F4264] font-medium">Email: {selectedFriend.email}</p>
              {selectedFriend.phone && <p className="text-sm text-[#6F7F8E] font-medium">Phone: {selectedFriend.phone}</p>}
            </div>

            {otpStep === 'send' && (
              <div className="space-y-4">
                <p className="text-sm text-[#6F7F8E] font-medium">
                  Send an OTP to {selectedFriend.email} to verify and register this friend.
                </p>
                <Button
                  variant="primary"
                  onClick={handleSendOTP}
                  disabled={sendingOtp}
                  leftIcon={<Mail className="w-4 h-4" />}
                  className="w-full"
                >
                  {sendingOtp ? 'Sending...' : 'Send OTP'}
                </Button>
              </div>
            )}

            {otpStep === 'verify' && (
              <div className="space-y-4">
                <p className="text-sm text-[#6F7F8E] font-medium">Enter the 6-digit OTP sent to the friend's email.</p>
                <input
                  type="text"
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  placeholder="000000"
                  className="w-full px-4 py-3 text-2xl text-center tracking-widest border border-[#DCEAF0] rounded-xl focus:ring-2 focus:ring-[#127EAB]/20 focus:border-[#127EAB] bg-white text-[#1F4264]"
                  maxLength={6}
                />
                <div className="flex gap-3">
                  <Button variant="outline" onClick={() => setOtpStep('send')} className="flex-1">Back</Button>
                  <Button
                    variant="primary"
                    onClick={handleVerifyOTP}
                    disabled={verifyingOtp || otpCode.length !== 6}
                    className="flex-1"
                  >
                    {verifyingOtp ? 'Verifying...' : 'Verify'}
                  </Button>
                </div>
              </div>
            )}

            {otpStep === 'register' && userToRegister && (
              <div className="space-y-4">
                <div className="bg-[#E9F7FA] border border-[#127EAB]/20 rounded-xl p-4">
                  <p className="text-sm text-[#127EAB] font-semibold">✓ OTP Verified</p>
                </div>
                <Button
                  variant="success"
                  onClick={handleCompleteRegistration}
                  disabled={registering}
                  leftIcon={<UserPlus className="w-4 h-4" />}
                  className="w-full"
                >
                  {registering ? 'Registering...' : 'Complete Registration'}
                </Button>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default FormsList;
