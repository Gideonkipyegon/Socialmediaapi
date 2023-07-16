import express from 'express';
import { getAllFollower, createFollower, getSingleFollower, updateFollower, deleteFollower } from '../controllers/followerController.js';
const router = express.Router();

const Follower = app => {
    app.route('/Follower')
        .get(getAllFollower)
        .post(createFollower)
    app.route('/Follower/:id')
        .get(getSingleFollower)
        .put(updateFollower)
        .delete(deleteFollower);
}
export default Follower