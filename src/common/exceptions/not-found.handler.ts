import type { Application, Response, Request } from 'express';
import { StatusCodes } from '@constants/statusCodes.js';
import logger from '@common/configs/logger.config.js';

function NotFoundHandler(app: Application) {
  app.use((req: Request, res: Response) => {
    logger.error(`Not Found Route: ${req.method} ${req.url}`);
    res.status(StatusCodes.NOT_FOUND).json({
      message: 'Not Found Route',
      method: req.method,
      url: req.originalUrl,
    });
  });
}

export default NotFoundHandler;
