import React from 'react';
import { AreaChart, Area, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

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
        <div className="max-w-[1600px] mx-auto p-6 lg:p-8 space-y-8">
            {/* Header */}
            <div className="flex items-end justify-between border-b border-gray-200 dark:border-neutral-800 pb-6">
                <div>
                    <h1 className="text-3xl font-display font-bold text-gray-900 dark:text-white tracking-tight leading-none">Wallet</h1>
                    <p className="text-sm text-gray-500 dark:text-neutral-500 mt-2">Manage your campaign budget and payments.</p>
                </div>
                <button className="px-5 py-2.5 text-sm font-bold text-white bg-black dark:bg-white dark:text-black rounded-md hover:bg-gray-800 dark:hover:bg-gray-200 transition-all shadow-sm flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px]">add</span>
                    Add Funds
                </button>
            </div>

            {/* Balance Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 bg-black dark:bg-white text-white dark:text-black rounded-lg shadow-sm relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                        <span className="material-symbols-outlined text-6xl">account_balance_wallet</span>
                    </div>
                    <div className="relative z-10">
                        <p className="text-sm font-medium opacity-80 mb-1">Available Balance</p>
                        <p className="text-4xl font-bold font-display tracking-tight">$42,500</p>
                        <div className="mt-4 flex items-center gap-2">
                            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                            <span className="text-xs font-mono font-medium opacity-80">READY_TO_SPEND</span>
                        </div>
                    </div>
                </div>

                <div className="p-6 bg-white dark:bg-black border border-gray-200 dark:border-neutral-800 rounded-lg shadow-sm">
                    <div className="flex items-center gap-2 mb-2 text-gray-500 dark:text-neutral-500">
                        <span className="material-symbols-outlined text-[20px]">lock</span>
                        <span className="text-sm font-medium">In Escrow</span>
                    </div>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">$12,300</p>
                    <p className="text-xs text-gray-500 dark:text-neutral-500 mt-2 font-mono">3 PENDING RELEASES</p>
                </div>

                <div className="p-6 bg-white dark:bg-black border border-gray-200 dark:border-neutral-800 rounded-lg shadow-sm">
                    <div className="flex items-center gap-2 mb-2 text-gray-500 dark:text-neutral-500">
                        <span className="material-symbols-outlined text-[20px]">trending_up</span>
                        <span className="text-sm font-medium">Total Spent (YTD)</span>
                    </div>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">$106,000</p>
                    <span className="inline-block mt-2 text-[10px] font-bold bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 px-2 py-0.5 rounded-full border border-green-100 dark:border-green-900/30">
                        +24% VS LAST YEAR
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Monthly Spend Chart */}
                <div className="lg:col-span-2 bg-white dark:bg-black border border-gray-200 dark:border-neutral-800 rounded-lg shadow-sm p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="font-bold text-lg text-gray-900 dark:text-white">Monthly Spend</h3>
                        <span className="text-xs font-mono text-gray-500 dark:text-neutral-500 bg-gray-50 dark:bg-neutral-900 px-2 py-1 rounded">LAST_6_MONTHS</span>
                    </div>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={spendData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#000000" stopOpacity={0.1} />
                                        <stop offset="95%" stopColor="#000000" stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="colorAmountDark" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#ffffff" stopOpacity={0.1} />
                                        <stop offset="95%" stopColor="#ffffff" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={document.documentElement.classList.contains('dark') ? '#262626' : '#f3f4f6'} />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: document.documentElement.classList.contains('dark') ? '#525252' : '#6b7280', fontFamily: 'JetBrains Mono' }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: document.documentElement.classList.contains('dark') ? '#525252' : '#6b7280', fontFamily: 'JetBrains Mono' }} tickFormatter={(v) => `$${v / 1000}k`} />
                                <Tooltip 
                                    contentStyle={{ 
                                        backgroundColor: document.documentElement.classList.contains('dark') ? '#000' : '#fff', 
                                        border: `1px solid ${document.documentElement.classList.contains('dark') ? '#262626' : '#e5e7eb'}`, 
                                        borderRadius: '4px', 
                                        color: document.documentElement.classList.contains('dark') ? '#fff' : '#000', 
                                        fontFamily: 'JetBrains Mono' 
                                    }}
                                    formatter={(value: number) => [`$${value.toLocaleString()}`, 'Spend']}
                                    cursor={{ stroke: document.documentElement.classList.contains('dark') ? '#262626' : '#e5e7eb', strokeWidth: 1 }}
                                />
                                <Area 
                                    type="monotone" 
                                    dataKey="amount" 
                                    stroke={document.documentElement.classList.contains('dark') ? '#fff' : '#000'} 
                                    strokeWidth={2} 
                                    fillOpacity={1} 
                                    fill={`url(#colorAmount${document.documentElement.classList.contains('dark') ? 'Dark' : ''})`} 
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Pending Payments */}
                <div className="bg-white dark:bg-black border border-gray-200 dark:border-neutral-800 rounded-lg shadow-sm flex flex-col">
                    <div className="p-4 border-b border-gray-100 dark:border-neutral-800 bg-gray-50/50 dark:bg-neutral-900/50">
                        <h3 className="font-bold text-sm text-gray-900 dark:text-white uppercase tracking-wide">Pending Actions</h3>
                    </div>
                    <div className="p-4 space-y-4">
                        {[
                            { creator: 'Alex Morgan', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100', campaign: 'Tech Gadget Review', amount: '$3,500', due: 'Upon approval' },
                            { creator: 'Jessica Taylor', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100', campaign: 'Summer Product Launch', amount: '$2,200', due: 'Jan 15, 2024' },
                        ].map((payment, i) => (
                            <div key={i} className="flex flex-col gap-3 p-3 rounded-lg border border-gray-100 dark:border-neutral-800 hover:border-gray-300 dark:hover:border-neutral-700 transition-colors">
                                <div className="flex items-center gap-3">
                                    <img src={payment.avatar} alt={payment.creator} className="w-8 h-8 rounded-full object-cover" />
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-bold text-gray-900 dark:text-white">{payment.creator}</p>
                                        <p className="text-xs text-gray-500 dark:text-neutral-500 truncate">{payment.campaign}</p>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between pt-2 border-t border-gray-50 dark:border-neutral-800">
                                    <div>
                                        <p className="text-sm font-mono font-bold text-gray-900 dark:text-white">{payment.amount}</p>
                                        <p className="text-[10px] text-amber-600 dark:text-amber-400 font-medium">{payment.due}</p>
                                    </div>
                                    <button className="px-3 py-1 text-xs font-bold text-white bg-black dark:bg-white dark:text-black rounded hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors">
                                        Release
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Transaction History */}
            <div className="bg-white dark:bg-black border border-gray-200 dark:border-neutral-800 rounded-lg shadow-sm overflow-hidden">
                <div className="p-5 border-b border-gray-200 dark:border-neutral-800 flex items-center justify-between">
                    <h3 className="font-bold text-lg text-gray-900 dark:text-white">Transaction History</h3>
                    <button className="text-xs font-mono font-medium text-gray-500 dark:text-neutral-500 hover:text-black dark:hover:text-white hover:underline">EXPORT_CSV</button>
                </div>
                <div className="divide-y divide-gray-100 dark:divide-neutral-800">
                    {transactions.map((tx) => (
                        <div key={tx.id} className="flex items-center gap-4 p-4 hover:bg-gray-50 dark:hover:bg-neutral-900 transition-colors">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center border ${
                                tx.type === 'deposit' ? 'bg-green-50 dark:bg-green-900/20 border-green-100 dark:border-green-900/30 text-green-600 dark:text-green-400' :
                                tx.type === 'escrow' ? 'bg-amber-50 dark:bg-amber-900/20 border-amber-100 dark:border-amber-900/30 text-amber-600 dark:text-amber-400' :
                                'bg-gray-50 dark:bg-neutral-900 border-gray-200 dark:border-neutral-800 text-gray-500 dark:text-neutral-500'
                            }`}>
                                <span className="material-symbols-outlined text-[20px]">
                                    {tx.type === 'deposit' ? 'add' : tx.type === 'escrow' ? 'lock' : 'remove'}
                                </span>
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="font-bold text-sm text-gray-900 dark:text-white">{tx.desc}</p>
                                <p className="text-xs text-gray-500 dark:text-neutral-500 mt-0.5">{tx.campaign} • {tx.date}</p>
                            </div>
                            <div className="text-right">
                                <p className={`font-mono font-bold ${tx.amount.startsWith('+') ? 'text-green-600 dark:text-green-400' : 'text-gray-900 dark:text-white'}`}>
                                    {tx.amount}
                                </p>
                                <span className={`text-[10px] font-bold uppercase ${tx.status === 'completed' ? 'text-green-600 dark:text-green-400' : 'text-amber-600 dark:text-amber-400'}`}>
                                    {tx.status}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Wallet;
