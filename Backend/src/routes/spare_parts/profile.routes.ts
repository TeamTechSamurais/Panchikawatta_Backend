import { Router } from "express";
import { getUserDetailsByEmail } from "../../controllers/user/getUserDetailsByEmail.controller";
import { updateUserDetails } from "../../controllers/user/updateUserDetails.controller";
import { deleteUser } from "../../controllers/user/deleteUser.controller";
import { getSellerDetails } from "../../controllers/seller/getSellerDetails.controller";
import { getUserDetailsById } from "../../controllers/user/getUserDetailsById";
import { sendNotification } from "../../controllers/user/notifications";
import { updateBusiness } from "../../controllers/user/updateBusiness.controller";

export function configureProfileRoutes(router: Router) {
    router.get('/users/:email', getUserDetailsByEmail); // Get user details by email
    router.get('/user-by-id/:id', getUserDetailsById); // Get user details by ID
    router.put('/users/:email', updateUserDetails); // Update user details
    router.put('/delete-users/:email', deleteUser); // Delete user
    router.get('/sellers-by-id/:userID', getSellerDetails); // Get seller details by user ID
    router.post('/notifications', sendNotification); // Send notification
    router.put('/update-seller/:id', updateBusiness); // update seller
}