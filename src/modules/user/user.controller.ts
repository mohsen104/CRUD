import autoBind from 'auto-bind';
import { Controller, Delete, Get, Post, Put } from '@decorators/RouteDecorator.js';
import { UserService } from './user.service.js';
import type { NextFunction, Request, Response } from 'express';
import type { IUser } from '@common/types/user.types.js';
import type { IResponse } from '@common/types/global.types.js';
import { inject } from 'inversify';

@Controller('/users')
export class UserController {
  private service: UserService;
  constructor(@inject(UserService) service: UserService) {
    this.service = service;
    autoBind(this);
  }
  @Get('/')
  async getAllUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const result: IResponse = await this.service.getAllUsers();
      res.status(result.status).json(result);
    } catch (error) {
      next(error);
    }
  }
  @Get('/:id')
  async getUser(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id as string;
      const result: IResponse = await this.service.getUser(id);
      res.status(result.status).json(result);
    } catch (error) {
      next(error);
    }
  }
  @Post('/')
  async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { username, age, job, email, password }: IUser = req.body;
      const result: IResponse = await this.service.createUser({ username, age, job, email, password });
      res.status(result.status).json(result);
    } catch (error) {
      next(error);
    }
  }
  @Put('/:id')
  async updateUser(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id as string;
      const { username, age, job, email, password }: IUser = req.body;
      const result: IResponse = await this.service.updateUser(id, { username, age, job, email, password });
      res.status(result.status).json(result);
    } catch (error) {
      next(error);
    }
  }
  @Delete('/:id')
  async deleteUser(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id as string;
      const result: IResponse = await this.service.deleteUser(id);
      res.status(result.status).json(result);
    } catch (error) {
      next(error);
    }
  }
}
