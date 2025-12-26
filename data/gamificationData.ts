// Gamification Types and Data for Brand Dashboard

export type CardRarity = 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond';

export interface CreatorStats {
    lifetimeEarnings: number;
    totalCampaigns: number;
    winRate: number; // percentage
    avgRating: number; // out of 5
    currentStreak: number;
    repeatBrandRate: number; // percentage
    avgDeliverySpeed: number; // percentage faster than deadline
}

export interface Badge {
    id: string;
    name: string;
    icon: string;
    description: string;
    rarity: 'common' | 'rare' | 'epic' | 'legendary';
    earned?: boolean;
    earnedDate?: string;
}

// Rarity thresholds based on earnings
export const RARITY_THRESHOLDS: Record<CardRarity, { min: number; max: number; label: string; color: string }> = {
    bronze: { min: 0, max: 5000, label: 'Bronze', color: '#CD7F32' },
    silver: { min: 5000, max: 25000, label: 'Silver', color: '#C0C0C0' },
    gold: { min: 25000, max: 100000, label: 'Gold', color: '#FFD700' },
    platinum: { min: 100000, max: 500000, label: 'Platinum', color: '#E5E4E2' },
    diamond: { min: 500000, max: Infinity, label: 'Diamond', color: '#B9F2FF' },
};

export const getRarityFromEarnings = (earnings: number): CardRarity => {
    if (earnings >= 500000) return 'diamond';
    if (earnings >= 100000) return 'platinum';
    if (earnings >= 25000) return 'gold';
    if (earnings >= 5000) return 'silver';
    return 'bronze';
};

// Badge definitions
export const BADGES: Badge[] = [
    // Earnings
    { id: 'first-1k', name: 'First $1K', icon: '💰', description: 'Earned first $1,000', rarity: 'common' },
    { id: '10k-club', name: '$10K Club', icon: '💎', description: 'Earned $10,000 lifetime', rarity: 'rare' },
    { id: '50k-club', name: '$50K Club', icon: '🏆', description: 'Earned $50,000 lifetime', rarity: 'epic' },
    { id: '100k-legend', name: '$100K Legend', icon: '👑', description: 'Earned $100,000 lifetime', rarity: 'legendary' },

    // Win Rate
    { id: 'sharpshooter', name: 'Sharpshooter', icon: '🎯', description: '50%+ bid win rate', rarity: 'rare' },
    { id: 'undefeated', name: 'Undefeated', icon: '🔥', description: '10 campaign wins in a row', rarity: 'epic' },

    // Quality
    { id: 'five-star-streak', name: '5-Star Streak', icon: '⭐', description: '5 perfect reviews in a row', rarity: 'rare' },
    { id: 'brand-favorite', name: 'Brand Favorite', icon: '❤️', description: 'Hired by same brand 3+ times', rarity: 'epic' },
    { id: 'speed-demon', name: 'Speed Demon', icon: '⚡', description: 'Delivered 50% faster', rarity: 'rare' },
];

// Mock creator stats for detail view
export const MOCK_CREATOR_STATS: Record<string, { stats: CreatorStats; badges: string[] }> = {
    '1': {
        stats: { lifetimeEarnings: 156200, totalCampaigns: 89, winRate: 45, avgRating: 4.9, currentStreak: 12, repeatBrandRate: 48, avgDeliverySpeed: 22 },
        badges: ['100k-legend', '50k-club', '10k-club', 'sharpshooter', 'undefeated']
    },
    '2': {
        stats: { lifetimeEarnings: 42800, totalCampaigns: 34, winRate: 42, avgRating: 4.8, currentStreak: 8, repeatBrandRate: 41, avgDeliverySpeed: 18 },
        badges: ['10k-club', 'five-star-streak', 'brand-favorite']
    },
    '3': {
        stats: { lifetimeEarnings: 98500, totalCampaigns: 54, winRate: 38, avgRating: 4.9, currentStreak: 5, repeatBrandRate: 35, avgDeliverySpeed: 25 },
        badges: ['50k-club', '10k-club', 'five-star-streak', 'speed-demon']
    },
    '4': {
        stats: { lifetimeEarnings: 28450, totalCampaigns: 24, winRate: 28, avgRating: 4.9, currentStreak: 5, repeatBrandRate: 35, avgDeliverySpeed: 15 },
        badges: ['10k-club', 'first-1k', 'five-star-streak', 'sharpshooter']
    },
    '5': {
        stats: { lifetimeEarnings: 15200, totalCampaigns: 18, winRate: 32, avgRating: 4.7, currentStreak: 3, repeatBrandRate: 28, avgDeliverySpeed: 12 },
        badges: ['10k-club', 'first-1k', 'brand-favorite']
    },
    '6': {
        stats: { lifetimeEarnings: 8400, totalCampaigns: 12, winRate: 35, avgRating: 4.6, currentStreak: 2, repeatBrandRate: 22, avgDeliverySpeed: 10 },
        badges: ['first-1k', 'speed-demon']
    },
};
