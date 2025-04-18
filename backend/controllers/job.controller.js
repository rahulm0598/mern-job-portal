import mongoose from "mongoose";
import { Job } from "../models/job.model.js";
import { Company } from "../models/company.model.js";

// Post a new job (unchanged)
export const postJob = async (req, res) => {
  try {
    const {
      title,
      description,
      salary,
      requirements,
      location,
      experiencelevel,
      jobtype,
      position,
      company,
    } = req.body;

    // Validate all fields
    if (
      !title ||
      !description ||
      !salary ||
      !requirements ||
      !location ||
      !experiencelevel ||
      !jobtype ||
      !position ||
      !company
    ) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }

    // Validate numeric fields
    const salaryNum = Number(salary);
    const experienceLevelNum = Number(experiencelevel);
    const positionNum = Number(position);
    if (isNaN(salaryNum) || isNaN(experienceLevelNum) || isNaN(positionNum)) {
      return res.status(400).json({
        message: "Salary, experience level, and position must be valid numbers",
        success: false,
      });
    }

    // Validate requirements
    const requirementsArray = requirements
      .split(",")
      .map((item) => item.trim())
      .filter((item) => item);
    if (requirementsArray.length === 0) {
      return res.status(400).json({
        message: "At least one requirement is required",
        success: false,
      });
    }

    // Validate company ObjectId
    if (!mongoose.Types.ObjectId.isValid(company)) {
      return res.status(400).json({
        message: "Invalid company ID",
        success: false,
      });
    }

    // Check if company exists
    const companyExists = await Company.findById(company);
    if (!companyExists) {
      return res.status(400).json({
        message: "Company not found",
        success: false,
      });
    }

    // Validate userId (created_by)
    const userId = req.id;
    console.log("Creating job with:", { company, userId });
    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(401).json({
        message: "Invalid or missing user ID from authentication",
        success: false,
      });
    }

    const job = new Job({
      title,
      description,
      salary: salaryNum,
      requirements: requirementsArray,
      location,
      experienceLevel: experienceLevelNum,
      jobType: jobtype,
      position: positionNum,
      company: new mongoose.Types.ObjectId(company),
      created_by: new mongoose.Types.ObjectId(userId),
    });

    await job.save();

    return res.status(201).json({
      message: "Job posted successfully",
      success: true,
      job,
    });
  } catch (error) {
    console.error("Error in posting job:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
      error: error.message,
    });
  }
};

// Get all jobs (updated)
export const getAllJobs = async (req, res) => {
  try {
    const { keyword, location, jobType, salary, experienceLevel, page = 1, limit = 9 } = req.query;
    const query = {};

    if (keyword) {
      query.$or = [
        { title: { $regex: keyword, $options: 'i' } },
        { description: { $regex: keyword, $options: 'i' } },
      ];
    }

    if (location) {
      query.location = { $regex: location, $options: 'i' };
    }

    if (jobType) {
      query.jobType = { $regex: jobType, $options: 'i' };
    }

    if (salary) {
      const [min, max] = salary.split('-').map((val) => parseInt(val.replace('k', '')) * 1000);
      query.salary = { $gte: min, $lte: max || Infinity };
    }

    if (experienceLevel) {
      const [min, max] = experienceLevel.split('-').map(Number);
      query.experienceLevel = { $gte: min, $lte: max || Infinity };
    }

    const jobs = await Job.find(query)
      .populate({ path: 'company', select: 'name logo description location website' })
      .populate({ path: 'created_by', select: 'name' })
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    if (jobs.length === 0) {
      return res.status(404).json({
        message: 'No jobs found',
        success: false,
      });
    }

    return res.status(200).json({
      message: 'Jobs fetched successfully',
      success: true,
      jobs,
    });
  } catch (error) {
    console.error('Failed to get all jobs:', error);
    return res.status(500).json({
      message: 'Internal Server Error',
      success: false,
      error: error.message,
    });
  }
};
// Get single job (unchanged)
export const getjob = async (req, res) => {
  try {
    const { id } = req.params;
    const job = await Job.findById(id).populate({
      path: "application",
    });

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Job fetched successfully",
      success: true,
      job,
    });
  } catch (error) {
    console.error("Failed to get job:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
      error: error.message,
    });
  }
};

// Get admin jobs (unchanged)
export const getAdminJobs = async (req, res) => {
  try {
    const adminId = req.id;
    const jobs = await Job.find({ created_by: adminId });

    if (!jobs || jobs.length === 0) {
      return res.status(404).json({
        message: "No jobs found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Jobs fetched successfully",
      success: true,
      jobs,
    });
  } catch (error) {
    console.error("Failed to get admin jobs:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
      error: error.message,
    });
  }
};

// Update a job (unchanged)
export const updateJob = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      description,
      salary,
      requirements,
      location,
      experiencelevel,
      jobtype,
      position,
      company,
    } = req.body;

    // Validate all fields
    if (
      !title ||
      !description ||
      !salary ||
      !requirements ||
      !location ||
      !experiencelevel ||
      !jobtype ||
      !position ||
      !company
    ) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }

    // Validate numeric fields
    const salaryNum = Number(salary);
    const experienceLevelNum = Number(experiencelevel);
    const positionNum = Number(position);
    if (isNaN(salaryNum) || isNaN(experienceLevelNum) || isNaN(positionNum)) {
      return res.status(400).json({
        message: "Salary, experience level, and position must be valid numbers",
        success: false,
      });
    }

    // Validate requirements
    const requirementsArray = requirements
      .split(",")
      .map((item) => item.trim())
      .filter((item) => item);
    if (requirementsArray.length === 0) {
      return res.status(400).json({
        message: "At least one requirement is required",
        success: false,
      });
    }

    // Validate company ObjectId
    if (!mongoose.Types.ObjectId.isValid(company)) {
      return res.status(400).json({
        message: "Invalid company ID",
        success: false,
      });
    }

    // Check if company exists
    const companyExists = await Company.findById(company);
    if (!companyExists) {
      return res.status(400).json({
        message: "Company not found",
        success: false,
      });
    }

    // Validate userId
    const userId = req.id;
    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(401).json({
        message: "Invalid or missing user ID from authentication",
        success: false,
      });
    }

    // Validate job ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid job ID",
        success: false,
      });
    }

    // Find the job and ensure the user owns it
    const job = await Job.findOne({ _id: id, created_by: userId });
    if (!job) {
      return res.status(404).json({
        message: "Job not found or you are not authorized to update it",
        success: false,
      });
    }

    // Update job fields
    job.title = title;
    job.description = description;
    job.salary = salaryNum;
    job.requirements = requirementsArray;
    job.location = location;
    job.experienceLevel = experienceLevelNum;
    job.jobType = jobtype;
    job.position = positionNum;
    job.company = new mongoose.Types.ObjectId(company);

    await job.save();

    return res.status(200).json({
      message: "Job updated successfully",
      success: true,
      job,
    });
  } catch (error) {
    console.error("Error in updating job:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
      error: error.message,
    });
  }
};