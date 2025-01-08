import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required : true
    },
    email: {
        
        type: String,
        required: true,
        unique: true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    },
    password: {
        type: String,
        required : true
    },
    mobileNumber: {
        type : String
    },
    role: {
        type: String,
        enum: ['student', 'professional', 'recruiter'],
        required : true
    },
    profile: {
        bio: { type: String, max: 100 },
        skills: [{ type: String }],
        resumeLink: { type: String },
        resumeFileName: { type: String },
        company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },  // Foreign Key 
        profilePhoto: {
            type: String,
            default : ""
        }
    }
}, { timestamps: true })

export const User = mongoose.model("User" , userSchema)