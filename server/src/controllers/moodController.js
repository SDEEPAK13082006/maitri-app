// Mood Controller
// Handles mood logging and retrieval

const MoodLog = require('../models/MoodLog');
const { successResponse, calculateStressLevel, callAIService } = require('../utils/helpers');

/**
 * Log new mood entry
 */
exports.logMood = async (req, res, next) => {
  try {
    const { moodScore, emotions, notes, stressLevel } = req.body;
    const userId = req.user.userId;

    // Validation
    if (!moodScore || moodScore < 1 || moodScore > 10) {
      return res.status(400).json({
        success: false,
        message: 'Mood score must be between 1-10',
      });
    }

    // Try to get AI analysis (if service available)
    let aiAnalysis = null;
    if (notes) {
      try {
        aiAnalysis = await callAIService('/analyze-emotion', { text: notes });
      } catch (error) {
        console.log('AI service not available, proceeding without analysis');
      }
    }

    // Calculate stress if not provided
    const calculatedStress = stressLevel || calculateStressLevel(moodScore, 6, notes);

    // Create mood log
    const moodLog = await MoodLog.create({
      userId,
      moodScore,
      emotions: emotions || [],
      stressLevel: calculatedStress,
      notes,
      aiAnalysis,
    });

    res.status(201).json(
      successResponse(moodLog, 'Mood logged successfully')
    );
  } catch (error) {
    next(error);
  }
};

/**
 * Get mood history with optional filtering
 */
exports.getMoodHistory = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const { days = 30 } = req.query;

    // Calculate date range
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - parseInt(days));

    // Get mood logs
    const moodLogs = await MoodLog.find({
      userId,
      createdAt: { $gte: startDate },
    })
      .sort('-createdAt')
      .limit(100);

    // Calculate statistics
    const avgMood =
      moodLogs.length > 0
        ? (moodLogs.reduce((sum, m) => sum + m.moodScore, 0) / moodLogs.length).toFixed(1)
        : 0;

    const avgStress =
      moodLogs.length > 0
        ? (moodLogs.reduce((sum, m) => sum + m.stressLevel, 0) / moodLogs.length).toFixed(1)
        : 0;

    // Get emotion frequency
    const emotionFrequency = {};
    moodLogs.forEach((log) => {
      log.emotions.forEach((emotion) => {
        emotionFrequency[emotion] = (emotionFrequency[emotion] || 0) + 1;
      });
    });

    res.json(
      successResponse(
        {
          moodLogs,
          statistics: {
            averageMood: parseFloat(avgMood),
            averageStress: parseFloat(avgStress),
            totalEntries: moodLogs.length,
            emotionFrequency,
          },
        },
        'Mood history retrieved'
      )
    );
  } catch (error) {
    next(error);
  }
};

/**
 * Get today's mood
 */
exports.getTodaysMood = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const mood = await MoodLog.findOne({
      userId,
      createdAt: { $gte: today },
    }).sort('-createdAt');

    res.json(
      successResponse(mood || null, 'Today\'s mood retrieved')
    );
  } catch (error) {
    next(error);
  }
};

/**
 * Update mood entry
 */
exports.updateMood = async (req, res, next) => {
  try {
    const { moodId } = req.params;
    const { moodScore, emotions, notes, stressLevel } = req.body;
    const userId = req.user.userId;

    // Find and verify ownership
    const moodLog = await MoodLog.findOne({ _id: moodId, userId });
    if (!moodLog) {
      return res.status(404).json({
        success: false,
        message: 'Mood entry not found',
      });
    }

    // Update fields
    if (moodScore) moodLog.moodScore = moodScore;
    if (emotions) moodLog.emotions = emotions;
    if (notes) moodLog.notes = notes;
    if (stressLevel) moodLog.stressLevel = stressLevel;

    await moodLog.save();

    res.json(
      successResponse(moodLog, 'Mood updated successfully')
    );
  } catch (error) {
    next(error);
  }
};
