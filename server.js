import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import helmet from "helmet";
import userRoutes from "./routes/api-v1/userRoutes.js";
import connectDB from "./config/db.js";
import apiRateLimiter from "./config/api-rate-limiter.js";
import apiSpeedLimiter from "./config/api-speed-limiter.js";
import v1apis from './routes/v1apis.js'
dotenv.config();
connectDB();

const app = express();

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

app.use(apiRateLimiter)
app.use(apiSpeedLimiter)

// app.use("/api/users", userRoutes);
app.use('/api/v1',v1apis)
//route that return a response to indicate server is started
app.get("/", (req, res) => {
  res.send("serve is ready");
});

app.listen(process.env.PORT, () => {
  console.log(`server started ar port ${process.env.PORT} `);
});
