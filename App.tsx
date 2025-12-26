import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, matchPath, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Creators from './pages/Creators';
import Campaigns from './pages/Campaigns';
import Applications from './pages/Applications';
import Collaborations from './pages/Collaborations';
import Messages from './pages/Messages';
import Analytics from './pages/Analytics';
import Wallet from './pages/Wallet';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import Onboarding from './pages/onboarding/Onboarding';
import { ToastProvider } from './context/ToastContext';
import { ApplicationProvider } from './context/ApplicationContext';
import ToastContainer from './components/ToastContainer';

// Wrapper to handle routing logic based on auth state
const AppRoutes: React.FC<{
    isAuthenticated: boolean;
    isOnboarded: boolean;
    login: (skipOnboarding?: boolean) => void;
    logout: () => void;
    completeOnboarding: () => void;
    toggleTheme: () => void;
    darkMode: boolean;
    mobileMenuOpen: boolean;
    setMobileMenuOpen: (open: boolean) => void;
}> = ({ isAuthenticated, isOnboarded, login, logout, completeOnboarding, toggleTheme, darkMode, mobileMenuOpen, setMobileMenuOpen }) => {
    const location = useLocation();
    const isMessagesPage = location.pathname === '/messages';

    // Determine page title
    const getPageTitle = (pathname: string) => {
        if (matchPath("/creators/:id", pathname)) return 'Creator Profile';
        if (matchPath("/campaigns/:id", pathname)) return 'Campaign Details';
        if (matchPath("/collaborations/:id", pathname)) return 'Workroom';

        switch (pathname) {
            case '/': return 'Dashboard';
            case '/creators': return 'Find Creators';
            case '/campaigns': return 'Campaigns';
            case '/applications': return 'Applications';
            case '/collaborations': return 'Collaborations';
            case '/analytics': return 'Analytics';
            case '/wallet': return 'Wallet';
            case '/profile': return 'Company Profile';
            case '/settings': return 'Settings';
            case '/messages': return 'Messages';
            default: return 'Dashboard';
        }
    };

    // Not Authenticated? Force Login or Signup.
    if (!isAuthenticated) {
        return (
            <div className="bg-gray-50 dark:bg-gray-950 min-h-screen text-text-primary dark:text-gray-100 font-display antialiased transition-colors duration-200">
                <Routes>
                    <Route path="/login" element={<Login onLogin={login} />} />
                    <Route path="/signup" element={<Signup onSignup={() => login(false)} />} />
                    <Route path="*" element={<Navigate to="/login" replace />} />
                </Routes>
            </div>
        );
    }

    // Authenticated but not onboarded? Show Onboarding.
    if (!isOnboarded) {
        return (
            <div className="bg-gray-50 dark:bg-gray-950 min-h-screen text-text-primary dark:text-gray-100 font-display antialiased transition-colors duration-200">
                <Onboarding onComplete={completeOnboarding} />
            </div>
        );
    }

    // Fully Authenticated and Onboarded? Show Dashboard.
    return (
        <div className="flex h-screen w-full bg-background-light dark:bg-gray-900 text-text-primary dark:text-gray-100 font-display antialiased overflow-hidden transition-colors duration-200">
            <Sidebar mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} onLogout={logout} />

            {/* Overlay for mobile */}
            {mobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-20 lg:hidden"
                    onClick={() => setMobileMenuOpen(false)}
                />
            )}

            <div className="flex-1 flex flex-col h-full overflow-hidden relative w-full">
                {!isMessagesPage && (
                    <Header
                        title={getPageTitle(location.pathname)}
                        onMenuClick={() => setMobileMenuOpen(true)}
                        onLogout={logout}
                        darkMode={darkMode}
                        toggleTheme={toggleTheme}
                    />
                )}

                <main className={`flex-1 overflow-hidden ${!isMessagesPage ? 'overflow-y-auto scroll-smooth' : ''} bg-background-light dark:bg-gray-900`}>
                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/creators" element={<Creators />} />
                        <Route path="/creators/:id" element={<Creators />} />
                        <Route path="/campaigns" element={<Campaigns />} />
                        <Route path="/campaigns/:id" element={<Campaigns />} />
                        <Route path="/applications" element={<Applications />} />
                        <Route path="/collaborations" element={<Collaborations />} />
                        <Route path="/collaborations/:id" element={<Collaborations />} />
                        <Route path="/messages" element={<Messages onMenuClick={() => setMobileMenuOpen(true)} />} />
                        <Route path="/analytics" element={<Analytics />} />
                        <Route path="/wallet" element={<Wallet />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/settings" element={<Settings darkMode={darkMode} toggleTheme={toggleTheme} />} />
                        {/* Redirect any unknown routes back to dashboard */}
                        <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                </main>
            </div>

            <ToastContainer />
        </div>
    );
};

const AppContent: React.FC = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // -- Auth State Management --
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        return localStorage.getItem('creonity_brand_auth') === 'true';
    });

    // -- Onboarding State Management --
    const [isOnboarded, setIsOnboarded] = useState(() => {
        return localStorage.getItem('creonity_brand_onboarded') === 'true';
    });

    // -- Theme Management --
    const [darkMode, setDarkMode] = useState(() => {
        const savedTheme = localStorage.getItem('creonity_brand_theme');
        if (savedTheme === null) {
            return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        }
        return savedTheme === 'dark';
    });

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('creonity_brand_theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('creonity_brand_theme', 'light');
        }
    }, [darkMode]);

    const toggleTheme = () => setDarkMode(!darkMode);

    // -- Actions --
    const handleLogin = (skipOnboarding = false) => {
        localStorage.setItem('creonity_brand_auth', 'true');
        setIsAuthenticated(true);
        if (skipOnboarding) {
            localStorage.setItem('creonity_brand_onboarded', 'true');
            setIsOnboarded(true);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('creonity_brand_auth');
        localStorage.removeItem('creonity_brand_onboarded');
        setIsAuthenticated(false);
        setIsOnboarded(false);
    };

    const handleCompleteOnboarding = () => {
        localStorage.setItem('creonity_brand_onboarded', 'true');
        setIsOnboarded(true);
    };

    return (
        <AppRoutes
            isAuthenticated={isAuthenticated}
            isOnboarded={isOnboarded}
            login={handleLogin}
            logout={handleLogout}
            completeOnboarding={handleCompleteOnboarding}
            toggleTheme={toggleTheme}
            darkMode={darkMode}
            mobileMenuOpen={mobileMenuOpen}
            setMobileMenuOpen={setMobileMenuOpen}
        />
    );
};

const App: React.FC = () => {
    return (
        <Router>
            <ToastProvider>
                <ApplicationProvider>
                    <AppContent />
                </ApplicationProvider>
            </ToastProvider>
        </Router>
    );
};

export default App;
