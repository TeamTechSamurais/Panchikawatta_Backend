import { Router } from 'express';
import { getSpareparts, searchVehicles } from '../../controllers/adListing/searchFunction.controller';
//import { getVehicles } from'../../controllers/adListing/vehicle.Controller';
import { filterAds } from '../../controllers/adListing/adFilter.controler';


export function configureadListingRoutes(router: Router) {
    router.get('/search', searchVehicles);
    router.get('/getSpareparts', getSpareparts);
    router.get('/filter',filterAds)
}
