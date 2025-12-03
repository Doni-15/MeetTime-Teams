import * as groupService from "../services/groupServices.js";

export async function createGroup(req, res) {
    try {
        const { namaGrup, deskripsiGrup } = req.body;
        const userId = req.user.id;

        if (!namaGrup) {
            return res.status(400).json({ 
                message: "Nama grup wajib diisi" 
            });
        }

        const group = await groupService.buatGrupBaru({ 
            namaGrup, 
            deskripsiGrup, 
            userId 
        });

        res.status(201).json({
            message: "Grup berhasil dibuat",
            group
        });

    } catch (error) {
        res.status(400).json({ 
            message: error.message 
        });
    }
}

export async function joinGroup(req, res) {
    try {
        const { kodeGrup } = req.body;
        const userId = req.user.id;

        if (!kodeGrup) {
            return res.status(400).json({ 
                message: "Kode grup wajib diisi" 
            });
        }

        const member = await groupService.joinGrupByCode({ 
            kodeGrup, 
            userId 
        });

        res.status(200).json({
            message: "Berhasil bergabung ke grup",
            member
        });

    } catch (error) {
        res.status(400).json({ 
            message: error.message 
        });
    }
}

export async function getMyGroups(req, res) {
    try {
        const userId = req.user.id;
        const groups = await groupService.getUserGrup(userId);

        res.status(200).json({
            message: "Data grup berhasil diambil",
            groups
        });

    } catch (error) {
        res.status(500).json({ 
            message: error.message 
        });
    }
}

export async function getGroupMembers(req, res) {
    try {
        const { groupId } = req.params; 
        
        if (!groupId) {
            return res.status(400).json({ 
                message: "ID Grup tidak valid" 
            });
        }

        const members = await groupService.getMemberGrup(groupId);

        res.status(200).json({
            message: "Data anggota berhasil diambil",
            members
        });

    } catch (error) {
        res.status(500).json({ 
            message: error.message 
        });
    }
}

export async function removeMember(req, res) {
    try {
        const { groupId, targetUserId } = req.params;
        const adminId = req.user.id; 

        if (!groupId || !targetUserId) {
            return res.status(400).json({ message: "ID Grup dan ID Anggota wajib ada" });
        }

        await groupService.kickMember({ 
            groupId, 
            adminId, 
            targetUserId 
        });

        res.status(200).json({
            message: "Anggota berhasil dikeluarkan dari grup"
        });

    } 
    catch (error) {
        if (error.message.includes("Akses ditolak")) {
            return res.status(403).json({ 
                message: error.message 
            });
        }
        res.status(400).json({ 
            message: error.message 
        });
    }
}

export async function addMemberManual(req, res) {
    try {
        const { groupId } = req.params;
        const { nim } = req.body;
        const adminId = req.user.id;

        if (!nim) {
            return res.status(400).json({
                message: "NIM wajib diisi" 
            });
        }

        const addedUser = await groupService.addMemberByNim({ 
            groupId, 
            adminId, 
            targetNim: nim 
        });

        res.status(200).json({
            message: `Berhasil menambahkan ${addedUser.name} ke grup`,
            data: addedUser
        });

    } 
    catch (error) {
        res.status(400).json({ 
            message: error.message 
        });
    }
}

export async function searchCandidate(req, res) {
    try {
        const { q } = req.query;

        if (!q) {
            return res.status(200).json({ data: [] });
        }

        const users = await groupService.cariMahasiswa(q);

        res.status(200).json({
            message: "Pencarian berhasil",
            data: users
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export async function deleteGroup(req, res) {
    try {
        const { groupId } = req.params;
        const adminId = req.user.id;

        await groupService.deleteGroup({ 
            groupId, 
            adminId 
        });

        res.status(200).json({
            message: "Grup berhasil dihapus permanen"
        });

    } catch (error) {
        if (error.message.includes("Akses ditolak")) {
            return res.status(403).json({ 
                message: error.message 
            });
        }
        res.status(400).json({ message: error.message });
    }
}

export async function getGroupSchedules(req, res) {
    try {
        const { groupId } = req.params;
        
        const schedules = await groupService.getGroupCombinedSchedules(groupId);
        const members = await groupService.getMemberGrup(groupId);

        res.status(200).json({
            message: "Jadwal grup berhasil diambil",
            total_members: members.length,
            schedules: schedules 
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}