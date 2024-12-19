import 'reflect-metadata';

interface RouteDefinition {
  method: string;
  path: string;
  handler: string | symbol;
}

export function Controller(basePath: string): ClassDecorator {
  return (target: Function) => {
    Reflect.defineMetadata('basePath', basePath, target);
    if (!Reflect.hasMetadata('routes', target)) {
      Reflect.defineMetadata('routes', [], target);
    }
  };
}

export function Get(path: string): MethodDecorator {
  return (target: Object, propertyKey: string | symbol, descriptor: PropertyDescriptor) => {
    const controllerClass = target.constructor;
    if (!Reflect.hasMetadata('routes', controllerClass)) {
      Reflect.defineMetadata('routes', [], controllerClass);
    }
    const routes: RouteDefinition[] = Reflect.getMetadata('routes', controllerClass);
    routes.push({ method: 'GET', path, handler: propertyKey });
    Reflect.defineMetadata('routes', routes, controllerClass);
  };
}

export function Post(path: string): MethodDecorator {
  return (target: Object, propertyKey: string | symbol, descriptor: PropertyDescriptor) => {
    const controllerClass = target.constructor;
    if (!Reflect.hasMetadata('routes', controllerClass)) {
      Reflect.defineMetadata('routes', [], controllerClass);
    }
    const routes: RouteDefinition[] = Reflect.getMetadata('routes', controllerClass);
    routes.push({ method: 'POST', path, handler: propertyKey });
    Reflect.defineMetadata('routes', routes, controllerClass);
  };
}

export function Put(path: string): MethodDecorator {
  return (target: Object, propertyKey: string | symbol, descriptor: PropertyDescriptor) => {
    const controllerClass = target.constructor;
    if (!Reflect.hasMetadata('routes', controllerClass)) {
      Reflect.defineMetadata('routes', [], controllerClass);
    }
    const routes: RouteDefinition[] = Reflect.getMetadata('routes', controllerClass);
    routes.push({ method: 'PUT', path, handler: propertyKey });
    Reflect.defineMetadata('routes', routes, controllerClass);
  };
}

export function Delete(path: string): MethodDecorator {
  return (target: Object, propertyKey: string | symbol, descriptor: PropertyDescriptor) => {
    const controllerClass = target.constructor;
    if (!Reflect.hasMetadata('routes', controllerClass)) {
      Reflect.defineMetadata('routes', [], controllerClass);
    }
    const routes: RouteDefinition[] = Reflect.getMetadata('routes', controllerClass);
    routes.push({ method: 'DELETE', path, handler: propertyKey });
    Reflect.defineMetadata('routes', routes, controllerClass);
  };
}

export function Middleware(middleware: Function): MethodDecorator {
  return (target: Object, propertyKey: string | symbol, descriptor: PropertyDescriptor) => {
    const controllerClass = target.constructor;

    if (!Reflect.hasMetadata('middlewares', controllerClass, propertyKey)) {
      Reflect.defineMetadata('middlewares', [], controllerClass, propertyKey);
    }

    const middlewares = Reflect.getMetadata('middlewares', controllerClass, propertyKey) as Function[];
    middlewares.push(middleware);
    Reflect.defineMetadata('middlewares', middlewares, controllerClass, propertyKey);
  };
}