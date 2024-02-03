import { body, validationResult } from "express-validator";

export const authUserValidation = [
  body("email").isEmail(),
  body("password").isLength({ min: 6 }),
];

export const addAddressValidation = [
  body("place").notEmpty(),
  body("district").notEmpty(),
  body("country").notEmpty(),
];


export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  next();
};
