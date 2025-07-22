import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'facebook', // Changed from 'chat' to 'facebook'
  password: 'adMOk34&poK23', // Ensure this matches your .env file
  port: '5432',
});

export default pool;
