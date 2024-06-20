import { Router } from 'express';
import { getVehicles } from'../../controllers/spare_parts/vehicle.Controller';
;

const router = Router();

router.get('/', getVehicles);

export default router;
