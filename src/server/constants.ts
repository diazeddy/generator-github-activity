import dotenv from 'dotenv';

dotenv.config();

export const GIT_USERNAME: string = process.env.GIT_USERNAME ?? "";
export const GIT_EMAIL: string = process.env.GIT_EMAIL ?? "";