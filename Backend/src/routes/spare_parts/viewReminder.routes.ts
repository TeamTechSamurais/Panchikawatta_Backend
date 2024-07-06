import { Router } from "express";
import { getUserVehicleReminders } from "../../controllers/user/viewReminder.controller";


export function configureVehicleRoutes(router: Router) {
    router.get('/getReminder/:userId', getUserVehicleReminders);
}