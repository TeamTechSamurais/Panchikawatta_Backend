import express from 'express';
import { profileRoutes } from './routes/routes';
import app from './app';

profileRoutes(app);

export default app;