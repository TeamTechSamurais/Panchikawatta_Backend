import { Router,Request,Response } from 'express';
//import { getUsers, createUser } from '../controllers/userController';
import { createVehicle, updateVehicle } from '../controllers/user/vehicle/vehicle.controller';
import { createBusiness } from '../controllers/user/business/business.controller';
import { deleteUser, signup } from '../controllers/user/auth/signup.controller'
import { checkTokenExpiration, generateJwtToken} from '../controllers/user/auth/JwtToken.controller';
import { resetPassword } from '../controllers/user/auth/resetpassword/resetpassword.controller';

const router = Router();
export function configureUserRoutes(router:Router){
//router.get('/', getUsers);
//router.post('/', createUser);
// router.post('/cb',createBusiness);
router.post('/cv',createVehicle);
router.post('/uv',updateVehicle);
router.delete('/:id', deleteUser);
router.post('/b',createBusiness );
router.post('/generateJwtToken',generateJwtToken);
router.post('/',signup );
router.post('/resetPassword',resetPassword);
// router.post('/signup',signup)
 

// Route to check token expiration
router.get('/checkTokenExpiration', checkTokenExpiration);

// Protected route example
 
}
export default router;