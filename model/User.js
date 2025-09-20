import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  loginId: { type: String, required: true, unique: true },
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true },   // <-- store hashed password here
  role:     { type: String, enum: ["user", "admin"], default: "user" },
   resetOTP: { type: String, default: null },
    resetOTPExpires: { type: Date, default: null },
    resetOTPCount: { type: Number, default: 0 },
    resetOTPLastRequested: { type: Date, default: null },
}, { timestamps: true });

export default mongoose.models.User || mongoose.model("User", UserSchema);
