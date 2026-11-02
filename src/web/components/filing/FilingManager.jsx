import { useState } from 'react';
import { 
  Send, 
  FileText, 
  CheckCircle, 
  XCircle, 
  Clock,
  Upload,
  Printer,
  AlertTriangle,
} from 'lucide-react';
import Card from '../common/Card';
import Button from '../common/Button';
import Badge from '../common/Badge';
import { FILING_TYPES } from '../../utils/constants';

const FilingManager = ({ 
  filing, 
  onSelectType, 
  onSubmitEFiling, 
  onUpdateStatus,
  onCompletePaperFiling,
}) => {
  const [confirmationNumber, setConfirmationNumber] = useState('');

  // No filing selected yet
  if (!filing || !filing.filingType) {
    return (
      <Card>
        <Card.Header>
          <Card.Title>Select Filing Type</Card.Title>
          <Card.Description>Choose how this tax return will be filed</Card.Description>
        </Card.Header>
        <Card.Content>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <button
              onClick={() => onSelectType?.('E_FILING')}
              className="p-6 border-2 border-gray-200 rounded-xl hover:border-primary-500 hover:bg-primary-50 transition-all text-left group"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-200">
                <Upload className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900">E-Filing</h3>
              <p className="text-sm text-gray-500 mt-1">
                Submit electronically to the IRS. Faster processing and confirmation.
              </p>
              <ul className="mt-3 space-y-1 text-xs text-gray-500">
                <li>• Faster processing (24-48 hours)</li>
                <li>• Electronic confirmation</li>
                <li>• Automatic status tracking</li>
              </ul>
            </button>

            <button
              onClick={() => onSelectType?.('PAPER_FILING')}
              className="p-6 border-2 border-gray-200 rounded-xl hover:border-primary-500 hover:bg-primary-50 transition-all text-left group"
            >
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-orange-200">
                <Printer className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="font-semibold text-gray-900">Paper Filing</h3>
              <p className="text-sm text-gray-500 mt-1">
                Print and mail to the IRS. Traditional filing method.
              </p>
              <ul className="mt-3 space-y-1 text-xs text-gray-500">
                <li>• Manual submission required</li>
                <li>• 4-6 weeks processing</li>
                <li>• Client mails documents</li>
              </ul>
            </button>
          </div>
        </Card.Content>
      </Card>
    );
  }

  // E-Filing selected
  if (filing.filingType === 'E_FILING') {
    return (
      <div className="space-y-6">
        <Card>
          <Card.Header>
            <div className="flex items-center justify-between">
              <div>
                <Card.Title>E-Filing Status</Card.Title>
                <Card.Description>Electronic tax filing submission</Card.Description>
              </div>
              <Badge
                color={
                  filing.acceptanceStatus === 'ACCEPTED'
                    ? 'green'
                    : filing.acceptanceStatus === 'REJECTED'
                    ? 'red'
                    : 'blue'
                }
                size="lg"
              >
                {filing.acceptanceStatus || 'Not Submitted'}
              </Badge>
            </div>
          </Card.Header>
          <Card.Content>
            {!filing.submissionDate ? (
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center gap-2 text-blue-700">
                    <AlertTriangle className="w-5 h-5" />
                    <p className="font-medium">Ready to Submit</p>
                  </div>
                  <p className="text-sm text-blue-600 mt-1">
                    Please verify all information before submitting to the IRS.
                  </p>
                </div>
                <Button onClick={onSubmitEFiling} leftIcon={<Send className="w-4 h-4" />}>
                  Submit E-Filing
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-500">Submission Date</p>
                    <p className="font-semibold text-gray-900">
                      {new Date(filing.submissionDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-500">Confirmation #</p>
                    <p className="font-semibold text-gray-900">
                      {filing.confirmationNumber || 'Pending'}
                    </p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-500">Status</p>
                    <p className="font-semibold text-gray-900">
                      {filing.acceptanceStatus || 'Processing'}
                    </p>
                  </div>
                  {filing.acceptanceDate && (
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-500">Acceptance Date</p>
                      <p className="font-semibold text-gray-900">
                        {new Date(filing.acceptanceDate).toLocaleDateString()}
                      </p>
                    </div>
                  )}
                </div>

                {filing.acceptanceStatus === 'PENDING' && (
                  <div className="flex items-center gap-3">
                    <Button
                      variant="success"
                      onClick={() => onUpdateStatus?.('ACCEPTED')}
                      leftIcon={<CheckCircle className="w-4 h-4" />}
                    >
                      Mark Accepted
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => onUpdateStatus?.('REJECTED')}
                      leftIcon={<XCircle className="w-4 h-4" />}
                    >
                      Mark Rejected
                    </Button>
                  </div>
                )}

                {filing.acceptanceStatus === 'REJECTED' && filing.rejectionReason && (
                  <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                    <p className="font-medium text-red-700">Rejection Reason:</p>
                    <p className="text-sm text-red-600 mt-1">{filing.rejectionReason}</p>
                  </div>
                )}
              </div>
            )}
          </Card.Content>
        </Card>
      </div>
    );
  }

  // Paper Filing selected
  return (
    <Card>
      <Card.Header>
        <div className="flex items-center justify-between">
          <div>
            <Card.Title>Paper Filing</Card.Title>
            <Card.Description>Manual tax filing submission</Card.Description>
          </div>
          <Badge
            color={filing.paperFilingConfirmed ? 'green' : 'yellow'}
            size="lg"
          >
            {filing.paperFilingConfirmed ? 'Completed' : 'In Progress'}
          </Badge>
        </div>
      </Card.Header>
      <Card.Content>
        <div className="space-y-6">
          {/* Instructions Checklist */}
          <div className="space-y-3">
            <h4 className="font-medium text-gray-900">Paper Filing Steps:</h4>
            <div className="space-y-2">
              {[
                { step: 1, text: 'Print all tax forms (1040, W-2, etc.)' },
                { step: 2, text: 'Review and sign all required documents' },
                { step: 3, text: 'Make copies for your records' },
                { step: 4, text: 'Mail to appropriate IRS address' },
                { step: 5, text: 'Keep tracking number for reference' },
              ].map((item) => (
                <div
                  key={item.step}
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                >
                  <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center text-xs font-bold text-primary-600">
                    {item.step}
                  </div>
                  <span className="text-sm text-gray-700">{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          {!filing.paperFilingConfirmed && (
            <div className="flex items-center gap-3">
              <Button
                variant="secondary"
                leftIcon={<Printer className="w-4 h-4" />}
              >
                Print Documents
              </Button>
              <Button
                variant="success"
                onClick={onCompletePaperFiling}
                leftIcon={<CheckCircle className="w-4 h-4" />}
              >
                Mark as Completed
              </Button>
            </div>
          )}

          {filing.paperFilingConfirmed && (
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center gap-2 text-green-700">
                <CheckCircle className="w-5 h-5" />
                <p className="font-medium">Paper Filing Completed</p>
              </div>
              <p className="text-sm text-green-600 mt-1">
                Completed on {new Date(filing.paperFilingConfirmedAt).toLocaleDateString()}
              </p>
            </div>
          )}
        </div>
      </Card.Content>
    </Card>
  );
};

export default FilingManager;

