import React from 'react';
import { AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from 'recharts';

const spendData = [
    { name: 'Jan', spend: 12000, roi: 38000 },
    { name: 'Feb', spend: 15000, roi: 42000 },
    { name: 'Mar', spend: 18000, roi: 52000 },
    { name: 'Apr', spend: 14000, roi: 45000 },
    { name: 'May', spend: 22000, roi: 68000 },
    { name: 'Jun', spend: 25000, roi: 78000 },
];

const platformData = [
    { name: 'Instagram', value: 45, color: '#E1306C' },
    { name: 'YouTube', value: 30, color: '#FF0000' },
    { name: 'TikTok', value: 20, color: '#000000' },
    { name: 'Twitch', value: 5, color: '#9146FF' },
];

const campaignPerformance = [
    { name: 'Summer Launch', impressions: 2500000, engagement: 185000, conversions: 4200 },
    { name: 'Tech Review', impressions: 1800000, engagement: 142000, conversions: 3100 },
    { name: 'Holiday Guide', impressions: 3200000, engagement: 245000, conversions: 5800 },
    { name: 'Fitness App', impressions: 890000, engagement: 72000, conversions: 1800 },
];

const Analytics: React.FC = () => {
    return (
        <div className="max-w-6xl mx-auto p-6 lg:p-8 space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-xl font-bold text-text-primary dark:text-white">Analytics</h1>
                <p className="text-sm text-text-secondary dark:text-gray-400">Track your campaign performance and ROI</p>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { label: 'Total Reach', value: '8.4M', change: '+24%', icon: 'visibility', color: 'text-blue-500', bg: 'bg-blue-500/10' },
                    { label: 'Engagements', value: '644K', change: '+18%', icon: 'favorite', color: 'text-pink-500', bg: 'bg-pink-500/10' },
                    { label: 'Conversions', value: '14.9K', change: '+32%', icon: 'shopping_cart', color: 'text-green-500', bg: 'bg-green-500/10' },
                    { label: 'Avg. ROI', value: '324%', change: '+12%', icon: 'trending_up', color: 'text-teal-500', bg: 'bg-teal-500/10' },
                ].map((stat, i) => (
                    <div key={i} className="p-4 bg-white dark:bg-gray-800 rounded-xl border border-border-color dark:border-gray-700">
                        <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${stat.bg} ${stat.color} mb-3`}>
                            <span className="material-symbols-outlined text-[20px]">{stat.icon}</span>
                        </div>
                        <p className="text-2xl font-bold text-text-primary dark:text-white">{stat.value}</p>
                        <div className="flex items-center gap-2 mt-1">
                            <p className="text-xs text-text-secondary dark:text-gray-400">{stat.label}</p>
                            <span className="text-[10px] font-bold text-green-600 dark:text-green-400">{stat.change}</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Spend vs ROI Chart */}
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-border-color dark:border-gray-700 p-6">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="font-medium text-text-primary dark:text-white">Spend vs ROI</h3>
                    <div className="flex items-center gap-4 text-xs">
                        <div className="flex items-center gap-1">
                            <div className="w-3 h-3 rounded-full bg-primary"></div>
                            <span className="text-text-secondary dark:text-gray-400">Spend</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <div className="w-3 h-3 rounded-full bg-green-500"></div>
                            <span className="text-text-secondary dark:text-gray-400">ROI</span>
                        </div>
                    </div>
                </div>
                <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={spendData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                            <defs>
                                <linearGradient id="colorSpend" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#075CD1" stopOpacity={0.2} />
                                    <stop offset="95%" stopColor="#075CD1" stopOpacity={0} />
                                </linearGradient>
                                <linearGradient id="colorRoi" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#22C55E" stopOpacity={0.2} />
                                    <stop offset="95%" stopColor="#22C55E" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94A3B8' }} />
                            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94A3B8' }} tickFormatter={(v) => `$${v / 1000}k`} />
                            <Tooltip />
                            <Area type="monotone" dataKey="spend" stroke="#075CD1" strokeWidth={2} fillOpacity={1} fill="url(#colorSpend)" />
                            <Area type="monotone" dataKey="roi" stroke="#22C55E" strokeWidth={2} fillOpacity={1} fill="url(#colorRoi)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Platform Distribution */}
                <div className="bg-white dark:bg-gray-800 rounded-xl border border-border-color dark:border-gray-700 p-6">
                    <h3 className="font-medium text-text-primary dark:text-white mb-4">Platform Distribution</h3>
                    <div className="flex items-center gap-6">
                        <div className="w-40 h-40">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={platformData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={40}
                                        outerRadius={70}
                                        paddingAngle={3}
                                        dataKey="value"
                                    >
                                        {platformData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="flex-1 space-y-3">
                            {platformData.map((platform, i) => (
                                <div key={i} className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: platform.color }}></div>
                                        <span className="text-sm text-text-primary dark:text-white">{platform.name}</span>
                                    </div>
                                    <span className="text-sm font-bold text-text-primary dark:text-white">{platform.value}%</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Top Performing Creators */}
                <div className="bg-white dark:bg-gray-800 rounded-xl border border-border-color dark:border-gray-700 p-6">
                    <h3 className="font-medium text-text-primary dark:text-white mb-4">Top Performing Creators</h3>
                    <div className="space-y-3">
                        {[
                            { name: 'Alex Morgan', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100', engagement: '4.8%', conversions: 1240 },
                            { name: 'Sarah Chen', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100', engagement: '6.2%', conversions: 980 },
                            { name: 'David Kim', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100', engagement: '4.2%', conversions: 856 },
                        ].map((creator, i) => (
                            <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50">
                                <span className="text-lg font-bold text-text-secondary dark:text-gray-400 w-6">#{i + 1}</span>
                                <img src={creator.avatar} alt={creator.name} className="w-10 h-10 rounded-full object-cover" />
                                <div className="flex-1">
                                    <p className="font-medium text-sm text-text-primary dark:text-white">{creator.name}</p>
                                    <p className="text-xs text-text-secondary dark:text-gray-400">{creator.engagement} engagement</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-bold text-text-primary dark:text-white">{creator.conversions}</p>
                                    <p className="text-[10px] text-text-secondary dark:text-gray-400">conversions</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Campaign Performance */}
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-border-color dark:border-gray-700 p-6">
                <h3 className="font-medium text-text-primary dark:text-white mb-4">Campaign Performance</h3>
                <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={campaignPerformance} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94A3B8' }} />
                            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94A3B8' }} tickFormatter={(v) => `${v / 1000}k`} />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="impressions" fill="#075CD1" radius={[4, 4, 0, 0]} />
                            <Bar dataKey="engagement" fill="#1BD1C9" radius={[4, 4, 0, 0]} />
                            <Bar dataKey="conversions" fill="#22C55E" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default Analytics;
