import express, { Express, Request, Response } from 'express';
import bodyParser from 'body-parser';
import { PrismaClient } from '@prisma/client';
import userRoutes from './routes/userRoutes';
import rootRouter from './routes/1index';
import { JWT_SECRET } from './config/config';
import admin from 'firebase-admin';
import jwt from 'jsonwebtoken'; // Import the 'jsonwebtoken' library
import serviceAccount from 'C:/Users/Shehara Fernando/OneDrive/Desktop/Panchikawatta/Backend/Panchikawatta_Backend/Backend/panchikawatta-d9e2e-firebase-adminsdk-42fm8-e29b1feb43.json';

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

// Endpoint to generate JWT token
app.post('/generate-jwt', async (req: Request, res: Response) => {
  try {
    const idToken = req.body.idToken;
    console.log('Generated JWT token:', idToken);
    // Verify Firebase ID token
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const userId = decodedToken.uid;

    // Generate JWT token
    const jwtToken = jwt.sign({ uid: userId }, JWT_SECRET, { expiresIn: '1h' }); // Use your actual secret key
    console.log('Generated JWT token:', jwtToken);
    res.status(200).json({ token: jwtToken });
  } catch (error) {
    console.error('Error generating JWT token:', error);
    res.status(500).json({ error: 'Failed to generate JWT token' });
  }
});

export const prismaClient = new PrismaClient({
  log: ['query'],
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;