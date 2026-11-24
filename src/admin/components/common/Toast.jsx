import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { clsx } from 'clsx';
import { LuxuryToastIcon } from '../../../client/utils/customToast';

const Toast = ({ toast, onClose }) => {
  const duration = toast.duration || 4500;

  useEffect(() => {
    if (toast.autoClose === false) return;
    const timer = setTimeout(() => {
      onClose(toast.id);
    }, duration);
    return () => clearTimeout(timer);
  }, [toast, onClose, duration]);

  const borderStyles = {
    success: 'border-emerald-500/25',
    error: 'border-rose-500/25',
    warning: 'border-amber-500/25',
    info: 'border-blue-500/25',
  };

  const barColors = {
    success: 'bg-[#10B981]',
    error: 'bg-[#EF4444]',
    warning: 'bg-[#F59E0B]',
    info: 'bg-[#3B82F6]',
  };

  const defaultTitles = {
    success: 'Changes saved',
    error: 'Something went wrong',
    warning: 'Warning',
    info: 'Information',
  };

  const currentType = toast.type || 'info';

  return (
    <div
      className={clsx(
        "relative flex flex-col p-4 pt-3.5 pb-3 rounded-[20px] bg-white border shadow-[0_16px_36px_-6px_rgba(15,23,42,0.08),0_4px_12px_-2px_rgba(15,23,42,0.03)] min-w-[320px] max-w-[400px] animate-slide-in transition-all duration-200 hover:-translate-y-0.5 cursor-default font-['Montserrat',sans-serif]",
        borderStyles[currentType] || 'border-slate-200/80'
      )}
      role="alert"
    >
      {/* Main Row: Icon + Text */}
      <div className="flex items-center gap-3.5 w-full pr-6">
        <LuxuryToastIcon type={currentType} />
        <div className="flex flex-col min-w-0 flex-1 justify-center">
          <h4 className="font-semibold text-[14px] text-[#1E293B] tracking-[-0.01em] leading-tight">
            {toast.title || defaultTitles[currentType]}
          </h4>
          <p className="text-[12.5px] text-[#64748B] font-medium leading-relaxed mt-0.5 break-words line-clamp-2">
            {toast.message}
          </p>
        </div>
      </div>

      {/* Inset Capsule Progress Bar (Reference Image 2) */}
      <div className="w-full h-1.5 bg-[#F1F5F9] rounded-full overflow-hidden mt-3">
        <div
          className={clsx('h-full rounded-full', barColors[currentType] || barColors.info)}
          style={{
            animation: `toastProgressBar ${duration}ms linear forwards`,
          }}
        />
      </div>

      {/* Top-Right Circular Close Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onClose(toast.id);
        }}
        className="absolute top-3 right-3 w-6 h-6 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
        aria-label="Close"
      >
        <X className="w-3.5 h-3.5 stroke-[2]" />
      </button>
    </div>
  );
};

export default Toast;
