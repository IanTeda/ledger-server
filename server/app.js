
import server from './config/server.config';
import routes from './config/routes.config';
import logger from './util/logger.util';
import {sequelize} from './models';

// Fire the routes
server.use('/api', routes);

// Set our server port
const PORT = process.env.PORT || 3000;

// Start our server
server.listen(PORT, () => {
  logger.info(`app running on port ${PORT}`);
});

// Check database is up
sequelize
  .authenticate()
  .then(() => {
    logger.info("Database connection has been established successfully.");
  })
  .catch((err) => {
    logger.error("Error - Unable to connect to the database:", err);
  });

// Export the server for testing purposes
export default server;