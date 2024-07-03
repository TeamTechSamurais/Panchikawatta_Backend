import express from 'express';
import { Express, Router } from 'express';
import { configureAdminRoutes } from './spare_parts/adminRoutes';
// import { configureSellersRoutes } from './admin/sellerRoutes';
// import { configureServicesRoutes } from './admin/servicesRoutes';
// import { configureSparePartsRoutes } from './admin/spareRoutes';
// import { configureUserRoutes } from './admin/usersRoutes';
// import { configureVehicleRoutes } from './admin/vehicleRoutes';


// export function userRoutes(app: Express): void {
//   app.use(express.json());
//   const users = Router();
//   configureServiceRoutes(users);
//   configureSparePartsRoutes(users);
//   configureVehicleRoutes(users);
//   app.use('/users', users);
// }

// export function adListingRoutes(app: Express): void {
//   app.use(express.json());
//   const adListing = Router();
//   configureadListingRoutes(adListing);
//   app.use('/adListing', adListing);
// }

export function adminRoutes(app: Express): void {
  app.use(express.json());
  const admin = Router();
  configureAdminRoutes(admin);
  app.use('/admin', admin);
}

// export function loginRoutes(app: Express): void {
//   app.use(express.json());
//   const login = Router();
//   configureLoginRoutes(login);
//   app.use('/login', login);
// }

// export function chatRoutes(app: Express): void {
//   app.use(express.json());
//   const chat = Router();
//   configureChatRoutes(chat);
//   app.use('/chat', chat);
// }

// export function adPosting(app: Express): void {
//     app.use(express.json());
//     const adPosting = Router();
//     configureAdPostingRoutes(adPosting);
//     app.use('/adPosting', adPosting);
// }

// //Data add to DB routes
// export function addDataRoutes(app: Express): void {
//   app.use(express.json());
//   const addData = Router();
//   configureAddDataRoutes(addData);
//   app.use('/addData', addData);
// }