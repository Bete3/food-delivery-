import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';

// Load environment variables

// Connect to MongoDB Atlas
connectDB();

const app = express();

// Middleware
app.use(cors()); // Allows your Next.js frontend to talk to this API safely
app.use(express.json()); // Parses incoming JSON payloads

// Routes Middleware
app.use('/api/auth', authRoutes);

// Base Check Route
app.get('/', (req, res) => {
  res.send('API is running beautifully... ✨');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server skipping along on port http://localhost:${PORT}`);
});