import Review from "../models/reviewModel.js";
import AppError from "../utils/AppError.js";
import catchAsync from "../utils/catchAsync.js";
import {
  deleteOne,
  getAll,
  getOne,
  updateOne,
  createOne,
  getMyReviews,
} from "./handleFactory.js";

export const getAllReviews = getAll(Review);
export const createReview = createOne(Review);
export const getReview = getOne(Review);
export const updateReview = updateOne(Review);
export const deleteReview = deleteOne(Review);
export const getMyReview = getMyReviews(Review);
