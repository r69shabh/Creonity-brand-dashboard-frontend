import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ACTIVE_COLLABORATIONS } from '../data/mockData';

type Tab = 'in_progress' | 'review' | 'completed';

const Collaborations: React.FC = () => {
    const [activeTab, setActiveTab] = useState<Tab>('in_progress');

    const inProgressCollabs = ACTIVE_COLLABORATIONS.filter(c => c.status === 'in_progress');
    const reviewCollabs = ACTIVE_COLLABORATIONS.filter(c => c.status === 'review');
    const completedCollabs = ACTIVE_COLLABORATIONS.filter(c => c.status === 'completed');

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'in_progress':
                return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400"><span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />In Progress</span>;
            case 'review':
                return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400"><span className="material-symbols-outlined text-[12px]">visibility</span>Needs Review</span>;
            case 'completed':
                return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"><span className="material-symbols-outlined text-[12px]">check_circle</span>Completed</span>;
            default:
                return null;
        }
    };

    const renderCollaborationCard = (collab: typeof ACTIVE_COLLABORATIONS[0]) => (
        <div key={collab.id} className="bg-white dark:bg-gray-800 rounded-xl border border-border-color dark:border-gray-700 p-4">
            <div className="flex items-start gap-4">
                {/* Creator Avatar */}
                <Link to={`/creators/${collab.creatorId}`}>
                    <img src={collab.creatorAvatar} alt={collab.creatorName} className="w-12 h-12 rounded-full object-cover hover:ring-2 hover:ring-primary transition-all" />
                </Link>

                {/* Info */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                        <div>
                            <Link to={`/creators/${collab.creatorId}`} className="font-medium text-sm text-text-primary dark:text-white hover:text-primary">
                                {collab.creatorName}
                            </Link>
                            <p className="text-xs text-text-secondary dark:text-gray-400">{collab.creatorHandle}</p>
                        </div>
                        {getStatusBadge(collab.status)}
                    </div>

                    <p className="text-xs text-text-secondary dark:text-gray-400 mb-3">
                        Campaign: <Link to={`/campaigns/${collab.campaignId}`} className="text-primary hover:underline">{collab.campaignTitle}</Link>
                    </p>

                    {/* Progress bar */}
                    <div className="mb-3">
                        <div className="flex justify-between text-[10px] mb-1">
                            <span className="text-text-secondary dark:text-gray-400">Deliverables</span>
                            <span className="font-bold text-text-primary dark:text-white">{collab.deliverablesCompleted}/{collab.deliverablesTotal}</span>
                        </div>
                        <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                            <div
                                className={`h-full rounded-full transition-all ${collab.status === 'review' ? 'bg-amber-500' : 'bg-primary'}`}
                                style={{ width: `${collab.progress}%` }}
                            ></div>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div>
                            <p className="text-[10px] text-text-secondary dark:text-gray-500 uppercase">Amount</p>
                            <p className="font-bold text-text-primary dark:text-white">{collab.amount}</p>
                        </div>
                        <div>
                            <p className="text-[10px] text-text-secondary dark:text-gray-500 uppercase">Deadline</p>
                            <p className="font-bold text-text-primary dark:text-white">{collab.deadline}</p>
                        </div>
                        <div>
                            <p className="text-[10px] text-text-secondary dark:text-gray-500 uppercase">Next Milestone</p>
                            <p className="font-bold text-text-primary dark:text-white">{collab.nextMilestone}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2 mt-4 pt-3 border-t border-border-color dark:border-gray-700">
                <Link
                    to={`/collaborations/${collab.id}`}
                    className="flex-1 py-2 text-xs font-medium text-white bg-primary rounded-lg hover:bg-primary-hover flex items-center justify-center gap-1"
                >
                    <span className="material-symbols-outlined text-[16px]">folder_open</span>
                    Open Workroom
                </Link>
                {collab.status === 'review' && (
                    <button className="px-3 py-2 text-xs font-medium text-green-600 bg-green-50 dark:bg-green-900/20 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px]">check</span>
                        Approve Content
                    </button>
                )}
                <Link
                    to="/messages"
                    className="px-3 py-2 text-xs font-medium text-text-primary dark:text-white bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 flex items-center gap-1"
                >
                    <span className="material-symbols-outlined text-[16px]">chat</span>
                    Message
                </Link>
            </div>
        </div>
    );

    return (
        <div className="max-w-4xl mx-auto p-6 pb-20">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-xl font-bold text-text-primary dark:text-white">Active Collaborations</h1>
                    <p className="text-sm text-text-secondary dark:text-gray-400">Manage your ongoing work with creators</p>
                </div>
                <Link to="/applications" className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary-hover">
                    Review Applications
                </Link>
            </div>

            {/* Tabs */}
            <div className="flex gap-1 p-1 bg-gray-100 dark:bg-gray-800 rounded-lg mb-6 w-fit">
                {[
                    { id: 'in_progress', label: 'In Progress', count: inProgressCollabs.length },
                    { id: 'review', label: 'Needs Review', count: reviewCollabs.length },
                    { id: 'completed', label: 'Completed', count: completedCollabs.length },
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

            {/* Collaboration List */}
            <div className="space-y-4">
                {activeTab === 'in_progress' && (
                    inProgressCollabs.length > 0 ? (
                        inProgressCollabs.map(renderCollaborationCard)
                    ) : (
                        <div className="py-12 text-center text-text-secondary dark:text-gray-400">
                            <span className="material-symbols-outlined text-[48px] opacity-50 mb-2">handshake</span>
                            <p>No active collaborations</p>
                            <Link to="/applications" className="text-primary font-medium text-sm hover:underline mt-2 inline-block">
                                Accept Applications
                            </Link>
                        </div>
                    )
                )}

                {activeTab === 'review' && (
                    reviewCollabs.length > 0 ? (
                        reviewCollabs.map(renderCollaborationCard)
                    ) : (
                        <div className="py-12 text-center text-text-secondary dark:text-gray-400">
                            <span className="material-symbols-outlined text-[48px] opacity-50 mb-2">visibility</span>
                            <p>No content pending review</p>
                        </div>
                    )
                )}

                {activeTab === 'completed' && (
                    completedCollabs.length > 0 ? (
                        completedCollabs.map(renderCollaborationCard)
                    ) : (
                        <div className="py-12 text-center text-text-secondary dark:text-gray-400">
                            <span className="material-symbols-outlined text-[48px] opacity-50 mb-2">check_circle</span>
                            <p>No completed collaborations yet</p>
                        </div>
                    )
                )}
            </div>
        </div>
    );
};

export default Collaborations;
