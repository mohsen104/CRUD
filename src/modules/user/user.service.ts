import { isValidObjectId, Types } from 'mongoose';
import { StatusCodes } from '@constants/statusCodes.js';
import type { IUser } from '@common/types/user.types.js';
import UserModel from './user.model.js';

export class UserService {
  async getAllUsers() {
    const users = await UserModel.find({});
    return users;
  }
  async getUser(id: string) {
    if (!isValidObjectId(id)) throw { status: StatusCodes.BAD_REQUEST, message: 'invalid id' };
    const user = await UserModel.findById(new Types.ObjectId(id));
    if (!user) throw { status: StatusCodes.NOT_FOUND, message: 'user not found' };
    return user;
  }
  async createUser(dto: IUser) {
    const { username, age, job, email, password }: IUser = dto;
    const isUserExists = await UserModel.findOne({ username });
    if (isUserExists) throw { status: StatusCodes.UNPROCESSABLE_ENTITY, message: 'user already exists' };
    await UserModel.create({ username, age, job, email, password });
  }
  async updateUser(id: string, dto: IUser) {
    if (!isValidObjectId(id)) throw { status: StatusCodes.BAD_REQUEST, message: 'invalid id' };
    const user = await UserModel.findById(new Types.ObjectId(id));
    if (!user) throw { status: StatusCodes.NOT_FOUND, message: 'user not found' };
    for (const key in dto) {
      if (dto[key as keyof IUser] !== undefined) {
        (user[key as keyof IUser] as any) = dto[key as keyof IUser];
      }
    }
    await user.save();
  }
  async deleteUser(id: string) {
    if (!isValidObjectId(id)) throw { status: StatusCodes.BAD_REQUEST, message: 'invalid id' };
    const user = await UserModel.findOne({ _id: new Types.ObjectId(id) });
    if (!user) throw { status: StatusCodes.NOT_FOUND, message: 'user not found' };
  }
}
