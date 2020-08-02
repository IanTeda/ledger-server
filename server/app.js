
import server from './config/server.config';
import routes from './config/routes.config';
import logger from './util/logger.util';

// Fire the routes
server.use('/api', routes);

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  logger.info(`app running on port ${PORT}`);
});1