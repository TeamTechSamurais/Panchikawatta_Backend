import { Router } from 'express';
import { getSpareparts, searchAds } from '../../controllers/adListing/searchFunction.controller';
import { getAllSpareParts } from '../../controllers/adListing/showAllParts.controllers';
import { getVehicles } from'../../controllers/adListing/vehicle.Controller';
//import { searchVehicles } from '../../controllers/adListing/searchFunction.controller';
import { filterAds } from '../../controllers/adListing/adFilter.controler';
import { confirmOrder, createOrder } from '../../controllers/adListing/orderManagment.controller';


export function configureadListingRoutes(router: Router) {
    //router.get('/', getAllSpareParts);
    router.get('/search', searchAds);
    router.get('/getSpareparts', getSpareparts);
    router.get('/filter',filterAds);
    router.post('/buy',createOrder)
    router.post('/confirmOrder',confirmOrder)
}
