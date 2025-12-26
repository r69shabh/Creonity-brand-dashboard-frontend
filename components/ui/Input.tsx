import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    icon?: string;
    leftIcon?: string; // Alias for icon
    helperText?: string;
}

const Input: React.FC<InputProps> = ({
    label,
    error,
    icon,
    leftIcon,
    helperText,
    className = '',
    ...props
}) => {
    const iconToUse = leftIcon || icon;
    return (
        <div className="w-full">
            {label && (
                <label className="block text-xs font-bold text-text-primary dark:text-gray-300 uppercase tracking-wide mb-1.5">
                    {label}
                </label>
            )}
            <div className="relative">
                {iconToUse && (
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                        <span className="material-symbols-outlined text-[20px]">{iconToUse}</span>
                    </span>
                )}
                <input
                    className={`
            w-full h-11 px-4 rounded-lg border border-gray-200 dark:border-gray-700
            bg-white dark:bg-gray-800 text-text-primary dark:text-white
            focus:ring-2 focus:ring-primary/20 focus:border-primary
            transition-all outline-none text-sm placeholder-gray-400
            ${iconToUse ? 'pl-11' : ''}
            ${error ? 'border-red-500 focus:ring-red-200' : ''}
            ${className}
          `}
                    {...props}
                />
            </div>
            {helperText && !error && <p className="mt-1 text-xs text-text-secondary dark:text-gray-500">{helperText}</p>}
            {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
        </div>
    );
};

export default Input;

