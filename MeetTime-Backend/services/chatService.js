import pool from "../config/db.js";

export async function kirimPesan({ groupId, userId, pesan, jenisPesan }) {
    const client = await pool.connect();
    try {
        if (jenisPesan === 'pengumuman') {
            const groupCheck = await client.query(
                "SELECT admin_grup FROM Groups WHERE id = $1", 
                [groupId]
            );

            if (groupCheck.rows.length === 0) {
                throw new Error("Grup tidak ditemukan");
            }

            if (groupCheck.rows[0].admin_grup !== userId) {
                throw new Error("Akses ditolak: Hanya admin yang bisa membuat pengumuman");
            }
        }

        const query = `
            INSERT INTO ChatGroups (group_id, user_id, pesan, jenis_pesan)
            VALUES ($1, $2, $3, $4)
            RETURNING *
        `;
        
        const result = await client.query(query, [
            groupId, 
            userId, 
            pesan, 
            jenisPesan || 'pesan'
        ]);

        return result.rows[0];

    } finally {
        client.release();
    }
}

export async function ambilPesan({ groupId, jenisPesan }) {
    const query = `
        SELECT 
            c.id, 
            c.pesan, 
            c.jenis_pesan, 
            c.created_at, 
            c.user_id,
            u.name as nama_pengirim, 
            u.nim as nim_pengirim
        FROM ChatGroups c
        JOIN Users u ON c.user_id = u.id
        WHERE c.group_id = $1 AND c.jenis_pesan = $2
        ORDER BY c.created_at ASC
    `;
    
    const result = await pool.query(query, [groupId, jenisPesan]);
    return result.rows;
}