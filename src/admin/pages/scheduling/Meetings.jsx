import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ChevronDown } from 'lucide-react';
import Header from '../../components/layout/Header';
import Card from '../../components/common/Card';
import StatCard from '../../components/common/StatCard';
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
          <StatCard name="Total Meetings" value={stats.total} />
          <StatCard name="Pending" value={stats.pending} valueColor="text-[#D97706]" />
          <StatCard name="Completed" value={stats.completed} valueColor="text-[#059669]" />
          <StatCard name="Today" value={stats.today} valueColor="text-[#127EAB]" />
        </div>

        {/* Meetings List */}
        <Card padding="none">
          <div className="p-4 sm:p-5 border-b border-[#E6F0F5] bg-white">
            <div className="flex flex-col sm:flex-row gap-4 sm:items-center justify-between">
              {/* Search by User */}
              <div className="relative w-full sm:w-64 md:w-72 shrink-0">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8BA0B2]" />
                <input
                  type="text"
                  placeholder="Search by name or email..."
                  value={userSearch}
                  onChange={(e) => setUserSearch(e.target.value)}
                  className="w-full h-10 pl-10 pr-4 text-sm border border-[#CCDCE1] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#127EAB]/20 focus:border-[#127EAB] bg-white text-[#1F4264] placeholder-[#8BA0B2] transition-all shadow-xs"
                />
              </div>

              {/* Status Filter */}
              <div className="relative w-full sm:w-48 shrink-0">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full h-10 pl-3.5 pr-9 text-sm border border-[#CCDCE1] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#127EAB]/20 focus:border-[#127EAB] bg-white text-[#1F4264] transition-all cursor-pointer appearance-none shadow-xs"
                >
                  <option value="">All Status</option>
                  <option value="PENDING">Pending</option>
                  <option value="COMPLETED">Completed</option>
                  <option value="RESCHEDULED">Rescheduled</option>
                  <option value="CANCELLED">Cancelled</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8BA0B2] pointer-events-none" />
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

