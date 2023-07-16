import sql from "mssql";
import config from "../db/config.js";

// GET ALL  HASHTAG
export const getAllHashtag = async(req, res) => {
    try {
        let pool = await sql.connect(config.sql);
        const result = await pool.request().query("SELECT * FROM Hashtag");
        res.json(result.recordset);
    } catch (error) {
        res.status(201).json(error.message);
    } finally {
        sql.close();
    }
};

//CREATE HASHTAG
export const createHashtag = async(req, res) => {
    try {
        const { HashtagName } = req.body;
        let pool = await sql.connect(config.sql);
        await pool
            .request()
            .input("hashtag", sql.VarChar, HashtagName)
            .query(
                "INSERT INTO Hastag(HashtagName) VALUES (@HashtagName)"
            );
        res.status(200).json("following");
    } catch (error) {
        res.status(201).json(error.message);
    } finally {
        sql.close();
    }
};

//GET HASHTAG BY ID
export const getSingleHashtag = async(req, res) => {
    try {
        const { id } = req.params;
        let pool = await sql.connect(config.sql);
        const result = await pool
            .request()
            .input("id", sql.VarChar, id)
            .query(`SELECT * FROM Hashtag WHERE HashtagID = @id`);
        res.status(200).json(result.recordset[0]);
    } catch (error) {
        res.status(201).json(error.message);
    } finally {
        sql.close();
    }
};

//UPDATE HASHTAG
export const updateHashtag = async(req, res) => {
    try {
        const { id } = req.params;
        const { HashtagID, HashtagName } = req.body;
        let pool = await sql.connect(config.sql);
        await pool
            .request()
            .input("id", sql.VarChar, id)
            .input("hashtagID", sql.VarChar, HashtagID)
            .input("hashtagname", sql.VarChar, HashtagName)
            .query(
                `UPDATE Hashtag SET HashtagID = @HashtagID, HashtagName = @HashtagName WHERE HashtagID = @id`
            );
        res.status(200).json("Hashtag updated successfully");
    } catch (error) {
        res.status(500).json(error.message);
    } finally {
        sql.close();
    }
};

//DELETE HASHTAG
export const deleteHashtag = async(req, res) => {
    try {
        const { id } = req.params;
        let pool = await sql.connect(config.sql);
        await pool
            .request()
            .input("id", sql.VarChar, id)
            .query(`DELETE FROM Hashtag WHERE HashtagID = @id`);
        res.status(200).json("deleted successfully");
    } catch (error) {
        res.status(500).json(error.message);
    } finally {}
}; {
    sql.close();
};