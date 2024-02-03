import jwt from "jsonwebtoken";
import logger from "../config/logger.js";

const generateToken = (res, userId, userRole) => {
    try {
      const token = jwt.sign({ userId, role: userRole }, process.env.JWT_SECRET, {
        expiresIn: "30d",
      });
      res.cookie("userjwt", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        sameSite: "strict",
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });
    } catch (error) {
      logger.error(`jwt creation error: ${error.message}`);
      console.log(error);
    }
  };
  
  

export default generateToken;
