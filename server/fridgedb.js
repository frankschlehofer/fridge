import dotenv from 'dotenv';
import pkg from 'pg';

dotenv.config();
const { Pool } = pkg;

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

export async function testSupabaseConnection() {
  try {
    const result = await pool.query('SELECT NOW()');
    console.log('Successfully connected to Supabase at:', result.rows[0].now);
    return true;
  } catch (err) {
    console.error('Error connecting to Supabase:', err);
    return false;
  }
}

