import { Router } from "express";
import { getServiceById } from "../../controllers/adListing/getPartById.controller";



export function configureServiceRoutes(router: Router) {
     router.get('/services/:serviceId', getServiceById);
}