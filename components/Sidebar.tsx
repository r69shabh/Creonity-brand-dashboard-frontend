import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useToast } from '../context/ToastContext';
import { NAV_ITEMS, DRIVE_FOLDERS } from '../types';

interface SidebarProps {
    mobileMenuOpen: boolean;
    setMobileMenuOpen: (open: boolean) => void;
    onLogout?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ mobileMenuOpen, setMobileMenuOpen, onLogout }) => {
    const navigate = useNavigate();
    const { addToast } = useToast();
    const [folders, setFolders] = useState(DRIVE_FOLDERS);
    const [collapsed, setCollapsed] = useState(false);

    const handleLogout = (e: React.MouseEvent) => {
        e.stopPropagation();
        addToast('Logged out successfully', 'success');
        if (onLogout) {
            onLogout();
        } else {
            navigate('/login');
        }
    };

    return (
        <aside
            className={`
        fixed lg:static inset-y-0 left-0 z-30
        flex flex-col border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 h-full
        transition-all duration-300 ease-in-out
        ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        ${collapsed ? 'w-[80px]' : 'w-[260px]'}
      `}
        >
            {/* Header */}
            <div className={`p-4 border-b border-gray-100 dark:border-gray-800 flex items-center ${collapsed ? 'justify-center' : 'justify-between'}`}>
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-black dark:bg-white text-white dark:text-black flex items-center justify-center font-bold text-lg rounded-sm shrink-0">
                        C
                    </div>
                    {!collapsed && (
                        <div>
                            <span className="block text-lg font-display font-bold text-gray-900 dark:text-white tracking-tight">Creonity</span>
                            <span className="text-[10px] font-mono text-gray-500 dark:text-gray-400 uppercase tracking-widest">OS v2.0</span>
                        </div>
                    )}
                </div>
                {!collapsed && (
                    <button onClick={() => setCollapsed(!collapsed)} className="text-gray-400 hover:text-black dark:text-gray-500 dark:hover:text-white hidden lg:block">
                        <span className="material-symbols-outlined text-[20px]">first_page</span>
                    </button>
                )}
            </div>

            {/* Collapse Button (Visible when collapsed) */}
            {collapsed && (
                <button 
                    onClick={() => setCollapsed(!collapsed)} 
                    className="mx-auto mt-4 p-1.5 text-gray-400 hover:text-black dark:text-gray-500 dark:hover:text-white hidden lg:block hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md"
                >
                    <span className="material-symbols-outlined text-[20px]">last_page</span>
                </button>
            )}

            {/* Search (Hidden when collapsed) */}
            {!collapsed && (
                <div className="px-4 py-4">
                    <div className="relative group">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                            <span className="material-symbols-outlined text-[18px]">search</span>
                        </span>
                        <input
                            className="w-full h-9 pl-9 pr-9 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:ring-1 focus:ring-gray-300 dark:focus:ring-gray-600 focus:bg-white dark:focus:bg-gray-900 transition-all outline-none font-mono"
                            placeholder="Search..."
                            type="text"
                        />
                        <kbd className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-mono text-gray-400 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded px-1.5">⌘K</kbd>
                    </div>
                </div>
            )}

            <nav className="flex-1 px-3 flex flex-col gap-1 overflow-y-auto no-scrollbar mt-2">
                {!collapsed && (
                    <div className="text-[10px] font-mono font-medium text-gray-400 dark:text-gray-500 px-3 py-2 uppercase tracking-wider">
                        Platform
                    </div>
                )}

                {NAV_ITEMS.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        onClick={() => setMobileMenuOpen(false)}
                        className={({ isActive }) => `
              flex items-center ${collapsed ? 'justify-center px-2' : 'justify-between px-3'} py-2.5 rounded-md transition-all group relative overflow-hidden text-sm font-medium
              ${isActive
                                ? 'bg-accent-yellow dark:bg-yellow-900/20 text-black dark:text-yellow-400 border-l-2 border-pop-yellow'
                                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-black dark:hover:text-white'
                            }
            `}
                        title={collapsed ? item.label : ''}
                    >
                        {({ isActive }) => (
                            <>
                                <div className={`flex items-center gap-3 ${collapsed ? 'justify-center' : ''}`}>
                                    <span className={`material-symbols-outlined text-[22px] ${isActive ? 'text-black dark:text-yellow-400' : 'text-gray-400 dark:text-gray-500 group-hover:text-black dark:group-hover:text-white'}`}>
                                        {item.icon}
                                    </span>
                                    {!collapsed && <span>{item.label}</span>}
                                </div>
                                {!collapsed && isActive && <span className="w-1.5 h-1.5 rounded-full bg-pop-yellow"></span>}
                            </>
                        )}
                    </NavLink>
                ))}

                {!collapsed && (
                    <div className="text-[10px] font-mono font-medium text-gray-400 dark:text-gray-500 px-3 py-2 uppercase tracking-wider mt-6">
                        Workspace
                    </div>
                )}
                
                {collapsed && <div className="border-t border-gray-100 dark:border-gray-800 my-4 mx-2"></div>}

                {folders.map((folder, i) => (
                     <div 
                        key={i} 
                        className={`flex items-center ${collapsed ? 'justify-center' : 'justify-between'} px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-black dark:hover:text-white rounded-md cursor-pointer transition-colors group`}
                        title={collapsed ? `${folder.label} (${folder.count})` : ''}
                     >
                        <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-[18px] text-gray-400 dark:text-gray-500 group-hover:text-black dark:group-hover:text-white">folder</span>
                            {!collapsed && <span>{folder.label}</span>}
                        </div>
                        {!collapsed && <span className="text-[10px] font-mono text-gray-400 dark:text-gray-500">{folder.count}</span>}
                     </div>
                ))}
            </nav>

            {/* User Profile */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-800">
                <div className={`flex items-center gap-3 p-2 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-colors group ${collapsed ? 'justify-center' : ''}`}>
                    <div className="w-8 h-8 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shrink-0 overflow-hidden rounded-sm relative">
                        <img src="https://ui-avatars.com/api/?name=Brand&background=random" alt="Brand" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" />
                    </div>
                    {!collapsed && (
                        <>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-bold text-gray-900 dark:text-white truncate">Acme Corp</p>
                                <p className="text-xs font-mono text-gray-500 dark:text-gray-400 truncate">admin@acme.com</p>
                            </div>
                            <button onClick={handleLogout} className="text-gray-400 hover:text-black dark:text-gray-500 dark:hover:text-white transition-colors">
                                <span className="material-symbols-outlined text-[20px]">logout</span>
                            </button>
                        </>
                    )}
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
