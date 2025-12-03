import pool from '../config/db.js';

export async function buatAgendaBaru(userId, data) {
    const { namaKegiatan, hari, jamMulai, jamSelesai } = data;
    const query = `
        INSERT INTO KegiatanDinamis (user_id, nama_kegiatan, nama_hari, waktu_mulai, waktu_selesai)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING id, nama_kegiatan, nama_hari, waktu_mulai, waktu_selesai
    `;
  
    const result = await pool.query(query, [
        userId,
        namaKegiatan,
        hari,
        jamMulai,
        jamSelesai 
    ]);

    const row = result.rows[0];
    return {
        id: row.id,
        namaKegiatan: row.nama_kegiatan,
        hari: row.nama_hari,
        jamMulai: row.waktu_mulai,
        jamSelesai: row.waktu_selesai
    };
}

export async function getAgendaUser(userId) {
    const query = `
        SELECT 
            id,
            nama_kegiatan,
            nama_hari,
            waktu_mulai,
            waktu_selesai
        FROM KegiatanDinamis
        WHERE user_id = $1
        ORDER BY nama_hari DESC
    `;

    const result = await pool.query(query, [userId]);

    return result.rows.map(row => ({
        id: row.id,
        namaKegiatan: row.nama_kegiatan,
        hari: row.nama_hari,
        jamMulai: row.waktu_mulai,
        jamSelesai: row.waktu_selesai
    }));
}

export async function deleteAgendaUser(userId, kegiatanId) {
    const query = `
        DELETE FROM KegiatanDinamis 
        WHERE id = $1 AND user_id = $2
        RETURNING id
    `;

    const result = await pool.query(query, [kegiatanId, userId]);

    if(result.rows.length === 0) {
        throw new Error("Gagal menghapus. Data tidak ditemukan atau bukan milikmu.");
    }

    return result.rows[0];
}