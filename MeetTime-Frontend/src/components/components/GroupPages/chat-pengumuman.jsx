import { useState, useEffect } from 'react';
import { MegaphoneIcon, PaperAirplaneIcon, ArrowLeftIcon, UserIcon } from '@heroicons/react/24/solid';
import { useChat } from '../../../hooks/useChat';
import { AnnouncementSkeleton } from '../GlobalComponents';

export function PengumumanGrup({ groupId, isAdmin, onBackToChat }) {
    const { chats, loading, fetchChats, sendMessage } = useChat(groupId, 'pengumuman');
    const [input, setInput] = useState("");
    const [isFirstLoad, setIsFirstLoad] = useState(true);

    useEffect(() => {
        const init = async () => {
            await fetchChats();
            setIsFirstLoad(false);
        };

        init();

        const interval = setInterval(fetchChats, 5000);
        return () => clearInterval(interval);
    }, [fetchChats]);

    const handlePost = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const success = await sendMessage(input);
        if (success) setInput("");
    };

    return (
        <div className="flex flex-col h-full bg-base-400/30 relative">
            <div className="bg-white/90 backdrop-blur-md border-b border-base-200 p-3 md:p-4 flex items-center gap-3 shadow-sm sticky top-0 z-20">
                <button 
                    onClick={onBackToChat}
                    className="p-2 rounded-full hover:bg-base-200 text-neutral/60 transition-colors"
                    title="Kembali ke Obrolan"
                >
                    <ArrowLeftIcon className="size-5" />
                </button>
                <div>
                    <h3 className="font-bold text-utama text-sm md:text-base flex items-center gap-2">
                        <MegaphoneIcon className="size-4 text-orange-500" />
                        Papan Pengumuman
                    </h3>
                    <p className="text-xs text-neutral/50">Informasi penting dari Admin</p>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar">
                {isFirstLoad ? (
                    <AnnouncementSkeleton isAdmin={isAdmin} />
                ) : (
                    <>
                        {isAdmin && (
                            <div className="bg-white border border-orange-100 p-5 rounded-2xl shadow-sm animate-in slide-in-from-top-2 duration-300 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-16 h-16 bg-orange-500/5 rounded-bl-full -mr-4 -mt-4"></div>

                                <h3 className="font-bold text-custom-text mb-3 text-sm uppercase tracking-wide opacity-80">
                                    Buat Pengumuman Baru
                                </h3>
                                
                                <form onSubmit={handlePost}>
                                    <textarea 
                                        className="w-full p-4 border border-base-200 rounded-xl focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 outline-none text-sm bg-base-200/30 resize-none placeholder:text-neutral/40 text-custom-text transition-all"
                                        rows="3"
                                        placeholder="Tulis info penting untuk anggota grup..."
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                    ></textarea>
                                    
                                    <div className="flex justify-end mt-3">
                                        <button 
                                            type="submit"
                                            disabled={!input.trim()}
                                            className="bg-orange-500 text-white px-6 py-2 rounded-xl text-sm font-bold hover:bg-orange-600 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-md shadow-orange-500/20 active:scale-95"
                                        >
                                            <PaperAirplaneIcon className="size-4" />
                                            Posting
                                        </button>
                                    </div>
                                </form>
                            </div>
                        )}

                        <div className="space-y-4 pb-10">
                            {chats.length === 0 && (
                                <div className="flex flex-col items-center justify-center py-12 text-neutral/40 gap-3">
                                    <div className="p-4 bg-white rounded-full shadow-sm">
                                        <MegaphoneIcon className="size-10 opacity-30 text-neutral" />
                                    </div>
                                    <p className="text-sm font-medium">Belum ada pengumuman.</p>
                                </div>
                            )}
                            
                            {chats.map((item) => (
                                <div key={item.id} className="relative bg-white border border-base-200 p-5 md:p-6 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 group overflow-hidden">
                                    <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-orange-500"></div>
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-700 font-bold text-sm shadow-sm border border-white">
                                                <UserIcon className="size-5" />
                                            </div>
                                            <div>
                                                <span className="font-bold text-utama text-sm block leading-tight">
                                                    {item.nama_pengirim || "Admin"}
                                                </span>
                                                <span className="text-[10px] text-orange-600 bg-orange-50 px-2 py-0.5 rounded-md font-bold border border-orange-100 uppercase tracking-wider inline-block mt-1">
                                                    Official
                                                </span>
                                            </div>
                                        </div>
                                        
                                        <div className="text-right">
                                            <span className="block text-xs font-bold text-neutral/60">
                                                {new Date(item.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}
                                            </span>
                                            <span className="text-[10px] text-neutral/40">
                                                {new Date(item.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                            </span>
                                        </div>
                                    </div>
                                    
                                    <div className="pl-1">
                                        <p className="text-custom-text text-sm md:text-base leading-relaxed whitespace-pre-wrap font-medium">
                                            {item.pesan}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}