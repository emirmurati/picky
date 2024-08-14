import Restaurant from "../models/restaurantModel.js";
import multer from "multer";
import AppError from "../utils/AppError.js";
import sharp from "sharp";
import catchAsync from "../utils/catchAsync.js";
import {
  deleteOne,
  getAll,
  getOne,
  updateOne,
  createOne,
  getMyRestaurant,
} from "./handleFactory.js";

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("Not an image! Please upload only images.", 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

export const uploadRestaurantPhoto = upload.single("image");

export const resizeRestaurantPhoto = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  req.file.filename = `restaurant-${req.user.id}-${Date.now()}.jpeg`;

  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`public/img/users/${req.file.filename}`);

  next();
});

export const getAllRestaurants = getAll(Restaurant);
export const createRestaurant = createOne(Restaurant);
export const getRestaurant = getOne(Restaurant);
export const updateRestaurant = updateOne(Restaurant);
export const deleteRestaurant = deleteOne(Restaurant);
export const getMyRestaurants = getMyRestaurant(Restaurant);
