import mongoose from 'mongoose';

export async function connectDatabase() {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    throw new Error('MONGO_URI is required');
  }

  mongoose.set('strictQuery', true);

  await mongoose.connect(uri, {
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 5000,
    autoIndex: process.env.NODE_ENV !== 'production'
  });

  mongoose.connection.on('error', (error) => {
    console.error('MongoDB connection error', error.message);
  });

  console.log('MongoDB connected');
}
