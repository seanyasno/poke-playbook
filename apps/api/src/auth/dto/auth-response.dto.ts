import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

export const UserResponseSchema = z.object({
  id: z.string(),
  email: z.string(),
  firstName: z.string().nullable().optional(),
  lastName: z.string().nullable().optional(),
  createdAt: z
    .union([z.string(), z.date()])
    .transform((value) =>
      value instanceof Date ? value.toISOString() : value,
    ),
});

export const AuthResponseSchema = z.object({
  user: UserResponseSchema,
  message: z.string().optional(),
});

export const MessageResponseSchema = z.object({
  message: z.string(),
});

export class UserResponseDto extends createZodDto(UserResponseSchema) {}
export class AuthResponseDto extends createZodDto(AuthResponseSchema) {}
export class MessageResponseDto extends createZodDto(MessageResponseSchema) {}
