import path from "path";
import dotenv from "dotenv";

import cors from "cors";
import express from "express";
import globalErrorHandler from "./controllers/errorController.js";
import userRoute from "./routes/userRoute.js";
import restaurantRoute from "./routes/restaurantRoute.js";
import reviewRoute from "./routes/reviewRoute.js";
import commentRoute from "./routes/commentRoute.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public/img/users"));
app.use(express.static("public/img/restaurant"));

app.use("/api/v1/users", userRoute);
app.use("/api/v1/restaurant", restaurantRoute);
app.use("/api/v1/review", reviewRoute);
app.use("/api/v1/comment", commentRoute);

app.use(globalErrorHandler);

export default app;
