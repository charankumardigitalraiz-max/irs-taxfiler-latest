import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Send, FileText, CheckCircle } from 'lucide-react';
import { format } from 'date-fns';
import Header from '../../components/layout/Header';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import DataTable from '../../components/common/DataTable';

// Mock data
const mockFilings = [
  {
    id: '1',
    userId: '1',
    user: { fullName: 'John Doe', email: 'john@example.com' },
    filingType: 'E_FILING',
    submissionDate: new Date(Date.now() - 86400000).toISOString(),
    confirmationNumber: 'EF-2024-001234',
    acceptanceStatus: 'ACCEPTED',
    acceptanceDate: new Date().toISOString(),
    taxYear: 2023,
  },
  {
    id: '2',
    userId: '2',
    user: { fullName: 'Jane Smith', email: 'jane@example.com' },
    filingType: 'E_FILING',
    submissionDate: new Date(Date.now() - 172800000).toISOString(),
    confirmationNumber: 'EF-2024-001235',
    acceptanceStatus: 'PENDING',
    acceptanceDate: null,
    taxYear: 2023,
  },
  {
    id: '3',
    userId: '3',
    user: { fullName: 'Mike Johnson', email: 'mike@example.com' },
    filingType: 'PAPER_FILING',
    submissionDate: null,
    confirmationNumber: null,
    paperFilingConfirmed: true,
    paperFilingConfirmedAt: new Date(Date.now() - 259200000).toISOString(),
    taxYear: 2023,
  },
  {
    id: '4',
    userId: '4',
    user: { fullName: 'Sarah Williams', email: 'sarah@example.com' },
    filingType: 'E_FILING',
    submissionDate: new Date(Date.now() - 345600000).toISOString(),
    confirmationNumber: 'EF-2024-001236',
    acceptanceStatus: 'REJECTED',
    rejectionReason: 'SSN mismatch with IRS records',
    taxYear: 2023,
  },
  {
    id: '5',
    userId: '5',
    user: { fullName: 'Tom Brown', email: 'tom@example.com' },
    filingType: null,
    taxYear: 2023,
    status: 'FILING_READY',
  },
];

const Filing = () => {
  const navigate = useNavigate();
  const [filings, setFilings] = useState(mockFilings);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const filteredFilings = filings.filter((filing) => {
    const matchesSearch =
      !searchTerm ||
      filing.user?.fullName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = !typeFilter || filing.filingType === typeFilter;
    const matchesStatus =
      !statusFilter ||
      (statusFilter === 'pending' && filing.acceptanceStatus === 'PENDING') ||
      (statusFilter === 'accepted' && filing.acceptanceStatus === 'ACCEPTED') ||
      (statusFilter === 'rejected' && filing.acceptanceStatus === 'REJECTED') ||
      (statusFilter === 'paper' && filing.filingType === 'PAPER_FILING') ||
      (statusFilter === 'ready' && !filing.filingType);
    return matchesSearch && matchesType && matchesStatus;
  });

  const stats = {
    total: filings.length,
    efilingPending: filings.filter(
      (f) => f.filingType === 'E_FILING' && f.acceptanceStatus === 'PENDING'
    ).length,
    accepted: filings.filter((f) => f.acceptanceStatus === 'ACCEPTED').length,
    paperCompleted: filings.filter(
      (f) => f.filingType === 'PAPER_FILING' && f.paperFilingConfirmed
    ).length,
    readyToFile: filings.filter((f) => !f.filingType).length,
  };

  const columns = [
    {
      key: 'user',
      header: 'Client',
      render: (_, row) => (
        <div>
          <p className="font-medium text-gray-900">{row.user?.fullName}</p>
          <p className="text-xs text-gray-500">{row.user?.email}</p>
        </div>
      ),
    },
    {
      key: 'taxYear',
      header: 'Tax Year',
      render: (value) => <span className="font-medium">{value}</span>,
    },
    {
      key: 'filingType',
      header: 'Type',
      render: (value) =>
        value ? (
          <Badge color={value === 'E_FILING' ? 'blue' : 'orange'}>
            {value === 'E_FILING' ? 'E-Filing' : 'Paper'}
          </Badge>
        ) : (
          <Badge color="gray">Not Selected</Badge>
        ),
    },
    {
      key: 'status',
      header: 'Status',
      render: (_, row) => {
        if (!row.filingType) {
          return <Badge color="yellow">Ready to File</Badge>;
        }
        if (row.filingType === 'PAPER_FILING') {
          return row.paperFilingConfirmed ? (
            <Badge color="green">Completed</Badge>
          ) : (
            <Badge color="blue">In Progress</Badge>
          );
        }
        const colors = {
          PENDING: 'yellow',
          ACCEPTED: 'green',
          REJECTED: 'red',
        };
        return (
          <Badge color={colors[row.acceptanceStatus] || 'gray'}>
            {row.acceptanceStatus || 'Not Submitted'}
          </Badge>
        );
      },
    },
    {
      key: 'confirmationNumber',
      header: 'Confirmation #',
      render: (value) => (
        <span className="text-gray-600 font-mono text-sm">{value || '-'}</span>
      ),
    },
    {
      key: 'submissionDate',
      header: 'Submitted',
      render: (value, row) => {
        if (row.filingType === 'PAPER_FILING' && row.paperFilingConfirmedAt) {
          return (
            <span className="text-gray-500">
              {format(new Date(row.paperFilingConfirmedAt), 'MMM d, yyyy')}
            </span>
          );
        }
        return value ? (
          <span className="text-gray-500">
            {format(new Date(value), 'MMM d, yyyy')}
          </span>
        ) : (
          '-'
        );
      },
    },
    {
      key: 'actions',
      header: '',
      render: (_, row) => (
        <Button
          size="sm"
          variant="ghost"
          onClick={() => navigate(`/users/${row.userId}`)}
        >
          Manage
        </Button>
      ),
    },
  ];

  return (
    <div>
      <Header
        title="Tax Filing"
        subtitle="Manage e-filing and paper filing submissions"
      />

      <div className="p-6 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <Card className="p-4">
            <p className="text-sm text-gray-500">Total Filings</p>
            <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
          </Card>
          <Card className="p-4">
            <p className="text-sm text-gray-500">Ready to File</p>
            <p className="text-2xl font-bold text-yellow-600">{stats.readyToFile}</p>
          </Card>
          <Card className="p-4">
            <p className="text-sm text-gray-500">E-Filing Pending</p>
            <p className="text-2xl font-bold text-blue-600">{stats.efilingPending}</p>
          </Card>
          <Card className="p-4">
            <p className="text-sm text-gray-500">Accepted</p>
            <p className="text-2xl font-bold text-green-600">{stats.accepted}</p>
          </Card>
          <Card className="p-4">
            <p className="text-sm text-gray-500">Paper Completed</p>
            <p className="text-2xl font-bold text-orange-600">{stats.paperCompleted}</p>
          </Card>
        </div>

        {/* Filings List */}
        <Card padding="none">
          <div className="p-4 border-b border-gray-200 flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by client name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 text-sm border border-gray-300 rounded-lg"
            >
              <option value="">All Status</option>
              <option value="ready">Ready to File</option>
              <option value="pending">E-Filing Pending</option>
              <option value="accepted">Accepted</option>
              <option value="rejected">Rejected</option>
              <option value="paper">Paper Filing</option>
            </select>
          </div>
          <DataTable
            columns={columns}
            data={filteredFilings}
            onRowClick={(row) => navigate(`/users/${row.userId}`)}
          />
        </Card>
      </div>
    </div>
  );
};

export default Filing;

