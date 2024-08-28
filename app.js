import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import dotenv from "dotenv";

import cors from "cors";
import express from "express";
import path from "path";
import globalErrorHandler from "./controllers/errorController.js";
import userRoute from "./routes/userRoute.js";
import restaurantRoute from "./routes/restaurantRoute.js";
import reviewRoute from "./routes/reviewRoute.js";
import commentRoute from "./routes/commentRoute.js";

const app = express();
// const corsOptions = {
//   origin: "https://picky-lovat.vercel.app", // Your Vercel client domain
//   optionsSuccessStatus: 200,
// };

app.use(cors());
// app.use(express.static("public/img/users"));

app.use(express.json());
app.use("/images", express.static(path.join("/var/www/myapp/images")));

app.use("/api/v1/users", userRoute);
app.use("/api/v1/restaurant", restaurantRoute);
app.use("/api/v1/review", reviewRoute);
app.use("/api/v1/comment", commentRoute);

app.use(globalErrorHandler);

export default app;
