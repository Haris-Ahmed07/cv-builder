import Resume from '../models/Resume.js';

// Get the current user's resume
// Route: GET /api/resume
// Private access
export const getResume = async (req, res, next) => {
  try {
    // Find resume by user ID
    const resume = await Resume.findOne({ user: req.user.id });

    if (!resume) {
      // If no resume exists, return a default empty resume structure
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

    // Resume found, return it
    res.status(200).json({
      success: true,
      data: resume
    });
  } catch (error) {
    // Pass errors to error handler
    next(error);
  }
};

// Create or update the user's resume
// Route: POST /api/resume
// Private access
export const saveResume = async (req, res, next) => {
  try {
    // Merge request body with user ID
    const resumeData = {
      ...req.body,
      user: req.user.id
    };

    // Check if resume already exists for user
    let resume = await Resume.findOne({ user: req.user.id });
    // ... rest of function unchanged
    if (resume) {
      // Overwrite arrays and objects, do not merge arrays (prevents duplicates)
      Object.keys(req.body).forEach(key => {
        if (Array.isArray(req.body[key]) && Array.isArray(resume[key])) {
          // Overwrite arrays
          resume[key] = req.body[key];
        } else if (typeof req.body[key] === 'object' && req.body[key] !== null) {
          // Shallow merge objects
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