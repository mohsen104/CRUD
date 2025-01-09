import { z } from 'zod';

const zUser = z.object({
  username: z
    .string()
    .trim()
    .min(3, { message: 'Must be 3 or more characters long' })
    .max(80, { message: 'Must be 80 or fewer characters long' }),
  age: z.number().positive().gte(18).lte(100),
  job: z.string().min(3).max(255),
  email: z.string().email({ message: 'Invalid email address' }).optional(),
  password: z
    .string()
    .trim()
    .min(8, { message: 'Must be 8 or more characters long' })
    .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/, { message: 'Invalid password' })
    .optional(),
});

export type User = z.infer<typeof zUser>;
export default zUser;