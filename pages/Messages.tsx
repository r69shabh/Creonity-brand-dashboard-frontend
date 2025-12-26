import React, { useState } from 'react';

type MessageSection = 'creators' | 'team';

interface Conversation {
    id: string;
    name: string;
    handle?: string;
    avatar: string;
    lastMessage: string;
    time: string;
    unread: number;
    online: boolean;
    type: 'creator' | 'team-member' | 'channel';
    role?: string;
}

interface Message {
    id: string;
    senderId: string;
    senderName?: string;
    senderAvatar?: string;
    content: string;
    time: string;
    isMe: boolean;
}

// Creator conversations
const CREATOR_CONVERSATIONS: Conversation[] = [
    { id: 'c1', name: 'Alex Morgan', handle: '@alexcreates', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face', lastMessage: 'I just uploaded the first draft of the video...', time: '2m ago', unread: 2, online: true, type: 'creator' },
    { id: 'c2', name: 'Sarah Chen', handle: '@sarahlifestyle', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face', lastMessage: 'Perfect! I will start shooting tomorrow.', time: '1h ago', unread: 0, online: true, type: 'creator' },
    { id: 'c3', name: 'David Kim', handle: '@davidtech', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face', lastMessage: 'Thanks for the feedback on the script!', time: '3h ago', unread: 0, online: false, type: 'creator' },
    { id: 'c4', name: 'Jessica Taylor', handle: '@jessbeauty', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face', lastMessage: 'Looking forward to collaborating!', time: '1d ago', unread: 1, online: false, type: 'creator' },
];

// Team channels
const TEAM_CHANNELS: Conversation[] = [
    { id: 'ch1', name: '# general', avatar: '', lastMessage: 'Sarah: The new campaign is performing great!', time: '10m ago', unread: 3, online: true, type: 'channel' },
    { id: 'ch2', name: '# marketing', avatar: '', lastMessage: 'Michael: Analytics report ready for review', time: '1h ago', unread: 0, online: true, type: 'channel' },
    { id: 'ch3', name: '# campaigns', avatar: '', lastMessage: 'New campaign brief posted', time: '2h ago', unread: 1, online: true, type: 'channel' },
    { id: 'ch4', name: '# announcements', avatar: '', lastMessage: 'Q4 goals shared', time: '1d ago', unread: 0, online: true, type: 'channel' },
];

// Team members for DMs
const TEAM_MEMBERS: Conversation[] = [
    { id: 't1', name: 'Sarah Williams', avatar: 'https://randomuser.me/api/portraits/women/44.jpg', lastMessage: 'Let\'s schedule a review meeting', time: '30m ago', unread: 1, online: true, type: 'team-member', role: 'Admin' },
    { id: 't2', name: 'Michael Brown', avatar: 'https://randomuser.me/api/portraits/men/45.jpg', lastMessage: 'I\'ll prepare the analytics report', time: '2h ago', unread: 0, online: false, type: 'team-member', role: 'Manager' },
    { id: 't3', name: 'Emily Davis', avatar: 'https://randomuser.me/api/portraits/women/68.jpg', lastMessage: 'Content draft is ready for approval', time: '3h ago', unread: 2, online: true, type: 'team-member', role: 'Member' },
    { id: 't4', name: 'James Wilson', avatar: 'https://randomuser.me/api/portraits/men/22.jpg', lastMessage: 'Budget updated', time: '1d ago', unread: 0, online: false, type: 'team-member', role: 'Member' },
];

const CREATOR_MESSAGES: Message[] = [
    { id: '1', senderId: '1', content: 'Hi! I am excited to work on this campaign.', time: '10:30 AM', isMe: false },
    { id: '2', senderId: 'me', content: 'Great to have you on board! Let me know if you have any questions about the brief.', time: '10:32 AM', isMe: true },
    { id: '3', senderId: '1', content: 'I have reviewed the brief. Just to confirm - you want a 10-15 minute in-depth review?', time: '10:45 AM', isMe: false },
    { id: '4', senderId: 'me', content: 'Yes exactly! Focus on the key features we discussed. Feel free to add your personal touch.', time: '10:50 AM', isMe: true },
    { id: '5', senderId: '1', content: 'Perfect! I will have the first draft ready by Friday.', time: '11:00 AM', isMe: false },
    { id: '6', senderId: '1', content: 'I just uploaded the first draft of the video for your review. Let me know what you think!', time: '2:30 PM', isMe: false },
];

const TEAM_MESSAGES: Message[] = [
    { id: '1', senderId: '1', senderName: 'Sarah Williams', senderAvatar: 'https://randomuser.me/api/portraits/women/44.jpg', content: 'The new campaign with @alexcreates is performing great! 📈', time: '10:30 AM', isMe: false },
    { id: '2', senderId: 'me', content: 'That\'s awesome! Let\'s schedule a review meeting for Friday.', time: '10:32 AM', isMe: true },
    { id: '3', senderId: '2', senderName: 'Michael Brown', senderAvatar: 'https://randomuser.me/api/portraits/men/45.jpg', content: 'I\'ll prepare the analytics report by tomorrow.', time: '10:35 AM', isMe: false },
    { id: '4', senderId: '1', senderName: 'Sarah Williams', senderAvatar: 'https://randomuser.me/api/portraits/women/44.jpg', content: 'Perfect! Also, we should discuss the Q1 budget for influencer campaigns.', time: '10:40 AM', isMe: false },
    { id: '5', senderId: 'me', content: 'Good idea. Let\'s add that to Friday\'s agenda.', time: '10:42 AM', isMe: true },
];

interface MessagesProps {
    onMenuClick: () => void;
}

const Messages: React.FC<MessagesProps> = ({ onMenuClick }) => {
    const [activeSection, setActiveSection] = useState<MessageSection>('creators');
    const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(CREATOR_CONVERSATIONS[0]);
    const [newMessage, setNewMessage] = useState('');
    const [showMobileList, setShowMobileList] = useState(true);

    const handleSend = () => {
        if (!newMessage.trim()) return;
        setNewMessage('');
    };

    const getConversations = () => {
        if (activeSection === 'creators') return CREATOR_CONVERSATIONS;
        return [...TEAM_CHANNELS, ...TEAM_MEMBERS];
    };

    const getMessages = () => {
        if (activeSection === 'creators') return CREATOR_MESSAGES;
        return TEAM_MESSAGES;
    };

    const handleSectionChange = (section: MessageSection) => {
        setActiveSection(section);
        const convs = section === 'creators' ? CREATOR_CONVERSATIONS : [...TEAM_CHANNELS, ...TEAM_MEMBERS];
        setSelectedConversation(convs[0] || null);
    };

    const getTotalUnread = (convs: Conversation[]) => convs.reduce((acc, c) => acc + c.unread, 0);

    const getRoleBadgeColor = (role: string) => {
        switch (role) {
            case 'Admin': return 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400';
            case 'Manager': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
            default: return 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300';
        }
    };

    return (
        <div className="flex h-full">
            {/* Conversation List */}
            <div className={`w-full md:w-80 lg:w-96 border-r border-gray-200 dark:border-gray-800 flex flex-col bg-white dark:bg-gray-900 ${!showMobileList && selectedConversation ? 'hidden md:flex' : 'flex'}`}>
                {/* Header */}
                <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex items-center gap-3">
                    <button onClick={onMenuClick} className="lg:hidden p-2 -ml-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
                        <span className="material-symbols-outlined">menu</span>
                    </button>
                    <h2 className="text-lg font-bold text-text-primary dark:text-white">Messages</h2>
                </div>

                {/* Section Tabs */}
                <div className="flex p-2 gap-1 border-b border-gray-200 dark:border-gray-800">
                    <button
                        onClick={() => handleSectionChange('creators')}
                        className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-all ${activeSection === 'creators'
                            ? 'bg-primary text-white'
                            : 'text-text-secondary hover:bg-gray-100 dark:hover:bg-gray-800'
                            }`}
                    >
                        <span className="material-symbols-outlined text-[18px]">person</span>
                        Creators
                        {getTotalUnread(CREATOR_CONVERSATIONS) > 0 && (
                            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center ${activeSection === 'creators' ? 'bg-white/20' : 'bg-primary text-white'}`}>
                                {getTotalUnread(CREATOR_CONVERSATIONS)}
                            </span>
                        )}
                    </button>
                    <button
                        onClick={() => handleSectionChange('team')}
                        className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-all ${activeSection === 'team'
                            ? 'bg-primary text-white'
                            : 'text-text-secondary hover:bg-gray-100 dark:hover:bg-gray-800'
                            }`}
                    >
                        <span className="material-symbols-outlined text-[18px]">groups</span>
                        Team
                        {getTotalUnread([...TEAM_CHANNELS, ...TEAM_MEMBERS]) > 0 && (
                            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center ${activeSection === 'team' ? 'bg-white/20' : 'bg-primary text-white'}`}>
                                {getTotalUnread([...TEAM_CHANNELS, ...TEAM_MEMBERS])}
                            </span>
                        )}
                    </button>
                </div>

                {/* Search */}
                <div className="p-3">
                    <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                            <span className="material-symbols-outlined text-[18px]">search</span>
                        </span>
                        <input
                            type="text"
                            placeholder={`Search ${activeSection === 'creators' ? 'creators' : 'team'}...`}
                            className="w-full h-10 pl-10 pr-4 rounded-lg bg-gray-100 dark:bg-gray-800 border-none text-sm placeholder-gray-400 focus:ring-2 focus:ring-primary/20 outline-none"
                        />
                    </div>
                </div>

                {/* Conversations */}
                <div className="flex-1 overflow-y-auto">
                    {activeSection === 'team' && (
                        <>
                            {/* Channels Section */}
                            <div className="px-3 py-2">
                                <p className="text-[10px] font-bold text-text-secondary dark:text-gray-500 uppercase tracking-wider">Channels</p>
                            </div>
                            {TEAM_CHANNELS.map(conv => (
                                <button
                                    key={conv.id}
                                    onClick={() => { setSelectedConversation(conv); setShowMobileList(false); }}
                                    className={`w-full p-3 flex items-center gap-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors ${selectedConversation?.id === conv.id ? 'bg-primary/5 dark:bg-primary/10' : ''}`}
                                >
                                    <div className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                                        <span className="material-symbols-outlined text-[20px] text-text-secondary dark:text-gray-400">tag</span>
                                    </div>
                                    <div className="flex-1 min-w-0 text-left">
                                        <div className="flex items-center justify-between mb-0.5">
                                            <span className="font-medium text-sm text-text-primary dark:text-white truncate">{conv.name}</span>
                                            <span className="text-[10px] text-text-secondary dark:text-gray-400">{conv.time}</span>
                                        </div>
                                        <p className="text-xs text-text-secondary dark:text-gray-400 truncate">{conv.lastMessage}</p>
                                    </div>
                                    {conv.unread > 0 && (
                                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-primary text-white min-w-[18px] text-center">
                                            {conv.unread}
                                        </span>
                                    )}
                                </button>
                            ))}

                            {/* Direct Messages Section */}
                            <div className="px-3 py-2 mt-2">
                                <p className="text-[10px] font-bold text-text-secondary dark:text-gray-500 uppercase tracking-wider">Direct Messages</p>
                            </div>
                        </>
                    )}

                    {(activeSection === 'creators' ? CREATOR_CONVERSATIONS : TEAM_MEMBERS).map(conv => (
                        <button
                            key={conv.id}
                            onClick={() => { setSelectedConversation(conv); setShowMobileList(false); }}
                            className={`w-full p-3 flex items-start gap-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors ${selectedConversation?.id === conv.id ? 'bg-primary/5 dark:bg-primary/10' : ''}`}
                        >
                            <div className="relative">
                                <img src={conv.avatar} alt={conv.name} className="w-12 h-12 rounded-full object-cover" />
                                {conv.online && <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-900"></div>}
                            </div>
                            <div className="flex-1 min-w-0 text-left">
                                <div className="flex items-center justify-between mb-0.5">
                                    <div className="flex items-center gap-2">
                                        <span className="font-medium text-sm text-text-primary dark:text-white truncate">{conv.name}</span>
                                        {conv.role && (
                                            <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded-full ${getRoleBadgeColor(conv.role)}`}>
                                                {conv.role}
                                            </span>
                                        )}
                                    </div>
                                    <span className="text-[10px] text-text-secondary dark:text-gray-400">{conv.time}</span>
                                </div>
                                {conv.handle && <p className="text-[10px] text-text-secondary dark:text-gray-500 mb-0.5">{conv.handle}</p>}
                                <p className="text-xs text-text-secondary dark:text-gray-400 truncate">{conv.lastMessage}</p>
                            </div>
                            {conv.unread > 0 && (
                                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-primary text-white min-w-[18px] text-center">
                                    {conv.unread}
                                </span>
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* Chat Area */}
            {selectedConversation ? (
                <div className={`flex-1 flex flex-col bg-gray-50 dark:bg-gray-950 ${showMobileList ? 'hidden md:flex' : 'flex'}`}>
                    {/* Chat Header */}
                    <div className="h-16 px-4 flex items-center gap-3 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
                        <button onClick={() => setShowMobileList(true)} className="md:hidden p-2 -ml-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
                            <span className="material-symbols-outlined">arrow_back</span>
                        </button>
                        {selectedConversation.type === 'channel' ? (
                            <div className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                                <span className="material-symbols-outlined text-[20px] text-text-secondary dark:text-gray-400">tag</span>
                            </div>
                        ) : (
                            <img src={selectedConversation.avatar} alt={selectedConversation.name} className="w-10 h-10 rounded-full object-cover" />
                        )}
                        <div className="flex-1">
                            <div className="flex items-center gap-2">
                                <p className="font-medium text-text-primary dark:text-white">{selectedConversation.name}</p>
                                {selectedConversation.role && (
                                    <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded-full ${getRoleBadgeColor(selectedConversation.role)}`}>
                                        {selectedConversation.role}
                                    </span>
                                )}
                            </div>
                            <p className="text-xs text-text-secondary dark:text-gray-400">
                                {selectedConversation.type === 'channel'
                                    ? '5 members'
                                    : selectedConversation.handle || (selectedConversation.online ? 'Online' : 'Offline')}
                            </p>
                        </div>
                        <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg text-text-secondary">
                            <span className="material-symbols-outlined">info</span>
                        </button>
                        <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg text-text-secondary">
                            <span className="material-symbols-outlined">more_vert</span>
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        {getMessages().map(msg => (
                            <div key={msg.id} className={`flex gap-3 ${msg.isMe ? 'flex-row-reverse' : ''}`}>
                                {!msg.isMe && msg.senderAvatar && activeSection === 'team' && (
                                    <img src={msg.senderAvatar} alt={msg.senderName} className="w-8 h-8 rounded-full object-cover shrink-0" />
                                )}
                                <div className={`max-w-[70%] ${msg.isMe ? 'text-right' : ''}`}>
                                    {!msg.isMe && msg.senderName && activeSection === 'team' && (
                                        <p className="text-xs font-medium text-text-primary dark:text-white mb-1">{msg.senderName}</p>
                                    )}
                                    <div className={`inline-block px-4 py-2.5 rounded-2xl ${msg.isMe ? 'bg-primary text-white rounded-br-md' : 'bg-white dark:bg-gray-800 text-text-primary dark:text-white rounded-bl-md shadow-sm'}`}>
                                        <p className="text-sm">{msg.content}</p>
                                    </div>
                                    <p className={`text-[10px] mt-1 ${msg.isMe ? 'text-text-secondary dark:text-gray-500' : 'text-text-secondary dark:text-gray-400'}`}>{msg.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Input */}
                    <div className="p-4 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
                        <div className="flex items-center gap-3">
                            <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg text-text-secondary">
                                <span className="material-symbols-outlined">add</span>
                            </button>
                            <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg text-text-secondary">
                                <span className="material-symbols-outlined">attach_file</span>
                            </button>
                            <input
                                type="text"
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                placeholder={`Message ${selectedConversation.name}...`}
                                className="flex-1 h-11 px-4 rounded-full bg-gray-100 dark:bg-gray-800 border-none text-sm placeholder-gray-400 focus:ring-2 focus:ring-primary/20 outline-none"
                            />
                            <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg text-text-secondary">
                                <span className="material-symbols-outlined">sentiment_satisfied</span>
                            </button>
                            <button onClick={handleSend} className="p-3 bg-primary text-white rounded-full hover:bg-primary-hover">
                                <span className="material-symbols-outlined text-[20px]">send</span>
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="flex-1 flex items-center justify-center bg-gray-50 dark:bg-gray-950">
                    <div className="text-center">
                        <span className="material-symbols-outlined text-5xl text-gray-300 dark:text-gray-600 mb-4">chat</span>
                        <p className="text-text-secondary dark:text-gray-400">Select a conversation to start messaging</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Messages;
