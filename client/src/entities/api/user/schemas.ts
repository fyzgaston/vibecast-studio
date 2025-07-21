import { z } from "zod";

export const UsernameSchema = z.string()
  .min(5, 'Имя пользователя должно содержать не менее 5 символов')
  .max(20, 'Имя пользователя должно содержать не более 20 символов')
  .trim()

export const PasswordSchema = z.string()
  .min(8, 'Пароль должен содержать не менее 8 символов')
  .max(20, 'Пароль должен содержать не более 20 символов')
  .trim()

export const RegisterSchema = z.object({
  username: UsernameSchema,
  password: PasswordSchema,
});

export type RegisterData = z.infer<typeof RegisterSchema>;

export const LoginSchema = z.object({
  username: UsernameSchema,
  password: PasswordSchema,
});

export type LoginData = z.infer<typeof LoginSchema>

export const UserSchema = z.object({
  id: z.string(),
  username: UsernameSchema,
})

export type User = z.infer<typeof UserSchema>;

// для токенка
export const LoginResponseSchema = z.object({
  message: z.string(),
  token: z.string(),
});

export type LoginResponse = z.infer<typeof LoginResponseSchema>;
