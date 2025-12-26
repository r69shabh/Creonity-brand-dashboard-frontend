import React, { useState } from 'react';
import { CardRarity, RARITY_THRESHOLDS, CreatorStats, getRarityFromEarnings } from '../../data/gamificationData';

interface CreatorCardProps {
    name: string;
    avatar: string;
    niche: string;
    stats: CreatorStats;
    compact?: boolean;
    onClick?: () => void;
}

const CreatorCard: React.FC<CreatorCardProps> = ({ name, avatar, niche, stats, compact = false, onClick }) => {
    const [showBackground, setShowBackground] = useState(true);
    const rarity = getRarityFromEarnings(stats.lifetimeEarnings);
    const rarityConfig = RARITY_THRESHOLDS[rarity];

    // Background styles based on rarity
    const getBackgroundStyle = (): React.CSSProperties => {
        if (!showBackground) return { background: '#1a1a2e' };

        switch (rarity) {
            case 'diamond':
                return {
                    background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
                };
            case 'platinum':
                return {
                    background: 'linear-gradient(135deg, #2d2d44 0%, #3d3d5c 50%, #4d4d6d 100%)',
                };
            case 'gold':
                return {
                    background: 'linear-gradient(135deg, #1a1a2e 0%, #2d1f0f 50%, #3d2a14 100%)',
                };
            case 'silver':
                return {
                    background: 'linear-gradient(135deg, #1a1a2e 0%, #2a2a3e 50%, #3a3a4e 100%)',
                };
            default: // bronze
                return {
                    background: 'linear-gradient(135deg, #1a1a2e 0%, #2d1a1a 50%, #3d2424 100%)',
                };
        }
    };

    // Particle animation CSS for higher rarities
    const getParticleClass = () => {
        if (!showBackground) return '';
        if (rarity === 'diamond') return 'animate-shimmer-diamond';
        if (rarity === 'platinum') return 'animate-shimmer-platinum';
        if (rarity === 'gold') return 'animate-shimmer-gold';
        return '';
    };

    if (compact) {
        return (
            <div
                className="relative w-32 h-44 rounded-xl overflow-hidden cursor-pointer group transition-transform hover:scale-105 shadow-xl"
                style={getBackgroundStyle()}
                onClick={onClick}
            >
                {/* Rarity glow */}
                <div
                    className="absolute inset-0 opacity-20 blur-xl"
                    style={{ backgroundColor: rarityConfig.color }}
                />

                {/* Avatar */}
                <div className="absolute inset-0 flex items-center justify-center p-4">
                    <img
                        src={avatar}
                        alt={name}
                        className="w-20 h-20 rounded-full object-cover border-2"
                        style={{ borderColor: rarityConfig.color }}
                    />
                </div>

                {/* Name */}
                <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent">
                    <p className="text-white text-xs font-bold truncate text-center">{name}</p>
                </div>

                {/* Rarity badge */}
                <div
                    className="absolute top-2 right-2 px-1.5 py-0.5 rounded text-[8px] font-bold uppercase"
                    style={{ backgroundColor: rarityConfig.color, color: rarity === 'platinum' || rarity === 'silver' ? '#000' : '#fff' }}
                >
                    {rarity}
                </div>
            </div>
        );
    }

    return (
        <div
            className={`relative w-72 h-96 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:scale-[1.02] shadow-2xl ${getParticleClass()}`}
            style={getBackgroundStyle()}
            onClick={() => setShowBackground(!showBackground)}
        >
            {/* Noise texture overlay */}
            <div
                className="absolute inset-0 opacity-30 mix-blend-overlay pointer-events-none"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                }}
            />

            {/* Rarity glow effect */}
            {showBackground && (
                <div
                    className="absolute inset-0 opacity-10"
                    style={{
                        background: `radial-gradient(circle at 50% 80%, ${rarityConfig.color} 0%, transparent 60%)`,
                    }}
                />
            )}

            {/* Border */}
            <div
                className="absolute inset-0 rounded-2xl pointer-events-none"
                style={{
                    border: `2px solid ${rarityConfig.color}40`,
                    boxShadow: `inset 0 0 30px ${rarityConfig.color}10`,
                }}
            />

            {/* Rarity Badge - Top Left */}
            <div
                className="absolute top-4 left-4 px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 backdrop-blur-sm"
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
            <div className="absolute top-4 right-4 px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider bg-white/10 text-white/70 backdrop-blur-sm">
                {niche}
            </div>

            {/* Creator Avatar - Center */}
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                    <div
                        className="absolute -inset-2 rounded-full blur-xl opacity-40"
                        style={{ backgroundColor: rarityConfig.color }}
                    />
                    <img
                        src={avatar}
                        alt={name}
                        className="relative w-32 h-32 rounded-full object-cover shadow-2xl"
                        style={{
                            border: `3px solid ${rarityConfig.color}`,
                            boxShadow: `0 0 30px ${rarityConfig.color}40`,
                        }}
                    />
                </div>
            </div>

            {/* Stats Bar - Bottom */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 via-black/60 to-transparent">
                {/* Name */}
                <h3 className="text-white font-bold text-lg text-center mb-3">{name}</h3>

                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-2 text-center">
                    <div>
                        <p className="text-white/50 text-[9px] uppercase tracking-wider">Earnings</p>
                        <p className="text-white font-bold text-sm">${(stats.lifetimeEarnings / 1000).toFixed(1)}K</p>
                    </div>
                    <div>
                        <p className="text-white/50 text-[9px] uppercase tracking-wider">Win Rate</p>
                        <p className="text-white font-bold text-sm">{stats.winRate}%</p>
                    </div>
                    <div>
                        <p className="text-white/50 text-[9px] uppercase tracking-wider">Rating</p>
                        <p className="text-white font-bold text-sm flex items-center justify-center gap-0.5">
                            <span className="text-yellow-400">★</span>
                            {stats.avgRating}
                        </p>
                    </div>
                </div>

                {/* Current Streak */}
                {stats.currentStreak > 0 && (
                    <div className="mt-2 flex items-center justify-center gap-1.5">
                        <span className="text-orange-500">🔥</span>
                        <span className="text-white/70 text-xs">{stats.currentStreak} campaign streak</span>
                    </div>
                )}
            </div>

            {/* Card ID */}
            <div className="absolute bottom-2 right-3 text-white/20 text-[8px] font-mono">
                #00{Math.floor(Math.random() * 9999).toString().padStart(4, '0')}
            </div>
        </div>
    );
};

export default CreatorCard;
