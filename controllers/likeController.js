import sql from "mssql";
import config from "../db/config.js";

// GET ALL LIKES
export const getAllLike = async(req, res) => {
    try {
        let pool = await sql.connect(config.sql);
        const result = await pool.request().query("SELECT * FROM Likes");
        res.json(result.recordset);
    } catch (error) {
        res.status(201).json(error.message);
    } finally {
        sql.close();
    }
};

//CREATE LIKES
export const createLike = async(req, res) => {
    try {
        const { PostID, UserID, Timestamp } = req.body;
        let pool = await sql.connect(config.sql);
        await pool
            .request()
            .input("postid", sql.VarChar, PostID)
            .input("userid", sql.VarChar, UserID)
            .input("time", sql.VarChar, Timestamp)
            .query(
                "INSERT INTO Likes(PostID, UserID, Timestamp) VALUES (@PostID,@UserID, @Timestamp)"
            );
        res.status(200).json("following");
    } catch (error) {
        res.status(201).json(error.message);
    } finally {
        sql.close();
    }
};

//GET LIKE BY ID
export const getSingleLike = async(req, res) => {
    try {
        const { id } = req.params;
        let pool = await sql.connect(config.sql);
        const result = await pool
            .request()
            .input("id", sql.VarChar, id)
            .query(`SELECT * FROM Likes WHERE LikeID = @id`);
        res.status(200).json(result.recordset[0]);
    } catch (error) {
        res.status(201).json(error.message);
    } finally {
        sql.close();
    }
};

//UPDATE LIKES
export const updateLike = async(req, res) => {
    try {
        const { id } = req.params;
        const { PostID, UserID, Timestamp } = req.body;
        let pool = await sql.connect(config.sql);
        await pool
            .request()
            .input("id", sql.VarChar, id)
            .input("postid", sql.VarChar, PostID)
            .input("userid", sql.VarChar, UserID)
            .input("time", sql.VarChar, Timestamp)

        .query(
            `UPDATE Likes SET PostID=@PostID,UserID = @UserID, Timestamp = @Timestamp WHERE LikeID = @id`
        );
        res.status(200).json("Like updated successfully");
    } catch (error) {
        res.status(500).json(error.message);
    } finally {
        sql.close();
    }
};

//DELETE LIKES
export const deleteLike = async(req, res) => {
    try {
        const { id } = req.params;
        let pool = await sql.connect(config.sql);
        await pool
            .request()
            .input("id", sql.VarChar, id)
            .query(`DELETE FROM Likes WHERE LikeID = @id`);
        res.status(200).json("unliked successfully");
    } catch (error) {
        res.status(500).json(error.message);
    } finally {}
}; {
    sql.close();
};