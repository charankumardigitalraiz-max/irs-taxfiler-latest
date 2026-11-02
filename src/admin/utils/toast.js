// Utility functions to show toasts from anywhere (including API interceptors)
import { useToastStore } from '../hooks/useToast';

export const showToast = (type, message, options = {}) => {
  useToastStore.getState().addToast({
    type,
    message,
    duration: type === 'error' ? 5000 : 3000,
    ...options,
  });
};

export const showSuccess = (message, options = {}) => {
  showToast('success', message, options);
};

export const showError = (message, options = {}) => {
  showToast('error', message, options);
};

export const showWarning = (message, options = {}) => {
  showToast('warning', message, options);
};

export const showInfo = (message, options = {}) => {
  showToast('info', message, options);
};

