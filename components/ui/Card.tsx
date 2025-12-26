import React from 'react';

interface CardProps {
    children: React.ReactNode;
    className?: string;
    padding?: string;
    hover?: boolean;
}

const Card: React.FC<CardProps> = ({
    children,
    className = '',
    padding = 'p-4',
    hover = false,
}) => {
    return (
        <div
            className={`
        bg-white dark:bg-gray-800 rounded-xl border border-border-color dark:border-gray-700
        ${padding}
        ${hover ? 'hover:shadow-card-hover hover:border-primary/30 transition-all cursor-pointer' : ''}
        ${className}
      `}
        >
            {children}
        </div>
    );
};

export default Card;
