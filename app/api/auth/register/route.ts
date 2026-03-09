import connectToDatabase from "@/lib/db";
import User from "@/models/user.model";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // connect to database
    await connectToDatabase();
    // get data from request body
    const { name, email, password } = await req.json();
    // check if user already exists
    const existUser = await User.findOne({ email });
    if (existUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 },
      );
    }
    // validate password length
    if (password.length < 6) {
      return NextResponse.json(
        { message: "Password must be at least 6 characters long" },
        { status: 400 },
      );
    }
    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    // create new user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    return NextResponse.json(
      { message: "User registered successfully", user: user },
      { status: 201 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "An error occurred while registering the user" },
      { status: 500 },
    );
  }
}
