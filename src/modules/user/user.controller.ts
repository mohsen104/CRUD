import type { Request, Response } from 'express';
import { Controller, Get } from '../../common/decorators/RouteDecorator.js';
import { UserService } from './user.service.js';
import autoBind from 'auto-bind';

@Controller('/users')
export class UserController {
  private service: UserService;
  constructor() {
    autoBind(this);
    this.service = new UserService();
  }
  @Get('/')
  getAllUsers(req: Request, res: Response) {
    const data = this.service.getAllUsers();
    res.json(data);
  }
}
