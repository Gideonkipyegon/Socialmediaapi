import express from 'express';
import { getAllShare, createShare, getSingleShare, updateShare, deleteShare } from '../controllers/shareController.js';
const router = express.Router();

const Share = app => {
    app.route('/Share')
        .get(getAllShare)
        .post(createShare)
    app.route('/Share/:id')
        .get(getSingleShare)
        .put(updateShare)
        .delete(deleteShare);
}
export default Share