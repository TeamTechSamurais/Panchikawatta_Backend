import express from 'express';
import adminRoutes from './routes/adminRoutes';
import sellerRoutes from './routes/sellerRoutes';

const app = express();

app.use(express.json());
app.use('/api', adminRoutes);
app.use('/api', sellerRoutes);

export default app;
