import  {  Router } from 'express';
import { getAllServices } from '../../controllers/admin/servicesController';



// Route to get all services


export function configureServicesRoutes(router: Router) {
    router.get('/sellers/provinces', getAllServices);
}
