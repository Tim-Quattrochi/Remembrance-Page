const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const Post = require("../models/postModel");
const User = require("../models/userModel");

const getPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find({}).populate(
    "user",
    "-password -_id -email -roles"
  );

  console.log(posts);

  res.json(posts.map((post) => post.toJSON()));
});

const createPost = asyncHandler(async (req, res) => {
  const { content } = req.body;
  const { user } = req;
  console.log(user);

  const newPost = new Post({
    content: content,
    user: user._id,
  });
  newPost
    .save()
    .then((post) => res.json(post))
    .catch((err) => res.status(400).json({ error: err.message }));
});

const likePost = asyncHandler(async (req, res) => {
  const { postId } = req.params;
  console.log(postId);
  const { user } = req;
  // check if post id is provided and is valid
  if (!postId) {
    return res
      .status(400)
      .json({ error: "Please provide a post id." });
  }
  if (!mongoose.Types.ObjectId.isValid(postId)) {
    return res.status(400).json({ error: "Invalid post id." });
  }

  // check if user id is provided and is valid
  if (!user._id) {
    return res
      .status(400)
      .json({ error: "Please provide a user id." });
  }
  if (!mongoose.Types.ObjectId.isValid(user._id)) {
    return res.status(400).json({ error: "Invalid user id." });
  }

  // find the post by post id and add user id to likes array
  Post.findByIdAndUpdate(
    postId,
    { $push: { likes: user._id } },
    { new: true }
  )
    .populate("likes", "name")
    .then((updatedPost) => {
      if (!updatedPost) {
        return res.status(404).json({ error: "Post not found" });
      }
      return res.json(updatedPost);
    })
    .catch((err) => res.status(500).json({ error: err.message }));
});

module.exports = { getPosts, createPost, likePost };
