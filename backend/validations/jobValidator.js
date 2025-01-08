import zod from "zod"
//         const { title, description, requirements, location, salary, experienceLevel, jobType, position } = req.body

export const jobApplicationSchema = zod.object({
    title: zod.string(),
    description: zod.string(),
    requirements: zod.array(z.string()),
    location: zod.string(),
    salary: zod.number(),
    experienceLevel: zod.number(),
    jobType: zod.string(),
    position : zod.string()
})