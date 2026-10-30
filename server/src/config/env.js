import dotenv from 'dotenv';

dotenv.config();

const env = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT || 4000),
  mongoUri: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/mandella_cafe',
  jwtSecret: process.env.JWT_SECRET || 'mandella-cafe-dev-secret',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '30d',
  clientOrigin: process.env.CLIENT_ORIGIN || '*',
  autoSeed: process.env.AUTO_SEED !== 'false',
};

export default env;
