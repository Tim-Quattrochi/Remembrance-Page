const mongoose = require("mongoose");

const postSchema = mongoose.Schema(
  {
    content: {
      type: String,
      required: [true, "Please enter a message."],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timeStamps: true }
);

module.exports = mongoose.model("Post", postSchema);
