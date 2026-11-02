// Role definitions
export const ROLES = {
  SUPER_ADMIN: 'SUPER_ADMIN',
  TAX_CONSULTANT: 'TAX_CONSULTANT',
  SUPPORT_STAFF: 'SUPPORT_STAFF',
};

export const ROLE_LABELS = {
  [ROLES.SUPER_ADMIN]: 'Super Admin',
  [ROLES.TAX_CONSULTANT]: 'Tax Consultant',
  [ROLES.SUPPORT_STAFF]: 'Support Staff',
};

// Document types
export const DOCUMENT_TYPES = {
  W2: 'W2 Form',
  W9: 'W9 Form',
  FORM_1099: '1099 Form',
  BANK_STATEMENT: 'Bank Statement',
  ID_PROOF: 'ID Proof',
  SSN_CARD: 'SSN Card',
  PREVIOUS_RETURN: 'Previous Tax Return',
  FINAL_COPY: 'Final Copy',
  OTHER: 'Other',
};

// Document status
export const DOCUMENT_STATUS = {
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
};

export const DOCUMENT_STATUS_LABELS = {
  [DOCUMENT_STATUS.PENDING]: 'Pending Review',
  [DOCUMENT_STATUS.APPROVED]: 'Approved',
  [DOCUMENT_STATUS.REJECTED]: 'Rejected',
};

// Meeting status
export const MEETING_STATUS = {
  PENDING: 'PENDING',
  COMPLETED: 'COMPLETED',
  RESCHEDULED: 'RESCHEDULED',
  CANCELLED: 'CANCELLED',
};

export const MEETING_STATUS_LABELS = {
  [MEETING_STATUS.PENDING]: 'Scheduled',
  [MEETING_STATUS.COMPLETED]: 'Completed',
  [MEETING_STATUS.RESCHEDULED]: 'Rescheduled',
  [MEETING_STATUS.CANCELLED]: 'Cancelled',
};

// Payment status
export const PAYMENT_STATUS = {
  PENDING: 'PENDING',
  PAID: 'PAID',
  FAILED: 'FAILED',
  REFUNDED: 'REFUNDED',
};

export const PAYMENT_STATUS_LABELS = {
  [PAYMENT_STATUS.PENDING]: 'Pending',
  [PAYMENT_STATUS.PAID]: 'Paid',
  [PAYMENT_STATUS.FAILED]: 'Failed',
  [PAYMENT_STATUS.REFUNDED]: 'Refunded',
};

// Filing types
export const FILING_TYPES = {
  E_FILING: 'E_FILING',
  PAPER_FILING: 'PAPER_FILING',
};

export const FILING_TYPE_LABELS = {
  [FILING_TYPES.E_FILING]: 'E-Filing',
  [FILING_TYPES.PAPER_FILING]: 'Paper Filing',
};

// Status colors for badges
export const STATUS_COLORS = {
  gray: {
    bg: 'bg-gray-100',
    text: 'text-gray-700',
    dot: 'bg-gray-500',
  },
  blue: {
    bg: 'bg-blue-100',
    text: 'text-blue-700',
    dot: 'bg-blue-500',
  },
  green: {
    bg: 'bg-green-100',
    text: 'text-green-700',
    dot: 'bg-green-500',
  },
  yellow: {
    bg: 'bg-yellow-100',
    text: 'text-yellow-700',
    dot: 'bg-yellow-500',
  },
  orange: {
    bg: 'bg-orange-100',
    text: 'text-orange-700',
    dot: 'bg-orange-500',
  },
  red: {
    bg: 'bg-red-100',
    text: 'text-red-700',
    dot: 'bg-red-500',
  },
  purple: {
    bg: 'bg-purple-100',
    text: 'text-purple-700',
    dot: 'bg-purple-500',
  },
};

