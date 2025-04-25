// components/ui/Checkbox.tsx
import React from 'react';

interface CheckboxProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({ checked, onCheckedChange }) => {
  return (
    <button
      role="checkbox"
      aria-checked={checked}
      onClick={() => onCheckedChange(!checked)}
      className={`h-5 w-5 rounded-md border-2 flex items-center justify-center transition-colors
        ${checked ? 'bg-blue-600 border-blue-600' : 'bg-white border-gray-300 hover:border-blue-500'}`}
    >
      {checked && (
        <svg
          className="w-4 h-4 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={3}
            d="M5 13l4 4L19 7"
          />
        </svg>
      )}
    </button>
  );
};

export default Checkbox;