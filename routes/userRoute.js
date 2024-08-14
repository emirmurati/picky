import express from "express";
import {
  signup,
  login,
  verifyUser,
  protect,
} from "../controllers/authController.js";
import {
  deleteMe,
  deleteUser,
  getAllUsers,
  getMe,
  getUser,
  resizeUserPhoto,
  updateMe,
  updateUser,
  uploadUserPhoto,
} from "../controllers/userController.js";

import AppError from "../utils/AppError.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/verify/:id/:token", verifyUser);

router.patch("/updateMe", protect, uploadUserPhoto, resizeUserPhoto, updateMe);
router.delete("/deleteMe", protect, getMe, deleteMe);
router.get("/me", protect, getMe, getUser);

router.route("/").get(getAllUsers);
router.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);

export default router;
