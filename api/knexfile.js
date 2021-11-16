// Update with your config settings.
require('dotenv').config()
module.exports = {
  client: 'postgresql',
  connection: {
    database: process.env.DB_PROJECT,
    user:     process.env.DB_USER,
    password: process.env.DB_PASS,
  },
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: 'knex_migrations'
  }
};
