import { Router } from 'express';
import { getSpareparts, searchVehicles } from '../../controllers/adListing/searchFunction.controller';
import { getAllSpareParts } from '../../controllers/adListing/showAllParts.controllers';
import { getVehicles } from'../../controllers/adListing/vehicle.Controller';
import { searchVehicles } from '../../controllers/adListing/searchFunction.controller';
import { filterAds } from '../../controllers/adListing/adFilter.controler';


export function configureadListingRoutes(router: Router) {
    //router.get('/', getAllSpareParts);
    router.get('/search', searchVehicles);
    router.get('/getSpareparts', getSpareparts);
    router.get('/filter',filterAds)
}
