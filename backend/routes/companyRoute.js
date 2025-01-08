import { getAllCompany, getCompanyById, updateCompanyDetails, registerCompany } from "../controllers/companycontroller.js";
import express from "express"
import { authenticateUser } from "../middlewares/authenticate.js"

const router = express.Router()

router.route("/register").post(authenticateUser, registerCompany)
router.route("/updateCompany/:id").post(authenticateUser, updateCompanyDetails)
router.route("/get").get(authenticateUser, getAllCompany)
router.route("/getCompany/:id").get(authenticateUser, getCompanyById)

export default router