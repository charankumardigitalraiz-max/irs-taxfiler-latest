import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, DollarSign, CheckCircle } from 'lucide-react';
import Header from '../../components/layout/Header';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';
import PaymentList from '../../components/payments/PaymentList';

// Mock data
const mockPayments = [
  {
    id: '1',
    userId: '1',
    user: { fullName: 'John Doe', email: 'john@example.com' },
    amount: 250,
    currency: 'USD',
    status: 'PENDING',
    paymentMethod: 'Credit Card',
    transactionId: null,
    paymentDate: null,
    isManualConfirmation: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    userId: '2',
    user: { fullName: 'Jane Smith', email: 'jane@example.com' },
    amount: 350,
    currency: 'USD',
    status: 'PAID',
    paymentMethod: 'Bank Transfer',
    transactionId: 'TXN123456789',
    paymentDate: new Date(Date.now() - 86400000).toISOString(),
    isManualConfirmation: false,
    createdAt: new Date(Date.now() - 172800000).toISOString(),
  },
  {
    id: '3',
    userId: '3',
    user: { fullName: 'Mike Johnson', email: 'mike@example.com' },
    amount: 200,
    currency: 'USD',
    status: 'PAID',
    paymentMethod: 'Cash',
    transactionId: 'MANUAL-001',
    paymentDate: new Date(Date.now() - 259200000).toISOString(),
    isManualConfirmation: true,
    createdAt: new Date(Date.now() - 345600000).toISOString(),
  },
  {
    id: '4',
    userId: '4',
    user: { fullName: 'Sarah Williams', email: 'sarah@example.com' },
    amount: 300,
    currency: 'USD',
    status: 'FAILED',
    paymentMethod: 'Credit Card',
    transactionId: 'TXN987654321',
    paymentDate: null,
    isManualConfirmation: false,
    createdAt: new Date(Date.now() - 432000000).toISOString(),
  },
];

const Payments = () => {
  const navigate = useNavigate();
  const [payments, setPayments] = useState(mockPayments);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedPaymentId, setSelectedPaymentId] = useState(null);
  const [transactionId, setTransactionId] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPayments = payments.filter((payment) => {
    const matchesStatus = !statusFilter || payment.status === statusFilter;
    const matchesSearch =
      !searchTerm ||
      payment.user?.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.transactionId?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleConfirm = (id) => {
    setSelectedPaymentId(id);
    setShowConfirmModal(true);
  };

  const confirmPayment = () => {
    setPayments((prev) =>
      prev.map((p) =>
        p.id === selectedPaymentId
          ? {
              ...p,
              status: 'PAID',
              transactionId: transactionId || `MANUAL-${Date.now()}`,
              paymentMethod: paymentMethod || 'Manual',
              paymentDate: new Date().toISOString(),
              isManualConfirmation: true,
            }
          : p
      )
    );
    setShowConfirmModal(false);
    setSelectedPaymentId(null);
    setTransactionId('');
    setPaymentMethod('');
  };

  const stats = {
    total: payments.length,
    pending: payments.filter((p) => p.status === 'PENDING').length,
    paid: payments.filter((p) => p.status === 'PAID').length,
    failed: payments.filter((p) => p.status === 'FAILED').length,
    totalRevenue: payments
      .filter((p) => p.status === 'PAID')
      .reduce((sum, p) => sum + p.amount, 0),
  };

  return (
    <div>
      <Header
        title="Payments"
        subtitle="Track and manage payment transactions"
      />

      <div className="p-6 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <Card className="p-4">
            <p className="text-sm text-gray-500">Total Payments</p>
            <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
          </Card>
          <Card className="p-4">
            <p className="text-sm text-gray-500">Pending</p>
            <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
          </Card>
          <Card className="p-4">
            <p className="text-sm text-gray-500">Completed</p>
            <p className="text-2xl font-bold text-green-600">{stats.paid}</p>
          </Card>
          <Card className="p-4">
            <p className="text-sm text-gray-500">Failed</p>
            <p className="text-2xl font-bold text-red-600">{stats.failed}</p>
          </Card>
          <Card className="p-4 bg-green-50 border-green-200">
            <p className="text-sm text-green-600">Total Revenue</p>
            <p className="text-2xl font-bold text-green-700">
              ${stats.totalRevenue.toLocaleString()}
            </p>
          </Card>
        </div>

        {/* Payments List */}
        <Card padding="none">
          <div className="p-4 border-b border-gray-200 flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name or transaction ID..."
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
              <option value="PENDING">Pending</option>
              <option value="PAID">Paid</option>
              <option value="FAILED">Failed</option>
              <option value="REFUNDED">Refunded</option>
            </select>
          </div>
          <PaymentList
            payments={filteredPayments}
            onConfirm={handleConfirm}
            onViewUser={(id) => navigate(`/users/${id}`)}
          />
        </Card>
      </div>

      {/* Manual Confirmation Modal */}
      <Modal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        title="Confirm Payment"
        description="Manually confirm this payment"
      >
        <div className="space-y-4">
          <div>
            <label className="label">Transaction ID</label>
            <input
              type="text"
              value={transactionId}
              onChange={(e) => setTransactionId(e.target.value)}
              className="input"
              placeholder="Enter transaction reference..."
            />
          </div>
          <div>
            <label className="label">Payment Method</label>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="input"
            >
              <option value="">Select method...</option>
              <option value="Cash">Cash</option>
              <option value="Check">Check</option>
              <option value="Bank Transfer">Bank Transfer</option>
              <option value="Credit Card">Credit Card</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirmModal(false)}>
            Cancel
          </Button>
          <Button variant="success" onClick={confirmPayment}>
            <CheckCircle className="w-4 h-4 mr-1" />
            Confirm Payment
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Payments;

