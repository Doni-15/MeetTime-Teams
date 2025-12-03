import { useEffect, useState, useRef } from 'react';
import { PaperAirplaneIcon, MegaphoneIcon, UserCircleIcon } from '@heroicons/react/24/solid';
import { useChat } from '../../../hooks/useChat'; 
import api from '../../../config/api'; 

export function ChatRoom({ groupId, onOpenAnnouncements }) {
    const { chats, fetchChats, sendMessage } = useChat(groupId, 'pesan');
    const [input, setInput] = useState("");
    const [myId, setMyId] = useState(null);

    useEffect(() => {
        const getMe = async () => {
            try {
                const res = await api.get('/auth/user');
                setMyId(res.data.id);
            } catch (err) {
                console.error("Gagal load user", err);
            }
        };
        getMe();
    }, []);

    useEffect(() => {
        fetchChats();
        const interval = setInterval(fetchChats, 3000); 
        return () => clearInterval(interval);
    }, [fetchChats]);


    const handleSend = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;
        
        const success = await sendMessage(input);
        if (success) setInput("");
    };

    return (
        <div className="flex flex-col h-full bg-base-400/30 relative">
            <div className="bg-white/90 backdrop-blur-md border-b border-base-200 p-3 md:p-4 flex justify-between items-center shadow-sm z-10 sticky top-0">
                <div className="flex items-center gap-2">
                    <div className="size-2 rounded-full bg-success animate-pulse"></div>
                    <h3 className="font-bold text-utama text-sm md:text-base">Obrolan Grup</h3>
                </div>
                
                <button 
                    onClick={onOpenAnnouncements}
                    className="flex items-center gap-2 bg-secondary/10 text-secondary hover:bg-secondary hover:text-white px-3 py-1.5 md:px-4 md:py-2 rounded-xl text-xs font-bold transition-all duration-300 shadow-sm active:scale-95"
                >
                    <MegaphoneIcon className="size-4" />
                    <span className="hidden sm:inline">Papan Pengumuman</span>
                </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
                
                {chats.length === 0 && (
                    <div className="flex flex-col items-center justify-center mt-20 text-neutral/40 gap-2">
                        <div className="p-4 bg-white rounded-full shadow-sm">
                            <PaperAirplaneIcon className="size-8 opacity-50 -rotate-45 ml-1 mt-1" />
                        </div>
                        <p className="text-sm font-medium">Belum ada percakapan. Sapa temanmu!</p>
                    </div>
                )}

                {chats.map((chat) => {
                    const isMe = chat.user_id === myId;
                    
                    return (
                        <div key={chat.id} className={`flex w-full ${isMe ? 'justify-end' : 'justify-start'}`}>
                            <div className={`flex max-w-[85%] md:max-w-[70%] gap-2 ${isMe ? 'flex-row-reverse' : 'flex-row'}`}>
                                {!isMe && (
                                    <div className="shrink-0 flex flex-col justify-end pb-1">
                                        <div className="size-8 rounded-full bg-base-200 flex items-center justify-center text-neutral/50 border border-white shadow-sm">
                                            <UserCircleIcon className="size-6" />
                                        </div>
                                    </div>
                                )}

                                <div className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                                    {!isMe && (
                                        <span className="text-[10px] text-neutral/60 ml-1 mb-1 font-bold truncate max-w-[150px]">
                                            {chat.nama_pengirim}
                                        </span>
                                    )}

                                    <div className={`
                                        relative px-4 py-2 text-sm shadow-sm
                                        ${isMe 
                                            ? 'bg-primary text-white rounded-2xl rounded-tr-none'
                                            : 'bg-white text-custom-text border border-base-200 rounded-2xl rounded-tl-none'
                                        }
                                    `}>
                                        <p className="leading-relaxed whitespace-pre-wrap break-words pb-1">
                                            {chat.pesan}
                                        </p>
                                        
                                        <div className={`text-[9px] text-right mt-1 font-medium ${isMe ? 'text-white/70' : 'text-neutral/40'}`}>
                                            {new Date(chat.created_at).toLocaleTimeString([], { hour: '2-digit', minute:'2-digit' })}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="p-3 md:p-4 bg-white border-t border-base-200">
                <form onSubmit={handleSend} className="flex gap-2 items-end">
                    <div className="flex-1 relative">
                        <input 
                            type="text" 
                            className="w-full bg-base-200/50 border border-transparent text-custom-text rounded-2xl px-5 py-3 pr-10 focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none text-sm transition-all placeholder:text-neutral/40"
                            placeholder="Ketik pesan..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                        />
                    </div>
                    
                    <button 
                        type="submit" 
                        disabled={!input.trim()}
                        className="bg-primary text-white p-3 rounded-xl hover:bg-primary/90 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-primary/20 flex items-center justify-center"
                    >
                        <PaperAirplaneIcon className="size-5 -ml-0.5 mt-0.5 -rotate-45" />
                    </button>
                </form>
            </div>
        </div>
    );
}