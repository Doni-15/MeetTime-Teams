import { useState, useCallback } from 'react';
import { toast } from 'react-hot-toast';
import { chatService } from '@/services/chatService';

export function useChat(groupId, jenisPesan = 'pesan') {
    const [chats, setChats] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchChats = useCallback(async () => {
        setLoading(true);
        try {
            const res = await chatService.getChats(groupId, jenisPesan);
            setChats(res.data || []);
        } catch (err) {
            console.error("Gagal mengambil chat:", err);
        } finally {
            setLoading(false);
        }
    }, [groupId, jenisPesan]);

    const sendMessage = async (pesan) => {
        if (!pesan.trim()) return;

        try {
            await chatService.sendChat(groupId, { 
                pesan, 
                jenis: jenisPesan 
            });
            
            await fetchChats(); 
            return true;
        } catch (err) {
            const msg = err.response?.data?.message || "Gagal mengirim pesan";
            toast.error(msg);
            return false;
        }
    };

    return { 
        chats, 
        loading, 
        fetchChats, 
        sendMessage 
    };
}