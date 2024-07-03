import { Router } from 'express';
import { getAdminData } from '../../controllers/admin/adminController';
import { getSellersProvinces } from '../../controllers/admin/sellersController';
import { getAllServices } from '../../controllers/admin/servicesController';
import { deleteUser, getUsers } from '../../controllers/admin/usersController';
import { getVehiclesByUserId, getVehiclesHandler } from '../../controllers/admin/vehicleController';




export function configureAdminRoutes(router: Router) {
    router.get('/details', getAdminData);
    router.get('/sellers-provinces', getSellersProvinces);
    router.get('/services-list',getAllServices)
    router.get('/user-details',getUsers);
    router.delete('/user-delete/:id',deleteUser);
    router.get('/user-vehicle/:id',getVehiclesByUserId);
    router.get('/vehicle-handle',getVehiclesHandler);


    
}