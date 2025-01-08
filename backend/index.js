import express from "express"
import cookieparser from "cookie-parser"
import cors from "cors"
import { MongoConnect } from "./db/db.js"
import dotenv from "dotenv"
// import userRouter from "./routes/userRoute.js"
import indexRouter from "./routes/indexRoute.js"
dotenv.config()
const app = express()
const corsoptions = {
    origin: "http://localhost:5137",
    credentials : true
}
app.use(express.json())
app.use(cors(corsoptions))
app.use(express.urlencoded({ extended: true }))
app.use(cookieparser())
console.log(process.env.PORT);
console.log(process.env.DATABASE_URL);
app.get("/", (req, res) => {
    res.status(200).json({
        msg : "Healthy Server"
    })
})

app.use("/api/v1" , indexRouter)


const PORT = 3000
app.listen(PORT, () => {
     MongoConnect()
    console.log(`server running at port ${PORT}`);
})