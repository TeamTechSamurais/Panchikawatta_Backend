import express,{Express,Request,Response} from 'express';
import bodyParser from 'body-parser';
import userRoutes from './routes/userRoutes';
import rootRouter from './routes';
import { JWT_SECRET } from './config/config';
import admin from 'firebase-admin';
const app:Express = express();
const serviceAccount = require('C:/Users/Admin/LoginRegistration/Panchikawatta_Backend/panchikawatta-d9e2e-firebase-adminsdk-42fm8-d6a3dbf461.json');

admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    projectId: serviceAccount.project_id,
  });
app.use(bodyParser.json()); // Middleware to parse JSON bodies

// Use routes
app.use('/users', userRoutes);
app.get('/',(req:Request,res:Response)=>{
    res.send('working')
  })


export default app;
// import express, { Express, Request, Response } from 'express';
// import bodyParser from 'body-parser';
// import jwt from 'jsonwebtoken';
// import userRoutes from './routes/userRoutes';
// import rootRouter from './routes';
// import { JWT_SECRET } from './config/config';
//   // Ensure correct path
//  import admin from 'firebase-admin';
// const app: Express = express();

// app.use(bodyParser.json()); // Middleware to parse JSON bodies

// // Use routes
// app.use('/users', userRoutes);
// app.get('/', (req: Request, res: Response) => {
//   res.send('working');
// });

// // Endpoint to generate JWT token
// export const generateJwtToken= async (req: Request, res: Response) => {
//   try {
//     const idToken = req.body.idToken;
//     console.log('Generated JWT token:',idToken); 
//     // Verify Firebase ID token
//     const decodedToken = await admin.auth().verifyIdToken(idToken);
//     const userId = decodedToken.uid;

//     // Generate JWT token
//     const jwtToken = jwt.sign({ uid: userId }, JWT_SECRET, { expiresIn: '1h' }); // Use your actual secret key
//     console.log('Generated JWT token:', jwtToken); 
//     res.status(200).json({ token: jwtToken });
//   } catch (error) {
//     console.error('Error generating JWT token:', error);
//     res.status(500).json({ error: 'Failed to generate JWT token' });
//   }
// };

// export default app;
