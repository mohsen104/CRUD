import type { Application, Response, Request } from "express";

function NotFoundHandler(app: Application) {
  app.use((req: Request, res: Response) => {
    res.status(404).json({
      message: "Not Found Route",
      method: req.method,
      url: req.originalUrl,
    });
  });
}

export default NotFoundHandler;