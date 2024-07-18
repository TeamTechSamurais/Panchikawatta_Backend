import { Router } from 'express';
import { postSparePart } from '../../controllers/adPosting/postSparepart.controller';
import { postService } from '../../controllers/adPosting/postService.controller';
import { deleteServiceById } from '../../controllers/adPosting/deleteAd.controller';

export function configureAdPostingRoutes(router: Router) {
    router.post('/postSparePart', postSparePart);
    router.post('/postService', postService);
    router.delete('/deleteService/:serviceId', deleteServiceById);
}
