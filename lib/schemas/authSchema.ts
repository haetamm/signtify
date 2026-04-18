import { z } from "zod";

export const loginSchema = z.object({
  username: z.string().min(1, "Username wajib diisi"),
  password: z.string().min(1, "Password wajib diisi"),
});

export const forgotPassSchema = z.object({
  email: z.email("Format email tidak valid"),
});

export const resetPassSchema = z
  .object({
    password: z
      .string()
      .min(1, "Password wajib diisi")
      .min(4, "Password minimal 4 karakter")
      .max(8, "Password maksimal 8 karakter")
      .regex(/^[a-zA-Z0-9]+$/, "Harus hanya huruf dan angka"),

    confirmPassword: z.string().min(1, "Konfirmasi password wajib diisi"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Konfirmasi password tidak sama",
    path: ["confirmPassword"],
  });

export type LoginFormValues = z.infer<typeof loginSchema>;
export type ForgotPassFormValues = z.infer<typeof forgotPassSchema>;
export type ResetPassFormValues = z.infer<typeof resetPassSchema>;
