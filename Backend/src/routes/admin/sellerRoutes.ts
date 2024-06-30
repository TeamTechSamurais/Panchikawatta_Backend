// routes/adminRoutes.ts

import  { Router } from 'express';
import { getSellersProvinces } from '../../controllers/admin/sellersController';


export function configureSellersRoutes(router: Router) {
    router.get('/sellers/provinces', getSellersProvinces);
}



