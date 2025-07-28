import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Define the schema for a user
const userSchema = new mongoose.Schema({
  // User's full name
  name: {
    type: String,
    required: [true, 'Please add a name']
  },
  // User's email address (must be unique and valid)
  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email'
    ]
  },
  // User's hashed password (not returned by default)
  password: {
    type: String,
    required: [true, 'Please add a password'],
    minlength: 6,
    select: false
  },
  // Fields for password reset functionality
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  // Timestamp for user creation
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Hash the password before saving the user (runs only if password is modified)
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Generate a signed JWT token for the user
userSchema.methods.getSignedJwtToken = function() {
  return jwt.sign(
    { id: this._id, name: this.name },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE }
  );
};

// Compare entered password with hashed password in database
userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Export the User model
const User = mongoose.model('User', userSchema);

export default User;
