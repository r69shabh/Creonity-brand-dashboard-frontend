import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
    title: string;
    onMenuClick: () => void;
    onLogout: () => void;
    darkMode: boolean;
    toggleTheme: () => void;
}

const Header: React.FC<HeaderProps> = ({ title, onMenuClick, onLogout, darkMode, toggleTheme }) => {
    const navigate = useNavigate();
    const [showNotifications, setShowNotifications] = useState(false);
    const notificationRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (notificationRef.current && !notificationRef.current.contains(e.target as Node)) {
                setShowNotifications(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <header className="sticky top-0 z-20 h-16 flex items-center justify-between px-4 lg:px-8 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 transition-colors duration-200">
            {/* Left - Mobile Menu + Title */}
            <div className="flex items-center gap-4">
                <button
                    onClick={onMenuClick}
                    className="lg:hidden p-2 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400 transition-colors"
                >
                    <span className="material-symbols-outlined">menu</span>
                </button>
                
                <div className="flex items-center gap-3">
                    <h1 className="text-lg font-display font-bold text-gray-900 dark:text-white tracking-tight">
                        {title}
                    </h1>
                    <div className="hidden sm:flex items-center gap-1.5 px-2 py-0.5 bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-900/30 rounded-full">
                         <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                         <span className="text-[10px] font-mono font-medium uppercase tracking-wide text-green-700 dark:text-green-400">Online</span>
                    </div>
                </div>
            </div>

            {/* Right - Actions */}
            <div className="flex items-center gap-2">
                {/* Theme Toggle */}
                <button
                    onClick={toggleTheme}
                    className="p-2 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-400 dark:text-gray-500 hover:text-black dark:hover:text-white transition-colors"
                >
                    <span className="material-symbols-outlined text-[20px]">
                        {darkMode ? 'light_mode' : 'dark_mode'}
                    </span>
                </button>

                {/* Notifications */}
                <div className="relative" ref={notificationRef}>
                    <button
                        onClick={() => setShowNotifications(!showNotifications)}
                        className={`relative p-2 rounded-md transition-all ${showNotifications ? 'bg-gray-100 dark:bg-gray-800 text-black dark:text-white' : 'text-gray-400 dark:text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-black dark:hover:text-white'}`}
                    >
                        <span className="material-symbols-outlined text-[20px]">notifications</span>
                        <span className="absolute top-2 right-2 w-2 h-2 bg-pop-pink rounded-full ring-2 ring-white dark:ring-gray-900"></span>
                    </button>

                    {showNotifications && (
                        <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg shadow-lg z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-100">
                            <div className="p-3 border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/50 flex justify-between items-center">
                                <span className="font-bold text-xs font-mono text-gray-900 dark:text-white uppercase tracking-wide">System Logs</span>
                                <button className="text-[10px] font-mono font-medium text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white hover:underline">MARK_READ</button>
                            </div>
                            <div className="max-h-80 overflow-y-auto">
                                {[
                                    { title: 'New Application', desc: 'David Kim applied to Summer Campaign', time: '5m ago', icon: 'inbox', bg: 'bg-accent-cyan text-pop-cyan-dark' },
                                    { title: 'Content Submitted', desc: 'Alex Morgan submitted video draft', time: '1h ago', icon: 'videocam', bg: 'bg-accent-yellow text-pop-yellow-dark' },
                                    { title: 'Funds Released', desc: 'Escrow released for ID #8821', time: '1d ago', icon: 'payments', bg: 'bg-accent-pink text-pop-pink-dark' },
                                ].map((n, i) => (
                                    <div key={i} className="p-3 hover:bg-gray-50 dark:hover:bg-gray-800/50 cursor-pointer border-b border-gray-100 dark:border-gray-800 last:border-0 transition-colors group">
                                        <div className="flex gap-3">
                                            <div className={`w-8 h-8 rounded-md ${n.bg} flex items-center justify-center shrink-0 border border-gray-100 dark:border-transparent`}>
                                                <span className="material-symbols-outlined text-[16px] text-black/80">{n.icon}</span>
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex justify-between items-start">
                                                    <p className="text-sm font-bold text-gray-900 dark:text-white">{n.title}</p>
                                                    <p className="text-[10px] font-mono text-gray-400 dark:text-gray-500">{n.time}</p>
                                                </div>
                                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 truncate font-medium">{n.desc}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="p-2 border-t border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/50 text-center">
                                <button className="text-xs font-mono font-bold text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white uppercase tracking-wider transition-colors">
                                    View All Logs
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
