import React from 'react';

interface BadgeProps {
    children: React.ReactNode;
    variant?: 'default' | 'success' | 'warning' | 'danger' | 'info';
    size?: 'sm' | 'md';
}

const Badge: React.FC<BadgeProps> = ({
    children,
    variant = 'default',
    size = 'sm',
}) => {
    const variants = {
        default: 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300',
        success: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400',
        warning: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400',
        danger: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400',
        info: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400',
    };

    const sizes = {
        sm: 'px-2 py-0.5 text-[10px]',
        md: 'px-2.5 py-1 text-xs',
    };

    return (
        <span className={`inline-flex items-center font-bold rounded-full ${variants[variant]} ${sizes[size]}`}>
            {children}
        </span>
    );
};

export default Badge;
