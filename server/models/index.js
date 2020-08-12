'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/database.config.js')[env];
import logger from '../util/logger.util';
const db = {};

let sequelize;

// Add application logger to Sequelize logging
// https://github.com/sequelize/sequelize/issues/7821#issuecomment-311700339
if (process.env.NODE_ENV === 'production') {
  config.logging = (msg) => logger.debug(msg)
} else if (process.env.NODE_ENV === 'development') {
  config.logging = (msg) => logger.info(msg)
} else {
  config.logging = false;
}

// Load database config
sequelize = new Sequelize(
  config.database, 
  config.username, 
  config.password, 
  config
);

// Parse model files
fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

// Load databases associations
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// Load databases
db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Export database
module.exports = db;
