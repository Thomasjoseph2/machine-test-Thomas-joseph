import jwt from "jsonwebtoken";
import "dotenv/config.js";

const generateTokens = (res, userId, userRole) => {
  // Generate Access Token
  const accessToken = jwt.sign({ userId, role: userRole }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });

  // Generate Refresh Token
  const refreshToken = jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "30d",
  });

  // Set Access Token as an HTTP-only cookie
  res.cookie("access_token", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    maxAge: 15 * 60 * 1000, // 15 minutes
  });

  // Set Refresh Token as an HTTP-only cookie
  res.cookie("refresh_token", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  });
};

export default generateTokens;
