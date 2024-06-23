import { Router } from 'express';
import { getAllSpareParts } from '../controllers/spare_parts/showAllParts.controllers'; // Ensure the path is correct

const router = Router();

router.get('/details', getAllSpareParts);

export default router;
