// MongoDB Chat History Model
// Stores all AI assistant conversations

const mongoose = require('mongoose');

const chatHistorySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    
    // Conversation Information
    conversationId: {
      type: String,
      required: true,
      index: true,
    },
    
    // Messages in conversation
    messages: [
      {
        role: { type: String, enum: ['user', 'assistant'], required: true },
        content: { type: String, required: true },
        timestamp: { type: Date, default: Date.now },
        
        // AI Analysis for user messages
        emotionAnalysis: {
          primaryEmotion: String,
          emotions: [
            {
              emotion: String,
              confidence: Number,
            },
          ],
          sentiment: { type: String, enum: ['positive', 'neutral', 'negative'] },
        },
        
        // AI generated response metadata
        aiMetadata: {
          model: String,
          processingTime: Number, // milliseconds
          suggestions: [String],
        },
      },
    ],
    
    // Conversation Metadata
    title: String,
    topic: { type: String, enum: ['general', 'stress', 'sleep', 'exercise', 'nutrition', 'mental' ] },
    summary: String,
    
    // Analytics
    messageCount: { type: Number, default: 0 },
    averageSentiment: String,
    isResolved: { type: Boolean, default: false },
    
    // Notes/Tags
    tags: [String],
    notes: String,
  },
  {
    timestamps: true,
  }
);

// Index for faster queries
chatHistorySchema.index({ userId: 1, createdAt: -1 });
chatHistorySchema.index({ conversationId: 1 });

module.exports = mongoose.model('ChatHistory', chatHistorySchema);
