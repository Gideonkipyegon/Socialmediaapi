import sql from "mssql";
import config from "../db/config.js";

// GET ALL  POSTHASHTAG
export const getAllPostHashtag = async(req, res) => {
    try {
        let pool = await sql.connect(config.sql);
        const result = await pool.request().query("SELECT * FROM PostHashtag");
        res.json(result.recordset);
    } catch (error) {
        res.status(201).json(error.message);
    } finally {
        sql.close();
    }
};

//CREATE POSTHASHTAG
export const createPostHashtag = async(req, res) => {
    try {
        const { PostHashtagName } = req.body;
        let pool = await sql.connect(config.sql);
        await pool
            .request()
            // .input("customer_id", sql.Int, customer_id)
            .input("PostHashtag", sql.VarChar, PostHashtagName)
            .query(
                "INSERT INTO PostHashtag(PostHashtagName) VALUES (@PostHashtagName)"
            );
        res.status(200).json(" posted successfully");
    } catch (error) {
        res.status(201).json(error.message);
    } finally {
        sql.close();
    }
};

//GET POSTHASHTTAG BY ID
export const getSinglePostHashtag = async(req, res) => {
    try {
        const { id } = req.params;
        let pool = await sql.connect(config.sql);
        const result = await pool
            .request()
            .input("id", sql.VarChar, id)
            .query(`SELECT * FROM PostHashtag WHERE PostHashtagID = @id`);
        res.status(200).json(result.recordset[0]);
    } catch (error) {
        res.status(201).json(error.message);
    } finally {
        sql.close();
    }
};

//UPDATE POSTHASHTTAG
export const updatePostHashtag = async(req, res) => {
    try {
        const { id } = req.params;
        const { PostID, PostHashtagID } = req.body;
        let pool = await sql.connect(config.sql);
        await pool
            .request()
            .input("id", sql.VarChar, PostID)
            .input("posthashtagid", sql.VarChar, PostHashtagID)
            .query(`UPDATE PostHashtag SET PostID = @PostID, PostHashtag = @PostHashtagID WHERE userID = @id`);
        res.status(200).json("PostHashtag updated successfully");
    } catch (error) {
        res.status(500).json(error.message);
    } finally {
        sql.close();
    }
};

//DELETE POSTHASHTAG
export const deletePostHashtag = async(req, res) => {
    try {
        const { id } = req.params;
        let pool = await sql.connect(config.sql);
        await pool
            .request()
            .input("id", sql.VarChar, id)
            .query(`DELETE FROM PostHashtag WHERE UserID = @id`);
        res.status(200).json("PostHashtag deleted successfully");
    } catch (error) {
        res.status(500).json(error.message);
    } finally {}
}; {
    sql.close();
};