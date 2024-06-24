import { Router } from 'express';
import { getAllSpareParts } from '../../controllers/adListing/showAllParts.controllers';
import { getSparePartById } from '../../controllers/adListing/getPartById.controller';

export function confgiureSparePartsRoutes(router: Router) {
    router.get('/spare-parts/:id', getSparePartById);
    router.get('/all-spare-parts', getAllSpareParts);
}