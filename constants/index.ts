import { Bike, User, UserRoundPlus } from "lucide-react";
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

export const userRoles = [
  {
    Icon: User,
    id: "user",
    title: "User",
  },
  {
    Icon: UserRoundPlus,
    id: "admin",
    title: "Admin",
  },
  {
    Icon: Bike,
    id: "deliveryBoy",
    title: "Delivery Boy",
  },
] as const;

export const editRoleMobileFormSchema = z.object({
  role: z.string().min(1, "You must select a subscription plan to continue."),
  mobile: z
    .string()
    .min(10, "Mobile number must be at least 10 digits.")
    .max(10, "Mobile number must be at most 10 digits."),
});
