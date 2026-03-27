// Helper Functions and Utilities

const axios = require('axios');

/**
 * Send request to AI service
 */
const callAIService = async (endpoint, data) => {
  try {
    const response = await axios.post(`${process.env.AI_SERVICE_URL}${endpoint}`, data);
    return response.data;
  } catch (error) {
    console.error('AI Service Error:', error.message);
    throw new Error('AI Service unavailable');
  }
};

/**
 * Create error response
 */
const errorResponse = (message, status = 400) => {
  const error = new Error(message);
  error.status = status;
  return error;
};

/**
 * Create success response
 */
const successResponse = (data, message = 'Success') => {
  return {
    success: true,
    message,
    data,
  };
};

/**
 * Generate random string (for conversation IDs, etc.)
 */
const generateId = () => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Calculate stress level from mood and health data
 */
const calculateStressLevel = (moodScore, sleepHours, stressNotes) => {
  // Simple algorithm: combine mood, sleep, and stress indicators
  let calculatedStress = 0;

  // Inverse of mood (low mood = high stress)
  calculatedStress += (10 - moodScore) * 0.4;

  // Poor sleep increases stress
  if (sleepHours < 6) calculatedStress += 3;
  else if (sleepHours < 7) calculatedStress += 1.5;

  // Check for stress keywords in notes
  const stressKeywords = ['anxious', 'worried', 'overwhelmed', 'stressed', 'nervous'];
  if (stressNotes) {
    const hasStressKeyword = stressKeywords.some((keyword) =>
      stressNotes.toLowerCase().includes(keyword)
    );
    if (hasStressKeyword) calculatedStress += 2;
  }

  // Clamp between 0-10
  return Math.min(Math.round(calculatedStress), 10);
};

module.exports = {
  callAIService,
  errorResponse,
  successResponse,
  generateId,
  calculateStressLevel,
};
