import React from 'react';

interface CardProps {
    children: React.ReactNode;
    className?: string;
    padding?: string;
    hover?: boolean;
    onClick?: () => void;
    id?: string;
}

const Card: React.FC<CardProps> = ({
    children,
    className = '',
    padding = 'p-4',
    hover = false,
    onClick,
    id
}) => {
    return (
        <div
            id={id}
            onClick={onClick}
            className={`
        bg-white dark:bg-black rounded-xl border border-border-color dark:border-neutral-800
        ${padding}
        ${hover ? 'hover:shadow-card-hover hover:border-gray-300 dark:hover:border-neutral-700 transition-all cursor-pointer' : ''}
        ${className}
      `}
        >
            {children}
        </div>
    );
};

export default Card;
