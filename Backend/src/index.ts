import express from 'express';
import { PrismaClient } from '@prisma/client';
import { getAdminData } from './controllers/admin/adminController';
import { getSellersProvinces } from './controllers/admin/sellers/sellersController';

const prisma = new PrismaClient();

const app = express();

app.get('/api/details', getAdminData);
app.get('/api/seller', getSellersProvinces);


const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
// import express from 'express';
// import cors from 'cors';
// import { getAdminData } from './controllers/admin/adminController';

// const app = express();
// const PORT = 8000;

// // CORS configuration allowing requests from localhost and the public IP
// const corsOptions = {
//   origin: ['http://localhost:8000', 'http://112.134.151.123'], // Add your Flutter frontend URL if different
//   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//   credentials: true,
//   optionsSuccessStatus: 204,
// };

// app.use(cors(corsOptions));

// // Define your routes here
// app.get('/api/details', getAdminData);

// // Start the server
// app.listen(PORT, '0.0.0.0', () => {
//   console.log(`Server running on http://0.0.0.0:${PORT}`);
// });

// export default app;
