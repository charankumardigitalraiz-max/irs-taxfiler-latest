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
      <div className="text-center py-12 text-[#6F7F8E] font-medium text-sm">
        No payments found
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-[#E6F0F5]">
        <thead className="bg-[#F8FBFC] border-b border-[#DCEAF0]">
          <tr>
            <th className="px-4 sm:px-6 py-3 text-left text-[11px] sm:text-xs font-semibold text-[#1F4264] uppercase tracking-wider">Transaction</th>
            <th className="px-4 sm:px-6 py-3 text-left text-[11px] sm:text-xs font-semibold text-[#1F4264] uppercase tracking-wider">User</th>
            <th className="px-4 sm:px-6 py-3 text-left text-[11px] sm:text-xs font-semibold text-[#1F4264] uppercase tracking-wider">Amount</th>
            <th className="px-4 sm:px-6 py-3 text-left text-[11px] sm:text-xs font-semibold text-[#1F4264] uppercase tracking-wider">Status</th>
            <th className="px-4 sm:px-6 py-3 text-left text-[11px] sm:text-xs font-semibold text-[#1F4264] uppercase tracking-wider">Date</th>
            <th className="px-4 sm:px-6 py-3 text-right text-[11px] sm:text-xs font-semibold text-[#1F4264] uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-[#E6F0F5]">
          {payments.map((payment) => {
            const StatusIcon = statusConfig[payment.status]?.icon || Clock;
            return (
              <tr key={payment.id} className="hover:bg-[#F4F9FB]/60 transition-colors">
                <td className="px-4 sm:px-6 py-3.5 whitespace-nowrap text-xs sm:text-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-[#E9F7FA] border border-[#127EAB]/20 rounded-lg flex items-center justify-center shrink-0">
                      <CreditCard className="w-4 h-4 text-[#127EAB]" />
                    </div>
                    <div>
                      <p className="font-semibold text-[#1F4264]">
                        {payment.transactionId || 'N/A'}
                      </p>
                      <p className="text-xs text-[#6F7F8E]">
                        {payment.paymentMethod || 'Not specified'}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-4 sm:px-6 py-3.5 whitespace-nowrap text-xs sm:text-sm">
                  <p className="font-semibold text-[#1F4264]">{payment.user?.fullName}</p>
                  <p className="text-xs text-[#6F7F8E]">{payment.user?.email}</p>
                </td>
                <td className="px-4 sm:px-6 py-3.5 whitespace-nowrap text-xs sm:text-sm">
                  <div className="flex items-center gap-1 font-semibold text-[#1F4264]">
                    <DollarSign className="w-3.5 h-3.5 text-[#8BA0B2]" />
                    <span>
                      {payment.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </span>
                    <span className="text-xs text-[#6F7F8E] ml-0.5">{payment.currency}</span>
                  </div>
                </td>
                <td className="px-4 sm:px-6 py-3.5 whitespace-nowrap text-xs sm:text-sm">
                  <Badge color={statusConfig[payment.status]?.color || 'gray'} dot size="sm">
                    {payment.status}
                  </Badge>
                  {payment.isManualConfirmation && (
                    <p className="text-[11px] text-[#127EAB] font-medium mt-0.5">Manually Confirmed</p>
                  )}
                </td>
                <td className="px-4 sm:px-6 py-3.5 whitespace-nowrap text-xs sm:text-sm text-[#6F7F8E]">
                  <span>
                    {payment.paymentDate
                      ? format(new Date(payment.paymentDate), 'MMM d, yyyy')
                      : '—'}
                  </span>
                </td>
                <td className="px-4 sm:px-6 py-3.5 whitespace-nowrap text-right">
                  <div className="flex items-center justify-end gap-1.5">
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

