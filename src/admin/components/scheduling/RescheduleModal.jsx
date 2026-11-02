import { useState, useEffect } from 'react';
import Modal from '../common/Modal';
import Button from '../common/Button';

const RescheduleModal = ({ isOpen, onClose, onSubmit, meeting }) => {
  const [formData, setFormData] = useState({
    scheduledDateTime: '',
    notes: '',
  });

  useEffect(() => {
    if (meeting && isOpen) {
      // Convert ISO date to datetime-local format (YYYY-MM-DDTHH:mm)
      const meetingDate = new Date(meeting.scheduledAt);
      const year = meetingDate.getFullYear();
      const month = String(meetingDate.getMonth() + 1).padStart(2, '0');
      const day = String(meetingDate.getDate()).padStart(2, '0');
      const hours = String(meetingDate.getHours()).padStart(2, '0');
      const minutes = String(meetingDate.getMinutes()).padStart(2, '0');
      const datetimeLocal = `${year}-${month}-${day}T${hours}:${minutes}`;

      setFormData({
        scheduledDateTime: datetimeLocal,
        notes: meeting.notes || '',
      });
    }
  }, [meeting, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const scheduledAt = new Date(formData.scheduledDateTime);
    onSubmit({
      ...meeting,
      scheduledAt: scheduledAt.toISOString(),
      notes: formData.notes,
      status: 'RESCHEDULED',
    });
    setFormData({
      scheduledDateTime: '',
      notes: '',
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Reschedule Call"
      size="md"
    >
      <form onSubmit={handleSubmit} className="space-y-3">
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

        <div>
          <label className="text-xs font-medium text-gray-700 mb-1 block">Notes</label>
          <textarea
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
            rows={3}
            placeholder="Reason for rescheduling..."
          />
        </div>

        <div className="flex justify-end gap-2 pt-2 border-t border-gray-100">
          <Button type="button" variant="secondary" onClick={onClose} size="sm">
            Cancel
          </Button>
          <Button type="submit" size="sm">Reschedule</Button>
        </div>
      </form>
    </Modal>
  );
};

export default RescheduleModal;

