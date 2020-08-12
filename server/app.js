
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
  logger.info(`SERVER - Running on port ${PORT}`);
});

// Get database connection up
sequelize
  .authenticate()
  .then(() => logger.info("DATABASE - Connection has been established successfully."))
  .catch((err) => logger.error("DATABASE ERROR - Unable to connect to the database:", err));

// Export the server for testing purposes
export default server;