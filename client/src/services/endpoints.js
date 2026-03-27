import API from './api'

// Auth Services
export const authService = {
  signup: (data) => API.post('/auth/signup', data),
  login: (data) => API.post('/auth/login', data),
  getProfile: () => API.get('/auth/profile'),
  updateProfile: (data) => API.put('/auth/profile', data),
  logout: () => API.post('/auth/logout'),
}

// Dashboard Services
export const dashboardService = {
  getDashboard: () => API.get('/dashboard'),
}

// Mood Services
export const moodService = {
  logMood: (data) => API.post('/mood/log', data),
  getMoodHistory: (days = 30) => API.get(`/mood/history?days=${days}`),
  getTodaysMood: () => API.get('/mood/today'),
  updateMood: (moodId, data) => API.put(`/mood/${moodId}`, data),
}

// Health Services
export const healthService = {
  logHealthData: (data) => API.post('/health/log', data),
  getHealthData: (date) => API.get(`/health/data?date=${date}`),
  getHealthSummary: () => API.get('/health/summary'),
}

// Chat Services
export const chatService = {
  sendMessage: (data) => API.post('/chat/send', data),
  getChatHistory: (limit = 50) => API.get(`/chat/history?limit=${limit}`),
  createConversation: (data) => API.post('/chat/conversation', data),
  getConversation: (conversationId) => API.get(`/chat/conversation/${conversationId}`),
}
