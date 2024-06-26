import { Router } from 'express';
import { getVehicles } from'../../controllers/adListing/vehicle.Controller';
import { searchVehicles } from '../../controllers/adListing/searchFunction.controller';
import { filterAds } from '../../controllers/adListing/adFilter.controler';


export function configureadListingRoutes(router: Router) {
    router.get('/', getVehicles);
    router.get('/search', searchVehicles);
    router.get('/filter',filterAds)
}
