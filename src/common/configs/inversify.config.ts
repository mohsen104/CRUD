import 'reflect-metadata';
import { UserService } from '@modules/user/user.service.js';
import { Container } from 'inversify';
import { UserController } from '@modules/user/user.controller.js';

const container = new Container();

// set services
container.bind(UserService).toSelf();

// set controller
container.bind('UserController').to(UserController);

export default container;
