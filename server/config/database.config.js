const { loggers } = require('winston');

require('dotenv').config();

module.exports = {
  "development": {
    "username": process.env.DB_USER,
    "password": process.env.DB_PASS,
    "database": "ledger_dev",
    "host": process.env.DB_HOST,
    "port": process.env.DB_PORT,
    "dialect": 'postgres'
  },
  "test": {
    "username": process.env.DB_USER,
    "password": process.env.DB_PASS,
    "database": "ledger_test",
    "host": process.env.DB_HOST,
    "port": process.env.DB_PORT,
    "dialect": "postgres"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": process.env.DB_HOST,
    "dialect": "postgres"
  }
}