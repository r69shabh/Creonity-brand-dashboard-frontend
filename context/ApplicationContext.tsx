import React, { createContext, useContext, useState, ReactNode } from 'react';
import { APPLICATIONS } from '../data/mockData';

export interface Application {
    id: string;
    creatorId: string;
    creatorName: string;
    creatorHandle: string;
    creatorAvatar: string;
    campaignId: string;
    campaignTitle: string;
    bidAmount: string;
    bidAmountNum: number;
    proposal: string;
    status: 'pending' | 'accepted' | 'rejected';
    submittedAt: string;
    followers: string;
    engagementRate: string;
}

interface ApplicationContextType {
    applications: Application[];
    acceptApplication: (id: string) => void;
    rejectApplication: (id: string) => void;
    getPendingCount: () => number;
}

const ApplicationContext = createContext<ApplicationContextType | undefined>(undefined);

export const ApplicationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [applications, setApplications] = useState<Application[]>(APPLICATIONS as Application[]);

    const acceptApplication = (id: string) => {
        setApplications(prev => prev.map(app =>
            app.id === id ? { ...app, status: 'accepted' as const } : app
        ));
    };

    const rejectApplication = (id: string) => {
        setApplications(prev => prev.map(app =>
            app.id === id ? { ...app, status: 'rejected' as const } : app
        ));
    };

    const getPendingCount = () => {
        return applications.filter(app => app.status === 'pending').length;
    };

    return (
        <ApplicationContext.Provider value={{ applications, acceptApplication, rejectApplication, getPendingCount }}>
            {children}
        </ApplicationContext.Provider>
    );
};

export const useApplications = () => {
    const context = useContext(ApplicationContext);
    if (!context) throw new Error('useApplications must be used within an ApplicationProvider');
    return context;
};
