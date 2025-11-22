import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import pool from '../config/db.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 30 * 24 * 60 * 60 * 1000 // 30 hari
};

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { 
        expiresIn: '30d' 
    });
}

// Register
router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // 1. Cek kelengkapan data
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Mohon isi semua kolom (name, email, password)' });
        }

        // 2. Cek apakah user sudah ada
        const userExists = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

        if (userExists.rows.length > 0) {
            return res.status(400).json({ message: 'Email ini sudah terdaftar' });
        }

        // 3. Enkripsi password
        const hashedPassword = await bcrypt.hash(password, 10);

        // 4. Simpan ke database
        const newUser = await pool.query(
            'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email',
            [name, email, hashedPassword]
        );
        
        // 5. Buat token dan kirim respon
        const token = generateToken(newUser.rows[0].id);
        res.cookie('token', token, cookieOptions);
        
        res.status(201).json({ 
            message: "Registrasi berhasil",
            user: newUser.rows[0]
        });

    } catch (error) {
        console.error("ERROR REGISTER:", error.message);
        res.status(500).json({ message: "Terjadi kesalahan pada server", error: error.message });
    }
});

// Login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Mohon isi email dan password' });
        }

        // 1. Cari user berdasarkan email
        const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

        if (user.rows.length === 0) {
            return res.status(400).json({ message: 'Email atau password salah' });
        }

        const userData = user.rows[0];

        // 2. Cek password
        const isMatch = await bcrypt.compare(password, userData.password);

        if (!isMatch) {
            return res.status(400).json({ message: 'Email atau password salah' });
        }

        // 3. Login sukses
        const token = generateToken(userData.id);
        res.cookie('token', token, cookieOptions);
        
        res.status(200).json({ 
            message: "Login berhasil",
            user: {
                id: userData.id,
                name: userData.name,
                email: userData.email
            }
        });

    } catch (error) {
        console.error("ERROR LOGIN:", error.message);
        res.status(500).json({ message: "Terjadi kesalahan pada server", error: error.message });
    }
});

// Me
router.get('/me', protect, async (req, res) => {
    try {
        res.json(req.user);
    } catch (error) {
        console.error("ERROR ME:", error.message);
        res.status(500).json({ message: "Server Error" });
    }
});

// Logout
router.post('/logout', (req, res) => {
    res.cookie('token', '', { 
        ...cookieOptions,
        maxAge: 1
    });
    res.status(200).json({ message: 'Logged out successfully' });
});

export default router;