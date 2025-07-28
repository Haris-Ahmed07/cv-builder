// Import mongoose to interact with MongoDB
import mongoose from 'mongoose';

// Async function to connect to MongoDB
const connectDB = async () => {
  try {
    // Try to connect using the URI from environment variables
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true, // Use new URL parser
      useUnifiedTopology: true, // Use new server discovery engine
    });
    // Log success message with the host
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    // Log error and exit if connection fails
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

// Export the connection function for use elsewhere
export default connectDB;
