import mongoose from 'mongoose';
import env from './env.js';

const connectDatabase = async () => {
  mongoose.set('strictQuery', true);
  await mongoose.connect(env.mongoUri);
  console.log(`[db] connected -> ${mongoose.connection.name}`);
  return mongoose.connection;
};

export const disconnectDatabase = () => mongoose.disconnect();

export default connectDatabase;
