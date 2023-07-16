import sql from "mssql";
import config from "../db/config.js";

// GET ALL POST
export const getAllPost = async(req, res) => {
    try {
        let pool = await sql.connect(config.sql);
        const result = await pool.request().query("SELECT * FROM Post");
        res.json(result.recordset);
    } catch (error) {
        res.status(201).json(error.message);
    } finally {
        sql.close();
    }
};

//CREATE POST
export const createPost = async(req, res) => {
    try {
        const { UserID, Content, Likes, Comments, Shares } = req.body;
        let pool = await sql.connect(config.sql);
        await pool
            .request()
            // .input("customer_id", sql.Int, customer_id)
            .input("userid", sql.VarChar, UserID)
            .input("content", sql.VarChar, Content)
            .input("likes", sql.VarChar, Likes)
            .input("comments", sql.VarChar, Comments)
            .input("share", sql.VarChar, Shares)
            .query(
                "INSERT INTO Post(UserID, Content, Likes,Comments,Shares) VALUES (@UserID, @Content, @Likes,@Comments,@Share)"
            );
        res.status(200).json(" Post created successfully");
    } catch (error) {
        res.status(201).json(error.message);
    } finally {
        sql.close();
    }
};

//GET POST BY ID
export const getSinglePost = async(req, res) => {
    try {
        const { id } = req.params;
        let pool = await sql.connect(config.sql);
        const result = await pool
            .request()
            .input("id", sql.VarChar, id)
            .query(`SELECT * FROM Post WHERE PostID = @id`);
        res.status(200).json(result.recordset[0]);
    } catch (error) {
        res.status(201).json(error.message);
    } finally {
        sql.close();
    }
};

//UPDATE POST
export const updatePost = async(req, res) => {
    try {
        const { id } = req.params;
        const { UserID, Content, Likes, Comments, Shares } = req.body;
        let pool = await sql.connect(config.sql);
        await pool
            .request()
            .input("id", sql.VarChar, id)
            .input("userid", sql.VarChar, UserID)
            .input("content", sql.VarChar, Content)
            .input("likes", sql.VarChar, Likes)
            .input("comments", sql.VarChar, Comments)
            .input("Shares", sql.VarChar, Shares)

        .query(
            `UPDATE Post SET UserID = @UserID, Content = @Content, Likes = @Likes,Comments= @Comments,Shares= @Shares WHERE PostID = @id`
        );
        res.status(200).json("Post updated successfully");
    } catch (error) {
        res.status(500).json(error.message);
    } finally {
        sql.close();
    }
};

//DELETE POST
export const deletePost = async(req, res) => {
    try {
        const { id } = req.params;
        let pool = await sql.connect(config.sql);
        await pool
            .request()
            .input("id", sql.VarChar, id)
            .query(`DELETE FROM Post WHERE PostID = @id`);
        res.status(200).json("Post deleted successfully");
    } catch (error) {
        res.status(500).json(error.message);
    } finally {}
}; {
    sql.close();
};