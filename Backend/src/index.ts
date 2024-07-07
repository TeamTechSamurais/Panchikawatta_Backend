import express from 'express';
import { profileRoutes } from './routes/routes';

const app = express();

profileRoutes(app);

export default app;