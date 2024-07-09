import { Router } from 'express';
//import { getVehicles } from'../../controllers/adListing/vehicle.Controller';
import { getFilteredAds } from '../../controllers/adListing/adFilter.controler';
import { getSpareparts, searchSpareParts } from '../../controllers/adListing/getSparepartAds.controller';
import { getServices, searchServices } from '../../controllers/adListing/getServiceAds.controller';
import { addFavorite, getFavorites } from '../../controllers/adListing/userFavoriteSparePart.controller';

import { cancelOrder, confirmOrder, createOrder } from '../../controllers/adListing/orderManagment.controller';

export function configureadListingRoutes(router: Router) {
    router.get('/search', searchSpareParts);
    router.get('/getSpareparts', getSpareparts);
    router.get('/getFilteredAds',getFilteredAds);
    router.get('/getServices', getServices);
    router.get('/searchServices', searchServices);
    router.get('/favorites',getFavorites)
    router.post('/addfavorite', addFavorite)

    router.post('/buy',createOrder)
    router.put('/confirmOrder',confirmOrder)
    router.delete('/deleteorder',cancelOrder)
}
