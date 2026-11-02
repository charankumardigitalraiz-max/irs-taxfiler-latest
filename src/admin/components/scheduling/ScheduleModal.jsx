import { useState } from 'react';
import Modal from '../common/Modal';
import Button from '../common/Button';

const ScheduleModal = ({ isOpen, onClose, onSubmit, users = [], staff = [] }) => {
  const [formData, setFormData] = useState({
    userId: '',
    staffId: '',
    scheduledDateTime: '',
    duration: 30,
    meetingType: 'INTERVIEW',
    notes: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const scheduledAt = new Date(formData.scheduledDateTime);
    onSubmit({
      ...formData,
      scheduledAt: scheduledAt.toISOString(),
    });
    setFormData({
      userId: '',
      staffId: '',
      scheduledDateTime: '',
      duration: 30,
      meetingType: 'INTERVIEW',
      notes: '',
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Schedule Call"
      size="md"
    >
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-medium text-gray-700 mb-1 block">Select User *</label>
            <select
              value={formData.userId}
              onChange={(e) => setFormData({ ...formData, userId: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              required
            >
              <option value="">Select user...</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.fullName}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs font-medium text-gray-700 mb-1 block">Assign Staff</label>
            <select
              value={formData.staffId}
              onChange={(e) => setFormData({ ...formData, staffId: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="">Select staff...</option>
              {staff.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.fullName}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="text-xs font-medium text-gray-700 mb-1 block">Date & Time *</label>
          <input
            type="datetime-local"
            value={formData.scheduledDateTime}
            onChange={(e) => setFormData({ ...formData, scheduledDateTime: e.target.value })}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-medium text-gray-700 mb-1 block">Duration (minutes)</label>
            <select
              value={formData.duration}
              onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) })}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value={15}>15 minutes</option>
              <option value={30}>30 minutes</option>
              <option value={45}>45 minutes</option>
              <option value={60}>1 hour</option>
            </select>
          </div>
          <div>
            <label className="text-xs font-medium text-gray-700 mb-1 block">Meeting Type</label>
            <select
              value={formData.meetingType}
              onChange={(e) => setFormData({ ...formData, meetingType: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="INTERVIEW">Interview</option>
              <option value="CONSULTATION">Consultation</option>
              <option value="REVIEW">Review</option>
              <option value="FOLLOW_UP">Follow Up</option>
            </select>
          </div>
        </div>

        <div>
          <label className="text-xs font-medium text-gray-700 mb-1 block">Notes</label>
          <textarea
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
            rows={2}
            placeholder="Add any notes..."
          />
        </div>

        <div className="flex justify-end gap-2 pt-2 border-t border-gray-100">
          <Button type="button" variant="secondary" onClick={onClose} size="sm">
            Cancel
          </Button>
          <Button type="submit" size="sm">Schedule</Button>
        </div>
      </form>
    </Modal>
  );
};

export default ScheduleModal;

