import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FileText,
  CheckCircle,
  Clock,
  CreditCard,
  Send,
  AlertCircle,
  TrendingUp,
  FileCheck,
  Calendar,
  Bell,
  ArrowRight,
  Upload,
  Download,
  MessageSquare,
  Users,
  HelpCircle,
} from 'lucide-react';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import PageLoader from '../components/common/PageLoader';
import WorkflowProgress from '../components/workflow/WorkflowProgress';
import { dashboardService } from '../services/dashboardService';
import { userService } from '../services/userService';
import { notificationService } from '../services/notificationService';
import { initSocket } from '../services/socketService';
import { getUser } from '../utils/auth';

const colorStyles = {
  blue: { bg: 'bg-[#E9F7FA]', text: 'text-[#127EAB]', bar: 'bg-[#127EAB]' },
  purple: { bg: 'bg-[#EFF4F9]', text: 'text-[#1F4264]', bar: 'bg-[#1F4264]' },
  green: { bg: 'bg-[#ECFDF5]', text: 'text-[#059669]', bar: 'bg-[#059669]' },
  orange: { bg: 'bg-[#FEF4F2]', text: 'text-[#EE6450]', bar: 'bg-[#EE6450]' },
  yellow: { bg: 'bg-[#FFFBEB]', text: 'text-[#D97706]', bar: 'bg-[#D97706]' },
  indigo: { bg: 'bg-[#EEF2FF]', text: 'text-[#4F46E5]', bar: 'bg-[#4F46E5]' },
};

const quickActionColorStyles = {
  blue: {
    bg: 'bg-[#E9F7FA]',
    text: 'text-[#127EAB]',
    hoverBg: 'group-hover:bg-[#127EAB]',
  },
  purple: {
    bg: 'bg-[#EFF4F9]',
    text: 'text-[#1F4264]',
    hoverBg: 'group-hover:bg-[#1F4264]',
  },
  green: {
    bg: 'bg-[#ECFDF5]',
    text: 'text-[#059669]',
    hoverBg: 'group-hover:bg-[#059669]',
  },
  indigo: {
    bg: 'bg-[#FEF4F2]',
    text: 'text-[#EE6450]',
    hoverBg: 'group-hover:bg-[#EE6450]',
  },
};

const activityColorStyles = {
  green: { bg: 'bg-[#ECFDF5]', text: 'text-[#059669]' },
  blue: { bg: 'bg-[#E9F7FA]', text: 'text-[#127EAB]' },
  purple: { bg: 'bg-[#EFF4F9]', text: 'text-[#1F4264]' },
  orange: { bg: 'bg-[#FEF4F2]', text: 'text-[#EE6450]' },
  gray: { bg: 'bg-slate-100', text: 'text-slate-600' },
};

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [financialYear, setFinancialYear] = useState('2025');
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [recentActivities, setRecentActivities] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = getUser();
    setUser(currentUser);
    loadDashboardData();
    loadUserProfile();
    loadRecentActivities();
  }, []);

  // Reload profile and notifications when component becomes visible
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        loadUserProfile();
        loadDashboardData();
        loadRecentActivities();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  // Real-time listener for incoming notifications & document updates to refresh activity list
  useEffect(() => {
    try {
      const s = initSocket();
      if (!s) return;

      const handleRealtimeUpdate = () => {
        loadRecentActivities();
        loadDashboardData();
      };

      s.on('new_notification', handleRealtimeUpdate);
      s.on('document_status_updated', handleRealtimeUpdate);
      s.on('workflow_updated', handleRealtimeUpdate);
      s.on('ticket_message', handleRealtimeUpdate);

      return () => {
        s.off('new_notification', handleRealtimeUpdate);
        s.off('document_status_updated', handleRealtimeUpdate);
        s.off('workflow_updated', handleRealtimeUpdate);
        s.off('ticket_message', handleRealtimeUpdate);
      };
    } catch (_) { }
  }, []);

  // Listen for workflow updates (e.g., after scheduling a meeting)
  useEffect(() => {
    const handleWorkflowUpdate = () => {
      loadUserProfile();
      loadDashboardData();
      loadRecentActivities();
    };
    window.addEventListener('workflowUpdated', handleWorkflowUpdate);
    return () => window.removeEventListener('workflowUpdated', handleWorkflowUpdate);
  }, []);

  const loadUserProfile = async () => {
    try {
      const response = await userService.getProfile();
      if (response.success && response.data) {
        setUserProfile(response.data);
      }
    } catch (error) {
      console.error('Failed to load user profile:', error);
    }
  };

  // Check if all account information sections are complete (matching AccountInformation.jsx logic)
  const areAllSectionsComplete = () => {
    if (!userProfile) return false;

    // 1. Taxpayer Profile
    const hasTaxpayerProfile = userProfile.firstName &&
      userProfile.firstName.trim().length > 0 &&
      userProfile.lastName &&
      userProfile.lastName.trim().length > 0 &&
      userProfile.personalInfo?.ssn &&
      userProfile.personalInfo.ssn.trim().length > 0;

    // 2. Spouse Details
    const hasSpouseDetails = userProfile.spouseInfo?.fullName &&
      userProfile.spouseInfo.fullName.trim().length > 0;

    // 3. Dependent Details
    const hasDependentDetails = userProfile.dependents &&
      userProfile.dependents.length > 0;

    // 4. Address
    const hasAddress = userProfile.address?.street &&
      userProfile.address.street.trim().length > 0 &&
      userProfile.address?.city &&
      userProfile.address.city.trim().length > 0;

    // 5. Contact Information
    const hasContactInfo = userProfile.email &&
      userProfile.email.trim().length > 0 &&
      userProfile.mobileNumber &&
      userProfile.mobileNumber.trim().length > 0;

    // 6. Identity Verification
    const hasIdentityVerification = userProfile.identityVerification?.licenseNumber &&
      userProfile.identityVerification.licenseNumber.trim().length > 0 &&
      userProfile.identityVerification?.stateOfIssue &&
      userProfile.identityVerification.stateOfIssue.trim().length > 0;

    // 7. Bank Details
    const hasBankDetails = userProfile.bankDetails?.bankName &&
      userProfile.bankDetails.bankName.trim().length > 0 &&
      userProfile.bankDetails?.accountNumber &&
      userProfile.bankDetails.accountNumber.trim().length > 0;

    return hasTaxpayerProfile && hasSpouseDetails && hasDependentDetails &&
      hasAddress && hasContactInfo && hasIdentityVerification && hasBankDetails;
  };

  const loadRecentActivities = async () => {
    try {
      const res = await notificationService.getNotifications({ limit: 8 });
      if (res.success && Array.isArray(res.notifications) && res.notifications.length > 0) {
        setRecentActivities(
          res.notifications.map((n) => {
            const t = (n.type || '').toUpperCase();
            let icon = 'Bell';
            let color = 'blue';

            if (t.includes('DOCUMENT')) {
              icon = 'FileCheck';
              color = n.data?.status === 'approved' ? 'green' : n.data?.status === 'rejected' ? 'orange' : 'blue';
            } else if (t.includes('TICKET') || t.includes('SUPPORT')) {
              icon = 'MessageSquare';
              color = 'purple';
            } else if (t.includes('REGISTRATION')) {
              icon = 'CheckCircle';
              color = 'green';
            } else if (t.includes('FILING') || t.includes('WORKFLOW')) {
              icon = 'TrendingUp';
              color = 'blue';
            } else if (t.includes('PAYMENT')) {
              icon = 'CreditCard';
              color = 'green';
            }

            return {
              id: n._id,
              type: n.type,
              title: n.title,
              message: n.message || n.title,
              time: n.createdAt,
              timestamp: n.createdAt,
              icon,
              color,
              link: n.link || (t.includes('DOCUMENT') ? '/client/dashboard/documents' : t.includes('TICKET') ? '/client/dashboard/support' : '/client/dashboard'),
            };
          })
        );
      }
    } catch (err) {
      console.warn('Failed to load recent activity notifications:', err);
    }
  };

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      const response = await dashboardService.getDashboardData();
      if (response.success) {
        setDashboardData(response.data);
        if (Array.isArray(response.data?.recentActivities) && response.data.recentActivities.length > 0) {
          setRecentActivities((prev) => (prev.length === 0 ? response.data.recentActivities : prev));
        }
      } else {
        console.error('Failed to load dashboard data:', response.message);
        setDashboardData({
          filingStatus: 'Not Started',
          currentStage: 'PERSONAL_INFO',
          documentsUploaded: 0,
          documentsPending: 0,
          paymentStatus: 'Pending',
          filingType: 'Not Selected',
          recentActivities: [],
        });
      }
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
      setDashboardData({
        filingStatus: 'Not Started',
        currentStage: 'PERSONAL_INFO',
        documentsUploaded: 0,
        documentsPending: 0,
        paymentStatus: 'Pending',
        filingType: 'Not Selected',
        recentActivities: [],
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <PageLoader variant="dashboard" />;
  }

  if (!dashboardData) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500 font-normal">Failed to load dashboard data</div>
      </div>
    );
  }

  const getStatusBadgeColor = (status) => {
    if (status === 'Completed' || status === 'Paid') return 'green';
    if (status === 'In Progress') return 'blue';
    if (status === 'Pending') return 'yellow';
    return 'gray';
  };

  const getActivityIcon = (type) => {
    const str = String(type || '').toUpperCase();
    if (str.includes('DOCUMENT') || str.includes('FILECHECK')) return FileCheck;
    if (str.includes('UPLOAD')) return Upload;
    if (str.includes('TICKET') || str.includes('SUPPORT') || str.includes('MESSAGESQUARE')) return MessageSquare;
    if (str.includes('REGISTRATION') || str.includes('CHECKCIRCLE')) return CheckCircle;
    if (str.includes('FILING') || str.includes('WORKFLOW') || str.includes('TRENDINGUP')) return TrendingUp;
    if (str.includes('PAYMENT') || str.includes('CREDITCARD')) return CreditCard;
    if (str.includes('CALENDAR') || str.includes('MEETING')) return Calendar;
    return Bell;
  };

  const getActivityColor = (type, explicitColor) => {
    if (explicitColor) return explicitColor;
    const str = String(type || '').toUpperCase();
    if (str.includes('APPROVED')) return 'green';
    if (str.includes('REJECTED')) return 'orange';
    if (str.includes('DOCUMENT')) return 'green';
    if (str.includes('TICKET') || str.includes('SUPPORT')) return 'purple';
    if (str.includes('REGISTRATION')) return 'green';
    if (str.includes('PAYMENT')) return 'green';
    if (str.includes('FILING') || str.includes('STATUS')) return 'blue';
    return 'blue';
  };

  const formatTimeAgo = (timestamp) => {
    if (!timestamp) return 'Recently';
    try {
      const date = new Date(timestamp);
      const now = new Date();
      const diffInSeconds = Math.floor((now - date) / 1000);

      if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`;
      if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
      if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
      if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`;
      return date.toLocaleDateString();
    } catch {
      return 'Recently';
    }
  };

  const formatLabel = (val) => {
    if (!val || typeof val !== 'string') return val ?? '—';
    const trimmed = val.trim();
    const upperKey = trimmed.toUpperCase().replace(/[\s-]+/g, '_');
    const knownLabels = {
      REGISTRATION_COMPLETE: 'Registration Complete',
      REGISTERED: 'Registered',
      PERSONAL_INFO: 'Personal Info',
      SCHEDULE: 'Schedule Call',
      INTERVIEW: 'CPA Interview',
      DOCUMENTS: 'Documents',
      DOCUMENTS_PENDING: 'Documents Pending',
      PREPARATION: 'Tax Preparation',
      REVIEW: 'Draft Review',
      PAYMENT: 'Payment',
      FILING: 'E-Filing',
      ACCEPTANCE: 'IRS Accepted',
    };
    if (knownLabels[upperKey]) return knownLabels[upperKey];
    if (trimmed.includes('_') || trimmed === trimmed.toUpperCase()) {
      return trimmed
        .toLowerCase()
        .split('_')
        .filter(Boolean)
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    }
    return trimmed;
  };

  const formattedCurrentStage = formatLabel(dashboardData.currentStage);
  const formattedFilingStatus = formatLabel(dashboardData.filingStatus);
  const formattedPaymentStatus = formatLabel(dashboardData.paymentStatus);
  const formattedFilingType = formatLabel(dashboardData.filingType);

  const statCards = [
    {
      name: 'Filing Status',
      value: formattedFilingStatus,
      description: 'Current filing status',
      icon: FileCheck,
      color: 'blue',
      badge: '',
      badgeColor: getStatusBadgeColor(dashboardData.filingStatus),
    },
    {
      name: 'Current Stage',
      value: formattedCurrentStage,
      description: 'Workflow stage',
      icon: TrendingUp,
      color: 'purple',
      badge: '',
      badgeColor: 'blue',
    },
    {
      name: 'Documents Uploaded',
      value: `${dashboardData.documentsUploaded} / ${dashboardData.documentsUploaded + dashboardData.documentsPending}`,
      description: `${dashboardData.documentsPending} pending upload`,
      icon: FileText,
      color: 'green',
      badge: '',
      badgeColor: 'green',
    },
    {
      name: 'Documents Pending',
      value: dashboardData.documentsPending,
      description: 'Documents to be uploaded',
      icon: AlertCircle,
      color: 'orange',
      badge: '',
      badgeColor: 'orange',
    },
    {
      name: 'Payment Status',
      value: formattedPaymentStatus,
      description: 'Payment processing status',
      icon: CreditCard,
      color: 'yellow',
      badge: '',
      badgeColor: getStatusBadgeColor(dashboardData.paymentStatus),
    },
    {
      name: 'Filing Type',
      value: formattedFilingType,
      description: 'Selected filing method',
      icon: Send,
      color: 'indigo',
      badge: '',
      badgeColor: 'blue',
    },
  ];

  const quickActions = [
    {
      name: 'Upload Documents',
      description: 'Upload required tax documents',
      icon: Upload,
      color: 'blue',
      path: '/client/dashboard/documents',
    },
    {
      name: 'Free to Call',
      description: 'Book a consultation',
      icon: Calendar,
      color: 'purple',
      path: '/client/dashboard/schedule',
    },
    {
      name: 'Referrals',
      description: 'Refer friends and earn rewards',
      icon: Users,
      color: 'green',
      path: '/client/dashboard/referrals',
    },
    {
      name: 'Support',
      description: 'Get help and support',
      icon: HelpCircle,
      color: 'indigo',
      path: '/client/dashboard/support',
    },
  ];

  const getUserDisplayName = () => {
    const raw =
      userProfile?.fullName ||
      (userProfile?.firstName ? `${userProfile.firstName} ${userProfile.lastName || ''}`.trim() : null) ||
      user?.fullName ||
      user?.name ||
      user?.firstName ||
      user?.email?.split('@')[0] ||
      'User';

    return String(raw)
      .replace(/[._]/g, ' ')
      .trim()
      .split(/\s+/)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  };

  return (
    <div className="space-y-4 sm:space-y-5 irs-page-enter">
      {/* Welcome Section - Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2.5 sm:gap-4 pb-1">
        <div className="flex-1 min-w-0">
          <h2 className="text-xl sm:text-2xl font-medium text-[#1F4264] tracking-tight truncate capitalize">
            {getUserDisplayName()}
          </h2>
          <p className="text-xs sm:text-sm text-[#6F7F8E] font-medium mt-0.5">
            Welcome back! Here's what's happening with your tax filing system.
          </p>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          {/* Financial Year Selector */}
          <select
            value={financialYear}
            onChange={(e) => setFinancialYear(e.target.value)}
            className="px-3 py-1.5 text-xs sm:text-sm font-normal text-[#1F4264] bg-white border border-[#CCDCE1] hover:border-[#127EAB]/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#127EAB]/15 focus:border-[#127EAB] shadow-2xs transition-all cursor-pointer"
          >
            {(() => {
              const startYear = 2025;
              const years = [];
              for (let i = 0; i <= 5; i++) {
                years.push(startYear - i);
              }
              return years.map((year) => (
                <option key={year} value={year.toString()}>
                  Ty-{year}
                </option>
              ));
            })()}
          </select>
        </div>
      </div>

      {/* Analytics Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          const style = colorStyles[stat.color] || colorStyles.blue;
          return (
            <div
              key={stat.name}
              className="bg-white rounded-md border border-[#DCEAF0] p-4 shadow-[0_1px_3px_rgba(31,66,100,0.08),0_1px_2px_rgba(31,66,100,0.04)] hover:shadow-[0_4px_12px_rgba(31,66,100,0.12)] hover:border-[#127EAB]/50 transition-all duration-150 flex flex-col justify-between"
            >
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${style.bg} ${style.text}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <p className="text-xs sm:text-[13px] font-medium text-[#6F7F8E] truncate">{stat.name}</p>
                </div>
                {stat.badge && (
                  <Badge color={stat.badgeColor} size="sm" className="flex-shrink-0 !font-normal">
                    {stat.badge}
                  </Badge>
                )}
              </div>

              <div>
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-lg mb-1.5 max-w-full">
                  <span className={`w-1 h-4 rounded-full shrink-0 ${style.bar || 'bg-[#127EAB]'}`} />
                  <span
                    className="text-base sm:text-lg font-medium text-[#1F4264] truncate tracking-tight"
                    title={String(stat.value)}
                  >
                    {stat.value}
                  </span>
                </div>
                <p className="text-[11px] sm:text-xs text-[#8BA0B2] font-normal truncate">{stat.description}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Workflow Status Section */}
      <Card className="rounded-xl border border-[#DCEAF0] shadow-[0_1px_3px_rgba(31,66,100,0.08),0_1px_2px_rgba(31,66,100,0.04)]">
        <Card.Header className="border-b border-[#EDF3F6] pb-3 sm:pb-3.5">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-8 h-8 rounded-lg bg-[#E9F7FA] text-[#127EAB] flex items-center justify-center shrink-0 border border-[#127EAB]/20">
                <TrendingUp className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <h3 className="text-base sm:text-lg font-medium text-[#1F4264] tracking-tight">
                  Case Progress
                </h3>
                <p className="text-xs sm:text-[13px] text-[#6F7F8E] font-normal mt-0.5">
                  Current workflow status and progress
                </p>
              </div>
            </div>
            <Badge color="blue" size="md" dot className="!font-medium shrink-0">
              {formattedCurrentStage}
            </Badge>
          </div>
        </Card.Header>
        <Card.Content className="pt-4 sm:pt-5">
          <WorkflowProgress
            currentStatus={dashboardData.currentStage}
            isPersonalInfoComplete={areAllSectionsComplete()}
          />
        </Card.Content>
      </Card>

      {/* Quick Actions & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5">
        {/* Quick Actions (Wider ~60%) */}
        <Card className="lg:col-span-7 xl:col-span-7 rounded-xl border border-[#DCEAF0] shadow-[0_1px_3px_rgba(31,66,100,0.08),0_1px_2px_rgba(31,66,100,0.04)] flex flex-col justify-between">
          <Card.Header className="border-b border-[#EDF3F6] pb-3 sm:pb-3.5">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-[#EFF4F9] text-[#1F4264] flex items-center justify-center shrink-0 border border-[#1F4264]/10">
                  <FileCheck className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-base sm:text-lg font-medium text-[#1F4264] tracking-tight">
                    Quick Actions
                  </h3>
                  <p className="text-xs sm:text-[13px] text-[#6F7F8E] font-normal mt-0.5">
                    Common tasks and shortcuts
                  </p>
                </div>
              </div>
            </div>
          </Card.Header>
          <Card.Content className="flex-1 flex flex-col justify-center pt-4 sm:pt-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5">
              {quickActions.map((action) => {
                const Icon = action.icon;
                const style = quickActionColorStyles[action.color] || quickActionColorStyles.blue;
                return (
                  <button
                    key={action.name}
                    onClick={() => navigate(action.path)}
                    className="group flex items-center justify-between gap-3 p-3.5 rounded-xl border border-[#E2EDF2] bg-white hover:bg-[#F9FBFC] hover:border-[#127EAB]/40 shadow-[0_1px_3px_rgba(31,66,100,0.05)] hover:shadow-[0_4px_12px_rgba(18,126,171,0.10)] transition-all duration-200 w-full text-left cursor-pointer"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-105 ${style.bg}`}>
                        <Icon className={`w-5 h-5 transition-colors ${style.text}`} />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-[#1F4264] group-hover:text-[#127EAB] transition-colors truncate tracking-tight">
                          {action.name}
                        </p>
                        <p className="text-xs text-[#7D8F9F] font-normal mt-0.5 line-clamp-1">
                          {action.description}
                        </p>
                      </div>
                    </div>
                    <div className="w-7 h-7 rounded-lg bg-[#F4F8FA] group-hover:bg-[#E9F7FA] flex items-center justify-center transition-colors shrink-0">
                      <ArrowRight className="w-3.5 h-3.5 text-[#8BA0B2] group-hover:text-[#127EAB] group-hover:translate-x-0.5 transition-all" />
                    </div>
                  </button>
                );
              })}
            </div>
          </Card.Content>
        </Card>

        {/* Recent Activity (Smaller ~40%) */}
        <Card className="lg:col-span-5 xl:col-span-5 rounded-xl border border-[#DCEAF0] shadow-[0_1px_3px_rgba(31,66,100,0.08),0_1px_2px_rgba(31,66,100,0.04)] flex flex-col justify-between">
          <Card.Header className="border-b border-[#EDF3F6] pb-3 sm:pb-3.5">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-[#E9F7FA] text-[#127EAB] flex items-center justify-center shrink-0 border border-[#127EAB]/20">
                  <Bell className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-base sm:text-lg font-medium text-[#1F4264] tracking-tight">
                    Recent Activity
                  </h3>
                  <p className="text-xs sm:text-[13px] text-[#6F7F8E] font-normal mt-0.5">
                    Latest updates and notifications
                  </p>
                </div>
              </div>
              {recentActivities.length > 0 && (
                <span className="text-[11px] font-medium text-[#127EAB] bg-[#E9F7FA] border border-[#127EAB]/20 px-2 py-0.5 rounded-full shrink-0">
                  {recentActivities.length} Recent
                </span>
              )}
            </div>
          </Card.Header>
          <Card.Content className="flex-1 flex flex-col justify-between pt-3.5 sm:pt-4">
            <div className="space-y-2">
              {recentActivities.length === 0 ? (
                <div className="text-center py-7 px-4">
                  <div className="w-11 h-11 rounded-full bg-[#F4F9FB] border border-[#E2EDF2] flex items-center justify-center mx-auto mb-2 text-[#127EAB]">
                    <Bell className="w-5 h-5 opacity-70" />
                  </div>
                  <p className="text-xs sm:text-sm font-medium text-[#1F4264]">No recent activity</p>
                  <p className="text-xs text-[#8BA0B2] mt-0.5">You're all caught up on your case notifications</p>
                </div>
              ) : (
                recentActivities.slice(0, 4).map((activity, index) => {
                  const Icon = getActivityIcon(activity.type || activity.icon);
                  const color = getActivityColor(activity.type || activity.icon, activity.color);
                  const style = activityColorStyles[color] || activityColorStyles.blue;
                  return (
                    <div
                      key={activity.id || index}
                      onClick={() => activity.link && navigate(activity.link)}
                      className={`flex items-start gap-3 p-2.5 rounded-xl border border-[#EDF3F6] bg-white hover:bg-[#F8FBFC] hover:border-[#127EAB]/30 shadow-2xs hover:shadow-xs transition-all duration-150 group ${
                        activity.link ? 'cursor-pointer' : ''
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-lg shrink-0 flex items-center justify-center mt-0.5 ${style.bg}`}>
                        <Icon className={`w-4 h-4 ${style.text}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs sm:text-[13px] font-medium text-[#1F4264] group-hover:text-[#127EAB] transition-colors leading-snug line-clamp-2">
                          {activity.message || activity.action}
                        </p>
                        <div className="flex items-center gap-1.5 mt-1 text-[11px] font-normal text-[#8BA0B2]">
                          <Clock className="w-3 h-3 text-[#A0B0BE] shrink-0" />
                          <span>{formatTimeAgo(activity.time || activity.timestamp)}</span>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
            <div className="mt-3.5 pt-3 border-t border-[#EDF3F6]">
              <button
                onClick={() => navigate('/client/dashboard/documents')}
                className="w-full py-2 px-3 text-xs font-medium text-[#127EAB] hover:text-[#0E6083] bg-[#E9F7FA]/60 hover:bg-[#E9F7FA] border border-[#127EAB]/20 rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer"
              >
                <span>View all notifications</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </Card.Content>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
