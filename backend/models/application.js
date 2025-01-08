import mongoose from "mongoose";

const applicationSchema = mongoose.Schema({
    job: {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'Job'
    },
    applicant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Application'
    },
    company: 
    {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'Company'
    }

}, { timestamps: true })

export const Application = mongoose.model("Application", applicationSchema)