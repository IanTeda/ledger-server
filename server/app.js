
import server from './config/server';
import routes from './config/routes';

// Fire the routes
server.use('/api', routes)

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`app running on port ${PORT}`);
});1