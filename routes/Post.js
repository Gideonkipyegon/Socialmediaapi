import express from 'express';
import { getAllPost, createPost, getSinglePost, updatePost, deletePost } from '../controllers/postController.js';
const router = express.Router();

const Post = app => {
    app.route('/Post')
        .get(getAllPost)
        .post(createPost)
    app.route('/Post/:id')
        .get(getSinglePost)
        .put(updatePost)
        .delete(deletePost);
}
export default Post