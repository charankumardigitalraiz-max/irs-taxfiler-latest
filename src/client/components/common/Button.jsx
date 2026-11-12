import { forwardRef } from 'react';
import { clsx } from 'clsx';
import { Loader2 } from 'lucide-react';

const variants = {
  primary: 'bg-gradient-to-r from-[#0C3D5A] via-[#165479] to-[#1A5B82] hover:from-[#09324A] hover:via-[#134969] hover:to-[#165479] text-white shadow-[0_4px_16px_rgba(22,84,121,0.2)] border border-white/20 focus:ring-[#165479]',
  secondary: 'bg-white text-gray-700 border border-slate-200 hover:bg-[#F6F9EE] hover:text-[#165479] focus:ring-[#165479]',
  success: 'bg-[#749220] hover:bg-[#637d1b] text-white focus:ring-[#749220]',
  danger: 'bg-rose-600 text-white hover:bg-rose-700 focus:ring-rose-500',
  warning: 'bg-amber-500 text-white hover:bg-amber-600 focus:ring-amber-500',
  ghost: 'text-gray-700 hover:bg-slate-100 focus:ring-[#165479]',
};

const sizes = {
  sm: 'px-3 py-1.5 text-xs rounded-lg',
  md: 'px-4 py-2 text-sm rounded-xl',
  lg: 'px-6 py-3 text-sm sm:text-[15px] rounded-xl',
};

const Button = forwardRef(({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled = false,
  leftIcon,
  rightIcon,
  className,
  ...props
}, ref) => {
  return (
    <button
      ref={ref}
      disabled={disabled || isLoading}
      className={clsx(
        'inline-flex items-center justify-center gap-2 font-medium rounded-lg',
        'transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : leftIcon ? (
        leftIcon
      ) : null}
      {children}
      {!isLoading && rightIcon}
    </button>
  );
});

Button.displayName = 'Button';

export default Button;
