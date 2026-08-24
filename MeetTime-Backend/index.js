import app from "./app.js"; 
import cron from 'node-cron';
import { verifyDatabaseConnection } from './config/db.js';
import { validateRuntimeConfig } from './config/runtime.js';

import { autoSoftDeleteExpired, autoHardDeleteTrash } from './services/agendaService.js'; 

const PORT = process.env.PORT || 5000; 

async function startServer() {
    validateRuntimeConfig();
    await verifyDatabaseConnection();

    app.listen(PORT, () => {
        console.log(`Server berjalan pada port ${PORT}`);
        console.log('Koneksi database terverifikasi; cron job aktif.');

        cron.schedule('*/30 * * * *', async () => {
            try {
                await autoSoftDeleteExpired();
            } catch (error) {
                console.error('[CRON ERROR] Gagal melakukan soft delete agenda.');
            }
        });

        cron.schedule('0 0 * * *', async () => {
            try {
                await autoHardDeleteTrash();
            } catch (error) {
                console.error('[CRON ERROR] Gagal membersihkan agenda kedaluwarsa.');
            }
        });
    });
}

startServer().catch((error) => {
    console.error(`Startup gagal: ${error.message}`);
    process.exitCode = 1;
});
