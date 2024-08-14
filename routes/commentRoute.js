import express from "express";
import { protect } from "../controllers/authController.js";
import {
  getAllComments,
  getComment,
  updateComment,
  deleteComment,
  createComment,
} from "../controllers/commentController.js";

const router = express.Router();

router.post("/", createComment);
router.get("/", getAllComments);

router.patch("/id", protect, updateComment);
router.delete("/:id", protect, deleteComment);
router.get("/:id", getComment);

export default router;
