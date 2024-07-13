import { Router } from 'express';
//import { getVehicles } from'../../controllers/adListing/vehicle.Controller';
import { getFilteredAds } from '../../controllers/adListing/adFilter.controller';
import { getSpareparts, searchSpareParts } from '../../controllers/adListing/getSparepartAds.controller';
import { getServices, searchServices } from '../../controllers/adListing/getServiceAds.controller';
import { getSortedServices, getSortedSpareParts } from '../../controllers/adListing/adSort.controller';


export function configureadListingRoutes(router: Router) {
    router.get('/search', searchSpareParts);
    router.get('/getSpareparts', getSpareparts);
    router.get('/getFilteredAds',getFilteredAds);
    router.get('/getServices', getServices);
    router.get('/searchServices', searchServices);
    router.get('/getsortedspareparts', getSortedSpareParts);
    router.get('/getsortedservices', getSortedServices);
}
