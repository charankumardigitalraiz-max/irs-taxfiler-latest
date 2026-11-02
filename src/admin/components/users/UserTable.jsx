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
  onToggleActive
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
      console.log('Sending update to user:', selectedUser.id, message);
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
          className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
        />
      ),
      render: (_, row) => (
        <input
          type="checkbox"
          checked={selectedUserIds.includes(row.id)}
          onChange={() => onSelectUser?.(row.id)}
          onClick={(e) => e.stopPropagation()}
          className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
        />
      ),
      width: '40px',
    },
    {
      key: 'displayId',
      header: 'User ID',
      render: (value) => (
        <span className="text-sm font-mono text-gray-600">{value}</span>
      ),
    },
    {
      key: 'fullName',
      header: 'User',
      render: (value, row) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
            <span className="text-sm font-semibold text-primary-700">
              {value?.charAt(0) || 'U'}
            </span>
          </div>
          <div>
            <p className="font-medium text-gray-900">{value}</p>
            <p className="text-sm text-gray-500">{row.email}</p>
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
            <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary-600"></div>
          </label>
          <span className={`text-xs font-medium ${value ? 'text-green-600' : 'text-gray-400'}`}>
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
          <div className="w-32">
            <ProgressBar value={progress} size="sm" />
            <p className="mt-1 text-xs text-gray-500">{progress}%</p>
          </div>
        );
      },
    },
    {
      key: 'assignedStaff',
      header: 'Assigned To',
      render: (value) => (
        <span className="text-gray-600">
          {value?.fullName || 'Unassigned'}
        </span>
      ),
    },
    {
      key: 'actions',
      header: '',
      render: (_, row) => (
        <div className="flex items-center justify-end gap-2">
          {row.email && (
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                window.location.href = `mailto:${row.email}`;
              }}
              title="Send Email"
            >
              <Mail className="w-4 h-4" />
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
          >
            <Send className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/admin/users/${row.id}`);
            }}
            title="View Details"
          >
            <Eye className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-red-600 hover:text-red-700 hover:bg-red-50"
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
    <DataTable
      columns={columns}
      data={users}
      isLoading={isLoading}
      onRowClick={(row) => navigate(`/admin/users/${row.id}`)}
      pagination={pagination}
      emptyMessage="No users found"
    />
  );
};

export default UserTable;

