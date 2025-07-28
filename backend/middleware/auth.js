import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// Middleware to protect routes - checks for valid JWT token
export const protect = async (req, res, next) => {
  let token;

  // Check for token in Authorization header (Bearer)
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    // Extract token from header
    token = req.headers.authorization.split(' ')[1];
  }
  // Or check for token in cookies
  else if (req.cookies.token) {
    token = req.cookies.token;
  }

  // If no token, deny access
  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized to access this route',
    });
  }

  try {
    // Verify token and decode payload
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user info to request (excluding password)
    req.user = await User.findById(decoded.id).select('-password');
    next();
  } catch (err) {
    // Token invalid or expired
    console.error('Auth middleware error:', err);
    return res.status(401).json({
      success: false,
      message: 'Not authorized to access this route',
    });
  }
};

// Middleware to grant access only to specific user roles
export const authorize = (...roles) => {
  return (req, res, next) => {
    // Check if user's role is allowed
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `User role ${req.user.role} is not authorized to access this route`,
      });
    }
    next();
  };
};
