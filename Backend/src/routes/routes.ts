import express from 'express';
import { Express, Router } from 'express';
import { configureUserRoutes } from './userRoutes'

export function userRoutes(app: Express): void {
  app.use(express.json());
  const user = Router();
  configureUserRoutes(user);
  app.use('/users', user);
}
