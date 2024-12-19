import 'reflect-metadata';
import { UserController } from './modules/user/user.controller.js';
import type { Application } from 'express';

export function setupRoutes(app: Application) {
  const controllers: any[] = [UserController];

  controllers.forEach((controllerClass) => {
    const instance = new controllerClass();
    const basePath: string = Reflect.getMetadata('basePath', controllerClass);
    const routes = Reflect.getMetadata('routes', controllerClass) || [];

    routes.forEach((route: any) => {
      const method: 'get' | 'post' | 'put' | 'delete' = route.method.toLowerCase();
      const path = `${basePath}${route.path}`;
      const handler = instance[route.handler];

      const middlewares = Reflect.getMetadata('middlewares', controllerClass, route.handler) || [];

      app[method](path, ...middlewares, handler);
    });
  });
}
