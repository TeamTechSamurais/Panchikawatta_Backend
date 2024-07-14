import { Router } from 'express';
//import { getVehicles } from'../../controllers/adListing/vehicle.Controller';
import { getFilteredAds } from '../../controllers/adListing/adFilter.controller';
import { getSpareparts, searchSpareParts } from '../../controllers/adListing/getSparepartAds.controller';
import { getServices, searchServices } from '../../controllers/adListing/getServiceAds.controller';
import { getSortedServices, getSortedSpareParts } from '../../controllers/adListing/adSort.controller';

import { finalizeOrder, placeOrder } from '../../controllers/adListing/orderManagment.controller';
import { addToFavorites, getFavoritesByUser } from '../../controllers/adListing/userFavoriteSparePart.controller';
import { getOrdersBySeller, updateOrderStatus } from '../../controllers/adListing/orders.Controller';

export function configureadListingRoutes(router: Router) {
    router.get('/search', searchSpareParts);
    router.get('/getSpareparts', getSpareparts);
    router.get('/getFilteredAds', getFilteredAds);
    router.get('/getServices', getServices);
    router.get('/searchServices', searchServices);
    router.get('/getsortedspareparts', getSortedSpareParts);
    router.get('/getsortedservices', getSortedServices);
   

    router.post('/placeOrder', placeOrder);
    router.post('/finalizeOrder', finalizeOrder);
    
    router.get('/orders/seller/:sellerId', getOrdersBySeller);
    router.put('/orders/:orderId/status', updateOrderStatus);

    router.post('/add-to-favorites', addToFavorites);
    router.get('/favorites/:userId', getFavoritesByUser);
}
