import { Application } from "../models/application.model.js";

import {Job} from "../models/job.model.js";


//apply for job

export const applyForJob = async (req, res) => {
    try {
        const {jobId} = req.params;
        const userId = req.id;
        const alreadyapplied = await Application.findOne({
            job: jobId,
            applicant: userId,

        });
        if (alreadyapplied) {
            return res.status(400).json({ message: "You have already applied for this job",
                success:false,
                });
            }
            const job = await Job.findById(jobId);
            if (!job) {
                return res.status(404).json({ message: "Job not found",
                })};
                const newApplication = new Application({ job:jobId,
                    applicant:userId,
                })
                await newApplication.save();
                await job.application.push(newApplication._id);
                await job.save();
                return res.status(201).json({ message: "Application submitted successfully",
                    success:true,
                    newApplication,
                    });
            }

           
                   
            

    
    catch (error) {
        console.log("error in appying the job",error)
    }
    
}


// get applied jobs

export const getAppliedJobs = async (req, res) => {
    try {
    const userId = req.id;
    const appliedjobs =  await Application.find({applicant:userId}).populate({path:"job",
        populate:{
            path:"company",
        }
    });
    return res.status(200).json(appliedjobs);
}
catch (error) {
    console.log("error in getting the applied jobs",error)
    }
}

// get all  applicants for a job
export const getJobApplicants = async (req, res) => {
    try {
        const {jobId} = req.params;
        const applicants = await Job.findById(jobId).populate({
            path: "application",
            populate: {
              path: "applicant",
              select: "name", // 👈 only fetch the name field from User
            },
          });
          

                if(!applicants)
                {
                    return res.status(404).json({message:"Job not found",success:false});
                }
                return res.status(200).json({
                    success:true,
                    applicants
                
                });
             
            }
           
    
    
catch(error)
{
    console.log("error in getting the job applicants",error)
    }
}


//change the status

export const changeStatus = async (req, res) => {
    try {
        const {status} = req.body;
        const {applicationId} = req.params;
        const application = await Application.findById({_id: applicationId});
        if(!application)
            {
                return res.status(404).json({message:"Application not found",success:false});
                }
                
                application.status = status.toLowerCase();
                await application.save();
                return res.status(200).json({
                    success:true,
                    message:"Status changed successfully",
                    application
                    });
                    }
                    catch(error)
                    {
                        console.log("error in changing the status",error)
                        }
                    }
