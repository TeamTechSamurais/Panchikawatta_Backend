import express from 'express';
import { Express, Router } from 'express';
import { configureServiceRoutes } from './spare_parts/service.routes';
import { confgiureSparePartsRoutes } from './spare_parts/spareparts.routes';
import { configureadListingRoutes } from './spare_parts/adListing.routes'
import { configureAdminRoutes } from './spare_parts/admin.routes';
import { configureLoginRoutes } from './spare_parts/loging.routes';
import { configureChatRoutes } from './spare_parts/chat.routes';

export function userRoutes(app: Express):void {
    app.use(express.json());
    const users = Router();
    configureServiceRoutes(users);
    confgiureSparePartsRoutes(users);
    app.use('/users', users);
}

export function adListingRoutes(app:Express) {
    app.use(express.json());
    const adListing = Router();
    configureadListingRoutes(adListing);
    app.use('/adListing', adListing);
}

export function adminRoutes(app:Express) {
    app.use(express.json());
    const admin = Router();
    configureAdminRoutes(admin);
    app.use('/vehicle', admin);
}

export function loginRoutes(app:Express) {
    app.use(express.json());
    const login = Router();
    configureLoginRoutes(login);
    app.use('/login', login);
}

export function chatRoutes(app:Express) {
    app.use(express.json());
    const chat = Router();
    configureChatRoutes(chat);
    app.use('/chat', chat);
}