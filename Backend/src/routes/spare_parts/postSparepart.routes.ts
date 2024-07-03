import { Router } from 'express';
import { getOrders } from '../../controllers/adPosting/getOrder.controller';
//import { postSparePartStep1, postSparePartStep2 } from '../../controllers/adPosting/postSparepart.controller';


export function configureAdPostingRoutes(router: Router) {
    router.get('/getOrders', getOrders);
    // router.post('/postSparePartStep1', postSparePartStep1);
    // router.post('/postSparePartStep2', postSparePartStep2);
}
