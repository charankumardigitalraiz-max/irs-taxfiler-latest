import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { Eye, MoreVertical } from 'lucide-react';
import DataTable from '../common/DataTable';
import StatusBadge from '../common/StatusBadge';
import ProgressBar from '../common/ProgressBar';
import Button from '../common/Button';
import { getProgress } from '../../config/workflow';

const UserTable = ({ users, isLoading, pagination }) => {
  const navigate = useNavigate();
  
  const columns = [
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
      key: 'phone',
      header: 'Phone',
      render: (value) => (
        <span className="text-gray-600">{value || '-'}</span>
      ),
    },
    {
      key: 'currentStatus',
      header: 'Status',
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
      key: 'createdAt',
      header: 'Registered',
      render: (value) => (
        <span className="text-gray-600">
          {format(new Date(value), 'MMM d, yyyy')}
        </span>
      ),
    },
    {
      key: 'actions',
      header: '',
      render: (_, row) => (
        <div className="flex items-center justify-end gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/users/${row.id}`);
            }}
          >
            <Eye className="w-4 h-4" />
            View
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
      onRowClick={(row) => navigate(`/users/${row.id}`)}
      pagination={pagination}
      emptyMessage="No users found"
    />
  );
};

export default UserTable;

