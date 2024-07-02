import { Router } from 'express';
//import { getUsers, createUser } from '../controllers/userController';
import { createVehicle, updateVehicle } from '../controllers/vehicle/vehicle';
import { createBusiness } from '../controllers/business/business';
import { deleteUser } from '../controllers/auth/signup';
import { generateJwtToken } from '../controllers/auth/JwtToken';
 
const router = Router();

//router.get('/', getUsers);
//router.post('/', createUser);
// router.post('/cb',createBusiness);
router.post('/cv',createVehicle);
router.post('/uv',updateVehicle);
router.delete('/:id', deleteUser);
router.post('/b',createBusiness );
router.post('/generateJwtToken',generateJwtToken);
// router.post('/signup',signup)
export default router;