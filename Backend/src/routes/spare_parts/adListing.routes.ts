import { Router } from 'express';

//import { getVehicles } from'../../controllers/adListing/vehicle.Controller';
import { getFilteredAds } from '../../controllers/adListing/adFilter.controller';
import { getSpareparts, searchSpareParts } from '../../controllers/adListing/getSparepartAds.controller';
import { getServices, searchServices } from '../../controllers/adListing/getServiceAds.controller';
import { getSortedServices, getSortedSpareParts } from '../../controllers/adListing/adSort.controller';

import { finalizeOrder, placeOrder } from '../../controllers/adListing/orderManagment.controller';
import { addToFavorites, getFavoritesByUser, searchWishlist } from '../../controllers/adListing/userFavoriteSparePart.controller';
import { authenticateUser } from '../../middlewares/authmiddlewares';
import { deleteOrder, getBuyerOrders, getSellerOrders, markOrderAsDelivered, markOrderAsDispatched } from '../../controllers/adListing/orders.Controller';

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
    
// Route for fetching buyer orders
router.get('/orders/getByUserId/:userId', getBuyerOrders);

// Route for fetching seller orders
router.get('/orders/getBySellerId/:sellerId', getSellerOrders);

// Route for marking an order as dispatched
router.post('/orders/markAsDispatched', markOrderAsDispatched);

// Route for marking an order as delivered
router.post('/orders/markAsDelivered/:orderId', markOrderAsDelivered);

// Route to delete order (cancel order)
router.delete('/orders/delete/:orderId', deleteOrder);

// Route to add a spare part to favorites
router.post('/add-to-favorites', addToFavorites);

// Route to get all favorites for a user
router.get('/favorites/:userId', getFavoritesByUser);

// Route to search within a user's wishlist
router.get('/favorites/:userId/search', searchWishlist);


}
