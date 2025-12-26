import React from 'react';
import { Link } from 'react-router-dom';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { BRAND_LOGO } from '../../types';

interface SignupProps {
    onSignup: () => void;
}

const Signup: React.FC<SignupProps> = ({ onSignup }) => {

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSignup();
    };

    return (
        <div className="min-h-screen w-full bg-white dark:bg-gray-950 flex font-display selection:bg-brand-blue/30">

            {/* Left Sidebar (Desktop Only) */}
            <div className="hidden lg:flex w-[40%] bg-brand-navy relative overflow-hidden flex-col justify-between p-12">
                {/* Background Elements */}
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#000563] to-[#075CD1] z-0"></div>
                <div className="absolute -top-24 -left-24 w-96 h-96 bg-white/10 rounded-full blur-3xl z-0"></div>
                <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-black/20 rounded-full blur-3xl z-0 translate-y-1/2 translate-x-1/4"></div>
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 z-0 mix-blend-overlay"></div>

                {/* Logo */}
                <div className="relative z-10 flex items-center gap-3">
                    <img src={BRAND_LOGO} alt="Creonity Logo" className="size-10 object-contain brightness-0 invert" />
                    <div>
                        <span className="text-2xl font-bold text-white tracking-tight block">Creonity</span>
                        <span className="text-[10px] font-bold text-white/60 uppercase tracking-widest">Brand Portal</span>
                    </div>
                </div>

                {/* Content */}
                <div className="relative z-10 space-y-6">
                    <h2 className="text-4xl font-display font-bold text-white leading-tight">
                        Scale your influencer marketing with confidence.
                    </h2>
                    <p className="text-white/80 text-lg leading-relaxed max-w-md">
                        Join 5,000+ brands finding and collaborating with vetted creators. Our escrow system protects your budget.
                    </p>
                </div>

                {/* Footer/Testimonial */}
                <div className="relative z-10">
                    <div className="flex items-center gap-4 bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/20 max-w-sm">
                        <div className="size-10 rounded-full bg-cover bg-center" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=64&h=64")' }}></div>
                        <div>
                            <p className="text-sm font-bold text-white">"Found our best creator partners here."</p>
                            <p className="text-xs text-white/60">Sarah, Brand Manager at TechCo</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Content Area */}
            <div className="flex-1 flex flex-col items-center justify-center p-6 sm:p-12 relative overflow-y-auto">
                <div className="w-full max-w-md space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">

                    {/* Mobile Header */}
                    <div className="lg:hidden text-center mb-8">
                        <img src={BRAND_LOGO} alt="Creonity Logo" className="size-12 mx-auto mb-4 object-contain" />
                        <h1 className="text-2xl font-bold text-text-primary dark:text-white">Join Creonity</h1>
                        <p className="text-sm text-text-secondary">For Brands & Agencies</p>
                    </div>

                    <div>
                        <h1 className="hidden lg:block text-3xl font-display font-bold text-text-primary dark:text-white mb-2">
                            Create Account
                        </h1>
                        <p className="text-text-secondary dark:text-gray-400">
                            Get started for free. No credit card required.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <button className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-200 dark:border-gray-800 rounded-xl bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-sm font-bold text-text-primary dark:text-white">
                            <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" alt="Google" />
                            Google
                        </button>
                        <button className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-200 dark:border-gray-800 rounded-xl bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-sm font-bold text-text-primary dark:text-white">
                            <span className="material-symbols-outlined text-[20px]">business</span>
                            SSO
                        </button>
                    </div>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-200 dark:border-gray-800"></div>
                        </div>
                        <div className="relative flex justify-center text-xs uppercase font-bold tracking-wide">
                            <span className="bg-white dark:bg-gray-950 px-2 text-gray-400">Or with email</span>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <Input
                            label="Company Name"
                            type="text"
                            placeholder="Acme Corporation"
                            required
                            className="bg-gray-50 dark:bg-gray-900 border-transparent focus:bg-white dark:focus:bg-gray-800"
                        />
                        <Input
                            label="Work Email"
                            type="email"
                            placeholder="you@company.com"
                            leftIcon="mail"
                            required
                            className="bg-gray-50 dark:bg-gray-900 border-transparent focus:bg-white dark:focus:bg-gray-800"
                        />
                        <div className="space-y-1.5">
                            <Input
                                label="Password"
                                type="password"
                                placeholder="••••••••"
                                leftIcon="lock"
                                required
                                className="bg-gray-50 dark:bg-gray-900 border-transparent focus:bg-white dark:focus:bg-gray-800"
                            />
                            <p className="text-[10px] text-text-secondary dark:text-gray-500 font-medium">Must be at least 8 characters.</p>
                        </div>

                        <Button type="submit" className="w-full py-3 shadow-lg shadow-brand-blue/20" size="lg">
                            Create Account
                        </Button>
                    </form>

                    <p className="text-center text-sm text-text-secondary dark:text-gray-500">
                        Already have an account? <Link to="/login" className="font-bold text-brand-blue hover:underline">Sign In</Link>
                    </p>
                </div>

                <div className="absolute bottom-6 flex gap-6 text-xs font-bold text-gray-400">
                    <Link to="#" className="hover:text-gray-600 dark:hover:text-gray-300">Privacy Policy</Link>
                    <Link to="#" className="hover:text-gray-600 dark:hover:text-gray-300">Terms of Service</Link>
                </div>
            </div>
        </div>
    );
};

export default Signup;
