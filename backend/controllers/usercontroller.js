import { User } from "../models/user.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config({path : "../.env"})
export const register = async (req, res) => {
    try {
        const { username, email, phonenumber,password , role } = req.body
        if (!username || !email || !phonenumber || !password || !role) {
            console.log(username , email , phonenumber , password , role);
            
            return res.status(400).json({
                msg: "Fill all the form fields",
                success : false
           })
        }
        const user = await User.findOne({ email })
        console.log("User is ",user);
        
        if (user) {
            return res.status(400).json({
                msg: "User Already Exists",
                success : false
            })
        }
        const saltingValue = 10;
        const hashedPwd = await bcrypt.hash(password, saltingValue)
        console.log(hashedPwd);
        const userrole = role.toLowerCase()
        const dbres = await User.create({
            username,
            password : hashedPwd,
            email,
            phonenumber,
            role : userrole
        })
        if (dbres) {
            return res.status(400).json({
                msg: "User Created successfully",
                success: true
            })
        }
    }
    catch (e) {
        console.log("Error while registering");
        console.log(e);
    }
}

export const login = async (req, res) => {
    try {
        const { email ,password, role } = req.body
        if (!email || !password || !role) {
            return res.status(400).json({
                msg: "Fill all the form fields",
                success: false
            })
        }
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(403).json({
                msg: "Incorrect Email Or Password!!",
                status : false
            })
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password)
        if (!isPasswordMatch) {
            return res.status(403).json({
                msg: "Incorrect Password!!",
                status: false
            }) 
        }
        if (user.role !== role) {
            return res.status(403).json({
                msg: "Incorrect Role!!",
                status: false
            })
        }

        const userdetails = { userID: user._id };
        const token = jwt.sign(userdetails, process.env.SECRET_KEY, { expiresIn: '2d' })
        console.log("token is " ,token);
        
        return res.status(201).cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpsOnly: true, sameSite: 'strict' }).json({
            msg: "Hello User", 
            success: true,
            user
        })
    }
    catch (e) {
        console.log("Error while registering");
        console.log(e);
        return res.status(403).json({
            msg: "Error while creating check your credentials!!",
            status: false
        })
    }
}

export const logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            msg: "logged out successfully",
            success: true
        })
    }
    catch (err) {
        console.log(err);
        
    }
}

export const updateProfile = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, bio, skills } = req.body
        const file = req.file

        
        
        let skillsArray;
        if (skills) {
            skillsArray = skills.split(" ")
        }
        const userId = req.id

        const userdb = await User.findById(userId)
        fullname != null ? userdb.username = fullname: console.log("");
        email != null ? userdb.email = email : console.log("");
        phoneNumber != null ? userdb.mobileNumber = phoneNumber : console.log("");
        bio != null ? userdb.profile.bio = bio : console.log("");
        skillsArray != null ? userdb.profile.skills = skillsArray : console.log("");
        
        
        
        // userdb.email = email
        // userdb.mobileNumber = phoneNumber
        // userdb.profile.bio = bio
        // userdb.profile.skills = skillsArray
        
        await userdb.save()

        const user = {
            _id: userdb._id,
            fullname: userdb.username,
            email: userdb.email,
            phoneNumber: userdb.mobileNumber,
            profile : userdb.profile
        }

        res.status(200).json({
            msg: "user updated successfully",
            user, 
        })
    }
    catch (err) {
        console.log(err);
        
    }
}
