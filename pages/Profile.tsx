import React from 'react';
import { Link } from 'react-router-dom';

const Profile: React.FC = () => {
    return (
        <div className="max-w-4xl mx-auto p-6 lg:p-8 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-xl font-bold text-text-primary dark:text-white">Company Profile</h1>
                    <p className="text-sm text-text-secondary dark:text-gray-400">Manage your brand's public profile</p>
                </div>
                <button className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary-hover">
                    Save Changes
                </button>
            </div>

            {/* Profile Card */}
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-border-color dark:border-gray-700 overflow-hidden">
                {/* Cover */}
                <div className="h-32 bg-gradient-to-r from-primary to-brand-teal relative">
                    <button className="absolute bottom-3 right-3 px-3 py-1.5 text-xs font-medium text-white bg-black/30 rounded-lg hover:bg-black/50 flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px]">edit</span>
                        Change Cover
                    </button>
                </div>

                {/* Logo & Info */}
                <div className="relative px-6 pb-6">
                    <div className="flex items-end gap-4 -mt-10 mb-6">
                        <div className="relative">
                            <img
                                src="https://ui-avatars.com/api/?name=Acme+Corp&background=075CD1&color=fff&size=128"
                                alt="Company Logo"
                                className="w-24 h-24 rounded-xl border-4 border-white dark:border-gray-800 object-cover"
                            />
                            <button className="absolute -bottom-1 -right-1 w-8 h-8 bg-white dark:bg-gray-700 rounded-full shadow-md flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-600">
                                <span className="material-symbols-outlined text-[16px] text-text-secondary">photo_camera</span>
                            </button>
                        </div>
                        <div className="flex-1">
                            <h2 className="text-xl font-bold text-text-primary dark:text-white">Acme Corporation</h2>
                            <p className="text-sm text-text-secondary dark:text-gray-400">Technology Company</p>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-xs font-bold text-text-primary dark:text-gray-300 uppercase tracking-wide mb-1.5">
                                Company Name
                            </label>
                            <input
                                type="text"
                                defaultValue="Acme Corporation"
                                className="w-full h-11 px-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-text-primary dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none text-sm"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-text-primary dark:text-gray-300 uppercase tracking-wide mb-1.5">
                                Industry
                            </label>
                            <select className="w-full h-11 px-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-text-primary dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none text-sm">
                                <option>Technology</option>
                                <option>Fashion</option>
                                <option>Food & Beverage</option>
                                <option>Health & Fitness</option>
                                <option>Beauty</option>
                                <option>Finance</option>
                                <option>Entertainment</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-text-primary dark:text-gray-300 uppercase tracking-wide mb-1.5">
                                Website
                            </label>
                            <input
                                type="url"
                                defaultValue="https://acme.com"
                                className="w-full h-11 px-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-text-primary dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none text-sm"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-text-primary dark:text-gray-300 uppercase tracking-wide mb-1.5">
                                Contact Email
                            </label>
                            <input
                                type="email"
                                defaultValue="marketing@acme.com"
                                className="w-full h-11 px-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-text-primary dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none text-sm"
                            />
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-xs font-bold text-text-primary dark:text-gray-300 uppercase tracking-wide mb-1.5">
                                Company Description
                            </label>
                            <textarea
                                rows={4}
                                defaultValue="Acme Corporation is a leading technology company focused on innovation and creating products that make life easier. We partner with top creators to share our story with the world."
                                className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-text-primary dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none text-sm resize-none"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Social Links */}
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-border-color dark:border-gray-700 p-6">
                <h3 className="font-medium text-text-primary dark:text-white mb-4">Social Media Links</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                        { platform: 'Instagram', icon: 'photo_camera', value: '@acme', color: 'text-pink-500' },
                        { platform: 'Twitter/X', icon: 'tag', value: '@acmecorp', color: 'text-gray-900 dark:text-white' },
                        { platform: 'LinkedIn', icon: 'work', value: 'company/acme', color: 'text-blue-600' },
                        { platform: 'YouTube', icon: 'smart_display', value: '@acmeofficial', color: 'text-red-600' },
                    ].map((social, i) => (
                        <div key={i} className="flex items-center gap-3">
                            <span className={`material-symbols-outlined text-[20px] ${social.color}`}>{social.icon}</span>
                            <input
                                type="text"
                                placeholder={`${social.platform} handle`}
                                defaultValue={social.value}
                                className="flex-1 h-11 px-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-text-primary dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none text-sm"
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Brand Guidelines */}
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-border-color dark:border-gray-700 p-6">
                <h3 className="font-medium text-text-primary dark:text-white mb-4">Brand Guidelines</h3>
                <div className="border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-xl p-8 text-center">
                    <span className="material-symbols-outlined text-4xl text-gray-400 mb-2">upload_file</span>
                    <p className="text-sm text-text-primary dark:text-white mb-1">Upload brand guidelines</p>
                    <p className="text-xs text-text-secondary dark:text-gray-400 mb-4">PDF, up to 10MB</p>
                    <button className="px-4 py-2 text-sm font-medium text-primary border border-primary rounded-lg hover:bg-primary/5">
                        Choose File
                    </button>
                </div>
            </div>

            {/* Stats */}
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-border-color dark:border-gray-700 p-6">
                <h3 className="font-medium text-text-primary dark:text-white mb-4">Profile Stats</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                        { label: 'Campaigns Run', value: '24' },
                        { label: 'Creators Worked With', value: '68' },
                        { label: 'Total Spent', value: '$106K' },
                        { label: 'Avg. Rating', value: '4.8/5' },
                    ].map((stat, i) => (
                        <div key={i} className="text-center p-4 rounded-lg bg-gray-50 dark:bg-gray-700/50">
                            <p className="text-2xl font-bold text-text-primary dark:text-white">{stat.value}</p>
                            <p className="text-xs text-text-secondary dark:text-gray-400">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Profile;
