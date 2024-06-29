import express from 'express';
import { PrismaClient } from '@prisma/client';
import { getAllSpareParts } from './controllers/spare_parts/showAllParts.controllers';
import { getSparePartById } from './controllers/spare_parts/getPartById.controller';
import { get } from 'http';
import { getUserDetailsByEmail } from './controllers/users/getUserDetailsByEmail';
import { updateUserDetails } from './controllers/users/updateUserDetails';
import { deleteUser } from './controllers/users/deleteUser';

const prisma = new PrismaClient();

const app = express();

app.use(express.json());

app.get('/all-spare-parts', getAllSpareParts);
app.get('/spare-parts/:id', getSparePartById);

app.get('/users/:email', getUserDetailsByEmail);
app.put('/users/:email', updateUserDetails);
app.put('/delete-users/:email', deleteUser);


const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;