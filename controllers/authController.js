import crypto from "crypto";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/AppError.js";
import sendEmail from "../utils/email.js";
import Token from "../models/TokenModel.js";
import { promisify } from "util";

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);

  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

export const signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    username: req.body.username,
    email: req.body.email,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    location: req.body.location,
  });

  let token = await new Token({
    userId: newUser._id,
    token: crypto.randomBytes(32).toString("hex"),
  }).save();

  const message = `${process.env.BASE_URL}/users/verify/${newUser.id}/${token.token}`;
  await sendEmail(newUser.email, "Verify Email", message);
  res.send("An email sent to your account, please verify");
});

export const verifyUser = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ _id: req.params.id });
  if (!user) return next(new AppError("Invalid Link", 404));

  const token = await Token.findOne({
    userId: user._id,
    token: req.params.token,
  });

  if (!token) return next(new AppError("Invalid link", 404));

  await User.updateOne({ _id: user._id }, { verified: true });
  await Token.findByIdAndDelete(token._id);

  res.send(`Email verified successfully! feel free to close this tab`);
});

export const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError("Please provide email and password", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (user?.verified === false)
    return next(
      new AppError("Please verify your email before loggin in ", 404)
    );

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("Incorrect email or password", 401));
  }

  createSendToken(user, 200, res);
});

export const protect = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(
      new AppError("You are not logged in! Please login to get access"),
      401
    );
  }

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // 3) CHECK IF USER STILL EXIST
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(
      new AppError("The user belonging to this token does no longer exist", 401)
    );
  }

  req.user = currentUser;
  next();
});
