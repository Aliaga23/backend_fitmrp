const { Client } = require('pg');

const client = new Client({
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
});

client.connect()
  .then(() => console.log('Conexión exitosa a PostgreSQL'))
  .catch(err => console.error('Error de conexión:', err));
