import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: './drizzle',
  schema: './configs/schema.jsx',
  dialect: 'postgresql',
  dbCredentials: {
    url: 'postgresql://neondb_owner:npg_bjQ76FXAvNoe@ep-steep-bar-a14alcf7-pooler.ap-southeast-1.aws.neon.tech/SpecTrum?sslmode=require&channel_binding=require'
  },
});