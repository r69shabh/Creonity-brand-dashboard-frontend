import React, { useState } from 'react';
import { AreaChart, Area, ResponsiveContainer, XAxis, Tooltip, CartesianGrid } from 'recharts';
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

    return (
        <div className="max-w-[1600px] mx-auto p-6 lg:p-8 space-y-8">
            {/* Header */}
            <div className="flex items-end justify-between border-b border-gray-200 dark:border-neutral-800 pb-6">
                <div>
                    <h1 className="text-3xl font-display font-bold text-gray-900 dark:text-white tracking-tight leading-none">Dashboard</h1>
                    <div className="flex items-center gap-2 mt-2">
                         <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                         <p className="text-xs font-mono font-medium uppercase text-gray-500 dark:text-neutral-500 tracking-wide">Live Overview // Brand_ID: 8821</p>
                    </div>
                </div>
                <Link to="/campaigns" className="px-5 py-2.5 text-sm font-bold text-white bg-black dark:bg-white dark:text-black rounded-md hover:bg-gray-800 dark:hover:bg-gray-200 transition-all shadow-sm hover:shadow-md flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px]">add</span>
                    New Campaign
                </Link>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: 'Active Campaigns', value: activeCampaigns.length.toString(), icon: 'campaign', bg: 'bg-accent-cyan dark:bg-cyan-900/20 text-pop-cyan-dark dark:text-pop-cyan', border: 'border-pop-cyan/20' },
                    { label: 'Pending Apps', value: pendingApplications.length.toString(), icon: 'inbox', bg: 'bg-accent-yellow dark:bg-yellow-900/20 text-pop-yellow-dark dark:text-pop-yellow', border: 'border-pop-yellow/20' },
                    { label: 'Total Spent', value: `$${(totalSpent / 1000).toFixed(1)}k`, icon: 'payments', bg: 'bg-accent-pink dark:bg-pink-900/20 text-pop-pink-dark dark:text-pop-pink', border: 'border-pop-pink/20' },
                    { label: 'Avg. ROI', value: '324%', icon: 'trending_up', bg: 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400', border: 'border-green-500/20' },
                ].map((stat, i) => (
                    <div key={i} className="p-6 bg-white dark:bg-black border border-gray-200 dark:border-neutral-800 rounded-lg shadow-sm hover:shadow-md transition-all cursor-default group relative overflow-hidden">
                        <div className={`absolute top-4 right-4 p-2 rounded-md ${stat.bg} ${stat.border} border`}>
                             <span className="material-symbols-outlined text-[20px] text-current">{stat.icon}</span>
                        </div>
                        <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2 tracking-tight">{stat.value}</p>
                        <p className="text-xs font-mono font-medium text-gray-500 dark:text-neutral-500 uppercase tracking-wider mt-1">{stat.label}</p>
                    </div>
                ))}
            </div>

            {/* Chart + Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Spend Chart */}
                <div className="lg:col-span-2 bg-white dark:bg-black border border-gray-200 dark:border-neutral-800 rounded-lg shadow-sm p-6 relative">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h3 className="font-bold text-lg text-gray-900 dark:text-white">Spend Analysis</h3>
                            <p className="text-xs text-gray-500 dark:text-neutral-500 font-mono mt-1">FINANCIAL_DATA_STREAM</p>
                        </div>
                        <select className="bg-gray-50 dark:bg-neutral-900 border border-gray-200 dark:border-neutral-700 text-gray-900 dark:text-white rounded text-xs font-mono font-medium px-2 py-1 outline-none focus:ring-1 focus:ring-black dark:focus:ring-white">
                            <option>LAST_8_MONTHS</option>
                            <option>THIS_YEAR</option>
                        </select>
                    </div>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={spendData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorSpend" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#000000" stopOpacity={0.1} />
                                        <stop offset="95%" stopColor="#000000" stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="colorSpendDark" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#ffffff" stopOpacity={0.1} />
                                        <stop offset="95%" stopColor="#ffffff" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={document.documentElement.classList.contains('dark') ? '#262626' : '#f3f4f6'} />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: document.documentElement.classList.contains('dark') ? '#525252' : '#6b7280', fontFamily: 'JetBrains Mono', fontWeight: '500' }} dy={10} />
                                <Tooltip 
                                    contentStyle={{ 
                                        backgroundColor: document.documentElement.classList.contains('dark') ? '#000' : '#fff', 
                                        border: `1px solid ${document.documentElement.classList.contains('dark') ? '#262626' : '#e5e7eb'}`, 
                                        borderRadius: '4px', 
                                        color: document.documentElement.classList.contains('dark') ? '#fff' : '#000', 
                                        fontFamily: 'JetBrains Mono' 
                                    }}
                                    itemStyle={{ color: document.documentElement.classList.contains('dark') ? '#fff' : '#000' }}
                                    cursor={{ stroke: document.documentElement.classList.contains('dark') ? '#262626' : '#e5e7eb', strokeWidth: 1 }}
                                />
                                <Area 
                                    type="monotone" 
                                    dataKey="value" 
                                    stroke={document.documentElement.classList.contains('dark') ? '#fff' : '#000'} 
                                    strokeWidth={2} 
                                    fillOpacity={1} 
                                    fill={`url(#colorSpend${document.documentElement.classList.contains('dark') ? 'Dark' : ''})`} 
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white dark:bg-black border border-gray-200 dark:border-neutral-800 rounded-lg shadow-sm flex flex-col overflow-hidden">
                    <div className="p-4 border-b border-gray-100 dark:border-neutral-800 bg-gray-50/50 dark:bg-neutral-900/50">
                        <h3 className="font-bold text-sm uppercase tracking-wide text-gray-500 dark:text-neutral-500 flex items-center gap-2">
                            <span className="material-symbols-outlined text-[16px]">bolt</span>
                            Quick Actions
                        </h3>
                    </div>
                    <div className="flex-1 p-2 space-y-1">
                        {[
                            { label: 'Browse Creators', icon: 'group', link: '/creators', desc: 'Find new talent' },
                            { label: 'Review Apps', icon: 'inbox', link: '/applications', badge: pendingApplications.length.toString(), desc: '3 pending' },
                            { label: 'Messages', icon: 'chat', link: '/messages', badge: '3', desc: 'Unread chats' },
                            { label: 'Company Profile', icon: 'business', link: '/profile', desc: 'Edit details' },
                        ].map((action, i) => (
                            <Link key={i} to={action.link} className="flex items-center justify-between p-3 rounded-md hover:bg-gray-50 dark:hover:bg-neutral-900 transition-all group border border-transparent hover:border-gray-200 dark:hover:border-neutral-700">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 flex items-center justify-center rounded-md bg-gray-100 dark:bg-neutral-800 text-gray-500 dark:text-neutral-400 group-hover:bg-black group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black transition-colors">
                                         <span className="material-symbols-outlined text-[18px]">{action.icon}</span>
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-gray-900 dark:text-white leading-none">{action.label}</p>
                                        <p className="text-[10px] font-mono text-gray-500 dark:text-neutral-500 mt-1">{action.desc}</p>
                                    </div>
                                </div>
                                {action.badge && (
                                    <span className="px-2 py-0.5 bg-pop-pink text-white text-[10px] font-bold rounded-full">
                                        {action.badge}
                                    </span>
                                )}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            {/* Notifications / Recent Activity Feed */}
            <div className="bg-white dark:bg-black border border-gray-200 dark:border-neutral-800 rounded-lg shadow-sm overflow-hidden">
                 <div className="p-4 border-b border-gray-100 dark:border-neutral-800 flex justify-between items-center bg-gray-50/30 dark:bg-neutral-900/30">
                    <h3 className="font-bold text-sm uppercase tracking-wide text-gray-500 dark:text-neutral-500">Recent System Activity</h3>
                    <button className="text-[10px] font-mono font-bold text-black dark:text-white hover:underline">VIEW_ALL_LOGS</button>
                 </div>
                 <div className="divide-y divide-gray-100 dark:divide-neutral-800">
                    {BRAND_NOTIFICATIONS.slice(0, 3).map((notif, i) => (
                        <div key={i} className="p-4 hover:bg-gray-50 dark:hover:bg-neutral-900 flex items-start gap-4 group transition-colors">
                             <div className="w-2 h-2 mt-2 bg-gray-300 dark:bg-neutral-600 rounded-full group-hover:bg-pop-cyan transition-colors"></div>
                             <div className="flex-1">
                                 <p className="font-medium text-sm text-gray-900 dark:text-white">{notif.message}</p>
                                 <p className="text-xs font-mono text-gray-500 dark:text-neutral-500 mt-1">{notif.time}</p>
                             </div>
                             <div className="px-2 py-1 bg-gray-100 dark:bg-neutral-800 rounded text-[10px] font-mono font-medium uppercase text-gray-600 dark:text-neutral-400">
                                 {notif.type}
                             </div>
                        </div>
                    ))}
                 </div>
            </div>
        </div>
    );
};

export default Dashboard;
