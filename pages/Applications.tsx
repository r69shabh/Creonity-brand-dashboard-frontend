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
                return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 border border-amber-100 dark:border-amber-900/30">Pending</span>;
            case 'accepted':
                return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border border-green-100 dark:border-green-900/30"><span className="material-symbols-outlined text-[12px]">check_circle</span>Accepted</span>;
            case 'rejected':
                return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase bg-gray-50 dark:bg-neutral-800 text-gray-600 dark:text-neutral-400 border border-gray-100 dark:border-neutral-700">Rejected</span>;
            default:
                return null;
        }
    };

    const renderApplicationCard = (app: typeof applications[0]) => (
        <div key={app.id} className="bg-white dark:bg-black rounded-lg border border-gray-200 dark:border-neutral-800 p-5 flex flex-col hover:border-gray-300 dark:hover:border-neutral-700 hover:shadow-sm transition-all duration-200">
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                    <Link to={`/creators/${app.creatorId}`}>
                        <img src={app.creatorAvatar} alt={app.creatorName} className="w-10 h-10 rounded-full object-cover border border-gray-100 dark:border-neutral-800 hover:border-gray-300 dark:hover:border-neutral-600 transition-colors" />
                    </Link>
                    <div>
                        <Link to={`/creators/${app.creatorId}`} className="font-bold text-gray-900 dark:text-white hover:text-black dark:hover:text-gray-200 hover:underline transition-colors text-sm block">
                            {app.creatorName}
                        </Link>
                        <p className="text-xs font-mono text-gray-500 dark:text-neutral-500">{app.creatorHandle}</p>
                    </div>
                </div>
                {getStatusBadge(app.status)}
            </div>

            <div className="flex-1">
                <div className="flex items-center gap-2 mb-3 bg-gray-50 dark:bg-neutral-900 p-2 rounded border border-gray-100 dark:border-neutral-800">
                    <span className="text-[10px] font-bold text-gray-400 dark:text-neutral-500 uppercase tracking-wide">Campaign:</span>
                    <Link to={`/campaigns/${app.campaignId}`} className="text-xs font-bold text-gray-900 dark:text-white hover:underline truncate flex-1">
                        {app.campaignTitle}
                    </Link>
                </div>

                <p className="text-sm text-gray-600 dark:text-neutral-400 mb-4 line-clamp-3 leading-relaxed italic border-l-2 border-gray-200 dark:border-neutral-800 pl-3">
                    "{app.proposal}"
                </p>

                <div className="grid grid-cols-3 gap-2 mb-4">
                    <div className="text-center p-2 bg-gray-50 dark:bg-neutral-900 rounded border border-gray-100 dark:border-neutral-800">
                        <p className="text-[9px] font-mono font-medium text-gray-400 dark:text-neutral-500 uppercase mb-0.5">Bid</p>
                        <p className="font-bold text-xs text-gray-900 dark:text-white">{app.bidAmount}</p>
                    </div>
                    <div className="text-center p-2 bg-gray-50 dark:bg-neutral-900 rounded border border-gray-100 dark:border-neutral-800">
                        <p className="text-[9px] font-mono font-medium text-gray-400 dark:text-neutral-500 uppercase mb-0.5">Followers</p>
                        <p className="font-bold text-xs text-gray-900 dark:text-white">{app.followers}</p>
                    </div>
                    <div className="text-center p-2 bg-gray-50 dark:bg-neutral-900 rounded border border-gray-100 dark:border-neutral-800">
                        <p className="text-[9px] font-mono font-medium text-gray-400 dark:text-neutral-500 uppercase mb-0.5">Engage</p>
                        <p className="font-bold text-xs text-gray-900 dark:text-white">{app.engagementRate}</p>
                    </div>
                </div>
            </div>

            <div className="text-xs text-gray-400 dark:text-neutral-600 font-mono text-right mb-4">
                Applied {app.submittedAt}
            </div>

            {/* Actions */}
            {app.status === 'pending' && (
                <div className="grid grid-cols-2 gap-2 mt-auto pt-4 border-t border-gray-100 dark:border-neutral-800">
                    <button
                        onClick={() => handleAccept(app.id, app.creatorName)}
                        className="col-span-1 py-1.5 text-xs font-bold text-white bg-black dark:bg-white dark:text-black rounded hover:bg-gray-800 dark:hover:bg-gray-200 flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                    >
                        <span className="material-symbols-outlined text-[14px]">check</span>
                        Accept
                    </button>
                    <button
                        onClick={() => handleReject(app.id, app.creatorName)}
                        className="col-span-1 py-1.5 text-xs font-bold text-gray-700 dark:text-gray-300 bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded hover:bg-gray-50 dark:hover:bg-neutral-800 hover:text-red-600 dark:hover:text-red-400 hover:border-red-200 dark:hover:border-red-900/30 flex items-center justify-center gap-1.5 transition-colors"
                    >
                        <span className="material-symbols-outlined text-[14px]">close</span>
                        Reject
                    </button>
                    <Link
                        to={`/creators/${app.creatorId}`}
                        className="col-span-2 py-1.5 text-xs font-bold text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-neutral-900 rounded hover:bg-gray-100 dark:hover:bg-neutral-800 flex items-center justify-center gap-1.5 transition-colors border border-gray-100 dark:border-neutral-800"
                    >
                        View Profile
                    </Link>
                </div>
            )}

            {app.status === 'accepted' && (
                <div className="grid grid-cols-2 gap-2 mt-auto pt-4 border-t border-gray-100 dark:border-neutral-800">
                    <Link
                        to={`/collaborations/${app.campaignId}`}
                        className="col-span-1 py-1.5 text-xs font-bold text-white bg-black dark:bg-white dark:text-black rounded hover:bg-gray-800 dark:hover:bg-gray-200 flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                    >
                        <span className="material-symbols-outlined text-[14px]">handshake</span>
                        Workroom
                    </Link>
                    <Link
                        to={`/messages`}
                        className="col-span-1 py-1.5 text-xs font-bold text-gray-700 dark:text-gray-300 bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded hover:bg-gray-50 dark:hover:bg-neutral-800 flex items-center justify-center gap-1.5 transition-colors"
                    >
                        <span className="material-symbols-outlined text-[14px]">chat</span>
                        Message
                    </Link>
                </div>
            )}
        </div>
    );

    return (
        <div className="max-w-[1600px] mx-auto p-6 lg:p-8">
            {/* Header */}
            <div className="flex items-end justify-between border-b border-gray-200 dark:border-neutral-800 pb-6 mb-8">
                <div>
                    <h1 className="text-3xl font-display font-bold text-gray-900 dark:text-white tracking-tight leading-none">Applications</h1>
                    <p className="text-sm text-gray-500 dark:text-neutral-500 mt-2">Review and manage incoming creator proposals.</p>
                </div>
                <Link to="/creators" className="px-5 py-2.5 text-sm font-bold text-white bg-black dark:bg-white dark:text-black rounded hover:bg-gray-800 dark:hover:bg-gray-200 transition-all shadow-sm flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px]">search</span>
                    Find Creators
                </Link>
            </div>

            {/* Tabs */}
            <div className="flex items-center gap-6 mb-8 border-b border-gray-200 dark:border-neutral-800">
                {[
                    { id: 'pending', label: 'Pending', count: pendingApps.length },
                    { id: 'accepted', label: 'Accepted', count: acceptedApps.length },
                    { id: 'rejected', label: 'Rejected', count: rejectedApps.length },
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

            {/* Application List */}
            <div>
                {activeTab === 'pending' && (
                    pendingApps.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                            {pendingApps.map(renderApplicationCard)}
                        </div>
                    ) : (
                        <div className="py-20 text-center border-2 border-dashed border-gray-200 dark:border-neutral-800 rounded-lg bg-gray-50/50 dark:bg-neutral-900/50">
                            <span className="material-symbols-outlined text-[48px] text-gray-300 dark:text-neutral-700 mb-2">inbox</span>
                            <p className="text-gray-500 dark:text-neutral-500 font-medium">No pending applications</p>
                            <Link to="/creators" className="text-black dark:text-white font-bold text-sm hover:underline mt-2 inline-block">
                                Invite Creators
                            </Link>
                        </div>
                    )
                )}

                {activeTab === 'accepted' && (
                    acceptedApps.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                            {acceptedApps.map(renderApplicationCard)}
                        </div>
                    ) : (
                        <div className="py-20 text-center border-2 border-dashed border-gray-200 dark:border-neutral-800 rounded-lg bg-gray-50/50 dark:bg-neutral-900/50">
                            <span className="material-symbols-outlined text-[48px] text-gray-300 dark:text-neutral-700 mb-2">check_circle</span>
                            <p className="text-gray-500 dark:text-neutral-500 font-medium">No accepted applications yet</p>
                        </div>
                    )
                )}

                {activeTab === 'rejected' && (
                    rejectedApps.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                            {rejectedApps.map(renderApplicationCard)}
                        </div>
                    ) : (
                        <div className="py-20 text-center border-2 border-dashed border-gray-200 dark:border-neutral-800 rounded-lg bg-gray-50/50 dark:bg-neutral-900/50">
                            <span className="material-symbols-outlined text-[48px] text-gray-300 dark:text-neutral-700 mb-2">block</span>
                            <p className="text-gray-500 dark:text-neutral-500 font-medium">No rejected applications</p>
                        </div>
                    )
                )}
            </div>
        </div>
    );
};

export default Applications;
