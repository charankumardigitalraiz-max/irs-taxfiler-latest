import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Calculator, DollarSign, FileText, Eye } from 'lucide-react';
import Header from '../../components/layout/Header';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import DataTable from '../../components/common/DataTable';
import { format } from 'date-fns';
import { WORKFLOW_STAGES } from '../../config/workflow';

// Mock data
const mockPreparations = [
  {
    id: '1',
    userId: 'USR-2024-001234',
    user: { fullName: 'John Doe', email: 'john@example.com' },
    taxYear: 2023,
    grossIncome: 75000,
    deductions: 12500,
    taxableIncome: 62500,
    taxLiability: 9550,
    refundAmount: 1200,
    amountPayable: 0,
    isRefundEligible: true,
    phase1Completed: true,
    phase1SummarySent: true,
    phase1ClientApproved: true,
    phase2Completed: false,
    phase2FinalSent: false,
    phase2ClientApproved: false,
    status: 'PREPARATION_PHASE2',
    // Pricing based on workflow
    totalPayAmount: 250.00,
    feePayable: 200.00,
    discount: 50.00,
  },
  {
    id: '2',
    userId: 'USR-2024-001235',
    user: { fullName: 'Jane Smith', email: 'jane@example.com' },
    taxYear: 2023,
    grossIncome: 95000,
    deductions: 15000,
    taxableIncome: 80000,
    taxLiability: 13500,
    refundAmount: 0,
    amountPayable: 2500,
    isRefundEligible: false,
    phase1Completed: true,
    phase1SummarySent: true,
    phase1ClientApproved: true,
    phase2Completed: true,
    phase2FinalSent: true,
    phase2ClientApproved: true,
    isLocked: true,
    status: 'FILING_READY',
    // Pricing based on workflow
    totalPayAmount: 350.00,
    feePayable: 350.00,
    discount: 0.00,
  },
  {
    id: '3',
    userId: 'USR-2024-001236',
    user: { fullName: 'Mike Johnson', email: 'mike@example.com' },
    taxYear: 2023,
    grossIncome: 55000,
    deductions: 8000,
    taxableIncome: 47000,
    taxLiability: 6440,
    refundAmount: 850,
    amountPayable: 0,
    isRefundEligible: true,
    phase1Completed: false,
    phase1SummarySent: false,
    phase1ClientApproved: false,
    phase2Completed: false,
    phase2FinalSent: false,
    phase2ClientApproved: false,
    status: 'PREPARATION_PHASE1',
    // Pricing based on workflow - not yet calculated
    totalPayAmount: 0,
    feePayable: 0,
    discount: 0,
  },
  {
    id: '4',
    userId: 'USR-2024-001237',
    user: { fullName: 'Sarah Williams', email: 'sarah@example.com' },
    taxYear: 2023,
    grossIncome: 68000,
    deductions: 10000,
    taxableIncome: 58000,
    taxLiability: 8560,
    refundAmount: 0,
    amountPayable: 560,
    isRefundEligible: false,
    phase1Completed: true,
    phase1SummarySent: true,
    phase1ClientApproved: false,
    phase2Completed: false,
    phase2FinalSent: false,
    phase2ClientApproved: false,
    status: 'REVIEW_PENDING',
    // Pricing based on workflow
    totalPayAmount: 180.00,
    feePayable: 180.00,
    discount: 0.00,
  },
];

const TaxPreparation = () => {
  const navigate = useNavigate();
  const [preparations, setPreparations] = useState(mockPreparations);
  const [searchTerm, setSearchTerm] = useState('');
  const [phaseFilter, setPhaseFilter] = useState('');

  const filteredPreparations = preparations.filter((prep) => {
    const matchesSearch =
      !searchTerm ||
      prep.user?.fullName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPhase =
      !phaseFilter ||
      (phaseFilter === 'phase1' && !prep.phase1Completed) ||
      (phaseFilter === 'phase2' && prep.phase1Completed && !prep.phase2Completed) ||
      (phaseFilter === 'completed' && prep.phase2Completed);
    return matchesSearch && matchesPhase;
  });

  const stats = {
    total: preparations.length,
    phase1Pending: preparations.filter((p) => !p.phase1ClientApproved).length,
    phase1AwaitingReview: preparations.filter((p) => p.phase1SummarySent && !p.phase1ClientApproved).length,
    phase2Pending: preparations.filter((p) => p.phase1ClientApproved && !p.phase2ClientApproved).length,
    phase2AwaitingReview: preparations.filter((p) => p.phase2FinalSent && !p.phase2ClientApproved).length,
    completed: preparations.filter((p) => p.isLocked).length,
    totalRefunds: preparations
      .filter((p) => p.isRefundEligible)
      .reduce((sum, p) => sum + p.refundAmount, 0),
  };

  // Helper function to get price based on workflow status
  const getPriceForStatus = (row) => {
    const status = row.status;
    const stage = WORKFLOW_STAGES[status];
    
    // If we have a calculated totalPayAmount, use it
    if (row.totalPayAmount && row.totalPayAmount > 0) {
      return row.totalPayAmount;
    }
    
    // Otherwise, calculate based on workflow stage
    // Price is only available after PREPARATION_PHASE1
    if (status === 'PREPARATION_PHASE1' || 
        status === 'REVIEW_PENDING' || 
        status === 'CLIENT_APPROVED' ||
        status === 'PAYMENT_PENDING' ||
        status === 'PAYMENT_COMPLETED' ||
        status === 'PREPARATION_PHASE2' ||
        status === 'FILING_READY') {
      // Return estimated or calculated price
      return row.totalPayAmount || 0;
    }
    
    return 0;
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
      key: 'status',
      header: 'Workflow Status',
      render: (_, row) => {
        const stage = WORKFLOW_STAGES[row.status];
        return (
          <div>
            <Badge color={stage?.color || 'gray'} size="sm">
              {stage?.label || row.status}
            </Badge>
          </div>
        );
      },
    },
    {
      key: 'price',
      header: 'Price',
      render: (_, row) => {
        const price = getPriceForStatus(row);
        return (
          <div className="flex items-center gap-2">
            {price > 0 ? (
              <span className="font-semibold text-gray-900">
                ${price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            ) : (
              <span className="text-gray-400 text-sm">Not calculated</span>
            )}
          </div>
        );
      },
    },
    {
      key: 'taxableIncome',
      header: 'Taxable Income',
      render: (value) => (
        <span className="text-gray-900">
          ${value?.toLocaleString('en-US', { minimumFractionDigits: 2 })}
        </span>
      ),
    },
    {
      key: 'result',
      header: 'Result',
      render: (_, row) => (
        <div>
          {row.isRefundEligible ? (
            <div className="flex items-center gap-1 text-green-600">
              <span className="font-medium">
                +${row.refundAmount?.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </span>
              <Badge color="green" size="sm">Refund</Badge>
            </div>
          ) : (
            <div className="flex items-center gap-1 text-orange-600">
              <span className="font-medium">
                -${row.amountPayable?.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </span>
              <Badge color="orange" size="sm">Owed</Badge>
            </div>
          )}
        </div>
      ),
    },
    {
      key: 'phase',
      header: 'Phase Status',
      render: (_, row) => (
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <div
                className={`w-2.5 h-2.5 rounded-full ${
                  row.phase1ClientApproved ? 'bg-green-500' : 
                  row.phase1SummarySent ? 'bg-yellow-500' : 
                  row.phase1Completed ? 'bg-blue-500' : 'bg-gray-300'
                }`}
              />
              <span className="text-xs text-gray-600">P1</span>
            </div>
            <span className="text-xs text-gray-400">
              {row.phase1ClientApproved ? '✓ Approved' : 
               row.phase1SummarySent ? 'Awaiting Review' : 
               row.phase1Completed ? 'Sent' : 'Pending'}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <div
                className={`w-2.5 h-2.5 rounded-full ${
                  row.phase2ClientApproved ? 'bg-green-500' : 
                  row.phase2FinalSent ? 'bg-yellow-500' : 
                  row.phase2Completed ? 'bg-blue-500' : 'bg-gray-300'
                }`}
              />
              <span className="text-xs text-gray-600">P2</span>
            </div>
            <span className="text-xs text-gray-400">
              {row.isLocked ? '🔒 Locked' :
               row.phase2ClientApproved ? '✓ Approved' : 
               row.phase2FinalSent ? 'Awaiting Review' : 
               row.phase2Completed ? 'Sent' : 
               row.phase1ClientApproved ? 'Ready' : 'Waiting'}
            </span>
          </div>
        </div>
      ),
    },
    {
      key: 'actions',
      header: '',
      render: (_, row) => (
        <Button
          size="sm"
          variant="ghost"
          onClick={() => navigate(`/users/${row.userId}`)}
          leftIcon={<Eye className="w-4 h-4" />}
        >
          View
        </Button>
      ),
    },
  ];

  return (
    <div>
      <Header
        title="Tax Preparation"
        subtitle="Manage tax calculations and summaries"
      />

      <div className="p-6 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <Card className="p-4">
            <p className="text-sm text-gray-500">Total Cases</p>
            <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
          </Card>
          <Card className="p-4">
            <p className="text-sm text-gray-500">Phase 1 Pending</p>
            <p className="text-2xl font-bold text-yellow-600">{stats.phase1Pending}</p>
            {stats.phase1AwaitingReview > 0 && (
              <p className="text-xs text-orange-500 mt-1">{stats.phase1AwaitingReview} awaiting review</p>
            )}
          </Card>
          <Card className="p-4">
            <p className="text-sm text-gray-500">Phase 2 Pending</p>
            <p className="text-2xl font-bold text-blue-600">{stats.phase2Pending}</p>
            {stats.phase2AwaitingReview > 0 && (
              <p className="text-xs text-orange-500 mt-1">{stats.phase2AwaitingReview} awaiting review</p>
            )}
          </Card>
          <Card className="p-4">
            <p className="text-sm text-gray-500">Locked/Ready</p>
            <p className="text-2xl font-bold text-green-600">{stats.completed}</p>
          </Card>
          <Card className="p-4">
            <p className="text-sm text-gray-500">Total Refunds</p>
            <p className="text-2xl font-bold text-green-600">
              ${stats.totalRefunds.toLocaleString()}
            </p>
          </Card>
          <Card className="p-4 bg-purple-50 border-purple-200">
            <p className="text-sm text-purple-600">Client Reviews</p>
            <p className="text-2xl font-bold text-purple-700">
              {stats.phase1AwaitingReview + stats.phase2AwaitingReview}
            </p>
            <p className="text-xs text-purple-500 mt-1">Awaiting approval</p>
          </Card>
        </div>

        {/* List */}
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
              value={phaseFilter}
              onChange={(e) => setPhaseFilter(e.target.value)}
              className="px-4 py-2 text-sm border border-gray-300 rounded-lg"
            >
              <option value="">All Phases</option>
              <option value="phase1">Phase 1 Pending</option>
              <option value="phase2">Phase 2 Pending</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          <DataTable
            columns={columns}
            data={filteredPreparations}
            onRowClick={(row) => navigate(`/users/${row.userId}`)}
          />
        </Card>
      </div>
    </div>
  );
};

export default TaxPreparation;

