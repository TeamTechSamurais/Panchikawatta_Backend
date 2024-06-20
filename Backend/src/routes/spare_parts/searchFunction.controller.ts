import { Router } from 'express';
import { getVehicles, searchVehicles } from '../../controllers/spare_parts/searchFunction.controller';

const router = Router();

router.get('/', getVehicles);
router.get('/search', searchVehicles);

export default router;
