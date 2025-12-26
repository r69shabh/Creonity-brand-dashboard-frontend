import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApplications } from '../context/ApplicationContext';
import { useToast } from '../context/ToastContext';

type Tab = 'pending' | 'accepted' | 'rejected';

const Applications: React.FC = () => {
    const [activeTab, setActiveTab] = useState<Tab>('pending');
    const { applications, acceptApplication, rejectApplication } = useApplications();
    const { addToast } = useToast();

    const pendingApps = applications.filter(a => a.status === 'pending');
    const acceptedApps = applications.filter(a => a.status === 'accepted');
    const rejectedApps = applications.filter(a => a.status === 'rejected');

    const handleAccept = (id: string, creatorName: string) => {
        acceptApplication(id);
        addToast(`Accepted ${creatorName}'s application!`, 'success');
    };

    const handleReject = (id: string, creatorName: string) => {
        if (window.confirm(`Reject ${creatorName}'s application?`)) {
            rejectApplication(id);
            addToast(`Rejected ${creatorName}'s application`, 'info');
        }
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'pending':
                return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400">Pending</span>;
            case 'accepted':
                return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"><span className="material-symbols-outlined text-[12px]">check_circle</span>Accepted</span>;
            case 'rejected':
                return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400">Rejected</span>;
            default:
                return null;
        }
    };

    const renderApplicationCard = (app: typeof applications[0]) => (
        <div key={app.id} className="bg-white dark:bg-gray-800 rounded-xl border border-border-color dark:border-gray-700 p-4">
            <div className="flex items-start gap-4">
                {/* Creator Avatar */}
                <Link to={`/creators/${app.creatorId}`}>
                    <img src={app.creatorAvatar} alt={app.creatorName} className="w-12 h-12 rounded-full object-cover hover:ring-2 hover:ring-primary transition-all" />
                </Link>

                {/* Info */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                        <div>
                            <Link to={`/creators/${app.creatorId}`} className="font-medium text-sm text-text-primary dark:text-white hover:text-primary">
                                {app.creatorName}
                            </Link>
                            <p className="text-xs text-text-secondary dark:text-gray-400">{app.creatorHandle}</p>
                        </div>
                        {getStatusBadge(app.status)}
                    </div>

                    <p className="text-xs text-text-secondary dark:text-gray-400 mb-2">
                        Applied to: <Link to={`/campaigns/${app.campaignId}`} className="text-primary hover:underline">{app.campaignTitle}</Link>
                    </p>

                    <p className="text-sm text-text-primary dark:text-gray-300 mb-3 line-clamp-2">
                        "{app.proposal}"
                    </p>

                    <div className="flex items-center gap-4">
                        <div>
                            <p className="text-[10px] text-text-secondary dark:text-gray-500 uppercase">Bid Amount</p>
                            <p className="font-bold text-text-primary dark:text-white">{app.bidAmount}</p>
                        </div>
                        <div>
                            <p className="text-[10px] text-text-secondary dark:text-gray-500 uppercase">Followers</p>
                            <p className="font-bold text-text-primary dark:text-white">{app.followers}</p>
                        </div>
                        <div>
                            <p className="text-[10px] text-text-secondary dark:text-gray-500 uppercase">Engagement</p>
                            <p className="font-bold text-text-primary dark:text-white">{app.engagementRate}</p>
                        </div>
                        <div className="ml-auto text-right">
                            <p className="text-[10px] text-text-secondary dark:text-gray-500">{app.submittedAt}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Actions */}
            {app.status === 'pending' && (
                <div className="flex gap-2 mt-4 pt-3 border-t border-border-color dark:border-gray-700">
                    <button
                        onClick={() => handleAccept(app.id, app.creatorName)}
                        className="flex-1 py-2 text-xs font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 flex items-center justify-center gap-1"
                    >
                        <span className="material-symbols-outlined text-[16px]">check</span>
                        Accept
                    </button>
                    <button
                        onClick={() => handleReject(app.id, app.creatorName)}
                        className="flex-1 py-2 text-xs font-medium text-red-600 bg-red-50 dark:bg-red-900/20 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 flex items-center justify-center gap-1"
                    >
                        <span className="material-symbols-outlined text-[16px]">close</span>
                        Reject
                    </button>
                    <Link
                        to={`/creators/${app.creatorId}`}
                        className="px-3 py-2 text-xs font-medium text-text-primary dark:text-white bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600"
                    >
                        View Profile
                    </Link>
                </div>
            )}

            {app.status === 'accepted' && (
                <div className="flex gap-2 mt-4 pt-3 border-t border-border-color dark:border-gray-700">
                    <Link
                        to={`/collaborations/${app.campaignId}`}
                        className="flex-1 py-2 text-xs font-medium text-white bg-primary rounded-lg hover:bg-primary-hover flex items-center justify-center gap-1"
                    >
                        <span className="material-symbols-outlined text-[16px]">handshake</span>
                        View Collaboration
                    </Link>
                    <Link
                        to={`/messages`}
                        className="px-3 py-2 text-xs font-medium text-text-primary dark:text-white bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 flex items-center gap-1"
                    >
                        <span className="material-symbols-outlined text-[16px]">chat</span>
                        Message
                    </Link>
                </div>
            )}
        </div>
    );

    return (
        <div className="max-w-4xl mx-auto p-6 pb-20">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-xl font-bold text-text-primary dark:text-white">Applications</h1>
                    <p className="text-sm text-text-secondary dark:text-gray-400">Review creator applications for your campaigns</p>
                </div>
                <Link to="/creators" className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary-hover">
                    Find Creators
                </Link>
            </div>

            {/* Tabs */}
            <div className="flex gap-1 p-1 bg-gray-100 dark:bg-gray-800 rounded-lg mb-6 w-fit">
                {[
                    { id: 'pending', label: 'Pending', count: pendingApps.length },
                    { id: 'accepted', label: 'Accepted', count: acceptedApps.length },
                    { id: 'rejected', label: 'Rejected', count: rejectedApps.length },
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

            {/* Application List */}
            <div className="space-y-4">
                {activeTab === 'pending' && (
                    pendingApps.length > 0 ? (
                        pendingApps.map(renderApplicationCard)
                    ) : (
                        <div className="py-12 text-center text-text-secondary dark:text-gray-400">
                            <span className="material-symbols-outlined text-[48px] opacity-50 mb-2">inbox</span>
                            <p>No pending applications</p>
                            <Link to="/creators" className="text-primary font-medium text-sm hover:underline mt-2 inline-block">
                                Invite Creators
                            </Link>
                        </div>
                    )
                )}

                {activeTab === 'accepted' && (
                    acceptedApps.length > 0 ? (
                        acceptedApps.map(renderApplicationCard)
                    ) : (
                        <div className="py-12 text-center text-text-secondary dark:text-gray-400">
                            <span className="material-symbols-outlined text-[48px] opacity-50 mb-2">check_circle</span>
                            <p>No accepted applications yet</p>
                        </div>
                    )
                )}

                {activeTab === 'rejected' && (
                    rejectedApps.length > 0 ? (
                        rejectedApps.map(renderApplicationCard)
                    ) : (
                        <div className="py-12 text-center text-text-secondary dark:text-gray-400">
                            <span className="material-symbols-outlined text-[48px] opacity-50 mb-2">block</span>
                            <p>No rejected applications</p>
                        </div>
                    )
                )}
            </div>
        </div>
    );
};

export default Applications;
