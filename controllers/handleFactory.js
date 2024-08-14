import AppError from "../utils/AppError.js";
import catchAsync from "../utils/catchAsync.js";

export const deleteOne = (Model) => {
  return catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);
    if (!doc) {
      return next(new AppError("No document found with that id ", 404));
    }
    res.status(204).json({
      status: "success",
      data: null,
    });
  });
};

export const updateOne = (Model) => {
  return catchAsync(async (req, res, next) => {
    if (req.file) req.body.image = req.file.filename;
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!doc) {
      return next(new AppError("No document found with that id ", 404));
    }
    res.status(200).json({
      status: "success",
      data: {
        doc,
      },
    });
  });
};

export const createOne = (Model) => {
  return catchAsync(async (req, res, next) => {
    if (req.file) req.body.image = req.file.filename;
    const doc = await Model.create(req.body);

    res.status(201).json({
      status: "success",
      data: {
        data: doc,
      },
    });
  });
};

export const getOne = (Model) => {
  return catchAsync(async (req, res, next) => {
    const doc = await Model.findById(req.params.id);

    if (!doc) {
      return next(new AppError("No document found with that id ", 404));
    }
    res.status(200).json({
      status: "success",
      data: {
        data: doc,
      },
    });
  });
};

export const getAll = (Model) => {
  return catchAsync(async (req, res, next) => {
    const doc = await Model.find();

    if (!doc) {
      return next(new AppError("No documents found", 404));
    }

    res.status(200).json({
      status: "success",
      results: doc.length,
      data: {
        data: doc,
      },
    });
  });
};

export const getMyRestaurant = (Model) => {
  return catchAsync(async (req, res, next) => {
    const doc = await Model.find({ user: req.params.usId });

    if (!doc) {
      return next(new AppError("No documents found", 404));
    }

    res.status(200).json({
      status: "success",
      results: doc.length,
      data: {
        data: doc,
      },
    });
  });
};
export const getMyReviews = (Model) => {
  return catchAsync(async (req, res, next) => {
    const doc = await Model.find({ user: req.params.useId });

    if (!doc) {
      return next(new AppError("No documents found", 404));
    }

    res.status(200).json({
      status: "success",
      results: doc.length,
      data: {
        data: doc,
      },
    });
  });
};
