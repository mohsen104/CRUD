import { Router } from 'express';

const router = Router();

export function Controller(basePath: string): ClassDecorator {
  return (target: Function) => {
    router.use(basePath, router);
  };
}

export function Get(path: string): MethodDecorator {
  return (target: any, propertyKey: string | symbol, descriptor) => {
    router.get(path, target[propertyKey]);
  };
}

export function Post(path: string): MethodDecorator {
  return (target: any, propertyKey: string | symbol, descriptor) => {
    router.post(path, target[propertyKey]);
  };
}

export function Put(path: string): MethodDecorator {
  return (target: any, propertyKey: string | symbol, descriptor) => {
    router.put(path, target[propertyKey]);
  };
}

export function Delete(path: string): MethodDecorator {
  return (target: any, propertyKey: string | symbol, descriptor) => {
    router.put(path, target[propertyKey]);
  };
}

export default router;
