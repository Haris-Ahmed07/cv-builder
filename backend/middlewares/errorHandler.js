// Simple error handling middleware for Express
const errorHandler = (err, req, res, next) => {
    // Log the error stack for debugging
    console.error(err.stack);
    // Respond with a generic error message
    res.status(500).json({ message: 'Something went wrong' });
};

// Export the middleware for use in the app
module.exports = errorHandler;
  