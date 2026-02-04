import React, { useState, useMemo } from 'react';
import { CREATORS } from '../data/mockData';
import { MOCK_CREATOR_STATS, CreatorStats } from '../data/gamificationData';
import Button from '../components/ui/Button';

// Platform icons
const PLATFORM_ICONS: Record<string, { icon: string; color: string; bg: string; darkBg: string; darkColor: string }> = {
    Instagram: { icon: 'photo_camera', color: 'text-pink-600', bg: 'bg-pink-50', darkBg: 'dark:bg-pink-900/20', darkColor: 'dark:text-pink-400' },
    YouTube: { icon: 'smart_display', color: 'text-red-600', bg: 'bg-red-50', darkBg: 'dark:bg-red-900/20', darkColor: 'dark:text-red-400' },
    TikTok: { icon: 'music_note', color: 'text-black', bg: 'bg-gray-100', darkBg: 'dark:bg-neutral-800', darkColor: 'dark:text-white' },
    Twitch: { icon: 'live_tv', color: 'text-purple-600', bg: 'bg-purple-50', darkBg: 'dark:bg-purple-900/20', darkColor: 'dark:text-purple-400' },
};

// Follower count options
const FOLLOWER_OPTIONS = [
    { label: 'Any Size', min: 0, max: Infinity },
    { label: '10K - 100K', min: 10000, max: 100000 },
    { label: '100K - 500K', min: 100000, max: 500000 },
    { label: '500K - 1M', min: 500000, max: 1000000 },
    { label: '1M+', min: 1000000, max: Infinity },
];

// Creator Card Component
const CreatorGridCard: React.FC<{
    creator: typeof CREATORS[0];
    stats: CreatorStats;
    onInvite: () => void;
}> = ({ creator, stats, onInvite }) => {
    return (
        <div className="group bg-white dark:bg-black border border-gray-200 dark:border-neutral-800 rounded-lg overflow-hidden hover:shadow-md hover:border-gray-300 dark:hover:border-neutral-700 transition-all duration-200 flex flex-col h-full">
            {/* Cover Image */}
            <div className="relative h-32 overflow-hidden bg-gray-100 dark:bg-neutral-900">
                <img
                    src={creator.coverImg}
                    alt={creator.name}
                    className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                
                {/* Niche Badge */}
                <span className="absolute top-3 right-3 bg-white/95 dark:bg-black/95 backdrop-blur-sm text-[10px] font-bold px-2 py-1 rounded text-black dark:text-white uppercase tracking-wide border border-gray-200 dark:border-neutral-700 shadow-sm">
                    {creator.niche[0]}
                </span>
            </div>

            {/* Content */}
            <div className="p-5 pt-10 relative flex-1 flex flex-col">
                {/* Avatar */}
                <div className="absolute -top-10 left-5">
                    <img
                        src={creator.avatar}
                        alt={creator.name}
                        className="w-20 h-20 rounded-full object-cover border-4 border-white dark:border-black shadow-sm"
                    />
                    {stats.currentStreak > 0 && (
                        <div className="absolute -bottom-1 -right-1 bg-white dark:bg-black rounded-full p-1 shadow-sm border border-gray-100 dark:border-neutral-800" title={`${stats.currentStreak} Campaign Streak`}>
                            <span className="material-symbols-outlined text-[16px] text-orange-500">local_fire_department</span>
                        </div>
                    )}
                </div>

                {/* Header Info */}
                <div className="mb-4">
                    <div className="flex justify-between items-start">
                        <div>
                            <h3 className="text-lg font-display font-bold text-gray-900 dark:text-white leading-tight mb-0.5">{creator.name}</h3>
                            <p className="text-xs font-mono text-gray-500 dark:text-neutral-500">{creator.handle}</p>
                        </div>
                        <div className="flex items-center gap-1 bg-gray-50 dark:bg-neutral-900 px-2 py-1 rounded border border-gray-100 dark:border-neutral-800">
                            <span className="material-symbols-outlined text-[14px] text-yellow-500">star</span>
                            <span className="text-xs font-bold text-gray-900 dark:text-white">{stats.avgRating}</span>
                        </div>
                    </div>
                </div>

                {/* Bio */}
                <p className="text-sm text-gray-600 dark:text-neutral-400 line-clamp-2 mb-5 leading-relaxed min-h-[40px]">
                    {creator.bio}
                </p>

                {/* Key Stats */}
                <div className="grid grid-cols-3 gap-3 mb-5 p-3 bg-gray-50 dark:bg-neutral-900 rounded border border-gray-100 dark:border-neutral-800">
                    <div className="text-center border-r border-gray-200 dark:border-neutral-800 last:border-0">
                        <p className="text-[10px] font-mono font-medium text-gray-400 dark:text-neutral-500 uppercase mb-0.5">Followers</p>
                        <p className="text-sm font-bold text-gray-900 dark:text-white">{creator.followers}</p>
                    </div>
                    <div className="text-center border-r border-gray-200 dark:border-neutral-800 last:border-0">
                        <p className="text-[10px] font-mono font-medium text-gray-400 dark:text-neutral-500 uppercase mb-0.5">Engage</p>
                        <p className="text-sm font-bold text-gray-900 dark:text-white">{creator.engagementRate}</p>
                    </div>
                    <div className="text-center">
                        <p className="text-[10px] font-mono font-medium text-gray-400 dark:text-neutral-500 uppercase mb-0.5">Campaigns</p>
                        <p className="text-sm font-bold text-gray-900 dark:text-white">{creator.pastCampaigns}</p>
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-auto pt-4 border-t border-gray-100 dark:border-neutral-800 flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                        {creator.platforms.slice(0, 3).map((p) => {
                            const style = PLATFORM_ICONS[p] || PLATFORM_ICONS['Instagram'];
                            return (
                                <div
                                    key={p}
                                    className={`size-6 rounded-md bg-white dark:bg-black border border-gray-200 dark:border-neutral-800 text-gray-400 dark:text-neutral-500 flex items-center justify-center hover:text-black dark:hover:text-white hover:border-gray-300 dark:hover:border-neutral-700 transition-colors`}
                                    title={p}
                                >
                                    <span className="material-symbols-outlined text-[14px]">{style.icon}</span>
                                </div>
                            );
                        })}
                    </div>
                    
                    <button
                        onClick={(e) => { e.stopPropagation(); onInvite(); }}
                        className="px-4 py-1.5 bg-black dark:bg-white text-white dark:text-black text-xs font-bold rounded hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors flex items-center gap-1.5 shadow-sm"
                    >
                        <span className="material-symbols-outlined text-[14px]">mail</span>
                        Invite
                    </button>
                </div>
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
                className={`h-9 px-3 rounded-md border text-sm font-medium flex items-center gap-2 transition-all ${activeFilterDropdown === name || (count && count > 0)
                    ? 'bg-black text-white border-black dark:bg-white dark:text-black dark:border-white shadow-sm'
                    : 'bg-white dark:bg-neutral-900 border-gray-200 dark:border-neutral-800 text-gray-600 dark:text-gray-400 hover:border-gray-300 dark:hover:border-neutral-700 hover:text-gray-900 dark:hover:text-white'}`}
            >
                {label}
                {count !== undefined && count > 0 && (
                    <span className="bg-pop-pink text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center border border-black dark:border-transparent">{count}</span>
                )}
                <span className={`material-symbols-outlined text-[18px] transition-transform ${activeFilterDropdown === name ? 'rotate-180' : ''}`}>expand_more</span>
            </button>

            {activeFilterDropdown === name && (
                <>
                    <div className="fixed inset-0 z-10" onClick={() => setActiveFilterDropdown(null)}></div>
                    <div className="absolute top-full left-0 mt-2 w-56 bg-white dark:bg-neutral-900 rounded-lg shadow-lg border border-gray-200 dark:border-neutral-800 p-2 z-20 animate-in fade-in zoom-in-95 duration-100">
                        {children}
                    </div>
                </>
            )}
        </div>
    );

    return (
        <div className="flex flex-col h-full max-w-7xl mx-auto p-6 lg:p-8 overflow-hidden">
            {/* Header */}
            <div className="mb-8 shrink-0">
                <h1 className="text-3xl font-display font-bold text-gray-900 dark:text-white mb-2 tracking-tight">Find Creators</h1>
                <p className="text-sm text-gray-500 dark:text-neutral-500">Discover talented creators for your next campaign.</p>
            </div>

            {/* Search & Filters */}
            <div className="flex flex-col gap-4 mb-8 shrink-0 z-20">
                <div className="relative max-w-xl">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-neutral-500">
                        <span className="material-symbols-outlined text-[20px]">search</span>
                    </span>
                    <input
                        type="text"
                        placeholder="Search by name, handle, or niche..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full h-10 pl-10 pr-4 rounded-md border border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-gray-900 dark:text-white focus:ring-1 focus:ring-black dark:focus:ring-white focus:border-black dark:focus:border-white transition-all outline-none text-sm font-mono placeholder-gray-400 dark:placeholder-neutral-600"
                    />
                </div>

                <div className="flex flex-wrap items-center gap-2">
                    <FilterButton label="Niche" name="niche" count={filters.niche.length}>
                        <div className="space-y-0.5 max-h-64 overflow-y-auto">
                            {['Tech', 'Gaming', 'Lifestyle', 'Fashion', 'Food & Drink', 'Health & Fitness', 'Beauty', 'Travel', 'SaaS'].map(opt => (
                                <label key={opt} className="flex items-center gap-2.5 cursor-pointer hover:bg-gray-50 dark:hover:bg-neutral-800 p-2 rounded transition-colors">
                                    <input
                                        type="checkbox"
                                        checked={filters.niche.includes(opt)}
                                        onChange={() => toggleFilter('niche', opt)}
                                        className="rounded text-black dark:text-white focus:ring-black dark:focus:ring-white border-gray-300 dark:border-neutral-600 dark:bg-neutral-800 w-4 h-4"
                                    />
                                    <span className="text-sm text-gray-900 dark:text-white">{opt}</span>
                                </label>
                            ))}
                        </div>
                    </FilterButton>

                    <FilterButton label="Platform" name="platform" count={filters.platform.length}>
                        <div className="space-y-0.5">
                            {Object.entries(PLATFORM_ICONS).map(([platform, style]) => (
                                <label key={platform} className="flex items-center gap-2.5 cursor-pointer hover:bg-gray-50 dark:hover:bg-neutral-800 p-2 rounded transition-colors">
                                    <input
                                        type="checkbox"
                                        checked={filters.platform.includes(platform)}
                                        onChange={() => toggleFilter('platform', platform)}
                                        className="rounded text-black dark:text-white focus:ring-black dark:focus:ring-white border-gray-300 dark:border-neutral-600 dark:bg-neutral-800 w-4 h-4"
                                    />
                                    <div className={`size-6 rounded-md ${style.bg} dark:${style.darkBg} ${style.color} dark:${style.darkColor} flex items-center justify-center border border-gray-100 dark:border-transparent`}>
                                        <span className="material-symbols-outlined text-[14px]">{style.icon}</span>
                                    </div>
                                    <span className="text-sm text-gray-900 dark:text-white">{platform}</span>
                                </label>
                            ))}
                        </div>
                    </FilterButton>

                    <FilterButton label="Followers" name="followers" count={filters.followerRange.min > 0 || filters.followerRange.max < Infinity ? 1 : 0}>
                        <div className="space-y-0.5">
                            {FOLLOWER_OPTIONS.map(opt => (
                                <label key={opt.label} className="flex items-center gap-2.5 cursor-pointer hover:bg-gray-50 dark:hover:bg-neutral-800 p-2 rounded transition-colors">
                                    <input
                                        type="radio"
                                        name="followers"
                                        checked={filters.followerRange.min === opt.min && filters.followerRange.max === opt.max}
                                        onChange={() => setFilters({ ...filters, followerRange: { min: opt.min, max: opt.max } })}
                                        className="text-black dark:text-white focus:ring-black dark:focus:ring-white border-gray-300 dark:border-neutral-600 dark:bg-neutral-800 w-4 h-4"
                                    />
                                    <span className="text-sm text-gray-900 dark:text-white">{opt.label}</span>
                                </label>
                            ))}
                        </div>
                    </FilterButton>

                    {getActiveFilterCount() > 0 && (
                        <button
                            onClick={clearAllFilters}
                            className="h-9 px-3 text-xs text-gray-500 font-bold uppercase tracking-wider hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors flex items-center gap-1"
                        >
                            <span className="material-symbols-outlined text-[16px]">close</span>
                            Clear
                        </button>
                    )}
                </div>
            </div>

            {/* Results count */}
            <div className="flex items-center justify-between mb-4 shrink-0">
                <p className="text-xs font-mono font-medium text-gray-500 dark:text-neutral-500 uppercase tracking-wide">
                    FOUND: <span className="text-black dark:text-white">{creators.length}</span>
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
                    <div className="flex flex-col items-center justify-center py-20 text-center border-2 border-dashed border-gray-200 dark:border-neutral-800 rounded-lg bg-gray-50/50 dark:bg-neutral-900/50">
                        <div className="size-16 rounded-full bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 flex items-center justify-center mb-4 shadow-sm">
                            <span className="material-symbols-outlined text-3xl text-gray-400 dark:text-neutral-600">search_off</span>
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">No Creators Found</h3>
                        <p className="text-sm text-gray-500 dark:text-neutral-500 max-w-sm mb-6 leading-relaxed">
                            Try adjusting your filters or search terms to find more creators.
                        </p>
                        <Button variant="secondary" onClick={clearAllFilters} className="dark:bg-white dark:text-black dark:hover:bg-gray-200">
                            Clear All Filters
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Creators;
