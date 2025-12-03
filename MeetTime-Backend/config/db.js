import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

const isProduction = process.env.NODE_ENV === 'production';
const connectionString = process.env.DATABASE_URL || process.env.POSTGRES_URL;

const dbConfig = connectionString
    ? {
        connectionString: connectionString,
        ssl: {
            rejectUnauthorized: false,
        },
    }
    : {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        port: process.env.DB_PORT,
        ssl: false, 
    };

const pool = new Pool(dbConfig);

pool.connect((err) => {
    if (err) {
        console.error('Koneksi Database Gagal:', err.message);
    } 
    else {
        console.log(`Terhubung ke Database (${isProduction ? 'Cloud/Railway' : 'Lokal'})`);
    }
});

export default pool;