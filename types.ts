
export interface NavItem {
    icon: string;
    label: string;
    path: string;
    badge?: string;
    badgeColor?: string;
}

export interface DriveFolder {
    color: string;
    label: string;
    count: number;
}

// Brand-specific navigation
export const NAV_ITEMS: NavItem[] = [
    { icon: 'dashboard', label: 'Dashboard', path: '/' },
    { icon: 'group', label: 'Find Creators', path: '/creators', badge: 'New', badgeColor: 'bg-brand-teal text-brand-navy' },
    { icon: 'campaign', label: 'Campaigns', path: '/campaigns' },
    { icon: 'inbox', label: 'Applications', path: '/applications', badge: '8', badgeColor: 'bg-brand-teal text-white' },
    { icon: 'handshake', label: 'Collaborations', path: '/collaborations' },
    { icon: 'chat', label: 'Messages', path: '/messages', badge: '3', badgeColor: 'bg-brand-teal text-white' },
    { icon: 'analytics', label: 'Analytics', path: '/analytics' },
    { icon: 'account_balance_wallet', label: 'Wallet', path: '/wallet' },
];

export const DRIVE_FOLDERS: DriveFolder[] = [
    { color: 'text-brand-blue', label: 'Contracts', count: 12 },
    { color: 'text-accent-teal', label: 'Media Assets', count: 45 },
    { color: 'text-purple-500', label: 'Brand Guidelines', count: 8 },
    { color: 'text-green-500', label: 'Invoices', count: 24 },
];

export const BRAND_AVATAR = "https://ui-avatars.com/api/?name=Acme+Corp&background=075CD1&color=fff&size=128";

export const BRAND_LOGO = "/logo.png";
