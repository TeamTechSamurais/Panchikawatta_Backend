import { Router } from 'express';
import { getVehicles } from'../../controllers/adListing/vehicle.Controller';
import { searchVehicles } from '../../controllers/adListing/searchFunction.controller';

export function configureadListingRoutes(router: Router) {
    router.get('/', getVehicles);
    router.get('/search', searchVehicles);
}
