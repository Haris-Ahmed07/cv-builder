import Resume from '../models/Resume.js';
import ErrorResponse from '../utils/errorResponse.js';

// @desc    Get user's resume
// @route   GET /api/resume
// @access  Private
export const getResume = async (req, res, next) => {
  try {
    const resume = await Resume.findOne({ user: req.user.id });

    if (!resume) {
      // Return default empty resume structure if none exists
      return res.status(200).json({
        success: true,
        data: {
          personalInfo: {},
          summary: '',
          education: [],
          workExperience: [],
          skills: [],
          achievements: [],
          projects: [],
          certifications: [],
          languages: [],
          sectionOrder: [
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
        }
      });
    }

    res.status(200).json({
      success: true,
      data: resume
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create or update user's resume
// @route   POST /api/resume
// @access  Private
export const saveResume = async (req, res, next) => {
  try {
    const resumeData = {
      ...req.body,
      user: req.user.id
    };

    let resume = await Resume.findOne({ user: req.user.id });

    if (resume) {
      // Merge incoming data with existing resume
      Object.keys(req.body).forEach(key => {
        if (Array.isArray(req.body[key]) && Array.isArray(resume[key])) {
          // If both are arrays, merge them (avoid duplicates)
          resume[key] = [...resume[key], ...req.body[key]].filter(
            (item, index, arr) => arr.findIndex(i => JSON.stringify(i) === JSON.stringify(item)) === index
          );
        } else if (typeof req.body[key] === 'object' && req.body[key] !== null) {
          // If both are objects, shallow merge
          resume[key] = { ...resume[key], ...req.body[key] };
        } else {
          // Otherwise, just overwrite
          resume[key] = req.body[key];
        }
      });
      await resume.save();
    } else {
      resume = await Resume.create(resumeData);
    }

    res.status(200).json({
      success: true,
      data: resume
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete resume
// @route   DELETE /api/resume
// @access  Private
export const deleteResume = async (req, res, next) => {
  try {
    const resume = await Resume.findOne({ user: req.user.id });

    if (!resume) {
      return next(new ErrorResponse('No resume found for this user', 404));
    }

    // Make sure user owns the resume
    if (resume.user.toString() !== req.user.id) {
      return next(
        new ErrorResponse('Not authorized to delete this resume', 401)
      );
    }

    await resume.deleteOne();

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    next(error);
  }
};
