import { StatusCodes } from '@common/constants/statusCodes.js';
import type { ZodSchema } from 'zod';
import { fromError } from 'zod-validation-error';

const validator = (schema: ZodSchema, data: object) => {
  const validationResult = schema.safeParse(data);
  if (!validationResult.success) {
    throw {
      status: StatusCodes.BAD_REQUEST,
      message: fromError(validationResult.error).message.toString(),
    };
  }
  return data;
};

export default validator;
