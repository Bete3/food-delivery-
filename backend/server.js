import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
const clientOrigin = process.env.CLIENT_ORIGIN || 'http://localhost:3000';

app.use(cors({ origin: clientOrigin }));
app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/auth', authRoutes);

app.use((req, res) => {
  res.status(404).json({ message: `Route ${req.originalUrl} not found` });
});

connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
});