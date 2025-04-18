import { Company } from "../models/company.model.js";
import getDataUri from "../utils/datauri.js";
import { v2 as cloudinary } from "cloudinary";

// Register Company
// Register Company
export const registerCompany = async (req, res) => {
  try {
    const { name, description, website, location } = req.body;
    const userId = req.id;
    const file = req.file;

    if (!name || !userId) {
      return res.status(400).json({
        message: "Name and user ID are required",
        success: false,
      });
    }

    const existingCompany = await Company.findOne({ name });
    if (existingCompany) {
      return res.status(400).json({
        message: "Company already exists with this name",
        success: false,
      });
    }

    let logo = "";
    if (file) {
      const fileUri = getDataUri(file);
      const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
      logo = cloudResponse.secure_url;
    }

    const company = new Company({
      name,
      description,
      website,
      location,
      logo,
      userId,
    });

    await company.save();

    return res.status(201).json({
      message: "Company created successfully",
      success: true,
      company,
    });
  } catch (error) {
    console.log("Error in creating company:", error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};


// Logged-in User's Companies
// Modified userCompanies
export const userCompanies = async (req, res) => {
  try {
    const userId = req.id;

    // Validate userId format (ObjectId)
    if (!userId || !/^[0-9a-fA-F]{24}$/.test(userId)) {
      return res.status(400).json({
        message: "Invalid or missing user ID",
        success: false,
      });
    }

    // Fetch companies with explicit fields
    const companies = await Company.find(
      { userId },
      "name description website location logo userId createdAt updatedAt"
    ).lean();

    // Handle empty result
    if (!companies || companies.length === 0) {
      return res.status(404).json({
        message: "No companies found for this user",
        success: false,
        companies: [],
      });
    }

    return res.status(200).json({
      message: "Companies fetched successfully",
      success: true,
      companies,
    });
  } catch (error) {
    console.error("Error in fetching user companies:", error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};
// Get Single Company
export const singleCompany = async (req, res) => {
  try {
    const { id } = req.params;
    const company = await Company.findById(id);

    if (!company) {
      return res.status(404).json({
        message: "Company not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Company fetched successfully",
      success: true,
      company,
    });
  } catch (error) {
    console.log("Error in fetching single company:", error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

// Update Company
export const updateCompany = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, website, location } = req.body;
    const file = req.file;

    let logo;
    if (file) {
      const fileUri = getDataUri(file);
      const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
      logo = cloudResponse.secure_url;
    }

    const updateData = { name, description, website, location };
    if (logo) updateData.logo = logo;

    const company = await Company.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!company) {
      return res.status(404).json({
        message: "Company not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Company updated successfully",
      success: true,
      company,
    });
  } catch (error) {
    console.log("Error in updating company:", error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};
