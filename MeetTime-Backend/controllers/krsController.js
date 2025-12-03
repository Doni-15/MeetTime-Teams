import * as krsService from "../services/krsService.js";

export async function addKrs(req, res) {
    try {
        const userId = req.user.id;
        const data = req.body;
        const { mataKuliah, hari, jamMulai, jamSelesai } = data;

        if (!mataKuliah || !hari || !jamMulai || !jamSelesai) {
            return res.status(400).json({ 
                message: "Data tidak lengkap (mataKuliah, hari, jamMulai, jamSelesai wajib diisi)" 
            });
        }

        const result = await krsService.buatJadwal(userId, data);
        
        return res.status(201).json({
            message: "Jadwal berhasil ditambahkan",
            data: result
        });

    } catch (error) {
        console.error("Controller Error:", error);
        return res.status(500).json({ 
            message: "Terjadi kesalahan pada server" 
        });
    }
}

export async function getKrs(req, res) {
    try {
        const userId = req.user.id;
        const data = await krsService.getJadwalUser(userId);
        res.json(data);
    } 
    catch (error) {
        return res.status(500).json({
            message: "Terjadi kesalahan pada server"
        });
    }
}

export async function deleteKrs(req, res) {
    try {
        const userId = req.user.id;
        const { id } = req.params; 
        
        await krsService.deleteJadwalUser(userId, id);

        res.json({ 
            message: "Jadwal berhasil dihapus" 
        });
    } 
    catch (error) {
        return res.status(400).json({
            message: error.message
        });
    }
}