import { Router } from 'express';
import { getAdminData } from '../../controllers/admin/adminController';
import {  getSellersProvinces } from '../../controllers/admin/sellersController';
import { getServiceDetails,getAllServices} from '../../controllers/admin/servicesController';
//import { deleteUser, getUsers , getAllSellerDetailsBySellerId } from '../../controllers/admin/usersController';
import { getVehiclesByUserId, getVehiclesHandler } from '../../controllers/admin/vehicleController';
import { getUsers } from '../../controllers/admin/usersController';
import { runInContext } from 'vm';
import { getAllSpareParts, getSparePartDetails } from '../../controllers/admin/sparepartscontroller';
import { getSparePartsByDate } from '../../controllers/admin/sparepartBydate';
import { getAccountCount } from '../../controllers/admin/signUpChartController';




export function configureAdminRoutes(router: Router) {
    router.get('/details', getAdminData);
    router.get('/sellers-provinces', getSellersProvinces);
    router.get('/services-list',getAllServices)
    router.get('/service-details/:serviceId', getServiceDetails);
    router.get('/user-details',getUsers);
    //router.delete('/user-delete/:id',deleteUser);
    router.get('/user-vehicle/:id',getVehiclesByUserId);
    router.get('/vehicle-handle',getVehiclesHandler);   
    router.get('/sparepart-list',getAllSpareParts);
    router.get('/spareparts-details/:sparePartId', getSparePartDetails);
    router.get('/sparepartsBydate', getSparePartsByDate);
    router.get('/monthly-signups', getAccountCount);

    
}