import { z } from "zod";

export const registerFormSchema = z
  .object({
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password must match!",
    path: ["confirmPassword"],
  });

export const confirmationFormSchema = z.object({
  code: z.string()
});
