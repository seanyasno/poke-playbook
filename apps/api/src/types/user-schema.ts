import { z } from 'nestjs-zod/z';
import { createZodDto } from 'nestjs-zod';

export const UserSchema = z.object({
  name: z.string(),
  age: z.number().min(0).max(120),
  email: z.string().email(),
});

export class User extends createZodDto(UserSchema) {}
