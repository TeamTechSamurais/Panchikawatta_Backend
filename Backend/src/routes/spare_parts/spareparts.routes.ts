import { Router } from 'express';
import { getSparePartById } from '../../controllers/adListing/getPartById.controller';

export function configureSparePartsRoutes(router: Router) {
    router.get('/spare-parts/:id', getSparePartById);
}