import { Router } from 'express';
import { getSpareparts, searchAds } from '../../controllers/adListing/searchFunction.controller';
import { getAllSpareParts } from '../../controllers/adListing/showAllParts.controllers';
import { getVehicles } from'../../controllers/adListing/vehicle.Controller';
//import { searchVehicles } from '../../controllers/adListing/searchFunction.controller';
import { filterAds } from '../../controllers/adListing/adFilter.controler';
import { confirmOrder, createOrder,cancelOrder } from '../../controllers/adListing/orderManagment.controller';
import { getSellerOrders, getUserOrders, placeOrder, updateOrderStatus } from '../../controllers/user/trackingManagment.controller';


export default function configureadListingRoutes(router: Router) {
    //router.get('/', getAllSpareParts);
    router.get('/search', searchAds);
    router.get('/getSpareparts', getSpareparts);
    router.get('/filter',filterAds);
    router.post('/buy',createOrder)
    router.put('/confirmOrder',confirmOrder)
    router.delete('/deleteorder',cancelOrder)

    router.put('/orders/:orderId/status', updateOrderStatus);
    router.get('/orders/user/:userId', getUserOrders);
    router.get('/orders/seller/:sellerId', getSellerOrders);
}
