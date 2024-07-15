import { Router } from 'express';

//import { getVehicles } from'../../controllers/adListing/vehicle.Controller';
import { getFilteredAds } from '../../controllers/adListing/adFilter.controler';
import { getSpareparts, searchSpareParts } from '../../controllers/adListing/getSparepartAds.controller';
import { getServices, searchServices } from '../../controllers/adListing/getServiceAds.controller';

import { finalizeOrder, placeOrder } from '../../controllers/adListing/orderManagment.controller';
import { addToFavorites, getFavoritesByUser } from '../../controllers/adListing/userFavoriteSparePart.controller';
import { authenticateUser } from '../../middlewares/authmiddlewares';
import { getBuyerOrders, getSellerOrders, markOrderAsDelivered, markOrderAsDispatched } from '../../controllers/adListing/orders.Controller';

export function configureadListingRoutes(router: Router) {
    router.get('/search', searchSpareParts);
    router.get('/getSpareparts', getSpareparts);
    router.get('/getFilteredAds', getFilteredAds);
    router.get('/getServices', getServices);
    router.get('/searchServices', searchServices);
   

    router.post('/placeOrder', placeOrder);
    router.post('/finalizeOrder', finalizeOrder);
    
// Routes for buyer
router.get('/buyer-orders', authenticateUser, getBuyerOrders);
router.post('/buyer-orders/delivered', authenticateUser, markOrderAsDelivered);

// Routes for seller
router.get('/seller-orders', authenticateUser, getSellerOrders);
router.post('/seller-orders/dispatched', authenticateUser, markOrderAsDispatched);

    router.post('/add-to-favorites', addToFavorites);
    router.get('/favorites/:userId', getFavoritesByUser);
}
