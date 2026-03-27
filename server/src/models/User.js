// MongoDB User Model
// Represents an astronaut user in the system

const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    // Personal Information
    name: {
      type: String,
      required: [true, 'Please provide a name'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Please provide an email'],
      unique: true,
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Invalid email format'],
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: 6,
      select: false, // Don't return password in queries by default
    },

    // Astronaut Profile
    missionName: String,
    spaceAgency: String, // NASA, ESA, ISRO, etc.
    crewPosition: String, // Commander, Pilot, Mission Specialist, etc.
    yearsOfExperience: Number,

    // Health Profile
    age: Number,
    bloodType: String,
    emergencyContact: String,
    medicalHistory: String,

    // Settings
    preferences: {
      darkMode: { type: Boolean, default: true },
      notifications: { type: Boolean, default: true },
      language: { type: String, default: 'en' },
    },

    // Status
    isActive: { type: Boolean, default: true },
    lastLogin: Date,
  },
  {
    timestamps: true, // Adds createdAt and updatedAt
  }
);

// Hash password before saving
userSchema.pre('save', async function (next) {
  // Only hash if password is modified
  if (!this.isModified('password')) return next();

  try {
    const salt = await bcryptjs.genSalt(10);
    this.password = await bcryptjs.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcryptjs.compare(enteredPassword, this.password);
};

// Method to get public profile (without password)
userSchema.methods.getPublicProfile = function () {
  const userObject = this.toObject();
  delete userObject.password;
  return userObject;
};

module.exports = mongoose.model('User', userSchema);
