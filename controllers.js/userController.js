// Importing necessary modules
import logger from "../config/logger.js";
import UserService from "../services/UserService.js";

const registerUser = async (req, res) => {
  try {
    const result = await UserService.registerUserWithOTP(req.body);

    res.status(200).json(result);
  } catch (error) {
    // Handling errors and logging them
    console.log(error);

    logger.error("Registration error", {
      message: error.message,
      stack: error.stack,
      additionalInfo: "error in auth controller",
    });
  }
};

// Auth user controller and token setter
// Route: POST /api/users/auth
// Access: Public

const authUser = async (req, res) => {
  try {
    // Extracting email and password from the request body
    const { email, password } = req.body;

    // Calling the userLogin function from the UserService
    const result = await UserService.userLogin(email, password, res);

    // Sending the response based on the result
    res.status(result.statusCode).json(result.data);
  } catch (error) {
    // Handling errors and logging them
    console.log(error);

    logger.error("Authentication error", {
      message: error.message,
      stack: error.stack,
      additionalInfo: "error in auth controller",
    });

    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get user profile controller
// Route: GET /api/users/get-profile
// Access: Private (requires authentication)
const getProfile = async (req, res) => {
  try {
    // Extracting userId from the request body
    const user = await UserService.getUser(req.user.userId);
    // Sending the response based on the result
    res.status(user.statusCode).json({ user: user.user });
  } catch (error) {
    // Handling errors and logging them
    console.log(error);
    logger.error("Get user profile error", {
      message: error.message,
      stack: error.stack,
      additionalInfo: "get profile controller",
    });

    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Add address controller
// Route: POST /api/users/add-address
// Access: Private (requires authentication)
const addAddress = async (req, res) => {
  try {
    // Extracting userId, place, district, and country from the request body
    const { place, district, country } = req.body;

    // Creating an address object
    const address = {
      place,
      district,
      country,
    };

    // Calling the addAddress function from the UserService
    const result = await UserService.addAddress(req.user.userId, address);

    // Sending the response based on the result
    res.status(result.statusCode).json(result.data);
  } catch (error) {
    // Handling errors and logging them
    logger.error("Error in addAddress", {
      message: error.message,
      stack: error.stack,
      additionalInfo: "error occured while adding address",
    });

    res.status(500).json({ error: "Internal Server Error" });
  }
};

//logout expiring the jwt
const logout = async (req, res) => {
  try {
    res.cookie("userjwt", "", { httpOnly: true, expires: new Date(0) });

    res.status(200).json({ message: "user logged out" });
  } catch (error) {
    console.log(error);
    logger.error("Error in logout", {
      message: error.message,
      stack: error.stack,
      additionalInfo: "error occured during logout",
    });
  }
};

// Exporting the controllers
export { authUser, getProfile, addAddress, logout };
