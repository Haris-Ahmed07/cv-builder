import mongoose from 'mongoose';

const resumeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  personalInfo: {
    name: String,
    email: String,
    phone: String,
    address: String,
    linkedin: String,
    github: String,
  },
  summary: String,
  education: [{
    degree: String,
    school: String,
    field: String,
    startDate: String,
    endDate: String,
    grade: String,
    description: String
  }],
  workExperience: [{
    title: String,
    company: String,
    startDate: String,
    endDate: String,
    description: String
  }],
  skills: [String],
  achievements: [String],
  projects: [{
    title: String,
    techStack: String,
    description: String,
    link: String
  }],
  certifications: [{
    name: String,
    issuer: String,
    date: String
  }],
  languages: [String],
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
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Update the updatedAt field before saving
resumeSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

const Resume = mongoose.model('Resume', resumeSchema);

export default Resume;
