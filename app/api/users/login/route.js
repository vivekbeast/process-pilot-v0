// app/api/users/login/route.js
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connect from "@/lib/mongo";
import User from "@/model/User";
import { generateToken } from "@/lib/jwt";

export async function POST(req) {
  await connect();
  try {
    const { loginId, password } = await req.json();

    if (!loginId || !password) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Find user by loginId
    const user = await User.findOne({ loginId });
    if (!user) {
      return NextResponse.json(
        { message: "Invalid login credentials" },
        { status: 401 }
      );
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { message: "Invalid login credentials" },
        { status: 401 }
      );
    }

    // Generate JWT
    const token = generateToken(user._id.toString(), user.role);

    return NextResponse.json({
      message: "Login successful",
      token,
      role: user.role,
    });
  } catch (err) {
    console.error("Login Error:", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
