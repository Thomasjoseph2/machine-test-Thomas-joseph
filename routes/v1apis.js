//? ===================================================== V1 Routes =====================================================

// ===================== Importing necessary modules/files =====================
import express from "express";

import userRoutes from "./api-v1/userRoutes.js"
// ===================== Configuring Express Router =====================
const router = express.Router();

//* ==================== V1 Routes ====================

router.use("/users", userRoutes);


export default router;