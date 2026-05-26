import dotenv from 'dotenv';
import app from './app.js';
import { connectDatabase } from './config/db.js';

dotenv.config();

const PORT = process.env.PORT || 5000;

async function bootstrap() {
  try {
    await connectDatabase();
  } catch (error) {
    console.warn('\n⚠️  MongoDB connection failed. Operating in fallback/mock database mode.');
    console.warn(`Reason: ${error.message}\n`);
  }

  app.listen(PORT, () => {
    console.log(`Microconcrete API listening on port ${PORT}`);
  });
}

bootstrap().catch((error) => {
  console.error('Failed to start API', error.message);
  process.exit(1);
});

