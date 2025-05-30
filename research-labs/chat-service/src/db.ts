import config from './config/config';
import { Pool } from 'pg';

// const pool = new Pool({
//   user: config.database.user,
//   host: config.database.host,
//   database: config.database.database,
//   password: config.database.password,
//   port: config.database.port
// });

const pool = new Pool({
  connectionString: config.database_url,
});

(async () => {
  try {
    const res = await pool.query('SELECT NOW() as current_time');
    console.log('Database connected successfully:', res.rows[0].current_time);
  } catch (err) {
    console.error('Database connection failed:', err);
  }
})();

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
});

export default pool;
