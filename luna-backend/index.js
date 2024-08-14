import mongoose from "mongoose";

import dotenv from "dotenv";

process.on("uncaughtException", (err) => {
  console.log(err);

  process.exit(1);
});

dotenv.config({ path: "./.env" });
import app from "./app.js";

const DB = process.env.DATABASE.replace(
  "<password>",
  process.env.DATABASE_PASSWORD
);

mongoose.connect(DB).then(() => {
  console.log("DB CONNECTED");
});

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.log(`App running on port: ${port}...`);
});

process.on("unhandledRejection", (err) => {
  server.close(() => {
    process.exit(1);
  });
});
