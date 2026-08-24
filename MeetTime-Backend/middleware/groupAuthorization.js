import pool from '../config/db.js';

const PRIVATE_RESOURCE_MESSAGE = 'Resource grup tidak tersedia';

async function findGroupAccess({ groupId, userId }) {
    const result = await pool.query(
        `SELECT gm.role, (g.admin_grup = gm.user_id) AS is_admin
         FROM GroupMembers gm
         JOIN Groups g ON g.id = gm.group_id
         WHERE gm.group_id = $1 AND gm.user_id = $2`,
        [groupId, userId]
    );

    return result.rows[0] ?? null;
}

export function createGroupAccessMiddleware({
    lookup = findGroupAccess,
    adminOnly = false,
} = {}) {
    return async function authorizeGroupAccess(req, res, next) {
        if (!req.user?.id) {
            return res.status(401).json({ message: 'Autentikasi diperlukan' });
        }

        const { groupId } = req.params;

        if (!groupId) {
            return res.status(404).json({ message: PRIVATE_RESOURCE_MESSAGE });
        }

        try {
            const access = await lookup({ groupId, userId: req.user.id });

            if (!access || (adminOnly && !access.is_admin)) {
                return res.status(404).json({ message: PRIVATE_RESOURCE_MESSAGE });
            }

            req.groupAccess = access;
            return next();
        } catch (error) {
            if (error.code === '22P02') {
                return res.status(404).json({ message: PRIVATE_RESOURCE_MESSAGE });
            }

            return next(error);
        }
    };
}

export const requireGroupMember = createGroupAccessMiddleware();
export const requireGroupAdmin = createGroupAccessMiddleware({ adminOnly: true });

export function requireAnnouncementAdmin(req, res, next) {
    if (req.body?.jenis === 'pengumuman' && !req.groupAccess?.is_admin) {
        return res.status(404).json({ message: PRIVATE_RESOURCE_MESSAGE });
    }

    return next();
}
