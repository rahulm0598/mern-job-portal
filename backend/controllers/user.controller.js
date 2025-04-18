import { User } from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import getDataUri from '../utils/datauri.js';
import { v2 as cloudinary } from 'cloudinary';

// Format user response for frontend (reusable)
const formatUser = (user) => ({
  _id: user._id,
  email: user.email,
  name: user.name,
  role: user.role,
  phoneNumber: user.phoneNumber,
  profile: {
    profilePhoto: user.profile?.profilePhoto || null,
    skills: user.profile?.skills || [],
    bio: user.profile?.bio || "",
    resume: user.profile?.resume || "",
    resumeName: user.profile?.resumeName || "",
  },
});


// Signup user
export const signup = async (req, res) => {
  try {
    const { name, email, password, phoneNumber, role } = req.body;
    const file = req.file;

    let cloudinaryResponse;
    let profilePhotoUrl = null;

    // Upload profile photo if present
    if (file) {
      const fileUri = getDataUri(file);
      cloudinaryResponse = await cloudinary.uploader.upload(fileUri.content, {
        resource_type: 'image',
        folder: 'profile_photos',
      });
      profilePhotoUrl = cloudinaryResponse.secure_url;
    }

    if (!name || !email || !password || !phoneNumber || !role) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "User already exists with this email",
        success: false,
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashPassword,
      phoneNumber,
      role,
      profile: {
        profilePhoto: profilePhotoUrl,
      }
    });

    const savedUser = await user.save();
    const formattedUser = formatUser(savedUser);

    res.status(201).json({
      message: "User created successfully",
      success: true,
      user: formattedUser,
    });
  } catch (error) {
    console.error("Error in signup:", error.message);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

// Login user
export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "User not found",
        success: false,
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid password",
        success: false,
      });
    }

    if (role !== user.role) {
      return res.status(400).json({
        message: "Invalid role",
        success: false,
      });
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    const formattedUser = formatUser(user);

    res.status(200)
      .cookie("token", token, {
        maxAge: 86400000,
        httpOnly: true,
        sameSite: "strict",
      })
      .json({
        message: `Welcome ${user.name}, you are logged in`,
        success: true,
        user: formattedUser,
        token,
      });
  } catch (error) {
    console.log("Error in login:", error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

// Logout user
export const logout = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(400).json({
        message: "You are already logged out or not logged in",
        success: false,
      });
    }

    res.clearCookie("token");
    res.status(200).json({
      message: "Logged out successfully",
      success: true,
    });
  } catch (error) {
    console.log("Error in logout:", error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

// Update profile
export const updateProfile = async (req, res) => {
  try {
    const {
      name,
      email,
      phoneNumber,
      bio,
      skills,
      profilePhoto,
      role
    } = req.body;

    const userId = req.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    if (name !== undefined) user.name = name;
    if (email !== undefined) user.email = email;
    if (phoneNumber !== undefined) user.phoneNumber = phoneNumber;
    if (role !== undefined) user.role = role;

    if (!user.profile) user.profile = {};
    if (bio !== undefined) user.profile.bio = bio;
    if (profilePhoto !== undefined) user.profile.profilePhoto = profilePhoto;

    const file = req.file;
    let cloudinaryResponse;

    if (file) {
      const fileUri = getDataUri(file);
      const isPdf = file.mimetype === 'application/pdf';

      cloudinaryResponse = await cloudinary.uploader.upload(fileUri.content, {
        resource_type: isPdf ? 'raw' : 'image',
        folder: isPdf ? 'resumes' : 'profile_photos',
      });

      if (isPdf) {
        user.profile.resume = cloudinaryResponse.secure_url;
        user.profile.resumeName = file.originalname;
      } else {
        user.profile.profilePhoto = cloudinaryResponse.secure_url;
      }
    }

    if (skills !== undefined) {
      user.profile.skills = Array.isArray(skills)
        ? skills
        : skills.split(',').map(skill => skill.trim());
    }

    await user.save();
    const formattedUser = formatUser(user);

    res.status(200).json({
      message: "Profile updated successfully",
      success: true,
      user: formattedUser,
    });
  } catch (error) {
    console.log("Error in updating the profile:", error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};
