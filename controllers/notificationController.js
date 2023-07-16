import sql from "mssql";
import config from "../db/config.js";

// GET ALL NOTIFICATION
export const getAllNotification = async(req, res) => {
    try {
        let pool = await sql.connect(config.sql);
        const result = await pool.request().query("SELECT * FROM Notification");
        res.json(result.recordset);
    } catch (error) {
        res.status(201).json(error.message);
    } finally {
        sql.close();
    }
};

//CREATE NOTIFICATION
export const createNotification = async(req, res) => {
    try {
        const { UserID, Content, Timestamp, IsRead } = req.body;
        let pool = await sql.connect(config.sql);
        await pool
            .request()
            // .input("customer_id", sql.Int, customer_id)
            .input("userid", sql.VarChar, UserID)
            .input("content", sql.VarChar, Content)
            .input("TIME", sql.VarChar, Timestamp)
            .input("isread", sql.VarChar, IsRead)
            .query(
                "INSERT INTO Notification(UserID, Content, Timestamp,IsRead) VALUES (@UserID, @Content, @Timestamp,@IsRead)"
            );
        res.status(200).json(" Notification created successfully");
    } catch (error) {
        res.status(201).json(error.message);
    } finally {
        sql.close();
    }
};

//GET NOTIFICATION BY ID
export const getSingleNotification = async(req, res) => {
    try {
        const { id } = req.params;
        let pool = await sql.connect(config.sql);
        const result = await pool
            .request()
            .input("id", sql.VarChar, id)
            .query(`SELECT * FROM Notification WHERE NotificationID = @id`);
        res.status(200).json(result.recordset[0]);
    } catch (error) {
        res.status(201).json(error.message);
    } finally {
        sql.close();
    }
};

//UPDATE NOTIFICATION
export const updateNotification = async(req, res) => {
    try {
        const { id } = req.params;
        const { UserID, Content, Timestamp, IsRead } = req.body;
        let pool = await sql.connect(config.sql);
        await pool
            .request()
            .input("id", sql.VarChar, id)
            .input("userid", sql.VarChar, UserID)
            .input("content", sql.VarChar, Content)
            .input("time", sql.VarChar, Timestamp)
            .input("isread", sql.VarChar, IsRead)
            .query(
                `UPDATE Notification SET UserID = @UserID, Content = @Content,Timestamp = @Timestamp,IsRead=@IsRead WHERE NotificationID = @id`
            );
        res.status(200).json("Notification updated successfully");
    } catch (error) {
        res.status(500).json(error.message);
    } finally {
        sql.close();
    }
};

//DELETE NOTIFICATION
export const deleteNotification = async(req, res) => {
    try {
        const { id } = req.params;
        let pool = await sql.connect(config.sql);
        await pool
            .request()
            .input("id", sql.VarChar, id)
            .query(`DELETE FROM Notification WHERE NotificationID = @id`);
        res.status(200).json("Notification deleted successfully");
    } catch (error) {
        res.status(500).json(error.message);
    } finally {}
}; {
    sql.close();
};