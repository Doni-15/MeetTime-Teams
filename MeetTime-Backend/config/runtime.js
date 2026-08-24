import dotenv from 'dotenv';

dotenv.config({ quiet: true });

function requireValue(env, name) {
    const value = env[name]?.trim();

    if (!value) {
        throw new Error(`Konfigurasi wajib belum tersedia: ${name}`);
    }

    return value;
}

export function validateRuntimeConfig(env = process.env) {
    const production = env.NODE_ENV === 'production';

    const jwtSecret = requireValue(env, 'JWT_SECRET');

    const hasConnectionString = Boolean(
        env.DATABASE_URL?.trim() || env.POSTGRES_URL?.trim()
    );
    const databaseFields = ['DB_HOST', 'DB_PORT', 'DB_NAME', 'DB_USER'];
    const hasDatabaseFields = databaseFields.every((name) => env[name]?.trim());

    if (!hasConnectionString && !hasDatabaseFields) {
        throw new Error(
            'Konfigurasi database wajib menggunakan DATABASE_URL/POSTGRES_URL atau DB_HOST, DB_PORT, DB_NAME, dan DB_USER.'
        );
    }

    if (production) {
        if (jwtSecret.length < 32) {
            throw new Error('JWT_SECRET production wajib memiliki minimal 32 karakter.');
        }

        const clientUrl = requireValue(env, 'CLIENT_URL');
        let parsedClientUrl;

        try {
            parsedClientUrl = new URL(clientUrl);
        } catch {
            throw new Error('CLIENT_URL production harus berupa URL HTTPS yang valid.');
        }

        if (parsedClientUrl.protocol !== 'https:') {
            throw new Error('CLIENT_URL production harus menggunakan HTTPS.');
        }

        if (!hasConnectionString) {
            requireValue(env, 'DB_PASSWORD');
        }
    }
}

export function getClientOrigin(env = process.env) {
    if (env.CLIENT_URL?.trim()) {
        return env.CLIENT_URL.trim();
    }

    if (env.NODE_ENV === 'production') {
        throw new Error('Konfigurasi wajib belum tersedia: CLIENT_URL');
    }

    return 'http://localhost:5173';
}

export function getTrustProxyHops(env = process.env) {
    const rawValue = env.TRUST_PROXY_HOPS ?? '0';
    const hops = Number.parseInt(rawValue, 10);

    if (!Number.isInteger(hops) || hops < 0 || hops > 10) {
        throw new Error('TRUST_PROXY_HOPS harus berupa angka 0 sampai 10.');
    }

    return hops;
}
