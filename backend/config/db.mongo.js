import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

export const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB error:', error);
    process.exit(1);
  }
};
