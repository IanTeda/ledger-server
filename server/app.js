// server/app.js

// Import Express Server
import server from './config/server';


// TODO: Add HTTPS

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`app running on port ${PORT}`);
});