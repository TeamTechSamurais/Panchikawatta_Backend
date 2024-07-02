
import {Router} from 'express'
//import {  login} from '../controllers/auth/auth'
//import { checkJwtExpiry } from '../middlewares/authmiddlewares'
import { signup } from '../controllers/auth/signup'


const authRoutes:Router=Router()
 

authRoutes.post('/',signup)
//authRoutes.post('/l',login)
 
export default authRoutes