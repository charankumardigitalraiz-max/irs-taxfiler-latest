import React from 'react';
import { clsx } from 'clsx';
import { Check } from 'lucide-react';

const MAIN_WORKFLOW_PATH = [
  'Personal Info',
  'Schedule',
  'Interview',
  'Documents',
  'Preparation',
  'Review',
  'Payment',
  'Filing',
  'Acceptance',
];

const getProgress = (currentStage) => {
  const index = MAIN_WORKFLOW_PATH.findIndex((stage) => 
    stage.toLowerCase() === currentStage.toLowerCase()
  );
  if (index === -1) return 0;
  return Math.round(((index + 1) / MAIN_WORKFLOW_PATH.length) * 100);
};

const WorkflowProgress = ({ currentStatus, compact = false, isPersonalInfoComplete = false }) => {
  // Map REGISTERED to Personal Info for backward compatibility
  const mappedStatus = currentStatus === 'REGISTERED' ? 'Personal Info' : currentStatus;
  const currentStageIndex = MAIN_WORKFLOW_PATH.findIndex((stage) => 
    stage.toLowerCase() === mappedStatus?.toLowerCase()
  );
  
  // Only show progress if personal info is completed
  // If personal info is complete, show progress based on current stage
  // If personal info is not complete, show 0% progress
  let progress = 0;
  if (isPersonalInfoComplete) {
    if (currentStageIndex >= 0) {
      // If we're at Personal Info stage (index 0), show at least first stage as complete
      if (currentStageIndex === 0) {
        progress = Math.round((1 / MAIN_WORKFLOW_PATH.length) * 100);
      } else {
        progress = getProgress(mappedStatus);
      }
    } else {
      // If current status doesn't match any stage but personal info is complete, show at least first stage progress
      progress = Math.round((1 / MAIN_WORKFLOW_PATH.length) * 100);
    }
  }
  
  // For compact mode, show limited stages
  const displayStages = compact
    ? MAIN_WORKFLOW_PATH.filter((_, i) => i % 3 === 0 || i === MAIN_WORKFLOW_PATH.length - 1)
    : MAIN_WORKFLOW_PATH;
  
  return (
    <div className="w-full">
      {/* Progress bar */}
      <div className="relative mb-4">
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-primary-600 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="mt-1 flex justify-between text-xs text-gray-500">
          <span>Personal Info</span>
          <span>{progress}% Complete</span>
          <span>Filing Complete</span>
        </div>
      </div>
      
      {/* Stage indicators */}
      <div className="relative">
        <div className="flex items-center justify-between">
          {displayStages.map((stageKey, index) => {
            const fullIndex = MAIN_WORKFLOW_PATH.indexOf(stageKey);
            // Personal Info (index 0) is completed if personal info is filled
            // Other stages are completed if we've passed them
            const isPersonalInfoStage = fullIndex === 0;
            const isCompleted = isPersonalInfoComplete && (
              (isPersonalInfoStage) || 
              (currentStageIndex >= 0 && fullIndex < currentStageIndex)
            );
            const isCurrent = isPersonalInfoComplete && currentStageIndex >= 0 && fullIndex === currentStageIndex;
            const isPending = !isPersonalInfoComplete || (currentStageIndex >= 0 && fullIndex > currentStageIndex);
            
            return (
              <div
                key={stageKey}
                className="flex flex-col items-center"
                style={{ flex: 1 }}
              >
                {/* Connector line */}
                {index > 0 && (
                  <div
                    className={clsx(
                      'absolute h-0.5 top-4 -translate-y-1/2 z-0',
                      isPersonalInfoComplete && (
                        // Show line as completed if previous stage is Personal Info (completed) or if we've passed it
                        MAIN_WORKFLOW_PATH.indexOf(displayStages[index - 1]) === 0 ||
                        (currentStageIndex >= 0 && MAIN_WORKFLOW_PATH.indexOf(displayStages[index - 1]) < currentStageIndex)
                      )
                        ? 'bg-primary-600' 
                        : 'bg-gray-200'
                    )}
                    style={{
                      left: `${((index - 1) / (displayStages.length - 1)) * 100 + (50 / displayStages.length)}%`,
                      width: `${100 / (displayStages.length - 1) - (100 / displayStages.length)}%`,
                    }}
                  />
                )}
                
                {/* Circle */}
                <div
                  className={clsx(
                    'relative z-10 w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all',
                    isCompleted
                      ? 'bg-primary-600 border-primary-600'
                      : isCurrent
                      ? 'bg-white border-primary-600'
                      : 'bg-white border-gray-300'
                  )}
                >
                  {isCompleted ? (
                    <Check className="w-4 h-4 text-white" />
                  ) : (
                    <span
                      className={clsx(
                        'text-xs font-medium',
                        isCurrent ? 'text-primary-600' : 'text-gray-400'
                      )}
                    >
                      {fullIndex + 1}
                    </span>
                  )}
                </div>
                
                {/* Label */}
                {!compact && (
                  <span
                    className={clsx(
                      'mt-2 text-xs font-medium text-center max-w-[80px]',
                      isCurrent ? 'text-primary-600' : 'text-gray-500'
                    )}
                  >
                    {stageKey}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default WorkflowProgress;

