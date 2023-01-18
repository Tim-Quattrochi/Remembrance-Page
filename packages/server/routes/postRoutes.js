const express = require("express");
const router = express.Router();

const {
  getPosts,
  createPost,
  likePost,
} = require("../controllers/postController");

const { protect } = require("../middleware/authMiddle");

router.get("/", protect, getPosts);
router.post("/", protect, createPost);

router.post("/like/:postId", protect, likePost);

module.exports = router;
