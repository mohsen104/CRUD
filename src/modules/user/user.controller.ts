import autoBind from 'auto-bind';
import { Controller, Delete, Get, Post, Put } from '@decorators/RouteDecorator.js';
import { UserService } from './user.service.js';
import type { NextFunction, Request, Response } from 'express';
import type { IUser } from '@common/types/user.types.js';
import type { IResponse } from '@common/types/global.types.js';
import { inject } from 'inversify';
import { StatusCodes } from '@common/constants/statusCodes.js';
import validator from '@common/validations/validator.js';
import zUser from './user.schema.js';
import removeEmptyProperty from '@common/utils/removeEmptyProperty.js';

@Controller('/users')
export class UserController {
  private service: UserService;
  constructor(@inject(UserService) service: UserService) {
    this.service = service;
    autoBind(this);
  }
  @Get('/')
  async getAllUsers(req: Request, res: Response<IResponse>, next: NextFunction) {
    try {
      const users = await this.service.getAllUsers();
      res.status(StatusCodes.OK).json({ data: users });
    } catch (error) {
      next(error);
    }
  }
  @Get('/:id')
  async getUser(req: Request, res: Response<IResponse>, next: NextFunction) {
    try {
      const id = req.params.id as string;
      const user = await this.service.getUser(id);
      res.status(StatusCodes.OK).json({ data: user });
    } catch (error) {
      next(error);
    }
  }
  @Post('/')
  async createUser(req: Request, res: Response<IResponse>, next: NextFunction) {
    try {
      const body: IUser = req.body;
      const dto: IUser = removeEmptyProperty(body);
      validator(zUser, dto);
      await this.service.createUser(dto);
      res.status(StatusCodes.CREATED).json({ message: 'user created successfully' });
    } catch (error) {
      next(error);
    }
  }
  @Put('/:id')
  async updateUser(req: Request, res: Response<IResponse>, next: NextFunction) {
    try {
      const id = req.params.id as string;
      const body: Partial<IUser> = req.body;
      const dto: Partial<IUser> = removeEmptyProperty(body);
      validator(zUser.partial(), dto);
      await this.service.updateUser(id, dto);
      res.status(StatusCodes.OK).json({ message: 'user updated successfully' });
    } catch (error) {
      next(error);
    }
  }
  @Delete('/:id')
  async deleteUser(req: Request, res: Response<IResponse>, next: NextFunction) {
    try {
      const id = req.params.id as string;
      await this.service.deleteUser(id);
      res.status(StatusCodes.OK).json({ message: 'user deleted successfully' });
    } catch (error) {
      next(error);
    }
  }
}
