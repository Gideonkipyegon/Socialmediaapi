import express from 'express';
import { getAllHashtag, createHashtag, getSingleHashtag, updateHashtag, deleteHashtag } from '../controllers/hashtagController.js';
const router = express.Router();

const Hashtag = app => {
    app.route('/Hashtag')
        .get(getAllHashtag)
        .post(createHashtag)
    app.route('/Hashtag/:id')
        .get(getSingleHashtag)
        .put(updateHashtag)
        .delete(deleteHashtag);
}
export default Hashtag