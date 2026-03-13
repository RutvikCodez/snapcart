"use server"

import connectToDatabase from "./db";
import { auth } from "@/auth";
import User from "@/models/user.model";
import { redirect } from "next/navigation";
import { UserModelType } from "@/types";

export async function getCurrentUser() {
  await connectToDatabase();
  const session = await auth();
  const user: UserModelType | null = await User.findById(session?.user?.id);
  if (!user) {
    redirect("/login");
  }
  return user;
}
