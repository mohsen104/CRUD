import type { Application, Response, Request } from 'express';
import { StatusCodes } from '@constants/statusCodes.js';
import logger from '@common/configs/logger.config.js';

interface IResponseAllException {
  code?: number | string;
  message: string;
  stack?: string;
}

function AllExceptionHandler(app: Application) {
  app.use((err: any, req: Request, res: Response<IResponseAllException>) => {
    let status = err?.status ?? err?.statusCode ?? err?.code;
    if (!status || isNaN(status) || status > 511 || status < 200) status = StatusCodes.INTERNAL_SERVER_ERROR;
    const message = err?.message ?? err?.cause ?? 'Internal Server Error';
    logger.error(message);
    if (process.env.NODE_ENV === 'development') {
      res.status(status).json({ code: err?.code, message, stack: err.stack });
    } else {
      res.status(status).json({ message });
    }
  });
}

export default AllExceptionHandler;
