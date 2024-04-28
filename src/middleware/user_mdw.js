import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
dotenv.config()

export const isAuthorized = async (req, res, next) => {

    let token;
    try {
        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer")
        ) {
            token = req.headers.authorization.split(" ")[1];

            const secretKey = process.env.JWT_SECRET;

            // Token Validation
            jwt.verify(token, secretKey, (err, decoded) => {
                if (err) return res.sendStatus(403);

                req.user = decoded;
                next();
            });

        } else {
            res.status(401).json({
                msg: "Not Tokent Found!"
            })
        }
    } catch (err) {
        res.status(500).json({
            msg: err
        })
    }
};