import { Router } from 'express';
//import { getVehicles } from'../../controllers/adListing/vehicle.Controller';
import { getFilteredAds } from '../../controllers/adListing/adFilter.controler';
import { getSpareparts, searchSpareParts } from '../../controllers/adListing/getSparepartAds.controller';
import { getServices, searchServices } from '../../controllers/adListing/getServiceAds.controller';


export function configureadListingRoutes(router: Router) {
    router.get('/search', searchSpareParts);
    router.get('/getSpareparts', getSpareparts);
    router.get('/getFilteredAds',getFilteredAds);
    router.get('/getServices', getServices);
    router.get('/searchServices', searchServices);
}
