import React, { useState, useMemo } from 'react';
import { CREATORS } from '../data/mockData';
import { MOCK_CREATOR_STATS, BADGES, CreatorStats, RARITY_THRESHOLDS, getRarityFromEarnings } from '../data/gamificationData';
import Button from '../components/ui/Button';

// Platform icons
const PLATFORM_ICONS: Record<string, { icon: string; color: string; bg: string }> = {
    Instagram: { icon: 'photo_camera', color: 'text-pink-600', bg: 'bg-pink-50 dark:bg-pink-900/20' },
    YouTube: { icon: 'smart_display', color: 'text-red-600', bg: 'bg-red-50 dark:bg-red-900/20' },
    TikTok: { icon: 'music_note', color: 'text-gray-900 dark:text-white', bg: 'bg-gray-100 dark:bg-gray-700' },
    Twitch: { icon: 'live_tv', color: 'text-purple-600', bg: 'bg-purple-50 dark:bg-purple-900/20' },
};

// Follower count options
const FOLLOWER_OPTIONS = [
    { label: 'Any Size', min: 0, max: Infinity },
    { label: '10K - 100K', min: 10000, max: 100000 },
    { label: '100K - 500K', min: 100000, max: 500000 },
    { label: '500K - 1M', min: 500000, max: 1000000 },
    { label: '1M+', min: 1000000, max: Infinity },
];

// Creator Card Component (inline for grid display)
const CreatorGridCard: React.FC<{
    creator: typeof CREATORS[0];
    stats: CreatorStats;
    onInvite: () => void;
}> = ({ creator, stats, onInvite }) => {
    const rarity = getRarityFromEarnings(stats.lifetimeEarnings);
    const rarityConfig = RARITY_THRESHOLDS[rarity];

    // Background styles based on rarity
    const getBackgroundStyle = (): React.CSSProperties => {
        switch (rarity) {
            case 'diamond':
                return { background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)' };
            case 'platinum':
                return { background: 'linear-gradient(135deg, #2d2d44 0%, #3d3d5c 50%, #4d4d6d 100%)' };
            case 'gold':
                return { background: 'linear-gradient(135deg, #1a1a2e 0%, #2d1f0f 50%, #3d2a14 100%)' };
            case 'silver':
                return { background: 'linear-gradient(135deg, #1a1a2e 0%, #2a2a3e 50%, #3a3a4e 100%)' };
            default:
                return { background: 'linear-gradient(135deg, #1a1a2e 0%, #2d1a1a 50%, #3d2424 100%)' };
        }
    };

    return (
        <div
            className="relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:scale-[1.02] shadow-2xl group"
            style={getBackgroundStyle()}
        >
            {/* Noise texture overlay */}
            <div
                className="absolute inset-0 opacity-30 mix-blend-overlay pointer-events-none"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                }}
            />

            {/* Rarity glow effect */}
            <div
                className="absolute inset-0 opacity-10"
                style={{
                    background: `radial-gradient(circle at 50% 80%, ${rarityConfig.color} 0%, transparent 60%)`,
                }}
            />

            {/* Border */}
            <div
                className="absolute inset-0 rounded-2xl pointer-events-none"
                style={{
                    border: `2px solid ${rarityConfig.color}40`,
                    boxShadow: `inset 0 0 30px ${rarityConfig.color}10`,
                }}
            />

            {/* Cover Image */}
            <div className="relative h-36 overflow-hidden">
                <img
                    src={creator.coverImg}
                    alt={creator.name}
                    className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

                {/* Rarity Badge - Top Left */}
                <div
                    className="absolute top-3 left-3 px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 backdrop-blur-sm"
                    style={{
                        backgroundColor: `${rarityConfig.color}20`,
                        color: rarityConfig.color,
                        border: `1px solid ${rarityConfig.color}40`,
                    }}
                >
                    <span>⬥</span>
                    {rarityConfig.label}
                </div>

                {/* Niche - Top Right */}
                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider bg-white/10 text-white/80 backdrop-blur-sm">
                    {creator.niche[0]}
                </div>

                {/* Avatar - Centered in cover */}
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2">
                    <div className="relative">
                        <div
                            className="absolute -inset-2 rounded-full blur-xl opacity-50"
                            style={{ backgroundColor: rarityConfig.color }}
                        />
                        <img
                            src={creator.avatar}
                            alt={creator.name}
                            className="relative w-20 h-20 rounded-full object-cover shadow-2xl"
                            style={{
                                border: `3px solid ${rarityConfig.color}`,
                                boxShadow: `0 0 20px ${rarityConfig.color}40`,
                            }}
                        />
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="relative pt-12 pb-4 px-4">
                {/* Name & Handle */}
                <h3 className="text-white font-bold text-base text-center mb-0.5">{creator.name}</h3>
                <p className="text-white/50 text-xs text-center mb-3">
                    {creator.handle} • {creator.location}
                </p>

                {/* Bio */}
                <p className="text-white/60 text-xs text-center line-clamp-2 mb-4 min-h-[32px]">
                    {creator.bio}
                </p>

                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-2 text-center mb-4">
                    <div>
                        <p className="text-white/50 text-[9px] uppercase tracking-wider">Followers</p>
                        <p className="text-white font-bold text-sm">{creator.followers}</p>
                    </div>
                    <div>
                        <p className="text-white/50 text-[9px] uppercase tracking-wider">Engagement</p>
                        <p className="text-white font-bold text-sm">{creator.engagementRate}</p>
                    </div>
                    <div>
                        <p className="text-white/50 text-[9px] uppercase tracking-wider">Campaigns</p>
                        <p className="text-white font-bold text-sm">{creator.pastCampaigns}</p>
                    </div>
                </div>

                {/* Streak / Rating */}
                {stats.currentStreak > 0 && (
                    <div className="flex items-center justify-center gap-1.5 mb-4">
                        <span className="text-orange-500">🔥</span>
                        <span className="text-white/70 text-xs">{stats.currentStreak} campaign streak</span>
                        <span className="text-yellow-400 ml-2">★</span>
                        <span className="text-white/70 text-xs">{stats.avgRating}</span>
                    </div>
                )}

                {/* Footer */}
                <div className="flex items-center justify-between pt-3 border-t border-white/10">
                    {/* Platforms */}
                    <div className="flex items-center gap-1">
                        {creator.platforms.slice(0, 3).map((p) => {
                            const style = PLATFORM_ICONS[p] || PLATFORM_ICONS['Instagram'];
                            return (
                                <div
                                    key={p}
                                    className={`size-7 rounded-md ${style.bg} ${style.color} flex items-center justify-center`}
                                    title={p}
                                >
                                    <span className="material-symbols-outlined text-[14px]">{style.icon}</span>
                                </div>
                            );
                        })}
                    </div>

                    {/* Rate */}
                    <span className="text-sm font-bold text-green-400">
                        {creator.rate}
                    </span>
                </div>
            </div>

            {/* Hover Overlay with CTA */}
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
                <button
                    onClick={(e) => { e.stopPropagation(); onInvite(); }}
                    className="px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-hover transition-colors flex items-center gap-1.5"
                >
                    <span className="material-symbols-outlined text-[16px]">mail</span>
                    Invite
                </button>
                <button className="px-3 py-2 bg-white/10 text-white text-sm font-medium rounded-lg hover:bg-white/20 transition-colors">
                    <span className="material-symbols-outlined text-[16px]">bookmark</span>
                </button>
            </div>
        </div>
    );
};

const Creators: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeFilterDropdown, setActiveFilterDropdown] = useState<string | null>(null);

    const [filters, setFilters] = useState({
        niche: [] as string[],
        platform: [] as string[],
        followerRange: { min: 0, max: Infinity },
    });

    const toggleFilter = (type: 'niche' | 'platform', value: string) => {
        setFilters(prev => {
            const current = prev[type];
            const updated = current.includes(value)
                ? current.filter(item => item !== value)
                : [...current, value];
            return { ...prev, [type]: updated };
        });
    };

    const creators = useMemo(() => {
        return CREATORS.filter(creator => {
            const matchesSearch = creator.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                creator.handle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                creator.niche.some(n => n.toLowerCase().includes(searchTerm.toLowerCase()));

            const matchesNiche = filters.niche.length === 0 || filters.niche.some(n => creator.niche.includes(n));
            const matchesPlatform = filters.platform.length === 0 || filters.platform.some(p => creator.platforms.includes(p));
            const matchesFollowers = creator.followersNum >= filters.followerRange.min && creator.followersNum <= filters.followerRange.max;

            return matchesSearch && matchesNiche && matchesPlatform && matchesFollowers;
        });
    }, [searchTerm, filters]);

    const toggleDropdown = (name: string) => {
        setActiveFilterDropdown(activeFilterDropdown === name ? null : name);
    };

    const getActiveFilterCount = () => {
        let count = 0;
        if (filters.niche.length > 0) count++;
        if (filters.platform.length > 0) count++;
        if (filters.followerRange.min > 0 || filters.followerRange.max < Infinity) count++;
        return count;
    };

    const clearAllFilters = () => {
        setFilters({ niche: [], platform: [], followerRange: { min: 0, max: Infinity } });
        setSearchTerm('');
    };

    const getCreatorStats = (creatorId: string): CreatorStats => {
        return MOCK_CREATOR_STATS[creatorId]?.stats || { lifetimeEarnings: 10000, totalCampaigns: 10, winRate: 25, avgRating: 4.5, currentStreak: 2, repeatBrandRate: 20, avgDeliverySpeed: 10 };
    };

    const FilterButton: React.FC<{ label: string; name: string; count?: number; children?: React.ReactNode }> = ({ label, name, count, children }) => (
        <div className="relative">
            <button
                onClick={() => toggleDropdown(name)}
                className={`h-10 px-4 rounded-lg border text-sm font-medium flex items-center gap-2 transition-all ${activeFilterDropdown === name || (count && count > 0)
                    ? 'bg-primary/10 text-primary border-primary/30 dark:bg-primary/20'
                    : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-text-secondary dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'}`}
            >
                {label}
                {count !== undefined && count > 0 && (
                    <span className="bg-primary text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center">{count}</span>
                )}
                <span className={`material-symbols-outlined text-[18px] transition-transform ${activeFilterDropdown === name ? 'rotate-180' : ''}`}>expand_more</span>
            </button>

            {activeFilterDropdown === name && (
                <>
                    <div className="fixed inset-0 z-10" onClick={() => setActiveFilterDropdown(null)}></div>
                    <div className="absolute top-full left-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-xl shadow-float border border-gray-200 dark:border-gray-700 p-3 z-20 animate-in fade-in zoom-in-95 duration-100">
                        {children}
                    </div>
                </>
            )}
        </div>
    );

    return (
        <div className="flex flex-col h-full max-w-[1600px] mx-auto p-6 lg:p-8 overflow-hidden">
            {/* Header */}
            <div className="mb-6 shrink-0">
                <h1 className="text-2xl md:text-3xl font-display font-bold text-text-primary dark:text-white mb-1">Find Creators</h1>
                <p className="text-sm text-text-secondary dark:text-gray-400">Discover talented creators for your campaigns.</p>
            </div>

            {/* Search & Filters */}
            <div className="flex flex-col gap-4 mb-6 shrink-0 z-20">
                <div className="relative max-w-2xl">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                        <span className="material-symbols-outlined text-[20px]">search</span>
                    </span>
                    <input
                        type="text"
                        placeholder="Search by name, handle, or niche..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full h-11 pl-11 pr-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-text-primary dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none text-sm placeholder-gray-400"
                    />
                </div>

                <div className="flex flex-wrap items-center gap-2">
                    <FilterButton label="Niche" name="niche" count={filters.niche.length}>
                        <div className="space-y-0.5 max-h-64 overflow-y-auto">
                            {['Tech', 'Gaming', 'Lifestyle', 'Fashion', 'Food & Drink', 'Health & Fitness', 'Beauty', 'Travel', 'SaaS'].map(opt => (
                                <label key={opt} className="flex items-center gap-2.5 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 p-2 rounded-lg transition-colors">
                                    <input
                                        type="checkbox"
                                        checked={filters.niche.includes(opt)}
                                        onChange={() => toggleFilter('niche', opt)}
                                        className="rounded text-primary focus:ring-primary border-gray-300 dark:border-gray-600 dark:bg-gray-700 w-4 h-4"
                                    />
                                    <span className="text-sm text-text-primary dark:text-gray-200">{opt}</span>
                                </label>
                            ))}
                        </div>
                    </FilterButton>

                    <FilterButton label="Platform" name="platform" count={filters.platform.length}>
                        <div className="space-y-0.5">
                            {Object.entries(PLATFORM_ICONS).map(([platform, style]) => (
                                <label key={platform} className="flex items-center gap-2.5 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 p-2 rounded-lg transition-colors">
                                    <input
                                        type="checkbox"
                                        checked={filters.platform.includes(platform)}
                                        onChange={() => toggleFilter('platform', platform)}
                                        className="rounded text-primary focus:ring-primary border-gray-300 dark:border-gray-600 dark:bg-gray-700 w-4 h-4"
                                    />
                                    <div className={`size-6 rounded-md ${style.bg} ${style.color} flex items-center justify-center`}>
                                        <span className="material-symbols-outlined text-[14px]">{style.icon}</span>
                                    </div>
                                    <span className="text-sm text-text-primary dark:text-gray-200">{platform}</span>
                                </label>
                            ))}
                        </div>
                    </FilterButton>

                    <FilterButton label="Followers" name="followers" count={filters.followerRange.min > 0 || filters.followerRange.max < Infinity ? 1 : 0}>
                        <div className="space-y-0.5">
                            {FOLLOWER_OPTIONS.map(opt => (
                                <label key={opt.label} className="flex items-center gap-2.5 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 p-2 rounded-lg transition-colors">
                                    <input
                                        type="radio"
                                        name="followers"
                                        checked={filters.followerRange.min === opt.min && filters.followerRange.max === opt.max}
                                        onChange={() => setFilters({ ...filters, followerRange: { min: opt.min, max: opt.max } })}
                                        className="text-primary focus:ring-primary border-gray-300 dark:border-gray-600 dark:bg-gray-700 w-4 h-4"
                                    />
                                    <span className="text-sm text-text-primary dark:text-gray-200">{opt.label}</span>
                                </label>
                            ))}
                        </div>
                    </FilterButton>

                    {getActiveFilterCount() > 0 && (
                        <button
                            onClick={clearAllFilters}
                            className="h-10 px-3 text-sm text-gray-500 font-medium hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors flex items-center gap-1"
                        >
                            <span className="material-symbols-outlined text-[16px]">close</span>
                            Clear all
                        </button>
                    )}
                </div>
            </div>

            {/* Results count */}
            <div className="flex items-center justify-between mb-4 shrink-0">
                <p className="text-sm text-text-secondary dark:text-gray-400">
                    Showing <span className="font-bold text-text-primary dark:text-white">{creators.length}</span> creators
                </p>
            </div>

            {/* Grid - Premium Cards */}
            <div className="flex-1 overflow-y-auto pb-8">
                {creators.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
                        {creators.map((creator) => (
                            <CreatorGridCard
                                key={creator.id}
                                creator={creator}
                                stats={getCreatorStats(creator.id)}
                                onInvite={() => console.log('Invite', creator.name)}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center h-80 text-center">
                        <div className="size-16 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4">
                            <span className="material-symbols-outlined text-3xl text-gray-400 dark:text-gray-500">search_off</span>
                        </div>
                        <h3 className="text-lg font-bold text-text-primary dark:text-white mb-2">No Creators Found</h3>
                        <p className="text-sm text-text-secondary dark:text-gray-400 max-w-sm mb-4">
                            Try adjusting your filters or search terms to find more creators.
                        </p>
                        <Button variant="secondary" onClick={clearAllFilters}>
                            Clear All Filters
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Creators;
