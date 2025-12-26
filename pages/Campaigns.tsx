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
                return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"><span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />Active</span>;
            case 'draft':
                return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400">Draft</span>;
            case 'completed':
                return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400">Completed</span>;
            default:
                return null;
        }
    };

    const renderCampaignCard = (campaign: typeof BRAND_CAMPAIGNS[0]) => (
        <Link to={`/campaigns/${campaign.id}`} key={campaign.id} className="group">
            <Card padding="p-0" className="h-full flex flex-col overflow-hidden hover:shadow-lg transition-shadow duration-300">
                {/* Image */}
                <div className="relative h-40 overflow-hidden">
                    <img
                        src={campaign.img}
                        alt={campaign.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <span className="absolute top-3 left-3 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wide text-text-primary dark:text-white">
                        {campaign.category}
                    </span>
                    <div className="absolute top-3 right-3">
                        {getStatusBadge(campaign.status)}
                    </div>
                </div>

                {/* Content */}
                <div className="p-4 flex-1 flex flex-col">
                    <h3 className="font-bold text-text-primary dark:text-white mb-1 group-hover:text-primary transition-colors">
                        {campaign.title}
                    </h3>
                    <p className="text-xs text-text-secondary dark:text-gray-400 line-clamp-2 mb-3 flex-1">
                        {campaign.description}
                    </p>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-3 mb-3">
                        <div>
                            <p className="text-[10px] text-text-secondary dark:text-gray-500 uppercase">Budget</p>
                            <p className="text-sm font-bold text-text-primary dark:text-white">{campaign.budget}</p>
                        </div>
                        <div>
                            <p className="text-[10px] text-text-secondary dark:text-gray-500 uppercase">Spent</p>
                            <p className="text-sm font-bold text-text-primary dark:text-white">{campaign.spent}</p>
                        </div>
                    </div>

                    {/* Progress bar */}
                    <div className="mb-3">
                        <div className="flex justify-between text-[10px] mb-1">
                            <span className="text-text-secondary dark:text-gray-400">Creators</span>
                            <span className="font-bold text-text-primary dark:text-white">{campaign.creatorsHired}/{campaign.creatorsTarget}</span>
                        </div>
                        <div className="h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-primary rounded-full transition-all"
                                style={{ width: `${(campaign.creatorsHired / campaign.creatorsTarget) * 100}%` }}
                            ></div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-700">
                        <div className="flex items-center gap-1">
                            {campaign.platforms.slice(0, 3).map((p, i) => (
                                <span key={i} className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-700 text-text-secondary dark:text-gray-300">
                                    {p}
                                </span>
                            ))}
                        </div>
                        {campaign.applicationsCount > 0 && (
                            <span className="text-xs font-bold text-primary">
                                {campaign.applicationsCount} applications
                            </span>
                        )}
                    </div>
                </div>
            </Card>
        </Link>
    );

    return (
        <div className="max-w-6xl mx-auto p-6 lg:p-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-xl font-bold text-text-primary dark:text-white">Campaigns</h1>
                    <p className="text-sm text-text-secondary dark:text-gray-400">Manage your influencer marketing campaigns</p>
                </div>
                <button className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary-hover flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px]">add</span>
                    Create Campaign
                </button>
            </div>

            {/* Tabs */}
            <div className="flex gap-1 p-1 bg-gray-100 dark:bg-gray-800 rounded-lg mb-6 w-fit">
                {[
                    { id: 'active', label: 'Active', count: activeCampaigns.length },
                    { id: 'draft', label: 'Drafts', count: draftCampaigns.length },
                    { id: 'completed', label: 'Completed', count: completedCampaigns.length },
                ].map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as Tab)}
                        className={`px-4 py-2 text-sm font-medium rounded-md transition-all flex items-center gap-2 ${activeTab === tab.id
                            ? 'bg-white dark:bg-gray-700 text-text-primary dark:text-white shadow-sm'
                            : 'text-text-secondary dark:text-gray-400 hover:text-text-primary'
                            }`}
                    >
                        {tab.label}
                        <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${activeTab === tab.id ? 'bg-primary/10 text-primary' : 'bg-gray-200 dark:bg-gray-600 text-text-secondary dark:text-gray-400'}`}>
                            {tab.count}
                        </span>
                    </button>
                ))}
            </div>

            {/* Campaign List */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                {activeTab === 'active' && activeCampaigns.map(renderCampaignCard)}
                {activeTab === 'draft' && draftCampaigns.map(renderCampaignCard)}
                {activeTab === 'completed' && completedCampaigns.map(renderCampaignCard)}
            </div>

            {/* Empty State */}
            {((activeTab === 'active' && activeCampaigns.length === 0) ||
                (activeTab === 'draft' && draftCampaigns.length === 0) ||
                (activeTab === 'completed' && completedCampaigns.length === 0)) && (
                    <div className="flex flex-col items-center justify-center py-16 text-center">
                        <div className="size-16 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4">
                            <span className="material-symbols-outlined text-3xl text-gray-400 dark:text-gray-500">campaign</span>
                        </div>
                        <h3 className="text-lg font-bold text-text-primary dark:text-white mb-2">No {activeTab} campaigns</h3>
                        <p className="text-sm text-text-secondary dark:text-gray-400 max-w-sm mb-4">
                            {activeTab === 'active' && "You don't have any active campaigns. Create one to start working with creators."}
                            {activeTab === 'draft' && "No draft campaigns. Start creating a new campaign to save as draft."}
                            {activeTab === 'completed' && "No completed campaigns yet. Your finished campaigns will appear here."}
                        </p>
                        <button className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary-hover">
                            Create Campaign
                        </button>
                    </div>
                )}
        </div>
    );
};

export default Campaigns;
