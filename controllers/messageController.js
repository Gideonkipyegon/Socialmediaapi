import sql from "mssql";
import config from "../db/config.js";

// GET ALL MESSAGES
export const getAllMessage = async(req, res) => {
    try {
        let pool = await sql.connect(config.sql);
        const result = await pool.request().query("SELECT * FROM Message");
        res.json(result.recordset);
    } catch (error) {
        res.status(201).json(error.message);
    } finally {
        sql.close();
    }
};

//CREATE MESSAGE
export const createMessage = async(req, res) => {
    try {
        const { SenderUserID, ReceiverUserID, Content, Timestamp } = req.body;
        let pool = await sql.connect(config.sql);
        await pool
            .request()
            .input("userid", sql.VarChar, SenderUserID)
            .input("recieveduserid", sql.VarChar, ReceiverUserID)
            .input("content", sql.VarChar, Content)
            .input("TIME", sql.VarChar, Timestamp)
            .query(
                "INSERT INTO Message(SenderUserID, ReceiverUserID,Content, Timestamp) VALUES (@SenderUserID, @ReceiverUserID,@Timestamp,@Timestamp)"
            );
        res.status(200).json(" Message created successfully");
    } catch (error) {
        res.status(201).json(error.message);
    } finally {
        sql.close();
    }
};

//GET MESSAGE BY ID
export const getSingleMessage = async(req, res) => {
    try {
        const { id } = req.params;
        let pool = await sql.connect(config.sql);
        const result = await pool
            .request()
            .input("id", sql.VarChar, id)
            .query(`SELECT * FROM Message WHERE MessageID = @id`);
        res.status(200).json(result.recordset[0]);
    } catch (error) {
        res.status(201).json(error.message);
    } finally {
        sql.close();
    }
};

//UPDATE MESSAGE
export const updateMessage = async(req, res) => {
    try {
        const { id } = req.params;
        const { SenderUserID, ReceiverUserID, Content, Timestamp } = req.body;
        let pool = await sql.connect(config.sql);
        await pool
            .request()
            .input("id", sql.VarChar, id)
            .input("SenderUserID", sql.VarChar, SenderUserID)
            .input("ReceiverUserID", sql.VarChar, ReceiverUserID)
            .input("Content", sql.VarChar, Content)
            .input("Timestamp", sql.VarChar, Timestamp)
            .query(
                `UPDATE Message SET SenderUserID = @SenderUserID, ReceiverUserID = @ReceiverUserID,Content=@Content,Timestamp = @Timestamp WHERE MessageID = @id`
            );
        res.status(200).json("Message updated successfully");
    } catch (error) {
        res.status(500).json(error.message);
    } finally {
        sql.close();
    }
};

//DELETE MESSAGE
export const deleteMessage = async(req, res) => {
    try {
        const { id } = req.params;
        let pool = await sql.connect(config.sql);
        await pool
            .request()
            .input("id", sql.VarChar, id)
            .query(`DELETE FROM Message WHERE MessageID = @id`);
        res.status(200).json("Message deleted successfully");
    } catch (error) {
        res.status(500).json(error.message);
    } finally {}
}; {
    sql.close();
};