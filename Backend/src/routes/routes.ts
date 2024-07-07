import express from 'express';
import { Express, Router } from 'express';
import { configureProfileRoutes } from './spare_parts/profile.routes';

export function profileRoutes(app:Express): void{
    app.use(express.json());
    const profile = Router();
    configureProfileRoutes(profile);
    app.use('/profile', profile);
}