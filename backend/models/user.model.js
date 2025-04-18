import mongoose from 'mongoose';

// Define the profile sub-schema
const profileSchema = new mongoose.Schema({
  bio: {
    type: String,
    default: '',
  },
  skills: [
    {
      type: String,
    },
  ],
  resume: {
    type: String,
    default: '',
  },
  resumeName: {
    type: String,
    default: '',
  },
  profilePhoto: {
    type: String,
    default: '',
  },
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
  },
});

// Main user schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['student', 'recruiter'],
      required: true,
    },
    profile: {
      type: profileSchema,
      default: () => ({}), // ensures profile is initialized
    },
  },
  { timestamps: true }
);

export const User = mongoose.model('User', userSchema);
