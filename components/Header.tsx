import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BRAND_AVATAR } from '../types';

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
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const notificationRef = useRef<HTMLDivElement>(null);
    const profileRef = useRef<HTMLDivElement>(null);

    const brand = {
        name: 'Acme Corporation',
        email: 'marketing@acme.com',
    };

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (notificationRef.current && !notificationRef.current.contains(e.target as Node)) {
                setShowNotifications(false);
            }
            if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
                setShowProfileMenu(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <header className="sticky top-0 z-20 h-16 flex items-center justify-between px-4 lg:px-8 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-100 dark:border-gray-800">
            {/* Left - Mobile Menu + Title */}
            <div className="flex items-center gap-4">
                <button
                    onClick={onMenuClick}
                    className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-text-secondary"
                >
                    <span className="material-symbols-outlined">menu</span>
                </button>
                <h1 className="text-lg font-display font-bold text-text-primary dark:text-white hidden sm:block">
                    {title}
                </h1>
            </div>

            {/* Right - Actions */}
            <div className="flex items-center gap-2">
                {/* Theme Toggle */}
                <button
                    onClick={toggleTheme}
                    className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-text-secondary dark:text-gray-400 transition-colors"
                >
                    <span className="material-symbols-outlined text-[22px]">
                        {darkMode ? 'light_mode' : 'dark_mode'}
                    </span>
                </button>

                {/* Notifications */}
                <div className="relative" ref={notificationRef}>
                    <button
                        onClick={() => setShowNotifications(!showNotifications)}
                        className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-text-secondary dark:text-gray-400 transition-colors"
                    >
                        <span className="material-symbols-outlined text-[22px]">notifications</span>
                        <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
                    </button>

                    {showNotifications && (
                        <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-xl shadow-float border border-gray-200 dark:border-gray-700 overflow-hidden animate-in fade-in zoom-in-95 duration-100">
                            <div className="p-4 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
                                <span className="font-bold text-text-primary dark:text-white">Notifications</span>
                                <button className="text-xs text-primary font-medium">Mark all read</button>
                            </div>
                            <div className="max-h-80 overflow-y-auto">
                                {[
                                    { title: 'New application', desc: 'David Kim applied to your campaign', time: '5h ago', icon: 'inbox', color: 'text-blue-500 bg-blue-50 dark:bg-blue-900/30' },
                                    { title: 'Content submitted', desc: 'Alex Morgan submitted a video for review', time: '1h ago', icon: 'videocam', color: 'text-purple-500 bg-purple-50 dark:bg-purple-900/30' },
                                    { title: 'Payment processed', desc: 'Escrow released for campaign #1234', time: '1d ago', icon: 'payments', color: 'text-green-500 bg-green-50 dark:bg-green-900/30' },
                                ].map((n, i) => (
                                    <div key={i} className="p-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer border-b border-gray-50 dark:border-gray-700/50 last:border-0">
                                        <div className="flex gap-3">
                                            <div className={`size-9 rounded-full ${n.color} flex items-center justify-center shrink-0`}>
                                                <span className="material-symbols-outlined text-[18px]">{n.icon}</span>
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-text-primary dark:text-white">{n.title}</p>
                                                <p className="text-xs text-text-secondary dark:text-gray-400 truncate">{n.desc}</p>
                                                <p className="text-[10px] text-text-secondary dark:text-gray-500 mt-1">{n.time}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="p-3 border-t border-gray-100 dark:border-gray-700">
                                <button className="w-full text-center text-sm text-primary font-medium hover:underline">
                                    View All Notifications
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Profile */}
                <div className="relative" ref={profileRef}>
                    <button
                        onClick={() => setShowProfileMenu(!showProfileMenu)}
                        className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                        <img
                            src={BRAND_AVATAR}
                            alt="Brand"
                            className="w-8 h-8 rounded-full object-cover"
                        />
                        <span className="material-symbols-outlined text-[18px] text-text-secondary dark:text-gray-400">expand_more</span>
                    </button>

                    {showProfileMenu && (
                        <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-xl shadow-float border border-gray-200 dark:border-gray-700 overflow-hidden animate-in fade-in zoom-in-95 duration-100">
                            <div className="p-4 border-b border-gray-100 dark:border-gray-700">
                                <p className="font-bold text-text-primary dark:text-white">{brand.name}</p>
                                <p className="text-xs text-text-secondary dark:text-gray-400">{brand.email}</p>
                            </div>
                            <div className="p-2">
                                <button
                                    onClick={() => { navigate('/profile'); setShowProfileMenu(false); }}
                                    className="w-full flex items-center gap-3 px-3 py-2 text-sm text-text-primary dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
                                >
                                    <span className="material-symbols-outlined text-[20px] text-text-secondary">business</span>
                                    Company Profile
                                </button>
                                <button
                                    onClick={() => { navigate('/settings'); setShowProfileMenu(false); }}
                                    className="w-full flex items-center gap-3 px-3 py-2 text-sm text-text-primary dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
                                >
                                    <span className="material-symbols-outlined text-[20px] text-text-secondary">settings</span>
                                    Settings
                                </button>
                            </div>
                            <div className="p-2 border-t border-gray-100 dark:border-gray-700">
                                <button
                                    onClick={onLogout}
                                    className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                                >
                                    <span className="material-symbols-outlined text-[20px]">logout</span>
                                    Sign Out
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
