import express from 'express';
import { getAllNotification, createNotification, getSingleNotification, updateNotification, deleteNotification } from '../controllers/notificationController.js';
const router = express.Router();

const Notification = app => {
    app.route('/Notification')
        .get(getAllNotification)
        .post(createNotification)
    app.route('/Notification/:id')
        .get(getSingleNotification)
        .put(updateNotification)
        .delete(deleteNotification);
}
export default Notification