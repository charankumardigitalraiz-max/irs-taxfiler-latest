import { create } from 'zustand';

export const useToastStore = create((set) => ({
  toasts: [],
  addToast: (toast) => {
    const id = Date.now() + Math.random();
    const newToast = {
      id,
      type: 'info',
      message: '',
      title: null,
      duration: 5000,
      autoClose: true,
      ...toast,
    };
    set((state) => ({
      toasts: [...state.toasts, newToast],
    }));
    return id;
  },
  removeToast: (id) => {
    set((state) => ({
      toasts: state.toasts.filter((toast) => toast.id !== id),
    }));
  },
  clearToasts: () => {
    set({ toasts: [] });
  },
}));

export const useToast = () => {
  const toasts = useToastStore((state) => state.toasts);
  const addToast = useToastStore((state) => state.addToast);
  const removeToast = useToastStore((state) => state.removeToast);
  const clearToasts = useToastStore((state) => state.clearToasts);

  const showSuccess = (message, options = {}) => {
    return addToast({ type: 'success', message, ...options });
  };

  const showError = (message, options = {}) => {
    return addToast({ type: 'error', message, ...options });
  };

  const showWarning = (message, options = {}) => {
    return addToast({ type: 'warning', message, ...options });
  };

  const showInfo = (message, options = {}) => {
    return addToast({ type: 'info', message, ...options });
  };

  return {
    toasts,
    showSuccess,
    showError,
    showWarning,
    showInfo,
    removeToast,
    clearToasts,
  };
};

