import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email().min(1),
  password: z.string().min(1),
});

export const registerSchema = loginSchema.extend({
  name: z.string().min(1),
});

export type LoginForm = z.infer<typeof loginSchema>;

export type RegisterForm = z.infer<typeof registerSchema>;
