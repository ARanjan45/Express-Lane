import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: './drizzle',
  schema: './configs/schema.jsx',
  dialect: 'postgresql',
  dbCredentials: {
    url: 'postgresql://neondb_owner:npg_7EmApkzH5XfQ@ep-silent-sunset-ap2yan2r-pooler.c-7.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require'
  },
});