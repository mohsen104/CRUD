import 'reflect-metadata';
import express, { type Application } from 'express';
import NotFoundHandler from '@exceptions/not-found.handler.js';
import AllExceptionHandler from '@exceptions/all-exception.handler.js';
import ConnectedToMongodb from '@configs/mongodb.config.js';
import setupRoutes from './src/index.routes.js';
import logger from '@common/configs/logger.config.js';

const app: Application = express();
const port = process.env.PORT;
const uri = process.env.MONGODB_URI;
const database = process.env.MONGODB_DATABASE;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  logger.info(`Request received: ${req.method} ${req.url}`);
  next();
});

ConnectedToMongodb(uri, database);

setupRoutes(app);

NotFoundHandler(app);
AllExceptionHandler(app);

app.listen(port, () => {
  console.log(`server run on port ${port}`);
});
