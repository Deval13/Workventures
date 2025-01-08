import express from "express"
import { login, register, updateProfile } from "../controllers/usercontroller.js"
import { authenticateUser } from "../middlewares/authenticate.js"
const router = express.Router()

router.route("/register").post(register)
router.route("/login").post(login)
router.route("/updateprofile").post(authenticateUser , updateProfile)

export default router;
