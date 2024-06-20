import { Router } from 'express';
import { getAllSpareParts } from '../../controllers/spare_parts/showAllParts.controllers';

const router = Router();

router.get('/all-spare-parts', getAllSpareParts);

export default router;