// import express from 'express';
import { getAllUserProfile, createUserProfile, getSingleUserProfile, updateUserProfile, deleteUserProfile } from '../controllers/userprofileController.js';
import { register, login } from '../controllers/userController.js';
// const router = express.Router();

const UserProfile = app => {
    app.route('/UserProfile')
        .get(getAllUserProfile)
        .post(createUserProfile)
    app.route('/UserProfile/:id')
        .get(getSingleUserProfile)
        .put(updateUserProfile)
        .delete(deleteUserProfile);

    //auth routes
    app.route('/auth/register')
        .post(register);
    app.route('/auth/login')
        .post(login);
}
export default UserProfile