import express from 'express';
import { Express, Router } from 'express';
import { configureServiceRoutes } from './spare_parts/service.routes';
import { configureSparePartsRoutes } from './spare_parts/spareparts.routes';
import { configureadListingRoutes } from './spare_parts/adListing.routes';
import { configureAdminRoutes } from './spare_parts/admin.routes';
import { configureLoginRoutes } from './spare_parts/loging.routes';
import { configureChatRoutes } from './spare_parts/chat.routes';
import { configureAddDataRoutes } from './spare_parts/addData.routes';
import { configureAdPostingRoutes } from './spare_parts/postSparepart.routes';
import { configureVehicleRoutes } from './spare_parts/viewReminder.routes';

export function userRoutes(app: Express): void {
  app.use(express.json());
  const users = Router();
  configureServiceRoutes(users);
  configureSparePartsRoutes(users);
  configureVehicleRoutes(users);
  app.use('/users', users);
}

export function adListingRoutes(app: Express): void {
  app.use(express.json());
  const adListing = Router();
  configureadListingRoutes(adListing);
  app.use('/adListing', adListing);
}

export function adminRoutes(app: Express): void {
  app.use(express.json());
  const admin = Router();
  configureAdminRoutes(admin);
  app.use('/vehicle', admin);
}

export function loginRoutes(app: Express): void {
  app.use(express.json());
  const login = Router();
  configureLoginRoutes(login);
  app.use('/login', login);
}

export function chatRoutes(app: Express): void {
  app.use(express.json());
  const chat = Router();
  configureChatRoutes(chat);
  app.use('/chat', chat);
}

export function adPosting(app: Express): void {
    app.use(express.json());
    const adPosting = Router();
    configureAdPostingRoutes(adPosting);
    app.use('/adPosting', adPosting);
}

//Data add to DB routes
export function addDataRoutes(app: Express): void {
  app.use(express.json());
  const addData = Router();
  configureAddDataRoutes(addData);
  app.use('/addData', addData);
}