import type { NextFunction, Request, Response } from 'express';
import { Controller, Delete, Get, Post, Put } from '../../common/decorators/RouteDecorator.js';
import { UserService } from './user.service.js';
import autoBind from 'auto-bind';
import type { IUser } from '../../common/types/user.types.js';
import type { IResponse } from '../../common/types/global.types.js';

@Controller('/users')
export class UserController {
  private service: UserService = new UserService();
  constructor() {
    autoBind(this);
  }
  @Get('/')
  async getAllUsers(req: Request, res: Response) {
    const data = await this.service.getAllUsers();
    res.json(data);
  }
  @Get('/:id')
  getUser(req: Request, res: Response) {
    const data = this.service.getUser();
    res.json(data);
  }
  @Post('/')
  async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { username, age, job, email, password }: IUser = req.body;
      const { status, result }: IResponse = await this.service.createUser({ username, age, job, email, password });
      res.status(status).json(result);
    } catch (error) {
      next(error);
    }
  }
  @Put('/:id')
  updateUser(req: Request, res: Response) {
    const data = this.service.updateUser();
    res.json(data);
  }
  @Delete('/:id')
  deleteUser(req: Request, res: Response) {
    const data = this.service.deleteUser();
    res.json(data);
  }
}
