import express from 'express';
import { protect } from '../middleware/auth.js';

import { 
    addKrs, 
    getKrs, 
    deleteKrs 
} from '../controllers/krsController.js';

const router = express.Router();

router.use(protect);

router.post('/new-krs', addKrs);
router.get('/all-krs', getKrs);
router.delete('/delete-krs/:id', deleteKrs); 

export default router;