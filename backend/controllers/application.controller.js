// backend/controllers/application.controller.js
import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";

// Apply for job
export const applyForJob = async (req, res) => {
    try {
      const { jobId } = req.params;
      const userId = req.id;
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found", success: false });
      }
      const alreadyApplied = await Application.findOne({
        job: jobId,
        applicant: userId,
      });
      if (alreadyApplied) {
        return res.status(400).json({
          message: "You have already applied for this job",
          success: false,
        });
      }
      const job = await Job.findById(jobId);
      if (!job) {
        return res.status(404).json({ message: "Job not found", success: false });
      }
      const newApplication = new Application({
        job: jobId,
        applicant: userId,
      });
      await newApplication.save();
      job.application.push(newApplication._id);
      await job.save();
      console.log('Created application ID:', newApplication._id);
      return res.status(201).json({
        message: "Application submitted successfully",
        success: true,
        newApplication,
      });
    } catch (error) {
      console.log("error in applying the job", error);
      return res.status(500).json({ message: "Internal server error", success: false });
    }
  };

// Get applied jobs
export const getAppliedJobs = async (req, res) => {
    try {
        const userId = req.id;
        const appliedJobs = await Application.find({ applicant: userId }).populate({
            path: "job",
            populate: {
                path: "company",
            },
        });
        return res.status(200).json(appliedJobs);
    } catch (error) {
        console.log("error in getting the applied jobs", error);
        return res.status(500).json({ message: "Internal server error", success: false });
    }
}

// Get all applicants for a job
// backend/controllers/application.controller.js
export const getJobApplicants = async (req, res) => {
    try {
      const { jobId } = req.params;
      const job = await Job.findById(jobId);
      if (!job) {
        return res.status(404).json({ message: "Job not found", success: false });
      }
      const applicants = await Application.find({ job: jobId }).populate('applicant', 'name');
      console.log('Applicants for job', jobId, ':', applicants); // Debug log
      return res.status(200).json({
        success: true,
        applicants: { application: applicants },
      });
    } catch (error) {
      console.log("error in getting the job applicants", error);
      return res.status(500).json({ message: "Internal server error", success: false });
    }
  };

// Change the status
export const changeStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const { applicationId } = req.params;
        const application = await Application.findById({ _id: applicationId });
        if (!application) {
            return res.status(404).json({ message: "Application not found", success: false });
        }
        application.status = status.toLowerCase();
        await application.save();
        return res.status(200).json({
            success: true,
            message: "Status changed successfully",
            application,
        });
    } catch (error) {
        console.log("error in changing the status", error);
        return res.status(500).json({ message: "Internal server error", success: false });
    }
}

// Get application by ID
export const getApplicationById = async (req, res) => {
    try {
        const { applicationId } = req.params;
        console.log('Fetching application with ID:', applicationId); // Debug log
        const application = await Application.findById(applicationId)
            .populate({
                path: 'applicant',
                select: 'name email phoneNumber profile',
            })
            .populate({
                path: 'job',
                select: 'title company',
                populate: {
                    path: 'company',
                    select: 'name',
                },
            });

        if (!application) {
            console.log('Application not found for ID:', applicationId); // Debug log
            return res.status(404).json({ message: 'Application not found', success: false });
        }

        return res.status(200).json({
            success: true,
            application,
        });
    } catch (error) {
        console.log('Error in getting application:', error);
        return res.status(500).json({ message: 'Internal server error', success: false });
    }
}