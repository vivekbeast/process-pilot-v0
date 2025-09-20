// app/api/users/forgot-password/route.js
import { NextResponse } from "next/server";
import connect from "@/lib/mongo";
import User from "@/model/User";
import crypto from "crypto";
import nodemailer from "nodemailer";

export async function POST(req) {
  await connect();
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ message: "Email is required" }, { status: 400 });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Generate OTP (6 digit code)
    const otp = crypto.randomInt(100000, 999999).toString();

    // Store OTP & expiry in user document
    user.resetToken = otp;
    user.resetTokenExpiry = Date.now() + 10 * 60 * 1000; // 10 min expiry
    await user.save();

    // Create transporter
    const transporter = nodemailer.createTransport({
        service: "gmail",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Email content
    const mailOptions = {
      from: `"Your App Name" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "Password Reset OTP",
      text: `Your OTP for password reset is: ${otp}. It will expire in 10 minutes.`,
      html: `<p>Your OTP for password reset is: <b>${otp}</b>. It will expire in 10 minutes.</p>`,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: "OTP sent to your email" });
  } catch (err) {
    console.error("Forgot Password Error:", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
