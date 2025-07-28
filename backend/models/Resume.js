import mongoose from 'mongoose';

// Define the schema for a user's resume
const resumeSchema = new mongoose.Schema({
  // Reference to the user who owns this resume
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  // Personal information section
  personalInfo: {
    name: String,
    email: String,
    phone: String,
    address: String,
    linkedin: String,
    github: String,
  },
  // Professional summary or objective
  summary: String,
  // Education history (array of schools/degrees)
  education: [{
    degree: String,
    school: String,
    field: String,
    startDate: String,
    endDate: String,
    grade: String,
    description: String
  }],
  // Work experience (array of jobs)
  workExperience: [{
    title: String,
    company: String,
    startDate: String,
    endDate: String,
    description: String
  }],
  // List of skills
  skills: [String],
  // List of achievements
  achievements: [String],
  // Projects (array of project details)
  projects: [{
    title: String,
    techStack: String,
    description: String,
    link: String
  }],
  // Certifications (array of certifications)
  certifications: [{
    name: String,
    issuer: String,
    date: String
  }],
  // Languages spoken
  languages: [String],
  // Order in which sections appear on the resume
  sectionOrder: {
    type: [String],
    default: [
      'PersonalInfo',
      'Summary',
      'Education',
      'Work',
      'Skills',
      'Projects',
      'Achievements',
      'Certifications',
      'Languages'
    ]
  },
  // Timestamps
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true // Automatically manage createdAt and updatedAt
});

// Update the updatedAt field before saving
resumeSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

const Resume = mongoose.model('Resume', resumeSchema);

export default Resume;
