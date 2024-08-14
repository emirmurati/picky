import mongoose, { Schema } from "mongoose";

const reviewSchema = new Schema(
  {
    content: {
      type: String,
      required: [true, "You must provide some content"],
    },

    rating: {
      type: Number,
      required: [true, "you must choose a rating"],
    },

    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "you must provide user id"],
    },
    restaurant: {
      type: Schema.Types.ObjectId,
      ref: "Restaurant",
      required: [true, "you must provide restaurant id"],
    },

    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],

    likes: {
      type: Number,
      default: 0,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
  { timestamps: true }
);

reviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
  })
    .populate({ path: "restaurant" })
    .populate({ path: "comments" });

  next();
});

const Review = mongoose.model("Review", reviewSchema);

export default Review;
