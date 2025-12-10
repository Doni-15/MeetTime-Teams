import pool from '../config/db.js';

export async function buatAgendaBaru(userId, data) {
    const { namaKegiatan, hari, tanggal, jamMulai, jamSelesai } = data;
    
    const query = `
        INSERT INTO KegiatanDinamis (user_id, nama_kegiatan, nama_hari, tanggal, waktu_mulai, waktu_selesai)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING id, nama_kegiatan, nama_hari, tanggal, waktu_mulai, waktu_selesai
    `;
  
    const result = await pool.query(query, [
        userId,
        namaKegiatan,
        hari,
        tanggal,
        jamMulai,
        jamSelesai 
    ]);

    const row = result.rows[0];
    return {
        id: row.id,
        namaKegiatan: row.nama_kegiatan,
        hari: row.nama_hari,
        tanggal: row.tanggal,
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
            tanggal,
            waktu_mulai,
            waktu_selesai
        FROM KegiatanDinamis
        WHERE user_id = $1 
        AND deleted_at IS NULL 
        ORDER BY tanggal ASC, waktu_mulai ASC
    `;

    const result = await pool.query(query, [userId]);

    return result.rows.map(row => ({
        id: row.id,
        namaKegiatan: row.nama_kegiatan,
        hari: row.nama_hari,
        tanggal: row.tanggal,
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

export async function autoSoftDeleteExpired() {
    const query = `
        UPDATE KegiatanDinamis
        SET deleted_at = NOW()
        WHERE (tanggal + waktu_selesai) < NOW() 
        AND deleted_at IS NULL
    `;
    
    await pool.query(query);
}

export async function autoHardDeleteTrash() {
    const query = `
        DELETE FROM KegiatanDinamis
        WHERE deleted_at IS NOT NULL
        AND deleted_at < NOW() - INTERVAL '1 DAY'
    `;

    await pool.query(query);
}