import assert from 'node:assert/strict';
import test from 'node:test';

import { createCookieOriginGuard } from '../middleware/csrfOrigin.js';

const trustedOrigin = 'https://meettime.example.invalid';
const guard = createCookieOriginGuard({ trustedOrigin });

function invoke({ method = 'POST', origin, token = 'opaque-session' } = {}) {
    const req = {
        method,
        cookies: token ? { token } : {},
        get(name) {
            return name === 'origin' ? origin : undefined;
        },
    };
    const res = {
        statusCode: 200,
        body: undefined,
        status(code) {
            this.statusCode = code;
            return this;
        },
        json(body) {
            this.body = body;
            return this;
        },
    };
    let nextCalled = false;

    guard(req, res, () => {
        nextCalled = true;
    });

    return { res, nextCalled };
}

test('unsafe cookie request dari origin terpercaya diizinkan', () => {
    const result = invoke({ origin: trustedOrigin });
    assert.equal(result.nextCalled, true);
});

test('unsafe cookie request tanpa Origin ditolak', () => {
    const result = invoke();
    assert.equal(result.nextCalled, false);
    assert.equal(result.res.statusCode, 403);
});

test('unsafe cookie request dari origin lain ditolak', () => {
    const result = invoke({ origin: 'https://attacker.example.invalid' });
    assert.equal(result.nextCalled, false);
    assert.equal(result.res.statusCode, 403);
});

test('safe method dan request tanpa cookie tidak memerlukan Origin', () => {
    assert.equal(invoke({ method: 'GET' }).nextCalled, true);
    assert.equal(invoke({ token: null }).nextCalled, true);
});
