import 'reflect-metadata';
import { UserController } from '@modules/user/user.controller.js';
import type { Application } from 'express';
import type { IRouteDefinition } from '@common/types/route.types.js';

export function setupRoutes(app: Application) {
  const controllers: any[] = [UserController];

  controllers.forEach((controllerClass) => {
    const instance = new controllerClass();
    const basePath: string = Reflect.getMetadata('basePath', controllerClass);
    const routes: IRouteDefinition[] = Reflect.getMetadata('routes', controllerClass);

    routes.forEach((route: IRouteDefinition) => {
      const method: string = route.method.toLowerCase();
      const path: string = `${basePath}${route.path}`;
      const handler: string | symbol = instance[route.handler];

      app[method as keyof Application](path, handler);
    });
  });
}
