import * as dotenv from 'dotenv';
dotenv.config();

export const PORT: number = parseInt(process.env.PORT);

export const JWT_SECRET: string = process.env.JWT_SECRET;

export const DATABASE = {
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};
