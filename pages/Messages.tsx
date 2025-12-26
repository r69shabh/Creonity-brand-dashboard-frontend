import React, { useState } from 'react';

interface Conversation {
    id: string;
    name: string;
    handle: string;
    avatar: string;
    lastMessage: string;
    time: string;
    unread: number;
    online: boolean;
}

interface Message {
    id: string;
    senderId: string;
    content: string;
    time: string;
    isMe: boolean;
}

const CONVERSATIONS: Conversation[] = [
    { id: '1', name: 'Alex Morgan', handle: '@alexcreates', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face', lastMessage: 'I just uploaded the first draft of the video...', time: '2m ago', unread: 2, online: true },
    { id: '2', name: 'Sarah Chen', handle: '@sarahlifestyle', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face', lastMessage: 'Perfect! I will start shooting tomorrow.', time: '1h ago', unread: 0, online: true },
    { id: '3', name: 'David Kim', handle: '@davidtech', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face', lastMessage: 'Thanks for the feedback on the script!', time: '3h ago', unread: 0, online: false },
    { id: '4', name: 'Jessica Taylor', handle: '@jessbeauty', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face', lastMessage: 'Looking forward to collaborating!', time: '1d ago', unread: 1, online: false },
];

const MESSAGES: Message[] = [
    { id: '1', senderId: '1', content: 'Hi! I am excited to work on this campaign.', time: '10:30 AM', isMe: false },
    { id: '2', senderId: 'me', content: 'Great to have you on board! Let me know if you have any questions about the brief.', time: '10:32 AM', isMe: true },
    { id: '3', senderId: '1', content: 'I have reviewed the brief. Just to confirm - you want a 10-15 minute in-depth review?', time: '10:45 AM', isMe: false },
    { id: '4', senderId: 'me', content: 'Yes exactly! Focus on the key features we discussed. Feel free to add your personal touch.', time: '10:50 AM', isMe: true },
    { id: '5', senderId: '1', content: 'Perfect! I will have the first draft ready by Friday.', time: '11:00 AM', isMe: false },
    { id: '6', senderId: '1', content: 'I just uploaded the first draft of the video for your review. Let me know what you think!', time: '2:30 PM', isMe: false },
];

interface MessagesProps {
    onMenuClick: () => void;
}

const Messages: React.FC<MessagesProps> = ({ onMenuClick }) => {
    const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(CONVERSATIONS[0]);
    const [newMessage, setNewMessage] = useState('');
    const [showMobileList, setShowMobileList] = useState(true);

    const handleSend = () => {
        if (!newMessage.trim()) return;
        // In a real app, this would send the message
        setNewMessage('');
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
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-primary text-white">3</span>
                </div>

                {/* Search */}
                <div className="p-3">
                    <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                            <span className="material-symbols-outlined text-[18px]">search</span>
                        </span>
                        <input
                            type="text"
                            placeholder="Search conversations..."
                            className="w-full h-10 pl-10 pr-4 rounded-lg bg-gray-100 dark:bg-gray-800 border-none text-sm placeholder-gray-400 focus:ring-2 focus:ring-primary/20 outline-none"
                        />
                    </div>
                </div>

                {/* Conversations */}
                <div className="flex-1 overflow-y-auto">
                    {CONVERSATIONS.map(conv => (
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
                        <img src={selectedConversation.avatar} alt={selectedConversation.name} className="w-10 h-10 rounded-full object-cover" />
                        <div className="flex-1">
                            <p className="font-medium text-text-primary dark:text-white">{selectedConversation.name}</p>
                            <p className="text-xs text-text-secondary dark:text-gray-400">{selectedConversation.online ? 'Online' : 'Offline'}</p>
                        </div>
                        <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg text-text-secondary">
                            <span className="material-symbols-outlined">more_vert</span>
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        {MESSAGES.map(msg => (
                            <div key={msg.id} className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[70%] px-4 py-2.5 rounded-2xl ${msg.isMe ? 'bg-primary text-white rounded-br-md' : 'bg-white dark:bg-gray-800 text-text-primary dark:text-white rounded-bl-md'}`}>
                                    <p className="text-sm">{msg.content}</p>
                                    <p className={`text-[10px] mt-1 ${msg.isMe ? 'text-white/70' : 'text-text-secondary dark:text-gray-400'}`}>{msg.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Input */}
                    <div className="p-4 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
                        <div className="flex items-center gap-3">
                            <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg text-text-secondary">
                                <span className="material-symbols-outlined">attach_file</span>
                            </button>
                            <input
                                type="text"
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                placeholder="Type a message..."
                                className="flex-1 h-11 px-4 rounded-full bg-gray-100 dark:bg-gray-800 border-none text-sm placeholder-gray-400 focus:ring-2 focus:ring-primary/20 outline-none"
                            />
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
