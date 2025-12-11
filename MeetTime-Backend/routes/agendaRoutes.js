import express from 'express';
import { protect } from '../middleware/auth.js';

import { 
    buatAgendaBaru, 
    getAgenda, 
    deleteAgenda,
    getDeletedHistory
} from '../controllers/agendaController.js';

const router = express.Router();

router.use(protect);

router.post('/new-agenda', buatAgendaBaru);
router.get('/all-agenda', getAgenda);
router.delete('/delete-agenda/:id', deleteAgenda);
router.get('/history', getDeletedHistory);

export default router;