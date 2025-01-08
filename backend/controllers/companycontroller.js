import { Company } from "../models/company.js";

export const registerCompany = async (req, res) => {
    try {
        const companyName = req.body;
        if (!companyName) {
            return res.status(403).json({
                msg: "no company name is given"
            }) 
        }
        const comp = await Company.findOne({ name : companyName })
        if (comp) {
            return res.status(403).json({
                msg: "Company already exists"
            })
        }
        else {
            const newcomp = await Company.create({name : companyName , userId : req.id})
        }
        return res.status(201).json({
            msg: "Company registered successfully!! "
        })
        
    }
    catch (err) {
        console.log(err);
        return res.status(403).json({
            msg: "Error while registering company"
        })
    }
}

export const getAllCompany = async (req, res) => {
    try {
        const userId = req.id
        const companies = await Company.find({ userId: userId })

        if (!companies) {
            return res.status(404).json({
                msg: "No companies are registered by user !!"
            })
        }
        return res.status(200).json({
            msg: "Company created successfully",
            success: true,
            companies
        })
    }
    catch (err) {
        console.log(err);
        return res.status(403).json({
            msg: "Error while getting company"
        })
    }
}

export const getCompanyById = async(req, res) => {
    try {
        const companyId = req.params.id;
        const resComp = await Company.findById(companyId)

        if (!resComp) {
            return res.status(403).json({
                msg: "Company not found !!"
            })
        }
        return res.status(200).json({
            msg: "company",
            resComp,
            success: true
        })
    }
    catch (err) {
        console.log(err);
        return res.status(403).json({
            msg: "Error while getting company through Id"
        })
    }
}

export const updateCompanyDetails = async (req, res) => {
    try {
        const { logo, description, website, location } = req.body;

        const file = req.file

        const updateData = { logo, description, website, location }

        const companyRes = await Company.findByIdAndUpdate(req.params.id)

        if (!companyRes) {
            return res.status(403).json({
                msg: "no company found !",
                success: true
            })
        }
        return res.status(200).json({
            msg: "found the company",
            companyRes,
            success: true
        })
    }

    catch (err) {
        console.log("error" , err);
        
        return res.status(403).json({
            msg: "Error while updating company through Id"
        })
    }
}