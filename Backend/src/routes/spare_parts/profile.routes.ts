import { Router } from "express";
import { getUserDetailsByEmail } from "../../controllers/user/getUserDetailsByEmail.controller";
import { updateUserDetails } from "../../controllers/user/updateUserDetails.controller";
import { deleteUser } from "../../controllers/user/deleteUser.controller";
import { getSellerDetails } from "../../controllers/seller/getSellerDetails.controller";

export function configureProfileRoutes(router: Router) {
    router.get('/users/:email', getUserDetailsByEmail);
    router.put('/users/:email', updateUserDetails);
    router.put('/delete-users/:email', deleteUser);
    router.get('/sellers-by-id/:userID', getSellerDetails);
}