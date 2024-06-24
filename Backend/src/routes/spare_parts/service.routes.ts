import { Router } from "express";
import { createServiceAd } from '../../controllers/user/servicePost.controller';


export function configureServiceRoutes(router: Router) {
    router.post('/service', createServiceAd);
    
}