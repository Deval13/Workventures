import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config({path : "../.env"})
export async function authenticateUser(req, res, next) {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({
                msg: "User is not authenticated",
                success: false
            })
        }
        const jwtRes = await jwt.verify(token, process.env.SECRET_KEY)
        if (jwtRes) {
            req.id = jwtRes.userID;
            next()
        }
        else {
            res.status(401).json({
               msg: "invalid token" 
            })
        }
    }
    catch (err) {
        console.log(err);   
    }
}