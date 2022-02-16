const mongoose = require("mongoose");
const Post = require("../models/Post.model");

const getPosts = async (req, res) => {
  try {
    const postMessages = await Post.find();
    res.status(200).json(postMessages);
  } catch (error) {
    res.status(404).json({ msg: `Error: ${error}` });
  }
};

const getPost = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ msg: `No post with id ${id}` });
  }
  try {
    const post = await Post.findById(id);
    res.status(202).json(post);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const createPost = async (req, res) => {
  const { title, message, selectedFile, creator, tags } = req.body;

  const newPost = new Post({ title, message, selectedFile, creator, tags });

  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ msg: `Error: ${error}` });
  }
};

const updatePost = async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ msg: "No post with id ${id}" });
  }
  try {
    await Post.findByIdAndUpdate(id, body, { new: true });
    res.status(201).json({ msg: "Success updating post" });
  } catch (error) {
    console.error(error);
  }
};

const deletePost = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ msg: `Ther's no memorie with id ${id}` });
  }
  try {
    await Post.findOneAndDelete(id);
    res.status(202).json({ msg: "Memories has been deleted" });
  } catch (error) {
    console.error(error);
  }
};

const likePost = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ msg: `Ther's no memorie with id ${id}` });
  }

  try {
    const post = await Post.findById(id);

    await Post.findByIdAndUpdate(id, { likeCount: post.likeCount + 1 });
    return res.status(200).json({ msg: "Liked..." });
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  getPosts,
  createPost,
  getPost,
  updatePost,
  deletePost,
  likePost,
};
