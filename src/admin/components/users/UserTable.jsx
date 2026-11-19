import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { Eye, Mail, Send, Trash2 } from 'lucide-react';
import DataTable from '../common/DataTable';
import StatusBadge from '../common/StatusBadge';
import ProgressBar from '../common/ProgressBar';
import Button from '../common/Button';
import { getProgress } from '../../config/workflow';
import { useToast } from '../../hooks/useToast';
import Modal from '../common/Modal';
import { useState } from 'react';

const UserTable = ({
  users,
  isLoading,
  pagination,
  selectedUserIds = [],
  onSelectUser,
  onSelectAll,
  onDeleteUser,
  onToggleActive,
}) => {
  const navigate = useNavigate();
  const { showSuccess, showError } = useToast();
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [message, setMessage] = useState('');

  const handleSendUpdates = (user) => {
    setSelectedUser(user);
    setShowMessageModal(true);
    setMessage('');
  };

  const handleSubmitMessage = async () => {
    if (!message.trim()) {
      showError('Please enter a message');
      return;
    }

    try {
      showSuccess(`Update sent to ${selectedUser.fullName || selectedUser.email}`);
      setShowMessageModal(false);
      setMessage('');
      setSelectedUser(null);
    } catch (error) {
      showError('Failed to send update. Please try again.');
    }
  };

  const columns = [
    {
      key: 'selection',
      header: (
        <input
          type="checkbox"
          onChange={(e) => onSelectAll?.(e.target.checked)}
          checked={users.length > 0 && selectedUserIds.length === users.length}
          className="rounded border-[#CCDCE1] text-[#127EAB] focus:ring-[#127EAB] cursor-pointer"
        />
      ),
      render: (_, row) => (
        <input
          type="checkbox"
          checked={selectedUserIds.includes(row.id)}
          onChange={() => onSelectUser?.(row.id)}
          onClick={(e) => e.stopPropagation()}
          className="rounded border-[#CCDCE1] text-[#127EAB] focus:ring-[#127EAB] cursor-pointer"
        />
      ),
      width: '40px',
    },
    {
      key: 'displayId',
      header: 'User ID',
      render: (value) => (
        <span className="inline-flex px-2 py-0.5 rounded text-xs font-mono font-medium text-[#127EAB] bg-[#E9F7FA]">
          {value}
        </span>
      ),
    },
    {
      key: 'fullName',
      header: 'User',
      render: (value, row) => (
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#1F4264] to-[#127EAB] text-white flex items-center justify-center font-semibold text-xs shadow-xs shrink-0">
            {value?.charAt(0)?.toUpperCase() || 'U'}
          </div>
          <div className="min-w-0">
            <p className="font-semibold text-sm text-[#1F4264] truncate leading-tight">
              {value}
            </p>
            <p className="text-xs text-[#6F7F8E] truncate mt-0.5">{row.email}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'isActive',
      header: 'Status',
      render: (value, row) => (
        <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={value}
              onChange={() => onToggleActive?.(row.id)}
            />
            <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#127EAB]"></div>
          </label>
          <span className={`text-xs font-semibold ${value ? 'text-[#059669]' : 'text-[#8BA0B2]'}`}>
            {value ? 'Active' : 'Inactive'}
          </span>
        </div>
      ),
    },
    {
      key: 'currentStatus',
      header: 'Workflow',
      render: (value) => <StatusBadge status={value} />,
    },
    {
      key: 'progress',
      header: 'Progress',
      render: (_, row) => {
        const progress = getProgress(row.currentStatus);
        return (
          <div className="w-28 sm:w-32">
            <ProgressBar value={progress} size="sm" />
            <p className="mt-1 text-[11px] font-medium text-[#6F7F8E]">{progress}%</p>
          </div>
        );
      },
    },
    {
      key: 'assignedStaff',
      header: 'Assigned To',
      render: (value) => (
        <span className="text-xs sm:text-sm font-medium text-[#1F4264]">
          {value?.fullName || 'Unassigned'}
        </span>
      ),
    },
    {
      key: 'actions',
      header: '',
      render: (_, row) => (
        <div className="flex items-center justify-end gap-1.5">
          {row.email && (
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                window.location.href = `mailto:${row.email}`;
              }}
              title="Send Email"
              className="p-1.5"
            >
              <Mail className="w-4 h-4 text-[#127EAB]" />
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              handleSendUpdates(row);
            }}
            title="Send Updates"
            className="p-1.5"
          >
            <Send className="w-4 h-4 text-[#127EAB]" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/admin/users/${row.id}`);
            }}
            title="View Details"
            className="p-1.5"
          >
            <Eye className="w-4 h-4 text-[#1F4264]" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="p-1.5 text-[#EE6450] hover:text-[#D9523E] hover:bg-[#FEF4F2]"
            onClick={(e) => {
              e.stopPropagation();
              onDeleteUser?.(row.id);
            }}
            title="Delete User"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <>
      <DataTable
        columns={columns}
        data={users}
        isLoading={isLoading}
        onRowClick={(row) => navigate(`/admin/users/${row.id}`)}
        pagination={pagination}
        emptyMessage="No users found"
      />

      {/* Message Modal */}
      <Modal
        isOpen={showMessageModal}
        onClose={() => {
          setShowMessageModal(false);
          setMessage('');
          setSelectedUser(null);
        }}
        title={`Send Update to ${selectedUser?.fullName || selectedUser?.email || 'User'}`}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#1F4264] uppercase tracking-wider mb-1.5">
              Message
            </label>
            <textarea
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your update message here..."
              className="w-full px-3.5 py-2.5 text-sm border border-[#DCEAF0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#127EAB]/20 focus:border-[#127EAB] bg-[#F8FBFC] text-[#1F4264] placeholder-[#8BA0B2] transition-all"
            />
          </div>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => {
                setShowMessageModal(false);
                setMessage('');
                setSelectedUser(null);
              }}
            >
              Cancel
            </Button>
            <Button variant="primary" onClick={handleSubmitMessage}>
              Send Update
            </Button>
          </Modal.Footer>
        </div>
      </Modal>
    </>
  );
};

export default UserTable;
