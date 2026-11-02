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
      <div className="text-center py-12 text-gray-500">
        No meetings scheduled
      </div>
    );
  }

  return (
    <div className="divide-y divide-gray-200">
      {meetings.map((meeting) => (
        <div
          key={meeting.id}
          className="p-4 hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Video className="w-6 h-6 text-primary-600" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-medium text-gray-900">
                    {meeting.user?.fullName || 'Unknown User'}
                  </h4>
                  <h4 className="font-medium text-gray-900">
                    {meeting.user?.fullName || 'Unknown User'}
                  </h4>
                  <Badge color={statusColors[meeting.status]} size="sm">
                    {meeting.status}
                  </Badge>
                </div>
                <p className="text-sm text-gray-500 mt-1">
                    {meeting.meetingType || 'Consultation'}
                </p>
                <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {format(new Date(meeting.scheduledAt), 'MMM d, yyyy h:mm a')}
                  </div>
                  <div className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    {meeting.assignedStaff?.fullName || 'Unassigned'}
                  </div>
                </div>
                {meeting.notes && (
                  <p className="text-sm text-gray-600 mt-2 bg-gray-50 p-2 rounded">
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

