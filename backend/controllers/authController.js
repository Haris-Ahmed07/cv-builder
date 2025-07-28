import User from '../models/User.js';

// Register a new user (signup)
// Route: POST /api/auth/signup
// Public access
export const signupUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // Check if the user already exists by email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ 
        success: false,
        message: 'User already exists with this email' 
      });
    }

    // Create a new user
    const user = await User.create({
      name,
      email,
      password
    });

    // Generate JWT token for the new user
    const token = user.getSignedJwtToken();

    // Prepare user data to return (no password)
    const userResponse = {
      id: user._id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt
    };

    // Send success response with token and user info
    res.status(201).json({
      success: true,
      token,
      user: userResponse
    });
  } catch (error) {
    // Handle signup errors
    console.error('Signup error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during signup',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Login an existing user (signin)
// Route: POST /api/auth/signin
// Public access
export const signinUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    // Validate email & password
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide an email and password'
      });
    }

    // Check for user
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Check if password matches
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Create token
    const token = user.getSignedJwtToken();

    // Create response object without password
    const userResponse = {
      id: user._id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt
    };

    res.status(200).json({
      success: true,
      token,
      user: userResponse
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during login',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Get current logged in user (me)
// Route: GET /api/auth/me
// Private access
export const getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    
    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    console.error('Get me error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};
