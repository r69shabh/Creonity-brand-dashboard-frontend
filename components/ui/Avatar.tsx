import React from 'react';

interface AvatarProps {
    src?: string;
    alt?: string;
    size?: 'sm' | 'md' | 'lg' | 'xl';
    fallback?: string;
    className?: string;
}

const Avatar: React.FC<AvatarProps> = ({
    src,
    alt = 'Avatar',
    size = 'md',
    fallback,
    className = '',
}) => {
    const sizes = {
        sm: 'w-8 h-8 text-xs',
        md: 'w-10 h-10 text-sm',
        lg: 'w-12 h-12 text-base',
        xl: 'w-16 h-16 text-lg',
    };

    if (!src && fallback) {
        return (
            <div
                className={`${sizes[size]} rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center ${className}`}
            >
                {fallback}
            </div>
        );
    }

    return (
        <img
            src={src}
            alt={alt}
            className={`${sizes[size]} rounded-full object-cover ${className}`}
        />
    );
};

export default Avatar;
