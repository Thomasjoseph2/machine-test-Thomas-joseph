// userRoutes.js

import express from "express";
import { protect, loginBlockCheck } from "../../middlewares/authMiddleware.js";
import { authUser, getProfile, addAddress ,logout} from "../../controllers.js/userController.js";
import { addAddressValidation,authUserValidation,validate } from "../../middlewares/validationMiddleware.js";
const router = express.Router();


router.post('/auth', authUserValidation, loginBlockCheck, validate, authUser);

router.get('/get-profile', protect, getProfile);

router.post('/add-address', addAddressValidation, protect, validate, addAddress);

router.post('/logout',logout)

export default router;
