import app from "./app.js"; 
import dotenv from 'dotenv';
import cron from 'node-cron'; // 1. Import library cron

// 2. Import service otomatis yang sudah kita buat
import { autoSoftDeleteExpired, autoHardDeleteTrash } from './services/agendaService.js'; 

dotenv.config();
const PORT = process.env.PORT || 5000; 

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);

    console.log('Cron Jobs system initialized...');

    cron.schedule('*/30 * * * *', async () => {
        try {
            await autoSoftDeleteExpired();
        } catch (error) {
            console.error('[CRON ERROR] Gagal auto soft delete:', error);
        }
    });

    cron.schedule('0 0 * * *', async () => {
        try {
            await autoHardDeleteTrash();
        } catch (error) {
            console.error('[CRON ERROR] Gagal auto hard delete:', error);
        }
    });
});