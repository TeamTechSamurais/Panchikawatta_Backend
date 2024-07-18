import { Router } from "express";
import { getUserVehicleReminders, markAsDone } from "../../controllers/user/viewReminder.controller";
import { getVehiclesById } from "../../controllers/adListing/vehicle.Controller";


export function configureVehicleRoutes(router: Router) {
    router.get('/getReminder/:userId', getUserVehicleReminders);
    router.put('/markAsDone/:vehicleId/:reminderType', markAsDone);
    router.get('/getVehicles/:userId',getVehiclesById);
}