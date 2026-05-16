import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

console.log('DB string:', process.env.DB_CONNECTION_STRING);

const sql = neon(process.env.DB_CONNECTION_STRING);
export const db = drizzle({ client: sql });