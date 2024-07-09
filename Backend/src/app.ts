import express, { Express, Request, Response } from 'express';
import bodyParser from 'body-parser';
import { PrismaClient } from '@prisma/client';
import userRoutes from './routes/userRoutes';
import rootRouter from './routes/1index';
import { JWT_SECRET } from './config/config';
import admin from 'firebase-admin';
import jwt from 'jsonwebtoken'; // Import the 'jsonwebtoken' library
const serviceAccount = require('C:/Users/Admin/mergednew/Panchikawatta_Backend/panchikawatta-d9e2e-firebase-adminsdk-42fm8-d6a3dbf461.json');

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  projectId: serviceAccount.project_id,
});

const app: Express = express();

app.use(bodyParser.json()); // Middleware to parse JSON bodies

// Use routes
app.use('/users', userRoutes);
app.use('/api', rootRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('working');
});
 

export const prismaClient = new PrismaClient({
  log: ['query'],
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;