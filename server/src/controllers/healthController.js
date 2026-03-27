// Health Controller
// Handles physical health tracking

const HealthData = require('../models/HealthData');
const { successResponse, callAIService } = require('../utils/helpers');

/**
 * Log health data
 */
exports.logHealthData = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const { sleep, hydration, exercise, vitals, nutrition, mentalWellbeing } = req.body;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Check if today's record exists
    let healthData = await HealthData.findOne({
      userId,
      date: { $gte: today },
    });

    if (!healthData) {
      // Create new record
      healthData = new HealthData({
        userId,
        date: today,
      });
    }

    // Update fields
    if (sleep) healthData.sleep = sleep;
    if (hydration) healthData.hydration = hydration;
    if (exercise) healthData.exercise = exercise;
    if (vitals) healthData.vitals = vitals;
    if (nutrition) healthData.nutrition = nutrition;
    if (mentalWellbeing) healthData.mentalWellbeing = mentalWellbeing;

    // Generate AI recommendations
    try {
      const recommendations = await callAIService('/recommendations', {
        sleep: sleep?.hours,
        hydration: hydration?.waterIntake,
        exerciseMinutes: exercise?.reduce((sum, e) => sum + e.duration, 0) || 0,
        stress: mentalWellbeing?.stressLevel,
      });
      healthData.recommendations = recommendations.suggestions || [];
    } catch (error) {
      console.log('AI recommendations not available');
    }

    // Check for alerts
    healthData.alerts = generateHealthAlerts(healthData);

    await healthData.save();

    res.status(201).json(
      successResponse(healthData, 'Health data logged successfully')
    );
  } catch (error) {
    next(error);
  }
};

/**
 * Get health data for a specific date
 */
exports.getHealthData = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const { date } = req.query;

    let query = { userId };

    if (date) {
      const startDate = new Date(date);
      startDate.setHours(0, 0, 0, 0);
      const endDate = new Date(startDate);
      endDate.setDate(endDate.getDate() + 1);

      query.date = { $gte: startDate, $lt: endDate };
    } else {
      // Default to today
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      query.date = { $gte: today };
    }

    const healthData = await HealthData.find(query).sort('-date');

    res.json(
      successResponse(healthData, 'Health data retrieved')
    );
  } catch (error) {
    next(error);
  }
};

/**
 * Get health summary (last 7 days)
 */
exports.getHealthSummary = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const healthData = await HealthData.find({
      userId,
      date: { $gte: sevenDaysAgo },
    }).sort('-date');

    // Calculate averages
    const avgSleep = healthData.length > 0
      ? (healthData.reduce((sum, h) => sum + (h.sleep?.hours || 0), 0) / healthData.length).toFixed(1)
      : 0;

    const totalHydration = healthData.reduce((sum, h) => sum + (h.hydration?.waterIntake || 0), 0);

    const totalExerciseMinutes = healthData.reduce(
      (sum, h) => sum + (h.exercise?.reduce((s, e) => s + e.duration, 0) || 0),
      0
    );

    // Find trends
    const sleepTrend = healthData.length >= 2
      ? healthData[0].sleep?.hours >= (healthData[healthData.length - 1].sleep?.hours || 0)
        ? 'stable'
        : 'improving'
      : 'neutral';

    res.json(
      successResponse(
        {
          period: '7 days',
          averageSleep: parseFloat(avgSleep),
          totalHydration,
          totalExerciseMinutes,
          sleepTrend,
          dailyData: healthData.map((h) => ({
            date: h.date,
            sleep: h.sleep?.hours,
            hydration: h.hydration?.waterIntake,
            exercise: h.exercise?.reduce((sum, e) => sum + e.duration, 0) || 0,
          })),
        },
        'Health summary retrieved'
      )
    );
  } catch (error) {
    next(error);
  }
};

/**
 * Generate health alerts
 */
function generateHealthAlerts(healthData) {
  const alerts = [];

  // Sleep alerts
  if (healthData.sleep?.hours < 6) {
    alerts.push({
      type: 'warning',
      message: 'You\'re getting less than 6 hours of sleep. Aim for 7-9 hours.',
    });
  }

  // Hydration alerts
  const hydrationPercentage = (healthData.hydration?.waterIntake / healthData.hydration?.goal) * 100;
  if (hydrationPercentage < 50) {
    alerts.push({
      type: 'warning',
      message: 'Low hydration. Drink more water!',
    });
  }

  // Exercise alerts
  if ((healthData.exercise?.length || 0) === 0) {
    alerts.push({
      type: 'info',
      message: 'No exercise logged. Try to move for 30 minutes today!',
    });
  }

  // Vitals alerts
  if (healthData.vitals?.heartRate > 100 && healthData.vitals?.heartRate < 50) {
    alerts.push({
      type: 'critical',
      message: 'Unusual heart rate detected. Please rest and monitor.',
    });
  }

  return alerts;
}
