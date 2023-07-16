import sql from 'mssql';
import config from '../db/config.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const loginRequired = (req, res, next) => {
    if (req.User) {
        next()
    } else {
        return res.status(401).json({ message: 'Unauthorized user' })
    }
}



export const register = async(req, res) => {
    const { Username, Name, Age, Gender, Location, JoinDate, Bio, Password } = req.body;
    const hashedPassword = bcrypt.hashSync(Password, 10);
    try {
        let pool = await sql.connect(config.sql);
        const result = await pool.request()
            .input('Username', sql.VarChar, Username)
            .input('Name', sql.VarChar, Name)
            .query('SELECT * FROM UserProfile WHERE Username=@Username OR Name=@Name');
        const user = result.recordset[0];

        if (user) {
            res.status(409).json({ error: 'user already exist' });
        } else {
            // let pool = await sql.connect(config.sql);
            await pool.request()
                .input('Username', sql.VarChar, Username)
                .input('Name', sql.VarChar, Name)
                .input('Age', sql.VarChar, Age)
                .input('Gender', sql.VarChar, Gender)
                .input('Location', sql.VarChar, Location)
                .input('JoinDate', sql.VarChar, JoinDate)
                .input('Bio', sql.VarChar, Bio)
                .input('Password', sql.VarChar, hashedPassword)
                .query('INSERT INTO UserProfile(Username, Name, Age, Gender,Location,JoinDate,Bio, Password) values(@Username,@Name,@Age,@Gender,@Location,@JoinDate,@Bio,@Password)');
            res.status(200).send({ message: "user created successfully" });
        }
    } catch (error) {
        res.status(200).json(error.message);
    } finally {
        sql.close()
    }


};

export const login = async(req, res) => {
    const { Username, Password } = req.body;
    let pool = await sql.connect(config.sql);
    try {
        const result = await pool
            .request()
            .input('Username', sql.VarChar, Username)
            .query('SELECT * FROM UserProfile WHERE Username=@Username');
        const user = result.recordset[0];
        if (!Username) {
            return res.status(401).json({ message: 'authentication failed. wrong credentials' });
        }
        if (!Password) {
            return res.status(401).json({ error: 'wrong credentials' });
        }
        const passwordMatch = await bcrypt.compare(Password, user.Password);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'authentication failed. wrong credentials' });
        }
        const token = jwt.sign({
                Username: user.Username,
                Name: user.Name
            },
            config.jwt_secret, { expiresIn: '10 minutes' }
        );
        return res.status(200).json({
            username: user.Username,
            Name: user.Name,
            id: user.UserID,
            token: token
        });
    } catch (error) {
        console.error("error:", error);
        return res.status(500).json(error.message);
    } finally {
        if (pool) {
            pool.close();
        }
    }
};