import { jobApplicationSchema } from "../validations/jobValidator";
import { Job } from "../models/job.js";
export const postJob = async (req, res) => {
    try {
        const { title, description, requirements, location, salary, experienceLevel, jobType, position , companyId } = req.body
        const resZod = jobApplicationSchema.parse({ title, description, requirements, location, salary, experienceLevel, jobType, position })
        const userId = req.id;
        let requirementsArray = requirements.map((data) => {
            return data;
        })
        console.log("requirements array is " , requirementsArray);
        
        if (resZod.success) {
            try {
                const job = await Job.create({
                    title,
                    description,
                    requirements: requirementsArray,
                    salary: salary,
                    location,
                    jobType,
                    experienceLevel,
                    position,
                    company: companyId,
                    created_by: userId
                })
                return res.status(201).json({
                    msg: "job created successfully",
                    success : true
                })
            }
            catch (err) {
                console.log(err);
                return res.status(403).json({
                    msg: "Error while creating a jobApplication",
                    success : false
                })
                
            }
        }
        else {
            return res.status(403).json({
                msg: "inputs are not valid for jobdescription!!",
                success : false
            })
        }

    }
    catch (err) {
        return res.status(403).json({
            msg: "error while creating jobposta!!",
            success: false
        }) 
    }
}

export const getAllJobs = async (req, res) => {
    try {
        const keyword = req.query.keyword || ""
        const searchQuery = {
            $or: [
                {title : {$regex : keyword , $options : "i"}},
                {description: { $regex: keyword, $options: "i" }}
            ]
        }

        const jobRes = await Job.find(searchQuery)

        if (!jobRes) {
            return res.status(403).json({
                msg: "couldn't find the jobs",
                success : false
            })
        }

        return res.status(200).json({
            msg: "got the jobs",
            jobRes,
            success: true
        })
    }
    catch (err) {
        return res.status(403).json({
            msg: "Error while geetting a listofjobs",
            success: false
        })
    }
}

export const getJobById = async(req, res) => {
    try {
        const companyId = req.params.id
        const jobRes = await Job.findById(companyId)
        if (!jobRes) {
            return res.status(403).json({
                msg: "couldn't find the jobs by id",
                success: false
            })
        }
        return res.status(200).json({
            msg: "Got the company",
            jobRes,
            success : true
        })
    }
    catch (err) {
        console.log(err);
        return res.status(403).json({
            msg: "error in job by id",
            success: false
        })
    }
}

export const getAdminJobs = async (req, res) => {
    try {
        const AdminId = req.id;
        const AdminJobs = Job.find({ created_by: AdminId });
        if (!AdminJobs) {
            return res.status(403).json({
                msg: "couldn't find the jobs created by Admin",
                success: false
            })
        }
        return res.status(200).json({
            msg: "Got the company",
            AdminJobs,
            success: true
        })
        
    }
    catch (err) {
        console.log(err);
        return res.status(404).json({
            msg: "Error in getting Admin jobs",
            success 
        })
        
    }
}