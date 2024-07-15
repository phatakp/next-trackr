import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, "Password should have min 8 chars"),
});

export const RegisterSchema = LoginSchema.extend({
  name: z.string().min(2),
  password2: z.string().min(8, "Password should have min 8 chars"),
}).refine((data) => data.password === data.password2, {
  path: ["password2"],
  message: "Both Passwords should match",
});
