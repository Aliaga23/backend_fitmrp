const { Pool } = require('pg');
const {PGHOST,PGDATABASE,PGPASSWORD,PGUSER,PGPORT}=require('../configs');
const pool = new Pool({
    host: process.env.PGHOST,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
    port: process.env.PGPORT,
});

pool.connect((err) => {
    if (err) {
        console.error('Error de conexión:', err);
    } else {
        console.log('Conectado a la base de datos.');
    }
});
module.exports = pool; 