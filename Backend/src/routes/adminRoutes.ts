import { Router } from 'express';
import { getAdminDetails } from '../controllers/admin/adminController'; // Ensure the path is correct

const router = Router();

router.get('/details', getAdminDetails);

export default router;
