import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string({ message: "Email is required" })
    .email({ message: "Invalid email" }),
  password: z
    .string({ message: "Password is required" })
    .min(8, { message: "Password should be at least 8 characters" }),
});

export const registerSchema = z
  .object({
    first_name: z.string({ message: "Firstname is required" }),
    last_name: z.string({ message: "Lastname is required" }),
    email: z
      .string({ message: "Email is required" })
      .email({ message: "Invalid email" }),
    password: z
      .string({ message: "Password is required" })
      .min(8, { message: "Password should be at least 8 characters" }),
    re_password: z
      .string({ message: "Password is required" })
      .min(8, { message: "Password should be at least 8 characters" }),
  })
  .refine((data) => data.password === data.re_password, {
    message: "Passwords does not match",
    path: ["re_password"],
  });

export const resetPasswordSchema = z.object({
  email: z
    .string({ message: "Email is required" })
    .email({ message: "Invalid email" }),
});
