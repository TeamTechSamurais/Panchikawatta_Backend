import express from 'express';
import bodyParser from 'body-parser';
import { PrismaClient } from '@prisma/client';
// import userRoutes from './routes/userRoutes';
// import { getAllSpareParts } from './controllers/adListing/showAllParts.controllers';
// import { addSparePartToFavorites } from './controllers/adListing/addSparePartToFavorites,controller';

const prisma = new PrismaClient();


const app = express();

app.use(bodyParser.json());
// app.use('/users', userRoutes);
// app.get('/all-spare-parts', getAllSpareParts);

// app.get('/favorites',addSparePartToFavorites);


export default app;