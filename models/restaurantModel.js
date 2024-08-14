import mongoose, { Schema } from "mongoose";
import validator from "validator";

const restaurantSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "A Restaurant must have a name"],
      unique: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "you must provide user id"],
    },
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    review: [
      {
        type: Schema.Types.ObjectId,
        ref: "Review",
      },
    ],

    category: {
      type: String,
      required: [true, "A restaurant must have a category"],
    },
    country: {
      type: String,
      required: [true, "Provide country"],
    },
    street: {
      type: String,
      required: [true, "Provide a street"],
    },
    city: {
      type: String,
      required: [true, "You must provide a city"],
    },
    zip: String,
    website: String,
    phoneNumber: {
      type: String,
      required: [true, "provide a phone number"],
    },
    openingHours: {
      type: String,
      required: [true, "provide opening hours"],
    },
    email: String,

    priceLevel: String,
    image: String,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
  { timestamps: true }
);

restaurantSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
  })
    .populate({ path: "comments" })
    .populate({ path: "review" });

  next();
});

const Restaurant = mongoose.model("Restaurant", restaurantSchema);

export default Restaurant;
