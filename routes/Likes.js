import express from 'express';
import { getAllLike, createLike, getSingleLike, updateLike, deleteLike } from '../controllers/likeController.js';
const router = express.Router();

const Like = app => {
    app.route('/Like')
        .get(getAllLike)
        .post(createLike)
    app.route('/Like/:id')
        .get(getSingleLike)
        .put(updateLike)
        .delete(deleteLike);
}
export default Like