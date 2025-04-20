process.on('unhandledRejection', (reason, promise) => {
  console.error('UNHANDLED REJECTION! Shutting down...');
  console.error('Reason:', reason);
  console.error('Promise:', promise);
});
process.on('uncaughtException', (err) => {
  console.error('UNCAUGHT EXCEPTION! Shutting down...');
  console.error(err.name, err.message);
  process.exit(1);
});

import express from "express";
import config from './config/config.js';
import cors from 'cors';
import * as errorHandler from './utils/errorHandler.js'

const app = express()



app.listen(config.port, () => {
  console.log("server RUNNING on port : " + config.port);
});


export default app;
