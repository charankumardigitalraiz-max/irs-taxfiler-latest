import { forwardRef } from 'react';
import { clsx } from 'clsx';
import { Loader2 } from 'lucide-react';

const variants = {
  primary:
    'bg-gradient-to-r from-[#1F4264] to-[#127EAB] hover:from-[#16314A] hover:to-[#0E668B] text-white shadow-xs hover:shadow-sm focus:ring-[#127EAB]',
  secondary:
    'bg-white text-[#1F4264] border border-[#CCDCE1] hover:bg-[#E9F7FA]/60 hover:border-[#127EAB]/40 focus:ring-[#127EAB]',
  success:
    'bg-[#127EAB] hover:bg-[#0E668B] text-white focus:ring-[#127EAB]',
  danger:
    'bg-[#EE6450] text-white hover:bg-[#D9523E] focus:ring-[#EE6450]',
  warning:
    'bg-amber-500 text-white hover:bg-amber-600 focus:ring-amber-500',
  ghost:
    'text-[#1F4264] hover:bg-[#E9F7FA]/60 focus:ring-[#127EAB]',
};

const sizes = {
  sm: 'px-3 py-1.5 text-xs rounded-md',
  md: 'px-4 py-2 text-sm rounded-md',
  lg: 'px-6 py-3 text-sm sm:text-[15px] rounded-md',
};

const Button = forwardRef(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      disabled = false,
      leftIcon,
      rightIcon,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={clsx(
          'inline-flex items-center justify-center gap-2 font-medium rounded-md',
          'transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2',
          'disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer',
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
  }
);

Button.displayName = 'Button';

export default Button;
