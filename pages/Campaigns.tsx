import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BRAND_CAMPAIGNS } from '../data/mockData';
import Card from '../components/ui/Card';

type Tab = 'active' | 'draft' | 'completed';

const Campaigns: React.FC = () => {
    const [activeTab, setActiveTab] = useState<Tab>('active');

    const activeCampaigns = BRAND_CAMPAIGNS.filter(c => c.status === 'active');
    const draftCampaigns = BRAND_CAMPAIGNS.filter(c => c.status === 'draft');
    const completedCampaigns = BRAND_CAMPAIGNS.filter(c => c.status === 'completed');

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'active':
                return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border border-green-100 dark:border-green-900/30"><span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />Active</span>;
            case 'draft':
                return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase bg-gray-50 dark:bg-neutral-800 text-gray-600 dark:text-neutral-400 border border-gray-200 dark:border-neutral-700">Draft</span>;
            case 'completed':
                return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 border border-blue-100 dark:border-blue-900/30">Completed</span>;
            default:
                return null;
        }
    };

    const renderCampaignCard = (campaign: typeof BRAND_CAMPAIGNS[0]) => (
        <Link to={`/campaigns/${campaign.id}`} key={campaign.id} className="group">
            <div className="h-full flex flex-col bg-white dark:bg-black border border-gray-200 dark:border-neutral-800 rounded-lg overflow-hidden hover:shadow-md transition-all duration-200 group-hover:border-gray-300 dark:group-hover:border-neutral-700">
                {/* Image Area */}
                <div className="relative h-40 overflow-hidden bg-gray-100 dark:bg-neutral-900">
                    <img
                        src={campaign.img}
                        alt={campaign.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60"></div>
                    <span className="absolute top-3 left-3 bg-white/95 dark:bg-black/95 backdrop-blur-sm text-[10px] font-bold px-2 py-1 rounded text-black dark:text-white uppercase tracking-wide border border-gray-200 dark:border-neutral-700 shadow-sm">
                        {campaign.category}
                    </span>
                    <div className="absolute top-3 right-3">
                        {getStatusBadge(campaign.status)}
                    </div>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col">
                    <div className="mb-4">
                        <h3 className="text-lg font-display font-bold text-gray-900 dark:text-white mb-1 group-hover:text-black dark:group-hover:text-gray-200 transition-colors leading-tight">
                            {campaign.title}
                        </h3>
                        <p className="text-xs text-gray-500 dark:text-neutral-400 line-clamp-2 leading-relaxed">
                            {campaign.description}
                        </p>
                    </div>

                    {/* Key Metrics Grid */}
                    <div className="grid grid-cols-2 gap-4 mb-4 p-3 bg-gray-50 dark:bg-neutral-900 rounded border border-gray-100 dark:border-neutral-800">
                        <div>
                            <p className="text-[10px] font-mono font-medium text-gray-400 dark:text-neutral-500 uppercase tracking-wide mb-0.5">Budget</p>
                            <p className="text-sm font-bold text-gray-900 dark:text-white font-mono">{campaign.budget}</p>
                        </div>
                        <div>
                            <p className="text-[10px] font-mono font-medium text-gray-400 dark:text-neutral-500 uppercase tracking-wide mb-0.5">Spent</p>
                            <p className="text-sm font-bold text-gray-900 dark:text-white font-mono">{campaign.spent}</p>
                        </div>
                    </div>

                    {/* Progress */}
                    <div className="mb-4">
                        <div className="flex justify-between text-[10px] mb-1.5 font-medium">
                            <span className="text-gray-500 dark:text-neutral-500">Creator Slots</span>
                            <span className="text-gray-900 dark:text-white font-mono">{campaign.creatorsHired} / {campaign.creatorsTarget}</span>
                        </div>
                        <div className="h-1.5 bg-gray-100 dark:bg-neutral-800 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-black dark:bg-white rounded-full transition-all duration-500"
                                style={{ width: `${(campaign.creatorsHired / campaign.creatorsTarget) * 100}%` }}
                            ></div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-neutral-800 mt-auto">
                        <div className="flex items-center gap-1.5">
                            {campaign.platforms.slice(0, 3).map((p, i) => (
                                <span key={i} className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-50 dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 text-gray-400 dark:text-neutral-500 hover:text-black dark:hover:text-white hover:border-gray-300 dark:hover:border-neutral-700 transition-colors">
                                    <span className="material-symbols-outlined text-[14px]">
                                        {p === 'Instagram' ? 'photo_camera' : p === 'YouTube' ? 'smart_display' : 'music_note'}
                                    </span>
                                </span>
                            ))}
                        </div>
                        {campaign.applicationsCount > 0 && (
                            <span className="text-[10px] font-bold text-black dark:text-white bg-accent-yellow dark:bg-yellow-900/20 border border-pop-yellow dark:border-pop-yellow/30 px-2 py-1 rounded-full">
                                {campaign.applicationsCount} APPLICANTS
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </Link>
    );

    return (
        <div className="max-w-6xl mx-auto p-6 lg:p-8">
            {/* Header */}
            <div className="flex items-end justify-between border-b border-gray-200 dark:border-neutral-800 pb-6 mb-8">
                <div>
                    <h1 className="text-3xl font-display font-bold text-gray-900 dark:text-white tracking-tight leading-none">Campaigns</h1>
                    <p className="text-sm text-gray-500 dark:text-neutral-500 mt-2">Manage and track your active influencer activations.</p>
                </div>
                <button className="px-5 py-2.5 text-sm font-bold text-white bg-black dark:bg-white dark:text-black rounded-md hover:bg-gray-800 dark:hover:bg-gray-200 transition-all shadow-sm flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px]">add</span>
                    Create Campaign
                </button>
            </div>

            {/* Tabs */}
            <div className="flex items-center gap-6 mb-8 border-b border-gray-200 dark:border-neutral-800">
                {[
                    { id: 'active', label: 'Active', count: activeCampaigns.length },
                    { id: 'draft', label: 'Drafts', count: draftCampaigns.length },
                    { id: 'completed', label: 'Completed', count: completedCampaigns.length },
                ].map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as Tab)}
                        className={`pb-3 text-sm font-medium transition-all flex items-center gap-2 border-b-2 ${activeTab === tab.id
                            ? 'border-black text-black dark:border-white dark:text-white'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-neutral-500 dark:hover:text-neutral-300 dark:hover:border-neutral-700'
                            }`}
                    >
                        {tab.label}
                        <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono ${activeTab === tab.id ? 'bg-black text-white dark:bg-white dark:text-black' : 'bg-gray-100 text-gray-500 dark:bg-neutral-800 dark:text-neutral-500'}`}>
                            {tab.count}
                        </span>
                    </button>
                ))}
            </div>

            {/* Campaign List */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {activeTab === 'active' && activeCampaigns.map(renderCampaignCard)}
                {activeTab === 'draft' && draftCampaigns.map(renderCampaignCard)}
                {activeTab === 'completed' && completedCampaigns.map(renderCampaignCard)}
            </div>

            {/* Empty State */}
            {((activeTab === 'active' && activeCampaigns.length === 0) ||
                (activeTab === 'draft' && draftCampaigns.length === 0) ||
                (activeTab === 'completed' && completedCampaigns.length === 0)) && (
                    <div className="flex flex-col items-center justify-center py-20 text-center border-2 border-dashed border-gray-200 dark:border-neutral-800 rounded-lg bg-gray-50/50 dark:bg-neutral-900/50">
                        <div className="w-16 h-16 rounded-full bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 flex items-center justify-center mb-4 shadow-sm">
                            <span className="material-symbols-outlined text-3xl text-gray-400 dark:text-neutral-600">campaign</span>
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 font-display">No {activeTab} campaigns</h3>
                        <p className="text-sm text-gray-500 dark:text-neutral-500 max-w-sm mb-6 leading-relaxed">
                            {activeTab === 'active' && "You don't have any active campaigns. Create one to start working with creators."}
                            {activeTab === 'draft' && "No draft campaigns. Start creating a new campaign to save as draft."}
                            {activeTab === 'completed' && "No completed campaigns yet. Your finished campaigns will appear here."}
                        </p>
                        <button className="px-5 py-2.5 text-sm font-bold text-white bg-black dark:bg-white dark:text-black rounded-md hover:bg-gray-800 dark:hover:bg-gray-200 transition-all shadow-sm">
                            Create Campaign
                        </button>
                    </div>
                )}
        </div>
    );
};

export default Campaigns;
