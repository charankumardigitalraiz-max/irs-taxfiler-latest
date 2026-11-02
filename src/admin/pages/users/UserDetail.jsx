import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Mail,
  Phone,
  Calendar,
  User,
  FileText,
  CreditCard,
  MessageSquare,
  Calculator,
  Send,
  Clock,
  Plus,
  UserPlus,
  Ticket,
  Trash2,
} from 'lucide-react';
import Header from '../../components/layout/Header';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';
import StatusBadge from '../../components/common/StatusBadge';
import WorkflowProgress from '../../components/workflow/WorkflowProgress';
import WorkflowActions from '../../components/workflow/WorkflowActions';
import UserTimeline from '../../components/users/UserTimeline';
import UserInfoSidebar from '../../components/users/UserInfoSidebar';
import DocumentList from '../../components/documents/DocumentList';
import DocumentUpload from '../../components/documents/DocumentUpload';
import TaxPreparationPhases from '../../components/preparation/TaxPreparationPhases';
import FilingManager from '../../components/filing/FilingManager';
import ScheduleModal from '../../components/scheduling/ScheduleModal';
import { useWorkflow } from '../../hooks/useWorkflow';
import { format } from 'date-fns';
import { useToast } from '../../hooks/useToast';
import { userService } from '../../services/userService';
import { referralService } from '../../services/referralService';
import { couponService } from '../../services/couponService';
import { documentService } from '../../services/documentService';
import { meetingService } from '../../services/meetingService';
import { baseUrl as backendBaseUrl } from '../../../baseurl';

// Mock user data
const mockUser = {
  id: 'USR-2024-001234',
  fullName: 'John Doe',
  email: 'john.doe@example.com',
  phone: '+1 234 567 8900',
  currentStatus: 'DOCUMENT_PENDING',
  assignedStaff: { id: '1', fullName: 'Admin User' },
  createdAt: '2024-01-15T10:30:00Z',
};

const mockHistory = [
  {
    id: '3',
    fromStatus: 'INTERVIEW_COMPLETED',
    toStatus: 'DOCUMENT_PENDING',
    notes: 'Documents requested from client',
    createdAt: '2024-01-16T14:30:00Z',
    changedBy: 'Admin User',
    isOverride: false,
  },
  {
    id: '2',
    fromStatus: 'INTERVIEW_PENDING',
    toStatus: 'INTERVIEW_COMPLETED',
    notes: 'Interview conducted via video call',
    createdAt: '2024-01-16T11:00:00Z',
    changedBy: 'Tax Consultant',
    isOverride: false,
  },
  {
    id: '1',
    fromStatus: null,
    toStatus: 'PERSONAL_INFO',
    notes: 'User completed personal information',
    createdAt: '2024-01-15T10:30:00Z',
    changedBy: 'System',
    isOverride: false,
  },
];

const mockDocuments = [
  {
    id: '1',
    fileName: 'W2_2023.pdf',
    documentType: 'W2',
    fileSize: 245000,
    status: 'PENDING',
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    fileName: 'ID_Proof.jpg',
    documentType: 'ID_PROOF',
    fileSize: 1200000,
    status: 'APPROVED',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
];

const mockMeetings = [
  {
    id: '1',
    scheduledAt: new Date(Date.now() + 86400000).toISOString(),
    duration: 30,
    status: 'PENDING',
    meetingType: 'Consultation',
    assignedStaff: { fullName: 'Admin User' },
  },
];

const mockPayments = [
  {
    id: '1',
    amount: 250,
    currency: 'USD',
    status: 'PENDING',
    createdAt: new Date().toISOString(),
  },
];

const mockTaxPrep = {
  grossIncome: '75000',
  deductions: '12500',
  taxPaid: '10750',
  additionalDeductions: '',
  adjustments: '',
  finalNotes: '',
  phase1Completed: false,
  phase2Completed: false,
  summarySentAt: null,
  clientApprovedPhase1: false,
  finalSentAt: null,
  clientApprovedFinal: false,
  isLocked: false,
};

const mockFiling = null;

const mockStaff = [
  { id: '1', fullName: 'Admin User' },
  { id: '2', fullName: 'Tax Consultant' },
];

const UserDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { initializeUser, currentStatus, workflowHistory } = useWorkflow();
  const { showSuccess, showError, showInfo } = useToast();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [newNote, setNewNote] = useState('');
  const [activeTab, setActiveTab] = useState('overview');
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectReason, setRejectReason] = useState('');
  const [selectedDocId, setSelectedDocId] = useState(null);

  // Modal states
  const [showDocumentModal, setShowDocumentModal] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);

  // Data states
  const [documents, setDocuments] = useState([]);
  const [meetings, setMeetings] = useState([]);
  const [payments, setPayments] = useState([]);
  const [taxPrep, setTaxPrep] = useState(null);
  const [filing, setFiling] = useState(null);
  const [referralData, setReferralData] = useState(null);
  const [couponData, setCouponData] = useState(null);
  const [timelineData, setTimelineData] = useState([]);
  const [loadingReferral, setLoadingReferral] = useState(false);
  const [loadingCoupon, setLoadingCoupon] = useState(false);
  const [loadingDocuments, setLoadingDocuments] = useState(false);
  const [loadingMeetings, setLoadingMeetings] = useState(false);
  const [loadingTimeline, setLoadingTimeline] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteUser = async () => {
    if (!window.confirm('Are you sure you want to delete this user? All associated data will be removed.')) return;

    setIsDeleting(true);
    try {
      const response = await userService.deleteUser(user.id);
      if (response.success) {
        showSuccess('User deleted successfully');
        navigate('/users');
      } else {
        showError(response.message || 'Failed to delete user');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      showError('Failed to delete user');
    } finally {
      setIsDeleting(false);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      setIsLoading(true);
      try {
        const response = await userService.getUserById(id);
        if (response.success) {
          const userData = response.data;
          setUser({
            id: userData._id,
            userId: userData.userId,
            fullName: userData.fullName,
            firstName: userData.firstName,
            middleName: userData.middleName,
            lastName: userData.lastName,
            email: userData.email,
            phone: userData.mobileNumber,
            currentStatus: userData.currentStatus || 'PERSONAL_INFO',
            assignedStaff: userData.assignedStaff,
            createdAt: userData.createdAt,
            referralCode: userData.referralCode,
            couponCode: userData.couponCode,
            personalInfo: userData.personalInfo,
            ...userData, // Include all other fields
          });
          setTaxPrep(userData.taxPreparation);
          initializeUser(userData._id, userData.currentStatus || 'PERSONAL_INFO', userData.workflowHistory || []);
        } else {
          showError('Failed to load user data');
        }
      } catch (error) {
        console.error('Error fetching user:', error);
        showError('Failed to load user data');
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchUser();
    }
  }, [id]);

  // Fetch documents
  useEffect(() => {
    const fetchDocuments = async () => {
      if (!user?.id) return;
      setLoadingDocuments(true);
      try {
        const response = await documentService.getDocumentsByUser(user.id);
        if (response.success) {
          // Map documents to include uploadedBy field
          const mappedDocs = (response.data || []).map(doc => ({
            ...doc,
            id: doc._id || doc.id,
            uploadedBy: doc.uploadedBy || 'client', // Default to 'client' if not set
          }));
          setDocuments(mappedDocs);
        } else {
          setDocuments([]);
        }
      } catch (error) {
        console.error('Error fetching documents:', error);
        setDocuments([]);
      } finally {
        setLoadingDocuments(false);
      }
    };

    if (user?.id) {
      fetchDocuments();
    }
  }, [user?.id]);

  // Fetch meetings
  useEffect(() => {
    const fetchMeetings = async () => {
      if (!user?.id) return;
      setLoadingMeetings(true);
      try {
        const response = await meetingService.getMeetings({ userId: user.id });
        if (response.success) {
          setMeetings(response.data || []);
        } else {
          setMeetings([]);
        }
      } catch (error) {
        console.error('Error fetching meetings:', error);
        setMeetings([]);
      } finally {
        setLoadingMeetings(false);
      }
    };

    if (user?.id) {
      fetchMeetings();
    }
  }, [user?.id]);

  // Fetch timeline
  useEffect(() => {
    const fetchTimeline = async () => {
      if (!user?.id) return;
      setLoadingTimeline(true);
      try {
        const response = await userService.getUserTimeline(user.id);
        if (response.success) {
          setTimelineData(response.data || []);
        } else {
          setTimelineData([]);
        }
      } catch (error) {
        console.error('Error fetching timeline:', error);
        setTimelineData([]);
      } finally {
        setLoadingTimeline(false);
      }
    };

    if (user?.id) {
      fetchTimeline();
    }
  }, [user?.id]);

  // Fetch referral data
  useEffect(() => {
    const fetchReferralData = async () => {
      if (!user?.userId && !user?.id) return;
      setLoadingReferral(true);
      try {
        const response = await referralService.getReferrals();
        if (response.success && response.data && response.data.length > 0) {
          // Find referral for this user by userId or user id
          const userReferral = response.data.find(
            r => r.referrerId === user.userId || r.referrer?.userId === user.userId
          );
          if (userReferral) {
            setReferralData(userReferral);
          } else {
            // If no referral found, create a basic structure with the user's userId as referral code
            setReferralData({
              referralCode: user.userId || user.referralCode,
              referredFriends: [],
              totalReferrals: 0,
              successfulReferrals: 0,
              totalRewardsEarned: 0,
            });
          }
        } else {
          // If no referrals exist, still show the referral code
          setReferralData({
            referralCode: user.userId || user.referralCode,
            referredFriends: [],
            totalReferrals: 0,
            successfulReferrals: 0,
            totalRewardsEarned: 0,
          });
        }
      } catch (error) {
        console.error('Error fetching referral data:', error);
        // Still show referral code even if API fails
        setReferralData({
          referralCode: user?.userId || user?.referralCode,
          referredFriends: [],
          totalReferrals: 0,
          successfulReferrals: 0,
          totalRewardsEarned: 0,
        });
      } finally {
        setLoadingReferral(false);
      }
    };

    if (user?.userId || user?.id) {
      fetchReferralData();
    }
  }, [user?.userId, user?.id]);

  // Fetch coupon data
  useEffect(() => {
    const fetchCouponData = async () => {
      if (!user?.couponCode) {
        setCouponData(null);
        return;
      }
      setLoadingCoupon(true);
      try {
        const response = await couponService.getCoupons({ code: user.couponCode });
        if (response.success && response.data && response.data.length > 0) {
          setCouponData(response.data[0]);
        } else {
          setCouponData(null);
        }
      } catch (error) {
        console.error('Error fetching coupon data:', error);
        setCouponData(null);
      } finally {
        setLoadingCoupon(false);
      }
    };

    if (user?.couponCode) {
      fetchCouponData();
    }
  }, [user?.couponCode]);

  const handleDocumentApprove = async (docId) => {
    try {
      const response = await documentService.updateStatus(docId, 'APPROVED');
      if (response.success) {
        showSuccess('Document approved successfully');
        // Refresh documents
        const docsResponse = await documentService.getDocumentsByUser(user.id);
        if (docsResponse.success) {
          const mappedDocs = (docsResponse.data || []).map(doc => ({
            ...doc,
            id: doc._id || doc.id,
            uploadedBy: doc.uploadedBy || 'client',
          }));
          setDocuments(mappedDocs);
        }
      } else {
        showError(response.message || 'Failed to approve document');
      }
    } catch (error) {
      console.error('Error approving document:', error);
      showError('Failed to approve document');
    }
  };

  const handleDocumentReject = (docId) => {
    setSelectedDocId(docId);
    setShowRejectModal(true);
    setRejectReason('');
  };

  const handleConfirmReject = async () => {
    if (!rejectReason.trim()) {
      showError('Please provide a rejection reason');
      return;
    }
    try {
      const response = await documentService.updateStatus(selectedDocId, 'REJECTED', rejectReason);
      if (response.success) {
        showSuccess('Document rejected successfully');
        // Refresh documents
        const docsResponse = await documentService.getDocumentsByUser(user.id);
        if (docsResponse.success) {
          const mappedDocs = (docsResponse.data || []).map(doc => ({
            ...doc,
            id: doc._id || doc.id,
            uploadedBy: doc.uploadedBy || 'client',
          }));
          setDocuments(mappedDocs);
        }
        setShowRejectModal(false);
        setRejectReason('');
        setSelectedDocId(null);
      } else {
        showError(response.message || 'Failed to reject document');
      }
    } catch (error) {
      console.error('Error rejecting document:', error);
      showError('Failed to reject document');
    }
  };

  // Helper function to get full document URL
  const getDocumentUrl = (filePath) => {
    if (!filePath) return null;
    // Check if it's already a full URL (e.g., Cloudinary URL)
    if (filePath.startsWith('http://') || filePath.startsWith('https://')) {
      return filePath;
    }
    // Otherwise, prepend the base URL for local files
    if (filePath.startsWith('/')) {
      return `${backendBaseUrl}${filePath}`;
    }
    return `${backendBaseUrl}/${filePath}`;
  };

  const handleDocumentUpload = async (data) => {
    try {
      // Use data.userId if provided (from filing section), otherwise use user.id
      const targetUserId = data.userId || user?.id;

      if (!targetUserId) {
        showError('User ID is required for document upload');
        return;
      }

      if (!data.file) {
        showError('File is required for upload');
        return;
      }

      console.log('Uploading document:', {
        userId: targetUserId,
        documentType: data.documentType || 'OTHER',
        fileName: data.file.name,
        fileSize: data.file.size,
      });

      const response = await documentService.createDocument({
        userId: targetUserId,
        documentType: data.documentType || 'OTHER',
        file: data.file,
      });

      console.log('Upload response:', response);

      if (response && response.success !== false) {
        // Success - API client interceptor will show success message
        // Refresh documents list
        try {
          const docsResponse = await documentService.getDocumentsByUser(targetUserId);
          if (docsResponse && docsResponse.success !== false) {
            const mappedDocs = (docsResponse.data || []).map(doc => ({
              ...doc,
              id: doc._id || doc.id,
              uploadedBy: doc.uploadedBy || 'client',
            }));
            setDocuments(mappedDocs);
          }
        } catch (refreshError) {
          console.error('Error refreshing documents:', refreshError);
          // Don't show error for refresh failure, upload was successful
        }

        // Only close modal if it's open (for filing section, modal might not be used)
        if (showDocumentModal) {
          setShowDocumentModal(false);
        }
      } else {
        const errorMsg = response?.message || 'Failed to upload document';
        showError(errorMsg);
      }
    } catch (error) {
      console.error('Error uploading document:', error);
      console.error('Error details:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });

      // API client interceptor will show error toast, but we can add more specific handling
      const errorMessage = error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        'Failed to upload document. Please check the file and try again.';

      // Only show error if interceptor didn't already show it
      if (!error.response || error.response.status !== 401) {
        showError(errorMessage);
      }
    }
  };

  const handleScheduleMeeting = async (data) => {
    try {
      const response = await meetingService.createMeeting({
        ...data,
        userId: user.id,
      });
      if (response.success) {
        showSuccess('Meeting scheduled successfully');
        // Refresh meetings
        const meetingsResponse = await meetingService.getMeetings({ userId: user.id });
        if (meetingsResponse.success) {
          setMeetings(meetingsResponse.data || []);
        }
        setShowScheduleModal(false);
      } else {
        showError(response.message || 'Failed to schedule meeting');
      }
    } catch (error) {
      console.error('Error scheduling meeting:', error);
      showError('Failed to schedule meeting');
    }
  };

  // Phase 1 handlers
  const handleSavePhase1 = async (data) => {
    try {
      const response = await userService.updateTaxPreparation(user.id, data);
      if (response.success) {
        setTaxPrep(response.data);
        showSuccess('Tax preparation saved successfully!');
      } else {
        showError(response.message || 'Failed to save tax preparation');
      }
    } catch (error) {
      console.error('Error saving tax prep:', error);
      showError('Failed to save tax preparation');
    }
  };

  const handleSendSummaryPhase1 = () => {
    setTaxPrep((prev) => ({
      ...prev,
      phase1Completed: true,
      summarySentAt: new Date().toISOString(),
    }));
    showSuccess('Summary sent to client for Phase 1 review!');
  };

  const handleClientApprovePhase1 = () => {
    setTaxPrep((prev) => ({ ...prev, clientApprovedPhase1: true }));
    showSuccess('Client approved Phase 1!');
  };

  // Phase 2 handlers
  const handleSavePhase2 = async (data) => {
    try {
      const response = await userService.updateTaxPreparation(user.id, data);
      if (response.success) {
        setTaxPrep(response.data);
        showSuccess('Tax preparation saved successfully!');
      } else {
        showError(response.message || 'Failed to save tax preparation');
      }
    } catch (error) {
      console.error('Error saving tax prep:', error);
      showError('Failed to save tax preparation');
    }
  };

  const handleSendFinalPhase2 = () => {
    setTaxPrep((prev) => ({
      ...prev,
      phase2Completed: true,
      finalSentAt: new Date().toISOString(),
    }));
    showSuccess('Final summary sent to client for final review!');
  };

  const handleClientApproveFinal = () => {
    setTaxPrep((prev) => ({ ...prev, clientApprovedFinal: true }));
    showSuccess('Client approved final preparation!');
  };

  const handleLockPreparation = () => {
    setTaxPrep((prev) => ({ ...prev, isLocked: true }));
    showSuccess('Tax preparation locked. Ready for filing!');
  };

  const handleSelectFilingType = (type) => {
    setFiling({ filingType: type });
  };

  const handleSubmitEFiling = () => {
    setFiling((prev) => ({
      ...prev,
      submissionDate: new Date().toISOString(),
      confirmationNumber: `EF-${Date.now()}`,
      acceptanceStatus: 'PENDING',
    }));
  };

  const handleUpdateFilingStatus = (status) => {
    setFiling((prev) => ({
      ...prev,
      acceptanceStatus: status,
      acceptanceDate: status === 'ACCEPTED' ? new Date().toISOString() : null,
    }));
  };

  const handleCompletePaperFiling = () => {
    setFiling((prev) => ({
      ...prev,
      paperFilingConfirmed: true,
      paperFilingConfirmedAt: new Date().toISOString(),
    }));
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500">User not found</p>
      </div>
    );
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: User },
    { id: 'documents', label: 'Documents', icon: FileText, count: documents.length },
    { id: 'meetings', label: 'Meetings', icon: Calendar, count: meetings.length },

    { id: 'preparation', label: 'Tax Prep', icon: Calculator },
    { id: 'payments', label: 'Payments', icon: CreditCard, count: payments.length },
    { id: 'filing', label: 'Filing', icon: Send },

    { id: 'referrals', label: 'Referrals', icon: UserPlus, count: referralData?.totalReferrals || 0 },
    { id: 'coupons', label: 'Coupons', icon: Ticket, count: user?.couponCode ? 1 : 0 },
    { id: 'timeline', label: 'Timeline', icon: Clock, count: timelineData.length },

  ];

  return (
    <div>
      <Header
        title={user.fullName || `${user.firstName || ''} ${user.lastName || ''}`.trim() || 'User'}
        subtitle={`User ID: ${user.userId || user.id}`}
        actions={
          <div className="flex gap-2">
            <Button
              variant="secondary"
              leftIcon={<ArrowLeft className="w-4 h-4" />}
              onClick={() => navigate('/users')}
              className="w-full sm:w-auto"
            >
              <span className="hidden sm:inline">Back to Users</span>
              <span className="sm:hidden">Back</span>
            </Button>
            <Button
              variant="danger"
              leftIcon={<Trash2 className="w-4 h-4" />}
              onClick={handleDeleteUser}
              isLoading={isDeleting}
              className="w-full sm:w-auto"
            >
              <span className="hidden sm:inline">Delete User</span>
              <span className="sm:hidden">Delete</span>
            </Button>
          </div>
        }
      />

      <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
        {/* Progress */}
        <Card>
          <Card.Header>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
              <div>
                <Card.Title>Case Progress</Card.Title>
                <Card.Description>Current workflow status and progress</Card.Description>
              </div>
              <StatusBadge status={currentStatus || user.currentStatus} size="lg" />
            </div>
          </Card.Header>
          <Card.Content>
            <WorkflowProgress
              currentStatus={currentStatus || user.currentStatus}
              isPersonalInfoComplete={(() => {
                if (!user) {
                  return false;
                }

                // Check if all 7 account information sections are complete (matching client dashboard logic)

                // 1. Taxpayer Profile
                const hasTaxpayerProfile = user.firstName &&
                  String(user.firstName).trim().length > 0 &&
                  user.lastName &&
                  String(user.lastName).trim().length > 0 &&
                  user.personalInfo?.ssn &&
                  String(user.personalInfo.ssn).trim().length > 0;

                // 2. Spouse Details
                const hasSpouseDetails = user.spouseInfo?.fullName &&
                  String(user.spouseInfo.fullName).trim().length > 0;

                // 3. Dependent Details
                const hasDependentDetails = user.dependents &&
                  Array.isArray(user.dependents) &&
                  user.dependents.length > 0;

                // 4. Address
                const hasAddress = user.address?.street &&
                  String(user.address.street).trim().length > 0 &&
                  user.address?.city &&
                  String(user.address.city).trim().length > 0;

                // 5. Contact Information
                const hasContactInfo = user.email &&
                  String(user.email).trim().length > 0 &&
                  user.mobileNumber &&
                  String(user.mobileNumber).trim().length > 0;

                // 6. Identity Verification
                const hasIdentityVerification = user.identityVerification?.licenseNumber &&
                  String(user.identityVerification.licenseNumber).trim().length > 0 &&
                  user.identityVerification?.stateOfIssue &&
                  String(user.identityVerification.stateOfIssue).trim().length > 0;

                // 7. Bank Details
                const hasBankDetails = user.bankDetails?.bankName &&
                  String(user.bankDetails.bankName).trim().length > 0 &&
                  user.bankDetails?.accountNumber &&
                  String(user.bankDetails.accountNumber).trim().length > 0;

                const isComplete = hasTaxpayerProfile && hasSpouseDetails && hasDependentDetails &&
                  hasAddress && hasContactInfo && hasIdentityVerification && hasBankDetails;

                // Debug log (can be removed later)
                if (process.env.NODE_ENV === 'development') {
                  console.log('Admin All Sections Check:', {
                    hasTaxpayerProfile,
                    hasSpouseDetails,
                    hasDependentDetails,
                    hasAddress,
                    hasContactInfo,
                    hasIdentityVerification,
                    hasBankDetails,
                    isComplete,
                  });
                }

                return isComplete;
              })()}
            />
          </Card.Content>
        </Card>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-4 sm:space-x-8 overflow-x-auto scrollbar-hide -mx-4 sm:mx-0 px-4 sm:px-0">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-1.5 sm:gap-2 py-3 sm:py-4 px-1 border-b-2 font-medium text-xs sm:text-sm whitespace-nowrap transition-colors ${activeTab === tab.id
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                >
                  <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                  <span className="hidden sm:inline">{tab.label}</span>
                  <span className="sm:hidden">{tab.label.split(' ')[0]}</span>
                  {tab.count !== undefined && (
                    <span className="bg-gray-100 text-gray-600 px-1.5 sm:px-2 py-0.5 rounded-full text-xs">
                      {tab.count}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
            {/* User Info Sidebar - Left side with sections, forms on right */}
            <div className="lg:col-span-2">
              <UserInfoSidebar
                user={user}
                documents={documents}
                onSave={async (data) => {
                  try {
                    // Format the data to match the backend registerUser endpoint format
                    // Required fields: firstName, lastName, email, phone
                    const updateData = {
                      firstName: data.firstName || user.firstName || '',
                      lastName: data.lastName || user.lastName || '',
                      middleName: data.middleName || user.middleName || '',
                      email: user.email || '', // Use existing email
                      phone: data.phone || user.mobileNumber || user.phone || '',
                      ssn: data.ssn || '',
                      dob: data.dob || (user.personalInfo?.dateOfBirth ? new Date(user.personalInfo.dateOfBirth).toISOString().split('T')[0] : ''),
                      occupation: data.occupation || '',
                      filingStatus: data.filingStatus || '',
                      // Spouse info - split fullName into firstName, lastName, middleName
                      ...(data.spouseFullName ? (() => {
                        const spouseNames = data.spouseFullName.trim().split(/\s+/);
                        return {
                          spouseFirstName: spouseNames[0] || '',
                          spouseLastName: spouseNames[spouseNames.length - 1] || '',
                          spouseMiddleName: spouseNames.length > 2 ? spouseNames.slice(1, -1).join(' ') : '',
                          spouseSSN: data.spouseSSN || '',
                          spouseDOB: data.spouseDOB || '',
                          spouseOccupation: data.spouseOccupation || '',
                        };
                      })() : {}),
                      // Dependents - format as expected by backend
                      dependents: (data.dependents || []).map(dep => ({
                        firstName: dep.name ? dep.name.split(' ')[0] : '',
                        lastName: dep.name ? dep.name.split(' ').slice(1).join(' ') : '',
                        ssn: dep.ssn || '',
                        dob: dep.dateOfBirth || '',
                        relationship: dep.relationship || '',
                      })),
                      // Address
                      street: data.street || '',
                      city: data.city || '',
                      state: data.state || '',
                      zipCode: data.zipCode || '',
                      country: data.country || 'USA',
                      // Bank details
                      bankName: data.bankName || '',
                      accountType: data.accountType || '',
                      routingNumber: data.routingNumber || '',
                      accountNumber: data.accountNumber || '',
                    };

                    // Remove empty strings for optional fields, but keep middleName and other name fields
                    Object.keys(updateData).forEach(key => {
                      if (updateData[key] === '' || updateData[key] === null || updateData[key] === undefined) {
                        // Keep required fields and name-related fields (middleName is used to construct fullName)
                        if (!['firstName', 'lastName', 'middleName', 'email', 'phone'].includes(key)) {
                          delete updateData[key];
                        }
                      }
                    });

                    // Ensure middleName is always sent (even if empty) so fullName can be constructed correctly
                    if (updateData.middleName === undefined) {
                      updateData.middleName = data.middleName || user.middleName || '';
                    }

                    // Use the register endpoint which handles updates
                    const response = await userService.registerUser(user.id, updateData);

                    if (response.success) {
                      showSuccess('User information saved successfully!');
                      // Refresh user data
                      const userResponse = await userService.getUserById(user.id);
                      if (userResponse.success) {
                        const userData = userResponse.data;
                        setUser({
                          ...user,
                          ...userData,
                          id: userData._id,
                          phone: userData.mobileNumber,
                          personalInfo: userData.personalInfo,
                          spouseInfo: userData.spouseInfo,
                          dependents: userData.dependents,
                          address: userData.address,
                          bankDetails: userData.bankDetails,
                          identityVerification: userData.identityVerification,
                        });
                      }
                    } else {
                      showError(response.message || 'Failed to save user information');
                    }
                  } catch (error) {
                    console.error('Error saving user info:', error);
                    const errorMessage = error.response?.data?.message || error.message || 'Failed to save user information';
                    showError(errorMessage);
                  }
                }}
              />
            </div>

            {/* Workflow Actions */}
            <div>
              <Card>
                <Card.Header>
                  <Card.Title>Workflow Actions</Card.Title>
                  <Card.Description>Advance the case to the next stage</Card.Description>
                </Card.Header>
                <Card.Content>
                  <WorkflowActions userId={user.id} />
                </Card.Content>
              </Card>
            </div>
          </div>
        )}

        {activeTab === 'documents' && (
          <div>
            {/* Show empty state if no documents at all */}
            {documents.length === 0 ? (
              <Card>
                <Card.Header>
                  <div className="flex items-center justify-between">
                    <div>
                      <Card.Title>Documents</Card.Title>
                      <Card.Description>Manage user documents</Card.Description>
                    </div>
                    <Button
                      leftIcon={<Plus className="w-4 h-4" />}
                      onClick={() => setShowDocumentModal(true)}
                    >
                      Upload Document
                    </Button>
                  </div>
                </Card.Header>
                <Card.Content>
                  <div className="text-center py-12 text-gray-500">
                    <FileText className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                    <p>No documents found</p>
                    <p className="text-sm text-gray-400 mt-2">
                      Upload a document to get started
                    </p>
                  </div>
                </Card.Content>
              </Card>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                {/* User Uploaded Documents */}
                <Card>
                  <Card.Header>
                    <div>
                      <Card.Title>Documents Uploaded by User</Card.Title>
                      <Card.Description>
                        Documents uploaded by the client ({documents.filter(doc => doc.uploadedBy === 'client' || !doc.uploadedBy).length})
                      </Card.Description>
                    </div>
                  </Card.Header>
                  <Card.Content>
                    {(() => {
                      const userDocuments = documents.filter(doc =>
                        doc.uploadedBy === 'client' || !doc.uploadedBy
                      );

                      if (userDocuments.length > 0) {
                        return (
                          <DocumentList
                            documents={userDocuments.map(doc => ({
                              ...doc,
                              id: doc._id || doc.id,
                            }))}
                            showUserColumn={false}
                            onApprove={handleDocumentApprove}
                            onReject={handleDocumentReject}
                            onDownload={async (doc) => {
                              try {
                                if (!doc.filePath) {
                                  showError('No file URL available for this document.');
                                  return false;
                                }
                                const fileUrl = getDocumentUrl(doc.filePath);
                                if (fileUrl) {
                                  // Fetch the file as a blob to handle CORS and ensure download works
                                  const response = await fetch(fileUrl);
                                  if (!response.ok) {
                                    throw new Error('Failed to fetch file');
                                  }
                                  const blob = await response.blob();
                                  const blobUrl = URL.createObjectURL(blob);

                                  // Create download link
                                  const a = document.createElement('a');
                                  a.href = blobUrl;
                                  a.download = doc.fileName || 'document';
                                  document.body.appendChild(a);
                                  a.click();
                                  document.body.removeChild(a);

                                  // Clean up blob URL after a delay
                                  setTimeout(() => URL.revokeObjectURL(blobUrl), 100);
                                  return true;
                                } else {
                                  showError('Unable to generate download URL.');
                                  return false;
                                }
                              } catch (error) {
                                console.error('Download error:', error);
                                showError('Failed to download file. Please try again.');
                                return false;
                              }
                            }}
                            onPreview={(doc) => {
                              if (!doc.filePath) {
                                showError('No file URL available for this document.');
                                return;
                              }
                              const fileUrl = getDocumentUrl(doc.filePath);
                              if (fileUrl) {
                                window.open(fileUrl, '_blank', 'noopener,noreferrer');
                              } else {
                                showError('Unable to generate preview URL.');
                              }
                            }}
                            onDelete={(id) => setDocuments((prev) => prev.filter((d) => (d._id || d.id) !== id))}
                          />
                        );
                      }
                      return (
                        <div className="text-center py-8 text-gray-500">
                          <FileText className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                          <p>No documents uploaded by user yet</p>
                        </div>
                      );
                    })()}
                  </Card.Content>
                </Card>

                {/* Admin Uploaded Documents */}
                <Card className="border-2 border-blue-200 bg-blue-50/30">
                  <Card.Header>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div>
                          <Card.Title>Documents Uploaded by Admin</Card.Title>
                          <Card.Description>
                            Documents uploaded by admin staff ({documents.filter(doc => doc.uploadedBy === 'admin').length})
                          </Card.Description>
                        </div>
                        {documents.filter(doc => doc.uploadedBy === 'admin').length > 0 && (
                          <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded">
                            Admin Upload
                          </span>
                        )}
                      </div>
                      <Button
                        leftIcon={<Plus className="w-4 h-4" />}
                        onClick={() => setShowDocumentModal(true)}
                        size="sm"
                      >
                        Upload
                      </Button>
                    </div>
                  </Card.Header>
                  <Card.Content>
                    {(() => {
                      const adminDocuments = documents.filter(doc =>
                        doc.uploadedBy === 'admin'
                      );

                      if (adminDocuments.length > 0) {
                        return (
                          <DocumentList
                            documents={adminDocuments.map(doc => ({
                              ...doc,
                              id: doc._id || doc.id,
                            }))}
                            showUserColumn={false}
                            onApprove={handleDocumentApprove}
                            onReject={handleDocumentReject}
                            onDownload={async (doc) => {
                              try {
                                if (!doc.filePath) {
                                  showError('No file URL available for this document.');
                                  return false;
                                }
                                const fileUrl = getDocumentUrl(doc.filePath);
                                if (fileUrl) {
                                  // Fetch the file as a blob to handle CORS and ensure download works
                                  const response = await fetch(fileUrl);
                                  if (!response.ok) {
                                    throw new Error('Failed to fetch file');
                                  }
                                  const blob = await response.blob();
                                  const blobUrl = URL.createObjectURL(blob);

                                  // Create download link
                                  const a = document.createElement('a');
                                  a.href = blobUrl;
                                  a.download = doc.fileName || 'document';
                                  document.body.appendChild(a);
                                  a.click();
                                  document.body.removeChild(a);

                                  // Clean up blob URL after a delay
                                  setTimeout(() => URL.revokeObjectURL(blobUrl), 100);
                                  return true;
                                } else {
                                  showError('Unable to generate download URL.');
                                  return false;
                                }
                              } catch (error) {
                                console.error('Download error:', error);
                                showError('Failed to download file. Please try again.');
                                return false;
                              }
                            }}
                            onPreview={(doc) => {
                              if (!doc.filePath) {
                                showError('No file URL available for this document.');
                                return;
                              }
                              const fileUrl = getDocumentUrl(doc.filePath);
                              if (fileUrl) {
                                window.open(fileUrl, '_blank', 'noopener,noreferrer');
                              } else {
                                showError('Unable to generate preview URL.');
                              }
                            }}
                            onDelete={(id) => setDocuments((prev) => prev.filter((d) => (d._id || d.id) !== id))}
                          />
                        );
                      }
                      return (
                        <div className="text-center py-8 text-gray-500">
                          <FileText className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                          <p>No documents uploaded by admin yet</p>
                          <p className="text-sm text-gray-400 mt-2">
                            Click "Upload" to add a document
                          </p>
                        </div>
                      );
                    })()}
                  </Card.Content>
                </Card>
              </div>
            )}
          </div>
        )}

        {activeTab === 'meetings' && (
          <Card>
            <Card.Header>
              <div className="flex items-center justify-between">
                <div>
                  <Card.Title>Meetings</Card.Title>
                  <Card.Description>Scheduled consultations and interviews</Card.Description>
                </div>
                <Button
                  leftIcon={<Plus className="w-4 h-4" />}
                  onClick={() => setShowScheduleModal(true)}
                >
                  Schedule Call
                </Button>
              </div>
            </Card.Header>
            <Card.Content>
              {loadingMeetings ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto" />
                </div>
              ) : meetings.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  No meetings scheduled
                </div>
              ) : (
                <div className="space-y-4">
                  {meetings.map((meeting) => (
                    <div
                      key={meeting._id || meeting.id}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                    >
                      <div>
                        <p className="font-medium text-gray-900">{meeting.meetingType || 'Consultation'}</p>
                        <p className="text-sm text-gray-500">
                          {meeting.scheduledAt ? format(new Date(meeting.scheduledAt), 'MMM d, yyyy h:mm a') : 'Date TBD'} •{' '}
                          {meeting.duration || 30} min
                        </p>
                        {meeting.assignedStaff && (
                          <p className="text-sm text-gray-500">
                            Assigned: {meeting.assignedStaff?.fullName || 'Unassigned'}
                          </p>
                        )}
                        {meeting.notes && (
                          <p className="text-sm text-gray-600 mt-1">{meeting.notes}</p>
                        )}
                      </div>
                      <StatusBadge status={meeting.status === 'PENDING' ? 'MEETING_SCHEDULED' : meeting.status === 'COMPLETED' ? 'INTERVIEW_COMPLETED' : 'MEETING_SCHEDULED'} />
                    </div>
                  ))}
                </div>
              )}
            </Card.Content>
          </Card>
        )}

        {activeTab === 'preparation' && (
          <TaxPreparationPhases
            taxPrep={taxPrep}
            documents={documents}
            currentWorkflowStatus={currentStatus || user.currentStatus}
            onSavePhase1={handleSavePhase1}
            onSendSummaryPhase1={handleSendSummaryPhase1}
            onClientApprovePhase1={handleClientApprovePhase1}
            onSavePhase2={handleSavePhase2}
            onSendFinalPhase2={handleSendFinalPhase2}
            onClientApproveFinal={handleClientApproveFinal}
            onLockPreparation={handleLockPreparation}
            onViewFile={(doc) => {
              if (!doc.filePath) {
                showError('No file URL available for this document.');
                return;
              }
              const fileUrl = getDocumentUrl(doc.filePath);
              if (fileUrl) {
                window.open(fileUrl, '_blank', 'noopener,noreferrer');
              } else {
                showError('Unable to generate preview URL.');
              }
            }}
            onDeleteFile={async (id) => {
              if (window.confirm('Are you sure you want to delete this document?')) {
                try {
                  const response = await documentService.deleteDocument(id);
                  if (response.success) {
                    showSuccess('Document deleted successfully');
                    setDocuments((prev) => prev.filter((d) => (d._id || d.id) !== id));
                  } else {
                    showError(response.message || 'Failed to delete document');
                  }
                } catch (error) {
                  console.error('Error deleting document:', error);
                  showError('Failed to delete document');
                }
              }
            }}
          />
        )}

        {activeTab === 'payments' && (
          <Card>
            <Card.Header>
              <Card.Title>Payments</Card.Title>
              <Card.Description>Payment history and status</Card.Description>
            </Card.Header>
            <Card.Content>
              {payments.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <CreditCard className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                  <p>No payments recorded</p>
                  <p className="text-xs text-gray-400 mt-2">Payment tracking will be available soon</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {payments.map((payment) => (
                    <div
                      key={payment._id || payment.id}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                    >
                      <div>
                        <p className="font-medium text-gray-900">
                          ${(payment.amount || 0).toLocaleString()} {payment.currency || 'USD'}
                        </p>
                        <p className="text-sm text-gray-500">
                          {payment.createdAt ? format(new Date(payment.createdAt), 'MMM d, yyyy') : 'Date not available'}
                        </p>
                        {payment.description && (
                          <p className="text-sm text-gray-600 mt-1">{payment.description}</p>
                        )}
                      </div>
                      <div className="flex items-center gap-3">
                        <StatusBadge status={payment.status === 'PAID' || payment.status === 'COMPLETED' ? 'PAYMENT_COMPLETED' : 'PAYMENT_PENDING'} />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card.Content>
          </Card>
        )}

        {activeTab === 'filing' && (
          <FilingManager
            filing={filing}
            onSelectType={handleSelectFilingType}
            onSubmitEFiling={handleSubmitEFiling}
            onUpdateStatus={handleUpdateFilingStatus}
            onCompletePaperFiling={handleCompletePaperFiling}
            userId={user.id}
            onUploadFile={handleDocumentUpload}
            uploadedFinalCopies={documents.filter(doc =>
              (doc.uploadedBy === 'admin' || doc.uploadedBy === 'ADMIN') &&
              (doc.documentType === 'FINAL_COPY' || doc.documentType === 'Final Copy')
            )}
            onRefreshDocuments={async () => {
              if (user?.id) {
                try {
                  const response = await documentService.getDocumentsByUser(user.id);
                  if (response.success) {
                    const mappedDocs = (response.data || []).map(doc => ({
                      ...doc,
                      id: doc._id || doc.id,
                      uploadedBy: doc.uploadedBy || 'client',
                    }));
                    setDocuments(mappedDocs);
                  }
                } catch (error) {
                  console.error('Error refreshing documents:', error);
                }
              }
            }}
          />
        )}

        {activeTab === 'referrals' && (
          <Card>
            <Card.Header>
              <Card.Title>Referral Information</Card.Title>
              <Card.Description>User's referral code and referred friends</Card.Description>
            </Card.Header>
            <Card.Content>
              {loadingReferral ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto" />
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Referral Code */}
                  <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border-2 border-blue-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600 mb-1">Referral Code</p>
                        <p className="text-2xl font-bold text-gray-900">{referralData?.referralCode || user?.userId || user?.referralCode || 'N/A'}</p>
                        {referralData && (
                          <p className="text-xs text-gray-500 mt-2">
                            Total Referrals: {referralData.totalReferrals || 0} •
                            Successful: {referralData.successfulReferrals || 0} •
                            Rewards Earned: ${referralData.totalRewardsEarned || 0}
                          </p>
                        )}
                      </div>
                      <div className="p-3 bg-blue-100 rounded-lg">
                        <UserPlus className="w-8 h-8 text-blue-600" />
                      </div>
                    </div>
                  </div>

                  {/* Referred Friends List */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Referred Friends</h3>
                    {referralData?.referredFriends && referralData.referredFriends.length > 0 ? (
                      <div className="space-y-3">
                        {referralData.referredFriends.map((friend, index) => (
                          <div
                            key={index}
                            className="p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-primary-300 transition-colors"
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                  <p className="font-medium text-gray-900">{friend.name || 'Unknown'}</p>
                                  <StatusBadge
                                    status={
                                      friend.status === 'converted'
                                        ? 'PAYMENT_COMPLETED'
                                        : friend.status === 'registered'
                                          ? 'PERSONAL_INFO'
                                          : 'PERSONAL_INFO'
                                    }
                                    size="sm"
                                  />
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-gray-600">
                                  {friend.email && (
                                    <div className="flex items-center gap-2">
                                      <Mail className="w-4 h-4" />
                                      <span>{friend.email}</span>
                                    </div>
                                  )}
                                  {friend.phone && (
                                    <div className="flex items-center gap-2">
                                      <Phone className="w-4 h-4" />
                                      <span>{friend.phone}</span>
                                    </div>
                                  )}
                                </div>
                                {friend.registeredAt && (
                                  <p className="text-xs text-gray-500 mt-2">
                                    Registered: {format(new Date(friend.registeredAt), 'MMM d, yyyy')}
                                  </p>
                                )}
                                {friend.rewardEarned && (
                                  <p className="text-xs text-green-600 font-medium mt-1">
                                    Reward: ${friend.rewardAmount || 0}
                                  </p>
                                )}
                                {friend.note && (
                                  <p className="text-xs text-gray-500 mt-2 italic">{friend.note}</p>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-lg border border-gray-200">
                        <UserPlus className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                        <p>No referred friends yet</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </Card.Content>
          </Card>
        )}

        {activeTab === 'coupons' && (
          <Card>
            <Card.Header>
              <Card.Title>Coupon Information</Card.Title>
              <Card.Description>User's coupon code and details</Card.Description>
            </Card.Header>
            <Card.Content>
              {loadingCoupon ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto" />
                </div>
              ) : (
                <div className="space-y-6">
                  {user?.couponCode ? (
                    <>
                      {/* Coupon Code */}
                      <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg border-2 border-green-200">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-600 mb-1">Coupon Code</p>
                            <p className="text-2xl font-bold text-gray-900">{user.couponCode}</p>
                          </div>
                          <div className="p-3 bg-green-100 rounded-lg">
                            <Ticket className="w-8 h-8 text-green-600" />
                          </div>
                        </div>
                      </div>

                      {/* Coupon Details */}
                      {couponData ? (
                        <div className="p-6 bg-white rounded-lg border border-gray-200">
                          <h3 className="text-lg font-semibold text-gray-900 mb-4">Coupon Details</h3>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                            <div>
                              <p className="text-sm font-medium text-gray-600 mb-1">Name</p>
                              <p className="text-base text-gray-900">{couponData.name}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-600 mb-1">Discount</p>
                              <p className="text-base text-gray-900 font-semibold">
                                {couponData.discountType === 'percentage'
                                  ? `${couponData.discountValue}%`
                                  : `$${couponData.discountValue}`}
                              </p>
                            </div>
                            {couponData.description && (
                              <div className="col-span-2">
                                <p className="text-sm font-medium text-gray-600 mb-1">Description</p>
                                <p className="text-base text-gray-900">{couponData.description}</p>
                              </div>
                            )}
                            <div>
                              <p className="text-sm font-medium text-gray-600 mb-1">Valid From</p>
                              <p className="text-base text-gray-900">
                                {format(new Date(couponData.validFrom), 'MMM d, yyyy')}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-600 mb-1">Valid Until</p>
                              <p className="text-base text-gray-900">
                                {format(new Date(couponData.validUntil), 'MMM d, yyyy')}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-600 mb-1">Status</p>
                              <StatusBadge
                                status={couponData.isActive ? 'PAYMENT_COMPLETED' : 'PAYMENT_PENDING'}
                                size="sm"
                              />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-600 mb-1">Usage</p>
                              <p className="text-base text-gray-900">
                                {couponData.usedCount || 0} / {couponData.usageLimit || '∞'}
                              </p>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="p-6 bg-yellow-50 rounded-lg border border-yellow-200">
                          <p className="text-sm text-yellow-800">
                            Coupon code exists but details not found. The coupon may have been deleted or is invalid.
                          </p>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-lg border border-gray-200">
                      <Ticket className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                      <p>No coupon code assigned</p>
                    </div>
                  )}
                </div>
              )}
            </Card.Content>
          </Card>
        )}

        {activeTab === 'timeline' && (
          <Card>
            <Card.Header>
              <Card.Title>Timeline</Card.Title>
              <Card.Description>User activity and workflow history</Card.Description>
            </Card.Header>
            <Card.Content>
              {loadingTimeline ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto" />
                </div>
              ) : (
                <UserTimeline history={timelineData.length > 0 ? timelineData : (workflowHistory.length > 0 ? workflowHistory : [])} />
              )}
            </Card.Content>
          </Card>
        )}

        {/* Admin Notes - Always visible */}
        {activeTab === 'overview' && (
          <Card>
            <Card.Header>
              <Card.Title>Admin Notes</Card.Title>
              <Card.Description>Internal notes (not visible to user)</Card.Description>
            </Card.Header>
            <Card.Content>
              <div className="space-y-4">
                <div>
                  <textarea
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    placeholder="Add a note..."
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
                    rows={3}
                  />
                  <Button className="mt-2" size="sm" disabled={!newNote.trim()}>
                    Add Note
                  </Button>
                </div>

                <div className="pt-4 border-t border-gray-200 space-y-3">
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-700">
                      Client prefers email communication. Available after 5 PM.
                    </p>
                    <p className="text-xs text-gray-400 mt-2">
                      Admin User • Jan 16, 2024
                    </p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-700">
                      Self-employed, needs Schedule C.
                    </p>
                    <p className="text-xs text-gray-400 mt-2">
                      Tax Consultant • Jan 15, 2024
                    </p>
                  </div>
                </div>
              </div>
            </Card.Content>
          </Card>
        )}
      </div>

      {/* Document Upload Modal */}
      <Modal
        isOpen={showDocumentModal}
        onClose={() => setShowDocumentModal(false)}
        title="Upload Document"
        description="Upload a document for this user"
        size="md"
      >
        <DocumentUpload onUpload={handleDocumentUpload} userId={user.id} />
      </Modal>

      {/* Schedule Call Modal */}
      <ScheduleModal
        isOpen={showScheduleModal}
        onClose={() => setShowScheduleModal(false)}
        onSubmit={handleScheduleMeeting}
        users={[{ id: user.id, fullName: user.fullName }]}
        staff={mockStaff}
      />

      {/* Reject Document Modal */}
      <Modal
        isOpen={showRejectModal}
        onClose={() => {
          setShowRejectModal(false);
          setRejectReason('');
          setSelectedDocId(null);
        }}
        title="Reject Document"
        description="Please provide a reason for rejection"
      >
        <div className="space-y-4">
          <div>
            <label className="label">Rejection Reason</label>
            <textarea
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              className="input resize-none h-24"
              placeholder="Enter rejection reason..."
              autoFocus
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button
              variant="secondary"
              onClick={() => {
                setShowRejectModal(false);
                setRejectReason('');
                setSelectedDocId(null);
              }}
            >
              Cancel
            </Button>
            <Button onClick={handleConfirmReject}>
              Reject Document
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default UserDetail;
