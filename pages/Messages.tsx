import React, { useState } from 'react';
import { CREATORS, MESSAGES } from '../data/mockData';

const Messages: React.FC = () => {
    const [activeChat, setActiveChat] = useState<string | null>(null);
    const [messageInput, setMessageInput] = useState('');

    const chatPartners = CREATORS.slice(0, 5).map((creator, i) => ({
        id: creator.id,
        name: creator.name,
        avatar: creator.avatar,
        lastMessage: i === 0 ? "Sounds good, I'll send the draft tomorrow." : "Hey, thanks for reaching out!",
        time: i === 0 ? "10:42 AM" : "Yesterday",
        unread: i === 0 ? 0 : i === 1 ? 2 : 0,
        online: i < 2
    }));

    return (
        <div className="max-w-[1600px] mx-auto h-[calc(100vh-64px)] p-6 lg:p-8 flex gap-6">
            {/* Sidebar */}
            <div className="w-80 bg-white dark:bg-black border border-gray-200 dark:border-neutral-800 rounded-lg flex flex-col shrink-0 overflow-hidden shadow-sm">
                <div className="p-4 border-b border-gray-200 dark:border-neutral-800">
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Messages</h2>
                    <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-neutral-500">
                            <span className="material-symbols-outlined text-[18px]">search</span>
                        </span>
                        <input
                            type="text"
                            placeholder="Search chats..."
                            className="w-full pl-9 pr-4 py-2 text-sm bg-gray-50 dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-md text-gray-900 dark:text-white focus:ring-1 focus:ring-black dark:focus:ring-white focus:border-black dark:focus:border-white outline-none transition-all placeholder-gray-400 dark:placeholder-neutral-600"
                        />
                    </div>
                </div>
                <div className="flex-1 overflow-y-auto">
                    {chatPartners.map((chat) => (
                        <div
                            key={chat.id}
                            onClick={() => setActiveChat(chat.id)}
                            className={`p-4 border-b border-gray-100 dark:border-neutral-800 hover:bg-gray-50 dark:hover:bg-neutral-900 cursor-pointer transition-colors ${activeChat === chat.id ? 'bg-gray-50 dark:bg-neutral-900' : ''}`}
                        >
                            <div className="flex gap-3">
                                <div className="relative">
                                    <img src={chat.avatar} alt={chat.name} className="w-10 h-10 rounded-full object-cover border border-gray-200 dark:border-neutral-700" />
                                    {chat.online && <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white dark:border-black rounded-full"></span>}
                                    </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-start mb-0.5">
                                        <h3 className={`text-sm truncate ${chat.unread > 0 ? 'font-bold text-gray-900 dark:text-white' : 'font-medium text-gray-700 dark:text-gray-300'}`}>{chat.name}</h3>
                                        <span className="text-[10px] text-gray-400 dark:text-neutral-500 font-mono whitespace-nowrap">{chat.time}</span>
                                    </div>
                                    <div className="flex justify-between items-end">
                                        <p className={`text-xs truncate max-w-[140px] ${chat.unread > 0 ? 'font-medium text-gray-900 dark:text-white' : 'text-gray-500 dark:text-neutral-400'}`}>
                                            {chat.lastMessage}
                                        </p>
                                        {chat.unread > 0 && (
                                            <span className="bg-pop-pink text-white text-[10px] font-bold px-1.5 h-4 rounded-full flex items-center justify-center min-w-[16px]">
                                                {chat.unread}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 bg-white dark:bg-black border border-gray-200 dark:border-neutral-800 rounded-lg flex flex-col overflow-hidden shadow-sm">
                {activeChat ? (
                    <>
                    {/* Chat Header */}
                        <div className="p-4 border-b border-gray-200 dark:border-neutral-800 flex justify-between items-center bg-white/80 dark:bg-black/80 backdrop-blur-sm">
                            <div className="flex items-center gap-3">
                                <img src={chatPartners.find(c => c.id === activeChat)?.avatar} alt="Avatar" className="w-10 h-10 rounded-full object-cover border border-gray-200 dark:border-neutral-700" />
                                <div>
                                    <h3 className="font-bold text-gray-900 dark:text-white text-sm">{chatPartners.find(c => c.id === activeChat)?.name}</h3>
                                    <p className="text-xs text-green-600 dark:text-green-400 flex items-center gap-1">
                                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                                        Online
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <button className="p-2 text-gray-400 dark:text-neutral-500 hover:text-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-neutral-800 rounded transition-colors">
                                    <span className="material-symbols-outlined">call</span>
                                </button>
                                <button className="p-2 text-gray-400 dark:text-neutral-500 hover:text-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-neutral-800 rounded transition-colors">
                                    <span className="material-symbols-outlined">videocam</span>
                                </button>
                                <button className="p-2 text-gray-400 dark:text-neutral-500 hover:text-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-neutral-800 rounded transition-colors">
                                    <span className="material-symbols-outlined">more_vert</span>
                                </button>
                            </div>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-6 bg-gray-50/50 dark:bg-neutral-900/50">
                            <div className="space-y-6 max-w-3xl mx-auto">
                                <div className="text-center text-[10px] text-gray-400 dark:text-neutral-600 font-mono uppercase tracking-wide my-4">Today, 10:23 AM</div>
                                
                                <div className="flex justify-end">
                                    <div className="max-w-[80%]">
                                        <div className="bg-black dark:bg-white text-white dark:text-black p-3.5 rounded-2xl rounded-tr-sm shadow-sm">
                                            <p className="text-sm">Hi! Checking in on the draft for the TechFlow campaign. Is everything on track?</p>
                                        </div>
                                        <p className="text-[10px] text-gray-400 dark:text-neutral-500 text-right mt-1 font-mono">10:30 AM</p>
                                    </div>
                                </div>

                                <div className="flex justify-start">
                                    <img src={chatPartners.find(c => c.id === activeChat)?.avatar} alt="Avatar" className="w-8 h-8 rounded-full object-cover mr-3 self-end border border-gray-200 dark:border-neutral-700" />
                                    <div className="max-w-[80%]">
                                        <div className="bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 text-gray-900 dark:text-white p-3.5 rounded-2xl rounded-tl-sm shadow-sm">
                                            <p className="text-sm">Hey! Yes, absolutely. I'm just putting the finishing touches on the editing. It's looking great!</p>
                                        </div>
                                        <p className="text-[10px] text-gray-400 dark:text-neutral-500 mt-1 font-mono">10:35 AM</p>
                                    </div>
                                </div>

                                <div className="flex justify-start">
                                    <div className="w-8 mr-3"></div>
                                    <div className="max-w-[80%]">
                                        <div className="bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 text-gray-900 dark:text-white p-3.5 rounded-2xl rounded-tl-sm shadow-sm">
                                            <p className="text-sm">I'll have the first draft uploaded to the workroom by EOD today.</p>
                                        </div>
                                        <p className="text-[10px] text-gray-400 dark:text-neutral-500 mt-1 font-mono">10:36 AM</p>
                                    </div>
                    </div>

                                <div className="flex justify-end">
                                    <div className="max-w-[80%]">
                                        <div className="bg-black dark:bg-white text-white dark:text-black p-3.5 rounded-2xl rounded-tr-sm shadow-sm">
                                            <p className="text-sm">Perfect, looking forward to seeing it!</p>
                                        </div>
                                        <p className="text-[10px] text-gray-400 dark:text-neutral-500 text-right mt-1 font-mono">10:42 AM</p>
                                    </div>
                                </div>
                            </div>
                    </div>

                        {/* Input Area */}
                        <div className="p-4 bg-white dark:bg-black border-t border-gray-200 dark:border-neutral-800">
                            <div className="max-w-3xl mx-auto flex gap-2 items-end">
                                <button className="p-2 text-gray-400 dark:text-neutral-500 hover:text-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-neutral-800 rounded transition-colors">
                                    <span className="material-symbols-outlined">add_circle</span>
                            </button>
                                <div className="flex-1 bg-gray-50 dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-lg p-2 focus-within:ring-1 focus-within:ring-black dark:focus-within:ring-white transition-all">
                                    <textarea
                                        value={messageInput}
                                        onChange={(e) => setMessageInput(e.target.value)}
                                        placeholder="Type a message..."
                                        rows={1}
                                        className="w-full bg-transparent border-none focus:ring-0 p-0 text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-neutral-600 resize-none max-h-32"
                                        style={{ minHeight: '20px' }}
                                    />
                                </div>
                                <button 
                                    className={`p-2 rounded-lg transition-colors ${messageInput.trim() ? 'bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200' : 'bg-gray-100 dark:bg-neutral-800 text-gray-400 dark:text-neutral-600'}`}
                                    disabled={!messageInput.trim()}
                                >
                                    <span className="material-symbols-outlined">send</span>
                            </button>
                        </div>
                    </div>
                    </>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-center p-8 bg-gray-50/50 dark:bg-neutral-900/50">
                        <div className="w-20 h-20 bg-white dark:bg-black rounded-full border border-gray-200 dark:border-neutral-800 flex items-center justify-center mb-6 shadow-sm">
                            <span className="material-symbols-outlined text-[40px] text-gray-300 dark:text-neutral-700">chat_bubble_outline</span>
                </div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Select a conversation</h3>
                        <p className="text-gray-500 dark:text-neutral-500 max-w-sm">Choose a chat from the sidebar to start messaging your creators.</p>
                    </div>
                )}
                </div>
        </div>
    );
};

export default Messages;
