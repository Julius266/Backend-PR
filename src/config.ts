import dotenv from 'dotenv';

dotenv.config();

export const SECRET_KEY = process.env.SECRET_KEY || 'fallback-secret-key';
export const PORT = process.env.PORT || 3000;