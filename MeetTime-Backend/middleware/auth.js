import jwt from 'jsonwebtoken';
import pool from '../config/db.js';

// Middleware untuk melindungi route 
export async function protect(req, res, next) {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({ message: 'Not authorized, no token' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await pool.query(
            'SELECT id, name, nim, jurusan FROM users WHERE id = $1', 
            [decoded.id]
        );

        if (user.rows.length === 0) {
            return res.status(401).json({ message: 'User not found' });
        }

        req.user = user.rows[0];
        next();

    } 
    catch (error) {
        console.error("JWT Error:", error.message);
        res.status(401).json({ message: 'Not authorized, token failed' });
    }
}