import React, { useState } from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';

// Mock team members data
const TEAM_MEMBERS = [
    { id: '1', name: 'David Chen', email: 'david@acme.com', avatar: 'https://randomuser.me/api/portraits/men/32.jpg', role: 'Owner', department: 'Executive', status: 'online', permissions: ['all'] },
    { id: '2', name: 'Sarah Williams', email: 'sarah@acme.com', avatar: 'https://randomuser.me/api/portraits/women/44.jpg', role: 'Admin', department: 'Marketing', status: 'online', permissions: ['campaigns', 'creators', 'analytics', 'messages', 'team'] },
    { id: '3', name: 'Michael Brown', email: 'michael@acme.com', avatar: 'https://randomuser.me/api/portraits/men/45.jpg', role: 'Manager', department: 'Marketing', status: 'away', permissions: ['campaigns', 'creators', 'messages'] },
    { id: '4', name: 'Emily Davis', email: 'emily@acme.com', avatar: 'https://randomuser.me/api/portraits/women/68.jpg', role: 'Member', department: 'Content', status: 'offline', permissions: ['campaigns', 'messages'] },
    { id: '5', name: 'James Wilson', email: 'james@acme.com', avatar: 'https://randomuser.me/api/portraits/men/22.jpg', role: 'Member', department: 'Finance', status: 'online', permissions: ['wallet', 'analytics'] },
];

const DEPARTMENTS = [
    { id: '1', name: 'Marketing', members: 3, color: 'bg-blue-500' },
    { id: '2', name: 'Content', members: 2, color: 'bg-purple-500' },
    { id: '3', name: 'Finance', members: 1, color: 'bg-green-500' },
    { id: '4', name: 'Executive', members: 1, color: 'bg-amber-500' },
];

const CHAT_MESSAGES = [
    { id: '1', sender: 'Sarah Williams', avatar: 'https://randomuser.me/api/portraits/women/44.jpg', message: 'The new campaign with @alexcreates is performing great! 📈', time: '10:30 AM', isMe: false },
    { id: '2', sender: 'You', message: 'That\'s awesome! Let\'s schedule a review meeting for Friday.', time: '10:32 AM', isMe: true },
    { id: '3', sender: 'Michael Brown', avatar: 'https://randomuser.me/api/portraits/men/45.jpg', message: 'I\'ll prepare the analytics report by tomorrow.', time: '10:35 AM', isMe: false },
];

const PERMISSION_OPTIONS = [
    { id: 'campaigns', label: 'Campaigns', icon: 'campaign' },
    { id: 'creators', label: 'Find Creators', icon: 'groups' },
    { id: 'messages', label: 'Messages', icon: 'chat' },
    { id: 'analytics', label: 'Analytics', icon: 'analytics' },
    { id: 'wallet', label: 'Wallet', icon: 'account_balance_wallet' },
    { id: 'team', label: 'Team Management', icon: 'group_add' },
];

const ROLE_OPTIONS = ['Owner', 'Admin', 'Manager', 'Member', 'Viewer'];

type Tab = 'profile' | 'team' | 'groups' | 'chat';

const Profile: React.FC = () => {
    const [activeTab, setActiveTab] = useState<Tab>('profile');
    const [showInviteModal, setShowInviteModal] = useState(false);
    const [showMemberModal, setShowMemberModal] = useState<string | null>(null);
    const [chatMessage, setChatMessage] = useState('');

    const selectedMember = TEAM_MEMBERS.find(m => m.id === showMemberModal);

    const tabs = [
        { id: 'profile', label: 'Company Profile', icon: 'business' },
        { id: 'team', label: 'Team Members', icon: 'group' },
        { id: 'groups', label: 'Departments', icon: 'folder_shared' },
        { id: 'chat', label: 'Team Chat', icon: 'forum' },
    ];

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'online': return 'bg-green-500';
            case 'away': return 'bg-yellow-500';
            default: return 'bg-gray-400';
        }
    };

    const getRoleBadgeColor = (role: string) => {
        switch (role) {
            case 'Owner': return 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400';
            case 'Admin': return 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400';
            case 'Manager': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
            default: return 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300';
        }
    };

    return (
        <div className="max-w-6xl mx-auto p-6 lg:p-8 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-xl font-bold text-text-primary dark:text-white">Company Profile</h1>
                    <p className="text-sm text-text-secondary dark:text-gray-400">Manage your brand and team</p>
                </div>
                <button className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary-hover flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px]">save</span>
                    Save Changes
                </button>
            </div>

            {/* Tabs */}
            <div className="flex gap-1 p-1 bg-gray-100 dark:bg-gray-800 rounded-xl">
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as Tab)}
                        className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-all ${activeTab === tab.id
                            ? 'bg-white dark:bg-gray-700 text-text-primary dark:text-white shadow-sm'
                            : 'text-text-secondary dark:text-gray-400 hover:text-text-primary dark:hover:text-white'
                            }`}
                    >
                        <span className="material-symbols-outlined text-[18px]">{tab.icon}</span>
                        <span className="hidden sm:inline">{tab.label}</span>
                    </button>
                ))}
            </div>

            {/* Company Profile Tab */}
            {activeTab === 'profile' && (
                <div className="space-y-6">
                    {/* Profile Card */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl border border-border-color dark:border-gray-700 overflow-hidden">
                        {/* Cover */}
                        <div className="h-32 bg-gradient-to-r from-primary to-brand-teal relative">
                            <button className="absolute bottom-3 right-3 px-3 py-1.5 text-xs font-medium text-white bg-black/30 rounded-lg hover:bg-black/50 flex items-center gap-1">
                                <span className="material-symbols-outlined text-[16px]">edit</span>
                                Change Cover
                            </button>
                        </div>

                        {/* Logo & Info */}
                        <div className="relative px-6 pb-6">
                            <div className="flex items-end gap-4 -mt-10 mb-6">
                                <div className="relative">
                                    <img
                                        src="https://ui-avatars.com/api/?name=Acme+Corp&background=075CD1&color=fff&size=128"
                                        alt="Company Logo"
                                        className="w-24 h-24 rounded-xl border-4 border-white dark:border-gray-800 object-cover"
                                    />
                                    <button className="absolute -bottom-1 -right-1 w-8 h-8 bg-white dark:bg-gray-700 rounded-full shadow-md flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <span className="material-symbols-outlined text-[16px] text-text-secondary">photo_camera</span>
                                    </button>
                                </div>
                                <div className="flex-1">
                                    <h2 className="text-xl font-bold text-text-primary dark:text-white">Acme Corporation</h2>
                                    <p className="text-sm text-text-secondary dark:text-gray-400">Technology Company • 5 team members</p>
                                </div>
                            </div>

                            {/* Form */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Input label="Company Name" defaultValue="Acme Corporation" />
                                <div>
                                    <label className="block text-xs font-bold text-text-primary dark:text-gray-300 uppercase tracking-wide mb-1.5">Industry</label>
                                    <select className="w-full h-11 px-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-text-primary dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none text-sm">
                                        <option>Technology</option>
                                        <option>Fashion</option>
                                        <option>Food & Beverage</option>
                                        <option>Health & Fitness</option>
                                    </select>
                                </div>
                                <Input label="Website" type="url" defaultValue="https://acme.com" />
                                <Input label="Contact Email" type="email" defaultValue="marketing@acme.com" />
                                <div className="md:col-span-2">
                                    <label className="block text-xs font-bold text-text-primary dark:text-gray-300 uppercase tracking-wide mb-1.5">Company Description</label>
                                    <textarea
                                        rows={3}
                                        defaultValue="Acme Corporation is a leading technology company focused on innovation."
                                        className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-text-primary dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none text-sm resize-none"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Social Links */}
                    <Card>
                        <h3 className="font-medium text-text-primary dark:text-white mb-4">Social Media Links</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {[
                                { platform: 'Instagram', icon: 'photo_camera', value: '@acme', color: 'text-pink-500' },
                                { platform: 'Twitter/X', icon: 'tag', value: '@acmecorp', color: 'text-gray-900 dark:text-white' },
                                { platform: 'LinkedIn', icon: 'work', value: 'company/acme', color: 'text-blue-600' },
                                { platform: 'YouTube', icon: 'smart_display', value: '@acmeofficial', color: 'text-red-600' },
                            ].map((social, i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <span className={`material-symbols-outlined text-[20px] ${social.color}`}>{social.icon}</span>
                                    <input
                                        type="text"
                                        placeholder={`${social.platform} handle`}
                                        defaultValue={social.value}
                                        className="flex-1 h-11 px-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-text-primary dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none text-sm"
                                    />
                                </div>
                            ))}
                        </div>
                    </Card>

                    {/* Stats */}
                    <Card>
                        <h3 className="font-medium text-text-primary dark:text-white mb-4">Profile Stats</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {[
                                { label: 'Campaigns Run', value: '24' },
                                { label: 'Creators Worked With', value: '68' },
                                { label: 'Total Spent', value: '$106K' },
                                { label: 'Avg. Rating', value: '4.8/5' },
                            ].map((stat, i) => (
                                <div key={i} className="text-center p-4 rounded-lg bg-gray-50 dark:bg-gray-700/50">
                                    <p className="text-2xl font-bold text-text-primary dark:text-white">{stat.value}</p>
                                    <p className="text-xs text-text-secondary dark:text-gray-400">{stat.label}</p>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>
            )}

            {/* Team Members Tab */}
            {activeTab === 'team' && (
                <div className="space-y-6">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                    <span className="material-symbols-outlined text-[18px]">search</span>
                                </span>
                                <input
                                    type="text"
                                    placeholder="Search team members..."
                                    className="w-64 h-10 pl-10 pr-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-text-primary dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none text-sm"
                                />
                            </div>
                        </div>
                        <button
                            onClick={() => setShowInviteModal(true)}
                            className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary-hover flex items-center gap-2"
                        >
                            <span className="material-symbols-outlined text-[18px]">person_add</span>
                            Invite Member
                        </button>
                    </div>

                    {/* Team Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {TEAM_MEMBERS.map(member => (
                            <Card key={member.id} className="hover:shadow-lg transition-shadow cursor-pointer" padding="p-5">
                                <div onClick={() => setShowMemberModal(member.id)}>
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex items-center gap-3">
                                            <div className="relative">
                                                <img src={member.avatar} alt={member.name} className="w-12 h-12 rounded-full object-cover" />
                                                <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white dark:border-gray-800 ${getStatusColor(member.status)}`}></div>
                                            </div>
                                            <div>
                                                <p className="font-medium text-text-primary dark:text-white">{member.name}</p>
                                                <p className="text-xs text-text-secondary dark:text-gray-400">{member.email}</p>
                                            </div>
                                        </div>
                                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${getRoleBadgeColor(member.role)}`}>
                                            {member.role}
                                        </span>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-1.5">
                                            <span className="material-symbols-outlined text-[16px] text-text-secondary">folder_shared</span>
                                            <span className="text-xs text-text-secondary dark:text-gray-400">{member.department}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            {member.permissions.slice(0, 3).map(perm => (
                                                <span key={perm} className="w-6 h-6 rounded bg-gray-100 dark:bg-gray-700 flex items-center justify-center" title={perm}>
                                                    <span className="material-symbols-outlined text-[12px] text-text-secondary">
                                                        {PERMISSION_OPTIONS.find(p => p.id === perm)?.icon || 'check'}
                                                    </span>
                                                </span>
                                            ))}
                                            {member.permissions.length > 3 && (
                                                <span className="text-[10px] text-text-secondary">+{member.permissions.length - 3}</span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>

                    {/* Access Levels Legend */}
                    <Card>
                        <h3 className="font-medium text-text-primary dark:text-white mb-4">Access Levels</h3>
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                            {ROLE_OPTIONS.map(role => (
                                <div key={role} className="flex items-center gap-2">
                                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${getRoleBadgeColor(role)}`}>{role}</span>
                                    <span className="text-xs text-text-secondary dark:text-gray-400">
                                        {role === 'Owner' && 'Full access'}
                                        {role === 'Admin' && 'All except billing'}
                                        {role === 'Manager' && 'Campaign management'}
                                        {role === 'Member' && 'Limited access'}
                                        {role === 'Viewer' && 'Read only'}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>
            )}

            {/* Departments Tab */}
            {activeTab === 'groups' && (
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <p className="text-sm text-text-secondary dark:text-gray-400">Organize your team into departments for better collaboration</p>
                        <button className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary-hover flex items-center gap-2">
                            <span className="material-symbols-outlined text-[18px]">add</span>
                            Create Department
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {DEPARTMENTS.map(dept => (
                            <Card key={dept.id} className="hover:shadow-lg transition-shadow" padding="p-5">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-10 h-10 rounded-lg ${dept.color} flex items-center justify-center`}>
                                            <span className="material-symbols-outlined text-white text-[20px]">folder_shared</span>
                                        </div>
                                        <div>
                                            <p className="font-medium text-text-primary dark:text-white">{dept.name}</p>
                                            <p className="text-xs text-text-secondary dark:text-gray-400">{dept.members} members</p>
                                        </div>
                                    </div>
                                    <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                                        <span className="material-symbols-outlined text-[18px] text-text-secondary">more_horiz</span>
                                    </button>
                                </div>

                                <div className="flex items-center gap-2 mb-4">
                                    <div className="flex -space-x-2">
                                        {TEAM_MEMBERS.filter(m => m.department === dept.name).slice(0, 4).map(member => (
                                            <img key={member.id} src={member.avatar} alt={member.name} className="w-8 h-8 rounded-full border-2 border-white dark:border-gray-800 object-cover" />
                                        ))}
                                    </div>
                                    <button className="w-8 h-8 rounded-full border-2 border-dashed border-gray-300 dark:border-gray-600 flex items-center justify-center hover:border-primary hover:text-primary transition-colors">
                                        <span className="material-symbols-outlined text-[16px]">add</span>
                                    </button>
                                </div>

                                <div className="flex items-center gap-2">
                                    <button className="flex-1 px-3 py-2 text-xs font-medium text-text-secondary dark:text-gray-400 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 flex items-center justify-center gap-1">
                                        <span className="material-symbols-outlined text-[14px]">settings</span>
                                        Manage
                                    </button>
                                    <button className="flex-1 px-3 py-2 text-xs font-medium text-primary bg-primary/10 rounded-lg hover:bg-primary/20 flex items-center justify-center gap-1">
                                        <span className="material-symbols-outlined text-[14px]">chat</span>
                                        Group Chat
                                    </button>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            )}

            {/* Team Chat Tab */}
            {activeTab === 'chat' && (
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-280px)]">
                    {/* Chat Channels */}
                    <Card className="lg:col-span-1" padding="p-0">
                        <div className="p-4 border-b border-border-color dark:border-gray-700">
                            <h3 className="font-medium text-text-primary dark:text-white">Channels</h3>
                        </div>
                        <div className="p-2">
                            {[
                                { name: '# general', unread: 3 },
                                { name: '# marketing', unread: 0 },
                                { name: '# campaigns', unread: 1 },
                                { name: '# announcements', unread: 0 },
                            ].map((channel, i) => (
                                <button key={i} className={`w-full px-3 py-2 rounded-lg text-left flex items-center justify-between hover:bg-gray-100 dark:hover:bg-gray-700 ${i === 0 ? 'bg-primary/10 text-primary' : 'text-text-secondary dark:text-gray-400'}`}>
                                    <span className="text-sm font-medium">{channel.name}</span>
                                    {channel.unread > 0 && (
                                        <span className="bg-primary text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">{channel.unread}</span>
                                    )}
                                </button>
                            ))}
                        </div>
                        <div className="p-4 border-t border-border-color dark:border-gray-700">
                            <h3 className="font-medium text-text-primary dark:text-white mb-2">Direct Messages</h3>
                            <div className="space-y-1">
                                {TEAM_MEMBERS.slice(0, 3).map(member => (
                                    <button key={member.id} className="w-full px-3 py-2 rounded-lg text-left flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                                        <div className="relative">
                                            <img src={member.avatar} alt={member.name} className="w-7 h-7 rounded-full object-cover" />
                                            <div className={`absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full border border-white dark:border-gray-800 ${getStatusColor(member.status)}`}></div>
                                        </div>
                                        <span className="text-sm text-text-primary dark:text-white truncate">{member.name}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </Card>

                    {/* Chat Messages */}
                    <Card className="lg:col-span-3 flex flex-col" padding="p-0">
                        {/* Chat Header */}
                        <div className="p-4 border-b border-border-color dark:border-gray-700 flex items-center justify-between">
                            <div>
                                <h3 className="font-medium text-text-primary dark:text-white"># general</h3>
                                <p className="text-xs text-text-secondary dark:text-gray-400">5 members • General team discussions</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                                    <span className="material-symbols-outlined text-[18px] text-text-secondary">search</span>
                                </button>
                                <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                                    <span className="material-symbols-outlined text-[18px] text-text-secondary">info</span>
                                </button>
                            </div>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4">
                            {CHAT_MESSAGES.map(msg => (
                                <div key={msg.id} className={`flex gap-3 ${msg.isMe ? 'flex-row-reverse' : ''}`}>
                                    {!msg.isMe && (
                                        <img src={msg.avatar} alt={msg.sender} className="w-8 h-8 rounded-full object-cover shrink-0" />
                                    )}
                                    <div className={`max-w-[70%] ${msg.isMe ? 'text-right' : ''}`}>
                                        {!msg.isMe && <p className="text-xs font-medium text-text-primary dark:text-white mb-1">{msg.sender}</p>}
                                        <div className={`inline-block px-4 py-2 rounded-2xl ${msg.isMe ? 'bg-primary text-white rounded-br-md' : 'bg-gray-100 dark:bg-gray-700 text-text-primary dark:text-white rounded-bl-md'}`}>
                                            <p className="text-sm">{msg.message}</p>
                                        </div>
                                        <p className="text-[10px] text-text-secondary dark:text-gray-500 mt-1">{msg.time}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Message Input */}
                        <div className="p-4 border-t border-border-color dark:border-gray-700">
                            <div className="flex items-center gap-3">
                                <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                                    <span className="material-symbols-outlined text-[20px] text-text-secondary">add</span>
                                </button>
                                <input
                                    type="text"
                                    placeholder="Type a message..."
                                    value={chatMessage}
                                    onChange={(e) => setChatMessage(e.target.value)}
                                    className="flex-1 h-10 px-4 rounded-full border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-text-primary dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none text-sm"
                                />
                                <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                                    <span className="material-symbols-outlined text-[20px] text-text-secondary">sentiment_satisfied</span>
                                </button>
                                <button className="p-2.5 bg-primary text-white rounded-full hover:bg-primary-hover">
                                    <span className="material-symbols-outlined text-[18px]">send</span>
                                </button>
                            </div>
                        </div>
                    </Card>
                </div>
            )}

            {/* Invite Member Modal */}
            {showInviteModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/50" onClick={() => setShowInviteModal(false)} />
                    <div className="relative bg-white dark:bg-gray-800 rounded-2xl w-full max-w-md p-6 animate-in fade-in zoom-in-95">
                        <button onClick={() => setShowInviteModal(false)} className="absolute top-4 right-4 p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                            <span className="material-symbols-outlined text-[20px] text-text-secondary">close</span>
                        </button>

                        <h2 className="text-lg font-bold text-text-primary dark:text-white mb-4">Invite Team Member</h2>

                        <div className="space-y-4">
                            <Input label="Email Address" type="email" placeholder="colleague@company.com" leftIcon="mail" />

                            <div>
                                <label className="block text-xs font-bold text-text-primary dark:text-gray-300 uppercase tracking-wide mb-1.5">Role</label>
                                <select className="w-full h-11 px-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-text-primary dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none text-sm">
                                    {ROLE_OPTIONS.slice(1).map(role => (
                                        <option key={role}>{role}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-text-primary dark:text-gray-300 uppercase tracking-wide mb-1.5">Department</label>
                                <select className="w-full h-11 px-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-text-primary dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none text-sm">
                                    {DEPARTMENTS.map(dept => (
                                        <option key={dept.id}>{dept.name}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-text-primary dark:text-gray-300 uppercase tracking-wide mb-2">Permissions</label>
                                <div className="grid grid-cols-2 gap-2">
                                    {PERMISSION_OPTIONS.map(perm => (
                                        <label key={perm.id} className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                                            <input type="checkbox" className="rounded text-primary focus:ring-primary border-gray-300 dark:border-gray-600" />
                                            <span className="material-symbols-outlined text-[16px] text-text-secondary">{perm.icon}</span>
                                            <span className="text-sm text-text-primary dark:text-white">{perm.label}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <Button className="w-full">
                                <span className="material-symbols-outlined text-[18px]">send</span>
                                Send Invitation
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {/* Member Profile Modal */}
            {selectedMember && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/50" onClick={() => setShowMemberModal(null)} />
                    <div className="relative bg-white dark:bg-gray-800 rounded-2xl w-full max-w-lg p-6 animate-in fade-in zoom-in-95">
                        <button onClick={() => setShowMemberModal(null)} className="absolute top-4 right-4 p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                            <span className="material-symbols-outlined text-[20px] text-text-secondary">close</span>
                        </button>

                        <div className="text-center mb-6">
                            <img src={selectedMember.avatar} alt={selectedMember.name} className="w-20 h-20 rounded-full object-cover mx-auto mb-3" />
                            <h2 className="text-lg font-bold text-text-primary dark:text-white">{selectedMember.name}</h2>
                            <p className="text-sm text-text-secondary dark:text-gray-400">{selectedMember.email}</p>
                            <div className="flex items-center justify-center gap-2 mt-2">
                                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${getRoleBadgeColor(selectedMember.role)}`}>{selectedMember.role}</span>
                                <span className="text-xs text-text-secondary dark:text-gray-400">• {selectedMember.department}</span>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-text-primary dark:text-gray-300 uppercase tracking-wide mb-2">Permissions</label>
                                <div className="flex flex-wrap gap-2">
                                    {selectedMember.permissions.map(perm => {
                                        const permInfo = PERMISSION_OPTIONS.find(p => p.id === perm);
                                        return permInfo ? (
                                            <span key={perm} className="px-3 py-1.5 bg-gray-100 dark:bg-gray-700 rounded-lg text-xs font-medium text-text-primary dark:text-white flex items-center gap-1.5">
                                                <span className="material-symbols-outlined text-[14px]">{permInfo.icon}</span>
                                                {permInfo.label}
                                            </span>
                                        ) : null;
                                    })}
                                </div>
                            </div>

                            <div className="flex gap-3 pt-4">
                                <Button variant="secondary" className="flex-1">
                                    <span className="material-symbols-outlined text-[18px]">chat</span>
                                    Message
                                </Button>
                                <Button variant="secondary" className="flex-1">
                                    <span className="material-symbols-outlined text-[18px]">edit</span>
                                    Edit Role
                                </Button>
                                {selectedMember.role !== 'Owner' && (
                                    <button className="px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg">
                                        Remove
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Profile;
