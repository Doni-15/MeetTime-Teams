import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import pool from '../config/db.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
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
        const { name, email, nim, password } = req.body;

        if (!name || !email || !nim || !password) {
            return res.status(400).json({ 
                message: 'Mohon isi semua kolom (name, email, nim, password)' 
            });
        }

        const emailExist = await pool.query(
            'SELECT id, name, email, nim, password FROM Users WHERE email = $1', 
            [email]
        );
        
        if (emailExist.rows.length > 0) {
            return res.status(400).json({ 
                message: 'Email ini sudah terdaftar' 
            });
        }

        const nimExist = await pool.query(
            'SELECT id, name, email, nim, password FROM Users WHERE nim = $1', 
            [nim]
        );

        if (nimExist.rows.length > 0) {
            return res.status(400).json({ 
                message: 'NIM ini sudah terdaftar' 
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await pool.query(
            'INSERT INTO Users (name, email, nim, password) VALUES ($1, $2, $3, $4) RETURNING id, name, email, nim',
            [name, email, nim, hashedPassword]
        );
                
        res.status(201).json({ 
            message: "Registrasi berhasil, silakan login",
            user: newUser.rows[0]
        });

    } catch (error) {
        console.error("ERROR REGISTER:", error.message);
        res.status(500).json({ 
            message: "Terjadi kesalahan pada server", 
            error: error.message
        });
    }
});

// Login
router.post('/login', async (req, res) => {
    try {
        const { nim, password } = req.body;

        if (!nim || !password) {
            return res.status(400).json({ message: 'Mohon isi NIM dan password' });
        }

        const user = await pool.query(
            'SELECT id, name, email, nim, password FROM Users WHERE nim = $1', 
            [nim]
        );

        if (user.rows.length === 0) {
            return res.status(400).json({ message: 'NIM atau password salah' });
        }

        const userData = user.rows[0];

        const isMatch = await bcrypt.compare(password, userData.password);

        if (!isMatch) {
            return res.status(400).json({ message: 'NIM atau password salah' });
        }

        const token = generateToken(userData.id);
        res.cookie('token', token, cookieOptions);
        
        res.status(200).json({ 
            message: "Login berhasil",
            user: {
                id: userData.id,
                name: userData.name,
                nim: userData.nim
            }
        });

    } catch (error) {
        console.error("ERROR LOGIN:", error.message);
        res.status(500).json({ message: "Terjadi kesalahan pada server", error: error.message });
    }
});

// User profile
router.get('/user', protect, async (req, res) => {
    try {
        res.json(req.user);
    } catch (error) {
        console.error("ERROR :", error.message);
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