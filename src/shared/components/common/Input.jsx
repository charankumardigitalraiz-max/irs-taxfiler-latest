import React from 'react';
import { clsx } from 'clsx';

const Input = ({ label, type = 'text', value, onChange, placeholder, disabled = false, error, className, ...props }) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className={clsx(
          'w-full px-4 py-3 text-sm border border-gray-300 rounded-lg',
          'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent',
          'transition-all',
          error ? 'border-red-300 focus:ring-red-500' : '',
          disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white',
          className
        )}
        {...props}
      />
      {error && (
        <p className="mt-1 text-xs text-red-600">{error}</p>
      )}
    </div>
  );
};

export default Input;
