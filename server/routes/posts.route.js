const express = require('express')
const postController = require('../controllers/post.controller')

const routes = express.Router()

routes.get(, postController.getPost)
routes.post('/', postController.createPost)

module.exports = routes