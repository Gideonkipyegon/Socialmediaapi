import express from 'express';
import { getAllPostHashtag, createPostHashtag, getSinglePostHashtag, updatePostHashtag, deletePostHashtag } from '../controllers/posthashtagController.js';
const router = express.Router();

const PostHastag = app => {
    app.route('/PostHastag')
        .get(getAllPostHashtag)
        .post(createPostHashtag)
    app.route('/PostHashtag/:id')
        .get(getSinglePostHashtag)
        .put(updatePostHashtag)
        .delete(deletePostHashtag);
}
export default PostHastag