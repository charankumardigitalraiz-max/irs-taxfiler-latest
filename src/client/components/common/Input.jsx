import React from 'react';
import { clsx } from 'clsx';

const Input = ({ label, type = 'text', value, onChange, placeholder, disabled = false, readOnly = false, error, className, required, helperText, ...props }) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
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
          'w-full px-4 py-3 text-sm border border-gray-300 rounded-lg',
          'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent',
          'transition-all',
          error ? 'border-red-300 focus:ring-red-500' : '',
          disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white',
          readOnly ? 'bg-gray-50 cursor-not-allowed' : '',
          className
        )}
        {...props}
      />
      {helperText && !error && (
        <p className="mt-1 text-xs text-gray-500">{helperText}</p>
      )}
      {error && (
        <p className="mt-1 text-xs text-red-600">{error}</p>
      )}
    </div>
  );
};

export default Input;
