// MongoDB Mood Log Model
// Tracks astronaut's mood entries over time

const mongoose = require('mongoose');

const moodLogSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    
    // Mood Information
    moodScore: {
      type: Number,
      required: true,
      min: 1,
      max: 10,
      description: 'Mood rating from 1 (very sad) to 10 (very happy)',
    },
    
    // Emotional State
    emotions: [
      {
        type: String,
        enum: ['happy', 'sad', 'angry', 'anxious', 'stressed', 'relaxed', 'tired', 'energetic'],
      },
    ],
    
    // Stress Level
    stressLevel: {
      type: Number,
      min: 0,
      max: 10,
      description: 'Stress rating from 0 (no stress) to 10 (extreme stress)',
    },
    
    // Note/Description
    notes: {
      type: String,
      maxlength: 1000,
    },
    
    // Additional Context
    activities: [String], // e.g., ['work', 'exercise', 'socializing']
    location: String, // e.g., 'spacecraft', 'station', 'module-1'
    
    // AI Analysis Results
    aiAnalysis: {
      sentiment: { type: String, enum: ['positive', 'neutral', 'negative'] },
      confidence: Number,
      suggestedActions: [String],
    },
  },
  {
    timestamps: true,
  }
);

// Index for faster queries
moodLogSchema.index({ userId: 1, createdAt: -1 });

module.exports = mongoose.model('MoodLog', moodLogSchema);
