import React from 'react';
import { clsx } from 'clsx';

const Input = ({
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  disabled = false,
  readOnly = false,
  error,
  className,
  required,
  helperText,
  ...props
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-[#1F4264] mb-1">
          {label}
          {required && <span className="text-[#EE6450] ml-1">*</span>}
        </label>
      )}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        readOnly={readOnly}
        className={clsx(
          'w-full px-3.5 py-2.5 text-sm text-[#1F4264] border border-[#CCDCE1] rounded-md',
          'focus:outline-none focus:ring-2 focus:ring-[#127EAB]/20 focus:border-[#127EAB]',
          'transition-all placeholder:text-xs placeholder:text-slate-400',
          error ? 'border-rose-300 focus:ring-rose-500/20 focus:border-rose-500' : '',
          disabled ? 'bg-slate-50 cursor-not-allowed' : 'bg-white',
          readOnly ? 'bg-slate-50 cursor-not-allowed' : '',
          className
        )}
        {...props}
      />
      {helperText && !error && (
        <p className="mt-1 text-xs text-[#6F7F8E]">{helperText}</p>
      )}
      {error && (
        <p className="mt-1 text-xs text-rose-600">{error}</p>
      )}
    </div>
  );
};

export default Input;
