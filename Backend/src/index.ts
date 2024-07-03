import express from 'express';
import { PrismaClient } from '@prisma/client';
import { adminRoutes, /*sellersRoutes, serviceRoutes, sparePartsRoutes, userRoutes, vehicleRoutes*/ } from './routes/routes';

const prisma = new PrismaClient();
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Routes function
adminRoutes(app);
// sellersRoutes(app);
// serviceRoutes(app);
// sparePartsRoutes(app);
// userRoutes(app);
// vehicleRoutes(app);



const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
