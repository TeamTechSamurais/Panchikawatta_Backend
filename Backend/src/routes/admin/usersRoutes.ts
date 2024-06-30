import { Router } from 'express';
import { getUsers, deleteUser} from '../../controllers/admin/usersController';

export function configureUserRoutes(router: Router) {
    router.get('/users', getUsers);
    router.get('/user/:id', deleteUser);

}