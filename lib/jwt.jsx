import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export function generateToken(userId, role) {
  return jwt.sign({ userId, role }, JWT_SECRET, { expiresIn: "7d" });
}
