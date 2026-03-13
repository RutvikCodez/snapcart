import * as z from "zod";

export const registerFormSchema = z.object({
  name: z
    .string()
    .min(5, "Name must be at least 5 characters.")
    .max(32, "Name must be at most 32 characters."),
  email: z.string().email("Please enter a valid email."),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters.")
    .max(100, "Password must be at most 100 characters."),
});

export const registerFields = [
  { name: "name", type: "text", placeholder: "Your Name" },
  { name: "email", type: "email", placeholder: "Your Email" },
  { name: "password", type: "password", placeholder: "Your Password" },
] as const;

export const loginFormSchema = z.object({
  email: z.string().email("Please enter a valid email."),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters.")
    .max(100, "Password must be at most 100 characters."),
});

export const loginFields = [
  { name: "email", type: "email", placeholder: "Your Email" },
  { name: "password", type: "password", placeholder: "Your Password" },
] as const;
