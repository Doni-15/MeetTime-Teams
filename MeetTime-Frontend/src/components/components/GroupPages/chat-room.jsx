import { useEffect, useState, useRef } from 'react';
import { PaperAirplaneIcon, MegaphoneIcon, UserCircleIcon } from '@heroicons/react/24/solid';
import { useChat } from '../../../hooks/useChat'; 
import api from '../../../config/api'; 
import { toast } from 'react-hot-toast';

export function ChatRoom({ groupId, onOpenAnnouncements }) {
    const { chats, fetchChats, sendMessage, addLocalChat } = useChat(groupId, 'pesan');
    
    const [input, setInput] = useState("");
    const [myId, setMyId] = useState(null);
    const [myName, setMyName] = useState("Saya"); 

    const containerRef = useRef(null); 

    useEffect(() => {
        const getMe = async () => {
            try {
                const res = await api.get('/auth/user');
                setMyId(res.data.id);
                setMyName(res.data.name); 
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

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const isNearBottom = container.scrollHeight - container.scrollTop - container.clientHeight < 150;

        if (isNearBottom || chats.length < 10) {
            container.scrollTo({
                top: container.scrollHeight,
                behavior: 'smooth'
            });
        }
    }, [chats]); 

    const handleSend = async (e) => {
        e.preventDefault();
        const textToSend = input.trim();
        if (!textToSend) return;
        
        setInput("");

        const tempChat = {
            id: Date.now(),
            user_id: myId,
            nama_pengirim: myName,
            pesan: textToSend,
            created_at: new Date().toISOString()
        };

        addLocalChat(tempChat);

        setTimeout(() => {
            const container = containerRef.current;
            if (container) {
                container.scrollTo({
                    top: container.scrollHeight,
                    behavior: 'smooth'
                });
            }
        }, 100);

        try {
            await sendMessage(textToSend);
        } catch (err) {
            console.error("Gagal kirim pesan", err);
            toast.error("Gagal mengirim pesan");
            setInput(textToSend);
        }
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

            <div 
                ref={containerRef} 
                className="flex-1 overflow-y-auto p-4 min-h-90 max-h-90 space-y-4 custom-scrollbar scroll-smooth"
            >
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
                                        <div className="size-8 rounded-full bg-netral-abu flex items-center justify-center text-base-100 border border-white shadow-sm">
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