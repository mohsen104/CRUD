import router from '@common/decorators/RouteDecorator.js';
import { Router } from 'express';

function setupRoutes() {
  const routes = Router();
  routes.use(router);
  return routes;
}

export default setupRoutes;
