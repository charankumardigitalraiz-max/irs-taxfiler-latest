import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import Header from '../../components/layout/Header';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import MeetingList from '../../components/scheduling/MeetingList';
import ScheduleModal from '../../components/scheduling/ScheduleModal';
import RescheduleModal from '../../components/scheduling/RescheduleModal';
import { meetingService } from '../../services/meetingService';
import { userService } from '../../services/userService';
import { useToast } from '../../hooks/useToast';

const Meetings = () => {
  const navigate = useNavigate();
  const [meetings, setMeetings] = useState([]);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [showRescheduleModal, setShowRescheduleModal] = useState(false);
  const [selectedMeeting, setSelectedMeeting] = useState(null);
  const [statusFilter, setStatusFilter] = useState('');
  const [userSearch, setUserSearch] = useState('');
  const { showError, showSuccess } = useToast();

  const mapBackendToUiStatus = (status) => {
    switch (status) {
      case 'scheduled':
        return 'PENDING';
      case 'completed':
        return 'COMPLETED';
      case 'rescheduled':
        return 'RESCHEDULED';
      case 'cancelled':
        return 'CANCELLED';
      default:
        return 'PENDING';
    }
  };

  const mapUiToBackendStatus = (status) => {
    switch (status) {
      case 'PENDING':
        return 'scheduled';
      case 'COMPLETED':
        return 'completed';
      case 'RESCHEDULED':
        return 'rescheduled';
      case 'CANCELLED':
        return 'cancelled';
      default:
        return 'scheduled';
    }
  };

  // Load meetings and users
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Fetch meetings with filters
        const meetingRes = await meetingService.getMeetings({
          status: statusFilter ? mapUiToBackendStatus(statusFilter) : undefined,
          search: userSearch || undefined,
          limit: 100,
        });

        const normalizedMeetings = (meetingRes.data || []).map((m) => ({
          id: m._id,
          userId: m.user?._id,
          user: m.user,
          assignedStaff: m.createdBy || null,
          scheduledAt: m.scheduledAt,
          duration: m.duration || 30,
          status: mapBackendToUiStatus(m.status),
          meetingType: m.meetingType || 'Consultation',
          notes: m.notes,
        }));

        setMeetings(normalizedMeetings);

        // Fetch users for scheduling dropdown (registered users)
        const userRes = await userService.getUsers({
          userType: 'registered',
          limit: 100,
        });

        const normalizedUsers = (userRes.data || []).map((u) => ({
          id: u._id,
          fullName: u.fullName || u.email,
        }));

        setUsers(normalizedUsers);
      } catch (error) {
        console.error('Error loading meetings/users:', error);
        showError('Failed to load Free to Call data. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusFilter, userSearch]);

  const filteredMeetings = meetings.filter((m) => {
    const matchesStatus = !statusFilter || m.status === statusFilter;
    const matchesUser = !userSearch ||
      (m.user?.fullName && m.user.fullName.toLowerCase().includes(userSearch.toLowerCase())) ||
      (m.user?.email && m.user.email.toLowerCase().includes(userSearch.toLowerCase()));
    return matchesStatus && matchesUser;
  });

  const handleUpdateStatus = async (id, status) => {
    try {
      const backendStatus = mapUiToBackendStatus(status);
      await meetingService.updateMeeting(id, { status: backendStatus });

      setMeetings((prev) =>
        prev.map((m) => (m.id === id ? { ...m, status } : m))
      );
    } catch (error) {
      console.error('Error updating meeting status:', error);
      showError('Failed to update meeting status. Please try again.');
    }
  };

  const handleSchedule = async (data) => {
    try {
      const res = await meetingService.createMeeting({
        userId: data.userId,
        scheduledAt: data.scheduledAt,
        notes: data.notes,
        duration: data.duration,
        meetingType: data.meetingType,
      });

      if (res.data) {
        const m = res.data;
        const normalized = {
          id: m._id,
          userId: m.user?._id,
          user: m.user,
          assignedStaff: m.createdBy || null,
          scheduledAt: m.scheduledAt,
          duration: m.duration || 30,
          status: mapBackendToUiStatus(m.status),
          meetingType: m.meetingType || 'Consultation',
          notes: m.notes,
        };

        setMeetings((prev) => [normalized, ...prev]);
      }

      setShowScheduleModal(false);
    } catch (error) {
      console.error('Error scheduling meeting:', error);
      showError('Failed to schedule meeting. Please try again.');
    }
  };

  const handleReschedule = (meeting) => {
    setSelectedMeeting(meeting);
    setShowRescheduleModal(true);
  };

  const handleRescheduleSubmit = async (data) => {
    try {
      await meetingService.updateMeeting(data.id, {
        scheduledAt: data.scheduledAt,
        notes: data.notes,
        status: mapUiToBackendStatus('RESCHEDULED'),
      });

      setMeetings((prev) =>
        prev.map((m) =>
          m.id === data.id
            ? {
              ...m,
              scheduledAt: data.scheduledAt,
              notes: data.notes,
              status: 'RESCHEDULED',
            }
            : m
        )
      );
      setShowRescheduleModal(false);
      setSelectedMeeting(null);
    } catch (error) {
      console.error('Error rescheduling meeting:', error);
      showError('Failed to reschedule meeting. Please try again.');
    }
  };

  const stats = {
    total: meetings.length,
    pending: meetings.filter((m) => m.status === 'PENDING').length,
    completed: meetings.filter((m) => m.status === 'COMPLETED').length,
    today: meetings.filter((m) => {
      const meetingDate = new Date(m.scheduledAt).toDateString();
      return meetingDate === new Date().toDateString();
    }).length,
  };

  return (
    <div>
      <Header
        title="Free to Call"
        subtitle="Manage meetings and consultations"
      />

      <div className="space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="p-4 rounded-xl">
            <p className="text-xs sm:text-sm font-medium text-gray-500">Total Meetings</p>
            <p className="text-xl sm:text-2xl font-bold text-gray-900 mt-1">{stats.total}</p>
          </Card>
          <Card className="p-4 rounded-xl">
            <p className="text-xs sm:text-sm font-medium text-gray-500">Pending</p>
            <p className="text-xl sm:text-2xl font-bold text-yellow-600 mt-1">{stats.pending}</p>
          </Card>
          <Card className="p-4 rounded-xl">
            <p className="text-xs sm:text-sm font-medium text-gray-500">Completed</p>
            <p className="text-xl sm:text-2xl font-bold text-green-600 mt-1">{stats.completed}</p>
          </Card>
          <Card className="p-4 rounded-xl">
            <p className="text-xs sm:text-sm font-medium text-gray-500">Today</p>
            <p className="text-xl sm:text-2xl font-bold text-blue-600 mt-1">{stats.today}</p>
          </Card>
        </div>

        {/* Meetings List */}
        <Card padding="none">
          <div className="p-4 sm:p-6 border-b border-gray-100 bg-gray-50/50">
            <div className="flex flex-col xl:flex-row gap-4 xl:items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-gray-900">All Meetings</h3>
                <p className="text-sm text-gray-500 mt-0.5">Track and manage consultation requests</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 w-full xl:w-auto">
                {/* Search by User */}
                <div className="relative flex-1 sm:min-w-[300px]">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by name or email..."
                    value={userSearch}
                    onChange={(e) => setUserSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white transition-all shadow-sm"
                  />
                </div>
                {/* Status Filter */}
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white transition-all shadow-sm min-w-[140px]"
                >
                  <option value="">All Status</option>
                  <option value="PENDING">Pending</option>
                  <option value="COMPLETED">Completed</option>
                  <option value="RESCHEDULED">Rescheduled</option>
                  <option value="CANCELLED">Cancelled</option>
                </select>
              </div>
            </div>
          </div>
          <div className="overflow-hidden">
            <MeetingList
              meetings={filteredMeetings}
              onUpdate={handleUpdateStatus}
              onViewUser={(id) => navigate(`/admin/users/${id}`)}
              onReschedule={handleReschedule}
            />
          </div>
        </Card>
      </div>

      <ScheduleModal
        isOpen={showScheduleModal}
        onClose={() => setShowScheduleModal(false)}
        onSubmit={handleSchedule}
        users={users}
        staff={[]}
      />

      <RescheduleModal
        isOpen={showRescheduleModal}
        onClose={() => {
          setShowRescheduleModal(false);
          setSelectedMeeting(null);
        }}
        onSubmit={handleRescheduleSubmit}
        meeting={selectedMeeting}
      />
    </div>
  );
};

export default Meetings;

