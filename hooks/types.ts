import { z } from "zod";

export const resetPasswordSchema = z
  .object({
    password: z.string().min(6, "Password Minimal 6 Karakter"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Password Tidak Cocok",
  });

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email Tidak Boleh Kosong" })
    .email({ message: "Email is Required" }),
  password: z.string().min(6, "Password Minimal 6 Karakter"),
});
