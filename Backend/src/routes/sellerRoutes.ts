// routes/adminRoutes.ts

import express from 'express';
import { getSellersProvinces } from '../controllers/admin/sellers/sellersController';

const router = express.Router();

router.get('/sellers/provinces', getSellersProvinces);

export default router;
