import UserRepository from "../repository/UserRepository.js";
import logger from "../config/logger.js";
import { isStrongPassword } from "../utils/passwordValidator.js";
import generateToken from "../utils/generateNormalToken.js";

class UserServices {
  static instance;

  constructor() {
    if (UserServices.instance) {
      return UserServices.instance;
    }

    UserServices.instance = this;
  }
  async registerUser({ name, email, password }, res) {
    try {
      if (!isStrongPassword(password)) {
        res
          .status(400)
          .json({ error: "Weak password. Please use a stronger password." });
        return;
      }
      const userExists = await UserRepository.findByEmail({ email });

      if (userExists) {
        res.status(409).json({ error: "User already exists" });
        return;
      } else {
        // Create a new user
        const user = await UserRepository.createUser({ name, email, password });

        if (user) {
          // Generate token and send response for successful registration
          generateToken(res, user._id, "user");
          return {
            statusCode: 201,
            data: {
              _id: user._id,
              name: user.name,
              email: user.email,
            },
          };
        }
      }
    } catch (error) {
      // Handle errors and log them
      console.log(error);
      logger.error("Error in registerUser:", {
        message: error.message,
        stack: error.stack,
        additionalInfo: "User registration failed",
      });
    }
  }
  // Service method to handle user login
  async userLogin(email, password, res) {
    try {
      // Finding the user by email in the UserRepository
      const user = await UserRepository.findByEmail({ email });
      // Checking if the user exists, passwords match, and the user is verified
      if (user && (await UserRepository.matchPasswords(user, password))) {
        // Generating a token and sending it in the response
        generateToken(res, user._id, "user");

        // Returning success response with user details
        return {
          statusCode: 201,
          data: {
            _id: user._id,
            name: user.name,
            email: user.email,
          },
        };
      } else {
        // Returning unauthorized response for invalid email or password
        return {
          statusCode: 401,
          data: { message: "Invalid email or password" },
        };
      }
    } catch (error) {
      // Logging and throwing an error for failed user login
      console.log(error);
      logger.error("Error in userLogin:", {
        message: error.message,
        stack: error.stack,
        additionalInfo: "User login failed",
      });
      throw new Error("User login failed");
    }
  }

  // Service method to get user details by user ID
  async getUser(userId) {
    try {
      // Finding the user by ID in the UserRepository
      const finduser = await UserRepository.getUser(userId);

      // Checking if the user exists
      if (finduser) {
        // Converting the user to an object and returning success response
        const user = finduser.toObject();
        return { statusCode: 200, user };
      } else {
        // Throwing an error for user not found
        throw new Error("User not found");
      }
    } catch (error) {
      // Logging and throwing an error for failed user retrieval
      console.log(error);
      logger.error("Error in getUser:", {
        message: error.message,
        stack: error.stack,
        additionalInfo: "Error in getUser:",
      });
      throw error;
    }
  }

  // Service method to add address for a user
  async addAddress(userId, address) {
    try {
      // Adding the address to the user using UserRepository
      await UserRepository.addAddress(userId, address);

      // Returning success response for address added successfully
      return {
        statusCode: 200,
        data: { message: "Address added successfully" },
      };
    } catch (error) {
      // Logging and throwing an error for failed address addition
      console.log(error);
      logger.error("Error in addAddress:", {
        message: error.message,
        stack: error.stack,
        additionalInfo: "Failed to add user's address",
      });
      throw new Error("Failed to add user's address");
    }
  }
}

// Exporting an instance of the UserServices class
export default new UserServices();
