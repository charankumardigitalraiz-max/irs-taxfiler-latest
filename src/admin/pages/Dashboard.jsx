import {
  Users,
  FileText,
  Calendar,
  CreditCard,
  CheckCircle,
  Clock,
  TrendingUp,
  AlertTriangle,
} from 'lucide-react';
import { useState, useEffect } from 'react';
import Header from '../components/layout/Header';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import { dashboardService } from '../services/dashboardService';
import { useToast } from '../hooks/useToast';
import { format, formatDistanceToNow } from 'date-fns';

// Stats will be loaded from API

const StatCard = ({ stat }) => {
  const Icon = stat.icon;
  const hasChange = stat.change && stat.change.trim() !== '';
  const isPositive = hasChange && stat.change.startsWith('+');

  const colorClasses = {
    blue: { bg: 'bg-blue-100', text: 'text-blue-600' },
    purple: { bg: 'bg-purple-100', text: 'text-purple-600' },
    yellow: { bg: 'bg-yellow-100', text: 'text-yellow-600' },
    orange: { bg: 'bg-orange-100', text: 'text-orange-600' },
    red: { bg: 'bg-red-100', text: 'text-red-600' },
    green: { bg: 'bg-green-100', text: 'text-green-600' },
  };

  const colorClass = colorClasses[stat.color] || colorClasses.blue;

  return (
    <Card className="p-4 sm:p-6">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <p className="text-xs sm:text-sm font-medium text-gray-500 truncate">{stat.name}</p>
          <p className="mt-2 text-2xl sm:text-3xl font-bold text-gray-900 truncate">{stat.value}</p>
          {hasChange && (
            <div className="mt-2 flex items-center gap-1">
              <span
                className={`text-xs sm:text-sm font-medium ${isPositive ? 'text-green-600' : 'text-red-600'
                  }`}
              >
                {stat.change}
              </span>
              <span className="text-xs sm:text-sm text-gray-500 hidden sm:inline">vs last month</span>
            </div>
          )}
        </div>
        <div className={`p-2 sm:p-3 rounded-lg flex-shrink-0 ${colorClass.bg}`}>
          <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${colorClass.text}`} />
        </div>
      </div>
    </Card>
  );
};

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

        // Set stats
        setStats([
          { name: 'Total Users', value: data.totalUsers?.toLocaleString() || '0', change: '', icon: Users, color: 'blue' },
          { name: 'Active Cases', value: data.activeCases?.toLocaleString() || '0', change: '', icon: FileText, color: 'purple' },
          { name: 'Pending Interviews', value: data.pendingInterviews?.toLocaleString() || '0', change: '', icon: Calendar, color: 'yellow' },
          { name: 'Pending Documents', value: data.pendingDocuments?.toLocaleString() || '0', change: '', icon: FileText, color: 'orange' },
          /*
                    { name: 'Pending Payments', value: data.pendingPayments?.toLocaleString() || '0', change: '', icon: CreditCard, color: 'red' },
                    { name: 'E-Filing Completed', value: data.eFilingCompleted?.toLocaleString() || '0', change: '', icon: CheckCircle, color: 'green' },
                    { name: 'Paper Filing Done', value: data.paperFilingDone?.toLocaleString() || '0', change: '', icon: CheckCircle, color: 'green' },
                    { name: 'Accepted Filings', value: data.acceptedFilings?.toLocaleString() || '0', change: '', icon: TrendingUp, color: 'green' },
          */

        ]);

        // Set recent activities
        setRecentActivities(data.recentActivities || []);

        // Set pending actions
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

  if (loading) {
    return (
      <div>
        <Header
          title="Dashboard"
          subtitle="Welcome back! Here's what's happening with your tax cases."
        />
        <div className="p-6 flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600" />
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header
        title="Dashboard"
        subtitle="Welcome back! Here's what's happening with your tax cases."
      />

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
              <div className="space-y-4">
                {recentActivities.length === 0 ? (
                  <div className="text-center py-12 text-gray-500">
                    <Clock className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                    <p className="text-sm">No recent activity found</p>
                  </div>
                ) : (
                  recentActivities.map((activity, index) => (
                    <div
                      key={activity.id || index}
                      className="flex items-start gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors group"
                    >
                      <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                        <span className="text-sm font-bold text-primary-700 uppercase">
                          {activity.user?.charAt(0) || 'U'}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <p className="text-sm font-semibold text-gray-900 truncate">
                            {activity.user || 'Unknown User'}
                          </p>
                          <Badge color="blue" size="sm" className="opacity-80">
                            {activity.type || 'status'}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 line-clamp-1 mt-0.5">{activity.action}</p>
                        <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
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
              <div className="space-y-4">
                {pendingActions.interviews > 0 && (
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-yellow-50/50 rounded-xl border border-yellow-100">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-yellow-100 rounded-lg">
                        <AlertTriangle className="w-5 h-5 text-yellow-600" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-yellow-900">{pendingActions.interviews} Interviews Pending</p>
                        <p className="text-xs text-yellow-700">Schedule or complete interviews</p>
                      </div>
                    </div>
                    <Badge color="yellow" className="self-start sm:self-center">Urgent</Badge>
                  </div>
                )}

                {pendingActions.documents > 0 && (
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-primary-50/50 rounded-xl border border-primary-100">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary-100 rounded-lg">
                        <FileText className="w-5 h-5 text-primary-600" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-primary-900">{pendingActions.documents} Documents to Review</p>
                        <p className="text-xs text-primary-700">Review and approve documents</p>
                      </div>
                    </div>
                    <Badge color="blue" className="self-start sm:self-center">Review</Badge>
                  </div>
                )}

                {pendingActions.interviews === 0 && pendingActions.documents === 0 && (
                  <div className="text-center py-12 text-gray-500">
                    <CheckCircle className="w-12 h-12 mx-auto mb-3 text-green-400 opacity-50" />
                    <p className="text-sm font-medium">No pending actions</p>
                    <p className="text-xs text-gray-400 mt-1">You're all caught up!</p>
                  </div>
                )}
              </div>
            </Card.Content>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

