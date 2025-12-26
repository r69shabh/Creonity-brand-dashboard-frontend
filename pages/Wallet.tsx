import React from 'react';
import { AreaChart, Area, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import { Link } from 'react-router-dom';

const spendData = [
    { name: 'Jan', amount: 12000 },
    { name: 'Feb', amount: 15000 },
    { name: 'Mar', amount: 18000 },
    { name: 'Apr', amount: 14000 },
    { name: 'May', amount: 22000 },
    { name: 'Jun', amount: 25000 },
];

const transactions = [
    { id: 1, type: 'payment', desc: 'Payment to Alex Morgan', campaign: 'Tech Gadget Review', amount: '-$3,500', date: 'Dec 24, 2024', status: 'completed' },
    { id: 2, type: 'escrow', desc: 'Escrow for Summer Launch', campaign: 'Summer Product Launch', amount: '-$5,000', date: 'Dec 22, 2024', status: 'pending' },
    { id: 3, type: 'payment', desc: 'Payment to Sarah Chen', campaign: 'Summer Product Launch', amount: '-$1,800', date: 'Dec 20, 2024', status: 'completed' },
    { id: 4, type: 'deposit', desc: 'Funds added', campaign: '-', amount: '+$25,000', date: 'Dec 18, 2024', status: 'completed' },
    { id: 5, type: 'payment', desc: 'Payment to David Kim', campaign: 'Holiday Gift Guide', amount: '-$5,000', date: 'Dec 15, 2024', status: 'completed' },
];

const Wallet: React.FC = () => {
    return (
        <div className="max-w-5xl mx-auto p-6 lg:p-8 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-xl font-bold text-text-primary dark:text-white">Wallet</h1>
                    <p className="text-sm text-text-secondary dark:text-gray-400">Manage your campaign budget and payments</p>
                </div>
                <button className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary-hover flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px]">add</span>
                    Add Funds
                </button>
            </div>

            {/* Balance Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-6 bg-gradient-to-br from-primary to-brand-deep rounded-xl text-white">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="material-symbols-outlined text-[20px] opacity-80">account_balance_wallet</span>
                        <span className="text-sm opacity-80">Available Balance</span>
                    </div>
                    <p className="text-3xl font-bold">$42,500</p>
                    <p className="text-sm opacity-70 mt-1">Ready to spend</p>
                </div>

                <div className="p-6 bg-white dark:bg-gray-800 rounded-xl border border-border-color dark:border-gray-700">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="material-symbols-outlined text-[20px] text-amber-500">lock</span>
                        <span className="text-sm text-text-secondary dark:text-gray-400">In Escrow</span>
                    </div>
                    <p className="text-3xl font-bold text-text-primary dark:text-white">$12,300</p>
                    <p className="text-sm text-text-secondary dark:text-gray-400 mt-1">3 pending releases</p>
                </div>

                <div className="p-6 bg-white dark:bg-gray-800 rounded-xl border border-border-color dark:border-gray-700">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="material-symbols-outlined text-[20px] text-green-500">trending_up</span>
                        <span className="text-sm text-text-secondary dark:text-gray-400">Total Spent (YTD)</span>
                    </div>
                    <p className="text-3xl font-bold text-text-primary dark:text-white">$106,000</p>
                    <p className="text-sm text-green-600 dark:text-green-400 mt-1">+24% vs last year</p>
                </div>
            </div>

            {/* Monthly Spend Chart */}
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-border-color dark:border-gray-700 p-6">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="font-medium text-text-primary dark:text-white">Monthly Spend</h3>
                    <span className="text-xs text-text-secondary dark:text-gray-400">Last 6 months</span>
                </div>
                <div className="h-48">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={spendData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                            <defs>
                                <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#075CD1" stopOpacity={0.2} />
                                    <stop offset="95%" stopColor="#075CD1" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94A3B8' }} />
                            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94A3B8' }} tickFormatter={(v) => `$${v / 1000}k`} />
                            <Tooltip formatter={(value: number) => [`$${value.toLocaleString()}`, 'Spend']} />
                            <Area type="monotone" dataKey="amount" stroke="#075CD1" strokeWidth={2} fillOpacity={1} fill="url(#colorAmount)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Pending Payments */}
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-border-color dark:border-gray-700 p-6">
                <h3 className="font-medium text-text-primary dark:text-white mb-4">Pending Payments</h3>
                <div className="space-y-3">
                    {[
                        { creator: 'Alex Morgan', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100', campaign: 'Tech Gadget Review', amount: '$3,500', due: 'Upon approval' },
                        { creator: 'Jessica Taylor', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100', campaign: 'Summer Product Launch', amount: '$2,200', due: 'Jan 15, 2024' },
                    ].map((payment, i) => (
                        <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-900/30">
                            <img src={payment.avatar} alt={payment.creator} className="w-10 h-10 rounded-full object-cover" />
                            <div className="flex-1">
                                <p className="font-medium text-text-primary dark:text-white">{payment.creator}</p>
                                <p className="text-xs text-text-secondary dark:text-gray-400">{payment.campaign}</p>
                            </div>
                            <div className="text-right">
                                <p className="font-bold text-text-primary dark:text-white">{payment.amount}</p>
                                <p className="text-xs text-amber-600 dark:text-amber-400">{payment.due}</p>
                            </div>
                            <button className="px-3 py-1.5 text-xs font-medium text-white bg-green-600 rounded-lg hover:bg-green-700">
                                Release
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Transaction History */}
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-border-color dark:border-gray-700 p-6">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="font-medium text-text-primary dark:text-white">Transaction History</h3>
                    <button className="text-xs font-medium text-primary hover:underline">Export CSV</button>
                </div>
                <div className="space-y-3">
                    {transactions.map((tx) => (
                        <div key={tx.id} className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${tx.type === 'deposit' ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' :
                                    tx.type === 'escrow' ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400' :
                                        'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                                }`}>
                                <span className="material-symbols-outlined text-[20px]">
                                    {tx.type === 'deposit' ? 'add' : tx.type === 'escrow' ? 'lock' : 'remove'}
                                </span>
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="font-medium text-sm text-text-primary dark:text-white truncate">{tx.desc}</p>
                                <p className="text-xs text-text-secondary dark:text-gray-400">{tx.campaign} • {tx.date}</p>
                            </div>
                            <div className="text-right">
                                <p className={`font-bold ${tx.amount.startsWith('+') ? 'text-green-600 dark:text-green-400' : 'text-text-primary dark:text-white'}`}>
                                    {tx.amount}
                                </p>
                                <p className={`text-[10px] font-bold ${tx.status === 'completed' ? 'text-green-600' : 'text-amber-600'}`}>
                                    {tx.status}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Wallet;
