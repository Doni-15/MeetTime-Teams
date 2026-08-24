import jwt from 'jsonwebtoken';
import pool from '../config/db.js';

// Middleware untuk melindungi route 
export async function protect(req, res, next) {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({ message: 'Autentikasi diperlukan' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await pool.query(
            'SELECT id, name, nim, jurusan FROM users WHERE id = $1', 
            [decoded.id]
        );

        if (user.rows.length === 0) {
            return res.status(401).json({ message: 'Autentikasi diperlukan' });
        }

        req.user = user.rows[0];
        next();

    } 
    catch (error) {
        res.status(401).json({ message: 'Autentikasi diperlukan' });
    }
}
