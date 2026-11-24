import React from 'react';
import Toast from './Toast';
import { useToastStore } from '../../hooks/useToast';

const ToastContainer = () => {
  const toasts = useToastStore((state) => state.toasts);
  const removeToast = useToastStore((state) => state.removeToast);

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-5 right-4 sm:top-6 sm:right-6 z-[999999] flex flex-col gap-2.5 pointer-events-none max-w-full">
      {toasts.map((toast) => (
        <div key={toast.id} className="pointer-events-auto">
          <Toast toast={toast} onClose={removeToast} />
        </div>
      ))}
    </div>
  );
};

export default ToastContainer;
