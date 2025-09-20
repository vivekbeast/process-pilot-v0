import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connect from "@/lib/mongo";
import User from "@/model/User";
import { generateToken } from "@/lib/jwt";

export async function POST(req) {
  await connect();
  try {
    const { loginId, email, password } = await req.json();

    if (!loginId || !email || !password) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    const existingUser = await User.findOne({ $or: [{ loginId }, { email }] });
    if (existingUser) {
      return NextResponse.json({ message: "LoginID or Email already exists" }, { status: 409 });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await User.create({ loginId, email, password: passwordHash, role: "user" });

    const token = generateToken(user._id.toString(), user.role);

    return NextResponse.json({
      message: "User registered successfully",
      token,
      role: user.role,
    });
  } catch (err) {
    console.error("Registration Error:", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
