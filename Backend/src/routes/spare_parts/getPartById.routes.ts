import { Router } from 'express';
import { getSparePartById } from '../../controllers/spare_parts/getPartById.controller';

const router = Router();

router.get('/spare-parts/:id', getSparePartById);

export default router;
