const Pool = require('pg').Pool;
require('dotenv').config();
/*
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'e_commerce',
    password: 'postgres',
    port: 5432
});
*/
const pool = new Pool({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT
});


module.exports = pool;