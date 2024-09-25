import dotenv from 'dotenv';

dotenv.config();

const globalConfig = {
  port: process.env.PORT,
  dbUri: process.env.DATABASE_URI,
  dbUser: process.env.DATABASE_USER,
  dbPass: process.env.DATABASE_PASS,
  dbName: process.env.DATABASE_NAME,
};

export default globalConfig;
