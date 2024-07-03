import express from 'express';
import bodyParser from 'body-parser';
import { PrismaClient } from '@prisma/client';
// import adminRoutes from './routes/admin/adminRoutes'; // Make sure paths are correct
// import sellerRoutes from './routes/admin/sellerRoutes'; // Make sure paths are correct
// import vehicleRoutes from './routes/admin/vehicleRoutes'; // Import vehicleRoutes
// import usersRoutes from './routes/admin/usersRoutes'; // Import usersRoutes
// import servicesRoutes from './routes/admin/servicesRoutes';

const prisma = new PrismaClient();
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// // Mount your routes
// app.use('/api', adminRoutes);
// app.use('/api', sellerRoutes);
// app.use('/api', vehicleRoutes); // Mount vehicleRoutes under /api
// app.use('/api', usersRoutes); // Mount usersRoutes under /api
// app.use('api', servicesRoutes)

export default app;
