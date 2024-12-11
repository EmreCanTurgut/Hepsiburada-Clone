import { Pool } from 'pg';

const pool = new Pool({
    host: process.env.DBHOST || 'localhost',
    port: process.env.DBPORT ? parseInt(process.env.DBPORT) : 5432,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
});

export default pool;
