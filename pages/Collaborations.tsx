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
                return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 border border-blue-100 dark:border-blue-900/30"><span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />In Progress</span>;
            case 'review':
                return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 border border-amber-100 dark:border-amber-900/30"><span className="material-symbols-outlined text-[12px]">visibility</span>Needs Review</span>;
            case 'completed':
                return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border border-green-100 dark:border-green-900/30"><span className="material-symbols-outlined text-[12px]">check_circle</span>Completed</span>;
            default:
                return null;
        }
    };

    const renderCollaborationCard = (collab: typeof ACTIVE_COLLABORATIONS[0]) => (
        <div key={collab.id} className="bg-white dark:bg-black rounded-lg border border-gray-200 dark:border-neutral-800 p-5 hover:border-gray-300 dark:hover:border-neutral-700 hover:shadow-sm transition-all duration-200 flex flex-col h-full">
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                    <Link to={`/creators/${collab.creatorId}`}>
                        <img src={collab.creatorAvatar} alt={collab.creatorName} className="w-10 h-10 rounded-full object-cover border border-gray-100 dark:border-neutral-800 hover:border-gray-300 dark:hover:border-neutral-600 transition-colors" />
                    </Link>
                    <div>
                        <Link to={`/creators/${collab.creatorId}`} className="font-bold text-gray-900 dark:text-white hover:text-black dark:hover:text-gray-200 hover:underline transition-colors text-sm block">
                            {collab.creatorName}
                        </Link>
                        <p className="text-xs font-mono text-gray-500 dark:text-neutral-500">{collab.creatorHandle}</p>
                    </div>
                </div>
                {getStatusBadge(collab.status)}
            </div>

            <div className="flex-1">
                <div className="flex items-center gap-2 mb-4 bg-gray-50 dark:bg-neutral-900 p-2 rounded border border-gray-100 dark:border-neutral-800">
                    <span className="text-[10px] font-bold text-gray-400 dark:text-neutral-500 uppercase tracking-wide">Campaign:</span>
                    <Link to={`/campaigns/${collab.campaignId}`} className="text-xs font-bold text-gray-900 dark:text-white hover:underline truncate">
                        {collab.campaignTitle}
                    </Link>
                </div>

                {/* Progress bar */}
                <div className="mb-4">
                    <div className="flex justify-between text-[10px] font-bold uppercase tracking-wide mb-1.5">
                        <span className="text-gray-500 dark:text-neutral-500">Deliverables</span>
                        <span className="text-gray-900 dark:text-white">{collab.deliverablesCompleted} / {collab.deliverablesTotal}</span>
                    </div>
                    <div className="h-1.5 bg-gray-100 dark:bg-neutral-800 rounded-full overflow-hidden">
                        <div
                            className={`h-full rounded-full transition-all duration-500 ${collab.status === 'review' ? 'bg-amber-500' : 'bg-black dark:bg-white'}`}
                            style={{ width: `${collab.progress}%` }}
                        ></div>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-2">
                    <div className="bg-gray-50 dark:bg-neutral-900 p-2 rounded border border-gray-100 dark:border-neutral-800">
                        <p className="text-[9px] font-mono font-medium text-gray-400 dark:text-neutral-500 uppercase mb-0.5">Deadline</p>
                        <p className="font-bold text-xs text-gray-900 dark:text-white">{collab.deadline}</p>
                    </div>
                    <div className="bg-gray-50 dark:bg-neutral-900 p-2 rounded border border-gray-100 dark:border-neutral-800">
                        <p className="text-[9px] font-mono font-medium text-gray-400 dark:text-neutral-500 uppercase mb-0.5">Next Step</p>
                        <p className="font-bold text-xs text-gray-900 dark:text-white truncate" title={collab.nextMilestone}>{collab.nextMilestone}</p>
                    </div>
                </div>
            </div>

            {/* Actions */}
            <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-gray-100 dark:border-neutral-800">
                <Link
                    to={`/collaborations/${collab.id}`}
                    className="col-span-1 py-1.5 text-xs font-bold text-white bg-black dark:bg-white dark:text-black rounded hover:bg-gray-800 dark:hover:bg-gray-200 flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                >
                    <span className="material-symbols-outlined text-[14px]">folder_open</span>
                    Workroom
                </Link>
                {collab.status === 'review' ? (
                    <button className="col-span-1 py-1.5 text-xs font-bold text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-900/20 rounded border border-green-100 dark:border-green-900/30 hover:bg-green-100 dark:hover:bg-green-900/30 flex items-center justify-center gap-1.5 transition-colors">
                        <span className="material-symbols-outlined text-[14px]">check</span>
                        Approve
                    </button>
                ) : (
                    <Link
                        to="/messages"
                        className="col-span-1 py-1.5 text-xs font-bold text-gray-700 dark:text-gray-300 bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded hover:bg-gray-50 dark:hover:bg-neutral-800 flex items-center justify-center gap-1.5 transition-colors"
                    >
                        <span className="material-symbols-outlined text-[14px]">chat</span>
                        Message
                    </Link>
                )}
            </div>
        </div>
    );

    return (
        <div className="max-w-[1600px] mx-auto p-6 lg:p-8 pb-20">
            {/* Header */}
            <div className="flex items-end justify-between border-b border-gray-200 dark:border-neutral-800 pb-6 mb-8">
                <div>
                    <h1 className="text-3xl font-display font-bold text-gray-900 dark:text-white tracking-tight leading-none">Active Collaborations</h1>
                    <p className="text-sm text-gray-500 dark:text-neutral-500 mt-2">Track and manage ongoing influencer partnerships.</p>
                </div>
                <Link to="/applications" className="px-5 py-2.5 text-sm font-bold text-white bg-black dark:bg-white dark:text-black rounded hover:bg-gray-800 dark:hover:bg-gray-200 transition-all shadow-sm flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px]">assignment_ind</span>
                    Review Applications
                </Link>
            </div>

            {/* Tabs */}
            <div className="flex items-center gap-6 mb-8 border-b border-gray-200 dark:border-neutral-800">
                {[
                    { id: 'in_progress', label: 'In Progress', count: inProgressCollabs.length },
                    { id: 'review', label: 'Needs Review', count: reviewCollabs.length },
                    { id: 'completed', label: 'Completed', count: completedCollabs.length },
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

            {/* Collaboration List */}
            <div className="min-h-[400px]">
                {activeTab === 'in_progress' && (
                    inProgressCollabs.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                            {inProgressCollabs.map(renderCollaborationCard)}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-64 text-center border-2 border-dashed border-gray-200 dark:border-neutral-800 rounded-lg bg-gray-50/50 dark:bg-neutral-900/50">
                            <span className="material-symbols-outlined text-[40px] text-gray-300 dark:text-neutral-700 mb-2">handshake</span>
                            <p className="text-gray-500 dark:text-neutral-500 font-medium">No active collaborations</p>
                            <Link to="/applications" className="text-black dark:text-white font-bold text-xs hover:underline mt-2">
                                Accept Applications
                            </Link>
                        </div>
                    )
                )}

                {activeTab === 'review' && (
                    reviewCollabs.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                            {reviewCollabs.map(renderCollaborationCard)}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-64 text-center border-2 border-dashed border-gray-200 dark:border-neutral-800 rounded-lg bg-gray-50/50 dark:bg-neutral-900/50">
                            <span className="material-symbols-outlined text-[40px] text-gray-300 dark:text-neutral-700 mb-2">visibility_off</span>
                            <p className="text-gray-500 dark:text-neutral-500 font-medium">No content pending review</p>
                        </div>
                    )
                )}

                {activeTab === 'completed' && (
                    completedCollabs.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                            {completedCollabs.map(renderCollaborationCard)}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-64 text-center border-2 border-dashed border-gray-200 dark:border-neutral-800 rounded-lg bg-gray-50/50 dark:bg-neutral-900/50">
                            <span className="material-symbols-outlined text-[40px] text-gray-300 dark:text-neutral-700 mb-2">check_circle_outline</span>
                            <p className="text-gray-500 dark:text-neutral-500 font-medium">No completed collaborations yet</p>
                        </div>
                    )
                )}
            </div>
        </div>
    );
};

export default Collaborations;
