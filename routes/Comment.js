import express from 'express';
import { getAllComment, createComment, getSingleComment, updateComment, deleteComment } from '../controllers/CommentController.js';
const router = express.Router();

const Comment = app => {
    app.route('/Comment')
        .get(getAllComment)
        .post(createComment)
    app.route('/Comment/:id')
        .get(getSingleComment)
        .put(updateComment)
        .delete(deleteComment);
}
export default Comment