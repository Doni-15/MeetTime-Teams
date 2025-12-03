import * as authService from "../services/authService.js";
import jwt from "jsonwebtoken";

// Buat cookies dengan umur 30 hari
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    maxAge: 30 * 24 * 60 * 60 * 1000 // 30 hari
};

// Control registrasi user
export async function register(req, res) {
    try {
        const { name, email, nim, password } = req.body;

        if (!name || !email || !nim || !password) {
            return res.status(400).json({ message: "Semua kolom wajib diisi" });
        }

        const user = await authService.registerUser({ name, email, nim, password });

        res.status(201).json({
            message: "Registrasi berhasil, silakan login",
            user
        });

    } 
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Controll login user
export async function login(req, res) {
    try {
        const { nim, password } = req.body;

        if (!nim || !password) {
            return res.status(400).json({ message: "NIM dan Password wajib diisi" });
        }

        const user = await authService.loginUser(nim, password);

        const token = generateToken(user.id);
        res.cookie('token', token, cookieOptions);

        res.status(200).json({
            message: "Login berhasil",
            user
        });

    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};

// Control logout
export async function logout(req, res) {
    res.cookie('token', '', { 
        ...cookieOptions,
        maxAge: 0
    });
    res.status(200).json({ message: 'Logged out successfully' });
}

// Check user 
export async function getMe(req, res) {
    if (!req.user) {
        return res.status(401).json({ message: "Tidak terautentikasi" });
    }
    res.json(req.user);
};