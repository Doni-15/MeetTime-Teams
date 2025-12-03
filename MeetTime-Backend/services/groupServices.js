import pool from "../config/db.js"; 

export async function buatGrupBaru({ namaGrup, deskripsiGrup, userId }) {
    const client = await pool.connect();

    try {
        await client.query('BEGIN');
        
        const query = `
            INSERT INTO Groups (nama_group, deskripsi, admin_grup) 
            VALUES ($1, $2, $3) 
            RETURNING *
        `;

        const values = [namaGrup, deskripsiGrup, userId];
        const newGroupRes = await client.query(query, values);
        const newGroup = newGroupRes.rows[0];

        const addAdminToGroupQuery = `
            INSERT INTO GroupMembers (group_id, user_id, role)
            VALUES ($1, $2, 'admin')
        `;
        await client.query(addAdminToGroupQuery, [newGroup.id, userId]);

        await client.query('COMMIT');
        return newGroup;
    } 
    catch (error) {
        await client.query('ROLLBACK');
        throw error;
    } 
    finally {
        client.release();
    }
}

export async function joinGrupByCode({ kodeGrup, userId }) {
    try {
        const grupCheck = await pool.query(`
                SELECT id, nama_group 
                FROM Groups
                WHERE kode_undangan = $1
            `,
            [kodeGrup]
        );

        if (grupCheck.rows.length === 0) {
            throw new Error("Kode grup tidak ditemukan");
        }

        const grup = grupCheck.rows[0];

        const memberCheck = await pool.query(`
                SELECT id
                FROM GroupMembers
                WHERE group_id = $1 AND user_id = $2
            `,
            [grup.id, userId]
        );

        if (memberCheck.rows.length > 0) {
            throw new Error("Anda sudah menjadi anggota grup ini");
        }

        const newMember = await pool.query(`
                INSERT INTO GroupMembers (group_id, user_id, role)
                VALUES ($1, $2, 'member')
                RETURNING *
            `,
            [grup.id, userId]
        );

        return {
            ...newMember.rows[0],
            nama_group: grup.nama_group
        };

    } catch (err) {
        if (err.code === '22P02') {
            throw new Error("Kode undangan tidak valid, pastikan kode grup benar");
        }
        
        if (err.code === '23505') {
            throw new Error("Anda sudah bergabung di grup ini");
        }

        throw err;
    }
}

export async function getUserGrup(userId) {
    const query = `
        SELECT g.id, g.nama_group, g.deskripsi, g.kode_undangan, gm.role, gm.joined_at
        FROM GroupMembers gm
        JOIN Groups g ON gm.group_id = g.id
        WHERE gm.user_id = $1
        ORDER BY gm.joined_at DESC
    `;
    
    const result = await pool.query(query, [userId]);
    return result.rows;
}

export async function getMemberGrup(grupId) {
    const query = `
        SELECT u.id, u.name, u.email, u.nim, gm.role, gm.joined_at
        FROM GroupMembers gm
        JOIN Users u ON gm.user_id = u.id
        WHERE gm.group_id = $1
        ORDER BY gm.joined_at ASC
    `;

    const result = await pool.query(query, [grupId]);
    return result.rows;
}

export async function kickMember({ groupId, adminId, targetUserId }) {
    const client = await pool.connect();
    try {
        const groupCheck = await client.query(
            "SELECT id, admin_grup FROM Groups WHERE id = $1", 
            [groupId]
        );

        if (groupCheck.rows.length === 0) {
            throw new Error("Grup tidak ditemukan");
        }

        if (groupCheck.rows[0].admin_grup !== adminId) {
            throw new Error("Akses ditolak: Hanya admin grup yang bisa mengeluarkan anggota");
        }

        if (adminId === targetUserId) {
            throw new Error("Anda tidak bisa mengeluarkan diri sendiri. Gunakan fitur 'Bubarkan Grup' atau 'Keluar Grup'.");
        }

        const result = await client.query(
            "DELETE FROM GroupMembers WHERE group_id = $1 AND user_id = $2 RETURNING *",
            [groupId, targetUserId]
        );

        if (result.rows.length === 0) {
            throw new Error("Anggota tidak ditemukan di grup ini");
        }

        return result.rows[0];

    } 
    finally {
        client.release();
    }
}


export async function addMemberByNim({ groupId, adminId, targetNim }) {
    const client = await pool.connect();
    try {
        const groupCheck = await client.query(
            "SELECT admin_grup FROM Groups WHERE id = $1", 
            [groupId]
        );
        
        if (groupCheck.rows.length === 0) {
            throw new Error("Grup tidak ditemukan");
        }

        if (groupCheck.rows[0].admin_grup !== adminId) {
            throw new Error("Hanya admin yang bisa menambahkan anggota manual");
        }

        const userCheck = await client.query(
            "SELECT id, name FROM Users WHERE nim = $1", 
            [targetNim]
        );

        if (userCheck.rows.length === 0) {
            throw new Error(`Mahasiswa dengan NIM ${targetNim} tidak ditemukan`);
        }

        const targetUser = userCheck.rows[0];

        const memberCheck = await client.query(
            "SELECT id FROM GroupMembers WHERE group_id = $1 AND user_id = $2",
            [groupId, targetUser.id]
        );

        if (memberCheck.rows.length > 0) {
            throw new Error("Mahasiswa ini sudah menjadi anggota grup");
        }

        await client.query(
            "INSERT INTO GroupMembers (group_id, user_id, role) VALUES ($1, $2, 'member')",
            [groupId, targetUser.id]
        );

        return targetUser;

    } 
    finally {
        client.release();
    }
}

export async function cariMahasiswa(keyword) {
    const query = `
        SELECT id, name, nim, email 
        FROM Users 
        WHERE nim ILIKE $1 OR name ILIKE $1
        LIMIT 5
    `;
    const values = [`%${keyword}%`];
    
    const result = await pool.query(query, values);
    return result.rows;
}

export async function deleteGroup({ groupId, adminId }) {
    const client = await pool.connect();
    try {
        const groupCheck = await client.query(
            "SELECT admin_grup FROM Groups WHERE id = $1", 
            [groupId]
        );

        if (groupCheck.rows.length === 0) {
            throw new Error("Grup tidak ditemukan");
        }

        if (groupCheck.rows[0].admin_grup !== adminId) {
            throw new Error("Akses ditolak: Hanya admin yang bisa menghapus grup");
        }

        await client.query("DELETE FROM Groups WHERE id = $1", [groupId]);
        return true;
    } finally {
        client.release();
    }
}

export async function getGroupCombinedSchedules(groupId) {
    const query = `
        WITH GroupUsers AS (
            SELECT user_id FROM GroupMembers WHERE group_id = $1
        )
        -- 1. Ambil Jadwal Kuliah (KRS)
        SELECT 
            m.user_id,
            u.name as nama_user,
            m.nama_hari,
            m.waktu_mulai,
            m.waktu_selesai,
            'kuliah' as tipe
        FROM MataKuliah m
        JOIN Users u ON m.user_id = u.id
        WHERE m.user_id IN (SELECT user_id FROM GroupUsers)

        UNION ALL

        -- 2. Ambil Agenda Dinamis
        SELECT 
            k.user_id,
            u.name as nama_user,
            k.nama_hari,
            k.waktu_mulai,
            k.waktu_selesai,
            'agenda' as tipe
        FROM KegiatanDinamis k
        JOIN Users u ON k.user_id = u.id
        WHERE k.user_id IN (SELECT user_id FROM GroupUsers)
    `;

    const result = await pool.query(query, [groupId]);
    return result.rows;
}