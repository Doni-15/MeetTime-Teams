import pool from "../config/db.js";
import bcrypt from "bcryptjs";

// Buat data user baru
export async function registerUser({ name, jurusan, nim, password }) {
    const checkUser = await pool.query(
        "SELECT nim FROM Users WHERE nim = $1",
        [nim]
    );
    
    if (checkUser.rows.length > 0) {
        throw new Error("NIM sudah terdaftar");
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await pool.query(
        "INSERT INTO Users (name, jurusan, nim, password) VALUES ($1, $2, $3, $4) RETURNING id, name, jurusan, nim",
        [name, jurusan, nim, hashedPassword]
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
        jurusan: userData.jurusan,
        nim: userData.nim
    };
};