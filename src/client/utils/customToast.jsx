import React from 'react';
import { toast } from 'react-toastify';
import { Check, X, AlertTriangle, Info } from 'lucide-react';

/**
 * Visual Styles:
 * 1. 'sonner' (Default): Clean white floating card with 3D glowing icon & inset rounded capsule progress bar (Image 2 style)
 * 2. 'pastel': Soft candy frosted card with rich pastel surface tint (Image 1 style)
 */
let currentToastStyle = (typeof window !== 'undefined' && window.localStorage?.getItem('irs_toast_style')) || 'sonner';

export const setToastStyle = (style) => {
  currentToastStyle = style;
  if (typeof window !== 'undefined' && window.localStorage) {
    window.localStorage.setItem('irs_toast_style', style);
  }
};

/**
 * Glowing 3D Status Badge (Apple / Sonner style):
 * Rounded-full with soft matching colored drop shadow / ambient glow
 */
export const LuxuryToastIcon = ({ type, style = currentToastStyle }) => {
  const configs = {
    success: {
      bg: 'bg-gradient-to-br from-[#10B981] to-[#059669]',
      shadow: 'shadow-[0_4px_14px_rgba(16,185,129,0.38)]',
      icon: <Check className="w-5 h-5 text-white stroke-[2.8]" />,
    },
    error: {
      bg: 'bg-gradient-to-br from-[#EF4444] to-[#DC2626]',
      shadow: 'shadow-[0_4px_14px_rgba(239,68,68,0.38)]',
      icon: <X className="w-5 h-5 text-white stroke-[2.8]" />,
    },
    warning: {
      bg: 'bg-gradient-to-br from-[#F59E0B] to-[#D97706]',
      shadow: 'shadow-[0_4px_14px_rgba(245,158,11,0.38)]',
      icon: <AlertTriangle className="w-4.5 h-4.5 text-white stroke-[2.6]" />,
    },
    info: {
      bg: 'bg-gradient-to-br from-[#3B82F6] to-[#2563EB]',
      shadow: 'shadow-[0_4px_14px_rgba(59,130,246,0.38)]',
      icon: <Info className="w-5 h-5 text-white stroke-[2.6]" />,
    },
  };

  const current = configs[type] || configs.info;

  return (
    <div
      className={`w-10 h-10 min-w-[40px] min-h-[40px] rounded-full flex items-center justify-center shrink-0 ${current.bg} ${current.shadow} transition-transform hover:scale-105`}
    >
      {current.icon}
    </div>
  );
};

/**
 * Toast content layout matching Reference Image 2:
 * [Glowing Circle Icon]  Title (14.5px Bold #0F172A Montserrat)
 *                       Message (12.5px Medium #64748B)
 * [=========== Inset Capsule Rounded Progress Bar ===========]
 */
export const LuxuryToastContent = ({
  type = 'success',
  title,
  message,
  duration = 4000,
  style = currentToastStyle,
}) => {
  const barColors = {
    success: 'bg-[#10B981]',
    error: 'bg-[#EF4444]',
    warning: 'bg-[#F59E0B]',
    info: 'bg-[#3B82F6]',
  };

  const pastelSurfaces = {
    success: 'bg-[#E8F8F0] border-[#A7F3D0]',
    error: 'bg-[#FEE2E2] border-[#FECACA]',
    warning: 'bg-[#FEF3C7] border-[#FDE68A]',
    info: 'bg-[#E0F2FE] border-[#BAE6FD]',
  };

  const isPastel = style === 'pastel';

  return (
    <div
      className={`flex flex-col w-full select-none font-['Montserrat',sans-serif] ${
        isPastel ? `p-1 rounded-xl` : ''
      }`}
    >
      {/* Main Row: Icon + Text */}
      <div className="flex items-center gap-3.5 w-full pr-6">
        <LuxuryToastIcon type={type} style={style} />
        <div className="flex flex-col min-w-0 flex-1 justify-center">
          {title && (
            <h4 className="font-semibold text-[14px] text-[#1E293B] tracking-[-0.01em] leading-tight">
              {title}
            </h4>
          )}
          {message && (
            <p className="text-[12.5px] text-[#64748B] font-medium leading-relaxed mt-0.5 break-words line-clamp-2">
              {message}
            </p>
          )}
        </div>
      </div>

      {/* Inset Capsule Progress Bar (Directly from Reference Image 2) */}
      <div className="w-full h-1.5 bg-[#F1F5F9] rounded-full overflow-hidden mt-3">
        <div
          className={`h-full rounded-full ${barColors[type] || barColors.info}`}
          style={{
            animation: `toastProgressBar ${duration}ms linear forwards`,
          }}
        />
      </div>
    </div>
  );
};

/**
 * Helper to trigger luxury floating toasts
 */
export const customToast = {
  success: (message, options = {}) => {
    const { title = 'Changes saved', duration = 4000, ...rest } = options;
    return toast.success(
      <LuxuryToastContent type="success" title={title} message={message} duration={duration} />,
      { icon: false, autoClose: duration, hideProgressBar: true, ...rest }
    );
  },
  error: (message, options = {}) => {
    const { title = 'Something went wrong', duration = 5000, ...rest } = options;
    return toast.error(
      <LuxuryToastContent type="error" title={title} message={message} duration={duration} />,
      { icon: false, autoClose: duration, hideProgressBar: true, ...rest }
    );
  },
  warning: (message, options = {}) => {
    const { title = 'Warning', duration = 4500, ...rest } = options;
    return toast.warning(
      <LuxuryToastContent type="warning" title={title} message={message} duration={duration} />,
      { icon: false, autoClose: duration, hideProgressBar: true, ...rest }
    );
  },
  info: (message, options = {}) => {
    const { title = 'Information', duration = 4000, ...rest } = options;
    return toast.info(
      <LuxuryToastContent type="info" title={title} message={message} duration={duration} />,
      { icon: false, autoClose: duration, hideProgressBar: true, ...rest }
    );
  },
};

// Global interceptor: automatically wrap standard toast.success, toast.error, etc.
if (typeof toast !== 'undefined' && toast && !toast.__isLuxuryPatched) {
  const origSuccess = toast.success?.bind(toast);
  const origError = toast.error?.bind(toast);
  const origWarning = (toast.warning || toast.warn)?.bind(toast);
  const origInfo = toast.info?.bind(toast);

  const wrapMethod = (origFn, type, defaultTitle, defaultDuration) => {
    if (!origFn) return undefined;
    return (content, options = {}) => {
      if (React.isValidElement(content)) {
        return origFn(content, { icon: false, ...options });
      }
      const title = options?.title !== undefined ? options.title : defaultTitle;
      const duration = options?.autoClose || defaultDuration;
      return origFn(
        <LuxuryToastContent type={type} title={title} message={content} duration={duration} />,
        { icon: false, hideProgressBar: true, autoClose: duration, ...options }
      );
    };
  };

  if (origSuccess) toast.success = wrapMethod(origSuccess, 'success', 'Changes saved', 4000);
  if (origError) toast.error = wrapMethod(origError, 'error', 'Something went wrong', 5000);
  if (origWarning) {
    const wrappedWarn = wrapMethod(origWarning, 'warning', 'Warning', 4500);
    toast.warning = wrappedWarn;
    toast.warn = wrappedWarn;
  }
  if (origInfo) toast.info = wrapMethod(origInfo, 'info', 'Information', 4000);

  toast.__isLuxuryPatched = true;
}

// Window test helper for immediate testing in browser console
if (typeof window !== 'undefined') {
  window.setToastStyle = setToastStyle;
  window.testCustomToast = (type = 'success', message, title) => {
    const fn = customToast[type] || customToast.success;
    const defaultMessages = {
      success: 'Your changes were saved successfully',
      error: 'Please try again or contact support',
      warning: 'Please review your changes carefully',
      info: 'Your session will expire in 5 minutes',
    };
    const defaultTitles = {
      success: 'Changes saved',
      error: 'Something went wrong',
      warning: 'Warning',
      info: 'Information',
    };
    return fn(message || defaultMessages[type], {
      title: title !== undefined ? title : defaultTitles[type],
    });
  };
}

export default customToast;
