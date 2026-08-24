import assert from 'node:assert/strict';
import test from 'node:test';

import {
    createGroupAccessMiddleware,
    requireAnnouncementAdmin,
} from '../middleware/groupAuthorization.js';

function createResponse() {
    return {
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
}

async function invoke(middleware, request) {
    const response = createResponse();
    let nextCalled = false;
    let nextError;

    await middleware(request, response, (error) => {
        nextCalled = true;
        nextError = error;
    });

    return { response, nextCalled, nextError };
}

const memberLookup = async ({ groupId, userId }) => {
    if (groupId === 'group-a' && userId === 'user-a') {
        return { role: 'member', is_admin: false };
    }

    return null;
};

test('anggota group A dapat mengakses resource group A', async () => {
    const middleware = createGroupAccessMiddleware({ lookup: memberLookup });
    const request = { params: { groupId: 'group-a' }, user: { id: 'user-a' } };
    const result = await invoke(middleware, request);

    assert.equal(result.nextCalled, true);
    assert.equal(result.nextError, undefined);
    assert.deepEqual(request.groupAccess, { role: 'member', is_admin: false });
});

test('anggota group A tidak dapat mengakses resource group B', async () => {
    const middleware = createGroupAccessMiddleware({ lookup: memberLookup });
    const result = await invoke(middleware, {
        params: { groupId: 'group-b' },
        user: { id: 'user-a' },
    });

    assert.equal(result.nextCalled, false);
    assert.equal(result.response.statusCode, 404);
    assert.equal(result.response.body.message, 'Resource grup tidak tersedia');
});

test('pengguna non-member ditolak tanpa membocorkan keberadaan group', async () => {
    const middleware = createGroupAccessMiddleware({ lookup: memberLookup });
    const result = await invoke(middleware, {
        params: { groupId: 'group-a' },
        user: { id: 'user-lain' },
    });

    assert.equal(result.nextCalled, false);
    assert.equal(result.response.statusCode, 404);
    assert.equal(result.response.body.message, 'Resource grup tidak tersedia');
});

test('request tanpa autentikasi ditolak sebelum lookup membership', async () => {
    let lookupCalled = false;
    const middleware = createGroupAccessMiddleware({
        lookup: async () => {
            lookupCalled = true;
            return null;
        },
    });
    const result = await invoke(middleware, { params: { groupId: 'group-a' } });

    assert.equal(lookupCalled, false);
    assert.equal(result.nextCalled, false);
    assert.equal(result.response.statusCode, 401);
    assert.equal(result.response.body.message, 'Autentikasi diperlukan');
});

test('operasi admin menolak member biasa', async () => {
    const middleware = createGroupAccessMiddleware({
        lookup: memberLookup,
        adminOnly: true,
    });
    const result = await invoke(middleware, {
        params: { groupId: 'group-a' },
        user: { id: 'user-a' },
    });

    assert.equal(result.nextCalled, false);
    assert.equal(result.response.statusCode, 404);
});

test('pengumuman grup ditolak untuk member non-admin', async () => {
    const result = await invoke(requireAnnouncementAdmin, {
        body: { jenis: 'pengumuman' },
        groupAccess: { role: 'member', is_admin: false },
    });

    assert.equal(result.nextCalled, false);
    assert.equal(result.response.statusCode, 404);
});
