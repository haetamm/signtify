import { z } from "zod";

export const profileSchema = z.object({
  name: z
    .string()
    .min(4, "Minimal 4 karakter")
    .max(50, "Maksimal 50 karakter")
    .regex(/^[a-zA-Z ]+$/, "Hanya boleh huruf dan spasi"),

  username: z
    .string()
    .min(3, "Minimal 3 karakter")
    .max(8, "Maksimal 8 karakter")
    .regex(/^[a-zA-Z0-9]+$/, "Hanya boleh alphanumeric"),

  email: z.email("Format email tidak valid"),

  phone: z.string().min(1, "Phone wajib diisi").max(20, "Maksimal 20 karakter"),

  address: z
    .string()
    .min(1, "Alamat wajib diisi")
    .max(225, "Maksimal 225 karakter"),

  birthPlace: z
    .string()
    .min(1, "Tempat lahir wajib diisi")
    .max(40, "Maksimal 40 karakter"),

  birthDate: z.string().min(1, "Tanggal lahir wajib diisi"),

  religion: z
    .string()
    .min(1, "Agama wajib diisi")
    .max(10, "Maksimal 10 karakter"),

  gender: z
    .string()
    .min(1, "Tidak boleh kosong")
    .max(10, "Maksimal 10 karakter")
    .regex(/^[a-zA-Z ]+$/, "Hanya boleh huruf dan spasi"),
});

export const changePassSchema = z
  .object({
    password: z
      .string()
      .min(4, "Minimal 4 karakter")
      .max(8, "Maksimal 8 karakter")
      .regex(/^[a-zA-Z0-9]+$/, "Hanya boleh alphanumeric"),

    confirmPassword: z.string().min(1, "Konfirmasi password wajib diisi"),

    oldPassword: z.string().min(1, "Password lama wajib diisi"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password dan konfirmasi password tidak sama",
    path: ["confirmPassword"],
  });

export type ProfileFormValues = z.infer<typeof profileSchema>;
export type ChangePassFormValues = z.infer<typeof changePassSchema>;
