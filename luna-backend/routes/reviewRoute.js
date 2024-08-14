import express from "express";
import { protect } from "../controllers/authController.js";
import {
  getAllReviews,
  getReview,
  updateReview,
  deleteReview,
  createReview,
  getMyReview,
} from "../controllers/reviewController.js";

const router = express.Router();

router.post("/", createReview);
router.get("/", getAllReviews);
router.get("/:useId", getMyReview);

router.patch("/id", protect, updateReview);
router.delete("/:id", protect, deleteReview);
router.get("/:id", getReview);

export default router;
