import dotenv from 'dotenv';
import app from './app.js';
import { connectDatabase } from './config/db.js';

dotenv.config();

const PORT = process.env.PORT || 5000;

async function bootstrap() {
  await connectDatabase();

  app.listen(PORT, () => {
    console.log(`Microconcrete API listening on port ${PORT}`);
  });
}

bootstrap().catch((error) => {
  console.error('Failed to start API', error.message);
  process.exit(1);
});
