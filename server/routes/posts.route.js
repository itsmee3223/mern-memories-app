const express = require("express");
const postController = require("../controllers/post.controller");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router
  .route("/posts")
  .get(postController.getPosts)
  .post(authMiddleware, postController.createPost);

router
  .route("/posts/:id")
  .patch(authMiddleware, postController.updatePost)
  .delete(authMiddleware, postController.deletePost);

router.patch("/posts/:id/like-post", authMiddleware, postController.likePost);

module.exports = router;
