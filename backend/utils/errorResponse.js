// Custom error class for sending error responses with status codes
class ErrorResponse extends Error {
  constructor(message, statusCode) {
    // Call the parent Error constructor with the message
    super(message);
    // Attach HTTP status code to the error
    this.statusCode = statusCode;
    // Capture the stack trace for debugging
    Error.captureStackTrace(this, this.constructor);
  }
}

// Export the custom error class
export default ErrorResponse;
