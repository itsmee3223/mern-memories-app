const express = require("express");
const postController = require("../controllers/post.controller");

const routes = express.Router();

routes
  .route("/posts")
  .get(postController.getPosts)
  .post(postController.createPost);

routes
  .route("/posts/:id")
  .get(postController.getPost)
  .patch(postController.updatePost)
  .delete(postController.deletePost);

routes.patch("/posts/:id/like-post", postController.likePost);

module.exports = routes;
