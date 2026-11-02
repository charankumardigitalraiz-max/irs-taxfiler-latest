import { format } from 'date-fns';
import { 
  CreditCard, 
  DollarSign, 
  CheckCircle, 
  XCircle, 
  Clock,
  RefreshCw,
} from 'lucide-react';
import Badge from '../common/Badge';
import Button from '../common/Button';
import { PAYMENT_STATUS } from '../../utils/constants';

const statusConfig = {
  PENDING: { color: 'yellow', icon: Clock },
  PAID: { color: 'green', icon: CheckCircle },
  FAILED: { color: 'red', icon: XCircle },
  REFUNDED: { color: 'purple', icon: RefreshCw },
};

const PaymentList = ({ payments, onConfirm, onViewUser }) => {
  if (!payments || payments.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        No payments found
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="table-header">Transaction</th>
            <th className="table-header">User</th>
            <th className="table-header">Amount</th>
            <th className="table-header">Status</th>
            <th className="table-header">Date</th>
            <th className="table-header">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {payments.map((payment) => {
            const StatusIcon = statusConfig[payment.status]?.icon || Clock;
            return (
              <tr key={payment.id} className="hover:bg-gray-50">
                <td className="table-cell">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <CreditCard className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        {payment.transactionId || 'N/A'}
                      </p>
                      <p className="text-xs text-gray-500">
                        {payment.paymentMethod || 'Not specified'}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="table-cell">
                  <p className="font-medium text-gray-900">{payment.user?.fullName}</p>
                  <p className="text-xs text-gray-500">{payment.user?.email}</p>
                </td>
                <td className="table-cell">
                  <div className="flex items-center gap-1">
                    <DollarSign className="w-4 h-4 text-gray-400" />
                    <span className="font-semibold text-gray-900">
                      {payment.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </span>
                    <span className="text-gray-500">{payment.currency}</span>
                  </div>
                </td>
                <td className="table-cell">
                  <Badge color={statusConfig[payment.status]?.color || 'gray'} dot>
                    {payment.status}
                  </Badge>
                  {payment.isManualConfirmation && (
                    <p className="text-xs text-blue-600 mt-1">Manually Confirmed</p>
                  )}
                </td>
                <td className="table-cell">
                  <span className="text-gray-500">
                    {payment.paymentDate
                      ? format(new Date(payment.paymentDate), 'MMM d, yyyy')
                      : '-'}
                  </span>
                </td>
                <td className="table-cell">
                  <div className="flex items-center gap-2">
                    {payment.status === 'PENDING' && (
                      <Button
                        size="sm"
                        variant="success"
                        onClick={() => onConfirm?.(payment.id)}
                      >
                        Confirm Payment
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => onViewUser?.(payment.userId)}
                    >
                      View User
                    </Button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentList;

