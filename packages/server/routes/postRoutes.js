const express = require("express");
const router = express.Router();
const { ensureAuth } = require("../middleware/ensureAuth");

const {
  getPosts,
  createPost,
  likePost,
} = require("../controllers/postController");

const { protect } = require("../middleware/authMiddle");

router.get("/", ensureAuth, getPosts);
router.post("/", ensureAuth, createPost);

router.post("/like/:postId", ensureAuth, likePost);

module.exports = router;
