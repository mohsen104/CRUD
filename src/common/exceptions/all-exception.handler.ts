import type { Application, Response, Request } from "express";

function AllExceptionHandler(app: Application) {
  app.use((err: any, req: Request, res: Response) => {
    let status = err?.status ?? err?.statusCode ?? err?.code;
    if (!status || isNaN(status) || status > 511 || status < 200) status = 500;
    const message = err?.message ?? err?.cause ?? "Internal Server Error";
    res.status(status).json({ message });
  });
}

export default AllExceptionHandler;
