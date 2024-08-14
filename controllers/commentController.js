import Comment from "../models/commentModel.js";
import AppError from "../utils/AppError.js";
import catchAsync from "../utils/catchAsync.js";
import {
  deleteOne,
  getAll,
  getOne,
  updateOne,
  createOne,
} from "./handleFactory.js";

export const getAllComments = getAll(Comment);
export const createComment = createOne(Comment);
export const getComment = getOne(Comment);
export const updateComment = updateOne(Comment);
export const deleteComment = deleteOne(Comment);
