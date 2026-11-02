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
import WorkflowProgress from '../components/workflow/WorkflowProgress';
import { dashboardService } from '../services/dashboardService';
import { userService } from '../services/userService';
import { getUser } from '../utils/auth';

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [financialYear, setFinancialYear] = useState('2025');
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = getUser();
    setUser(currentUser);
    loadDashboardData();
    loadUserProfile();
  }, []);

  // Reload profile when component becomes visible (user might have updated their info)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        loadUserProfile();
        loadDashboardData();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  // Listen for workflow updates (e.g., after scheduling a meeting)
  useEffect(() => {
    const handleWorkflowUpdate = () => {
      loadUserProfile();
      loadDashboardData();
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

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      const response = await dashboardService.getDashboardData();
      if (response.success) {
        setDashboardData(response.data);
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
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
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

  // Use real recent activities from dashboard data or empty array
  const recentActivities = dashboardData?.recentActivities || [];
  
  // Map activity types to icons and colors
  const getActivityIcon = (type) => {
    switch (type) {
      case 'document': return Upload;
      case 'payment': return CreditCard;
      case 'notification': return Calendar;
      case 'status': return FileCheck;
      default: return Bell;
    }
  };
  
  const getActivityColor = (type) => {
    switch (type) {
      case 'document': return 'green';
      case 'payment': return 'blue';
      case 'notification': return 'purple';
      case 'status': return 'orange';
      default: return 'gray';
    }
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

  const statCards = [
    {
      name: 'Filing Status',
      value: dashboardData.filingStatus,
      description: 'Current filing status',
      icon: FileCheck,
      color: 'blue',
      badge: dashboardData.filingStatus,
      badgeColor: getStatusBadgeColor(dashboardData.filingStatus),
    },
    {
      name: 'Current Stage',
      value: dashboardData.currentStage,
      description: 'Workflow stage',
      icon: TrendingUp,
      color: 'purple',
      badge: dashboardData.currentStage,
      badgeColor: 'blue',
    },
    {
      name: 'Documents Uploaded',
      value: `${dashboardData.documentsUploaded} / ${dashboardData.documentsUploaded + dashboardData.documentsPending}`,
      description: `${dashboardData.documentsPending} pending upload`,
      icon: FileText,
      color: 'green',
      badge: `${dashboardData.documentsUploaded} Uploaded`,
      badgeColor: 'green',
    },
    {
      name: 'Documents Pending',
      value: dashboardData.documentsPending,
      description: 'Documents to be uploaded',
      icon: AlertCircle,
      color: 'orange',
      badge: `${dashboardData.documentsPending} Remaining`,
      badgeColor: 'orange',
    },
    {
      name: 'Payment Status',
      value: dashboardData.paymentStatus,
      description: 'Payment processing status',
      icon: CreditCard,
      color: 'yellow',
      badge: dashboardData.paymentStatus,
      badgeColor: getStatusBadgeColor(dashboardData.paymentStatus),
    },
    {
      name: 'Filing Type',
      value: dashboardData.filingType,
      description: 'Selected filing method',
      icon: Send,
      color: 'indigo',
      badge: dashboardData.filingType,
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

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Welcome Section - Header */}
      <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 border border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-3">
          <div className="flex-1 min-w-0">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-1 truncate">
              {user?.fullName || user?.name || user?.email?.split('@')[0] || 'User'}
            </h2>
            <p className="text-xs sm:text-sm text-gray-600">
              Welcome back! Here's what's happening with your tax filing system.
            </p>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            {/* Financial Year Selector */}
            <select
              value={financialYear}
              onChange={(e) => setFinancialYear(e.target.value)}
              className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white w-full sm:w-auto"
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
            <Card key={stat.name} className="hover:shadow-md transition-shadow p-4 sm:p-6">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-3 sm:mb-4 gap-2">
                    <p className="text-xs sm:text-sm font-medium text-gray-500 truncate">{stat.name}</p>
                    <Badge color={stat.badgeColor} size="sm" className="flex-shrink-0">
                      {stat.badge}
                    </Badge>
                  </div>
                  <p className="text-xl sm:text-2xl font-bold text-gray-900 mb-1 truncate">{stat.value}</p>
                  <p className="text-xs text-gray-500 line-clamp-2">{stat.description}</p>
                </div>
                <div
                  className={`p-3 rounded-lg ${
                    stat.color === 'blue' && 'bg-blue-100'
                  } ${stat.color === 'purple' && 'bg-purple-100'} ${
                    stat.color === 'green' && 'bg-green-100'
                  } ${stat.color === 'orange' && 'bg-orange-100'} ${
                    stat.color === 'yellow' && 'bg-yellow-100'
                  } ${stat.color === 'indigo' && 'bg-indigo-100'}`}
                >
                  <Icon
                    className={`w-6 h-6 ${
                      stat.color === 'blue' && 'text-blue-600'
                    } ${stat.color === 'purple' && 'text-purple-600'} ${
                      stat.color === 'green' && 'text-green-600'
                    } ${stat.color === 'orange' && 'text-orange-600'} ${
                      stat.color === 'yellow' && 'text-yellow-600'
                    } ${stat.color === 'indigo' && 'text-indigo-600'}`}
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
              {dashboardData.currentStage}
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Quick Actions */}
        <Card>
          <Card.Header>
            <Card.Title>Quick Actions</Card.Title>
            <Card.Description>Common tasks and shortcuts</Card.Description>
          </Card.Header>
          <Card.Content>
            <div className="grid grid-cols-1 gap-3">
              {quickActions.map((action) => {
                const Icon = action.icon;
                return (
                  <button
                    key={action.name}
                    onClick={() => navigate(action.path)}
                    className="flex items-start gap-3 p-4 rounded-lg border border-gray-200 hover:border-primary-300 hover:bg-primary-50 transition-all group w-full text-left"
                  >
                    <div
                      className={`p-2 rounded-lg ${
                        action.color === 'blue' && 'bg-blue-100 group-hover:bg-blue-200'
                      } ${action.color === 'purple' && 'bg-purple-100 group-hover:bg-purple-200'} ${
                        action.color === 'green' && 'bg-green-100 group-hover:bg-green-200'
                      } ${action.color === 'indigo' && 'bg-indigo-100 group-hover:bg-indigo-200'}`}
                    >
                      <Icon
                        className={`w-5 h-5 ${
                          action.color === 'blue' && 'text-blue-600'
                        } ${action.color === 'purple' && 'text-purple-600'} ${
                          action.color === 'green' && 'text-green-600'
                        } ${action.color === 'indigo' && 'text-indigo-600'}`}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 group-hover:text-primary-700">
                        {action.name}
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">{action.description}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-primary-600 mt-1" />
                  </button>
                );
              })}
            </div>
          </Card.Content>
        </Card>

        {/* Recent Activity */}
        <Card>
          <Card.Header>
            <Card.Title>Recent Activity</Card.Title>
            <Card.Description>Latest updates and notifications</Card.Description>
          </Card.Header>
          <Card.Content>
            <div className="space-y-4">
              {recentActivities.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <Bell className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                  <p>No recent activity</p>
                </div>
              ) : (
                recentActivities.map((activity, index) => {
                  const Icon = getActivityIcon(activity.type || activity.icon);
                  const color = getActivityColor(activity.type || activity.icon);
                  return (
                    <div
                      key={activity.id || index}
                      className="flex items-start gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div
                        className={`p-2 rounded-lg ${
                          color === 'green' && 'bg-green-100'
                        } ${color === 'blue' && 'bg-blue-100'} ${
                          color === 'purple' && 'bg-purple-100'
                        } ${color === 'orange' && 'bg-orange-100'} ${
                          color === 'gray' && 'bg-gray-100'
                        }`}
                      >
                        <Icon
                          className={`w-4 h-4 ${
                            color === 'green' && 'text-green-600'
                          } ${color === 'blue' && 'text-blue-600'} ${
                            color === 'purple' && 'text-purple-600'
                          } ${color === 'orange' && 'text-orange-600'} ${
                            color === 'gray' && 'text-gray-600'
                          }`}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900">{activity.message || activity.action}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{formatTimeAgo(activity.time || activity.timestamp)}</p>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200">
              <button
                onClick={() => navigate('/client/dashboard/support')}
                className="text-sm text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1"
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
