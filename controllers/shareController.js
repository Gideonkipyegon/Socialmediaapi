import sql from "mssql";
import config from "../db/config.js";

// GET ALL  SHARE
export const getAllShare = async(req, res) => {
    try {
        let pool = await sql.connect(config.sql);
        const result = await pool.request().query("SELECT * FROM Share");
        res.json(result.recordset);
    } catch (error) {
        res.status(201).json(error.message);
    } finally {
        sql.close();
    }
};

//CREATE SHARE
export const createShare = async(req, res) => {
    try {
        const { PostID, UserID } = req.body;
        let pool = await sql.connect(config.sql);
        await pool
            .request()
            // .input("customer_id", sql.Int, customer_id)
            .input("postid", sql.VarChar, PostID)
            .input("userid", sql.VarChar, UserID)
            .query(
                "INSERT INTO Customer(PostID, UserID) VALUES (@PostID, @UserID)"
            );
        res.status(200).json(" Shared  successfully");
    } catch (error) {
        res.status(201).json(error.message);
    } finally {
        sql.close();
    }
};

//GET Share BY ID
export const getSingleShare = async(req, res) => {
    try {
        const { id } = req.params;
        let pool = await sql.connect(config.sql);
        const result = await pool
            .request()
            .input("id", sql.VarChar, id)
            .query(`SELECT * FROM Share WHERE ShareID = @id`);
        res.status(200).json(result.recordset[0]);
    } catch (error) {
        res.status(201).json(error.message);
    } finally {
        sql.close();
    }
};

//UPDATE SHARE
export const updateShare = async(req, res) => {
    try {
        const { id } = req.params;
        const {ShareID, PostID, UserID } = req.body;
        let pool = await sql.connect(config.sql);
        await pool
            .request()
            .input("id", sql.VarChar, ShareID)
            .input("postid", sql.VarChar, PostID)
            .input("UserID", sql.VarChar, UserID)
            .query(`UPDATE Share SET PostID = @PostID, UserID = @UsedrID WHERE userID = @id`);
        res.status(200).json("Share updated successfully");
    } catch (error) {
        res.status(500).json(error.message);
    } finally {
        sql.close();
    }
};

//DELETE SHARE
export const deleteShare = async(req, res) => {
    try {
        const { id } = req.params;
        let pool = await sql.connect(config.sql);
        await pool
            .request()
            .input("id", sql.VarChar, id)
            .query(`DELETE FROM Share WHERE UserID = @id`);
        res.status(200).json("Unshared successfully");
    } catch (error) {
        res.status(500).json(error.message);
    } finally {
    }
};     
{ 
sql.close();
 };