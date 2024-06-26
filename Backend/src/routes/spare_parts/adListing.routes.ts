import { Router } from 'express';
import { getSpareparts, searchVehicles } from '../../controllers/adListing/searchFunction.controller';
import { getAllSpareParts } from '../../controllers/adListing/showAllParts.controllers';

export function configureadListingRoutes(router: Router) {
    //router.get('/', getAllSpareParts);
    router.get('/search', searchVehicles);
    router.get('/getSpareparts', getSpareparts);
}
