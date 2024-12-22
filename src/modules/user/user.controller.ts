import type { NextFunction, Request, Response } from 'express';
import { Controller, Delete, Get, Post, Put } from '@decorators/RouteDecorator.js';
import { UserService } from './user.service.js';
import autoBind from 'auto-bind';
import type { IUser } from '@common/types/user.types.js';
import type { IResponse } from '@common/types/global.types.js';

@Controller('/users')
export class UserController {
  private service: UserService = new UserService();
  constructor() {
    autoBind(this);
  }
  @Get('/')
  async getAllUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const response: IResponse = await this.service.getAllUsers();
      res.status(response.status).json(response);
    } catch (error) {
      next(error);
    }
  }
  @Get('/:id')
  async getUser(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id as string;
      const response: IResponse = await this.service.getUser(id);
      res.status(response.status).json(response);
    } catch (error) {
      next(error);
    }
  }
  @Post('/')
  async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { username, age, job, email, password }: IUser = req.body;
      const response: IResponse = await this.service.createUser({ username, age, job, email, password });
      res.status(response.status).json(response);
    } catch (error) {
      next(error);
    }
  }
  @Put('/:id')
  updateUser(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id as string;
      const { username, age, job, email, password }: IUser = req.body;
      const data = this.service.updateUser(id, { username, age, job, email, password });
      res.json(data);
    } catch (error) {
      next(error);
    }
  }
  @Delete('/:id')
  async deleteUser(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id as string;
      const response: IResponse = await this.service.deleteUser(id);
      res.status(response.status).json(response);
    } catch (error) {
      next(error);
    }
  }
}
