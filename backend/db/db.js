import mongoose from 'mongoose';
import dotenv from "dotenv"
dotenv.config({path : "../.env"})
export const MongoConnect = async () => {
    try {
        console.log(process.env.DATABASE_URL);
        
       await mongoose.connect(process.env.DATABASE_URL)
        console.log("database connecttedd");    
    }
    catch (e) {
        console.log(e)    
    }
}