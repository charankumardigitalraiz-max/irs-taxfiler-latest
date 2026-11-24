import React, { useEffect } from 'react';
import { clsx } from 'clsx';
import { X } from 'lucide-react';

const Modal = ({
  isOpen,
  onClose,
  title,
  description,
  icon,
  children,
  size = 'md',
  showClose = true,
  headerClassName,
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-3xl',
    full: 'max-w-full mx-4',
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop with soft blur */}
      <div
        className="fixed inset-0 bg-[#152F4A]/45 backdrop-blur-xs transition-opacity duration-200"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
        <div
          className={clsx(
            'relative w-full bg-white rounded-2xl shadow-[0_20px_60px_rgba(31,66,100,0.18)] border border-[#DCEAF0] text-left transform transition-all overflow-hidden my-8',
            sizeClasses[size]
          )}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div
            className={clsx(
              'flex items-center justify-between px-6 py-5 border-b border-[#EDF3F6] bg-white',
              headerClassName
            )}
          >
            <div className="flex items-center gap-3.5 min-w-0">
              {icon && (
                <div className="w-10 h-10 rounded-xl bg-[#EAF5FA] text-[#127EAB] border border-[#127EAB]/20 flex items-center justify-center shrink-0 shadow-xs">
                  {icon}
                </div>
              )}
              <div className="min-w-0">
                <h3 className="text-base sm:text-lg font-bold text-[#1F4264] tracking-tight leading-snug">
                  {title}
                </h3>
                {description && (
                  <p className="mt-0.5 text-xs sm:text-sm text-[#6F7F8E] font-medium leading-normal">
                    {description}
                  </p>
                )}
              </div>
            </div>
            {showClose && (
              <button
                type="button"
                onClick={onClose}
                className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-[#1F4264] hover:bg-slate-100 transition-colors cursor-pointer shrink-0 ml-3"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Content */}
          <div className="p-6">{children}</div>
        </div>
      </div>
    </div>
  );
};

const ModalFooter = ({ children, className }) => (
  <div
    className={clsx(
      'flex items-center justify-end gap-3 pt-4 mt-6 border-t border-[#EDF3F6]',
      className
    )}
  >
    {children}
  </div>
);

Modal.Footer = ModalFooter;

export default Modal;
