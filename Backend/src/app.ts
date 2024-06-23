import express from 'express';
import { PrismaClient } from '@prisma/client';
import { getAllSpareParts } from './controllers/spare_parts/showAllParts.controllers';
import { getSparePartById } from './controllers/spare_parts/getPartById.controller';
//import { getAdminDetails } from './controllers/admin/adminController';
import adminRoutes from './routes/adminRoutes';
const prisma = new PrismaClient();

const app = express();

app.get('/all-spare-parts', getAllSpareParts);
//app.get('/spare-parts/:id', getSparePartById);
app.use('/getAdminDetails',adminRoutes);