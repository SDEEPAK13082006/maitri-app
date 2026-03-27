// Dashboard Controller
// Handles dashboard data aggregation

const User = require('../models/User');
const MoodLog = require('../models/MoodLog');
const HealthData = require('../models/HealthData');
const { successResponse } = require('../utils/helpers');

/**
 * Get dashboard summary
 */
exports.getDashboard = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Get user
    const user = await User.findById(userId);

    // Get today's mood
    const todayMood = await MoodLog.findOne({
      userId,
      createdAt: { $gte: today },
    }).sort('-createdAt');

    // Get today's health data
    const todayHealth = await HealthData.findOne({
      userId,
      date: { $gte: today },
    });

    // Get recent mood history (last 7 days)
    const sevenDaysAgo = new Date(today);
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const moodHistory = await MoodLog.find({
      userId,
      createdAt: { $gte: sevenDaysAgo },
    }).sort('-createdAt');

    // Calculate averages
    const avgMood =
      moodHistory.length > 0
        ? Math.round(moodHistory.reduce((sum, m) => sum + m.moodScore, 0) / moodHistory.length)
        : 5;

    const avgStress =
      moodHistory.length > 0
        ? Math.round(moodHistory.reduce((sum, m) => sum + (m.stressLevel || 5), 0) / moodHistory.length)
        : 5;

    res.json(
      successResponse(
        {
          user: {
            name: user.name,
            email: user.email,
            missionName: user.missionName,
            spaceAgency: user.spaceAgency,
          },
          todaysSummary: {
            mood: todayMood ? todayMood.moodScore : null,
            moodEmotions: todayMood ? todayMood.emotions : [],
            stress: todayMood ? todayMood.stressLevel : null,
            sleep: todayHealth?.sleep?.hours || null,
            hydration: todayHealth?.hydration?.waterIntake || 0,
            exerciseMinutes:
              todayHealth?.exercise?.reduce((sum, e) => sum + e.duration, 0) || 0,
          },
          statistics: {
            averageMood: avgMood,
            averageStress: avgStress,
            totalMoodEntries: moodHistory.length,
            moodTrend: moodHistory.length >= 2 
              ? moodHistory[0].moodScore >= moodHistory[moodHistory.length - 1].moodScore 
                ? 'stable' 
                : 'improving' 
              : 'neutral',
          },
          moodHistory: moodHistory.slice(0, 5).map((m) => ({
            date: m.createdAt,
            mood: m.moodScore,
            stress: m.stressLevel,
          })),
          alerts: generateAlerts(todayMood, todayHealth),
        },
        'Dashboard data retrieved'
      )
    );
  } catch (error) {
    next(error);
  }
};

/**
 * Generate alerts based on health data
 */
function generateAlerts(moodData, healthData) {
  const alerts = [];

  // High stress alert
  if (moodData?.stressLevel >= 8) {
    alerts.push({
      type: 'warning',
      severity: 'high',
      message: 'High stress detected. Consider a breathing exercise.',
    });
  }

  // Low mood alert
  if (moodData?.moodScore <= 3) {
    alerts.push({
      type: 'warning',
      severity: 'high',
      message: 'Low mood detected. Would you like to chat with MAITRI?',
    });
  }

  // Poor sleep alert
  if (healthData?.sleep?.hours < 6) {
    alerts.push({
      type: 'warning',
      severity: 'medium',
      message: 'You got less than 6 hours of sleep. Rest is important.',
    });
  }

  // Low hydration alert
  if (healthData?.hydration?.waterIntake < healthData?.hydration?.goal * 0.5) {
    alerts.push({
      type: 'info',
      severity: 'low',
      message: 'Remember to drink water! Stay hydrated.',
    });
  }

  // No exercise alert
  if ((healthData?.exercise?.length || 0) === 0) {
    alerts.push({
      type: 'info',
      severity: 'low',
      message: 'No exercise logged today. A short workout can boost your mood!',
    });
  }

  return alerts;
}
