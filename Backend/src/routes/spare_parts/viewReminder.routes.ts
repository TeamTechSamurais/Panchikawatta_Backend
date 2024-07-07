import { Router } from "express";
import { getVehicleReminders } from "../../controllers/user/viewReminder.controller";


export function configureVehicleRoutes(router: Router) {
    router.get('/getReminder/:vehicleId', getVehicleReminders);
}