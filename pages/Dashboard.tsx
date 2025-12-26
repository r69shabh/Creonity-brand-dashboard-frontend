import React from 'react';
import { AreaChart, Area, ResponsiveContainer, XAxis } from 'recharts';
import { Link } from 'react-router-dom';
import { BRAND_CAMPAIGNS, APPLICATIONS, BRAND_NOTIFICATIONS } from '../data/mockData';

const spendData = [
    { name: 'Jan', value: 8000 },
    { name: 'Feb', value: 12000 },
    { name: 'Mar', value: 15000 },
    { name: 'Apr', value: 11000 },
    { name: 'May', value: 18000 },
    { name: 'Jun', value: 22000 },
    { name: 'Jul', value: 19000 },
    { name: 'Aug', value: 25000 },
];

const Dashboard: React.FC = () => {
    const activeCampaigns = BRAND_CAMPAIGNS.filter(c => c.status === 'active');
    const pendingApplications = APPLICATIONS.filter(a => a.status === 'pending');
    const totalSpent = BRAND_CAMPAIGNS.reduce((sum, c) => sum + c.spentNum, 0);

    const getNotificationIcon = (type: string) => {
        switch (type) {
            case 'application': return { icon: 'inbox', color: 'text-blue-600 bg-blue-50 dark:bg-blue-900/30 dark:text-blue-400' };
            case 'content': return { icon: 'videocam', color: 'text-purple-600 bg-purple-50 dark:bg-purple-900/30 dark:text-purple-400' };
            case 'payment': return { icon: 'payments', color: 'text-green-600 bg-green-50 dark:bg-green-900/30 dark:text-green-400' };
            case 'message': return { icon: 'chat', color: 'text-amber-600 bg-amber-50 dark:bg-amber-900/30 dark:text-amber-400' };
            default: return { icon: 'notifications', color: 'text-gray-600 bg-gray-100 dark:bg-gray-800 dark:text-gray-400' };
        }
    };

    return (
        <div className="max-w-5xl mx-auto p-6 lg:p-8 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-xl font-bold text-text-primary dark:text-white">Dashboard</h1>
                    <p className="text-sm text-text-secondary dark:text-gray-400">Your brand campaign overview</p>
                </div>
                <Link to="/campaigns" className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary-hover">
                    Create Campaign
                </Link>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { label: 'Active Campaigns', value: activeCampaigns.length.toString(), icon: 'campaign', color: 'text-blue-500', bg: 'bg-blue-500/10', link: '/campaigns' },
                    { label: 'Pending Applications', value: pendingApplications.length.toString(), icon: 'inbox', color: 'text-purple-500', bg: 'bg-purple-500/10', link: '/applications' },
                    { label: 'Total Spent', value: `$${(totalSpent / 1000).toFixed(1)}k`, icon: 'payments', color: 'text-green-500', bg: 'bg-green-500/10', link: '/wallet' },
                    { label: 'Avg. ROI', value: '324%', icon: 'trending_up', color: 'text-teal-500', bg: 'bg-teal-500/10', link: '/analytics' },
                ].map((stat, i) => (
                    <Link key={i} to={stat.link} className="p-4 bg-white dark:bg-gray-800 rounded-xl border border-border-color dark:border-gray-700 hover:border-primary/50 transition-colors group">
                        <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${stat.bg} ${stat.color} mb-3`}>
                            <span className="material-symbols-outlined text-[20px]">{stat.icon}</span>
                        </div>
                        <p className="text-2xl font-bold text-text-primary dark:text-white group-hover:text-primary transition-colors">{stat.value}</p>
                        <p className="text-xs text-text-secondary dark:text-gray-400 mt-0.5">{stat.label}</p>
                    </Link>
                ))}
            </div>

            {/* Chart + Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Spend Chart */}
                <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl border border-border-color dark:border-gray-700 p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-medium text-text-primary dark:text-white">Campaign Spend</h3>
                        <span className="text-xs text-text-secondary dark:text-gray-400">Last 8 months</span>
                    </div>
                    <div className="h-48">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={spendData} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorSpend" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#075CD1" stopOpacity={0.2} />
                                        <stop offset="95%" stopColor="#075CD1" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94A3B8' }} />
                                <Area type="monotone" dataKey="value" stroke="#075CD1" strokeWidth={2} fillOpacity={1} fill="url(#colorSpend)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white dark:bg-gray-800 rounded-xl border border-border-color dark:border-gray-700 p-6">
                    <h3 className="font-medium text-text-primary dark:text-white mb-4">Quick Actions</h3>
                    <div className="space-y-2">
                        {[
                            { label: 'Browse Creators', icon: 'group', link: '/creators' },
                            { label: 'Review Applications', icon: 'inbox', link: '/applications', badge: pendingApplications.length.toString() },
                            { label: 'Check Messages', icon: 'chat', link: '/messages', badge: '3' },
                            { label: 'Company Profile', icon: 'business', link: '/profile' },
                        ].map((action, i) => (
                            <Link key={i} to={action.link} className="flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors group">
                                <div className="flex items-center gap-3">
                                    <span className="material-symbols-outlined text-[18px] text-text-secondary dark:text-gray-400 group-hover:text-primary">{action.icon}</span>
                                    <span className="text-sm text-text-primary dark:text-white">{action.label}</span>
                                </div>
                                {action.badge ? (
                                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-primary text-white">{action.badge}</span>
                                ) : (
                                    <span className="material-symbols-outlined text-[16px] text-gray-400">chevron_right</span>
                                )}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            {/* Active Campaigns */}
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-border-color dark:border-gray-700 p-6">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="font-medium text-text-primary dark:text-white">Active Campaigns</h3>
                    <Link to="/campaigns" className="text-xs font-medium text-primary hover:underline">View All</Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {activeCampaigns.slice(0, 4).map((campaign) => (
                        <Link key={campaign.id} to={`/campaigns/${campaign.id}`} className="flex gap-4 p-4 rounded-xl border border-border-color dark:border-gray-700 hover:border-primary/50 transition-colors group">
                            <img src={campaign.img} alt={campaign.title} className="w-16 h-16 rounded-lg object-cover shrink-0" />
                            <div className="flex-1 min-w-0">
                                <p className="font-medium text-sm text-text-primary dark:text-white truncate group-hover:text-primary">{campaign.title}</p>
                                <p className="text-xs text-text-secondary dark:text-gray-400 mt-0.5">{campaign.creatorsHired}/{campaign.creatorsTarget} creators</p>
                                <div className="flex items-center gap-3 mt-2">
                                    <span className="text-xs text-text-secondary dark:text-gray-400">
                                        <span className="font-bold text-text-primary dark:text-white">{campaign.spent}</span> / {campaign.budget}
                                    </span>
                                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                                        {campaign.applicationsCount} applications
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Pending Applications + Notifications */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Pending Applications */}
                <div className="bg-white dark:bg-gray-800 rounded-xl border border-border-color dark:border-gray-700 p-6">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-[20px] text-purple-500">inbox</span>
                            <h3 className="font-medium text-text-primary dark:text-white">Pending Applications</h3>
                        </div>
                        <Link to="/applications" className="text-xs font-medium text-primary hover:underline">View All</Link>
                    </div>
                    <div className="space-y-3">
                        {pendingApplications.slice(0, 4).map((app) => (
                            <div key={app.id} className="flex items-center gap-3 p-3 rounded-lg border border-border-color dark:border-gray-700 hover:border-primary/30 transition-colors">
                                <img src={app.creatorAvatar} alt={app.creatorName} className="w-10 h-10 rounded-full object-cover" />
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-text-primary dark:text-white truncate">{app.creatorName}</p>
                                    <p className="text-xs text-text-secondary dark:text-gray-400 truncate">{app.campaignTitle}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-bold text-text-primary dark:text-white">{app.bidAmount}</p>
                                    <p className="text-[10px] text-text-secondary dark:text-gray-400">{app.submittedAt}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recent Notifications */}
                <div className="bg-white dark:bg-gray-800 rounded-xl border border-border-color dark:border-gray-700 p-6">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-[20px] text-blue-500">notifications</span>
                            <h3 className="font-medium text-text-primary dark:text-white">Recent Notifications</h3>
                        </div>
                        <Link to="/messages" className="text-xs font-medium text-primary hover:underline">View All</Link>
                    </div>
                    <div className="space-y-3">
                        {BRAND_NOTIFICATIONS.slice(0, 4).map((item) => {
                            const style = getNotificationIcon(item.type);
                            return (
                                <div key={item.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors cursor-pointer">
                                    <div className={`size-8 rounded-full ${style.color} flex items-center justify-center shrink-0`}>
                                        <span className="material-symbols-outlined text-[16px]">{style.icon}</span>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-start justify-between gap-2">
                                            <p className={`text-sm truncate ${item.unread ? 'font-medium text-text-primary dark:text-white' : 'text-text-secondary dark:text-gray-400'}`}>
                                                {item.title}
                                            </p>
                                            <span className="text-[10px] text-text-secondary dark:text-gray-500 whitespace-nowrap">{item.time}</span>
                                        </div>
                                        <p className="text-xs text-text-secondary dark:text-gray-400 truncate">{item.desc}</p>
                                    </div>
                                    {item.unread && <div className="size-2 bg-primary rounded-full mt-1.5 shrink-0"></div>}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
