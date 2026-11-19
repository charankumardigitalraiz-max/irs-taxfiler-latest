import { clsx } from 'clsx';
import { X } from 'lucide-react';

const Modal = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  size = 'md',
  showClose = true,
}) => {
  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    full: 'max-w-full mx-4',
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#152F4A]/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div
          className={clsx(
            'relative w-full bg-white rounded-2xl shadow-[0_20px_50px_rgba(31,66,100,0.15)] border border-[#DCEAF0] transform transition-all overflow-hidden',
            sizeClasses[size]
          )}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-start justify-between p-5 sm:p-6 border-b border-[#E6F0F5] bg-[#F8FBFC]/60">
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-[#1F4264]">{title}</h3>
              {description && (
                <p className="mt-1 text-xs sm:text-sm text-[#6F7F8E] font-medium">{description}</p>
              )}
            </div>
            {showClose && (
              <button
                type="button"
                onClick={onClose}
                className="p-1.5 text-slate-400 hover:text-[#1F4264] hover:bg-[#E9F7FA] rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Content */}
          <div className="p-5 sm:p-6">{children}</div>
        </div>
      </div>
    </div>
  );
};

const ModalFooter = ({ children, className }) => (
  <div
    className={clsx(
      'flex items-center justify-end gap-3 pt-4 mt-4 border-t border-[#E6F0F5]',
      className
    )}
  >
    {children}
  </div>
);

Modal.Footer = ModalFooter;

export default Modal;
