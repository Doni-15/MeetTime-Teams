import * as agendaService from '../services/agendaService.js';

export async function buatAgendaBaru(req, res) {
    try {
        const userId = req.user.id;
        const data = req.body;
        
        const { namaKegiatan, hari, tanggal, jamMulai, jamSelesai } = data;

        if (!namaKegiatan || !hari || !tanggal || !jamMulai || !jamSelesai) {
            return res.status(400).json({ 
                message: "Data tidak lengkap (namaKegiatan, hari, tanggal, jamMulai, jamSelesai wajib diisi)" 
            });
        }

        const result = await agendaService.buatAgendaBaru(userId, data);

        return res.status(201).json({
            message: "Agenda berhasil ditambahkan",
            data: result
        });
    } 
    catch (error) {
        console.error("Controller Error:", error);
        return res.status(500).json({ 
            message: "Terjadi kesalahan pada server" 
        });
    }
}

export async function getAgenda(req, res) {
    try {
        const userId = req.user.id;
        const data = await agendaService.getAgendaUser(userId);
        res.json(data);
    } 
    catch (error) {
        return res.status(500).json({
            message: "Terjadi kesalahan pada server"
        });
    }  
}

export async function deleteAgenda(req, res) {
    try {
        const userId = req.user.id;
        const { id } = req.params; 
        
        await agendaService.deleteAgendaUser(userId, id);

        res.json({ 
            message: "Agenda berhasil dihapus" 
        });
    } 
    catch (error) {
        return res.status(400).json({
            message: error.message
        });
    }
}

export async function getDeletedHistory(req, res) {
    try {
        const userId = req.user.id;
        const data = await agendaService.getSoftDeletedAgenda(userId);
        res.json(data);
    } 
    catch (error) {
        return res.status(500).json({ message: "Gagal memuat notifikasi" });
    }
}