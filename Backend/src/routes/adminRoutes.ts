import { Router } from 'express';
import { getAdminData } from '../controllers/admin/adminController'; 

const router = Router();

router.get('/details', getAdminData);


export default router;