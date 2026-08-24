import assert from 'node:assert/strict';
import test from 'node:test';

import { validateRuntimeConfig } from '../config/runtime.js';

const validProductionConfig = {
    NODE_ENV: 'production',
    JWT_SECRET: 'runtime-secret-from-secret-manager',
    DATABASE_URL: 'postgresql://database.example.invalid/meettime',
    CLIENT_URL: 'https://app.example.invalid',
};

test('production menolak konfigurasi tanpa JWT secret', () => {
    const { JWT_SECRET, ...config } = validProductionConfig;

    assert.throws(() => validateRuntimeConfig(config), /JWT_SECRET/);
});

test('production menolak konfigurasi tanpa origin frontend', () => {
    const { CLIENT_URL, ...config } = validProductionConfig;

    assert.throws(() => validateRuntimeConfig(config), /CLIENT_URL/);
});

test('production menolak JWT secret yang terlalu pendek', () => {
    assert.throws(
        () => validateRuntimeConfig({
            ...validProductionConfig,
            JWT_SECRET: 'terlalu-pendek',
        }),
        /minimal 32 karakter/
    );
});

test('production menolak origin frontend tanpa HTTPS', () => {
    assert.throws(
        () => validateRuntimeConfig({
            ...validProductionConfig,
            CLIENT_URL: 'http://app.example.invalid',
        }),
        /HTTPS/
    );
});

test('production menerima secret dan konfigurasi database dari runtime', () => {
    assert.doesNotThrow(() => validateRuntimeConfig(validProductionConfig));
});
