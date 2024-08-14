import mongoose, { Schema } from "mongoose";

const commentSchema = new Schema(
  {
    content: {
      type: String,
      required: [true, "You must provide some content"],
    },

    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },

    review: {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  },
  { timestamps: true }
);

commentSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
  }).populate({ path: "review" });

  next();
});

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
