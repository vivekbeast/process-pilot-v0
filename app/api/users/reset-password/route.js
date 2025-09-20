// app/api/users/reset-password/route.js
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connect from "@/lib/mongo";
import User from "@/model/User";

export async function POST(req) {
  await connect();
  try {
    const { email, otp, newPassword } = await req.json();

    if (!email || !otp || !newPassword) {
      return NextResponse.json({ message: "Missing fields" }, { status: 400 });
    }

    const user = await User.findOne({ email });
    if (!user || user.resetToken !== otp || user.resetTokenExpiry < Date.now()) {
      return NextResponse.json({ message: "Invalid or expired OTP" }, { status: 400 });
    }

    // Hash new password
    const passwordHash = await bcrypt.hash(newPassword, 10);
    user.password = passwordHash;

    // Clear OTP
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;

    await user.save();

    return NextResponse.json({ message: "Password reset successful" });
  } catch (err) {
    console.error("Reset Password Error:", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
