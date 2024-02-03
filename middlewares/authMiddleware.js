import jwt from "jsonwebtoken";
import logger from "../config/logger.js";
import UserRepository from "../repository/UserRepository.js";

// Middleware to protect routes that require authentication
const protect = async (req, res, next) => {
    let token = req.cookies.userjwt;
  
    if (token) {
      try {
        // Verifying the token using the JWT_SECRET
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
       
        // Checking if the user has the required role (modify this condition based on your roles)
        if (decoded.role !== "user") {
          return res.status(403).send({ error: "Insufficient privileges" });
        }
  
        // Attach user details to the request object
        req.user = { userId: decoded.userId, role: decoded.role };
  
        next();
      } catch (error) {
        logger.error(`Error in protect middleware: ${error.message}`);
        res.status(401).send({ error: "Not authorized, invalid token" });
      }
    } else {
      // Handling the case when no token is present in the cookies
      res.status(401).send({ error: "Not authorized, no token" });
    }
  };
// Middleware to check if the user is blocked before login
const loginBlockCheck = async (req, res, next) => {
  const email = req.body.email;

  try {
    const user = await UserRepository.findByEmail({ email });

    if (!user) {
      // Handling the case when the user does not exist
      res.status(403).send({ error: "Please signup to login" });
      return;
    }

    if (user.blocked === true) {
      // Handling the case when the user is blocked
      res.status(403).send({
        error: "User is blocked. Please contact support for assistance.",
      });
      return;
    }

    next();
  } catch (error) {
    // Handling errors related to user retrieval or other internal errors
    logger.error(`Error in loginBlockCheck middleware: ${error.message}`);
    res.status(500).send({ error: "Internal Server Error" });
  }
};

// Exporting the middleware functions
export { protect, loginBlockCheck };
