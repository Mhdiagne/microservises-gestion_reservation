import React from 'react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  children: React.ReactNode;
}

const Select: React.FC<SelectProps> = ({ label, error, children, ...props }) => {
  return (
    <div>
      {label && (
        <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-1">
          {label}
        </label>
      )}
      <select
        {...props}
        className={`w-full rounded-lg border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-700 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500 ${
          error ? 'border-red-500' : ''
        }`}
      >
        {children}
      </select>
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
};

export default Select;