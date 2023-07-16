import express from 'express';
import { getAllMessage, createMessage, getSingleMessage, updateMessage, deleteMessage } from '../controllers/messageController.js';
const router = express.Router();

const Message = app => {
    app.route('/Message')
        .get(getAllMessage)
        .post(createMessage)
    app.route('/Message/:id')
        .get(getSingleMessage)
        .put(updateMessage)
        .delete(deleteMessage);
}
export default Message