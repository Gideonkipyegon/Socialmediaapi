import sql from "mssql";
import config from "../db/config.js";

// GET ALL  USERPROFILES
export const getAllUserProfile = async(req, res) => {
    try {
        let pool = await sql.connect(config.sql);
        const result = await pool.request().query("SELECT * FROM UserProfile");
        res.json(result.recordset);
    } catch (error) {
        res.status(201).json(error.message);
    } finally {
        sql.close();
    }
};

//CREATE USER
export const createUserProfile = async(req, res) => {
    try {
        const { Username, Name, Age, Gender, Location, JoinDate, Bio, Password } = req.body;
        let pool = await sql.connect(config.sql);
        await pool
            .request()
            // .input("customer_id", sql.Int, customer_id)
            .input("Username", sql.VarChar, Username)
            .input("Name", sql.VarChar, Name)
            .input("Age", sql.VarChar, Age)
            .input("Gender", sql.VarChar, Gender)
            .input("Location", sql.VarChar, Location)
            .input("JoinDate", sql.VarChar, JoinDate)
            .input("Bio", sql.VarChar, Bio)
            .input("Password", sql.VarChar, Password)
            .query(
                "INSERT INTO UserProfile(Username, Name, Age,Gender,Location,JoinDate,Bio,Password) VALUES (@Username, @Name, @Age,@Gender,@Location,@JoinDate,@Bio,@Password)"
            );
        res.status(200).json(" user created successfully");
    } catch (error) {
        res.status(201).json(error.message);
    } finally {
        sql.close();
    }
};

//GET USER BY ID
export const getSingleUserProfile = async(req, res) => {
    try {
        const { id } = req.params;
        let pool = await sql.connect(config.sql);
        const result = await pool
            .request()
            .input("id", sql.VarChar, id)
            .query(`SELECT * FROM UserProfile WHERE userID = @id`);
        res.status(200).json(result.recordset[0]);
    } catch (error) {
        res.status(201).json(error.message);
    } finally {
        sql.close();
    }
};

//UPDATE USERPROFILE
export const updateUserProfile = async(req, res) => {
    try {
        const { id } = req.params;
        const { Username, Name, Age, Gender, Location, JoinDate, Bio, Password } = req.body;
        let pool = await sql.connect(config.sql);
        await pool
            .request()
            .input("id", sql.VarChar, id)
            .input("Username", sql.VarChar, Username)
            .input("Name", sql.VarChar, Name)
            .input("Age", sql.VarChar, Age)
            .input("Gender", sql.VarChar, Gender)
            .input("Location", sql.VarChar, Location)
            .input("JoinDate", sql.VarChar, JoinDate)
            .input("Bio", sql.VarChar, Bio)
            .input("Password", sql.VarChar, Password)
            .query(
                `UPDATE UserProfile SET Username = @Username, Name = @Name, Age = @Age,Gender=@Gender,Location=@Location,JoinDate=@JoinDate,Bio=@Bio,Password=@Password WHERE userID = @id`
            );
        res.status(200).json("user updated successfully");
    } catch (error) {
        res.status(500).json(error.message);
    } finally {
        sql.close();
    }
};

//DELETE USER
export const deleteUserProfile = async(req, res) => {
    try {
        const { id } = req.params;
        let pool = await sql.connect(config.sql);
        await pool
            .request()
            .input("id", sql.VarChar, id)
            .query(`DELETE FROM UserProfile WHERE UserID = @id`);
        res.status(200).json("UserProfile deleted successfully");
    } catch (error) {
        res.status(500).json(error.message);
    } finally {}
}; {
    sql.close();
};