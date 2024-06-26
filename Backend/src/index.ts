import express from 'express';
import cors from 'cors';
import { adListingRoutes, chatRoutes, adminRoutes, loginRoutes, userRoutes, addDataRoutes, adPosting } from './routes/routes';

const app = express();
app.use(cors());
app.use(express.json());

userRoutes(app);
adListingRoutes(app);
chatRoutes(app);
adminRoutes(app);
loginRoutes(app);
addDataRoutes(app);
adPosting(app);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
