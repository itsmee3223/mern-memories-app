const express = require("express");
const postController = require("../controllers/post.controller");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router
  .route("/")
  .get(postController.getPosts)
  .post(authMiddleware, postController.createPost);

router.get("/search", postController.getPostBySearch);

router
  .route("/:id")
  .get(postController.getPost)
  .patch(authMiddleware, postController.updatePost)
  .delete(authMiddleware, postController.deletePost);

router.patch("/:id/like-post", authMiddleware, postController.likePost);
router.post("/:id/comment", authMiddleware, postController.commentPost);

module.exports = router;
