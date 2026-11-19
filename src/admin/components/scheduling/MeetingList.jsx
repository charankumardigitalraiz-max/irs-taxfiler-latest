import { format } from 'date-fns';
import { Calendar, Clock, User, Video, MoreVertical } from 'lucide-react';
import { clsx } from 'clsx';
import Badge from '../common/Badge';
import Button from '../common/Button';
import { MEETING_STATUS } from '../../utils/constants';

const statusColors = {
  PENDING: 'yellow',
  COMPLETED: 'green',
  RESCHEDULED: 'blue',
  CANCELLED: 'red',
};

const MeetingList = ({ meetings, onUpdate, onViewUser, onReschedule }) => {
  if (!meetings || meetings.length === 0) {
    return (
      <div className="text-center py-12 text-[#6F7F8E] font-medium text-sm">
        No meetings scheduled
      </div>
    );
  }

  return (
    <div className="divide-y divide-[#E6F0F5]">
      {meetings.map((meeting) => (
        <div
          key={meeting.id}
          className="p-4 sm:p-5 hover:bg-[#F4F9FB]/60 transition-colors"
        >
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 bg-[#E9F7FA] border border-[#127EAB]/20 rounded-lg flex items-center justify-center shrink-0">
                <Video className="w-5 h-5 text-[#127EAB]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-semibold text-sm sm:text-base text-[#1F4264]">
                    {meeting.user?.fullName || 'Unknown User'}
                  </h4>
                  <Badge color={statusColors[meeting.status]} size="sm">
                    {meeting.status}
                  </Badge>
                </div>
                <p className="text-xs sm:text-sm text-[#6F7F8E] mt-0.5">
                    {meeting.meetingType || 'Consultation'}
                </p>
                <div className="flex items-center gap-4 mt-2 text-xs sm:text-sm text-[#6F7F8E]">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-[#8BA0B2]" />
                    <span>{format(new Date(meeting.scheduledAt), 'MMM d, yyyy h:mm a')}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <User className="w-4 h-4 text-[#8BA0B2]" />
                    <span>{meeting.assignedStaff?.fullName || 'Unassigned'}</span>
                  </div>
                </div>
                {meeting.notes && (
                  <p className="text-xs sm:text-sm text-[#1F4264] mt-2 bg-[#F8FBFC] border border-[#E6F0F5] p-2.5 rounded-lg">
                    {meeting.notes}
                  </p>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2">
              {meeting.status === 'PENDING' && (
                <>
                  <Button
                    size="sm"
                    variant="success"
                    onClick={() => onUpdate(meeting.id, 'COMPLETED')}
                  >
                    Complete
                  </Button>
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => onReschedule(meeting)}
                  >
                    Reschedule
                  </Button>
                </>
              )}
              <Button
                size="sm"
                variant="ghost"
                onClick={() => onViewUser(meeting.userId)}
              >
                View User
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MeetingList;

