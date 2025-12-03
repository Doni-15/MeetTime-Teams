import * as chatService from "../services/chatService.js";

export async function sendMessage(req, res) {
    try {
        const { groupId } = req.params;
        const { pesan, jenis } = req.body;
        const userId = req.user.id;

        if (!pesan) {
            return res.status(400).json({ 
                message: "Pesan tidak boleh kosong" 
            });
        }

        const newChat = await chatService.kirimPesan({
            groupId,
            userId,
            pesan,
            jenisPesan: jenis || 'pesan'
        });

        res.status(201).json({
            message: "Pesan berhasil dikirim",
            data: newChat
        });

    } catch (error) {
        if (error.message.includes("Akses ditolak")) {
            return res.status(403).json({ message: error.message });
        }
        
        if (error.message.includes("tidak ditemukan")) {
            return res.status(404).json({ message: error.message });
        }

        res.status(500).json({ message: error.message });
    }
}

export async function getMessages(req, res) {
    try {
        const { groupId } = req.params;
        const { jenis } = req.query; 
        const targetJenis = jenis || 'pesan';

        const chats = await chatService.ambilPesan({
            groupId,
            jenisPesan: targetJenis
        });

        res.status(200).json({
            message: "Berhasil mengambil data chat",
            data: chats
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}