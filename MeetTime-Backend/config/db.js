import pg from 'pg';
import dotenv from 'dotenv';
import fs from 'node:fs';

dotenv.config({ quiet: true });

const { Pool } = pg;

const isProduction = process.env.NODE_ENV === 'production';
const connectionString = process.env.DATABASE_URL || process.env.POSTGRES_URL;

function getCertificateAuthority() {
    if (process.env.DB_SSL_CA?.trim()) {
        return process.env.DB_SSL_CA.replace(/\\n/g, '\n');
    }

    if (process.env.DB_SSL_CA_FILE?.trim()) {
        return fs.readFileSync(process.env.DB_SSL_CA_FILE, 'utf8');
    }

    return undefined;
}

function getSslConfig() {
    const sslEnabled = isProduction || process.env.DB_SSL === 'true';

    if (!sslEnabled) {
        return false;
    }

    const ca = getCertificateAuthority();

    return {
        rejectUnauthorized: true,
        ...(ca ? { ca } : {}),
    };
}

const dbConfig = connectionString
    ? {
        connectionString: connectionString,
        ssl: getSslConfig(),
    }
    : {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        port: process.env.DB_PORT,
        ssl: getSslConfig(),
    };

const pool = new Pool(dbConfig);

export async function verifyDatabaseConnection() {
    await pool.query('SELECT 1');
}

export default pool;
