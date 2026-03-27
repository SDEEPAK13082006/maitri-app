// MongoDB Health Data Model
// Tracks physical health metrics for astronauts

const mongoose = require('mongoose');

const healthDataSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    
    date: {
      type: Date,
      required: true,
      default: () => new Date().setHours(0, 0, 0, 0),
    },
    
    // Sleep Information
    sleep: {
      hours: { type: Number, min: 0, max: 24 },
      quality: { type: Number, min: 1, max: 10, description: 'Sleep quality rating' },
      notes: String,
    },
    
    // Hydration
    hydration: {
      waterIntake: { type: Number, default: 0, description: 'Milliliters of water' },
      goal: { type: Number, default: 3000, description: 'Daily goal in ml' },
    },
    
    // Exercise Information
    exercise: {
      type: [
        {
          name: String,
          duration: Number, // in minutes
          intensity: { type: String, enum: ['light', 'moderate', 'vigorous'] },
          caloriesBurned: Number,
          notes: String,
        },
      ],
      default: [],
    },
    
    // Vital Signs (can be measured with devices)
    vitals: {
      heartRate: { type: Number, min: 30, max: 200, description: 'bpm' },
      bloodPressure: {
        systolic: { type: Number, min: 80, max: 200 },
        diastolic: { type: Number, min: 40, max: 120 },
      },
      temperature: { type: Number, min: 35, max: 42, description: 'Celsius' },
      oxygenLevel: { type: Number, min: 80, max: 100, description: 'Percentage' },
    },
    
    // Nutrition
    nutrition: {
      caloriesConsumed: Number,
      meals: [
        {
          name: String,
          type: String, // breakfast, lunch, dinner, snack
          description: String,
        },
      ],
    },
    
    // Mental Health (interconnected with mood)
    mentalWellbeing: {
      meditationMinutes: { type: Number, default: 0 },
      breathingExercises: { type: Number, default: 0 },
      stressLevel: { type: Number, min: 1, max: 10 },
    },
    
    // AI Recommendations provided
    recommendations: [String],
    
    // Health Alerts
    alerts: [
      {
        type: { type: String, enum: ['warning', 'critical', 'info'] },
        message: String,
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Index for faster queries
healthDataSchema.index({ userId: 1, date: -1 });

module.exports = mongoose.model('HealthData', healthDataSchema);
