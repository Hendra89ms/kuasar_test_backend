import db from "../../prisma/connection.js"
import { hash, genSalt, compare } from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

export const register_user = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await db.users.findUnique({
            where: { email: email }
        })

        if (user) {
            return res.status(500).json({
                msg: "User already registered!"
            })
        }

        const genSalPasword = await genSalt();

        // Hash Password
        const hashPassword = await hash(password, genSalPasword);

        const userData = await db.users.create({
            data: {
                ...req.body,
                password: hashPassword
            }
        })

        // PAYLOAD
        const payLoad = { ...userData }

        if (payLoad && payLoad.password) {
            delete payLoad.password;
        }

        const expired = "1d"

        // CREATE TOKEN
        const accessToken = jwt.sign(payLoad, process.env.JWT_SECRET, {
            expiresIn: expired,
        });

        return res.status(200).json({ payLoad: payLoad, token: accessToken, expired });

    } catch (error) {
        console.log("Err : ", error)
        return res.status(500).json({
            msg: error
        })

    }
}

export const login_user = async (req, res) => {
    const { email, password } = req.body;
    try {

        const user = await db.users.findUnique({
            where: { email: email }
        })

        if (!user) {
            return res.status(404).json({ message: "User Not Found!" });
        }

        const passwordMatch = await compare(password, user.password);

        if (!passwordMatch) {
            return res.status(500).json({ msg: "Wrong Password!" });
        }
        const payLoad = { ...user };

        // DELETE PASSWORD
        if (payLoad && payLoad.password) {
            delete payLoad.password;
        }

        const expired = "1d"

        // CREATE TOKEN
        const accessToken = jwt.sign(payLoad, process.env.JWT_SECRET, {
            expiresIn: expired,
        });

        return res.status(200).json({ msg: "Login Success", token: accessToken, payLoad: payLoad, expired: expired });

    } catch (error) {
        console.log("ERROR : ", error)
        res.status(500).json({
            msg: error
        })
    }

}


