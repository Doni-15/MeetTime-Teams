import pool from "../config/db.js";

export async function buatJadwal(userId, data) {
    const { mataKuliah, hari, jamMulai, jamSelesai } = data;

    const query = `
        INSERT INTO MataKuliah (user_id, nama_matkul, nama_hari, waktu_mulai, waktu_selesai)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING id, nama_matkul, nama_hari, waktu_mulai, waktu_selesai
    `;

    const result = await pool.query(query, [
        userId,
        mataKuliah,
        hari,
        jamMulai,
        jamSelesai 
    ]);

    const row = result.rows[0];
    return {
        id: row.id,
        mataKuliah: row.nama_matkul,
        hari: row.nama_hari,
        jamMulai: row.waktu_mulai,
        jamSelesai: row.waktu_selesai
    };
}

export async function getJadwalUser(userId) {
    const query = `
        SELECT 
            id,
            nama_matkul,
            nama_hari,
            waktu_mulai,
            waktu_selesai
        FROM MataKuliah
        WHERE user_id = $1
        ORDER BY nama_hari DESC
    `;

    const result = await pool.query(query, [userId]);

    return result.rows.map(row => ({
        id: row.id,
        mataKuliah: row.nama_matkul,
        hari: row.nama_hari,
        jamMulai: row.waktu_mulai,
        jamSelesai: row.waktu_selesai
    }));
}

export async function deleteJadwalUser(userId, matkulId) {
    const query = `
        DELETE FROM MataKuliah 
        WHERE id = $1 AND user_id = $2
        RETURNING id
    `;

    const result = await pool.query(query, [matkulId, userId]);
    
    if (result.rows.length === 0) {
        throw new Error("Gagal menghapus. Data tidak ditemukan atau bukan milikmu.");
    }

    return result.rows[0];
}