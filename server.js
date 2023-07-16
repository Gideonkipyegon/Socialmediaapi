import express from 'express'
import config from "./db/config.js";
import bodyParser from "body-parser";
import Comment from "./routes/comment.js";
import Follower from "./routes/Follower.js";
import Likes from "./routes/likes.js";
import Post from "./routes/post.js";
import Hashtag from "./routes/Hashtag.js";
import Message from "./routes/Message.js";
import Notification from "./routes/Notification.js";
import PostHashtag from "./routes/PostHashtag.js";
import Share from "./routes/Share.js";
import UserProfile from "./routes/UserProfile.js";
import cors from "cors";
import Jwt from "jsonwebtoken";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

Comment(app);
Follower(app);
Likes(app);
Post(app);
Hashtag(app);
Message(app);
Notification(app);
PostHashtag(app);
Share(app);
UserProfile(app);

app.get("/", (req, res) => {
    res.send("Welcome to my API!");
});


app.listen(config.port, () => {
    console.log(`Server running at port ${config.url}`);
});