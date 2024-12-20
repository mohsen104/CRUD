import type { IUser } from '../../common/types/user.types.js';
import UserModel from './user.model.js';

export class UserService {
  async getAllUsers() {
    const users = await UserModel.find({});
    return { data: users };
  }
  getUser() {
    return [{ message: 'hello' }];
  }
  async createUser(dto: IUser) {
    const { username, age, job, email, password }: IUser = dto;
    const user = await UserModel.findOneAndUpdate(
      { username },
      { username, age, job, email, password },
      { upsert: true, new: true }
    );
    if (user) return { status: 422, result: { message: 'user already exists' } };
    return { status: 201, result: { message: 'user created successfully' } };
  }
  updateUser() {
    return [{ message: 'hello' }];
  }
  deleteUser() {
    return [{ message: 'hello' }];
  }
}
