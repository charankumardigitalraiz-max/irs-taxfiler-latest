// Workflow Configuration - Central source of truth for all workflow stages

export const WORKFLOW_STAGES = {
  PERSONAL_INFO: {
    order: 1,
    key: 'PERSONAL_INFO',
    label: 'Personal Info',
    description: 'User has completed personal information',
    next: ['MEETING_SCHEDULED'],
    prev: [],
    color: 'blue',
    bgColor: 'bg-blue-100',
    textColor: 'text-blue-700',
    icon: 'User',
  },
  MEETING_SCHEDULED: {
    order: 2,
    key: 'MEETING_SCHEDULED',
    label: 'Call Scheduled',
    description: 'Consultation meeting has been scheduled',
    next: ['INTERVIEW_PENDING'],
    prev: ['PERSONAL_INFO'],
    color: 'blue',
    bgColor: 'bg-blue-100',
    textColor: 'text-blue-700',
    icon: 'Calendar',
  },
  INTERVIEW_PENDING: {
    order: 3,
    key: 'INTERVIEW_PENDING',
    label: 'Call Pending',
    description: 'Waiting for interview to be conducted',
    next: ['INTERVIEW_COMPLETED'],
    prev: ['MEETING_SCHEDULED'],
    color: 'yellow',
    bgColor: 'bg-yellow-100',
    textColor: 'text-yellow-700',
    icon: 'Clock',
  },
  INTERVIEW_COMPLETED: {
    order: 4,
    key: 'INTERVIEW_COMPLETED',
    label: 'Call Completed',
    description: 'Interview has been conducted successfully',
    next: ['DOCUMENT_PENDING'],
    prev: ['INTERVIEW_PENDING'],
    color: 'blue',
    bgColor: 'bg-blue-100',
    textColor: 'text-blue-700',
    icon: 'CheckCircle',
  },
  DOCUMENT_PENDING: {
    order: 5,
    key: 'DOCUMENT_PENDING',
    label: 'Document Pending',
    description: 'Waiting for documents to be uploaded',
    next: ['DOCUMENTS_APPROVED'],
    prev: ['INTERVIEW_COMPLETED'],
    color: 'yellow',
    bgColor: 'bg-yellow-100',
    textColor: 'text-yellow-700',
    icon: 'FileText',
  },
  DOCUMENTS_APPROVED: {
    order: 6,
    key: 'DOCUMENTS_APPROVED',
    label: 'Documents Approved',
    description: 'All required documents have been approved',
    next: [], // ['PREPARATION_PHASE1'],
    prev: ['DOCUMENT_PENDING'],
    color: 'green',
    bgColor: 'bg-green-100',
    textColor: 'text-green-700',
    icon: 'FileCheck',
  },
  PREPARATION_PHASE1: {
    order: 7,
    key: 'PREPARATION_PHASE1',
    label: 'Preparation Phase 1',
    description: 'Tax calculation and summary generation',
    next: ['REVIEW_PENDING'],
    prev: ['DOCUMENTS_APPROVED'],
    color: 'purple',
    bgColor: 'bg-purple-100',
    textColor: 'text-purple-700',
    icon: 'Calculator',
  },
  REVIEW_PENDING: {
    order: 8,
    key: 'REVIEW_PENDING',
    label: 'Review & Summary',
    description: 'Summary sent to client for review',
    next: ['CLIENT_APPROVED'],
    prev: ['PREPARATION_PHASE1'],
    color: 'yellow',
    bgColor: 'bg-yellow-100',
    textColor: 'text-yellow-700',
    icon: 'Eye',
  },
  CLIENT_APPROVED: {
    order: 9,
    key: 'CLIENT_APPROVED',
    label: 'Client Approved',
    description: 'Client has approved the tax summary',
    next: ['PAYMENT_PENDING'],
    prev: ['REVIEW_PENDING'],
    color: 'green',
    bgColor: 'bg-green-100',
    textColor: 'text-green-700',
    icon: 'ThumbsUp',
  },
  PAYMENT_PENDING: {
    order: 10,
    key: 'PAYMENT_PENDING',
    label: 'Payment Pending',
    description: 'Waiting for payment to be completed',
    next: ['PAYMENT_COMPLETED'],
    prev: ['CLIENT_APPROVED'],
    color: 'orange',
    bgColor: 'bg-orange-100',
    textColor: 'text-orange-700',
    icon: 'CreditCard',
  },
  PAYMENT_COMPLETED: {
    order: 11,
    key: 'PAYMENT_COMPLETED',
    label: 'Payment Completed',
    description: 'Payment has been received',
    next: ['PREPARATION_PHASE2'],
    prev: ['PAYMENT_PENDING'],
    color: 'green',
    bgColor: 'bg-green-100',
    textColor: 'text-green-700',
    icon: 'DollarSign',
  },
  PREPARATION_PHASE2: {
    order: 12,
    key: 'PREPARATION_PHASE2',
    label: 'Preparation Phase 2',
    description: 'Final validation and preparation',
    next: ['FILING_READY'],
    prev: ['PAYMENT_COMPLETED'],
    color: 'purple',
    bgColor: 'bg-purple-100',
    textColor: 'text-purple-700',
    icon: 'ClipboardCheck',
  },
  FILING_READY: {
    order: 13,
    key: 'FILING_READY',
    label: 'Filing Ready',
    description: 'Ready for tax filing',
    next: ['E_FILING_SUBMITTED', 'PAPER_FILING_STARTED'],
    prev: ['PREPARATION_PHASE2'],
    color: 'blue',
    bgColor: 'bg-blue-100',
    textColor: 'text-blue-700',
    icon: 'Send',
  },
  E_FILING_SUBMITTED: {
    order: 14,
    key: 'E_FILING_SUBMITTED',
    label: 'E-Filing Submitted',
    description: 'E-Filing has been submitted',
    next: ['E_FILING_ACCEPTED', 'E_FILING_REJECTED'],
    prev: ['FILING_READY'],
    color: 'blue',
    bgColor: 'bg-blue-100',
    textColor: 'text-blue-700',
    icon: 'Upload',
  },
  E_FILING_ACCEPTED: {
    order: 15,
    key: 'E_FILING_ACCEPTED',
    label: 'E-Filing Accepted',
    description: 'E-Filing has been accepted by IRS',
    next: [],
    prev: ['E_FILING_SUBMITTED'],
    color: 'green',
    bgColor: 'bg-green-100',
    textColor: 'text-green-700',
    icon: 'CheckCircle2',
    isFinal: true,
  },
  E_FILING_REJECTED: {
    order: 15,
    key: 'E_FILING_REJECTED',
    label: 'E-Filing Rejected',
    description: 'E-Filing was rejected - needs resubmission',
    next: ['E_FILING_SUBMITTED'],
    prev: ['E_FILING_SUBMITTED'],
    color: 'red',
    bgColor: 'bg-red-100',
    textColor: 'text-red-700',
    icon: 'XCircle',
  },
  PAPER_FILING_STARTED: {
    order: 14,
    key: 'PAPER_FILING_STARTED',
    label: 'Paper Filing Started',
    description: 'Paper filing process initiated',
    next: ['PAPER_FILING_COMPLETED'],
    prev: ['FILING_READY'],
    color: 'blue',
    bgColor: 'bg-blue-100',
    textColor: 'text-blue-700',
    icon: 'Printer',
  },
  PAPER_FILING_COMPLETED: {
    order: 15,
    key: 'PAPER_FILING_COMPLETED',
    label: 'Paper Filing Completed',
    description: 'Paper filing has been completed',
    next: [],
    prev: ['PAPER_FILING_STARTED'],
    color: 'green',
    bgColor: 'bg-green-100',
    textColor: 'text-green-700',
    icon: 'CheckCircle2',
    isFinal: true,
  },
};

// Get ordered list of stages for display
export const WORKFLOW_STAGES_ORDERED = Object.values(WORKFLOW_STAGES).sort(
  (a, b) => a.order - b.order
);

// Main workflow path (excluding branches)
export const MAIN_WORKFLOW_PATH = [
  'PERSONAL_INFO',
  'MEETING_SCHEDULED',
  'INTERVIEW_PENDING',
  'INTERVIEW_COMPLETED',
  'DOCUMENT_PENDING',
  'DOCUMENTS_APPROVED',
  //   'PREPARATION_PHASE1',
  //   'REVIEW_PENDING',
  //   'CLIENT_APPROVED',
  //   'PAYMENT_PENDING',
  //   'PAYMENT_COMPLETED',
  //   'PREPARATION_PHASE2',
  //   'FILING_READY',
];

// Utility functions
export const canAdvanceTo = (currentStatus, targetStatus) => {
  const current = WORKFLOW_STAGES[currentStatus];
  if (!current) return false;
  return current.next.includes(targetStatus);
};

export const getNextStages = (currentStatus) => {
  return WORKFLOW_STAGES[currentStatus]?.next || [];
};

export const getPreviousStages = (currentStatus) => {
  return WORKFLOW_STAGES[currentStatus]?.prev || [];
};

export const getStageInfo = (status) => {
  return WORKFLOW_STAGES[status] || null;
};

export const getProgress = (currentStatus) => {
  const stage = WORKFLOW_STAGES[currentStatus];
  if (!stage) return 0;
  // Max order is 15, so calculate percentage
  return Math.round((stage.order / 15) * 100);
};

export const isFinalStage = (status) => {
  return WORKFLOW_STAGES[status]?.isFinal || false;
};

export const getStageColor = (status) => {
  return WORKFLOW_STAGES[status]?.color || 'gray';
};

// Validation for workflow transitions
export const validateTransition = (currentStatus, targetStatus, isOverride = false) => {
  if (isOverride) {
    return { valid: true, message: 'Override transition allowed' };
  }

  if (!WORKFLOW_STAGES[currentStatus]) {
    return { valid: false, message: 'Invalid current status' };
  }

  if (!WORKFLOW_STAGES[targetStatus]) {
    return { valid: false, message: 'Invalid target status' };
  }

  if (!canAdvanceTo(currentStatus, targetStatus)) {
    return {
      valid: false,
      message: `Cannot transition from ${WORKFLOW_STAGES[currentStatus].label} to ${WORKFLOW_STAGES[targetStatus].label}`
    };
  }

  return { valid: true, message: 'Transition allowed' };
};

