const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const Post = require("../models/postModel");
const User = require("../models/userModel");

const getPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find({})
    .sort({ created: -1 })
    .populate("user", "-password -_id -email -roles")
    .populate("likes", "name");

  console.log(posts);

  res.json(posts.map((post) => post.toJSON()));
});

const createPost = asyncHandler(async (req, res) => {
  const { content } = req.body;
  const { user } = req;

  const newPost = new Post({
    content: content,
    user: user._id,
    likes: [],
  });

  await newPost.save();

  const post = await Post.findById(newPost._id).populate(
    "user",
    "name -_id"
  );

  res.status(201).json(post);
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
  await Post.findByIdAndUpdate(
    postId,
    { $addToSet: { likes: user._id } },
    { new: true }
  )
    .populate("likes", "-_id name")
    .then((updatedPost) => {
      if (!updatedPost) {
        return res.status(404).json({ error: "Post not found" });
      }
      console.log(updatedPost);
      return res.json(updatedPost);
    })
    .catch((err) => res.status(500).json({ error: err.message }));
});

module.exports = { getPosts, createPost, likePost };
