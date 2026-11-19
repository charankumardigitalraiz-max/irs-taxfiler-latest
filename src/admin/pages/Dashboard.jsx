import {
  Users,
  FileText,
  Calendar,
  CheckCircle,
  Clock,
  AlertTriangle,
} from 'lucide-react';
import { useState, useEffect } from 'react';
import Header from '../components/layout/Header';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import StatCard from '../components/common/StatCard';
import { DashboardSkeleton } from '../components/common/PageLoader';
import { dashboardService } from '../services/dashboardService';
import { useToast } from '../hooks/useToast';
import { formatDistanceToNow } from 'date-fns';

const Dashboard = () => {
  const [stats, setStats] = useState([]);
  const [recentActivities, setRecentActivities] = useState([]);
  const [pendingActions, setPendingActions] = useState({
    interviews: 0,
    documents: 0,
    payments: 0,
    filings: 0,
  });
  const [loading, setLoading] = useState(true);
  const { showError } = useToast();

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      const response = await dashboardService.getDashboardStats();
      if (response.success) {
        const data = response.data;

        setStats([
          {
            name: 'Total Users',
            value: data.totalUsers?.toLocaleString() || '0',
            change: '',
            icon: Users,
            color: 'blue',
          },
          {
            name: 'Active Cases',
            value: data.activeCases?.toLocaleString() || '0',
            change: '',
            icon: FileText,
            color: 'purple',
          },
          {
            name: 'Pending Interviews',
            value: data.pendingInterviews?.toLocaleString() || '0',
            change: '',
            icon: Calendar,
            color: 'yellow',
          },
          {
            name: 'Pending Documents',
            value: data.pendingDocuments?.toLocaleString() || '0',
            change: '',
            icon: FileText,
            color: 'orange',
          },
        ]);

        setRecentActivities(data.recentActivities || []);

        setPendingActions({
          interviews: data.pendingInterviews || 0,
          documents: data.pendingDocuments || 0,
          payments: data.pendingPayments || 0,
          filings: data.activeCases || 0,
        });
      } else {
        showError('Failed to load dashboard data');
      }
    } catch (error) {
      console.error('Error loading dashboard data:', error);
      showError('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const formatTimeAgo = (timestamp) => {
    if (!timestamp) return 'Recently';
    try {
      return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
    } catch {
      return 'Recently';
    }
  };

  return (
    <div>
      <Header
        title="Dashboard"
        subtitle="Welcome back! Here's what's happening with your tax cases."
      />

      {loading ? (
        <DashboardSkeleton />
      ) : (
        <div className="space-y-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {stats.map((stat) => (
              <StatCard key={stat.name} stat={stat} />
            ))}
          </div>

          {/* Recent Activity & Pending Actions */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card padding="none">
              <Card.Header className="p-4 sm:p-6">
                <Card.Title>Recent Activity</Card.Title>
                <Card.Description>Latest updates from your cases</Card.Description>
              </Card.Header>
              <Card.Content className="p-4 sm:p-6 pt-0">
                <div className="space-y-3">
                  {recentActivities.length === 0 ? (
                    <div className="text-center py-12 text-[#6F7F8E]">
                      <Clock className="w-10 h-10 mx-auto mb-2 text-slate-300" />
                      <p className="text-sm font-medium">No recent activity found</p>
                    </div>
                  ) : (
                    recentActivities.map((activity, index) => (
                      <div
                        key={activity.id || index}
                        className="flex items-start gap-3.5 p-3 rounded-xl hover:bg-[#F4F9FB]/70 transition-colors group"
                      >
                        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-[#1F4264] to-[#127EAB] text-white flex items-center justify-center font-semibold text-xs sm:text-sm flex-shrink-0 shadow-xs">
                          {activity.user?.charAt(0)?.toUpperCase() || 'U'}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <p className="text-xs sm:text-sm font-semibold text-[#1F4264] truncate">
                              {activity.user || 'Unknown User'}
                            </p>
                            <Badge color="blue" size="sm">
                              {activity.type || 'status'}
                            </Badge>
                          </div>
                          <p className="text-xs sm:text-sm text-[#6F7F8E] line-clamp-1 mt-0.5">
                            {activity.action}
                          </p>
                          <p className="text-[11px] text-[#8BA0B2] mt-1 flex items-center gap-1 font-medium">
                            <Clock className="w-3 h-3" />
                            {formatTimeAgo(activity.time)}
                          </p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </Card.Content>
            </Card>

            {/* Pending Actions */}
            <Card padding="none">
              <Card.Header className="p-4 sm:p-6">
                <Card.Title>Pending Actions</Card.Title>
                <Card.Description>Items requiring your attention</Card.Description>
              </Card.Header>
              <Card.Content className="p-4 sm:p-6 pt-0">
                <div className="space-y-3.5">
                  {pendingActions.interviews > 0 && (
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-[#FFFBEB]/70 rounded-xl border border-[#FDE68A]">
                      <div className="flex items-center gap-3">
                        <div className="p-2.5 bg-[#FEF3C7] rounded-lg">
                          <AlertTriangle className="w-5 h-5 text-[#D97706]" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-[#92400E]">
                            {pendingActions.interviews} Interviews Pending
                          </p>
                          <p className="text-xs text-[#B45309]">
                            Schedule or complete client interviews
                          </p>
                        </div>
                      </div>
                      <Badge color="yellow" className="self-start sm:self-center">
                        Urgent
                      </Badge>
                    </div>
                  )}

                  {pendingActions.documents > 0 && (
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-[#E9F7FA]/70 rounded-xl border border-[#B9E6F2]">
                      <div className="flex items-center gap-3">
                        <div className="p-2.5 bg-[#D4F1F7] rounded-lg">
                          <FileText className="w-5 h-5 text-[#127EAB]" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-[#0E668B]">
                            {pendingActions.documents} Documents to Review
                          </p>
                          <p className="text-xs text-[#127EAB]">
                            Review and approve uploaded documents
                          </p>
                        </div>
                      </div>
                      <Badge color="blue" className="self-start sm:self-center">
                        Review
                      </Badge>
                    </div>
                  )}

                  {pendingActions.interviews === 0 && pendingActions.documents === 0 && (
                    <div className="text-center py-12 text-[#6F7F8E]">
                      <CheckCircle className="w-10 h-10 mx-auto mb-2 text-[#059669]/60" />
                      <p className="text-sm font-semibold text-[#1F4264]">No pending actions</p>
                      <p className="text-xs text-[#8BA0B2] mt-1">You're all caught up!</p>
                    </div>
                  )}
                </div>
              </Card.Content>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
