import cors from "cors";
import express from "express";
import path from "path";
import globalErrorHandler from "./controllers/errorController.js";
import userRoute from "./routes/userRoute.js";
import restaurantRoute from "./routes/restaurantRoute.js";
import reviewRoute from "./routes/reviewRoute.js";
import commentRoute from "./routes/commentRoute.js";

const app = express();

app.use(cors());

app.use(express.json());
app.use("/images", express.static(path.join("/var/www/myapp/images")));

app.use("/api/v1/users", userRoute);
app.use("/api/v1/restaurant", restaurantRoute);
app.use("/api/v1/review", reviewRoute);
app.use("/api/v1/comment", commentRoute);

app.use(globalErrorHandler);

export default app;
