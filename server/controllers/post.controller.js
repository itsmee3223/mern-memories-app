const Post = require("../models/Post.model");

const getPost = async (req, res) => {
  try {
    const postMessages = await Post.find();
    res.status(200).json(postMessages);
  } catch (error) {
    res.status(404).json({ msg: `Error: ${error}` });
  }
};

const createPost = async (req, res) => {
  const {} = req.body;

  const newPost = new Post();

  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ msg: `Error: ${error}` });
  }
};

module.exports = {
  getPost,
  createPost,
};
