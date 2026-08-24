import assert from 'node:assert/strict';
import test from 'node:test';

import { buatBanyakUser } from '../data_awal/buatBanyakUser.js';
import { usersToCreate } from '../data_awal/usersList.js';

test('fixture hanya memuat identitas sintetis tanpa password source-controlled', () => {
    assert.ok(usersToCreate.length > 0);

    for (const user of usersToCreate) {
        assert.match(user.name, /^Demo /);
        assert.match(user.nim, /^DEMO-/);
        assert.equal(Object.hasOwn(user, 'password'), false);
    }
});

test('seeder menolak dijalankan pada production sebelum mengakses database', async () => {
    const originalNodeEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = 'production';

    try {
        await assert.rejects(() => buatBanyakUser(), /production/);
    } finally {
        if (originalNodeEnv === undefined) {
            delete process.env.NODE_ENV;
        } else {
            process.env.NODE_ENV = originalNodeEnv;
        }
    }
});
