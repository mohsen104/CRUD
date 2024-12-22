import { isValidObjectId, Types } from 'mongoose';
import { StatusCodes } from '@constants/statusCodes.js';
import type { IUser } from '@common/types/user.types.js';
import UserModel from './user.model.js';

export class UserService {
  async getAllUsers() {
    const users = await UserModel.find({});
    return { status: StatusCodes.OK, data: users };
  }
  async getUser(id: string) {
    if (!isValidObjectId(id)) return { status: StatusCodes.BAD_REQUEST, message: 'invalid id' };
    const user = await UserModel.findById(new Types.ObjectId(id));
    if (!user) return { status: StatusCodes.NOT_FOUND, message: 'user not found' };
    return { status: StatusCodes.OK, data: user };
  }
  async createUser(dto: IUser) {
    const { username, age, job, email, password }: IUser = dto;
    const isUserExists = await UserModel.findOne({ username });
    if (isUserExists) return { status: StatusCodes.UNPROCESSABLE_ENTITY, message: 'user already exists' };
    await UserModel.create({ username, age, job, email, password });
    return { status: StatusCodes.CREATED, message: 'user created successfully' };
  }
  async updateUser(id: string, dto: Partial<IUser>) {
    if (!isValidObjectId(id)) return { status: StatusCodes.BAD_REQUEST, message: 'invalid id' };
    const user = await UserModel.findOneAndUpdate({ _id: new Types.ObjectId(id) }, { ...dto });
    if (!user) return { status: StatusCodes.NOT_FOUND, message: 'user not found' };
    return { status: StatusCodes.OK, message: 'user updated successfully' };
  }
  async deleteUser(id: string) {
    if (!isValidObjectId(id)) return { status: StatusCodes.BAD_REQUEST, message: 'invalid id' };
    const user = await UserModel.findOneAndDelete({ _id: new Types.ObjectId(id) });
    if (!user) return { status: StatusCodes.NOT_FOUND, message: 'user not found' };
    return { status: StatusCodes.OK, message: 'user deleted successfully' };
  }
}
