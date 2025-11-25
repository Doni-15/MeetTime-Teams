import pool from "../config/db.js";
import bcrypt from "bcryptjs";

// Buat data user baru
export async function registerUser({ name, email, nim, password }) {
    const checkUser = await pool.query(
        "SELECT email, nim FROM Users WHERE email = $1 OR nim = $2",
        [email, nim]
    );
    
    if (checkUser.rows.length > 0) {
        throw new Error("Email atau NIM sudah terdaftar");
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await pool.query(
        "INSERT INTO Users (name, email, nim, password) VALUES ($1, $2, $3, $4) RETURNING id, name, email, nim",
        [name, email, nim, hashedPassword]
    );
    
    return newUser.rows[0];
}

// Buat data user bisa login
export async function loginUser(nim, password) {
    const user = await pool.query("SELECT * FROM Users WHERE nim = $1", [nim]);

    if (user.rows.length === 0) {
        throw new Error("NIM tidak ditemukan");
    }

    const userData = user.rows[0];
    const isMatch = await bcrypt.compare(password, userData.password);

    if (!isMatch) {
        throw new Error("Password salah");
    }

    return {
        id: userData.id,
        name: userData.name,
        email: userData.email,
        nim: userData.nim
    };
};