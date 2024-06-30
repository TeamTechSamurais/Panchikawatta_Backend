import { Router } from 'express';
import { getAdminData } from '../../controllers/admin/adminController'; 


export function configureAdminRoutes(router: Router) {
    router.get('/details', getAdminData);
}