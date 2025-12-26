import React, { useState, useEffect } from 'react';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

interface OnboardingProps {
    onComplete: () => void;
}

const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
    const [step, setStep] = useState(1);
    const totalSteps = 5;

    // State for form data
    const [formData, setFormData] = useState({
        // Step 1: Company Info
        companyName: 'Acme Corporation',
        website: '',
        industry: '',
        companySize: '11-50',
        // Step 2: Brand Goals
        goals: [] as string[],
        monthlyBudget: '$5K - $15K',
        // Step 3: Target Creators
        creatorTypes: [] as string[],
        audienceAge: '18-34',
        // Step 4: Campaign Preferences
        contentTypes: [] as string[],
        platforms: [] as string[],
        // Step 5: Payment
        paymentMethod: 'card',
    });

    // Scroll to top on step change
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [step]);

    const nextStep = () => setStep(prev => Math.min(prev + 1, totalSteps));
    const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

    const finishOnboarding = () => {
        const btn = document.getElementById('finish-btn');
        if (btn) btn.innerHTML = '<span class="material-symbols-outlined animate-spin">progress_activity</span>';
        setTimeout(onComplete, 800);
    };

    const toggleArrayItem = (key: 'goals' | 'creatorTypes' | 'contentTypes' | 'platforms', value: string) => {
        setFormData(prev => ({
            ...prev,
            [key]: prev[key].includes(value)
                ? prev[key].filter(item => item !== value)
                : [...prev[key], value]
        }));
    };

    // Content for the left sidebar
    const renderSidebarContent = () => {
        switch (step) {
            case 1:
                return (
                    <div className="space-y-6 text-white">
                        <div className="size-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-white mb-6 border border-white/30">
                            <span className="material-symbols-outlined text-[32px]">business</span>
                        </div>
                        <h2 className="text-3xl font-display font-bold leading-tight">Tell Us About Your Brand</h2>
                        <p className="text-white/80 text-lg leading-relaxed">Help us understand your company so we can match you with the perfect creators.</p>
                    </div>
                );
            case 2:
                return (
                    <div className="space-y-6 text-white">
                        <div className="size-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-white mb-6 border border-white/30">
                            <span className="material-symbols-outlined text-[32px]">flag</span>
                        </div>
                        <h2 className="text-3xl font-display font-bold leading-tight">What Are Your Goals?</h2>
                        <p className="text-white/80 text-lg leading-relaxed">Understanding your objectives helps us recommend the right campaign strategies.</p>
                    </div>
                );
            case 3:
                return (
                    <div className="space-y-6 text-white">
                        <div className="size-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-white mb-6 border border-white/30">
                            <span className="material-symbols-outlined text-[32px]">groups</span>
                        </div>
                        <h2 className="text-3xl font-display font-bold leading-tight">Who Do You Want to Reach?</h2>
                        <p className="text-white/80 text-lg leading-relaxed">Define your ideal audience and the type of creators who can connect with them.</p>
                    </div>
                );
            case 4:
                return (
                    <div className="space-y-6 text-white">
                        <div className="size-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-white mb-6 border border-white/30">
                            <span className="material-symbols-outlined text-[32px]">campaign</span>
                        </div>
                        <h2 className="text-3xl font-display font-bold leading-tight">Content & Platforms</h2>
                        <p className="text-white/80 text-lg leading-relaxed">Select the content formats and platforms that align with your brand strategy.</p>
                    </div>
                );
            default:
                return (
                    <div className="space-y-6 text-white">
                        <div className="size-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-white mb-6 border border-white/30">
                            <span className="material-symbols-outlined text-[32px]">rocket_launch</span>
                        </div>
                        <h2 className="text-3xl font-display font-bold leading-tight">You're Ready to Launch!</h2>
                        <p className="text-white/80 text-lg leading-relaxed">Your brand profile is complete. Start discovering amazing creators.</p>
                    </div>
                );
        }
    };

    return (
        <div className="min-h-screen w-full bg-white dark:bg-gray-950 flex font-display selection:bg-primary/30">

            {/* Left Sidebar (Desktop Only) */}
            <div className="hidden lg:flex w-[40%] bg-brand-navy relative overflow-hidden flex-col justify-between p-12 transition-all duration-500">
                {/* Background Elements */}
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#000563] to-[#075CD1] z-0"></div>
                <div className="absolute -top-24 -left-24 w-96 h-96 bg-white/10 rounded-full blur-3xl z-0"></div>
                <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-black/20 rounded-full blur-3xl z-0 translate-y-1/2 translate-x-1/4"></div>
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 z-0 mix-blend-overlay"></div>

                {/* Logo */}
                <div className="relative z-10 flex items-center gap-3">
                    <img src="https://cdn-icons-png.flaticon.com/512/6062/6062646.png" alt="Creonity Logo" className="size-10 object-contain brightness-0 invert" />
                    <div>
                        <span className="text-2xl font-bold text-white tracking-tight block">Creonity</span>
                        <span className="text-[10px] font-bold text-white/60 uppercase tracking-widest">Brand Portal</span>
                    </div>
                </div>

                {/* Dynamic Content */}
                <div className="relative z-10 my-auto animate-in fade-in slide-in-from-left-8 duration-500 key={step}">
                    {renderSidebarContent()}
                </div>

                {/* Steps Indicator */}
                <div className="relative z-10 flex gap-2">
                    {[1, 2, 3, 4, 5].map(i => (
                        <div
                            key={i}
                            className={`h-1.5 rounded-full transition-all duration-300 ${i <= step ? 'w-8 bg-white' : 'w-2 bg-white/30'}`}
                        ></div>
                    ))}
                </div>
            </div>

            {/* Right Content Area */}
            <div className="flex-1 flex flex-col items-center justify-center p-6 sm:p-12 relative overflow-y-auto">

                {/* Mobile Logo & Progress */}
                <div className="lg:hidden w-full max-w-md mb-8 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <img src="https://cdn-icons-png.flaticon.com/512/6062/6062646.png" alt="Creonity Logo" className="size-8 object-contain" />
                        <span className="font-bold text-text-primary dark:text-white text-lg">Creonity</span>
                    </div>
                    <span className="text-xs font-bold text-text-secondary">Step {step}/{totalSteps}</span>
                </div>

                <div className="w-full max-w-md animate-in fade-in slide-in-from-bottom-4 duration-500">

                    {/* Step 1: Company Info */}
                    {step === 1 && (
                        <div className="space-y-8">
                            <div>
                                <h3 className="text-2xl font-bold text-text-primary dark:text-white mb-2">Company Profile</h3>
                                <p className="text-text-secondary dark:text-gray-400">Let's set up your brand presence.</p>
                            </div>

                            <div className="flex items-center gap-6">
                                <div className="relative group cursor-pointer shrink-0">
                                    <div className="size-24 rounded-xl bg-gray-100 dark:bg-gray-800 border-2 border-dashed border-gray-300 dark:border-gray-600 flex items-center justify-center overflow-hidden transition-colors group-hover:border-primary group-hover:bg-primary/5">
                                        <span className="material-symbols-outlined text-3xl text-gray-400 group-hover:text-primary transition-colors">add_business</span>
                                    </div>
                                    <div className="absolute bottom-0 right-0 bg-primary text-white rounded-full p-1.5 border-2 border-white dark:border-gray-950 shadow-md">
                                        <span className="material-symbols-outlined text-[14px] block">edit</span>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-text-primary dark:text-white">Company Logo</p>
                                    <p className="text-xs text-text-secondary dark:text-gray-500 mt-1">Min 400x400px, PNG or JPG.</p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <Input
                                    label="Company Name"
                                    placeholder="Acme Corporation"
                                    value={formData.companyName}
                                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                                    className="bg-gray-50 dark:bg-gray-900"
                                />
                                <Input
                                    label="Website"
                                    type="url"
                                    placeholder="https://yourcompany.com"
                                    leftIcon="link"
                                    value={formData.website}
                                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                                    className="bg-gray-50 dark:bg-gray-900"
                                />
                                <div>
                                    <label className="block text-xs font-bold text-text-secondary dark:text-gray-400 uppercase tracking-wide mb-1.5">Industry</label>
                                    <select
                                        className="w-full rounded-lg bg-gray-50 dark:bg-gray-900 border border-border-color dark:border-gray-700 p-3 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-text-primary dark:text-white"
                                        value={formData.industry}
                                        onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                                    >
                                        <option value="">Select industry...</option>
                                        <option value="tech">Technology</option>
                                        <option value="fashion">Fashion & Apparel</option>
                                        <option value="beauty">Beauty & Cosmetics</option>
                                        <option value="food">Food & Beverage</option>
                                        <option value="fitness">Health & Fitness</option>
                                        <option value="finance">Finance</option>
                                        <option value="ecommerce">E-commerce</option>
                                        <option value="saas">SaaS</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-text-secondary dark:text-gray-400 uppercase tracking-wide mb-3">Company Size</label>
                                    <div className="flex p-1 bg-gray-100 dark:bg-gray-800 rounded-xl">
                                        {['1-10', '11-50', '51-200', '200+'].map(size => (
                                            <button
                                                key={size}
                                                onClick={() => setFormData({ ...formData, companySize: size })}
                                                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${formData.companySize === size ? 'bg-white dark:bg-gray-700 shadow-sm text-text-primary dark:text-white' : 'text-text-secondary dark:text-gray-500 hover:text-text-primary'}`}
                                            >
                                                {size}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-4 pt-4">
                                <Button onClick={nextStep} className="w-full">Continue</Button>
                            </div>
                        </div>
                    )}

                    {/* Step 2: Goals & Budget */}
                    {step === 2 && (
                        <div className="space-y-8">
                            <div>
                                <h3 className="text-2xl font-bold text-text-primary dark:text-white mb-2">Marketing Goals</h3>
                                <p className="text-text-secondary dark:text-gray-400">What do you want to achieve? Select all that apply.</p>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                {[
                                    { id: 'awareness', icon: 'visibility', label: 'Brand Awareness' },
                                    { id: 'sales', icon: 'shopping_cart', label: 'Drive Sales' },
                                    { id: 'leads', icon: 'person_add', label: 'Lead Generation' },
                                    { id: 'content', icon: 'videocam', label: 'Content Creation' },
                                    { id: 'launch', icon: 'rocket_launch', label: 'Product Launch' },
                                    { id: 'engagement', icon: 'forum', label: 'Social Engagement' },
                                ].map((goal) => (
                                    <button
                                        key={goal.id}
                                        onClick={() => toggleArrayItem('goals', goal.id)}
                                        className={`
                                    flex flex-col items-center justify-center gap-2 p-4 rounded-xl border transition-all h-28
                                    ${formData.goals.includes(goal.id)
                                                ? 'border-primary bg-primary/5 text-primary'
                                                : 'border-border-color dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-primary/50 text-text-secondary dark:text-gray-400'}
                                `}
                                    >
                                        <span className="material-symbols-outlined text-[28px]">{goal.icon}</span>
                                        <span className="font-bold text-xs text-center">{goal.label}</span>
                                    </button>
                                ))}
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-text-secondary dark:text-gray-400 uppercase tracking-wide mb-3">Monthly Influencer Budget</label>
                                <div className="flex flex-wrap gap-2">
                                    {['< $5K', '$5K - $15K', '$15K - $50K', '$50K+'].map(budget => (
                                        <button
                                            key={budget}
                                            onClick={() => setFormData({ ...formData, monthlyBudget: budget })}
                                            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${formData.monthlyBudget === budget ? 'bg-primary text-white' : 'bg-gray-100 dark:bg-gray-800 text-text-secondary dark:text-gray-400 hover:bg-gray-200'}`}
                                        >
                                            {budget}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="flex gap-4 pt-4">
                                <Button variant="ghost" onClick={prevStep} className="flex-1">Back</Button>
                                <Button onClick={nextStep} className="flex-1" disabled={formData.goals.length === 0}>Continue</Button>
                            </div>
                        </div>
                    )}

                    {/* Step 3: Target Creators */}
                    {step === 3 && (
                        <div className="space-y-8">
                            <div>
                                <h3 className="text-2xl font-bold text-text-primary dark:text-white mb-2">Ideal Creators</h3>
                                <p className="text-text-secondary dark:text-gray-400">What type of creators are you looking for?</p>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                {[
                                    { id: 'nano', icon: 'person', label: 'Nano (1K-10K)' },
                                    { id: 'micro', icon: 'group', label: 'Micro (10K-100K)' },
                                    { id: 'macro', icon: 'groups', label: 'Macro (100K-1M)' },
                                    { id: 'mega', icon: 'star', label: 'Mega (1M+)' },
                                ].map((type) => (
                                    <button
                                        key={type.id}
                                        onClick={() => toggleArrayItem('creatorTypes', type.id)}
                                        className={`
                                    flex flex-col items-center justify-center gap-2 p-4 rounded-xl border transition-all h-24
                                    ${formData.creatorTypes.includes(type.id)
                                                ? 'border-primary bg-primary/5 text-primary'
                                                : 'border-border-color dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-primary/50 text-text-secondary dark:text-gray-400'}
                                `}
                                    >
                                        <span className="material-symbols-outlined text-[24px]">{type.icon}</span>
                                        <span className="font-bold text-xs">{type.label}</span>
                                    </button>
                                ))}
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-text-secondary dark:text-gray-400 uppercase tracking-wide mb-3">Target Audience Age</label>
                                <div className="flex p-1 bg-gray-100 dark:bg-gray-800 rounded-xl">
                                    {['13-17', '18-34', '35-50', '50+'].map(age => (
                                        <button
                                            key={age}
                                            onClick={() => setFormData({ ...formData, audienceAge: age })}
                                            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${formData.audienceAge === age ? 'bg-white dark:bg-gray-700 shadow-sm text-text-primary dark:text-white' : 'text-text-secondary dark:text-gray-500 hover:text-text-primary'}`}
                                        >
                                            {age}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="flex gap-4 pt-4">
                                <Button variant="ghost" onClick={prevStep} className="flex-1">Back</Button>
                                <Button onClick={nextStep} className="flex-1">Continue</Button>
                            </div>
                        </div>
                    )}

                    {/* Step 4: Content & Platforms */}
                    {step === 4 && (
                        <div className="space-y-8">
                            <div>
                                <h3 className="text-2xl font-bold text-text-primary dark:text-white mb-2">Content Preferences</h3>
                                <p className="text-text-secondary dark:text-gray-400">What content formats interest you?</p>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-text-secondary dark:text-gray-400 uppercase tracking-wide mb-3">Content Types</label>
                                <div className="flex flex-wrap gap-2">
                                    {['Video Reviews', 'Reels/Shorts', 'Static Posts', 'Stories', 'Live Streams', 'UGC Content'].map(type => (
                                        <button
                                            key={type}
                                            onClick={() => toggleArrayItem('contentTypes', type)}
                                            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${formData.contentTypes.includes(type) ? 'bg-primary text-white' : 'bg-gray-100 dark:bg-gray-800 text-text-secondary dark:text-gray-400 hover:bg-gray-200'}`}
                                        >
                                            {type}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-text-secondary dark:text-gray-400 uppercase tracking-wide mb-3">Target Platforms</label>
                                <div className="grid grid-cols-2 gap-3">
                                    {[
                                        { id: 'instagram', icon: 'photo_camera', label: 'Instagram', color: 'text-pink-600 bg-pink-50 dark:bg-pink-900/20' },
                                        { id: 'youtube', icon: 'smart_display', label: 'YouTube', color: 'text-red-600 bg-red-50 dark:bg-red-900/20' },
                                        { id: 'tiktok', icon: 'music_note', label: 'TikTok', color: 'text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-800' },
                                        { id: 'twitch', icon: 'live_tv', label: 'Twitch', color: 'text-purple-600 bg-purple-50 dark:bg-purple-900/20' },
                                    ].map((platform) => (
                                        <button
                                            key={platform.id}
                                            onClick={() => toggleArrayItem('platforms', platform.id)}
                                            className={`
                                        flex items-center gap-3 p-3 rounded-xl border transition-all
                                        ${formData.platforms.includes(platform.id)
                                                    ? 'border-primary bg-primary/5'
                                                    : 'border-border-color dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-primary/50'}
                                    `}
                                        >
                                            <div className={`size-10 rounded-lg flex items-center justify-center ${platform.color}`}>
                                                <span className="material-symbols-outlined text-[20px]">{platform.icon}</span>
                                            </div>
                                            <span className={`font-bold text-sm ${formData.platforms.includes(platform.id) ? 'text-primary' : 'text-text-primary dark:text-white'}`}>{platform.label}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="flex gap-4 pt-4">
                                <Button variant="ghost" onClick={prevStep} className="flex-1">Back</Button>
                                <Button onClick={nextStep} className="flex-1">Review</Button>
                            </div>
                        </div>
                    )}

                    {/* Step 5: Success */}
                    {step === 5 && (
                        <div className="flex flex-col items-center text-center space-y-8 py-8">
                            <div className="size-24 bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center shadow-glow mb-4 animate-bounce-slow">
                                <span className="material-symbols-outlined text-[48px]">check</span>
                            </div>

                            <div className="space-y-2">
                                <h3 className="text-3xl font-bold text-text-primary dark:text-white">You're All Set!</h3>
                                <p className="text-text-secondary dark:text-gray-400 max-w-xs mx-auto">
                                    Your brand profile is complete. Start discovering creators and launching campaigns.
                                </p>
                            </div>

                            <div className="w-full max-w-xs space-y-3">
                                <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-xl text-left">
                                    <div className="size-10 bg-primary/10 text-primary rounded-lg flex items-center justify-center">
                                        <span className="material-symbols-outlined text-[20px]">search</span>
                                    </div>
                                    <div>
                                        <p className="font-bold text-sm text-text-primary dark:text-white">Discover Creators</p>
                                        <p className="text-[10px] text-text-secondary dark:text-gray-500">Browse verified creators</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-xl text-left">
                                    <div className="size-10 bg-primary/10 text-primary rounded-lg flex items-center justify-center">
                                        <span className="material-symbols-outlined text-[20px]">campaign</span>
                                    </div>
                                    <div>
                                        <p className="font-bold text-sm text-text-primary dark:text-white">Launch Campaigns</p>
                                        <p className="text-[10px] text-text-secondary dark:text-gray-500">Create your first campaign</p>
                                    </div>
                                </div>
                            </div>

                            <Button id="finish-btn" onClick={finishOnboarding} size="lg" className="w-full max-w-xs shadow-xl shadow-primary/30">
                                Enter Dashboard
                            </Button>
                        </div>
                    )}

                </div>

                {/* Footer - Copyright or Help */}
                <div className="absolute bottom-6 w-full text-center">
                    <button className="text-[11px] font-bold text-text-secondary dark:text-gray-600 hover:text-primary transition-colors uppercase tracking-widest">
                        Need Help?
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Onboarding;
