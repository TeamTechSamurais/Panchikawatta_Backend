import express from 'express';
import adminRoutes from './routes/adminRoutes'; // Ensure the path is correct

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json()); // Add middleware to parse JSON

// Register routes
app.use('/admin', adminRoutes); // Assuming your routes are set up with a base path of /admin

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
