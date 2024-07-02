import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import rootRouter from './routes';
import { adListingRoutes, chatRoutes, adminRoutes, loginRoutes, userRoutes, addDataRoutes, adPosting } from './routes/routes';

const app = express();
const allowedOrigins = ['http://10.0.2.2:8000', 'http://127.0.0.1:8000'];

app.use(cors({
  origin: function(origin, callback) {
    // Check if the origin is allowed
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use('/api', rootRouter);

userRoutes(app);
adListingRoutes(app);
chatRoutes(app);
adminRoutes(app);
loginRoutes(app);
addDataRoutes(app);
adPosting(app);

export const prismaClient = new PrismaClient({
  log: ['query']
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
