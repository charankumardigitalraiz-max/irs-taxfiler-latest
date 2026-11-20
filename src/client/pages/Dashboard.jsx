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
    } catch (_) {}
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
        // Set default data on error
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
      // Set default data on error
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
        <div className="text-gray-500">Failed to load dashboard data</div>
      </div>
    );
  }

  const getStatusBadgeColor = (status) => {
    if (status === 'Completed' || status === 'Paid') return 'green';
    if (status === 'In Progress') return 'blue';
    if (status === 'Pending') return 'yellow';
    return 'gray';
  };

  // Map activity types to icons and colors
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
      badge: "",
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
      badge: ``,
      badgeColor: 'green',
    },
    {
      name: 'Documents Pending',
      value: dashboardData.documentsPending,
      description: 'Documents to be uploaded',
      icon: AlertCircle,
      color: 'orange',
      badge: ``,
      badgeColor: 'orange',
    },
    {
      name: 'Payment Status',
      value: formattedPaymentStatus,
      description: 'Payment processing status',
      icon: CreditCard,
      color: 'yellow',
      badge: "",
      badgeColor: getStatusBadgeColor(dashboardData.paymentStatus),
    },
    {
      name: 'Filing Type',
      value: formattedFilingType,
      description: 'Selected filing method',
      icon: Send,
      color: 'indigo',
      badge: "",
      badgeColor: 'blue',
    },
  ];


  // Quick actions
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

  // Capitalize first letter of each word in user's display name
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
    <div className="space-y-4 sm:space-y-6 irs-page-enter">
      {/* Welcome Section - Header */}
      <div className="bg-white rounded-lg shadow-[0_2px_10px_rgba(31,66,100,0.04)] px-5 py-4 border border-[#DCEAF0]">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
          <div className="flex-1 min-w-0">
            <h2 className="text-xl sm:text-[22px] font-medium text-[#1F4264] tracking-tight truncate capitalize">
              {getUserDisplayName()}
            </h2>
            <p className="text-[13px] sm:text-sm text-[#6F7F8E] font-medium mt-0.5">
              Welcome back! Here's what's happening with your tax filing system.
            </p>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            {/* Financial Year Selector */}
            <select
              value={financialYear}
              onChange={(e) => setFinancialYear(e.target.value)}
              className="px-3.5 py-2 text-sm font-medium text-[#1F4264] border border-[#CCDCE1] rounded-md focus:outline-none focus:ring-2 focus:ring-[#127EAB]/20 focus:border-[#127EAB] bg-white w-full sm:w-auto"
            >
              {(() => {
                const startYear = 2025;
                const years = [];
                // Generate years from 2025 going back 5 years
                for (let i = 0; i <= 5; i++) {
                  years.push(startYear - i);
                }
                return years.map(year => (
                  <option key={year} value={year.toString()}>Ty-{year}</option>
                ));
              })()}
            </select>
          </div>
        </div>
      </div>

      {/* Analytics Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.name} className="hover:shadow-md hover:border-[#127EAB]/40 transition-all p-4 sm:p-6">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-3 sm:mb-4 gap-2">
                    <p className="text-xs sm:text-sm font-medium text-[#6F7F8E] truncate">{stat.name}</p>
                    {stat.badge && (
                      <Badge color={stat.badgeColor} size="sm" className="flex-shrink-0">
                        {stat.badge}
                      </Badge>
                    )}
                  </div>
                  <p className="text-lg sm:text-xl font-semibold text-[#1F4264] mb-1 truncate" title={String(stat.value)}>
                    {stat.value}
                  </p>
                  <p className="text-xs text-[#6F7F8E] font-medium line-clamp-2">{stat.description}</p>
                </div>
                <div
                  className={`p-2 rounded-lg shrink-0 ${stat.color === 'blue' && 'bg-[#E9F7FA]'
                    } ${stat.color === 'purple' && 'bg-[#EFF4F9]'} ${stat.color === 'green' && 'bg-[#ECFDF5]'
                    } ${stat.color === 'orange' && 'bg-[#FEF4F2]'} ${stat.color === 'yellow' && 'bg-[#FFFBEB]'
                    } ${stat.color === 'indigo' && 'bg-[#EEF2FF]'}`}
                >
                  <Icon
                    className={`w-4 h-4 ${stat.color === 'blue' && 'text-[#127EAB]'
                      } ${stat.color === 'purple' && 'text-[#1F4264]'} ${stat.color === 'green' && 'text-[#059669]'
                      } ${stat.color === 'orange' && 'text-[#EE6450]'} ${stat.color === 'yellow' && 'text-[#D97706]'
                      } ${stat.color === 'indigo' && 'text-[#4F46E5]'}`}
                  />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Workflow Status Section */}
      <Card>
        <Card.Header>
          <div className="flex items-center justify-between">
            <div>
              <Card.Title>Case Progress</Card.Title>
              <Card.Description>Current workflow status and progress</Card.Description>
            </div>
            <Badge color="blue" size="lg">
              {formattedCurrentStage}
            </Badge>
          </div>
        </Card.Header>
        <Card.Content>
          <WorkflowProgress
            currentStatus={dashboardData.currentStage}
            isPersonalInfoComplete={areAllSectionsComplete()}
          />
        </Card.Content>
      </Card>

      {/* Quick Actions & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
        {/* Quick Actions (Wider ~60%) */}
        <Card className="lg:col-span-7 xl:col-span-7 flex flex-col justify-between">
          <Card.Header>
            <Card.Title>Quick Actions</Card.Title>
            <Card.Description>Common tasks and shortcuts</Card.Description>
          </Card.Header>
          <Card.Content className="flex-1 flex flex-col justify-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-3">
              {quickActions.map((action) => {
                const Icon = action.icon;
                return (
                  <button
                    key={action.name}
                    onClick={() => navigate(action.path)}
                    className="flex items-start gap-3 p-3.5 sm:p-4 rounded-lg border border-[#DCEAF0] hover:border-[#127EAB]/40 hover:bg-[#E9F7FA]/40 transition-all group w-full text-left cursor-pointer"
                  >
                    <div
                      className={`p-2.5 rounded-lg transition-colors ${action.color === 'blue' && 'bg-[#E9F7FA] group-hover:bg-[#127EAB]'
                        } ${action.color === 'purple' && 'bg-[#EFF4F9] group-hover:bg-[#1F4264]'} ${action.color === 'green' && 'bg-[#ECFDF5] group-hover:bg-[#059669]'
                        } ${action.color === 'indigo' && 'bg-[#FEF4F2] group-hover:bg-[#EE6450]'}`}
                    >
                      <Icon
                        className={`w-5 h-5 transition-colors group-hover:text-white ${action.color === 'blue' && 'text-[#127EAB]'
                          } ${action.color === 'purple' && 'text-[#1F4264]'} ${action.color === 'green' && 'text-[#059669]'
                          } ${action.color === 'indigo' && 'text-[#EE6450]'}`}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-[#1F4264] group-hover:text-[#127EAB] transition-colors">
                        {action.name}
                      </p>
                      <p className="text-xs text-[#6F7F8E] font-medium mt-0.5 line-clamp-1">{action.description}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#127EAB] group-hover:translate-x-0.5 transition-all mt-1" />
                  </button>
                );
              })}
            </div>
          </Card.Content>
        </Card>

        {/* Recent Activity (Smaller ~40%) */}
        <Card className="lg:col-span-5 xl:col-span-5 flex flex-col justify-between">
          <Card.Header>
            <Card.Title>Recent Activity</Card.Title>
            <Card.Description>Latest updates and notifications</Card.Description>
          </Card.Header>
          <Card.Content className="flex-1 flex flex-col justify-between">
            <div className="space-y-4">
              {recentActivities.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <Bell className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                  <p>No recent activity</p>
                </div>
              ) : (
                recentActivities.map((activity, index) => {
                  const Icon = getActivityIcon(activity.type || activity.icon);
                  const color = getActivityColor(activity.type || activity.icon, activity.color);
                  return (
                    <div
                      key={activity.id || index}
                      onClick={() => activity.link && navigate(activity.link)}
                      className={`flex items-start gap-3.5 p-3 rounded-lg hover:bg-[#F4F9FB] transition-colors ${activity.link ? 'cursor-pointer' : ''}`}
                    >
                      <div
                        className={`p-2 rounded-lg shrink-0 ${color === 'green' ? 'bg-[#ECFDF5]' : ''
                          } ${color === 'blue' ? 'bg-[#E9F7FA]' : ''} ${color === 'purple' ? 'bg-[#EFF4F9]' : ''
                          } ${color === 'orange' ? 'bg-[#FEF4F2]' : ''} ${color === 'gray' ? 'bg-slate-100' : ''
                          }`}
                      >
                        <Icon
                          className={`w-4 h-4 ${color === 'green' ? 'text-[#059669]' : ''
                            } ${color === 'blue' ? 'text-[#127EAB]' : ''} ${color === 'purple' ? 'text-[#1F4264]' : ''
                            } ${color === 'orange' ? 'text-[#EE6450]' : ''} ${color === 'gray' ? 'text-slate-600' : ''
                            }`}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-[#1F4264]">{activity.message || activity.action}</p>
                        <p className="text-xs text-[#6F7F8E] mt-0.5">{formatTimeAgo(activity.time || activity.timestamp)}</p>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
            <div className="mt-4 pt-4 border-t border-[#E6F0F5]">
              <button
                onClick={() => navigate('/client/dashboard/documents')}
                className="text-sm text-[#127EAB] hover:text-[#1F4264] font-semibold flex items-center gap-1 transition-colors cursor-pointer"
              >
                View all notifications
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </Card.Content>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
