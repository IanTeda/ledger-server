import appRoot from 'app-root-path';
import { format } from 'winston';
const path = require('path');

const env = process.env.NODE_ENV || 'development';

var options = {
  file: {
    level: 'info',
    datePattern: 'YYYY-MM-DD',
    filename: `${appRoot}/server/logs/server-%DATE%.log`,
    handleExceptions: true,
    json: true,
    maxSize: '20m',
    maxFiles: '30d',
    colorize: false,
    zippedArchive: true
  },
  console: {
    // change level if in dev environment versus production
    level: env === 'development' ? 'debug' : 'info',
    // Handle the exception (error) instead of crashing
    handleExceptions: true,

    // Format the console output
    format: format.combine(
      // Add name of file calling the logger
      format.label({ 
        label: path.basename(process.mainModule.filename) 
      }),
      // Timestamp of log entry
      format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss'
      }),
      // Colorize the out
      format.colorize(),
      // Console log format
      format.printf(
        info => `${info.timestamp} ${info.level} [${info.label}]: ${info.message}`
      )
    )
  },
};

export default options

