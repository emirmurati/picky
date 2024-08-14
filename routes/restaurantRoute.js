import express from "express";
import { protect } from "../controllers/authController.js";
import {
  getAllRestaurants,
  getRestaurant,
  updateRestaurant,
  deleteRestaurant,
  createRestaurant,
  uploadRestaurantPhoto,
  resizeRestaurantPhoto,
  getMyRestaurants,
} from "../controllers/restaurantController.js";

const router = express.Router();

router.post(
  "/",
  protect,
  uploadRestaurantPhoto,
  resizeRestaurantPhoto,
  createRestaurant
);
router.get("/", getAllRestaurants);
router.get("/getmyrestaurants/:usId", getMyRestaurants);

router.patch(
  "/:id",
  protect,
  uploadRestaurantPhoto,
  resizeRestaurantPhoto,
  updateRestaurant
);
router.delete("/:id", protect, deleteRestaurant);
router.get("/:id", getRestaurant);

export default router;
