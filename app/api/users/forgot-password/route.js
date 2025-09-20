// import { NextResponse } from "next/server";
// import connect from "@/lib/mongo";
// import User from "@/model/User";
// import crypto from "crypto";
// import nodemailer from "nodemailer";

// export async function POST(req) {
//   await connect();
//   try {
//     const { email } = await req.json();
//     if (!email) return NextResponse.json({ message: "Email is required" }, { status: 400 });

//     const user = await User.findOne({ email });
//     if (!user) return NextResponse.json({ message: "User not found" }, { status: 404 });

//     // Generate 6-digit OTP
//     const otp = crypto.randomInt(100000, 999999).toString();

//     // Save OTP + expiry (10 mins)
//     user.resetToken = otp;
//     user.resetTokenExpiry = new Date(Date.now() + 10 * 60 * 1000);
//     await user.save();

//     // Nodemailer transporter
//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS, // App password
//       },
//     });

//     // Styled email
//     const mailOptions = {
//       from: `"ProcessPilot" <${process.env.EMAIL_USER}>`,
//       to: email,
//       subject: "ProcessPilot Password Reset OTP",
//       html: `
//         <div style="font-family: Arial; background:#f8fafc; padding:20px;">
//           <div style="max-width:600px; margin:auto; background:#1e293b; color:#e2e8f0; border-radius:8px; padding:30px; text-align:center;">
//             <h2>ProcessPilot</h2>
//             <p>Your OTP for password reset is:</p>
//             <h1 style="letter-spacing:4px;">${otp}</h1>
//             <p>It will expire in 10 minutes.</p>
//             <p style="font-size:12px; color:#94a3b8;">If you didn't request this, ignore this email.</p>
//           </div>
//         </div>
//       `,
//     };

//     await transporter.sendMail(mailOptions);
//     return NextResponse.json({ message: "OTP sent to your email" });

//   } catch (err) {
//     console.error("Forgot Password Error:", err);
//     return NextResponse.json({ message: "Server error" }, { status: 500 });
//   }
// }
import { NextResponse } from "next/server";
import connect from "@/lib/mongo";
import User from "@/model/User";
import crypto from "crypto";
import nodemailer from "nodemailer";

export async function POST(req) {
  await connect();
  try {
    const { email } = await req.json();
    if (!email) return NextResponse.json({ message: "Email is required" }, { status: 400 });

    const user = await User.findOne({ email });
    if (!user) return NextResponse.json({ message: "User not found" }, { status: 404 });

    // Generate 6-digit OTP
    const otp = crypto.randomInt(100000, 999999).toString();

    // Update user OTP info
    user.resetOTP = otp;
    user.resetOTPExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 mins expiry
    user.resetOTPCount = (user.resetOTPCount || 0) + 1;
    user.resetOTPLastRequested = new Date();

    await user.save();

    // Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // App password
      },
    });

    // Styled email
    const mailOptions = {
      from: `"ProcessPilot" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "ProcessPilot Password Reset OTP",
      html: `
        <div style="font-family: Arial; background:#f8fafc; padding:20px;">
          <div style="max-width:600px; margin:auto; background:#1e293b; color:#e2e8f0; border-radius:8px; padding:30px; text-align:center;">
            <h2>ProcessPilot</h2>
            <p>Your OTP for password reset is:</p>
            <h1 style="letter-spacing:4px;">${otp}</h1>
            <p>It will expire in 10 minutes.</p>
            <p style="font-size:12px; color:#94a3b8;">If you didn't request this, ignore this email.</p>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: "OTP sent to your email" });

  } catch (err) {
    console.error("Forgot Password Error:", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
