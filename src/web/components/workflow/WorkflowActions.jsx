import { useState } from 'react';
import { clsx } from 'clsx';
import { ArrowRight, AlertTriangle, Loader2 } from 'lucide-react';
import { WORKFLOW_STAGES } from '../../config/workflow';
import { useWorkflow } from '../../hooks/useWorkflow';
import { useAuth } from '../../hooks/useAuth';
import { PERMISSIONS } from '../../utils/permissions';
import Button from '../common/Button';
import Modal from '../common/Modal';

const WorkflowActions = ({ userId }) => {
  const { checkPermission } = useAuth();
  const {
    currentStatus,
    isTransitioning,
    error,
    getAvailableNextStages,
    advanceToNextStage,
    overrideStatus,
    clearError,
  } = useWorkflow();
  
  const [showOverrideModal, setShowOverrideModal] = useState(false);
  const [overrideTarget, setOverrideTarget] = useState('');
  const [overrideReason, setOverrideReason] = useState('');
  const [notes, setNotes] = useState('');
  
  const nextStages = getAvailableNextStages();
  const currentStage = WORKFLOW_STAGES[currentStatus];
  const canOverride = checkPermission(PERMISSIONS.OVERRIDE_WORKFLOW);
  
  const handleAdvance = async (targetStatus) => {
    const result = await advanceToNextStage(targetStatus, notes);
    if (result.success) {
      setNotes('');
    }
  };
  
  const handleOverride = async () => {
    if (!overrideReason.trim()) return;
    
    const result = await overrideStatus(overrideTarget, overrideReason);
    if (result.success) {
      setShowOverrideModal(false);
      setOverrideTarget('');
      setOverrideReason('');
    }
  };
  
  const openOverrideModal = () => {
    clearError();
    setShowOverrideModal(true);
  };
  
  if (currentStage?.isFinal) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
            <span className="text-xl">✓</span>
          </div>
          <div>
            <p className="font-medium text-green-800">Case Completed</p>
            <p className="text-sm text-green-600">
              This case has been successfully completed.
            </p>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="space-y-4">
      {/* Error message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-red-500" />
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}
      
      {/* Current status */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">Current Status</p>
          <p className={clsx('font-semibold', currentStage?.textColor)}>
            {currentStage?.label || currentStatus}
          </p>
        </div>
        {canOverride && (
          <Button variant="ghost" size="sm" onClick={openOverrideModal}>
            Override Status
          </Button>
        )}
      </div>
      
      {/* Notes input */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Notes (optional)
        </label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Add notes for this status change..."
          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
          rows={2}
        />
      </div>
      
      {/* Next stage buttons */}
      {nextStages.length > 0 && (
        <div>
          <p className="text-sm font-medium text-gray-700 mb-2">
            Advance to:
          </p>
          <div className="flex flex-wrap gap-2">
            {nextStages.map((stage) => (
              <Button
                key={stage.key}
                onClick={() => handleAdvance(stage.key)}
                isLoading={isTransitioning}
                disabled={isTransitioning}
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                {stage.label}
              </Button>
            ))}
          </div>
        </div>
      )}
      
      {/* Override Modal */}
      <Modal
        isOpen={showOverrideModal}
        onClose={() => setShowOverrideModal(false)}
        title="Override Workflow Status"
        description="This action will be logged. Please provide a reason for this override."
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              New Status
            </label>
            <select
              value={overrideTarget}
              onChange={(e) => setOverrideTarget(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="">Select a status</option>
              {Object.values(WORKFLOW_STAGES).map((stage) => (
                <option key={stage.key} value={stage.key}>
                  {stage.label}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Reason for Override *
            </label>
            <textarea
              value={overrideReason}
              onChange={(e) => setOverrideReason(e.target.value)}
              placeholder="Explain why this override is necessary..."
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
              rows={3}
              required
            />
          </div>
          
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-700">
              {error}
            </div>
          )}
        </div>
        
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowOverrideModal(false)}>
            Cancel
          </Button>
          <Button
            variant="warning"
            onClick={handleOverride}
            isLoading={isTransitioning}
            disabled={!overrideTarget || !overrideReason.trim()}
          >
            Override Status
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default WorkflowActions;

