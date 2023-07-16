import sql from "mssql";
import config from "../db/config.js";

// GET ALL  COMMENT
export const getAllComment = async(req, res) => {
    try {
        let pool = await sql.connect(config.sql);
        const result = await pool.request().query("SELECT * FROM Comment");
        res.json(result.recordset);
    } catch (error) {
        res.status(201).json(error.message);
    } finally {
        sql.close();
    }
};

//CREATE COMMENT
export const createComment = async(req, res) => {
    try {
        const { PostID, UserID, Content, Timestamp } = req.body;
        let pool = await sql.connect(config.sql);
        await pool
            .request()
            .input("postid", sql.Int, PostID)
            .input("userid", sql.VarChar, UserID)
            .input("content", sql.VarChar, Content)
            .input("TIME", sql.VarChar, Timestamp)
            .query(
                "INSERT INTO Comment(PostID,UserID, Content, Timestamp) VALUES (@PostID,@UserID, @Content, @Timestamp)"
            );
        res.status(200).json(" Comment submitted successfully");
    } catch (error) {
        res.status(201).json(error.message);
    } finally {
        sql.close();
    }
};

//GET COMMENT BY ID
export const getSingleComment = async(req, res) => {
    try {
        const { id } = req.params;
        let pool = await sql.connect(config.sql);
        const result = await pool
            .request()
            .input("id", sql.VarChar, id)
            .query(`SELECT * FROM Comment WHERE CommentID = @id`);
        res.status(200).json(result.recordset[0]);
    } catch (error) {
        res.status(201).json(error.message);
    } finally {
        sql.close();
    }
};

//UPDATE COMMENT
export const updateComment = async(req, res) => {
    try {
        const { id } = req.params;
        const { PostID, UserID, Content, Timestamp } = req.body;
        let pool = await sql.connect(config.sql);
        await pool
            .request()
            .input("id", sql.VarChar, id)
            .input("postid", sql.VarChar, PostID)
            .input("userid", sql.VarChar, UserID)
            .input("content", sql.VarChar, Content)
            .input("time", sql.VarChar, Timestamp)
            .query(
                `UPDATE Comment SET PostID=@PostID,UserID = @UserID, Content = @Content,Timestamp = @Timestamp, WHERE CommentID = @id`
            );
        res.status(200).json("Comment updated successfully");
    } catch (error) {
        res.status(500).json(error.message);
    } finally {
        sql.close();
    }
};

//DELETE COMMENT
export const deleteComment = async(req, res) => {
    try {
        const { id } = req.params;
        let pool = await sql.connect(config.sql);
        await pool
            .request()
            .input("id", sql.VarChar, id)
            .query(`DELETE FROM Comment WHERE CommentID = @id`);
        res.status(200).json("Comment deleted successfully");
    } catch (error) {
        res.status(500).json(error.message);
    } finally {}
}; {
    sql.close();
};