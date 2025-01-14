import { UserController } from '@modules/user/user.controller.js';
import type { Application } from 'express';
import type { IRouteDefinition } from '@common/types/route.types.js';
import container from '@common/configs/inversify.config.js';

function setupRoutes(app: Application) {
  const apiPrefix = '/api/v1';

  const controllers: any[] = [UserController];

  controllers.forEach((controllerClass) => {
    const instance = container.resolve<any>(controllerClass);
    const basePath: string = Reflect.getMetadata('basePath', controllerClass);
    const routes: IRouteDefinition[] = Reflect.getMetadata('routes', controllerClass);

    routes.forEach((route: IRouteDefinition) => {
      const method: string = route.method.toLowerCase();
      const path: string = `${apiPrefix}${basePath}${route.path}`;
      const handler: string | symbol = instance[route.handler];

      app[method as keyof Application](path, handler);
    });
  });
}

export default setupRoutes;
