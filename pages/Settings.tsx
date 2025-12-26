import React from 'react';

interface SettingsProps {
    darkMode: boolean;
    toggleTheme: () => void;
}

const Settings: React.FC<SettingsProps> = ({ darkMode, toggleTheme }) => {
    return (
        <div className="max-w-3xl mx-auto p-6 lg:p-8 space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-xl font-bold text-text-primary dark:text-white">Settings</h1>
                <p className="text-sm text-text-secondary dark:text-gray-400">Manage your account preferences</p>
            </div>

            {/* Appearance */}
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-border-color dark:border-gray-700 p-6">
                <h3 className="font-medium text-text-primary dark:text-white mb-4">Appearance</h3>
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm text-text-primary dark:text-white">Dark Mode</p>
                        <p className="text-xs text-text-secondary dark:text-gray-400">Switch between light and dark themes</p>
                    </div>
                    <button
                        onClick={toggleTheme}
                        className={`w-12 h-6 rounded-full transition-colors relative ${darkMode ? 'bg-primary' : 'bg-gray-200 dark:bg-gray-700'}`}
                    >
                        <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${darkMode ? 'translate-x-6' : 'translate-x-0.5'}`}></div>
                    </button>
                </div>
            </div>

            {/* Notifications */}
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-border-color dark:border-gray-700 p-6">
                <h3 className="font-medium text-text-primary dark:text-white mb-4">Notifications</h3>
                <div className="space-y-4">
                    {[
                        { label: 'New Applications', desc: 'Get notified when creators apply to your campaigns', enabled: true },
                        { label: 'Content Submissions', desc: 'Alerts when creators submit content for review', enabled: true },
                        { label: 'Messages', desc: 'Notifications for new messages from creators', enabled: true },
                        { label: 'Payment Alerts', desc: 'Updates on payment and escrow status', enabled: true },
                        { label: 'Weekly Reports', desc: 'Receive weekly campaign performance summaries', enabled: false },
                    ].map((item, i) => (
                        <div key={i} className="flex items-center justify-between py-2">
                            <div>
                                <p className="text-sm text-text-primary dark:text-white">{item.label}</p>
                                <p className="text-xs text-text-secondary dark:text-gray-400">{item.desc}</p>
                            </div>
                            <button
                                className={`w-12 h-6 rounded-full transition-colors relative ${item.enabled ? 'bg-primary' : 'bg-gray-200 dark:bg-gray-700'}`}
                            >
                                <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${item.enabled ? 'translate-x-6' : 'translate-x-0.5'}`}></div>
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Team Members */}
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-border-color dark:border-gray-700 p-6">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="font-medium text-text-primary dark:text-white">Team Members</h3>
                    <button className="px-3 py-1.5 text-xs font-medium text-primary border border-primary rounded-lg hover:bg-primary/5 flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px]">add</span>
                        Invite
                    </button>
                </div>
                <div className="space-y-3">
                    {[
                        { name: 'John Smith', email: 'john@acme.com', role: 'Admin', avatar: 'https://ui-avatars.com/api/?name=John+Smith&background=075CD1&color=fff' },
                        { name: 'Emily Chen', email: 'emily@acme.com', role: 'Manager', avatar: 'https://ui-avatars.com/api/?name=Emily+Chen&background=1BD1C9&color=fff' },
                        { name: 'Mike Wilson', email: 'mike@acme.com', role: 'Member', avatar: 'https://ui-avatars.com/api/?name=Mike+Wilson&background=6366F1&color=fff' },
                    ].map((member, i) => (
                        <div key={i} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50">
                            <img src={member.avatar} alt={member.name} className="w-10 h-10 rounded-full" />
                            <div className="flex-1">
                                <p className="text-sm font-medium text-text-primary dark:text-white">{member.name}</p>
                                <p className="text-xs text-text-secondary dark:text-gray-400">{member.email}</p>
                            </div>
                            <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${member.role === 'Admin' ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400' :
                                    member.role === 'Manager' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400' :
                                        'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                                }`}>
                                {member.role}
                            </span>
                            <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg text-text-secondary">
                                <span className="material-symbols-outlined text-[18px]">more_vert</span>
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Security */}
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-border-color dark:border-gray-700 p-6">
                <h3 className="font-medium text-text-primary dark:text-white mb-4">Security</h3>
                <div className="space-y-4">
                    <button className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                        <div className="flex items-center gap-3">
                            <span className="material-symbols-outlined text-[20px] text-text-secondary">lock</span>
                            <div className="text-left">
                                <p className="text-sm text-text-primary dark:text-white">Change Password</p>
                                <p className="text-xs text-text-secondary dark:text-gray-400">Update your account password</p>
                            </div>
                        </div>
                        <span className="material-symbols-outlined text-[18px] text-gray-400">chevron_right</span>
                    </button>
                    <button className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                        <div className="flex items-center gap-3">
                            <span className="material-symbols-outlined text-[20px] text-text-secondary">security</span>
                            <div className="text-left">
                                <p className="text-sm text-text-primary dark:text-white">Two-Factor Authentication</p>
                                <p className="text-xs text-green-600 dark:text-green-400">Enabled</p>
                            </div>
                        </div>
                        <span className="material-symbols-outlined text-[18px] text-gray-400">chevron_right</span>
                    </button>
                </div>
            </div>

            {/* Danger Zone */}
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-red-200 dark:border-red-900/50 p-6">
                <h3 className="font-medium text-red-600 dark:text-red-400 mb-4">Danger Zone</h3>
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm text-text-primary dark:text-white">Delete Account</p>
                        <p className="text-xs text-text-secondary dark:text-gray-400">Permanently delete your brand account and all data</p>
                    </div>
                    <button className="px-4 py-2 text-sm font-medium text-red-600 border border-red-300 dark:border-red-900 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20">
                        Delete Account
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Settings;
