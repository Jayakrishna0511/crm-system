import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import externalRoutes from './routes/external.routes.js';


import leadRoutes from './routes/lead.routes.js';
import authRoutes from './routes/auth.routes.js'; // already present

dotenv.config();

const app = express();
app.use(cors({
   origin: ['http://localhost:5173','https://crm-system-lemon.vercel.app'], // adjust when frontend is deployed
  credentials: true
}));
app.use(express.json());


// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/leads', leadRoutes);
app.use('/api', externalRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
