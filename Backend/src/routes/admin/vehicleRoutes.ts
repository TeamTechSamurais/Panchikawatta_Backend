// vehicleRoutes.ts
import { Router } from 'express';
import { getVehiclesHandler } from '../../controllers/admin/vehicleController';
import { getVehiclesByUserId } from '../../controllers/admin/vehicleController';

export function configureVehicleRoutes(router: Router) {
    router.get('/vehicles', getVehiclesHandler);
    router.get('/vehicles/:userId', getVehiclesByUserId);
}