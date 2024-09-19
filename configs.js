require('dotenv').config();

module.exports = {
    PORT: process.env.PORT || 3001,
    JWT_SECRET: process.env.JWT_SECRET || '123',
    PGHOST: process.env.PGHOST || 'autorack.proxy.rlwy.net',
    PGUSER: process.env.PGUSER || 'postgres',
    PGPASSWORD: process.env.PGPASSWORD || 'lJoFTTIztrcbgCCWjUdFQjTKAyMDzxhd',
    PGDATABASE: process.env.PGDATABASE || 'railway',
    PGPORT: process.env.PGPORT || 40624
};
