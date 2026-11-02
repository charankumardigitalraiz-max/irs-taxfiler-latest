import { useState } from 'react';
import { 
  Calculator, 
  DollarSign, 
  TrendingUp, 
  TrendingDown,
  Send,
  CheckCircle,
  Lock,
  AlertTriangle,
  Clock,
  FileText,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import Card from '../common/Card';
import Button from '../common/Button';
import Badge from '../common/Badge';
import TaxSummaryForm from './TaxSummaryForm';

const TaxPreparationPhases = ({ 
  taxPrep,
  onSavePhase1,
  onSendSummaryPhase1,
  onClientApprovePhase1,
  onSavePhase2,
  onSendFinalPhase2,
  onClientApproveFinal,
  onLockPreparation,
  currentWorkflowStatus,
}) => {
  const [activePhase, setActivePhase] = useState(1);
  const [phase1Data, setPhase1Data] = useState({
    // Tax Summary fields
    federalDueRefund: taxPrep?.federalDueRefund || '',
    federalAmount: taxPrep?.federalAmount || 0,
    stateEntries: taxPrep?.stateEntries || [{ id: 1, state: '', dueRefund: '', amount: 0 }],
    cityEntries: taxPrep?.cityEntries || [{ id: 1, city: '', dueRefund: '', amount: 0 }],
    federal: taxPrep?.federal || 0,
    state: taxPrep?.state || 0,
    city: taxPrep?.city || 0,
    foreignTaxCredit: taxPrep?.foreignTaxCredit || 0,
    stockTransactions: taxPrep?.stockTransactions || 0,
    rentalIncome: taxPrep?.rentalIncome || 0,
    scheduleA: taxPrep?.scheduleA || 0,
    interestDividend: taxPrep?.interestDividend || 0,
    businessIncome: taxPrep?.businessIncome || 0,
    partnershipIncome: taxPrep?.partnershipIncome || 0,
    itinServices: taxPrep?.itinServices || 0,
    fbarFatca: taxPrep?.fbarFatca || 0,
    othersSpecific: taxPrep?.othersSpecific || 0,
    others: taxPrep?.others || 0,
    feePayable: taxPrep?.feePayable || 0,
    discount: taxPrep?.discount || 0,
    totalPayAmount: taxPrep?.totalPayAmount || 0,
  });

  const [phase2Data, setPhase2Data] = useState({
    // Revised Tax Summary fields (copy of phase1 with adjustments)
    ...phase1Data,
    adjustmentNotes: taxPrep?.adjustmentNotes || '',
    finalReviewNotes: taxPrep?.finalReviewNotes || '',
  });

  // Determine phase status based on workflow
  const getPhaseStatus = () => {
    const statusOrder = [
      'PERSONAL_INFO', 'MEETING_SCHEDULED', 'INTERVIEW_PENDING', 'INTERVIEW_COMPLETED',
      'DOCUMENT_PENDING', 'DOCUMENTS_APPROVED', 'PREPARATION_PHASE1', 'REVIEW_PENDING',
      'CLIENT_APPROVED', 'PAYMENT_PENDING', 'PAYMENT_COMPLETED', 'PREPARATION_PHASE2',
      'FILING_READY', 'E_FILING_SUBMITTED', 'E_FILING_ACCEPTED', 'PAPER_FILING_STARTED',
      'PAPER_FILING_COMPLETED'
    ];
    
    const currentIndex = statusOrder.indexOf(currentWorkflowStatus);
    
    return {
      phase1Enabled: currentIndex >= statusOrder.indexOf('DOCUMENTS_APPROVED'),
      phase1Completed: taxPrep?.phase1Completed || currentIndex >= statusOrder.indexOf('REVIEW_PENDING'),
      phase1SummarySent: taxPrep?.summarySentAt != null,
      phase1ClientApproved: taxPrep?.clientApprovedPhase1 || currentIndex >= statusOrder.indexOf('CLIENT_APPROVED'),
      
      phase2Enabled: currentIndex >= statusOrder.indexOf('PAYMENT_COMPLETED'),
      phase2Completed: taxPrep?.phase2Completed || currentIndex >= statusOrder.indexOf('FILING_READY'),
      phase2FinalSent: taxPrep?.finalSentAt != null,
      phase2ClientApproved: taxPrep?.clientApprovedFinal || currentIndex >= statusOrder.indexOf('FILING_READY'),
      
      isLocked: taxPrep?.isLocked || false,
    };
  };

  const phaseStatus = getPhaseStatus();

  const handlePhase1Save = (data) => {
    setPhase1Data(data);
    onSavePhase1?.(data);
  };

  const handlePhase1Submit = (data) => {
    setPhase1Data(data);
    onSavePhase1?.(data);
    onSendSummaryPhase1?.();
  };

  const handlePhase2Save = (data) => {
    setPhase2Data(data);
    onSavePhase2?.(data);
  };

  const handlePhase2Submit = (data) => {
    setPhase2Data(data);
    onSavePhase2?.(data);
    onSendFinalPhase2?.();
  };

  // Calculate summary values
  const getSummary = (data) => {
    const federalAmount = parseFloat(data.federalAmount) || 0;
    const stateTotal = data.stateEntries?.reduce((sum, e) => sum + (parseFloat(e.amount) || 0), 0) || 0;
    const cityTotal = data.cityEntries?.reduce((sum, e) => sum + (parseFloat(e.amount) || 0), 0) || 0;
    const totalCharges = parseFloat(data.totalPayAmount) || 0;
    
    const isRefund = data.federalDueRefund === 'REFUND';
    
    return {
      federalAmount,
      stateTotal,
      cityTotal,
      totalCharges,
      isRefund,
    };
  };

  const phase1Summary = getSummary(phase1Data);

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card className="p-4 bg-blue-50 border-blue-200">
          <p className="text-sm text-blue-600">Federal</p>
          <p className="text-xl font-bold text-blue-700 mt-1">
            ${phase1Summary.federalAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </p>
          <p className="text-xs text-blue-500 mt-1">
            {phase1Data.federalDueRefund || 'Not set'}
          </p>
        </Card>
        <Card className="p-4 bg-purple-50 border-purple-200">
          <p className="text-sm text-purple-600">State Total</p>
          <p className="text-xl font-bold text-purple-700 mt-1">
            ${phase1Summary.stateTotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </p>
          <p className="text-xs text-purple-500 mt-1">
            {phase1Data.stateEntries?.length || 0} state(s)
          </p>
        </Card>
        <Card className="p-4 bg-indigo-50 border-indigo-200">
          <p className="text-sm text-indigo-600">City Total</p>
          <p className="text-xl font-bold text-indigo-700 mt-1">
            ${phase1Summary.cityTotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </p>
          <p className="text-xs text-indigo-500 mt-1">
            {phase1Data.cityEntries?.length || 0} city/cities
          </p>
        </Card>
        <Card className="p-4 bg-green-50 border-green-200">
          <p className="text-sm text-green-600">Total Charges</p>
          <p className="text-xl font-bold text-green-700 mt-1">
            ${phase1Summary.totalCharges.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </p>
          <p className="text-xs text-green-500 mt-1">Fee payable</p>
        </Card>
        <Card className={`p-4 ${phase1Summary.isRefund ? 'bg-green-50 border-green-200' : 'bg-orange-50 border-orange-200'}`}>
          <div className="flex items-center gap-1">
            {phase1Summary.isRefund ? (
              <TrendingUp className="w-4 h-4 text-green-600" />
            ) : (
              <TrendingDown className="w-4 h-4 text-orange-600" />
            )}
            <p className={`text-sm ${phase1Summary.isRefund ? 'text-green-600' : 'text-orange-600'}`}>
              {phase1Summary.isRefund ? 'Refund' : 'Due'}
            </p>
          </div>
          <p className={`text-xl font-bold mt-1 ${phase1Summary.isRefund ? 'text-green-700' : 'text-orange-700'}`}>
            ${phase1Summary.federalAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </p>
        </Card>
      </div>

      {/* Phase 1: Tax Summary */}
      <Card>
        <Card.Header>
          <div 
            className="flex items-center justify-between cursor-pointer"
            onClick={() => setActivePhase(activePhase === 1 ? 0 : 1)}
          >
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                phaseStatus.phase1ClientApproved ? 'bg-green-100' : 'bg-blue-100'
              }`}>
                {phaseStatus.phase1ClientApproved ? (
                  <CheckCircle className="w-5 h-5 text-green-600" />
                ) : (
                  <span className="text-lg font-bold text-blue-600">1</span>
                )}
              </div>
              <div>
                <Card.Title>Phase 1: Tax Summary</Card.Title>
                <Card.Description>Calculate taxes and send to client for review</Card.Description>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {phaseStatus.phase1SummarySent && (
                <Badge color="blue" size="sm">Summary Sent</Badge>
              )}
              {phaseStatus.phase1ClientApproved && (
                <Badge color="green" size="sm">Client Approved</Badge>
              )}
              {phaseStatus.phase1Completed && !phaseStatus.phase1ClientApproved && (
                <Badge color="yellow" size="sm">Awaiting Client Review</Badge>
              )}
              {activePhase === 1 ? (
                <ChevronUp className="w-5 h-5 text-gray-400" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-400" />
              )}
            </div>
          </div>
        </Card.Header>
        
        {activePhase === 1 && (
          <Card.Content>
            <TaxSummaryForm
              initialData={phase1Data}
              onSave={handlePhase1Save}
              onSubmit={handlePhase1Submit}
              disabled={phaseStatus.phase1ClientApproved || phaseStatus.isLocked}
            />
            
            {/* Phase 1 Actions */}
            {phaseStatus.phase1SummarySent && !phaseStatus.phase1ClientApproved && (
              <div className="mt-6 pt-6 border-t border-gray-200">
                <Button
                  variant="success"
                  onClick={onClientApprovePhase1}
                  leftIcon={<CheckCircle className="w-4 h-4" />}
                >
                  Mark Client Approved (Phase 1)
                </Button>
              </div>
            )}
            
            {phaseStatus.phase1ClientApproved && (
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-center gap-2 text-green-600">
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-medium">Phase 1 Complete - Client Approved</span>
                </div>
              </div>
            )}
          </Card.Content>
        )}
      </Card>

      {/* Payment Notice */}
      {phaseStatus.phase1ClientApproved && !phaseStatus.phase2Enabled && (
        <Card className="bg-yellow-50 border-yellow-200">
          <Card.Content>
            <div className="flex items-center gap-3">
              <Clock className="w-6 h-6 text-yellow-600" />
              <div>
                <p className="font-medium text-yellow-800">Awaiting Payment</p>
                <p className="text-sm text-yellow-600">
                  Phase 2 (Revised Tax Summary) will be enabled after payment is completed.
                </p>
              </div>
            </div>
          </Card.Content>
        </Card>
      )}

      {/* Phase 2: Revised Tax Summary */}
      <Card className={!phaseStatus.phase2Enabled ? 'opacity-50' : ''}>
        <Card.Header>
          <div 
            className={`flex items-center justify-between ${phaseStatus.phase2Enabled ? 'cursor-pointer' : ''}`}
            onClick={() => phaseStatus.phase2Enabled && setActivePhase(activePhase === 2 ? 0 : 2)}
          >
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                phaseStatus.phase2ClientApproved ? 'bg-green-100' : 
                phaseStatus.phase2Enabled ? 'bg-purple-100' : 'bg-gray-100'
              }`}>
                {phaseStatus.phase2ClientApproved ? (
                  <CheckCircle className="w-5 h-5 text-green-600" />
                ) : phaseStatus.isLocked ? (
                  <Lock className="w-5 h-5 text-gray-500" />
                ) : (
                  <span className={`text-lg font-bold ${phaseStatus.phase2Enabled ? 'text-purple-600' : 'text-gray-400'}`}>2</span>
                )}
              </div>
              <div>
                <Card.Title>Phase 2: Revised Tax Summary</Card.Title>
                <Card.Description>Final adjustments after payment, send for final client approval</Card.Description>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {!phaseStatus.phase2Enabled && (
                <Badge color="gray" size="sm">Locked - Awaiting Payment</Badge>
              )}
              {phaseStatus.phase2FinalSent && (
                <Badge color="blue" size="sm">Final Sent</Badge>
              )}
              {phaseStatus.phase2ClientApproved && (
                <Badge color="green" size="sm">Final Approved</Badge>
              )}
              {phaseStatus.isLocked && (
                <Badge color="purple" size="sm">
                  <Lock className="w-3 h-3 mr-1" />
                  Locked
                </Badge>
              )}
              {phaseStatus.phase2Enabled && (
                activePhase === 2 ? (
                  <ChevronUp className="w-5 h-5 text-gray-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                )
              )}
            </div>
          </div>
        </Card.Header>
        
        {activePhase === 2 && phaseStatus.phase2Enabled && (
          <Card.Content>
            {/* Adjustment Notes */}
            <div className="mb-6 p-4 bg-purple-50 rounded-lg border border-purple-200">
              <label className="label text-purple-700">Adjustment Notes</label>
              <textarea
                value={phase2Data.adjustmentNotes}
                onChange={(e) => setPhase2Data({ ...phase2Data, adjustmentNotes: e.target.value })}
                className="input resize-none"
                rows={2}
                placeholder="Note any changes from Phase 1..."
                disabled={phaseStatus.isLocked}
              />
            </div>

            <TaxSummaryForm
              initialData={phase2Data}
              onSave={handlePhase2Save}
              onSubmit={handlePhase2Submit}
              disabled={phaseStatus.isLocked}
            />
            
            {/* Phase 2 Actions */}
            {phaseStatus.phase2FinalSent && !phaseStatus.phase2ClientApproved && (
              <div className="mt-6 pt-6 border-t border-gray-200">
                <Button
                  variant="success"
                  onClick={onClientApproveFinal}
                  leftIcon={<CheckCircle className="w-4 h-4" />}
                >
                  Mark Final Approved
                </Button>
              </div>
            )}
            
            {phaseStatus.phase2ClientApproved && !phaseStatus.isLocked && (
              <div className="mt-6 pt-6 border-t border-gray-200">
                <Button
                  variant="warning"
                  onClick={onLockPreparation}
                  leftIcon={<Lock className="w-4 h-4" />}
                >
                  Lock Preparation
                </Button>
              </div>
            )}
            
            {phaseStatus.isLocked && (
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-center gap-2 text-green-600">
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-medium">Preparation Complete - Ready for Filing</span>
                </div>
              </div>
            )}
          </Card.Content>
        )}
      </Card>

      {/* Final Summary */}
      {phaseStatus.isLocked && (
        <Card className="bg-green-50 border-green-200">
          <Card.Content>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <FileText className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="font-medium text-green-800">Tax Preparation Complete</p>
                <p className="text-sm text-green-600">
                  Both phases completed. Client has approved. Ready to proceed to filing.
                </p>
              </div>
            </div>
          </Card.Content>
        </Card>
      )}
    </div>
  );
};

export default TaxPreparationPhases;
