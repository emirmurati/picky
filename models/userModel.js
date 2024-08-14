import crypto from "crypto";
import mongoose, { Schema } from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "A user must have a username"],
      unique: true,
      lowercase: true,
      validate: [validator.isAlpha, "Please use only characters or numbers"],
    },
    firstName: {
      type: String,
      required: [true, "A user must have a name"],
    },
    lastName: {
      type: String,
      required: [true, "A user must have a last name"],
    },
    email: {
      type: String,
      required: [true, "Please provide an email"],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, "Please provide a valid email"],
    },
    password: {
      type: String,
      required: [true, "You must provide a password"],
      minlength: 8,
      select: false,
    },
    passwordConfirm: {
      type: String,
      required: [true, "Please confirm your password"],
      validate: {
        /// THIS ONLY WORKS ON SAVE and CREATE
        validator: function (el) {
          return el === this.password;
        },
        message: "Passwords are not the same",
      },
    },

    avatar: {
      type: String,
      default: "avatar.jpeg",
    },
    banner: {
      type: String,
      default: null,
    },
    location: String,
    phoneNumber: String,
    thingILove: [],
    description: String,

    verified: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);

  this.passwordConfirm = undefined;
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model("User", userSchema);

export default User;
