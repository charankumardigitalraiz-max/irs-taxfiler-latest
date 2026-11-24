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
  // Map backend stage keys to display workflow names
  const normalizedKey = typeof currentStatus === 'string'
    ? currentStatus.trim().toUpperCase().replace(/[\s-]+/g, '_')
    : '';
  const mappedStatus =
    normalizedKey === 'REGISTERED' ||
    normalizedKey === 'REGISTRATION_COMPLETE' ||
    normalizedKey === 'PERSONAL_INFO'
      ? 'Personal Info'
      : currentStatus;
  const currentStageIndex = MAIN_WORKFLOW_PATH.findIndex((stage) =>
    stage.toLowerCase() === mappedStatus?.toLowerCase()
  );

  // Only show progress if personal info is completed
  let progress = 0;
  if (isPersonalInfoComplete) {
    if (currentStageIndex >= 0) {
      if (currentStageIndex === 0) {
        progress = Math.round((1 / MAIN_WORKFLOW_PATH.length) * 100);
      } else {
        progress = getProgress(mappedStatus);
      }
    } else {
      progress = Math.round((1 / MAIN_WORKFLOW_PATH.length) * 100);
    }
  }

  // For compact mode, show limited stages
  const displayStages = compact
    ? MAIN_WORKFLOW_PATH.filter((_, i) => i % 3 === 0 || i === MAIN_WORKFLOW_PATH.length - 1)
    : MAIN_WORKFLOW_PATH;

  return (
    <div className="w-full">
      {/* Top Progress Track */}
      <div className="relative mb-6">
        <div className="flex items-center justify-between text-xs mb-2">
          <span className="font-medium text-[#6F7F8E]">Overall Progress</span>
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-[#E9F7FA] text-[#127EAB] border border-[#127EAB]/20">
            {progress}% Complete
          </span>
        </div>
        <div className="h-2 bg-[#E9EFF3] rounded-full overflow-hidden p-[1px] border border-[#E2EDF2]">
          <div
            className="h-full bg-gradient-to-r from-[#1F4264] to-[#127EAB] rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Modern Stepper */}
      <div className="overflow-x-auto min-w-0 pt-1 pb-1">
        <div className="flex items-start justify-between min-w-[620px] sm:min-w-0">
          {displayStages.map((stageKey, index) => {
            const fullIndex = MAIN_WORKFLOW_PATH.indexOf(stageKey);
            const isPersonalInfoStage = fullIndex === 0;
            const isCompleted = isPersonalInfoComplete && (
              isPersonalInfoStage ||
              (currentStageIndex >= 0 && fullIndex < currentStageIndex)
            );
            const isCurrent = isPersonalInfoComplete && currentStageIndex >= 0 && fullIndex === currentStageIndex;

            // Is the line connecting to the next step completed?
            const nextStageKey = displayStages[index + 1];
            const nextFullIndex = nextStageKey ? MAIN_WORKFLOW_PATH.indexOf(nextStageKey) : -1;
            const isConnectorCompleted = isPersonalInfoComplete && (
              currentStageIndex >= 0 && nextFullIndex <= currentStageIndex
            );

            return (
              <div
                key={stageKey}
                className="flex-1 flex flex-col items-center relative group"
              >
                {/* Continuous Connecting Line */}
                {index < displayStages.length - 1 && (
                  <div
                    className={clsx(
                      'absolute top-4.5 left-1/2 w-full h-[2px] -translate-y-1/2 transition-colors duration-300 z-0',
                      isConnectorCompleted ? 'bg-[#127EAB]' : 'bg-[#E2EDF2]'
                    )}
                  />
                )}

                {/* Step Circle */}
                <div
                  className={clsx(
                    'relative z-10 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 text-xs',
                    isCompleted
                      ? 'bg-gradient-to-br from-[#127EAB] to-[#0E668B] text-white shadow-xs'
                      : isCurrent
                      ? 'bg-white border-2 border-[#127EAB] text-[#127EAB] ring-4 ring-[#127EAB]/15 font-medium shadow-xs'
                      : 'bg-[#F8FAFC] border border-[#CCDCE1] text-[#8BA0B2]'
                  )}
                >
                  {isCompleted ? (
                    <Check className="w-4 h-4 text-white stroke-[2.5]" />
                  ) : (
                    <span className="font-medium">{fullIndex + 1}</span>
                  )}
                </div>

                {/* Structured Step Typography */}
                {!compact && (
                  <div className="mt-2.5 text-center flex flex-col items-center">
                    <span
                      className={clsx(
                        'text-[10px] tracking-wider uppercase font-medium mb-0.5',
                        isCurrent
                          ? 'text-[#127EAB]'
                          : isCompleted
                          ? 'text-[#6F7F8E]'
                          : 'text-[#A0B0BE]'
                      )}
                    >
                      Step {fullIndex + 1}
                    </span>
                    <span
                      className={clsx(
                        'text-xs tracking-tight transition-colors leading-snug px-1 max-w-[85px]',
                        isCurrent
                          ? 'text-[#127EAB] font-medium'
                          : isCompleted
                          ? 'text-[#1F4264] font-medium'
                          : 'text-[#8BA0B2] font-normal'
                      )}
                    >
                      {stageKey}
                    </span>
                  </div>
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
