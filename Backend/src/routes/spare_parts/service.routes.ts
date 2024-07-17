import { Router } from "express";
import { getServiceById } from "../../controllers/adListing/getPartById.controller";
import { getServicesBySeller } from "../../controllers/adPosting/getServiceBySeller.controller";

export function configureServiceRoutes(router: Router) {
     router.get('/services/:serviceId', getServiceById);
     router.get('/getServicesBySeller/:sellerId', getServicesBySeller);
}