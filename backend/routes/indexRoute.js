import express from "express"
import UserRouter from "./userRoute.js"
import CompanyRouter from "./companyRoute.js"

const router = express.Router()

router.use("/user", UserRouter)
router.use("/company", CompanyRouter)

export default router