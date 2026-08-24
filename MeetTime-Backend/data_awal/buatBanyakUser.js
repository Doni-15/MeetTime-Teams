import * as authService from "../services/authService.js";
import { usersToCreate } from "./usersList.js";
import dotenv from 'dotenv';
import { fileURLToPath } from 'node:url';

dotenv.config({ quiet: true });

export async function buatBanyakUser() {
    if (process.env.NODE_ENV === 'production') {
        throw new Error('Seeder demo tidak boleh dijalankan pada production.');
    }

    const seedPassword = process.env.MEETTIME_SEED_PASSWORD?.trim();

    if (!seedPassword || seedPassword.length < 12) {
        throw new Error(
            'MEETTIME_SEED_PASSWORD wajib diisi minimal 12 karakter untuk seeder development.'
        );
    }

    for(const userData of usersToCreate) {
        try {
            const userDataFixed = { 
                ...userData, 
                password: seedPassword,
            };

            const user = await authService.registerUser(userDataFixed);

            console.log(`User created: ${user.nim} - ${user.name}`);
        } 
        catch (error) {
            console.error(`Gagal membuat fixture ${userData.nim}: ${error.message}`);
        }
        await new Promise(resolve => setTimeout(resolve, 100));
    }
    console.log('Seeder user development selesai.');
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
    buatBanyakUser().catch((error) => {
        console.error(`Seeder gagal: ${error.message}`);
        process.exitCode = 1;
    });
}
