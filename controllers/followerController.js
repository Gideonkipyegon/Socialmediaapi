import sql from "mssql";
import config from "../db/config.js";

// GET ALL  COMMENT
export const getAllFollower = async(req, res) => {
    try {
        let pool = await sql.connect(config.sql);
        const result = await pool.request().query("SELECT * FROM Follower");
        res.json(result.recordset);
    } catch (error) {
        res.status(201).json(error.message);
    } finally {
        sql.close();
    }
};

//CREATE FOLLOWER
export const createFollower = async(req, res) => {
    try {
        const { UserID, FollowerUserID, FollowDate } = req.body;
        let pool = await sql.connect(config.sql);
        await pool
            .request()
            .input("userid", sql.VarChar, UserID)
            .input("follower", sql.VarChar, FollowerUserID)
            .input("date", sql.VarChar, FollowDate)
            .query(
                "INSERT INTO Follower(UserID, FollowerUserID, FollowDate) VALUES (@UserID, @FollowerUserID, @FollowDate)"
            );
        res.status(200).json("following");
    } catch (error) {
        res.status(201).json(error.message);
    } finally {
        sql.close();
    }
};

//GET FOLLOWER BY ID
export const getSingleFollower = async(req, res) => {
    try {
        const { id } = req.params;
        let pool = await sql.connect(config.sql);
        const result = await pool
            .request()
            .input("id", sql.VarChar, id)
            .query(`SELECT * FROM Follower WHERE FollowerID = @id`);
        res.status(200).json(result.recordset[0]);
    } catch (error) {
        res.status(201).json(error.message);
    } finally {
        sql.close();
    }
};

//UPDATE Follower
export const updateFollower = async(req, res) => {
    try {
        const { id } = req.params;
        const { UserID, FollowerUserID, FollowDate } = req.body;
        let pool = await sql.connect(config.sql);
        await pool
            .request()
            .input("id", sql.VarChar, id)
            .input("userid", sql.VarChar, UserID)
            .input("followerid", sql.VarChar, FollowerUserID)
            .input("date", sql.VarChar, FollowDate)

        .query(
            `UPDATE Follower SET UserID = @UserID, FollowerUserID = @FollowerUserID,FollowDate= @FollowDate WHERE FollowerID = @id`
        );
        res.status(200).json("Follower updated successfully");
    } catch (error) {
        res.status(500).json(error.message);
    } finally {
        sql.close();
    }
};

//DELETE FOLLOWER
export const deleteFollower = async(req, res) => {
    try {
        const { id } = req.params;
        let pool = await sql.connect(config.sql);
        await pool
            .request()
            .input("id", sql.VarChar, id)
            .query(`DELETE FROM FOLLOWER WHERE FollowerID = @id`);
        res.status(200).json("you have unfollow successfully");
    } catch (error) {
        res.status(500).json(error.message);
    } finally {}
}; {
    sql.close();
};