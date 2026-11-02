import { useState } from 'react';
import Modal from '../common/Modal';
import Button from '../common/Button';

const ScheduleModal = ({ isOpen, onClose, onSubmit, users = [], staff = [] }) => {
  const [formData, setFormData] = useState({
    userId: '',
    staffId: '',
    scheduledAt: '',
    scheduledTime: '',
    duration: 30,
    meetingType: 'INTERVIEW',
    notes: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const scheduledAt = new Date(`${formData.scheduledAt}T${formData.scheduledTime}`);
    onSubmit({
      ...formData,
      scheduledAt: scheduledAt.toISOString(),
    });
    setFormData({
      userId: '',
      staffId: '',
      scheduledAt: '',
      scheduledTime: '',
      duration: 30,
      meetingType: 'INTERVIEW',
      notes: '',
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Schedule Meeting"
      description="Schedule a new consultation or interview"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="label">Select User *</label>
            <select
              value={formData.userId}
              onChange={(e) => setFormData({ ...formData, userId: e.target.value })}
              className="input"
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
            <label className="label">Assign Staff</label>
            <select
              value={formData.staffId}
              onChange={(e) => setFormData({ ...formData, staffId: e.target.value })}
              className="input"
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

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="label">Date *</label>
            <input
              type="date"
              value={formData.scheduledAt}
              onChange={(e) => setFormData({ ...formData, scheduledAt: e.target.value })}
              className="input"
              required
            />
          </div>
          <div>
            <label className="label">Time *</label>
            <input
              type="time"
              value={formData.scheduledTime}
              onChange={(e) => setFormData({ ...formData, scheduledTime: e.target.value })}
              className="input"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="label">Duration (minutes)</label>
            <select
              value={formData.duration}
              onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) })}
              className="input"
            >
              <option value={15}>15 minutes</option>
              <option value={30}>30 minutes</option>
              <option value={45}>45 minutes</option>
              <option value={60}>1 hour</option>
            </select>
          </div>
          <div>
            <label className="label">Meeting Type</label>
            <select
              value={formData.meetingType}
              onChange={(e) => setFormData({ ...formData, meetingType: e.target.value })}
              className="input"
            >
              <option value="INTERVIEW">Interview</option>
              <option value="CONSULTATION">Consultation</option>
              <option value="REVIEW">Review</option>
              <option value="FOLLOW_UP">Follow Up</option>
            </select>
          </div>
        </div>

        <div>
          <label className="label">Notes</label>
          <textarea
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            className="input resize-none"
            rows={3}
            placeholder="Add any notes for this meeting..."
          />
        </div>

        <Modal.Footer>
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">Schedule Meeting</Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default ScheduleModal;

