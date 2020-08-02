import express from "express";
import bodyParser from "body-parser";
import multer from 'multer';
import morgan from 'morgan';
import logger from '../util/logger.util';

const upload = multer();
const server = express();

server.use(morgan('combined', { stream: logger.stream }));

// For parsing application/json
server.use(bodyParser.json());

// For parsing application/xwww-form-urlencoded
server.use(bodyParser.urlencoded({
  extended: true
}));

// For parsing multipart/form-data
server.use(upload.array());
server.use(express.static('public'));

export default server;