
import server from './config/server.config';
import routes from './config/routes.config';
import logger from './util/logger.util';

// Fire the routes
server.use('/api', routes);

// Set our server port
const PORT = process.env.PORT || 3000;

// Start our server
server.listen(PORT, () => {
  logger.info(`app running on port ${PORT}`);
});1

// Export the server for testing purposes
export default server;