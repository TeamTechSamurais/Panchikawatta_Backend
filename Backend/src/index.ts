import express from 'express';
import { PrismaClient } from '@prisma/client';
//import { getAllSpareParts } from './controllers/spare_parts/showAllParts.controllers';
import { getSparePartById } from './controllers/spare_parts/getPartById.controller';
//import { addSparePartToFavorites } from './controllers/spare_parts/addSparePartToFavorites,controller';
const prisma = new PrismaClient();

const app = express();

//app.get('/all-spare-parts', getAllSpareParts);
app.get('/spare-parts/:id', getSparePartById);
//app.get('/favorites',addSparePartToFavorites);


const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;